import { pcm16ToFloat32 } from "./pcm-audio";

type AudioContextFactory = () => AudioContext;

/** PCM16 청크를 Web Audio 타임라인에 연속해서 예약하는 재생기다. */
export class StreamingPcmPlayer {
  private context: AudioContext | null = null;

  private nextStartTime = 0;

  private readonly sources = new Set<AudioBufferSourceNode>();

  constructor(
    private readonly createContext: AudioContextFactory = () => new AudioContext(),
    private readonly sampleRate = 24000,
  ) {}

  async enqueue(samples: Int16Array): Promise<void> {
    if (samples.length === 0) return;

    const context = this.context ?? this.createContext();
    this.context = context;
    if (context.state === "suspended") await context.resume();

    const buffer = context.createBuffer(1, samples.length, this.sampleRate);
    buffer.copyToChannel(new Float32Array(pcm16ToFloat32(samples)), 0);

    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.onended = () => this.sources.delete(source);

    const startAt = Math.max(context.currentTime, this.nextStartTime);
    source.start(startAt);
    this.nextStartTime = startAt + buffer.duration;
    this.sources.add(source);
  }

  async close(): Promise<void> {
    for (const source of this.sources) {
      try {
        source.stop();
      } catch (error) {
        if (!(error instanceof DOMException) || error.name !== "InvalidStateError") {
          throw error;
        }
      }
    }
    this.sources.clear();

    if (this.context && this.context.state !== "closed") {
      await this.context.close();
    }

    this.context = null;
    this.nextStartTime = 0;
  }
}
