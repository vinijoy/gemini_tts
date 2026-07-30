# Single-request TTS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** TTS를 단일 생성 요청으로 되돌리고 본문 입력을 1,000자로 제한한다.

**Architecture:** 클라이언트와 API 양쪽에 동일한 `1000`자 계약을 적용한다. 서버는 분할기 없이 하나의 재시도 가능 오디오 소스만 PCM 스트림으로 연결한다.

**Tech Stack:** Next.js 16, React 19, TypeScript, Vitest, Google GenAI SDK

## Global Constraints

- 서브에이전트 없이 현재 세션에서 직접 구현한다.
- UI와 오류 메시지는 한국어 접근성 이름을 유지한다.
- 문서와 버전을 코드 변경보다 먼저 갱신한다.

---

### Task 1: 단일 요청 API

**Files:**
- Modify: `src/app/api/tts/route.ts`
- Modify: `src/app/api/tts/route.test.ts`
- Delete: `src/app/api/tts/transcript.ts`
- Delete: `src/app/api/tts/transcript.test.ts`

- [ ] 분할·결합 대신 본문 전체가 한 번만 Gemini에 전달되는 실패 테스트를 작성한다.
- [ ] 1,001자 요청이 HTTP 400으로 거부되는 실패 테스트를 작성한다.
- [ ] 테스트 실패를 확인한다.
- [ ] 분할 호출과 재귀 세분화를 제거하고 단일 소스를 사용한다.
- [ ] API에 1,000자 상한 검증을 추가한다.
- [ ] 관련 테스트가 통과하는지 확인한다.

### Task 2: 입력 단계 1,000자 제한

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/page.test.tsx`

- [ ] 입력과 태그 추가가 1,000자를 넘지 않는 실패 테스트를 작성한다.
- [ ] 테스트 실패를 확인한다.
- [ ] `maxLength`와 상태 절단 로직을 추가한다.
- [ ] UI 테스트를 통과시킨다.

### Task 3: 최종 검증

**Files:**
- Modify: `README.md`
- Modify: `PRD.md`
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] `npm test`, `npm run lint`, `npm run build`를 실행한다.
- [ ] Safari에서 1,000자 이내 본문이 단일 요청으로 생성되는지 확인한다.
- [ ] 한국어 한 줄 커밋으로 변경을 기록한다.
