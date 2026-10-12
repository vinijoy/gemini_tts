---
status: resolved
trigger: "이름 등록 없이 전체 대본의 첫 등장 순서로 목소리를 연결"
---
# 자동 화자 등장 순서 복원

- 요청: 이름 등록 필드를 제거하고 전체 입력칸에서 첫 이름=A, 다음 이름=B로 한 번만 연결한다. 뒤 칸의 역순 시작에서도 매핑과 각 칸의 연출을 유지한다.
- 원인: 이전 수정에서 표시 이름 등록을 필수 경로로 추가하여 사용자의 기존 입력 방식과 달라졌다. 한 칸마다 매핑을 새로 만들면 뒤 칸의 목소리도 뒤바뀔 수 있었다.
- 수정: `dialogueAliases`가 모든 블록을 사전 순회하고 `requestGroups`가 같은 매핑을 재사용한다. TtsEditor의 등록 UI/상태 및 contract의 name 필드를 제거한다. legacy name은 무시한다.
- 혼용: A/B 직접 표기는 고정 별칭이며 해당 슬롯을 점유한다. 다른 이름은 아직 점유하지 않은 슬롯에 순서대로 연결하고 세 번째 화자는 호출 전에 거부한다. URL/시각은 이름으로 추측하지 않는다.
- 검증: 수정 전 ‘이름 등록 없이’ 화면 회귀가 등록 필드 존재 assertion에서 실패했다. 수정 후 관련3파일76 tests 통과(Home→실제POST→mock provider, 양블록두화자·역순·별도연출·두voiceconfigs·PCM,다른이름,3번째0calls,legacy무시,시간/URL,A/B혼용).
- 범위: 합성·오디오 정규화는 다른 작업 소유이며 수정하지 않았다. `gemini-tts.ts`는 이름 파서 import/매핑 생성/파서 인자만 변경했다. 커밋·전체 검사·통합은 coordinator 담당이다.
- 추가 확인: `npm run lint`, `npx tsc --noEmit`, `git diff --check` 모두 통과했다. 전체 suite/build는 coordinator 통합 검사로 남긴다.
- 대기: 실제 VoiceOver/NVDA·유료 생성·음성 청취. 등록 UI 제거를 사용자 실기 수용으로 확대하지 않는다.
