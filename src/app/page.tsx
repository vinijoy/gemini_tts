"use client";

import { useEffect, useRef, useState } from "react";
import { PcmChunkAssembler, createWavBlob } from "@/utils/pcm-audio";
import { StreamingPcmPlayer } from "@/utils/streaming-player";

type GenerationStatus = "idle" | "streaming" | "complete";

export default function Home() {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("Puck");
  const [stylePrompt, setStylePrompt] = useState("");
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<StreamingPcmPlayer | null>(null);
  const requestControllerRef = useRef<AbortController | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const requestIdRef = useRef(0);
  const isLoading = status === "streaming";
  const statusMessage =
    status === "streaming"
      ? "음성을 생성하며 재생하고 있습니다."
      : status === "complete"
        ? "음성 생성이 완료되었습니다."
        : "";

  const voices = ["Puck", "Aoede", "Charon", "Kore", "Fenrir"];

  useEffect(
    () => () => {
      requestIdRef.current += 1;
      requestControllerRef.current?.abort();
      requestControllerRef.current = null;

      const player = playerRef.current;
      playerRef.current = null;
      if (player) {
        void player
          .close()
          .catch((closeError: unknown) =>
            console.error("오디오 재생기 정리에 실패했습니다.", closeError),
          );
      }

      const url = audioUrlRef.current;
      audioUrlRef.current = null;
      if (url) URL.revokeObjectURL(url);
    },
    [],
  );

  const handleGenerate = async () => {
    if (isLoading) return;

    if (!text.trim()) {
      setError("변환할 텍스트를 입력해주세요.");
      return;
    }

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setError(null);
    setStatus("streaming");
    setAudioUrl(null);

    requestControllerRef.current?.abort();
    requestControllerRef.current = null;

    const previousPlayer = playerRef.current;
    playerRef.current = null;
    if (previousPlayer) {
      try {
        await previousPlayer.close();
      } catch (closeError) {
        console.error("오디오 재생기 정리에 실패했습니다.", closeError);
      }
    }

    const previousUrl = audioUrlRef.current;
    audioUrlRef.current = null;
    if (previousUrl) URL.revokeObjectURL(previousUrl);

    if (requestIdRef.current !== requestId) return;

    const requestController = new AbortController();
    requestControllerRef.current = requestController;
    let player: StreamingPcmPlayer | null = null;

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, voice, stylePrompt }),
        signal: requestController.signal,
      });

      if (requestIdRef.current !== requestId) return;

      if (!response.ok) {
        let errorMessage = "응답 처리 중 에러가 발생했어!";
        try {
          const errData = (await response.json()) as {
            details?: string;
            error?: string;
          };
          errorMessage = errData.details
            ? `${errData.error} (${errData.details})`
            : errData.error || errorMessage;
        } catch {
          // JSON 파싱 실패 시 텍스트라도 읽어봄
          const textErr = await response.text();
          if (textErr) errorMessage = textErr;
        }
        throw new Error(errorMessage);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("음성 스트림을 열 수 없습니다.");

      const assembler = new PcmChunkAssembler();
      player = new StreamingPcmPlayer();
      playerRef.current = player;

      while (true) {
        const { value, done } = await reader.read();
        if (requestIdRef.current !== requestId) return;
        if (done) break;
        await player.enqueue(assembler.push(value));
      }

      const pcmBytes = assembler.getBytes();
      if (pcmBytes.length === 0) {
        throw new Error("생성된 오디오 데이터가 없습니다.");
      }

      const url = URL.createObjectURL(createWavBlob(pcmBytes));
      audioUrlRef.current = url;
      setAudioUrl(url);
      setStatus("complete");
    } catch (err: unknown) {
      if (requestControllerRef.current === requestController) {
        requestController.abort();
        requestControllerRef.current = null;
      }

      if (player && playerRef.current === player) {
        playerRef.current = null;
        try {
          await player.close();
        } catch (closeError) {
          console.error("오디오 재생기 정리에 실패했습니다.", closeError);
        }
      }

      if (requestIdRef.current !== requestId) return;

      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "음성 생성에 실패했습니다. API 설정 및 네트워크를 확인해주세요.",
      );
      setStatus("idle");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex flex-col items-center justify-center p-6 text-gray-800">
      <div className="max-w-2xl w-full bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/50">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">
            Gemini 3.1 Flash TTS
          </h1>
          <p className="text-sm text-gray-500 font-medium">차세대 AI 텍스트 음성 변환 솔루션</p>
        </header>

        <section className="space-y-6">
          {/* 텍스트 입력부 */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="tts-text" className="font-semibold text-gray-700">
              변환할 텍스트 (Text Input)
            </label>
            <textarea
              id="tts-text"
              className="w-full h-32 p-4 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/50 transition-all resize-none"
              placeholder="음성으로 변환할 텍스트를 입력해주세요..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isLoading}
              aria-label="음성으로 변환할 텍스트 입력창"
            />
          </div>

          {/* 파라미터 조절부 */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="voice-select" className="font-semibold text-gray-700">
                음성 선택
              </label>
              <select
                id="voice-select"
                className="w-full p-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/50 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
                disabled={isLoading}
                aria-label="음성 선택"
              >
                {voices.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 파라미터 조절부 (Gemini 3.1 태그 방식) */}
          <div className="flex flex-col space-y-2">
            <span className="font-semibold text-gray-700">감정 및 효과 태그 (클릭하여 추가)</span>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "laughs", label: "웃음" },
                { id: "whispers", label: "속삭임" },
                { id: "enthusiasm", label: "열정" },
                { id: "nervousness", label: "긴장" },
                { id: "determination", label: "단호함" },
                { id: "frustration", label: "좌절" },
                { id: "excitement", label: "신남" },
                { id: "curiosity", label: "호기심" },
                { id: "tension", label: "긴장감" },
                { id: "sad", label: "슬픔" },
                { id: "anger", label: "분노" }
              ].map(tag => (
                <button
                  key={tag.id}
                  onClick={() => setText(prev => prev + `[${tag.id}] `)}
                  disabled={isLoading}
                  className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium hover:bg-pink-200 transition-colors disabled:opacity-50"
                  aria-label={`${tag.label} 태그 추가`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500">※ 텍스트 내에 태그를 삽입하여 풍부한 감정 변화를 연출해 보세요. (안정적인 오디오 품질을 위해 태그의 연속 사용은 피해주시기 바랍니다.)</p>
          </div>

          {/* 스타일/감정 입력창 */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="style-prompt" className="font-semibold text-gray-700">
              스타일 및 감정 지시어 (Prompt)
            </label>
            <textarea
              id="style-prompt"
              className="w-full h-24 p-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/50 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="예: 차분하고 신뢰감 있는 톤"
              value={stylePrompt}
              onChange={(e) => setStylePrompt(e.target.value)}
              disabled={isLoading}
              aria-label="스타일 및 감정 입력창"
            />
          </div>

          <div role="status" aria-live="polite" className="sr-only">
            {statusMessage}
          </div>

          {/* 버튼부 */}
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:shadow-pink-500/25"
            }`}
            aria-busy={isLoading}
            aria-label={isLoading ? "음성 생성 진행 중" : "음성 생성하기 버튼"}
          >
            {isLoading ? "음성 생성 중..." : "음성 생성 시작"}
          </button>

          {/* 에러 메시지 */}
          {error && (
            <div className="p-4 rounded-xl bg-red-50 text-red-500 text-sm font-medium border border-red-100" role="alert" aria-live="assertive">
              {error}
            </div>
          )}

          {/* 결과물 출력부 */}
          {status !== "idle" && (
            <div className="mt-8 p-6 bg-white/80 rounded-2xl border border-pink-100 shadow-sm flex flex-col items-center space-y-4">
              <h2 className="text-lg font-bold text-gray-700">
                {statusMessage}
              </h2>
              <button
                type="button"
                disabled={status !== "complete" || !audioUrl}
                onClick={() => {
                  const audio = audioRef.current;
                  if (!audio) return;
                  audio.currentTime = 0;
                  void audio.play();
                }}
                aria-label="다시 듣기"
                className="px-6 py-2 rounded-full bg-pink-100 text-pink-600 font-semibold disabled:bg-gray-200 disabled:text-gray-500"
              >
                다시 듣기
              </button>
              {status === "complete" && audioUrl ? (
                <>
                  <audio ref={audioRef} src={audioUrl} preload="metadata" />
                  <a
                    href={audioUrl}
                    download={`gemini_tts_${voice}.wav`}
                    className="px-6 py-2 rounded-full bg-pink-100 text-pink-600 font-semibold hover:bg-pink-200 transition-colors"
                    aria-label="생성된 음성 파일 다운로드"
                  >
                    음성 파일 다운로드 💾
                  </a>
                </>
              ) : (
                <span
                  aria-disabled="true"
                  className="px-6 py-2 rounded-full bg-gray-200 text-gray-500 font-semibold"
                >
                  음성 생성이 끝나면 다운로드할 수 있습니다.
                </span>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
