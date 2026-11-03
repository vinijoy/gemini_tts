# API Coverage — 구현 후 상태

> 아래 표는 최초 구현 시점의 근거를 보존한다. Batch 제거, 키 우선순위 수정 후 최소 GET 성공, 범위별 사용자 확인 등 후속 상태는 [STATE](../../STATE.md)와 [UI 후속 기록](../../ui-followup.md)을 따른다.

최신 사용자 지시로 기존 계획을 구현했다. 아래 ‘구현/mock 통과’는 유료 실기·계정 권한·청취 수용을 뜻하지 않는다. 기존 ROADMAP/REQUIREMENTS는 변경하지 않았다.

| capability | 결정·구현 상태 | 실제 진입점 | 검사 근거 | 실제 서비스 검증 |
|---|---|---|---|---|
| flash-and-flash-lite-selection | INTEGRATE / 구현 | TtsEditor → /api/tts → tts-contract | route.test, gemini-tts.test | 미수행 |
| speech-text-style-and-inline-tags | INTEGRATE / 구현 | page의 공식 `<...>` 버튼, wireRequest의 text/speechMetadata 분리 | 실제 fetch body·UI→POST→PCM→WAV 통합 | 청취 미수행 |
| prebuilt-two-speaker | INTEGRATE / 구현 | mode=prebuilt-dialogue, speakerVoiceConfigs | 계약·화자 검증 | 미수행 |
| custom-multi-turn-dialogue | INTEGRATE / 구현 | mode=custom-dialogue, requestGroups/synthesize | 순차·후속 실패·전역 첫 출력 재시도 경계 | 미수행 |
| streaming-generate-and-cancel | INTEGRATE / 구현 | openPcm/StreamingPcmPlayer | 첫 PCM, abort, 잘림/비정상 종료, UI 늦은 응답 | 로컬 mock |
| output-wav-l16-mulaw-alaw | INTEGRATE / 구현 | REST responseFormat/audio-format/별도 다운로드 | RIFF 부가chunk·패딩·G.711 fixture·MIME/rate | 실기 미수행 |
| service-standard-flex-priority | INTEGRATE / 구현 | TtsEditor/generationConfig/service header | tier 요청/실제 강등·미제공, 429/OTHER 재시도 | 실제 등급 미확인 |
| voices-list-filter-pagination | INTEGRATE / 구현 | VoiceLibrary → /api/voices | filter OR/AND·context mapper·페이지·중복 | 현재 키 API_KEY_INVALID; 제공목록 2,089개 별도 검증 |
| voices-get-and-prompted-preview | INTEGRATE / 구현 | VoiceStudio → /api/voices/[id] | ID/preview RIFF·없는 preview·비공개 필드 제거 | 미수행 |
| voices-create-prompted | INTEGRATE / 구현 | Design 버튼 → POST /api/voices | UI→서버, store=true/input 실제 body | 유료 미수행 |
| voices-create-replicated | INTEGRATE / 제한 구현 | Replication 폼 → POST /api/voices | 성인/본인/동의·별도 두 WAV·길이/구조·store=false | WAV-only 앱 제한, MPEG 등 미지원, 유료 미수행 |
| voices-delete-stored | INTEGRATE / 구현 | 대상 확인 → DELETE /api/voices/[id] | traversal/cross-origin 차단, 명시 버튼 | 자산 mutation 미수행 |
| voice-remix | INTEGRATE / BLOCKED | VoiceStudio 설명, README | 보관 PromptedVoice에 input만 있음 | 공식 base_voice 계약 미확인; 완료 아님 |
| batch-create-inline | INTEGRATE / 구현 | BatchPanel 담기/제출 → POST /api/batches | unique key·20개/1MiB·모델/REST encoding | 유료 미수행 |
| batch-get-list-reopen-poll | INTEGRATE / 구현 | BatchPanel 목록/ID/30초 polling | terminal enum·페이지·명시 제출 UI | 실원격 미수행 |
| batch-cancel | INTEGRATE / 구현 | 확인 버튼 → POST :cancel → GET | RUNNING을 취소 완료로 오표시하지 않음 | 실원격 mutation 미수행 |
| batch-delete | INTEGRATE / 구현 | 확인 버튼 → DELETE | same-origin/ID 경계 | 실원격 mutation 미수행 |
| batch-update-internal-priority | INTEGRATE / 구현 | 정수 priority → PATCH updateGenerateContentBatch | updateMask=priority·원본 필드 보존 fixture | 실원격 mutation 미수행 |
| batch-inline-results | INTEGRATE / 구현 | /api/batches/[id]/results → Blob/WAV | SDK/REST 중첩·개별 실패·중복·v2 전체그룹 누락 | 미수행 |
| batch-file-result-download | INTEGRATE / 구현 | 검증된 Files download 경로 | JSONL·임의 URL 거부·32MiB | 미수행 |
| batch-jsonl-file-upload-submission | OPEN-SCOPE → INTEGRATE / 제한 구현 | ‘검증한 항목을 JSONL 파일로 업로드’ | resumable start/finalize→fileName, 외부host 거부 | 임의 외부 JSONL/기존 Files ID import 미지원, 유료 미수행 |
| batch-webhook-notifications | OPEN-SCOPE / 미구현 | README에 남은 범위 | 공개 endpoint·서명 검증 인프라 없음 | 등록·외부 전송 없음; 승인된 제외 아님 |
| interactions-api-alternative | OPT-OUT | GenerateContent REST로 같은 TTS 경로 제공 | SDK mapper의 encoding 누락을 좁은 REST로 보완 | 대체 API 구현 아님 |
| live-api-tools-thinking-search | OPT-OUT | TTS 모델 카드의 미지원 capability | 별도 추가 없음 | 해당 없음 |
| public-voice-catalog-document | INTEGRATE / 제공목록 완료·현재 키 조회 미완료 | 정본 GEMINI-TTS-VOICES.md + source=provided | 원문 SHA·2,089 고유/한국어117·50+50+17; generator 6 tests | 다른 프로젝트 2026-10-01 출처. 현재 API_KEY_INVALID와 별개 |

VOICES lookup/생성 필드는 실제 보관 API와 SDK 타입을 대조했다. 검색 2,048바이트, 페이지50, source WAV 5MiB·동의60초는 API 조건과 앱 제한을 문서에서 구분한다. 모든 실제 유료 생성·VoiceOver/NVDA·청취는 미수행이며 전 요구사항 수용 완료를 주장하지 않는다.
