import { afterEach, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

const gemini = vi.hoisted(() => ({
  generateContentStream: vi.fn(),
}));

vi.mock("@google/genai", () => ({
  GoogleGenAI: class {
    readonly models = {
      generateContentStream: gemini.generateContentStream,
    };
  },
}));

afterEach(() => {
  vi.resetAllMocks();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

function createRequest(
  signal?: AbortSignal,
  text = "안녕하세요",
): NextRequest {
  return new NextRequest("http://localhost/api/tts", {
    method: "POST",
    body: JSON.stringify({ text, voice: "Puck" }),
    headers: { "Content-Type": "application/json" },
    signal,
  });
}

async function* audioResponses() {
  yield {
    candidates: [{ content: { parts: [{ inlineData: { data: "AAE=" } }] } }],
  };
}

it("S16LE PCM 스트림 계약 헤더와 본문을 반환한다", async () => {
  const requestController = new AbortController();
  gemini.generateContentStream.mockResolvedValue(audioResponses());

  const response = await POST(createRequest(requestController.signal));
  const sdkSignal = (
    gemini.generateContentStream.mock.calls[0]?.[0] as {
      config?: { abortSignal?: AbortSignal };
    }
  ).config?.abortSignal;

  expect(response.status).toBe(200);
  expect(sdkSignal?.aborted).toBe(false);
  expect(response.headers.get("Content-Type")).toBe("application/octet-stream");
  expect(response.headers.get("X-Audio-Encoding")).toBe("PCM_S16LE");
  expect(response.headers.get("X-Audio-Sample-Rate")).toBe("24000");
  expect(response.headers.get("X-Audio-Channels")).toBe("1");
  expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
  expect(response.headers.get("Cache-Control")).toBe(
    "no-store, no-transform",
  );
  expect(response.headers.get("Content-Length")).toBeNull();
  expect(
    Array.from(new Uint8Array(await response.arrayBuffer())),
  ).toEqual([0, 1]);
  expect(gemini.generateContentStream).toHaveBeenCalledOnce();
  expect(gemini.generateContentStream).toHaveBeenCalledWith(
    expect.objectContaining({
      model: "gemini-3.1-flash-tts-preview",
      config: expect.objectContaining({
        abortSignal: expect.any(AbortSignal),
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Puck" },
          },
        },
      }),
    }),
  );
  requestController.abort();
});

it("Gemini 완료를 기다리지 않고 첫 PCM이 도착하면 HTTP 응답을 시작한다", async () => {
  const requestController = new AbortController();
  let releaseStream!: () => void;
  const streamPending = new Promise<void>((resolve) => {
    releaseStream = resolve;
  });
  gemini.generateContentStream.mockResolvedValueOnce(
    (async function* () {
      yield {
        candidates: [
          { content: { parts: [{ inlineData: { data: "AAE=" } }] } },
        ],
      };
      await streamPending;
    })(),
  );

  const responsePromise = POST(createRequest(requestController.signal));
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const outcome = await Promise.race([
    responsePromise.then((response) => ({ response })),
    new Promise<{ timeout: true }>((resolve) => {
      timeout = setTimeout(() => resolve({ timeout: true }), 100);
    }),
  ]);
  if (timeout) clearTimeout(timeout);

  expect(outcome).not.toEqual({ timeout: true });
  if ("response" in outcome) {
    const reader = outcome.response.body?.getReader();
    await expect(reader?.read()).resolves.toEqual({
      done: false,
      value: Uint8Array.from([0, 1]),
    });
    releaseStream();
    await reader?.cancel();
  }
  requestController.abort();
});

it("1,000자 이내 원고 전체를 하나의 Gemini 요청으로 전달한다", async () => {
  const transcript = `${"가".repeat(600)} ${"나".repeat(399)}`;
  gemini.generateContentStream.mockResolvedValueOnce(
    (async function* () {
      yield {
        candidates: [
          {
            finishReason: "STOP",
            content: { parts: [{ inlineData: { data: "AAE=" } }] },
          },
        ],
      };
    })(),
  );

  const response = await POST(createRequest(undefined, transcript));

  expect(
    Array.from(new Uint8Array(await response.arrayBuffer())),
  ).toEqual([0, 1]);
  expect(gemini.generateContentStream).toHaveBeenCalledOnce();
  const prompt = (
    gemini.generateContentStream.mock.calls[0][0] as {
      contents: Array<{ parts: Array<{ text: string }> }>;
    }
  ).contents[0].parts[0].text;
  expect(prompt).toContain(`#### TRANSCRIPT\n${transcript}`);
});

it("1,000자를 초과한 원고는 Gemini 요청 전에 거부한다", async () => {
  const response = await POST(createRequest(undefined, "가".repeat(1001)));

  expect(response.status).toBe(400);
  await expect(response.json()).resolves.toEqual({
    error: "텍스트는 최대 1,000자까지 입력할 수 있습니다.",
  });
  expect(gemini.generateContentStream).not.toHaveBeenCalled();
});

it("오디오 전송 시작 뒤 OTHER가 발생하면 재시도 없이 스트림을 종료한다", async () => {
  gemini.generateContentStream.mockResolvedValueOnce(
    (async function* () {
      yield {
        candidates: [
          { content: { parts: [{ inlineData: { data: "AAE=" } }] } },
        ],
      };
      yield {
        candidates: [
          {
            finishReason: "OTHER",
            content: { parts: [{ inlineData: { data: "AgM=" } }] },
          },
        ],
      };
    })(),
  );

  const response = await POST(createRequest());

  await expect(response.arrayBuffer()).rejects.toThrow(
    "Gemini가 음성 생성을 정상적으로 완료하지 못했습니다. (종료 사유: OTHER)",
  );
  expect(gemini.generateContentStream).toHaveBeenCalledOnce();
});

it.each([
  {
    caseName: "첫 iterator 읽기 오류",
    createResponses: () =>
      (async function* () {
        throw new Error("upstream connection failed");
      })(),
  },
  {
    caseName: "오디오 없는 빈 완료",
    createResponses: () => (async function* () {})(),
  },
])(
  "$caseName에는 첫 오디오 전까지 총 3회 시도하고 한국어 JSON 오류를 반환한다",
  async ({ createResponses }) => {
    vi.useFakeTimers();
    vi.spyOn(console, "error").mockImplementation(() => {});
    gemini.generateContentStream.mockImplementation(async () =>
      createResponses(),
    );

    const responsePromise = POST(createRequest());
    await vi.runAllTimersAsync();
    const response = await responsePromise;

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error:
        "음성 생성 스트림을 시작하지 못했습니다. 잠시 후 다시 시도해 주세요.",
    });
    expect(gemini.generateContentStream).toHaveBeenCalledTimes(3);
    for (const [parameters] of gemini.generateContentStream.mock.calls) {
      const signal = (
        parameters as { config?: { abortSignal?: AbortSignal } }
      ).config?.abortSignal;
      expect(signal).toBeInstanceOf(AbortSignal);
      expect(signal?.aborted).toBe(true);
    }
  },
);

it("429 일일 할당량 오류는 재시도하지 않고 한국어 해결 방법을 반환한다", async () => {
  vi.useFakeTimers();
  vi.spyOn(console, "error").mockImplementation(() => {});
  const quotaError = Object.assign(
    new Error(
      "Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 10, model: gemini-3.1-flash-tts",
    ),
    { status: 429 },
  );
  gemini.generateContentStream.mockRejectedValue(quotaError);

  const responsePromise = POST(createRequest());
  await vi.runAllTimersAsync();
  const response = await responsePromise;

  expect(response.status).toBe(429);
  await expect(response.json()).resolves.toEqual({
    error:
      "Gemini API 요청 할당량을 모두 사용했습니다. 무료 티어는 모델별 일일 요청 한도가 있습니다. 결제 및 할당량 설정을 확인하거나 한도가 초기화된 뒤 다시 시도해 주세요.",
  });
  expect(gemini.generateContentStream).toHaveBeenCalledOnce();
});

it("429 분당 한도는 Google 권장 시간만큼 기다린 뒤 한 번 자동 복구한다", async () => {
  vi.useFakeTimers();
  const rateLimitError = Object.assign(
    new Error(
      '{"error":{"code":429,"details":[{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"2s"}]}}\nQuota exceeded for metric: generativelanguage.googleapis.com/generate_requests_per_model\nquotaId: GenerateRequestsPerMinutePerProjectPerModel',
    ),
    { status: 429 },
  );
  gemini.generateContentStream
    .mockRejectedValueOnce(rateLimitError)
    .mockResolvedValueOnce(audioResponses());

  const responsePromise = POST(createRequest());
  await vi.advanceTimersByTimeAsync(1999);
  expect(gemini.generateContentStream).toHaveBeenCalledOnce();

  await vi.advanceTimersByTimeAsync(1);
  const response = await responsePromise;

  expect(response.status).toBe(200);
  expect(
    Array.from(new Uint8Array(await response.arrayBuffer())),
  ).toEqual([0, 1]);
  expect(gemini.generateContentStream).toHaveBeenCalledTimes(2);
});

it("구조화된 RetryInfo가 없으면 오류 메시지의 권장 시간을 사용한다", async () => {
  vi.useFakeTimers();
  const rateLimitError = Object.assign(
    new Error(
      "Quota exceeded for metric: generativelanguage.googleapis.com/generate_requests_per_model. Please retry in 3.5s.",
    ),
    { status: 429 },
  );
  gemini.generateContentStream
    .mockRejectedValueOnce(rateLimitError)
    .mockResolvedValueOnce(audioResponses());

  const responsePromise = POST(createRequest());
  await vi.advanceTimersByTimeAsync(3499);
  expect(gemini.generateContentStream).toHaveBeenCalledOnce();

  await vi.advanceTimersByTimeAsync(1);
  const response = await responsePromise;

  expect(response.status).toBe(200);
  expect(gemini.generateContentStream).toHaveBeenCalledTimes(2);
});

it("자동 복구 뒤에도 분당 한도면 권장 대기 시간을 안내하고 중단한다", async () => {
  vi.useFakeTimers();
  vi.spyOn(console, "error").mockImplementation(() => {});
  const rateLimitError = Object.assign(
    new Error(
      '{"retryDelay":"2s"}\nQuota exceeded for metric: generativelanguage.googleapis.com/generate_requests_per_model',
    ),
    { status: 429 },
  );
  gemini.generateContentStream.mockRejectedValue(rateLimitError);

  const responsePromise = POST(createRequest());
  await vi.advanceTimersByTimeAsync(2000);
  const response = await responsePromise;

  expect(response.status).toBe(429);
  await expect(response.json()).resolves.toEqual({
    error:
      "Gemini API 요청이 계속 제한되고 있습니다. 2초 뒤 다시 시도해 주세요.",
  });
  expect(gemini.generateContentStream).toHaveBeenCalledTimes(2);
});

it.each(["0.5s", "66s"])(
  "분당 한도의 비정상 재시도 시간 %s는 자동 실행하지 않는다",
  async (retryDelay) => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const rateLimitError = Object.assign(
      new Error(
        `{"retryDelay":"${retryDelay}"}\nQuota exceeded for metric: generativelanguage.googleapis.com/generate_requests_per_model`,
      ),
      { status: 429 },
    );
    gemini.generateContentStream.mockRejectedValue(rateLimitError);

    const response = await POST(createRequest());

    expect(response.status).toBe(429);
    expect(gemini.generateContentStream).toHaveBeenCalledOnce();
  },
);

it("분당 한도 자동 대기 중 요청을 취소하면 재시도하지 않는다", async () => {
  vi.useFakeTimers();
  vi.spyOn(console, "error").mockImplementation(() => {});
  const requestController = new AbortController();
  const rateLimitError = Object.assign(
    new Error(
      '{"retryDelay":"30s"}\nQuota exceeded for metric: generativelanguage.googleapis.com/generate_requests_per_model',
    ),
    { status: 429 },
  );
  gemini.generateContentStream.mockRejectedValue(rateLimitError);

  const responsePromise = POST(createRequest(requestController.signal));
  await vi.advanceTimersByTimeAsync(1000);
  requestController.abort(new DOMException("요청 취소", "AbortError"));
  const response = await responsePromise;

  expect(response.status).toBe(500);
  expect(gemini.generateContentStream).toHaveBeenCalledOnce();
});

it("첫 오디오 전에 요청을 취소하면 현재 SDK iterator만 정리하고 종료한다", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  const requestController = new AbortController();
  let sdkSignal: AbortSignal | undefined;
  let markPending!: () => void;
  const pending = new Promise<void>((resolve) => {
    markPending = resolve;
  });
  let returnCallCount = 0;

  gemini.generateContentStream.mockImplementation(async (parameters) => {
    sdkSignal = (
      parameters as { config?: { abortSignal?: AbortSignal } }
    ).config?.abortSignal;

    async function* pendingResponses() {
      await new Promise<void>((_resolve, reject) => {
        if (sdkSignal?.aborted) {
          reject(sdkSignal.reason);
          return;
        }
        sdkSignal?.addEventListener("abort", () => reject(sdkSignal?.reason), {
          once: true,
        });
        markPending();
      });
    }

    const nativeIterator = pendingResponses();
    return {
      [Symbol.asyncIterator]() {
        return {
          next: () => nativeIterator.next(),
          return: async () => {
            returnCallCount += 1;
            return nativeIterator.return(undefined);
          },
        };
      },
    };
  });

  const responsePromise = POST(createRequest(requestController.signal));
  await pending;
  requestController.abort(new DOMException("요청 취소", "AbortError"));

  let timeout: ReturnType<typeof setTimeout> | undefined;
  const outcome = await Promise.race([
    responsePromise.then(() => "settled" as const),
    new Promise<"timeout">((resolve) => {
      timeout = setTimeout(() => resolve("timeout"), 250);
    }),
  ]);
  if (timeout) {
    clearTimeout(timeout);
  }

  expect(outcome).toBe("settled");
  expect(sdkSignal?.aborted).toBe(true);
  expect(gemini.generateContentStream).toHaveBeenCalledOnce();
  expect(returnCallCount).toBe(1);
});

it("완료된 단일 요청의 body는 안전하게 취소할 수 있다", async () => {
  let sdkSignal: AbortSignal | undefined;
  let returnCallCount = 0;

  gemini.generateContentStream.mockImplementation(async (parameters) => {
    sdkSignal = (
      parameters as { config?: { abortSignal?: AbortSignal } }
    ).config?.abortSignal;

    async function* streamingResponses() {
      try {
        yield {
          candidates: [{
            finishReason: "STOP",
            content: { parts: [{ inlineData: { data: "AAE=" } }] },
          }],
        };
      } finally {
        returnCallCount += 1;
      }
    }

    return streamingResponses();
  });

  const longText = `${"가".repeat(290)}. ${"나".repeat(20)}.`;
  const response = await POST(createRequest(undefined, longText));
  const reader = response.body?.getReader();
  if (!reader) throw new Error("응답 스트림 reader가 없습니다.");
  await expect(reader.read()).resolves.toEqual({
    done: false,
    value: Uint8Array.from([0, 1]),
  });

  await reader.cancel();

  expect(sdkSignal?.aborted).toBe(false);
  expect(returnCallCount).toBe(1);
  expect(gemini.generateContentStream).toHaveBeenCalledOnce();
});
