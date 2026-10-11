"use client";
import { useEffect, useRef, useState } from "react";
import { PcmChunkAssembler, createWavBlob, pcm16BytesToSamples, } from "@/utils/pcm-audio";
import { StreamingPcmPlayer } from "@/utils/streaming-player";
import VoiceLibrary from "./components/VoiceLibrary";
import VoiceStudio from "./components/VoiceStudio";
import BatchPanel from "./components/BatchPanel";
import { voiceRef } from "@/lib/voice-catalog";
import TtsEditor, { defaultRequest } from "./components/TtsEditor";
import { parseTts, VOICE_NAMES, type TtsRequest } from "@/lib/tts-contract";
import { encodeOutput, MAX_AUDIO_BYTES } from "@/utils/audio-format";
type GenerationStatus = "idle" | "streaming" | "complete";
const DEFAULT_SERVER_ERROR_MESSAGE = "음성 생성 서버에서 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
const STREAM_CONNECTION_ERROR_MESSAGE = "음성 생성 중 연결이 끊어졌습니다. 네트워크 상태를 확인한 뒤 다시 시도해 주세요.";
function normalizeServerErrorText(value: unknown) {
    if (typeof value !== "string")
        return null;
    const normalized = value.replace(/\s+/g, " ").trim();
    return normalized ? normalized.slice(0, 200) : null;
}
function createServerErrorMessage(responseBody: string) {
    try {
        const parsed = JSON.parse(responseBody) as unknown;
        if (typeof parsed === "object" && parsed !== null) {
            const errorData = parsed as {
                details?: unknown;
                error?: unknown;
            };
            const error = normalizeServerErrorText(errorData.error);
            const details = normalizeServerErrorText(errorData.details);
            if (error && details)
                return `${error} (${details})`;
            if (error)
                return error;
            if (details)
                return `${DEFAULT_SERVER_ERROR_MESSAGE} (${details})`;
        }
        return DEFAULT_SERVER_ERROR_MESSAGE;
    }
    catch {
        const safeServerText = normalizeServerErrorText(responseBody);
        return safeServerText
            ? `${DEFAULT_SERVER_ERROR_MESSAGE} (서버 응답: ${safeServerText})`
            : DEFAULT_SERVER_ERROR_MESSAGE;
    }
}
function createGenerationErrorMessage(error: unknown) {
    if (error instanceof DOMException &&
        error.name === "AbortError") {
        return "음성 생성 요청이 취소되었습니다. 다시 생성해 주세요.";
    }
    if (error instanceof Error && /[가-힣]/.test(error.message)) {
        return error.message;
    }
    return STREAM_CONNECTION_ERROR_MESSAGE;
}
function createDownloadFileName(voice: string, generatedAt: Date) {
    const date = [
        String(generatedAt.getFullYear()).slice(2),
        String(generatedAt.getMonth() + 1).padStart(2, "0"),
        String(generatedAt.getDate()).padStart(2, "0"),
    ].join("");
    const time = [
        String(generatedAt.getHours()).padStart(2, "0"),
        String(generatedAt.getMinutes()).padStart(2, "0"),
        String(generatedAt.getSeconds()).padStart(2, "0"),
    ].join("");
    return `gemini_tts_${voice}_${date}_${time}.wav`;
}
export default function Home() {
    const maxTextLength = 1000;
    const [announcement,setAnnouncement]=useState("");
    useEffect(()=>{const receive=(event:Event)=>setAnnouncement((event as CustomEvent<string>).detail);window.addEventListener("tts-status",receive);return()=>window.removeEventListener("tts-status",receive);},[]);
    const [showStudio, setShowStudio] = useState(false);
    const [showBatch, setShowBatch] = useState(false);
    const [options, setOptions] = useState<TtsRequest>(defaultRequest);
    const [actualTier, setActualTier] = useState("미확인");
    const completedOutputRef = useRef(defaultRequest.output);
    const [text, setText] = useState("");
    const [voice, setVoice] = useState("Puck");
    const [stylePrompt, setStylePrompt] = useState("");
    const [status, setStatus] = useState<GenerationStatus>("idle");
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [hasStartedPlayback, setHasStartedPlayback] = useState(false);
    const [downloadFileName, setDownloadFileName] = useState("");
    const playerRef = useRef<StreamingPcmPlayer | null>(null);
    const completedPcmRef = useRef<Uint8Array | null>(null);
    const requestControllerRef = useRef<AbortController | null>(null);
    const audioUrlRef = useRef<string | null>(null);
    const requestIdRef = useRef(0);
    const replayPromiseRef = useRef<Promise<void> | null>(null);
    const isLoading = status === "streaming";
    const statusMessage = status === "streaming"
        ? hasStartedPlayback
            ? "음성을 생성하며 재생하고 있습니다."
            : "음성을 생성하고 있습니다. 준비되면 자동 재생됩니다."
        : status === "complete"
            ? "음성 생성이 완료되었습니다."
            : "";
    const voices = VOICE_NAMES;
    useEffect(() => () => {
        requestIdRef.current += 1;
        replayPromiseRef.current = null;
        completedPcmRef.current = null;
        requestControllerRef.current?.abort();
        requestControllerRef.current = null;
        const player = playerRef.current;
        playerRef.current = null;
        if (player) {
            void player
                .close()
                .catch((closeError: unknown) => console.error("오디오 재생기 정리에 실패했습니다.", closeError));
        }
        const url = audioUrlRef.current;
        audioUrlRef.current = null;
        if (url)
            URL.revokeObjectURL(url);
    }, []);
    const handleGenerate = async () => {
        if (isLoading)
            return;
        if (!text.trim()) {
            setError("변환할 텍스트를 입력해주세요.");
            return;
        }
        let snapshot: TtsRequest;
        try {
            snapshot = parseTts({ ...options, speakers: options.speakers.map((s, i) => i === 0 ? { ...s, voice: s.voice.kind === "prebuilt-name" ? { kind: "prebuilt-name", value: voice } : s.voice } : s), turns: options.turns.map((t, i) => i === 0 ? { ...t, text, style: stylePrompt } : t) });
        }
        catch (e) {
            setError(e instanceof Error ? e.message : "입력값이 올바르지 않습니다.");
            return;
        }
        completedOutputRef.current = snapshot.output;
        setActualTier("미확인");
        const requestId = requestIdRef.current + 1;
        requestIdRef.current = requestId;
        replayPromiseRef.current = null;
        completedPcmRef.current = null;
        setError(null);
        setStatus("streaming");
        setHasStartedPlayback(false);
        setAudioUrl(null);
        const generatedVoice = options.speakers[0].voice.kind==="prebuilt-name"?voice:"custom";
        setDownloadFileName(createDownloadFileName(generatedVoice, new Date()));
        requestControllerRef.current?.abort();
        requestControllerRef.current = null;
        const previousPlayer = playerRef.current;
        playerRef.current = null;
        const previousUrl = audioUrlRef.current;
        audioUrlRef.current = null;
        if (previousUrl)
            URL.revokeObjectURL(previousUrl);
        const requestController = new AbortController();
        requestControllerRef.current = requestController;
        let player: StreamingPcmPlayer | null = null;
        let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
        let streamCompleted = false;
        try {
            player = new StreamingPcmPlayer(undefined, snapshot.output.sampleRate);
            playerRef.current = player;
            let activation: Promise<{
                activated: true;
            } | {
                activated: false;
                cause: unknown;
            }>;
            try {
                activation = player.activate().then(() => ({ activated: true as const }), (cause: unknown) => ({ activated: false as const, cause }));
            }
            catch (cause) {
                activation = Promise.resolve({ activated: false, cause });
            }
            let previousPlayerClose: Promise<{
                closed: true;
            } | {
                closed: false;
                cause: unknown;
            }>;
            if (previousPlayer) {
                try {
                    previousPlayerClose = previousPlayer.close().then(() => ({ closed: true as const }), (cause: unknown) => ({ closed: false as const, cause }));
                }
                catch (cause) {
                    previousPlayerClose = Promise.resolve({ closed: false, cause });
                }
            }
            else {
                previousPlayerClose = Promise.resolve({ closed: true });
            }
            const activationResult = await activation;
            if (!activationResult.activated) {
                throw new Error("오디오 자동 재생을 시작하지 못했습니다. 브라우저의 자동 재생 권한을 확인한 뒤 다시 시도해 주세요.", { cause: activationResult.cause });
            }
            const previousPlayerCloseResult = await previousPlayerClose;
            if (!previousPlayerCloseResult.closed) {
                throw new Error("이전 오디오 재생을 종료하지 못했습니다. 새 음성을 생성하지 않았습니다. 잠시 후 다시 시도해 주세요.", { cause: previousPlayerCloseResult.cause });
            }
            if (requestIdRef.current !== requestId)
                return;
            const response = await fetch("/api/tts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(snapshot),
                signal: requestController.signal,
            });
            if (requestIdRef.current !== requestId)
                return;
            if (!response.ok) {
                let responseBody = "";
                try {
                    responseBody = await response.text();
                }
                catch (bodyReadError) {
                    throw new Error(DEFAULT_SERVER_ERROR_MESSAGE, {
                        cause: bodyReadError,
                    });
                }
                throw new Error(createServerErrorMessage(responseBody));
            }
            setActualTier(response.headers.get("x-gemini-service-tier") || "미확인");
            reader = response.body?.getReader() ?? null;
            if (!reader)
                throw new Error("음성 스트림을 열 수 없습니다.");
            const assembler = new PcmChunkAssembler();
            let playbackStarted = false;
            let totalBytes = 0;
            while (true) {
                const { value, done } = await reader.read();
                if (requestIdRef.current !== requestId)
                    return;
                if (done) {
                    streamCompleted = true;
                    break;
                }
                totalBytes += value.length;
                if (totalBytes > MAX_AUDIO_BYTES)
                    throw new Error("오디오가 앱의 32MiB 제한을 넘은 상태입니다.");
                const samples = assembler.push(value);
                await player.enqueue(samples);
                if (!playbackStarted && samples.length > 0) {
                    playbackStarted = true;
                    setHasStartedPlayback(true);
                }
            }
            const pcmBytes = assembler.getBytes();
            if (pcmBytes.length === 0) {
                throw new Error("생성된 오디오 데이터가 없습니다.");
            }
            const url = URL.createObjectURL(createWavBlob(pcmBytes, snapshot.output.sampleRate));
            completedPcmRef.current = pcmBytes;
            audioUrlRef.current = url;
            setAudioUrl(url);
            setStatus("complete");
        }
        catch (err: unknown) {
            if (requestControllerRef.current === requestController) {
                requestController.abort();
                requestControllerRef.current = null;
            }
            if (player && playerRef.current === player) {
                playerRef.current = null;
                try {
                    await player.close();
                }
                catch (closeError) {
                    console.error("오디오 재생기 정리에 실패했습니다.", closeError);
                }
            }
            if (requestIdRef.current !== requestId)
                return;
            console.error(err);
            completedPcmRef.current = null;
            setError(createGenerationErrorMessage(err));
            setHasStartedPlayback(false);
            setStatus("idle");
        }
        finally {
            if (reader) {
                if (!streamCompleted) {
                    try {
                        await reader.cancel();
                    }
                    catch (cancelError) {
                        console.error("음성 스트림 취소에 실패했습니다.", cancelError);
                    }
                }
                try {
                    reader.releaseLock();
                }
                catch (releaseError) {
                    console.error("음성 스트림 잠금 해제에 실패했습니다.", releaseError);
                }
            }
        }
    };
    const handleReplay = () => {
        if (replayPromiseRef.current)
            return;
        const replayRequestId = requestIdRef.current;
        const replayUrl = audioUrlRef.current;
        const replayPcm = completedPcmRef.current;
        if (!replayUrl || !replayPcm)
            return;
        const ownsReplay = () => requestIdRef.current === replayRequestId &&
            audioUrlRef.current === replayUrl &&
            completedPcmRef.current === replayPcm;
        let replayPlayer: StreamingPcmPlayer | null = null;
        const replay = (async () => {
            const previousPlayer = playerRef.current;
            replayPlayer = new StreamingPcmPlayer(undefined, completedOutputRef.current.sampleRate);
            let activation: Promise<{
                activated: true;
            } | {
                activated: false;
                cause: unknown;
            }>;
            try {
                // 사용자 클릭 호출 스택에서 즉시 AudioContext 재개를 시작한다.
                activation = replayPlayer.activate().then(() => ({ activated: true as const }), (cause: unknown) => ({ activated: false as const, cause }));
            }
            catch (activationError) {
                activation = Promise.resolve({
                    activated: false,
                    cause: activationError,
                });
            }
            if (previousPlayer) {
                try {
                    await previousPlayer.close();
                }
                catch (closeError) {
                    console.error("스트리밍 재생을 중지하지 못했습니다.", closeError);
                    await replayPlayer.close().catch(() => undefined);
                    if (ownsReplay()) {
                        setError("스트리밍 재생을 중지하지 못해 다시 듣기를 시작할 수 없습니다. 잠시 후 다시 시도해 주세요.");
                    }
                    return;
                }
                if (playerRef.current === previousPlayer)
                    playerRef.current = null;
            }
            const activationResult = await activation;
            if (!activationResult.activated) {
                throw new Error("완성된 음성 재생을 시작하지 못했습니다. 브라우저의 자동 재생 권한을 확인해 주세요.", { cause: activationResult.cause });
            }
            if (!ownsReplay()) {
                await replayPlayer.close();
                return;
            }
            playerRef.current = replayPlayer;
            await replayPlayer.enqueue(pcm16BytesToSamples(replayPcm));
        })().catch(async (playError: unknown) => {
            if (replayPlayer) {
                if (playerRef.current === replayPlayer) {
                    playerRef.current = null;
                }
                await replayPlayer.close().catch((closeError: unknown) => {
                    console.error("완성 음성 재생기 정리에 실패했습니다.", closeError);
                });
            }
            console.error("완성된 음성을 재생하지 못했습니다.", playError);
            if (ownsReplay()) {
                setError("완성된 음성을 재생하지 못했습니다. 브라우저의 오디오 설정을 확인해 주세요.");
            }
        });
        replayPromiseRef.current = replay;
        void replay.then(() => {
            if (replayPromiseRef.current === replay) {
                replayPromiseRef.current = null;
            }
        });
    };
    return (<main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex flex-col items-center justify-center p-6 text-gray-800">
      <div className="max-w-2xl w-full bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/50">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">
            Gemini 3.8 TTS
          </h1>
          <p className="text-sm text-gray-500 font-medium">차세대 AI 텍스트 음성 변환 솔루션</p>
        </header>

        <section className="space-y-6">
          <button type="button" aria-expanded={showStudio} onClick={()=>setShowStudio(!showStudio)}>목소리 제작·관리 {showStudio?"닫기":"열기"}</button>
          {showStudio&&<VoiceStudio onSelect={ref=>{setVoice(ref.value);setOptions({...options,speakers:options.speakers.map((s,i)=>i===0?{...s,voice:ref}:s)});}}/>}
          <button type="button" aria-expanded={showBatch} onClick={()=>setShowBatch(!showBatch)}>Batch 작업 {showBatch?"닫기":"열기"}</button>
          {showBatch&&<BatchPanel request={{...options,speakers:options.speakers.map((s,i)=>i===0&&s.voice.kind==="prebuilt-name"?{...s,voice:{kind:"prebuilt-name",value:voice}}:s),turns:options.turns.map((t,i)=>i===0?{...t,text,style:stylePrompt}:t)}}/>}
          {/* 텍스트 입력부 */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="tts-text" className="font-semibold text-gray-700">
              변환할 텍스트 (Text Input)
            </label>
            <textarea id="tts-text" className="w-full h-32 p-4 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/50 transition-all resize-none" placeholder="음성으로 변환할 텍스트를 입력해주세요..." value={text} maxLength={maxTextLength} onChange={(e) => setText(e.target.value.slice(0, maxTextLength))} disabled={isLoading} aria-label="음성으로 변환할 텍스트 입력창"/>
          </div>

          {/* 파라미터 조절부 */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="voice-select" className="font-semibold text-gray-700">
                음성 선택
              </label>
              <select id="voice-select" className="w-full p-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/50 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" value={voice} onChange={(e) => { setVoice(e.target.value); setOptions({ ...options, speakers: options.speakers.map((s, i) => i === 0 ? { ...s, voice: { kind: "prebuilt-name", value: e.target.value } } : s) }); }} disabled={isLoading} aria-label="음성 선택">
                {!voices.includes(voice)&&<option value={voice}>맞춤 또는 확장 목소리 (선택됨)</option>}
                {voices.map((v) => (<option key={v} value={v}>
                    {v}
                  </option>))}
              </select>
            </div>
          </div>

          {options.speakers.map((speaker, i) => <VoiceLibrary key={speaker.id} label={`화자 ${speaker.id}`} disabled={isLoading} onSelect={v => { const ref = voiceRef(v); if (i === 0)
        setVoice(ref.value); setOptions({ ...options, speakers: options.speakers.map((s, n) => i === n ? { ...s, voice: ref } : s) }); }}/>)}
          <TtsEditor value={options} onChange={setOptions} disabled={isLoading}/>
          <p>실제 처리 등급: {actualTier === "unknown" ? "미확인" : actualTier}</p>
          {/* 공식 태그는 대본 원문에 유지한다. */}
          <div className="flex flex-col space-y-2">
            <span className="font-semibold text-gray-700">감정 및 효과 태그 (클릭하여 추가)</span>
            <div className="flex flex-wrap gap-2">
              {[
            { id: "laugh", label: "웃음" },
            { id: "sigh", label: "한숨" },
            { id: "cough", label: "기침" },
            { id: "breath", label: "숨소리" },
            { id: "short pause", label: "짧은 휴지" },
            { id: "long pause", label: "긴 휴지" }
        ].map(tag => (<button key={tag.id} onClick={() => setText((previousText) => `${previousText}<${tag.id}> `.slice(0, maxTextLength))} disabled={isLoading} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium hover:bg-pink-200 transition-colors disabled:opacity-50" aria-label={`${tag.label} 태그 추가`}>
                  {tag.label}
                </button>))}
            </div>
            <p className="text-xs text-gray-500">※ 텍스트 내에 태그를 삽입하여 풍부한 감정 변화를 연출해 보세요. (안정적인 오디오 품질을 위해 태그의 연속 사용은 피해주시기 바랍니다.)</p>
          </div>

          {/* 스타일/감정 입력창 */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="style-prompt" className="font-semibold text-gray-700">
              스타일 및 감정 지시어 (Prompt)
            </label>
            <textarea id="style-prompt" className="w-full h-24 p-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/50 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed" placeholder="예: 차분하고 신뢰감 있는 톤" value={stylePrompt} maxLength={1000} onChange={(e) => setStylePrompt(e.target.value)} disabled={isLoading} aria-label="스타일 및 감정 입력창"/>
          </div>

          <div role="status" aria-live="polite" className="sr-only">
            {statusMessage || announcement}
          </div>

          {/* 버튼부 */}
          <button onClick={handleGenerate} disabled={isLoading} className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95 ${isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:shadow-pink-500/25"}`} aria-busy={isLoading} aria-label={isLoading ? "음성 생성 진행 중" : "음성 생성하기 버튼"}>
            {isLoading ? "음성 생성 중..." : "음성 생성 시작"}
          </button>

          {/* 에러 메시지 */}
          {error && (<div className="p-4 rounded-xl bg-red-50 text-red-500 text-sm font-medium border border-red-100" role="alert" aria-live="assertive">
              {error}
            </div>)}

          {/* 결과물 출력부 */}
          {status !== "idle" && (<div className="mt-8 p-6 bg-white/80 rounded-2xl border border-pink-100 shadow-sm flex flex-col items-center space-y-4">
              <h2 aria-live="polite" className="text-lg font-bold text-gray-700">
                {statusMessage}
              </h2>
              <button type="button" disabled={status !== "complete" || !audioUrl} onClick={handleReplay} aria-label="다시 듣기" className="px-6 py-2 rounded-full bg-pink-100 text-pink-600 font-semibold disabled:bg-gray-200 disabled:text-gray-500">
                다시 듣기
              </button>
              {status === "complete" && <button type="button" onClick={() => { const pcm = completedPcmRef.current; if (!pcm)
            return; const result = encodeOutput(pcm, completedOutputRef.current); const url = URL.createObjectURL(new Blob([Uint8Array.from(result.bytes)], { type: result.mime })); const link = document.createElement("a"); link.href = url; link.download = downloadFileName.replace(/\.wav$/, "." + result.ext); link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }}>선택 형식 다운로드</button>}
              {status === "complete" && audioUrl ? (<a href={audioUrl} download={downloadFileName} className="px-6 py-2 rounded-full bg-pink-100 text-pink-600 font-semibold hover:bg-pink-200 transition-colors" aria-label="생성된 음성 파일 다운로드">
                  음성 파일 다운로드 💾
                </a>) : (<span aria-disabled="true" className="px-6 py-2 rounded-full bg-gray-200 text-gray-500 font-semibold">
                  음성 생성이 끝나면 다운로드할 수 있습니다.
                </span>)}
            </div>)}
        </section>
      </div>
    </main>);
}
