# 테스트 패턴

**분석일:** 2026-10-11  
**마지막 매핑 커밋:** `b373c48b74146f4a2308aff429693e284989e7b1`

## 테스트 프레임워크

**실행기:** Vitest `^4.1.10`, 설정 `vitest.config.ts`. `npm test -- --reporter=dot` 결과 테스트 파일 7개와 테스트 66개가 모두 통과했다.

**Assertion library:** Vitest `expect`와 `@testing-library/jest-dom/vitest`를 사용한다.

**실행 명령:**
```bash
npm test
npm run test:watch
npx vitest run src/utils
npm run lint
```

## 테스트 파일 구성

구현과 같은 위치에 둔다. 현재 파일은 `src/app/api/health/route.test.ts`, `src/app/api/tts/route.test.ts`, `src/app/api/tts/stream.test.ts`, `src/app/page.test.tsx`, `src/app/vitest-environment.test.tsx`, `src/utils/pcm-audio.test.ts`, `src/utils/streaming-player.test.ts`다. API·유틸리티는 `node`, React 테스트는 `jsdom`을 사용하도록 `vitest.config.ts`의 projects에서 분리한다.

## 테스트 구조

```typescript
describe("StreamingPcmPlayer", () => {
  it("두 PCM 청크를 앞선 청크 종료 시각에 이어 예약한다", async () => {
    const context = createFakeAudioContext({ currentTime: 10 });
    const player = new StreamingPcmPlayer(
      () => context as unknown as AudioContext,
      24000,
    );
    await player.enqueue(Int16Array.from([0, 32767]));
    expect(context.startTimes).toEqual([10]);
  });
});
```

- 테스트명은 한국어로 계약·경계를 문장화한다.
- 반복 조건은 `it.each`, 독립 동작은 최상위 `it`로 둔다 (`src/app/api/tts/route.test.ts`).
- 비동기는 `async`와 `await expect(...).resolves/rejects`를 사용한다.
- UI는 `render`, `screen`, `userEvent`, `waitFor`, `act`로 사용자 동작과 상태를 검증한다 (`src/app/page.test.tsx`).
- API 테스트는 상태·헤더·본문·SDK 호출 인자·정리 동작을 함께 확인한다.

## Mocking

**프레임워크:** Vitest `vi`.

```typescript
const gemini = vi.hoisted(() => ({ generateContentStream: vi.fn() }));
vi.mock("@google/genai", () => ({
  GoogleGenAI: class { readonly models = { generateContentStream: gemini.generateContentStream }; },
}));
```

외부 SDK는 `vi.hoisted`/`vi.mock`으로 대체하고 (`src/app/api/tts/route.test.ts`), UI에서는 `StreamingPcmPlayer`, `fetch`, URL·미디어 API를 mock한다 (`src/app/page.test.tsx`). 테스트 종료에는 `vi.resetAllMocks`, `vi.restoreAllMocks`, `vi.useRealTimers`를 사용한다. 핵심 PCM·스트림·WAV·예약 로직은 실제 구현을 실행한다.

## Fixtures와 Factory

작은 Gemini 응답은 테스트 내부 async generator로 만든다 (`src/app/api/tts/stream.test.ts`). 복잡한 브라우저 객체는 `createFakeAudioContext` factory로 구성한다 (`src/utils/streaming-player.test.ts`). 공유 fixture 디렉터리는 발견되지 않았다.

```typescript
async function* responses() {
  yield { candidates: [{ content: { parts: [{ inlineData: { data: "AAE=" } }] } }] };
}
```

## 커버리지

명시적 커버리지 임계값은 없다. 입력 1,000자 제한, Base64/PCM 경계, SDK 오류·할당량·재시도, 스트림 취소, 자동재생 실패를 포함한다.

```bash
npx vitest run --coverage
```

## 테스트 유형

**단위 테스트:** `src/utils/pcm-audio.test.ts`, `src/utils/streaming-player.test.ts`, `src/app/api/tts/stream.test.ts`가 변환·스트림·오디오 예약을 검증한다.

**통합 테스트:** `src/app/api/tts/route.test.ts`가 실제 `POST`를 호출하고 Gemini SDK만 mock한다.

**E2E 테스트:** Playwright/Cypress 기반 테스트는 발견되지 않았다.

## 공통 패턴

```typescript
await expect(response.json()).resolves.toEqual({ status: "ok" });
await expect(reader.read()).rejects.toThrow("오디오 데이터가 없습니다.");
```

HTTP 오류는 상태와 한국어 JSON 본문을 함께 검증하고, 스트림 오류는 첫 오디오 전/후·비정상 종료·consumer cancel을 분리한다 (`src/app/api/tts/route.test.ts`, `src/app/api/tts/stream.test.ts`). `src/app/vitest-environment.test.tsx`는 앱 테스트의 `document` 사용 가능 여부를 확인한다.

---

*테스트 분석: 2026-10-11*
