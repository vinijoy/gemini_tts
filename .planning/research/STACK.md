# 기술 스택 조사

**프로젝트:** Gemini TTS Web UI  
**조사일:** 2026-10-11  
**범위:** 기존 앱을 유지하면서 Gemini 3.8 TTS 기능에 필요한 SDK·API 선택  
**신뢰도:** MEDIUM — GSD `classify-confidence --provider context7 --verified` 결과. 공식 문서·npm 배포물을 교차 확인했지만 인증 API·유료 합성은 실행하지 않았다.

## 권장 결정

기존 Next.js/React/Web Audio를 유지하고 **`@google/genai@2.28.0`으로 정확히 고정**한다. 공식 가이드는 Voices 기능에 2.24.0 이상을 요구하며 npm에서 실제 배포를 확인했다. 2.28.0 배포물 타입·직렬화 코드를 읽어 `speechMetadata`, `voiceConfig.voice`, `ai.voices`를 대조했다.

합성은 `ai.models.generateContentStream`을 유지한다. 연출은 각 Part의 `speechMetadata.style`, 화자는 `speechMetadata.speaker`로 분리한다. 목소리 목록·생성·조회·삭제는 `ai.voices`를 사용한다. 출력 인코딩 변경처럼 SDK와 공식 예시가 불일치하는 기능만 서버의 작은 REST 어댑터로 보완한다.

## 추천 스택

| 기술 | 확인 버전 | 역할·선택 이유 |
|---|---|---|
| Next.js | 16.2.12 | 기존 App Router·서버 Route Handler 유지 |
| React / React DOM | 19.2.4 | 기존 접근성 UI와 상태 관리 유지 |
| TypeScript | 5.9.3 | SDK 필드·모델 허용 목록·앱 요청 타입 검사 |
| Node.js | SDK 요구 `>=20.0.0` | 서버에서 API 키 보호. 실제 실행 버전은 이 조사에서 미확인 |
| `@google/genai` | 현재 1.50.1 → 권장 2.28.0 | 3.8 speech metadata와 Voices를 갖춘 공식 SDK |
| Web Audio / 기존 PCM·WAV 유틸리티 | 브라우저 내장 | 첫 PCM 재생·취소·최종 WAV 저장 유지 |
| Vitest | 4.1.10 | 유료 호출 없는 mock 검증 |
| 서버 fetch | Node 내장 | SDK가 전달하지 못하는 공식 REST 필드만 보완 |

버전은 로컬 `package-lock.json` 및 공개 npm metadata 근거다(MEDIUM). 새 DB·음성 서비스·FFmpeg·비공식 TTS 래퍼는 이번 범위에 필요하지 않다.

## SDK 가용성

| 항목 | 2026-10-11 확인 결과 |
|---|---|
| 현재 잠금 파일 | 1.50.1 |
| 공식 Voices 최소 버전 | JavaScript 2.24.0 이상 / Python 2.25.0 이상 |
| npm 2.24.0 배포 시각 | 2026-09-22T05:12:03.419Z |
| npm latest | 2.28.0 |
| npm 2.28.0 배포 시각 | 2026-10-07T22:06:19.843Z |
| npm next | 2.9.0-rc.0 — 안정판 선정에 사용하지 않음 |
| 두 안정 버전 engines | Node >=20.0.0 |
| 공식 저장소 | googleapis/js-genai |

구현 시 권장 명령: `npm install --save-exact @google/genai@2.28.0`. 이 조사에서는 설치나 잠금 파일 변경을 실행하지 않았다.

## 기능별 API와 필드

| 기능 | 최소 API·필드 | 주의점 |
|---|---|---|
| 모델 선택 | `gemini-3.8-flash-tts`, `gemini-3.8-flash-lite-tts` | 두 모델은 동일 API 스키마·프롬프트 형식 |
| 대본·연출 | `models.generateContentStream`; Part의 `text`, `speechMetadata.style`; `config.responseModalities:["AUDIO"]` | text에는 낭독 대본과 공식 태그만 포함 |
| 목소리 선택 | `config.speechConfig.voiceConfig.voice` | 기본 이름·공식 voice ID/키를 사용 |
| 두 화자 | Part마다 `speechMetadata.speaker`; `speechConfig.multiSpeakerVoiceConfig.speakerVoiceConfigs[]`의 `speaker`, `voiceConfig` | 이름 정확히 대응. 공식 기본 목소리 예시는 `prebuiltVoiceConfig.voiceName`도 사용 |
| 인라인 발성·휴지 | text의 `<laugh>`, `<sigh>`, `<short pause>` 등 | 일반 연출이나 화자 접두어를 text에 합치지 않음 |
| 확장 카탈로그 | `ai.voices.list({type:["prebuilt"],language_code,region_code,gender,page_size,page_token})` | snake_case. `next_page_token` 끝까지 조회. SDK `contexts`는 REST query `context`에 대응 |
| Voice Design | `ai.voices.create({store:true,voice:{model,type:"prompted",display_name,language_code,gender,prompted:{input}}})` | 생성은 명시적 사용자 동작으로만 실행 |
| 디자인 미리 듣기 | 생성·조회 결과 `sample_audio.mime_type`, `sample_audio.data` | 완성 WAV. list에는 오디오가 없음 |
| Voice Replication | `ai.voices.create({store:true,voice:{model,type:"replicated",replicated:{source_audio:{mime_type,data},consent_audio:{mime_type,data}}}})` | 같은 성인 화자의 실제 참조·공식 동의문 녹음 필요. 테스트는 mock만 |
| 조회·삭제 | `ai.voices.get(id)`, `ai.voices.delete(id)` | prebuilt 조회는 list, 삭제 불가 |
| 무저장 복제 | `store:false`; 결과 `key` (`voicekey_...`) | 필요 시만 제공. 키는 로그·공개 문서에 남기지 않음 |
| 출력 포맷 변경 | 공식 REST `generationConfig.responseFormat.audio` | 아래 SDK 호환성 제한 참조 |

API 존재·필드는 공식 가이드와 실제 2.28.0 배포물을 대조한 MEDIUM 근거다. 계정별 접근권한·quota·카탈로그 응답·합성 품질은 미확인이다.

## 발견한 공식 문서·SDK 불일치

### responseFormat은 타입 캐스팅으로 해결하지 않는다

공식 가이드는 `config.responseFormat:{audio:{mimeType:"AUDIO_L16",sampleRate:24000}}` 객체 예시를 제공한다. 그러나 2.28.0 `GenerateContentConfig.responseFormat`은 `ResponseFormat[]` 배열 타입이고 `ResponseFormat` 설명은 Gemini API 미지원으로 표시한다. 실제 `dist/node/index.mjs`의 Gemini Developer API용 `generateContentConfigToMldev` 직렬화 함수에는 `responseFormat` 전달 항목이 없다. 타입만 우회해서 넣으면 서버로 전송되지 않을 수 있다.

기존 앱의 24kHz/mono/16-bit PCM 스트리밍은 공식 **기본 출력**이므로 이 필드를 생략하고 보존한다. µ-law/A-law·샘플레이트 선택을 지원한다면 REST body의 실제 전송을 mock으로 검증하는 별도 어댑터가 필요하다. 이 문서·배포물 차이는 실제 API 호출로 해결 여부를 확인하지 않았다.

### store 기본값은 명시한다

Voice Replication 가이드는 stateful 기본값을 설명하지만 2.28.0 `CreateVoiceRequest` 주석은 `store:false`를 기본값으로 기술한다. 저장형은 `store:true`, 선택한 무저장형은 `store:false`를 항상 명시한다. `prompted` 유형은 SDK 계약상 `store:true`가 필수다.

### Models와 Voices의 casing이 다르다

Models는 `speechMetadata`, `voiceConfig`, `inlineData` 같은 camelCase, Voices는 `display_name`, `language_code`, `page_size`, `sample_audio` 같은 snake_case를 사용한다. 경계 모듈에서 앱의 일관된 모델로 변환한다. Context7에는 오래된 예시도 섞여 있으므로 세부 필드는 최신 공식 가이드와 실제 배포물을 우선한다.

## 오디오·취소 보존

- 스트리밍 기본 출력은 헤더 없는 signed 16-bit little-endian PCM, 24kHz, mono다. 기존 재생·최종 WAV 포장 흐름에 맞는다.
- 단일 응답 기본 출력과 디자인 `sample_audio`는 완성 WAV다. RIFF 헤더를 다시 붙이지 않는다.
- 반환 MIME·샘플레이트·채널을 확인하고 다른 포맷을 기존 PCM 플레이어에 그대로 넘기지 않는다.
- 취소 신호와 첫 PCM 이전만 허용하는 재시도를 보존한다. SDK 업그레이드 후 취소·429·중간 실패·빈 응답을 mock으로 검증한다.

## 대안

| 선택 | 판단 |
|---|---|
| 2.28.0 + 좁은 REST 어댑터 | 권장. 기존 스트리밍 유지, Voices 추가, SDK 누락 필드만 보완 |
| 1.50.1 유지 + 강제 타입 변환 | 배제. 새 메서드·직렬화 지원이 해결되지 않음 |
| 전체 REST 재작성 | 불필요. SSE·취소·오류 처리 범위 확대 |
| 모든 합성을 Interactions로 전환 | 현재 불필요. 맞춤 목소리 문서의 예시 존재가 기존 스트림 전환의 필수 근거는 아님 |
| 비공식 TTS wrapper | 불필요. 공식 SDK·REST로 범위를 제어 가능 |

REST는 공식 `v1beta/voices`, `models/{model}:streamGenerateContent` 또는 `:generateContent`를 사용하며 인증은 서버 `x-goog-api-key` 헤더로만 전달한다.

## 검증·미확인 범위

1. SDK 정확 버전 고정 후 TypeScript·기존 테스트를 실행한다.
2. 실제 SDK 직렬화를 fake fetch로 검사한다. 요청 빌더만 mock한 결과로 전송을 검증했다고 주장하지 않는다.
3. 목록 페이지네이션, 누락 메타데이터, API 오류를 검사한다. 이름으로 언어·지역·성별 표현을 추정하지 않는다.
4. 실제 청취·두 화자 구별·한국어 태그 효과·스크린리더 수용은 후속 실기로 남긴다.
5. 인증 API를 호출하지 않았으므로 카탈로그와 계정 접근 가능성은 미확인이다.

## 출처

- [공식 Speech generation](https://ai.google.dev/gemini-api/docs/generate-content/speech-generation) — 정본 `docs/google-gemini/speech-generation.md`; Voice options, Extended Voice Library, Migration guide, Streaming speech generation, Audio output formats.
- [공식 Voice Design](https://ai.google.dev/gemini-api/docs/voice-design) — 정본 `docs/google-gemini/voice-design.md`; Create a designed voice, Manage your voices.
- [공식 Voice Replication](https://ai.google.dev/gemini-api/docs/voice-replication) — 정본 `docs/google-gemini/voice-replication.md`; Storage modes, Audio and consent requirements.
- [Flash TTS](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-tts), [Flash-Lite TTS](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-lite-tts) — 대응 로컬 정본 및 공통 가이드 모델 선택 절.
- [npm metadata](https://registry.npmjs.org/@google/genai) — 버전·배포 시각·engines 확인.
- [SDK 2.28.0 배포물](https://registry.npmjs.org/@google/genai/-/genai-2.28.0.tgz) — `package/dist/genai.d.ts`, `package/dist/node/index.mjs`를 설치·실행 없이 열람.
- [공식 JS SDK](https://github.com/googleapis/js-genai) — Context7 `/googleapis/js-genai`로 스트리밍·Voices 교차 확인(MEDIUM).
- 로컬 `package-lock.json`, `package.json`, `.planning/PROJECT.md`, `.planning/codebase/STACK.md`.

**완료 범위:** 문서·공개 패키지 조사. 소스·의존성 변경, 비밀값 열람, 인증 API 호출, 유료 생성, 커밋은 수행하지 않았다.
