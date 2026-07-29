import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import { preparePcmStream } from "./stream";

// API 키 로드 로직 (기존 유지)
let apiKey = process.env.GEMINI_API_KEY;
try {
  const envPath = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    const match = envContent.match(/GEMINI_API_KEY=(.*)/);
    if (match && match[1]) {
      apiKey = match[1].trim();
    }
  }
} catch (e) {
  console.error(".env.local 파일 읽기 실패:", e);
}

const ai = new GoogleGenAI({ apiKey: apiKey });

interface TtsRequestBody {
  text?: string;
  voice?: string;
  stylePrompt?: string;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "음성 생성 중 알 수 없는 오류가 발생했습니다.";
}

const STREAM_START_ERROR =
  "음성 생성 스트림을 시작하지 못했습니다. 잠시 후 다시 시도해 주세요.";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as TtsRequestBody;
    const { text, voice, stylePrompt } = body;

    if (!text) {
      return NextResponse.json(
        { error: "텍스트가 입력되지 않았습니다." },
        { status: 400 }
      );
    }

    const selectedVoice = voice || "Puck";

    // 지침 메시지 구성 (Gemini 3.1 TTS 권장 구조 적용)
    let instructions =
      "Synthesize speech for the performance defined below.\nThe profile, scene, and performance notes are direction only. Do NOT speak them.\nSpeak ONLY the lines under #### TRANSCRIPT.";

    // 사용자가 입력한 stylePrompt(감정/상황)가 있다면 지침에 추가
    if (stylePrompt && stylePrompt.trim() !== "") {
      instructions += `\n\nPerformance Notes: ${stylePrompt.trim()}`;
    }

    const prompt = `${instructions}\n\n#### TRANSCRIPT\n${text}`;

    const maxRetries = 2;

    for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
      const abortController = new AbortController();

      try {
        const responses = await ai.models.generateContentStream({
          model: "gemini-3.1-flash-tts-preview",
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          config: {
            abortSignal: abortController.signal,
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: selectedVoice,
                },
              },
            },
          },
        });
        const stream = await preparePcmStream(responses, abortController);

        return new Response(stream, {
          headers: {
            "Content-Type": "application/octet-stream",
            "X-Audio-Encoding": "PCM_S16LE",
            "X-Audio-Sample-Rate": "24000",
            "X-Audio-Channels": "1",
            "X-Content-Type-Options": "nosniff",
            "Cache-Control": "no-store, no-transform",
          },
        });
      } catch (error: unknown) {
        abortController.abort();
        if (attempt >= maxRetries) {
          throw new Error(STREAM_START_ERROR, { cause: error });
        }
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (attempt + 1)),
        );
      }
    }

    throw new Error(STREAM_START_ERROR);
  } catch (error: unknown) {
    console.error("TTS API Error:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
