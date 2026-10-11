---
phase: quick-261011-mrq
plan: "01"
type: execute
status: planned
implementation_authorized: true
wave: 1
depends_on: []
autonomous: true
mode: quick
isolation: none
executor_count: 1
requirements:
  - TTS-01
  - TTS-02
  - TTS-03
  - TTS-04
  - VOICE-01
  - VOICE-02
  - VOICE-03
  - VOICE-04
  - VOICE-05
  - VOICE-06
  - AUDIO-01
  - AUDIO-02
  - SAFE-01
  - A11Y-01
  - SERVICE-01
  - SERVICE-02
  - BATCH-01
  - BATCH-02
  - BATCH-03
  - BATCH-04
  - DOC-01
  - TEST-01
files_modified:
  - package.json
  - package-lock.json
  - src/lib/tts-contract.ts
  - src/lib/gemini-client.ts
  - src/lib/gemini-tts.ts
  - src/lib/voice-catalog.ts
  - src/lib/gemini-voices.ts
  - src/lib/gemini-batches.ts
  - src/utils/audio-format.ts
  - src/app/api/tts/route.ts
  - src/app/api/tts/stream.ts
  - src/app/api/tts/route.test.ts
  - src/app/api/tts/stream.test.ts
  - src/app/api/voices/route.ts
  - src/app/api/voices/[id]/route.ts
  - src/app/api/batches/route.ts
  - src/app/api/batches/[id]/route.ts
  - src/app/api/batches/[id]/results/route.ts
  - src/app/page.tsx
  - src/app/page.test.tsx
  - src/app/components/TtsEditor.tsx
  - src/app/components/VoiceLibrary.tsx
  - src/app/components/VoiceStudio.tsx
  - src/app/components/BatchPanel.tsx
  - src/lib/gemini-tts.test.ts
  - src/lib/gemini-voices.test.ts
  - src/lib/gemini-batches.test.ts
  - src/utils/audio-format.test.ts
  - src/lib/voice-catalog.test.ts
  - scripts/generate-voice-catalog.mjs
  - GEMINI-TTS-VOICES.md
  - README.md
  - .planning/quick/261011-mrq-gemini-3-8-flash-tts-flash-lite/COVERAGE.md
  - .planning/quick/261011-mrq-gemini-3-8-flash-tts-flash-lite/261011-mrq-VERIFICATION.md
estimate:
  tokens: 88000
  raw_tokens: 88000
  tasks: 3
  confidence: low
must_haves:
  truths:
    - "두 공식 3.8 모델을 선택하고 text 원문과 턴별 style을 분리하여 합성하며 취소·완료 재생·다운로드를 사용할 수 있다."
    - "기본 두 화자는 공식 다중 화자 요청으로, 맞춤 목소리가 포함된 두 화자는 순차 요청으로 순서·취소·실패 경계를 보존한다."
    - "기본 30개 및 확장 목소리 필터·페이지 조회와 설계·복제·저장 목소리 조회·미리듣기·삭제 흐름이 실제 서버 경로에 연결된다."
    - "WAV/L16/μ-law/A-law, 검증된 샘플레이트, Standard/Flex/Priority를 선택하고 실제 형식과 처리 등급 또는 미확인 상태를 확인할 수 있다."
    - "Batch 제출·목록·식별자 재열기·상태·취소·삭제·우선순위·요청별 결과 재생과 WAV 저장이 연결된다."
    - "공식 목소리 문서는 언어·지역 → 성별 표현 → 이름 순으로 정렬하고 API 수집 범위·실패·누락을 정직하게 표시한다."
    - "Remix 공개 요청 스키마 부재는 열린 차단으로 남고 VOICE-03 및 ROADMAP 단계는 완료로 바꾸지 않는다."
  artifacts:
    - path: src/lib/tts-contract.ts
      provides: "공유 모델·화자·음성 참조·출력·등급 요청 계약과 서버 검증"
    - path: src/lib/gemini-tts.ts
      provides: "3.8 요청 변환, SDK/REST 전송, 전체 실행 취소·재시도"
    - path: src/lib/gemini-voices.ts
      provides: "검증된 Voices list/create/get/delete 계약"
    - path: src/lib/gemini-batches.ts
      provides: "Batch 수명주기·안전한 결과 회수·정규화"
    - path: GEMINI-TTS-VOICES.md
      provides: "출처와 수집 상태가 있는 언어·지역별 공식 목록"
    - path: .planning/quick/261011-mrq-gemini-3-8-flash-tts-flash-lite/261011-mrq-VERIFICATION.md
      provides: "기능별 구현·mock·실기·차단 상태와 실제 명령 결과"
  key_links:
    - from: src/app/page.tsx
      to: src/lib/tts-contract.ts
      via: "불변 생성 스냅샷과 /api/tts 요청"
    - from: src/app/api/tts/route.ts
      to: src/lib/gemini-tts.ts
      via: "서버 검증 후 공식 3.8 요청·AbortSignal"
    - from: src/lib/gemini-tts.ts
      to: src/utils/audio-format.ts
      via: "실제 MIME·RIFF·샘플레이트를 검증한 오디오"
    - from: src/app/components/VoiceStudio.tsx
      to: src/app/api/voices/route.ts
      via: "명시적 설계·복제 제출과 저장 여부"
    - from: src/app/components/BatchPanel.tsx
      to: src/app/api/batches/[id]/results/route.ts
      via: "작업 식별자 및 요청 key에 대응하는 결과"
---

<objective>
기존 앱에서 Gemini 3.8 Flash TTS와 Flash-Lite TTS의 공식 지원 기능을 실제 사용자 흐름으로 연결하고, 목소리 목록 문서와 기능별 검증 근거를 만든다. 한 명의 실행자가 현재 체크아웃에서 세 작업을 순서대로 수행한다. 사용자 요청에 따라 권장 기본값으로 진행하며 새 승인 단계를 반복하지 않는다.

공개 계약이 확인되지 않은 Remix를 새 Voice Design으로 대체하지 않는다. 기능을 숨기거나 완료로 간주하지 않고, 누락된 계약을 정확히 보고하면서 나머지 확인된 기능을 끝까지 구현한다. quick 구현 결과는 기존 로드맵 세 단계의 수용·완료와 별개다.
</objective>

<execution_context>
@/Users/vini/.codex/gsd-core/workflows/execute-plan.md
@/Users/vini/.codex/gsd-core/templates/summary.md
</execution_context>

<context>
@AGENTS.md
@CLAUDE.md
@.planning/PROJECT.md
@.planning/STATE.md
@.planning/REQUIREMENTS.md
@.planning/research/FEATURES.md
@.planning/research/STACK.md
@.planning/research/ARCHITECTURE.md
@.planning/research/PITFALLS.md
@.planning/research/SUMMARY.md
@.planning/codebase/CONVENTIONS.md
@.planning/codebase/TESTING.md
@src/app/api/tts/route.ts
@src/app/api/tts/stream.ts
@src/app/page.tsx
@src/utils/pcm-audio.ts
@src/utils/streaming-player.ts
@vitest.config.ts
@/Users/vini/.codex/references/input-and-messages.md
@/Users/vini/.codex/references/verified-execution.md
</context>

<scope_and_execution>
- **2026-10-11 실행 승인 갱신:** 최신 요청 ‘$gsd-quick 아까 새로 작성한 플랜에 따라 구현 시작하자.’에 따라 아래 세 작업의 구현·검증을 승인받았다. 이전 계획 전용 제한은 역사로 보존하며 현재 실행을 차단하지 않는다.
- **이전 승인 범위(역사):** 빈이의 최신 지시인 “구현 전까지만 작업해 줘.”에 따라 이 문서와 계획 검증까지만 수행한다. 아래 구현 작업은 후속 명시 요청을 받기 전 실행하지 않는다. 이 계획의 autonomous는 향후 구현 시 내부 승인 반복을 생략한다는 뜻이며 지금 실행을 허가하지 않는다.
- mode=yolo, granularity=coarse, model=inherited. 이 계획은 quick 워크플로의 단일 1–3 작업 계약으로 묶은 세 순차 실행 묶음이다. 각각의 세부 구현은 작은 기능 단위로 진행하고 진행 기록을 남긴다. 일반 단계 계획보다 넓은 범위와 88,000 raw token 예상 비용을 숨기지 않는다. estimate-calibration 결과 factor=1, sample_count=0, confidence=low다.
- 현재 체크아웃에서 isolation=none, executor_count=1로 수행한다. planner는 소스 수정·설치·API 호출·커밋을 하지 않았다. executor의 작업 단위 커밋 여부는 상위 quick orchestrator 지시를 따른다. main 병합·push·배포는 하지 않는다.
- 시작 시 git status와 대상 파일 diff를 새로 확인한다. 기존 관찰에서 .gsd/, .serena/, docs/.graphifyignore, docs/graphify-out/가 untracked였다. 이 목록은 보존 근거이며 수정 권한이 아니다. 열거한 구현 경로에도 새 사용자 변경이 있으면 해당 변경을 보존한 최소 diff만 적용한다. 새 이름의 파일이 이미 생겼다면 덮어쓰지 말고 합친다. 상위에서 이미 만든 조사·초기화 자료를 되돌리거나 재작성하지 않는다.
- 코딩 전에 설치된 Next.js 가이드의 App Router Route Handler·Client Component 관련 절을 읽는다. 외부 API 재조사·프로젝트 재온보딩을 반복하지 않는다. 필요한 필드 확인은 research의 정확한 공식 보관 문서 또는 SDK 타입·직렬화 해당 절만 읽는다. 신규 공식 출처가 정말 필요할 때만 등록한다.
- API 키는 서버에서만 읽고 출력하지 않는다. 유료 합성·Voice Design·Replication·Batch 제출은 자동 검증에서 실행하지 않는다. 서버 키를 이용한 공식 prebuilt catalog GET만 읽기 전용 실제 검증으로 허용된다.
- 새로운 DB·계정·생성 이력·BGM·배포를 추가하지 않는다. 사용자 요청한 앱 기능을 만드는 작업이며 라이브 계정의 자산 삭제나 작업 취소를 대신 실행하는 작업이 아니다.
</scope_and_execution>

<interface_context>
현재 route.ts는 POST {text, voice, stylePrompt}를 받고 모델을 3.1로 고정하며 createPrompt로 연출과 대본을 합친다. createRetriedAudioSource는 오류별 제한 재시도와 abort 정리를 수행한다. stream.ts의 preparePcmStream은 첫 청크를 먼저 읽고 생성 실패를 HTTP 응답 전에 포착하며, 이후 createPcmStreamFromIterator가 byte stream을 이어간다. page.tsx는 requestIdRef, AbortController, StreamingPcmPlayer, PcmChunkAssembler와 createWavBlob을 사용한다. 사용자에게는 현재 다섯 목소리만 표시한다.

공유 요청은 model, mode(single/prebuilt-dialogue/custom-dialogue), speakers[{id, voice}], turns[{speaker, text, style}], output{encoding, sampleRate}, serviceTier로 정규화한다. VoiceRef는 prebuilt-name, prebuilt-id, stored-custom, ephemeral-replica를 구분한다. SDK 모델 계약 camelCase와 Voices 계약 snake_case는 서버 어댑터에서만 변환한다. 실제 API 타입·필수 필드와 일치시키고 unknown 값을 검사한 뒤 사용한다. 기존 POST 형식은 내부 정규화 과정에서 현재 화면 전환이 끝날 때까지 동작하게 유지할 수 있으나 새 UI의 주 계약은 일반화된 구조다.
</interface_context>

<assumption_delta_decision>
검출기는 quick ID에 대응하는 ROADMAP phase를 찾지 못해 skipped:phase_unresolved를 반환했다. 핵심 식별자는 단일 voice 문자열에서 VoiceRef로 promote한다. 기본 이름·공식 ID·저장 맞춤 ID·비저장 복제 key의 수명과 지원 호출 방식이 다르기 때문이다. 예전 문자열은 입력 호환 변환에만 남긴다. 이 결정은 연구의 권장안을 채택한 것이며 사용자에게 새 제품 범위를 묻는 단계가 아니다.
</assumption_delta_decision>

<tasks>

<task type="tracer" tdd="true">
  <name>Task 1: 3.8 단일 합성 경로를 먼저 증명하고 구조화 대화·출력·처리 등급으로 확장</name>
  <files>package.json, package-lock.json, src/lib/tts-contract.ts, src/lib/gemini-client.ts, src/lib/gemini-tts.ts, src/utils/audio-format.ts, src/app/api/tts/route.ts, src/app/api/tts/stream.ts, src/app/api/tts/route.test.ts, src/app/api/tts/stream.test.ts, src/lib/gemini-tts.test.ts, src/utils/audio-format.test.ts, src/app/page.tsx, src/app/page.test.tsx, src/app/components/TtsEditor.tsx</files>
  <read_first>package.json, .planning/research/STACK.md의 Package Legitimacy Audit, docs/google-genai/sdk-2.28.0-types.md, docs/google-genai/sdk-2.28.0-node.md, docs/google-gemini/speech-generation.md, docs/google-gemini/flex-inference.md, docs/google-gemini/priority-inference.md, 현재 route/stream/page와 해당 테스트</read_first>
  <behavior>
    - 한글 대본·공식 인라인 태그는 그대로 text에 남고 style·speaker는 speechMetadata로만 전송된다. 두 정확한 모델 ID만 허용한다.
    - 실제 SDK 또는 REST fetch를 가짜 전송으로 대체하여 요청 JSON·응답 헤더를 검사한다. SDK 요청 객체 자체만 mock하는 검사는 responseFormat 누락을 검출할 수 없다.
    - UI 제출 → 실제 POST 핸들러 → 가짜 Gemini fetch → PCM 수신 → 완료 WAV 생성의 통합 경로를 한 번 검증한다. 네트워크 유료 호출은 없다.
    - 두 prebuilt 화자의 ID와 턴이 일치하며, custom 화자는 순차 호출한다. 전체 대본 1,000자, 턴별 1,000자 상한을 동시에 검증한다.
    - 첫 출력 이전 제한 재시도·대기 중 취소·턴 사이 취소·첫 출력 이후 재시도 금지·후속 턴 실패·늦은 청크·빈/잘린 오디오·비정상 finishReason을 검사한다.
    - WAV/L16/G.711 샘플 fixture는 실제 rate·채널·MIME·byte 경계와 재생/다운로드를 검사한다. RIFF의 부가 chunk와 padding을 지원한다.
    - Standard/Flex/Priority 요청값과 실제 등급 header를 검사한다. Flex 503/429에 Standard 자동 전환이 없고, Priority의 Standard 강등·header 미제공을 구별한다.
  </behavior>
  <action>
  1. 실패하는 단일 경로 통합 검사부터 만든다. 공식 기본 목소리 하나, Flash 모델, 한 턴, style 하나를 선택하여 화면에서 POST를 거쳐 첫 PCM과 완료 WAV까지 연결한다. 이 경로가 통과한 후 같은 모듈과 경계를 확장한다.
  2. Node >=20인지 확인하고 연구 감사 표의 공식 패키지 판정을 확인한 다음 npm install --save-exact @google/genai@2.28.0으로 잠금 파일까지 맞춘다. 다른 패키지는 추가하지 않는다. package.json의 test script는 기존 테스트가 없는데도 성공하는 옵션을 제거해 검사 0개를 성공으로 처리하지 않도록 한다.
  3. tts-contract.ts에 앱과 서버가 공유할 타입·허용 목록·입력 검증을 둔다. 잘못된 JSON, 공백 본문, 문자열 대신 객체, 중복/미등록 화자, 혼합 모드 오류, 허용되지 않은 모델/등급/encoding/rate, 과대 style·턴 수·본문을 400으로 반환한다. 앱 제한은 공식 한도가 아닌 앱 제한으로 표시한다. 기본값은 Flash, Standard, L16 24000Hz, 공식 기본 이름 Puck이다.
  4. gemini-client.ts는 서버 전용으로 SDK와 공식 host의 fetch를 만들며 키를 query string·브라우저·로그에 넣지 않는다. 현재 키 로드 방법의 동작을 보존하고 여러 서버 모듈의 키 로드를 하나로 모은다. sdk import가 client bundle에 섞이지 않도록 경계를 검사한다. upstream 원본 오류에는 키/대본/음성 key가 섞일 수 있으므로 정규화된 한국어 메시지만 반환한다.
  5. gemini-tts.ts는 text 원문과 speechMetadata.style/speaker를 분리하고 합성 음성은 확인된 voiceConfig.voice로 전달한다. prebuilt 두 화자는 speakerVoiceConfigs의 정확한 이름 대응을 사용한다. 한 요청 최대 두 화자 제약을 서버에서 검사한다. custom이 포함되면 같은 run의 순차 턴 요청으로 수행하고 정렬·턴별 style·전역 취소·전역 첫 출력 여부를 보존한다.
  6. SDK 2.28.0의 GenerateContent 직렬화가 responseFormat을 버리는 확인된 제약을 처리한다. 출력 계약이 필요한 합성은 좁은 REST adapter로 공식 streamGenerateContent/generateContent에 generationConfig.responseFormat.audio를 실제 전송한다. camelCase/snake_case는 각 공식 API의 증거에 따른다. SSE data framing, 여러 part, 실패 응답, abort, 종료 상태를 검사한다. SDK 타입을 강제 캐스팅해서 지원되는 것처럼 만들지 않는다.
  7. audio-format.ts에 RIFF chunk 파싱, PCM16 LE, μ-law/A-law 디코딩·인코딩과 출력 metadata 검증을 둔다. L16 기본 경로는 기존 첫 청크 재생을 유지한다. WAV는 실제 RIFF fmt/data를, G.711은 해당 codec을 거쳐 재생하며 선택한 원래 형식의 다운로드와 WAV 저장을 구분한다. 샘플레이트는 공식 문서에 확인된 값/조합만 노출하고 8k/16k/24k 예시를 전체 API enum이라고 주장하지 않는다. 형식·요청 rate와 반환 metadata가 다르면 실패한다. 여러 custom 턴은 raw PCM으로 정규화 후 결합해 최종 선택 형식/WAV로 인코딩한다. 컨테이너 파일 전체를 서로 붙이지 않는다.
  8. 기존 preparePcmStream의 첫 응답 검사·stream error·소비자 취소·iterator 정리와 재시도 경계를 유지한다. 전체 성공은 마지막 턴의 유효 오디오와 정상 종료가 확인된 때만 인정한다. 오류 JSON을 audio byte stream에 섞지 않는다. 완료 판정이 애매한 EOF는 부분 실패로 처리한다.
  9. TtsEditor와 page를 연결해 두 모델, 대본과 연출, 공식 발성·휴지 태그, 모드·두 화자·턴 추가/삭제/순서 변경·턴별 style, 출력/rate와 처리 등급을 실제 사용 가능하게 한다. 요청 스냅샷을 고정하고 runId로 늦은 응답을 버린다. 처리 등급 UI는 선택값·실제값·미확인값을 분리한다. SDK header는 Record이므로 x-gemini-service-tier 속성으로 읽는다. Flex 대기와 취소를 지원하고 비용을 바꾸는 자동 fallback은 하지 않는다.
  </action>
  <verify>
    <automated>npm --prefix /Users/vini/GitHub/gemini_tts run test -- src/app/api/tts/route.test.ts src/app/api/tts/stream.test.ts src/lib/gemini-tts.test.ts src/utils/audio-format.test.ts src/app/page.test.tsx</automated>
  </verify>
  <done>TTS-01~04, AUDIO-01~02, SERVICE-01~02의 구현과 mock 계약 검사가 통과하고 단일 화면 생성 경로부터 두 화자·형식·등급 확장까지 연결된다. 실제 유료 음성 생성·품질·계정 등급 검증은 수행했다고 기록하지 않는다.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 2: 접근 가능한 공식 목소리 라이브러리·설계·복제·관리와 Batch 작업 연결</name>
  <files>src/lib/voice-catalog.ts, src/lib/gemini-voices.ts, src/lib/gemini-batches.ts, src/app/api/voices/route.ts, src/app/api/voices/[id]/route.ts, src/app/api/batches/route.ts, src/app/api/batches/[id]/route.ts, src/app/api/batches/[id]/results/route.ts, src/app/components/VoiceLibrary.tsx, src/app/components/VoiceStudio.tsx, src/app/components/BatchPanel.tsx, src/app/page.tsx, src/app/page.test.tsx, src/lib/gemini-voices.test.ts, src/lib/gemini-batches.test.ts</files>
  <read_first>.planning/research/FEATURES.md의 Voices·Replication·Batch 보강 절, docs/google-gemini/voices-api.md, docs/google-gemini/interactions-openapi.md, docs/google-gemini/voice-design.md, docs/google-gemini/voice-replication.md, docs/google-gemini/batch-api.md, docs/google-gemini/batch-api-reference.md, 설치된 SDK의 Voices/Batches/File download 해당 타입·mapper</read_first>
  <behavior>
    - Voices 필터가 공식 필드로 변환되고 마지막 next_page_token까지 순회하며 중복 ID·페이지 루프·빈 페이지·미제공 metadata를 안전하게 처리한다.
    - Design은 store=true와 prompted.input, Replication은 별도 source_audio/consent_audio 및 명시 store가 전송된다. list에 sample_audio가 없는 경우는 정상이다.
    - 저장 custom ID는 조회/삭제 가능하고 비저장 replica key는 세션 메모리 안에서만 사용한다. key·오디오·개인 custom metadata는 공개 문서에 들어가지 않는다.
    - Batch PENDING/RUNNING 및 네 terminal 상태를 정규화하며 task name과 item key를 검증한다. 취소 요청 뒤 실제 terminal 취소까지 완료로 표시하지 않는다.
    - Batch inline 결과와 파일 JSONL 결과, 중첩 REST output, 개별 error·중복 key·누락 결과·만료, REST encoding 직렬화와 내부 priority PATCH를 검사한다.
    - 키보드만으로 화자 음성 선택·필터·설계·복제 파일 선택·저장 모드·Batch 제출/조회/결과 선택이 가능하고 상태·오류가 연결된 레이블/aria-live로 전달된다.
  </behavior>
  <action>
  1. voice-catalog.ts에 공식 기본 30개 이름·설명과 API Voice metadata를 정규화한다. 고정 기본 목록의 언어·지역·성별을 이름이나 인상으로 추론하지 않는다. 확장 카탈로그 GET/list는 type, language_code, region_code, accent, gender, pitch, persona, contexts→REST context, search, page_size/page_token 전체 확인된 필터를 지원한다. 공식 same-field OR/across-field AND 의미와 search 2048자·page_size 최대 50을 검증한다. 음성 ID를 분류용 문자열 패턴만으로 추측하지 말고 카탈로그/확인된 조회 정보를 사용한다.
  2. /api/voices GET/POST, /api/voices/[id] GET/DELETE를 서버 어댑터에 연결한다. 반환되는 공개 DTO에는 필요한 metadata와 안전한 preview만 포함한다. 임의 URL·경로를 받지 않고 공식 id/resource만 허용한다. mutation에는 same-origin Origin 검증과 예상 Content-Type·body 크기 제한을 적용한다. 생성·복제·삭제는 페이지 로드나 재조회에서 실행하지 않고 사용자 버튼 제출로만 호출하며 응답 유실 시 무조건 재생성하지 않는다.
  3. VoiceLibrary는 기본 30개와 확장 목소리, 저장 custom 목록을 구분하고 필터·더 보기/페이지·로딩·오류·선택 복구를 제공한다. 단일 화자와 두 화자 설정에서 같은 선택 컴포넌트를 사용한다. list에 sample_audio가 없는 prebuilt/replicated는 미리듣기 가능이라고 표시하지 않는다. prompted create/get의 sample_audio는 실제 MIME/RIFF 검사 뒤 Blob audio로 재생한다.
  4. VoiceStudio Design은 1–2문장 설명과 확인된 선택 metadata로 create(store=true,type=prompted)를 보내고 반환 ID를 즉시 합성에 선택할 수 있게 한다. 설명용 input의 미확인 공식 길이를 지어내지 말고 앱 자체 상한만 명시한다. 저장 목록 재조회·상세·삭제와 만료/없음/권한 실패를 구분한다. 저장형 프로젝트 공유 200개·마지막 사용 후 1년 TTL, 비저장 복제 key 7일은 보관 원문의 정확한 조건에 맞춰 설명한다.
  5. VoiceStudio Replication은 동일한 성인 화자의 참조 녹음과 공식 동의문 녹음 두 파일을 받는다. 공식 가이드·OpenAPI의 차이를 읽고 CreateVoiceRequest/AudioData 필수 필드를 확인한다. source 10–30초, 확인된 MIME·실제 header·duration과 앱 업로드 용량 제한을 클라이언트/서버에서 검사한다. 알 수 없는 길이/동의 문구는 추정하지 않는다. 정확히 확인된 공식 언어의 동의문을 출처와 표시하고 한국어 번역을 공식 문구라고 제시하지 않는다. UI에서 화자 본인의 동의·두 파일의 동일 화자임을 명시적으로 확인한 뒤 요청한다. store=true는 ID 관리, false는 반환 key를 휘발성 메모리에 두고 새로고침 시 소실과 TTL을 안내한다. 소스/동의 녹음은 파일·로그·일반 문서에 보존하지 않는다.
  6. Remix는 VOICE-03의 열린 차단으로 화면/검증 문서에 나타낸다. 보관 OpenAPI PromptedVoice에는 input만 있고 SDK에는 base_voice/baseVoice/remix 계약이 없다는 근거를 적는다. 추정 payload·성공 버튼·Design 대체 동작을 만들지 않는다. 새 계약이 같은 실행 중 신뢰 가능한 공식 자료로 확인될 때만 필수 필드·전송 fixture를 추가한 후 진짜 Remix를 연결할 수 있다. 확인되지 않으면 다른 기능을 계속하고 전체 요구 완료를 주장하지 않는다.
  7. gemini-batches.ts와 /api/batches를 통해 최대 20개·총 UTF-8 1MiB의 앱 제한 내 inline Batch를 제출한다. 이는 공식 20MB inline 한도보다 작은 앱 제한이다. 각 항목은 Task 1의 검증된 TTS 계약을 재사용하며 model은 작업 수준의 두 TTS ID만 허용하고 item별 재지정은 거부한다. custom 순차 대화는 요청별 턴 group/key/order를 보존한 개별 item으로 펼치고 회수 시 모두 성공한 그룹만 완성본으로 결합한다. 자동으로 실패 항목을 유료 재제출하지 않는다. 모든 item에 고유 metadata.key를 부여한다. SDK 변환이 encoding을 보존하지 못하므로 Batch도 실제 REST 요청 body 검사를 거친 경로를 사용한다.
  8. BatchPanel은 생성·목록 페이지·batches/{id} 복사/재열기·수동 새로고침·30초 polling·상태를 제공한다. 화면을 닫으면 polling만 중단하며 원격 작업은 취소하지 않는다. 저장 이력 시스템 없이 API 목록과 입력한 식별자로 복구한다. SDK JOB_STATE_*와 REST BATCH_STATE_*를 정규화하고 최종 SUCCEEDED/FAILED/CANCELLED/EXPIRED에서 polling을 멈춘다.
  9. /api/batches/[id]는 조회, 명시적 cancel POST, delete DELETE, 내부 priority PATCH를 제공한다. cancel은 공식 POST :cancel이며 후속 GET으로 결과를 확인한다. 내부 priority는 Standard/Flex/Priority와 다른 정수 필드로 표시하고 공식 updateGenerateContentBatch?updateMask=priority 스키마를 그대로 사용한다. 상태별 허용/실패 이유를 한국어로 보여주고 파괴적 동작은 대상 이름을 표시하는 명시 UI 확인 후 수행한다. 테스트 중 실제 작업에는 쓰기 호출하지 않는다.
  10. /api/batches/[id]/results는 dest.inlinedResponses 및 REST output.inlinedResponses.inlinedResponses를 정확하게 해석한다. dest.fileName/responsesFile는 검증된 files resource만 서버에서 공식 download endpoint로 회수하고 요청자가 외부 URL을 제공할 수 없게 한다. SDK files.download의 Promise<void>를 Buffer로 취급하지 않는다. 파일은 스트리밍/제한된 바이트로 파싱하고 앱 결과 상한을 명시한다. JSONL key/response/error를 원래 요청에 대응시키며 job 성공과 item 성공을 구분한다. 성공 item은 MIME/rate/종료 검증을 거쳐 재생·WAV 저장하고 실패/누락/만료를 개별 표시한다.
  11. 모든 패널을 Home에서 도달 가능하게 연결한다. native button/input/select와 fieldset/legend, 연결된 오류, 초점 복구, 단일 polite 상태 알림을 사용한다. 동적 턴 순서 변경은 드래그만 요구하지 않고 버튼을 제공한다. 실제 VoiceOver 수용은 자동 DOM 검증과 별개로 남긴다.
  </action>
  <verify>
    <automated>npm --prefix /Users/vini/GitHub/gemini_tts run test -- src/lib/gemini-voices.test.ts src/lib/gemini-batches.test.ts src/app/page.test.tsx</automated>
  </verify>
  <done>VOICE-01~02/04~05 및 BATCH-01~04의 전체 UI→서버 경로, 오류·수명·명시 mutation과 mock 검사가 연결된다. VOICE-03은 공식 계약 부재의 열린 차단이며 기능 구현 완료라고 표시하지 않는다.</done>
</task>

<task type="auto" tdd="true">
  <name>Task 3: 공식 목소리 전수 문서·기능 커버리지와 회귀 검증 근거 확정</name>
  <files>scripts/generate-voice-catalog.mjs, src/lib/voice-catalog.test.ts, GEMINI-TTS-VOICES.md, README.md, .planning/quick/261011-mrq-gemini-3-8-flash-tts-flash-lite/COVERAGE.md, .planning/quick/261011-mrq-gemini-3-8-flash-tts-flash-lite/261011-mrq-VERIFICATION.md</files>
  <behavior>
    - 동일 API snapshot은 항상 언어·지역 → 성별 표현 → 이름 → ID 순의 동일 문서를 생성한다.
    - 다중 언어/지역 metadata, neutral·미제공 성별, 중복 ID, Markdown 구분자·줄바꿈, 페이지 누락·반복을 검사한다.
    - type=prebuilt만 문서에 포함하며 키·사용자 custom asset·source/consent audio가 포함되지 않는다.
    - API 미조회/권한 실패를 전체 카탈로그 수집 성공으로 표시하지 않는다. 실제 수집 수·페이지·조회 시각과 원문 필드는 보존한다.
  </behavior>
  <action>
  1. scripts/generate-voice-catalog.mjs를 읽기 전용 공식 GET 도구로 만든다. 기존 서버와 같은 환경변수 로드 규칙을 사용하되 key 자체를 출력하지 않는다. type=prebuilt의 모든 페이지를 순회하고 ID로 중복 제거하며 token 반복·비정상 응답 시 불완전 수집을 표시한다. 인증 목소리 catalog GET만 실제 실행 가능하며 생성·preview 생성·삭제 요청을 넣지 않는다.
  2. GEMINI-TTS-VOICES.md를 한국어로 생성한다. 조회 시각, 공식 URL, 적용 필터, 수집 페이지와 고유 음성 수, 정렬 규칙, language_code/region_code의 원문과 표시명, 성별 표현, 이름·ID·설명·확인된 accent/pitch/persona 등 metadata를 제공한다. 여러 언어/지역은 각 해당 분류에서 찾을 수 있게 하고 동일 ID가 여러 섹션에 나타난 이유를 설명한다. 미제공은 명시 그룹으로 분리하고 이름으로 성별이나 국적을 추정하지 않는다. 기본 30개 fallback과 실제 API metadata를 구분한다.
  3. catalog GET이 실패하면 응답 상태·정규화된 원인과 제한을 기록하고 공식 기본 30개 목록 및 출처는 제공한다. 전체 확장 목록 완성을 거짓 선언하지 않으며 VOICE-06의 전수 수집 검증은 미완료로 남긴다. 성공 시 원본 key나 private voice가 문서에 없음을 검사한다.
  4. README에 두 모델, style/태그, 기본/맞춤 두 화자, voice 설계·복제·저장 수명, 출력/rate, 등급, Batch 상태·재열기·결과, 앱 제한과 공식 제한을 사용자 기준으로 설명한다. Remix 계약 부재·실제 계정 권한·청취·VoiceOver 미검증도 기능 상태에 붙인다. 구현 기술을 소비자 릴리스 노트로 대신 작성하지 않는다.
  5. COVERAGE.md의 모든 INTEGRATE 행을 실제 진입점·mock 검사·실제 검증 여부와 연결한다. 아래 Source Audit의 22개 요구를 VERIFICATION.md에 그대로 대응시킨다. 완료/차단/미검증을 구분하고 테스트 성공만으로 실기 수용이나 계정 가용성을 판정하지 않는다. 기존 ROADMAP, REQUIREMENTS 체크박스와 STATE phase 위치는 바꾸지 않는다. quick 기록은 orchestrator가 담당한다.
  6. 전체 npm test, npm run lint, 설치 로컬 tsc --noEmit, npm run build를 각각 실행하고 각 exit code·검사 수·실패를 확인한다. 실패는 관련 기능에서 해결한 후 필요한 검사만 재실행한다. build가 키/네트워크 의존으로 실패하면 실제 실패를 보고하고 성공이라고 쓰지 않는다. 브라우저 확인은 mock 또는 로컬 UI만 사용하고 유료 호출 없이 키보드 이동·라벨·상태·취소와 다운로드 경로를 확인한다. 실제 음성/VoiceOver/NVDA 수행 여부는 별도 human-check 목록으로 남긴다.
  7. 변경된 구현 범위에 대해 /Users/vini/.codex/skills/vini-project-preferences/references/gsd-codebase-refresh.md를 읽고 문서 영향이 있을 때 지정된 최소 갱신만 수행한다. 기존 docs/graphify-out·.serena·사용자 원문을 교체하거나 삭제하지 않는다. 새 공식 출처가 없으면 대량 문서 재수집을 하지 않는다.
  </action>
  <verify>
    <automated>npm --prefix /Users/vini/GitHub/gemini_tts run test</automated>
    <automated>npm --prefix /Users/vini/GitHub/gemini_tts run lint</automated>
    <automated>/Users/vini/GitHub/gemini_tts/node_modules/.bin/tsc --noEmit --project /Users/vini/GitHub/gemini_tts/tsconfig.json</automated>
    <automated>npm --prefix /Users/vini/GitHub/gemini_tts run build</automated>
    <human-check>실제 유료 합성·복제/설계·Batch, 한국어 품질·태그 효과·두 화자 구별, 서비스 계정 권한·실제 등급, VoiceOver/NVDA는 별도 미수행 항목으로 기록한다.</human-check>
  </verify>
  <done>VOICE-06/DOC-01/TEST-01의 산출물과 A11Y-01/SAFE-01의 검사 근거가 있고 각 명령의 실제 결과가 기록된다. 전수 목록의 성공 여부와 Remix 차단을 정직하게 보고하며 로드맵은 Pending을 유지한다.</done>
</task>

</tasks>

<threat_model>
ASVS level 1, high 이상 미해결 구현 위협은 완료를 막는다. 서비스 자체의 미확인 계약과 유료 실기 미수행은 별도 검증 상태다.

## Trust Boundaries

| Boundary | Description |
|---|---|
| 브라우저 → 앱 API | 모델·화자·음성 ID/key·파일·작업 ID와 body는 신뢰하지 않는다. |
| 앱 서버 → Gemini | 서버 key를 공식 host에만 보내며 upstream schema·오디오·오류를 검증한다. |
| Gemini 결과 → 브라우저/문서 | MIME·크기·순서·metadata와 Markdown을 검증하고 private 자산은 공개 문서에서 제외한다. |
| 사용자 버튼 → 비용/원격 상태 변경 | 생성·복제·Batch 제출·취소·삭제를 명시 동작에 한정한다. |

## STRIDE Threat Register

| Threat ID | Category | Component | Severity | Disposition | Mitigation Plan |
|---|---|---|---|---|---|
| T-261011-01 | Information disclosure | gemini-client/route 오류/문서 생성 | high | mitigate | 서버 전용 key, no-store, 원본 오류·대본·key·녹음 로그 금지, public catalog는 prebuilt만 |
| T-261011-02 | Tampering | tts-contract/Voices/Batch route | high | mitigate | runtime 타입·모델 allowlist·화자 대응·resource name·파일 실제 구조·JSON 크기 검증 |
| T-261011-03 | Denial of service | 합성·복제·결과 다운로드 | high | mitigate | 총 대본·턴·파일·결과 byte 상한, AbortSignal·자원 정리, 무제한 polling/재시도 금지 |
| T-261011-04 | Spoofing | Voice replication | high | mitigate | 같은 성인 화자·공식 동의문 확인 UI, source/consent 분리 전송, 자동 복제 검증 금지 |
| T-261011-05 | Elevation of privilege | mutation routes | high | mitigate | same-origin·Content-Type·ID 검증, user gesture로만 비용/삭제 호출, arbitrary host/URL 금지 |
| T-261011-06 | Tampering | audio-format/Batch results | high | mitigate | MIME/RIFF/rate/codec 검증, 정상 종료·전 턴 성공 검사, item key 대응, 부분 파일 완성 표시 금지 |
| T-261011-07 | Repudiation | UI mutation 결과 | medium | mitigate | 대상·동작·성공/실패 표시와 요청 중 중복 방지; 민감 데이터 없는 상태만 기록 |
| T-261011-SC | Tampering | npm install | high | mitigate | STACK Package Legitimacy Audit의 공식 @google/genai 2.28.0 판정 확인, exact version/lockfile, 추가 의존성 없음 |
</threat_model>

<source_audit>
## Multi-Source Coverage Audit

COVERED는 계획에 작업이 있다는 뜻이며 구현·요구 수용 완료가 아니다. CONTEXT.md와 D-NN 결정은 이 quick에 없으며 사용자 직접 지시·PROJECT의 결정을 적용한다.

| SOURCE | ID | 항목 | Task | Status | 근거/제한 |
|---|---|---|---|---|---|
| GOAL | Phase 1 | 두 모델·기본 목소리·재생/저장 | 1, 2, 3 | COVERED | 실제 청취 별도 |
| GOAL | Phase 2 | 맞춤/두 화자/출력/등급/Batch | 1, 2 | COVERED | Remix 계약 부재로 전체 수용 차단 |
| GOAL | Phase 3 | 접근성·검증 근거 | 2, 3 | COVERED | VoiceOver/NVDA 미수행 유지 |
| REQ | TTS-01 | 두 정확한 모델 | 1 | COVERED | allowlist |
| REQ | TTS-02 | 대본/style 분리 | 1 | COVERED | 실제 직렬화 검사 |
| REQ | TTS-03 | 공식 인라인 태그/원문 | 1 | COVERED | 변경 없이 보존 |
| REQ | TTS-04 | 두 화자·턴별 연출 | 1 | COVERED | prebuilt와 custom 호출 방식 구분 |
| REQ | VOICE-01 | 기본30+확장 필터 | 2 | COVERED | 전체 공식 필터·페이지 |
| REQ | VOICE-02 | Voice Design | 2 | COVERED | store=true |
| REQ | VOICE-03 | Voice Remix | 2, 3 | COVERED-BLOCKED | 공개 request schema 없음; 차단을 유지하며 완료 금지 |
| REQ | VOICE-04 | Voice Replication | 2 | COVERED | 동의·별도 오디오·store |
| REQ | VOICE-05 | 수명·조회·preview·관리 | 2 | COVERED | 미지원 preview와 ephemeral 구분 |
| REQ | VOICE-06 | 정렬된 공식 목록 | 3 | COVERED | 인증 GET 실패 시 전수 수집 미완료 |
| REQ | AUDIO-01 | 스트리밍/취소/완료 | 1 | COVERED | run 전체 완료 계약 |
| REQ | AUDIO-02 | 형식·rate | 1 | COVERED | SDK responseFormat 보완 |
| REQ | SERVICE-01 | Standard/Flex/Priority | 1 | COVERED | 자동 상향 없음 |
| REQ | SERVICE-02 | 실제 등급/미확인 | 1 | COVERED | header 검사 |
| REQ | BATCH-01 | 제출·크기 검증 | 2 | COVERED | 제한된 inline 제출 |
| REQ | BATCH-02 | 목록·상태·재열기 | 2 | COVERED | API 목록+작업 ID |
| REQ | BATCH-03 | 취소·삭제·priority | 2 | COVERED | 명시 UI mutation |
| REQ | BATCH-04 | 항목별 결과/WAV | 2 | COVERED | inline/file 결과 |
| REQ | SAFE-01 | key/검증/한국어 오류 | 1, 2, 3 | COVERED | 신뢰 경계 테스트 |
| REQ | A11Y-01 | 키보드·SR UI | 2, 3 | COVERED | 자동/실기 구분 |
| REQ | DOC-01 | 기능/제약/출처 | 3 | COVERED | README+검증 문서 |
| REQ | TEST-01 | 회귀 검사 | 1, 2, 3 | COVERED | 유료 호출 없는 mock |
| RESEARCH | SDK | 2.28.0 exact/REST 보완 | 1 | COVERED | 감사 표/실제 body 검증 |
| RESEARCH | AUDIO | RIFF/G.711/rate/순차 턴 | 1 | COVERED | fixture+취소+전역 재시도 |
| RESEARCH | VOICES | 전 필터/TTL/preview/동의 | 2, 3 | COVERED | 없는 metadata 추정 금지 |
| RESEARCH | BATCH | states/result shape/download/priority | 2 | COVERED | SDK/REST 차이 별도 처리 |
| CONTEXT | 직접 요청 | 전체 확인된 기능, 문서 정렬, 권장 자동 진행 | 1, 2, 3 | COVERED | 누락은 미완료로 보고 |
| CONTEXT | 보존 | 기존 dirty/기존 재생/단계 Pending/무배포 | 1, 2, 3 | COVERED | live diff와 제한 유지 |

제외: 별도 계정·이력·BGM·배포. Batch 파일 업로드 제출·webhook 외부 통지는 현재 세부 계획의 OPEN-SCOPE이며 사용자 승인된 제외가 아니다. 후속 구현 요청 시 전체 지원 요구와 대조해 계약·테스트·자원 상한을 보완하거나 명시적 범위 합의를 받아야 한다. 공식 모델 카드가 미지원으로 명시한 Live/Thinking/Tools/검색 등은 TTS capability로 추가하지 않는다.
</source_audit>

<verification>
작업별 검사는 실제 Vitest 테스트 수가 0보다 커야 한다. 마지막 네 명령은 cwd에 의존하지 않는 절대 경로로 실행하고 각각 exit code를 남긴다. 실제 API 생성은 사용하지 않는다. GET catalog가 성공했을 때에만 전체 문서 수집 성공을 기록한다. 자동 검사 통과는 실제 발화 품질·VoiceOver 수용·계정 API 가용성을 증명하지 않는다.
</verification>

<success_criteria>
- 확인된 기능마다 UI 또는 API 진입점, 서버 계약, 실패 처리와 meaningful test가 있다.
- 모든 검사 실패를 해결하거나 실제 미완료로 보고하고 기존 기능을 되돌리지 않는다.
- GEMINI-TTS-VOICES.md와 COVERAGE/VERIFICATION에 완료·차단·미검증을 구분한다.
- VOICE-03, 실제 청취/접근성 및 계정 검증의 미수행 상태를 없애지 않으며 ROADMAP/REQUIREMENTS는 Pending을 유지한다.
</success_criteria>

<output>
Create .planning/quick/261011-mrq-gemini-3-8-flash-tts-flash-lite/261011-mrq-SUMMARY.md with actual changed files, command results, catalog outcome, remaining blockers and human checks. Report to the orchestrator; it owns quick state recording. Do not mark ROADMAP phases complete.
</output>
