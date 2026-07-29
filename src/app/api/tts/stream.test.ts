import { expect, it } from "vitest";
import { createPcmStream } from "./stream";

async function* responses() {
  yield {
    candidates: [{ content: { parts: [{ inlineData: { data: "AAE=" } }] } }],
  };
  yield {
    candidates: [{ content: { parts: [{ inlineData: { data: "AgM=" } }] } }],
  };
}

it("Gemini 오디오 청크를 순서대로 바이너리 스트림에 전달한다", async () => {
  const response = new Response(createPcmStream(responses()));

  expect(Array.from(new Uint8Array(await response.arrayBuffer()))).toEqual([
    0, 1, 2, 3,
  ]);
});

it("각 응답의 모든 후보와 part에 있는 오디오를 순서대로 전달한다", async () => {
  async function* multipartResponses() {
    yield {
      candidates: [
        {
          content: {
            parts: [
              { text: "audio follows" },
              { inlineData: { data: "AAE=" } },
              { inlineData: { data: "AgM=" } },
            ],
          },
        },
        {
          content: {
            parts: [{ inlineData: { data: "BAU=" } }],
          },
        },
      ],
    };
  }

  const response = new Response(createPcmStream(multipartResponses()));

  expect(Array.from(new Uint8Array(await response.arrayBuffer()))).toEqual([
    0, 1, 2, 3, 4, 5,
  ]);
});

it("오디오 데이터가 하나도 없으면 스트림 오류를 발생시킨다", async () => {
  async function* emptyResponses() {
    yield {
      candidates: [{ content: { parts: [{ text: "no audio" }] } }],
    };
  }

  const reader = createPcmStream(emptyResponses()).getReader();

  await expect(reader.read()).rejects.toThrow("오디오 데이터가 없습니다.");
});

it("소비자가 스트림을 취소하면 Gemini iterator를 종료한다", async () => {
  const firstResponse = {
    candidates: [{ content: { parts: [{ inlineData: { data: "AAE=" } }] } }],
  };
  let nextCallCount = 0;
  let iteratorReturned = false;
  let finishPendingRead:
    | ((result: IteratorResult<typeof firstResponse>) => void)
    | undefined;

  const iterator: AsyncIterator<typeof firstResponse> = {
    next() {
      nextCallCount += 1;
      if (nextCallCount === 1) {
        return Promise.resolve({ done: false, value: firstResponse });
      }
      return new Promise((resolve) => {
        finishPendingRead = resolve;
      });
    },
    async return() {
      iteratorReturned = true;
      finishPendingRead?.({ done: true, value: undefined });
      return { done: true, value: undefined };
    },
  };
  const source: AsyncIterable<typeof firstResponse> = {
    [Symbol.asyncIterator]: () => iterator,
  };
  const reader = createPcmStream(source).getReader();

  await reader.read();
  await reader.cancel();

  try {
    expect(iteratorReturned).toBe(true);
  } finally {
    if (!iteratorReturned) {
      await iterator.return?.();
    }
  }
});

it("Gemini iterator 오류를 그대로 전파하면서 iterator를 정리한다", async () => {
  const streamError = new Error("Gemini 스트림 연결이 끊겼습니다.");
  let iteratorReturned = false;
  const source: AsyncIterable<{ candidates: [] }> = {
    [Symbol.asyncIterator]() {
      return {
        async next() {
          throw streamError;
        },
        async return() {
          iteratorReturned = true;
          throw new Error("iterator 정리 실패");
        },
      };
    },
  };
  const reader = createPcmStream(source).getReader();

  await expect(reader.read()).rejects.toBe(streamError);
  expect(iteratorReturned).toBe(true);
});
