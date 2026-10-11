"use client";
import { useTabActive } from "./TabPanel";
import { useId } from "react";
import { voiceLabel } from "@/lib/tts-labels";
import { VOICE_CATEGORIES, categoryLabel, categoryValues, categoryMatches, type CategoryKey } from "@/lib/voice-categories";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BASIC_VOICES, type CatalogVoice } from "@/lib/voice-catalog";
import { base64Bytes, parseWav } from "@/utils/audio-format";
export function Announce({message}:{message:string}){useEffect(()=>{if(message)window.dispatchEvent(new CustomEvent("tts-status",{detail:message}));},[message]);return <p>{message}</p>;}
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
export default function VoiceLibrary({label,onSelect,disabled=false,searchOnly=false}:{label:string;onSelect:(voice:CatalogVoice)=>void;disabled?:boolean;searchOnly?:boolean}) {
 const helpId=useId();
 const [basicVoice,setBasicVoice]=useState("");
 const active=useTabActive();
 const attempted=useRef("");
 const [catalogSource,setCatalogSource]=useState("provided"),[source,setSource]=useState("prebuilt");
 const [voices,setVoices]=useState<CatalogVoice[]>([]),[loaded,setLoaded]=useState(false),[busy,setBusy]=useState(false),[message,setMessage]=useState("");
 const [filters,setFilters]=useState<Partial<Record<CategoryKey,string>>>({});
 const [choice,setChoice]=useState(""),[selected,setSelected]=useState<CatalogVoice|null>(null);
 const controller=useRef<AbortController|null>(null),generation=useRef(0),queryButton=useRef<HTMLButtonElement>(null),restoreFocus=useRef(false);
 useEffect(()=>()=>{generation.current++;controller.current?.abort();attempted.current="";},[]);
 useEffect(()=>{if(!busy&&restoreFocus.current){restoreFocus.current=false;if(!queryButton.current?.closest("[hidden], [inert]"))queryButton.current?.focus();}},[busy]);
 function reset(){generation.current++;controller.current?.abort();setVoices([]);setLoaded(false);setFilters({});setChoice("");setMessage("");}
 const load=useCallback(async (restore=false)=>{
  controller.current?.abort();const control=new AbortController();controller.current=control;const run=++generation.current;
  setBusy(true);setLoaded(false);setVoices([]);setChoice("");setFilters({});setMessage("목소리 목록을 불러오는 중입니다.");restoreFocus.current=restore;
  try {
   const all=new Map<string,CatalogVoice>(),seen=new Set<string>();let token="";
   do {
    const q=new URLSearchParams({type:source,page_size:"50"});if(catalogSource==="provided"){q.set("source","provided");q.set("browse","1");}if(token)q.set("page_token",token);
    const result=await api<{voices:CatalogVoice[];nextPageToken:string}>(`/api/voices?${q}`,{signal:control.signal});
    if(run!==generation.current)return;
    if(!Array.isArray(result.voices)||typeof result.nextPageToken!=="string")throw new Error("목소리 목록을 읽지 못했습니다. 다시 조회하세요.");
    result.voices.forEach(v=>all.set(v.id,v));token=result.nextPageToken;
    if(token&&(seen.has(token)||seen.size>=199))throw new Error("목소리 목록 전체를 확인하지 못했습니다. 다시 조회하세요.");
    if(token)seen.add(token);
   }while(token);
   setVoices([...all.values()]);setLoaded(true);setMessage(`${all.size}개 목소리를 불러왔습니다.`);
  }catch(error){if(!control.signal.aborted)setMessage(error instanceof Error?error.message:"목록을 불러오지 못했습니다. 다시 조회하세요.");}
  finally{if(run===generation.current)setBusy(false);}
 },[catalogSource,source]);
 useEffect(()=>{
  const key=`${catalogSource}:${source}`;
  if(active&&attempted.current!==key){attempted.current=key;void load();}
 },[active,catalogSource,source,load]);
 const candidates=voices.filter(v=>categoryMatches(v,filters));
 if(!active)return null;
 const controlsDisabled=disabled||busy;
 // 개별 입력에 이름이 있으므로 그룹 이름을 반복 낭독하는 fieldset 대신 제목을 둔다.
 return <div className="border rounded-xl p-3 space-y-3"><h3>{label} 목소리 라이브러리</h3>
 <p id={helpId}>카테고리를 순서대로 선택하세요. 전체를 선택하면 해당 단계를 건너뜁니다. 앞 단계를 바꾸면 뒤 조건은 초기화되며, 적용한 목소리는 새 목소리를 고를 때까지 유지됩니다.</p>
 {!searchOnly&&<label>{label} 공식 기본 목소리<select disabled={controlsDisabled} value={basicVoice} onChange={event=>{setBasicVoice(event.target.value);const voice=BASIC_VOICES.find(v=>v.id===event.target.value);if(voice){setSelected(voice);onSelect(voice);}}}><option value="">선택하세요.</option>{BASIC_VOICES.map(v=><option key={v.id} value={v.id}>{voiceLabel(v.id)}</option>)}</select></label>}
 <div className="space-y-3">
 <label>목록 출처<select disabled={controlsDisabled} value={catalogSource} onChange={event=>{reset();setCatalogSource(event.target.value);setSource("prebuilt");}}><option value="provided">사용자 제공 목록 (2026-10-01)</option><option value="remote">현재 계정</option></select></label>
 <label>목소리 종류<select disabled={controlsDisabled} value={source} onChange={event=>{reset();setSource(event.target.value);if(event.target.value!=="prebuilt")setCatalogSource("remote");}}><option value="prebuilt">제공되는 목소리</option><option value="prompted">설명으로 만들어 저장한 목소리</option><option value="replicated">녹음으로 복제해 저장한 목소리</option></select></label>
 <p>제공 목록의 목소리를 현재 계정에서 사용할 수 있는지는 음성 생성 시 확인됩니다.</p>
 <button type="button" disabled={controlsDisabled} ref={queryButton} onClick={()=>void load(true)}>목록 조회</button>
 <Announce message={message}/>
 {loaded&&<Announce message={`조건에 맞는 목소리는 ${candidates.length}개입니다.`}/>}

 <>
 {VOICE_CATEGORIES.map(({key,label:category},index)=>{
  const earlier=Object.fromEntries(VOICE_CATEGORIES.slice(0,index).map(c=>[c.key,filters[c.key]??""]));
  const available=voices.filter(v=>categoryMatches(v,earlier));
  const values=[...new Set(available.flatMap(v=>categoryValues(v,key)))].sort((a,b)=>categoryLabel(key,a).localeCompare(categoryLabel(key,b),"ko"));
  return <div key={key}><label htmlFor={`${helpId}-${key}`}>{label} {category}</label><select id={`${helpId}-${key}`} disabled={controlsDisabled||!loaded} value={filters[key]??""} onChange={event=>{setFilters({...earlier,[key]:event.target.value});setChoice("");}}><option value="">전체</option>{values.map(value=><option key={value} value={value}>{categoryLabel(key,value)} ({available.filter(v=>categoryValues(v,key).includes(value)).length}개)</option>)}</select></div>;
 })}

 <label htmlFor={`${helpId}-voice`}>{label} 목소리</label><select id={`${helpId}-voice`} value={choice} disabled={controlsDisabled||!candidates.length} onChange={event=>{setChoice(event.target.value);const voice=candidates.find(v=>v.id===event.target.value);if(voice){setSelected(voice);onSelect(voice);}}}><option value="">목소리를 선택하세요.</option>{candidates.map(v=><option key={v.id} value={v.id}>{voiceLabel(v.id)===v.id?v.name:voiceLabel(v.id)}</option>)}</select>
 </>
 </div>
 {selected&&<p>선택 목소리: {voiceLabel(selected.id)===selected.id?selected.name:voiceLabel(selected.id)} · {selected.description}</p>}
 </div>;
}
