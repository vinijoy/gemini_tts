import { afterEach, describe, expect, it, vi } from "vitest";
import { createAudioDiagnostics, PcmEnergyDiagnostics } from "./tts-audio-diagnostics";
import { synthesize } from "./gemini-tts";
import type { TtsRequest } from "./tts-contract";
import { joinBytes, wavBytes } from "../utils/audio-format";

const request: TtsRequest = {
  model: "gemini-3.8-flash-tts", mode: "custom-dialogue", serviceTier: "standard",
  speakers: [{ id: "A", voice: { kind: "prebuilt-name", value: "Puck" } }],
  turns: [{ speaker: "A", text: "비공개 본문", style: "비공개 연출" }],
  output: { encoding: "AUDIO_L16", sampleRate: 8000 },
};
function pcm(samples: number, value: number) {
  const bytes = new Uint8Array(samples * 2), view = new DataView(bytes.buffer);
  for (let i = 0; i < samples; i++) view.setInt16(i * 2, value, true);
  return bytes;
}
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

describe("content-free audio diagnostics", () => {
  it("is disabled by default and for values other than the explicit flag", () => {
    const log = vi.spyOn(console, "info");
    for (const value of ["", "true", "0"]) {
      vi.stubEnv("GEMINI_TTS_AUDIO_DIAGNOSTICS", value);
      expect(createAudioDiagnostics(request)).toBeUndefined();
    }
    expect(log).not.toHaveBeenCalled();
  });

  it("handles odd chunk boundaries identically and preserves low-volume samples", () => {
    const bytes = joinBytes([pcm(80000, 80), pcm(8000, 1000), pcm(72000, 40)]);
    const original = bytes.slice(), one = new PcmEnergyDiagnostics(8000), split = new PcmEnergyDiagnostics(8000);
    one.observe(bytes);
    for (let i = 0; i < bytes.length; i += 1025) split.observe(bytes.subarray(i, i + 1025));
    const summary = split.finish();
    expect(summary).toEqual(one.finish());
    expect(summary.lowEnergyRegions).toEqual([{ startSample: 0, endSample: 80000, peak: 80 }]);
    expect(summary.sampleCount).toBe(160000);
    expect(bytes).toEqual(original);
  });

  it("reports the 10-second boundary and caps retained region summaries", () => {
    for (const samples of [79999, 80000, 80001]) {
      const energy = new PcmEnergyDiagnostics(8000);
      energy.observe(pcm(samples, 1));
      expect(energy.finish().lowEnergyRegions).toHaveLength(samples < 80000 ? 0 : 1);
    }
    const energy = new PcmEnergyDiagnostics(8000);
    for (let i = 0; i < 9; i++) { energy.observe(pcm(80000, 1)); energy.observe(pcm(8000, 1000)); }
    const summary = energy.finish();
    expect(summary.lowEnergyRegions).toHaveLength(8);
    expect(summary.omittedLowEnergyRegions).toBe(1);
    expect(summary.longestLowEnergySamples).toBe(80000);
  });

  it.each(["AUDIO_L16", "AUDIO_WAV"] as const)("preserves decoded %s bytes and records separate sequential request offsets", async encoding => {
    vi.stubEnv("GEMINI_TTS_AUDIO_DIAGNOSTICS", "1");
    vi.stubEnv("GEMINI_API_KEY", "fixture-key-never-send");
    const log = vi.spyOn(console, "info").mockImplementation(() => {});
    const bytes = pcm(80000, 20), source = encoding === "AUDIO_WAV" ? wavBytes(bytes, 8000) : bytes;
    const mime = encoding === "AUDIO_WAV" ? "audio/wav" : "audio/L16;rate=8000;private=not-for-logs";
    vi.stubGlobal("fetch", vi.fn(async () => new Response(`data: ${JSON.stringify({ candidates: [{ content: { parts: [{ inlineData: { mimeType: mime, data: Buffer.from(source).toString("base64") } }] }, finishReason: "STOP" }] })}\n\n`)));
    const chunks: Uint8Array[] = [];
    for await (const chunk of synthesize({ ...request, output: { ...request.output, encoding }, turns: [request.turns[0], request.turns[0]] }, new AbortController().signal, { tier: "unknown" })) chunks.push(chunk);
    expect(joinBytes(chunks)).toEqual(joinBytes([bytes, bytes]));
    expect(log).toHaveBeenCalledTimes(2);
    const records = log.mock.calls.map(([record]) => JSON.parse(String(record)));
    expect(records[0]).toMatchObject({ requestIndex: 0, attempt: 0, outcome: "completed", outputStartSample: 0, outputEndSample: 80000, sourceBytes: source.length, decodedBytes: bytes.length });
    expect(records[1]).toMatchObject({ runId: records[0].runId, requestIndex: 1, outputStartSample: 80000, outputEndSample: 160000 });
    expect(records[0].lowEnergyRegions).toEqual([{ startSample: 0, endSample: 80000, peak: 20 }]);
    const logged = JSON.stringify(records);
    for (const privateValue of ["비공개", "Puck", "fixture-key-never-send", "not-for-logs"]) expect(logged).not.toContain(privateValue);
  });

  it("uses fixed failure labels and never lets log failure change audio processing", () => {
    vi.stubEnv("GEMINI_TTS_AUDIO_DIAGNOSTICS", "1");
    const log = vi.spyOn(console, "info").mockImplementation(() => {});
    const trace = createAudioDiagnostics(request)!.begin(0, 0, 0);
    trace.decoded(new Uint8Array([1]));
    trace.finish("incomplete");
    trace.finish("completed");
    expect(log).toHaveBeenCalledTimes(1);
    expect(JSON.parse(String(log.mock.calls[0][0]))).toMatchObject({ outcome: "incomplete", incompleteSampleBytes: 1, sampleCount: 0 });
    log.mockImplementation(() => { throw new Error("private logger error"); });
    expect(() => createAudioDiagnostics(request)!.begin(0, 0, 0).finish("aborted")).not.toThrow();
  });
});
