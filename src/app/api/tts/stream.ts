import type { GenerateContentResponse } from "@google/genai";

type AudioResponse = Pick<GenerateContentResponse, "candidates">;

export function createPcmStream(
  responses: AsyncIterable<AudioResponse>,
): ReadableStream<Uint8Array> {
  const iterator = responses[Symbol.asyncIterator]();
  const pendingChunks: Uint8Array[] = [];
  let emittedAudio = false;
  let finished = false;
  let iteratorClose: Promise<void> | undefined;

  function closeIterator(): Promise<void> {
    iteratorClose ??= (async () => {
      await iterator.return?.();
    })();
    return iteratorClose;
  }

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        while (pendingChunks.length === 0) {
          const result = await iterator.next();

          if (finished) {
            return;
          }

          if (result.done) {
            finished = true;
            if (!emittedAudio) {
              controller.error(new Error("오디오 데이터가 없습니다."));
            } else {
              controller.close();
            }
            return;
          }

          for (const candidate of result.value.candidates ?? []) {
            for (const part of candidate.content?.parts ?? []) {
              const data = part.inlineData?.data;
              if (data) {
                pendingChunks.push(Buffer.from(data, "base64"));
              }
            }
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
