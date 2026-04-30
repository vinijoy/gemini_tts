import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

// API 키 로드 로직 (기존 유지)
let apiKey = process.env.GEMINI_API_KEY;
try {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/GEMINI_API_KEY=(.*)/);
    if (match && match[1]) {
      apiKey = match[1].trim();
    }
  }
} catch (e) {
  console.error(".env.local 파일 읽기 실패:", e);
}

const ai = new GoogleGenAI({ apiKey: apiKey });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, voice, stylePrompt } = body;

    if (!text) {
      return NextResponse.json(
        { error: "텍스트가 입력되지 않았습니다." },
        { status: 400 }
      );
    }

    const selectedVoice = voice || "Puck";

    // 지침 메시지 구성 (Gemini 3.1 TTS 권장 구조 적용)
    let instructions = "Synthesize speech for the performance defined below.\nThe profile, scene, and performance notes are direction only. Do NOT speak them.\nSpeak ONLY the lines under #### TRANSCRIPT.";
    
    // 사용자가 입력한 stylePrompt(감정/상황)가 있다면 지침에 추가
    if (stylePrompt && stylePrompt.trim() !== "") {
      instructions += `\n\nPerformance Notes: ${stylePrompt.trim()}`;
    }

    const prompt = `${instructions}\n\n#### TRANSCRIPT\n${text}`;
    
    let response: any = null;
    let attempt = 0;
    const maxRetries = 2;

    while (attempt <= maxRetries) {
      try {
        // @google/genai SDK 버전에 따라 인자 구조가 다를 수 있으나 
        // 빈이가 준 구조를 바탕으로 speechConfig를 최적화했어.
        response = await ai.models.generateContent({
          model: "gemini-3.1-flash-tts-preview",
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          config: {
            // @ts-ignore: 최신 SDK 타입 정의가 없을 수 있어 무시 처리
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: selectedVoice
                },
              },
            },
          },
        });
        break;
      } catch (err: any) {
        attempt++;
        if (attempt > maxRetries) throw err;
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }

    let audioData: any = null;
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          audioData = part.inlineData.data;
          break;
        }
      }
    }

    if (!audioData) throw new Error("오디오 데이터가 없습니다.");
    let rawBuffer = typeof audioData === 'string' ? Buffer.from(audioData, "base64") : Buffer.from(audioData);

    let audioBuffer = rawBuffer;
    // WAV 헤더 체크 (RIFF 로 시작하는지)
    if (rawBuffer.length < 4 || rawBuffer.toString('utf8', 0, 4) !== 'RIFF') {
      // 헤더가 없다면 24kHz, 16bit, Mono PCM으로 가정하고 헤더 생성
      const header = Buffer.alloc(44);
      const dataLength = rawBuffer.length;
      header.write('RIFF', 0);
      header.writeUInt32LE(36 + dataLength, 4);
      header.write('WAVE', 8);
      header.write('fmt ', 12);
      header.writeUInt32LE(16, 16);
      header.writeUInt16LE(1, 20); // PCM
      header.writeUInt16LE(1, 22); // 1 channel
      header.writeUInt32LE(24000, 24); // 24000 Hz sample rate
      header.writeUInt32LE(24000 * 1 * 2, 28); // byte rate
      header.writeUInt16LE(2, 32); // block align
      header.writeUInt16LE(16, 34); // bits per sample
      header.write('data', 36);
      header.writeUInt32LE(dataLength, 40);
      
      audioBuffer = Buffer.concat([header, rawBuffer]);
    }

    return new NextResponse(audioBuffer as any, {
      status: 200,
      headers: {
        "Content-Type": "audio/wav",
        "Content-Length": audioBuffer.length.toString()
      },
    });

  } catch (error: any) {
    console.error("TTS API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}