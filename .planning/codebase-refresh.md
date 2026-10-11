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
