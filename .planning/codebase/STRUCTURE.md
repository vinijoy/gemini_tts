# 코드베이스 구조

**분석일:** 2026-10-11  
**last_mapped_commit:** `c49f74b5251782cd41f2a5daa29b611785b7de89`

**부분 갱신 (2026-10-11):** 화면 탐색·한국어 표시 관련 작업 트리 구조만 갱신했다. 나머지 절의 전체 재검증을 뜻하지 않으며 기존 매핑 커밋 기준은 유지한다.

**부분 갱신 261011-v9n:** Batch 제거·두 탭·제작 구역에 한해 `819afe7` 기준을 반영했다. 전체 재매핑은 아니다.

## 디렉터리 배치

```text
gemini_tts/
├── src/app/                 # App Router 페이지·레이아웃·스타일
│   └── api/                 # Route Handler (`health`, `tts`, `voices`)
├── src/lib/                 # Gemini REST·공유 입력 계약·카탈로그 정규화
├── scripts/                 # 공개 목소리 카탈로그 수집기
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

**`src/app/api/tts/`:** `route.ts`는 검증·REST 합성 모듈을 호출하는 얇은 HTTP 어댑터다. `stream.ts`와 해당 테스트는 남아 있으나 현재 `route.ts`의 REST 실행 경로는 `src/lib/gemini-tts.ts`다.

**`src/lib/`:** `tts-contract.ts`에 공유 타입·런타임 검증, `gemini-client.ts`에 인증·요청/응답 제한, `gemini-tts.ts`에 REST SSE 합성, `gemini-voices.ts`에 Voices CRUD, `voice-catalog.ts`에 기본 30개·응답 정규화·제공 Markdown 파서를 둔다.

**`src/app/components/`:** `TtsEditor.tsx`는 모델·화자·발화·출력·처리 등급 편집, `VoiceLibrary.tsx`는 기본/확장 음성 선택, `VoiceStudio.tsx`는 설계·복제·조회·삭제를 담당한다.

- `src/app/page.tsx`: `음성 만들기`/`목소리 제작·관리` 두 탭과 키보드 탐색·전역 상태 알림을 소유하며 두 패널에 `TabPanel`을 사용한다.
- `src/app/components/TabPanel.tsx`: 활성 context와 `hidden`+`inert`로 부모 상태를 유지하는 `TabPanel`, 비활성 패널의 네이티브 선택 요소만 제거하는 `TabSelect`를 제공한다. 선택값은 부모 제어형 상태에 둔다.
- `src/app/components/VoiceLibrary.tsx`: 접힌 `details` 안의 검색 폼만 조건부 제거하고 필터·출처 등은 상위 상태에 보존한다.
- `src/app/components/LocaleSelect.tsx`: 언어/지역 한국어 선택과 목록 밖 직접 입력을 공통 제공한다. `src/app/components/VoiceLibrary.tsx`와 `src/app/components/VoiceStudio.tsx`에서 사용한다.
- `src/lib/tts-labels.ts`: API 식별값에 대응하는 한국어 모델·목소리·출력·처리 등급·필터 표시를 둔다.
- `src/lib/voice-locale-options.json`: 제공 카탈로그의 언어/지역 코드와 고정 한국어 이름·순서 데이터다. API 전체 지원 범위의 제한 스키마가 아니다.
- `src/app/components/LocaleSelect.tsx`, `src/lib/tts-labels.ts`, `src/lib/voice-locale-options.json`은 현재 Git에 추적되는 파일이다.

**`src/app/api/voices/`:** 컬렉션 및 `[id]/route.ts`에 목소리 목록·생성·조회·삭제 요청을 둔다.

**`GEMINI-TTS-VOICES.md`:** 사용자 제공 2026-10-01 공개 목록 원문. `src/lib/gemini-voices.ts`의 `source=provided` 검색이 읽는다. 현재 프로젝트 키의 실서비스 검증 증거로 쓰지 않는다.

**`scripts/`:** `scripts/generate-voice-catalog.mjs`가 공개 prebuilt 항목만 수집해 루트 `GEMINI-TTS-VOICES.generated.md`를 생성하여 사용자 제공 원문을 보존한다.

**`src/app/api/health/`:** `src/app/api/health/route.ts`의 상태 확인 API다.

**`src/utils/`:** `src/utils/pcm-audio.ts`의 PCM/WAV 형식과 `src/utils/streaming-player.ts`의 Web Audio 재생을 둔다. `src/utils/audio.ts`에는 호환 Base64-to-WAV 유틸리티가 있다. `src/utils/audio-format.ts`는 WAV 구조 검증, G.711 변환, 출력 인코딩, 32MiB 제한을 담당한다.

**`docs/`:** `docs/nextjs/` 프레임워크 문서, `docs/superpowers/` 설계·계획, `docs/graphify-out/` 그래프 산출물이다.

목소리 제작 화면은 다섯 h2와 이름 있는 section으로 구성한다. 제작 설정 → 정보 → 설명/녹음·동의 → 생성·결과 → 저장 관리 순서다. 2026-10-11 이번 배치의 사용자 VoiceOver 확인을 받았으며 범위는 `ui-followup.md`를 따른다.

## 주요 파일 위치

**진입점:** `src/app/page.tsx` (`/`), `src/app/api/tts/route.ts` (`POST /api/tts`), `src/app/api/health/route.ts` (`GET /api/health`), `src/app/layout.tsx` (전역 레이아웃).

**설정:** `package.json`, `next.config.ts`, `tsconfig.json`, `vitest.config.ts`, `eslint.config.mjs`.

**핵심 로직:** `src/lib/tts-contract.ts`, `src/lib/gemini-client.ts`, `src/lib/gemini-tts.ts`, `src/lib/gemini-voices.ts`, `src/utils/audio-format.ts`, `src/utils/pcm-audio.ts`, `src/utils/streaming-player.ts`.

**테스트:** `src/app/page.test.tsx`, `src/app/api/tts/route.test.ts`, `src/app/api/tts/stream.test.ts`, `src/app/api/health/route.test.ts`, `src/utils/pcm-audio.test.ts`, `src/utils/streaming-player.test.ts`.

## 이름 규칙

Next.js 특수 파일은 `page.tsx`, `layout.tsx`, `route.ts`다. 일반 파일은 kebab-case(`streaming-player.ts`), 컴포넌트·클래스는 PascalCase, 함수·변수는 camelCase다.

## 새 코드 추가 위치

- 대화 입력 회귀(261012-boh): 입력 블록과 발화를 동일시하지 않는다. 여러 블록 각각에 여러 등록 이름·다른 연출·반대 화자부터 시작하는 fixture를 넣어 실제 POST의 wire metadata와 PCM 순서를 검사한다. 예시 이름을 고정하거나 별도 등록을 요구하지 않는다. 사용자 결정에 따라 전체 요청에서 처음 나온 이름을 A, 다음 이름을 B로 한 번만 연결하고 모든 블록에 재사용한다. A/B 직접 표기는 고정 목소리를 유지하며 세 번째 다른 이름은 사전 거부한다. `src/lib/dialogue-blocks.ts`가 이름→stable id를 해석하며 기본 대화는 매 블록에 두 voice configs와 발화별 speaker parts, 맞춤 대화는 발화별 single voice를 보낸다. 회귀: `npm test -- src/lib/gemini-tts.test.ts src/app/page.test.tsx src/app/generation-order.test.tsx`. 등록 입력 제거 후 안내의 VoiceOver·두 블록 청취는 대기다.

- 생성 탭 UI 순서: 모델·화자 → 목소리 → 대본·말투·태그·추가 발화 → 출력 → 생성·결과를 DOM과 화면에 동일하게 유지한다. h2 제목으로 구역을 탐색하며 CSS order나 양수 tabindex로 순서를 따로 만들지 않는다. 화자 B 기본 목소리는 기본 목소리 영역에, 추가 발화는 첫 대본 뒤에 둔다. 확장 방식에서는 중복 기본 선택 메뉴를 노출하지 않는다. `src/app/generation-order.test.tsx`의 DOM/Tab 순서·입력 보존과 `src/app/page.test.tsx`의 숨은 메뉴 회귀를 실행한다. 2026-10-11 사용자 VoiceOver 확인은 이 배치에 한하며 새 변경의 실기 확인을 대체하지 않는다.

- 제작·관리 UI 순서: 제작 방식·모델 → 이름·언어·성별 정보 → 설명 또는 참조 녹음·동의문·동의 녹음·확인 → 저장 설정·생성·결과 → 저장 목소리 조회·삭제 순서를 화면과 DOM에 동일하게 유지한다. 다섯 구역은 이름 있는 section과 h2로 탐색하고, 결과 미리 듣기·선택은 결과 구역에 둔다. 탭 왕복에서 초안·첨부·동의를 유지하고 숨은 탭으로 비동기 초점을 옮기지 않는다. 수정 시 `src/app/studio-order.test.tsx`와 `src/app/page.test.tsx`의 순서·첨부·숨은 초점 회귀를 실행한다.
- 두 화자 안내: 기본/맞춤 두 화자 모드 모두 “두 화자의 대화입니다.”로 현재 화자 수를 명시한다. 첫 화자 설명으로 전체 대화 모드 안내를 대신하지 않는다. 추가 버튼은 “대사 추가”로 표시하고, 입력칸별 본문·연출 1,000자 제한과 이름별 화자 연결을 안내한다. 전체 합산 제한은 없다. 단일 화자에서는 추가 대사 구역을 숨긴다. `src/app/generation-order.test.tsx`의 두 모드 회귀를 실행한다. 이 두 항목은 2026-10-11 사용자 VoiceOver 확인 범위이며 이후 변경의 실기 확인을 대신하지 않는다.

- 새 화면 기능: 기능별 `src/app/components/`에 두고 `src/app/page.tsx`에서 연결한다. 화면 테스트는 `src/app/page.test.tsx`.
- 탭 변경: `src/app/page.tsx`의 선택 탭만 탭 순서에 포함하는 패턴, 좌우/Home/End 탐색, 패널 상태 보존과 패널 밖 상태 알림을 유지한다.
- 탭 안 선택 메뉴 추가: `src/app/components/TabPanel.tsx`의 `TabSelect`를 사용하고 부모에 제어형 `value`/`onChange` 상태를 둔다. 네이티브 메뉴 노출 방지를 `hidden`+`inert`만으로 처리하지 않는다. 비동기 초점 복원은 `src/app/components/VoiceLibrary.tsx`와 `src/app/components/VoiceStudio.tsx`처럼 `[hidden], [inert]` 조상을 검사한다.
- 공통 한국어 표시: `src/lib/tts-labels.ts`를 사용한다. 언어/지역 UI는 `src/app/components/LocaleSelect.tsx`, 선택값 데이터는 `src/lib/voice-locale-options.json`에 둔다.
- 새 API: `src/app/api/<name>/route.ts`, 테스트는 같은 디렉터리.
- 새 오디오 모듈: `src/utils/`, PCM 계약(8/16/24kHz mono 16-bit)을 유지하고 co-located 테스트를 추가한다.
- 새 Gemini 기능: `src/lib/`에 REST 처리와 같은 위치의 `*.test.ts`를 두고, Route Handler는 입력/응답 경계로 유지한다. 공유 입력은 `src/lib/tts-contract.ts`를 재사용한다.

## 특수 디렉터리

**`node_modules/`:** npm 의존성, 생성됨: 예, 커밋: 아니오.  
**`.next/`:** Next 빌드 산출물, 생성됨: 예, 커밋: 아니오.  
**`docs/graphify-out/`:** Graphify 분석 산출물, 생성됨: 예.  
**`.planning/codebase/`:** GSD 지도 문서. 문서별 부분 갱신 기준과 미커밋 소스 해시는 `.planning/codebase-refresh.md`에서 관리한다.

---

*Structure analysis: 2026-10-11*
