"use client";
import { useEffect, useRef, useState } from "react";
import { parseTts, type TtsRequest } from "@/lib/tts-contract";
import type { BatchInfo } from "@/lib/gemini-batches";
import { api, VoicePreview, Announce } from "./VoiceLibrary";
type Result = {
    key: string;
    state: string;
    error?: string;
    wav?: string;
};
const terminal = ["SUCCEEDED", "FAILED", "CANCELLED", "EXPIRED"];
export default function BatchPanel({ request }: {
    request: TtsRequest;
}) {
    const [submission, setSubmission] = useState("inline");
    const [items, setItems] = useState<TtsRequest[]>([]), [jobs, setJobs] = useState<BatchInfo[]>([]), [job, setJob] = useState<BatchInfo | null>(null), [id, setId] = useState(""), [token, setToken] = useState(""), [priority, setPriority] = useState("0"), [busy, setBusy] = useState(false), [message, setMessage] = useState(""), [confirm, setConfirm] = useState(false), [results, setResults] = useState<Result[]>([]), [selected, setSelected] = useState<Result | null>(null), [displayName, setDisplayName] = useState("TTS Batch");
    const mounted = useRef(true), poll = useRef<AbortController | null>(null), pages = useRef(new Set<string>());
    useEffect(() => { mounted.current = true; return () => { mounted.current = false; poll.current?.abort(); }; }, []);
    useEffect(() => { if (!job || terminal.includes(job.state))
        return; const name = job.name; const timer = setInterval(() => { if (poll.current)
        return; const controller = new AbortController(); poll.current = controller; void api<BatchInfo>(`/api/batches/${name.split("/")[1]}`, { signal: controller.signal }).then(next => { if (mounted.current)
        setJob(current => current?.name === name ? next : current); }).catch(e => { if (!controller.signal.aborted && mounted.current)
        setMessage(e instanceof Error ? e.message : "조회 실패 상태입니다."); }).finally(() => { if (poll.current === controller)
        poll.current = null; }); }, 30000); return () => { clearInterval(timer); poll.current?.abort(); poll.current = null; }; }, [job]);
    async function action(fn: () => Promise<void>) { if (busy)
        return; setBusy(true); setMessage(""); try {
        await fn();
    }
    catch (e) {
        if (mounted.current)
            setMessage(e instanceof Error ? e.message : "Batch 요청 실패 상태입니다.");
    }
    finally {
        if (mounted.current)
            setBusy(false);
    } }
    function validId() { if (!/^batches\/[A-Za-z0-9_-]+$/.test(id))
        throw new Error("Batch 이름 형식이 올바르지 않습니다."); return id.split("/")[1]; }
    async function refresh() { const next = await api<BatchInfo>(`/api/batches/${validId()}`); setJob(next); setResults([]); setSelected(null); setMessage(`현재 작업 상태는 ${next.state}입니다.`); }
    async function list(more = false) { if (!more)
        pages.current.clear(); const result = await api<{
        jobs: BatchInfo[];
        nextPageToken: string;
    }>(`/api/batches?pageSize=20${more ? `&pageToken=${encodeURIComponent(token)}` : ""}`); if (result.nextPageToken && pages.current.has(result.nextPageToken))
        throw new Error("Batch 목록 페이지가 반복된 상태입니다."); pages.current.add(result.nextPageToken); setJobs(old => [...new Map([...(more ? old : []), ...result.jobs].map(j => [j.name, j])).values()]); setToken(result.nextPageToken); }
    return <section aria-label="Batch 작업" className="border rounded-xl p-4"><h2>Batch 작업</h2><p>현재 편집한 대본을 항목으로 담아 명시적으로 제출합니다. 최대 20개·UTF-8 1MiB 앱 제한입니다. 창을 닫아도 원격 작업은 계속됩니다. 종료 전 30초마다 조회합니다.</p><fieldset disabled={busy}><legend>Batch 제출</legend><label>입력 제출 방식<select value={submission} onChange={e => setSubmission(e.target.value)}><option value="inline">인라인</option><option value="file">검증한 항목을 JSONL 파일로 업로드</option></select></label><p>파일 방식도 앱의 20개·1MiB 제한을 적용합니다. 입력 파일은 Gemini Files에 업로드됩니다.</p><label>작업 표시 이름<input value={displayName} maxLength={100} onChange={e => setDisplayName(e.target.value)}/></label><button type="button" disabled={items.length >= 20} onClick={() => { try {
        const snapshot = parseTts(request);
        if (items.some(i => i.model !== snapshot.model))
            throw new Error("한 Batch의 항목 모델이 서로 다른 상태입니다.");
        setItems([...items, snapshot]);
        setMessage("현재 대본을 Batch 항목에 추가한 상태입니다.");
    }
    catch (e) {
        setMessage(e instanceof Error ? e.message : "입력 오류 상태입니다.");
    } }}>현재 대본 담기</button><ol>{items.map((item, i) => <li key={i}>{item.turns[0].text.slice(0, 30)} <button type="button" onClick={() => setItems(items.filter((_, n) => n !== i))}>항목 {i + 1} 제거</button></li>)}</ol><button type="button" disabled={!items.length} onClick={() => void action(async () => { const next = await api<BatchInfo>("/api/batches", { method: "POST", body: JSON.stringify({ model: items[0].model, displayName, submission, items: items.map(item => { const { model, ...rest } = item; void model; return rest; }) }) }); setJob(next); setId(next.name); setItems([]); setResults([]); setSelected(null); setConfirm(false); setMessage("Batch를 제출한 상태입니다. 작업 이름을 보관하세요."); })}>Batch 제출 (유료 요청)</button></fieldset><fieldset disabled={busy}><legend>작업 다시 열기·관리</legend><label>Batch 작업 이름<input value={id} onChange={e => { setId(e.target.value); setConfirm(false); }}/></label><button type="button" onClick={() => void action(refresh)}>작업 열기·새로고침</button><button type="button" disabled={!id} onClick={() => void action(async () => { await navigator.clipboard.writeText(id); setMessage("작업 이름을 복사한 상태입니다."); })}>작업 이름 복사</button><button type="button" onClick={() => void action(() => list())}>작업 목록 조회</button><ul>{jobs.map(j => <li key={j.name}><button type="button" onClick={() => { setId(j.name); setJob(j); setResults([]); setSelected(null); setConfirm(false); }}>{j.displayName || j.name} · {j.state}</button></li>)}</ul>{token && <button type="button" onClick={() => void action(() => list(true))}>작업 더 보기</button>}{job && <><p>{job.name} · 상태 {job.state} · 내부 우선순위 {job.priority}</p><label>내부 작업 우선순위 (처리 등급과 별도 정수)<input type="number" step="1" value={priority} onChange={e => setPriority(e.target.value)}/></label><button type="button" disabled={terminal.includes(job.state) || id !== job.name} onClick={() => void action(async () => { setJob(await api<BatchInfo>(`/api/batches/${validId()}`, { method: "PATCH", body: JSON.stringify({ priority: Number(priority) }) })); setMessage("내부 우선순위를 변경한 상태입니다."); })}>내부 우선순위 변경</button><label><input type="checkbox" checked={confirm} onChange={e => setConfirm(e.target.checked)}/>{job.name} 취소 또는 삭제 확인</label><button type="button" disabled={!confirm || terminal.includes(job.state) || id !== job.name} onClick={() => void action(async () => { setJob(await api<BatchInfo>(`/api/batches/${validId()}`, { method: "POST", body: JSON.stringify({ action: "cancel" }) })); setConfirm(false); setMessage("취소를 요청한 상태입니다. 실제 종료 상태를 확인하세요."); })}>확인한 Batch 취소 요청</button><button type="button" disabled={!confirm || id !== job.name} onClick={() => void action(async () => { await api(`/api/batches/${validId()}`, { method: "DELETE" }); setJob(null); setResults([]); setSelected(null); setMessage("Batch를 삭제한 상태입니다."); })}>확인한 Batch 삭제</button><button type="button" disabled={job.state !== "SUCCEEDED" || id !== job.name} onClick={() => void action(async () => { const result = await api<{
        results: Result[];
    }>(`/api/batches/${validId()}/results`); setResults(result.results); setMessage("항목별 결과를 회수한 상태입니다. 실패 항목은 자동 재제출하지 않습니다."); })}>결과 회수</button></>}</fieldset><ul>{results.map((r, i) => <li key={`${r.key}-${i}`}>{r.key} · {r.state} · {r.error}{r.wav && <button type="button" onClick={() => setSelected(r)}>결과 {r.key} 재생·저장</button>}</li>)}</ul>{selected?.wav && <><VoicePreview preview={{ data: selected.wav, mime: "audio/wav" }}/><a href={`data:audio/wav;base64,${selected.wav}`} download={`${selected.key}.wav`}>선택 결과 WAV 다운로드</a></>}<Announce message={message}/></section>;
}
