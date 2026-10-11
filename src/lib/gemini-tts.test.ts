import { beforeEach as prepareTestKey } from "vitest";
prepareTestKey(()=>vi.stubEnv("GEMINI_API_KEY","test-key-not-a-secret"));
import { afterEach, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "../app/api/tts/route";
import { parseTts, MODELS, type TtsRequest } from "./tts-contract";
import { requestGroups, wireRequest } from "./gemini-tts";
import { dialogueParts } from "./dialogue-blocks";

it("rejects overlong speaker declarations instead of silently assigning the fallback voice",()=>{
 const r=dialogue();r.turns=[{speaker:"A",text:"이".repeat(41)+": 대사",style:""}];
 expect(()=>requestGroups(parseTts(r))).toThrow(/40자/);
});
it("preserves continuation CRLF, tags, Unicode and whitespace while removing only speaker separators",()=>{
 const r=dialogue();r.speakers[0].name="  가 나  ";r.speakers[1].name="é";
 const block={speaker:"B",text:"서문 👩‍👩‍👧‍👦\r\n  가 나：  <laugh>안녕\r\n계속\r\n\r\né:\r\n  끝  ",style:" \n연출  "};
 expect(dialogueParts(parseTts(r),block,0).parts).toEqual([
  {speaker:"B",text:"서문 👩‍👩‍👧‍👦\r\n",style:block.style},
  {speaker:"A",text:" <laugh>안녕\r\n계속\r\n\r\n",style:block.style},
  {speaker:"B",text:"\r\n  끝  ",style:block.style},
 ]);
});
it("plain dialogue keeps fallback voice and URLs, timestamps and mid-sentence colons verbatim",()=>{
 const r=dialogue();const block={speaker:"B",text:"https://example.test:8080\n12:30 오후\n대사, 설명: 그대로\n",style:" 연출 "};
 expect(dialogueParts(r,block,0)).toEqual({parts:[block],named:false});
});
it("registered numeric names take precedence over timestamp detection",()=>{
 const r=dialogue();r.speakers[0].name="12";
 const block={speaker:"B",text:"12:30분 뒤에 만나자",style:" 숫자 이름 연출 "};
 expect(dialogueParts(parseTts(r),block,0)).toEqual({parts:[{...block,speaker:"A",text:"30분 뒤에 만나자"}],named:true});
 expect(dialogueParts(dialogue(),block,0)).toEqual({parts:[block],named:false});
});
it.each(MODELS.flatMap(model=>["prebuilt-dialogue","custom-dialogue"].map(mode=>({model,mode:mode as TtsRequest["mode"]}))))("stable A/B aliases remain valid with display names: $model/$mode",({model,mode})=>{
 const r=dialogue(mode);r.model=model;r.speakers[0].name="수아";r.speakers[1].name="민재";r.turns=[{speaker:"A",text:"B: 먼저\nA: 다음",style:" 원문 연출 "}];
 const groups=requestGroups(parseTts(r));expect(groups).toHaveLength(mode==="prebuilt-dialogue"?1:2);
 expect(groups.flat().map(t=>t.speaker)).toEqual(["B","A"]);
 expect(groups.flat().map(t=>t.style)).toEqual([" 원문 연출 "," 원문 연출 "]);
});
it("custom named blocks send the matching single voice in utterance order",async()=>{
 const r=dialogue("custom-dialogue");r.speakers[0].name="수아";r.speakers[1]={id:"B",name:"민재",voice:{kind:"stored-custom",value:"voice_b"}};
 r.turns=[{speaker:"A",text:"수아: 하나\n민재: 둘",style:"앞"},{speaker:"B",text:"민재: 셋\n수아: 넷",style:"뒤"}];
 const f=vi.fn().mockImplementation(()=>Promise.resolve(pcmResponse(f.mock.calls.length)));vi.stubGlobal("fetch",f);
 const res=await POST(new NextRequest("http://localhost/api/tts",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(r)}));
 expect(new Uint8Array(await res.arrayBuffer())).toEqual(new Uint8Array([1,0,2,0,3,0,4,0]));
 const wires=f.mock.calls.map(([,init])=>JSON.parse(init.body));
 expect(wires.map(w=>w.generationConfig.speechConfig)).toEqual(["Puck","voice_b","voice_b","Puck"].map(voice=>({voiceConfig:{voice}})));
 expect(wires.map(w=>w.contents[0].parts[0].speechMetadata)).toEqual(["앞","앞","뒤","뒤"].map(style=>({style})));
});
it.each(["모름: 대사","A: \nB: 대사","A: 대사\nB:  "])("preflights an invalid later block with zero provider calls: %s",async(text)=>{
 const r=dialogue();r.turns[1].text=text;const f=vi.fn();vi.stubGlobal("fetch",f);
 const res=await POST(new NextRequest("http://localhost/api/tts",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(r)}));
 expect(res.status).toBe(400);expect(f).not.toHaveBeenCalled();if(text.startsWith("모름"))expect(await res.text()).toContain("2번째 대사의 ‘모름’");
});
it.each([["동일"," 동일 "],["B","민재"],["수아","A"],["é","é"],["줄\n바꿈","민재"],["콜론:","민재"]])("rejects duplicate, reserved or malformed names %j / %j",(a,b)=>{
 const r=dialogue();r.speakers[0].name=a;r.speakers[1].name=b;expect(()=>parseTts(r)).toThrow();
});

function dialogue(mode:TtsRequest["mode"]="prebuilt-dialogue"):TtsRequest {
 return {model:MODELS[0],mode,speakers:[{id:"A",voice:{kind:"prebuilt-name",value:"Puck"}},{id:"B",voice:{kind:"prebuilt-name",value:"Kore"}}],turns:[{speaker:"A",text:"가".repeat(700),style:"  다정하게\n"},{speaker:"B",text:"나".repeat(700),style:" 힘차게 "}],output:{encoding:"AUDIO_L16",sampleRate:24000},serviceTier:"standard"};
}
function pcmResponse(sample=1){return new Response(`data: ${JSON.stringify({candidates:[{content:{parts:[{inlineData:{mimeType:"audio/l16;rate=24000",data:Buffer.from([sample,0]).toString("base64")}}]},finishReason:"STOP"}]})}\n\n`);}
it("named dialogue blocks keep both configured voices and stable speakers when the second block starts with B",async()=>{
 const r={...dialogue(),speakers:dialogue().speakers.map((s,i)=>({...s,name:i?"민재":"수아"})),turns:[
  {speaker:"A",text:"수아: 내 그 말 때문에 진짜 많이 버텼다.\n\n민재: 야, 갑자기 와 이라노.",style:" 첫 칸 연출\n"},
  {speaker:"B",text:"민재: 두 번째 칸 시작.\n수아: 그 다음 대사.",style:" 뒤 칸 연출 "},
 ]};
 const calls=vi.fn().mockImplementation(()=>Promise.resolve(pcmResponse(calls.mock.calls.length)));vi.stubGlobal("fetch",calls);
 const response=await POST(new NextRequest("http://localhost/api/tts",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(r)}));
 expect(response.status).toBe(200);expect(new Uint8Array(await response.arrayBuffer())).toEqual(new Uint8Array([1,0,2,0]));
 expect(calls).toHaveBeenCalledTimes(2);
 const wires=calls.mock.calls.map(([,init])=>JSON.parse(init.body));
 expect(wires.map(w=>w.contents[0].parts)).toEqual([
  [{text:"내 그 말 때문에 진짜 많이 버텼다.\n\n",speechMetadata:{speaker:"A",style:r.turns[0].style}},{text:"야, 갑자기 와 이라노.",speechMetadata:{speaker:"B",style:r.turns[0].style}}],
  [{text:"두 번째 칸 시작.\n",speechMetadata:{speaker:"B",style:r.turns[1].style}},{text:"그 다음 대사.",speechMetadata:{speaker:"A",style:r.turns[1].style}}],
 ]);
 for(const w of wires)expect(w.generationConfig.speechConfig.multiSpeakerVoiceConfig.speakerVoiceConfigs).toEqual([{speaker:"A",voiceConfig:{voice:"Puck"}},{speaker:"B",voiceConfig:{voice:"Kore"}}]);
});
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
 r.turns=[{speaker:"A",text,style:"  연출\n".repeat(150)}];
 const groups=requestGroups(parseTts(r));expect(groups.length).toBeGreaterThan(1);
 expect(groups.flat().map(t=>t.text).join("")).toBe(text);
 for(const group of groups){expect(Buffer.byteLength(JSON.stringify(wireRequest(r,group)))).toBeLessThanOrEqual(18000);expect(Array.from(group.map(t=>t.text).join("")).length).toBeLessThanOrEqual(1000);for(const part of group){expect(part.style).toBe(r.turns[0].style);expect(part.speaker).toBe("A");expect(part.text.trim()).not.toBe("");expect(part.text).not.toMatch(/^[\uDC00-\uDFFF\u0301]|[\uD800-\uDBFF]$/u);expect((part.text.match(/\[laughing\]/g)??[]).length).toBe((part.text.match(/\[/g)??[]).length);}}
});
it("accepts 21 turns and more than 4,000 total style characters",()=>{
 const r=dialogue();r.turns=Array.from({length:21},(_,i)=>({speaker:i%2?"B":"A",text:"대사",style:"s".repeat(220)}));
 expect(requestGroups(parseTts(r)).flat()).toEqual(r.turns);
});
it("manual turns stay separate with their own directions even when short",()=>{
 const r=dialogue();r.turns=r.turns.map(t=>({...t,text:"짧은 대사"}));
 expect(requestGroups(r)).toEqual(r.turns.map(t=>[t]));
 const single=dialogue("single");single.turns=[{speaker:"A",text:"a".repeat(1000)+"  ",style:""}];
 expect(requestGroups(single).flat().map(t=>t.text).join("")).toBe(single.turns[0].text);
});
it("preflights oversized directions, voice configuration and 129 custom calls",async()=>{
 const r=dialogue();const calls=vi.fn();vi.stubGlobal("fetch",calls);
 for(const invalid of [{...r,turns:[...r.turns,{speaker:"B",text:"끝",style:"가".repeat(6100)}]}, {...dialogue("custom-dialogue"),turns:Array.from({length:129},()=>({speaker:"A",text:"a",style:""}))}]){
 const res=await POST(new NextRequest("http://localhost/api/tts",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(invalid)}));expect(res.status).toBe(400);}
 expect(calls).not.toHaveBeenCalled();
 const single=dialogue("single");single.speakers=[{id:"A",voice:{kind:"prebuilt-id",value:"a".repeat(4096)}}];single.turns=[{speaker:"A",text:"가".repeat(2000),style:"s".repeat(1000)}];
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
