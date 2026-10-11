# API Coverage — Gemini 3.8 TTS

> 계획 단계의 범위 결정이다. INTEGRATE는 구현 완료가 아니다. 현재 사용자 지시는 구현 전까지이며, 아래 실행은 후속 요청 전 시작하지 않는다.

| capability | decision | reason |
|---|---|---|
| flash-and-flash-lite-selection | INTEGRATE | Task 1: 두 공식 모델 allowlist |
| speech-text-style-and-inline-tags | INTEGRATE | Task 1: text 보존과 speechMetadata 분리 |
| prebuilt-two-speaker | INTEGRATE | Task 1: 공식 speakerVoiceConfigs |
| custom-multi-turn-dialogue | INTEGRATE | Task 1: 순차 합성·전역 취소·완료 경계 |
| streaming-generate-and-cancel | INTEGRATE | Task 1: 첫 출력·정리·제한 재시도 |
| output-wav-l16-mulaw-alaw | INTEGRATE | Task 1: REST encoding·MIME/rate·codec 검증 |
| service-standard-flex-priority | INTEGRATE | Task 1: 선택/실제 등급·강등/미확인 |
| voices-list-filter-pagination | INTEGRATE | Task 2: 기본30·확장·전체 공식 필터 |
| voices-get-and-prompted-preview | INTEGRATE | Task 2: 없는 sample_audio는 정상 처리 |
| voices-create-prompted | INTEGRATE | Task 2: store=true·설명·metadata |
| voices-create-replicated | INTEGRATE | Task 2: source/consent·명시 store·수명 |
| voices-delete-stored | INTEGRATE | Task 2: 대상이 명확한 명시 사용자 동작 |
| voice-remix | INTEGRATE | 공개 요청 schema 미확인으로 BLOCKED; Task 2/3에서 미완료 유지 |
| batch-create-inline | INTEGRATE | Task 2: 제한된 요청 수·byte·key·TTS config |
| batch-get-list-reopen-poll | INTEGRATE | Task 2: SDK/REST 상태 정규화 |
| batch-cancel | INTEGRATE | Task 2: POST cancel 뒤 실제 상태 조회 |
| batch-delete | INTEGRATE | Task 2: 명시 사용자 동작 |
| batch-update-internal-priority | INTEGRATE | Task 2: 공식 PATCH와 service tier 구분 |
| batch-inline-results | INTEGRATE | Task 2: 개별 성공/실패·key·audio 검증 |
| batch-file-result-download | INTEGRATE | Task 2: 서버 공식 download·JSONL·resource 검증 |
| batch-jsonl-file-upload-submission | OPEN-SCOPE | inline 우선은 계획 제안이며 사용자 승인된 제외가 아님. 전체 지원 요청에 맞춰 파일 제출 계약·자원 상한을 후속 계획에서 해결 |
| batch-webhook-notifications | OPEN-SCOPE | polling 우선은 계획 제안이며 사용자 승인된 제외가 아님. 공식 callback 계약·검증·외부 endpoint 전제 확인 후 결정 |
| interactions-api-alternative | OPT-OUT | 동일 TTS 기능은 기존 GenerateContent와 좁은 REST 어댑터로 제공 |
| live-api-tools-thinking-search | OPT-OUT | 두 3.8 TTS 모델 카드에서 미지원인 기능 |
| public-voice-catalog-document | INTEGRATE | Task 3: prebuilt GET 전수 수집·지정 정렬·실패 공개 |

실제 구현·mock·인증 조회·유료 실기·접근성 상태는 261011-mrq-VERIFICATION.md가 생성되는 향후 구현 시 구분해서 기록한다. VOICE-03과 모든 기존 ROADMAP 요구사항은 현재 Pending이다.
