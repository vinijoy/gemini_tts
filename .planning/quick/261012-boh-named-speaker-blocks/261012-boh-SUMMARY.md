---
phase: quick-261012-boh
plan: "01"
status: complete
subsystem: tts
tags: [dialogue, speaker-mapping, streaming]
requires: []
provides: [블록 내부 이름별 화자 연결, 블록별 연출과 설정 목소리 보존]
affects: [TTS, generation-ui]
tech-stack: {added: [], patterns: [입력 블록과 발화 분리]}
key-files:
  created: [src/lib/dialogue-blocks.ts]
  modified: [src/lib/tts-contract.ts, src/lib/gemini-tts.ts, src/app/components/TtsEditor.tsx, src/lib/gemini-tts.test.ts, src/app/page.test.tsx, src/app/generation-order.test.tsx, .planning/codebase/STRUCTURE.md, .planning/ui-followup.md]
key-decisions:
  - "표시 이름은 사용자 설정이며 A/B별칭은 항상 유지한다. 예시 이름을 하드코딩하지 않는다."
  - "기본 두 화자는 매 블록에 두 voice configs와 이름별 speaker parts를 보낸다."
  - "맞춤 대화는 각 발화에 대응하는 single voice 요청으로 순차 생성한다."
requirements-completed: []
plan_head_before: 2f099f672cc6dc64bae6b840bfb76c3801abc323
actuals: {tokens: 8368, tasks: 3, commits: 6}
duration: 10min
completed: 2026-10-12
---
# Quick 261012-boh: 대화 블록 안의 이름별 화자 연결
**한 칸 안에 여러 화자가 있어도 등록한 이름→A/B 연결을 유지하고, 각 칸의 연출을 해당 발화마다 보존한다.**

## 구현과 사용
- 두 화자 모드의 모델/화자 영역에서 ‘첫 번째 화자 대본 이름’과 ‘두 번째 화자 대본 이름’을 입력한다. 이름은 선택 사항이며 A/B도 항상 쓸 수 있다.
- 기본 대화는 블록 하나의 여러 발화를 하나의 요청 안에 여러 parts로 보낸다. 블록 시작 화자와 관계없이 설정된 두 voice configs를 매번 보낸다.
- 맞춤 대화는 각 발화에 맞는 single voice로 순차 요청한다. 이름 없는 본문은 외부 선택 화자, 선언 이후 이어지는 줄은 직전 화자로 읽는다.
- 이름 trim/NFC 비교, 중복·예약별칭 충돌·미등록 이름·빈 발화 사전 검증을 추가했다. 원문 본문/CRLF/태그/연출은 보존하며 이름 선언과 바로 뒤 구분 공백 한 칸만 제거한다.
- 기존 본문/연출1000자,1MiB/128회/18,000-byte 요청/32MiB PCM 보호 및 취소·재시도 정책을 유지했다.

## 커밋과 검증
- Task1 RED `0fe5a83`, GREEN `8541beb`: 실제 POST와 Home→POST→provider mock으로 두 칸 각각 A/B·B/A,별도 연출·PCM/WAV를 확인했다. 관련54 tests 통과.
- Task2 RED `f3a337c`, GREEN `4541afe`: 이름/별칭/CRLF/Unicode/URL/시간/미등록 뒤 칸0호출/custom순서. 관련115 tests 통과.
- Task3 `24afbbf`: 이름필드 DOM/Tab·모델/모드/탭왕복·오류입력보존 및 재발 방지 기록. 관련43 tests 통과.
- 최종 `npm test`:18파일198 tests 통과. `npm run lint`, `npx tsc --noEmit`, `npm run build`, `git diff --check` 모두 통과.
- 검증 후 보완 `5c8d7a5`: 등록된 숫자 이름이 시간 표기보다 우선하도록 수정했다. `12` 등록 시A, 미등록 시기존fallback 회귀 RED→GREEN. 수정 후 관련117 tests·lint·tsc·diff 통과. 전체198 tests/build는 이 보완 전 결과이며 build 재실행은 하지 않았다.
- 기존 실제 첫 칸이 두 목소리로 성공한 이유는 확인되지 않았다. 기존에도 두 voice configs는 있었으며 새 회귀는 블록 전체에 하나의 speaker를 강제하던 구조 오류를 재현했다.

## 조정과 예방
- `[Rule 3]` 파서를 `src/lib/dialogue-blocks.ts`로 분리해 입력 해석과 provider/stream 책임을 분리했다. API route 변경은 필요하지 않아 기존 경로를 그대로 검사했다.
- 기존177개 회귀가 입력칸=단일발화로 가정한 누락을 수정했다. STRUCTURE.md에 ‘블록≠발화,두 블록 모두 다화자·역순시작·다른 연출’ fixture와 회귀 명령을 추가하고 기존 AGENTS.md 진입 링크를 재사용했다.
- TDD RED는 실제 assertion 실패였으며 TAP-flat의 실제 레코드로 summary counts를 보완하여 GSD `RED_EVIDENCE_OK`를 확인했다.
- 새 endpoint/auth/저장소/패키지 없음. 미구현 stub·추가 위협 표면 없음. 이름은 예시값에 고정하지 않았다.

## 남은 확인
- 실제 유료 API·양 모델 음성 청취·새 이름 입력/오류 안내 VoiceOver/NVDA는 미수행이다. DOM 자동검사를 실기 수용으로 확대하지 않는다.
- ui-followup에 최초 관찰·잘못된 가정·해결·실기대기를 기록했다. 기존 VoiceOver 수용/UAT·ROADMAP/REQUIREMENTS/STATE는 변경하지 않았다.
- push·main병합·배포 없음. quick 메타데이터 커밋/STATE/독립 verifier는 coordinator가 담당한다.

## Self-Check: PASSED
신규 파서와 수정 파일·SUMMARY의 존재,6개 커밋 및 ledger base를 확인했다. actuals는 base..HEAD diff chars/4와 rev-list 측정값이다. 남은 untracked는 coordinator 소유 quick 문서다.
