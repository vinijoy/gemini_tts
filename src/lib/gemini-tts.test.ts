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
