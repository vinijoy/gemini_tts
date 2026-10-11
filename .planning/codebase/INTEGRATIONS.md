# 외부 연동

**분석 날짜:** 2026-10-11  
**last_mapped_commit:** `b373c48b74146f4a2308aff429693e284989e7b1`

## API 및 외부 서비스
**음성 합성:**
- Google Gemini API - 텍스트를 음성으로 변환하고 PCM 청크 스트리밍
  - SDK: `@google/genai` (`src/app/api/tts/route.ts`)
  - 모델: `gemini-3.1-flash-tts-preview`
  - 인증: `GEMINI_API_KEY` 또는 `.env.local`
  - `ai.models.generateContentStream`에 `responseModalities: ["AUDIO"]`와 prebuilt voice 전달

## 데이터 저장
**데이터베이스:** 없음. ORM·외부 저장소 연동도 감지되지 않음.

**파일 저장:** 영속 저장소 없음. 브라우저가 PCM을 WAV `Blob`/object URL로 임시 보관 (`src/app/page.tsx`, `src/utils/pcm-audio.ts`).

**캐시:** 없음. TTS 응답에 `Cache-Control: no-store, no-transform` 설정 (`src/app/api/tts/route.ts`).

## 인증 및 사용자 식별
**인증 제공자:** Gemini API 키 기반 서버 인증. `new GoogleGenAI({ apiKey })`가 모듈 초기화 시 생성됨 (`src/app/api/tts/route.ts`). 사용자 로그인·세션 연동은 감지되지 않음.

## 모니터링 및 관측성
**오류 추적:** 외부 서비스 없음.

**로그:** `console.error` 서버 로그 (`src/app/api/tts/route.ts`). `GET /api/health`가 `{ status: "ok" }` 반환 (`src/app/api/health/route.ts`).

## CI/CD 및 배포
**호스팅:** 고정된 호스팅 설정은 감지되지 않음. `README.md`는 Vercel 안내를 포함하고 운영 스크립트는 Node/PM2 방식임 (`package.json`).

**CI 파이프라인:** 감지되지 않음.

## 환경 설정
**필수 환경 변수:** `GEMINI_API_KEY` - Gemini TTS 요청 인증.

**시크릿 위치:** 프로젝트 루트 `.env.local`이 존재할 수 있음. 값은 문서화하지 않음.

## 웹훅 및 콜백
**수신:** 웹훅 없음. 진입점은 `POST /api/tts`, `GET /api/health` (`src/app/api/tts/route.ts`, `src/app/api/health/route.ts`).

**송신:** 서버가 Gemini API에 직접 요청하며 별도 콜백 엔드포인트는 없음.

## Gemini 연동 동작
- `text` 최대 1,000자, `voice`, 선택적 `stylePrompt`를 전달 (`src/app/api/tts/route.ts`)
- UI 음성 값은 `Puck`, `Aoede`, `Charon`, `Kore`, `Fenrir` (`src/app/page.tsx`)
- inline audio Base64를 검증·디코드해 PCM 16-bit/24 kHz/mono 스트림으로 반환 (`src/app/api/tts/stream.ts`, `src/app/api/tts/route.ts`)
- 분당 429는 retry delay로 첫 오디오 전에 한 번 재시도하고 무료 일일 할당량은 재시도하지 않음 (`src/app/api/tts/route.ts`)

---

*연동 감사: 2026-10-11*
