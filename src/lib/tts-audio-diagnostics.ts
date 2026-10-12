import { randomUUID } from "node:crypto";
import type { TtsRequest } from "./tts-contract";

const MAX_REGIONS = 8;
const MIN_REGION_SECONDS = 10;
const QUIET_MEAN_SQUARE = (32768 * 10 ** (-45 / 20)) ** 2;

type QuietRegion = { startSample: number; endSample: number; peak: number };

/**
 * 에너지 분류는 발화 판정이 아니다. 작은 목소리와 의도한 쉼도 포함할 수 있으므로
 * 진단에만 쓰고, 원본 PCM을 자르거나 생성 성공 여부를 결정하지 않는다.
 */
export class PcmEnergyDiagnostics {
  private pendingByte: number | undefined;
  private samples = 0;
  private windowSamples = 0;
  private windowSquares = 0;
  private windowPeak = 0;
  private active: QuietRegion | undefined;
  private readonly regions: QuietRegion[] = [];
  private omittedRegions = 0;
  private longestRegionSamples = 0;

  constructor(private readonly sampleRate: number) {}

  observe(bytes: Uint8Array): void {
    // SSE 청크가 샘플의 중간에서 나뉘어도 같은 통계가 되도록 1바이트만 보관한다.
    for (const byte of bytes) {
      if (this.pendingByte === undefined) {
        this.pendingByte = byte;
        continue;
      }
      const unsigned = this.pendingByte | (byte << 8);
      const sample = unsigned >= 32768 ? unsigned - 65536 : unsigned;
      this.pendingByte = undefined;
      this.samples++;
      this.windowSamples++;
      this.windowSquares += sample * sample;
      this.windowPeak = Math.max(this.windowPeak, Math.abs(sample));
      if (this.windowSamples === this.sampleRate) this.finishWindow();
    }
  }

  private finishWindow(): void {
    if (!this.windowSamples) return;
    if (this.windowSquares / this.windowSamples <= QUIET_MEAN_SQUARE) {
      this.active ??= { startSample: this.samples - this.windowSamples, endSample: this.samples, peak: 0 };
      this.active.endSample = this.samples;
      this.active.peak = Math.max(this.active.peak, this.windowPeak);
    } else {
      this.finishRegion();
    }
    this.windowSamples = 0;
    this.windowSquares = 0;
    this.windowPeak = 0;
  }

  private finishRegion(): void {
    if (!this.active) return;
    const duration = this.active.endSample - this.active.startSample;
    this.longestRegionSamples = Math.max(this.longestRegionSamples, duration);
    if (duration >= this.sampleRate * MIN_REGION_SECONDS) {
      if (this.regions.length < MAX_REGIONS) this.regions.push(this.active);
      else this.omittedRegions++;
    }
    this.active = undefined;
  }

  finish() {
    this.finishWindow();
    this.finishRegion();
    return {
      sampleCount: this.samples,
      incompleteSampleBytes: this.pendingByte === undefined ? 0 : 1,
      lowEnergyRmsThresholdDbfs: -45,
      lowEnergyWindowSeconds: 1,
      lowEnergyMinRegionSeconds: MIN_REGION_SECONDS,
      longestLowEnergySamples: this.longestRegionSamples,
      lowEnergyRegions: this.regions.map(region => ({ ...region })),
      omittedLowEnergyRegions: this.omittedRegions,
    };
  }
}

/** 기본 비활성이다. 원문·음성·목소리 식별자·오류 본문은 기록하지 않는다. */
export function createAudioDiagnostics(request: TtsRequest) {
  if (process.env.GEMINI_TTS_AUDIO_DIAGNOSTICS !== "1") return undefined;
  const runId = randomUUID();
  return {
    begin(requestIndex: number, attempt: number, outputStartByte: number) {
      const energy = new PcmEnergyDiagnostics(request.output.sampleRate);
      let decodedBytes = 0;
      let sourceBytes = 0;
      let audioParts = 0;
      // 임의의 MIME 매개변수는 출력하지 않고 알려진 형식과 숫자만 보관한다.
      const formats = new Set<string>();
      const rates = new Set<number>();
      let finished = false;
      return {
        source(bytes: Uint8Array, mime: string) {
          sourceBytes += bytes.length;
          audioParts++;
          const type = mime.split(";")[0].toLowerCase();
          formats.add(["audio/l16", "audio/pcm", "audio/wav", "audio/x-wav", "audio/basic", "audio/mulaw", "audio/alaw"].includes(type) ? type : "unrecognized");
          const rate = /;\s*rate=(\d+)/i.exec(mime);
          if (rate && rates.size < 8 && Number.isSafeInteger(Number(rate[1]))) rates.add(Number(rate[1]));
        },
        decoded(bytes: Uint8Array) {
          decodedBytes += bytes.length;
          energy.observe(bytes);
        },
        finish(outcome: "completed" | "aborted" | "incomplete") {
          if (finished) return;
          finished = true;
          const record = {
            event: "tts_audio_diagnostics", schemaVersion: 1, runId, requestIndex, attempt,
            outcome, encoding: request.output.encoding, sampleRate: request.output.sampleRate,
            sourceBytes, decodedBytes, audioParts,
            mimeTypes: [...formats], declaredRates: [...rates],
            outputStartSample: outputStartByte / 2,
            outputEndSample: (outputStartByte + decodedBytes) / 2,
            ...energy.finish(),
          };
          // 로깅 환경의 실패가 음성 스트림의 성공 여부를 바꾸면 안 된다.
          try { console.info(JSON.stringify(record)); } catch { /* 진단만 생략한다. */ }
        },
      };
    },
  };
}
