import { beforeEach as prepareTestKey } from "vitest";
prepareTestKey(()=>vi.stubEnv("GEMINI_API_KEY","test-key-not-a-secret"));
import { afterEach, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "../app/api/tts/route";

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
