import { expect, test } from "vitest";

test("src/app 테스트는 jsdom document를 사용할 수 있다", () => {
  const element = document.createElement("div");

  expect(element.tagName).toBe("DIV");
});
