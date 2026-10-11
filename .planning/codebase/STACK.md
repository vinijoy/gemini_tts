# 기술 스택

**분석 날짜:** 2026-10-11  
**last_mapped_commit:** `c49f74b5251782cd41f2a5daa29b611785b7de89`

**부분 갱신 261011-v9n:** Batch 제거·두 탭·제작 구역에 한해 `819afe7` 기준을 반영했다. 전체 재매핑은 아니다.

## 언어
- TypeScript 5 계열 - `src/`의 Next.js 애플리케이션, API 라우트, 오디오 처리와 테스트
- CSS - `src/app/globals.css`

## 런타임
- Node.js - Next.js 개발·빌드·운영 실행 (고정 버전 파일은 확인되지 않음)
- npm, 잠금 파일 있음: `package-lock.json`

## 프레임워크
- Next.js `^16.2.12` - App Router와 서버 Route Handler
- React/React DOM `19.2.4` - `src/app/page.tsx` UI
- Tailwind CSS `^4`와 PostCSS - 스타일 처리
- Vitest `^4.1.10`, Testing Library, jsdom - 테스트 (`vitest.config.ts`)

## 주요 의존성
- `@google/genai` `2.28.0` 정확한 버전 고정 (`package.json`). 현재 TTS·Voices 전송은 서버 REST `fetch` 계층을 사용한다 (`src/lib/gemini-client.ts`, `src/lib/gemini-tts.ts`, `src/lib/gemini-voices.ts`).
- TypeScript `^5`, ESLint `^9.39.5`, `eslint-config-next` `16.2.12` - 타입 검사와 린트
- `pm2` - 별도 선언 없이 `npx pm2`로 운영 프로세스 관리 (`package.json`)

## 설정
- `GEMINI_API_KEY`를 Gemini 인증에 사용하며 `.env.local`이 있으면 서버 라우트가 읽음 (`src/lib/gemini-client.ts`). 환경 변수가 없을 때만 로컬 파일을 읽으며, 값은 기록하지 않음.
- `next.config.ts`: `allowedDevOrigins`, `devIndicators`, `outputFileTracingRoot`
- `tsconfig.json`: strict, noEmit, bundler 해석, `@/*` → `./src/*`
- `vitest.config.ts`: Node와 jsdom 테스트 프로젝트 분리

## 플랫폼 요구사항
- npm으로 `npm run dev`, `npm test`, `npm run lint`, `npm run build` 실행
- `package.json`의 `test`는 `vitest run`, watch는 `vitest`이며 `passWithNoTests` 옵션을 사용하지 않는다.
- `scripts/generate-voice-catalog.mjs`는 Node 내장 fetch·fs·Intl로 공개 prebuilt 카탈로그 Markdown을 생성한다.
- 브라우저 Web Audio API가 PCM 스트리밍 재생에 필요 (`src/utils/streaming-player.ts`)
- 운영은 Next.js Node 서버와 Gemini 키가 필요하며 `package.json`에 PM2 시작·중지 스크립트가 있음

---

*스택 분석: 2026-10-11*
