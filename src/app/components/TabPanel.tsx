"use client";

import { createContext, useContext, type ComponentProps } from "react";

const TabActiveContext = createContext(true);

export function useTabActive() { return useContext(TabActiveContext); }

export function TabPanel({ active, children, role = "tabpanel", ...props }: ComponentProps<"div"> & { active: boolean }) {
  active = useContext(TabActiveContext) && active;
  // 초안·첨부 파일·진행 중 요청의 상태 소유자는 탭을 바꿔도 계속 마운트한다.
  return <TabActiveContext.Provider value={active}>
    <div {...props} role={role} hidden={!active} inert={!active}>{children}</div>
  </TabActiveContext.Provider>;
}

export function TabSelect(props: ComponentProps<"select">) {
  // hidden/inert 안에서도 네이티브 메뉴가 노출될 수 있어 선택 요소만 제거한다.
  // 선택값은 부모의 제어형 상태로 보존하며, 독립 사용 시에는 항상 렌더링한다.
  return useContext(TabActiveContext) ? <select {...props} /> : null;
}
