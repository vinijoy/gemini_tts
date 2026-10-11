# 아키텍처

**분석일:** 2026-10-11  
**last_mapped_commit:** `c49f74b5251782cd41f2a5daa29b611785b7de89`

**부분 갱신 (2026-10-11):** 아래 화면 탐색·표시 설명은 현재 작업 트리 기준이다. 나머지 절의 전체 재검증과 커밋 포함을 뜻하지 않으며 기존 매핑 커밋 기준은 유지한다.

**부분 갱신 261011-v9n:** Batch 제거·두 탭·제작 구역에 한해 `819afe7` 기준을 반영했다. 전체 재매핑은 아니다.

## 시스템 개요

```text
브라우저 (`src/app/page.tsx`, `src/app/components/`)
        │ /api/tts · /api/voices
        ▼
얇은 Route Handler (`src/app/api/`)
        │ 공유 검증 (`src/lib/tts-contract.ts`)
        ▼
Gemini 도메인 (`src/lib/gemini-tts.ts`, `gemini-voices.ts`)
        │ 공통 REST (`src/lib/gemini-client.ts`)
        ▼
Gemini 3.8 REST v1beta → SSE / Voices
        │ PCM 정규화 (`src/utils/audio-format.ts`)
        ▼
브라우저 청크 조립 → Web Audio → WAV 재생 / 선택 형식 다운로드
```

## 컴포넌트 책임

| 컴포넌트 | 책임 | 파일 |
|---|---|---|
| TTS 화면 | 입력, 요청 생명주기, 스트림 소비, 상태·오류 표시 | `src/app/page.tsx` |
| TTS API | 공유 계약 검증과 PCM HTTP 응답 | `src/app/api/tts/route.ts` |
| 요청 계약 | 모델·화자·발화·출력·등급 검증 | `src/lib/tts-contract.ts` |
| REST 경계 | 키 로딩, 크기 제한, 정제 오류, Origin 검사 | `src/lib/gemini-client.ts` |
| 합성 | 요청 직렬화, SSE, 순차 custom 대화, 취소·제한 재시도 | `src/lib/gemini-tts.ts` |
| Voices | 목소리 목록·생성·조회·삭제 | `src/lib/gemini-voices.ts` |
| 기능 UI | 편집·목소리 목록/제작·관리 | `src/app/components/TtsEditor.tsx`, `src/app/components/VoiceLibrary.tsx`, `src/app/components/VoiceStudio.tsx` |
| 오디오 형식 | WAV 검증, G.711, PCM 정규화·다운로드 인코딩 | `src/utils/audio-format.ts` |
| 호환 PCM 어댑터 | 기존 스트림 유틸리티와 테스트; 현재 REST 라우트의 실행 경로에서는 미사용 | `src/app/api/tts/stream.ts` |
| PCM 변환 | 청크 조립, PCM16 변환, WAV 생성 | `src/utils/pcm-audio.ts` |
| 스트리밍 재생기 | Web Audio 활성화, 타임라인 예약, 정리 직렬화 | `src/utils/streaming-player.ts` |
| 상태 엔드포인트 | 서비스 상태 응답 | `src/app/api/health/route.ts` |

## 패턴 개요

**전체:** Next.js App Router 서버 Route Handler와 클라이언트 단일 페이지를 결합한 스트리밍 파이프라인.

- Gemini REST 호출과 API 키는 서버에만 둔다.
- 첫 PCM 청크부터 전달하고 클라이언트가 16비트 샘플 경계를 복원한다.
- 오디오 전송 전 오류만 제한적으로 재시도하며 AbortSignal을 각 시도에 연결한다.
- 완료 PCM은 WAV 다시 듣기와 요청한 형식 다운로드에 재사용한다.

## 계층

**프레젠테이션:** `src/app/page.tsx`, `src/app/components/`가 편집·합성·Voices UI를 소유한다. `src/app/layout.tsx`는 전역 레이아웃이다.

**화면 탐색·상태 보존:**
- 제작·관리 화면은 다섯 h2 구역(방식·모델, 정보, 설명/녹음·동의, 생성·결과, 저장 관리)으로 나뉜다. 결과 미리 듣기·선택과 조회·삭제 관리 구역을 구분하며 화면/DOM 순서를 일치시킨다. `src/app/studio-order.test.tsx`에서 순서·두 탭·조회·삭제를 검사한다.
- `src/app/page.tsx`는 `음성 만들기`, `목소리 제작·관리` 두 탭을 제공한다. `tablist`/`tab`/`tabpanel`과 `aria-controls`/`aria-labelledby`를 연결하며 선택 탭만 `tabIndex={0}`이다. 좌우 방향키 순환 및 Home/End 이동은 선택과 초점을 함께 변경한다.
- `src/app/page.tsx`의 두 패널은 `src/app/components/TabPanel.tsx`를 사용한다. `TabPanel`은 상태 소유 컴포넌트를 마운트한 채 비활성 패널에 `hidden`과 `inert`를 적용하고, context로 활성 여부를 전달한다. `TabSelect`는 비활성일 때 `null`을 반환해 네이티브 `select`만 제거한다. 숨김 속성만으로 네이티브 메뉴 노출 방지를 처리하지 않는다. `src/app/components/VoiceStudio.tsx`의 초안·첨부 파일·작업 상태는 유지한다.
- 탭 안의 모든 선택 메뉴는 `src/app/components/TabPanel.tsx`의 `TabSelect`와 부모의 제어형 `value`/`onChange` 상태를 사용한다. `src/app/components/VoiceLibrary.tsx`의 기본 목소리도 `basicVoice`로 보존한다. context 밖의 `TabSelect`는 기본적으로 렌더링한다.
- `src/app/components/VoiceLibrary.tsx`와 `src/app/components/VoiceStudio.tsx`는 요청 종료 후 초점 복원 전에 대상의 `closest("[hidden], [inert]")`를 확인해 비활성 패널로 초점을 옮기지 않는다.
- `src/app/page.tsx`의 전역 `role="status"`, `aria-live="polite"` 영역은 패널 밖에 있다. `tts-status` 이벤트를 구독하고 `statusMessage || announcement`를 표시하므로 합성 상태 문구가 우선한다.
- `src/app/components/VoiceLibrary.tsx`는 `details`의 `onToggle`과 `searchOpen`으로 닫힌 검색 폼만 조건부 언마운트한다. 필터·출처·목록·페이지 토큰은 상위 컴포넌트 상태에 보존한다. 내부 `LocaleSelect`의 지역 `custom` 상태와 필터 값 보존은 구분한다.

**한국어 표시·선택값:**
- `src/lib/tts-labels.ts`는 모델·출력·처리 등급·목소리·필터 표시를 제공한다. `src/app/components/TtsEditor.tsx`, `src/app/components/VoiceLibrary.tsx`, `src/app/components/VoiceStudio.tsx`에서 API 값과 한국어 표시를 분리한다.
- `src/app/components/LocaleSelect.tsx`는 `src/lib/voice-locale-options.json`의 고정 한국어 언어/지역 이름과 순서를 사용한다. 제공 카탈로그 선택지이며 API 전체 지원 범위의 제한 목록이 아니다. 목록 밖 값은 직접 입력한다. `src/app/components/VoiceLibrary.tsx`의 언어·지역 필터와 `src/app/components/VoiceStudio.tsx`의 제작 언어에 사용한다.
- `src/app/components/LocaleSelect.tsx`, `src/lib/tts-labels.ts`, `src/lib/voice-locale-options.json`은 현재 Git에 추적되는 파일이다. 코드 확인은 실제 VoiceOver 성공이나 단계 수용 판정의 근거가 아니다.

**API:** `src/app/api/`는 HTTP 어댑터이며 공통 요청 검증·오류 처리와 `src/lib/` 도메인을 호출한다. 외부 응답·ID·경로를 신뢰하지 않고 각 경계에서 검사한다.

**도메인:** `src/lib/tts-contract.ts`는 브라우저/서버가 공유한다. `src/lib/gemini-client.ts`와 `gemini-{tts,voices}.ts`는 서버 전송을 담당하며 클라이언트에 키를 전달하지 않는다.

**오디오:** `src/utils/audio-format.ts`, `src/utils/pcm-audio.ts`, `src/utils/streaming-player.ts`가 PCM/WAV/G.711/Web Audio 형식 경계를 담당한다.

## 데이터 흐름

### 기본 TTS 요청

1. `src/app/page.tsx`가 `parseTts`로 요청 snapshot을 검증하고 재생기를 활성화한다.
2. `src/app/api/tts/route.ts`가 `readJson`·`parseTts`를 실행하고 `openPcm`을 호출한다.
3. `src/lib/gemini-tts.ts`가 prebuilt 대화를 단일 다중 화자 요청으로, custom 대화를 턴별 순차 요청으로 변환한다.
4. SSE를 읽어 종료 사유·Base64·MIME·rate를 검사한다. WAV는 전체 컨테이너 검증 후, L16/G.711은 청크별 PCM으로 전달한다.
5. `src/app/page.tsx`는 청크 경계를 조립하고 요청 샘플레이트(8/16/24kHz)로 재생한다. 완료 PCM에서 WAV와 선택 형식 다운로드를 만든다.

### Voices

1. `src/app/components/VoiceLibrary.tsx`는 기본 30개, 로컬 사용자 제공 목록(`source=provided`), 현재 API 카탈로그를 구분하고 `VoiceStudio.tsx`는 설계·복제·조회·삭제를 호출한다.
2. `src/lib/gemini-voices.ts`는 필터·동의 확인·WAV 크기/길이를 검증한 후 upstream을 호출한다. 비저장 복제 키는 화면 메모리에서만 사용한다.

### 다시 듣기

1. `handleReplay`가 저장된 PCM과 요청 ID를 캡처한다 (`src/app/page.tsx`).
2. 이전 재생기를 닫고 새 `StreamingPcmPlayer`를 활성화한다.
3. 동일 PCM을 Web Audio에 예약한다.

**상태 관리:** 화면 상태는 `idle | streaming | complete`다. 요청 ID, AbortController, 재생기, WAV URL, 완료 PCM은 `useRef`로 보존하며 새 요청·언마운트에서 정리한다.

## 주요 추상화

- `TtsRequest`/`parseTts` (`src/lib/tts-contract.ts`): 구조화한 모델·화자·발화·출력 계약과 기존 text/voice 입력 호환.
- `wireRequest`/`requestGroups`/`openPcm` (`src/lib/gemini-tts.ts`): REST 직렬화, 대화 실행 단위, Web Stream과 AbortSignal 경계.
- `AppError`/`errorResponse` (`src/lib/tts-contract.ts`, `src/lib/gemini-client.ts`): HTTP 상태와 공개 가능한 오류 메시지.
- `voiceRef` (`src/lib/voice-catalog.ts`): 기본 이름·확장 ID·저장 custom·비저장 replica 참조 구분.
- `StreamingPcmPlayer` (`src/utils/streaming-player.ts`): Promise 체인으로 activate/enqueue/close 순서를 직렬화.

## 진입점

- `/`: `src/app/page.tsx`가 전체 TTS 상호작용을 렌더링한다.
- `POST /api/tts`: `src/app/api/tts/route.ts`가 PCM 스트림 또는 JSON 오류를 반환한다.
- `GET /api/health`: `src/app/api/health/route.ts`가 상태를 반환한다.

- `/api/voices`와 `/api/voices/[id]`: 목록·생성·조회·삭제 (`src/app/api/voices/route.ts`, `src/app/api/voices/[id]/route.ts`).

## 아키텍처 제약

- 서버 Route Handler와 브라우저 클라이언트 컴포넌트가 분리된다.
- REST 키는 요청 시 로드하고 합성에는 요청별 `AbortController`를 사용한다 (`src/lib/gemini-client.ts`, `src/lib/gemini-tts.ts`).
- 브라우저 전송 계약은 PCM16LE mono, 8/16/24kHz다. L16/WAV/μ-law/A-law upstream 출력과 브라우저 내부 형식을 혼동하지 않는다 (`src/utils/audio-format.ts`).
- 공유 검증은 전체 대본 1,000자·연출 4,000자·화자 2명·발화 20개를 제한한다. 오디오는 32MiB다 (`src/lib/tts-contract.ts`, `src/utils/audio-format.ts`).
- `.env.local`은 환경 설정 파일이며 내용은 문서화하지 않는다.

## 오류 처리

서버는 정제한 `AppError` JSON을 반환한다 (`src/lib/gemini-client.ts`). 합성은 정상 STOP·형식·크기를 확인하고, 첫 오디오 전 명시된 분당 429(1~65초) 또는 finishReason OTHER를 1회 재시도한다. 오디오 이후 오류와 일일 한도는 재시도하지 않는다 (`src/lib/gemini-tts.ts`). 클라이언트는 요청 ID로 오래된 결과를 무시하고 reader·재생기를 정리한다 (`src/app/page.tsx`).

## 공통 관심사

**로깅:** 클라이언트 재생·정리 오류는 `console.error`, 서버 공개 오류는 정제 응답을 사용한다 (`src/app/page.tsx`, `src/lib/gemini-client.ts`).
**검증:** 텍스트 길이와 오디오 형식을 경계 양쪽에서 검증한다.  
**인증:** 별도 사용자 인증은 없으며 Gemini 인증은 `GEMINI_API_KEY` 환경 변수다.

---

*Architecture analysis: 2026-10-11*
