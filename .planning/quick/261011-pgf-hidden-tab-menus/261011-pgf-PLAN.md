---
phase: quick-261011-pgf-hidden-tab-menus
plan: "01"
type: execute
wave: 1
depends_on: []
files_modified:
  - src/app/components/TabPanel.tsx
  - src/app/page.tsx
  - src/app/components/BatchPanel.tsx
  - src/app/components/VoiceStudio.tsx
  - src/app/components/LocaleSelect.tsx
  - src/app/components/TtsEditor.tsx
  - src/app/components/VoiceLibrary.tsx
  - src/app/page.test.tsx
  - .planning/ui-followup.md
  - .planning/codebase/ARCHITECTURE.md
  - .planning/codebase/STRUCTURE.md
  - .planning/codebase-refresh.md
  - .planning/STATE.md
autonomous: true
requirements: [A11Y-01, TEST-01]
estimate:
  tokens: 18000
  raw_tokens: 18000
  tasks: 3
  confidence: low
must_haves:
  truths:
    - "처음 화면과 세 탭의 모든 전환에서 비활성 탭 내부에 네이티브 select가 남지 않는다."
    - "활성 탭의 선택 메뉴는 기존 이름·설명·키보드 조작·선택값으로 사용할 수 있다."
    - "탭을 왕복해도 대본·제작 초안·선택값·직접 입력 모드·첨부 File·동의·일괄 항목과 작업 상태가 유지된다."
    - "탭 전환은 생성·조회 요청을 새로 보내거나 진행 중 생성·일괄 조회를 취소하지 않으며, 숨은 화면으로 초점을 가져가지 않는다."
    - "자동 회귀 결과, 실제 Safari 접근성 트리 관찰, 실제 VoiceOver 발화 확인은 별도로 기록된다."
  artifacts:
    - path: src/app/components/TabPanel.tsx
      provides: "패널 마운트 유지와 선택 요소만 조건부 제거하는 공통 경계"
    - path: src/app/page.test.tsx
      provides: "비활성 패널의 원시 DOM 검사와 입력·작업 상태 보존 회귀"
    - path: .planning/codebase/ARCHITECTURE.md
      provides: "현재 탭 생명주기와 선택 요소 렌더링 계약"
  key_links:
    - from: src/app/page.tsx
      to: src/app/components/TabPanel.tsx
      via: "activeTab에서 패널 활성 여부 전달"
    - from: src/app/components/TabPanel.tsx
      to: "VoiceStudio, BatchPanel, TtsEditor, VoiceLibrary, LocaleSelect"
      via: "활성 문맥을 읽는 TabSelect"
    - from: src/app/page.test.tsx
      to: src/app/page.tsx
      via: "Home 렌더링부터 탭 선택·DOM 관찰·상태 복원까지 실제 클라이언트 흐름"
---

<objective>
탭 묶음과 활성 탭패널 사이에서 읽히는 불필요한 메뉴 5개 문제를 고친다. 비활성 패널의 네이티브 선택 요소 자체를 DOM에서 제거하면서, 화면 컴포넌트와 나머지 입력 요소는 계속 마운트하여 초안·첨부파일·백그라운드 작업을 보존한다.

초기 음성 만들기 화면 앞에 배치된 비활성 제작 패널에는 select 4개, 일괄 패널에는 1개가 존재한다. 이 개수는 사용자 보고와 일치하지만, 현재 근거만으로 Safari 접근성 트리의 정확한 원인을 확정하지 않는다. 같은 원인이 다른 탭으로 이동한 뒤 재발하지 않도록 세 탭 전체의 선택 요소에 같은 계약을 적용한다.

Output: 공통 탭/선택 요소, 상태 보존 회귀, 현재 코드와 일치하는 GSD 맵·상태 기록. 실제 서비스 호출·음성 청취·스크린리더 수용과 기존 미완료 요구사항은 수행한 증거의 범위대로 유지한다.
</objective>

<execution_context>
@/Users/vini/.codex/gsd-core/workflows/execute-plan.md
@/Users/vini/.codex/gsd-core/templates/summary.md
@/Users/vini/.codex/references/verified-execution.md
@/Users/vini/.codex/references/input-and-messages.md
@/Users/vini/.codex/skills/vini-project-preferences/references/gsd-codebase-refresh.md
</execution_context>

<context>
@AGENTS.md
@.planning/STATE.md
@.planning/ui-followup.md
@.planning/codebase/ARCHITECTURE.md
@.planning/codebase/STRUCTURE.md
@node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-client.md
@docs/nextjs/use-client.md
@src/app/page.tsx
@src/app/page.test.tsx
@src/app/components/VoiceStudio.tsx
@src/app/components/BatchPanel.tsx
@src/app/components/LocaleSelect.tsx
@src/app/components/TtsEditor.tsx
@src/app/components/VoiceLibrary.tsx
@src/app/components/choices.test.tsx

작업 디렉터리는 /Users/vini/GitHub/gemini_tts다. 이전 UI 작업의 수정·미추적 파일을 포함한 현재 작업 트리가 정본이다. 이 quick은 문서화된 single-agent isolation degrade에 따라 기존 작업 트리에서 순차 실행한다. executor는 혼자 저장소를 소유하지 않으므로 기존 변경을 되돌리거나 함께 커밋하지 않는다.

구현 전 coordinator의 baseline을 확인하고, 없다면 기존 tracked diff·index 상태·대상 미추적 파일 원문을 저장소 밖에 보존한다. 전체 파일 git add로 이전 수정까지 섞지 않는다. 현재 HEAD에 없는 선행 변경에 의존하는 파일에서는 baseline 이후의 작업 diff를 분리하여 index 내용을 검토한다. 작업 diff만 독립 커밋하면 파일이 깨지는 경우 이전 변경을 몰래 포함하지 말고 그 한계를 coordinator에게 정확히 반환한다. 외부 전송·push·배포·main 병합은 이 quick의 작업이 아니다.

Discovery level 0: React 문맥·조건부 렌더링과 기존 제어형 입력 패턴을 사용한다. 설치된 Next.js 16.2.12의 use-client 문서를 확인했고 같은 원문은 docs/nextjs/use-client.md에 있다. 새 패키지 설치·서버 계약·데이터베이스 변경은 없다. estimate-calibration은 factor 1, sample_count 0, confidence low를 반환했다.
</context>

<tasks>

<task type="tracer" tdd="true">
  <name>Task 1: 일괄 탭의 선택 요소를 제거하면서 패널 상태를 보존하는 경로 연결</name>
  <files>src/app/components/TabPanel.tsx, src/app/page.tsx, src/app/components/BatchPanel.tsx, src/app/page.test.tsx</files>
  <read_first>src/app/page.tsx의 activeTab·탭 키보드 처리·panel-studio/panel-batch/panel-generate, BatchPanel.tsx의 submission 상태와 mounted/poll 정리, page.test.tsx의 fetch/stream fixture를 읽는다.</read_first>
  <behavior>
    - 초기 Home의 숨은 panel-batch에는 원시 DOM으로 조회한 select가 없어야 한다. 기존 구현에서 이 검사가 먼저 실패해야 한다.
    - 일괄 탭을 열면 입력 제출 방식이 나타나고, file 선택·작업 표시 이름 수정·대본 담기 후 다른 탭을 거쳐 돌아와도 값과 항목이 유지된다.
    - 탭만 전환한 동안 fetch는 호출되지 않는다. 기존 tab ID 연결·단일 tabIndex=0·방향키 순환·Home/End 동작이 유지된다.
  </behavior>
  <action>
    회귀부터 작성하고 기존 구현에서 실패를 확인한다. 공통 TabPanel과 TabSelect를 한 파일에 만든다. TabPanel은 active boolean과 기존 div 속성을 받아 role, id, aria-labelledby, tabIndex, className 및 hidden/inert 의미를 유지하며 children과 상태 소유 컴포넌트를 항상 마운트한다. 활성 여부를 React 문맥으로 전달한다. TabSelect는 표준 select 속성·children을 그대로 받으며 활성 문맥일 때만 실제 select를 렌더링하고 비활성일 때 null을 반환한다. 문맥 밖에서는 활성으로 동작하여 독립 컴포넌트 사용과 기존 테스트를 유지한다. 제어값이나 요청 상태를 TabSelect 내부로 옮기지 않는다.

    Home의 세 패널 div를 이 경계로 바꾸고 activeTab을 연결한다. Home의 음성 선택과 BatchPanel의 제출 방식 select에 TabSelect를 적용한다. 나머지 선택 요소는 Task 2에서 같은 계약으로 확장한다. 숨은 콘텐츠 전체를 언마운트하거나 key를 바꾸지 않는다. 생성기·일괄 컴포넌트의 effect 정리나 타이머 실행을 탭 활성 여부에 묶지 않는다. 이번 경로의 주석에는 상태 소유자 유지와 선택 요소 제거 이유를 한국어로 명시한다.
  </action>
  <verify>
    <automated>npm test -- src/app/page.test.tsx src/app/components/choices.test.tsx</automated>
  </verify>
  <done>Home에서 비활성 일괄 패널의 select 부재가 검증되고, 다시 연 일괄 화면의 제출 방식·이름·담긴 대본이 유지된다. 테스트의 최초 실패와 수정 후 통과가 기록된다.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: 모든 숨은 선택 메뉴와 입력·업로드·비동기 상태 보존 회귀 완성</name>
  <files>src/app/components/VoiceStudio.tsx, src/app/components/LocaleSelect.tsx, src/app/components/TtsEditor.tsx, src/app/components/VoiceLibrary.tsx, src/app/page.test.tsx</files>
  <read_first>VoiceStudio의 File/source/consent/checks와 act의 finally 초점 복원, LocaleSelect의 custom 상태, VoiceLibrary의 defaultValue 기본 목소리와 검색 열림/필터/조회 초점 복원, TtsEditor의 동적 화자·발화 선택을 확인한다.</read_first>
  <behavior>
    - Home 초기 상태의 panel-studio와 panel-batch뿐 아니라 각 탭 전환 후 모든 숨은 tabpanel에서 querySelectorAll('select').length가 0이다. role 기반 가시성 필터로 대체하지 않는다.
    - 제작 방식·모델·언어·성별, 합성 설정과 기본 목소리 선택, 열린 검색의 출처·종류·필터를 변경한 뒤 왕복해도 같은 값이다. 직접 입력을 골랐지만 아직 빈 문자열인 상태도 유지된다.
    - 복제 방식의 두 file input에 File을 첨부하고 동의를 선택한 뒤 왕복해도 같은 input 노드·files와 동의 상태가 유지된다.
    - 진행 중 생성/조회가 탭 전환 때문에 취소되거나 중복 요청되지 않으며, 비활성 상태에서 응답이 완료되어도 결과·작업 식별자와 상태가 복원된다. 숨은 버튼이 활성 탭의 초점을 빼앗지 않는다.
    - 비활성 일괄 패널에서도 기존 30초 polling은 유지되고 종료 상태에서는 멈춘다. 닫힌 details의 검색 select 부재 회귀도 유지된다.
  </behavior>
  <action>
    Task 1의 TabSelect를 제작 직접 선택 3곳, LocaleSelect 내부 선택, TtsEditor의 정적·동적 선택, VoiceLibrary의 모든 선택에 적용한다. LocaleSelect 자체와 custom 상태는 유지하여 빈 직접 입력 모드도 잃지 않게 한다. VoiceLibrary의 공식 기본 목소리는 현재 defaultValue에만 맡긴 선택 상태가 있으므로, 별도 제어형 기본 선택값을 상위 VoiceLibrary 상태에 보존하고 동일한 선택 콜백 동작을 유지한다. 기본 목록에 없는 확장/저장 목소리의 선택 상태를 이 기본 목록 값에 잘못 강제하지 않는다. 닫힌 details 검색 폼의 조건부 렌더링과 기존 필터 보존은 유지한다. 레이블·도움말 연결·disabled·목록 값·한국어 표시는 보존한다.

    Home 통합 회귀에서 모든 숨은 패널의 실제 select 노드를 검사한다. 한/두 화자와 추가 발화, 검색 details가 열린 상태에서도 탭을 전환하여 중첩된 선택을 빠뜨리지 않는다. 활성 패널에서는 올바른 선택지가 남고 선택이 실제 상태에 반영되는 양성 검사도 한다.

    첨부파일은 userEvent.upload와 같은 File 객체·DOM 노드 검증으로 보존을 확인한다. 실제 파일 전송이나 유료 생성을 실행하지 않는다. mock Promise/stream과 fake timer를 이용해 생성 스트림·제작 또는 목록 응답·일괄 polling의 탭 왕복 경계를 검사하고, 현재 테스트 fixture의 stream 정리·timer 복구 규칙을 지킨다. 비동기 완료가 숨은 버튼으로 focus를 옮기는 것이 드러나면 VoiceStudio/VoiceLibrary에서 완료 시점의 실제 패널 가시성을 확인하고 활성일 때만 기존 초점 복원을 수행한다. 요청 시작 시점의 활성 prop을 클로저로 캡처해 판단하지 않는다. 백그라운드 상태 알림은 기존 패널 밖 status 영역을 계속 사용한다.
  </action>
  <verify>
    <automated>npm test -- src/app/page.test.tsx src/app/components/choices.test.tsx</automated>
    <human-check>로컬 앱에서 Safari로 최초 음성 만들기 진입 → 제작·관리 → 일괄 작업 → 음성 만들기 왕복을 확인한다. 접근 가능한 macOS/Safari AX 도구가 있으면 탭 묶음에서 활성 패널까지 노출되는 AX 메뉴/팝업 요소를 전후 비교하고 실제 관찰만 기록한다. Safari AX 확인이 불가능하면 도구 제한을 남긴다. DOM 또는 AX 결과만으로 실제 VoiceOver 발화를 확인했다고 쓰지 않는다. 사용자의 실제 발화 확인 전까지 해당 수용은 열린 상태다.</human-check>
  </verify>
  <done>모든 비활성 패널에 native select가 없고 활성 선택·파일·초안·일괄 상태·백그라운드 동작 보존 회귀가 통과한다. 직접 관찰한 Safari 결과와 미확인 발화 범위가 구분된다.</done>
</task>

<task type="auto">
  <name>Task 3: 전체 검사와 GSD 문서 동기화, 기존 변경 보존 검증</name>
  <files>.planning/ui-followup.md, .planning/codebase/ARCHITECTURE.md, .planning/codebase/STRUCTURE.md, .planning/codebase-refresh.md, .planning/STATE.md</files>
  <action>
    수정 후 npm test, npm run lint, npx tsc --noEmit를 각각 새로 실행하고 각 종료 코드·테스트 개수·실패 원인을 확인한다. 과거 137 tests 결과를 이번 성공 근거로 재사용하지 않는다. 실제 서비스 호출을 시작하는 명령은 실행하지 않는다. 실패하면 원인을 해결하고 관련 검사를 다시 수행한 뒤 결과를 기록한다.

    새 공통 컴포넌트와 비활성 선택 렌더링 계약이 기존 맵의 구조·생명주기 설명에 영향을 주므로 gsd-codebase-refresh 참조에 따라 최소 arch 범위로 한 번 갱신한다. 정해진 순차 실행과 single-agent isolation degrade를 유지하고, ARCHITECTURE.md·STRUCTURE.md의 해당 절만 Update 방식으로 반영한다. 상태 소유 컴포넌트/파일 input은 마운트 유지, 네이티브 선택 요소는 비활성일 때 제거, LocaleSelect custom과 기본 선택값은 상태로 유지하는 차이를 명확히 기록한다.

    ui-followup.md에는 사용자 보고·DOM에서 확인한 4+1 근거·수정 계약·이번 자동 검사 결과·Safari AX 관찰·실제 발화 미확인을 분리한다. codebase-refresh.md의 해당 문서 기준과 이번 대상 미커밋 파일 해시를 갱신한다. STATE.md에는 이 quick의 진행/결과를 반영하되 기존 Phase 1 위치, 전체 단계/요구사항 미완료, 실제 서비스·청취·VoiceOver/NVDA·Remix/webhook의 열린 항목을 보존한다. 기존 성공 이력을 이번 작업으로 소급하지 않는다.

    coordinator의 baseline과 최종 파일을 대조하고 이번 작업 외 내용 보존을 확인한다. 커밋은 실행 workflow의 권한 범위 안에서 이번 diff만 분리하여 처리하고 실제 staged diff를 검사한다. 관련 없는 수정/미추적 파일과 이미 있던 문서를 묶지 않는다. 독립 커밋이 선행 미커밋 구현 없이는 성립하지 않는다면 사실을 summary와 coordinator에게 반환하여 기존 변경 포함을 자동 승인으로 간주하지 않는다.
  </action>
  <verify>
    <automated>npm test; npm run lint; npx tsc --noEmit — 세 명령을 별도 호출하고 각각 exit 0인지 확인한다. git diff --check로 서식 오류도 확인한다.</automated>
  </verify>
  <done>이번 변경의 전체 테스트·lint·타입 검사가 통과하고 GSD 맵이 실제 코드와 일치한다. 자동 결과와 실기 미확인이 구분되며 기존 미완료 항목·사용자 변경 보존 근거와 실제 커밋 여부가 summary에 남는다.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
| --- | --- |
| 탭 UI → 로컬 초안·파일·작업 수명 | 선택 요소 제거가 상태 소유자를 없애거나 요청 취소로 이어지지 않아야 한다. |
| 숨은 콘텐츠 → 키보드·접근성 트리 | 숨은 선택과 비동기 초점 복원이 활성 화면 조작을 방해할 수 있다. |
| 검증 환경 → 유료 원격 동작 | 회귀 검사는 mock을 사용하고 탭 전환만으로 요청을 만들지 않는다. |

## STRIDE Threat Register

| Threat ID | Category | Component | Severity | Disposition | Mitigation Plan |
| --- | --- | --- | --- | --- | --- |
| T-pgf-01 | Tampering | TabPanel/TabSelect 생명주기 | medium | mitigate | 부모 상태와 file input 유지, 제어형 선택 복원, 동일 File·노드 검사 |
| T-pgf-02 | Denial of Service | 숨은 선택·초점·polling | medium | mitigate | 비활성 select 제거, 완료 시 가시성 검사, 탭 전환 중 요청·타이머 보존 회귀 |
| T-pgf-03 | Information Disclosure | 테스트·실기 기록 | low | mitigate | 키·실제 녹음 내용을 기록하지 않고 mock 데이터 및 메뉴 이름/개수만 증거로 남김 |

ASVS level 1, high 이상 차단 기준을 적용한다. 패키지 설치가 없어 공급망 설치 gate는 적용 대상이 아니다.
</threat_model>

<source_audit>
| SOURCE | ID | 항목 | Task | Status |
| --- | --- | --- | --- | --- |
| GOAL | quick-261011-pgf | 탭 그룹 뒤 불필요한 5개 메뉴 제거 | 1, 2 | COVERED |
| REQ | A11Y-01 | 이번 탭 변경의 선택·초점·레이블과 실기 구분 | 1, 2, 3 | COVERED — 요구사항 전체 수용은 별도 |
| REQ | TEST-01 | 상태·오류 없는 전환·진행 작업 보존과 전체 회귀 | 1, 2, 3 | COVERED — 기존 열린 서비스 수용 보존 |
| RESEARCH | 없음 | 전용 RESEARCH.md 없음; 현 소스와 설치 Next 문서로 내부 패턴 확인 | 1, 2 | COVERED |
| CONTEXT | 현 사용자 요청·ui-followup | 세 탭, 입력·선택·파일·작업 상태, 검색 필터 유지 | 1, 2 | COVERED |
| CONTEXT | 전달 조건 | 기존 변경 보존·순차 실행·맵 동기화·정확한 실기 보고 | 3 | COVERED |

이 quick에 정식 CONTEXT.md/D-NN 결정은 없다. 다른 단계의 전체 기능을 이번 국소 수정의 완료 범위로 확대하지 않는다. 새 외부 연동과 schema 변경은 없다. assumption-delta detector는 quick ID를 정식 phase로 해석하지 못해 skipped/phase_unresolved를 반환했으며, 음성 기능의 identity 변경 없음이라는 탐지 성공으로 기록하지 않는다.
</source_audit>

<verification>
Task 1은 숨은 Batch 선택을 겨냥한 실패→통과, Task 2는 모든 비활성 패널 선택 부재와 보존 계약, Task 3은 전체 회귀·문서·변경 보존을 확인한다. 검증 명령은 package.json과 .planning/ui-followup.md의 실제 기존 실행 명령에 근거한다.

Safari AX 관찰은 가능할 때 수행하여 브라우저와 검사 범위를 기록한다. 실제 VoiceOver 발화·NVDA·유료 생성 성공·한국어 음질은 자동 검사로 승인하지 않는다. 필요한 도구/기기가 없으면 구체적인 미확인 항목을 summary에 남긴다.
</verification>

<success_criteria>
- 초기 5개 및 다른 탭의 숨은 native select가 원시 DOM에 남지 않고 활성 선택은 조작된다.
- 탭 왕복 후 초안·선택·직접 입력 모드·File·동의·목록·작업이 보존되며 백그라운드 처리와 초점이 안정적이다.
- 새 테스트를 포함한 전체 검사, lint, 타입 검사가 통과한다.
- 맵·상태·summary는 이번 실행 근거와 실기 미확인, 기존 열린 범위를 정확히 구분한다.
- 기존 사용자 변경이 보존되고 이번 작업 외 수정이 커밋에 섞이지 않는다.
</success_criteria>

<output>
실행 후 .planning/quick/261011-pgf-hidden-tab-menus/261011-pgf-SUMMARY.md를 만든다. 최초 실패와 수정 후 검증, 전체 검사 개수/종료 코드, Safari/VoiceOver 확인 수준, 기존 변경 보존·커밋 상태, GSD 맵 갱신 범위를 기록한다.
</output>
