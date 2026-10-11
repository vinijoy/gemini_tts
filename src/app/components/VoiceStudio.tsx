"use client";
import { TabSelect } from "./TabPanel";
import LocaleSelect from "./LocaleSelect";
import { MODEL_LABELS, GENDERS, VOICE_TYPES } from "@/lib/tts-labels";
import { useRef, useState } from "react";
import { MODELS, type VoiceRef } from "@/lib/tts-contract";
import { voiceRef, type CatalogVoice } from "@/lib/voice-catalog";
import { base64Bytes, bytesBase64, parseWav } from "@/utils/audio-format";
import { api, VoicePreview, Announce } from "./VoiceLibrary";
const CONSENT = "I am the owner of this voice and I consent to Google using this voice to create a synthetic voice model.";
export default function VoiceStudio({ onSelect }: {
    onSelect: (voice: VoiceRef) => void;
}) {
    const [mode, setMode] = useState("prompted"), [name, setName] = useState(""), [description, setDescription] = useState(""), [model, setModel] = useState<string>(MODELS[0]), [language, setLanguage] = useState(""), [gender, setGender] = useState(""), [store, setStore] = useState(true), [checks, setChecks] = useState([false, false, false]), [source, setSource] = useState<File | null>(null), [consent, setConsent] = useState<File | null>(null), [voice, setVoice] = useState<CatalogVoice | null>(null), [id, setId] = useState(""), [busy, setBusy] = useState(false), [message, setMessage] = useState(""), [confirmDelete, setConfirmDelete] = useState(false);
    const actionRef = useRef<HTMLButtonElement>(null);
    async function act(action: () => Promise<void>) { if (busy)
        return; setBusy(true); setMessage(""); try {
        await action();
    }
    catch (e) {
        setMessage(e instanceof Error ? e.message : "목소리 작업 실패 상태입니다.");
    }
    finally {
        setBusy(false);
        // 요청 완료 시점의 패널을 확인하여 숨은 버튼이 현재 초점을 가져가지 않게 한다.
        if (!actionRef.current?.closest("[hidden], [inert]")) actionRef.current?.focus();
    } }
    async function fileData(file: File | null, isSource: boolean) { if (!file || file.size > 5 * 1024 * 1024)
        throw new Error("녹음 파일이 없거나 앱의 5MiB 제한을 넘은 상태입니다."); const bytes = new Uint8Array(await file.arrayBuffer()); const wav = parseWav(bytes); if (isSource && (wav.duration < 10 || wav.duration > 30) || !isSource && wav.duration > 60)
        throw new Error("녹음 길이가 참조 10~30초·동의 최대 60초인 앱 제한을 벗어난 상태입니다."); return { mime_type: "audio/wav", data: bytesBase64(bytes) }; }
    async function create() { const v: Record<string, unknown> = { model, type: mode, ...(name ? { display_name: name } : {}), ...(language ? { language_code: [language] } : {}), ...(gender ? { gender } : {}) }; if (mode === "prompted")
        v.prompted = { input: description };
    else {
        v.replicated = { source_audio: await fileData(source, true), consent_audio: await fileData(consent, false) };
    } const result = await api<CatalogVoice>("/api/voices", { method: "POST", body: JSON.stringify({ store: mode === "prompted" ? true : store, voice: v, confirmedAdultOwner: checks[0], confirmedSameSpeaker: checks[1], confirmedConsentPhrase: checks[2] }) }); if (result.preview)
        parseWav(base64Bytes(result.preview.data)); setVoice(result); setId(result.id); setSource(null); setConsent(null); setChecks([false, false, false]); onSelect(voiceRef(result)); setMessage("목소리를 생성하여 화자 A에 선택한 상태입니다."); }
    return <section aria-label="목소리 제작과 관리" className="border rounded-xl p-4"><h2>목소리 제작과 관리</h2><p>저장형은 프로젝트 공유 최대 200개이며 마지막 사용 후 1년간 유효합니다. 비저장 복제 키는 7일 유효하며 이 화면 메모리에만 두므로 새로고침하면 사라집니다.</p><fieldset disabled={busy}><legend>목소리 만들기</legend><label>제작 방식<TabSelect value={mode} onChange={e => setMode(e.target.value)}><option value="prompted">설명으로 만들기 — 원하는 목소리를 글로 설명</option><option value="replicated">녹음으로 복제하기 — 본인의 목소리 녹음 사용</option></TabSelect></label><label>제작 모델<TabSelect value={model} onChange={e => setModel(e.target.value)}>{MODELS.map(m => <option key={m} value={m}>{MODEL_LABELS[m]}</option>)}</TabSelect></label><label>목소리 이름<input value={name} maxLength={100} onChange={e => setName(e.target.value)}/></label><LocaleSelect label="목소리 언어" value={language} onChange={setLanguage} emptyLabel="지정하지 않음" /><label>목소리 성별 표현<TabSelect value={gender} onChange={e => setGender(e.target.value)}><option value="">지정하지 않음</option>{Object.entries(GENDERS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</TabSelect></label>{mode === "prompted" ? <label>설계 설명 (1~2문장, 앱 제한 2,000자)<textarea value={description} maxLength={2000} onChange={e => setDescription(e.target.value)}/></label> : <><p>가공하지 않은 같은 성인 화자의 녹음을 사용하세요. 이 앱은 모노 PCM16 WAV만 검사하며 24kHz가 공식 권장입니다. 참조 10~30초, 파일당 5MiB·동의 최대 60초는 앱 제한입니다.</p><label>참조 녹음<input type="file" accept="audio/wav,.wav" onChange={e => setSource(e.target.files?.[0] ?? null)}/></label><label>공식 동의문 녹음<input type="file" accept="audio/wav,.wav" onChange={e => setConsent(e.target.files?.[0] ?? null)}/></label><blockquote lang="en">{CONSENT}</blockquote><a href="https://ai.google.dev/gemini-api/docs/voice-replication#consent-phrases-by-language">공식 영어 동의문 출처</a>{["성인 본인의 원본 목소리이며 복제에 동의합니다.", "두 파일은 같은 화자의 녹음입니다.", "동의 녹음에 위 공식 영어 문구를 그대로 읽었습니다."].map((label, i) => <label key={label}><input type="checkbox" checked={checks[i]} onChange={e => setChecks(checks.map((v, j) => i === j ? e.target.checked : v))}/>{label}</label>)}<label><input type="checkbox" checked={store} onChange={e => setStore(e.target.checked)}/>프로젝트에 저장 — 나중에 다시 사용할 목소리</label><p>저장을 끄면 이번 화면에서만 사용하며, 새로고침 후에는 다시 선택할 수 없는 상태입니다.</p></>}<button ref={actionRef} type="button" disabled={mode === "replicated" && !checks.every(Boolean)} onClick={() => void act(create)}>목소리 생성 (유료 요청)</button></fieldset><Announce message={message}/><fieldset disabled={busy}><legend>저장 목소리 조회·삭제</legend><label>목소리 ID<input value={id} onChange={e => { setId(e.target.value); setConfirmDelete(false); }}/></label><button type="button" onClick={() => void act(async () => { setVoice(await api<CatalogVoice>(`/api/voices/${encodeURIComponent(id)}`)); setMessage("목소리를 조회한 상태입니다."); })}>목소리 상세 조회</button>{voice && <><p>{voice.name} · {VOICE_TYPES[voice.type]} · {voice.expires ?? "만료일 미제공"}</p><VoicePreview preview={voice.preview}/><button type="button" onClick={() => onSelect(voiceRef(voice))}>이 목소리를 화자 A에 선택</button>{voice.id && voice.type !== "prebuilt" && <><label><input type="checkbox" checked={confirmDelete} onChange={e => setConfirmDelete(e.target.checked)}/>{voice.id} 삭제 확인</label><button type="button" disabled={!confirmDelete || id !== voice.id} onClick={() => void act(async () => { await api(`/api/voices/${encodeURIComponent(voice.id)}`, { method: "DELETE" }); setVoice(null); setConfirmDelete(false); setMessage("저장 목소리를 삭제한 상태입니다."); })}>확인한 목소리 삭제</button></>}</>}</fieldset><p>기존 목소리 변형 기능은 현재 사용할 수 없는 상태입니다.</p></section>;
}
