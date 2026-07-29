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

function createFakeAudioContext({ currentTime }: { currentTime: number }): FakeAudioContext {
  const sources: AudioBufferSourceNode[] = [];
  const startTimes: number[] = [];
  const context: FakeAudioContext = {
    currentTime,
    state: "suspended",
    destination: {} as AudioDestinationNode,
    sources,
    startTimes,
    resume: vi.fn(async () => {
      context.state = "running";
    }),
    close: vi.fn(async () => {
      context.state = "closed";
    }),
    createBuffer: vi.fn((_channels, length, sampleRate) => ({
      duration: length / sampleRate,
      copyToChannel: vi.fn(),
    })),
    createBufferSource: vi.fn(() => {
      const source = {
        buffer: null,
        connect: vi.fn(),
        start: vi.fn((when: number) => startTimes.push(when)),
        stop: vi.fn(),
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
