# 기능 조사: Gemini 3.8 TTS Web UI

> 이 문서는 작성 당시의 계획·조사 기록이다. 현재 제품 범위는 [PRD](../../PRD.md)를 따르며, 아래 계획이나 검증 상태를 현재 구현·실기 수용 완료로 해석하지 않는다.

**조사일:** 2026-10-11  
**범위:** 공식 Flash / Flash-Lite TTS 기능 대조. 아래 항목은 구현 완료가 아닌 후속 구현·검증 체크리스트다.  
**신뢰도:** MEDIUM — `classify-confidence --provider websearch --verified` 결과. 공식 가이드·모델 카드·Voices reference·연결 OpenAPI를 교차 확인했다. research-plan은 jina를 선택했지만 도구가 없어 검색+공식 HTTPS로 대체하고 digest를 저장했다. 실제 인증 카탈로그/유료 생성/청취는 수행하지 않았다.

## Table Stakes / Differentiators

| 기능 | 구분 | 복잡도 | 구현 조건 |
|---|---|---|---|
| 모델 선택·단일 화자 재생·저장 | 기본 | 중 | 두 공식 모델 ID, MIME과 실제 audio 형식 일치 [S1–S3] |
| 대본·연출 분리 | 기본 | 중 | text는 그대로 낭독, style은 턴 전체 연출 [S1] |
| 목소리 검색·필터·페이지·분류 문서 | 기본 | 중 | 기본 30개+확장 library, 누락 메타데이터를 추정하지 않음 [S1,S6] |
| 키보드·한국어 안내·취소·복구 | 기본 | 중 | 기존 PCM 경계, 최초 PCM 이후 재시도 금지, 부분 파일 저장 방지 유지 |
| 두 화자·턴별 연출·맞장구 | 차별화 | 높음 | 단일 요청 prebuilt 최대 2명; custom 턴별 개별 합성 [S1] |
| Voice Design·preview·관리 | 차별화 | 높음 | 영속 ID 생성, 반환 preview, list/get/delete [S4,S6] |
| Voice Replication | 차별화 | 높음 | 실제 성인 동일 화자의 원본·동의 녹음, 저장 모드·만료 [S5,S7] |
| 출력 encoding·sample rate | 공식 지원 | 높음 | L16/WAV/MULAW/ALAW, 올바른 재생·파일 [S1] |
| Batch/Flex/Priority | 공식 지원 | 높음 | 모델 카드 지원 확인, 아래 서비스 등급·Batch 수명주기 계약 구현 [S2,S3,S8–S12] |
| Remix | 문서 불일치 | 미정 | base_voice 언급 있으나 공개 요청 schema에 필드 없음. 확인 전 구현 지원 주장 금지 [S6,S7] |

사용자 요청은 공식 기능 전수 반영이다. 첫 슬라이스만 구현하고 전체 완료라고 보고하지 않는다. 기존 1,000자 상한은 제품 제한이며 공식 토큰 제한과 구분한다.

## 모델별 기능·제약

| 항목 | Flash | Flash-Lite |
|---|---|---|
| ID | `gemini-3.8-flash-tts` | `gemini-3.8-flash-lite-tts` |
| 입력/출력 | 텍스트/오디오 | 텍스트/오디오 |
| 입력 토큰 | 8,192 | 8,192 |
| 출력 토큰 | 16,384 (Gemini API serving limit) | 동일 |
| 언어 자동 감지 | 130개 이상 | 100개 이상 |
| 한국어 | 지원 | 지원 |
| Batch / Flex / Priority | 지원 | 지원 |
| 모델 카드 업데이트 | 2026-09 | 2026-09 |

둘 모두 Caching, Code execution, File search, Function calling, Maps grounding, Image generation, Live API, Search grounding, Structured outputs, Thinking, URL context 미지원. Batch를 Live 지원으로 혼동하지 않는다. 언어별 차이는 S1 Supported languages 표를 유지한다. [S2,S3]

## 대본·연출·다중 화자 체크리스트

- [ ] JS `models.generateContent/GenerateContentStream`의 실제 메서드는 `generateContent` / `generateContentStream`. `contents[].parts[].text`, `parts[].speechMetadata.style`, `config.responseModalities:['AUDIO']`, `config.speechConfig.voiceConfig.voice`에 기본 이름/custom ID/key를 전달한다. REST 가이드는 `parts[].speech_metadata`와 `generationConfig.speechConfig.voiceConfig.voice`를 사용한다. snake_case와 camelCase를 계열별로 구분한다. [S1]
- [ ] 3.8 text는 낭독 원문이다. 대본에 Director's Notes를 붙이지 않는다. style은 감정·말투·억양·속도·음량·호흡 상태를 짧게 지정하고 공란도 정상이다. 영구적 나이·성별·고정 accent는 목소리 선택/Design에 둔다. 한 턴 중 연출 변화는 턴 분리한다. [S1,S4]
- [ ] 수치 speed/pitch/volume 별도 API 범위는 확인되지 않았다. 자연어 style 제어임을 표시한다. 문장부호, 말줄임표, 대문자 강조를 유지한다. [S1]
- [ ] 영어 인라인 권장 태그 전체: `<argh>`, `<breath>`, `<heavy breath>`, `<exhales>`, `<cackle>`, `<cheer>`, `<chuckle>`/`<chuckles>`, `<cough>`, `<cry>`, `<gasp>`, `<giggle>`, `<groan>`, `<growl>`, `<grunt>`, `<grr>`, `<hiss>`, `<laugh>`/`<laughter>`, `<moan>`, `<pant>`, `<pff>`/`<phew>`, `<scream>`, `<shout>`, `<shriek>`, `<sigh>`/`<sighs>`, `<sneeze>`, `<snicker>`, `<snort>`, `<sob>`, `<throat-clearing>`, `<tsk>`, `<whimper>`, `<whispers>`/`<whispering>`, `<yawn>`, `<short pause>`, `<long pause>`. 한국어 대본에도 영어 태그 권장. 닫힌 enum이라고 주장하지 않는다. 사람 발성 중심이며 정밀 밀리초 pause·비발성 효과는 보장하지 않는다. [S1]
- [ ] 두 화자는 `config.speechConfig.multiSpeakerVoiceConfig.speakerVoiceConfigs[]` 안 `speaker`, `voiceConfig.prebuiltVoiceConfig.voiceName`으로 설정한다. 각 part의 `speechMetadata.speaker`는 매핑과 정확히 일치하며 `style`은 선택이다. 라벨을 text에 추가해 읽지 않는다. [S1]
- [ ] 맞장구/겹침은 턴 안 `|oh really?|` 같은 pipe segment. 겹침 발화는 Flash에서 가장 잘 작동한다는 권고를 표시한다. [S1]
- [ ] 한 요청 다중 화자는 prebuilt 최대 2명. custom `voice_...`/`voicekey_...`는 턴별 합성 후 PCM 결합한다. 한 요청 설정에 억지 삽입하지 않는다. custom 두 화자를 제공하지 못하면 미구현으로 추적한다. [S1]

## 출력 형식·응답

| 항목 | 공식 계약 | 처리 |
|---|---|---|
| unary 기본 | AUDIO_WAV, audio/wav, RIFF, 24kHz mono signed PCM16 LE | WAV에 헤더 중복 추가 금지 |
| stream 기본 | AUDIO_L16, raw PCM16 LE, 24kHz mono | PCM boundary와 취소 보존 |
| override | `config.responseFormat.audio.mimeType` / REST `generationConfig.responseFormat.audio.mimeType` | AUDIO_WAV / AUDIO_L16 / AUDIO_MULAW / AUDIO_ALAW |
| rate | 동일 객체 `sampleRate`, 기본 24000, 예시 24000/16000/8000 | 예시를 전체 허용 enum으로 단정하지 않음 |
| μ-law/A-law | G.711, audio/basic 또는 audio/mulaw / audio/alaw, 보통 8kHz | PCM16처럼 디코딩하지 않음 |
| GenerateContent 응답 | `candidates[].content.parts[].inlineData.data`, MIME 정보 | 빈 응답·예상 외 형식·여러 part·완료 사유 검증 |
| custom 턴 결합 | raw L16 권장 | WAV 전체를 byte 결합하지 않음; 44-byte를 모든 WAV의 고정 헤더로 가정하지 않음 |
| Interactions 예제 | `response_format:{type:'audio'}`, `generation_config.speech_config:[{voice:id}]`, text의 `annotations:[{type:'speech_metadata',style}]` | helper `output_audio.data`, REST steps의 audio content. GenerateContent parser와 분리 |

출처 [S1,S4,S5]. 공식 샘플레이트와 앱이 실제 처리한 rate를 검증해야 한다.

## 카탈로그·필터·메타데이터와 목소리 문서

- [ ] `GET /v1beta/voices`, `ai.voices.list()`. 가이드 최소 SDK: JS @google/genai 2.24.0+, Python google-genai 2.25.0+. 기존 1.50.1에 새 API가 있다고 가정하지 않는다. [S1,S4,S5]
- [ ] 저장 custom 최신순 이후 prebuilt catalog. 공개 목록 문서는 `type=prebuilt`로 범위를 분명히 한다. [S6]
- [ ] 필터 전체: `language_code[]` BCP-47, `region_code[]` ISO 3166-1 alpha-2 또는 UN M.49, `accent[]`, `gender[]` female/male/neutral, `pitch[]` low/medium/high, `persona[]`, `type[]` prebuilt/prompted/replicated, JS `contexts[]` / REST `context[]`, `search`. 같은 필터 OR, 필터 간 AND. 목록 문자열은 대소문자 무시 정확 일치. search는 display_name/description 부분 검색이며 **2048 bytes** 상한. [S1,S6]
- [ ] `page_size` 기본 50 최대 1000. 적게 반환돼도 종료라고 단정하지 않고 `next_page_token`까지 따른다. 페이지 이동 시 모든 필터 유지, page_size만 변경 가능; 불일치는 INVALID_ARGUMENT. [S6]
- [ ] 목록 응답 `{voices?:Voice[],next_page_token?:string}`. Voice: `id,type,display_name,description,language_code,region_code,accent,gender,pitch,persona,context,model,expire_time,prompted,sample_audio,usage,key`. 다수 optional이며 replicated는 입력 전용. [S6,S7]
- [ ] custom `model`은 생성 모델이고 prebuilt에는 없다. custom은 지원 TTS 합성 모델 간 재사용 가능하다. prebuilt id는 이름, 저장 custom은 voice_ ID, stateless는 id 없이 voicekey_ key. [S6,S7]
- [ ] `GEMINI-TTS-VOICES.md`: **언어·지역 → 성별 표현 → 이름**. gender는 perceived presentation이며 실제 성정체성이 아니다. 미제공 필드는 ‘공식 메타데이터 미제공’, API 실패는 ‘조회 미완료’로 구분한다. 이름·음색으로 성별/국가를 추정하지 않는다. 기본 언어는 그 언어만 합성 가능하다는 제한이 아니다.
- [ ] 전체 목록 문서에 조회일·필터·페이지·ID·원본 설명과 누락/실패를 기록한다. 30개 하드코딩은 전체 카탈로그 완료가 아니다.

기본 30개와 공식 음색 [S1]: Zephyr Bright; Puck Upbeat; Charon Informative; Kore Firm; Fenrir Excitable; Leda Youthful; Orus Firm; Aoede Breezy; Callirrhoe Easy-going; Autonoe Bright; Enceladus Breathy; Iapetus Clear; Umbriel Easy-going; Algieba Smooth; Despina Smooth; Erinome Clear; Algenib Gravelly; Rasalgethi Informative; Laomedeia Upbeat; Achernar Soft; Alnilam Firm; Schedar Even; Gacrux Mature; Pulcherrima Forward; Achird Friendly; Zubenelgenubi Casual; Vindemiatrix Gentle; Sadachbia Lively; Sadaltager Knowledgeable; Sulafat Warm. 이 표만으로는 성별·언어·지역을 분류할 수 없다.

## Voice Design·관리·리믹스

- [ ] 생성 `POST /v1beta/voices`: `{store:true,voice:{model,type:'prompted',display_name,prompted:{input}}}`. input 필수, store true 필수(false는 INVALID_ARGUMENT). model 생략 시 서비스 기본 모델. 선택 메타데이터는 Voice 스키마에 맞춘다. [S4,S6,S7]
- [ ] 1–2문장으로 영구 특성 설계, 대본/상황 연출과 분리. **input 최대 길이/byte 상한은 확인한 가이드와 OpenAPI에 없다.** 앱 제한은 별도로 표시한다. [S4,S7]
- [ ] `sample_audio:{mime_type:'audio/wav',data:base64}`는 prompted Create/Get에서만 반환. List·prebuilt·replicated에는 없음. 목록의 preview 부재를 실패로 처리하지 않는다. [S4,S6]
- [ ] usage는 prompted Create에서만 토큰 통계 반환, replicated·Get·List에는 없다. 누락을 사용량 0으로 표시하지 않는다. [S6,S7]
- [ ] GET/DELETE `/v1beta/voices/{id}`. prebuilt는 Get 미지원으로 List 사용. 삭제는 해당 사용자 동작으로 실행한다. [S6]
- [ ] 저장 prompted+replicated 합계 프로젝트당 200개, 1년 비활동 후 만료/삭제. 합성 또는 remix base 사용 때 expire_time 연장. stateless key 7일 TTL. [S1,S5,S6]
- [ ] **Remix 미확인:** VoiceType와 TTL 설명은 base_voice를 언급하지만 연결 OpenAPI PromptedVoice.properties에는 input만 있고 base_voice 위치·형식이 없다. 추정 필드를 만들어 실행하지 않는다. 명세 확인 대기로 추적한다. [S6,S7]
- [ ] **store 기본값 충돌:** replication guide는 true 기본, API reference/OpenAPI는 false 기본. 모든 생성 요청에서 store를 명시한다. [S5–S7]

## Voice Replication·동의

- [ ] 두 모델 지원. `voice.type:'replicated'`, `voice.replicated.source_audio`와 `consent_audio` 각각 `{mime_type,data:base64}` 필수. 변조하지 않은 성인 인간의 실제 원본이며 두 녹음은 같은 화자다. [S5,S7]
- [ ] source는 **10–30초** 깨끗한 자연 발화. **24kHz mono 16-bit WAV는 권장**. AudioData는 audio/wav/audio/mpeg 예시가 있으나 허용 MIME 전체 enum은 미확인. 동의 녹음 길이·파일 용량 상한도 문서에서 확인되지 않았다. [S5,S7]
- [ ] 필수 동의 문장으로 직접 녹음한다. 공식 영어 원문:

<!-- DATA_3fa90e2b_START -->
> I am the owner of this voice and I consent to Google using this voice to create a synthetic voice model.
<!-- DATA_3fa90e2b_END -->

- [ ] S5의 언어별 동의 링크 `#consent-phrases-by-language`는 보관 본문에서 해당 표를 제공하지 않는다. **한국어 공식 필수 문구 미확인**. 임의 번역을 인증 가능한 문구로 제시하지 않는다.
- [ ] 체크박스로 녹음을 대체하거나 합성으로 동의 발화를 만들지 않는다. 사용자 동작으로 원본·동의 파일을 전송한다. mock 검증만 수행하고 유료 복제를 자동 호출하지 않는다.
- [ ] 명시 store true → id, list/get/delete; store false → key, 클라이언트 관리, 선택 메타데이터는 저장/반환되지 않음. key를 합성 voice에 전달한다. key/동의 음성을 문서·로그에 저장하지 않는다. [S5–S7]

## Anti-Features

| 제외할 동작 | 이유 | 대안 |
|---|---|---|
| 대본에 연출을 붙여 낭독 | 3.8 verbatim | speechMetadata |
| custom을 단일 요청 2화자 설정에 삽입 | 공식 prebuilt 제약 | 턴별 합성 |
| 이름으로 성별/언어 추정 | 근거 없음 | 미제공/조회 실패 구분 |
| prompt 상한·remix 필드·정밀 휴지를 임의 확정 | 스키마 공백 | 추가 확인 과제 |
| 모든 audio를 PCM16 취급 | 파일/재생 손상 | encoding별 검증 |
| 자동 유료 미리듣기 | 검증 범위 초과 | 반환 preview 재사용 |
| 생성 이력/BGM/계정/배포 확대 | 이번 범위 밖 | 모델 기능에 집중 |

## 의존성·권장 구현 순서

모델/전송 계약 → 대본·style 분리 → 단일 화자 스트림·취소 회귀.  
카탈로그/페이지 → 메타데이터 분류 → 목소리 문서.  
턴 구조/prebuilt 매핑 → 두 화자/맞장구 → custom 턴별 결합.  
Voices/store 명시 → Design/preview/list/get/delete → Replication/동의/만료.  
포맷 파싱 → PCM/WAV → G.711/sampleRate.  
서비스 등급과 Batch create/get/list/cancel/results 계약 → 별도 비동기 작업 화면. Remix만 공개 스키마 확인 전 차단.

첫 슬라이스는 모델·style·기본 목소리·스트리밍/WAV·취소다. 전체 기능 요청은 후속 항목을 구현하거나 미확인/미구현으로 정직하게 남겨야 한다.

## 남은 검증·조사

1. Batch/Flex/Priority 상세 계약은 아래 보강 완료. 실제 프로젝트 등급·사용 권한·유료 호출 수용은 별도 검증이다.
2. Remix base_voice 요청 schema, prompt 상한, 복제 파일 용량, 동의 녹음 길이와 한국어 문구는 미확인.
3. 인증 카탈로그 전체·프로젝트 권한·실제 목소리 가용성 미검증.
4. 한국어 품질·겹침·실제 음성 생성·VoiceOver는 mock 검사와 분리된 사람/기기 수용.

## Sources

- [S1] [Text-to-speech](https://ai.google.dev/gemini-api/docs/generate-content/speech-generation), `docs/google-gemini/speech-generation.md`. Single/Multi speaker, Voice options, Filtering, Prompting, Streaming, Output formats, Limitations.
- [S2] [Flash TTS](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-tts), `docs/google-gemini/gemini-3.8-flash-tts.md`. 코드·토큰·Capabilities·Consumption·언어.
- [S3] [Flash-Lite TTS](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-lite-tts), `docs/google-gemini/gemini-3.8-flash-lite-tts.md`. 동일.
- [S4] [Voice Design](https://ai.google.dev/gemini-api/docs/voice-design), `docs/google-gemini/voice-design.md`. Create/Synthesize/Manage/Best practices.
- [S5] [Voice Replication](https://ai.google.dev/gemini-api/docs/voice-replication), `docs/google-gemini/voice-replication.md`. Storage/Audio and consent/Create/Synthesize/Manage.
- [S6] [Voices API](https://ai.google.dev/api/voices), `docs/google-gemini/voices-api.md`. 전체 HTML 등록·보관, Create/List/Get/Delete, 2026-10-11.
- [S7] [Official OpenAPI](https://ai.google.dev/static/api/interactions.openapi.json), `docs/google-gemini/interactions-openapi.md`. S6 연결 전체 JSON 등록·보관. Voice/CreateVoiceRequest/PromptedVoice/ReplicatedVoice/AudioData, 2026-10-11.


## 서비스 등급 구현 계약 — 2026-10-11 보강

**TTS 호환 근거:** S2/S3의 두 TTS 모델 카드가 Batch/Flex/Priority 모두 Supported라고 명시한다. 일반 Flex/Priority 가이드의 모델 목록에는 TTS가 빠져 있어 문서 간 범위 차이가 있다. TTS 전용 모델 카드의 명시 지원을 기준으로 노출하되 프로젝트 권한·가용성·실제 응답 오류를 처리한다. 유료 호출로 지원을 확인하지 않았다. [S2,S3,S10,S11]

| 화면 선택 | JS GenerateContent config | REST 요청 최상위 | 동작·조건 |
|---|---|---|---|
| 기본 | 생략 또는 `serviceTier: ServiceTier.STANDARD` | `service_tier:"standard"` 또는 생략 | 기본값 standard |
| 비용 절감 Flex | `serviceTier: ServiceTier.FLEX` | `service_tier:"flex"` | 통상 표준의 50% 가격, 지연 변동·best effort |
| 우선 처리 Priority | `serviceTier: ServiceTier.PRIORITY` | `service_tier:"priority"` | Tier 2/3 사용자 대상, 추가 비용, 서버에서 standard로 강등 가능 |
| 일괄 처리 Batch | 위 serviceTier에 batch를 넣지 않음 | 별도 `models/{model}:batchGenerateContent` | 비동기 작업·목록·상태·결과 제공 |

다운로드한 공식 SDK 2.28.0 배포물 `ServiceTier` enum은 `unspecified/flex/standard/priority`. TypeScript에서는 enum 상수를 사용한다. SDK `GenerateContentConfig.serviceTier`는 전송 때 요청 **최상위 serviceTier**로 매핑하며 `generationConfig` 안에 들어가지 않는다. 공식 REST 예제는 proto 허용 snake_case `service_tier`를 쓴다. Interactions 방식은 최상위 `service_tier`다. TTS의 contents/speechConfig/responseFormat은 기존 계약 그대로 유지한다. [S10–S12]

- [ ] Flex는 `generateContentStream` 공식 예제도 있으므로 기존 스트림 경로에서 선택 가능하다. 요청별 `config.httpOptions.timeout` 단위는 **밀리초**다. 가이드는 큐 대기용 10분 이상 timeout을 권장한다. 스트림 60초 예제와 권고가 다르므로 예제 숫자를 제품 강제 상한으로 복사하지 않는다. 기존 서버/호스팅 제한과 취소는 별도다. [S10]
- [ ] Flex 부족 시 503 또는 429. 서버는 예상치 못한 비용을 막기 위해 standard로 자동 상향하지 않는다. 앱도 비용을 바꾸는 fallback을 조용히 수행하지 않는다. 재시도는 취소 가능하고 첫 PCM 이전에만 기존 제한 안에서 한다. 큐 대기·일반 요청과 동일 rate limit임을 안내한다. [S10]
- [ ] Priority는 Tier 2/3, 기본 rate limit은 해당 model/tier standard의 0.3배이며 전체 interactive traffic 제한에도 포함된다. 초과 트래픽은 서버에서 standard로 처리하고 standard 요금 적용. `x-gemini-service-tier` 응답 헤더로 실제 등급을 표시한다. [S11]
- [ ] **SDK 가이드 오류 방지:** 배포물 2.28.0 `sdkHttpResponse.headers`는 `Record<string,string>`이다. `headers?.['x-gemini-service-tier']`로 읽으며 가이드의 `.headers.get()`를 그대로 복사하지 않는다. 헤더 없으면 ‘실제 등급 미제공’으로 두고 요청 등급을 실제 등급으로 위장하지 않는다. [S11,S12]
- [ ] 가격 표는 Flex/Batch 표준 대비 50%, Priority 75–100% 추가라는 일반 설명이다. 모델별 정확한 금액·프로젝트별 비용을 추정하지 않는다. 사용자가 가격·지연 설명을 보고 선택한 값만 전송한다. [S8,S10,S11]

## Batch 구현 계약 — 생성부터 결과까지

**기본:** GenerateContent만 지원하는 비동기 API. TTS 두 모델에 가능하다. 완료 목표는 24시간이며 SLA 보장으로 표시하지 않는다. pending/running이 48시간을 넘으면 EXPIRED이며 결과 없음. 결과는 기본 **6주** 다운로드 가능 후 영구 삭제된다. [S2,S3,S8]

### 입력과 생성

권장 앱 첫 경로는 작은 inline batch다. 동일 모델로 합성할 대본/턴 집합을 제출하고 각각 고유 `metadata.key`를 부여한다. 한 TTS 생성 요청의 style/voice/encoding을 각 요청에 넣는다. Batch는 화자 간 음성 생성 문맥을 공유하는 대화 API가 아니므로 각 요청을 독립 요청으로 취급한다.

| 동작 | 설치 JS SDK 2.28.0 | REST v1beta |
|---|---|---|
| Inline 생성 | `ai.batches.create({model,src:[{contents,config,metadata:{key}}],config:{displayName}})` | POST `models/{model}:batchGenerateContent`; body `{batch:{displayName,inputConfig:{requests:{requests:[{request:{contents,generationConfig},metadata:{key}}]}}}}` |
| 파일 입력 | Files 업로드 후 `src:uploadedFile.name` 또는 `src:{fileName}` | batch.inputConfig.fileName에 Files resource name |
| 입력 파일 형식 | JSONL 각 줄 `{key,request:{contents,generationConfig}}` | 고유 key로 결과 매핑 |
| 생성 반환 | `BatchJob`, `name:"batches/..."` 저장 | `Operation`, name/done/metadata/(response 또는 error) |

Inline 요청 총량 **20MB 미만** 권장, 입력 JSONL 파일 최대 **2GB**. 입력 파일 업로드 없이 inline 경로만 구현하더라도 Batch 자체의 제출·목록·취소·결과는 완성할 수 있다. 큰 파일 업로드를 지원하지 않으면 앱 제한으로 안내한다. 입력 참조에는 임의 외부 URL이나 다른 프로젝트 자원을 허용하지 않는다. 모델은 job 수준에서 두 TTS ID만 허용하고 inline request별 모델 재지정은 받지 않는다. [S8,S9,S12]

TTS inline config는 `responseModalities:['AUDIO']`, `speechConfig`, `responseFormat`을 포함한다. Batch 출력은 unary 요청 결과이므로 기본 WAV; 이후 PCM 파서로 오인하지 않는다. 개별 request의 앱 1,000자 제한을 유지하고 Batch 전체 수/바이트 제한은 앱 제한으로 별도 명시한다.

### 조회·목록·상태

| 동작 | SDK | REST |
|---|---|---|
| 단건 조회 | `ai.batches.get({name})` | GET `/v1beta/batches/{id}`, body 없음 |
| 목록 | `ai.batches.list({config:{pageSize,pageToken,filter}})`, Pager | GET `/v1beta/batches?pageSize=...&pageToken=...`, 반환 `operations[]/nextPageToken` |
| 작업 이름 | 서버 반환 name을 보존 | arbitrary URL 대신 `batches/{id}` resource만 허용 |
| 폴링 | 공식 예제 30초 간격 | terminal까지 조회; 화면 닫기는 작업 취소와 다름 |

SDK `BatchJob` 주요 필드: name, displayName, model, state, createTime, startTime, endTime, updateTime, dest, error. SDK 타입에는 일부 Vertex-only 주석이 있으므로 실제 누락 필드에 의존하지 않는다. REST `Operation.metadata`에 state/model/displayName/timestamps/batchStats/output이 있고 최종 response/error도 있다. **SDK 객체의 state/dest와 REST Operation을 동일한 JSON으로 가정하지 않는다.** [S9,S12]

상태 UI: PENDING 대기, RUNNING 처리 중, SUCCEEDED 완료, FAILED 실패, CANCELLED 취소, EXPIRED 만료. 취소 POST 이후 terminal 전에는 앱 자체 상태로 ‘취소 요청 중’을 표시한다(REST BatchState에 CANCELLING enum은 없다). SDK는 `JOB_STATE_*`를 반환한다. REST BatchState는 `BATCH_STATE_*`일 수 있으며 SDK mapper가 변환한다. terminal 4개(SUCCEEDED/FAILED/CANCELLED/EXPIRED)에서 자동 폴링을 멈춘다. 실패/만료를 재생 가능한 결과로 처리하지 않는다. 가이드의 일부 REST 예제는 JOB_STATE를 쓰므로 parser는 원본 API enum과 SDK 타입 기준으로 구분한다. [S8,S9,S12]

### 취소와 삭제

- [ ] SDK `await ai.batches.cancel({name})` 반환은 void. REST **POST** `/v1beta/batches/{id}:cancel`, 빈 body, 성공 응답 `{}`. 가이드 curl에 method가 생략된 예제가 있으므로 GET으로 구현하지 않는다. [S9,S12]
- [ ] 취소는 비동기 best effort. POST 성공 직후 ‘취소 완료’라고 하지 않고 GET으로 terminal 상태를 확인한다. 경합으로 먼저 성공한 작업을 취소되었다고 덮어쓰지 않는다. 성공적인 취소의 Operation.error.code는 1(CANCELLED)이다. [S9]
- [ ] HTTP AbortSignal은 클라이언트 연결만 끊으며 서버 작업을 취소하지 않는다. Batch에는 반드시 cancel endpoint를 사용한다. 이미 처리된 작업의 비용 소급 취소를 주장하지 않는다. [S12]
- [ ] 삭제 SDK `ai.batches.delete({name})`, REST DELETE `/v1beta/batches/{id}`. **문서 충돌:** 가이드는 삭제하면 신규 처리를 중지한다고 하지만 API reference는 작업 취소가 아니라고 명시한다. 삭제를 취소 대체로 쓰지 않고 cancel 확인 후 사용자 요청으로 기록 삭제한다. [S8,S9]

### 결과 회수·오디오 판정

- [ ] SDK 성공 결과: `batchJob.dest.inlinedResponses[]`의 `metadata`, `response?:GenerateContentResponse`, `error?:JobError`. 입력 순서를 유지하며 metadata.key로 검증한다. job 성공과 개별 요청 성공을 분리한다. [S8,S9,S12]
- [ ] 파일 결과: SDK `dest.fileName`, REST output `responsesFile`. JSONL 각 줄의 key/response/error를 검사한다. **설치 SDK** `ai.files.download({file,downloadPath})`는 `Promise<void>`이며 가이드의 Buffer 반환 예제와 다르다. 서버 임시파일에 내려받아 읽거나, 아래 공식 download endpoint를 서버에서 읽는다. [S8,S12]
- [ ] 다운로드 REST: GET `https://generativelanguage.googleapis.com/download/v1beta/{responsesFile}:download?alt=media`, x-goog-api-key는 서버에서만. 반환 file resource name을 검증하여 임의 URL fetch를 막는다. [S8]
- [ ] **REST 결과 중첩:** `GenerateContentBatchOutput.inlinedResponses.inlinedResponses[]`가 정식 schema다. `metadata.output` 및 최종 `response`에 나타나는 output을 확인한다. 2.28.0 SDK mapper는 `metadata.output`을 dest로, 내부 이중 inlinedResponses를 배열로 변환한다. REST를 쓸 때 SDK dest 배열 모양으로 읽지 않는다. [S9,S12]
- [ ] 개별 response의 모든 candidate/content.parts에서 예상 audio inlineData를 선택하고 base64·MIME·RIFF 또는 PCM 구조·빈 결과·완료 사유를 검증한다. text helper를 읽어 TTS 성공을 판정하지 않는다. 검증된 요청만 재생/WAV 저장; 실패 요청은 원본 key와 오류 표시. 원본 순서와 실제 sampleRate를 유지한다.
- [ ] 새로고침 후 작업 이름/목록으로 다시 조회할 수 있어야 한다. 요청 제출 중 연결이 끊기면 생성 결과를 모르는 상태로 안내하고 목록에서 확인한다. 무조건 재생성하면 중복 비용이 발생할 수 있다. API 키나 voicekey를 작업 문서/로그에 보관하지 않는다.

### Batch 추가 제어와 범위

Reference는 `batch.priority` int64 문자열(음수 허용, 기본 0, 큰 값 우선)을 제공한다. **이 값은 유료 serviceTier priority와 다른 Batch 내부 순서**다. 설치 SDK CreateBatchJobConfig에는 priority가 없으므로 노출하려면 REST 계약을 이용한다. `PATCH /v1beta/batches/{id}:updateGenerateContentBatch?updateMask=priority`로 `{model,displayName,inputConfig,priority}` 형태 GenerateContentBatch 본문을 사용하며 원본 값 보존·정확한 mask 검증이 필요하다. 사용자 요구의 ‘전체 지원’ 추적에서 이 제어의 UI 제공 여부도 기록한다. [S9]

Webhooks `batch.succeeded/batch.failed`와 batch.webhookConfig.uris는 polling 대안으로 공식 지원된다. 현재 로컬 앱에는 polling으로 완결된 결과 회수 경로를 제공하고, webhook 외부 공개 endpoint/인증/서명 검증을 구현하지 않았다면 지원 완료로 표시하지 않는다. 등록·외부 알림 전송은 이번 조사에서 수행하지 않았다. [S8,S9]

### mock 계약 검증 사례

1. 두 모델×standard/flex/priority 요청 값과 변환 위치, PCM 첫 바이트 이후 재시도 금지.
2. Priority 실제 헤더 standard/priority/미제공을 구분하고 Flex 실패가 자동 상향되지 않음.
3. inline Batch 생성 model·contents·speech metadata·config·metadata.key 보존; 생성 응답 name 누락 오류.
4. 목록 pagination, 단건 PENDING→RUNNING→SUCCEEDED, FAILED/CANCELLED/EXPIRED 종료.
5. cancel POST 성공 뒤 RUNNING 지속과 성공 경합, Abort와 cancel의 구분.
6. 일부 inline error + 일부 WAV 성공, 중첩 REST output과 SDK dest 차이, 파일 JSONL 오류/빈 결과.
7. 파일 결과 다운로드는 서버에서만, 형식/rate·완료 판정 후 저장, 결과 미제공/만료 안내.

## Remix 재확인 결과

다운로드한 @google/genai 2.28.0 배포물 `dist/genai.d.ts`에 `base_voice|baseVoice|remix` 정확 검색 결과 **0개**. S7의 OpenAPI PromptedVoice.properties는 input 한 개이며 base_voice 필드는 없다. 따라서 요청 위치를 추정할 수 없고 **구현 차단 사유는 공개 요청 스키마 부재**다. 단순 설명 변경으로 새 Design을 만드는 기능을 remix라고 부르지 않는다. [S7,S12]

## 보강 Sources

- [S8] [Batch guide](https://ai.google.dev/gemini-api/docs/batch-api), `docs/google-gemini/batch-api.md`, 전체 HTML 등록·보관. 생성·상태·결과·목록·취소·삭제·24시간 목표·48시간 만료·6주 결과 보관.
- [S9] [Batch API reference](https://ai.google.dev/api/batch-mode), `docs/google-gemini/batch-api-reference.md`, 전체 HTML 등록·보관. Operation/InputConfig/InlinedResponses/BatchState/취소 HTTP/priority.
- [S10] [GenerateContent Flex](https://ai.google.dev/gemini-api/docs/generate-content/flex-inference), `docs/google-gemini/flex-inference.md`, 전체 HTML 등록·보관. serviceTier·streaming·timeout·오류·fallback·가격.
- [S11] [GenerateContent Priority](https://ai.google.dev/gemini-api/docs/generate-content/priority-inference), `docs/google-gemini/priority-inference.md`, 전체 HTML 등록·보관. Tier 2/3·header·강등·rate·가격.
- [S12] 다운로드한 공식 SDK 2.28.0 배포물 정본 tarball 내부 `package/dist/genai.d.ts`와 `package/dist/node/index.mjs`; 전체 보관 `docs/google-genai/sdk-2.28.0-types.md`, `docs/google-genai/sdk-2.28.0-node.md`. Batches, GenerateContentConfig, ServiceTier, InlinedRequest/Response, DownloadFileParameters, HttpResponse 및 Mldev 변환 확인.
