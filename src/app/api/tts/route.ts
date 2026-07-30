import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, type GenerateContentResponse } from "@google/genai";
import fs from "fs";
import path from "path";
import { preparePcmStream } from "./stream";

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

class TtsHttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
    cause?: unknown,
    readonly retryAfterMs: number | null = null,
  ) {
    super(message, { cause });
    this.name = "TtsHttpError";
  }
}

class TtsCompletionError extends Error {
  constructor(
    message: string,
    readonly retryable: boolean,
  ) {
    super(message);
    this.name = "TtsCompletionError";
  }
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "음성 생성 중 알 수 없는 오류가 발생했습니다.";
}

const STREAM_START_ERROR =
  "음성 생성 스트림을 시작하지 못했습니다. 잠시 후 다시 시도해 주세요.";
const MAX_TEXT_LENGTH = 1000;
const TEXT_TOO_LONG_ERROR = "텍스트는 최대 1,000자까지 입력할 수 있습니다.";
const REQUEST_ABORT_ERROR = "음성 생성 요청이 취소되었습니다.";
const DAILY_QUOTA_ERROR =
  "Gemini API 요청 할당량을 모두 사용했습니다. 무료 티어는 모델별 일일 요청 한도가 있습니다. 결제 및 할당량 설정을 확인하거나 한도가 초기화된 뒤 다시 시도해 주세요.";
const RATE_LIMIT_ERROR =
  "Gemini API 요청이 잠시 제한되었습니다. 잠시 기다린 뒤 다시 시도해 주세요.";
const MIN_RATE_LIMIT_RETRY_MS = 1000;
const MAX_RATE_LIMIT_RETRY_MS = 65_000;

function getExternalErrorDetails(error: unknown): string {
  const details: string[] = [];
  let current = error;

  for (let depth = 0; depth < 4 && current; depth += 1) {
    if (current instanceof Error) {
      details.push(current.message);
      current = current.cause;
      continue;
    }
    if (typeof current === "object") {
      const data = current as { cause?: unknown; message?: unknown };
      if (typeof data.message === "string") {
        details.push(data.message);
      }
      current = data.cause;
      continue;
    }
    break;
  }

  return details.join("\n");
}

function getExternalErrorStatus(error: unknown): number | null {
  let current = error;

  for (let depth = 0; depth < 4 && current; depth += 1) {
    if (typeof current !== "object") break;
    const data = current as {
      cause?: unknown;
      code?: unknown;
      status?: unknown;
    };
    if (data.status === 429 || data.code === 429) return 429;
    current = data.cause;
  }

  return null;
}

function createQuotaError(error: unknown): TtsHttpError | null {
  if (getExternalErrorStatus(error) !== 429) {
    return null;
  }

  const details = getExternalErrorDetails(error);
  const isDailyFreeTierLimit =
    /generate_content_free_tier_requests|GenerateRequestsPerDay/i.test(
      details,
    );
  const isPerMinuteLimit =
    /generate_requests_per_model|GenerateRequestsPerMinutePerProjectPerModel/i.test(
      details,
    );
  const retryDelayMatch =
    details.match(/"retryDelay"\s*:\s*"([0-9]+(?:\.[0-9]+)?)s"/i) ??
    details.match(/Please retry in ([0-9]+(?:\.[0-9]+)?)s/i);
  const parsedRetryMs = retryDelayMatch
    ? Number.parseFloat(retryDelayMatch[1]) * 1000
    : Number.NaN;
  const retryAfterMs =
    isPerMinuteLimit &&
    Number.isFinite(parsedRetryMs) &&
    parsedRetryMs >= MIN_RATE_LIMIT_RETRY_MS &&
    parsedRetryMs <= MAX_RATE_LIMIT_RETRY_MS
      ? parsedRetryMs
      : null;

  return new TtsHttpError(
    429,
    isDailyFreeTierLimit ? DAILY_QUOTA_ERROR : RATE_LIMIT_ERROR,
    error,
    retryAfterMs,
  );
}

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

function getCompletionError(
  response: GenerateContentResponse,
): TtsCompletionError | null {
  for (const candidate of response.candidates ?? []) {
    const finishReason = candidate.finishReason;
    if (!finishReason || finishReason === "STOP") {
      continue;
    }
    if (finishReason === "MAX_TOKENS") {
      return new TtsCompletionError(
        "출력 한도에 도달해 음성이 중간에 잘렸습니다. 원고를 더 작은 단위로 나누어 다시 생성해 주세요.",
        false,
      );
    }
    return new TtsCompletionError(
      `Gemini가 음성 생성을 정상적으로 완료하지 못했습니다. (종료 사유: ${finishReason})`,
      finishReason === "OTHER",
    );
  }

  return null;
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
      let retryCount = 0;
      let rateLimitRetryCount = 0;

      while (true) {
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
        let retryDelayMs: number | null = null;

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
            const completionError = getCompletionError(result.value);
            // 단일 Gemini 요청의 PCM은 도착 즉시 브라우저로 전달한다.
            // 종료 사유는 해당 응답을 전송한 다음 검사해 이미 받은 음성을 지연시키지 않는다.
            yield result.value;
            if (completionError) {
              throw completionError;
            }
          }
        } catch (error) {
          if (requestSignal.aborted || streamSignal.aborted) {
            throw createRequestAbortError(error);
          }
          const quotaError = createQuotaError(error);
          if (quotaError) {
            if (
              !emittedAudio &&
              quotaError.retryAfterMs !== null &&
              rateLimitRetryCount === 0
            ) {
              rateLimitRetryCount += 1;
              retryDelayMs = quotaError.retryAfterMs;
            } else {
              if (
                rateLimitRetryCount > 0 &&
                quotaError.retryAfterMs !== null
              ) {
                const retryAfterSeconds = Math.ceil(
                  quotaError.retryAfterMs / 1000,
                );
                throw new TtsHttpError(
                  429,
                  `Gemini API 요청이 계속 제한되고 있습니다. ${retryAfterSeconds}초 뒤 다시 시도해 주세요.`,
                  quotaError,
                );
              }
              throw quotaError;
            }
          } else if (emittedAudio) {
            throw error;
          } else if (
            error instanceof TtsCompletionError &&
            !error.retryable
          ) {
            throw error;
          } else if (retryCount >= maxRetries) {
            throw new Error(STREAM_START_ERROR, { cause: error });
          } else {
            retryCount += 1;
            retryDelayMs = 1000 * retryCount;
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

        if (retryDelayMs !== null) {
          await waitForRetry(retryDelayMs, requestSignal, streamSignal);
        }
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
    if (text.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        { error: TEXT_TOO_LONG_ERROR },
        { status: 400 },
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
    const source = createRetriedAudioSource(
      text,
      selectedVoice,
      stylePrompt,
      req.signal,
      streamController.signal,
    );
    const stream = await preparePcmStream(
      source,
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
    if (error instanceof TtsHttpError) {
      console.error(`TTS API Error (${error.status}): ${error.message}`);
    } else {
      console.error("TTS API Error:", error);
    }
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: error instanceof TtsHttpError ? error.status : 500 },
    );
  }
}
