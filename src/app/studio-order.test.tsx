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

it("일괄 생성 없이 두 작업 탭만 노출하며 두 탭에서 방향키가 순환한다", async () => {
    const user = userEvent.setup();
    const { container } = render(<Home />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs.map(tab => tab.textContent)).toEqual(["음성 만들기", "목소리 제작·관리"]);
    expect(container.querySelectorAll('[role="tabpanel"]')).toHaveLength(2);
    expect(container.textContent).not.toMatch(/일괄 작업|일괄 제출|현재 대본 담기/);
    tabs[0].focus();
    await user.keyboard("{ArrowLeft}");
    expect(tabs[1]).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(tabs[0]).toHaveFocus();
});

it("설명 제작은 설정, 정보, 설명, 생성과 결과, 관리 순으로 탐색한다", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("tab", { name: "목소리 제작·관리" }));
    expect(screen.getAllByRole("heading", { level: 2 }).map(node => node.textContent)).toEqual([
        "1. 제작 방식과 모델", "2. 목소리 정보", "3. 목소리 설명", "4. 목소리 생성과 결과", "5. 저장 목소리 관리",
    ]);
    const controls = [
        screen.getByLabelText("제작 방식"), screen.getByLabelText("제작 모델"),
        screen.getByLabelText("목소리 이름"), screen.getByLabelText("목소리 언어"), screen.getByLabelText("목소리 성별 표현"),
        screen.getByLabelText(/설계 설명/), screen.getByRole("button", { name: "목소리 생성 (유료 요청)" }),
        screen.getByLabelText("목소리 ID"), screen.getByRole("button", { name: "목소리 상세 조회" }),
    ];
    expectOrder(controls);
    controls[0].focus();
    for (const control of controls.slice(1)) { await user.tab(); expect(control).toHaveFocus(); }
    expect(screen.queryByLabelText("참조 녹음")).toBeNull();
});

it("복제 제작은 참조, 동의문, 동의 녹음, 확인, 저장, 생성 순서이며 설명 초안을 보존한다", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("tab", { name: "목소리 제작·관리" }));
    await user.type(screen.getByLabelText(/설계 설명/), "낮고 차분한 목소리");
    await user.selectOptions(screen.getByLabelText("제작 방식"), "replicated");
    expect(screen.getByRole("heading", { name: "3. 녹음과 동의" })).toBeVisible();
    expect(screen.queryByLabelText(/설계 설명/)).toBeNull();
    expectOrder([
        screen.getByLabelText("참조 녹음"), screen.getByText(/^I am the owner/),
        screen.getByLabelText("공식 동의문 녹음"), screen.getByLabelText("성인 본인의 원본 목소리이며 복제에 동의합니다."),
        screen.getByLabelText("두 파일은 같은 화자의 녹음입니다."), screen.getByLabelText("동의 녹음에 위 공식 영어 문구를 그대로 읽었습니다."),
        screen.getByLabelText(/프로젝트에 저장/), screen.getByRole("button", { name: "목소리 생성 (유료 요청)" }),
    ]);
    expect(screen.getByRole("button", { name: "목소리 생성 (유료 요청)" })).toBeDisabled();
    await user.selectOptions(screen.getByLabelText("제작 방식"), "prompted");
    expect(screen.getByLabelText(/설계 설명/)).toHaveValue("낮고 차분한 목소리");
});

it("조회한 목소리는 결과 구역에서 선택하고 관리 구역에서 대상 확인 후 삭제한다", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(new Response(JSON.stringify({ id: "voice_saved", name: "저장된 안내", type: "prompted", languages: [] })))
        .mockResolvedValueOnce(new Response(JSON.stringify({})));
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("tab", { name: "목소리 제작·관리" }));
    const management = screen.getByRole("region", { name: "5. 저장 목소리 관리" });
    await user.type(within(management).getByLabelText("목소리 ID"), "voice_saved");
    await user.click(within(management).getByRole("button", { name: "목소리 상세 조회" }));
    const result = screen.getByRole("region", { name: "4. 목소리 생성과 결과" });
    const select = await within(result).findByRole("button", { name: "이 목소리를 화자 A에 선택" });
    await user.click(select);
    await user.click(screen.getByRole("tab", { name: "음성 만들기" }));
    expect(screen.getByLabelText("음성 선택")).toHaveValue("voice_saved");
    await user.click(screen.getByRole("tab", { name: "목소리 제작·관리" }));
    const remove = within(management).getByRole("button", { name: "확인한 목소리 삭제" });
    expect(remove).toBeDisabled();
    await user.click(within(management).getByLabelText("voice_saved 삭제 확인"));
    await user.click(remove);
    expect(fetchMock).toHaveBeenLastCalledWith("/api/voices/voice_saved", expect.objectContaining({ method: "DELETE" }));
    expect(within(result).queryByRole("button", { name: "이 목소리를 화자 A에 선택" })).toBeNull();
});

it("리믹스 기준 선택은 탭을 떠나면 숨고 돌아오면 초안을 유지한다", async () => {
    const user = userEvent.setup();
    const { container } = render(<Home />);
    await user.click(screen.getByRole("tab", { name: "목소리 제작·관리" }));
    await user.selectOptions(screen.getByLabelText("제작 방식"), "remix");
    await user.selectOptions(screen.getByLabelText("기준 목소리"), "Kore");
    await user.type(screen.getByRole("textbox", { name: /변경 설명/ }), "더 차분하게");
    expectOrder([
        screen.getByLabelText("제작 방식"), screen.getByLabelText("제작 모델"),
        screen.getByLabelText("목소리 이름"), screen.getByLabelText("기준 목소리"),
        screen.getByRole("textbox", { name: /변경 설명/ }),
        screen.getByRole("button", { name: "목소리 생성 (유료 요청)" })
    ]);
    await user.click(screen.getByRole("tab", { name: "음성 만들기" }));
    expect(container.querySelector('[hidden] select')).toBeNull();
    await user.click(screen.getByRole("tab", { name: "목소리 제작·관리" }));
    expect(screen.getByLabelText("기준 목소리")).toHaveValue("Kore");
    expect(screen.getByRole("textbox", { name: /변경 설명/ })).toHaveValue("더 차분하게");
});
