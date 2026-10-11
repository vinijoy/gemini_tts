# 코드베이스 구조

**분석일:** 2026-10-11  
**last_mapped_commit:** `b373c48b74146f4a2308aff429693e284989e7b1`

## 디렉터리 배치

```text
gemini_tts/
├── src/app/                 # App Router 페이지·레이아웃·스타일
│   └── api/                 # Route Handler (`health`, `tts`)
├── src/utils/               # PCM/WAV 변환·Web Audio 재생
├── public/                  # 정적 자산
├── docs/                    # Next.js 문서·설계·Graphify 산출물
├── next.config.ts           # Next 설정
├── vitest.config.ts         # 테스트 설정
├── package.json             # 명령·의존성
└── PRD.md                   # 제품 요구사항
```

## 디렉터리 목적

**`src/app/`:** App Router 코드. 핵심은 `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`다.

**`src/app/api/tts/`:** `route.ts`가 HTTP·Gemini·재시도를, `stream.ts`가 Base64 오디오와 Web Stream을 담당한다.

**`src/app/api/health/`:** `src/app/api/health/route.ts`의 상태 확인 API다.

**`src/utils/`:** `src/utils/pcm-audio.ts`의 PCM/WAV 형식과 `src/utils/streaming-player.ts`의 Web Audio 재생을 둔다. `src/utils/audio.ts`에는 호환 Base64-to-WAV 유틸리티가 있다.

**`docs/`:** `docs/nextjs/` 프레임워크 문서, `docs/superpowers/` 설계·계획, `docs/graphify-out/` 그래프 산출물이다.

## 주요 파일 위치

**진입점:** `src/app/page.tsx` (`/`), `src/app/api/tts/route.ts` (`POST /api/tts`), `src/app/api/health/route.ts` (`GET /api/health`), `src/app/layout.tsx` (전역 레이아웃).

**설정:** `package.json`, `next.config.ts`, `tsconfig.json`, `vitest.config.ts`, `eslint.config.mjs`.

**핵심 로직:** `src/app/api/tts/route.ts`, `src/app/api/tts/stream.ts`, `src/utils/pcm-audio.ts`, `src/utils/streaming-player.ts`.

**테스트:** `src/app/page.test.tsx`, `src/app/api/tts/route.test.ts`, `src/app/api/tts/stream.test.ts`, `src/app/api/health/route.test.ts`, `src/utils/pcm-audio.test.ts`, `src/utils/streaming-player.test.ts`.

## 이름 규칙

Next.js 특수 파일은 `page.tsx`, `layout.tsx`, `route.ts`다. 일반 파일은 kebab-case(`streaming-player.ts`), 컴포넌트·클래스는 PascalCase, 함수·변수는 camelCase다.

## 새 코드 추가 위치

- 새 화면 기능: `src/app/page.tsx`, 테스트는 `src/app/page.test.tsx`.
- 새 API: `src/app/api/<name>/route.ts`, 테스트는 같은 디렉터리.
- 새 오디오 모듈: `src/utils/`, PCM 계약(24kHz mono 16-bit)을 유지하고 co-located 테스트를 추가한다.
- 공유 타입·헬퍼 전용 `types/`·`lib/`는 검출되지 않았다. 두 계층 이상에서 공유될 때만 만든다.

## 특수 디렉터리

**`node_modules/`:** npm 의존성, 생성됨: 예, 커밋: 아니오.  
**`.next/`:** Next 빌드 산출물, 생성됨: 예, 커밋: 아니오.  
**`docs/graphify-out/`:** Graphify 분석 산출물, 생성됨: 예.  
**`.planning/codebase/`:** GSD 지도 문서. 이번 작업에서는 `ARCHITECTURE.md`, `STRUCTURE.md`만 소유한다.

---

*Structure analysis: 2026-10-11*
