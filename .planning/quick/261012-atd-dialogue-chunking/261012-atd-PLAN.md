---
phase: quick-261012-atd
plan: "01"
type: execute
wave: 1
depends_on: []
files_modified:
  - src/lib/tts-contract.ts
  - src/lib/gemini-tts.ts
  - src/lib/gemini-tts.test.ts
  - src/app/components/TtsEditor.tsx
  - src/app/generation-order.test.tsx
  - src/app/page.tsx
  - src/app/page.test.tsx
  - src/app/api/tts/route.test.ts
  - .planning/codebase/STRUCTURE.md
  - .planning/ui-followup.md
autonomous: true
requirements: [TTS-02, TTS-03, TTS-04, AUDIO-01, AUDIO-02, SAFE-01, A11Y-01, TEST-01]
estimate:
  tokens: 26000
  raw_tokens: 26000
  tasks: 3
  confidence: low
must_haves:
  truths:
    - "대사를 추가해 전체 대본이 1,000자를 넘거나 전체 연출이 4,000자를 넘거나 대사가 20개를 넘어도 실제 작업 용량 안에서는 생성할 수 있다."
    - "긴 개별 대사도 자동으로 나뉘며 원문 순서·공백·태그·화자·각 대사의 연출은 조각마다 그대로 보존된다."
    - "기본 목소리 대화는 두 화자 설정을 유지하고 맞춤 목소리 대화는 해당 화자별 순차 요청으로 생성한다."
    - "요청별 예산과 작업 전체 자원 한도가 구분되며 모든 사전 검증은 유료 호출 전에 끝난다."
    - "정상 종료한 전체 음성만 완성본으로 재생·저장할 수 있고 취소·중간 실패·용량 초과 후 다음 요청은 시작하지 않는다."
    - "음성 만들기와 목소리 제작·관리 두 탭, 기존 DOM 탐색 순서와 입력 보존이 유지된다."
  artifacts:
    - path: src/lib/tts-contract.ts
      provides: "분할 가능한 작업 입력 검증과 공유 자원 한도"
    - path: src/lib/gemini-tts.ts
      provides: "연출을 보존하는 요청별 분할·순차 생성·중단"
    - path: src/app/components/TtsEditor.tsx
      provides: "추가 대사의 장문 입력과 자동 분할 안내"
    - path: src/app/page.tsx
      provides: "첫 대사의 장문 입력과 유효한 작업 제출·결과 처리"
    - path: src/lib/gemini-tts.test.ts
      provides: "분할 원문 보존·요청 예산·실제 POST 경로 mock 회귀"
    - path: src/app/page.test.tsx
      provides: "화면 제출부터 완성 음성까지의 mock 회귀"
  key_links:
    - from: src/app/page.tsx
      to: src/lib/tts-contract.ts
      via: "입력 snapshot을 parseTts로 검증하고 /api/tts에 제출"
    - from: src/app/api/tts/route.ts
      to: src/lib/gemini-tts.ts
      via: "readJson → parseTts → openPcm → requestGroups → wireRequest"
    - from: src/lib/gemini-tts.ts
      to: src/utils/audio-format.ts
      via: "각 응답을 같은 sampleRate의 PCM16으로 변환하고 누적 32MiB 검증"
    - from: src/app/page.tsx
      to: src/utils/streaming-player.ts
      via: "하나의 PCM 스트림을 순서대로 재생하고 정상 EOF 뒤에만 완성본 생성"
---

<scope_amendment authoritative="true" date="2026-10-12">
실행 중 사용자 정정에 따른 최종 범위다. 아래 최초 계획과 충돌하는 설명은 이 절을 우선한다. 원래 계획은 변경 근거 보존용이며 구현·검증 완료 판단은 이 최종 계약을 적용한다.

- 최종 사용자 설명: “한 대사 입력 글자수 제한이 코딩되어 있어서 초과될 일은 없어. 내가 직접 대사 란을 늘려서 보내는 경우는 있지만.”
- 기존 첫/추가 본문·연출 입력칸 각각1,000자 제한과 태그 추가 제한을 유지한다. 자동 조각 편집 화면이나 추가 생성 확인 단계를 만들지 않는다.
- 직접 추가한 각 대사는 자신의 화자·연출을 가진 별도 요청으로 순차 생성한다. 서로 다른 원래 대사를 같은 요청으로 묶지 않는다. 전체 본문1,000자·연출4,000자·20턴 제한은 제거한다.
- 서버 직접 장문 API만 방어적으로 원문·grapheme·태그를 보존해 분할한다. 서버 연출은 대사당1,000자까지이며 공백을 포함해 원문 그대로 보낸다.
- 정상 UI 한글 본문/연출 각1,000자와 최대 두 목소리 참조4096자가 한 요청에 들어가도록 요청 예산을18,000 UTF-8 bytes로 둔다. 이는 앱 정책이며 공식 토큰 적합성 보장이 아니다.
- TTS route의 raw body와 정규화 입력 한도는1MiB로 상향한다.128개 정상 UI 최대입력이 들어감을 검사한다. 다른 API는 기존 운송 한도를 유지한다.128회 사전계획·32MiB PCM·120초timeout·기존 조건부 재시도는 유지한다.
- Task1의 핵심은 각 대사별 순차 요청·독립 연출이다. Task2는 기존입력 제한 유지+실제 화면→POST→mock provider→완성WAV 검사다. Task3의 취소·후속실패·오디오 보호는 원래대로 수행한다.
- 실제 VoiceOver·NVDA·유료 API·두 모델의 음성 경계/연출 일관성 청취는 대기다. ROADMAP/REQUIREMENTS/단계/UAT는 변경하지 않는다. coordinator가 quick STATE와 최소 코드베이스 맵을 관리한다.
- 수정 파일에 src/app/api/tts/route.ts를 추가한다. src/lib/tts-chunks.ts 임시 추출안은 폐기하며 최종 산출물에 포함하지 않는다.
</scope_amendment>

<objective>
대사 추가와 긴 단일 대본이 전체 글자 수 제한에 막히는 문제를 고친다. 기존 생성 화면에서 긴 대본을 요청별로 자동 분할하고, 각 조각에 원래 화자와 연출을 그대로 적용하여 순서대로 듣고 하나의 완성 음성으로 저장한다.

이번 사용자 결정:
- D-01: 전체 대본 길이 때문에 대사 추가가 막히지 않도록 자동 분할을 제공한다. 긴 개별 대사도 포함한다.
- D-02: 대사별 연출은 요약·잘라내기·별도 분할 없이 각 조각에 원문 그대로 반복한다.
- D-03: 기존 두 탭을 유지한다. 제거한 일괄 작업 기능을 복원하지 않는다.
- D-04: 요청을 순차 실행하고 오디오를 연결한다. 취소·부분 실패·실제 자원 한도는 정확히 처리한다.
- D-05: 유료 API 호출은 실행하지 않는다. mock 자동 검사와 청취·VoiceOver 실기는 구분한다.
</objective>

<execution_context>
@/Users/vini/.codex/gsd-core/workflows/execute-plan.md
@/Users/vini/.codex/gsd-core/templates/summary.md
</execution_context>

<context>
@AGENTS.md
@.planning/PROJECT.md
@.planning/STATE.md
@.planning/codebase/STRUCTURE.md
@.planning/ui-followup.md
@/Users/vini/.codex/references/input-and-messages.md
@/Users/vini/.codex/references/verified-execution.md
@src/lib/tts-contract.ts
@src/lib/gemini-tts.ts
@src/lib/gemini-client.ts
@src/utils/audio-format.ts
@src/utils/pcm-audio.ts
@src/utils/streaming-player.ts
@src/app/api/tts/route.ts
@src/app/components/TtsEditor.tsx
@src/app/page.tsx

구현 전에 설치된 Next.js 안내 node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md와 05-server-and-client-components.md를 필요한 범위만 읽는다. 패키지 추가·외부 API 범위 확장은 없다. Discovery Level 0: 기존 REST/ReadableStream/React/Vitest 패턴과 저장된 공식 자료를 사용한다.

이력 근거:
- 7020a66은 문장 경계 분할기, 1fa0487은 분할 후 순차 요청과 동일 stylePrompt 적용, 4ae0ea6은 300자 조각을 도입했다.
- 117ee00은 자동 분할·순차 결합을 제거하고 본문 UI/API 1,000자 제한을 도입했다. 당시 설계 docs/superpowers/specs/2026-07-30-single-request-tts-design.md는 조각마다 언어·연기 해석이 달라진 경험을 이유로 든다. 새 사용자 요청에 따라 자동 분할을 다시 제공하되 경계 음질·연기 일관성은 실제 청취로만 수용한다.
- 4799056은 현재 3.8 parseTts와 전체 대본 1,000자·전체 연출 4,000자·20턴 제한을 추가했다.
- 따라서 사용자가 경험한 과거 자동 분할은 실재한다. Batch 삭제 커밋 8319faf 자체가 이 기능을 제거했다고 확정하지 않는다. 과거 splitter의 trim/trimStart는 현재 원문 보존 계약에 맞지 않으므로 그대로 복사하지 않는다.

공식 자료 근거:
- docs/google-gemini/gemini-3.8-flash-tts.md:2820-2828 및 Flash-Lite 대응 표: 입력 8,192 tokens, 출력 16,384 tokens. 1,000자는 공식 전체 대본 제한이 아니다.
- docs/google-gemini/gemini-3.8-flash-lite-tts.md:2748-2770: 각 part의 speechMetadata.style, 다화자 speaker, 본문 안의 발성·휴지 태그. 문장형 연출을 읽을 대본에 덧붙이지 않는다.
</context>

<budget_contract>
앱 요청별 예산과 작업 전체 보호를 명확히 구분한다. 숫자를 다른 전체 글자 제한으로 옮기지 않는다.

1. 입력 작업: 기존 readJson의 65,536 UTF-8 bytes 한도를 유지한다. parseTts에서도 정규화된 TtsRequest의 JSON byte 크기를 같은 상수로 검증하여 직접 호출과 UI 검증을 일치시킨다. 두 화자 상한·유효 모델·목소리 참조·화자 등록·비어 있는 대사 검증은 유지한다. 기존 전체 글자 합계와 20턴 상한은 제거한다. 개별 text/style의 길이 보호는 이 transport 한도와 아래 요청 예산으로 대체한다.
2. provider 요청: 요청 하나의 모든 본문 합계를 최대 1,000 Unicode code points로 두고 실제 wireRequest JSON 전체를 최대 6,000 UTF-8 bytes로 둔다. 두 수치는 보수적 앱 분할 정책이며 공식 토큰 계산이나 8,192-token 적합성 보증이 아니다. text뿐 아니라 반복 style, speaker, 목소리 참조와 설정의 직렬화 비용까지 실제로 계산한다.
3. 연출·설정 자체가 한 요청에 최소 한 본문 단위와 함께 들어가지 않으면, 유료 호출 전에 해당 대사 번호 또는 목소리 설정을 지목하는 한국어 입력 오류를 반환한다. 1,000자를 넘는 style도 6,000-byte 요청에 본문과 함께 들어가면 보존하여 허용한다. 4,096자 목소리 참조 한 개와 두 개의 경계 사례를 검사하며 음수·0 본문 예산, 무한 반복, style 잘림을 금지한다.
4. 작업당 계획된 provider 요청은 최대 128개다. 짧은 맞춤 대사가 각각 별도 유료 호출이 되는 비용·서버 점유 폭증을 차단하기 위한 작업 보호다. 모두 계획한 뒤 이 상한을 먼저 검증한다. provider 재시도는 기존 최대 1회와 기존 조건을 유지한다.
5. 누적 디코딩 PCM은 기존 32MiB를 유지한다. 24kHz 모노 PCM16 기준 약 11분 39초이며 16kHz/8kHz는 각각 약 17분 29초/34분 57초다. 입력 길이만으로 실제 출력 길이를 보장하지 않는다. 서버·클라이언트 양쪽 한도를 유지하고 초과 시 생성과 재생을 중단하며 완성 결과를 만들지 않는다. 클라이언트 PCM 저장, Float32 재생 버퍼, 완성 WAV 복사 때문에 실제 메모리는 PCM보다 크다. 한도를 늘리거나 전체 오디오를 서버에서 추가로 모으지 않는다.
6. 요청별 120초 timeout과 제한된 재시도를 유지한다. 무제한 병렬 큐, 새 저장 서비스, 다운로드 구조 개편을 추가하지 않는다.
</budget_contract>

<tasks>

<task type="tracer" tdd="true">
  <name>Task 1: 두 화자 대사를 실제 생성 경로에서 자동 분할해 연결한다</name>
  <files>src/lib/tts-contract.ts, src/lib/gemini-tts.ts, src/app/components/TtsEditor.tsx, src/lib/gemini-tts.test.ts, src/app/generation-order.test.tsx</files>
  <behavior>
    - 각각 700자인 A/B 대사는 전체 1,400자여도 POST에서 통과하며 순서대로 최소 두 번 생성하고 fixture PCM을 정확히 연결한다.
    - 두 모델 및 prebuilt-dialogue/custom-dialogue에서 각 조각의 text를 원래 대사별로 연결하면 원문과 완전히 같다. style과 speaker는 해당 원본과 동일하다.
    - 전체 style 4,000자 초과, 21개의 유효 대사는 64KiB/128-request 보호 안에서 허용된다.
    - 긴 개별 대사, 문장 경계 없는 한글·이모지, 공백·줄바꿈, 태그 경계, style 1,001자, 큰 목소리 참조, 6,000-byte 경계를 포함한다.
  </behavior>
  <action>
D-01/D-02/D-03을 구현한다. 먼저 현재 POST를 호출하고 provider fetch만 mock하는 실패 회귀를 작성한다. UI에서는 두 대사를 입력할 수 있는 기존 진입점을 사용하고, 기존 두 화자 안내의 잘못된 합산 제한 문구를 자동 분할 안내로 바꾼다.

tts-contract.ts에 공유 작업·요청 예산 상수와 UTF-8 byte 검증을 둔다. parseTts의 전체 본문/연출 합계와 20턴 제한을 제거하고 budget_contract를 적용한다. 반환 데이터의 text/style을 trim·정규화하지 않는다.

gemini-tts.ts의 requestGroups를 전체 작업 사전 계획기로 확장한다. wireRequest를 통해 계산한 실제 JSON 크기와 본문 code point 수로 후보를 검증한다. 가능한 한 원래 턴을 그대로 유지하고, 초과하는 개별 턴은 문장 끝 → 줄바꿈/구두점 → 공백 → Unicode 경계 순서로 나눈다. UTF-16 surrogate와 결합 문자·emoji grapheme을 가능한 단위로 보존하고, 인식되는 완전한 인라인 발성 태그 내부를 자르지 않는다. 원문 일부를 버리거나 중복하지 않으며 빈/공백만 있는 provider 요청을 만들지 않는다. 한 원자 단위 자체가 예산을 넘으면 해당 대사의 명시적 오류를 내고 유한하게 종료한다.

분할한 모든 part는 원래 style 문자열을 그대로 가진다. prebuilt-dialogue는 예산 안에서 인접 턴을 묶고 각 요청에 동일한 두 화자 voice config와 speaker metadata를 보낸다. custom-dialogue는 서로 다른 턴을 합치지 않고 해당 화자의 single voice config로 조각을 순차 생성한다. single은 같은 분할기를 사용한다. 모든 그룹을 먼저 검증한 다음 synthesize의 기존 순차 for 루프에 전달한다. 기존 raw PCM 스트림과 처리 등급 규칙을 유지한다.

TtsEditor에서 추가 대사·연출의 개별 고정 maxlength와 20턴 버튼 차단을 해제한다. “두 화자의 대화입니다.”와 “대사 추가”는 유지하며 “긴 대본은 자동으로 나누어 순서대로 생성합니다. 각 대사의 연출은 나눈 구간마다 동일하게 적용됩니다.”로 설명한다. 기존 필드 순서·TabSelect·상태 소유 구조를 유지한다. style/input resource 오류는 한국어 상태 문장으로 안내한다.
  </action>
  <verify>
    <automated>npm test -- src/lib/gemini-tts.test.ts src/app/generation-order.test.tsx</automated>
  </verify>
  <done>사용자가 기존 두 화자 화면에서 합계 1,000자를 넘는 대화를 입력하면 사전 계획된 순차 요청이 같은 화자·연출을 유지하고 하나의 PCM으로 연결된다. 모든 requestGroups의 예산 검사와 원문 보존 회귀가 통과한다.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: 첫 대사의 장문 입력과 기존 화면 결과 흐름까지 연결한다</name>
  <files>src/app/page.tsx, src/app/page.test.tsx, src/app/components/TtsEditor.tsx, src/app/api/tts/route.test.ts</files>
  <behavior>
    - 첫 대사와 추가 대사에 1,000자를 넘는 내용을 붙여넣어도 원문이 유지되며 태그 추가로 기존 끝부분이 잘리지 않는다.
    - 화면의 submit → 실제 POST → mock provider → 재생·완성 WAV 경로에서 긴 단일 대사와 두 화자 대사가 모두 성공한다.
    - 64KiB 작업 한도 및 분할 불가능한 style/설정 오류는 원문을 남기고 한국어로 안내한다. 오류 요청은 provider fetch 0회다.
    - 두 탭 왕복, 입력 보존, DOM/Tab 순서와 숨은 메뉴 방지가 유지된다.
  </behavior>
  <action>
D-01/D-02/D-03을 화면 전체에 적용한다. page.tsx의 첫 대본 maxLength와 상태 갱신·태그 추가 시 자르는 처리, 첫 연출의 개별 고정 maxlength를 제거한다. 단일 화자와 두 화자 첫 대사 모두 원문이 온전히 state와 제출 snapshot에 들어가도록 한다. 태그 추가 역시 전체 원문 보존을 우선하고 실제 작업 한도 초과는 parseTts의 공유 검증으로 생성 전에 알려 준다. 입력 자체를 조용히 버리지 않는다.

사용자 안내는 자동 분할·순차 생성·연출 보존과 실제 작업 보호를 구분한다. 짧은 설명으로 입력 요청 64KiB, 최대 128회 분할 생성, 최대 32MiB 음성임을 표시하고 선택 sampleRate에 따른 대략적 최대 분수를 계산해 안내한다. 추가 턴 영역이 숨는 단일 화자에서도 자동 분할과 작업 한도 설명을 확인할 수 있게 한다. 새 탭·새 설정·실시간 요청 카운터는 만들지 않는다. 완료되지 않은 요청의 처리 등급이나 진행 개수를 추측하여 표시하지 않는다.

page.test.tsx의 기존 “본문 입력과 태그 추가를 1,000자에서 원천 차단한다” 회귀는 새로운 원문 보존·자동 분할 회귀로 교체한다. 기존 화면 submit→POST 연결 fixture를 재사용하여 provider가 받은 각 wire part의 style을 원문과 대조하고 완성 PCM/WAV 순서를 검증한다. route.test.ts의 이전 1,001자 거부 기대는 허용+분할 기대와 실제 transport/요청예산 거부 케이스로 교체한다. 기존 오류·재생·두 탭 회귀는 유지한다.
  </action>
  <verify>
    <automated>npm test -- src/app/page.test.tsx src/app/api/tts/route.test.ts src/app/generation-order.test.tsx</automated>
    <human-check>사용자가 실제 VoiceOver로 긴 본문·추가 대사 입력, 자동 분할 설명 탐색, 탭 왕복과 오류 후 수정 동작을 확인한다. 사용자 확인 전에는 수용 대기로 기록한다.</human-check>
  </verify>
  <done>첫 대사와 추가 대사 모두 긴 입력·태그가 잘리지 않고 분할 생성된다. 실제 자원 한도만 명시적으로 안내되며 화면부터 완성 WAV까지 mock 회귀와 기존 접근성 DOM 회귀가 통과한다.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: 구간 사이 취소·실패·오디오 한도와 회귀 방지 기록을 마무리한다</name>
  <files>src/lib/gemini-tts.ts, src/app/api/tts/route.test.ts, src/app/page.test.tsx, .planning/codebase/STRUCTURE.md, .planning/ui-followup.md</files>
  <behavior>
    - 첫 요청 전, 그룹 사이, 뒤 그룹의 reader 대기 중 취소가 provider signal과 iterator에 전달되고 다음 그룹은 시작하지 않는다.
    - 첫 PCM 이후 뒤 그룹의 429/OTHER/잘린 SSE/빈 오디오/비정상 finish/형식·rate 불일치가 전체 결과를 실패시키며 재시도·완성본 저장이 발생하지 않는다.
    - 아직 아무 PCM도 내보내지 않은 첫 요청만 기존 bounded retry 조건에 따라 재시도한다. 재시도로 중복 PCM이 생기지 않는다.
    - 그룹마다 PCM16 샘플 경계가 완전해야 하며 두 그룹의 홀수 바이트가 서로 보완되어 통과하지 않는다.
    - 정상 L16/WAV/μ-law/A-law와 8/16/24kHz 요청은 기존 PCM 정규화 계약을 지킨다. 누적 32MiB 경계와 초과 실패를 서버·화면에서 검증한다.
  </behavior>
  <action>
D-04/D-05를 구현·검증한다. 새 분할 그룹과 기존 synthesize/openPcm lifecycle의 접합부를 대상으로 취소와 후속 실패 회귀를 먼저 작성하고 실패하는 부분만 수정한다. 모든 그룹 진입 전과 reader 작업 후 abort를 확인하고, 비정상 종료 뒤 다음 그룹을 시작하지 않는다. 일부 음성 재생이 이미 시작됐더라도 실패 시 client player를 닫고 완료 PCM/URL/저장 액션을 폐기한다. 전역 첫 PCM 이후 재시도 금지는 유지한다.

그룹별 정상 STOP, 비어 있지 않은 오디오, 요청과 일치하는 형식·sampleRate, 그룹별 PCM16 경계를 확인한다. SSE 네트워크 조각의 홀수 길이는 같은 그룹 안에서 기존 assembler 계약으로 처리하되 다음 그룹으로 불완전 샘플을 넘기지 않는다. WAV 헤더를 통째로 이어 붙이지 않고 각 그룹의 PCM만 연결한다. 모든 형식에 기존 서버/클라이언트 누적 32MiB 보호를 적용한다. 전체 작업을 서버에서 추가 버퍼링하지 않으며 잘못된 조각을 재생한 뒤 완성이라고 표시하지 않는다.

64KiB 및 128-request 사전 거부는 첫 유료 호출 전에 발생함을 검증한다. 테스트에서는 provider fetch mock, 작은 PCM fixture와 한도 경계 fixture를 사용하고 실제 키·유료 API는 호출하지 않는다. 전체 검사와 lint/tsc/build 후 기존 코드베이스 자동 갱신 규칙에 따라 필요한 최소 문서 변경만 적용한다.

STRUCTURE.md “두 화자 안내”의 이전 합산 글자 제한 설명을 이번 사용자 요청에 맞는 자동 분할·연출 원문 보존 계약과 회귀 명령으로 갱신한다. 과거 VoiceOver 확인 기록을 새 변경의 수용으로 바꾸지 않는다. ui-followup.md에는 최초 증상, 과거 자동 분할 이력, 새 동작, 자동 검사 범위와 VoiceOver·구간 경계 청취 미확인을 기록한다. ROADMAP·REQUIREMENTS·기존 UAT 상태는 변경하지 않는다. 새 동작의 실제 VoiceOver 확인을 받은 뒤에만 해당 범위 수용·추가 예방 조치를 확정한다.
  </action>
  <verify>
    <automated>npm test -- src/app/api/tts/route.test.ts src/app/page.test.tsx src/utils/audio-format.test.ts src/utils/pcm-audio.test.ts src/utils/streaming-player.test.ts</automated>
    <human-check>유료 호출 별도 승인 후 실제 두 모델의 구간 경계·언어·연출·목소리 일관성을 청취한다. 이 작업에서는 수행하거나 수용 완료로 표시하지 않는다.</human-check>
  </verify>
  <done>취소·부분 실패·형식 오류·용량 초과가 완성본으로 노출되지 않는다. 자원 보호와 기존 재생 경로를 유지하며 전체 자동 검사가 통과하고 남은 실기 수용 범위가 기록된다.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| 브라우저 → POST /api/tts | 비신뢰 JSON·문자열·배열·목소리 참조와 유료 작업 요청 |
| 앱 → provider | 작업이 여러 순차 유료 요청으로 확장되는 경계 |
| provider SSE → PCM → 브라우저 | 크기·형식·종료 상태를 신뢰할 수 없는 오디오 |

## STRIDE Threat Register

ASVS level 1, high 이상 미완화 항목은 검증을 차단한다.

| Threat ID | Category | Component | Severity | Disposition | Mitigation Plan |
|-----------|----------|-----------|----------|-------------|-----------------|
| T-atd-01 | Denial of Service | parseTts/requestGroups | high | mitigate | 64KiB 본문, 실제 wire 6,000 bytes, 128 planned calls 사전 검사, 선형 유한 분할과 순차 요청. Task 1/3 |
| T-atd-02 | Tampering | speaker/style/text 분할 | high | mitigate | 화자 등록 검사 유지, 원문 재결합 동등성 및 style verbatim 테스트. Task 1/2 |
| T-atd-03 | Denial of Service | SSE/PCM/player | high | mitigate | 기존 120초 요청 timeout·bounded retry·32MiB 누적 한도·abort cleanup·다음 그룹 금지. Task 3 |
| T-atd-04 | Information Disclosure | 오류/로그 | medium | mitigate | raw provider 오류·키·사용자 대본/연출을 노출하지 않는 한국어 오류 및 기존 서버 오류 변환 유지. Task 1/3 |
| T-atd-05 | Spoofing | cross-origin POST | high | mitigate | 기존 guardMutation/content-type/allowlist 검증과 회귀 유지. Task 2/3 |

패키지 설치 작업이 없어 supply-chain 설치 게이트는 해당하지 않는다.
</threat_model>

<source_audit>
이 quick은 기존 정식 단계 전체를 계획하거나 수용하는 작업이 아니다. 아래 관련 요구사항의 이번 수정 범위를 추적하며 나머지 요구사항 상태는 보존한다.

| SOURCE | ID | 대상 | 작업 | 상태 |
|---|---|---|---|---|
| GOAL | quick 요청 / 기존 Phase 1·2 관련 목표 | 대사 추가와 장문 자동 분할·생성·저장 | 1–3 | COVERED |
| REQ | TTS-02, TTS-03, TTS-04 | 연출·본문·태그·화자 순서 보존 | 1–2 | COVERED |
| REQ | AUDIO-01, AUDIO-02, SAFE-01 | 연속 오디오·출력 형식·취소·안전한 오류 | 1–3 | COVERED |
| REQ | A11Y-01, TEST-01 | 기존 입력/탐색과 자동·실기 근거 분리 | 2–3 | COVERED |
| RESEARCH | 저장된 3.8 문서 | 8,192 input tokens와 구조화 speechMetadata | 1 | COVERED |
| RESEARCH | 현재 코드 | 64KiB JSON, 32MiB PCM, 120초 timeout, retry 계약 | 1–3 | COVERED |
| RESEARCH | 7020a66~117ee00 이력 | 과거 자동 분할 복구와 경계 음질 위험 | 1–3 | COVERED |
| CONTEXT | D-01 | 전체 제한 해소·개별 장문 분할 | 1–2 | COVERED |
| CONTEXT | D-02 | 연출 원문 반복·불가능한 개별 예산 오류 | 1–2 | COVERED |
| CONTEXT | D-03 | 두 탭·현재 조작 유지 | 1–3 | COVERED |
| CONTEXT | D-04 | 순차 요청·취소·부분 실패·자원 보호 | 1–3 | COVERED |
| CONTEXT | D-05 | mock만 실행·유료 호출/실기 미수행 | 1–3 | COVERED |

전용 RESEARCH.md/CONTEXT.md/phase_req_ids는 없는 quick이며 위 실제 자료와 사용자 결정을 정본으로 사용한다. 기존 Batch/Remix/다른 목소리 관리 기능은 이번 작업 범위 밖이다. active planner contribution JSON은 /private/tmp/gemini-atd-planner-hooks.json에서 읽었다. DB schema 변경은 없다. assumption-delta probe는 phase_unresolved로 skipped이며 부정 판정으로 취급하지 않는다.
</source_audit>

<verification>
각 task 명령은 저장소 루트에서 실행하며 목표 회귀는 60초 이내로 유지한다. 그 뒤 npm test, npm run lint, npx tsc --noEmit, npm run build, git diff --check를 각각 실행하고 exit code와 결과를 확인한다. 실행하지 않은 검사를 통과했다고 기록하지 않는다. 기존 요구사항·UAT·VoiceOver 수용 범위를 보존한다. 부모 orchestrator가 quick summary/verification/커밋을 관리한다.
</verification>

<success_criteria>
- 전체 1,000자/연출 4,000자/20턴 검사가 정상 입력을 거부하지 않는다. 실제 요청별 예산과 작업 보호 한도만 적용된다.
- 원문 대사별 재결합 동등성과 style verbatim이 양 모델·세 화자 모드에서 자동 검사로 확인된다.
- 긴 첫 대사·추가 대사·21턴·style 합계 초과의 정상 경로와 분할 불가/취소/후속 실패/오디오 한도 경로가 검증된다.
- 완성 음성의 PCM 순서·형식과 다운로드 일관성이 mock으로 검증되고 실제 음질·VoiceOver 미확인은 남긴다.
</success_criteria>

<output>
Create .planning/quick/261012-atd-dialogue-chunking/261012-atd-SUMMARY.md when done. 자동 검사 명령/결과, 변경·커밋, 자원 한도와 구간 음질·실기 미확인, 이전 수용 기록 보존 여부를 기록한다. 정식 단계 완료 상태는 변경하지 않는다.
</output>
