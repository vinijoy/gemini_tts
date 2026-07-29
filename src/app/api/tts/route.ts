import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, type GenerateContentResponse } from "@google/genai";
import fs from "fs";
import path from "path";
import { prepareSequentialPcmStream } from "./stream";
import { splitTranscript } from "./transcript";

// API 키 로드 로직 (기존 유지)
let apiKey = process.env.GEMINI_API_KEY;
try {
  const envPath = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    const match = envContent.match(/GEMINI_API_KEY=(.*)/);
    if (match && match[1]) {
      apiKey = match[1].trim();
    }
  }
} catch (e) {
  console.error(".env.local 파일 읽기 실패:", e);
}

const ai = new GoogleGenAI({ apiKey: apiKey });

interface TtsRequestBody {
  text?: string;
  voice?: string;
  stylePrompt?: string;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "음성 생성 중 알 수 없는 오류가 발생했습니다.";
}

const STREAM_START_ERROR =
  "음성 생성 스트림을 시작하지 못했습니다. 잠시 후 다시 시도해 주세요.";
const REQUEST_ABORT_ERROR = "음성 생성 요청이 취소되었습니다.";

function createRequestAbortError(cause?: unknown): Error {
  return new Error(REQUEST_ABORT_ERROR, { cause });
}

function linkRequestAbort(
  requestSignal: AbortSignal,
  attemptController: AbortController,
): () => void {
  const abortAttempt = () => {
    attemptController.abort(requestSignal.reason);
  };

  if (requestSignal.aborted) {
    abortAttempt();
  } else {
    requestSignal.addEventListener("abort", abortAttempt, { once: true });
  }

  return () => {
    requestSignal.removeEventListener("abort", abortAttempt);
  };
}

function responseContainsAudio(response: GenerateContentResponse): boolean {
  return (response.candidates ?? []).some((candidate) =>
    (candidate.content?.parts ?? []).some(
      (part) => Boolean(part.inlineData?.data),
    ),
  );
}

async function waitForRetry(
  delayMs: number,
  requestSignal: AbortSignal,
  streamSignal?: AbortSignal,
): Promise<void> {
  const abortReason = () =>
    requestSignal.reason ?? streamSignal?.reason;
  if (requestSignal.aborted || streamSignal?.aborted) {
    throw createRequestAbortError(abortReason());
  }

  await new Promise<void>((resolve, reject) => {
    let settled = false;
    const finish = (error?: Error) => {
      if (settled) {
        return;
      }

      settled = true;
      clearTimeout(timeout);
      requestSignal.removeEventListener("abort", handleAbort);
      streamSignal?.removeEventListener("abort", handleAbort);
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    };
    const handleAbort = () => {
      finish(createRequestAbortError(abortReason()));
    };
    const timeout = setTimeout(() => finish(), delayMs);

    requestSignal.addEventListener("abort", handleAbort, { once: true });
    streamSignal?.addEventListener("abort", handleAbort, { once: true });
    if (requestSignal.aborted || streamSignal?.aborted) {
      handleAbort();
    }
  });
}

function createPrompt(transcript: string, stylePrompt?: string): string {
  let instructions =
    "Synthesize speech for the performance defined below.\nThe profile, scene, and performance notes are direction only. Do NOT speak them.\nSpeak ONLY the lines under #### TRANSCRIPT.";

  if (stylePrompt?.trim()) {
    instructions += `\n\nPerformance Notes: ${stylePrompt.trim()}`;
  }

  return `${instructions}\n\n#### TRANSCRIPT\n${transcript}`;
}

function createRetriedAudioSource(
  transcript: string,
  selectedVoice: string,
  stylePrompt: string | undefined,
  requestSignal: AbortSignal,
  streamSignal: AbortSignal,
): AsyncIterable<GenerateContentResponse> {
  return {
    async *[Symbol.asyncIterator]() {
      const maxRetries = 2;

      for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
        const attemptController = new AbortController();
        const unlinkRequestAbort = linkRequestAbort(
          requestSignal,
          attemptController,
        );
        const unlinkStreamAbort = linkRequestAbort(
          streamSignal,
          attemptController,
        );
        let iterator:
          | AsyncIterator<GenerateContentResponse>
          | undefined;
        let iteratorFinished = false;
        let emittedAudio = false;
        let completedSuccessfully = false;

        try {
          if (requestSignal.aborted || streamSignal.aborted) {
            throw createRequestAbortError(
              requestSignal.reason ?? streamSignal.reason,
            );
          }

          const responses = await ai.models.generateContentStream({
            model: "gemini-3.1-flash-tts-preview",
            contents: [
              {
                role: "user",
                parts: [{ text: createPrompt(transcript, stylePrompt) }],
              },
            ],
            config: {
              abortSignal: attemptController.signal,
              responseModalities: ["AUDIO"],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: selectedVoice,
                  },
                },
              },
            },
          });
          iterator = responses[Symbol.asyncIterator]();

          while (true) {
            const result = await iterator.next();
            if (result.done) {
              iteratorFinished = true;
              if (!emittedAudio) {
                throw new Error("오디오 데이터가 없습니다.");
              }
              completedSuccessfully = true;
              return;
            }

            if (responseContainsAudio(result.value)) {
              emittedAudio = true;
            }
            yield result.value;
          }
        } catch (error) {
          if (requestSignal.aborted || streamSignal.aborted) {
            throw createRequestAbortError(error);
          }
          if (emittedAudio) {
            throw error;
          }
          if (attempt >= maxRetries) {
            throw new Error(STREAM_START_ERROR, { cause: error });
          }
        } finally {
          unlinkRequestAbort();
          unlinkStreamAbort();
          if (iterator && !iteratorFinished) {
            try {
              await iterator.return?.();
            } catch {
              // 생성 또는 전송 오류를 iterator 정리 오류로 덮어쓰지 않는다.
            }
          }
          if (!completedSuccessfully) {
            attemptController.abort();
          }
        }

        await waitForRetry(
          1000 * (attempt + 1),
          requestSignal,
          streamSignal,
        );
      }
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as TtsRequestBody;
    const { text, voice, stylePrompt } = body;

    if (!text) {
      return NextResponse.json(
        { error: "텍스트가 입력되지 않았습니다." },
        { status: 400 }
      );
    }

    const selectedVoice = voice || "Puck";
    const streamController = new AbortController();
    const abortStream = () => streamController.abort(req.signal.reason);
    if (req.signal.aborted) {
      abortStream();
    } else {
      req.signal.addEventListener("abort", abortStream, { once: true });
    }
    const sources = splitTranscript(text).map((transcript) =>
      createRetriedAudioSource(
        transcript,
        selectedVoice,
        stylePrompt,
        req.signal,
        streamController.signal,
      ),
    );
    const stream = await prepareSequentialPcmStream(
      sources,
      streamController,
    );

    return new Response(stream, {
      headers: {
        "Content-Type": "application/octet-stream",
        "X-Audio-Encoding": "PCM_S16LE",
        "X-Audio-Sample-Rate": "24000",
        "X-Audio-Channels": "1",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-store, no-transform",
      },
    });
  } catch (error: unknown) {
    console.error("TTS API Error:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
