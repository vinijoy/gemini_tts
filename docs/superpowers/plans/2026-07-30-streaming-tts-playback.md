# 스트리밍 TTS 재생 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Gemini가 생성하는 PCM 오디오를 첫 청크부터 자동 재생하고, 생성이 끝난 뒤에만 다시 듣기와 다운로드를 활성화한다.

**Architecture:** Next.js Route Handler가 `generateContentStream()`의 오디오 청크를 원시 PCM 응답으로 전달한다. 클라이언트는 Web Audio API로 각 청크를 연속 예약 재생하면서 전체 바이트를 누적하고, 스트림 완료 후 WAV Blob을 만들어 다시 듣기와 다운로드에 사용한다.

**Tech Stack:** Next.js 16.2.12 App Router, React 19.2.4, TypeScript 5, `@google/genai` 1.50.1, Web Streams API, Web Audio API, Vitest, React Testing Library

## Global Constraints

- 작업 브랜치는 `sk_dev`를 유지한다.
- 코드 변경 전에 `PRD.md`와 `README.md`에 사용자 동작을 먼저 반영한다.
- 패키지 버전은 기존 기능과 호환되는 새 기능이므로 `0.2.0`으로 올린다.
- 스트리밍 형식은 24,000Hz, 16비트 리틀엔디언, 모노 PCM이다.
- HTTP 계약은 `application/octet-stream`과 `X-Audio-Encoding: PCM_S16LE`을 사용하며, 빅엔디언을 뜻하는 `audio/L16`은 사용하지 않는다.
- 첫 PCM 청크가 도착하면 사용자 추가 조작 없이 자동 재생한다.
- 생성 중에는 다시 듣기와 다운로드를 비활성화한다.
- 전체 스트림이 정상 완료된 뒤에만 완성 WAV를 만들고 다시 듣기와 다운로드를 활성화한다.
- 사용자 상태와 오류 메시지는 자연스러운 한국어로 제공하고 `aria-live`로 알린다.
- 불완전한 PCM 샘플 바이트는 다음 청크와 합쳐 16비트 샘플 경계를 보존한다.
- 새 생성, 오류, 컴포넌트 해제 시 예약 음원, AudioContext, Object URL과 누적 데이터를 정리한다.

---

## 파일 구조

- `PRD.md`: 스트리밍 자동 재생 및 완료 후 다시 듣기 요구사항
- `README.md`: 사용자 동작, 구조, 검증 명령
- `package.json`, `package-lock.json`: 버전 `0.2.0`, 보안 패치가 적용된 Next.js, Vitest와 UI 테스트 도구, 테스트 스크립트
- `vitest.config.ts`: Node 및 jsdom 테스트 환경 설정
- `src/utils/pcm-audio.ts`: PCM 청크 정렬, Float32 변환, WAV 생성
- `src/utils/streaming-player.ts`: Web Audio 청크 예약 재생 및 자원 정리
- `src/app/api/tts/stream.ts`: Gemini 응답에서 오디오를 추출해 바이너리 스트림으로 변환
- `src/app/api/tts/route.ts`: 입력 검증, Gemini 스트리밍 호출, HTTP 응답
- `src/app/page.tsx`: `idle`/`streaming`/`complete` 상태와 UI 연결
- `src/utils/pcm-audio.test.ts`: PCM 및 WAV 단위 테스트
- `src/utils/streaming-player.test.ts`: 예약 시각과 정리 단위 테스트
- `src/app/api/tts/stream.test.ts`: 서버 스트림 단위 테스트
- `src/app/page.test.tsx`: 생성 중/완료/오류 UI 동작 테스트
- `test_err.ts`, `test_tts.ts`: 기존 진단 스크립트의 명시적 오류 타입과 미사용 변수 정리

### Task 1: 문서, 버전 및 테스트 기반 준비

**Files:**
- Modify: `PRD.md`
- Modify: `README.md`
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Modify: `test_err.ts`
- Modify: `test_tts.ts`

**Interfaces:**
- Consumes: 없음
- Produces: `npm test`, `npm run test:watch`, `@/*` 별칭을 해석하는 Vitest 환경

- [ ] **Step 1: PRD에 승인된 사용자 동작을 먼저 기록**

`PRD.md`의 오디오 재생 섹션에 다음 요구사항을 추가한다.

```markdown
- **생성 중 스트리밍 자동 재생**: 첫 오디오 청크가 도착하면 전체 생성 완료를 기다리지 않고 자동으로 재생.
- **완료 후 다시 듣기**: 생성 중에는 다시 듣기와 다운로드를 비활성화하고, 전체 음성이 완성된 뒤에만 활성화.
```

- [ ] **Step 2: README에 동작과 검증 방법 기록**

`README.md`의 변경 사항과 개발 안내에 다음 내용을 추가한다.

추가할 변경 사항:

```markdown
- Gemini 오디오 청크를 24kHz/16bit/Mono PCM으로 스트리밍하여 첫 청크부터 자동 재생
- 생성 중 다시 듣기·다운로드 비활성화, 완료 후 WAV 다시 듣기·다운로드 활성화
```

추가할 검증 섹션:

````markdown
## 검증

```bash
npm test
npm run lint
npm run build
```
````

- [ ] **Step 3: 버전과 테스트 도구 설치**

Run:

```bash
npm version 0.2.0 --no-git-tag-version
npm install next@16.2.12
npm install --save-dev vitest@latest jsdom@latest @testing-library/react@latest @testing-library/jest-dom@latest @testing-library/user-event@latest
npm audit fix
```

`package.json` scripts에 다음을 추가한다.

```json
"test": "vitest run --passWithNoTests",
"test:watch": "vitest"
```

- [ ] **Step 4: Vitest 설정 작성**

`vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "node",
    environmentMatchGlobs: [["src/app/**/*.test.tsx", "jsdom"]],
    setupFiles: ["@testing-library/jest-dom/vitest"],
    clearMocks: true,
  },
});
```

- [ ] **Step 5: 테스트 러너와 기존 검사 확인**

`test_err.ts`와 `test_tts.ts`에서 사용하지 않는 응답 변수는 호출 결과를 변수에 대입하지 않도록 바꾸고, `catch (error: any)`는 `catch (error: unknown)` 및 `error instanceof Error` 분기로 바꾼다. 이 단계에서 `npm audit`이 보고한 직접·전이 의존성 취약점을 모두 해소하며, 보안 패치 후에도 Next.js는 16.x 호환 범위를 유지한다.

Run:

```bash
npm test
npm audit
npx eslint test_err.ts test_tts.ts
```

Expected: 테스트 파일이 없어도 Vitest가 정상 종료하고, `npm audit`은 취약점 0개, 두 진단 스크립트의 ESLint 오류와 경고는 0개여야 한다.

- [ ] **Step 6: 커밋**

```bash
git add PRD.md README.md package.json package-lock.json vitest.config.ts test_err.ts test_tts.ts
git commit -m "스트리밍 재생 문서와 안전한 테스트 환경 준비"
```

### Task 2: PCM 변환 및 WAV 생성

**Files:**
- Create: `src/utils/pcm-audio.test.ts`
- Create: `src/utils/pcm-audio.ts`

**Interfaces:**
- Consumes: 서버에서 받은 `Uint8Array` PCM 청크
- Produces: `PcmChunkAssembler.push(chunk): Int16Array`, `PcmChunkAssembler.getBytes(): Uint8Array`, `pcm16ToFloat32(samples): Float32Array`, `createWavBlob(pcmBytes, sampleRate, channels): Blob`

- [ ] **Step 1: 실패하는 PCM 샘플 경계 및 변환 테스트 작성**

`src/utils/pcm-audio.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  PcmChunkAssembler,
  pcm16ToFloat32,
  createWavBlob,
} from "./pcm-audio";

describe("PcmChunkAssembler", () => {
  it("홀수 바이트 청크의 남은 바이트를 다음 청크와 결합한다", () => {
    const assembler = new PcmChunkAssembler();

    expect(Array.from(assembler.push(Uint8Array.from([0x00])))).toEqual([]);
    expect(
      Array.from(assembler.push(Uint8Array.from([0x80, 0xff, 0x7f]))),
    ).toEqual([-32768, 32767]);
    expect(Array.from(assembler.getBytes())).toEqual([0x00, 0x80, 0xff, 0x7f]);
  });
});

it("PCM16 최솟값과 최댓값을 Float32 범위로 변환한다", () => {
  const result = pcm16ToFloat32(Int16Array.from([-32768, 0, 32767]));
  expect(Array.from(result)).toEqual([-1, 0, 32767 / 32768]);
});

it("24kHz 모노 WAV 헤더와 PCM 본문을 만든다", async () => {
  const blob = createWavBlob(Uint8Array.from([0x00, 0x80, 0xff, 0x7f]));
  const bytes = new Uint8Array(await blob.arrayBuffer());
  expect(new TextDecoder().decode(bytes.slice(0, 4))).toBe("RIFF");
  expect(new DataView(bytes.buffer).getUint32(24, true)).toBe(24000);
  expect(new DataView(bytes.buffer).getUint32(40, true)).toBe(4);
  expect(Array.from(bytes.slice(44))).toEqual([0x00, 0x80, 0xff, 0x7f]);
});
```

- [ ] **Step 2: 테스트가 올바른 이유로 실패하는지 확인**

Run:

```bash
npx vitest run src/utils/pcm-audio.test.ts
```

Expected: `./pcm-audio` 모듈이 없어 FAIL.

- [ ] **Step 3: 최소 PCM 유틸리티 구현**

`src/utils/pcm-audio.ts`에 다음 계약을 구현한다.

```ts
export class PcmChunkAssembler {
  private pendingByte: number | null = null;
  private readonly completedChunks: Uint8Array[] = [];

  push(chunk: Uint8Array): Int16Array {
    const prefix = this.pendingByte === null ? [] : [this.pendingByte];
    const merged = Uint8Array.from([...prefix, ...chunk]);
    const completeLength = merged.length - (merged.length % 2);
    this.pendingByte =
      completeLength < merged.length ? merged[merged.length - 1] : null;
    const complete = merged.slice(0, completeLength);
    if (complete.length > 0) this.completedChunks.push(complete);

    const samples = new Int16Array(complete.length / 2);
    const view = new DataView(complete.buffer, complete.byteOffset, complete.length);
    for (let index = 0; index < samples.length; index += 1) {
      samples[index] = view.getInt16(index * 2, true);
    }
    return samples;
  }

  getBytes(): Uint8Array {
    const length = this.completedChunks.reduce((sum, part) => sum + part.length, 0);
    const result = new Uint8Array(length);
    let offset = 0;
    for (const part of this.completedChunks) {
      result.set(part, offset);
      offset += part.length;
    }
    return result;
  }
}

export function pcm16ToFloat32(samples: Int16Array): Float32Array {
  return Float32Array.from(samples, (sample) => sample / 32768);
}

export function createWavBlob(
  pcmBytes: Uint8Array,
  sampleRate = 24000,
  channels = 1,
): Blob {
  // 44바이트 PCM WAV 헤더 뒤에 pcmBytes를 복사한다.
}
```

`createWavBlob`은 `RIFF`, `WAVE`, `fmt `, `data`, PCM 형식 `1`, 16비트, 전달받은 샘플레이트·채널·데이터 길이를 리틀엔디언으로 기록한다.

- [ ] **Step 4: 단위 테스트 통과 확인**

Run:

```bash
npx vitest run src/utils/pcm-audio.test.ts
```

Expected: 3 tests PASS.

- [ ] **Step 5: 커밋**

```bash
git add src/utils/pcm-audio.ts src/utils/pcm-audio.test.ts
git commit -m "PCM 청크 변환과 WAV 생성 유틸리티 추가"
```

### Task 3: Web Audio 연속 예약 재생

**Files:**
- Create: `src/utils/streaming-player.test.ts`
- Create: `src/utils/streaming-player.ts`

**Interfaces:**
- Consumes: `Int16Array` PCM 샘플, `AudioContext` 호환 객체
- Produces: `StreamingPcmPlayer.enqueue(samples): Promise<void>`, `StreamingPcmPlayer.close(): Promise<void>`

- [ ] **Step 1: 실패하는 연속 예약 및 정리 테스트 작성**

가짜 AudioContext의 `currentTime`, `createBuffer`, `createBufferSource`, `resume`, `close` 호출을 기록하고 다음을 검증한다.

```ts
it("두 PCM 청크를 앞선 청크 종료 시각에 이어 예약한다", async () => {
  const context = createFakeAudioContext({ currentTime: 10 });
  const player = new StreamingPcmPlayer(() => context, 24000);

  await player.enqueue(Int16Array.from([0, 32767]));
  await player.enqueue(Int16Array.from([-32768, 0]));

  expect(context.startTimes).toEqual([10, 10 + 2 / 24000]);
  expect(context.resume).toHaveBeenCalledOnce();
});

it("close가 예약 음원을 중지하고 AudioContext를 닫는다", async () => {
  const context = createFakeAudioContext({ currentTime: 0 });
  const player = new StreamingPcmPlayer(() => context, 24000);
  await player.enqueue(Int16Array.from([0, 0]));

  await player.close();

  expect(context.sources[0].stop).toHaveBeenCalledOnce();
  expect(context.close).toHaveBeenCalledOnce();
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run:

```bash
npx vitest run src/utils/streaming-player.test.ts
```

Expected: `StreamingPcmPlayer`가 없어 FAIL.

- [ ] **Step 3: 최소 예약 플레이어 구현**

`src/utils/streaming-player.ts`:

```ts
import { pcm16ToFloat32 } from "./pcm-audio";

type AudioContextFactory = () => AudioContext;

export class StreamingPcmPlayer {
  private context: AudioContext | null = null;
  private nextStartTime = 0;
  private readonly sources = new Set<AudioBufferSourceNode>();

  constructor(
    private readonly createContext: AudioContextFactory = () => new AudioContext(),
    private readonly sampleRate = 24000,
  ) {}

  async enqueue(samples: Int16Array): Promise<void> {
    if (samples.length === 0) return;
    const context = this.context ?? this.createContext();
    this.context = context;
    if (context.state === "suspended") await context.resume();

    const buffer = context.createBuffer(1, samples.length, this.sampleRate);
    buffer.copyToChannel(pcm16ToFloat32(samples), 0);
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.onended = () => this.sources.delete(source);

    const startAt = Math.max(context.currentTime, this.nextStartTime);
    source.start(startAt);
    this.nextStartTime = startAt + buffer.duration;
    this.sources.add(source);
  }

  async close(): Promise<void> {
    for (const source of this.sources) source.stop();
    this.sources.clear();
    if (this.context && this.context.state !== "closed") await this.context.close();
    this.context = null;
    this.nextStartTime = 0;
  }
}
```

- [ ] **Step 4: 예약 플레이어 테스트 통과 확인**

Run:

```bash
npx vitest run src/utils/streaming-player.test.ts
```

Expected: 2 tests PASS.

- [ ] **Step 5: 커밋**

```bash
git add src/utils/streaming-player.ts src/utils/streaming-player.test.ts
git commit -m "PCM 스트리밍 연속 재생기 추가"
```

### Task 4: Gemini 응답을 PCM HTTP 스트림으로 변환

**Files:**
- Create: `src/app/api/tts/stream.test.ts`
- Create: `src/app/api/tts/stream.ts`
- Modify: `src/app/api/tts/route.ts`

**Interfaces:**
- Consumes: `AsyncIterable<GenerateContentResponse>`
- Produces: `createPcmStream(responses): ReadableStream<Uint8Array>`, `POST(req): Promise<Response>`

- [ ] **Step 1: 실패하는 서버 스트림 테스트 작성**

`src/app/api/tts/stream.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { createPcmStream } from "./stream";

async function* responses() {
  yield { candidates: [{ content: { parts: [{ inlineData: { data: "AAE=" } }] } }] };
  yield { candidates: [{ content: { parts: [{ inlineData: { data: "AgM=" } }] } }] };
}

it("Gemini 오디오 청크를 순서대로 바이너리 스트림에 전달한다", async () => {
  const response = new Response(createPcmStream(responses()));
  expect(Array.from(new Uint8Array(await response.arrayBuffer()))).toEqual([0, 1, 2, 3]);
});

it("오디오 데이터가 하나도 없으면 스트림 오류를 발생시킨다", async () => {
  async function* emptyResponses() {
    yield { candidates: [{ content: { parts: [{ text: "no audio" }] } }] };
  }
  const reader = createPcmStream(emptyResponses()).getReader();
  await expect(reader.read()).rejects.toThrow("오디오 데이터가 없습니다.");
});
```

- [ ] **Step 2: 테스트 실패 확인**

Run:

```bash
npx vitest run src/app/api/tts/stream.test.ts
```

Expected: `./stream` 모듈이 없어 FAIL.

- [ ] **Step 3: PCM 스트림 변환 구현**

`src/app/api/tts/stream.ts`에서 각 응답의 모든 `parts`를 순회해 `inlineData.data`를 찾고 `Buffer.from(data, "base64")`를 `Uint8Array`로 enqueue한다. 정상 반복이 끝날 때까지 한 청크도 enqueue하지 않았다면 `controller.error(new Error("오디오 데이터가 없습니다."))`를 호출한다. 소비자가 취소하면 async iterator의 `return()`을 호출한다.

- [ ] **Step 4: 스트림 변환 테스트 통과 확인**

Run:

```bash
npx vitest run src/app/api/tts/stream.test.ts
```

Expected: 2 tests PASS.

- [ ] **Step 5: Route Handler를 스트리밍 호출로 변경**

`src/app/api/tts/route.ts`에서 `generateContent()`와 전체 WAV 조립 로직을 제거하고 다음 흐름으로 바꾼다.

```ts
const responses = await ai.models.generateContentStream({
  model: "gemini-3.1-flash-tts-preview",
  contents: [{ role: "user", parts: [{ text: prompt }] }],
  config: {
    responseModalities: ["AUDIO"],
    speechConfig: {
      voiceConfig: {
        prebuiltVoiceConfig: { voiceName: selectedVoice },
      },
    },
  },
});

return new Response(createPcmStream(responses), {
  headers: {
    "Content-Type": "application/octet-stream",
    "X-Audio-Encoding": "PCM_S16LE",
    "X-Audio-Sample-Rate": "24000",
    "X-Audio-Channels": "1",
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "no-store, no-transform",
  },
});
```

스트림 시작 전 Gemini 연결 실패뿐 아니라 첫 유효 오디오 청크 수신 전 실패와 빈 응답에도 기존 최대 2회 재시도와 한국어 JSON 오류 응답을 유지한다. Route에서 `AbortController`를 생성해 Gemini 요청에 전달하고, 소비자 취소 시 먼저 abort한 뒤 iterator를 정리한다. Base64 형식·패딩을 엄격히 검사하며 빈 디코딩 결과와 최종 홀수 바이트 PCM은 오류로 처리한다. `Content-Length`는 설정하지 않는다.

- [ ] **Step 6: 서버 테스트와 타입 검사**

Run:

```bash
npx vitest run src/app/api/tts/stream.test.ts
npx tsc --noEmit
```

Expected: 모두 PASS.

- [ ] **Step 7: 커밋**

```bash
git add src/app/api/tts/route.ts src/app/api/tts/stream.ts src/app/api/tts/stream.test.ts
git commit -m "Gemini 오디오를 PCM 스트림으로 전달"
```

### Task 5: 스트리밍 재생 UI와 완료 후 다시 듣기

**Files:**
- Create: `src/app/page.test.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `/api/tts` PCM `ReadableStream`, `PcmChunkAssembler`, `StreamingPcmPlayer`, `createWavBlob`
- Produces: 첫 청크 자동 재생, 생성 중 비활성 버튼, 완료 후 다시 듣기 및 다운로드

- [ ] **Step 1: 생성 중 비활성화와 완료 활성화 실패 테스트 작성**

`src/app/page.test.tsx`에서 `fetch`, `URL.createObjectURL`, `StreamingPcmPlayer`를 제어 가능한 테스트 대역으로 제공한다. 첫 청크를 enqueue한 뒤 스트림을 열어 둔 상태와 close한 상태를 각각 검증한다.

```tsx
it("생성 중 첫 청크를 재생하고 다시 듣기와 다운로드를 비활성화한다", async () => {
  render(<Home />);
  await user.type(screen.getByLabelText("음성으로 변환할 텍스트 입력창"), "안녕하세요");
  await user.click(screen.getByRole("button", { name: "음성 생성하기 버튼" }));

  streamController.enqueue(Uint8Array.from([0, 0]));

  await waitFor(() => expect(enqueueSpy).toHaveBeenCalledOnce());
  expect(screen.getByRole("button", { name: "다시 듣기" })).toBeDisabled();
  expect(screen.getByText("음성을 생성하며 재생하고 있습니다.")).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: "생성된 음성 파일 다운로드" })).not.toBeInTheDocument();
});

it("스트림 완료 후 다시 듣기와 다운로드를 활성화한다", async () => {
  streamController.close();

  expect(await screen.findByRole("button", { name: "다시 듣기" })).toBeEnabled();
  expect(screen.getByRole("link", { name: "생성된 음성 파일 다운로드" })).toHaveAttribute(
    "href",
    "blob:test-audio",
  );
});
```

별도 오류 테스트에서 스트림을 `controller.error(new Error("연결 끊김"))`으로 종료한 뒤 다시 듣기와 다운로드가 활성화되지 않고 오류 알림과 생성 버튼이 복구되는지 검증한다.

- [ ] **Step 2: UI 테스트 실패 확인**

Run:

```bash
npx vitest run src/app/page.test.tsx
```

Expected: 현재 페이지에는 `다시 듣기` 버튼과 PCM 스트림 소비가 없어 FAIL.

- [ ] **Step 3: 명시적인 생성 상태와 자원 참조 추가**

`src/app/page.tsx`에 다음 상태와 참조를 둔다.

```ts
type GenerationStatus = "idle" | "streaming" | "complete";

const [status, setStatus] = useState<GenerationStatus>("idle");
const [audioUrl, setAudioUrl] = useState<string | null>(null);
const playerRef = useRef<StreamingPcmPlayer | null>(null);
const requestControllerRef = useRef<AbortController | null>(null);
```

`isLoading`은 `status === "streaming"`으로 계산해 기존 입력 비활성화 동작을 유지한다.

- [ ] **Step 4: fetch 응답을 청크 단위로 소비**

`handleGenerate`에서 `response.arrayBuffer()`를 제거하고 다음 순서로 처리한다.

```ts
const reader = response.body?.getReader();
if (!reader) throw new Error("음성 스트림을 열 수 없습니다.");

const assembler = new PcmChunkAssembler();
const player = new StreamingPcmPlayer();
playerRef.current = player;

while (true) {
  const { value, done } = await reader.read();
  if (done) break;
  await player.enqueue(assembler.push(value));
}

const pcmBytes = assembler.getBytes();
if (pcmBytes.length === 0) throw new Error("생성된 오디오 데이터가 없습니다.");
const url = URL.createObjectURL(createWavBlob(pcmBytes));
setAudioUrl(url);
setStatus("complete");
```

새 생성 전 이전 Object URL을 revoke하고 기존 플레이어와 요청을 정리한다. 오류 시 플레이어를 닫고 `status`를 `idle`로 복원한다. 컴포넌트 해제 시 같은 정리 로직을 실행한다.

- [ ] **Step 5: 결과 영역과 접근성 상태 구현**

`status !== "idle"`이면 결과 영역을 표시한다.

```tsx
<h2>
  {status === "streaming"
    ? "음성을 생성하며 재생하고 있습니다."
    : "음성 생성이 완료되었습니다."}
</h2>
<button
  type="button"
  disabled={status !== "complete" || !audioUrl}
  onClick={() => audioRef.current?.play()}
  aria-label="다시 듣기"
>
  다시 듣기
</button>
```

완료 후에만 `audioUrl`을 가진 숨김 또는 비제어 `<audio ref={audioRef} src={audioUrl}>`와 다운로드 링크를 렌더링한다. 생성 중 다운로드는 링크 대신 `aria-disabled="true"`인 비활성 설명 요소로 제공한다. `aria-live="polite"`에는 현재 생성 상태 문구를 넣는다.

- [ ] **Step 6: UI 테스트 통과 확인**

Run:

```bash
npx vitest run src/app/page.test.tsx
```

Expected: 생성 중, 완료, 오류 테스트 모두 PASS.

- [ ] **Step 7: 전체 테스트와 정적 검사**

Run:

```bash
npm test
npm run lint
npx tsc --noEmit
```

Expected: 모두 PASS, 경고 및 타입 오류 없음.

- [ ] **Step 8: 커밋**

```bash
git add src/app/page.tsx src/app/page.test.tsx
git commit -m "생성 중 스트리밍 자동 재생과 완료 후 다시 듣기 추가"
```

### Task 6: 실제 빌드 및 통합 검증

**Files:**
- Modify only if verification exposes a defect in files already listed above

**Interfaces:**
- Consumes: Tasks 1–5의 완성 구현
- Produces: 배포 가능한 Next.js 프로덕션 빌드

- [ ] **Step 1: 전체 자동 검사 실행**

Run:

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
```

Expected: 모든 명령 exit code 0.

- [ ] **Step 2: 브라우저 수동 통합 검증**

Run:

```bash
npm run dev
```

브라우저에서 다음을 확인한다.

1. 텍스트 입력 후 생성 시작
2. 첫 오디오 청크부터 자동 재생
3. 생성 중 다시 듣기 및 다운로드 비활성
4. 생성 완료 후 다시 듣기 및 다운로드 활성
5. 다시 듣기 시 완성 음성이 처음부터 재생
6. 연속 두 번째 생성 시 이전 음성·완료 상태 초기화
7. VoiceOver에서 생성 시작, 생성 중, 생성 완료 상태 안내

- [ ] **Step 3: 최종 작업 상태 확인**

Run:

```bash
git status --short
git log -6 --oneline
```

Expected: 계획된 파일 외의 변경이 없고, 각 작업 단위 커밋이 `sk_dev`에 존재한다.
