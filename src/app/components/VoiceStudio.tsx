"use client";
import { TabSelect } from "./TabPanel";
import LocaleSelect from "./LocaleSelect";
import { MODEL_LABELS, GENDERS, VOICE_TYPES } from "@/lib/tts-labels";
import { useRef, useState } from "react";
import { MODELS, VOICE_NAMES, resourceId, string, type VoiceRef } from "@/lib/tts-contract";
import { voiceRef, type CatalogVoice } from "@/lib/voice-catalog";
import { base64Bytes, bytesBase64, parseWav } from "@/utils/audio-format";
import { api, VoicePreview, Announce } from "./VoiceLibrary";
const CONSENT = "I am the owner of this voice and I consent to Google using this voice to create a synthetic voice model.";
export default function VoiceStudio({ onSelect }: {
    onSelect: (voice: VoiceRef) => void;
}) {
    const [mode, setMode] = useState("prompted"), [name, setName] = useState(""), [description, setDescription] = useState(""), [model, setModel] = useState<string>(MODELS[0]), [language, setLanguage] = useState(""), [gender, setGender] = useState(""), [store, setStore] = useState(true), [checks, setChecks] = useState([false, false, false]), [source, setSource] = useState<File | null>(null), [consent, setConsent] = useState<File | null>(null), [voice, setVoice] = useState<CatalogVoice | null>(null), [id, setId] = useState(""), [busy, setBusy] = useState(false), [message, setMessage] = useState(""), [confirmDelete, setConfirmDelete] = useState(false);
    const [baseVoice, setBaseVoice] = useState("Puck");
    const [baseId, setBaseId] = useState("");
    const [remixDescription, setRemixDescription] = useState("");
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
    async function create() { const v: Record<string, unknown> = { model: mode === "remix" ? MODELS[0] : model, type: mode === "remix" ? "prompted" : mode, ...(name ? { display_name: name } : {}), ...(language ? { language_code: [language] } : {}), ...(gender ? { gender } : {}) }; if (mode === "prompted")
        v.prompted = { input: description };
    else if (mode === "remix") {
        const base = resourceId(baseVoice === "custom" ? baseId : baseVoice);
        if (base.startsWith("voicekey_")) {
            throw new Error("비저장 목소리는 리믹스 기준으로 사용할 수 없는 상태입니다.");
        }
        v.prompted = { base_voice: base, input: string(remixDescription, 2000, "변경 설명") };
    } else {
        v.replicated = { source_audio: await fileData(source, true), consent_audio: await fileData(consent, false) };
    } const result = await api<CatalogVoice>("/api/voices", { method: "POST", body: JSON.stringify({ store: mode === "replicated" ? store : true, voice: v, confirmedAdultOwner: checks[0], confirmedSameSpeaker: checks[1], confirmedConsentPhrase: checks[2] }) }); if (result.preview)
        parseWav(base64Bytes(result.preview.data)); setVoice(result); setId(result.id); setSource(null); setConsent(null); setChecks([false, false, false]); onSelect(voiceRef(result)); setMessage("목소리를 생성하여 화자 A에 선택한 상태입니다."); }
    return <section aria-label="목소리 제작과 관리" className="space-y-6">
        <p className="text-sm text-gray-600">제작 방식과 목소리 특징을 정한 뒤 목소리를 생성하세요. 완성된 목소리는 음성 만들기 탭의 첫 번째 화자에 적용됩니다.</p>

        <section aria-labelledby="studio-setup" className="space-y-4">
            <h2 id="studio-setup" className="text-lg font-bold text-purple-900">1. 제작 방식과 모델</h2>
            <fieldset disabled={busy} className="space-y-3 border rounded-xl p-4">
                <legend>제작 설정</legend>
                <label>제작 방식<TabSelect aria-describedby="studio-mode-help" value={mode} onChange={e => setMode(e.target.value)}>
                    <option value="prompted">설명으로 만들기 — 원하는 목소리를 글로 설명</option>
                    <option value="remix">기존 목소리 리믹스 — 기준 목소리의 특징 변경</option>
                    <option value="replicated">녹음으로 복제하기 — 본인의 목소리 녹음 사용</option>
                </TabSelect></label>
                <p id="studio-mode-help">새로운 목소리를 설계하려면 설명으로 만들기, 기존 목소리의 특징을 바꾸려면 리믹스, 본인의 목소리를 재현하려면 녹음으로 복제하기를 선택하세요.</p>
                {mode === "remix" ? <label>제작 모델<input readOnly value={MODEL_LABELS[MODELS[0]]}/></label> : <label>제작 모델<TabSelect value={model} onChange={e => setModel(e.target.value)}>{MODELS.map(m => <option key={m} value={m}>{MODEL_LABELS[m]}</option>)}</TabSelect></label>}
            </fieldset>
        </section>

        <section aria-labelledby="studio-profile" className="space-y-4">
            <h2 id="studio-profile" className="text-lg font-bold text-purple-900">2. 목소리 정보</h2>
            <fieldset disabled={busy} className="space-y-3 border rounded-xl p-4">
                <legend>이름과 특징</legend>
                <p id="studio-profile-help">이름·언어·성별 표현은 선택 사항입니다. 목소리를 구분할 이름이나 원하는 특징을 지정하세요.</p>
                <label>목소리 이름<input aria-describedby="studio-profile-help" value={name} maxLength={100} onChange={e => setName(e.target.value)}/></label>
                <LocaleSelect label="목소리 언어" value={language} onChange={setLanguage} emptyLabel="지정하지 않음" />
                <label>목소리 성별 표현<TabSelect value={gender} onChange={e => setGender(e.target.value)}><option value="">지정하지 않음</option>{Object.entries(GENDERS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</TabSelect></label>
            </fieldset>
        </section>

        <section aria-labelledby="studio-material" className="space-y-4">
            <h2 id="studio-material" className="text-lg font-bold text-purple-900">{mode === "remix" ? "3. 기준 목소리와 변경 설명" : mode === "prompted" ? "3. 목소리 설명" : "3. 녹음과 동의"}</h2>
            <fieldset disabled={busy} className="space-y-3 border rounded-xl p-4">
                <legend>{mode === "remix" ? "리믹스 설정" : mode === "prompted" ? "원하는 목소리" : "참조 녹음과 본인 동의"}</legend>
                {mode === "remix" ? <>
                    <label>기준 목소리<TabSelect value={baseVoice} onChange={e => setBaseVoice(e.target.value)}>
                        {VOICE_NAMES.map(value => <option key={value} value={value}>{value}</option>)}
                        <option value="custom">확장·저장 목소리 ID 직접 입력</option>
                    </TabSelect></label>
                    {baseVoice === "custom" && <label>기준 목소리 ID<input aria-describedby="studio-remix-help" value={baseId} maxLength={256} onChange={e => setBaseId(e.target.value)}/></label>}
                    <label>변경 설명 (앱 제한 2,000자)<input aria-describedby="studio-remix-help" value={remixDescription} maxLength={2000} onChange={e => setRemixDescription(e.target.value)}/></label>
                    <p id="studio-remix-help">기준 목소리에서 바꿀 높낮이·말투·분위기를 설명하세요. 확장 목소리나 저장한 목소리는 접근 가능한 ID를 사용하세요. 원본은 유지되고 새로운 목소리가 저장됩니다.</p>
                </> : mode === "prompted" ? <>
                    <label>설계 설명 (1~2문장, 앱 제한 2,000자)<textarea aria-describedby="studio-description-help" value={description} maxLength={2000} onChange={e => setDescription(e.target.value)}/></label>
                    <p id="studio-description-help">원하는 목소리의 높낮이·말투·분위기를 설명하세요.</p>
                </> : <>
                    <p id="studio-recording-help">가공하지 않은 같은 성인 화자의 녹음을 사용하세요. 참조 녹음은 10~30초, 동의 녹음은 최대 60초이며 파일당 최대 5MiB입니다. 모노 PCM16 웨이브 파일을 사용하세요. 권장 샘플레이트는 24,000헤르츠입니다.</p>
                    <label>참조 녹음<input aria-describedby="studio-recording-help" type="file" accept="audio/wav,.wav" onChange={e => setSource(e.target.files?.[0] ?? null)}/></label>
                    <p id="studio-consent-help">아래 공식 영어 동의문을 본인의 목소리로 그대로 읽어 녹음하세요.</p>
                    <blockquote lang="en" className="border-l-4 border-purple-300 pl-4">{CONSENT}</blockquote>
                    <a className="text-purple-800 underline" href="https://ai.google.dev/gemini-api/docs/voice-replication#consent-phrases-by-language">공식 영어 동의문 출처</a>
                    <label>공식 동의문 녹음<input aria-describedby="studio-recording-help studio-consent-help" type="file" accept="audio/wav,.wav" onChange={e => setConsent(e.target.files?.[0] ?? null)}/></label>
                    {["성인 본인의 원본 목소리이며 복제에 동의합니다.", "두 파일은 같은 화자의 녹음입니다.", "동의 녹음에 위 공식 영어 문구를 그대로 읽었습니다."].map((label, i) => <label key={label}><input type="checkbox" checked={checks[i]} onChange={e => setChecks(checks.map((v, j) => i === j ? e.target.checked : v))}/>{label}</label>)}
                </>}
            </fieldset>
        </section>

        <section aria-labelledby="studio-result" className="space-y-4">
            <h2 id="studio-result" className="text-lg font-bold text-purple-900">4. 목소리 생성과 결과</h2>
            <fieldset disabled={busy} className="space-y-3 border rounded-xl p-4">
                <legend>저장과 생성</legend>
                {mode === "replicated" && <label><input aria-describedby="studio-storage-help" type="checkbox" checked={store} onChange={e => setStore(e.target.checked)}/>프로젝트에 저장 — 나중에 다시 사용할 목소리</label>}
                <p id="studio-storage-help">{mode === "replicated" && !store ? "저장하지 않은 목소리는 이번 화면에서만 사용할 수 있습니다. 새로고침하면 사라지며, 키는 7일간 유효합니다." : "목소리는 프로젝트에 저장됩니다. 저장 한도는 프로젝트 전체 200개이며 마지막 사용 후 1년간 유효합니다."}</p>
                <button ref={actionRef} type="button" className="w-full rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800" disabled={mode === "replicated" && !checks.every(Boolean)} onClick={() => void act(create)}>목소리 생성 (유료 요청)</button>
                {busy && <p>목소리 작업을 처리하는 중입니다.</p>}
                {voice && <div className="space-y-3 rounded-xl bg-purple-50 p-4">
                    <h3 className="font-semibold text-purple-900">현재 목소리</h3>
                    <p>{voice.name} · {VOICE_TYPES[voice.type]} · {voice.expires ?? "만료일 미제공"}</p>
                    <VoicePreview preview={voice.preview}/>
                    <button type="button" onClick={() => onSelect(voiceRef(voice))}>이 목소리를 화자 A에 선택</button>
                </div>}
            </fieldset>
            <Announce message={message}/>
        </section>

        <section aria-labelledby="studio-management" className="space-y-4">
            <h2 id="studio-management" className="text-lg font-bold text-purple-900">5. 저장 목소리 관리</h2>
            <fieldset disabled={busy} className="space-y-3 border rounded-xl p-4">
                <legend>저장 목소리 조회·삭제</legend>
                <label>목소리 ID<input value={id} onChange={e => { setId(e.target.value); setConfirmDelete(false); }}/></label>
                <button type="button" onClick={() => void act(async () => { setVoice(await api<CatalogVoice>(`/api/voices/${encodeURIComponent(id)}`)); setConfirmDelete(false); setMessage("목소리를 조회했습니다. 목소리 생성과 결과 구역에서 확인하세요."); })}>목소리 상세 조회</button>
                {voice?.id && voice.type !== "prebuilt" && <>
                    <p>삭제할 목소리: {voice.name}</p>
                    <label><input type="checkbox" checked={confirmDelete} onChange={e => setConfirmDelete(e.target.checked)}/>{voice.id} 삭제 확인</label>
                    <button type="button" disabled={!confirmDelete || id !== voice.id} onClick={() => void act(async () => { await api(`/api/voices/${encodeURIComponent(voice.id)}`, { method: "DELETE" }); setVoice(null); setConfirmDelete(false); setMessage("저장 목소리를 삭제했습니다."); })}>확인한 목소리 삭제</button>
                </>}
            </fieldset>
        </section>
    </section>;
}
