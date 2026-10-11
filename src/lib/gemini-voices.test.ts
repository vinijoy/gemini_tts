import { afterEach,expect,it,vi } from "vitest";
import { listVoices } from "./gemini-voices";
afterEach(()=>vi.unstubAllGlobals());
it("maps contexts to REST context and keeps missing previews valid",async()=>{const fetch=vi.fn().mockResolvedValue(new Response(JSON.stringify({voices:[{id:"Puck",type:"prebuilt",display_name:"Puck"}],next_page_token:"next"})));vi.stubGlobal("fetch",fetch);expect(await listVoices(new URLSearchParams("type=prebuilt&contexts=story&language_code=ko&page_size=50"))).toMatchObject({voices:[{id:"Puck",type:"prebuilt"}],nextPageToken:"next"});expect(fetch.mock.calls[0][0]).toContain("context=story");});
