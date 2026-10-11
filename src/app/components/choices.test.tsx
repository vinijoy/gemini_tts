import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VoiceStudio from "./VoiceStudio";
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it("목록에 없는 제작 언어는 직접 입력하고 다시 선택형으로 돌아간다", async () => {
  const user = userEvent.setup();
  render(<VoiceStudio onSelect={() => {}} />);
  const select = screen.getByRole("combobox", {name: "목소리 언어"});
  await user.selectOptions(select, "custom");
  await user.type(screen.getByRole("textbox", {name: "목소리 언어 직접 입력"}), "zh-CN");
  await user.selectOptions(select, "ko-KR");
  expect(screen.queryByRole("textbox", {name: "목소리 언어 직접 입력"})).toBeNull();
  expect(select).toHaveValue("ko-KR");
});
