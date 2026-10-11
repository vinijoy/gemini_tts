# 테스트 패턴

**분석일:** 2026-10-11  
**마지막 매핑 커밋:** `c49f74b5251782cd41f2a5daa29b611785b7de89`

## 테스트 프레임워크

**실행기:** Vitest `^4.1.10`, 설정 `vitest.config.ts`. 현재 통과 수는 실행 시점의 검증 기록을 사용하며 이 부분 갱신에서는 테스트를 재실행하지 않았다. `package.json`의 실행 명령은 `vitest run`으로 `passWithNoTests`가 없다.

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
- API 테스트는 상태·헤더·본문·REST 요청 URL·본문 인자·정리 동작을 함께 확인한다.

## Mocking

**프레임워크:** Vitest `vi`.

```typescript
const upstream = vi.fn().mockResolvedValue(new Response(event("STOP")));
vi.stubGlobal("fetch", upstream);
```

외부 REST는 `vi.stubGlobal("fetch", ...)`로 대체하고 (`src/app/api/tts/route.test.ts`, `src/lib/gemini-voices.test.ts`, `src/lib/gemini-batches.test.ts`), UI에서는 `StreamingPcmPlayer`, `fetch`, URL·미디어 API를 mock한다 (`src/app/page.test.tsx`). 테스트 종료에는 `vi.resetAllMocks`, `vi.restoreAllMocks`, `vi.useRealTimers`를 사용한다. 핵심 PCM·스트림·WAV·예약 로직은 실제 구현을 실행한다.

## Fixtures와 Factory

작은 Gemini 응답은 테스트 내부 async generator로 만든다 (`src/app/api/tts/stream.test.ts`). 복잡한 브라우저 객체는 `createFakeAudioContext` factory로 구성한다 (`src/utils/streaming-player.test.ts`). 공유 fixture 디렉터리는 발견되지 않았다.

```typescript
async function* responses() {
  yield { candidates: [{ content: { parts: [{ inlineData: { data: "AAE=" } }] } }] };
}
```

## 기능별 계약 테스트

- `src/lib/gemini-tts.test.ts`, `src/app/api/tts/route.test.ts`: Gemini 3.8 모델·연출 직렬화, 잘못된 계약 사전 거부, 정상 STOP, MIME/PCM 경계, 첫 청크 전달, bounded 429 재시도, 취소, 순차 custom 대화.
- `src/lib/gemini-voices.test.ts`: 반복 OR 필터, 페이지 제한, prompted/replicated payload, 동의 확인, 녹음 시간·WAV 구조, private 필드 제거.
- `src/lib/gemini-batches.test.ts`: 상태 정규화, inline/Files JSONL 제출, 업로드 URL 제한, 결과 키·순서·누락·부분 실패, 취소 후 조회, 우선순위 변경.
- `src/lib/voice-catalog.test.ts`: 제공 Markdown 파싱 및 공개 prebuilt만 보존, 정렬·escaping, 빈 중간 페이지·중복 제거, 반복 토큰 거부, 실패 시 미완료와 fallback.
- 추가 테스트는 같은 위치에 두고 실제 upstream 대신 fetch 응답 fixture를 제공한다. 앱 테스트가 유료 API를 호출하거나 실제 스크린리더 수용을 입증한다고 해석하지 않는다.

## 커버리지

명시적 커버리지 임계값은 없다. 입력 1,000자 제한, Base64/PCM 경계, REST 오류·할당량·재시도, 스트림 취소, 자동재생 실패를 포함한다.

```bash
npx vitest run --coverage
```

## 테스트 유형

**단위 테스트:** `src/utils/pcm-audio.test.ts`, `src/utils/streaming-player.test.ts`, `src/app/api/tts/stream.test.ts`가 변환·스트림·오디오 예약을 검증한다.

**통합 테스트:** `src/app/api/tts/route.test.ts`가 실제 `POST`를 호출하고 Gemini REST fetch를 mock한다.

**E2E 테스트:** Playwright/Cypress 기반 테스트는 발견되지 않았다.

## 공통 패턴

```typescript
await expect(response.json()).resolves.toEqual({ status: "ok" });
await expect(reader.read()).rejects.toThrow("오디오 데이터가 없습니다.");
```

HTTP 오류는 상태와 한국어 JSON 본문을 함께 검증하고, 스트림 오류는 첫 오디오 전/후·비정상 종료·consumer cancel을 분리한다 (`src/app/api/tts/route.test.ts`, `src/app/api/tts/stream.test.ts`). `src/app/vitest-environment.test.tsx`는 앱 테스트의 `document` 사용 가능 여부를 확인한다.

---

*테스트 분석: 2026-10-11*
