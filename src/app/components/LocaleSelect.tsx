"use client";
import { TabSelect } from "./TabPanel";
import { useId, useState } from "react";
import locales from "@/lib/voice-locale-options.json";

// 제공 카탈로그의 선택값이며, API 전체 지원 범위를 제한하는 목록은 아니다.
export default function LocaleSelect({ label, kind = "language", value, onChange, emptyLabel = "전체" }: {
  label: string; kind?: "language" | "region"; value: string;
  onChange: (value: string) => void; emptyLabel?: string;
}) {
  const id = useId();
  const [custom, setCustom] = useState(false);
  // 서버·브라우저의 언어 데이터 차이로 초기 렌더링이 달라지지 않도록 번역과 순서를 고정한다.
  const options = locales[kind];
  const isCustom = custom || (!!value && !options.some(option => option.code === value));
  return <div>
    <label htmlFor={id}>{label}</label>
    <TabSelect id={id} aria-describedby={`${id}-help`} value={isCustom ? "custom" : value} onChange={event => {
      const next = event.target.value;
      setCustom(next === "custom");
      onChange(next === "custom" ? "" : next);
    }}>
      <option value="">{emptyLabel}</option>
      {options.map(option => <option key={option.code} value={option.code}>{option.label}</option>)}
      <option value="custom">다른 값 직접 입력</option>
    </TabSelect>
    {isCustom && <label>{label} 직접 입력<input value={value} maxLength={100} onChange={event => onChange(event.target.value)} /></label>}
    <p id={`${id}-help`} className="text-sm text-gray-600">제공 목소리 목록의 {kind === "language" ? "언어" : "지역"}입니다. 목록에 없으면 직접 입력을 선택하세요.</p>
  </div>;
}
