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

it("긴 원고를 문장 경계로 나누어 PCM을 요청 순서대로 결합한다", async () => {
  const firstTranscript = `${"가".repeat(290)}.`;
  const secondTranscript = `${"나".repeat(20)}.`;
  gemini.generateContentStream
    .mockResolvedValueOnce(
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
    )
    .mockResolvedValueOnce(
      (async function* () {
        yield {
          candidates: [
            {
              finishReason: "STOP",
              content: { parts: [{ inlineData: { data: "AgM=" } }] },
            },
          ],
        };
      })(),
    );

  const response = await POST(
    createRequest(undefined, `${firstTranscript} ${secondTranscript}`),
  );

  expect(
    Array.from(new Uint8Array(await response.arrayBuffer())),
  ).toEqual([0, 1, 2, 3]);
  expect(gemini.generateContentStream).toHaveBeenCalledTimes(2);

  const prompts = gemini.generateContentStream.mock.calls.map(
    ([parameters]) =>
      (
        parameters as {
          contents: Array<{ parts: Array<{ text: string }> }>;
        }
      ).contents[0].parts[0].text,
  );
  expect(prompts[0]).toContain(`#### TRANSCRIPT\n${firstTranscript}`);
  expect(prompts[0]).not.toContain(secondTranscript);
  expect(prompts[1]).toContain(`#### TRANSCRIPT\n${secondTranscript}`);
  expect(prompts[1]).not.toContain(firstTranscript);
});

it("후속 원고 조각이 출력 한도로 종료되면 완성 스트림을 거부한다", async () => {
  const firstTranscript = `${"가".repeat(290)}.`;
  const secondTranscript = `${"나".repeat(20)}.`;
  gemini.generateContentStream
    .mockResolvedValueOnce(
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
    )
    .mockResolvedValueOnce(
      (async function* () {
        yield {
          candidates: [
            {
              finishReason: "MAX_TOKENS",
              content: { parts: [{ inlineData: { data: "AgM=" } }] },
            },
          ],
        };
      })(),
    );

  const response = await POST(
    createRequest(undefined, `${firstTranscript} ${secondTranscript}`),
  );

  await expect(response.arrayBuffer()).rejects.toThrow(
    "출력 한도에 도달해 음성이 중간에 잘렸습니다.",
  );
});

it("일부 오디오 뒤 OTHER로 종료된 조각은 잘린 PCM을 버리고 자동 재시도한다", async () => {
  vi.useFakeTimers();
  gemini.generateContentStream
    .mockResolvedValueOnce(
      (async function* () {
        yield {
          candidates: [
            {
              finishReason: "OTHER",
              content: { parts: [{ inlineData: { data: "AAE=" } }] },
            },
          ],
        };
      })(),
    )
    .mockResolvedValueOnce(
      (async function* () {
        yield {
          candidates: [
            {
              finishReason: "STOP",
              content: { parts: [{ inlineData: { data: "AgM=" } }] },
            },
          ],
        };
      })(),
    );

  const responsePromise = POST(createRequest());
  await vi.runAllTimersAsync();
  const response = await responsePromise;

  expect(
    Array.from(new Uint8Array(await response.arrayBuffer())),
  ).toEqual([2, 3]);
  expect(gemini.generateContentStream).toHaveBeenCalledTimes(2);
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
      "Gemini API 요청 할당량을 모두 사용했습니다. 무료 티어는 모델별 일일 요청 한도가 있으며, 장문 원고는 300자 조각마다 요청 1회를 사용합니다. 결제 및 할당량 설정을 확인하거나 한도가 초기화된 뒤 다시 시도해 주세요.",
  });
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

it("완료된 조각들로 만든 body는 안전하게 취소할 수 있다", async () => {
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
  expect(returnCallCount).toBe(2);
  expect(gemini.generateContentStream).toHaveBeenCalledTimes(2);
});
