# 외부 연동

**분석 날짜:** 2026-10-11  
**last_mapped_commit:** `c49f74b5251782cd41f2a5daa29b611785b7de89`

**부분 갱신 261011-v9n:** Batch 제거·두 탭·제작 구역에 한해 `819afe7` 기준을 반영했다. 전체 재매핑은 아니다.

## API 및 외부 서비스

**음성 합성:**
- Google Gemini REST v1beta의 `models/{model}:streamGenerateContent?alt=sse`를 서버에서 호출한다 (`src/lib/gemini-client.ts`, `src/lib/gemini-tts.ts`).
- 허용 모델은 `gemini-3.8-flash-tts`, `gemini-3.8-flash-lite-tts`다. `@google/genai`는 `package.json`에 `2.28.0`으로 고정되지만 이 실행 경로는 SDK 메서드를 사용하지 않는다.
- `speechMetadata.style`에 연출, `voiceConfig.voice`에 음성 참조, `responseFormat.audio`에 출력 형식·샘플레이트를 전달한다 (`src/lib/gemini-tts.ts`).
- 요청 처리 등급은 standard/flex/priority이며 응답 헤더에서 확인되지 않은 실제 등급은 unknown이다. 다중 순차 요청도 실제 등급을 단정하지 않는다 (`src/lib/gemini-tts.ts`).

**Voices:**
- `/v1beta/voices`, `/v1beta/voices/{id}`의 목록·생성·조회·삭제를 사용한다 (`src/lib/gemini-voices.ts`).
- 필터·페이지 토큰을 검증하고 `contexts`를 REST `context`로 변환한다. 페이지당 최대 50개, 검색어 최대 UTF-8 2,048바이트다.
- Voice Design은 저장형 prompted 생성이다. Replication은 source/consent 녹음을 분리하며 세 가지 본인·동일 화자·공식 동의문 확인을 요구한다. 앱은 mono PCM16 WAV만 받으며 파일당 5MiB, 참조 10~30초, 동의 최대 60초를 적용한다 (`src/lib/gemini-voices.ts`, `src/app/components/VoiceStudio.tsx`).
- 기본 30개 이름은 `src/lib/tts-contract.ts`와 `src/lib/voice-catalog.ts`에 있다. 확장 API 목록·메타데이터와 구분한다.
- `source=provided`는 사용자 제공 `GEMINI-TTS-VOICES.md`를 로컬에서 파싱·필터·페이지 처리하며 키나 외부 요청이 필요 없다. UI에서 현재 API 키 조회와 출처를 선택한다 (`src/lib/voice-catalog.ts`, `src/lib/gemini-voices.ts`, `src/app/components/VoiceLibrary.tsx`).
- 제공 원문은 2026-10-01 다른 프로젝트 목록이며 2,089개(한국어 117개)다. 문서의 운영 지시는 실행 규칙으로 사용하지 않는다. 현재 키의 HTTP 400 `INVALID_ARGUMENT`/`API_KEY_INVALID`는 부모 실행 보고이며 제공 데이터·합성 권한과 별개다.
- `scripts/generate-voice-catalog.mjs`는 공개 prebuilt 목록을 페이지별 수집하고 중복·반복 토큰을 검사하여 `GEMINI-TTS-VOICES.generated.md`를 쓴다. 사용자 제공 `GEMINI-TTS-VOICES.md` 원문은 덮어쓰지 않는다. 실패 시 미완료와 기본 fallback을 표시한다. custom 자산·키·녹음은 출력 필드에 포함하지 않는다.

일괄 생성 및 JSONL Files 업로드 연동은 2026-10-11 사용자 요청으로 제거했다. 원격 자산의 삭제·취소는 실행하지 않았다.

## 데이터 저장

**데이터베이스:** 앱 DB·ORM은 없다. 저장형 목소리는 Gemini 측 자산이다 (`src/lib/gemini-voices.ts`).

**파일 저장:** 브라우저는 PCM·WAV Blob/object URL을 임시 보관한다. 선택 형식 다운로드는 `encodeOutput`을 사용한다 (`src/app/page.tsx`, `src/utils/audio-format.ts`). 로컬 제공 카탈로그 Markdown을 읽으며 수집기는 공개 목록 Markdown을 생성할 수 있다 (`scripts/generate-voice-catalog.mjs`).

**캐시:** REST fetch 및 API 응답은 no-store다 (`src/lib/gemini-client.ts`, `src/app/api/tts/route.ts`).

## 인증 및 사용자 식별

`GEMINI_API_KEY`를 서버의 `x-goog-api-key` 헤더로 전달한다. `src/lib/gemini-client.ts`는 환경 변수를 우선 사용하고 없을 때 로컬 환경 파일을 읽는다. 사용자 로그인·세션은 없다. Origin/Sec-Fetch-Site 검사로 교차 사이트 변경 요청을 거부하지만 사용자 인증을 대체하지 않는다.

## 모니터링 및 관측성

**오류 추적:** 외부 서비스 없음.

**로그:** 클라이언트는 `console.error`, 서버는 `AppError` 기반의 정제한 JSON 오류를 사용한다 (`src/app/page.tsx`, `src/lib/gemini-client.ts`). `GET /api/health`는 상태 엔드포인트다 (`src/app/api/health/route.ts`).

## CI/CD 및 배포

**호스팅:** 고정된 호스팅 설정은 감지되지 않음. `README.md`는 Vercel 안내를 포함하고 운영 스크립트는 Node/PM2 방식임 (`package.json`).

**CI 파이프라인:** 감지되지 않음.

## 환경 설정

**필수 환경 변수:** `GEMINI_API_KEY` (`src/lib/gemini-client.ts`, `scripts/generate-voice-catalog.mjs`).

**시크릿 위치:** 로컬 환경 파일을 지원한다. 파일 내용·키 값은 매핑 대상이 아니다.

## 웹훅 및 콜백

**수신:** webhook 수신 엔드포인트는 구현되어 있지 않다.

**송신:** 서버가 고정 Gemini origin에 요청하며 별도 앱 콜백 전송은 없다 (`src/lib/gemini-client.ts`).

## Gemini 연동 동작

- 공백 대본·잘못된 모델/음성/화자/형식은 외부 호출 전에 거부한다. 전체 대본 1,000자, 전체 연출 4,000자, 최대 화자 2명·발화 20개다 (`src/lib/tts-contract.ts`).
- prebuilt 대화는 다중 화자 요청, custom 대화는 발화별 순차 요청이다 (`src/lib/gemini-tts.ts`).
- 네 가지 upstream 출력(L16/WAV/μ-law/A-law)은 mono PCM16LE로 정규화해 브라우저에 보낸다. 샘플레이트는 8/16/24kHz이며 WAV는 완성된 컨테이너를 검증한 뒤 PCM을 전달한다 (`src/utils/audio-format.ts`, `src/lib/gemini-tts.ts`).
- 분당 429의 명시된 1~65초 retry delay 또는 finishReason OTHER는 첫 오디오 전에 1회 재시도한다. 일일 한도와 오디오 전송 이후 실패는 재시도하지 않는다 (`src/lib/gemini-client.ts`, `src/lib/gemini-tts.ts`).
- Voice Remix는 base_voice 계약 미확인으로 UI에서 차단된다 (`src/app/components/VoiceStudio.tsx`). 유료 합성·제작 및 실제 스크린리더 검증 결과를 이 맵은 보증하지 않는다.

---

*연동 감사: 2026-10-11*
