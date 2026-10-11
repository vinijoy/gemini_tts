import { errorResponse, json, guardMutation } from "@/lib/gemini-client";
import { getVoice, deleteVoice } from "@/lib/gemini-voices";
type Context = {
    params: Promise<{
        id: string;
    }>;
};
export async function GET(req: Request, context: Context) { try {
    return json(await getVoice((await context.params).id));
}
catch (e) {
    return errorResponse(e);
} }
export async function DELETE(req: Request, context: Context) { try {
    guardMutation(req);
    return json(await deleteVoice((await context.params).id));
}
catch (e) {
    return errorResponse(e);
} }
