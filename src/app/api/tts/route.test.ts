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

function createRequest(): NextRequest {
  return new NextRequest("http://localhost/api/tts", {
    method: "POST",
    body: JSON.stringify({ text: "안녕하세요", voice: "Puck" }),
    headers: { "Content-Type": "application/json" },
  });
}

async function* audioResponses() {
  yield {
    candidates: [{ content: { parts: [{ inlineData: { data: "AAE=" } }] } }],
  };
}

it("S16LE PCM 스트림 계약 헤더와 본문을 반환한다", async () => {
  gemini.generateContentStream.mockResolvedValue(audioResponses());

  const response = await POST(createRequest());

  expect(response.status).toBe(200);
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
