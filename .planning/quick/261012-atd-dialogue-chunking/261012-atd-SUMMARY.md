---
phase: quick-261012-atd
plan: "01"
subsystem: tts
tags: [dialogue, streaming, pcm, accessibility]
status: complete
requires: []
provides: [대사별 독립 연출과 순차 음성 연결, 합산 제한 제거와 자원 보호]
affects: [TTS, audio, generation-ui]
tech-stack:
  added: []
  patterns: [전체 요청 사전 계획, 각 원래 대사별 독립 요청]
key-files:
  created: []
  modified: [src/lib/tts-contract.ts, src/lib/gemini-tts.ts, src/app/api/tts/route.ts, src/app/components/TtsEditor.tsx, src/app/page.tsx]
key-decisions:
  - "최신 사용자 정정: 입력칸1,000자 유지, 직접 추가한 각 대사와 자신의 연출을 별도 요청한다."
  - "1MiB 작업과128요청 보호, 요청별18,000-byte 앱 예산은 공식 토큰 검증이 아니다."
  - "새 자동 조각 편집 UI 없이 기존 화면을 유지한다."
requirements-completed: []
plan_head_before: 18cf46d9ae0e9618453e59daeba7f60fea705f7c
actuals:
  tokens: 9964
  tasks: 3
  commits: 6
duration: 25min
completed: 2026-10-12
---

# Quick 261012-atd: 추가 대사별 생성과 연출 분리

**추가한 각 대사를 자신의 화자·연출로 따로 생성하고 순차 PCM을 완성 WAV로 연결한다. 기존 입력칸의1,000자 제한은 유지한다.**

## 결과

- 전체 본문1,000자·연출4,000자·20턴 제한을 제거했다. 수동 추가 행은 각각 별도 요청이다. prebuilt는 두 화자 설정, custom은 해당 화자 single 설정을 유지한다.
- TTS raw JSON 및 정규화 요청은1MiB, 사전 계획128회, 요청18,000 UTF-8 bytes와 본문1,000 code points, 누적 PCM32MiB를 제한한다. 최대 두4096자 voice ref와 본문/연출 각각 한글1,000자인128행도 사전 계획된다. 이 예산은 토큰 계산이나 음질 보장이 아니다.
- 서버 직접 장문 API는 grapheme·완전한 태그를 보존하며 유한 분할하고 연출을 원문 그대로 반복한다. 일반 UI에는 자동 조각 편집 단계가 없다.
- 뒤 요청의 SSE reader 대기 중 취소가 reader까지 전달된다. 뒤 실패·빈 오디오·잘린 SSE·형식/rate 불일치·용량 초과에서 다음 요청/완성 파일 생성을 막는다.
- 두 탭·입력보존·DOM 순서와 기존 본문/연출 maxlength1000을 유지했다. 자원 안내에 현재 sampleRate의 최대 음성 분/초를 표시한다.

## 커밋

1. Task1 RED `a42ef22` — 실제 POST 합산제한/원문보존 회귀.
2. Task1 GREEN `27b9256` — 요청 사전계획·대사별 분리.
3. Task2 RED `c6bd5df` — 중간 사용자 요청의 조각 편집 회귀. 최종 정정으로 해당 UX는 폐기했다.
4. Task2 GREEN `2cc76af` — 기존 필드제한 유지·수동 대사별 실제 POST 연결.
5. Task3 RED `3ee5f7e` — reader 취소·후속실패·자원 경계.
6. Task3 GREEN `230a846` — pending reader 취소 및 화면 실패 회귀·후속기록.

메타데이터 커밋과 STATE는 coordinator 담당이다. 위6개는 ledger 기준 HEAD까지 측정한 구현 커밋이다.

## 검증

- Task1: 관련20 tests 통과.
- Task2: 관련75 tests 통과.
- Task3: API/page/audio-format/pcm-audio/streaming-player102 tests 통과.
- 최종 `npm test`:18파일177 tests 통과.
- `npm run lint`: 통과.
- `npx tsc --noEmit`: 최종 통과.
- `npm run build`: 최종 통과, 기존 `/api/tts`, `/api/voices`, `/api/voices/[id]`, `/api/health` 유지.
- `git diff --check`: 통과.
- 실제 Home→POST→mock provider에서 한글1,000자 두 대사가 독립 연출로 정확히2회 요청되고 PCM[1,2] 및 완성 WAV를 만든다.
-4형식(L16/WAV/μ-law/A-law)×3rate(8/16/24kHz),32MiB 누적 경계/초과,1MiB/128회 사전 거부,21행 UI,그룹별 PCM경계,실패 후 다운로드 부재를 확인했다.

## 변경·실패 기록

- 사용자 정정에 따라 최초 장문입력/자동조각편집 계획을 축소했다. PLAN의 authoritative scope_amendment가 최종 계약이다. 서로 다른 원래 턴을 묶는 계획도 대사별 독립 요청으로 바꿨다.
-6,000-byte/64KiB 초기예산은 정상 한글 입력과 여러 행을 불필요하게 막아18,000-byte/1MiB로 조정했다. TTS route만 운송 한도를 바꿨다.
- `[Rule 1 - Bug]` pending SSE reader는 abort만으로 해제되지 않는 mock 회귀에서 cancel0회로 실패했다. abort listener에서 reader.cancel을 호출하고 finally에서 정리한다.
- 폐기한 조각편집안의 신규 임시 모듈이 남아 최초tsc/build가 실패했다. 소유 파일을 제거한 후 둘 다 재실행해 통과했다. 새 전역규칙 대신 기존 소유파일 검토·명시적staging·tsc/build 규칙을 적용했다.
- TDD RED evidence checker는 Vitest TAP-flat의 요약주석을 인식하지 못해 실제 TAP 레코드에서 수량을 계산해 덧붙인 뒤 `RED_EVIDENCE_OK`를 확인했다. 중간 최초 취소 회귀 timeout은 의도된 assertion RED로 바꿔 검사했다.

## 남은 확인·보존 범위

- 유료 API와 실제 모델 음성 생성, 경계 음질·언어·연출·목소리 일관성 청취는 미수행이다.
- 이번 변경의 VoiceOver/NVDA 실기는 대기다. 기존 사용자 VoiceOver 수용 기록을 확대하지 않았다. `.planning/ui-followup.md`에 남겼다.
- ROADMAP/REQUIREMENTS/기존 단계/UAT/STATE를 수정하지 않았다. quick closeout guard는 기존Phase1 PLAN 부재로 미지원이며 통과를 주장하지 않는다. 공식 요구사항 완료처리는 하지 않는다.
- 새 endpoint/auth/저장소/패키지 없음. 새 기능 stub 없음. 입력 placeholder는 기존 도움문구이며 미구현 stub이 아니다.
- push·main병합·배포 없음.

## Self-Check: PASSED

수정한10개 파일과 SUMMARY 존재,6개 커밋과 ledger base를 확인했다. 자동검사와 실기대기를 분리했다. 코드 작업 이후 남은 untracked는 coordinator 소유 quick 계획/검사/요약 산출물이다.

## Coordinator workflow notes

- 기존 ROADMAP/REQUIREMENTS 2개 파일의 SHA-256 보존을 확인했다. phase 1 PLAN 부재로 closeout guard snapshot은 미지원이며 phase 완료로 처리하지 않았다.
- execute:post의 선택적 code-review hook은 quick 식별자에 `init.code-review`가 `phase_found: false`를 반환해 `onError: skip`에 따라 생략했다. 별도 GSD verifier의 실제 코드·집중 검증 결과를 사용하며 code-review 통과로 표시하지 않는다.
