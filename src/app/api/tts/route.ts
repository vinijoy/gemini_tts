import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, type GenerateContentResponse } from "@google/genai";
import fs from "fs";
import path from "path";
import { createPcmStream } from "./stream";

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

    let responses: AsyncGenerator<GenerateContentResponse> | null = null;
    let attempt = 0;
    const maxRetries = 2;

    while (attempt <= maxRetries) {
      try {
        responses = await ai.models.generateContentStream({
          model: "gemini-3.1-flash-tts-preview",
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          config: {
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
        break;
      } catch (error: unknown) {
        attempt++;
        if (attempt > maxRetries) {
          throw error;
        }
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * attempt),
        );
      }
    }

    if (!responses) {
      throw new Error("Gemini 오디오 스트림을 시작하지 못했습니다.");
    }

    return new Response(createPcmStream(responses), {
      headers: {
        "Content-Type": "audio/L16; rate=24000; channels=1",
        "X-Audio-Sample-Rate": "24000",
        "X-Audio-Channels": "1",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-store, no-transform",
      },
    });
  } catch (error: unknown) {
    console.error("TTS API Error:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
