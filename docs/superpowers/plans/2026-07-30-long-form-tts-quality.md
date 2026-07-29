# Long-form TTS Continuity and Playback Quality Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 긴 원고를 문장 단위 Gemini 요청으로 끝까지 생성하고, 생성 중과 완료 후 재생에 동일한 Web Audio 경로를 사용한다.

**Architecture:** 서버는 원고를 최대 300자 조각으로 나눈 뒤 Gemini 스트림을 순차 실행하여 단일 PCM 응답으로 결합한다. 각 조각의 종료 사유를 검증해 불완전한 결과를 오류로 처리하고, 클라이언트는 누적 PCM을 WAV 다운로드와 Web Audio 다시 듣기에 함께 사용한다.

**Tech Stack:** Next.js 16.2.12 App Router, React 19.2.4, TypeScript 5, `@google/genai` 1.50.1, Web Audio API, Vitest 4.1.10

## Global Constraints

- 모든 구현과 커밋은 `sk_dev` 브랜치에서 수행한다.
- 원고 조각의 기본 최대 길이는 300자다.
- 출력은 24kHz, 16비트, 모노 PCM을 유지하며 필터·압축·리샘플링을 추가하지 않는다.
- 후보의 종료 사유는 비어 있거나 `STOP`일 때만 정상으로 처리한다.
- 생성 중 재생과 완료 후 다시 듣기는 모두 `StreamingPcmPlayer`를 사용한다.
- 새 기능보다 먼저 `PRD.md`, `README.md`, 패키지 버전을 0.2.1로 갱신한다.
- 외부 전송, `main` 병합, push 또는 배포는 수행하지 않는다.

---

### Task 1: 사용자 문서와 버전 동기화

**Files:**
- Modify: `PRD.md`
- Modify: `README.md`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Consumes: 승인된 장문 TTS 설계
- Produces: 버전 `0.2.1`과 사용자·개발자 문서의 장문 처리 계약

- [ ] **Step 1: PRD에 장문 생성 및 동일 재생 경로 요구사항 추가**

`3.3 오디오 재생 및 다운로드`에 다음 행위를 명시한다.

```markdown
- **장문 연속 생성**: 긴 원고는 문장 경계의 작은 조각으로 나누어 순차 생성하고 하나의 연속 오디오로 결합.
- **재생 음질 일치**: 생성 중과 완료 후 다시 듣기에 동일한 Web Audio 경로와 동일 PCM 사용.
- **불완전 결과 차단**: 출력 한도 등 비정상 종료가 발생한 부분 오디오는 완성본으로 제공하지 않음.
```

- [ ] **Step 2: README에 동작과 검증 기준 추가**

`변경 사항`에 장문 분할, 종료 사유 검증, 동일 Web Audio 재생을 기록하고, API가 24kHz PCM 조각을 순차 연결한다는 구현 설명을 추가한다.

- [ ] **Step 3: 패치 버전을 동기화**

Run: `npm version 0.2.1 --no-git-tag-version`

Expected: `package.json`과 `package-lock.json`의 버전이 모두 `0.2.1`

- [ ] **Step 4: 문서 변경 검사**

Run: `git diff --check && node -e "const p=require('./package.json'); const l=require('./package-lock.json'); if(p.version!=='0.2.1'||l.version!=='0.2.1') process.exit(1)"`

Expected: exit 0

- [ ] **Step 5: 커밋**

```bash
git add PRD.md README.md package.json package-lock.json
git commit -m "장문 TTS 연속 생성 요구사항과 버전 갱신"
```

### Task 2: 문장 경계 원고 분할기

**Files:**
- Create: `src/app/api/tts/transcript.ts`
- Create: `src/app/api/tts/transcript.test.ts`

**Interfaces:**
- Consumes: 원문 `text: string`, 선택적 `maxChars: number`
- Produces: `splitTranscript(text: string, maxChars?: number): string[]`

- [ ] **Step 1: 공개 행위 실패 테스트 작성**

```ts
import { describe, expect, it } from "vitest";
import { splitTranscript } from "./transcript";

describe("splitTranscript", () => {
  it("최대 길이 안의 원고는 그대로 한 조각으로 유지한다", () => {
    expect(splitTranscript("첫 문장입니다. 둘째 문장입니다.", 40)).toEqual([
      "첫 문장입니다. 둘째 문장입니다.",
    ]);
  });

  it("긴 원고를 문장 경계에서 최대 길이 이하로 나눈다", () => {
    expect(splitTranscript("첫 문장입니다. 둘째 문장입니다. 셋째입니다.", 18))
      .toEqual(["첫 문장입니다.", "둘째 문장입니다.", "셋째입니다."]);
  });

  it("긴 단일 문장을 공백 경계에서 나누고 모든 단어를 보존한다", () => {
    const chunks = splitTranscript("하나 둘 셋 넷 다섯 여섯 일곱", 8);
    expect(chunks.every((chunk) => chunk.length <= 8)).toBe(true);
    expect(chunks.join(" ")).toBe("하나 둘 셋 넷 다섯 여섯 일곱");
  });

  it("공백 없는 긴 텍스트도 최대 길이로 안전하게 나눈다", () => {
    expect(splitTranscript("가나다라마바사아자차", 4))
      .toEqual(["가나다라", "마바사아", "자차"]);
  });
});
```

- [ ] **Step 2: 테스트가 실패하는지 확인**

Run: `npm test -- src/app/api/tts/transcript.test.ts`

Expected: FAIL because `./transcript` does not exist

- [ ] **Step 3: 최소 분할 구현**

`splitTranscript`는 입력을 trim하고, 문장 종결 부호 뒤 공백 → 줄바꿈·쉼표 → 일반 공백 → 강제 길이 순으로 가장 뒤의 안전 경계를 선택한다. 반환되는 모든 조각은 비어 있지 않고 `maxChars` 이하여야 한다.

- [ ] **Step 4: 분할기 테스트 통과 확인**

Run: `npm test -- src/app/api/tts/transcript.test.ts`

Expected: 4 tests passed

- [ ] **Step 5: 커밋**

```bash
git add src/app/api/tts/transcript.ts src/app/api/tts/transcript.test.ts
git commit -m "장문 원고 문장 경계 분할기 추가"
```

### Task 3: Gemini 조각 종료 검증과 순차 PCM 스트림

**Files:**
- Modify: `src/app/api/tts/stream.ts`
- Modify: `src/app/api/tts/stream.test.ts`

**Interfaces:**
- Consumes: `AudioResponse` async iterable factories and optional `AbortController`
- Produces: `createSequentialPcmStream(sources: AsyncIterable<AudioResponse>[], abortController?: AbortController): ReadableStream<Uint8Array>`
- Preserves: `createPcmStream`, `preparePcmStream`

- [ ] **Step 1: 비정상 종료 실패 테스트 작성**

```ts
it("MAX_TOKENS로 종료된 조각은 일부 PCM 뒤에도 스트림 오류로 처리한다", async () => {
  async function* truncatedResponses() {
    yield {
      candidates: [{
        finishReason: "MAX_TOKENS",
        content: { parts: [{ inlineData: { data: "AAE=" } }] },
      }],
    };
  }
  const response = new Response(createPcmStream(truncatedResponses()));
  await expect(response.arrayBuffer()).rejects.toThrow(
    "출력 한도에 도달해 음성이 중간에 잘렸습니다.",
  );
});
```

- [ ] **Step 2: 실패 확인**

Run: `npm test -- src/app/api/tts/stream.test.ts`

Expected: FAIL because the current stream closes successfully

- [ ] **Step 3: 종료 사유 검증 구현**

각 응답에서 `candidate.finishReason`을 검사한다. `undefined`와 `"STOP"`은 허용하고 `"MAX_TOKENS"`에는 명시적인 한국어 오류, 그 밖의 값에는 종료 사유가 포함된 안전한 한국어 오류를 저장한다. 같은 응답의 PCM은 먼저 전달하되 pending 청크가 소진된 다음 스트림을 오류로 닫는다.

- [ ] **Step 4: 종료 검증 통과 확인**

Run: `npm test -- src/app/api/tts/stream.test.ts`

Expected: all stream tests passed

- [ ] **Step 5: 순차 결합 실패 테스트 작성**

```ts
it("여러 TTS 응답 스트림을 순서대로 하나의 PCM 스트림에 결합한다", async () => {
  async function* first() {
    yield { candidates: [{ finishReason: "STOP", content: {
      parts: [{ inlineData: { data: "AAE=" } }],
    } }] };
  }
  async function* second() {
    yield { candidates: [{ finishReason: "STOP", content: {
      parts: [{ inlineData: { data: "AgM=" } }],
    } }] };
  }
  const response = new Response(createSequentialPcmStream([first(), second()]));
  expect(Array.from(new Uint8Array(await response.arrayBuffer())))
    .toEqual([0, 1, 2, 3]);
});
```

후속 조각 무음, 후속 조각 오류, 소비자 취소 시 현재 iterator 종료 테스트도 같은 공개 경계에 추가한다.

- [ ] **Step 6: 순차 결합 실패 확인**

Run: `npm test -- src/app/api/tts/stream.test.ts`

Expected: FAIL because `createSequentialPcmStream` is not exported

- [ ] **Step 7: 순차 PCM 스트림 최소 구현**

각 source를 한 번에 하나씩 소비하고, 조각마다 최소 한 개의 오디오 청크와 정상 종료를 요구한다. 전체 바이트 길이도 16비트 샘플 경계인지 검사한다. 취소 시 현재 iterator와 abort controller만 정확히 한 번 정리한다.

- [ ] **Step 8: 스트림 전체 테스트 통과 확인**

Run: `npm test -- src/app/api/tts/stream.test.ts`

Expected: all stream tests passed

- [ ] **Step 9: 커밋**

```bash
git add src/app/api/tts/stream.ts src/app/api/tts/stream.test.ts
git commit -m "Gemini 조각 종료 검증과 PCM 순차 결합 추가"
```

### Task 4: API 라우트의 장문 순차 요청

**Files:**
- Modify: `src/app/api/tts/route.ts`
- Modify: `src/app/api/tts/route.test.ts`

**Interfaces:**
- Consumes: `splitTranscript`, `createSequentialPcmStream`
- Produces: 기존 `POST(req: NextRequest): Promise<Response>` 계약을 유지하는 장문 PCM 응답

- [ ] **Step 1: 장문 순차 요청 실패 테스트 작성**

최대 길이를 넘는 두 문장 입력을 보내고, `generateContentStream`이 두 번 호출되며 첫 번째와 두 번째 PCM이 `[0, 1, 2, 3]` 순서로 응답되는지 검증한다. 각 호출의 prompt에는 해당 원고 조각만 `#### TRANSCRIPT` 아래 포함되어야 한다.

- [ ] **Step 2: 실패 확인**

Run: `npm test -- src/app/api/tts/route.test.ts`

Expected: FAIL because the route makes one Gemini request

- [ ] **Step 3: 순차 요청 구현**

`splitTranscript(text)` 결과마다 동일한 `voice`와 `stylePrompt`로 Gemini async iterable을 만든다. 첫 조각은 기존처럼 첫 오디오 전에 최대 2회 재시도하며, 후속 조각도 아직 해당 조각의 PCM이 전달되기 전 시작 실패에 같은 재시도 정책을 적용한다. 모든 iterable을 `createSequentialPcmStream`으로 결합한다.

- [ ] **Step 4: 중간 실패와 취소 테스트 추가**

두 번째 조각이 `MAX_TOKENS`로 끝나면 `arrayBuffer()`가 reject하고, 소비자 취소 뒤 세 번째 Gemini 요청이 시작되지 않는지 검증한다.

- [ ] **Step 5: 라우트 테스트 통과 확인**

Run: `npm test -- src/app/api/tts/route.test.ts`

Expected: all route tests passed

- [ ] **Step 6: 커밋**

```bash
git add src/app/api/tts/route.ts src/app/api/tts/route.test.ts
git commit -m "장문 TTS 조각을 순차 생성하도록 API 개선"
```

### Task 5: PCM 바이트의 동일 Web Audio 다시 듣기

**Files:**
- Modify: `src/utils/pcm-audio.ts`
- Modify: `src/utils/pcm-audio.test.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/app/page.test.tsx`

**Interfaces:**
- Produces: `pcm16BytesToSamples(bytes: Uint8Array): Int16Array`
- Consumes: 완료 PCM 바이트와 기존 `StreamingPcmPlayer.enqueue`
- Preserves: WAV 다운로드 URL과 파일명 계약

- [ ] **Step 1: PCM 역변환 실패 테스트 작성**

```ts
it("PCM16 리틀엔디언 바이트를 원래 정수 샘플로 변환한다", () => {
  expect(Array.from(pcm16BytesToSamples(
    Uint8Array.from([0x00, 0x80, 0xff, 0x7f]),
  ))).toEqual([-32768, 32767]);
});

it("홀수 길이 PCM 바이트는 거부한다", () => {
  expect(() => pcm16BytesToSamples(Uint8Array.from([0])))
    .toThrow("16비트 샘플 경계");
});
```

- [ ] **Step 2: 실패 확인**

Run: `npm test -- src/utils/pcm-audio.test.ts`

Expected: FAIL because `pcm16BytesToSamples` is not exported

- [ ] **Step 3: 공통 PCM 변환 구현**

`DataView.getInt16(offset, true)`를 사용하는 `pcm16BytesToSamples`를 추가하고 `PcmChunkAssembler.push`도 이 함수를 재사용한다.

- [ ] **Step 4: PCM 테스트 통과 확인**

Run: `npm test -- src/utils/pcm-audio.test.ts`

Expected: all PCM tests passed

- [ ] **Step 5: 화면 다시 듣기 실패 테스트 수정**

완성 후 `다시 듣기`를 누르면 HTMLMediaElement `play()`가 아니라 새 `StreamingPcmPlayer`가 생성되고, 누적 PCM 전체에 해당하는 `Int16Array`가 `enqueue`되는지 검증한다. 생성 중 player를 먼저 닫는 기존 동시성 검증은 유지한다.

- [ ] **Step 6: 화면 테스트 실패 확인**

Run: `npm test -- src/app/page.test.tsx`

Expected: FAIL because replay currently calls `<audio>.play()`

- [ ] **Step 7: 동일 Web Audio 재생 구현**

완료 PCM을 `completedPcmRef`에 보관한다. 다시 듣기 시 현재 player를 닫고 새 player를 `activate()`한 뒤 `pcm16BytesToSamples` 결과를 `enqueue()`한다. 숨김 `<audio>`와 `audioRef` 소유권 로직은 제거하고, WAV URL은 다운로드에만 사용한다.

- [ ] **Step 8: 화면 테스트 통과 확인**

Run: `npm test -- src/app/page.test.tsx`

Expected: all page tests passed

- [ ] **Step 9: 커밋**

```bash
git add src/utils/pcm-audio.ts src/utils/pcm-audio.test.ts src/app/page.tsx src/app/page.test.tsx
git commit -m "완성 음성을 스트리밍과 동일한 경로로 재생"
```

### Task 6: 전체 회귀 검증

**Files:**
- Verify: all changed files

**Interfaces:**
- Consumes: Tasks 1–5
- Produces: 테스트·정적 검사·프로덕션 빌드 증거

- [ ] **Step 1: 전체 테스트**

Run: `npm test`

Expected: all test files and tests passed

- [ ] **Step 2: 린트**

Run: `npm run lint`

Expected: exit 0 with no ESLint errors

- [ ] **Step 3: 프로덕션 빌드**

Run: `npm run build`

Expected: Next.js production build exit 0

- [ ] **Step 4: 변경 무결성 확인**

Run: `git diff --check && git status --short && git log --oneline --decorate -8`

Expected: whitespace errors 없음, 의도한 파일만 변경 또는 커밋됨, 현재 브랜치 `sk_dev`
