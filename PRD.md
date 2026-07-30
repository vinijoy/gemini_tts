# PRD (Product Requirements Document) - Gemini 3.1 TTS Web Interface

## 1. 개요 (Overview)
**제품명**: Gemini 3.1 Flash TTS Web UI
**목적**: 구글의 최신 Gemini 3.1 Flash 모델의 TTS(Text-to-Speech) 기능을 누구나 쉽게 테스트하고 활용할 수 있는 직관적이고 접근성 높은 웹 인터페이스 제공. 특히, 감독 모드(Director Mode) 프롬프트와 감정 태그 기능을 통해 자연스럽고 풍부한 고품질 AI 음성을 생성하는 것을 목표로 한다.

## 2. 대상 사용자 (Target Audience)
- AI 음성을 콘텐츠에 활용하고자 하는 크리에이터
- 다양한 감정과 톤의 음성이 필요한 오디오북, 영상 제작자
- 시각 장애를 포함해 스크린 리더(VoiceOver 등)를 사용하는 접근성 중시 사용자

## 3. 핵심 기능 (Key Features)
### 3.1 음성 변환 (Text-to-Speech)
- **멀티라인 텍스트 입력**: 길고 복잡한 대본도 쉽게 입력하고 수정할 수 있는 textarea 제공.
- **음성 모델 선택**: 5가지 고유 음성(Puck, Aoede, Charon, Kore, Fenrir) 중 원하는 목소리 선택 기능.

### 3.2 감정 및 연출 제어 (Emotion & Directing Control)
- **인라인 감정 태그**: 텍스트 중간에 클릭 한 번으로 `[laughs]`, `[whispers]`, `[enthusiasm]` 등 감정/효과 태그 삽입. (UI에는 한국어 라벨로 제공)
- **감독 모드 프롬프트 (Style Prompt)**: 텍스트로 직접 읽히지는 않지만, 생성될 음성의 전반적인 톤, 감정, 상황(예: "차분하고 신뢰감 있는 톤")을 지시할 수 있는 프롬프트 입력창 제공.

### 3.3 오디오 재생 및 다운로드 (Playback & Download)
- **즉각적인 피드백**: API 응답으로 받은 오디오(WAV) 데이터를 브라우저 내에서 즉시 재생.
- **생성 중 스트리밍 자동 재생**: 첫 오디오 청크가 도착하면 전체 생성 완료를 기다리지 않고 자동으로 재생.
- **완료 후 다시 듣기**: 생성 중에는 다시 듣기와 다운로드를 비활성화하고, 전체 음성이 완성된 뒤에만 활성화.
- **단일 요청 생성**: 본문은 분할하지 않고 최대 1,000자까지 하나의 Gemini 생성 단위로 전달하여 언어와 연기 문맥을 유지.
- **입력 상한**: 키보드 입력, 붙여넣기, 감정 태그 추가를 모두 1,000자에서 차단하고 API에서도 초과 요청을 거부.
- **재생 음질 일치**: 생성 중과 완료 후 다시 듣기에 동일한 Web Audio 경로와 동일 PCM 사용.
- **불완전 결과 차단**: 출력 한도 등 비정상 종료가 발생한 부분 오디오는 완성본으로 제공하지 않음.
- **할당량 오류 안내**: 무료 티어 일일 요청 한도에 도달하면 불필요한 자동 재시도 없이 결제 설정 또는 한도 초기화 후 재시도를 안내.
- **파일 다운로드**: 생성된 오디오 파일을 `gemini_tts_음성명_시간.wav` 포맷으로 쉽게 로컬에 다운로드.
- **WAV 헤더 보정**: API가 순수 PCM 데이터만 반환할 경우를 대비해 24kHz, 16bit, Mono WAV 헤더를 자동 생성하여 재생 오류 방지.

### 3.4 접근성 및 UI/UX (Accessibility & UI/UX)
- **접근성 (A11y)**: `aria-label`, `aria-live` 속성 및 스크린 리더(VoiceOver) 전용 안내 메시지를 통한 완벽한 접근성 지원.
- **반응형 디자인**: TailwindCSS를 활용한 현대적이고 부드러운 UI (Glassmorphism, 그라데이션, 애니메이션 효과 적용).

### 3.5 안정적인 운영 관리
- **PM2 프로세스 관리**: `start:prod`, `start:init`, `stop`, `delete` 스크립트를 통해 무중단 및 안정적인 운영 환경 제공.

## 4. 기술 스택 (Tech Stack)
- **Frontend**: Next.js 16.2.4 (App Router), React 19.2.4, TailwindCSS 4
- **Backend**: Next.js API Routes (Node.js)
- **AI Integration**: `@google/genai` (Gemini 3.1 Flash TTS Preview 모델)
- **DevOps**: PM2 (프로세스 관리)

## 5. 향후 개선 사항 (Future Roadmap)
- [ ] 생성된 오디오 히스토리(목록) 저장 기능
- [ ] 사용자 지정 감정 태그 추가 기능
- [ ] 배경 음악(BGM) 자동 믹싱 기능
- [ ] 다국어 번역 및 다국어 TTS 연동
