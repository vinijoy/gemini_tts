# 코드베이스 부분 갱신 기준

**갱신일:** 2026-10-11
**방식:** 승인된 최소 Update. 전체 Refresh·그래프 재생성·테스트 재실행·커밋 없음.
**기준:** `c49f74b5251782cd41f2a5daa29b611785b7de89` + 아래 미커밋/미추적 경로 SHA-256. 범위 외 절의 기존 설명은 보존한다.

| 문서 | 마지막 성공 기준 커밋 | 반영한 범위 |
| --- | --- | --- |
| `ARCHITECTURE.md` | `c49f74b5251782cd41f2a5daa29b611785b7de89` | `src/lib/`, `src/app/api/`, `src/app/components/`, `src/app/page.tsx`, `src/utils/audio-format.ts`: REST 계층·공유 검증·Voices·Batch·PCM·제공 카탈로그 흐름 |
| `STRUCTURE.md` | `c49f74b5251782cd41f2a5daa29b611785b7de89` | 위 구조 경로 + `scripts/generate-voice-catalog.mjs`, `GEMINI-TTS-VOICES.md`: 새 모듈 위치와 추가 코드 지침 |
| `STACK.md` | `c49f74b5251782cd41f2a5daa29b611785b7de89` | `package.json`, `src/lib/gemini-client.ts`, `scripts/generate-voice-catalog.mjs`: SDK 2.28.0 고정, REST 전송, 테스트 명령 |
| `INTEGRATIONS.md` | `c49f74b5251782cd41f2a5daa29b611785b7de89` | `src/lib/`, `src/app/api/`, `src/app/components/`, `src/utils/audio-format.ts`, `scripts/generate-voice-catalog.mjs`, `GEMINI-TTS-VOICES.md`: REST·Files·제공목록 provenance |
| `TESTING.md` | `c49f74b5251782cd41f2a5daa29b611785b7de89` | `package.json`, `src/lib/*.test.ts`, `src/app/api/tts/route.test.ts`: fetch 계약·카탈로그·Batch 테스트 패턴 |
| `CONCERNS.md` | `c49f74b5251782cd41f2a5daa29b611785b7de89` | `src/lib/`, `src/app/api/`, `src/app/components/`, `src/app/page.tsx`, `src/utils/audio-format.ts`: 실제 제한·검증 공백 |
| `CONVENTIONS.md` | 변경 없음 | 이번 부분 갱신 대상 아님 |

## 미커밋/미추적 검토 경로 해시

각 문서는 위 반영 범위에 해당하는 행만 기준으로 사용한다. 다른 경로·동일 HEAD의 이후 수정까지 최신이라고 간주하지 않는다.

| 경로 | SHA-256 |
| --- | --- |
| `GEMINI-TTS-VOICES.md` | `14f121586a01d2426ffdcfd0517b9010662ec0e0ae99f0455a3856e8097800b9` |
| `scripts/generate-voice-catalog.mjs` | `dcee71212f048605b5fd6826591f6efa9e588be73e44054410fb9e4e939f5bfb` |
| `src/app/api/tts/route.test.ts` | `8c5153aa1a5db6730cecfc7358f973ac94cd3c764e1412db0fdff1caeeade6d3` |
| `src/app/components/BatchPanel.tsx` | `fb210ce28a30f05d89d2b7b3d34ff316d582c85bdb6e1f756f20d47eb4116842` |
| `src/app/components/VoiceLibrary.tsx` | `317a8b461fd3fe77a016b1cc1be33376ee3206fd65912a0c2a9c57ae0d648113` |
| `src/app/components/VoiceStudio.tsx` | `cae16b77326e6a82d4cd3a5952c4ca47a295f0b6b095799643f9bf36821d3f0f` |
| `src/app/page.tsx` | `0d08fe560b0a0b6c55445b098be2c7e7deaf97525e7a8bb97dd508bed24936c8` |
| `src/lib/gemini-batches.test.ts` | `2c42d19cc62dc32949fe942883c76cfca7b90990af3912b8206a020807d7846e` |
| `src/lib/gemini-batches.ts` | `7d7999c86a712b9089437ed9dfe4b626f2401ef869adaf0653f99b057ac37537` |
| `src/lib/gemini-client.ts` | `6b501b3edac567c15bc501701ac95a43d631a4343567dbadb07afdc81d120d8e` |
| `src/lib/gemini-tts.test.ts` | `73296328c64796129ed42b9ec5abb1b3f5843f3408ea2f939b29791ec8e7f663` |
| `src/lib/gemini-tts.ts` | `9ec88c76fc74059ed5ffe1df74974f00cf27812190711c60f4b50238e220da6e` |
| `src/lib/gemini-voices.test.ts` | `c9c1d3d0b02a682c6769abd2e2d33ef65b898fdcbf42ae7c6934c5dc8420a194` |
| `src/lib/gemini-voices.ts` | `1279c48be07e29e2a8cdb7dc667a0955ba16ff6104138584929c6acb7eb3d518` |
| `src/lib/voice-catalog.test.ts` | `8ed4d0843f475ee0e26f94791f98c78fad82de0e0f08190c6fe674be737796e8` |
| `src/lib/voice-catalog.ts` | `1f68064acca3bde93fecc6fd490610d7d344b362d16d9ef145540ae82a13f6b6` |

## 확인 및 남은 범위

- 대상 문서 재열람, 소스 경로 존재, 변경 계약 대조, `git diff --check --no-ext-diff` 통과 후 기록한다. 단위·통합·빌드 통과 수는 부모 실행 결과에서 별도로 확인한다.
- 사용자 제공 `GEMINI-TTS-VOICES.md` 원문 SHA-256과 파서 계약을 확인했다. 2,089개·한국어 117개 및 50+50+17 페이지 검증은 부모의 실제 실행 보고와 `src/lib/voice-catalog.test.ts` 계약을 구분해 반영했다.
- 현재 키 GET HTTP400 `INVALID_ARGUMENT`/`API_KEY_INVALID`는 부모 실행 보고다. 제공 목록의 출처와 현재 키 접근을 분리한다. 유료 합성·제작·Batch·실제 VoiceOver/NVDA·청취 검증은 미완료다.
- Remix 계약·webhook 미구현, WAV-only 앱 업로드 제한, 전체 그룹 수 없는 v1·외부 Batch 키의 완전성 한계는 `CONCERNS.md`에 남긴다.
- `src/lib/gemini-batches.ts`의 v2 키·누락 탐지 후속 수정을 대조하고 해당 검토 경로 해시를 갱신했다. `src/app/layout.tsx`의 Gemini 3.8 제목은 국소 문구 변경으로 맵 구조 갱신 대상이 아니다.
- `STATE.md`, `ROADMAP.md`, `REQUIREMENTS.md`, 기존 그래프와 범위 밖 문서는 갱신하지 않는다.

- 최종 로컬 브라우저 확인 뒤 VoiceLibrary 조회 초점 복원과 globals.css 입력 간격·포커스 경계를 보강했다. 구조는 유지되며 최종 테스트 131개·lint·tsc·build 통과 후 해당 소스 해시를 대조했다.

## 2026-10-11 UI 후속 부분 갱신

- 방식: `gsd-map-codebase --fast --focus arch`, 전담 매퍼 1개로 기존 문서 Update.
- 대상: `ARCHITECTURE.md`, `STRUCTURE.md`의 화면 구조·한국어 표시 관련 절만 갱신. 다른 영역의 기존 기준은 위 표를 유지한다.
- 이 부분의 마지막 성공 기준 HEAD: `7548bbd0fc39359751c02cc9b6da2c4e87529a60` + 아래 작업 트리 SHA-256. HEAD에 미커밋 코드가 포함됐다는 뜻은 아니다.
- native drift는 `last_mapped_commit: null`, `action_required: true`로 루트 파일들을 구조 변화로 반환했다. 변경 없음으로 간주하지 않았고 기존 기록과 실제 UI 경로로 범위를 한정했다. 전체 맵 drift 해소를 주장하지 않는다.
- `STATE.md`와 `ui-followup.md`에 수정·검증·미수행 범위를 연결했다. 위의 STATE 비수정 기록은 이전 매핑 실행에 한한다. ROADMAP/REQUIREMENTS와 기존 quick 검증 기록은 보존한다.

| UI 검토 경로 | SHA-256 |
| --- | --- |
| `src/app/page.tsx` | `82a6d27d7dab7d19255a8ba0f81900b5917c5c2d19c01194b30f07ab6fcee917` |
| `src/app/components/VoiceLibrary.tsx` | `fb503d6f765265edc557e0459b698f8afa44f4d38d4f0c32ecb4b355bacfe3fa` |
| `src/app/components/TtsEditor.tsx` | `152496c25d1d3ef418d6379ad0b9d459a70ec3e1dcf10ed7eaefe644fd44bbde` |
| `src/app/components/VoiceStudio.tsx` | `a4eb42547f6d57024d15a74115180be5d212939f197f2dd99292be4dd2ca2052` |
| `src/app/components/BatchPanel.tsx` | `fcba349a59eb33dd6ecc9c0eaa0a8a04cf98dadbfe1f66861cec0ea9c8d69e1c` |
| `src/app/components/LocaleSelect.tsx` | `4f360ed08e47b01e2bc567048a00bc7b1c6969b25b5aa46403c42279a459f532` |
| `src/lib/tts-labels.ts` | `8a6b0bccbdb8b47200328514803b62ddaa9049400b077a40dc7df92d9cc2271a` |
| `src/lib/voice-locale-options.json` | `116f9d98d5ccd9adac1a223163f19c57cde632024a98d37468667617463b8f3f` |
| `src/app/page.test.tsx` | `2115588deef9b340a2da6ca48922dcef93b5cb798dcc1a48dbf35880c96ca620` |
| `src/app/components/choices.test.tsx` | `3bfd3b3f0ae00860c2dad9bda7cd6737fa375ef641cdcdcc37009aa32e65805b` |

## quick 261011-pgf 숨은 탭 메뉴 부분 갱신

- `gsd-map-codebase --fast --focus arch` Update: ARCHITECTURE.md/STRUCTURE.md에 TabPanel·TabSelect 경계, 제어형 선택 유지, 완료 응답의 숨은 초점 보호를 반영했다. 기존 타 영역 기준은 유지한다.
- 기준 HEAD는 `7548bbd0fc39359751c02cc9b6da2c4e87529a60`이며 아래 해시는 미커밋 작업 트리 기준이다. 이전 UI 해시보다 이 절이 해당 경로의 최신 기준이다.
- 새 선택 요소도 탭 내부에서는 TabSelect와 부모 제어형 상태를 사용하도록 STRUCTURE.md 확장 규칙에 기록했다.
- 전체 144 tests·lint·tsc 및 Safari AX 관찰 결과는 quick 실행 기록에 있다. 후속 사용자 확인으로 이번 탭 사이 메뉴 문제의 VoiceOver 수용은 통과했다. NVDA·앱 전체 수용과 커밋 마감 미완료는 보존한다.

| 경로 | SHA-256 |
| --- | --- |
| `src/app/page.tsx` | `08d6962b72a0444ab5c69dd52aef3b3dec3a37cdc3903ddb7b1592385e31fd41` |
| `src/app/page.test.tsx` | `525821ace9b68d5739b0c3b29ec06401d8e4a3ee06547a3e56b339b123d4de8c` |
| `src/app/components/TabPanel.tsx` | `8a54c33cf6017e5e9dfea8c5e967501f555a053acdb736bb5b9cfef885c92dd0` |
| `src/app/components/BatchPanel.tsx` | `36e1aa26b851572de29dd5784c02cf92ec7c6c74d8a3b5a51d1cc31cd6b3d809` |
| `src/app/components/VoiceStudio.tsx` | `127d023b57eef70925b75232275214d40eebca2b04b057298193a1096be0874e` |
| `src/app/components/LocaleSelect.tsx` | `bc82c127af3f454bf0a6344429eb275de8b66627d1fb53f60fa399aaf18cf344` |
| `src/app/components/TtsEditor.tsx` | `4fd5422cb436b9eb0a1f18ea0c6c34dc5459ba129642de897a3a60dbebea6d2f` |
| `src/app/components/VoiceLibrary.tsx` | `4e3b5fd110118abef5ed3b653597eea41c9c2a158233931de134d9ae5cdeb90e` |

## 2026-10-11 커밋 마감 확인

UI 및 선행 의존 변경은 `0b51afa69c1d7e4653f1a529c71dfdc777d631e8`, API 오류·처리 등급 변경은 `0503cbec13c85b31d3c39cb9667686d42225080c`에 보존했다. 위 작업 트리 해시는 과거 부분 매핑 시점 기록이며 최종 코드 전체 재매핑을 의미하지 않는다. STRUCTURE.md에 사용자 확인된 생성 UI 순서와 회귀 검사 진입점을 보완했다. 생성 순서 변경은 기존 컴포넌트 내부 배치이므로 전체 맵 재생성은 생략했다. 카테고리 탐색·TimedLiveRegion 등 선행 변경의 전반적 맵 동기화는 다음 관련 계획 전 실제 소스를 대조할 보류 범위로 남긴다.
