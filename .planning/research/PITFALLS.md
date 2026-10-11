# 도메인 위험: Gemini 3.8 TTS 업데이트

**프로젝트:** Gemini TTS Web UI  
**조사일:** 2026-10-11  
**범위:** 보관 공식 원문과 기존 STACK·ARCHITECTURE·CONCERNS를 대조했다. 추가 외부 조사·인증 API·유료 합성·소스 수정은 수행하지 않았다.  
**신뢰도:** SDK·구조는 기존 Context7 교차 조사에 근거한 MEDIUM(`classify-confidence --provider context7 --verified` 실제 결과). 보관 웹 원문만으로 확인한 세부 조건은 도구 분류상 LOW(`--provider webfetch --verified` 실제 결과)이며 구현 전 최신 계약 확인 대상으로 남긴다. 예방책은 설계 제안이다.

## 치명적 위험

### 1. 연출과 화자 이름이 대본으로 낭독됨

**문제·원인:** 이전 모델의 프롬프트 조합을 유지하면 3.8의 verbatim transcript 계약과 충돌한다. 스타일 안내와 `화자: 대사` 접두어가 음성에 섞일 수 있다. [S1]

**예방:** Part의 `text`는 대본과 공식 인라인 태그만 담고, 지속 연출은 `speechMetadata.style`, 화자는 `speechMetadata.speaker`로 분리한다. 대화는 턴별 Part와 정확히 대응하는 화자 등록 이름을 사용한다.

**탐지:** 실제 SDK 전송 body에서 연출/화자 접두어가 대본에 합쳐지지 않았는지 검사한다. 한국어 대본·연출·태그의 실제 낭독은 후속 청취로 확인한다. **신뢰도 MEDIUM:** S1과 기존 STACK·ARCHITECTURE 교차 조사.

### 2. WAV와 PCM 혼용으로 잡음·손상 파일이 생김

**문제·원인:** 기본 스트리밍은 헤더 없는 24kHz·모노·signed PCM16LE지만 일반 단일 응답은 완성 WAV다. 설계 음성 `sample_audio`도 WAV다. 모두 PCM으로 해석하거나 WAV 헤더를 또 붙이면 잘못 재생된다. [S1: Audio output formats, S2]

**예방:** MIME·컨테이너·샘플레이트·채널을 오디오 경계에서 검증한다. 기존 PCM 스트림을 유지하고 WAV 미리듣기는 완성 Blob으로 재생한다. 여러 턴은 같은 형식의 PCM 프레임을 연결한 후 WAV를 한 번만 만든다. WAV 전체 바이트 연결이나 모든 WAV의 헤더가 44바이트라는 가정은 피한다.

**탐지:** 홀수 바이트 청크, 빈 오디오, 다른 MIME/rate, WAV 미리듣기, 최종 RIFF 크기를 검사한다. 청크 경계와 샘플 경계가 같다고 가정하지 않는다. **신뢰도 MEDIUM:** S1·S2와 기존 STACK·ARCHITECTURE.

### 3. 기본 두 화자와 맞춤 음성을 같은 모드로 처리함

**문제·원인:** 공식 단일 요청 `multiSpeakerVoiceConfig`는 prebuilt 최대 두 화자를 설명한다. 설계·복제 음성 대화는 화자별 턴을 각각 합성해야 한다. [S1: Limitations]

**예방:** `single`, `prebuilt-dialogue`, `custom-dialogue`를 구분하고 서버에서 조합을 검증한다. 맞춤 대화는 순서가 있는 턴 배열과 순차 실행기를 사용한다. 확장 라이브러리 음성의 지원을 기본 30개와 같다고 추정하지 않는다.

**탐지:** 미등록 화자·중복 ID·미지원 음성 조합·두 화자 초과, 턴 순서와 음성 매핑을 검사한다. 맞춤 턴 연결의 운율은 실제 청취 대상이다. **신뢰도 MEDIUM:** S1과 기존 ARCHITECTURE.

### 4. 취소·재시도가 부분 음성을 중복 재생하거나 성공으로 표시함

**문제·원인:** 기존 스트림·재생·취소 정리가 여러 경로에 분산돼 있다. 뒤 턴 실패 후 전체 재시도는 앞 턴을 다시 재생할 수 있다. EOF만으로 완료를 판정하면 부분 결과가 완성본이 된다. 전체 deadline 부재도 기존 CONCERNS에 기록돼 있다. [L1, L3]

**예방:** 실행별 `runId`와 불변 요청 스냅샷을 사용한다. 취소 신호를 현재 합성·재시도 대기·다음 턴까지 연결한다. 초기 정책은 전체 실행에서 첫 PCM 전송 이후 자동 재시도를 금지한다. 모든 턴 정상 종료와 정상 종료 사유가 확인된 경우만 완료/다운로드를 허용한다. 중간 실패는 stream error로 전달하고 PCM 사이에 JSON을 섞지 않는다.

**탐지:** 첫 PCM 전후 429, 대기 중·턴 사이 취소, 뒤 턴 실패, 늦은 청크, 빈 결과를 검사한다. 취소 후 새 생성에서 이전 음성이 들리지 않아야 한다. 실제 브라우저 AudioContext·네트워크 중단 검증은 mock과 구분한다. **신뢰도 MEDIUM:** 기존 아키텍처 조사와 로컬 CONCERNS 위험 분석이며 이번 작업에서 재현하지 않았다.

### 5. 복제 업로드·동의·비밀값 경계가 느슨해짐

**문제·원인:** 참고 음성만 받거나 체크박스로 동의 녹음을 대체하면 공식 입력 계약과 다르다. 보관 문서는 같은 성인 화자의 실제 참고/동의 녹음, 10–30초 참고 음성, 지원 언어의 정확한 동의문을 요구한다. 24kHz·모노·16-bit WAV는 권장 형식이다. [S3: Audio and consent requirements]

**예방:** 두 녹음을 별도 입력으로 제공하고 공식 동의문 원문을 사용한다. 서버에서 MIME·실제 파일 형식·길이·제품 바이트 상한을 검증한다. 바이트 상한 수치를 공식 API 한도로 꾸며 쓰지 않는다. base64 증가와 디코딩 메모리도 제한한다. 원본·동의 녹음·대본·API 키·`voicekey_...`를 일반 로그에 남기지 않고 업로드를 기본 영구 보관하지 않는다.

**탐지:** 동의 누락, 초과 길이/용량, 위장 MIME, 디코딩 실패를 mock으로 검사한다. 로컬 검사만으로 동일 화자 검증 성공을 주장하지 않는다. 서버 키가 클라이언트 번들·URL·오류에 노출되지 않아야 한다. 실제 업로드·복제는 사용자 동작과 승인 범위에서 실행한다. **신뢰도 LOW:** 세부 조건은 보관 S3 직접 확인이나 인증 API 미검증. 보안 경계는 L1·L3에 근거한 예방 설계.

## 중간 위험

### 6. 타입 우회로 `responseFormat` 누락을 숨김

기존 STACK은 `@google/genai@2.28.0` 타입·Gemini Developer API 직렬화와 공식 예시의 차이를 기록했다. `as any`로 컴파일만 통과해도 실제 필드 전송은 보장되지 않는다. 기본 PCM 스트리밍에는 필드를 생략하고 추가 인코딩이 필요할 때만 좁은 REST 어댑터를 둔다. 실제 SDK/fetch 경계 body를 검사한다. 요청 빌더만 mock한 검사는 부족하다. **MEDIUM; L2.**

### 7. 음성 메타데이터를 추정하거나 미리듣기 가용성을 과장함

표시 이름·식별자·언어·지역·성별·음성 유형은 별개다. 이름이나 청취 인상으로 미제공 필드를 채우지 않는다. 미제공 상태, 목록 페이지네이션·필터·실패를 처리한다. 생성/조회/목록의 `sample_audio` 제공 범위도 다르며 복제·기본 음성에 설계 미리듣기가 있다고 가정하지 않는다. 실제 카탈로그와 한국어 적합성은 인증 조회·청취 전에는 미확인이다. **MEDIUM; L2, S1, S2.**

### 8. 자산 생성 재시도와 저장 수명이 숨겨짐

생성·Remix·복제의 응답 유실을 일반 합성처럼 재시도하면 자산 중복 생성이 가능하다. 저장 여부는 SDK/가이드 기본값 차이를 피하도록 항상 명시한다. 보관 문서는 저장형에 프로젝트 공유 200개·마지막 사용 후 1년 TTL, 비저장 복제 키에 7일 TTL을 설명한다. 만료·삭제·조회 실패를 구분하고 응답 유실 후 생성 여부를 확인할 경로를 마련한다. 공식 idempotency 지원은 미확인이다. **MEDIUM:** 저장 명시·재시도 설계 L2·L3. **LOW:** 수치 조건 S1·S3 보관 원문.

### 9. 여러 턴이 비용·메모리 제한을 우회함

기존 서버의 공백 대본·임의 음성·스타일 타입/길이 검증과 총 deadline 공백을 새 기능에 복제하지 않는다. 턴별 제한 외에 전체 대본·턴 수·스타일 제한을 서버 스키마로 검사한다. 총 deadline과 취소를 연결하고 종료마다 PCM·Blob URL을 해제한다. 공개 운영의 인증·레이트 리밋은 배포 조건에 맞춰 반영한다. **근거 L1:** 기존 코드베이스 조사 결과이며 이번 작업에서 재현하지 않았다.

## 작은 위험

- 휴지·운율 태그를 정밀 시간 보장으로 오해하지 않는다. 한국어 발음·태그 효과·두 화자 구별은 청취 대상이다. [S1, L3]
- 음성 목록·업로드 오류·생성 상태·화자 추가 후 포커스와 읽기 순서를 확인한다. 키보드·VoiceOver 실기는 컴포넌트 테스트와 별도로 남긴다. [L3]

## 단계별 경고

| 단계 주제 | 우선 위험 | 완료 근거 |
|---|---|---|
| SDK·3.8 요청 이전 | 대본/연출 혼합, 직렬화 누락 | 실제 전송 body·허용 목록 검사 |
| 오디오 계약 보존 | WAV/PCM 혼용, 청크 경계 | 포맷별 fixture·첫 PCM·정상 종료 검사 |
| 기본 두 화자 | 화자 대응과 지원 조합 | 구조화된 턴·한국어 두 화자 청취 |
| 목록·설계·복제 | 허위 메타데이터, 업로드·키·수명 | 누락/만료·실패·로그 경계 검사 |
| 맞춤 여러 턴 | 중복 재생·부분 성공·취소 누락 | 첫 PCM 이후 실패·전체 취소·마지막 턴 검사 |
| 최종 수용 | mock으로 품질 과대 주장 | 실제 청취, 키보드/VoiceOver, 재생·WAV 일치 |

## 출처와 검증 한계

- **S1:** [Google Speech generation](https://ai.google.dev/gemini-api/docs/generate-content/speech-generation), 정본 `docs/google-gemini/speech-generation.md`. Single/Multi-speaker, Migration guide, Streaming, Audio output formats, Limitations, Custom voice limits and TTL.
- **S2:** [Google Voice design](https://ai.google.dev/gemini-api/docs/voice-design), `docs/google-gemini/voice-design.md`. sample_audio 및 목록/조회 차이.
- **S3:** [Google Voice replication](https://ai.google.dev/gemini-api/docs/voice-replication), `docs/google-gemini/voice-replication.md`. Storage modes, Audio and consent requirements.
- **L1:** `.planning/codebase/CONCERNS.md` — 2026-10-11, 기준 커밋 `b373c48b74146f4a2308aff429693e284989e7b1`. 소스를 다시 감사하거나 문제를 재현하지 않았다.
- **L2:** `.planning/research/STACK.md` — SDK 2.28.0 배포물·Context7 교차 조사, responseFormat 누락·store 기본값 차이.
- **L3:** `.planning/research/ARCHITECTURE.md` — 순차 턴·취소·정상 완료·음성 자산 경계.

2026-10-11 수집 공식 원문을 사용했다. 현재 API 동작·계정 접근권한·쿼터·실제 음질은 인증 호출로 확인하지 않았다. 최신 SDK/API 차이, 운영 업로드 상한, 실제 동의 승인, 한국어 운율과 접근성 수용은 후속 단계 검증으로 남긴다.
