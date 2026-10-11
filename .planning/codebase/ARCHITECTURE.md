# 아키텍처

**분석일:** 2026-10-11  
**last_mapped_commit:** `b373c48b74146f4a2308aff429693e284989e7b1`

## 시스템 개요

```text
브라우저 UI (`src/app/page.tsx`)
        │ POST /api/tts
        ▼
Next.js Route Handler (`src/app/api/tts/route.ts`)
        │ GoogleGenAI.generateContentStream()
        ▼
Gemini 3.1 Flash TTS → PCM 응답 스트림
        │ `src/app/api/tts/stream.ts` 검증·변환
        ▼
브라우저 ReadableStream → `PcmChunkAssembler` → `StreamingPcmPlayer`
                                   └→ 누적 PCM → WAV Blob 다운로드/재생
```

## 컴포넌트 책임

| 컴포넌트 | 책임 | 파일 |
|---|---|---|
| TTS 화면 | 입력, 요청 생명주기, 스트림 소비, 상태·오류 표시 | `src/app/page.tsx` |
| TTS API | 요청 검증, 프롬프트·음성, 재시도·취소, HTTP 응답 | `src/app/api/tts/route.ts` |
| PCM 스트림 어댑터 | Gemini inline Base64 추출과 오디오 검증 | `src/app/api/tts/stream.ts` |
| PCM 변환 | 청크 조립, PCM16 변환, WAV 생성 | `src/utils/pcm-audio.ts` |
| 스트리밍 재생기 | Web Audio 활성화, 타임라인 예약, 정리 직렬화 | `src/utils/streaming-player.ts` |
| 상태 엔드포인트 | 서비스 상태 응답 | `src/app/api/health/route.ts` |

## 패턴 개요

**전체:** Next.js App Router 서버 Route Handler와 클라이언트 단일 페이지를 결합한 스트리밍 파이프라인.

- Gemini SDK와 API 키는 서버에만 둔다.
- 첫 PCM 청크부터 전달하고 클라이언트가 16비트 샘플 경계를 복원한다.
- 오디오 전송 전 오류만 제한적으로 재시도하며 AbortSignal을 각 시도에 연결한다.
- 완료 PCM은 WAV 다운로드와 다시 듣기에 재사용한다.

## 계층

**프레젠테이션:** `src/app/page.tsx`, `src/app/layout.tsx`가 입력·상태·접근성 UI를 소유하고 `src/utils/`와 `/api/tts`를 사용한다.

**API:** `src/app/api/tts/route.ts`, `src/app/api/tts/stream.ts`가 요청 검증, Gemini 호출, Web Stream 변환을 담당한다.

**오디오:** `src/utils/pcm-audio.ts`, `src/utils/streaming-player.ts`가 PCM/WAV/Web Audio 형식 경계를 담당한다.

## 데이터 흐름

### 기본 TTS 요청

1. `src/app/page.tsx`의 `handleGenerate`가 입력을 확인하고 재생기를 활성화한다.
2. `POST /api/tts`가 `src/app/api/tts/route.ts`에서 최대 1,000자를 검증하고 Gemini TTS 스트림을 연다.
3. `createRetriedAudioSource`가 429 대기·재시도·취소를 처리하고 `preparePcmStream`이 첫 유효 청크를 확인한다.
4. `src/app/api/tts/stream.ts`가 inline Base64를 PCM S16LE 스트림으로 변환한다.
5. 클라이언트가 `PcmChunkAssembler`와 `StreamingPcmPlayer.enqueue`로 24kHz mono 오디오를 즉시 재생한다.
6. 종료 시 `createWavBlob`으로 Object URL을 만들어 완료·다운로드를 활성화한다.

### 다시 듣기

1. `handleReplay`가 저장된 PCM과 요청 ID를 캡처한다 (`src/app/page.tsx`).
2. 이전 재생기를 닫고 새 `StreamingPcmPlayer`를 활성화한다.
3. 동일 PCM을 Web Audio에 예약한다.

**상태 관리:** 화면 상태는 `idle | streaming | complete`다. 요청 ID, AbortController, 재생기, WAV URL, 완료 PCM은 `useRef`로 보존하며 새 요청·언마운트에서 정리한다.

## 주요 추상화

- `createRetriedAudioSource` (`src/app/api/tts/route.ts`): Gemini AsyncIterable 재시도·취소 래퍼.
- `preparePcmStream` (`src/app/api/tts/stream.ts`): Gemini 응답과 Web Streams API 사이의 경계.
- `StreamingPcmPlayer` (`src/utils/streaming-player.ts`): Promise 체인으로 activate/enqueue/close 순서를 직렬화.

## 진입점

- `/`: `src/app/page.tsx`가 전체 TTS 상호작용을 렌더링한다.
- `POST /api/tts`: `src/app/api/tts/route.ts`가 PCM 스트림 또는 JSON 오류를 반환한다.
- `GET /api/health`: `src/app/api/health/route.ts`가 상태를 반환한다.

## 아키텍처 제약

- 서버 Route Handler와 브라우저 클라이언트 컴포넌트가 분리된다.
- 모듈 수준 `GoogleGenAI` 인스턴스와 요청별 `AbortController`를 사용한다 (`src/app/api/tts/route.ts`).
- 오디오 계약은 PCM S16LE, 24,000Hz, mono다.
- 클라이언트와 서버 모두 텍스트 1,000자 제한을 적용한다.
- `.env.local`은 환경 설정 파일이며 내용은 문서화하지 않는다.

## 오류 처리

서버는 429 한도, 종료 사유, 취소를 구분해 JSON 오류를 반환한다 (`src/app/api/tts/route.ts`). 스트림 계층은 잘못된 Base64, 오디오 없음, 비정상 종료, 홀수 PCM 길이를 거부한다 (`src/app/api/tts/stream.ts`). 클라이언트는 요청 ID로 오래된 비동기 결과를 무시하고 reader를 finally에서 정리한다 (`src/app/page.tsx`).

## 공통 관심사

**로깅:** 서버 오류와 클라이언트 재생·정리 오류를 `console.error`로 기록한다.  
**검증:** 텍스트 길이와 오디오 형식을 경계 양쪽에서 검증한다.  
**인증:** 별도 사용자 인증은 없으며 Gemini 인증은 `GEMINI_API_KEY` 환경 변수다.

---

*Architecture analysis: 2026-10-11*
