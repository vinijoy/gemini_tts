import { describe, expect, it } from "vitest";
import { splitTranscript } from "./transcript";

describe("splitTranscript", () => {
  it("최대 길이 안의 원고는 그대로 한 조각으로 유지한다", () => {
    expect(splitTranscript("첫 문장입니다. 둘째 문장입니다.", 40)).toEqual([
      "첫 문장입니다. 둘째 문장입니다.",
    ]);
  });

  it("긴 원고를 문장 경계에서 최대 길이 이하로 나눈다", () => {
    expect(
      splitTranscript(
        "첫 문장입니다. 둘째 문장입니다. 셋째 문장입니다.",
        17,
      ),
    ).toEqual(["첫 문장입니다.", "둘째 문장입니다.", "셋째 문장입니다."]);
  });

  it("긴 단일 문장을 공백 경계에서 나누고 모든 단어를 보존한다", () => {
    const chunks = splitTranscript("하나 둘 셋 넷 다섯 여섯 일곱", 8);

    expect(chunks.every((chunk) => chunk.length <= 8)).toBe(true);
    expect(chunks.join(" ")).toBe("하나 둘 셋 넷 다섯 여섯 일곱");
  });

  it("공백 없는 긴 텍스트도 최대 길이로 안전하게 나눈다", () => {
    expect(splitTranscript("가나다라마바사아자차", 4)).toEqual([
      "가나다라",
      "마바사아",
      "자차",
    ]);
  });

  it("유효하지 않은 최대 길이는 거부한다", () => {
    expect(() => splitTranscript("원고", 0)).toThrow(
      "원고 조각의 최대 길이는 1 이상이어야 합니다.",
    );
  });
});
