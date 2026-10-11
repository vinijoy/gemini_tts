import { AppError, MODELS, object, parseTts, resourceId, string, type TtsRequest } from "./tts-contract";
import { limitedText, upstream, upstreamJson, uploadJsonl } from "./gemini-client";
import { requestGroups, responseAudio, wireRequest } from "./gemini-tts";
import { bytesBase64, decodeAudio, joinBytes, MAX_AUDIO_BYTES, wavBytes } from "../utils/audio-format";
export const TERMINAL = ["SUCCEEDED", "FAILED", "CANCELLED", "EXPIRED"];
export function normalizeState(value: unknown): string { const state = String(value ?? "").replace(/^(JOB|BATCH)_STATE_/, ""); return ["PENDING", "RUNNING", ...TERMINAL].includes(state) ? state : "UNKNOWN"; }
export type BatchInfo = {
    name: string;
    displayName: string;
    state: string;
    priority: string;
    model: string;
};
function batchName(value: unknown): string { const name = string(value, 256, "Batch 이름"); if (!/^batches\/[A-Za-z0-9_-]+$/.test(name))
    throw new AppError(400, "Batch 이름 형식이 올바르지 않습니다."); return name; }
function details(value: unknown) { const raw = object(value); const metadata = raw.metadata ? object(raw.metadata) : raw; return { raw, metadata }; }
export function batchInfo(value: unknown): BatchInfo { const { raw, metadata } = details(value); return { name: batchName(raw.name), displayName: typeof metadata.displayName === "string" ? metadata.displayName : "", state: normalizeState(metadata.state ?? raw.state ?? (raw.done && raw.error ? "FAILED" : undefined)), priority: String(metadata.priority ?? 0), model: String(metadata.model ?? raw.model ?? "") }; }
export async function listBatches(query: URLSearchParams) { const params = new URLSearchParams(); for (const [key, value] of query) {
    if (key === "pageSize") {
        if (!/^\d+$/.test(value) || +value < 1 || +value > 50)
            throw new AppError(400, "Batch 페이지 크기가 앱 제한을 벗어난 상태입니다.");
        params.set(key, value);
    }
    else if (key === "pageToken")
        params.set(key, string(value, 4096, "페이지"));
    else
        throw new AppError(400, "지원하지 않는 Batch 필터입니다.");
} const raw = object(await upstreamJson(`/v1beta/batches?${params}`)); const operations = raw.operations ?? raw.batchJobs ?? []; if (!Array.isArray(operations))
    throw new AppError(502, "Batch 목록 형식이 올바르지 않은 상태입니다."); return { jobs: operations.map(batchInfo), nextPageToken: typeof raw.nextPageToken === "string" ? raw.nextPageToken : "" }; }
export async function getBatch(id: string) { return upstreamJson(`/v1beta/batches/${resourceId(id)}`, {}, MAX_AUDIO_BYTES * 1.5); }
export async function createBatch(value: unknown) {
    const b = object(value);
    if (!MODELS.includes(b.model as TtsRequest["model"]) || !Array.isArray(b.items) || b.items.length < 1 || b.items.length > 20)
        throw new AppError(400, "Batch 모델 또는 최대 20개인 앱 항목 제한이 올바르지 않습니다.");
    const displayName = string(b.displayName ?? "TTS Batch", 100, "Batch 이름");
    const itemCount=b.items.length;
    const requests = b.items.flatMap((item, group) => { const raw = object(item); if ("model" in raw)
        throw new AppError(400, "Batch 항목별 모델 재지정은 허용되지 않은 상태입니다."); const request = parseTts({ ...raw, model: b.model }); if (request.speakers.some(s => s.voice.kind === "ephemeral-replica"))
        throw new AppError(400, "비저장 목소리 키는 이 앱의 Batch 제출에서 지원하지 않는 상태입니다."); const groups = requestGroups(request); return groups.map((turns, order) => ({ request: wireRequest(request, turns), metadata: { key: `tts-v2-${itemCount}-${group}-${order}-${groups.length}-${request.output.sampleRate}-${request.output.encoding}` } })); });
    if (requests.length > 20)
        throw new AppError(400, "순차 턴 확장 후 최대 20개인 Batch 앱 제한을 넘은 상태입니다.");
    const body = JSON.stringify({ batch: { displayName, inputConfig: { requests: { requests } } } });
    if (new TextEncoder().encode(body).length > 1024 * 1024)
        throw new AppError(413, "Batch 요청이 앱의 UTF-8 1MiB 제한을 넘은 상태입니다.");
    if (b.submission !== undefined && !["inline", "file"].includes(String(b.submission)))
        throw new AppError(400, "Batch 제출 방식이 올바르지 않습니다.");
    let submitted = body;
    let uploaded: string | undefined;
    if (b.submission === "file") {
        uploaded = await uploadJsonl(requests.map(r => JSON.stringify({ key: r.metadata.key, request: r.request })).join("\n"));
        submitted = JSON.stringify({ batch: { displayName, inputConfig: { fileName: uploaded } } });
    }
    let result: unknown;
    try {
        result = await upstreamJson(`/v1beta/models/${b.model}:batchGenerateContent`, { method: "POST", body: submitted });
    }
    catch (e) {
        if (uploaded)
            throw new AppError(502, `입력 파일 ${uploaded} 업로드 후 Batch 응답을 확인하지 못한 상태입니다. 중복 제출 전에 작업 목록을 조회하세요.`);
        throw e;
    }
    return batchInfo(result);
}
export async function cancelBatch(id: string) { resourceId(id); const r = await upstream(`/v1beta/batches/${id}:cancel`, { method: "POST", body: "{}" }); await r.body?.cancel(); return batchInfo(await getBatch(id)); }
export async function deleteBatch(id: string) { const r = await upstream(`/v1beta/batches/${resourceId(id)}`, { method: "DELETE" }); await r.body?.cancel(); return { deleted: true }; }
export async function updatePriority(id: string, value: unknown) { const body = object(value); if (typeof body.priority !== "number" || !Number.isSafeInteger(body.priority))
    throw new AppError(400, "내부 우선순위는 안전한 정수 범위입니다."); const { metadata } = details(await getBatch(id)); if (TERMINAL.includes(normalizeState(metadata.state)))
    throw new AppError(409, "종료된 Batch의 우선순위는 변경할 수 없는 상태입니다."); const result = await upstreamJson(`/v1beta/batches/${resourceId(id)}:updateGenerateContentBatch?updateMask=priority`, { method: "PATCH", body: JSON.stringify({ ...(metadata.model ? { model: metadata.model } : {}), ...(metadata.displayName ? { displayName: metadata.displayName } : {}), ...(metadata.inputConfig ? { inputConfig: metadata.inputConfig } : {}), priority: String(body.priority) }) }); return batchInfo({ name: `batches/${id}`, metadata: result }); }
type Result = {
    key: string;
    group: string;
    state: "complete" | "failed";
    error?: string;
    wav?: string;
    sampleRate?: number;
};
export async function batchResults(id: string): Promise<{
    job: BatchInfo;
    results: Result[];
}> {
    const raw = await getBatch(id);
    const job = batchInfo(raw);
    if (job.state !== "SUCCEEDED")
        throw new AppError(409, "성공으로 종료된 Batch 결과만 회수할 수 있는 상태입니다.");
    const { raw: root, metadata } = details(raw);
    const dest = object(root.dest ?? metadata.output ?? object(root.response ?? {}).output ?? {});
    let rows: unknown = dest.inlinedResponses;
    if (rows && !Array.isArray(rows))
        rows = object(rows).inlinedResponses;
    const file = dest.fileName ?? dest.responsesFile;
    if (file) {
        if (typeof file !== "string" || !/^files\/[A-Za-z0-9_-]+$/.test(file))
            throw new AppError(502, "Batch 결과 파일 경로가 올바르지 않은 상태입니다.");
        const response = await upstream(`/download/v1beta/${file}:download?alt=media`);
        const text = await limitedText(response, MAX_AUDIO_BYTES);
        try {
            rows = text.split(/\r?\n/).filter(l => l.trim()).map(l => JSON.parse(l));
        }
        catch {
            throw new AppError(502, "Batch JSONL 결과가 올바르지 않은 상태입니다.");
        }
    }
    if (!Array.isArray(rows) || rows.length > 20)
        throw new AppError(502, "Batch 결과가 없거나 앱의 20개 제한을 넘은 상태입니다.");
    const seen = new Set<string>();
    const groups = new Map<string, {
        expected: number;
        rate: number;
        encoding: TtsRequest["output"]["encoding"];
        items: Map<number, Uint8Array>;
        failed: boolean;
    }>();
    const results: Result[] = [];
    let expectedGroups:number|null=null;
    let total = 0;
    for (const value of rows) {
        const row = object(value);
        const key = String(row.key ?? object(row.metadata ?? {}).key ?? "");
        if (seen.has(key))
            throw new AppError(502, "중복 Batch 결과 키인 상태입니다.");
        seen.add(key);
        const v2=/^tts-v2-(\d+)-(.+)$/.exec(key);
        if(v2){const count=Number(v2[1]);if(count<1||count>20||expectedGroups!==null&&expectedGroups!==count)throw new AppError(502,"Batch 전체 항목 수가 일치하지 않은 상태입니다.");expectedGroups=count;}
        const match = /^tts-v1-(\d+)-(\d+)-(\d+)-(8000|16000|24000)-(AUDIO_L16|AUDIO_WAV|AUDIO_MULAW|AUDIO_ALAW)$/.exec(v2?`tts-v1-${v2[2]}`:key);
        if (!match) {
            results.push({ key, group: key, state: "failed", error: "이 앱의 요청 정보가 없는 결과입니다." });
            continue;
        }
        const [, group, orderText, countText, rateText, encoding] = match;
        if(expectedGroups!==null&&Number(group)>=expectedGroups)throw new AppError(502,"Batch 그룹 번호가 범위를 벗어난 상태입니다.");
        const order = Number(orderText), expected = Number(countText), rate = Number(rateText);
        if (expected < 1 || expected > 20 || order >= expected)
            throw new AppError(502, "Batch 결과 순서가 올바르지 않은 상태입니다.");
        let g = groups.get(group);
        if (!g) {
            g = { expected, rate, encoding: encoding as TtsRequest["output"]["encoding"], items: new Map(), failed: false };
            groups.set(group, g);
        }
        if (g.expected !== expected || g.rate !== rate || g.encoding !== encoding)
            throw new AppError(502, "Batch 결과 설정이 일치하지 않은 상태입니다.");
        try {
            if (row.error)
                throw new Error();
            const parts = responseAudio(row.response);
            if (!parts.some(p => p.finish === "STOP"))
                throw new Error();
            const data = joinBytes(parts.filter(p => p.data.length).map(p => p.data));
            const mime = parts.find(p => p.data.length)?.mime;
            if (!mime || parts.some(p => p.data.length && p.mime !== mime))
                throw new Error();
            const pcm = decodeAudio(data, mime, { encoding: g.encoding, sampleRate: rate });
            if (!pcm.length || pcm.length % 2)
                throw new Error();
            total += pcm.length;
            if (total > MAX_AUDIO_BYTES)
                throw new AppError(413, "Batch 결과 오디오가 32MiB 앱 제한을 넘은 상태입니다.");
            g.items.set(order, pcm);
        }
        catch (e) {
            if (e instanceof AppError && e.status === 413)
                throw e;
            g.failed = true;
            results.push({ key, group, state: "failed", error: "항목이 실패했거나 오디오가 불완전한 상태입니다." });
        }
    }
    const expectedRequests = object(object(metadata.inputConfig ?? {}).requests ?? {}).requests;
    if (Array.isArray(expectedRequests)) {
        for (const row of expectedRequests) {
            const key = String(object(object(row).metadata ?? {}).key ?? "");
            if (!seen.has(key)) {
                results.push({ key, group: key, state: "failed", error: "요청한 항목의 결과가 누락된 상태입니다." });
                const group = key.split("-")[key.startsWith("tts-v2-")?3:2];
                const g = groups.get(group);
                if (g)
                    g.failed = true;
            }
        }
    }
    if(expectedGroups!==null){for(let i=0;i<expectedGroups;i++)if(!groups.has(String(i)))results.push({key:`missing-group-${i}`,group:String(i),state:"failed",error:"이 항목의 모든 결과가 누락된 상태입니다."});}
    if(rows.length===0)throw new AppError(502,"Batch 결과 항목이 비어 있는 상태입니다.");
    for (const [group, g] of groups) {
        if (g.failed || g.items.size !== g.expected) {
            results.push({ key: `group-${group}`, group, state: "failed", error: "모든 발화가 성공하지 않아 완성본을 만들 수 없는 상태입니다." });
            continue;
        }
        const pcm = joinBytes(Array.from({ length: g.expected }, (_, i) => g.items.get(i)!));
        results.push({ key: `group-${group}`, group, state: "complete", wav: bytesBase64(wavBytes(pcm, g.rate)), sampleRate: g.rate });
    }
    return { job, results };
}
