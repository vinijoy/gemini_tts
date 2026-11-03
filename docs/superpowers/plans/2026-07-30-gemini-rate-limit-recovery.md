# Gemini Rate Limit Recovery Implementation Plan

> 이 문서는 작성 당시의 계획·조사 기록이다. 현재 제품 범위는 [PRD](../../../PRD.md)를 따르며, 아래 계획이나 검증 상태를 현재 구현·실기 수용 완료로 해석하지 않는다.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Gemini TTS의 모델별 분당 429 제한을 Google 권장 시간만큼 한 번 자동 대기·재시도한다.

**Architecture:** 공개 테스트 경계는 `POST /api/tts`의 HTTP 응답으로 유지한다. 서버는 429 원인 체인에서 할당량 종류와 재시도 시간을 분류하고, 첫 PCM 전송 전에 발생한 유효한 분당 제한만 취소 가능한 타이머로 한 번 재시도한다.

**Tech Stack:** Next.js 16 Route Handler, TypeScript, `@google/genai`, Web Streams API, Vitest

## Global Constraints

- Gemini 호출은 원고 전체를 하나의 요청으로 보내는 기존 단일 요청 구조를 유지한다.
- 첫 PCM 바이트는 버퍼링하지 않고 즉시 브라우저로 스트리밍한다.
- 분당 제한 자동 재시도는 최대 한 번이며 1초 이상 65초 이하의 Google 권장 지연만 허용한다.
- 일일 무료 티어 제한과 첫 PCM 전송 이후 오류는 자동 재시도하지 않는다.
- 사용자 취소는 Gemini 요청과 자동 대기 모두에 즉시 전파한다.
- 패치 버전을 `0.2.5`로 동기화한다.

---

### Task 1: 분당 한도 자동 복구

**Files:**
- Modify: `src/app/api/tts/route.ts`
- Test: `src/app/api/tts/route.test.ts`

**Interfaces:**
- Consumes: `POST(req: NextRequest): Promise<Response>`
- Produces: 첫 PCM 전에 발생한 분당 429를 한 번 자동 복구하는 동일한 HTTP API

- [ ] **Step 1: 구조화된 재시도 시간을 사용하는 실패 테스트 작성**

`generateContentStream` 첫 호출은 `status: 429`와 `"retryDelay":"2s"`를 포함한 오류를 던지고, 두 번째 호출은 PCM을 반환하도록 구성한다. 가짜 타이머를 2초 진행한 뒤 응답 본문이 `[0, 1]`이고 Gemini 호출이 두 번인지 검증한다.

- [ ] **Step 2: 실패 확인**

Run: `npm test -- --run src/app/api/tts/route.test.ts`

Expected: 현재 구현은 첫 429를 즉시 반환하므로 새 테스트가 실패한다.

- [ ] **Step 3: 최소 분류 및 재시도 구현**

`createQuotaError`가 일일 제한 여부, 분당 제한 여부, 유효한 지연 시간을 보존하도록 확장한다. `createRetriedAudioSource`는 첫 PCM 전에 유효한 분당 제한이 발생하면 일반 재시도 횟수와 별도로 한 번 `waitForRetry()`를 호출한 뒤 같은 요청을 다시 시도한다.

- [ ] **Step 4: 구조화된 재시도 테스트 통과 확인**

Run: `npm test -- --run src/app/api/tts/route.test.ts`

Expected: 새 테스트와 기존 일일 한도 테스트가 통과한다.

- [ ] **Step 5: 메시지 대체 경로와 경계 조건을 수직 슬라이스로 추가**

각 테스트를 하나씩 추가하고 실패·통과를 확인한다.

- `Please retry in 3.5s` 메시지를 대체 값으로 사용한다.
- 65초 초과 또는 1초 미만 값은 자동 재시도하지 않는다.
- 두 번째 분당 429는 세 번째 호출 없이 한국어 429로 반환한다.
- 대기 중 요청 취소는 두 번째 Gemini 호출 없이 종료된다.
- 첫 PCM 이후 오류는 기존처럼 재시도하지 않는다.

- [ ] **Step 6: 서버 테스트 통과 확인**

Run: `npm test -- --run src/app/api/tts/route.test.ts`

Expected: 모든 Route Handler 테스트 통과.

### Task 2: 제품 문서와 버전 동기화

**Files:**
- Modify: `PRD.md`
- Modify: `README.md`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Consumes: Task 1의 확정된 429 복구 동작
- Produces: 버전 `0.2.5`와 사용자·개발자 문서

- [ ] **Step 1: PRD를 먼저 갱신**

분당 제한은 Google 권장 시간만큼 한 번 자동 복구하고 일일 제한은 즉시 안내한다는 요구사항과 수용 기준을 기록한다.

- [ ] **Step 2: README 오류 정책 갱신**

기존 “429는 재시도하지 않는다” 설명을 일일 제한과 분당 제한으로 구분한 정책으로 바꾼다.

- [ ] **Step 3: 패치 버전 동기화**

Run: `npm version 0.2.5 --no-git-tag-version`

Expected: `package.json`과 `package-lock.json` 버전이 모두 `0.2.5`.

### Task 3: 전체 검증과 커밋

**Files:**
- Verify: all modified files

**Interfaces:**
- Consumes: Tasks 1–2 결과
- Produces: 검증된 단일 커밋

- [ ] **Step 1: 전체 테스트**

Run: `npm test -- --run`

Expected: 실패 0개.

- [ ] **Step 2: 린트**

Run: `npm run lint`

Expected: 오류 0개.

- [ ] **Step 3: 프로덕션 빌드**

Run: `npm run build`

Expected: 종료 코드 0.

- [ ] **Step 4: 변경 검토**

Run: `git diff --check && git status --short && git diff --stat`

Expected: 공백 오류가 없고 계획 범위 밖 변경이 없다.

- [ ] **Step 5: 커밋**

Run:

```bash
git add PRD.md README.md package.json package-lock.json src/app/api/tts/route.ts src/app/api/tts/route.test.ts docs/superpowers/plans/2026-07-30-gemini-rate-limit-recovery.md
git commit -m "Gemini 분당 한도 자동 복구 적용"
```
