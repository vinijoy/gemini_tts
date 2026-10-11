export const MODELS = ["gemini-3.8-flash-tts", "gemini-3.8-flash-lite-tts"] as const;
// 앱의 운송·분할 예산이며 모델의 토큰 한도를 계산하는 값은 아니다.
export const MAX_TTS_JOB_BYTES = 1_048_576;
export const MAX_TTS_REQUEST_BYTES = 18_000;
export const MAX_TTS_REQUEST_CODE_POINTS = 1_000;
export const MAX_TTS_REQUESTS = 128;
export function jsonBytes(value:unknown):number { return new TextEncoder().encode(JSON.stringify(value)).byteLength; }
export const VOICE_NAMES = ["Zephyr","Puck","Charon","Kore","Fenrir","Leda","Orus","Aoede","Callirrhoe","Autonoe","Enceladus","Iapetus","Umbriel","Algieba","Despina","Erinome","Algenib","Rasalgethi","Laomedeia","Achernar","Alnilam","Schedar","Gacrux","Pulcherrima","Achird","Zubenelgenubi","Vindemiatrix","Sadachbia","Sadaltager","Sulafat"];
export const ENCODINGS = ["AUDIO_L16","AUDIO_WAV","AUDIO_MULAW","AUDIO_ALAW"] as const;
export type VoiceRef = {kind:"prebuilt-name"|"prebuilt-id"|"stored-custom"|"ephemeral-replica";value:string};
export type TtsRequest = {model:typeof MODELS[number];mode:"single"|"prebuilt-dialogue"|"custom-dialogue";speakers:{id:string;name?:string;voice:VoiceRef}[];turns:{speaker:string;text:string;style:string}[];output:{encoding:typeof ENCODINGS[number];sampleRate:number};serviceTier:"standard"|"flex"|"priority"};
export function speakerAliases(speakers:TtsRequest["speakers"]):Map<string,string> {
  const aliases=new Map(speakers.map(s=>[s.id.normalize("NFC"),s.id]));
  for(const speaker of speakers){
    if(!speaker.name)continue;
    const name=speaker.name.trim().normalize("NFC"),owner=aliases.get(name);
    if(owner&&owner!==speaker.id)throw new AppError(400,"화자 대본 이름이 중복되거나 다른 화자의 별칭과 충돌한 상태입니다.");
    aliases.set(name,speaker.id);
  }
  return aliases;
}
function speakerName(value:unknown):string|undefined {
  if(value===undefined||value==="")return undefined;
  if(typeof value!=="string"||!/^[\p{L}\p{M}\p{N} _-]+$/u.test(value))throw new AppError(400,"화자 대본 이름의 형식이 올바르지 않은 상태입니다.");
  const name=value.trim().normalize("NFC");
  if(!name)return undefined;
  if(Array.from(name).length>40)throw new AppError(400,"화자 대본 이름이 40자 제한을 넘은 상태입니다.");
  return name;
}
export class AppError extends Error { constructor(public status:number,message:string,public retryAfterMs:number|null=null){super(message);} }
export function object(value:unknown):Record<string,unknown> { if(!value || typeof value!=="object" || Array.isArray(value)) throw new AppError(400,"요청 형식이 올바르지 않습니다."); return value as Record<string,unknown>; }
export function string(value:unknown,max:number,label:string,empty=false):string { if(typeof value!=="string" || (!empty&&!value.trim()) || value.length>max) throw new AppError(400,`${label} 값이 없거나 앱 제한을 벗어난 상태입니다.`);return value; }
export function resourceId(value:unknown):string { const id=string(value,256,"식별자");if(!/^[a-zA-Z0-9_-]+$/.test(id))throw new AppError(400,"식별자 형식이 올바르지 않습니다.");return id; }
export function parseTts(value:unknown):TtsRequest {
  let b=object(value);
  if(!b.turns && "text" in b) b={model:MODELS[0],mode:"single",speakers:[{id:"A",voice:{kind:"prebuilt-name",value:b.voice||"Puck"}}],turns:[{speaker:"A",text:b.text,style:b.stylePrompt??""}],output:{encoding:"AUDIO_L16",sampleRate:24000},serviceTier:"standard"};
  if(!MODELS.includes(b.model as TtsRequest["model"]) || !["single","prebuilt-dialogue","custom-dialogue"].includes(String(b.mode)) || !["standard","flex","priority"].includes(String(b.serviceTier))) throw new AppError(400,"모델·화자 모드·처리 등급이 올바르지 않습니다.");
  if(!Array.isArray(b.speakers)||b.speakers.length<1||b.speakers.length>2||!Array.isArray(b.turns)||b.turns.length<1)throw new AppError(400,"화자 구성이나 대사 목록이 올바르지 않은 상태입니다.");
  const speakers=b.speakers.map(s=>{const row=object(s), v=object(row.voice);const id=string(row.id,40,"화자");if(!/^[\p{L}\p{N}_-]+$/u.test(id))throw new AppError(400,"화자 이름 형식이 올바르지 않습니다.");const kind=v.kind as VoiceRef["kind"];const val=string(v.value,4096,"목소리");if(!["prebuilt-name","prebuilt-id","stored-custom","ephemeral-replica"].includes(kind)|| (kind==="prebuilt-name"&&!VOICE_NAMES.includes(val))|| (kind!=="prebuilt-name"&&!/^[A-Za-z0-9_./+=-]+$/.test(val)))throw new AppError(400,"목소리 참조가 올바르지 않습니다.");const name=speakerName(row.name);return {id,...(name?{name}:{}),voice:{kind,value:val}};});
  if(new Set(speakers.map(s=>s.id)).size!==speakers.length || (b.mode==="single"&&speakers.length!==1)|| (b.mode!=="single"&&speakers.length!==2)|| (b.mode==="prebuilt-dialogue"&&speakers.some(s=>!s.voice.kind.startsWith("prebuilt"))))throw new AppError(400,"화자 구성과 모드가 일치하지 않습니다.");
  speakerAliases(speakers);
  const turns=b.turns.map(t=>{const row=object(t);const speaker=string(row.speaker,40,"발화 화자");if(!speakers.some(s=>s.id===speaker))throw new AppError(400,"등록되지 않은 발화 화자입니다.");return {speaker,text:string(row.text,MAX_TTS_JOB_BYTES,"대본"),style:string(row.style??"",1000,"연출",true)};});
  const o=object(b.output);if(!ENCODINGS.includes(o.encoding as TtsRequest["output"]["encoding"])||![8000,16000,24000].includes(Number(o.sampleRate))||typeof o.sampleRate!=="number")throw new AppError(400,"출력 형식 또는 샘플레이트가 올바르지 않습니다.");
  const request={model:b.model as TtsRequest["model"],mode:b.mode as TtsRequest["mode"],speakers,turns,output:{encoding:o.encoding as TtsRequest["output"]["encoding"],sampleRate:o.sampleRate},serviceTier:b.serviceTier as TtsRequest["serviceTier"]};
  if(jsonBytes(request)>MAX_TTS_JOB_BYTES)throw new AppError(413,"입력 작업이 1MiB 용량 제한을 넘은 상태입니다.");
  return request;
}
