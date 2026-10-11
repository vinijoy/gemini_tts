---
quick: 261011-mrq
status: passed-with-explicit-external-gaps
verified_at: 2026-10-11
paid_api_calls: false
roadmap_acceptance: pending
---

# Gemini 3.8 TTS 구현 검증

이 문서는 quick 구현과 자동 검사의 결과이다. 로드맵 3개 단계나 22개 제품 요구사항의 실기 수용을 완료 처리하지 않는다. 사용자 최신 요청으로 계획 전용 제한이 해제되어 같은 계획의 3개 순차 작업을 실행했다. 격리는 none, 구현자는 1명이며 마지막 코드베이스 문서 갱신만 전담 mapper에게 맡겼다.

## 요구사항 22개 대응

| ID | 구현·실제 경로 | 자동/로컬 근거 | 남은 검증 |
|---|---|---|---|
| TTS-01 | MODELS allowlist, 모델 선택, REST streamGenerateContent | 두 정확한 모델 fetch URL 검사 | 유료 두 모델 생성 |
| TTS-02 | text와 speechMetadata.style 분리 | 실제 REST body와 화면→POST 통합 | 한국어 연출 청취 |
| TTS-03 | 원문과 `<laugh>/<sigh>/<cough>/<breath>/<short pause>/<long pause>` 보존 | archived speech-generation의 angle-bracket 절 대조, 태그/길이 UI 검사 | 실제 효과 청취 |
| TTS-04 | 두 prebuilt 화자 매핑, custom 순차 턴 | 알려지지 않은/중복 화자 거부, 순서·후속실패·전역 재시도 경계 | 화자 구별·일관성 |
| VOICE-01 | 기본30 + 원격/제공 확장 목록, 모든 필터/페이지 | 필터 mapper, 중복, 2,089 고유/한국어117, 50+50+17 | 현재 키 API_KEY_INVALID |
| VOICE-02 | Design POST/store=true/prompted.input | 키보드 UI→실제 앱 API→mock Gemini | 유료 생성·preview 실기 |
| VOICE-03 | 열린 차단 표시 | 공식 PromptedVoice.input만 확인, base_voice/remix 계약 없음 | **BLOCKED: 구현/수용 완료 아님** |
| VOICE-04 | 별도 참조·동의 WAV/3개 확인/store 명시 | 원본 RIFF·10~30초·5MiB·동의60초, 잘못된 입력 거부 | WAV-only 앱 제한, 다른 MIME·유료 복제 미검증 |
| VOICE-05 | ID get/delete, 안전한 preview, transient key | 원본/private field 미노출, 명시 삭제, TTL 안내 | 실제 만료·계정 관리 |
| VOICE-06 | 사용자 제공 정렬 문서 보존, 로컬 검색, 별도 생성기 | 818,689B SHA-256 고정, 2,089/117 직접 파싱, deterministic renderer/페이지 검사 | 현재 계정 전수 수집은 실패; 과거 다른 프로젝트 수집과 구분 |
| AUDIO-01 | 첫 PCM 재생, 전역 취소, 정상종료만 WAV | UI→POST→fetch→PCM→완료 WAV, 늦은 응답/EOF/잘림/중간실패 | 실제 오디오 출력 |
| AUDIO-02 | WAV/L16/μ-law/A-law, 8/16/24kHz 앱 선택 | RIFF 추가chunk·패딩, G.711 fixture, MIME/rate/channel 일치 | 실제 codec 결과 청취 |
| SERVICE-01 | standard/flex/priority 전송 | REST generationConfig, 자동 비용등급 전환 없음 | 계정별 허용·유료 실기 |
| SERVICE-02 | 실제 x-gemini-service-tier 또는 미확인 표시 | Priority→Standard, 없는 header, 여러 순차 요청 미확인 | 실제 응답 등급 |
| BATCH-01 | inline 또는 생성 JSONL Files 업로드, 20/1MiB | REST body·key·모델·제한, resumable upload, 외부host 거부 | 유료 제출; 임의 JSONL/Files import 미지원 |
| BATCH-02 | 목록/페이지/ID 복사·재열기/30초 polling | JOB_STATE/BATCH_STATE, terminal4, 명시 제출 UI | 실원격 상태 전환 |
| BATCH-03 | cancel POST→GET, DELETE, priority PATCH | 취소를 즉시 완료로 오표시하지 않음, updateMask/필드 보존 | 실제 변경/삭제 미수행 |
| BATCH-04 | inline/JSONL Files 결과, 항목 실패, WAV | nested REST/SDK, 중복·잘림·모두성공 그룹, v2 전체그룹 누락 탐지 | 실제 결과; v1/외부키 전체 누락은 manifest 없으면 한계 |
| SAFE-01 | node:fs 서버 키 경계, same-origin, JSON/byte/ID/timeout | cross-origin/traversal/임의host 거부, 원본오류/private fields 제거 | 외부 서비스 보안 인증을 주장하지 않음 |
| A11Y-01 | native labels/fieldset, 키보드 동작, 공통 polite 알림, 초점 복원 | Testing Library 키보드·실제 브라우저 AX/Tab/Enter·조회 초점 | VoiceOver/NVDA 실제 수용 미수행 |
| DOC-01 | README/COVERAGE/제공목록 provenance/맵 | 출처·앱제한·실기차단 별도 기재 | 제품 전체 수용과 구분 |
| TEST-01 | 12개 test files, 실 REST wire fixtures | 최종 npm test 131 tests 통과, lint/tsc/build | 유료·실기 검증 별도 |

## 실행한 검사

- `npm --prefix /Users/vini/GitHub/gemini_tts test`: exit 0, **12 files / 131 tests**. passWithNoTests 제거. Task 1 대상63, Task 2 대상63의 중간 성공 이후 사용자 제공목록·v2 누락·초점 검사 추가.
- `npm --prefix /Users/vini/GitHub/gemini_tts run lint`: 최종 exit 0. preview effect의 불필요한 setState를 ref/Blob 생명주기로 수정하고 재검사했다.
- `/Users/vini/GitHub/gemini_tts/node_modules/.bin/tsc --noEmit --project /Users/vini/GitHub/gemini_tts/tsconfig.json`: 최종 exit 0. SDK 업데이트에 따른 기존 stream 테스트용 finishReason 타입과 v2 closure의 unknown narrowing을 정리했다.
- `npm --prefix /Users/vini/GitHub/gemini_tts run build`: 최종 exit 0. `/`, TTS/Voices/Batch/결과/health Route Handler가 생성된다.
- `git diff --check`: 통과. ROADMAP/REQUIREMENTS의 실행 전 SHA256 대조 통과.
- 실제 로컬 production 서버 `localhost:3311`: 제목3.8, 홈→목소리 제작 패널·연결 레이블, 제공목록 출처/ko-KR 검색→50개 결과, Enter로 확장 목소리 선택과 선택 표시를 확인했다. 실제 생성/삭제/복제/Batch submit 버튼은 누르지 않았다. 다운로드·취소는 mock 통합으로 확인했다.
- 최종 빌드 재시작 후 제공목록 ko-KR 조회 결과 50개와 조회 버튼으로 돌아오는 실제 AX 초점을 재확인했다. 스크린샷에서 필터 레이블/입력의 분리된 세로 간격을 확인했고 검증용 탭과 서버를 종료했다.

## 실제 catalog GET와 제공 파일

현재 서버 키로 `type=prebuilt&page_size=50` GET은 HTTP400이었다. 추가 최소 `type=prebuilt` GET 1회도 HTTP400, structured status `INVALID_ARGUMENT`, reason `API_KEY_INVALID`였다. 원문 오류/키를 출력하지 않았다. 잘못된 권한 추측으로 일반화하지 않으며 현재 서비스가 설정 키를 유효하게 받지 못한 사실만 기록한다.

이후 사용자가 다른 프로젝트의 같은 이름 파일을 대치했다. 원문 SHA-256 `14f121586a01d2426ffdcfd0517b9010662ec0e0ae99f0455a3856e8097800b9`를 그대로 보존했다. 문서의 2026-10-01 수집 출처와 이 실행의 2,089개·한국어117개 구조 검증은 구분한다. 현재 키 접근·합성 지원은 여전히 미검증이다. `PROVIDED-CATALOG.md`에 상세 근거가 있다. 생성기 기본 출력은 별도 `.generated.md`여서 사용자 정본을 다시 덮어쓰지 않는다.

## 남은 범위와 미수행

- **Remix:** 공식 요청 계약 미확인. 유사 Design으로 대체하거나 완료 처리하지 않았다.
- **Webhook:** 공개 수신 endpoint/서명 검증 인프라 없음. OPEN-SCOPE 미구현이며 사용자 승인된 제외 아님.
- **복제 형식:** 앱은 모노 PCM16 WAV만 허용한다. 공식 AudioData의 MPEG 등 전체 예시를 구현했다고 주장하지 않는다.
- **Batch 파일:** 검증된 앱 항목의 JSONL 업로드·Files 제출은 구현했다. 임의 외부 JSONL/기존 Files resource import는 미지원이다.
- **실기:** 유료 합성/Design/Replication/Batch, 실제 계정 등급/권한, 한국어 품질·태그·두 화자, VoiceOver/NVDA 미수행.
- **기존 계획 보존:** closeout snapshot은 phase1 PLAN 부재로 실패했다. 검사 성공으로 바꾸지 않았고 직접 SHA256으로 ROADMAP/REQUIREMENTS 보존을 확인했다. quick 완료 STATE 기록은 orchestrator 소관이다.

## Threat review

계획의 T-261011-01~07 및 SC에 대응하여 서버 키, 한국어 오류 정규화, 런타임/byte 제한, 동의·파일 구조, same-origin, 공식host/resource allowlist, 정상종료/그룹 순서, 확인 mutation UI를 구현했다. 추가된 Files upload와 사용자 제공 카탈로그의 고정 경로 읽기는 테스트·문서에 포함했다. 브라우저에서 서버 키/녹음을 로그로 노출하거나 실제 외부 mutation을 자동 실행하지 않았다. 별도 인증·DB·배포를 추가하지 않았다.
