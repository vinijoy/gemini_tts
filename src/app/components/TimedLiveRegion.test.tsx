import {act,cleanup,render,screen} from "@testing-library/react";
import {afterEach,expect,it,vi} from "vitest";
import TimedLiveRegion from "./TimedLiveRegion";
afterEach(()=>{cleanup();vi.useRealTimers();});
it("알림은 3초 후 비우고 새 알림은 새로 3초를 유지한다",()=>{
 vi.useFakeTimers();const {rerender}=render(<TimedLiveRegion message="첫 안내"/>);
 act(()=>vi.advanceTimersByTime(2999));expect(screen.getByRole("status")).toHaveTextContent("첫 안내");
 rerender(<TimedLiveRegion message="다음 안내"/>);
 act(()=>vi.advanceTimersByTime(1));expect(screen.getByRole("status")).toHaveTextContent("다음 안내");
 act(()=>vi.advanceTimersByTime(2999));expect(screen.getByRole("status")).toBeEmptyDOMElement();
});
