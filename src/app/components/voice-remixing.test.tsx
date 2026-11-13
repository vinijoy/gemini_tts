import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import VoiceStudio from "./VoiceStudio";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it("리믹스 초안과 기존 모델을 보존하고 새 목소리를 선택한다", async () => {
    const user = userEvent.setup();
    const select = vi.fn();
    const fetch = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: "voice_remix", type: "prompted", name: "리믹스" })));
    vi.stubGlobal("fetch", fetch);
    render(<VoiceStudio onSelect={select} />);
    await user.selectOptions(screen.getByLabelText("제작 모델"), "gemini-3.8-flash-lite-tts");
    await user.selectOptions(screen.getByLabelText("제작 방식"), "remix");
    expect(screen.getByLabelText("제작 모델")).toHaveAttribute("readonly");
    await user.selectOptions(screen.getByLabelText("기준 목소리"), "custom");
    await user.type(screen.getByLabelText("기준 목소리 ID"), "voice_source");
    await user.type(screen.getByRole("textbox", { name: /변경 설명/ }), "조금 더 차분하게");
    await user.selectOptions(screen.getByLabelText("제작 방식"), "prompted");
    expect(screen.getByLabelText("제작 모델")).toHaveValue("gemini-3.8-flash-lite-tts");
    await user.selectOptions(screen.getByLabelText("제작 방식"), "remix");
    expect(screen.getByLabelText("기준 목소리 ID")).toHaveValue("voice_source");
    expect(screen.getByRole("textbox", { name: /변경 설명/ })).toHaveValue("조금 더 차분하게");
    await user.click(screen.getByRole("button", { name: "목소리 생성 (유료 요청)" }));
    await waitFor(() => expect(select).toHaveBeenCalledWith({ kind: "stored-custom", value: "voice_remix" }));
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toMatchObject({ store: true, voice: { model: "gemini-3.8-flash-tts", type: "prompted", prompted: { base_voice: "voice_source", input: "조금 더 차분하게" } } });
    expect(screen.getByRole("button", { name: "목소리 생성 (유료 요청)" })).toHaveFocus();
});

it("기본 목소리 리믹스는 빈 설명을 차단하고 선택한 기준으로 생성한다", async () => {
    const user = userEvent.setup();
    const fetch = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: "voice_new", type: "prompted", name: "새 목소리" })));
    vi.stubGlobal("fetch", fetch);
    render(<VoiceStudio onSelect={() => {}} />);
    await user.selectOptions(screen.getByLabelText("제작 방식"), "remix");
    await user.click(screen.getByRole("button", { name: "목소리 생성 (유료 요청)" }));
    expect(fetch).not.toHaveBeenCalled();
    expect(screen.getByText("변경 설명 값이 없거나 앱 제한을 벗어난 상태입니다.")).toBeVisible();
    await user.selectOptions(screen.getByLabelText("기준 목소리"), "Kore");
    await user.type(screen.getByRole("textbox", { name: /변경 설명/ }), "낮게");
    await user.click(screen.getByRole("button", { name: "목소리 생성 (유료 요청)" }));
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(JSON.parse(fetch.mock.calls[0][1].body).voice.prompted).toEqual({ base_voice: "Kore", input: "낮게" });
});
