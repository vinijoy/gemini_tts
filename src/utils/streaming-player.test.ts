import { describe, expect, it, vi } from "vitest";
import { StreamingPcmPlayer } from "./streaming-player";

type FakeAudioContext = {
  readonly destination: AudioDestinationNode;
  readonly sources: AudioBufferSourceNode[];
  readonly startTimes: number[];
  currentTime: number;
  state: AudioContextState;
  close: ReturnType<typeof vi.fn>;
  createBuffer: ReturnType<typeof vi.fn>;
  createBufferSource: ReturnType<typeof vi.fn>;
  resume: ReturnType<typeof vi.fn>;
};

type FakeAudioContextOptions = {
  currentTime: number;
  close?: () => Promise<void>;
  resume?: () => Promise<void>;
  stop?: (sourceIndex: number) => void;
};

function createDeferred(): {
  promise: Promise<void>;
  resolve: () => void;
} {
  let resolve!: () => void;
  const promise = new Promise<void>((complete) => {
    resolve = complete;
  });

  return { promise, resolve };
}

function createFakeAudioContext({
  currentTime,
  close: closeOverride,
  resume: resumeOverride,
  stop: stopOverride,
}: FakeAudioContextOptions): FakeAudioContext {
  const sources: AudioBufferSourceNode[] = [];
  const startTimes: number[] = [];
  const context: FakeAudioContext = {
    currentTime,
    state: "suspended",
    destination: {} as AudioDestinationNode,
    sources,
    startTimes,
    resume: vi.fn(async () => {
      await resumeOverride?.();
      context.state = "running";
    }),
    close: vi.fn(async () => {
      await closeOverride?.();
      context.state = "closed";
    }),
    createBuffer: vi.fn((_channels, length, sampleRate) => ({
      duration: length / sampleRate,
      copyToChannel: vi.fn(),
    })),
    createBufferSource: vi.fn(() => {
      const sourceIndex = sources.length;
      const source = {
        buffer: null,
        connect: vi.fn(),
        start: vi.fn((when: number) => startTimes.push(when)),
        stop: vi.fn(() => stopOverride?.(sourceIndex)),
        onended: null,
      } as unknown as AudioBufferSourceNode;
      sources.push(source);
      return source;
    }),
  };

  return context;
}

describe("StreamingPcmPlayer", () => {
  it("두 PCM 청크를 앞선 청크 종료 시각에 이어 예약한다", async () => {
    const context = createFakeAudioContext({ currentTime: 10 });
    const player = new StreamingPcmPlayer(
      () => context as unknown as AudioContext,
      24000,
    );

    await player.enqueue(Int16Array.from([0, 32767]));
    await player.enqueue(Int16Array.from([-32768, 0]));

    expect(context.startTimes).toEqual([10, 10 + 2 / 24000]);
    expect(context.resume).toHaveBeenCalledOnce();
  });

  it("resume 중 요청된 close는 예약을 마친 뒤에 컨텍스트를 닫는다", async () => {
    const resume = createDeferred();
    const context = createFakeAudioContext({
      currentTime: 0,
      resume: () => resume.promise,
    });
    const player = new StreamingPcmPlayer(
      () => context as unknown as AudioContext,
      24000,
    );

    const enqueue = player.enqueue(Int16Array.from([0, 0]));
    await vi.waitFor(() => expect(context.resume).toHaveBeenCalledOnce());
    const close = player.close();

    expect(context.close).not.toHaveBeenCalled();
    resume.resolve();
    await Promise.all([enqueue, close]);

    expect(context.sources).toHaveLength(1);
    expect(context.sources[0].start).toHaveBeenCalledOnce();
    expect(context.sources[0].stop).toHaveBeenCalledOnce();
    expect(context.close).toHaveBeenCalledOnce();
  });

  it("동시에 넣은 PCM 청크를 한 번만 재개하고 순서대로 예약한다", async () => {
    const context = createFakeAudioContext({ currentTime: 10 });
    const player = new StreamingPcmPlayer(
      () => context as unknown as AudioContext,
      24000,
    );

    await Promise.all([
      player.enqueue(Int16Array.from([0, 0])),
      player.enqueue(Int16Array.from([0, 0])),
    ]);

    expect(context.resume).toHaveBeenCalledOnce();
    expect(context.startTimes).toEqual([10, 10 + 2 / 24000]);
  });

  it("동시에 요청한 close를 하나의 컨텍스트 종료로 합친다", async () => {
    const close = createDeferred();
    const context = createFakeAudioContext({
      currentTime: 0,
      close: () => close.promise,
    });
    const player = new StreamingPcmPlayer(
      () => context as unknown as AudioContext,
      24000,
    );
    await player.enqueue(Int16Array.from([0, 0]));

    const firstClose = player.close();
    await vi.waitFor(() => expect(context.close).toHaveBeenCalledOnce());
    const secondClose = player.close();

    expect(context.close).toHaveBeenCalledOnce();
    close.resolve();
    await Promise.all([firstClose, secondClose]);

    expect(context.close).toHaveBeenCalledOnce();
  });

  it("종료 오류 뒤에도 모든 음원과 컨텍스트를 정리한다", async () => {
    const stopError = new Error("첫 음원을 중지하지 못했습니다.");
    const closeError = new Error("컨텍스트를 닫지 못했습니다.");
    const firstContext = createFakeAudioContext({
      currentTime: 0,
      stop: (sourceIndex) => {
        if (sourceIndex === 0) throw stopError;
      },
      close: async () => {
        throw closeError;
      },
    });
    const secondContext = createFakeAudioContext({ currentTime: 0 });
    const createContext = vi
      .fn<() => AudioContext>()
      .mockReturnValueOnce(firstContext as unknown as AudioContext)
      .mockReturnValueOnce(secondContext as unknown as AudioContext);
    const player = new StreamingPcmPlayer(createContext, 24000);
    await player.enqueue(Int16Array.from([0, 0]));
    await player.enqueue(Int16Array.from([0, 0]));

    await expect(player.close()).rejects.toBeInstanceOf(AggregateError);

    expect(firstContext.sources[0].stop).toHaveBeenCalledOnce();
    expect(firstContext.sources[1].stop).toHaveBeenCalledOnce();
    expect(firstContext.close).toHaveBeenCalledOnce();

    await player.enqueue(Int16Array.from([0, 0]));
    expect(createContext).toHaveBeenCalledTimes(2);
  });

  it("close가 예약 음원을 중지하고 AudioContext를 닫는다", async () => {
    const context = createFakeAudioContext({ currentTime: 0 });
    const player = new StreamingPcmPlayer(
      () => context as unknown as AudioContext,
      24000,
    );
    await player.enqueue(Int16Array.from([0, 0]));

    await player.close();

    expect(context.sources[0].stop).toHaveBeenCalledOnce();
    expect(context.close).toHaveBeenCalledOnce();
  });

  it("이미 종료된 음원을 무시하고 close를 반복 호출해도 안전하다", async () => {
    const context = createFakeAudioContext({ currentTime: 0 });
    const player = new StreamingPcmPlayer(
      () => context as unknown as AudioContext,
      24000,
    );
    await player.enqueue(Int16Array.from([0, 0]));
    vi.spyOn(context.sources[0], "stop").mockImplementation(() => {
      throw new DOMException("이미 종료된 음원입니다.", "InvalidStateError");
    });

    await expect(player.close()).resolves.toBeUndefined();
    await expect(player.close()).resolves.toBeUndefined();

    expect(context.close).toHaveBeenCalledOnce();
  });
});
