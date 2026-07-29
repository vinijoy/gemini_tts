import { describe, expect, it } from "vitest";
import {
  PcmChunkAssembler,
  createWavBlob,
  pcm16ToFloat32,
} from "./pcm-audio";

describe("PcmChunkAssembler", () => {
  it("홀수 바이트 청크의 남은 바이트를 다음 청크와 결합한다", () => {
    const assembler = new PcmChunkAssembler();

    expect(Array.from(assembler.push(Uint8Array.from([0x00])))).toEqual([]);
    expect(
      Array.from(assembler.push(Uint8Array.from([0x80, 0xff, 0x7f]))),
    ).toEqual([-32768, 32767]);
    expect(Array.from(assembler.getBytes())).toEqual([0x00, 0x80, 0xff, 0x7f]);
  });
});

it("PCM16 최솟값과 최댓값을 Float32 범위로 변환한다", () => {
  const result = pcm16ToFloat32(Int16Array.from([-32768, 0, 32767]));

  expect(Array.from(result)).toEqual([-1, 0, 32767 / 32768]);
});

it("24kHz 모노 WAV 헤더와 PCM 본문을 만든다", async () => {
  const blob = createWavBlob(Uint8Array.from([0x00, 0x80, 0xff, 0x7f]));
  const bytes = new Uint8Array(await blob.arrayBuffer());

  expect(new TextDecoder().decode(bytes.slice(0, 4))).toBe("RIFF");
  expect(new DataView(bytes.buffer).getUint32(24, true)).toBe(24000);
  expect(new DataView(bytes.buffer).getUint32(40, true)).toBe(4);
  expect(Array.from(bytes.slice(44))).toEqual([0x00, 0x80, 0xff, 0x7f]);
});
