# 코딩 컨벤션

**분석일:** 2026-10-11  
**마지막 매핑 커밋:** `b373c48b74146f4a2308aff429693e284989e7b1`

## 이름 규칙

**파일:** Next.js 엔트리는 `route.ts`, `page.tsx`, `layout.tsx`를 사용하며 (`src/app/`), 유틸리티는 `src/utils/pcm-audio.ts`처럼 소문자 이름을 사용한다. 테스트는 구현과 같은 위치의 `{name}.test.ts(x)`로 둔다.

**함수:** camelCase를 사용한다. 예: `createPcmStream`, `pcm16BytesToSamples` (`src/app/api/tts/stream.ts`, `src/utils/pcm-audio.ts`). React 핸들러는 `handle` 접두사를 사용한다 (`src/app/page.tsx`).

**변수:** 지역 변수·매개변수는 camelCase, 모듈 상수는 `MAX_TEXT_LENGTH` 같은 대문자 snake_case를 사용한다 (`src/app/api/tts/route.ts`).

**타입:** 인터페이스·타입 별칭은 PascalCase를 사용하며, SDK 경계에는 구체적인 응답 타입을 둔다 (`src/app/api/tts/stream.ts`).

## 코드 스타일

**포맷팅:** TypeScript strict와 JSX 자동 런타임을 사용한다 (`tsconfig.json`). 큰따옴표, 세미콜론, 2칸 들여쓰기를 따른다. Prettier 설정은 발견되지 않았으므로 기존 파일 스타일을 유지한다.

**린팅:** `eslint.config.mjs`에서 ESLint 9 flat config와 `eslint-config-next/core-web-vitals`, `eslint-config-next/typescript`를 적용한다. `.next/**`, `out/**`, `build/**`, `next-env.d.ts`는 무시된다. 새 코드는 `npm run lint`를 통과시킨다.

## Import 구성

1. 외부 패키지 (`react`, `vitest`, `next/server`)
2. `@/*` 별칭 import
3. 상대 경로 import

`@/*`는 `src/*`에 매핑된다 (`tsconfig.json`, `vitest.config.ts`). 같은 모듈 테스트는 상대 경로를 사용한다 (`src/app/api/tts/route.test.ts`).

## 오류 처리

- API 경계는 입력 검증 후 한국어 JSON 오류와 HTTP 상태를 반환한다 (`src/app/api/tts/route.ts`).
- 스트림 생성 전 오류는 재시도 후 JSON으로, 스트리밍 중 오류는 `ReadableStream` 오류로 전달한다 (`src/app/api/tts/stream.ts`).
- UI는 `try/catch/finally`로 플레이어와 AbortController를 정리하고 `role="alert"` 한국어 메시지를 표시한다 (`src/app/page.tsx`).
- 진단 로그는 `console.error`에 남기되 원시 SDK 오류를 사용자 메시지에 그대로 노출하지 않는다.

## 로깅

**프레임워크:** `console.error`.

Gemini 요청·오디오 재생처럼 외부 경계 실패만 기록하며 (`src/app/api/tts/route.ts`, `src/app/page.tsx`), 테스트에서는 `vi.spyOn(console, "error")`로 예상 로그를 억제한다 (`src/app/api/tts/route.test.ts`).

## 주석

스트리밍 취소, PCM 바이트 경계, 자동재생 제약처럼 의도가 코드만으로 모호한 부분에만 주석을 단다. 테스트 이름은 한국어로 계약과 경계를 설명하므로 주석보다 테스트 자체를 우선한다. 공개 유틸리티에 일괄적인 JSDoc은 없다.

## 함수 설계

- 요청, 스트림, PCM/WAV, 플레이어 수명주기를 별도 모듈로 분리한다 (`src/app/api/tts/route.ts`, `src/app/api/tts/stream.ts`, `src/utils/pcm-audio.ts`, `src/utils/streaming-player.ts`).
- 테스트 가능한 의존성은 생성자 함수 인자로 주입한다 (`StreamingPcmPlayer`의 AudioContext factory).
- 경계에 맞춰 `Promise`, `ReadableStream<Uint8Array>`, `Blob` 같은 구체 타입을 반환하고 실패는 예외로 전달한다.

## 모듈 설계

명시적 named export를 사용한다 (`createWavBlob`, `StreamingPcmPlayer`, `createPcmStream`). 라우트는 Next.js 규약의 `GET`/`POST`를 export한다 (`src/app/api/health/route.ts`, `src/app/api/tts/route.ts`). barrel 파일은 없으므로 새 유틸리티도 직접 import한다.

---

*컨벤션 분석: 2026-10-11*
