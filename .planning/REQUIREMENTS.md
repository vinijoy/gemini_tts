# Requirements: Gemini TTS Web UI

**Defined:** 2026-10-11
**Core Value:** 대본과 연출 의도를 보존하면서 공식 지원 음성 기능을 쉽게 사용하고 완성 음성을 재생·저장한다.

## v1 Requirements

### 모델과 연출

- [ ] **TTS-01**: 사용자는 Gemini 3.8 Flash TTS와 Flash-Lite TTS를 선택할 수 있고 서버는 허용한 정확한 모델 ID만 호출한다.
- [ ] **TTS-02**: 사용자는 문장형 어투·감정·속도·억양 지시를 대본과 구분해 입력하고, 서버는 speechMetadata.style로 전달한다.
- [ ] **TTS-03**: 사용자는 공식 인라인 발성·휴지 태그를 대본 안에서 사용할 수 있고 대본 텍스트는 임의 변경 없이 전달된다.
- [ ] **TTS-04**: 사용자는 두 화자를 설정하고 순서와 턴별 연출을 유지하는 한 대본을 합성할 수 있다. 기본 목소리와 맞춤 목소리의 공식 호출 제약을 지킨다.

### 목소리

- [ ] **VOICE-01**: 사용자는 기본 30개 및 확장 라이브러리 목소리를 찾고 선택할 수 있으며 공식 언어·지역·성별 표현과 필터·페이지 처리를 지원한다.
- [ ] **VOICE-02**: 사용자는 자연어 설명으로 새 목소리를 설계하고, 샘플 미리듣기와 반환 목소리 ID를 합성에 사용할 수 있다.
- [ ] **VOICE-03**: 사용자는 공식 지원 목소리 변형/Remix를 사용할 수 있다. 원본·지시·저장 설정은 공식 API 계약에 따른다.
- [ ] **VOICE-04**: 사용자는 권한 있는 참고 녹음을 이용한 공식 음성 복제를 사용할 수 있다. API의 동의·길이·형식·크기 검증과 저장 여부를 반영한다.
- [ ] **VOICE-05**: 사용자는 저장/비저장 목소리의 수명과 제한을 알 수 있고, 지원되는 조회·미리듣기·관리 기능을 사용할 수 있다. 파괴적 조작은 명시적 UI 동작으로만 실행한다.
- [ ] **VOICE-06**: 사용자는 GEMINI-TTS-VOICES.md에서 언어·지역 → 성별 표현 → 이름 순으로 공식 목소리를 확인할 수 있다. 카탈로그 수집 상태·출처·미확인 필드는 명확하다.

### 오디오와 신뢰성

- [ ] **AUDIO-01**: 사용자는 생성 중 오디오를 듣고 취소하며, 완료 후 재생·다운로드할 수 있다. 부분 생성 실패를 완성 음성으로 표시하지 않는다.
- [ ] **AUDIO-02**: 사용자는 공식 지원 WAV, L16, μ-law, A-law와 지원 샘플레이트를 출력 목적에 맞게 선택할 수 있다. 형식·재생·다운로드가 일치한다.
- [ ] **SAFE-01**: 잘못된 입력·업스트림 오류는 한국어로 처리하고 API 키·외부 오류 본문을 노출하지 않는다. 새 네트워크 작업은 취소와 자원 상한을 갖춘다.
- [ ] **A11Y-01**: 사용자는 키보드로 새 기능을 조작하고 레이블·상태·오류를 스크린리더로 확인할 수 있다. 실기 미확인은 별도 기록한다.

### 처리 등급

- [ ] **SERVICE-01**: 사용자는 공식 지원 범위에서 Standard, Flex, Priority 처리 등급을 선택하며, 앱은 비용·대기 차이를 안내하고 선택한 등급을 조용히 바꾸거나 유료 재호출하지 않는다.
- [ ] **SERVICE-02**: 사용자는 요청한 처리 등급과 응답에서 확인된 실제 처리 등급을 구분할 수 있고, 실제 등급을 확인할 수 없으면 미확인으로 안내받는다.

### Batch 음성 합성

- [ ] **BATCH-01**: 사용자는 여러 TTS 요청을 하나의 공식 Batch 작업으로 제출할 수 있고, 모델·목소리·대본 검증과 앱의 inline 입력 크기 제한을 확인할 수 있다.
- [ ] **BATCH-02**: 사용자는 Batch 작업 목록과 상태를 조회하고, 저장한 작업 식별자로 다시 열어 완료·실패·취소·만료 여부를 확인할 수 있다.
- [ ] **BATCH-03**: 사용자는 지원되는 Batch 작업을 명시적으로 취소·삭제하거나 작업 내부 우선순위를 조정할 수 있고, 허용되지 않는 상태와 실패 이유를 안내받는다. Batch 내부 우선순위는 Priority 처리 등급과 구분한다.
- [ ] **BATCH-04**: 사용자는 완료된 Batch의 요청별 성공 음성을 재생·WAV 저장하고 개별 실패를 확인할 수 있으며, inline 및 파일 기반 결과를 요청 식별자로 대응시킬 수 있다.

### 근거와 검증

- [ ] **DOC-01**: 구현에 사용한 공식 원문 전체와 버전을 보관하고 기능별 구현·검증·제약 표를 남긴다.
- [ ] **TEST-01**: 모델·요청 스키마·화자 처리·음성 관리·오디오 형식·처리 등급·Batch·오류·취소 회귀 검사가 통과한다. 실제 호출·청취와 mock 검사를 구분한다.

## v2 Requirements

이번 요청에서 확인된 공식 음성 기능은 임의 이월하지 않는다. 별도 제품 확장 요구는 아직 없다.

## Out of Scope

| Feature | Reason |
|---------|--------|
| 배포·push·main 병합 | 사용자가 요청하지 않음 |
| 계정 시스템·생성 이력·BGM 믹싱 | 모델 업데이트 범위에 없는 별도 제품 확장 |
| 임의 실존 인물 음성이라고 보증 | 설명 생성과 실제 인물의 동일성은 별개이며 API 보증 없음 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| TTS-01 | Phase 1 | Pending |
| TTS-02 | Phase 1 | Pending |
| TTS-03 | Phase 1 | Pending |
| TTS-04 | Phase 2 | Pending |
| VOICE-01 | Phase 1 | Pending |
| VOICE-02 | Phase 2 | Pending |
| VOICE-03 | Phase 2 | Pending |
| VOICE-04 | Phase 2 | Pending |
| VOICE-05 | Phase 2 | Pending |
| VOICE-06 | Phase 1 | Pending |
| AUDIO-01 | Phase 1 | Pending |
| AUDIO-02 | Phase 2 | Pending |
| SERVICE-01 | Phase 2 | Pending |
| SERVICE-02 | Phase 2 | Pending |
| BATCH-01 | Phase 2 | Pending |
| BATCH-02 | Phase 2 | Pending |
| BATCH-03 | Phase 2 | Pending |
| BATCH-04 | Phase 2 | Pending |
| SAFE-01 | Phase 1 | Pending |
| A11Y-01 | Phase 3 | Pending |
| DOC-01 | Phase 3 | Pending |
| TEST-01 | Phase 3 | Pending |

**Coverage:** 22/22 v1 requirements mapped; no orphans or duplicates.

---
*Last updated: 2026-10-11 after roadmap creation*
