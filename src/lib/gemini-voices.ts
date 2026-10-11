import { AppError, MODELS, object, resourceId, string } from "./tts-contract";
import { upstreamJson, upstream } from "./gemini-client";
import { catalogVoice,parseProvidedCatalog, type CatalogVoice } from "./voice-catalog";
import { readFile } from "node:fs/promises";
import { base64Bytes, parseWav } from "../utils/audio-format";
export const CONSENT_PHRASE = "I am the owner of this voice and I consent to Google using this voice to create a synthetic voice model.";
const filters = ["type", "language_code", "region_code", "accent", "gender", "pitch", "persona", "context"];
export function voiceQuery(query: URLSearchParams) { const out = new URLSearchParams(); for (const [key, val] of query) {
    const name = key === "contexts" ? "context" : key;
    if (filters.includes(name)) {
        string(val, 256, "필터");
        if (name === "type" && !["prebuilt", "prompted", "replicated"].includes(val) || name === "gender" && !["male", "female", "neutral"].includes(val) || name === "pitch" && !["low", "medium", "high"].includes(val))
            throw new AppError(400, "목소리 필터가 올바르지 않습니다.");
        out.append(name, val);
    }
    else if (name === "search") {
        if (new TextEncoder().encode(val).length > 2048)
            throw new AppError(400, "검색어가 2,048바이트 제한을 넘은 상태입니다.");
        out.set(name, val);
    }
    else if (name === "page_size") {
        if (!/^\d+$/.test(val) || Number(val) < 1 || Number(val) > 50)
            throw new AppError(400, "페이지 크기는 앱 제한 1~50 범위입니다.");
        out.set(name, val);
    }
    else if (name === "page_token")
        out.set(name, string(val, 4096, "페이지"));
    else
        throw new AppError(400, "지원되지 않는 목소리 필터입니다.");
} if (!out.has("page_size"))
    out.set("page_size", "50"); return out; }
export async function listVoices(query: URLSearchParams) {
 if(query.get("source")==="provided"){const local=new URLSearchParams(query);local.delete("source");const browse=local.get("browse")==="1";if(browse)local.delete("browse");const q=voiceQuery(local);const document=await readFile("GEMINI-TTS-VOICES.md","utf8");if(document.length>2*1024*1024)throw new AppError(413,"제공 목록이 앱의 2MiB 제한을 넘은 상태입니다.");let voices=parseProvidedCatalog(document);const fields:Record<string,keyof CatalogVoice>={type:"type",language_code:"languages",region_code:"regions",gender:"gender",pitch:"pitch",accent:"accent",persona:"persona",context:"contexts"};for(const [key,field] of Object.entries(fields)){const values=q.getAll(key).map(v=>v.toLowerCase());if(values.length)voices=voices.filter(v=>{const raw=v[field];return (Array.isArray(raw)?raw:[raw]).some(x=>typeof x==="string"&&values.includes(x.toLowerCase()));});}const search=q.get("search")?.toLowerCase();if(search)voices=voices.filter(v=>`${v.name} ${v.description}`.toLowerCase().includes(search));const token=q.get("page_token")??"0";if(!/^\d{1,6}$/.test(token))throw new AppError(400,"제공 목록 페이지가 올바르지 않습니다.");const offset=browse?0:Number(token),size=browse?voices.length:Number(q.get("page_size"));return {voices:voices.slice(offset,offset+size),nextPageToken:offset+size<voices.length?String(offset+size):"",totalCount:voices.length,catalogSource:"사용자 제공 2026-10-01 목록 (현재 키의 접근 검증과 별도)"};}
 const raw = object(await upstreamJson(`/v1beta/voices?${voiceQuery(query)}`)); if (raw.voices !== undefined && !Array.isArray(raw.voices))
    throw new AppError(502, "목소리 목록이 올바르지 않은 상태입니다."); const voices = (raw.voices as unknown[] | undefined ?? []).map(catalogVoice); const unique = [...new Map(voices.map(v => [v.id, v])).values()]; if (unique.some(v => !v.id))
    throw new AppError(502, "목록 식별자가 없는 상태입니다."); return { voices: unique, nextPageToken: typeof raw.next_page_token === "string" ? raw.next_page_token : "" }; }
function preview(raw: Record<string, unknown>, voice: CatalogVoice) { if (raw.sample_audio && voice.type === "prompted") {
    const audio = object(raw.sample_audio);
    if (audio.mime_type !== "audio/wav" || typeof audio.data !== "string")
        throw new AppError(502, "미리듣기 형식이 올바르지 않은 상태입니다.");
    parseWav(base64Bytes(audio.data));
    voice.preview = { data: audio.data, mime: "audio/wav" };
} return voice; }
export async function getVoice(id: string) { const raw = object(await upstreamJson(`/v1beta/voices/${resourceId(id)}`, {}, 12 * 1024 * 1024)); return preview(raw, catalogVoice(raw)); }
export async function deleteVoice(id: string) { const response = await upstream(`/v1beta/voices/${resourceId(id)}`, { method: "DELETE" }); await response.body?.cancel(); return { deleted: true }; }
function uploadAudio(value: unknown, source: boolean) { const a = object(value); if (a.mime_type !== "audio/wav")
    throw new AppError(400, "이 앱은 검증 가능한 모노 PCM16 WAV 업로드만 지원하는 상태입니다."); const data = string(a.data, 8 * 1024 * 1024, "녹음"); const bytes = base64Bytes(data); if (bytes.length > 5 * 1024 * 1024)
    throw new AppError(413, "녹음이 앱의 파일당 5MiB 제한을 넘은 상태입니다."); let wav; try {
    wav = parseWav(bytes);
}
catch {
    throw new AppError(400, "녹음의 WAV 구조가 올바르지 않습니다.");
} if (source && (wav.duration < 10 || wav.duration > 30))
    throw new AppError(400, "참조 녹음은 10~30초 범위입니다."); if (!source && wav.duration > 60)
    throw new AppError(400, "동의 녹음이 앱의 60초 제한을 넘은 상태입니다."); return { mime_type: "audio/wav", data }; }
export async function createVoice(value: unknown) { const b = object(value), v = object(b.voice); if (typeof b.store !== "boolean" || !MODELS.includes(v.model as typeof MODELS[number]) || !["prompted", "replicated"].includes(String(v.type)))
    throw new AppError(400, "목소리 생성 설정이 올바르지 않습니다."); const voice: Record<string, unknown> = { model: v.model, type: v.type }; if (b.store) {
    if (v.display_name !== undefined)
        voice.display_name = string(v.display_name, 100, "목소리 이름");
    for (const k of ["language_code", "region_code", "accent", "gender", "pitch", "persona", "context"]) {
        if (v[k] !== undefined) {
            const values = Array.isArray(v[k]) ? v[k] : [v[k]];
            for (const x of values)
                string(x, 100, "목소리 메타데이터");
            voice[k] = v[k];
        }
    }
} if (v.type === "prompted") {
    if (!b.store)
        throw new AppError(400, "설계 목소리는 저장형만 지원하는 상태입니다.");
    voice.prompted = { input: string(object(v.prompted).input, 2000, "설계 설명") };
}
else {
    if (b.confirmedAdultOwner !== true || b.confirmedSameSpeaker !== true || b.confirmedConsentPhrase !== true)
        throw new AppError(400, "성인 본인·동일 화자·공식 동의문 확인이 없는 상태입니다.");
    const r = object(v.replicated);
    voice.replicated = { source_audio: uploadAudio(r.source_audio, true), consent_audio: uploadAudio(r.consent_audio, false) };
} const raw = object(await upstreamJson("/v1beta/voices", { method: "POST", body: JSON.stringify({ store: b.store, voice }) }, 12 * 1024 * 1024)); const result = preview(raw, catalogVoice({ ...raw, type: raw.type ?? v.type })); if (b.store && !result.id)
    throw new AppError(502, "저장 목소리 식별자가 없는 상태입니다. 중복 생성 전에 목록을 조회하세요."); if (!b.store) {
    result.key = string(raw.key, 4096, "비저장 목소리 키");
    result.name = "이번 세션의 비저장 복제 목소리";
} return result; }
