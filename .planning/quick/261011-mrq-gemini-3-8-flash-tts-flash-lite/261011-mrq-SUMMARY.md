---
phase: quick-261011-mrq
plan: "01"
subsystem: api-ui
tags: [gemini, tts, voices, batch, accessibility]
status: complete
requires:
  - phase: existing-tts
    provides: streaming player and archived official API documentation
provides:
  - Validated Gemini 3.8 synthesis, formats, service tiers and dialogue
  - Voice search, design, replication and management UI/server adapters
  - Inline and Files Batch lifecycle and validated audio results
  - Preserved user-provided catalog with local filtering and provenance
affects: [tts, voices, batch, future-product-acceptance]
tech-stack:
  added: ["@google/genai@2.28.0"]
  patterns: [validated REST wire adapters, fixed-host requests, completion-gated WAV output]
key-files:
  created:
    - src/lib/tts-contract.ts
    - src/lib/gemini-client.ts
    - src/lib/gemini-tts.ts
    - src/lib/gemini-voices.ts
    - src/lib/gemini-batches.ts
    - src/lib/voice-catalog.ts
    - src/utils/audio-format.ts
    - src/app/components/TtsEditor.tsx
    - src/app/components/VoiceLibrary.tsx
    - src/app/components/VoiceStudio.tsx
    - src/app/components/BatchPanel.tsx
    - GEMINI-TTS-VOICES.md
  modified:
    - src/app/page.tsx
    - src/app/api/tts/route.ts
    - README.md
    - .planning/codebase/ARCHITECTURE.md
key-decisions:
  - Use explicit REST serialization where the SDK drops documented responseFormat.audio fields.
  - Preserve the user-provided catalog byte-for-byte; write future generated catalogs to a separate file.
  - Keep Remix and webhook gaps explicit; do not mark roadmap requirements accepted.
  - Use v2 Batch keys containing group count to detect missing complete groups after reopening.
requirements-completed: []
requirements-mapped: [TTS-01, TTS-02, TTS-03, TTS-04, VOICE-01, VOICE-02, VOICE-03, VOICE-04, VOICE-05, VOICE-06, AUDIO-01, AUDIO-02, SAFE-01, A11Y-01, SERVICE-01, SERVICE-02, BATCH-01, BATCH-02, BATCH-03, BATCH-04, DOC-01, TEST-01]
plan_head_before: f9a9ed5f7c285ad65eb1549f7ddb791726f62f44
actuals:
  tokens: 260225
  tasks: 3
  commits: 6
duration: 36min-from-first-task-ledger
completed: 2026-10-11
---

# Quick 261011-mrq: Gemini 3.8 TTS 구현 Summary

**두 모델의 검증된 합성·대화·오디오 변환, 목소리 제작/관리, Batch 흐름을 연결하고 사용자 제공 2,089개 목록을 원문 그대로 로컬 검색에 연결했다.**

계획의 3개 구현 작업 완료 기록이다. 제품 요구사항 전체 수용, 로드맵 단계 완료, 실제 유료 API 성공을 뜻하지 않는다. 22개 요구사항의 경로·검사·남은 검증은 `261011-mrq-VERIFICATION.md`에 각각 대응했다. `requirements-completed`는 이를 오인하지 않도록 비워 두었으며 ROADMAP/REQUIREMENTS를 변경하지 않았다. STATE의 quick 기록은 orchestrator가 담당한다.

## Performance

- 첫 작업 ledger: 2026-10-11 16:44:12 +09:00; 구현 커밋 완료: 17:20 +09:00. 선행 문서 열람 시간은 별도 측정하지 않았다.
- 구현 작업 3개, 측정된 구현/TDD 커밋 6개, 변경 파일 44개.
- actuals.tokens는 기준 커밋부터 Task 3 GREEN까지 diff 1,040,899자의 chars/4 올림값이다. 사용자 제공 818,689바이트 카탈로그를 포함하므로 전부 새로 저작한 코드량이나 모델 사용량을 뜻하지 않는다. 이 문서의 후속 metadata 커밋은 위 측정 시점 뒤다.

## Accomplishments

1. **합성·오디오:** 정확한 두 모델 allowlist, text/style 분리, prebuilt 다중 화자와 custom 순차 턴, 공식 각괄호 태그, 서비스 등급, 형식/샘플레이트 선택을 연결했다. 첫 출력 이후 재시도를 막고 취소/잘린 SSE/실패를 정상 완료와 구분한다. WAV RIFF 추가 chunk·padding, PCM16, μ-law/A-law 변환을 검증한다.
2. **Voices·Batch:** 전체 필터/페이지, 설계·동의 기반 WAV 복제·저장 목소리 관리 UI와 서버 경로를 연결했다. Batch inline 및 검증된 항목의 JSONL Files 업로드·제출, 목록·재열기·polling·취소·삭제·우선순위·inline/Files 결과·완료 그룹 WAV를 구현했다. v2 키가 누락된 전체 그룹을 탐지한다.
3. **카탈로그·검증·문서:** 사용자 제공 원문을 보존하고 로컬 검색에 사용한다. 총 2,089개 고유 ID, ko-KR 117개, 한국어 페이지 50+50+17을 검증했다. README, COVERAGE, VERIFICATION, PROVIDED-CATALOG, 기존 코드베이스 맵 6개를 최소 범위로 갱신했다.

## Task Commits

| Task | RED | GREEN |
|---|---|---|
| 1. Structured synthesis/audio | `3d64aa8` | `4799056` |
| 2. Voice/Batch lifecycle | `f870718` | `09415b1` |
| 3. Catalog/privacy/integration/docs | `c49f74b` | `1a145d5` |

## Verification

- 최종 `npm test`: **exit 0, 12 files / 131 tests**. 사용자 UI→앱 POST→mock 공식 REST→PCM→WAV 통합, 취소/후속 실패/정상 종료, voice UI·adapter, Batch Files·결과, 입력/host/ID/private 데이터 경계를 검사했다.
- 최종 lint, `tsc --noEmit`, production build: 각각 **exit 0**. 검사 0개 성공 옵션을 제거했다.
- 실제 production 브라우저: 3.8 제목, 홈 패널 접근, 제공목록 ko-KR 조회 50개, Enter 목소리 선택, 조회 후 버튼으로 돌아오는 AX 초점과 필터 간격을 확인했다. 검증용 서버와 탭은 종료했다.
- 원본 SHA-256: `14f121586a01d2426ffdcfd0517b9010662ec0e0ae99f0455a3856e8097800b9`. 원문 2026-10-01 수집 주장과 이번 구조 검증을 구분한다.
- `git diff --check`, ROADMAP/REQUIREMENTS 실행 전 SHA256 보존 대조 통과. 유료 생성·외부 mutation·push·merge·deploy는 실행하지 않았다.

## TDD Gate Compliance

계획 type은 execute이며 각 작업의 계약 검사를 RED 커밋으로 먼저 남긴 뒤 GREEN 구현을 커밋했다. 마지막 전체 검사에서 131개가 실제 실행되어 통과했다. 이전 중간 대상 검사는 Task 1 63개, Task 2 63개였으며 서로 중복된 범위를 전체 합계로 더하지 않는다. MVP+TDD 전용 실행 모드는 이번 quick에 설정되지 않았다.

## Decisions and Deviations

- 사용자 후속 지시로 같은 이름의 제공 카탈로그를 채택했다. 덮어쓰기 방지를 위해 생성기는 별도 `GEMINI-TTS-VOICES.generated.md`로 출력하며 원문 고정 경로를 읽는 로컬 source를 추가했다. 현재 API 계정 조회 성공으로 표시하지 않는다.
- [Rule 1 - Bug] 통합 검사에서 metadata-only 마지막 SSE, 전체 Batch 그룹 누락, 비동기 조회 후 키보드 초점 손실을 수정했다. 관련 테스트를 추가하고 Task 3 GREEN에 포함했다.
- [Rule 2 - Critical correctness] 실제 브라우저에서 드러난 밀집 필터의 레이블/입력 간격과 초점 표시, 공통 polite 알림을 정리하고 제목을 3.8로 맞췄다. 테스트·브라우저·최종 build로 확인했다.
- closeout snapshot은 기존 phase 1 PLAN 부재로 지원되지 않아 실패했다. guard 통과를 주장하지 않고 기존 ROADMAP/REQUIREMENTS 직접 해시를 대조했다. 기존 기록을 수정해 검사를 우회하지 않았다.
- 코드베이스 refresh는 순차 전담 mapper로 기존 맵 6개만 갱신했다. graph 전체 재분석은 하지 않았다. unrelated `.gsd/`, `.serena/`, `docs/.graphifyignore`, `docs/graphify-out/`는 보존했다.

## External Gates and Remaining Scope

- **현재 키:** 읽기 전용 catalog GET과 최소 진단 GET이 HTTP 400 / INVALID_ARGUMENT / API_KEY_INVALID였다. 키와 원문 오류는 출력하지 않았다. 현재 계정의 합성/목록 접근은 검증되지 않았다.
- **Remix:** 공식 요청 계약 미확인으로 열린 차단이며 VOICE-03 완료가 아니다.
- **Webhook:** 공개 수신/서명 검증 인프라가 없어 OPEN-SCOPE 미구현이다. 사용자 승인된 제외로 서술하지 않는다.
- **복제 형식:** 모노 PCM16 WAV만 지원한다. source 10~30초, 파일별 5MiB, consent 최대60초는 앱 검증 제한이다. 공식 AudioData의 모든 MIME 지원이 아니다.
- **Batch 파일:** 앱이 검증한 항목을 JSONL로 업로드하는 경로를 지원한다. 임의 외부 JSONL/기존 Files resource import는 미지원이다. v1/외부 키는 원래 manifest가 없으면 전체 그룹 누락 검증이 제한된다.
- **실기 미수행:** 유료 합성/Design/Replication/Batch, 실제 등급과 만료, 한국어 품질·태그·화자 청취, VoiceOver/NVDA 수용. AX와 mocked 통합 성공으로 대신하지 않는다.
- 구현 파일의 stub/TODO/FIXME/skip 검사를 수행했고 목표를 대신하는 임시 구현은 발견하지 않았다. 위 공개 미지원 범위는 동작하는 기능처럼 표시하지 않는다. `.planning/WINDOWS.md`는 존재하지 않아 optional ledger 추가는 하지 않았다.

## Threat Flags

| Flag | File | Description |
|---|---|---|
| threat_flag: file-upload | src/lib/gemini-batches.ts | 새 Files 업로드 경로는 검증된 앱 항목으로 JSONL을 만들고 응답 업로드 host를 공식 host로 제한한다. 실제 외부 업로드는 실행하지 않았다. |
| threat_flag: file-read | src/lib/voice-catalog.ts | 제공 카탈로그는 서버 고정 경로만 읽으며 사용자 경로·원문 지시를 실행하지 않는다. 목록 출처와 현재 키 지원을 분리한다. |

## Self-Check: PASSED

PLAN/SUMMARY/VERIFICATION/COVERAGE/PROVIDED-CATALOG/원문 목록 6개 파일, 기록한 6개 커밋의 실제 Git object, 카탈로그 SHA-256, UTF-8 문서 끝부분을 직접 검사해 통과했다. 로드맵 수용이나 실기 성공으로 확대하지 않는다.
