import { errorResponse, json } from "@/lib/gemini-client";
import { batchResults } from "@/lib/gemini-batches";
export async function GET(req: Request, c: {
    params: Promise<{
        id: string;
    }>;
}) { try {
    return json(await batchResults((await c.params).id));
}
catch (e) {
    return errorResponse(e);
} }
