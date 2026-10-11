import { beforeEach as prepareTestKey } from "vitest";
prepareTestKey(()=>vi.stubEnv("GEMINI_API_KEY","test-key-not-a-secret"));
import { afterEach, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "../app/api/tts/route";
import { parseTts, MODELS, type TtsRequest } from "./tts-contract";
import { requestGroups, wireRequest } from "./gemini-tts";

function dialogue(mode:TtsRequest["mode"]="prebuilt-dialogue"):TtsRequest {
 return {model:MODELS[0],mode,speakers:[{id:"A",voice:{kind:"prebuilt-name",value:"Puck"}},{id:"B",voice:{kind:"prebuilt-name",value:"Kore"}}],turns:[{speaker:"A",text:"가".repeat(700),style:"  다정하게\n"},{speaker:"B",text:"나".repeat(700),style:" 힘차게 "}],output:{encoding:"AUDIO_L16",sampleRate:24000},serviceTier:"standard"};
}
function pcmResponse(sample=1){return new Response(`data: ${JSON.stringify({candidates:[{content:{parts:[{inlineData:{mimeType:"audio/l16;rate=24000",data:Buffer.from([sample,0]).toString("base64")}}]},finishReason:"STOP"}]})}\n\n`);}
it("POST accepts 1,400 dialogue characters and joins sequential PCM with verbatim directions",async()=>{
 const calls=vi.fn().mockImplementation(()=>Promise.resolve(pcmResponse(calls.mock.calls.length)));
 vi.stubGlobal("fetch",calls);
 const request=dialogue();
 const response=await POST(new NextRequest("http://localhost/api/tts",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(request)}));
 expect(response.status).toBe(200);
 expect(new Uint8Array(await response.arrayBuffer())).toEqual(new Uint8Array([1,0,2,0]));
 expect(calls).toHaveBeenCalledTimes(2);
 calls.mock.calls.forEach(([,init],i)=>expect(JSON.parse(init.body).contents[0].parts).toEqual([{text:request.turns[i].text,speechMetadata:{speaker:request.turns[i].speaker,style:request.turns[i].style}}]));
});
it.each(MODELS.flatMap(model=>["single","prebuilt-dialogue","custom-dialogue"].map(mode=>({model,mode:mode as TtsRequest["mode"]}))))("plans lossless Unicode chunks for $model / $mode",({model,mode})=>{
 const r=dialogue(mode);r.model=model;if(mode==="single")r.speakers=r.speakers.slice(0,1);
 const text="  한글👩‍👩‍👧‍👦é [laughing] <break time=\"1s\">\n".repeat(90)+"끝  ";
 r.turns=[{speaker:"A",text,style:"  연출\n".repeat(220)}];
 const groups=requestGroups(parseTts(r));expect(groups.length).toBeGreaterThan(1);
 expect(groups.flat().map(t=>t.text).join("")).toBe(text);
 for(const group of groups){expect(Buffer.byteLength(JSON.stringify(wireRequest(r,group)))).toBeLessThanOrEqual(6000);expect(Array.from(group.map(t=>t.text).join("")).length).toBeLessThanOrEqual(1000);for(const part of group){expect(part.style).toBe(r.turns[0].style);expect(part.speaker).toBe("A");expect(part.text.trim()).not.toBe("");expect(part.text).not.toMatch(/^[\uDC00-\uDFFF\u0301]|[\uD800-\uDBFF]$/u);expect((part.text.match(/\[laughing\]/g)??[]).length).toBe((part.text.match(/\[/g)??[]).length);}}
});
it("accepts 21 turns and more than 4,000 total style characters",()=>{
 const r=dialogue();r.turns=Array.from({length:21},(_,i)=>({speaker:i%2?"B":"A",text:"대사",style:"s".repeat(220)}));
 expect(requestGroups(parseTts(r)).flat()).toEqual(r.turns);
});
it("preflights oversized directions, voice configuration and 129 custom calls",async()=>{
 const r=dialogue();const calls=vi.fn();vi.stubGlobal("fetch",calls);
 for(const invalid of [{...r,turns:[...r.turns,{speaker:"B",text:"끝",style:"가".repeat(2100)}]}, {...r,speakers:r.speakers.map(s=>({...s,voice:{kind:"prebuilt-id",value:"a".repeat(4096)}}))}, {...dialogue("custom-dialogue"),turns:Array.from({length:129},()=>({speaker:"A",text:"a",style:""}))}]){
 const res=await POST(new NextRequest("http://localhost/api/tts",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(invalid)}));expect(res.status).toBe(400);}
 expect(calls).not.toHaveBeenCalled();
 const single=dialogue("single");single.speakers=[{id:"A",voice:{kind:"prebuilt-id",value:"a".repeat(4096)}}];single.turns=[{speaker:"A",text:"가".repeat(2000),style:"s".repeat(1001)}];
 expect(requestGroups(parseTts(single)).flat().map(t=>t.text).join("")).toBe(single.turns[0].text);
});

afterEach(() => vi.unstubAllGlobals());
it("structured single synthesis sends style separately and completes validated PCM", async () => {
  const upstream = vi.fn().mockResolvedValue(new Response('data: {"candidates":[{"content":{"parts":[{"inlineData":{"mimeType":"audio/l16;rate=24000","data":"AQACAA=="}}]},"finishReason":"STOP"}]}\n\n', { headers: { "x-gemini-service-tier": "standard" } }));
  vi.stubGlobal("fetch", upstream);
  const response = await POST(new NextRequest("http://localhost/api/tts", {method:"POST",headers:{"Content-Type":"application/json",origin:"http://localhost"},body:JSON.stringify({model:"gemini-3.8-flash-tts",mode:"single",speakers:[{id:"A",voice:{kind:"prebuilt-name",value:"Puck"}}],turns:[{speaker:"A",text:"안녕 [laughing]",style:"다정하게"}],output:{encoding:"AUDIO_L16",sampleRate:24000},serviceTier:"standard"})}));
  expect(response.status).toBe(200);
  expect(new Uint8Array(await response.arrayBuffer())).toEqual(new Uint8Array([1,0,2,0]));
  const body = JSON.parse(upstream.mock.calls[0][1].body);
  expect(body.contents[0].parts[0]).toEqual({text:"안녕 [laughing]",speechMetadata:{style:"다정하게"}});
  expect(body.generationConfig.responseFormat.audio).toEqual({mimeType:"AUDIO_L16",sampleRate:24000});
  expect(response.headers.get("x-gemini-service-tier")).toBe("standard");
});
it.each(["standard", "flex", "priority"] as const)("REST 처리 등급 %s는 최상위 service_tier로 전송한다", async (tier) => {
  const {wireRequest}=await import("./gemini-tts");
  const {parseTts}=await import("./tts-contract");
  const request={...parseTts({text:"안녕하세요.",voice:"Puck"}),serviceTier:tier};
  const body=wireRequest(request);
  expect(body).toHaveProperty("service_tier",tier);
  expect(body.generationConfig).not.toHaveProperty("serviceTier");
});
it("잘못된 API 요청을 일시적인 서비스 장애로 안내하지 않는다",async()=>{
 const {upstream}=await import("./gemini-client");
 vi.stubGlobal("fetch",vi.fn().mockResolvedValue(new Response(JSON.stringify({error:{message:"Invalid JSON payload received",status:"INVALID_ARGUMENT"}}),{status:400})));
 await expect(upstream("/v1beta/models/test:generateContent")).rejects.toMatchObject({status:400,message:expect.stringContaining("생성 설정")});
});
it("월 지출 한도 초과는 기다리라는 안내 없이 계정 설정을 안내한다",async()=>{
 const {upstream}=await import("./gemini-client");
 vi.stubGlobal("fetch",vi.fn().mockResolvedValue(new Response(JSON.stringify({error:{message:"Your project has exceeded its monthly spending cap.",status:"RESOURCE_EXHAUSTED"}}),{status:429})));
 await expect(upstream("/v1beta/models/test:generateContent")).rejects.toMatchObject({status:429,retryAfterMs:null,message:expect.stringContaining("월 지출 한도")});
});
