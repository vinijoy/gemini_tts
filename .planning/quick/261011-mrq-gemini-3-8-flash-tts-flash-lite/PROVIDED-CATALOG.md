# 사용자 제공 카탈로그 보존과 현재 서비스 검증

- 사용자 최신 지시: 다른 프로젝트에서 만든 목소리 목록을 같은 이름으로 대치함.
- 정본 경로: `GEMINI-TTS-VOICES.md`. 사용자 대치 이후 원문을 수정하지 않음.
- UTF-8 바이트: 818,689.
- SHA-256: `14f121586a01d2426ffdcfd0517b9010662ec0e0ae99f0455a3856e8097800b9`.
- 문서가 보고하는 수집일: 2026-10-01. 다른 프로젝트의 공식 ListVoices 결과라는 사용자 제공 출처이며 이 실행에서 그 과거 API 수집을 재수행한 것이 아님.
- 실제 구조 검사: 2,089개 고유 prebuilt ID, 한국어 ko-KR 117개. 언어·지역·성별·높낮이·억양·역할·용도·설명을 파싱하고 원문 hash를 검사함.
- 앱 경로: `GET /api/voices?source=provided&type=prebuilt&language_code=ko-KR&page_size=50` → 50개, 다음 페이지50개, 마지막17개. 이 경로는 Gemini key를 읽거나 외부 API를 호출하지 않음.
- 기본 Puck·Flash 설정 유지. 원문 안의 다른 프로젝트 음성 기본값·CLI 운영 지시는 현재 앱 지시로 해석하지 않음.
- 현재 키의 별도 실제 검사: 2026-10-11 `type=prebuilt&page_size=50`은 HTTP400. 최소 `type=prebuilt` GET 1회 진단도 HTTP400, 구조화 상태 `INVALID_ARGUMENT`, reason `API_KEY_INVALID`. 키·원문 오류 메시지 출력 없음. 현재 키의 유효성/접근은 확인되지 않았으며 제공목록 선택이 합성 성공을 보장하지 않음.
- 예방: 목록 생성기 기본 출력은 별도 `GEMINI-TTS-VOICES.generated.md`이며 제공 정본을 덮어쓰지 않음. 실제 추가 API 생성·유료 요청은 없음.
