---
phase: quick-261012-boh
plan: "01"
type: execute
wave: 1
depends_on: []
files_modified: [src/lib/tts-contract.ts, src/lib/gemini-tts.ts, src/app/components/TtsEditor.tsx, src/lib/gemini-tts.test.ts, src/app/page.test.tsx, src/app/api/tts/route.test.ts, src/app/generation-order.test.tsx, .planning/codebase/STRUCTURE.md, .planning/ui-followup.md]
autonomous: true
requirements: [TTS-03, TTS-04, A11Y-01, TEST-01]
estimate: {tokens: 17000, raw_tokens: 17000, tasks: 3, confidence: low}
must_haves:
  truths:
    - "각 대사 입력 상자에 여러 화자의 대화를 넣어도 등록한 이름에 따라 동일한 A/B 목소리가 적용된다."
    - "두 번째 상자가 반대 화자부터 시작해도 이름 매핑이 바뀌지 않으며 각 상자의 연출이 그 안의 모든 발화에 보존된다."
    - "기본 목소리 대화는 원래 입력 상자별 한 요청 안에 여러 speechMetadata.speaker part를 보낸다."
    - "이름 없는 기존 대사는 선택한 화자로 읽고 알 수 없거나 모호한 이름은 유료 요청 전에 명확히 안내한다."
    - "기존 입력 1,000자·자원 보호·두 탭·취소·부분 실패 계약을 유지한다."
  artifacts:
    - {path: src/lib/tts-contract.ts, provides: "선택적인 화자 표시 이름과 안정적인 A/B 매핑 검증"}
    - {path: src/lib/gemini-tts.ts, provides: "입력 상자 안 이름별 발화 파싱과 상자별 요청 생성"}
    - {path: src/app/components/TtsEditor.tsx, provides: "두 화자의 선택적 대본 이름 설정"}
    - {path: src/lib/gemini-tts.test.ts, provides: "여러 상자·상자마다 여러 화자·다른 연출·역순 시작 회귀"}
  key_links:
    - {from: src/app/components/TtsEditor.tsx, to: src/lib/tts-contract.ts, via: "speakers[].name을 기존 stable id와 함께 입력 snapshot에 보존"}
    - {from: src/lib/gemini-tts.ts, to: src/app/api/tts/route.ts, via: "원본 turns 블록 → 이름별 parts → block별 wireRequest → 기존 순차 PCM"}
---

<objective>
입력 상자 하나를 단일 화자의 발화로 간주한 가정을 바로잡는다. 빈이가 확인한 이름은 수아=A, 민재=B지만 구현에 고정하지 않고 사용자가 두 화자의 대본 이름을 설정한다.
D-01: 상자 안의 이름별 발화를 안정적인 A/B에 연결한다. D-02: 원래 상자 경계와 각 상자의 연출을 보존한다.
D-03: 이름 없는 기존 대사·현재 1,000자 입력·두 탭·자원 보호를 유지한다. D-04: 유료 API 없이 mock으로 회귀를 검증하고 실제 청취·VoiceOver는 미확인으로 구분한다.
</objective>

<execution_context>
@/Users/vini/.codex/gsd-core/workflows/execute-plan.md
@/Users/vini/.codex/gsd-core/templates/summary.md
</execution_context>

<context>
@AGENTS.md
@.planning/codebase/STRUCTURE.md
@.planning/ui-followup.md
@src/lib/tts-contract.ts
@src/lib/gemini-tts.ts
@src/app/components/TtsEditor.tsx
@/Users/vini/.codex/references/input-and-messages.md
@/Users/vini/.codex/references/verified-execution.md
공식 근거: docs/google-gemini/speech-generation.md의 multi-speaker 절(~2468)은 각 part의 speechMetadata.speaker를 voice config의 speaker와 연결한다. 새 외부 조사·패키지 설치·API 기능 추가는 없다. 구현 전 설치된 Next.js의 route-handlers/server-and-client-components 안내를 필요한 부분만 확인한다.
실제 관찰은 “첫 상자는 두 목소리로 잘 동작했고, 두 번째 상자는 B가 둘 다 읽었다”이다. 현재 wire에 상자 전체가 외부 선택 A/B 하나로 묶인다는 구조 오류는 확인했지만 첫 상자의 실제 모델이 성공한 원인은 입증하지 못했다. 모든 상자가 실패했다고 표현하지 않는다. 기존 177개 테스트는 상자마다 단일 화자만 가정하여 실제 입력을 놓쳤다.
</context>

<tasks>
<task type="tracer" tdd="true">
<name>Task 1: 이름 설정부터 상자 안 다화자 요청까지 연결한다</name>
<files>src/lib/tts-contract.ts, src/lib/gemini-tts.ts, src/app/components/TtsEditor.tsx, src/lib/gemini-tts.test.ts, src/app/page.test.tsx</files>
<behavior>수아=A/민재=B 설정 후 첫 상자 “수아: …\n민재: …”, 두 번째 상자 “민재: …\n수아: …”를 서로 다른 연출로 제출하면 두 요청 각각 두 part를 올바른 stable id로 보낸다. 각 요청의 PCM은 원래 상자·발화 순서대로 연결된다.</behavior>
<action>
D-01/D-02에 따라 먼저 실제 POST를 호출하고 provider fetch만 mock하는 실패 회귀를 작성한다. TtsRequest의 speakers에 선택적인 name 필드를 추가한다. name 미지정·빈 값은 기존 id인 A/B로 해석하며 A/B는 항상 해당 stable id의 별칭으로 인정한다. 설정 이름은 trim/NFC로 비교하고 1~40자의 한글 포함 문자·숫자·공백·밑줄·하이픈을 허용하되 콜론·줄바꿈·제어문자는 거부한다. 두 이름의 중복과 다른 화자의 예약 A/B 별칭 충돌은 사전 오류로 처리한다. id와 provider voice config에는 표시 이름을 대입하지 않는다.
기존 두 화자 설정 영역에 “첫 번째 화자 대본 이름”, “두 번째 화자 대본 이름” 선택적 입력을 둔다. A/B 기본 지원을 짧게 설명하고 기존 DOM 순서·TabSelect·상태 보존을 따른다. 모델/목소리/모드 변경 시 이름이 소실되지 않도록 기존 spread/update 경로를 확인한다. 수아·민재는 테스트 fixture에만 쓴다.
requestGroups에서 원본 turns를 입력 블록으로 유지한 채 각 블록 안의 줄 시작 이름 선언을 parts로 파싱한다. prebuilt-dialogue에서는 해당 블록의 모든 parts를 한 요청에 넣고 모든 part에 그 블록의 style 원문과 실제 stable speaker를 적용한다. 블록끼리 합치지 않는다. 기존 예산에 들어가지 않는 다화자 블록은 유료 호출 전에 해당 블록 오류로 거부하고 조용히 내용·연출을 잘라내거나 다른 블록과 재배치하지 않는다. custom-dialogue는 파싱한 발화별 해당 화자의 single-voice 요청을 기존 순서로 실행한다. single 모드의 본문 해석은 변경하지 않는다.
</action>
<verify><automated>npm test -- src/lib/gemini-tts.test.ts src/app/page.test.tsx</automated></verify>
<done>화면 이름 설정→제출 snapshot→POST→각 wire part→PCM 연결 경로가 mock으로 검증되고 두 번째 블록의 첫 이름이 달라도 매핑은 동일하다.</done>
</task>

<task type="auto" tdd="true">
<name>Task 2: 이름 선언·이어지는 줄·오류·기존 호환을 검증한다</name>
<files>src/lib/tts-contract.ts, src/lib/gemini-tts.ts, src/lib/gemini-tts.test.ts, src/app/api/tts/route.test.ts, src/app/page.test.tsx</files>
<behavior>등록 이름/A/B의 줄 시작 콜론 선언만 화자를 바꾼다. 이어지는 줄은 직전 화자, 선언 없는 블록은 외부 선택 화자를 쓴다. 미등록 이름·중복 이름·예약 별칭 충돌·본문 없는 발화는 첫 유료 호출 전에 실패한다.</behavior>
<action>
D-01/D-02/D-03의 파서 계약을 명확히 구현한다. 줄 시작의 선택적 가로 공백 다음 이름과 ASCII/전각 콜론만 선언으로 인식한다. 문장 중간 콜론은 화자 전환이 아니다. 등록되지 않은 선언 후보는 일반 대사로 읽지 말고 블록 번호·이름과 함께 “화자 대본 이름에 등록되지 않은 이름입니다. 화자 이름 설정을 확인하세요.”라고 안내한다. 이번 사용자가 명시적으로 요청한 actionable mapping 안내를 적용한다. 한 블록의 첫 등장 순서로 이름을 추측하지 않는다.
첫 선언 전 일반 본문은 블록의 fallback speaker, 이후 줄·빈 줄은 직전 화자에 유지한다. 이름 표기와 구분 콜론 및 바로 뒤 구분 공백 한 칸만 제거하고 나머지 본문·태그·줄바꿈을 보존한다. 빈 선언 뒤 이어지는 실제 본문은 허용하고 최종 공백뿐인 발화는 사전 오류다. style은 trim·요약 없이 모든 해당 part에 복사한다.
모든 블록의 파싱·wire budget·계획 요청 수 검증을 첫 provider 호출 전에 마친다. 기존 1,000자 text/style UI, 입력 transport·요청별·전체 오디오·128회 보호, bounded retry, 취소·부분 실패 처리 계약을 유지한다. 이름 없는 기존 payload와 이름 없는 plain 블록도 테스트한다. 기존 직접 API 장문 분할은 이름 없는 경로에서 유지하며 새 다화자 블록은 원래 경계 안에서 검증한다. 두 모델·기본/맞춤 대화, 역순 시작·다른 style·미등록 이름이 뒤 블록에 있는 사례를 포함하고 잘못된 작업의 provider 호출 0회를 확인한다.
</action>
<verify><automated>npm test -- src/lib/gemini-tts.test.ts src/app/api/tts/route.test.ts src/app/page.test.tsx</automated></verify>
<done>이름 파싱이 결정적이며 뒤 블록 오류도 사전 검출된다. 기존 plain 입력·한도·취소·오류 회귀가 모두 유지된다.</done>
</task>

<task type="auto">
<name>Task 3: 화면 탐색 회귀와 잘못된 입력 가정의 예방 기록을 남긴다</name>
<files>src/app/generation-order.test.tsx, .planning/codebase/STRUCTURE.md, .planning/ui-followup.md</files>
<action>D-03/D-04에 따라 이름 필드의 접근 가능한 label·기존 두 탭·입력 보존·DOM 순서를 generation-order 회귀로 검증한다. STRUCTURE.md 정본에 “입력 블록과 발화를 동일시하지 않는다. 여러 블록 각각에 여러 이름·서로 다른 연출·반대 화자부터 시작하는 fixture로 wire metadata를 검증한다”는 재발 방지 규칙을 추가한다. ui-followup에는 첫 블록 실제 성공/둘째 실패라는 관찰, 단일 화자/상자 가정과 기존 테스트 누락, 이번 자동 검증 결과 및 이름 필드 VoiceOver·실제 청취 대기를 기록한다. 사용자 UI 선호 수용으로 확정하지 않는다. STATE·ROADMAP·과거 UAT는 수정하지 않는다.</action>
<verify><automated>npm test -- src/app/generation-order.test.tsx</automated><human-check>새 이름 입력과 오류 안내의 실제 VoiceOver 확인 및 두 블록 청취는 미실행으로 보존한다.</human-check></verify>
<done>여러 화자가 한 상자에 들어가는 실제 입력 계약과 회귀 명령이 발견 가능한 기존 정본에 남고 자동 검사와 사람 확인 범위가 분리된다.</done>
</task>
</tasks>

<threat_model>
ASVS1, high 이상 미완화 차단. 신뢰 경계: 브라우저 JSON→파서→유료 provider→PCM.
| ID | STRIDE | Severity | Disposition | Mitigation |
|---|---|---|---|---|
| T-boh-01 | Tampering | high | mitigate | stable id·이름 중복/별칭 충돌·미등록 선언 사전 거부, Task1/2 |
| T-boh-02 | Denial of Service | high | mitigate | 기존 byte/요청 수/PCM 한도·순차 실행·취소와 0-call 사전 검증, Task2 |
| T-boh-03 | Information Disclosure | medium | mitigate | raw provider 오류·키·전체 대본 로그 노출 방지 유지, Task2 |
</threat_model>

<verification>각 task 회귀 후 npm test, npm run lint, npx tsc --noEmit, npm run build, git diff --check를 각각 실행한다. 실제 유료 호출은 하지 않는다. source audit: GOAL=여러 이름이 든 각 블록의 정상 대화(Task1/2), REQ=TTS-03/TTS-04/A11Y-01/TEST-01(Task1–3), RESEARCH=저장된 multi-speaker part/speaker 계약(Task1), CONTEXT=D-01~D-04(Task1–3), 모두 COVERED. 신규 통합·DB·패키지 설치는 없다.</verification>
<success_criteria>두 블록 모두 이름에 맞는 목소리·독립 연출·원래 순서를 wire와 PCM으로 확인한다. 기존 한도/호환/두 탭을 보존하며 미등록·모호한 이름이 틀린 목소리로 조용히 합성되지 않는다.</success_criteria>
<output>실행자는 작업별 atomic commit과 261012-boh-SUMMARY.md 근거를 남긴다. 부모가 quick STATE/메타데이터를 관리한다.</output>
