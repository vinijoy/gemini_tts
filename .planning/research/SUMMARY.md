# Project Research Summary

**Project:** Gemini TTS Web UI  
**Domain:** 접근성 중심 한국어 음성 제작 웹 앱의 Gemini 3.8 확장  
**Researched:** 2026-10-11  
**Confidence:** MEDIUM

## Executive Summary

기존 Next.js 앱의 첫 PCM 재생·취소·완성 WAV 저장 경로를 유지하면서 Gemini 3.8 Flash와 Flash-Lite의 공식 음성 기능을 확장한다. 핵심은 모델명 교체뿐 아니라 낭독 대본과 연출·화자 메타데이터 분리, 원격 목소리 자산 관리, 기본 두 화자와 맞춤 음성 대화의 실행 방식 구분이다. 공식 기능 전수 반영이 요청 범위이므로 일부 기능을 첫 구현에서 제공하지 못해도 승인된 제외처럼 처리하지 않는다.

기존 Next.js 16.2.12·React 19.2.4·Web Audio를 유지하고 @google/genai를 2.28.0으로 고정한다. Models 스트리밍과 Voices API를 서버 경계에서 감싸고, SDK 직렬화가 지원하지 않는 출력 형식 필드에만 REST 어댑터를 둔다. 라이브러리·설계·복제 자산을 확보한 뒤 맞춤 대화를 순차 턴 합성으로 연결한다. Batch/Flex/Priority도 범위에 유지한다.

주요 위험은 연출 낭독, WAV/PCM 혼용, 부분 실패의 성공 처리, 복제 동의·업로드·비밀값 경계다. 실제 전송 body·오디오 fixture·취소·오류 회귀를 mock으로 검증하고 인증 카탈로그·유료 생성·한국어 청취·VoiceOver 수용은 별도 증거로 관리한다. Remix 요청 스키마와 한국어 공식 복제 동의문 공백은 추정 구현으로 메우지 않는다.

## Key Findings

### Recommended Stack

[STACK.md](STACK.md)의 권고를 채택한다.

- Next.js 16.2.12 / React 19.2.4 / TypeScript 5.9.3: 기존 UI·서버 경계 유지. 코딩 시 설치 Next.js 가이드를 따른다.
- @google/genai 2.28.0: 공식 Voices 최소 JS 2.24.0 이상 충족. Node >=20 요구와 실제 실행 버전은 설치 시 확인한다.
- Web Audio·기존 PCM/WAV 유틸리티: 청크·취소·정리 계약 유지. 완성 WAV 미리듣기는 Blob 경로로 재생한다.
- 서버 fetch: responseFormat의 실제 SDK 전송 누락을 보완한다. 타입 캐스팅을 지원 증거로 삼지 않는다.
- Vitest 4.1.10: 유료 호출 없이 실제 SDK/fetch 직렬화와 실패 경계를 검사한다.

Models camelCase / Voices snake_case는 어댑터에서 변환하고 생성 요청의 store는 항상 명시한다. 새 DB/큐를 동기 합성에 먼저 도입하지 않는다.

### Expected Features

정본 체크리스트는 [FEATURES.md](FEATURES.md)다.

**Must have:** 두 공식 모델 선택, 대본/style 분리, 인라인 발성·휴지 태그, 단일 음성 스트리밍·취소·완성 WAV, 기본/확장 카탈로그의 검색·전체 필터·페이지, 한국어 접근성 안내. GEMINI-TTS-VOICES.md는 공식 메타데이터만으로 언어·지역 → 성별 표현 → 이름 순서로 작성한다.

**요청된 확장 기능:** 기본 최대 두 화자·턴별 연출·맞장구, custom 순차 대화, Voice Design·반환 미리듣기·관리, Replication·원본/동의 녹음·저장 모드·만료, L16/WAV/μ-law/A-law·rate 선택, Batch/Flex/Priority. 차별화 기능이라는 분류는 제외 승인이 아니다.

**명세 확인 대기:** Remix의 base_voice 위치·형식. Batch/처리 등급 보충은 coordinator가 검증 중이며 FEATURES 부록을 요구사항 확정 시 함께 반영한다. 이 요약은 아직 그 부록을 열람하지 않았다.

**Defer / 범위 밖:** 생성 이력·BGM·계정 시스템. 배포·push·main 병합은 요청 없음. 공식 TTS 기능을 편의상 v2로 넘기는 승인은 없다.

### Architecture Approach

[ARCHITECTURE.md](ARCHITECTURE.md)의 공통 PCM 경로와 서버 경계를 유지한다.

1. 편집 UI·불변 요청 스냅샷: text/style/화자/음성 참조 분리, runId별 실행 상태.
2. 서버 검증·3.8 변환기: 모델·총량·화자·음성 조합 검증, API 키 보호.
3. 합성 실행기: single / prebuilt-dialogue / custom-dialogue 구분. custom은 순차 턴·전체 취소·전 턴 정상 종료를 보장한다.
4. Voices 어댑터: 목록·필터·페이지·설계·복제·삭제·수명·preview 정규화.
5. 오디오 경계: MIME·컨테이너·rate·채널 검증, PCM 결합 뒤 WAV를 한 번만 생성.
6. Batch 작업 경계: 즉시 스트림과 다른 작업 상태·결과·취소 계약을 둔다. 지속성 필요는 Batch 계획에서 따로 판단한다.

### Critical Pitfalls

[PITFALLS.md](PITFALLS.md)의 핵심 예방책:

1. **연출/화자 접두어 낭독:** text와 speechMetadata 분리, 실제 전송 body 검사.
2. **WAV/PCM/인코딩 혼용:** 형식별 fixture와 재생 경로. WAV 전체 연결·고정 44바이트 절단 금지.
3. **custom을 기본 두 화자 설정에 삽입:** 지원 조합 서버 검증과 순차 턴 분리.
4. **중복 재생·부분 성공:** 첫 PCM 이후 전체 자동 재시도 금지, 전 턴 정상 종료만 다운로드 허용.
5. **복제·자산 경계 누락:** 원본과 동의 녹음 별도 검증, store/TTL 명시, 생성 무조건 재시도 금지, 키·녹음·대본 일반 로그 제외.

## Implications for Roadmap

| Phase | Rationale | Delivers / Addresses | Avoids |
|------|-----------|----------------------|--------|
| 1. 3.8 계약·재생 보존 | 모든 기능의 전송/오디오 기반 | SDK 고정, 두 모델, text/style·태그, 단일 스트림·취소·WAV 회귀 | 지시문 낭독·필드 누락·부분 완료 |
| 2. 카탈로그·기본 두 화자 | 음성 참조·턴 모델을 먼저 확립 | 전체 필터·페이지·분류 문서, 화자·턴별 연출·맞장구 | 메타데이터 추정·30개를 전체로 오인·화자 매핑 오류 |
| 3. 맞춤 자산·복제 | custom 대화의 음성 ID/키 확보 | Design·preview·관리, Replication·동의·저장/만료, Remix 명세 추적 | 동의 생략·키 노출·중복 자산·store 오해 |
| 4. 맞춤 대화·출력 확장 | 자산과 공통 재생 경계 재사용 | 순차 턴·전체 취소, L16/WAV/G.711·rate, REST body 검사 | 앞 턴 중복·부분 파일·인코딩 오해 |
| 5. Batch·등급·전수 대조 | 비동기 작업 수명 분리 | FEATURES 부록 기반 Batch/Flex/Priority·상태/결과/오류, 전수 기능 추적 | 지원 플래그만으로 완료·미구현의 임의 제외 |
| 6. 청취·접근성 수용 | mock과 실사용 증거 분리 | 한국어 발음·태그·화자/운율, 키보드/VoiceOver, 재생/저장 일치 기록 | 자동 검사로 실기 수용 완료 주장 |

### Phase Ordering Rationale

요청 계약 → 음성/턴 참조 → 맞춤 자산 → 순차 합성 순서다. 출력 형식은 공통 오디오 경계 위에서 확장하고 Batch는 별도 실행 계약으로 관리한다. 사용자 승인에 따라 quick으로 구현을 묶을 수 있지만 quick 완료는 모든 단계의 실기 수용 완료가 아니다.

### Research Flags

- **추가 명세 확인:** Phase 3 Remix·한국어 동의문·업로드 조건, Phase 4 SDK/REST 출력 차이, Phase 5 Batch/Flex/Priority. FEATURES 보충으로 해결된 사항은 재조사하지 않는다.
- **표준 패턴:** Phase 1 요청 변환·mock 회귀, Phase 2 필터/페이지·턴 편집, Phase 4 순차 취소. 저장 공식 문서와 SDK를 근거로 계획한다.
- **실기 필요:** Phase 6 청취·VoiceOver·권한/쿼터는 연구나 mock으로 대체하지 않는다.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM | 공식 가이드·npm 배포물 교차 확인, 설치·인증 호출 미실행 |
| Features | MEDIUM | 모델 카드·Voices reference·OpenAPI 대조, 공개 스키마 공백 |
| Architecture | MEDIUM | 기존 구조·공식 제약 근거의 설계 제안 |
| Pitfalls | MEDIUM / 세부 LOW | 코드베이스 연구와 보관 원문 근거, 재현·실기 미검증 |

**Overall confidence:** MEDIUM. 공식 출처 권위와 현재 계정 실행 성공 증거는 구분한다.

### Gaps to Address

- 전체 인증 카탈로그·권한·quota 미검증: 실패/미조회와 메타데이터 미제공을 구분한다.
- Remix 요청 스키마·한국어 공식 동의문·일부 MIME/길이/용량 조건 미확인: 추정 필드나 번역을 공식 계약으로 제시하지 않는다.
- Batch/등급 FEATURES 보충 반영 필요. 지원 자체는 확인됐으며 승인된 제외가 아니다.
- Node 실행 버전·호스팅 deadline·업로드/메모리 상한은 구현 환경에서 확인한다.
- 한국어 품질·custom 연결·겹침·VoiceOver는 사람/기기 검증 대기다. 유료 검증을 자동 실행하지 않는다.

## Sources

### Primary sources

- [Speech generation](https://ai.google.dev/gemini-api/docs/generate-content/speech-generation) — docs/google-gemini/speech-generation.md.
- [Flash TTS](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-tts), [Flash-Lite TTS](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-lite-tts) — 모델·기능·제약.
- [Voice Design](https://ai.google.dev/gemini-api/docs/voice-design), [Voice Replication](https://ai.google.dev/gemini-api/docs/voice-replication) — 자산·preview·동의·저장.
- [Voices API](https://ai.google.dev/api/voices), [OpenAPI](https://ai.google.dev/static/api/interactions.openapi.json) — 필터/페이지·공개 요청 스키마. 전체 원문 docs/google-gemini/ 보관.
- [공식 JS SDK](https://github.com/googleapis/js-genai), [npm 2.28.0 배포물](https://registry.npmjs.org/@google/genai/-/genai-2.28.0.tgz) — STACK의 타입·직렬화 조사, Context7 /googleapis/js-genai 교차 확인.

### Project evidence

PROJECT.md, research/STACK.md·FEATURES.md·ARCHITECTURE.md·PITFALLS.md, 해당 연구가 열람한 codebase/ARCHITECTURE.md·STACK.md·CONCERNS.md 및 합성·재생 코드. 이 요약 자체는 소스 재감사·인증 호출·유료 합성을 실행하지 않았다.

---
*Research completed: 2026-10-11; Batch/처리 등급 보충 반영 대기*
*Ready for roadmap: yes — 명세 공백과 미검증 항목을 열린 요구사항으로 보존*
