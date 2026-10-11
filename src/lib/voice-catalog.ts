import { VOICE_NAMES, object, AppError, type VoiceRef } from "./tts-contract";
export type CatalogVoice = {
    id: string;
    type: "prebuilt" | "prompted" | "replicated";
    name: string;
    description: string;
    languages: string[];
    regions: string[];
    gender: string;
    accent: string[];
    pitch: string;
    persona: string[];
    contexts: string[];
    expires?: string;
    preview?: {
        data: string;
        mime: string;
    };
    key?: string;
};
const descriptions = ["Bright", "Upbeat", "Informative", "Firm", "Excitable", "Youthful", "Firm", "Breezy", "Easy-going", "Bright", "Breathy", "Clear", "Easy-going", "Smooth", "Smooth", "Clear", "Gravelly", "Informative", "Upbeat", "Soft", "Firm", "Even", "Mature", "Forward", "Friendly", "Casual", "Gentle", "Lively", "Knowledgeable", "Warm"];
export const BASIC_VOICES: CatalogVoice[] = VOICE_NAMES.map((id, i) => ({ id, type: "prebuilt", name: id, description: descriptions[i], languages: [], regions: [], gender: "", accent: [], pitch: "", persona: [], contexts: [] }));
export const strings = (v: unknown): string[] => Array.isArray(v) ? v.filter((s): s is string => typeof s === "string").slice(0, 100) : typeof v === "string" ? [v] : [];
const text = (v: unknown, max = 4096) => typeof v === "string" ? v.slice(0, max) : "";
export function catalogVoice(value: unknown): CatalogVoice { const v = object(value); if (!["prebuilt", "prompted", "replicated"].includes(String(v.type)))
    throw new AppError(502, "목소리 종류를 확인할 수 없는 상태입니다."); const id = text(v.id, 256); if (id && !/^[A-Za-z0-9_-]+$/.test(id))
    throw new AppError(502, "목소리 식별자가 올바르지 않은 상태입니다."); return { id, type: v.type as CatalogVoice["type"], name: text(v.display_name, 256) || id, description: text(v.description), languages: strings(v.language_code), regions: strings(v.region_code), gender: text(v.gender, 50), accent: strings(v.accent), pitch: text(v.pitch, 50), persona: strings(v.persona), contexts: strings(v.context), ...(typeof v.expire_time === "string" ? { expires: v.expire_time } : {}) }; }
export function voiceRef(voice: CatalogVoice): VoiceRef { if (voice.key)
    return { kind: "ephemeral-replica", value: voice.key }; return { kind: voice.type === "prebuilt" ? (VOICE_NAMES.includes(voice.id) ? "prebuilt-name" : "prebuilt-id") : "stored-custom", value: voice.id }; }
