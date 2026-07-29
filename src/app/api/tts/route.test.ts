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
  vi.clearAllMocks();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

function createRequest(signal?: AbortSignal): NextRequest {
  return new NextRequest("http://localhost/api/tts", {
    method: "POST",
    body: JSON.stringify({ text: "안녕하세요", voice: "Puck" }),
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
  requestController.abort();

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
