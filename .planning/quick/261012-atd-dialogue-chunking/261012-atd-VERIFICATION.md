---
phase: quick-261012-atd
verified: 2026-10-11T23:14:21Z
status: human_needed
score: 6/6 must-haves verified
behavior_unverified: 0
overrides_applied: 0
covered_files:
  - .planning/REQUIREMENTS.md
  - .planning/quick/261012-atd-dialogue-chunking/261012-atd-PLAN.md
  - .planning/quick/261012-atd-dialogue-chunking/261012-atd-SUMMARY.md
  - .planning/ui-followup.md
  - src/app/api/tts/route.test.ts
  - src/app/api/tts/route.ts
  - src/app/components/TtsEditor.tsx
  - src/app/generation-order.test.tsx
  - src/app/page.test.tsx
  - src/app/page.tsx
  - src/lib/gemini-tts.test.ts
  - src/lib/gemini-tts.ts
  - src/lib/tts-contract.ts
  - src/utils/audio-format.ts
  - src/utils/pcm-audio.ts
  - src/utils/streaming-player.ts
covered_digest: "v1:sha256:e420b18ce61c5ff97064e44cc10fecdeb8ac65092e4d3457854c00549782fbb2"
human_verification:
  - test: "이번 변경의 실제 VoiceOver/NVDA 조작·낭독"
    expected: "두 탭, 대사별 본문·연출과 행 추가·삭제·이동에서 초점·낭독 순서와 입력이 보존된다."
    why_human: "DOM 검사는 실제 스크린리더 수용이 아니다. 기존 사용자 확인을 확대하지 않는다."
  - test: "승인된 실제 모델 호출 후 대사 경계·연출·목소리 청취"
    expected: "두 모델의 기본/맞춤 대화가 각 대사의 연출과 화자를 유지하며 자연스럽게 연결된다."
    why_human: "provider는 mock이며 실제 서비스 수용·토큰 적합성·음질은 미검증이다. 유료 호출하지 않았다."
---

# Quick 261012-atd 검증

**human_needed — 기술 계약 6/6 검증, 구현 BLOCKER 없음, 실기 WARNING 2건.**

최신 PLAN의 authoritative scope_amendment를 적용했다. 입력칸 본문·연출 각각 1,000자를 유지하고 수동 추가 대사마다 독립 요청한다. 이전 계획의 입력 제한 해제·자동 조각 편집 UI 요구는 사용자 정정으로 대체되었다. 서버 직접 장문 분할은 방어 동작이다. 이전 VERIFICATION/override는 없었다.

quick 작업의 범위만 판정하며 기존 ROADMAP 단계·REQUIREMENTS·UAT 완료를 선언하지 않는다. SUMMARY의 전체 177 tests/lint/tsc/build 주장을 독립 실행 근거로 삼지 않았다.

## Observable Truths

| # | 최종 계약 | 판정 | 직접 근거 |
|---|---|---|---|
| 1 | 합산 본문 1,000자·연출 4,000자·20턴 제한 제거, 각 입력칸 1,000자 유지 | VERIFIED | tts-contract.ts:17 이후 합산 검사 제거, TtsEditor.tsx:16 행 추가 제한 제거. 첫 본문·태그 제한, 21행 UI, 총 연출 4,620자 검사 통과. |
| 2 | 대사별 독립 요청·연출, 서버 장문 분할 시 원문 보존 | VERIFIED | gemini-tts.ts:13 requestGroups가 원래 turn마다 [turn] append. UI→실제 POST→mock provider에서 한글 본문 각 1,000자 및 서로 다른 연출 각 996자를 정확히 두 요청과 비교. Unicode/태그 재결합 검사 통과. |
| 3 | prebuilt는 두 화자 설정, custom은 해당 턴 화자의 single 설정 | VERIFIED | gemini-tts.ts:5 wireRequest가 prebuilt만 multiSpeakerVoiceConfig와 part speaker 구성; custom은 turns[0].speaker로 voice 선택. 두 모드 UI 테스트 및 custom 순차 오류 검사 통과. 공유 연출로 대체하는 경로 없음. |
| 4 | 1MiB 입력·18,000 bytes 요청·128 사전계획·32MiB PCM 보호 | VERIFIED | route의 TTS 전용 readJson 한도, synthesize가 fetch 전에 전체 requestGroups 계산. 최대 참조/한글 본문·연출 각 1,000자의 128행 허용, body/129요청 초과 fetch 0회, PCM 경계/초과 검사 통과. |
| 5 | 순차 PCM과 정상 완료 WAV, 실패·취소 후 후속 요청/완성본 방지 | VERIFIED | gemini-tts.ts:43,46,47 reader abort/순차 generator; page.tsx:243 loop 정상 종료 후 Blob. 뒤 pending reader 취소→3번째 요청 없음, 뒤 실패→Blob 없음, 브라우저 한도, 늦은 응답의 unmount 후 결과 생성 금지 검사 통과. |
| 6 | 두 탭·DOM 탐색 순서·입력 보존, 새 조각 편집 UI 없음 | VERIFIED | page 변경은 자원 안내 한 줄. TtsEditor는 안내와 행 추가 제한 변경. 탭 왕복 입력 보존·단일/대화 DOM 순서 검사 통과. 실제 스크린리더 확인은 별도 WARNING. |

취소 검증은 서버 AbortSignal·컴포넌트 해제 경로다. 새 사용자 취소 버튼 제공을 주장하지 않는다. 18,000-byte 값은 앱 정책이며 공식 토큰 적합성 보장이 아니다.

## Artifacts / Wiring / Data Flow

Native verify.artifacts는 **6/6** 통과. 실제 구현과 호출도 확인했다.

| 연결 | 상태 | 근거 |
|---|---|---|
| TtsEditor → options.turns → page snapshot | WIRED / FLOWING | 행 onChange가 해당 턴만 갱신; page.tsx:141 첫 대사만 text/stylePrompt를 대입한다. |
| page → parseTts → POST | WIRED | imports, :141 검증, :214 fetch body; 실제 POST 통합 검사. |
| route → openPcm → requestGroups → wireRequest | WIRED | route imports/calls와 synthesize의 사전계획·await upstream. |
| upstream SSE → decodeAudio → PCM | FLOWING | provider 응답을 파싱·변환하고 실제 데이터를 스트리밍한다. provider만 mock이다. |
| page PCM → assembler/player → WAV | FLOWING | :243 응답 loop, :255 enqueue, 정상 EOF 및 샘플 확인 뒤 :265 createWavBlob. 오류는 abort/close/idle 복구. |

Native verify.key-links는 **0/4**, “Target not referenced in source”를 반환했다. 실제 alias/상대 import와 호출은 위 표 및 통합 테스트로 직접 확인했다. 자동 탐지 결과를 통과로 표시하지 않았다.

## Behavioral Spot-Checks

두 명령 모두 exit 0, **총 43개 통과**. 이름 필터로 제외된 테스트는 disabled test가 아니다. 전체 suite/build를 재실행하지 않았고 유료 API 호출은 없었다.

```sh
npx vitest run src/app/page.test.tsx src/app/api/tts/route.test.ts src/lib/gemini-tts.test.ts src/app/generation-order.test.tsx -t '추가 대사는 각자|대사를 21개|본문 입력과 태그|뒤 대사의 실패|브라우저도 32MiB|abort cancels a later|later invalid group|transport and planned|128 full Korean|plans lossless|accepts 21 turns|manual turns stay|preflights oversized|단일 화자 화면|대화 목소리는 함께|기능 탭을 키보드|취소'
# PASS (28) FAIL (0) skipped (72)

npx vitest run src/app/page.test.tsx src/app/api/tts/route.test.ts -t '언마운트 후 늦게|accepts the 32MiB cumulative|normalizes sequential|custom turns use ordered'
# PASS (15) FAIL (0) skipped (65)
```

## Requirements / Test Quality / Anti-Patterns

| 요구사항 | 이번 quick 범위 판정 |
|---|---|
| TTS-02, TTS-03 | SATISFIED: style 원문·공백 및 Unicode/태그 재결합 확인. |
| TTS-04 | 기술 계약 통과, 실제 서비스/청취 NEEDS HUMAN. |
| AUDIO-01 | 이번 순차/partial 결과 보호 SATISFIED. 전체 제품 요구사항 완료 아님. |
| AUDIO-02 | 네 형식×세 rate 내부 검사 통과, 실제 모델 출력 NEEDS HUMAN. |
| SAFE-01 | 이번 입력/요청/PCM 자원 보호·abort SATISFIED. |
| A11Y-01 | DOM/키보드 통과, 실제 스크린리더 NEEDS HUMAN. |
| TEST-01 | 관련 43개 독립 실행. 전체 제품 요구사항은 PARTIAL. |

모든 PLAN requirement ID를 매핑했다. quick ID에 별도로 할당된 orphaned requirement는 없다. 공식 체크박스는 보존했다.

- 수정된 9개 코드·테스트에서 TBD/FIXME/XXX/TODO/HACK/PLACEHOLDER, disabled/todo test, fixture 쓰기 패턴 없음. 초기 빈 state는 입력/응답으로 채워지므로 stub이 아니다.
- 핵심 검사는 정확한 요청 원문·횟수, PCM [1,2], 실패 후 Blob 부재를 단언한다.
- 형식 matrix는 encodeOutput을 이용한 내부 codec 일관성 검사다. 실제 모델 parity의 독립 증명으로 확대하지 않았다.
- 연출 혼합, 예산 초과 후 호출 시작, 실패 후 partial WAV 노출을 집중 검사했다.
- CONTEXT decisions 블록이 없는 quick: decision coverage gate N/A. 최신 amendment와 직접 대조했다.
- 명시된 shell probe 없는 앱 기능 작업: probe N/A. judgment/backstop prohibition 선언 없음.
- 후속 단계로 옮겨 숨긴 구현 gap 없음. actual VoiceOver/NVDA와 모델 청취는 아래 실기 대기다.

## Human Verification Required

1. **WARNING — 실제 VoiceOver/NVDA:** 대사 추가·연출 입력·행 이동/삭제·탭 왕복·상태 안내의 초점과 낭독 순서를 확인한다. DOM 통과로 실제 수용을 대신하지 않는다.
2. **WARNING — 실제 서비스/청취:** 별도 승인 후 두 모델·기본/맞춤 대화의 화자·연출·연결 경계를 확인한다. 이번에는 유료 호출하지 않았다.

SUMMARY 마지막 coordinator notes 2건을 재열람했다(2026-10-11T23:14:21Z). 기존 단계 PLAN 부재에 따른 guard 미지원 및 quick ID에 대한 선택적 code-review 생략 기록이며 구현·검증 통과 주장을 추가하지 않았다. HEAD 230a846 유지. 현재 covered_files로 native fingerprint를 재계산했고 human_needed 판정을 유지한다. 테스트 재실행은 하지 않았다.

## Gaps Summary

최신 계약을 막는 관찰 가능한 구현 결함은 발견하지 못했다. 실기 WARNING 2건 때문에 **human_needed**다. 보고서만 작성하며 소스·STATE·요구사항·UAT를 수정하거나 커밋하지 않는다.

_Verifier: gsd-verifier. Implementation reviewed through 230a846._
