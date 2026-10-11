import { beforeEach as prepareTestKey } from "vitest";
prepareTestKey(()=>vi.stubEnv("GEMINI_API_KEY","test-key-not-a-secret"));
import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen, waitFor, } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StrictMode } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import Home from "./page";
import { POST } from "./api/tts/route";
import VoiceStudio from "./components/VoiceStudio";
import VoiceLibrary from "./components/VoiceLibrary";
import { POST as voicePost } from "./api/voices/route";
const player = vi.hoisted(() => ({
    activate: vi.fn<() => Promise<void>>(),
    close: vi.fn<() => Promise<void>>(),
    create: vi.fn(),
    enqueue: vi.fn<(samples: Int16Array) => Promise<void>>(),
}));
const createObjectUrl = vi.fn<(blob: Blob) => string>();
const revokeObjectUrl = vi.fn<(url: string) => void>();
vi.mock("@/utils/streaming-player", () => ({
    StreamingPcmPlayer: class {
        constructor() {
            player.create();
        }
        activate() {
            return player.activate();
        }
        enqueue(samples: Int16Array) {
            return player.enqueue(samples);
        }
        close() {
            return player.close();
        }
    },
}));
let streamController!: ReadableStreamDefaultController<Uint8Array>;
let streamSettled = false;
it("목록 조회가 끝나면 키보드 초점을 조회 버튼으로 복원한다",async()=>{streamSettled=true;vi.stubGlobal("fetch",vi.fn().mockResolvedValue(new Response(JSON.stringify({voices:[],nextPageToken:""}))));const user=userEvent.setup();render(<VoiceLibrary label="화자 A" onSelect={()=>{}}/>);const button=screen.getByRole("button",{name:"목록 조회"});await user.click(button);await waitFor(()=>expect(button).toHaveFocus());expect(fetch).toHaveBeenCalledWith(expect.stringContaining("source=provided"),expect.anything());});

it("기능 탭을 키보드로 이동하며 입력과 제작 초안을 유지한다", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "유지할 대본");
    const generationTab = screen.getByRole("tab", {name: "음성 만들기"});
    expect(generationTab).toHaveAttribute("aria-selected", "true");
    generationTab.focus();
    await user.keyboard("{ArrowRight}");
    const studioTab = screen.getByRole("tab", {name: "목소리 제작·관리"});
    expect(studioTab).toHaveFocus();
    expect(studioTab).toHaveAttribute("aria-selected", "true");
    expect(screen.queryByRole("textbox", {name: "음성으로 변환할 텍스트 입력창"})).toBeNull();
    await user.type(screen.getByLabelText(/설계 설명/), "유지할 목소리 설명");
    studioTab.focus();
    await user.keyboard("{End}");
    expect(studioTab).toHaveFocus();
    expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
    expect(screen.getByRole("region", {name: "목소리 제작과 관리"})).toBeVisible();
    await user.keyboard("{ArrowRight}");
    expect(generationTab).toHaveFocus();
    expect(screen.getByLabelText("음성으로 변환할 텍스트 입력창")).toHaveValue("유지할 대본");
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByLabelText(/설계 설명/)).toHaveValue("유지할 목소리 설명");
    studioTab.focus();
    await user.keyboard("{Home}");
    expect(generationTab).toHaveFocus();
    expect(fetch).not.toHaveBeenCalled();
});
function expectOnlyActiveSelects(container: HTMLElement) {
    const hidden = container.querySelectorAll('[role="tabpanel"][hidden], [role="region"][hidden]');
    expect(hidden.length).toBeGreaterThanOrEqual(2);
    hidden.forEach(panel => expect(panel.querySelectorAll("select")).toHaveLength(0));
    expect(container.querySelectorAll('[role="tabpanel"]:not([hidden]) select').length).toBeGreaterThan(0);
}
it("모든 탭의 선택 메뉴와 열린 검색·두 화자·추가 발화 설정을 왕복 보존한다", async () => {
    vi.stubGlobal("fetch", vi.fn().mockImplementation(() => Promise.resolve(new Response(JSON.stringify({voices:[{id:"korean",name:"한국어 목소리",type:"prompted",languages:["ko-KR"],regions:["KR"]}],nextPageToken:""})))));
    const user = userEvent.setup();
    const {container} = render(<Home />);
    expectOnlyActiveSelects(container);
    await user.selectOptions(screen.getByLabelText("음성 선택"), "Kore");
    await user.selectOptions(screen.getByLabelText("음성 선택"), "Puck");
    await user.selectOptions(screen.getByLabelText("화자 모드"), "prebuilt-dialogue");
    await user.selectOptions(screen.getByLabelText("화자 B 기본 목소리"), "Aoede");
    await user.click(screen.getByRole("button", {name: "대사 추가"}));
    await user.selectOptions(screen.getByLabelText("발화 2 화자"), "A");
    await user.type(screen.getByLabelText("발화 2 대본"), "둘째 발화");
    await user.selectOptions(screen.getByLabelText("샘플레이트"), "16000");
    await user.selectOptions(screen.getByLabelText("요청 처리 등급"), "flex");
    await user.click(screen.getByRole("radio", {name: "확장·저장 목소리"}));

    await user.selectOptions(screen.getAllByLabelText("목소리 종류")[1], "prompted");
    await waitFor(()=>expect(screen.getByLabelText("화자 B 언어")).toBeEnabled());
    await user.selectOptions(await screen.findByLabelText("화자 B 언어"), "ko-KR");
    await user.selectOptions(screen.getByLabelText("화자 B 지역"), "KR");
    for (const name of ["목소리 제작·관리", "음성 만들기"]) {
        await user.click(screen.getByRole("tab", {name}));
        expectOnlyActiveSelects(container);
    }
    expect(screen.getByText("현재 화자 A 목소리:", {exact: false})).toHaveTextContent("퍽");
    expect(screen.queryByLabelText("화자 B 기본 목소리")).not.toBeInTheDocument();
    expect(screen.getByLabelText("발화 2 화자")).toHaveValue("A");
    expect(screen.getByLabelText("발화 2 대본")).toHaveValue("둘째 발화");
    expect(screen.getByLabelText("샘플레이트")).toHaveValue("16000");
    expect(screen.getByLabelText("요청 처리 등급")).toHaveValue("flex");
    expect(screen.getAllByLabelText("목록 출처")[1]).toHaveValue("remote");
    expect(screen.getAllByLabelText("목소리 종류")[1]).toHaveValue("prompted");
    expect(screen.getByLabelText("화자 B 언어")).toHaveValue("ko-KR");
    expect(screen.getByLabelText("화자 B 지역")).toHaveValue("KR");
    await user.click(screen.getByRole("radio", {name: "기본 목소리"}));
    expect(screen.getByLabelText("화자 B 기본 목소리")).toHaveValue("Aoede");
    expect(fetch).toHaveBeenCalledTimes(3);
});
it("제작 탭 왕복에서 선택값과 빈 직접 입력 모드·첨부 File·동의를 보존한다", async () => {
    const user = userEvent.setup();
    const {container} = render(<Home />);
    await user.click(screen.getByRole("tab", {name: "목소리 제작·관리"}));
    await user.selectOptions(screen.getByLabelText("제작 방식"), "replicated");
    const model = screen.getByLabelText("제작 모델") as HTMLSelectElement;
    const otherModel = model.options[1].value;
    await user.selectOptions(model, otherModel);
    await user.selectOptions(screen.getByLabelText("목소리 언어"), "custom");
    await user.selectOptions(screen.getByLabelText("목소리 성별 표현"), "female");
    const sourceInput = screen.getByLabelText("참조 녹음") as HTMLInputElement;
    const consentInput = screen.getByLabelText("공식 동의문 녹음") as HTMLInputElement;
    const source = new File(["local fixture"], "source.wav", {type: "audio/wav"});
    const consent = new File(["local fixture"], "consent.wav", {type: "audio/wav"});
    await user.upload(sourceInput, source);
    await user.upload(consentInput, consent);
    const check = screen.getByLabelText("성인 본인의 원본 목소리이며 복제에 동의합니다.");
    await user.click(check);
    await user.click(screen.getByRole("tab", {name: "음성 만들기"}));
    expectOnlyActiveSelects(container);
    await user.click(screen.getByRole("tab", {name: "목소리 제작·관리"}));
    expect(screen.getByLabelText("제작 방식")).toHaveValue("replicated");
    expect(screen.getByLabelText("제작 모델")).toHaveValue(otherModel);
    expect(screen.getByLabelText("목소리 성별 표현")).toHaveValue("female");
    expect(screen.getByLabelText("목소리 언어")).toHaveValue("custom");
    expect(screen.getByLabelText("목소리 언어 직접 입력")).toHaveValue("");
    expect(screen.getByLabelText("참조 녹음")).toBe(sourceInput);
    expect(screen.getByLabelText("공식 동의문 녹음")).toBe(consentInput);
    expect(sourceInput.files?.[0]).toBe(source);
    expect(consentInput.files?.[0]).toBe(consent);
    expect(check).toBeChecked();
    expect(fetch).not.toHaveBeenCalled();
});
it("숨은 생성 탭에서도 스트림을 끝까지 유지하고 결과를 복원한다", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "탭 밖 생성");
    await user.click(screen.getByRole("button", {name: "음성 생성하기 버튼"}));
    const requestSignal = vi.mocked(fetch).mock.calls[0][1]?.signal;
    await user.click(screen.getByRole("tab", {name: "목소리 제작·관리"}));
    expect(requestSignal?.aborted).toBe(false);
    await act(async () => { streamController.enqueue(Uint8Array.from([0, 0])); closeStream(); });
    expect(screen.getByRole("tab", {name: "목소리 제작·관리"})).toHaveFocus();
    await user.click(screen.getByRole("tab", {name: "음성 만들기"}));
    expect(await screen.findByRole("link", {name: "생성된 음성 파일 다운로드"})).toBeVisible();
    expect(fetch).toHaveBeenCalledOnce();
});
it("숨은 검색의 늦은 응답은 선택 상태를 보존하고 활성 탭의 초점을 빼앗지 않는다", async () => {
    let resolve!: (response: Response) => void;
    vi.stubGlobal("fetch", vi.fn(() => new Promise<Response>(done => {resolve = done;})));
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("radio", {name: "확장·저장 목소리"}));


    const signal = vi.mocked(fetch).mock.calls[0][1]?.signal;
    const tab = screen.getByRole("tab", {name: "목소리 제작·관리"});
    await user.click(tab);
    await act(async () => resolve(new Response(JSON.stringify({voices: [{id:"remote_voice",name:"원격 목소리",type:"prompted",languages:[],description:"보존된 결과"}],nextPageToken:""}))));
    expect(signal?.aborted).toBe(false);
    expect(tab).toHaveFocus();
    await user.click(screen.getByRole("tab", {name: "음성 만들기"}));
    await user.selectOptions(screen.getByRole("combobox", {name:"화자 A 목소리"}), "remote_voice");
    await user.click(screen.getByRole("radio", {name: "기본 목소리"}));
    expect(screen.getByLabelText("음성 선택")).toHaveValue("remote_voice");
    await user.click(tab);
    await user.click(screen.getByRole("tab", {name: "음성 만들기"}));
    await user.click(screen.getByRole("radio", {name: "기본 목소리"}));
    expect(screen.getByLabelText("음성 선택")).toHaveValue("remote_voice");
    expect(screen.queryByLabelText("화자 A 공식 기본 목소리")).toBeNull();
    expect(fetch).toHaveBeenCalledOnce();
});
it("숨은 제작 요청이 완료되어도 활성 탭 초점과 결과 ID를 보존한다", async () => {
    let resolve!: (response: Response) => void;
    vi.stubGlobal("fetch", vi.fn(() => new Promise<Response>(done => {resolve = done;})));
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("tab", {name: "목소리 제작·관리"}));
    await user.type(screen.getByLabelText(/설계 설명/), "목소리 설명");
    await user.click(screen.getByRole("button", {name: "목소리 생성 (유료 요청)"}));
    const tab = screen.getByRole("tab", {name: "음성 만들기"});
    await user.click(tab);
    await act(async () => resolve(new Response(JSON.stringify({id:"voice_background",name:"완료 목소리",type:"prompted",languages:[]}))));
    expect(tab).toHaveFocus();
    await user.click(screen.getByRole("tab", {name: "목소리 제작·관리"}));
    expect(screen.getByLabelText("목소리 ID")).toHaveValue("voice_background");
    await user.click(screen.getByRole("tab", {name: "음성 만들기"}));
    expect(screen.getByLabelText("음성 선택")).toHaveValue("voice_background");
    expect(fetch).toHaveBeenCalledOnce();
});
it("두 화자의 카테고리는 독립적이며 숨긴 탭에는 선택 메뉴가 없다", async () => {
    vi.stubGlobal("fetch", vi.fn().mockImplementation(() => Promise.resolve(new Response(JSON.stringify({voices:[{id:"korean",name:"한국어 목소리",type:"prompted",languages:["ko-KR"],regions:["KR"]}],nextPageToken:""})))));
    const user = userEvent.setup();
    const {container} = render(<Home />);
    await user.selectOptions(screen.getByLabelText("화자 모드"), "prebuilt-dialogue");
    await user.click(screen.getByRole("radio", {name: "확장·저장 목소리"}));
    await waitFor(()=>expect(screen.getByLabelText("화자 B 언어")).toBeEnabled());
    await user.selectOptions(screen.getByLabelText("화자 B 언어"), "ko-KR");
    expect(screen.getByLabelText("화자 A 언어")).toHaveValue("");
    await user.click(screen.getByRole("radio", {name:"기본 목소리"}));
    expect(container.querySelectorAll("#voice-panel-library select")).toHaveLength(0);
    await user.click(screen.getByRole("radio", {name:"확장·저장 목소리"}));
    expect(screen.getByLabelText("화자 B 언어")).toHaveValue("ko-KR");
});

it("키보드로 Design을 제출하고 실제 앱 API가 반환한 저장 음성을 선택한다", async () => {
    streamSettled = true;
    const select = vi.fn();
    vi.stubGlobal("fetch", vi.fn(async (url, init) => url === "/api/voices" ? voicePost(new Request("http://localhost/api/voices", init)) : new Response(JSON.stringify({ id: "voice_1", type: "prompted", display_name: "안내" }))));
    const user = userEvent.setup();
    render(<VoiceStudio onSelect={select}/>);
    await user.type(screen.getByLabelText(/설계 설명/), "따뜻하고 또렷한 안내 목소리");
    screen.getByRole("button", { name: "목소리 생성 (유료 요청)" }).focus();
    await user.keyboard("{Enter}");
    await waitFor(() => expect(select).toHaveBeenCalledWith({ kind: "stored-custom", value: "voice_1" }));
    expect(screen.getByRole("button", { name: "확인한 목소리 삭제" })).toBeDisabled();
    expect(screen.getByText(/기존 목소리 변형 기능은/)).toBeInTheDocument();
});
it("화면 제출부터 실제 POST와 REST 응답을 거쳐 완료 WAV까지 연결한다", async () => {
    streamSettled = true;
    vi.stubGlobal("fetch", vi.fn(async (url, init) => {
        if (url === "/api/tts")
            return POST(new Request("http://localhost/api/tts", init));
        expect(String(url)).toContain("gemini-3.8-flash-tts:streamGenerateContent");
        const body = JSON.parse(init.body);
        expect(body.contents[0].parts[0].text).toBe("통합 검사");
        return new Response('data: {"candidates":[{"content":{"parts":[{"inlineData":{"data":"AQACAA==","mimeType":"audio/l16;rate=24000"}}]},"finishReason":"STOP"}]}\n\n');
    }));
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "통합 검사");
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    await screen.findByRole("link", { name: "생성된 음성 파일 다운로드" });
    expect(player.enqueue).toHaveBeenCalledWith(new Int16Array([1, 2]));
    expect(createObjectUrl.mock.calls.at(-1)?.[0].type).toBe("audio/wav");
});
function closeStream() {
    streamSettled = true;
    streamController.close();
}
it("두 대화 상자 안의 이름을 각각 설정한 목소리로 보내고 연출과 PCM 순서를 유지한다",async()=>{
 streamSettled=true;
 const calls=vi.fn().mockImplementation(()=>Promise.resolve(new Response(`data: ${JSON.stringify({candidates:[{content:{parts:[{inlineData:{mimeType:"audio/l16;rate=24000",data:Buffer.from([calls.mock.calls.length,0]).toString("base64")}}]},finishReason:"STOP"}]})}\n\n`)));
 vi.stubGlobal("fetch",vi.fn((url,init)=>url==="/api/tts"?POST(new Request("http://localhost/api/tts",init)):calls(url,init)));
 const user=userEvent.setup();render(<Home/>);await user.selectOptions(screen.getByLabelText("화자 모드"),"prebuilt-dialogue");
 await user.type(screen.getByLabelText("첫 번째 화자 대본 이름"),"수아");await user.type(screen.getByLabelText("두 번째 화자 대본 이름"),"민재");
 fireEvent.change(screen.getByLabelText("음성으로 변환할 텍스트 입력창"),{target:{value:"수아: 내 그 말 때문에 진짜 많이 버텼다.\n\n민재: 야, 갑자기 와 이라노."}});
 fireEvent.change(screen.getByLabelText("스타일 및 감정 입력창"),{target:{value:" 첫 연출\n"}});
 await user.click(screen.getByRole("button",{name:"대사 추가"}));
 fireEvent.change(screen.getByLabelText("발화 2 대본"),{target:{value:"민재: 다음 대화.\n수아: 그래."}});fireEvent.change(screen.getByLabelText("발화 2 연출"),{target:{value:" 뒤 연출 "}});
 await user.click(screen.getByRole("button",{name:"음성 생성하기 버튼"}));expect(await screen.findByRole("link",{name:"생성된 음성 파일 다운로드"})).toBeVisible();
 expect(calls).toHaveBeenCalledTimes(2);const wires=calls.mock.calls.map(([,init])=>JSON.parse(init.body));
 expect(wires.map(w=>w.contents[0].parts.map((p:{speechMetadata:{speaker:string;style:string}})=>p.speechMetadata))).toEqual([[{speaker:"A",style:" 첫 연출\n"},{speaker:"B",style:" 첫 연출\n"}],[{speaker:"B",style:" 뒤 연출 "},{speaker:"A",style:" 뒤 연출 "}]]);
 for(const wire of wires)expect(wire.generationConfig.speechConfig.multiSpeakerVoiceConfig.speakerVoiceConfigs).toEqual([{speaker:"A",voiceConfig:{voice:"Puck"}},{speaker:"B",voiceConfig:{voice:"Kore"}}]);
 expect(player.enqueue.mock.calls.flatMap(([samples])=>Array.from(samples))).toEqual([1,2]);expect(createObjectUrl.mock.calls.at(-1)?.[0].type).toBe("audio/wav");
});
function errorStream(error: Error) {
    streamSettled = true;
    streamController.error(error);
}
beforeEach(() => {
    streamSettled = false;
    const stream = new ReadableStream<Uint8Array>({
        start(controller) {
            streamController = controller;
        },
    });
    player.close.mockResolvedValue();
    player.activate.mockResolvedValue();
    player.enqueue.mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => { });
    createObjectUrl.mockReturnValue("blob:test-audio");
    Object.defineProperties(URL, {
        createObjectURL: {
            configurable: true,
            value: createObjectUrl,
        },
        revokeObjectURL: {
            configurable: true,
            value: revokeObjectUrl,
        },
    });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(stream)));
});
afterEach(() => {
    cleanup();
    if (!streamSettled) {
        closeStream();
    }
    Reflect.deleteProperty(URL, "createObjectURL");
    Reflect.deleteProperty(URL, "revokeObjectURL");
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
});
it("본문 입력과 태그 추가를 1,000자에서 원천 차단한다", async () => {
    const user = userEvent.setup();
    render(<Home />);
    const textInput = screen.getByLabelText("음성으로 변환할 텍스트 입력창");
    expect(textInput).toHaveAttribute("maxLength", "1000");
    fireEvent.change(textInput, { target: { value: "가".repeat(1001) } });
    expect(textInput).toHaveValue("가".repeat(1000));
    await user.click(screen.getByRole("button", { name: "웃음 태그 추가" }));
    expect(textInput).toHaveValue("가".repeat(1000));
});
it.each(["prebuilt-dialogue","custom-dialogue"])("%s 추가 대사는 각자 지정한 연출로 별도 생성하고 완성 WAV로 연결한다",async(mode)=>{
 streamSettled=true;
 const provider=vi.fn().mockImplementation(()=>Promise.resolve(new Response(`data: ${JSON.stringify({candidates:[{content:{parts:[{inlineData:{mimeType:"audio/l16;rate=24000",data:Buffer.from([provider.mock.calls.length,0]).toString("base64")}}]},finishReason:"STOP"}]})}\n\n`)));
 vi.stubGlobal("fetch",vi.fn((url,init)=>String(url)==="/api/tts"?POST(new Request("http://localhost/api/tts",init)):provider(url,init)));
 const user=userEvent.setup();render(<Home />);await user.selectOptions(screen.getByLabelText("화자 모드"),mode);
 fireEvent.change(screen.getByLabelText("음성으로 변환할 텍스트 입력창"),{target:{value:"가".repeat(1000)}});
 fireEvent.change(screen.getByLabelText("스타일 및 감정 입력창"),{target:{value:" 앞 연출 "+"한".repeat(990)}});
 await user.click(screen.getByRole("button",{name:"대사 추가"}));
 fireEvent.change(screen.getByLabelText("발화 2 대본"),{target:{value:"나".repeat(1000)}});
 fireEvent.change(screen.getByLabelText("발화 2 연출"),{target:{value:" 뒤 연출 "+"글".repeat(990)}});
 expect(screen.getByLabelText("발화 2 대본")).toHaveAttribute("maxLength","1000");
 expect(screen.getByLabelText("발화 2 연출")).toHaveAttribute("maxLength","1000");
 await user.click(screen.getByRole("button",{name:"음성 생성하기 버튼"}));
 expect(await screen.findByRole("link",{name:"생성된 음성 파일 다운로드"})).toBeVisible();
 expect(provider).toHaveBeenCalledTimes(2);
 expect(provider.mock.calls.map(([,init])=>JSON.parse(init.body).contents[0].parts[0])).toEqual([
  {text:"가".repeat(1000),speechMetadata:{style:" 앞 연출 "+"한".repeat(990),...(mode==="prebuilt-dialogue"?{speaker:"A"}:{})}},
  {text:"나".repeat(1000),speechMetadata:{style:" 뒤 연출 "+"글".repeat(990),...(mode==="prebuilt-dialogue"?{speaker:"B"}:{})}},
 ]);
 expect(player.enqueue.mock.calls.flatMap(([samples])=>Array.from(samples))).toEqual([1,2]);
 expect(createObjectUrl.mock.calls.at(-1)?.[0].type).toBe("audio/wav");
});
it("대사를 21개 이상 추가할 수 있고 입력별 제한은 유지한다",async()=>{
 const user=userEvent.setup();render(<Home/>);await user.selectOptions(screen.getByLabelText("화자 모드"),"prebuilt-dialogue");
 for(let i=0;i<20;i++)await user.click(screen.getByRole("button",{name:"대사 추가"}));
 expect(screen.getByLabelText("발화 21 대본")).toHaveAttribute("maxLength","1000");expect(screen.getByRole("button",{name:"대사 추가"})).toBeEnabled();
});
it("뒤 대사의 실패는 재생기를 닫고 완성 파일을 만들지 않는다",async()=>{
 streamSettled=true;vi.spyOn(console,"error").mockImplementation(()=>{});
 let count=0;vi.stubGlobal("fetch",vi.fn(async(url,init)=>{
  if(url==="/api/tts")return POST(new Request("http://localhost/api/tts",init));
  count++;return count===1?new Response('data: {"candidates":[{"content":{"parts":[{"inlineData":{"data":"AQACAA==","mimeType":"audio/l16;rate=24000"}}]},"finishReason":"STOP"}]}\n\n'):new Response("later failure",{status:502});
 }));
 const user=userEvent.setup();render(<Home/>);await user.selectOptions(screen.getByLabelText("화자 모드"),"prebuilt-dialogue");
 fireEvent.change(screen.getByLabelText("음성으로 변환할 텍스트 입력창"),{target:{value:"첫 대사"}});await user.click(screen.getByRole("button",{name:"대사 추가"}));fireEvent.change(screen.getByLabelText("발화 2 대본"),{target:{value:"뒤 대사"}});
 await user.click(screen.getByRole("button",{name:"음성 생성하기 버튼"}));await screen.findByRole("alert");
 expect(player.close).toHaveBeenCalled();expect(createObjectUrl).not.toHaveBeenCalled();expect(screen.queryByRole("link",{name:"생성된 음성 파일 다운로드"})).not.toBeInTheDocument();expect(count).toBe(2);
});
it("브라우저도 32MiB 초과 오디오를 중단하고 완성 파일을 만들지 않는다",async()=>{
 vi.spyOn(console,"error").mockImplementation(()=>{});const user=userEvent.setup();render(<Home/>);
 fireEvent.change(screen.getByLabelText("음성으로 변환할 텍스트 입력창"),{target:{value:"용량 검사"}});await user.click(screen.getByRole("button",{name:"음성 생성하기 버튼"}));
 await act(async()=>{streamController.enqueue(new Uint8Array(32*1024*1024+2));});
 expect(await screen.findByRole("alert")).toHaveTextContent("32MiB");expect(player.close).toHaveBeenCalled();expect(createObjectUrl).not.toHaveBeenCalled();
 streamSettled=true;
});
it("생성 중 첫 PCM 청크를 자동 재생하고 결과 액션을 비활성화한다", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "안녕하세요");
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    act(() => streamController.enqueue(Uint8Array.from([0, 0])));
    await waitFor(() => expect(player.enqueue).toHaveBeenCalledOnce());
    expect(player.enqueue).toHaveBeenCalledWith(Int16Array.from([0]));
    expect(screen.getByRole("button", { name: "다시 듣기" })).toBeDisabled();
    expect(screen.getByRole("heading", {
        name: "음성을 생성하며 재생하고 있습니다.",
    })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "생성된 음성 파일 다운로드" })).not.toBeInTheDocument();
});
it("네트워크 요청 전에 스트리밍 플레이어 활성화를 완료한다", async () => {
    let completeActivation!: () => void;
    player.activate.mockReturnValueOnce(new Promise<void>((resolve) => {
        completeActivation = resolve;
    }));
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "먼저 활성화할 음성");
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    await waitFor(() => expect(player.activate).toHaveBeenCalledOnce());
    expect(fetch).not.toHaveBeenCalled();
    completeActivation();
    await waitFor(() => expect(fetch).toHaveBeenCalledOnce());
});
it("플레이어 활성화가 거부되면 요청을 중단하고 한국어 오류를 알린다", async () => {
    player.activate.mockRejectedValueOnce(new Error("autoplay denied"));
    const abortRequest = vi.spyOn(AbortController.prototype, "abort");
    vi.spyOn(console, "error").mockImplementation(() => { });
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "차단될 음성");
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("오디오 자동 재생을 시작하지 못했습니다. 브라우저의 자동 재생 권한을 확인한 뒤 다시 시도해 주세요.");
    expect(fetch).not.toHaveBeenCalled();
    expect(abortRequest).toHaveBeenCalledOnce();
    expect(player.close).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "음성 생성하기 버튼" })).toBeEnabled();
});
it("플레이어 활성화가 동기 실패해도 한국어 오류로 정규화한다", async () => {
    player.activate.mockImplementationOnce(() => {
        throw new Error("AudioContext constructor failed");
    });
    vi.spyOn(console, "error").mockImplementation(() => { });
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "동기 실패할 음성");
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("오디오 자동 재생을 시작하지 못했습니다. 브라우저의 자동 재생 권한을 확인한 뒤 다시 시도해 주세요.");
    expect(fetch).not.toHaveBeenCalled();
    expect(player.close).toHaveBeenCalledOnce();
});
it("비JSON 오류 응답 본문을 한 번만 읽고 한국어 안내로 복구한다", async () => {
    const errorResponse = new Response("upstream temporarily unavailable", {
        status: 502,
        headers: { "Content-Type": "text/plain" },
    });
    const readText = vi.spyOn(errorResponse, "text");
    const readJson = vi.spyOn(errorResponse, "json");
    vi.mocked(fetch).mockResolvedValueOnce(errorResponse);
    vi.spyOn(console, "error").mockImplementation(() => { });
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "서버 오류를 확인할 음성");
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("음성 생성 서버에서 오류가 발생했습니다. 잠시 후 다시 시도해 주세요. (서버 응답: upstream temporarily unavailable)");
    expect(readText).toHaveBeenCalledOnce();
    expect(readJson).not.toHaveBeenCalled();
    expect(errorResponse.bodyUsed).toBe(true);
    expect(screen.getByRole("button", { name: "음성 생성하기 버튼" })).toBeEnabled();
});
it("스트림 완료 후 다시 듣기와 WAV 다운로드를 활성화한다", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "완료할 음성");
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    act(() => {
        streamController.enqueue(Uint8Array.from([0, 0]));
        closeStream();
    });
    const replayButton = screen.getByRole("button", { name: "다시 듣기" });
    await waitFor(() => expect(replayButton).toBeEnabled());
    expect(screen.getByRole("link", { name: "생성된 음성 파일 다운로드" })).toHaveAttribute("href", "blob:test-audio");
    expect(screen.getByRole("heading", {
        name: "음성 생성이 완료되었습니다.",
    })).toBeInTheDocument();
    const wavBlob = createObjectUrl.mock.calls[0]?.[0];
    expect(wavBlob).toBeInstanceOf(Blob);
    if (!wavBlob)
        throw new Error("완성된 WAV Blob이 없습니다.");
    expect(wavBlob).toMatchObject({ size: 46, type: "audio/wav" });
});
it("상태 라이브 영역을 유지하며 생성 상태 문구만 갱신한다", async () => {
    const user = userEvent.setup();
    render(<Home />);
    const liveStatus = screen.getByRole("status");
    expect(liveStatus).toBeEmptyDOMElement();
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "상태를 알릴 음성");
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    expect(liveStatus).toHaveTextContent("음성을 생성하고 있습니다. 준비되면 자동 재생됩니다.");
    act(() => {
        streamController.enqueue(Uint8Array.from([0, 0]));
    });
    await waitFor(() => expect(liveStatus).toHaveTextContent("음성을 생성하며 재생하고 있습니다."));
});
it("예약 재생을 닫은 뒤 완성 음성을 처음부터 다시 재생한다", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "다시 들을 음성");
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    act(() => {
        streamController.enqueue(Uint8Array.from([0, 0]));
        closeStream();
    });
    const replayButton = screen.getByRole("button", {
        name: "다시 듣기",
    });
    await waitFor(() => expect(replayButton).toBeEnabled());
    let finishPlayerClose!: () => void;
    player.close.mockReturnValueOnce(new Promise<void>((resolve) => {
        finishPlayerClose = resolve;
    }));
    await user.click(replayButton);
    await user.click(replayButton);
    expect(player.close).toHaveBeenCalledOnce();
    expect(player.create).toHaveBeenCalledTimes(2);
    expect(player.activate).toHaveBeenCalledTimes(2);
    expect(player.enqueue).toHaveBeenCalledOnce();
    finishPlayerClose();
    await waitFor(() => expect(player.enqueue).toHaveBeenCalledTimes(2));
    expect(player.enqueue).toHaveBeenLastCalledWith(Int16Array.from([0]));
    expect(document.querySelector("audio")).toBeNull();
    await user.click(replayButton);
    await waitFor(() => expect(player.enqueue).toHaveBeenCalledTimes(3));
    expect(player.close).toHaveBeenCalledTimes(2);
    expect(player.create).toHaveBeenCalledTimes(3);
});
it("이전 다시 듣기의 늦은 실패가 새 결과를 막거나 오염하지 않는다", async () => {
    let rejectPreviousReplay!: (error: Error) => void;
    const previousReplayPlayback = new Promise<void>((_resolve, reject) => {
        rejectPreviousReplay = reject;
    });
    player.enqueue
        .mockResolvedValueOnce()
        .mockReturnValueOnce(previousReplayPlayback)
        .mockResolvedValue();
    vi.spyOn(console, "error").mockImplementation(() => { });
    createObjectUrl
        .mockReturnValueOnce("blob:previous-audio")
        .mockReturnValueOnce("blob:current-audio");
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "이전 음성");
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    act(() => {
        streamController.enqueue(Uint8Array.from([0, 0]));
        closeStream();
    });
    const previousReplay = screen.getByRole("button", { name: "다시 듣기" });
    await waitFor(() => expect(previousReplay).toBeEnabled());
    await user.click(previousReplay);
    await waitFor(() => expect(player.enqueue).toHaveBeenCalledTimes(2));
    let currentController!: ReadableStreamDefaultController<Uint8Array>;
    const currentStream = new ReadableStream<Uint8Array>({
        start(controller) {
            currentController = controller;
        },
    });
    vi.mocked(fetch).mockResolvedValueOnce(new Response(currentStream));
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    act(() => {
        currentController.enqueue(Uint8Array.from([1, 0]));
        currentController.close();
    });
    const currentReplay = screen.getByRole("button", { name: "다시 듣기" });
    await waitFor(() => expect(currentReplay).toBeEnabled());
    await user.click(currentReplay);
    await waitFor(() => expect(player.enqueue).toHaveBeenCalledTimes(4));
    await act(async () => {
        rejectPreviousReplay(new Error("이전 Web Audio 재생 실패"));
        await Promise.resolve();
    });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "생성된 음성 파일 다운로드" })).toHaveAttribute("href", "blob:current-audio");
});
it("새 생성을 시작하면 재생 중인 완성 오디오를 중지한다", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "재생 중인 음성");
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    act(() => {
        streamController.enqueue(Uint8Array.from([0, 0]));
        closeStream();
    });
    const replayButton = screen.getByRole("button", { name: "다시 듣기" });
    await waitFor(() => expect(replayButton).toBeEnabled());
    await user.click(replayButton);
    await waitFor(() => expect(player.enqueue).toHaveBeenCalledTimes(2));
    player.close.mockClear();
    let nextController!: ReadableStreamDefaultController<Uint8Array>;
    const nextStream = new ReadableStream<Uint8Array>({
        start(controller) {
            nextController = controller;
        },
    });
    vi.mocked(fetch).mockResolvedValueOnce(new Response(nextStream));
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    await waitFor(() => expect(player.close).toHaveBeenCalledOnce());
    expect(document.querySelector("audio")).toBeNull();
    act(() => {
        nextController.enqueue(Uint8Array.from([0, 0]));
        nextController.close();
    });
    await waitFor(() => expect(screen.getByRole("button", { name: "다시 듣기" })).toBeEnabled());
});
it("스트림 오류 시 결과를 폐기하고 생성 버튼을 복구한다", async () => {
    vi.spyOn(console, "error").mockImplementation(() => { });
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "중단될 음성");
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    const requestSignal = vi.mocked(fetch).mock.calls[0]?.[1]?.signal;
    act(() => streamController.enqueue(Uint8Array.from([0, 0])));
    await waitFor(() => expect(player.enqueue).toHaveBeenCalledOnce());
    act(() => errorStream(new Error("연결 끊김")));
    expect(await screen.findByRole("alert")).toHaveTextContent("연결 끊김");
    expect(screen.getByRole("button", { name: "음성 생성하기 버튼" })).toBeEnabled();
    expect(screen.queryByRole("button", { name: "다시 듣기" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "생성된 음성 파일 다운로드" })).not.toBeInTheDocument();
    expect(createObjectUrl).not.toHaveBeenCalled();
    expect(requestSignal?.aborted).toBe(true);
    expect(player.close).toHaveBeenCalledOnce();
});
it("유효 샘플 뒤 홀수 PCM 꼬리가 남으면 WAV 결과를 만들지 않는다", async () => {
    vi.spyOn(console, "error").mockImplementation(() => { });
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "잘린 음성");
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    act(() => {
        streamController.enqueue(Uint8Array.from([0x00, 0x80, 0xff]));
        closeStream();
    });
    expect(await screen.findByRole("alert")).toHaveTextContent("PCM 오디오 데이터가 16비트 샘플 경계로 끝나지 않았습니다. 음성을 다시 생성해 주세요.");
    expect(createObjectUrl).not.toHaveBeenCalled();
    expect(player.close).toHaveBeenCalledOnce();
    expect(screen.queryByRole("button", { name: "다시 듣기" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "생성된 음성 파일 다운로드" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "음성 생성하기 버튼" })).toBeEnabled();
});
it("새 생성 전 이전 요청과 플레이어 및 Blob URL을 정리한다", async () => {
    createObjectUrl
        .mockReturnValueOnce("blob:first-audio")
        .mockReturnValueOnce("blob:second-audio");
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "첫 번째 음성");
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    const fetchMock = vi.mocked(fetch);
    const firstSignal = fetchMock.mock.calls[0]?.[1]?.signal;
    act(() => {
        streamController.enqueue(Uint8Array.from([0, 0]));
        closeStream();
    });
    expect(await screen.findByRole("link", {
        name: "생성된 음성 파일 다운로드",
    })).toHaveAttribute("href", "blob:first-audio");
    let secondController!: ReadableStreamDefaultController<Uint8Array>;
    const secondStream = new ReadableStream<Uint8Array>({
        start(controller) {
            secondController = controller;
        },
    });
    fetchMock.mockResolvedValueOnce(new Response(secondStream));
    let finishPreviousPlayerClose!: () => void;
    player.close.mockReturnValueOnce(new Promise<void>((resolve) => {
        finishPreviousPlayerClose = resolve;
    }));
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    await waitFor(() => expect(player.close).toHaveBeenCalledOnce());
    expect(player.activate).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenCalledOnce();
    finishPreviousPlayerClose();
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    expect(firstSignal).toBeInstanceOf(AbortSignal);
    expect(firstSignal?.aborted).toBe(true);
    expect(player.close).toHaveBeenCalledOnce();
    expect(revokeObjectUrl).toHaveBeenCalledWith("blob:first-audio");
    expect(screen.queryByRole("link", { name: "생성된 음성 파일 다운로드" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "다시 듣기" })).toBeDisabled();
    act(() => {
        secondController.enqueue(Uint8Array.from([1, 0]));
        secondController.close();
    });
    expect(await screen.findByRole("link", {
        name: "생성된 음성 파일 다운로드",
    })).toHaveAttribute("href", "blob:second-audio");
});
it("새 생성 전 이전 플레이어 종료가 실패하면 새 요청을 막고 복구한다", async () => {
    vi.spyOn(console, "error").mockImplementation(() => { });
    const abortRequest = vi.spyOn(AbortController.prototype, "abort");
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "이전 플레이어가 남은 음성");
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    act(() => {
        streamController.enqueue(Uint8Array.from([0, 0]));
        closeStream();
    });
    await screen.findByRole("link", {
        name: "생성된 음성 파일 다운로드",
    });
    vi.mocked(fetch).mockClear();
    player.activate.mockClear();
    player.close.mockClear();
    player.create.mockClear();
    abortRequest.mockClear();
    player.close
        .mockRejectedValueOnce(new Error("AudioContext close failed"))
        .mockResolvedValueOnce();
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("이전 오디오 재생을 종료하지 못했습니다. 새 음성을 생성하지 않았습니다. 잠시 후 다시 시도해 주세요.");
    expect(player.create).toHaveBeenCalledOnce();
    expect(player.activate).toHaveBeenCalledOnce();
    expect(player.close).toHaveBeenCalledTimes(2);
    expect(player.activate.mock.invocationCallOrder[0]).toBeLessThan(player.close.mock.invocationCallOrder[0]);
    expect(fetch).not.toHaveBeenCalled();
    expect(abortRequest).toHaveBeenCalledTimes(2);
    expect(screen.getByRole("button", { name: "음성 생성하기 버튼" })).toBeEnabled();
    expect(screen.queryByRole("link", { name: "생성된 음성 파일 다운로드" })).not.toBeInTheDocument();
});
it("언마운트 시 요청과 플레이어 및 Blob URL을 정리한다", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<StrictMode>
      <Home />
    </StrictMode>);
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "정리할 음성");
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    const requestSignal = vi.mocked(fetch).mock.calls[0]?.[1]?.signal;
    act(() => {
        streamController.enqueue(Uint8Array.from([0, 0]));
        closeStream();
    });
    await screen.findByRole("link", {
        name: "생성된 음성 파일 다운로드",
    });
    unmount();
    expect(requestSignal).toBeInstanceOf(AbortSignal);
    expect(requestSignal?.aborted).toBe(true);
    expect(player.close).toHaveBeenCalledOnce();
    expect(document.querySelector("audio")).toBeNull();
    expect(revokeObjectUrl).toHaveBeenCalledWith("blob:test-audio");
});
it("언마운트 후 늦게 끝난 요청은 오디오 결과를 만들지 않는다", async () => {
    let resolveFetch!: (response: Response) => void;
    const delayedResponse = new Promise<Response>((resolve) => {
        resolveFetch = resolve;
    });
    vi.stubGlobal("fetch", vi.fn(() => delayedResponse));
    const user = userEvent.setup();
    const { unmount } = render(<Home />);
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "늦게 끝날 음성");
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    await waitFor(() => expect(fetch).toHaveBeenCalledOnce());
    const requestSignal = vi.mocked(fetch).mock.calls[0]?.[1]?.signal;
    unmount();
    const delayedStream = new ReadableStream<Uint8Array>({
        start(controller) {
            controller.enqueue(Uint8Array.from([0, 0]));
            controller.close();
        },
    });
    await act(async () => {
        resolveFetch(new Response(delayedStream));
        await delayedResponse;
    });
    expect(requestSignal?.aborted).toBe(true);
    expect(player.create).toHaveBeenCalledOnce();
    expect(player.close).toHaveBeenCalledOnce();
    expect(player.enqueue).not.toHaveBeenCalled();
    expect(createObjectUrl).not.toHaveBeenCalled();
});
it("영문 네트워크 오류를 친절한 한국어 안내로 정규화한다", async () => {
    vi.spyOn(console, "error").mockImplementation(() => { });
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "네트워크 오류를 확인할 음성");
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    act(() => errorStream(new TypeError("Failed to fetch")));
    expect(await screen.findByRole("alert")).toHaveTextContent("음성 생성 중 연결이 끊어졌습니다. 네트워크 상태를 확인한 뒤 다시 시도해 주세요.");
    expect(screen.getByRole("alert")).not.toHaveTextContent("Failed to fetch");
});
it("생성 당시 음성과 시각을 다운로드 파일명에 고정한다", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "파일명을 확인할 음성");
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    act(() => {
        streamController.enqueue(Uint8Array.from([0, 0]));
        closeStream();
    });
    const download = await screen.findByRole("link", {
        name: "생성된 음성 파일 다운로드",
    });
    const originalName = download.getAttribute("download");
    expect(originalName).toMatch(/^gemini_tts_Puck_\d{6}_\d{6}\.wav$/);
    await user.selectOptions(screen.getByLabelText("음성 선택"), "Aoede");
    expect(download).toHaveAttribute("download", originalName);
});
it("스트림 reader를 정상 완료 후 해제하고 오류 시 취소한다", async () => {
    const cancelReader = vi.spyOn(ReadableStreamDefaultReader.prototype, "cancel");
    const releaseReader = vi.spyOn(ReadableStreamDefaultReader.prototype, "releaseLock");
    vi.spyOn(console, "error").mockImplementation(() => { });
    const user = userEvent.setup();
    render(<Home />);
    await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "reader 정리 성공");
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    act(() => {
        streamController.enqueue(Uint8Array.from([0, 0]));
        closeStream();
    });
    await screen.findByRole("link", {
        name: "생성된 음성 파일 다운로드",
    });
    expect(releaseReader).toHaveBeenCalledOnce();
    expect(cancelReader).not.toHaveBeenCalled();
    let failingController!: ReadableStreamDefaultController<Uint8Array>;
    const failingStream = new ReadableStream<Uint8Array>({
        start(controller) {
            failingController = controller;
        },
    });
    vi.mocked(fetch).mockResolvedValueOnce(new Response(failingStream));
    await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));
    act(() => failingController.error(new Error("stream failed")));
    await screen.findByRole("alert");
    expect(cancelReader).toHaveBeenCalledOnce();
    expect(releaseReader).toHaveBeenCalledTimes(2);
});

it("목소리 라디오버튼은 좌우 방향키로 순환하고 선택값과 숨은 메뉴 상태를 보존한다", async () => {
    const user = userEvent.setup();
    const {container} = render(<Home />);
    await user.selectOptions(screen.getByLabelText("음성 선택"), "Kore");
    const basic = screen.getByRole("radio", {name: "기본 목소리"});
    expect(screen.getByRole("group", {name: "목소리 선택 방법"})).toBeVisible();
    expect(basic).toBeChecked();
    basic.focus();
    expect(fireEvent.keyDown(document.activeElement!, {key: "ArrowRight"})).toBe(false);
    expect(screen.getByRole("radio", {name: "확장·저장 목소리"})).toHaveFocus();
    expect(screen.getByRole("radio", {name: "확장·저장 목소리"})).toBeChecked();
    expect(basic).not.toBeChecked();
    expect(screen.queryByLabelText("음성 선택")).toBeNull();
    expect(screen.queryByLabelText("화자 A 공식 기본 목소리")).toBeNull();
    // 마지막 항목에서 오른쪽으로 이동하면 첫 항목으로 순환한다.
    expect(fireEvent.keyDown(document.activeElement!, {key: "ArrowRight"})).toBe(false);
    expect(basic).toHaveFocus();
    expect(basic).toBeChecked();
    expect(screen.getByLabelText("음성 선택")).toHaveValue("Kore");
    // 첫 항목에서 왼쪽으로 이동하면 마지막 항목으로 순환한다.
    expect(fireEvent.keyDown(document.activeElement!, {key: "ArrowLeft"})).toBe(false);
    const library = screen.getByRole("radio", {name: "확장·저장 목소리"});
    expect(library).toHaveFocus();
    expect(library).toBeChecked();
    expect(basic).not.toBeChecked();
    expect(screen.queryByLabelText("음성 선택")).toBeNull();
    expect(fireEvent.keyDown(document.activeElement!, {key: "ArrowLeft"})).toBe(false);
    expect(basic).toHaveFocus();
    expect(basic).toBeChecked();
    expect(library).not.toBeChecked();
    expect(screen.getByLabelText("음성 선택")).toHaveValue("Kore");
    expect(fireEvent.keyDown(basic, {key: "ArrowRight", ctrlKey: true, altKey: true})).toBe(true);
    expect(basic).toHaveFocus();
    expect(basic).toBeChecked();
    await user.tab();
    expect(screen.getByLabelText("음성 선택")).toHaveFocus();
    await user.click(screen.getByRole("tab", {name: "목소리 제작·관리"}));
    expectOnlyActiveSelects(container);
});
