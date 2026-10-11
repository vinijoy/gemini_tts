# Codebase Concerns

**Analysis Date:** 2026-10-11
**Last mapped commit:** `b373c48b74146f4a2308aff429693e284989e7b1`

## Tech Debt

**서버 비밀 설정 로딩이 애플리케이션 코드에 포함됨:**
- Issue: 런타임에 `.env.local`을 직접 읽고 정규식으로 키를 파싱한다. 환경 파일 형식과 배포 환경에 취약하다.
- Files: `src/app/api/tts/route.ts`
- Impact: 잘못 읽힌 키가 SDK 초기화로 전달되거나 설정 오류가 요청 시점의 500 오류로 나타날 수 있다.
- Fix approach: 런타임 환경 변수만 사용하고 시작 시 필수 키 존재를 명시적으로 검증한다.

**대형 클라이언트 컴포넌트:**
- Issue: 입력 UI, 네트워크 스트리밍, PCM 조립, 재생 수명 주기, 다운로드 상태가 559줄 파일에 함께 있다.
- Files: `src/app/page.tsx`
- Impact: 재생·취소 상태 변경의 회귀 범위가 UI 변경과 함께 커진다.
- Fix approach: 스트리밍 요청 훅과 입력·결과 UI를 분리하고 `src/utils/streaming-player.ts` 경계를 유지한다.

## Known Bugs

**직접 API 호출에서 공백 원고와 임의 음성이 허용됨:**
- Symptoms: `POST /api/tts`는 `text` 존재·길이만 확인하고 `voice`를 허용 목록과 비교하지 않는다.
- Files: `src/app/api/tts/route.ts`, `src/app/page.tsx`
- Trigger: 공백 `text` 또는 임의 `voice`를 JSON으로 POST한다.
- Workaround: 서버에서 `text.trim()`을 검사하고 음성 이름을 허용 목록으로 제한한다.

## Security Considerations

**요청 크기 및 스타일 프롬프트 검증 공백:**
- Risk: `stylePrompt` 길이·타입 검증이 없고 요청 JSON을 타입 단언한다. 큰 입력이 외부 모델 비용과 지연을 키울 수 있다.
- Files: `src/app/api/tts/route.ts`
- Current mitigation: `text`에만 1,000자 제한이 있다.
- Recommendations: 런타임 스키마 검증, 스타일·본문 크기 제한, 인증 또는 레이트 리밋을 추가한다.

## Performance Bottlenecks

**스트림 시작 전 재시도 대기 및 무제한 외부 호출 대기:**
- Problem: 일반 실패 재시도와 429 대기는 있지만 전체 요청 deadline이 없다.
- Files: `src/app/api/tts/route.ts`
- Cause: `waitForRetry`는 최대 65초까지 대기하고 외부 iterator 진행에도 별도 timeout이 없다.
- Improvement path: 요청별 총 deadline과 시도별 timeout을 두고 초과 시 abort한다.

## Fragile Areas

**PCM 스트림과 브라우저 재생 수명 주기:**
- Files: `src/app/api/tts/stream.ts`, `src/app/page.tsx`, `src/utils/streaming-player.ts`
- Why fragile: 서버 스트림의 종료 오류와 클라이언트 reader·AbortController·AudioContext 정리가 여러 경로에 분산되어 있다.
- Safe modification: Route Handler 스트리밍 계약(PCM S16LE, 24kHz, 모노)과 취소 순서를 먼저 고정하고 계약 테스트를 함께 갱신한다.
- Test coverage: 단위·컴포넌트 테스트는 있으나 실제 브라우저 네트워크 중단과 AudioContext를 함께 검증하는 E2E 테스트는 발견되지 않는다.

## Scaling Limits

**메모리 내 완성 오디오 보관:**
- Current capacity: 전체 PCM을 `completedPcmRef`에 보관하고 WAV Blob URL을 유지한다.
- Limit: 여러 결과를 반복 생성할 때 브라우저 메모리 부담이 커질 수 있다.
- Scaling path: 새 결과·언마운트 시 PCM 버퍼와 Blob URL 해제를 단일 수명 주기 함수로 통합한다.

## Dependencies at Risk

**Gemini TTS 프리뷰 모델 의존:**
- Risk: `gemini-3.1-flash-tts-preview`가 코드에 직접 고정되어 모델 종료·변경 시 생성이 중단될 수 있다.
- Files: `src/app/api/tts/route.ts`
- Impact: 모델 교체가 배포 없이 불가능하고 일반 오류로만 노출된다.
- Migration plan: 모델명을 설정으로 분리하고 지원 모델별 계약 테스트와 fallback 정책을 둔다.

## Missing Critical Features

**운영 관측 및 사용자별 남용 방지:**
- Problem: `/api/tts`에 인증, 사용자별 rate limit, 요청 ID 기반 구조화 로그가 없다.
- Blocks: 공개 배포 시 비용 폭증과 남용 원인을 사용자 단위로 추적하기 어렵다.

## Test Coverage Gaps

**실제 런타임 경계 검증:**
- What's not tested: Next.js 런타임의 환경 변수 누락·본문 타입 오류, 외부 네트워크 timeout, 브라우저 스트림 중단과 AudioContext 상호작용.
- Files: `src/app/api/tts/route.ts`, `src/app/page.tsx`, `vitest.config.ts`
- Risk: 모킹된 Gemini와 jsdom이 배포 런타임 차이를 놓칠 수 있다.
- Priority: Medium

---

*Concerns audit: 2026-10-11*
