## ISSUES FOUND

대상: `261012-atd-PLAN.md`, quick-full --validate. 계획 1개·작업 3개.
**BLOCKER 0, WARNING 1, INFO 0.** 기능적 누락이나 잘못된 연결은 발견하지 않았다.

| 항목 | 결과 |
|---|---|
| 목표·D-01~D-05 | 합산 제한 제거, 긴 개별 대사 분할, 연출 원문 반복, 두 탭 유지, 순차 생성과 mock 검증이 Task 1~3에 모두 있다. |
| 작업 구조 | GSD verify.plan-structure: valid=true, errors/warnings=[], 모든 작업에 Files/Action/Verify/Done 존재. |
| 원문·화자·연출 | 재결합 동등성, 태그/Unicode 경계, 공백 보존, style verbatim과 모드별 voice config 규칙을 명시한다. |
| 사전 검증 | 모든 그룹을 계획·검증한 후 synthesize에 전달한다. 64KiB·128개 요청·분할 불가 설정의 provider fetch 0회 검증이 있다. |
| 요청 예산 | 1,000 code points·실제 wire 6,000 bytes를 앱 정책으로 정의하며 공식 토큰 적합성 보증으로 주장하지 않는다. |
| 연결 | 화면 snapshot → parseTts → POST → openPcm → requestGroups/wireRequest → PCM → 정상 EOF 후 완성 WAV를 mock으로 검증한다. |
| 실패·취소 | 후속 그룹 중단, 첫 PCM 이후 재시도 금지, 그룹별 PCM 경계, 누적 32MiB와 실패 시 완성본 폐기를 다룬다. |
| 프로젝트 규칙 | STRUCTURE의 DOM·탭·상태 보존, Next.js 안내 열람, 한국어 오류와 자동 검사/실기 수용 분리를 반영한다. |

범위: 10개 파일(소스 4·테스트 4·문서 2), 3개 작업. estimate-check --calibrated: 26,000/100,000 tokens, ratio=0.26, over_budget=false. confidence=low, sample_count=0으로 실적 보정 전 추정치다.

단일 계획 내 작업은 순차이며 교차 계획 의존성·데이터 계약 충돌은 없다. 정식 ROADMAP 정합성은 quick 범위에서 제외했다. 전용 RESEARCH/PATTERNS가 없어 Dimension 7c/11/12는 해당 없음. Dimension 8: SKIPPED (nyquist_validation=false). 실패 방향·명령 경로 probe는 제공되지 않아 규칙대로 재추론하지 않았다.

```yaml
issues:
  - plan: "261012-atd-01"
    dimension: scope_sanity
    severity: warning
    required_property: "계획의 변경 범위가 10개 파일 경고 임계값 아래에 머물거나 그 범위를 관리할 실행 분할이 명확해야 한다."
    description: "files_modified 10개로 분할기·입력 계약·UI·스트림 실패 회귀·문서를 다룬다. 작업 수 3개와 예산 추정 26%는 양호하지만 파일 수는 WARNING 임계값에 도달한다."
    fix_hint: "예를 들어 작업별 검사·커밋을 경계로 실행 문맥을 분리하는 방식을 명시할 수 있다. 기능이나 회귀 검증을 삭제할 필요는 없다."
```

범위 경고 1개를 planner에 반환한다. 구현·테스트 통과나 VoiceOver·청취 수용 판정이 아니다. 소스/STATE/기존 UAT는 변경하지 않았다. 편집 훅의 저장 그래프 참고는 계획 검토 근거로 대체하지 않았다.
