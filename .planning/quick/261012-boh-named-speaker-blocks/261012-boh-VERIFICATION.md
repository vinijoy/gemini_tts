---
phase: quick-261012-boh
verified: 2026-10-11T23:39:56Z
status: human_needed
score: 5/5 must-haves verified
behavior_unverified: 0
overrides_applied: 0
covered_files: [.planning/REQUIREMENTS.md, .planning/codebase/STRUCTURE.md, .planning/quick/261012-boh-named-speaker-blocks/261012-boh-PLAN.md, .planning/quick/261012-boh-named-speaker-blocks/261012-boh-SUMMARY.md, .planning/ui-followup.md, src/app/components/TtsEditor.tsx, src/app/generation-order.test.tsx, src/app/page.test.tsx, src/lib/dialogue-blocks.ts, src/lib/gemini-tts.test.ts, src/lib/gemini-tts.ts, src/lib/tts-contract.ts]
covered_digest: "v1:sha256:fe70a6accb9b617dc52d09056c68db95e0b3fe7768f296aefe0eb358ae692f8c"
re_verification:
  previous_status: gaps_found
  previous_score: 3/5
  gaps_closed: ["등록 숫자 이름 우선 처리, 5c8d7a5 새 회귀 통과"]
  gaps_remaining: []
  regressions: []
human_verification:
  - test: "두 모델의 두 다화자 블록과 역순 시작을 실제 청취"
    expected: "등록 목소리·블록별 연출·순서 유지"
    why_human: "provider mock만 검증"
  - test: "새 이름 입력과 오류를 VoiceOver/NVDA로 탐색"
    expected: "레이블·순서·오류 안내·입력 보존"
    why_human: "DOM은 실제 낭독 수용을 대체하지 않음"
---
# Quick 261012-boh Verification

**Goal:** 각 입력 블록의 이름별 화자·독립 연출·요청 경계를 보존한다.
**Scope:** 재검증, 최종 `5c8d7a5`; 초기 검증 유지 후 parser 변경과 회귀 검사. override 없음. quick 별도 ROADMAP SC 없음; PLAN 5개 truths 기준.

| # | Truth | Status | Evidence |
|---|---|---|---|
| 1 | 등록 이름을 안정적인 A/B 목소리에 연결 | VERIFIED | 등록 `12:30분…`은 A/text `30분…`, 미등록이면 원문 시간 유지. 새 회귀 통과. |
| 2 | 역순 시작과 블록별 연출 보존 | VERIFIED | `gemini-tts.test.ts:33,38,67`, `page.test.tsx:253`: A/B→B/A, 원문 style, PCM 순서 assertion 통과. |
| 3 | 기본 대화는 블록당 한 요청, 여러 speaker parts | VERIFIED | `gemini-tts.ts:6,23–26`: 매 요청 두 voice configs; 실제 POST 회귀에서 요청 2회·parts·Puck/Kore 확인. |
| 4 | 이름 없는 호환 및 미등록·모호한 이름 사전 안내 | VERIFIED | 일반 본문/URL/시간, 뒤 블록 미등록·빈 발화 0회 호출, 숫자 등록 이름 우선 회귀 통과. |
| 5 | 1,000자·자원 보호·탭·취소·부분 실패 유지 | VERIFIED | 선별된 1,000자 입력, 1,400자 전체, transport/request limit, late SSE abort, 뒤 대사 실패, 탭·이름 상태 회귀 통과. |

## Artifacts, wiring and data flow

| Artifact/link | Status | Evidence |
|---|---|---|
| PLAN artifacts 4개 | Present/substantive | `query verify.artifacts`: 4/4. parser도 실제 구현. |
| TtsEditor → snapshot → POST | WIRED | `TtsEditor.tsx:17` name spread → `page.tsx:141,219` → `route.ts:4` parseTts/openPcm. |
| POST → parser → provider | WIRED | synthesize가 모든 requestGroups를 먼저 구성한 뒤 fetch; parser 결과가 실제 wire JSON으로 전달. |
| Provider → PCM → UI | FLOWING (mock) | 실제 POST를 호출하는 Home 테스트가 PCM [1,2] enqueue와 WAV Blob 확인. provider는 명시적 mock. |
| 맞춤 목소리 | WIRED | single voice Puck/voice_b/voice_b/Puck, style 앞/앞/뒤/뒤, PCM 1/2/3/4 assertion 통과. |

CLI key-link 검사 0/2는 문자열·방향 휴리스틱 한계: alias import와 route→library 호출을 실제 코드/통합 테스트로 확인했다. 런타임 수아/민재 하드코딩 없음.

## Independent behavioral checks

`npx vitest run src/lib/gemini-tts.test.ts src/app/api/tts/route.test.ts src/app/page.test.tsx src/app/generation-order.test.tsx -t 'named dialogue blocks|custom named blocks|preflights an invalid|duplicate, reserved|plain dialogue keeps|preserves continuation|stable A/B aliases|overlong speaker|1,400 dialogue|transport and planned|abort cancels a later|뒤 대사의 실패|1,000자에서|두 대화 상자|뒤 칸의 미등록|화자 이름은 선택'`

**Result:** exit 0; 26 passed, 0 failed, 95 excluded by filter. 전체198개/lint/tsc/build는 실행자 보고이며 여기서 재실행하지 않았다. 유료 호출 없음.
**Gap closure:** 초기 재현 `A.name="12", fallback B, text="12:30분 뒤에 만나자"`의 잘못된 B 결과를 `5c8d7a5`에서 수정. `npx vitest run src/lib/gemini-tts.test.ts -t 'registered numeric names|plain dialogue keeps|named dialogue blocks|custom named blocks|preflights an invalid'`: exit 0; **7 passed**, 0 failed, 28 filtered. 새 테스트는 등록/미등록 결과를 독립 literal로 확인.
**Test quality:** wire/voice/style/PCM/0-call의 독립 literal assertion; skip/todo·circular fixture 작성 없음. 숫자 이름·시간 충돌 테스트 추가 확인. PCM mock은 실제 음성 품질·모델 화자 준수 증거가 아니다.
**Anti-patterns:** 변경 runtime 파일에 미해결 TBD/FIXME/XXX·stub·예시 이름 없음. blocker 없음. **Advisory (재검증):** 없음.
**Probes:** 선언 없음. **Decision coverage:** CONTEXT 없음; PLAN D-01~D-04 대조. **Deferred:** 없음.

## Requirements coverage

| Requirement | Status | Evidence |
|---|---|---|
| TTS-03 | 이 범위 충족 | CRLF/Unicode/태그/구분 공백 literal 보존 테스트. |
| TTS-04 | 자동 범위 충족, 실청취 대기 | prebuilt/custom 순서 및 숫자 이름 우선 회귀 통과. |
| A11Y-01 | NEEDS HUMAN — WARNING | 이름 레이블·Tab/DOM·상태 보존 자동 검증; 실제 낭독 미확인. |
| TEST-01 | 이 범위 충족 | 26개 선별 회귀 통과; 전체 요구사항 체크 상태 미변경. |

## Human verification required

1. 실제 두 모델에서 각 블록에 두 이름을 넣고 둘째를 B부터 시작해 청취: 동일 목소리·블록별 연출·순서 유지 기대. provider를 호출하지 않아 미확인.
2. 새 이름 입력과 뒤 블록 오류를 VoiceOver/NVDA로 탐색: 레이블·탐색 순서·오류 안내·대본 보존 확인 필요. DOM은 실기 수용을 대체하지 않음.

첫 실제 블록이 성공한 원인은 입증하지 않았다. 차단 gap 1개 수정·재검증 완료; 실청취·스크린리더 수용은 대기다. 코드·STATE 수정/커밋 없음.
