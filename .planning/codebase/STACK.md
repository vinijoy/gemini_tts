# 기술 스택

**분석 날짜:** 2026-10-11  
**last_mapped_commit:** `b373c48b74146f4a2308aff429693e284989e7b1`

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
- `@google/genai` `^1.50.1` - Gemini TTS 스트리밍 (`src/app/api/tts/route.ts`)
- TypeScript `^5`, ESLint `^9.39.5`, `eslint-config-next` `16.2.12` - 타입 검사와 린트
- `pm2` - 별도 선언 없이 `npx pm2`로 운영 프로세스 관리 (`package.json`)

## 설정
- `GEMINI_API_KEY`를 Gemini 인증에 사용하며 `.env.local`이 있으면 서버 라우트가 읽음 (`src/app/api/tts/route.ts`). 값은 기록하지 않음.
- `next.config.ts`: `allowedDevOrigins`, `devIndicators`, `outputFileTracingRoot`
- `tsconfig.json`: strict, noEmit, bundler 해석, `@/*` → `./src/*`
- `vitest.config.ts`: Node와 jsdom 테스트 프로젝트 분리

## 플랫폼 요구사항
- npm으로 `npm run dev`, `npm test`, `npm run lint`, `npm run build` 실행
- 브라우저 Web Audio API가 PCM 스트리밍 재생에 필요 (`src/utils/streaming-player.ts`)
- 운영은 Next.js Node 서버와 Gemini 키가 필요하며 `package.json`에 PM2 시작·중지 스크립트가 있음

---

*스택 분석: 2026-10-11*
