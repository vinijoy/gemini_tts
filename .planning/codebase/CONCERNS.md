---
last_mapped_commit: 230a8461a5a81f6aa9fa4449a4732de4b96b9d0a
refreshed: 2026-10-12
mapping_scope: incremental-dialogue-only
named_blocks_mapped_commit: 24afbbf2be923dcde468e6fb27d389560af961d5
named_blocks_mapped_paths: [src/lib/dialogue-blocks.ts, src/lib/tts-contract.ts, src/lib/gemini-tts.ts, src/lib/gemini-tts.test.ts, src/app/page.test.tsx, src/app/generation-order.test.tsx]
mapped_paths:
  - src/lib/tts-contract.ts
  - src/lib/gemini-tts.ts
  - src/lib/gemini-tts.test.ts
  - src/app/api/tts/route.ts
  - src/app/api/tts/route.test.ts
  - src/app/components/TtsEditor.tsx
  - src/app/page.tsx
  - src/app/page.test.tsx
  - src/app/generation-order.test.tsx
  - README.md
---

# Codebase Concerns

**Analysis Date:** 2026-10-11
**Last mapped commit:** `c49f74b5251782cd41f2a5daa29b611785b7de89`

**부분 갱신 (2026-10-12, `230a846`):** frontmatter의 `mapped_paths` 중 대사별 생성·제한과 관련 회귀만 갱신했다. 본문의 기존 분석일·전체 매핑 기준은 유지하며 전체 재분석을 뜻하지 않는다.

## Tech Debt

**서버 비밀 설정 로딩이 애플리케이션 코드에 포함됨:**
- Issue: 런타임에 `.env.local`을 직접 읽고 정규식으로 키를 파싱한다. 환경 파일 형식과 배포 환경에 취약하다.
- Files: `src/lib/gemini-client.ts`, `scripts/generate-voice-catalog.mjs`
- Impact: 파일 값이 환경 변수보다 우선하며 배포 설정과 실행 중 키 선택이 달라질 수 있다. 키 누락은 요청 시점의 503으로 반환한다.
- Fix approach: 런타임 환경 변수만 사용하고 시작 시 필수 키 존재를 명시적으로 검증한다.

**대형 클라이언트 컴포넌트:**
- Issue: 기능별 UI는 분리되어 있으나 `src/app/page.tsx`에 네트워크 스트리밍, PCM 조립, 재생 수명 주기, 다운로드 상태가 함께 있다.
- Files: `src/app/page.tsx`
- Impact: 재생·취소 상태 변경의 회귀 범위가 UI 변경과 함께 커진다.
- Fix approach: 스트리밍 요청 훅과 입력·결과 UI를 분리하고 `src/utils/streaming-player.ts` 경계를 유지한다.

## Known Bugs

**대사 사이 긴 저에너지 오디오 (부분 갱신 2026-10-12, `fb005bd`):**
- Symptoms: 실제 다운로드 WAV는 481.56초이며 88–234초·235–415초에 저에너지 신호가 있다. 완전한 무음 또는 제거 가능한 불필요 소리로 확정하지 않는다.
- Files: `.planning/debug/dialogue-audio-gap.md`, `src/lib/tts-audio-diagnostics.ts`, `src/lib/gemini-tts.ts`, `src/utils/audio-format.ts`, `src/utils/pcm-audio.ts`, `src/utils/streaming-player.ts`
- Trigger: 두 번째 대사 전 긴 노이즈/공백이 사용자에게 보고되었다. 원래 provider 응답·요청 경계가 없어 원인은 미확정이다. 2026-10-12 후속 실제 생성은 사용자 정상 확인을 받았고, 71.08초+79초의 두 요청에 10초 이상 저에너지 구간이 없었다. 과거 파일의 원인까지 확정한 것은 아니다.
- Workaround: 확인된 음성 수정은 없다. 진단 off/on fixture 재생은 검사한 경로의 바이트 동일성만 입증하며 provider 책임은 입증하지 않는다. 기본 off인 `GEMINI_TTS_AUDIO_DIAGNOSTICS=1`은 요청별 메타데이터 JSON만 기록하고 본문·목소리·키·PCM을 기록하거나 오디오를 제거하지 않는다. localhost:3000에서 사용자 재현·청취가 대기다.
- Scope: 기존 매핑 범위와 `24afbbf`는 이전 체크포인트로 보존한다.

공백 원고·임의 기본 음성은 `src/lib/tts-contract.ts`의 trim·허용 목록 검증으로 차단한다. `src/app/api/tts/route.test.ts`에 malformed contract 거부 테스트가 있다. 미확인 실서비스 동작을 확인된 버그로 분류하지 않는다.

## Security Considerations

**공유 프로젝트 자산 접근 경계:**
- Risk: 사용자 인증·사용자별 권한·rate limit 없이 서버 키의 Voices 및 Batch 목록/관리 기능을 호출할 수 있다.
- Files: `src/lib/gemini-client.ts`, `src/app/api/voices/[id]/route.ts`, `src/app/api/batches/[id]/route.ts`
- Current mitigation: 변경 요청 Origin/Sec-Fetch-Site 검사, ID/경로 검증, redirect 차단, JSON 크기 제한, 정제 오류 응답이 있다. 음성 업로드·생성 동의와 UI 삭제 확인도 적용한다.
- Recommendations: 공개 운영 범위에 맞는 인증·자산 권한·요청 한도를 추가한다. Origin 검사만으로 사용자별 권한이 생기는 것으로 해석하지 않는다.

## Performance Bottlenecks

**순차 대화·재시도의 총 소요 시간:**
- Problem: prebuilt 블록별 요청·custom 발화별 요청·이름 없는 직접 API 장문 분할과 재시도는 개별 요청 시간 제한보다 전체 소요 시간이 길어질 수 있다.
- Files: `src/lib/gemini-client.ts`, `src/lib/gemini-tts.ts`
- Cause: 일반 upstream 요청은 120초 timeout을 적용하고 분당 429는 1~65초 대기한다. 전체 대화 총 시간 제한은 별도다.
- Improvement path: 실제 응답 시간을 측정한 뒤 전체 요청 deadline과 진행 안내를 검토한다.

## Fragile Areas

**입력 블록과 발화의 구분 (부분 갱신 2026-10-12, `24afbbf`):**
- Files: `src/lib/dialogue-blocks.ts`, `src/lib/tts-contract.ts`, `src/lib/gemini-tts.ts`, `src/app/components/TtsEditor.tsx`
- Why fragile: 한 칸에 여러 이름이 올 수 있어 블록 전체에 선택 화자 하나를 강제하면 다른 목소리를 잃는다. 이름 해석과 일반 본문 구분은 별도 회귀가 필요하다.
- Safe modification: 등록 UI 없이 전체 블록 최초 이름=A·다음 이름=B의 매핑을 한 번 생성해 재사용한다. 직접 A/B는 고정 별칭이며 세 번째 화자는 사전 거부한다. `parseTts`는 legacy name을 무시한다. prebuilt의 여러 parts·두 voice configs와 custom 발화별 single voice, 블록별 연출을 보존한다. 이름 있는 계획 예산 초과는 사전 거부한다.
- Test coverage: `src/lib/gemini-tts.test.ts`, `src/app/page.test.tsx`, `src/app/generation-order.test.tsx`에서 두 다화자 블록·역순 시작·다른 연출·등록 필드 부재·전체 블록 매핑을 확인한다. 기존 매핑 범위는 유지한다. 실제 음성·VoiceOver/NVDA는 `.planning/debug/automatic-speaker-order.md`의 대기 범위를 따른다.

**PCM 스트림과 브라우저 재생 수명 주기:**
- Files: `src/lib/gemini-tts.ts`, `src/utils/audio-format.ts`, `src/app/page.tsx`, `src/utils/streaming-player.ts`
- Why fragile: 서버 스트림의 종료 오류와 클라이언트 reader·AbortController·AudioContext 정리가 여러 경로에 분산되어 있다.
- Safe modification: Route Handler 스트리밍 계약(PCM16LE, 8/16/24kHz, 모노)과 취소 순서를 먼저 고정하고 계약 테스트를 함께 갱신한다.
- Test coverage: 단위·컴포넌트 테스트는 있으나 실제 브라우저 네트워크 중단과 AudioContext를 함께 검증하는 E2E 테스트는 발견되지 않는다.

## Scaling Limits

**메모리 내 완성 오디오 보관:**
- Files: `src/app/page.tsx`, `src/lib/tts-contract.ts`, `src/lib/gemini-tts.ts`, `src/app/api/tts/route.ts`, `src/utils/audio-format.ts`
- Current capacity: TTS raw JSON·정규화 작업 1MiB, 계획 128개 요청, 요청별 본문 1,000 code points·wire 18,000 UTF-8 bytes, 누적 PCM 32MiB. 화면 입력칸은 대본·연출 각각 1,000자를 유지한다. 전체 PCM을 `completedPcmRef`와 WAV Blob URL에 보관한다.
- Limit: 여러 결과를 반복 생성할 때 브라우저 메모리 부담이 커질 수 있다.
- Scaling path: 새 결과·언마운트 시 PCM 버퍼와 Blob URL 해제를 단일 수명 주기 함수로 통합한다.

**독립 요청 사이의 음질·모델 수용:**
- Files: `src/lib/gemini-tts.ts`, `src/lib/tts-contract.ts`, `src/lib/gemini-tts.test.ts`
- Risk: 독립 요청 사이 억양·목소리·언어·연출 일관성은 mock PCM 결합으로 확인할 수 없다. 18,000-byte 앱 예산은 공식 토큰 계산이나 provider 수용 보증이 아니다.
- Current mitigation: 블록의 이름별 발화·연출을 유지하고 전체 계획을 사전 검증한다. 이름 없는 직접 API 장문은 grapheme·완전한 태그·공백을 보존한다.
- Follow-up: 실제 모델 청취·등록 없는 입력 흐름과 오류 안내 VoiceOver/NVDA는 `.planning/debug/automatic-speaker-order.md`, `.planning/debug/dialogue-audio-gap.md`, `.planning/ui-followup.md`의 대기 범위를 따른다.

## Dependencies at Risk

**Gemini 3.8 REST 계약과 계정 기능 접근:**
- Risk: 두 모델·Voices·Batch REST의 응답 형식과 계정 권한에 의존한다. mock 계약 테스트가 실서비스 접근 가능성을 보증하지 않는다.
- Files: `src/lib/tts-contract.ts`, `src/lib/gemini-tts.ts`, `src/lib/gemini-voices.ts`, `src/lib/gemini-batches.ts`, `package.json`
- Impact: 모델/기능 미지원 또는 provider 변경은 해당 기능 실패로 나타난다. 고정 SDK 2.28.0 설치만으로 REST 호환성이 검증되지는 않는다.
- Migration plan: 모델 허용 목록·wire serializer·응답 parser와 계약 테스트를 함께 유지하고 실제 계정 GET/유료 실행 증거를 구분한다.

**제공 카탈로그와 현재 계정의 접근 권한:**
- Risk: 사용자 제공 `GEMINI-TTS-VOICES.md`의 2026-10-01 목록과 현재 키의 API 접근·합성 권한은 별개다.
- Files: `src/lib/voice-catalog.ts`, `src/lib/gemini-voices.ts`, `src/app/components/VoiceLibrary.tsx`
- Current mitigation: `source=provided`는 로컬 읽기 전용 검색이며 UI가 출처를 구분한다. 부모 실행에서 현재 키 GET은 HTTP 400 `INVALID_ARGUMENT`/`API_KEY_INVALID`로 보고되었다. 제공 목록을 서비스 성공 증거로 사용하지 않는다.

## Missing Critical Features

**운영 관측 및 사용자별 남용 방지:**
- Problem: `/api/tts`에 인증, 사용자별 rate limit, 요청 ID 기반 구조화 로그가 없다.
- Files: `src/lib/gemini-client.ts`, `src/app/api/tts/route.ts`
- Blocks: 공개 배포 시 비용 폭증과 남용 원인을 사용자 단위로 추적하기 어렵다.

**Remix 및 webhook:**
- Problem: Voice Remix는 base_voice 요청 계약 미확인으로 차단되며 webhook 수신 경로는 없다. Batch는 30초 폴링이다.
- Files: `src/app/components/VoiceStudio.tsx`, `src/app/components/BatchPanel.tsx`, `src/app/api/batches/`
- Blocks: Remix 실행 및 서버가 완료 알림을 수신하는 흐름.

**v1·외부 Batch 키의 완전성 기준:**
- Problem: `tts-v1`에는 전체 그룹 수가 없어 입력 metadata도 없는 파일 결과에서 그룹 전체 누락을 대조할 수 없다. 외부 키는 앱 요청 정보가 없는 실패 항목으로 반환한다.
- Files: `src/lib/gemini-batches.ts`, `src/lib/gemini-batches.test.ts`
- Current mitigation: 앱 생성 `tts-v2-{전체그룹수}-{group}-{order}-{발화수}-{rate}-{encoding}` 키는 입력 manifest 없이도 전체 그룹 누락을 탐지한다. 빈 결과 배열을 거부하고, 알려진 그룹의 턴 누락·실패는 완성본 생성을 막는다. `tts-v1` 파싱은 호환 목적으로 유지한다.
- Blocks: 전체 그룹 수가 없는 v1·외부 키의 원래 요청 대비 완전성 보증.

## Test Coverage Gaps

**실제 런타임 경계 검증:**
- What's not tested: 실계정 유료 합성·설계·복제·Batch, 외부 네트워크 timeout, 실제 브라우저 스트림 중단·AudioContext·VoiceOver/NVDA 상호작용.
- Files: `src/lib/gemini-tts.ts`, `src/lib/gemini-voices.ts`, `src/lib/gemini-batches.ts`, `src/app/page.tsx`, `vitest.config.ts`
- Risk: 모킹된 Gemini와 jsdom이 배포 런타임 차이를 놓칠 수 있다.
- Priority: Medium

---

*Concerns audit: 2026-10-11*
