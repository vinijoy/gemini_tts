import { errorResponse, json, readJson, guardMutation } from "@/lib/gemini-client";
import { getBatch, batchInfo, cancelBatch, deleteBatch, updatePriority } from "@/lib/gemini-batches";
type Context = {
    params: Promise<{
        id: string;
    }>;
};
export async function GET(req: Request, c: Context) { try {
    return json(batchInfo(await getBatch((await c.params).id)));
}
catch (e) {
    return errorResponse(e);
} }
export async function POST(req: Request, c: Context) { try {
    const body = await readJson(req);
    if (!body || typeof body !== "object" || !("action" in body) || body.action !== "cancel")
        throw new Error();
    return json(await cancelBatch((await c.params).id));
}
catch (e) {
    return errorResponse(e);
} }
export async function DELETE(req: Request, c: Context) { try {
    guardMutation(req);
    return json(await deleteBatch((await c.params).id));
}
catch (e) {
    return errorResponse(e);
} }
export async function PATCH(req: Request, c: Context) { try {
    return json(await updatePriority((await c.params).id, await readJson(req)));
}
catch (e) {
    return errorResponse(e);
} }
