# 숨은 탭 메뉴 구현·검증 기록

이 문서는 완료 SUMMARY가 아니다. Task 1·2 구현과 Task 3의 자동 검사/기존 변경 보존 검사는 완료했으나, coordinator의 상태·아키텍처/구조 맵·해시 동기화까지 완료했다. 안전한 독립 커밋 마감은 남았다. 실제 VoiceOver 발화 수용도 별도다.

## 변경

- `TabPanel.tsx` 신규: 활성 문맥은 기본 true. 상태 소유자는 항상 마운트하고 native select만 비활성 때 null로 렌더링한다.
- `page.tsx`, BatchPanel, VoiceStudio, LocaleSelect, TtsEditor, VoiceLibrary의 모든 select에 적용했다. 파일 입력과 LocaleSelect 자체는 마운트를 유지한다.
- VoiceLibrary 기본 선택을 제어형 부모 상태로 보존했다. 확장/저장 목소리 값은 기본 목록에 강제하지 않는다.
- 늦은 조회 응답에서 숨은 조회 버튼의 focus 호출이 재현되어 현재 hidden/inert 조상으로 차단했다. 제작 완료에도 같은 보호를 적용했다.
- `page.test.tsx`에 7개 회귀를 추가했다. 숨은 raw DOM select, 일괄 초안, 중첩 대화/검색/직접 입력, File·input 노드 동일성, 백그라운드 스트림/조회/제작 완료, 30초 polling과 종료 정지를 검증한다.

## RED → GREEN

- 최초 일괄 회귀 실패: select 기대 0, 실제 1. 확장 회귀 실패: 제작 select 기대 0, 실제 4; 늦은 목록 조회가 숨은 버튼으로 초점 이동.
- `/tmp/gemini-pgf-red-1-flat.json`, `/tmp/gemini-pgf-red-2.json`에 실제 TAP 출력과 exit 1을 보존했다. GSD parser는 Vitest TAP의 요약 형식을 인식하지 못해 실제 flat TAP 결과 행에서 Node 호환 summary comment만 계산해 덧붙인 adapter를 명시했다. GSD `check tdd-red-evidence`의 두 최종 판정은 `RED_EVIDENCE_OK`였다.
- GREEN: 대상 2개 파일/35개 테스트 통과. 불필요한 구조 변경이나 패키지 설치는 없다.

## 새 전체 검사 (2026-10-11 18:31 KST)

| 명령 | 결과 |
| --- | --- |
| `npm test` | exit 0, 14개 파일·144개 테스트 |
| `npm run lint` | exit 0, 문제 없음 |
| `npx tsc --noEmit` | exit 0, 오류 없음 |
| `git diff --check` | exit 0 |

## Safari와 수용 범위

열려 있던 Safari localhost:3000의 native AX를 직접 읽고 생성 → 제작 → 일괄 → 생성 탭을 왕복했다. 전체 HTML 콘텐츠의 팝업 수는 생성 9(기존 두 화자 상태), 제작 4, 일괄 1이었다. 모두 해당 활성 패널의 이름 있는 선택 요소였고, 탭 묶음과 활성 패널 사이의 불필요한 메뉴는 관찰되지 않았다. 수정 전 AX는 확보하지 않았다. 실제 VoiceOver 발화, NVDA, 유료 생성, 파일 업로드, 실제 서비스·음성 청취는 실행하지 않았다.

## 기존 작업 보존과 커밋 차단

- baseline: `/var/folders/qn/88ykr3nn2fzfhx_vwx5rbq3h0000gn/T/gemini-hidden-tabs-baseline-cc048y1l`
- baseline은 수정 전 tracked diff/index diff/HEAD/status 및 수정·미추적 파일 82개를 저장했다. 제품 수정 직후 대조에서 75개 동일, 계획의 제품/테스트 파일 7개만 변경, 누락 0, 예상 밖 수정 0이었다. 이후 ui-followup 기록만 계획 범위로 추가했다.
- `task.delta.patch`에 이번 제품·테스트 변경만 baseline 대비 보존했다. 새 TabPanel은 별도 새 파일이다. 제품 diff+신규 컴포넌트 chars/4 토큰 척도는 10,828(문서 제외)이다.
- HEAD와 index가 baseline과 동일하다. 커밋 수 0: 기존 탭·레이블·LocaleSelect 변경 없이는 이번 delta가 성립하지 않아 독립 커밋을 만들지 않았다. 이전 변경의 staging·reset·stash는 수행하지 않았다.
- executor의 zero-commit guard에 따라 `status: complete` SUMMARY와 state/requirement 완료 갱신은 하지 않는다. coordinator가 문서 동기화 및 미완료 상태 기록을 담당한다.
- 새 보안 경계, 외부 endpoint, 인증, 파일 전송 경로는 추가하지 않았다. 새 stub·TODO·skip 테스트가 없다. 기존 textarea placeholder는 입력 힌트이며 미구현 stub이 아니다.

## 자체 확인

신규 TabPanel과 변경 파일 존재, targeted/full 검사 성공, HEAD/index 유지 및 baseline 예상 밖 변경 0을 확인했다. 구현 검증은 통과했으며 정식 GSD 커밋 완료와 실제 스크린리더 수용은 미완료다.

## Coordinator 확인

- 새 공통 컴포넌트와 보고된 테스트·Safari AX 근거를 읽고 대조했다. 문서 전담 매퍼가 ARCHITECTURE.md·STRUCTURE.md의 관련 절을 Update했다.
- STATE.md·codebase-refresh.md는 구현/자동검사/AX 확인과 커밋·발화 미완료를 구분한다. Quick Tasks Completed나 단계/요구사항 완료 상태를 올리지 않았다.

## 사용자 VoiceOver 확인 — 2026-10-11

사용자가 수정 후 “보이스오버에서도 문제 없다.”고 직접 확인했다. 이번 탭 그룹과 탭 패널 사이의 불필요한 메뉴 문제는 사용자 VoiceOver 수용 통과로 기록한다. 앞선 미확인 표시는 당시 에이전트 검사 범위이며 이 사용자 확인이 해당 문제의 최신 상태다. 에이전트가 직접 발화를 청취한 것으로 기록하지 않는다. NVDA·앱 전체 접근성·실제 생성 음성 품질 또는 커밋 마감까지 완료된 뜻은 아니다.
