import { pcm16ToFloat32 } from "./pcm-audio";

type AudioContextFactory = () => AudioContext;

/** PCM16 청크를 Web Audio 타임라인에 연속해서 예약하는 재생기다. */
export class StreamingPcmPlayer {
  private context: AudioContext | null = null;

  private nextStartTime = 0;

  private readonly sources = new Set<AudioBufferSourceNode>();

  private operation: Promise<void> = Promise.resolve();

  private activation: Promise<void> | null = null;

  constructor(
    private readonly createContext: AudioContextFactory = () => new AudioContext(),
    private readonly sampleRate = 24000,
  ) {}

  /** 사용자 동작 중 AudioContext 생성과 재개를 시작해 자동 재생을 허용한다. */
  activate(): Promise<void> {
    const context = this.context ?? this.createContext();
    this.context = context;
    if (context.state !== "suspended") return Promise.resolve();
    if (this.activation) return this.activation;

    // resume 호출 자체는 현재 사용자 동작의 호출 스택에서 즉시 시작해야 한다.
    const startedActivation = context.resume();
    const activation = this.operation.then(() => startedActivation);
    this.operation = activation.catch(() => undefined);
    this.activation = activation;
    void activation.then(
      () => {
        if (this.activation === activation) this.activation = null;
      },
      () => {
        if (this.activation === activation) this.activation = null;
      },
    );
    return activation;
  }

  async enqueue(samples: Int16Array): Promise<void> {
    if (samples.length === 0) return;

    return this.serialize(() => this.enqueueInternal(samples));
  }

  private async enqueueInternal(samples: Int16Array): Promise<void> {
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
    this.sources.add(source);
    try {
      source.start(startAt);
      this.nextStartTime = startAt + buffer.duration;
    } catch (error) {
      this.sources.delete(source);
      throw error;
    }
  }

  async close(): Promise<void> {
    return this.serialize(() => this.closeInternal());
  }

  private async closeInternal(): Promise<void> {
    const context = this.context;
    const errors: unknown[] = [];

    try {
      for (const source of Array.from(this.sources)) {
        try {
          source.stop();
        } catch (error) {
          if (
            !(error instanceof DOMException) ||
            error.name !== "InvalidStateError"
          ) {
            errors.push(error);
          }
        }
      }
    } finally {
      this.sources.clear();
    }

    try {
      if (context && context.state !== "closed") {
        await context.close();
      }
    } catch (error) {
      errors.push(error);
    } finally {
      if (this.context === context) {
        this.context = null;
        this.activation = null;
        this.nextStartTime = 0;
      }
    }

    if (errors.length > 0) {
      throw new AggregateError(errors, "오디오 재생기를 정리하지 못했습니다.");
    }
  }

  private serialize(operation: () => Promise<void>): Promise<void> {
    const result = this.operation.then(operation);
    this.operation = result.catch(() => undefined);
    return result;
  }
}
