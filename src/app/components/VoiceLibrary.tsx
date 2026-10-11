"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { BASIC_VOICES, type CatalogVoice } from "@/lib/voice-catalog";
import { base64Bytes, parseWav } from "@/utils/audio-format";
export async function api<T>(url: string, init: RequestInit = {}): Promise<T> { const r = await fetch(url, { ...init, cache: "no-store", headers: { "Content-Type": "application/json", ...init.headers } }); let body; try {
    body = await r.json();
}
catch {
    throw new Error("서버 응답을 읽지 못한 상태입니다. 다시 조회하세요.");
} if (!r.ok)
    throw new Error(typeof body.error === "string" ? body.error : "요청에 실패한 상태입니다. 다시 시도하세요."); return body as T; }
export function VoicePreview({preview}:{preview?:CatalogVoice["preview"]}) {
 const audio=useRef<HTMLAudioElement>(null);
 const data=useMemo(()=>{if(!preview)return null;try{const bytes=base64Bytes(preview.data);parseWav(bytes);return bytes;}catch{return null;}},[preview]);
 useEffect(()=>{if(!data||!audio.current)return;const url=URL.createObjectURL(new Blob([Uint8Array.from(data)],{type:"audio/wav"}));audio.current.src=url;return()=>URL.revokeObjectURL(url);},[data]);
 return data?<audio ref={audio} controls aria-label="목소리 미리듣기"/>:<p>제공된 미리듣기 파일이 없거나 올바르지 않은 상태입니다.</p>;
}
export default function VoiceLibrary({ label, onSelect, disabled = false }: {
    label: string;
    onSelect: (voice: CatalogVoice) => void;
    disabled?: boolean;
}) {
    const [source, setSource] = useState("prebuilt"), [filters, setFilters] = useState<Record<string, string>>({}), [voices, setVoices] = useState<CatalogVoice[]>([]), [token, setToken] = useState(""), [busy, setBusy] = useState(false), [message, setMessage] = useState(""), [selected, setSelected] = useState<CatalogVoice | null>(null);
    const generation = useRef(0), seen = useRef(new Set<string>()), controller = useRef<AbortController | null>(null);
    useEffect(() => () => { generation.current++; controller.current?.abort(); }, []);
    async function load(more = false) { controller.current?.abort(); const control = new AbortController(); controller.current = control; const run = ++generation.current; setBusy(true); setMessage(""); try {
        const q = new URLSearchParams({ type: source, page_size: "50" });
        for (const [k, v] of Object.entries(filters))
            if (v.trim())
                for (const part of (k === "search" ? [v] : v.split(",")))
                    q.append(k, part.trim());
        if (more)
            q.set("page_token", token);
        else
            seen.current.clear();
        const result = await api<{
            voices: CatalogVoice[];
            nextPageToken: string;
        }>(`/api/voices?${q}`, { signal: control.signal });
        if (run !== generation.current)
            return;
        if (result.nextPageToken && seen.current.has(result.nextPageToken))
            throw new Error("목록 페이지가 반복된 상태입니다. 처음부터 다시 조회하세요.");
        if (result.nextPageToken)
            seen.current.add(result.nextPageToken);
        setVoices(old => [...new Map([...(more ? old : []), ...result.voices].map(v => [v.id, v])).values()]);
        setToken(result.nextPageToken);
        setMessage(`${result.voices.length}개 목소리를 조회한 상태입니다.`);
    }
    catch (e) {
        if (!control.signal.aborted)
            setMessage(e instanceof Error ? e.message : "조회 실패 상태입니다.");
    }
    finally {
        if (run === generation.current)
            setBusy(false);
    } }
    return <fieldset disabled={disabled || busy} className="border rounded-xl p-3"><legend>{label} 목소리 라이브러리</legend><label>{label} 공식 기본 목소리<select defaultValue="" onChange={e => { const v = BASIC_VOICES.find(v => v.id === e.target.value); if (v) {
        setSelected(v);
        onSelect(v);
    } }}><option value="">선택하세요.</option>{BASIC_VOICES.map(v => <option key={v.id} value={v.id}>{v.name} — {v.description}</option>)}</select></label><details><summary>확장·저장 목소리 검색</summary><label>목소리 종류<select value={source} onChange={e => { setSource(e.target.value); setToken(""); }}><option value="prebuilt">공식 확장 목소리</option><option value="prompted">저장 설계 목소리</option><option value="replicated">저장 복제 목소리</option></select></label>{Object.entries({ language_code: "언어 코드", region_code: "지역 코드", accent: "억양", gender: "성별 표현 (female, male, neutral)", pitch: "높낮이 (low, medium, high)", persona: "인물 특성", contexts: "용도", search: "이름·설명 검색" }).map(([key, name]) => <label key={key}>{label} {name}<input value={filters[key] ?? ""} maxLength={key === "search" ? 2048 : 256} onChange={e => { setFilters({ ...filters, [key]: e.target.value }); setToken(""); }}/></label>)}<p>같은 필터의 쉼표로 구분한 값은 OR, 서로 다른 필터는 AND입니다. 검색은 2,048바이트 제한입니다.</p><button type="button" onClick={() => void load()}>목록 조회</button><ul>{voices.map(v => <li key={v.id}><button type="button" onClick={() => { setSelected(v); onSelect(v); }}>{v.name} · {v.id} · {v.languages.join(", ") || "언어 미제공"}</button></li>)}</ul>{token && <button type="button" onClick={() => void load(true)}>목소리 더 보기</button>}</details><p>{message}</p>{selected && <p>선택 목소리: {selected.name} · {selected.description}</p>}</fieldset>;
}
