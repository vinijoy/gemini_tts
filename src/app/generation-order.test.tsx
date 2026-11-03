import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import Home from "./page";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

function expectOrder(elements: HTMLElement[]) {
  elements.slice(1).forEach((element, index) => {
    expect(elements[index].compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
}

it("단일 화자 화면은 설정, 목소리, 대본과 연출, 출력, 생성 순으로 탐색한다", async () => {
  const user = userEvent.setup();
  render(<Home />);
  expect(screen.getAllByRole("heading", {level: 2}).map(node => node.textContent)).toEqual([
    "모델과 화자", "목소리 선택", "대본과 연출", "출력 설정", "음성 생성과 결과",
  ]);
  const controls = [
    screen.getByLabelText("모델"), screen.getByLabelText("화자 모드"),
    screen.getByRole("radio", {name: "기본 목소리"}), screen.getByLabelText("음성 선택"),
    screen.getByLabelText("음성으로 변환할 대본 입력창"), screen.getByLabelText("연출 지시 입력창"),
    screen.getByRole("button", {name: "웃음 태그 추가"}), screen.getByLabelText("출력 형식"),
    screen.getByLabelText("샘플레이트"), screen.getByLabelText("요청 처리 등급"),
    screen.getByRole("button", {name: "음성 생성하기 버튼"}),
  ];
  expectOrder(controls);
  controls[4].focus();
  await user.tab();
  expect(controls[5]).toHaveFocus();
  await user.tab();
  expect(controls[6]).toHaveFocus();
  expect(screen.queryByText(/실제 처리 등급:/)).not.toBeInTheDocument();
});

it("대화 목소리는 함께 선택하고 추가 발화는 첫 대본 다음에 편집하며 입력을 보존한다", async () => {
  vi.stubGlobal("fetch", vi.fn().mockImplementation(() => Promise.resolve(new Response(JSON.stringify({voices: [], nextPageToken: ""})))));
  const user = userEvent.setup();
  render(<Home />);
  await user.type(screen.getByLabelText("음성으로 변환할 대본 입력창"), "첫 대본");
  await user.type(screen.getByLabelText("연출 지시 입력창"), "차분하게");
  await user.selectOptions(screen.getByLabelText("화자 모드"), "prebuilt-dialogue");
  const voices = screen.getByRole("region", {name: "목소리 선택"});
  expect(within(voices).getByLabelText("화자 B 기본 목소리")).toBeVisible();
  await user.click(screen.getByRole("button", {name: "대사 추가"}));
  await user.type(screen.getByLabelText("발화 2 대본"), "두 번째 대본");
  expectOrder([
    screen.getByLabelText("화자 B 기본 목소리"), screen.getByLabelText("음성으로 변환할 대본 입력창"),
    screen.getByLabelText("연출 지시 입력창"), screen.getByLabelText("발화 2 대본"), screen.getByLabelText("출력 형식"),
  ]);
  await user.click(screen.getByRole("radio", {name: "확장·저장 목소리"}));
  expect(screen.queryByLabelText("화자 B 기본 목소리")).not.toBeInTheDocument();
  await user.click(screen.getByRole("tab", {name: "목소리 제작·관리"}));
  await user.click(screen.getByRole("tab", {name: "음성 만들기"}));
  expect(screen.getByLabelText("음성으로 변환할 대본 입력창")).toHaveValue("첫 대본");
  expect(screen.getByLabelText("연출 지시 입력창")).toHaveValue("차분하게");
  expect(screen.getByLabelText("발화 2 대본")).toHaveValue("두 번째 대본");
  expect(vi.mocked(fetch).mock.calls.every(([url]) => String(url).startsWith("/api/voices?"))).toBe(true);
});


it.each(["prebuilt-dialogue", "custom-dialogue"])("%s 안내는 한 칸의 두 화자와 칸별 연출을 설명한다", async (mode) => {
  const user = userEvent.setup();
  render(<Home />);
  expect(screen.queryByRole("button", {name: "대사 추가"})).not.toBeInTheDocument();
  await user.selectOptions(screen.getByLabelText("화자 모드"), mode);
  expect(screen.getByText(/^두 화자의 대화입니다[.]/)).toHaveTextContent("각 칸의 연출은 그 안의 모든 발화에 적용됩니다.");
  expect(screen.queryByText(/첫 발화는 위 대본과 연출|위의 대본과 말투는 첫 번째 화자/)).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", {name: "대사 추가"}));
  expect(screen.getByLabelText("발화 2 화자")).toHaveValue("B");
  expect(screen.getByLabelText("발화 2 대본")).toBeVisible();
});
it("이름 등록 입력 없이 모델·모드·탭을 왕복하며 대본을 유지한다",async()=>{
 const user=userEvent.setup();render(<Home/>);
 expect(screen.queryByLabelText("첫 번째 화자 대본 이름")).not.toBeInTheDocument();
 await user.selectOptions(screen.getByLabelText("화자 모드"),"prebuilt-dialogue");
 expect(screen.queryByLabelText("첫 번째 화자 대본 이름")).not.toBeInTheDocument();
 const script=screen.getByLabelText("음성으로 변환할 대본 입력창");await user.type(script,"별하: 하나\n도윤: 둘");
 expectOrder([screen.getByLabelText("화자 모드"),screen.getByLabelText("음성 선택"),script]);
 await user.selectOptions(screen.getByLabelText("모델"),"gemini-3.8-flash-lite-tts");
 await user.selectOptions(screen.getByLabelText("음성 선택"),"Aoede");
 await user.selectOptions(screen.getByLabelText("화자 모드"),"single");await user.selectOptions(screen.getByLabelText("화자 모드"),"custom-dialogue");
 await user.click(screen.getByRole("tab",{name:"목소리 제작·관리"}));await user.click(screen.getByRole("tab",{name:"음성 만들기"}));
 expect(screen.queryByLabelText("첫 번째 화자 대본 이름")).not.toBeInTheDocument();expect(screen.queryByLabelText("두 번째 화자 대본 이름")).not.toBeInTheDocument();
 expect(screen.getByLabelText("음성으로 변환할 대본 입력창")).toHaveValue("별하: 하나\n도윤: 둘");
});
