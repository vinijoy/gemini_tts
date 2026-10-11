import { upstream } from "./gemini-client";
import { AppError, object, jsonBytes, MAX_TTS_REQUEST_BYTES, MAX_TTS_REQUEST_CODE_POINTS, MAX_TTS_REQUESTS, type TtsRequest } from "./tts-contract";
import { base64Bytes, decodeAudio, joinBytes, MAX_AUDIO_BYTES } from "../utils/audio-format";
// REST의 처리 등급은 generationConfig 내부가 아닌 요청 최상위 필드다.
export function wireRequest(request:TtsRequest,turns=request.turns){const single=request.mode!=="prebuilt-dialogue";const speaker=request.speakers.find(s=>s.id===turns[0].speaker)!;return {contents:[{role:"user",parts:turns.map(t=>({text:t.text,speechMetadata:{style:t.style,...(!single?{speaker:t.speaker}:{})}}))}],generationConfig:{responseModalities:["AUDIO"],responseFormat:{audio:{mimeType:request.output.encoding,sampleRate:request.output.sampleRate}},speechConfig:single?{voiceConfig:{voice:speaker.voice.value}}:{multiSpeakerVoiceConfig:{speakerVoiceConfigs:request.speakers.map(s=>({speaker:s.id,voiceConfig:{voice:s.voice.value}}))}}},service_tier:request.serviceTier};}
type Turn = TtsRequest["turns"][number];
const graphemes = new Intl.Segmenter("ko", {granularity:"grapheme"});
function textAtoms(text:string):string[] {
 // 완전한 태그와 grapheme은 하나의 원자로 취급한다. 공백도 원문 그대로 남긴다.
 return text.split(/(<[^<>\r\n]+>|\[[^\[\]\r\n]+\])/u).flatMap(part=>
  /^(?:<[^<>\r\n]+>|\[[^\[\]\r\n]+\])$/u.test(part)?[part]:Array.from(graphemes.segment(part),s=>s.segment));
}
export function requestGroups(request:TtsRequest):Turn[][] {
 const groups:Turn[][]=[];
 const fits=(turns:Turn[])=>turns.reduce((n,t)=>n+Array.from(t.text).length,0)<=MAX_TTS_REQUEST_CODE_POINTS&&jsonBytes(wireRequest(request,turns))<=MAX_TTS_REQUEST_BYTES;
 const append=(turn:Turn)=>{
  // 직접 추가한 대사는 연출과 맥락을 따로 지정한 요청 경계다.
  groups.push([turn]);
  if(groups.length>MAX_TTS_REQUESTS)throw new AppError(400,"분할 생성이 작업당 128회 제한을 넘은 상태입니다.");
 };
 for(const [index,turn] of request.turns.entries()){
  if(fits([turn])){append(turn);continue;}
  const atoms=textAtoms(turn.text),offsets=[0];for(const atom of atoms)offsets.push(offsets.at(-1)!+atom.length);
  const chunk=(start:number,end:number)=>turn.text.slice(offsets[start],offsets[end]);
  for(let start=0;start<atoms.length;){
   // 직렬화된 설정·연출 비용까지 포함해 들어갈 수 있는 가장 긴 구간을 찾는다.
   let low=start+1,high=atoms.length,end=start;
   while(low<=high){const middle=Math.floor((low+high)/2);if(fits([{...turn,text:chunk(start,middle)}])){end=middle;low=middle+1;}else high=middle-1;}
   if(end===start)throw new AppError(400,`${index+1}번째 대사의 연출·목소리 설정 또는 본문 단위가 요청 용량을 넘은 상태입니다.`);
   if(end<atoms.length){
    while(end>start&&!chunk(end,atoms.length).trim())end--;
    const boundaries=[/[.!?。！？][\s]*$/u,/[\n,;:，；：]$/u,/\s$/u];
    for(const boundary of boundaries){let found=0;for(let i=end;i>start;i--){if(boundary.test(atoms[i-1])&&chunk(start,i).trim()&&chunk(i,atoms.length).trim()){found=i;break;}}if(found){end=found;break;}}
   }
   const text=chunk(start,end);
   if(!text.trim()||(end<atoms.length&&!chunk(end,atoms.length).trim()))throw new AppError(400,`${index+1}번째 대사의 공백 구간이 요청 용량을 넘은 상태입니다.`);
   append({...turn,text});start=end;
  }
 }
 return groups;
}
export async function* sse(response:Response,signal:AbortSignal):AsyncGenerator<unknown>{
 if(!response.body)throw new AppError(502,"음성 응답이 없는 상태입니다.");const reader=response.body.getReader(),decoder=new TextDecoder();let buffer="";try{while(true){signal.throwIfAborted();const {done,value}=await reader.read();signal.throwIfAborted();buffer+=(done?decoder.decode():decoder.decode(value,{stream:true}));buffer=buffer.replace(/\r\n/g,"\n");if(buffer.length>MAX_AUDIO_BYTES*1.5)throw new AppError(413,"음성 응답이 앱 제한을 넘은 상태입니다.");let end;while((end=buffer.indexOf("\n\n"))>=0){const event=buffer.slice(0,end);buffer=buffer.slice(end+2);const data=event.split("\n").filter(l=>l.startsWith("data:")).map(l=>l.slice(5).trimStart()).join("\n");if(data&&data!=="[DONE]"){let parsed:unknown;try{parsed=JSON.parse(data);}catch{throw new AppError(502,"음성 응답 형식이 올바르지 않은 상태입니다.");}yield parsed;}}if(done){if(buffer.trim())throw new AppError(502,"음성 스트림이 잘린 상태입니다.");return;}}}finally{await reader.cancel().catch(()=>{});reader.releaseLock();}}
export function responseAudio(value:unknown):{data:Uint8Array;mime:string;finish?:string}[]{const response=object(value);if(response.error)throw new AppError(502,"음성 생성에 실패한 상태입니다. 다시 시도하세요.");if(!Array.isArray(response.candidates)||response.candidates.length===0)return [];const candidate=object(response.candidates[0]);const finish=typeof candidate.finishReason==="string"?candidate.finishReason:undefined;if(finish&&finish!=="STOP")throw new AppError(502,"음성 생성이 정상적으로 끝나지 않은 상태입니다. 대본을 확인하고 다시 시도하세요.",finish==="OTHER"?0:null);const content=candidate.content?object(candidate.content):{};const parts=Array.isArray(content.parts)?content.parts:[];const audio=parts.flatMap(part=>{const p=object(part);if(!p.inlineData)return [];const inline=object(p.inlineData);if(typeof inline.data!=="string"||typeof inline.mimeType!=="string")throw new AppError(502,"오디오 정보가 불완전한 상태입니다.");return [{data:base64Bytes(inline.data),mime:inline.mimeType,finish}];});return audio.length?audio:[{data:new Uint8Array(),mime:"",finish}];}
function wait(ms:number,signal:AbortSignal){return new Promise<void>((resolve,reject)=>{signal.throwIfAborted();const abort=()=>{clearTimeout(timer);reject(signal.reason);};const timer=setTimeout(()=>{signal.removeEventListener("abort",abort);resolve();},ms);signal.addEventListener("abort",abort,{once:true});});}
export async function* synthesize(request:TtsRequest,signal:AbortSignal,meta:{tier:string}):AsyncGenerator<Uint8Array>{let emitted=false,total=0;const groups=requestGroups(request);for(const turns of groups){let attempts=0;while(true){signal.throwIfAborted();let stopped=false,length=0;const buffered:Uint8Array[]=[];let wavMime="";try{const response=await upstream(`/v1beta/models/${request.model}:streamGenerateContent?alt=sse`,{method:"POST",body:JSON.stringify(wireRequest(request,turns)),signal});const tier=response.headers.get("x-gemini-service-tier");meta.tier=groups.length===1&&["standard","flex","priority"].includes(tier??"")?tier!:"unknown";for await(const event of sse(response,signal)){const parts=responseAudio(event);if(stopped&&parts.some(p=>p.data.length))throw new AppError(502,"완료 이후 오디오가 반환된 상태입니다.");for(const part of parts){if(part.finish)stopped=true;if(!part.data.length)continue;length+=part.data.length;if(length>MAX_AUDIO_BYTES)throw new AppError(413,"오디오가 앱 제한을 넘은 상태입니다.");if(request.output.encoding==="AUDIO_WAV"){if(wavMime&&wavMime!==part.mime)throw new AppError(502,"오디오 형식이 변경된 상태입니다.");wavMime=part.mime;buffered.push(part.data);}else{const pcm=decodeAudio(part.data,part.mime,request.output);total+=pcm.length;if(total>MAX_AUDIO_BYTES)throw new AppError(413,"오디오가 앱 제한을 넘은 상태입니다.");emitted=true;yield pcm;}}}if(!stopped||!length)throw new AppError(502,"음성 완료 응답이 없거나 오디오가 빈 상태입니다. 다시 시도하세요.");if(request.output.encoding==="AUDIO_WAV"){const pcm=decodeAudio(joinBytes(buffered),wavMime,request.output);total+=pcm.length;if(total>MAX_AUDIO_BYTES)throw new AppError(413,"오디오가 앱 제한을 넘은 상태입니다.");emitted=true;yield pcm;}if(total%2)throw new AppError(502,"PCM 오디오가 잘린 상태입니다.");break;}catch(e){if(signal.aborted)throw e;if(!emitted&&e instanceof AppError&&(e.status===429||e.status===502)&&e.retryAfterMs!==null&&attempts++<1){await wait(e.retryAfterMs!,signal);continue;}throw e;}}}}
export async function openPcm(request:TtsRequest,signal:AbortSignal){const abort=new AbortController();const forward=()=>abort.abort(signal.reason);signal.addEventListener("abort",forward,{once:true});if(signal.aborted)forward();const meta={tier:"unknown"};const iterator=synthesize(request,abort.signal,meta);const clean=()=>signal.removeEventListener("abort",forward);let first:IteratorResult<Uint8Array>;try{first=await iterator.next();}catch(e){clean();abort.abort();await iterator.return(undefined);throw e;}let closed=false;const stream=new ReadableStream<Uint8Array>({async pull(controller){if(closed)return;try{abort.signal.throwIfAborted();const result=first;first={done:true,value:undefined};if(!result.done){controller.enqueue(result.value);return;}const next=await iterator.next();if(closed)return;if(next.done){closed=true;clean();controller.close();}else controller.enqueue(next.value);}catch(e){closed=true;clean();abort.abort();await iterator.return(undefined).catch(()=>{});controller.error(e);}},async cancel(){closed=true;clean();abort.abort();await iterator.return(undefined).catch(()=>{});}});return {stream,tier:meta.tier};}
