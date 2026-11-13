# 기존 목소리 리믹스

## 목적과 범위

목소리 제작·관리에서 기준 목소리와 변경 설명으로 독립된 저장 목소리를 생성한다. 기존 목소리는 수정하지 않는다. 생성 결과의 미리듣기, 화자 A 선택, 저장 목소리 조회·삭제는 기존 경로를 재사용한다.

## 선택한 접근

기존 제작 방식에 리믹스를 추가하고 기존 POST /api/voices → POST /v1beta/voices 경로를 확장한다. 별도 탭·엔드포인트는 동일한 생성·결과 처리를 중복하므로 추가하지 않는다. 기본 목소리 선택과 확장·저장 ID 직접 입력을 제공하며 별도 검색 UI는 추가하지 않는다. 이는 현재 요청 범위의 구현 선택이다.

## 계약

- UI의 remix 모드는 API에서 type=prompted, store=true, model=gemini-3.8-flash-tts로 변환한다.
- prompted.base_voice에 기준 목소리 이름 또는 ID, prompted.input에 변경 설명을 보낸다.
- 기본 목소리는 기존 VOICE_NAMES를 재사용한다. 직접 입력 ID는 기존 resourceId 검증을 적용하고 비저장 voicekey_는 거부한다. 실제 접근 가능 여부는 공급자가 판정한다.
- 변경 설명은 기존 앱 한도 2,000자이며 필수다. 리믹스 모델은 읽기 전용으로 표시한다.
- 다섯 제작 구역, TabSelect, 비동기 초점 보호, 기존 제작 초안을 보존한다. 새 변경 설명은 허용된 input 태그를 사용한다.
- 유료 요청·운영 배포는 자동 실행하지 않는다. 실제 VoiceOver와 생성 음질은 자동 테스트와 별개다.

## 검증

REST 요청의 base_voice 보존, 잘못된 기준·모델·비저장 설정의 사전 거부, UI 모드 전환·입력 유지·생성 결과 선택을 검증한다. 기존 제작·탭·음성 생성 회귀, lint, 타입 검사, 빌드를 실행한다.

## 근거

2026-11-13 확인: https://aistudio.google.com/docs/voice-remixing
기존 공식 API 스냅샷: docs/google-gemini/voices-api.md의 PromptedVoiceParameters.base_voice.
