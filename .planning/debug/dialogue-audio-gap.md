---
status: investigating
trigger: "두 번째 대사 전에 몇 분간 노이즈 또는 공백이 있으며 다운로드 파일에서도 동일"
created: 2026-10-12
updated: 2026-10-12
---

## Symptoms
- Expected: manually added dialogue blocks retain voices/styles and play in sequence without minutes of unwanted audio.
- Actual: user hears noise or silence for minutes before second block, also present in downloaded file.
- Timeline: reported after sequential generation/named dialogue work; exact first occurrence unconfirmed.
- Reproduction: generate at least two dialogue blocks. User artifact: `/Users/vini/Desktop/gemini_tts_custom_261012_084615.wav`.
- Errors: no textual error reported.

## Current Focus
hypothesis: Actual-artifact replay is byte-identical through current decoding/synthesis forwarding/assembly/WAV paths. The ~327-second low-energy span is in the source samples; its upstream origin and original request boundaries remain unconfirmed.
bug_class: Heisenbug/Mandelbug (generation is not reproduced; the saved artifact is deterministic)
candidate_causes:
  - code: PCM decoding, WAV wrapping, or chunk assembly inserts/duplicates samples.
  - data: upstream generation returns minutes of low-level trailing audio before a later request.
  - config: upstream/request sample format differs from the declared PCM16 mono 24kHz.
and_gate: unknown; a provider tail plus sequential request handling could combine, but raw provider boundaries are unavailable.
test: Completed original-artifact replay and verified opt-in per-request diagnostics with synthetic tests and the supplied artifact.
expecting: Request-index and cumulative sample offsets will distinguish response-internal quiet output from inter-response boundaries on a future reproduction.
next_action: User-confirmed new generation is normal; diagnostics disabled. If symptom recurs, collect its actual request boundaries again. Prior artifact cause remains open.
reasoning_checkpoint:
  hypothesis: Missing per-response format and sample-boundary evidence prevents locating the historical gap within a provider response or between responses.
  confirming_evidence:
    - The original WAV has one PCM data chunk and no original provider/request metadata.
    - Current synthesis replay preserves every source byte across three experimental request boundaries.
  falsification_test: An existing trace containing original per-request sample offsets and MIME would remove the stated evidence gap; no such trace is available in the provided artifact.
  fix_rationale: Opt-in aggregate diagnostics expose the missing boundaries on a future reproduction while preserving all audio; this is instrumentation, not a root-cause fix.
  blind_spots: Future real generation and human listening are unperformed; signal energy cannot decide whether quiet audio is intended speech or silence.
  candidate_causes:
    - code: Application could have altered an unobserved historical format or request grouping.
    - data: Provider could have emitted the quiet samples inside one response.
  and_gate: Unknown for the original audio defect; request grouping and provider behavior may interact.

## Evidence
- Code currently concatenates decoded PCM and writes downloaded WAV from the same collected bytes. No intentional inter-request silence insertion identified in inspected path.
- Root cause is not established; do not suppress noise/silence or trim audio speculatively.
- Saved Next route response and Google SDK streaming references read; these do not establish cause of the artifact gap.
- 2026-10-12: Read original WAV without mutation or playback. Size 23,114,924 bytes; PCM16 mono 24,000Hz; 11,557,440 samples; duration 481.56s; SHA-256 `0d1a8161d88d05e3a7f46c831f166d0e9f3b805e6843248eff3e4ade481add5c`.
- 2026-10-12: 10-second windows show normal-energy audio from 0–89s (-18 to -25dBFS), low-level signal from 90–409s (-53 to -85dBFS), and stronger signal returning from 410s. Low-level windows contain mostly nonzero samples, contradicting simple zero-filled padding. Energy measurements do not identify spoken content.
- 2026-10-12: `synthesize` awaits and forwards each provider response sequentially; L16 decode returns the source bytes; WAV decode extracts the data chunk; the client assembler concatenates completed chunks and `createWavBlob` wraps exactly those bytes. No intended gap insertion observed in these full implementations.
- 2026-10-12: No knowledge-base.md is present and no MemPalace tool is available. SBFL skipped: no reproducing failing audio test/per-test coverage. Project skill directories absent; agent_skills config is empty. Initial Python analysis retried after unavailable Python 3.9 hashlib.file_digest, using sha256(...read()) without modifying the artifact.

- 2026-10-12: One-second RMS below -45dBFS persists 88–234s and 235–415s. A short spike separates the two spans. The 90–410s range averages -61.958dBFS but reaches sample peak 3,869 (~-18.6dBFS); this is neither complete silence nor safely classifiable as unwanted sound from energy alone. No listening, transcript inference, or destructive processing was performed.
- 2026-10-12: Temporary read-only fixture replay script `/tmp/gemini-audio-gap-replay.cjs` imports the current production `src/utils/audio-format.ts`, `src/utils/pcm-audio.ts`, `src/utils/streaming-player.ts`, and `src/lib/gemini-tts.ts` through TypeScript transpilation. Final command `node /tmp/gemini-audio-gap-replay.cjs` exited 0. No real provider requests: global fetch is a local SSE fixture and GEMINI_API_KEY is an in-process non-secret placeholder.
- 2026-10-12: decodeAudio(WAV) extracted exact original data bytes; decodeAudio(AUDIO_L16) preserved them. PcmChunkAssembler/createWavBlob with 1,025-byte and 65,536-byte chunks recreated the exact original SHA-256 `0d1a8161d88d05e3a7f46c831f166d0e9f3b805e6843248eff3e4ade481add5c`.
- 2026-10-12: synthesize replay with experimental two-response boundaries at 85s, 240s, and 419s each made exactly two stub requests and preserved the same 23,114,880 PCM bytes (SHA-256 `66625129f449cc45fb06fd621f4b7f95de79108dbd9f6e42a12a8a7fc27d3d7f`). This verifies current forwarding behavior for the fixture, not the MIME/format or boundaries of the historical provider response.
- 2026-10-12: StreamingPcmPlayer replay using real pcm16BytesToSamples scheduled 482 buffers with start 0 and final end 481.56s and no inserted gaps in a controlled clock. Browser/network behavior was not replayed. Final originalUnchanged check was true.
- 2026-10-12: Proposed safe diagnostic scope (not yet implemented): per synthesis/request numeric index, MIME/rate, PCM byte count, cumulative sample start/end, and bounded low-energy interval statistics; omit API keys, prompt/text, voice identifiers, response payloads, and PCM. Energy classifications are diagnostic only, not an automatic trimming or rejection rule.
- 2026-10-12: Coordinator authorized that diagnostic scope. Implemented default-off `GEMINI_TTS_AUDIO_DIAGNOSTICS=1` instrumentation in `src/lib/tts-audio-diagnostics.ts`, observed from synthesize. One bounded JSON record per upstream request attempt; at most eight low-energy regions plus omitted count; known MIME values and numeric rate only. No input text/styles, voice identifiers, error bodies, credentials, or raw audio recorded. Logging failure is caught and does not reject audio.
- 2026-10-12: Focused tests passed: 61 passed / 0 failed across `tts-audio-diagnostics.test.ts`, `gemini-tts.test.ts`, `pcm-audio.test.ts`, `audio-format.test.ts`, `streaming-player.test.ts`. New tests cover default-off, arbitrary odd chunks, untouched low-volume PCM, short pauses, 10-second N-1/N/N+1 boundary, region cap/overflow, raw/WAV decoding and two-request offsets, sensitive-value omission, fixed incomplete/aborted labels, and logger failure isolation.
- 2026-10-12: `npx tsc --noEmit`, focused ESLint for diagnostics/tests/gemini-tts, and `git diff --check` all exited 0. No code branch behavior removed; only opt-in observability and equivalent formatting added to synthesize. Imports confirmed server-only via the TTS route.
- 2026-10-12: `GEMINI_TTS_AUDIO_DIAGNOSTICS=1 node /tmp/gemini-audio-gap-replay.cjs > /tmp/gemini-audio-gap-replay-optin.jsonl` exited 0. Six bounded diagnostic records emitted for three two-response fixture replays, and all original WAV/PCM hashes remained byte-identical. For an experimental split at 85s, the second request reported quiet regions equivalent to absolute 88–234s and 235–415s, consistent with independent Python measurements. This demonstrates trace localization on known fixture boundaries, not historical provider boundaries.
- 2026-10-12: Original issue is NOT fixed or root-caused. Replaying a final concatenated WAV proves only that the tested current paths preserve that supplied input. It does not establish what the original provider sent, its chunk/MIME/request boundaries, or rule out every historical application/configuration cause. No paid generation, original audio mutation, or listening performed.

## Eliminated
- hypothesis: Current application WAV serialization or PCM chunk concatenation inserts minutes of samples.
  evidence: Actual supplied artifact round-trips byte-identically through decodeAudio, PcmChunkAssembler, and createWavBlob at 1,025-byte (odd) and 65,536-byte boundaries; entire WAV hash equals original.
  timestamp: 2026-10-12
- hypothesis: Current synthesis forwarding adds gap samples between sequential requests for AUDIO_L16.
  evidence: Exact artifact replay via synthesize with two stubbed SSE responses split experimentally at 85s, 240s, and 419s produced identical PCM for all three cases. These experimental boundaries are not the unavailable original request boundaries.
  timestamp: 2026-10-12
- hypothesis: The saved long quiet segment is caused only by WebAudio scheduling latency.
  evidence: The quiet samples are in the saved WAV itself, and current player replay schedules all 482 buffers contiguously from 0 to 481.56s in a controlled AudioContext. Real network arrival stalls remain a separate possible live-only effect.
  timestamp: 2026-10-12
- hypothesis: The complete PCM should be byte-swapped to correct an endian mismatch.
  evidence: Normal little-endian first section has strong adjacent-sample correlation (~0.978); big-endian interpretation produces RMS -6.16dBFS and correlation ~0.109 in the first 10s, consistent with corruption rather than recovery.
  timestamp: 2026-10-12

## Resolution
root_cause: Unconfirmed. Original WAV contains prolonged low-energy samples; origin cannot be assigned without a reproduction's per-request evidence.
fix: No audio-content fix applied. Added default-off bounded diagnostics to obtain missing request boundaries while preserving every PCM byte.
verification:
  real_artifact_replay: passed (byte-identical WAV/L16 decoding, chunk assembly, WAV serialization, synthesis SSE forwarding, and controlled scheduling)
  original_artifact_unchanged: true
  real_provider_origin: unconfirmed (original SSE response format and per-request boundaries unavailable)
  paid_generation_or_listening: not_run
  instrumentation_tests: passed (61 focused tests, TypeScript, focused ESLint, diff check)
  oracle_type: specified (diagnostics disabled by default, privacy allowlist, bounded output); metamorphic (PCM/chunk-boundary preservation)
  target_test: not_applicable_to_gap (original provider generation is unavailable; instrumentation tests passed)
  mutation_check: skipped (Stryker not configured; no audio-content fix claimed)
  no_op_deletion: pass (no behavior removal)
  adjacent_tests: pass (gemini-tts, pcm-audio, audio-format, streaming-player)
  revert_and_reconfirm: not_run (no reproduced provider defect or audio-content fix)
  guardrail_verdict: not_applicable_to_instrumentation; original_defect_unresolved
files_changed: [src/lib/tts-audio-diagnostics.ts, src/lib/tts-audio-diagnostics.test.ts, src/lib/gemini-tts.ts (synthesize and diagnostics import only), .planning/debug/dialogue-audio-gap.md]

## Reproduction diagnostics

- Default is off. Enable only for a reproduction by starting the local dev server from the project root with `GEMINI_TTS_AUDIO_DIAGNOSTICS=1 npm run dev -- --hostname 127.0.0.1`. If already running, restart it with this flag. No `.env` content needs to be printed or changed. Parent confirmed the server is currently stopped and will start/capture the local terminal.
- The user runs the original generation; the agent must not make a paid provider call. Read only stdout lines whose JSON `event` is `tts_audio_diagnostics`. The server remains responsible for actual content/key handling, which these diagnostics do not record.
- `runId` groups one synthesis job. `requestIndex` and `attempt` are zero-based; retries may create another record. `outputStartSample` / `outputEndSample` locate each decoded request in the combined PCM. Divide samples by `sampleRate` to obtain seconds.
- `lowEnergyRegions[].startSample/endSample` are relative to that request; add `outputStartSample` for combined-file positions. RMS threshold -45dBFS, 1-second windows, minimum 10-second region; `peak` is the maximum absolute PCM16 sample in that region. `longestLowEnergySamples` includes short runs; regions array retains only the first eight long runs and reports the omitted count.
- `sourceBytes`, `decodedBytes`, `audioParts`, `mimeTypes`, and `declaredRates` identify format/duration mismatches. `incompleteSampleBytes` distinguishes an incomplete final sample. `outcome` is a fixed completed/aborted/incomplete label; no raw error message is logged.
- These are diagnostic energy measurements, not speech/silence recognition. Do not trim or fail a generation based only on them. After reproduction, restart without the flag to disable collection. Record whether the real low-energy span occurs within one response, at its trailing edge, or in a later response before proposing any audio-content change.

## Live reproduction checkpoint (2026-10-12)

- Source checkpoint `fb005bd`: automatic first-appearance name mapping plus opt-in diagnostics. Full suite: 203 tests / 19 files; lint and production build passed. Audio defect remains unresolved.
- Parent started `GEMINI_TTS_AUDIO_DIAGNOSTICS=1 npm run dev` (tool session 17500); `http://localhost:3000/` returned HTTP 200. Verify the server is still running on resume.
- Awaiting user reproduction; no real provider generation was triggered by the agent. Inspect session output or only `tts_audio_diagnostics` entries in `.next/dev/logs/next-development.log`. No diagnostic entries observed at this checkpoint.

## User-confirmed reproduction outcome (2026-10-12)

- User: “다시 생성했고 이번에는 정상”. Run `b181cfe6-c174-46b7-91d2-463167d856e5`, PCM16 mono 24kHz.
- Request 0: 3,411,840 source/decoded bytes, output samples 0–1,705,920, 71.08s, longest low energy 1s. Request 1: 3,792,000 source/decoded bytes, samples 1,705,920–3,601,920, 79s, longest low energy 2s. Both completed, no 10s low-energy regions, no partial sample bytes. Total150.08s.
- The historical symptom did not recur in this run; this does not establish the cause of the previous file. No audio-content trimming or normalization was applied. Actual screen-reader acceptance is still untested.
- Diagnostic session17500 terminated intentionally (exit143); normal `npm run dev` started as session75277 without diagnostic flag. Verify runtime on resume; do not assume a saved session remains alive.
