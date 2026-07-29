/** 스트리밍 PCM 바이트를 16비트 샘플 경계에 맞춰 누적한다. */
export class PcmChunkAssembler {
  private pendingByte: number | null = null;

  private readonly completedChunks: Uint8Array[] = [];

  push(chunk: Uint8Array): Int16Array {
    const prefix = this.pendingByte === null ? [] : [this.pendingByte];
    const merged = Uint8Array.from([...prefix, ...chunk]);
    const completeLength = merged.length - (merged.length % 2);

    this.pendingByte =
      completeLength < merged.length ? merged[merged.length - 1] : null;

    const complete = merged.slice(0, completeLength);
    if (complete.length > 0) {
      this.completedChunks.push(complete);
    }

    return pcm16BytesToSamples(complete);
  }

  getBytes(): Uint8Array {
    if (this.pendingByte !== null) {
      throw new Error(
        "PCM 오디오 데이터가 16비트 샘플 경계로 끝나지 않았습니다. 음성을 다시 생성해 주세요.",
      );
    }

    const length = this.completedChunks.reduce(
      (sum, part) => sum + part.length,
      0,
    );
    const result = new Uint8Array(length);
    let offset = 0;

    for (const part of this.completedChunks) {
      result.set(part, offset);
      offset += part.length;
    }

    return result;
  }
}

/** PCM16 리틀엔디언 바이트를 부호 있는 16비트 샘플로 변환한다. */
export function pcm16BytesToSamples(bytes: Uint8Array): Int16Array {
  if (bytes.length % 2 !== 0) {
    throw new Error(
      "PCM 오디오 데이터가 16비트 샘플 경계로 끝나지 않았습니다.",
    );
  }

  const samples = new Int16Array(bytes.length / 2);
  const view = new DataView(
    bytes.buffer,
    bytes.byteOffset,
    bytes.byteLength,
  );
  for (let index = 0; index < samples.length; index += 1) {
    samples[index] = view.getInt16(index * 2, true);
  }

  return samples;
}

/** PCM16 정수 샘플을 Web Audio에서 사용할 Float32 범위로 정규화한다. */
export function pcm16ToFloat32(samples: Int16Array): Float32Array {
  return Float32Array.from(samples, (sample) => sample / 32768);
}

/** PCM16 리틀엔디언 데이터를 표준 44바이트 WAV 컨테이너로 감싼다. */
export function createWavBlob(
  pcmBytes: Uint8Array,
  sampleRate = 24000,
  channels = 1,
): Blob {
  const bitsPerSample = 16;
  const bytesPerSample = bitsPerSample / 8;
  const blockAlign = channels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const wavBytes = new Uint8Array(44 + pcmBytes.length);
  const view = new DataView(wavBytes.buffer);
  const encoder = new TextEncoder();

  wavBytes.set(encoder.encode("RIFF"), 0);
  view.setUint32(4, 36 + pcmBytes.length, true);
  wavBytes.set(encoder.encode("WAVE"), 8);
  wavBytes.set(encoder.encode("fmt "), 12);
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, channels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  wavBytes.set(encoder.encode("data"), 36);
  view.setUint32(40, pcmBytes.length, true);
  wavBytes.set(pcmBytes, 44);

  return new Blob([wavBytes], { type: "audio/wav" });
}
