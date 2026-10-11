import { readFileSync } from "node:fs";
import { AppError } from "./tts-contract";
const HOST = "https://generativelanguage.googleapis.com";
export function apiKey(): string {
    let key = process.env.GEMINI_API_KEY;
    try {
        const line = readFileSync(".env.local", "utf8").match(/^\s*(?:export\s+)?GEMINI_API_KEY\s*=\s*(.*?)\s*$/m)?.[1];
        if (line)
            key = line.replace(/^(['"])(.*)\1$/, "$2");
    }
    catch { }
    if (!key)
        throw new AppError(503, "음성 서비스 키가 설정되지 않은 상태입니다. 서버 설정을 확인하세요.");
    return key;
}
export async function upstream(path: string, init: RequestInit = {}): Promise<Response> {
    if (!/^\/(?:v1beta|download\/v1beta|upload\/v1beta)\//.test(path) || path.includes("..") || path.includes("\\"))
        throw new AppError(400, "서비스 경로가 올바르지 않습니다.");
    const response = await fetch(HOST + path, { ...init, cache: "no-store", redirect: "error", signal: init.signal ? AbortSignal.any([init.signal,AbortSignal.timeout(120000)]) : AbortSignal.timeout(120000), headers: { "Content-Type": "application/json", ...init.headers, "x-goog-api-key": apiKey() } });
    if (!response.ok) {
        const status = response.status;
        let retry: number | null = null;
        if (status === 429) {
            const detail = await limitedText(response, 16384).catch(() => "");
            const match = detail.match(/retryDelay[\"]?\s*:\s*[\"]?([0-9.]+)s/i) ?? detail.match(/retry in ([0-9.]+)s/i);
            const seconds = Number(response.headers.get("retry-after") ?? match?.[1]);
            if (/GenerateRequestsPerMinute|generate_requests_per_model/i.test(detail) && !/GenerateRequestsPerDay|generate_content_free_tier_requests/i.test(detail) && seconds >= 1 && seconds <= 65)
                retry = seconds * 1000;
        }
        else
            await response.body?.cancel();
        throw new AppError(status === 429 ? 429 : status === 404 ? 404 : status === 401 || status === 403 ? 403 : 502, status === 429 ? "음성 서비스 요청 한도가 초과된 상태입니다. 잠시 후 다시 시도하세요." : status === 404 ? "요청한 목소리 또는 작업이 없거나 만료된 상태입니다." : status === 401 || status === 403 ? "이 기능에 대한 계정 권한이 없는 상태입니다. 키와 서비스 권한을 확인하세요." : "음성 서비스 응답에 문제가 있는 상태입니다. 잠시 후 다시 시도하세요.", retry);
    }
    return response;
}
export async function limitedText(response: Response, limit = 1024 * 1024): Promise<string> {
    if (!response.body)
        return "";
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let size = 0, text = "";
    try {
        while (true) {
            const r = await reader.read();
            if (r.done)
                break;
            size += r.value.length;
            if (size > limit)
                throw new AppError(413, "응답이 앱 용량 제한을 넘은 상태입니다.");
            text += decoder.decode(r.value, { stream: true });
        }
        return text + decoder.decode();
    }
    finally {
        await reader.cancel().catch(() => { });
        reader.releaseLock();
    }
}
export async function upstreamJson(path: string, init: RequestInit = {}, limit = 1024 * 1024): Promise<unknown> { const response = await upstream(path, init); try {
    return JSON.parse(await limitedText(response, limit));
}
catch (e) {
    if (e instanceof AppError)
        throw e;
    throw new AppError(502, "서비스 응답 형식이 올바르지 않은 상태입니다. 다시 조회하세요.");
} }
export function guardMutation(req: Request) { const origin = req.headers.get("origin"); if (origin && origin !== new URL(req.url).origin)
    throw new AppError(403, "다른 사이트의 변경 요청은 허용되지 않은 상태입니다."); if (req.headers.get("sec-fetch-site") === "cross-site")
    throw new AppError(403, "다른 사이트의 변경 요청은 허용되지 않은 상태입니다."); }
export async function readJson(req: Request, limit = 65536): Promise<unknown> { guardMutation(req); if (!req.headers.get("content-type")?.startsWith("application/json"))
    throw new AppError(415, "JSON 요청 형식이 아닌 상태입니다."); try {
    return JSON.parse(await limitedText(new Response(req.body), limit));
}
catch (e) {
    if (e instanceof AppError)
        throw e;
    throw new AppError(400, "JSON 요청 형식이 올바르지 않습니다.");
} }
export function errorResponse(error: unknown): Response { return Response.json({ error: error instanceof AppError ? error.message : "요청 처리 중 오류가 발생한 상태입니다. 잠시 후 다시 시도하세요." }, { status: error instanceof AppError ? error.status : 502, headers: { "Cache-Control": "no-store" } }); }
export function json(data: unknown): Response { return Response.json(data, { headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } }); }
export async function uploadJsonl(text: string): Promise<string> { const size = new TextEncoder().encode(text).length; if (size > 1024 * 1024)
    throw new AppError(413, "입력 파일이 앱의 1MiB 제한을 넘은 상태입니다."); const start = await upstream("/upload/v1beta/files", { method: "POST", headers: { "X-Goog-Upload-Protocol": "resumable", "X-Goog-Upload-Command": "start", "X-Goog-Upload-Header-Content-Length": String(size), "X-Goog-Upload-Header-Content-Type": "application/jsonl" }, body: JSON.stringify({ file: { display_name: "TTS Batch input" } }) }); const location = start.headers.get("x-goog-upload-url"); await start.body?.cancel(); let url: URL; try {
    url = new URL(location ?? "");
}
catch {
    throw new AppError(502, "파일 업로드 주소가 없는 상태입니다.");
} if (url.origin !== HOST || !url.pathname.startsWith("/upload/v1beta/files") || url.username || url.password || url.hash)
    throw new AppError(502, "파일 업로드 주소가 올바르지 않은 상태입니다."); const response = await upstreamJson(url.pathname + url.search, { method: "POST", headers: { "Content-Type": "application/jsonl", "X-Goog-Upload-Offset": "0", "X-Goog-Upload-Command": "upload, finalize" }, body: text }); const name = (response as {
    file?: {
        name?: unknown;
    };
})?.file?.name; if (typeof name !== "string" || !/^files\/[A-Za-z0-9_-]+$/.test(name))
    throw new AppError(502, "업로드 파일 이름이 올바르지 않은 상태입니다."); return name; }
