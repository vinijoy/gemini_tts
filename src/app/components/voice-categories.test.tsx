import {StrictMode} from "react";
import {afterEach, expect, it, vi} from "vitest";
import {cleanup, render, screen, within, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VoiceLibrary from "./VoiceLibrary";
afterEach(() => {cleanup(); vi.unstubAllGlobals();});
const voices = [
 {id:"seoul",name:"서울 안내",type:"prebuilt",languages:["ko-KR"],regions:["KR"],contexts:["Enterprise Agent"],persona:["Advisor"],gender:"female",pitch:"low",accent:["Seoul Korean"],description:"안내"},
 {id:"busan",name:"부산 이야기",type:"prebuilt",languages:["ko-KR"],regions:["KR"],contexts:["Content & Media"],persona:["Narrator"],gender:"male",pitch:"medium",accent:["Busan Korean"],description:"이야기"},
 {id:"english",name:"영어 안내",type:"prebuilt",languages:["en-US"],regions:["US"],contexts:["Enterprise Agent"],persona:["Advisor"],gender:"male",pitch:"low",accent:["American"],description:"안내"},
];
it("앞 카테고리에 맞는 후보만 보여주고 상위 변경 시 하위 조건을 비운다", async () => {
 vi.stubGlobal("fetch",vi.fn().mockImplementation(()=>Promise.resolve(new Response(JSON.stringify({voices,nextPageToken:""})))));
 const select=vi.fn(), user=userEvent.setup();
 render(<VoiceLibrary label="화자 A" searchOnly onSelect={select}/>);
 await waitFor(()=>expect(screen.getByRole("button",{name:"목록 새로고침"})).toBeEnabled());
 const language=await screen.findByRole("combobox",{name:"화자 A 언어"});
 await user.selectOptions(language,"ko-KR");
 expect(within(screen.getByRole("combobox",{name:"화자 A 지역"})).queryByRole("option",{name:/미국/})).toBeNull();
 await user.selectOptions(screen.getByRole("combobox",{name:"화자 A 용도"}),"Enterprise Agent");
 const result=screen.getByRole("combobox",{name:"화자 A 목소리"});
 expect(within(result).queryByRole("option",{name:/부산 이야기/})).toBeNull();
 await user.selectOptions(result,"seoul");
 expect(select).toHaveBeenCalledWith(expect.objectContaining({id:"seoul"}));
 await user.selectOptions(language,"en-US");
 expect(screen.getByRole("combobox",{name:"화자 A 용도"})).toHaveValue("");
 expect(result).toHaveValue("");
 expect(within(result).getByRole("option",{name:/영어 안내/})).toBeInTheDocument();
 expect(screen.queryByRole("textbox")).toBeNull();
});
it("다음 페이지의 목소리도 카테고리에 포함하고 메타데이터 누락은 미분류로 고른다",async()=>{
 vi.stubGlobal("fetch",vi.fn().mockResolvedValueOnce(new Response(JSON.stringify({voices:[voices[0]],nextPageToken:"next"}))).mockResolvedValueOnce(new Response(JSON.stringify({voices:[{id:"unknown",name:"미분류 음성",type:"prompted"}],nextPageToken:""}))));
 const user=userEvent.setup();render(<VoiceLibrary label="화자 A" searchOnly onSelect={()=>{}}/>);
 await waitFor(()=>expect(screen.getByRole("button",{name:"목록 새로고침"})).toBeEnabled());
 const language=await screen.findByRole("combobox",{name:"화자 A 언어"});
 await user.selectOptions(language,"__unknown__");
 expect(within(screen.getByRole("combobox",{name:"화자 A 목소리"})).getByRole("option",{name:/미분류 음성/})).toBeInTheDocument();
});
it("목록 출처를 바꾸면 이전 후보를 제거하고 재조회 전에는 선택할 수 없다",async()=>{
 vi.stubGlobal("fetch",vi.fn().mockResolvedValueOnce(new Response(JSON.stringify({voices,nextPageToken:""}))).mockImplementation(()=>new Promise(()=>{})));
 const user=userEvent.setup();render(<VoiceLibrary label="화자 A" searchOnly onSelect={()=>{}}/>);
 await waitFor(()=>expect(screen.getByRole("button",{name:"목록 새로고침"})).toBeEnabled());
 expect(await screen.findByRole("combobox",{name:"화자 A 목소리"})).toBeEnabled();
 await user.selectOptions(screen.getByRole("combobox",{name:"목록 출처"}),"remote");
 expect(screen.getByRole("combobox",{name:"화자 A 목소리"})).toBeDisabled();
});
it("페이지가 반복되면 불완전한 목록으로 분류하지 않고 재조회를 허용한다",async()=>{
 vi.stubGlobal("fetch",vi.fn().mockImplementation(()=>Promise.resolve(new Response(JSON.stringify({voices,nextPageToken:"same"})))));
 render(<VoiceLibrary label="화자 A" searchOnly onSelect={()=>{}}/>);
 await waitFor(()=>expect(screen.getByRole("button",{name:"목록 새로고침"})).toBeEnabled());
 expect(await screen.findByText("목소리 목록 전체를 확인하지 못했습니다. 다시 조회하세요.")).toBeVisible();
 expect(screen.getByRole("combobox",{name:"화자 A 목소리"})).toBeDisabled();
 expect(screen.getByRole("button",{name:"목록 새로고침"})).toBeEnabled();
});
it("확장 화면에 독립된 네이티브 select를 바로 노출하고 자동으로 목록을 불러온다",async()=>{
 vi.stubGlobal("fetch",vi.fn().mockImplementation(()=>Promise.resolve(new Response(JSON.stringify({voices,nextPageToken:""})))));
 const {container}=render(<StrictMode><VoiceLibrary label="화자 A" searchOnly onSelect={()=>{}}/></StrictMode>);
 expect(container.querySelector("details")).toBeNull();
 for(const name of ["언어","지역","용도","역할","성별 표현","높낮이","억양","목소리"]){
  const field=screen.getByRole("combobox",{name:`화자 A ${name}`});
  expect(field.tagName).toBe("SELECT");
  expect(container.querySelector(`label[for="${field.id}"]`)).not.toBeNull();
 }
 expect(await screen.findByRole("option",{name:"서울 안내"})).toBeInTheDocument();
});


it("라이브러리는 반복 낭독할 그룹 없이 입력 이름과 비활성 상태를 유지한다", async () => {
 vi.stubGlobal("fetch",vi.fn().mockResolvedValue(new Response(JSON.stringify({voices,nextPageToken:""}))));
 const {rerender}=render(<VoiceLibrary label="화자 A" onSelect={()=>{}}/>);
 expect(screen.queryByRole("group",{name:"화자 A 목소리 라이브러리"})).toBeNull();
 expect(screen.getByRole("heading",{name:"화자 A 목소리 라이브러리"})).toBeVisible();
 for(const control of [...screen.getAllByRole("combobox"),screen.getByRole("button",{name:"목록 새로고침"})]){
  expect(control).toBeDisabled();
 }
 await waitFor(()=>expect(screen.getByRole("combobox",{name:"화자 A 지역"})).toBeEnabled());
 rerender(<VoiceLibrary label="화자 A" disabled onSelect={()=>{}}/>);
 for(const control of [...screen.getAllByRole("combobox"),screen.getByRole("button",{name:"목록 새로고침"})]){
  expect(control).toBeDisabled();
 }
});
