import { errorResponse, json, readJson } from "@/lib/gemini-client";
import { createVoice, listVoices } from "@/lib/gemini-voices";
export async function GET(req: Request) { try {
    return json(await listVoices(new URL(req.url).searchParams));
}
catch (e) {
    return errorResponse(e);
} }
export async function POST(req: Request) { try {
    return json(await createVoice(await readJson(req, 15 * 1024 * 1024)));
}
catch (e) {
    return errorResponse(e);
} }
