import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

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
  console.error(e);
}

const ai = new GoogleGenAI({ apiKey: apiKey });

async function test() {
  const instructions = "Please strictly generate audio for the following text. Do not generate any text, only audio.";
  const text = "안녕하세요, 빈이에요.";
  const prompt = `${instructions}\n\n[Text to Read]\n${text}`;

  try {
    const response2 = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseModalities: ["AUDIO"],
      },
    });
  } catch (e: any) {
    console.log("Error properties:", Object.keys(e));
    console.log("e.status:", e.status);
    console.log("e.code:", e.code);
    console.log("e.name:", e.name);
    console.log("typeof e.message:", typeof e.message);
    console.log("e.message string includes 400?:", e.message.includes("400"));
  }
}

test();
