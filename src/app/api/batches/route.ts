import { errorResponse, json, readJson } from "@/lib/gemini-client";
import { createBatch, listBatches } from "@/lib/gemini-batches";
export async function GET(req: Request) { try {
    return json(await listBatches(new URL(req.url).searchParams));
}
catch (e) {
    return errorResponse(e);
} }
export async function POST(req: Request) { try {
    return json(await createBatch(await readJson(req, 1024 * 1024)));
}
catch (e) {
    return errorResponse(e);
} }
