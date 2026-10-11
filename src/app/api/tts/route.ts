import { parseTts, MAX_TTS_JOB_BYTES } from "@/lib/tts-contract";
import { errorResponse, readJson } from "@/lib/gemini-client";
import { openPcm } from "@/lib/gemini-tts";
export async function POST(request:Request){try{const input=parseTts(await readJson(request,MAX_TTS_JOB_BYTES));const {stream,tier}=await openPcm(input,request.signal);return new Response(stream,{headers:{"Content-Type":`audio/l16;rate=${input.output.sampleRate};channels=1`,"Cache-Control":"no-store","X-Content-Type-Options":"nosniff","x-gemini-service-tier":tier,"x-audio-encoding":"PCM16LE"}});}catch(e){return errorResponse(e);}}
