import { beforeEach as prepareTestKey } from "vitest";
it("retries OTHER before output and accepts a metadata-only final event",async()=>{const f=vi.fn().mockResolvedValueOnce(new Response(event("OTHER"))).mockResolvedValueOnce(new Response(event("STOP")+'data: {"usageMetadata":{}}\n\n'));vi.stubGlobal("fetch",f);const r=await POST(req());expect(r.status).toBe(200);expect((await r.arrayBuffer()).byteLength).toBe(2);expect(f).toHaveBeenCalledTimes(2);});
prepareTestKey(()=>vi.stubEnv("GEMINI_API_KEY","test-key-not-a-secret"));
import { afterEach, expect, it, vi } from "vitest";
import { POST } from "./route";
import { defaultRequest } from "../../components/TtsEditor";
import { MAX_TTS_JOB_BYTES, parseTts } from "../../../lib/tts-contract";
import { requestGroups } from "../../../lib/gemini-tts";
import { MAX_AUDIO_BYTES, encodeOutput } from "../../../utils/audio-format";
const input=()=>({...structuredClone(defaultRequest),turns:[{speaker:"A",text:"안녕",style:"다정하게"}]});
const event=(finish?:string,data="AAE=",mime="audio/l16;rate=24000")=>`data: ${JSON.stringify({candidates:[{content:{parts:[{inlineData:{data,mimeType:mime}}]},...(finish?{finishReason:finish}:{})}]})}\n\n`;
const req=(body:unknown=input(),signal?:AbortSignal,origin="http://localhost")=>new Request("http://localhost/api/tts",{method:"POST",headers:{"Content-Type":"application/json",origin},body:JSON.stringify(body),signal});
afterEach(()=>{vi.unstubAllGlobals();vi.useRealTimers();});
function threeTurns(){const r=input();return {...r,turns:[...r.turns,{speaker:"A",text:"둘",style:"뒤 연출"},{speaker:"A",text:"셋",style:"마지막"}]};}
it("abort cancels a later pending SSE reader and prevents the third request",async()=>{
 const abort=new AbortController(),cancel=vi.fn();
 const f=vi.fn().mockResolvedValueOnce(new Response(event("STOP"))).mockResolvedValueOnce(new Response(new ReadableStream({cancel})));
 vi.stubGlobal("fetch",f);const r=await POST(req(threeTurns(),abort.signal));const reader=r.body!.getReader();await reader.read();const pending=reader.read();
 await vi.waitFor(()=>expect(f).toHaveBeenCalledTimes(2));abort.abort();
 expect(cancel).toHaveBeenCalledOnce();await expect(pending).rejects.toThrow();expect(f).toHaveBeenCalledTimes(2);
});
it.each([event("OTHER"),event("MAX_TOKENS"),event("STOP",""),event("STOP","AAE=","audio/l16;rate=16000"),event("STOP","AAE=","audio/wav"),"data: {}"])("later invalid group stops without retry or third request: %s",async(body)=>{
 const f=vi.fn().mockResolvedValueOnce(new Response(event("STOP"))).mockResolvedValueOnce(new Response(body));vi.stubGlobal("fetch",f);
 const r=await POST(req(threeTurns()));await expect(r.arrayBuffer()).rejects.toThrow();expect(f).toHaveBeenCalledTimes(2);
});
it("odd PCM fragments combine only within one group",async()=>{
 const f=vi.fn().mockImplementation(()=>Promise.resolve(new Response(event(undefined,"AQ==")+event("STOP","AA=="))));vi.stubGlobal("fetch",f);
 expect(new Uint8Array(await (await POST(req(threeTurns()))).arrayBuffer())).toEqual(new Uint8Array([1,0,1,0,1,0]));
 f.mockReset().mockImplementation(()=>Promise.resolve(new Response(event("STOP","AQ=="))));
 const r=await POST(req(threeTurns()));await expect(r.arrayBuffer()).rejects.toThrow();expect(f).toHaveBeenCalledTimes(1);
});
it("128 full Korean rows fit the transport and per-request budgets with maximum references",()=>{
 const r={...threeTurns(),mode:"prebuilt-dialogue",speakers:["A","B"].map(id=>({id,voice:{kind:"prebuilt-id",value:"a".repeat(4096)}})),turns:Array.from({length:128},(_,i)=>({speaker:i%2?"B":"A",text:"가".repeat(1000),style:"나".repeat(1000)}))};
 expect(requestGroups(parseTts(r))).toHaveLength(128);
});
it("transport and planned call limits reject before provider fetch",async()=>{
 const f=vi.fn();vi.stubGlobal("fetch",f);
 const oversized={...input(),padding:"a".repeat(MAX_TTS_JOB_BYTES)};expect((await POST(req(oversized))).status).toBe(413);
 const tooMany={...input(),turns:Array.from({length:129},()=>input().turns[0])};expect((await POST(req(tooMany))).status).toBe(400);
 expect(()=>parseTts({...input(),turns:[{speaker:"A",text:"가".repeat(MAX_TTS_JOB_BYTES/2),style:""}]})).toThrow(/1MiB/);
 expect(f).not.toHaveBeenCalled();
});
it.each([8000,16000,24000].flatMap(sampleRate=>["AUDIO_L16","AUDIO_WAV","AUDIO_MULAW","AUDIO_ALAW"].map(encoding=>({sampleRate,encoding:encoding as "AUDIO_L16"|"AUDIO_WAV"|"AUDIO_MULAW"|"AUDIO_ALAW"}))))("normalizes sequential $encoding at $sampleRate",async(output)=>{
 const encoded=encodeOutput(new Uint8Array([0,0,0,0]),output);
 const mime=output.encoding==="AUDIO_L16"?`audio/l16;rate=${output.sampleRate}`:output.encoding==="AUDIO_WAV"?"audio/wav":`audio/${output.encoding==="AUDIO_MULAW"?"mulaw":"alaw"};rate=${output.sampleRate}`;
 const f=vi.fn().mockImplementation(()=>Promise.resolve(new Response(event("STOP",Buffer.from(encoded.bytes).toString("base64"),mime))));vi.stubGlobal("fetch",f);
 const r=await POST(req({...threeTurns(),output}));expect((await r.arrayBuffer()).byteLength).toBe(12);expect(f).toHaveBeenCalledTimes(3);
});
it("accepts the 32MiB cumulative PCM boundary then rejects further audio",async()=>{
 const block=event("STOP",Buffer.alloc(MAX_AUDIO_BYTES/2).toString("base64"));
 const f=vi.fn().mockImplementation(()=>Promise.resolve(new Response(block)));vi.stubGlobal("fetch",f);
 const r=await POST(req({...threeTurns(),turns:threeTurns().turns.slice(0,2)}));expect((await r.arrayBuffer()).byteLength).toBe(MAX_AUDIO_BYTES);
 f.mockReset().mockImplementation(()=>Promise.resolve(new Response(block)));
 const excess=await POST(req(threeTurns()));await expect(excess.arrayBuffer()).rejects.toThrow(/제한/);expect(f).toHaveBeenCalledTimes(3);
});
it.each(["gemini-3.8-flash-tts","gemini-3.8-flash-lite-tts"])("sends exact model %s and all parts",async(model)=>{const mock=vi.fn().mockResolvedValue(new Response(event("STOP")));vi.stubGlobal("fetch",mock);const r=await POST(req({...input(),model}));expect(r.status).toBe(200);expect(await r.arrayBuffer()).toHaveProperty("byteLength",2);expect(mock.mock.calls[0][0]).toContain(model);expect(r.headers.get("cache-control")).toBe("no-store");});
it.each([{model:"gemini-3.1-flash-tts"},{turns:[]},{turns:[{speaker:"B",text:"a"}]},{serviceTier:"free"},{output:{encoding:"bad",sampleRate:24000}},{turns:[{speaker:"A",text:{}}]},{speakers:[{id:"A",voice:{kind:"prebuilt-name",value:"madeup"}}]}])("rejects malformed contract %j",async(patch)=>{const f=vi.fn();vi.stubGlobal("fetch",f);expect((await POST(req({...input(),...patch}))).status).toBe(400);expect(f).not.toHaveBeenCalled();});
it("rejects cross-origin mutation",async()=>expect((await POST(req(input(),undefined,"https://other.invalid"))).status).toBe(403));
it("does not expose raw provider errors or retry daily quota",async()=>{const f=vi.fn().mockResolvedValue(new Response('secret script GenerateRequestsPerDay',{status:429}));vi.stubGlobal("fetch",f);const r=await POST(req());expect(r.status).toBe(429);expect(await r.text()).not.toContain("secret");expect(f).toHaveBeenCalledTimes(1);});
it("retries a bounded per-minute quota before audio and preserves tier",async()=>{vi.useFakeTimers();const f=vi.fn().mockResolvedValueOnce(new Response('GenerateRequestsPerMinute retry in 1s',{status:429})).mockResolvedValueOnce(new Response(event("STOP"),{headers:{"x-gemini-service-tier":"standard"}}));vi.stubGlobal("fetch",f);const p=POST(req({...input(),serviceTier:"priority"}));await vi.runAllTimersAsync();const r=await p;await r.arrayBuffer();expect(f).toHaveBeenCalledTimes(2);expect(r.headers.get("x-gemini-service-tier")).toBe("standard");expect(JSON.parse(f.mock.calls[1][1].body).service_tier).toBe("priority");});
it("returns first PCM before provider completion",async()=>{let stream!:ReadableStreamDefaultController<Uint8Array>;vi.stubGlobal("fetch",vi.fn().mockResolvedValue(new Response(new ReadableStream({start(c){stream=c;c.enqueue(new TextEncoder().encode(event()));}}))));const response=await POST(req());const reader=response.body!.getReader();expect((await reader.read()).value?.length).toBe(2);stream.enqueue(new TextEncoder().encode(event("STOP")));stream.close();expect((await reader.read()).done).toBe(false);expect((await reader.read()).done).toBe(true);});
it.each([event(),event("MAX_TOKENS"),event("STOP","AQ=="),event("STOP","AAE=","audio/wav"),"data: {}"])("rejects incomplete or invalid audio",async(body)=>{vi.stubGlobal("fetch",vi.fn().mockResolvedValue(new Response(body)));const r=await POST(req());if(r.status===200)await expect(r.arrayBuffer()).rejects.toThrow();else expect(r.status).toBe(502);});
it("custom turns use ordered requests and never retry after global first audio",async()=>{const f=vi.fn().mockResolvedValueOnce(new Response(event("STOP"))).mockResolvedValueOnce(new Response('GenerateRequestsPerMinute retry in 1s',{status:429}));vi.stubGlobal("fetch",f);const b=input();const r=await POST(req({...b,mode:"custom-dialogue",speakers:[...b.speakers,{id:"B",voice:{kind:"stored-custom",value:"voice_abc"}}],turns:[...b.turns,{speaker:"B",text:"다음",style:"천천히"}]}));await expect(r.arrayBuffer()).rejects.toThrow();expect(f).toHaveBeenCalledTimes(2);expect(JSON.parse(f.mock.calls[1][1].body).contents[0].parts[0].speechMetadata.style).toBe("천천히");});
it("cancellation propagates to upstream",async()=>{const controller=new AbortController();const f=vi.fn().mockImplementation((_url,init)=>new Promise((_,reject)=>init.signal.addEventListener("abort",()=>reject(new DOMException("cancelled","AbortError")))));vi.stubGlobal("fetch",f);const pending=POST(req(input(),controller.signal));await vi.waitFor(()=>expect(f).toHaveBeenCalled());controller.abort();expect((await pending).status).not.toBe(200);});
