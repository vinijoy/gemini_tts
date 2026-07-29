import type { GenerateContentResponse } from "@google/genai";

type AudioResponse = Pick<GenerateContentResponse, "candidates">;

const BASE64_PATTERN =
  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

function decodeAudioData(data: string): Uint8Array {
  if (!BASE64_PATTERN.test(data)) {
    throw new Error("오디오 데이터의 Base64 형식이 올바르지 않습니다.");
  }

  const decoded = Buffer.from(data, "base64");
  if (decoded.toString("base64") !== data) {
    throw new Error("오디오 데이터의 Base64 형식이 올바르지 않습니다.");
  }

  return Uint8Array.from(decoded);
}

function extractAudioChunks(response: AudioResponse): Uint8Array[] {
  const chunks: Uint8Array[] = [];

  for (const candidate of response.candidates ?? []) {
    for (const part of candidate.content?.parts ?? []) {
      const data = part.inlineData?.data;
      if (!data) {
        continue;
      }

      const chunk = decodeAudioData(data);
      if (chunk.byteLength > 0) {
        chunks.push(chunk);
      }
    }
  }

  return chunks;
}

function getFinishError(response: AudioResponse): Error | null {
  for (const candidate of response.candidates ?? []) {
    const finishReason = candidate.finishReason;
    if (!finishReason || finishReason === "STOP") {
      continue;
    }
    if (finishReason === "MAX_TOKENS") {
      return new Error(
        "출력 한도에 도달해 음성이 중간에 잘렸습니다. 원고를 더 작은 단위로 나누어 다시 생성해 주세요.",
      );
    }
    return new Error(
      `Gemini가 음성 생성을 정상적으로 완료하지 못했습니다. (종료 사유: ${finishReason})`,
    );
  }

  return null;
}

function createPcmStreamFromIterator(
  iterator: AsyncIterator<AudioResponse>,
  initialChunks: Uint8Array[],
  abortController?: AbortController,
  initialFinishError: Error | null = null,
): ReadableStream<Uint8Array> {
  const pendingChunks = [...initialChunks];
  let finishError = initialFinishError;
  let emittedAudio = false;
  let totalByteLength = pendingChunks.reduce(
    (total, chunk) => total + chunk.byteLength,
    0,
  );
  let finished = false;
  let iteratorClose: Promise<void> | undefined;

  function closeIterator(): Promise<void> {
    iteratorClose ??= (async () => {
      abortController?.abort();
      await iterator.return?.();
    })();
    return iteratorClose;
  }

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        while (pendingChunks.length === 0) {
          if (finishError) {
            throw finishError;
          }

          const result = await iterator.next();

          if (finished) {
            return;
          }

          if (result.done) {
            finished = true;
            if (!emittedAudio) {
              controller.error(new Error("오디오 데이터가 없습니다."));
            } else if (totalByteLength % 2 !== 0) {
              controller.error(
                new Error(
                  "PCM 오디오 데이터가 16비트 샘플 경계로 끝나지 않았습니다.",
                ),
              );
            } else {
              controller.close();
            }
            return;
          }

          const chunks = extractAudioChunks(result.value);
          finishError = getFinishError(result.value);
          for (const chunk of chunks) {
            pendingChunks.push(chunk);
            totalByteLength += chunk.byteLength;
          }
        }

        const chunk = pendingChunks.shift();
        if (chunk) {
          emittedAudio = true;
          controller.enqueue(chunk);
        }
      } catch (error) {
        if (finished) {
          return;
        }

        finished = true;
        try {
          await closeIterator();
        } catch {
          // 원본 스트림 오류를 iterator 정리 오류로 덮어쓰지 않는다.
        }
        controller.error(error);
      }
    },
    async cancel() {
      if (finished) {
        return;
      }

      finished = true;
      pendingChunks.length = 0;
      await closeIterator();
    },
  });
}

export function createPcmStream(
  responses: AsyncIterable<AudioResponse>,
  abortController?: AbortController,
): ReadableStream<Uint8Array> {
  return createPcmStreamFromIterator(
    responses[Symbol.asyncIterator](),
    [],
    abortController,
  );
}

export function createSequentialPcmStream(
  sources: AsyncIterable<AudioResponse>[],
  abortController?: AbortController,
): ReadableStream<Uint8Array> {
  async function* sequentialResponses(): AsyncGenerator<AudioResponse> {
    for (let index = 0; index < sources.length; index += 1) {
      let emittedAudio = false;
      let sourceByteLength = 0;

      for await (const response of sources[index]) {
        const chunks = extractAudioChunks(response);
        if (chunks.length > 0) {
          emittedAudio = true;
          sourceByteLength += chunks.reduce(
            (total, chunk) => total + chunk.byteLength,
            0,
          );
        }
        yield response;
      }

      if (!emittedAudio) {
        throw new Error(
          `${index + 1}번째 원고 조각에서 오디오 데이터가 생성되지 않았습니다.`,
        );
      }
      if (sourceByteLength % 2 !== 0) {
        throw new Error(
          `${index + 1}번째 원고 조각의 PCM 데이터가 16비트 샘플 경계로 끝나지 않았습니다.`,
        );
      }
    }
  }

  return createPcmStream(sequentialResponses(), abortController);
}

export async function preparePcmStream(
  responses: AsyncIterable<AudioResponse>,
  abortController: AbortController,
): Promise<ReadableStream<Uint8Array>> {
  const iterator = responses[Symbol.asyncIterator]();

  try {
    while (true) {
      const result = await iterator.next();
      if (result.done) {
        throw new Error("오디오 데이터가 없습니다.");
      }

      const chunks = extractAudioChunks(result.value);
      if (chunks.length > 0) {
        return createPcmStreamFromIterator(
          iterator,
          chunks,
          abortController,
          getFinishError(result.value),
        );
      }

      const finishError = getFinishError(result.value);
      if (finishError) {
        throw finishError;
      }
    }
  } catch (error) {
    abortController.abort();
    try {
      await iterator.return?.();
    } catch {
      // 첫 오디오 오류를 iterator 정리 오류로 덮어쓰지 않는다.
    }
    throw error;
  }
}
