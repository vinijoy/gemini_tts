# Gemini TTS 전체 목소리 카탈로그

조회 시각: 2026-10-01T10:46:10.385189+09:00 (한국시간, Asia/Seoul)

## 범위와 읽는 방법

공식 `GET /v1beta/voices`를 언어·성별·음높이·유형·검색어 등 어떤 필터도 지정하지 않고 조회했다. `page_size=1000`과 다음 페이지 토큰만 사용해 1,000 + 1,000 + 89 = **2,089개**를 확보했다. 마지막 응답에는 다음 페이지 토큰이 없으며 ID 중복은 없다. 전체란 조회 시점에 현재 인증 프로젝트에서 반환된 모든 항목을 뜻한다. 향후 추가 항목이나 다른 프로젝트의 비공개 목소리까지 포함한다는 뜻은 아니다.

반환 유형은 모두 `prebuilt`다. 공식 기본 스튜디오 30개도 응답에 포함되어 별도 분류했고, 나머지 확장 목소리는 2,059개다. 사용자 제작 `prompted`·`replicated` 목소리는 이번 응답에서 0개였다.

확장 목록은 **언어·지역 → 성별 표현 → 이름** 순으로 분류했다. 여성 1,066개, 남성 966개, 중성 57개이며 제외한 성별은 없다. `gender`는 공식 카탈로그의 지각되는 성별 표현이다. 음높이는 low(낮음), medium(중간), high(높음)을 뜻한다.

이름·ID·모든 반환 메타데이터를 원문 그대로 수록했다. 역할·용도·설명은 의미 손실을 피하기 위해 공식 영문을 유지했다. 설명 속 직업·나이·출신은 제공자의 음성 페르소나 설명이며 실제 인물 신원이나 직접 청취 평가가 아니다. 언어 표시는 카탈로그 분류이며 다른 언어 합성 가능 범위와 같다고 단정하지 않는다.

### 현재 프로젝트에서 사용하기

승인된 기본 목소리는 **Training Voiceover 1 (`ko-kr-training-1`)**이다. 전체 목록 수록은 기본 목소리나 파일별 청취 승인을 변경하지 않는다.

`python3 gemini_audio.py voices`는 기본 스튜디오 30개와 승인된 한국어 1개만 표시하는 로컬 목록이다. 이 문서의 2,089개를 모두 CLI에서 즉시 생성할 수 있다는 뜻은 아니다. 기본 스튜디오는 CLI에서 `Kore`, `Zephyr`처럼 공식 표시 이름의 대소문자를 사용한다. 아래 목소리 ID는 ListVoices가 반환한 `kore`, `zephyr` 등의 원문 ID다. 확장 ID를 사용하려면 도구 지원 및 해당 모델의 합성 가능 여부를 별도로 확인해야 한다. 실행 방법은 [AUDIO-GUIDE.md](AUDIO-GUIDE.md)를 따른다.

### 출처와 완전성 확인

- [Google 공식 Speech generation — Voice options](https://ai.google.dev/gemini-api/docs/speech-generation#voice-options): 기본 30개, Extended Voice Library와 필터·페이지 계약.
- [보관한 공식 원문](docs/google-gemini/speech-generation.md).
- 조회 엔드포인트: `https://generativelanguage.googleapis.com/v1beta/voices`.
- [필터 없는 전체 응답 및 조회 시각](.planning/quick/261001-exm-gemini-tts/catalog.json).
- [문서와 응답의 일대일 대조 검사](.planning/quick/261001-exm-gemini-tts/verify_catalog.py).

이번 작업은 목록 조회와 문서 검증만 수행했다. 음성 생성·전 목소리 청취·모델별 합성 검증은 수행하지 않았다.

## 분류별 개수

기본 스튜디오를 포함한 전체 응답 기준이다. 기본 30개는 모두 API에서 `en-US`로 분류되었지만 공식 안내상 다국어 TTS에 사용할 수 있다. 언어·지역 코드는 총 30개이며 서로 다른 언어 수나 모델의 전체 지원 언어 수와는 다르다.

| 언어·지역 | 언어 코드 | 여성 | 남성 | 중성 | 합계 |
|---|---|---:|---:|---:|---:|
| 아랍어·세계표준 | `ar-001` | 17 | 12 | 0 | 29 |
| 아랍어·이집트 | `ar-EG` | 44 | 46 | 2 | 92 |
| 체코어·체코 | `cs-CZ` | 6 | 8 | 0 | 14 |
| 독일어·독일 | `de-DE` | 39 | 46 | 2 | 87 |
| 그리스어·그리스 | `el-GR` | 22 | 18 | 1 | 41 |
| 영어·호주 | `en-AU` | 24 | 19 | 1 | 44 |
| 영어·캐나다 | `en-CA` | 40 | 36 | 4 | 80 |
| 영어·영국 | `en-GB` | 69 | 47 | 1 | 117 |
| 영어·아일랜드 | `en-IE` | 39 | 37 | 4 | 80 |
| 영어·인도 | `en-IN` | 60 | 53 | 7 | 120 |
| 영어·뉴질랜드 | `en-NZ` | 12 | 14 | 1 | 27 |
| 영어·미국 | `en-US` | 103 | 108 | 4 | 215 |
| 영어·남아프리카공화국 | `en-ZA` | 40 | 37 | 3 | 80 |
| 스페인어·라틴아메리카 | `es-419` | 45 | 38 | 3 | 86 |
| 스페인어·스페인 | `es-ES` | 9 | 12 | 1 | 22 |
| 프랑스어·캐나다 | `fr-CA` | 37 | 31 | 0 | 68 |
| 프랑스어·프랑스 | `fr-FR` | 48 | 28 | 5 | 81 |
| 힌디어·인도 | `hi-IN` | 57 | 53 | 4 | 114 |
| 이탈리아어·이탈리아 | `it-IT` | 27 | 25 | 1 | 53 |
| 일본어·일본 | `ja-JP` | 61 | 51 | 3 | 115 |
| 자바어·인도네시아 | `jv-ID` | 6 | 2 | 0 | 8 |
| 한국어·대한민국 | `ko-KR` | 59 | 57 | 1 | 117 |
| 네덜란드어·네덜란드 | `nl-NL` | 16 | 17 | 0 | 33 |
| 폴란드어·폴란드 | `pl-PL` | 31 | 31 | 1 | 63 |
| 포르투갈어·브라질 | `pt-BR` | 51 | 56 | 0 | 107 |
| 포르투갈어·포르투갈 | `pt-PT` | 33 | 23 | 0 | 56 |
| 스와힐리어·케냐 | `sw-KE` | 19 | 23 | 2 | 44 |
| 타밀어·인도 | `ta-IN` | 14 | 9 | 2 | 25 |
| 텔루구어·인도 | `te-IN` | 15 | 13 | 3 | 31 |
| 베트남어·베트남 | `vi-VN` | 23 | 16 | 1 | 40 |
| 전체 | — | 1066 | 966 | 57 | 2089 |

## 1. 기본 스튜디오 목소리 — 30개

### 여성 — 13개

#### Achernar

- 목소리 ID: `achernar`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: General American
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: Soft, calm, and soothing voice with a higher pitch. Recommended for quiet or personal storytelling.

#### Aoede

- 목소리 ID: `aoede`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: General American
- 역할: Video Voiceover & Host
- 용도: Content & Media
- 공식 설명: Breezy, light, and relaxed voice with a medium pitch. Recommended for lifestyle or travel vlogs.

#### Autonoe

- 목소리 ID: `autonoe`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: General American
- 역할: Advertising Pitch & Commerce
- 용도: Growth & Marketing
- 공식 설명: Bright, positive, and enthusiastic voice with a medium pitch. Recommended for promotions or product feature updates.

#### Callirrhoe

- 목소리 ID: `callirrhoe`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: General American
- 역할: Companion & Peer
- 용도: Conversational / Edu
- 공식 설명: Easy-going, relaxed, and casual voice with a medium pitch. Recommended for friendly guides or casual vlogs.

#### Despina

- 목소리 ID: `despina`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: General American
- 역할: Educational Tutor
- 용도: Conversational / Edu
- 공식 설명: Smooth, mellow, and polished voice with a medium pitch. Recommended for marketing ads or professional e-learning.

#### Erinome

- 목소리 ID: `erinome`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: General American
- 역할: Educational Tutor
- 용도: Conversational / Edu
- 공식 설명: Clear, articulate, and precise voice with a medium pitch. Recommended for training walkthroughs or instructions.

#### Gacrux

- 목소리 ID: `gacrux`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: General American
- 역할: High-Trust Advisor
- 용도: Enterprise Agent
- 공식 설명: Mature, authoritative, and professional voice with a medium pitch. Recommended for official announcements or serious presentations.

#### Kore

- 목소리 ID: `kore`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: General American
- 역할: News & Podcast Host
- 용도: Content & Media
- 공식 설명: Firm, direct, and authoritative voice with a medium pitch. Recommended for news reports or official messages.

#### Laomedeia

- 목소리 ID: `laomedeia`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: General American
- 역할: Advertising Pitch & Commerce
- 용도: Growth & Marketing
- 공식 설명: Upbeat, energetic, and positive voice with a higher pitch. Recommended for sales pitches or social media marketing.

#### Leda

- 목소리 ID: `leda`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: General American
- 역할: Video Voiceover & Host
- 용도: Entertainment & Gaming
- 공식 설명: Youthful, vibrant, and energetic voice with a higher pitch. Recommended for pop culture updates or gaming content.

#### Sulafat

- 목소리 ID: `sulafat`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: General American
- 역할: Customer Support Agent
- 용도: Enterprise Agent
- 공식 설명: Warm, inviting, and comforting voice with a medium pitch. Recommended for onboarding screens or warm welcomes.

#### Vindemiatrix

- 목소리 ID: `vindemiatrix`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: General American
- 역할: Coach & Motivational Guide
- 용도: Wellness & Culture
- 공식 설명: Gentle, mild, and calming voice with a medium pitch. Recommended for kids content or meditation videos.

#### Zephyr

- 목소리 ID: `zephyr`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: General American
- 역할: Advertising Pitch & Commerce
- 용도: Growth & Marketing
- 공식 설명: Bright, positive, and forward-looking voice with a higher pitch. Recommended for showreels or product announcements.

### 남성 — 16개

#### Achird

- 목소리 ID: `achird`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: General American
- 역할: Companion & Peer
- 용도: Conversational / Edu
- 공식 설명: Friendly, approachable, and warm voice with a lower-middle pitch. Recommended for casual walkthroughs or vlogs.

#### Algenib

- 목소리 ID: `algenib`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: General American
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: Gravelly, grounded, and hard-hitting voice with a low pitch. Recommended for dramatic narration or intense stories.

#### Algieba

- 목소리 ID: `algieba`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: General American
- 역할: High-Trust Advisor
- 용도: Enterprise Agent
- 공식 설명: Smooth, relaxed, and polished voice with a low pitch. Recommended for corporate videos or polished explainers.

#### Alnilam

- 목소리 ID: `alnilam`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: General American
- 역할: High-Trust Advisor
- 용도: Enterprise Agent
- 공식 설명: Firm, direct, and commanding voice with a lower-middle pitch. Recommended for authoritative instructions or announcements.

#### Charon

- 목소리 ID: `charon`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: General American
- 역할: News & Podcast Host
- 용도: Content & Media
- 공식 설명: Informative and steady voice with a low pitch. Recommended for technical explainers or documentaries.

#### Enceladus

- 목소리 ID: `enceladus`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: General American
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: Breathy, intimate, and soft-spoken voice with a low pitch. Recommended for storytelling or intimate narrations.

#### Fenrir

- 목소리 ID: `fenrir`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: General American
- 역할: Video Voiceover & Host
- 용도: Entertainment & Gaming
- 공식 설명: Excitable, high-energy, and passionate voice with a lower-middle pitch. Recommended for sports clips or energetic intros.

#### Iapetus

- 목소리 ID: `iapetus`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: General American
- 역할: Tech Support Agent
- 용도: Enterprise Agent
- 공식 설명: Clear, crisp, and articulate voice with a lower-middle pitch. Recommended for help videos or onboarding walkthroughs.

#### Orus

- 목소리 ID: `orus`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: General American
- 역할: High-Trust Advisor
- 용도: Enterprise Agent
- 공식 설명: Firm, serious, and no-nonsense voice with a lower-middle pitch. Recommended for project reports or safety readouts.

#### Puck

- 목소리 ID: `puck`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: General American
- 역할: Podcaster
- 용도: Conversational
- 공식 설명: Upbeat, energetic, and cheerful voice with a rich, approachable tone. Recommended for podcasts, conversational agents, entertainment reviews, or ads.

#### Rasalgethi

- 목소리 ID: `rasalgethi`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: medium
- 억양: General American
- 역할: Educational Tutor
- 용도: Conversational / Edu
- 공식 설명: Informative and measured voice with a medium pitch. Recommended for history lectures or audiobooks.

#### Sadachbia

- 목소리 ID: `sadachbia`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: General American
- 역할: News & Podcast Host
- 용도: Content & Media
- 공식 설명: Lively, animated, and engaging voice with a low pitch. Recommended for daily digests or podcasts.

#### Sadaltager

- 목소리 ID: `sadaltager`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: medium
- 억양: General American
- 역할: Educational Tutor
- 용도: Conversational / Edu
- 공식 설명: Knowledgeable and steady voice with a medium pitch. Recommended for scientific explanations or deep dives.

#### Schedar

- 목소리 ID: `schedar`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: General American
- 역할: Tech Support Agent
- 용도: Enterprise Agent
- 공식 설명: Even, balanced, and steady voice with a lower-middle pitch. Recommended for neutral scripts or documentation readouts.

#### Umbriel

- 목소리 ID: `umbriel`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: General American
- 역할: Companion & Peer
- 용도: Conversational / Edu
- 공식 설명: Easy-going, laid-back, and casual voice with a lower-middle pitch. Recommended for reviews or casual explainers.

#### Zubenelgenubi

- 목소리 ID: `zubenelgenubi`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: General American
- 역할: Companion & Peer
- 용도: Conversational / Edu
- 공식 설명: Casual, conversational, and laid-back voice with a lower-middle pitch. Recommended for startup updates or casual pitches.

### 중성 — 1개

#### Pulcherrima

- 목소리 ID: `pulcherrima`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: neutral
- 음높이: medium
- 억양: General American
- 역할: Customer Support Agent
- 용도: Enterprise Agent
- 공식 설명: Forward, confident, and direct voice with a medium pitch. Recommended for sales calls or direct prompts.

## 2. 확장 라이브러리 목소리 — 2,059개

### 아랍어·세계표준 (ar-001) — 29개

#### 여성 — 17개

##### Authoritative Advisor 1

- 목소리 ID: `ar-001-advisor-1`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: female
- 음높이: medium
- 억양: Modern Standard Arabic
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 48-year-old Lawyer from the Arab World. Speaks Modern Standard Arabic. Currently sitting on couch. Tone is professional yet approachable.

##### Call Center Agent 10

- 목소리 ID: `ar-001-csagent-10`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: female
- 음높이: high
- 억양: Modern Standard Arabic
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Customer Service Agent from the Arab World. Speaks Modern Standard Arabic. Voice is fast-paced, articulate, energetic.

##### Call Center Agent 8

- 목소리 ID: `ar-001-csagent-8`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: female
- 음높이: high
- 억양: Modern Standard Arabic
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Customer Service Agent from the Arab World. Speaks Modern Standard Arabic. Voice is laid-back, encouraging, and chill.

##### Commercial Voiceover 2

- 목소리 ID: `ar-001-commercial-2`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: female
- 음높이: high
- 억양: Modern Standard Arabic
- 역할: Character & Theatrical (Reality TV Star)
- 용도: Entertainment & Gaming
- 공식 설명: 30-year-old Reality TV Star from the Arab World. Speaks Modern Standard Arabic. Currently in an indie film. Tone is professional yet approachable.

##### Commercial Voiceover 4

- 목소리 ID: `ar-001-commercial-4`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: female
- 음높이: high
- 억양: Modern Standard Arabic
- 역할: Character & Theatrical (Reality TV Star)
- 용도: Entertainment & Gaming
- 공식 설명: 29-year-old Reality TV Star from the Arab World. Speaks Modern Standard Arabic. Voice is textured, resonant, and soothing.

##### Commercial Voiceover 5

- 목소리 ID: `ar-001-commercial-5`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: female
- 음높이: high
- 억양: Modern Standard Arabic
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 25-year-old Influencer from the Arab World. Speaks Modern Standard Arabic. Voice is light, airy, and precise

##### Commercial Voiceover 7

- 목소리 ID: `ar-001-commercial-7`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: female
- 음높이: high
- 억양: Modern Standard Arabic
- 역할: Character & Theatrical (Reality TV Star)
- 용도: Entertainment & Gaming
- 공식 설명: 28-year-old Reality TV Star from the Arab World. Speaks Modern Standard Arabic. Currently at a meditation retreat. Tone is professional yet approachable.

##### Concierge 11

- 목소리 ID: `ar-001-concierge-11`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: female
- 음높이: medium
- 억양: Modern Standard Arabic
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Executive Assistant from the Arab World. Speaks Modern Standard Arabic. Currently at an appointment. Sounds confident and clear.

##### Concierge 2

- 목소리 ID: `ar-001-concierge-2`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: female
- 음높이: medium
- 억양: Modern Standard Arabic
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Executive Assistant from the Arab World. Speaks Modern Standard Arabic. Voice is fast-paced, articulate, energetic.

##### Digital Assistant 4

- 목소리 ID: `ar-001-assistant-4`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: female
- 음높이: high
- 억양: Modern Standard Arabic
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 40-year-old Sibling from the Arab World. Speaks Modern Standard Arabic. Voice is intimate talkshow.

##### Tech Advisor 11

- 목소리 ID: `ar-001-techagent-11`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: female
- 음높이: medium
- 억양: Modern Standard Arabic
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Tech Support Agent from the Arab World. Speaks Modern Standard Arabic. Tone is objective, direct, and helpful

##### Tech Advisor 2

- 목소리 ID: `ar-001-techagent-2`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: female
- 음높이: low
- 억양: Modern Standard Arabic
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Tech Support Agent from the Arab World. Speaks Modern Standard Arabic. Voice is resonant and witty.

##### Tech Advisor 4

- 목소리 ID: `ar-001-techagent-4`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: female
- 음높이: high
- 억양: Modern Standard Arabic
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Tech Support Agent from the Arab World. Speaks Modern Standard Arabic. Voice is crisp and eager.

##### Training Voiceover 1

- 목소리 ID: `ar-001-training-1`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: female
- 음높이: high
- 억양: Modern Standard Arabic
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 22-year-old Cooking Show Host from the Arab World. Speaks Modern Standard Arabic. Voice is bright, breezy, and youthful.

##### Tutor 1

- 목소리 ID: `ar-001-tutor-1`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: female
- 음높이: medium
- 억양: Modern Standard Arabic
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 31-year-old Professor from the Arab World. Speaks Modern Standard Arabic. Voice is deep, velvety, and unhurried.

##### Tutor 3

- 목소리 ID: `ar-001-tutor-3`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: female
- 음높이: high
- 억양: Modern Standard Arabic
- 역할: Coach & Motivational Guide (Fitness Trainer)
- 용도: Wellness & Culture
- 공식 설명: 51-year-old Fitness Trainer from the Arab World. Speaks Modern Standard Arabic. Currently on npr. Voice is warm and engaging.

##### Tutor 4

- 목소리 ID: `ar-001-tutor-4`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: female
- 음높이: high
- 억양: Modern Standard Arabic
- 역할: Coach & Motivational Guide (Fitness Trainer)
- 용도: Wellness & Culture
- 공식 설명: 38-year-old Fitness Trainer from the Arab World. Speaks Modern Standard Arabic. Currently in a bookstore. Sounds confident and clear.

#### 남성 — 12개

##### Authoritative Advisor 10

- 목소리 ID: `ar-001-advisor-10`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: male
- 음높이: medium
- 억양: Modern Standard Arabic
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 50-year-old Lawyer from the Arab World. Speaks Modern Standard Arabic. Currently on npr. Tone is professional yet approachable.

##### Authoritative Advisor 2

- 목소리 ID: `ar-001-advisor-2`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: male
- 음높이: low
- 억양: Modern Standard Arabic
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Lawyer from the Arab World. Speaks Modern Standard Arabic. Currently on the phone. Voice is warm and engaging.

##### Authoritative Advisor 3

- 목소리 ID: `ar-001-advisor-3`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: male
- 음높이: low
- 억양: Modern Standard Arabic
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Lawyer from the Arab World. Speaks Modern Standard Arabic. Voice is relaxed.

##### Call Center Agent 11

- 목소리 ID: `ar-001-csagent-11`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: male
- 음높이: low
- 억양: Modern Standard Arabic
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 59-year-old Social Worker from the Arab World. Speaks Modern Standard Arabic. Currently sitting next to you on an airplane. Sounds confident and clear.

##### Call Center Agent 4

- 목소리 ID: `ar-001-csagent-4`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: male
- 음높이: low
- 억양: Modern Standard Arabic
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Customer Service Agent from the Arab World. Speaks Modern Standard Arabic. Currently on npr. Tone is professional yet approachable.

##### Commercial Voiceover 12

- 목소리 ID: `ar-001-commercial-12`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: male
- 음높이: medium
- 억양: Modern Standard Arabic
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 27-year-old Influencer from the Arab World. Speaks Modern Standard Arabic. Voice is relaxed.

##### Commercial Voiceover 3

- 목소리 ID: `ar-001-commercial-3`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: male
- 음높이: low
- 억양: Modern Standard Arabic
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 23-year-old Influencer from the Arab World. Speaks Modern Standard Arabic. Currently in an indie film. Sounds confident and clear.

##### Digital Assistant 2

- 목소리 ID: `ar-001-assistant-2`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: male
- 음높이: low
- 억양: Modern Standard Arabic
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 49-year-old Sibling from the Arab World. Speaks Modern Standard Arabic. Currently sitting on couch. Sounds confident and clear.

##### Tech Advisor 10

- 목소리 ID: `ar-001-techagent-10`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: male
- 음높이: low
- 억양: Modern Standard Arabic
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Tech Support Agent from the Arab World. Speaks Modern Standard Arabic. Currently brainstorming in a meeting. Sounds confident and clear.

##### Training Voiceover 12

- 목소리 ID: `ar-001-training-12`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: male
- 음높이: low
- 억양: Modern Standard Arabic
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 51-year-old Instructional Video Host from the Arab World. Speaks Modern Standard Arabic. Voice is crisp and eager.

##### Training Voiceover 2

- 목소리 ID: `ar-001-training-2`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: male
- 음높이: low
- 억양: Modern Standard Arabic
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 29-year-old Instructional Video Host from the Arab World. Speaks Modern Standard Arabic. Currently at an appointment. Tone is professional yet approachable.

##### Tutor 2

- 목소리 ID: `ar-001-tutor-2`
- 유형: prebuilt
- 언어: ar-001
- 지역: 001
- 성별: male
- 음높이: low
- 억양: Modern Standard Arabic
- 역할: Educational Tutor (Teacher)
- 용도: Conversational / Edu
- 공식 설명: 45-year-old Teacher from the Arab World. Speaks Modern Standard Arabic. Voice is resonant and witty.

### 아랍어·이집트 (ar-EG) — 92개

#### 여성 — 44개

##### Authoritative Advisor 11

- 목소리 ID: `ar-eg-advisor-11`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: low
- 억양: Egyptian Arabic
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 60-year-old Researcher from Egypt. Speaks Egyptian Arabic. Voice is laid-back, encouraging, and chill.

##### Authoritative Advisor 12

- 목소리 ID: `ar-eg-advisor-12`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Researcher from Egypt. Speaks Egyptian Arabic. Tone is objective, direct, and helpful

##### Authoritative Advisor 4

- 목소리 ID: `ar-eg-advisor-4`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: low
- 억양: Egyptian Arabic
- 역할: High-Trust Advisor / Authoritative Advisor (Doctor)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Doctor from Egypt. Speaks Egyptian Arabic. Voice is textured, resonant, and soothing.

##### Authoritative Advisor 5

- 목소리 ID: `ar-eg-advisor-5`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Financial Advisor from Egypt. Speaks Egyptian Arabic. Voice is laid-back, encouraging, and chill.

##### Authoritative Advisor 9

- 목소리 ID: `ar-eg-advisor-9`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: medium
- 억양: Egyptian Arabic
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Lawyer from Egypt. Speaks Egyptian Arabic. Voice is laid-back, encouraging, and chill.

##### Call Center Agent 2

- 목소리 ID: `ar-eg-csagent-2`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: medium
- 억양: Egyptian Arabic
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Social Worker from Egypt. Speaks Egyptian Arabic. Voice is clear, medium-pitch, and friendly.

##### Call Center Agent 3

- 목소리 ID: `ar-eg-csagent-3`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Sales Associate from Egypt. Speaks Egyptian Arabic. Currently on podcast. Voice is warm and engaging.

##### Call Center Agent 5

- 목소리 ID: `ar-eg-csagent-5`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: medium
- 억양: Egyptian Arabic
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Social Worker from Egypt. Speaks Egyptian Arabic. Voice is fast-paced, articulate, energetic.

##### Call Center Agent 7

- 목소리 ID: `ar-eg-csagent-7`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Sales Associate from Egypt. Speaks Egyptian Arabic. Currently on podcast. Sounds confident and clear.

##### Commercial Voiceover 10

- 목소리 ID: `ar-eg-commercial-10`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 28-year-old Influencer from Egypt. Speaks Egyptian Arabic. Voice is engaging and empathic.

##### Commercial Voiceover 13

- 목소리 ID: `ar-eg-commercial-13`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 65-year-old Fashion Consultant from Egypt. Speaks Egyptian Arabic. Voice is energetic, colorful, and fast

##### Commercial Voiceover 6

- 목소리 ID: `ar-eg-commercial-6`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: medium
- 억양: Egyptian Arabic
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 30-year-old Fashion Consultant from Egypt. Speaks Egyptian Arabic. Currently in an oscar winning film. Sounds confident and clear.

##### Commercial Voiceover 9

- 목소리 ID: `ar-eg-commercial-9`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 28-year-old Influencer from Egypt. Speaks Egyptian Arabic. Voice is bright, breezy, and youthful.

##### Concierge 3

- 목소리 ID: `ar-eg-concierge-3`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Concierge & EA (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Event Planner from Egypt. Speaks Egyptian Arabic. Currently brainstorming in a meeting. Tone is professional yet approachable.

##### Concierge 5

- 목소리 ID: `ar-eg-concierge-5`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Concierge & EA (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 23-year-old Event Planner from Egypt. Speaks Egyptian Arabic. Tone is objective, direct, and helpful

##### Concierge 7

- 목소리 ID: `ar-eg-concierge-7`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Concierge & EA
- 용도: Enterprise Agent
- 공식 설명: 23-year-old Concierge from Egypt. Speaks Egyptian Arabic. Currently on npr. Tone is professional yet approachable.

##### Concierge 9

- 목소리 ID: `ar-eg-concierge-9`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Concierge & EA
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Concierge from Egypt. Speaks Egyptian Arabic. Currently in an indie film. Sounds confident and clear.

##### Digital Assistant 1

- 목소리 ID: `ar-eg-assistant-1`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Storyteller & Narrator (Aunt/Uncle)
- 용도: Content & Media
- 공식 설명: 24-year-old Aunt/Uncle from Egypt. Speaks Egyptian Arabic. Currently on the phone. Voice is warm and engaging.

##### Digital Assistant 10

- 목소리 ID: `ar-eg-assistant-10`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: medium
- 억양: Egyptian Arabic
- 역할: Tech Support Agent / Tech Advisor (Grandparent)
- 용도: Enterprise Agent
- 공식 설명: 69-year-old Grandparent from Egypt. Speaks Egyptian Arabic. Tone is reflective, calm, and reassuring

##### Digital Assistant 12

- 목소리 ID: `ar-eg-assistant-12`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 34-year-old Parent from Egypt. Speaks Egyptian Arabic. Voice is comforting someone who is stressed.

##### Digital Assistant 5

- 목소리 ID: `ar-eg-assistant-5`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: medium
- 억양: Egyptian Arabic
- 역할: Storyteller & Narrator (Aunt/Uncle)
- 용도: Content & Media
- 공식 설명: 38-year-old Aunt/Uncle from Egypt. Speaks Egyptian Arabic. Currently at a meditation retreat. Sounds confident and clear.

##### Digital Assistant 7

- 목소리 ID: `ar-eg-assistant-7`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Storyteller & Narrator (Aunt/Uncle)
- 용도: Content & Media
- 공식 설명: 24-year-old Aunt/Uncle from Egypt. Speaks Egyptian Arabic. Currently on the phone. Voice is warm and engaging.

##### Podcaster 10

- 목소리 ID: `ar-eg-podcaster-10`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 48-year-old Podcast Interviewer from Egypt. Speaks Egyptian Arabic. Currently on the phone. Tone is professional yet approachable.

##### Podcaster 11

- 목소리 ID: `ar-eg-podcaster-11`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Video Voiceover & Host / Training Voiceover (Trivia Host) | News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 60-year-old Trivia Host from Egypt. Speaks Egyptian Arabic. Currently sitting on couch. Tone is professional yet approachable.

##### Podcaster 2

- 목소리 ID: `ar-eg-podcaster-2`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: News & Podcast Host / Podcaster (Journalist)
- 용도: Content & Media
- 공식 설명: 39-year-old Journalist from Egypt. Speaks Egyptian Arabic. Voice is light, airy, and precise

##### Podcaster 4

- 목소리 ID: `ar-eg-podcaster-4`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: medium
- 억양: Egyptian Arabic
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 44-year-old Radio Host from Egypt. Speaks Egyptian Arabic. Currently in an indie film. Sounds confident and clear.

##### Podcaster 7

- 목소리 ID: `ar-eg-podcaster-7`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 34-year-old Radio Host from Egypt. Speaks Egyptian Arabic. Currently at an appointment. Voice is warm and engaging.

##### Podcaster 9

- 목소리 ID: `ar-eg-podcaster-9`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: medium
- 억양: Egyptian Arabic
- 역할: Video Voiceover & Host / Training Voiceover (Trivia Host) | News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 38-year-old Trivia Host from Egypt. Speaks Egyptian Arabic. Tone is reflective, calm, and reassuring

##### Storyteller 1

- 목소리 ID: `ar-eg-storyteller-1`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 42-year-old Storyteller from Egypt. Speaks Egyptian Arabic. Voice is bright, breezy, and youthful.

##### Storyteller 11

- 목소리 ID: `ar-eg-storyteller-11`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: medium
- 억양: Egyptian Arabic
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 35-year-old Storyteller from Egypt. Speaks Egyptian Arabic. Voice is light, airy, and precise

##### Storyteller 12

- 목소리 ID: `ar-eg-storyteller-12`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 62-year-old Storyteller from Egypt. Speaks Egyptian Arabic. Voice is clear, medium-pitch, and friendly.

##### Storyteller 4

- 목소리 ID: `ar-eg-storyteller-4`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: medium
- 억양: Egyptian Arabic
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 38-year-old Nature Documentary Narrator from Egypt. Speaks Egyptian Arabic. Tone is objective, direct, and helpful

##### Storyteller 6

- 목소리 ID: `ar-eg-storyteller-6`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 58-year-old Storyteller from Egypt. Speaks Egyptian Arabic. Voice is laid-back, encouraging, and chill.

##### Storyteller 7

- 목소리 ID: `ar-eg-storyteller-7`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 37-year-old Storyteller from Egypt. Speaks Egyptian Arabic. Currently sitting on couch. Tone is professional yet approachable.

##### Tech Advisor 5

- 목소리 ID: `ar-eg-techagent-5`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: medium
- 억양: Egyptian Arabic
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Architect from Egypt. Speaks Egyptian Arabic. Voice is cool, confident, and collaborative.

##### Tech Advisor 6

- 목소리 ID: `ar-eg-techagent-6`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Architect from Egypt. Speaks Egyptian Arabic. Voice is natural and clear.

##### Tech Advisor 7

- 목소리 ID: `ar-eg-techagent-7`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Architect from Egypt. Speaks Egyptian Arabic. Voice is energetic, colorful, and fast

##### Training Voiceover 11

- 목소리 ID: `ar-eg-training-11`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 40-year-old Instructional Video Host from Egypt. Speaks Egyptian Arabic. Voice is bright, breezy, and youthful.

##### Training Voiceover 3

- 목소리 ID: `ar-eg-training-3`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: medium
- 억양: Egyptian Arabic
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 34-year-old Cooking Show Host from Egypt. Speaks Egyptian Arabic. Voice is natural and clear.

##### Training Voiceover 5

- 목소리 ID: `ar-eg-training-5`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: medium
- 억양: Egyptian Arabic
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 28-year-old Cooking Show Host from Egypt. Speaks Egyptian Arabic. Currently in a bookstore. Voice is warm and engaging.

##### Training Voiceover 9

- 목소리 ID: `ar-eg-training-9`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 39-year-old Instructional Video Host from Egypt. Speaks Egyptian Arabic. Voice is highly approachable.

##### Tutor 10

- 목소리 ID: `ar-eg-tutor-10`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: medium
- 억양: Egyptian Arabic
- 역할: Coach & Motivational Guide (Dating Coach)
- 용도: Wellness & Culture
- 공식 설명: 39-year-old Dating Coach from Egypt. Speaks Egyptian Arabic. Currently brainstorming in a meeting. Sounds confident and clear.

##### Tutor 11

- 목소리 ID: `ar-eg-tutor-11`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 46-year-old Writing Tutor from Egypt. Speaks Egyptian Arabic. Voice is engaging and empathic.

##### Tutor 7

- 목소리 ID: `ar-eg-tutor-7`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: female
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Storyteller & Narrator (Sports Coach)
- 용도: Content & Media
- 공식 설명: 31-year-old Sports Coach from Egypt. Speaks Egyptian Arabic. Tone is reflective, calm, and reassuring

#### 남성 — 46개

##### Authoritative Advisor 6

- 목소리 ID: `ar-eg-advisor-6`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: High-Trust Advisor / Authoritative Advisor (Doctor)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Doctor from Egypt. Speaks Egyptian Arabic. Currently at an appointment. Sounds confident and clear.

##### Authoritative Advisor 7

- 목소리 ID: `ar-eg-advisor-7`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 57-year-old Financial Advisor from Egypt. Speaks Egyptian Arabic. Voice is resonant and witty.

##### Authoritative Advisor 8

- 목소리 ID: `ar-eg-advisor-8`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: high
- 억양: Egyptian Arabic
- 역할: High-Trust Advisor / Authoritative Advisor (Doctor)
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Doctor from Egypt. Speaks Egyptian Arabic. Currently sitting on couch. Sounds confident and clear.

##### Call Center Agent 1

- 목소리 ID: `ar-eg-csagent-1`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 29-year-old Sales Associate from Egypt. Speaks Egyptian Arabic. Currently in an indie film. Sounds confident and clear.

##### Call Center Agent 12

- 목소리 ID: `ar-eg-csagent-12`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 53-year-old Sales Associate from Egypt. Speaks Egyptian Arabic. Currently sitting on couch. Voice is warm and engaging.

##### Call Center Agent 6

- 목소리 ID: `ar-eg-csagent-6`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Social Worker from Egypt. Speaks Egyptian Arabic. Currently in an indie film. Tone is professional yet approachable.

##### Call Center Agent 9

- 목소리 ID: `ar-eg-csagent-9`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Customer Service Agent from Egypt. Speaks Egyptian Arabic. Voice is highly approachable.

##### Commercial Voiceover 1

- 목소리 ID: `ar-eg-commercial-1`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 29-year-old Fashion Consultant from Egypt. Speaks Egyptian Arabic. Voice is resonant and witty.

##### Commercial Voiceover 11

- 목소리 ID: `ar-eg-commercial-11`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 28-year-old Influencer from Egypt. Speaks Egyptian Arabic. Tone is objective, direct, and helpful

##### Commercial Voiceover 8

- 목소리 ID: `ar-eg-commercial-8`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 53-year-old Fashion Consultant from Egypt. Speaks Egyptian Arabic. Voice is bright, breezy, and youthful.

##### Concierge 1

- 목소리 ID: `ar-eg-concierge-1`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Concierge & EA
- 용도: Enterprise Agent
- 공식 설명: 22-year-old Concierge from Egypt. Speaks Egyptian Arabic. Voice is bright, breezy, and youthful.

##### Concierge 10

- 목소리 ID: `ar-eg-concierge-10`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Concierge & EA (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 53-year-old Event Planner from Egypt. Speaks Egyptian Arabic. Currently brainstorming in a meeting. Sounds confident and clear.

##### Concierge 12

- 목소리 ID: `ar-eg-concierge-12`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Concierge & EA (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Event Planner from Egypt. Speaks Egyptian Arabic. Voice is textured, resonant, and soothing.

##### Concierge 4

- 목소리 ID: `ar-eg-concierge-4`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 26-year-old Hotel Concierge from Egypt. Speaks Egyptian Arabic. Currently on the phone. Voice is warm and engaging.

##### Concierge 6

- 목소리 ID: `ar-eg-concierge-6`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 45-year-old Executive Assistant from Egypt. Speaks Egyptian Arabic. Currently in an oscar winning film. Tone is professional yet approachable.

##### Concierge 8

- 목소리 ID: `ar-eg-concierge-8`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Concierge & EA
- 용도: Enterprise Agent
- 공식 설명: 62-year-old Concierge from Egypt. Speaks Egyptian Arabic. Voice is fast-paced, articulate, energetic.

##### Digital Assistant 11

- 목소리 ID: `ar-eg-assistant-11`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 39-year-old Parent from Egypt. Speaks Egyptian Arabic. Currently on the phone. Sounds confident and clear.

##### Digital Assistant 3

- 목소리 ID: `ar-eg-assistant-3`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Tech Support Agent / Tech Advisor (Grandparent)
- 용도: Enterprise Agent
- 공식 설명: 64-year-old Grandparent from Egypt. Speaks Egyptian Arabic. Voice is deep, velvety, and unhurried.

##### Digital Assistant 6

- 목소리 ID: `ar-eg-assistant-6`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 39-year-old Parent from Egypt. Speaks Egyptian Arabic. Currently on the phone. Sounds confident and clear.

##### Digital Assistant 8

- 목소리 ID: `ar-eg-assistant-8`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Tech Support Agent / Tech Advisor (Grandparent)
- 용도: Enterprise Agent
- 공식 설명: 73-year-old Grandparent from Egypt. Speaks Egyptian Arabic. Currently brainstorming in a meeting. Tone is professional yet approachable.

##### Digital Assistant 9

- 목소리 ID: `ar-eg-assistant-9`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: medium
- 억양: Egyptian Arabic
- 역할: Tech Support Agent / Tech Advisor (Grandparent)
- 용도: Enterprise Agent
- 공식 설명: 69-year-old Grandparent from Egypt. Speaks Egyptian Arabic. Voice is comforting someone who is stressed.

##### Podcaster 1

- 목소리 ID: `ar-eg-podcaster-1`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 58-year-old Podcast Interviewer from Egypt. Speaks Egyptian Arabic. Currently in an indie film. Sounds confident and clear.

##### Podcaster 12

- 목소리 ID: `ar-eg-podcaster-12`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 44-year-old Radio Host from Egypt. Speaks Egyptian Arabic. Voice is intimate talkshow.

##### Podcaster 3

- 목소리 ID: `ar-eg-podcaster-3`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 45-year-old Podcast Interviewer from Egypt. Speaks Egyptian Arabic. Voice is deep, velvety, and unhurried.

##### Podcaster 5

- 목소리 ID: `ar-eg-podcaster-5`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 28-year-old Radio Host from Egypt. Speaks Egyptian Arabic. Voice is fast-paced, articulate, energetic.

##### Podcaster 6

- 목소리 ID: `ar-eg-podcaster-6`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: News & Podcast Host / Podcaster (Journalist)
- 용도: Content & Media
- 공식 설명: 59-year-old Journalist from Egypt. Speaks Egyptian Arabic. Tone is enthusiastic, engaging, and fun

##### Podcaster 8

- 목소리 ID: `ar-eg-podcaster-8`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: medium
- 억양: Egyptian Arabic
- 역할: Video Voiceover & Host / Training Voiceover (Trivia Host) | News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 52-year-old Trivia Host from Egypt. Speaks Egyptian Arabic. Voice is crisp and eager.

##### Storyteller 10

- 목소리 ID: `ar-eg-storyteller-10`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 49-year-old Philosopher from Egypt. Speaks Egyptian Arabic. Currently on npr. Sounds confident and clear.

##### Storyteller 2

- 목소리 ID: `ar-eg-storyteller-2`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 39-year-old Storyteller from Egypt. Speaks Egyptian Arabic. Currently in an indie film. Voice is warm and engaging.

##### Storyteller 3

- 목소리 ID: `ar-eg-storyteller-3`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 27-year-old Storyteller from Egypt. Speaks Egyptian Arabic. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Storyteller 5

- 목소리 ID: `ar-eg-storyteller-5`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 46-year-old Philosopher from Egypt. Speaks Egyptian Arabic. Voice is bright, breezy, and youthful.

##### Storyteller 8

- 목소리 ID: `ar-eg-storyteller-8`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 34-year-old Storyteller from Egypt. Speaks Egyptian Arabic. Tone is peer-to-peer and curious

##### Storyteller 9

- 목소리 ID: `ar-eg-storyteller-9`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 38-year-old Nature Documentary Narrator from Egypt. Speaks Egyptian Arabic. Currently on npr. Tone is professional yet approachable.

##### Tech Advisor 1

- 목소리 ID: `ar-eg-techagent-1`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Architect from Egypt. Speaks Egyptian Arabic. Voice is fast-paced, articulate, energetic.

##### Tech Advisor 12

- 목소리 ID: `ar-eg-techagent-12`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 26-year-old Tech Support Agent from Egypt. Speaks Egyptian Arabic. Tone is conversational, slightly dry humor, and warm

##### Tech Advisor 3

- 목소리 ID: `ar-eg-techagent-3`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Tech Support Agent from Egypt. Speaks Egyptian Arabic. Tone is objective, direct, and helpful

##### Tech Advisor 8

- 목소리 ID: `ar-eg-techagent-8`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Architect from Egypt. Speaks Egyptian Arabic. Voice is fast-paced, articulate, energetic.

##### Training Voiceover 10

- 목소리 ID: `ar-eg-training-10`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: medium
- 억양: Egyptian Arabic
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 56-year-old Instructional Video Host from Egypt. Speaks Egyptian Arabic. Currently on npr. Tone is professional yet approachable.

##### Training Voiceover 4

- 목소리 ID: `ar-eg-training-4`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 54-year-old Cooking Show Host from Egypt. Speaks Egyptian Arabic. Currently sitting next to you on an airplane. Voice is warm and engaging.

##### Training Voiceover 6

- 목소리 ID: `ar-eg-training-6`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 49-year-old Cooking Show Host from Egypt. Speaks Egyptian Arabic. Tone is peer-to-peer and curious

##### Training Voiceover 8

- 목소리 ID: `ar-eg-training-8`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 30-year-old Instructional Video Host from Egypt. Speaks Egyptian Arabic. Currently in a bookstore. Voice is warm and engaging.

##### Tutor 12

- 목소리 ID: `ar-eg-tutor-12`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Tech Support Agent / Tech Advisor (Librarian)
- 용도: Enterprise Agent
- 공식 설명: 59-year-old Librarian from Egypt. Speaks Egyptian Arabic. Voice is textured, resonant, and soothing.

##### Tutor 5

- 목소리 ID: `ar-eg-tutor-5`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Coach & Motivational Guide (Nutritionist)
- 용도: Wellness & Culture
- 공식 설명: 48-year-old Nutritionist from Egypt. Speaks Egyptian Arabic. Voice is clear, medium-pitch, and friendly.

##### Tutor 6

- 목소리 ID: `ar-eg-tutor-6`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Storyteller & Narrator (Therapist)
- 용도: Content & Media
- 공식 설명: 49-year-old Therapist from Egypt. Speaks Egyptian Arabic. Currently sitting on couch. Voice is warm and engaging.

##### Tutor 8

- 목소리 ID: `ar-eg-tutor-8`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 49-year-old Writing Tutor from Egypt. Speaks Egyptian Arabic. Currently sitting next to you on an airplane. Tone is professional yet approachable.

##### Tutor 9

- 목소리 ID: `ar-eg-tutor-9`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: male
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 59-year-old Writing Tutor from Egypt. Speaks Egyptian Arabic. Currently sitting on couch. Tone is professional yet approachable.

#### 중성 — 2개

##### Tech Advisor 9

- 목소리 ID: `ar-eg-techagent-9`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: neutral
- 음높이: low
- 억양: Egyptian Arabic
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 44-year-old Architect from Egypt. Speaks Egyptian Arabic. Currently in an indie film. Tone is professional yet approachable.

##### Training Voiceover 7

- 목소리 ID: `ar-eg-training-7`
- 유형: prebuilt
- 언어: ar-EG
- 지역: EG
- 성별: neutral
- 음높이: high
- 억양: Egyptian Arabic
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 23-year-old Cooking Show Host from Egypt. Speaks Egyptian Arabic. Voice is intimate talkshow.

### 체코어·체코 (cs-CZ) — 14개

#### 여성 — 6개

##### Authoritative Advisor 2

- 목소리 ID: `cs-cz-advisor-2`
- 유형: prebuilt
- 언어: cs-CZ
- 지역: CZ
- 성별: female
- 음높이: medium
- 억양: Czech
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Lawyer from the Czech Republic. Speaks Czech. Tone is reflective, calm, and reassuring

##### Training Voiceover 4

- 목소리 ID: `cs-cz-training-4`
- 유형: prebuilt
- 언어: cs-CZ
- 지역: CZ
- 성별: female
- 음높이: medium
- 억양: Czech
- 역할: High-Trust Advisor / Authoritative Advisor (Cooking Show Host)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Cooking Show Host from the Czech Republic. Speaks Czech. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Tutor 1

- 목소리 ID: `cs-cz-tutor-1`
- 유형: prebuilt
- 언어: cs-CZ
- 지역: CZ
- 성별: female
- 음높이: high
- 억양: Czech
- 역할: Customer Support Agent / Call Center Agent (Teacher)
- 용도: Enterprise Agent
- 공식 설명: 28-year-old Teacher from the Czech Republic. Speaks Czech. Voice is fast-paced, articulate, energetic.

##### Tutor 4

- 목소리 ID: `cs-cz-tutor-4`
- 유형: prebuilt
- 언어: cs-CZ
- 지역: CZ
- 성별: female
- 음높이: medium
- 억양: Czech
- 역할: Tech Support Agent / Tech Advisor (Nutritionist)
- 용도: Enterprise Agent
- 공식 설명: 22-year-old Nutritionist from the Czech Republic. Speaks Czech. Voice is light, airy, and precise

##### Tutor 6

- 목소리 ID: `cs-cz-tutor-6`
- 유형: prebuilt
- 언어: cs-CZ
- 지역: CZ
- 성별: female
- 음높이: medium
- 억양: Czech
- 역할: Tech Support Agent / Tech Advisor (Therapist)
- 용도: Enterprise Agent
- 공식 설명: 28-year-old Therapist from the Czech Republic. Speaks Czech. Currently sitting next to you on the bus. Sounds confident and clear.

##### Tutor 8

- 목소리 ID: `cs-cz-tutor-8`
- 유형: prebuilt
- 언어: cs-CZ
- 지역: CZ
- 성별: female
- 음높이: medium
- 억양: Czech
- 역할: Tech Support Agent / Tech Advisor (Nutritionist)
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Nutritionist from the Czech Republic. Speaks Czech. Currently at a meditation retreat. Sounds confident and clear.

#### 남성 — 8개

##### Authoritative Advisor 1

- 목소리 ID: `cs-cz-advisor-1`
- 유형: prebuilt
- 언어: cs-CZ
- 지역: CZ
- 성별: male
- 음높이: low
- 억양: Czech
- 역할: Concierge & EA (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Lawyer from the Czech Republic. Speaks Czech. Currently sitting on couch. Sounds confident and clear.

##### Training Voiceover 1

- 목소리 ID: `cs-cz-training-1`
- 유형: prebuilt
- 언어: cs-CZ
- 지역: CZ
- 성별: male
- 음높이: low
- 억양: Czech
- 역할: Customer Support Agent / Call Center Agent (Cooking Show Host)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Cooking Show Host from the Czech Republic. Speaks Czech. Currently brainstorming in a meeting. Voice is warm and engaging.

##### Training Voiceover 2

- 목소리 ID: `cs-cz-training-2`
- 유형: prebuilt
- 언어: cs-CZ
- 지역: CZ
- 성별: male
- 음높이: low
- 억양: Czech
- 역할: Customer Support Agent / Call Center Agent (Cooking Show Host)
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Cooking Show Host from the Czech Republic. Speaks Czech. Currently sitting on couch. Tone is professional yet approachable.

##### Training Voiceover 3

- 목소리 ID: `cs-cz-training-3`
- 유형: prebuilt
- 언어: cs-CZ
- 지역: CZ
- 성별: male
- 음높이: low
- 억양: Czech
- 역할: Customer Support Agent / Call Center Agent (Cooking Show Host)
- 용도: Enterprise Agent
- 공식 설명: 65-year-old Cooking Show Host from the Czech Republic. Speaks Czech. Currently sitting on couch. Tone is professional yet approachable.

##### Tutor 2

- 목소리 ID: `cs-cz-tutor-2`
- 유형: prebuilt
- 언어: cs-CZ
- 지역: CZ
- 성별: male
- 음높이: low
- 억양: Czech
- 역할: Customer Support Agent / Call Center Agent (Therapist)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Therapist from the Czech Republic. Speaks Czech. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Tutor 3

- 목소리 ID: `cs-cz-tutor-3`
- 유형: prebuilt
- 언어: cs-CZ
- 지역: CZ
- 성별: male
- 음높이: low
- 억양: Czech
- 역할: Tech Support Agent / Tech Advisor (Therapist)
- 용도: Enterprise Agent
- 공식 설명: 57-year-old Therapist from the Czech Republic. Speaks Czech. Voice is clear, medium-pitch, and friendly.

##### Tutor 5

- 목소리 ID: `cs-cz-tutor-5`
- 유형: prebuilt
- 언어: cs-CZ
- 지역: CZ
- 성별: male
- 음높이: low
- 억양: Czech
- 역할: Concierge & EA (Teacher)
- 용도: Enterprise Agent
- 공식 설명: 44-year-old Teacher from the Czech Republic. Speaks Czech. Tone is reflective, calm, and reassuring

##### Tutor 7

- 목소리 ID: `cs-cz-tutor-7`
- 유형: prebuilt
- 언어: cs-CZ
- 지역: CZ
- 성별: male
- 음높이: low
- 억양: Czech
- 역할: Tech Support Agent / Tech Advisor (Therapist)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Therapist from the Czech Republic. Speaks Czech. Voice is light, airy, and precise

### 독일어·독일 (de-DE) — 87개

#### 여성 — 39개

##### Authoritative Advisor 1

- 목소리 ID: `de-de-advisor-1`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: low
- 억양: German
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Lawyer from Germany. Speaks German. Tone is objective, direct, and helpful

##### Authoritative Advisor 3

- 목소리 ID: `de-de-advisor-3`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: medium
- 억양: German
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Lawyer from Germany. Speaks German. Tone is reflective, calm, and reassuring

##### Authoritative Advisor 5

- 목소리 ID: `de-de-advisor-5`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: medium
- 억양: German
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Lawyer from Germany. Speaks German. Voice is deep, velvety, and unhurried.

##### Authoritative Advisor 7

- 목소리 ID: `de-de-advisor-7`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: high
- 억양: German
- 역할: High-Trust Advisor / Authoritative Advisor (Doctor)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Doctor from Germany. Speaks German. Voice is light, airy, and precise

##### Authoritative Advisor 8

- 목소리 ID: `de-de-advisor-8`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: low
- 억양: German
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Lawyer from Germany. Speaks German. Voice is light, airy, and precise

##### Call Center Agent 12

- 목소리 ID: `de-de-csagent-12`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: high
- 억양: German
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Social Worker from Germany. Speaks German. Tone is enthusiastic, engaging, and fun

##### Call Center Agent 2

- 목소리 ID: `de-de-csagent-2`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: medium
- 억양: German
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Social Worker from Germany. Speaks German. Tone is conversational, slightly dry humor, and warm

##### Call Center Agent 4

- 목소리 ID: `de-de-csagent-4`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: low
- 억양: German
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Social Worker)
- 용도: Growth & Marketing
- 공식 설명: 34-year-old Social Worker from Germany. Speaks German. Voice is natural and clear.

##### Call Center Agent 7

- 목소리 ID: `de-de-csagent-7`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: medium
- 억양: German
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 29-year-old Social Worker from Germany. Speaks German. Voice is bright, breezy, and youthful.

##### Call Center Agent 9

- 목소리 ID: `de-de-csagent-9`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: low
- 억양: German
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Social Worker)
- 용도: Growth & Marketing
- 공식 설명: 50-year-old Social Worker from Germany. Speaks German. Voice is crisp and eager.

##### Concierge 11

- 목소리 ID: `de-de-concierge-11`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: high
- 억양: German
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Hotel Concierge from Germany. Speaks German. Tone is objective, direct, and helpful

##### Concierge 2

- 목소리 ID: `de-de-concierge-2`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: medium
- 억양: German
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Executive Assistant from Germany. Speaks German. Currently at an appointment. Tone is professional yet approachable.

##### Concierge 3

- 목소리 ID: `de-de-concierge-3`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: high
- 억양: German
- 역할: Concierge & EA
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Concierge from Germany. Speaks German. Voice is fast-paced, articulate, energetic.

##### Concierge 4

- 목소리 ID: `de-de-concierge-4`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: medium
- 억양: German
- 역할: Concierge & EA
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Concierge from Germany. Speaks German. Currently in an oscar winning film. Sounds confident and clear.

##### Concierge 6

- 목소리 ID: `de-de-concierge-6`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: high
- 억양: German
- 역할: Concierge & EA
- 용도: Enterprise Agent
- 공식 설명: 22-year-old Concierge from Germany. Speaks German. Tone is peer-to-peer and curious

##### Concierge 8

- 목소리 ID: `de-de-concierge-8`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: medium
- 억양: German
- 역할: Character & Theatrical (Executive Assistant)
- 용도: Entertainment & Gaming
- 공식 설명: 30-year-old Executive Assistant from Germany. Speaks German. Voice is fast-paced, articulate, energetic.

##### Digital Assistant 11

- 목소리 ID: `de-de-assistant-11`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: high
- 억양: German
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 23-year-old Sibling from Germany. Speaks German. Currently in an indie film. Sounds confident and clear.

##### Digital Assistant 12

- 목소리 ID: `de-de-assistant-12`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: medium
- 억양: German
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 25-year-old Sibling from Germany. Speaks German. Currently in a bookstore. Sounds confident and clear.

##### Digital Assistant 2

- 목소리 ID: `de-de-assistant-2`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: low
- 억양: German
- 역할: Storyteller & Narrator (Parent)
- 용도: Content & Media
- 공식 설명: 43-year-old Parent from Germany. Speaks German. Voice is intimate talkshow.

##### Digital Assistant 4

- 목소리 ID: `de-de-assistant-4`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: medium
- 억양: German
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 33-year-old Sibling from Germany. Speaks German. Tone is conversational, slightly dry humor, and warm

##### Digital Assistant 5

- 목소리 ID: `de-de-assistant-5`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: low
- 억양: German
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 32-year-old Sibling from Germany. Speaks German. Voice is engaging and empathic.

##### Digital Assistant 7

- 목소리 ID: `de-de-assistant-7`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: high
- 억양: German
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 32-year-old Sibling from Germany. Speaks German. Voice is fast-paced, articulate, energetic.

##### Podcaster 2

- 목소리 ID: `de-de-podcaster-2`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: medium
- 억양: German
- 역할: News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 29-year-old Trivia Host from Germany. Speaks German. Currently in an oscar winning film. Tone is professional yet approachable.

##### Podcaster 4

- 목소리 ID: `de-de-podcaster-4`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: high
- 억양: German
- 역할: News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 41-year-old Trivia Host from Germany. Speaks German. Voice is cool, confident, and collaborative.

##### Storyteller 1

- 목소리 ID: `de-de-storyteller-1`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: medium
- 억양: German
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 30-year-old Storyteller from Germany. Speaks German. Tone is peer-to-peer and curious

##### Storyteller 4

- 목소리 ID: `de-de-storyteller-4`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: medium
- 억양: German
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 60-year-old Storyteller from Germany. Speaks German. Currently sitting next to you on an airplane. Sounds confident and clear.

##### Storyteller 6

- 목소리 ID: `de-de-storyteller-6`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: low
- 억양: German
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 28-year-old Storyteller from Germany. Speaks German. Voice is textured, resonant, and soothing.

##### Tech Advisor 1

- 목소리 ID: `de-de-techagent-1`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: medium
- 억양: German
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Tech Support Agent from Germany. Speaks German. Voice is relaxed.

##### Tech Advisor 10

- 목소리 ID: `de-de-techagent-10`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: high
- 억양: German
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Architect from Germany. Speaks German. Voice is highly approachable.

##### Tech Advisor 12

- 목소리 ID: `de-de-techagent-12`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: medium
- 억양: German
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Tech Support Agent from Germany. Speaks German. Tone is conversational, slightly dry humor, and warm

##### Tech Advisor 4

- 목소리 ID: `de-de-techagent-4`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: medium
- 억양: German
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 26-year-old Tech Support Agent from Germany. Speaks German. Voice is engaging and empathic.

##### Tech Advisor 9

- 목소리 ID: `de-de-techagent-9`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: low
- 억양: German
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Architect from Germany. Speaks German. Voice is natural and clear.

##### Training Voiceover 2

- 목소리 ID: `de-de-training-2`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: high
- 억양: German
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 40-year-old Cooking Show Host from Germany. Speaks German. Currently brainstorming in a meeting. Voice is warm and engaging.

##### Tutor 10

- 목소리 ID: `de-de-tutor-10`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: medium
- 억양: German
- 역할: Video Voiceover & Host / Training Voiceover (Therapist)
- 용도: Content & Media
- 공식 설명: 43-year-old Therapist from Germany. Speaks German. Voice is relaxed.

##### Tutor 2

- 목소리 ID: `de-de-tutor-2`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: medium
- 억양: German
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 34-year-old Professor from Germany. Speaks German. Voice is relaxed.

##### Tutor 3

- 목소리 ID: `de-de-tutor-3`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: low
- 억양: German
- 역할: Storyteller & Narrator (Fitness Trainer) | Coach & Motivational Guide (Fitness Trainer)
- 용도: Content & Media | Wellness & Culture
- 공식 설명: 44-year-old Fitness Trainer from Germany. Speaks German. Tone is peer-to-peer and curious

##### Tutor 7

- 목소리 ID: `de-de-tutor-7`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: high
- 억양: German
- 역할: Coach & Motivational Guide (Fitness Trainer)
- 용도: Wellness & Culture
- 공식 설명: 56-year-old Fitness Trainer from Germany. Speaks German. Currently on podcast. Sounds confident and clear.

##### Tutor 8

- 목소리 ID: `de-de-tutor-8`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: medium
- 억양: German
- 역할: Video Voiceover & Host / Training Voiceover (Therapist) | Coach & Motivational Guide (Therapist)
- 용도: Content & Media | Wellness & Culture
- 공식 설명: 38-year-old Therapist from Germany. Speaks German. Currently on the phone. Voice is warm and engaging.

##### Tutor 9

- 목소리 ID: `de-de-tutor-9`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: female
- 음높이: medium
- 억양: German
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 24-year-old Professor from Germany. Speaks German. Voice is engaging and empathic.

#### 남성 — 46개

##### Authoritative Advisor 10

- 목소리 ID: `de-de-advisor-10`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: High-Trust Advisor / Authoritative Advisor (Doctor)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Doctor from Germany. Speaks German. Voice is clear, medium-pitch, and friendly.

##### Authoritative Advisor 11

- 목소리 ID: `de-de-advisor-11`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 50-year-old Researcher from Germany. Speaks German. Tone is reflective, calm, and reassuring

##### Authoritative Advisor 2

- 목소리 ID: `de-de-advisor-2`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Lawyer from Germany. Speaks German. Voice is natural and clear.

##### Authoritative Advisor 4

- 목소리 ID: `de-de-advisor-4`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Lawyer from Germany. Speaks German. Currently on podcast. Sounds confident and clear.

##### Authoritative Advisor 6

- 목소리 ID: `de-de-advisor-6`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Lawyer from Germany. Speaks German. Currently at an appointment. Voice is warm and engaging.

##### Authoritative Advisor 9

- 목소리 ID: `de-de-advisor-9`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Researcher from Germany. Speaks German. Currently sitting next to you on the bus. Sounds confident and clear.

##### Call Center Agent 1

- 목소리 ID: `de-de-csagent-1`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Social Worker from Germany. Speaks German. Currently in an indie film. Sounds confident and clear.

##### Call Center Agent 11

- 목소리 ID: `de-de-csagent-11`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 29-year-old Social Worker from Germany. Speaks German. Tone is enthusiastic, engaging, and fun

##### Call Center Agent 3

- 목소리 ID: `de-de-csagent-3`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 65-year-old Social Worker from Germany. Speaks German. Voice is highly approachable.

##### Call Center Agent 5

- 목소리 ID: `de-de-csagent-5`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 65-year-old Social Worker from Germany. Speaks German. Voice is intimate talkshow.

##### Call Center Agent 6

- 목소리 ID: `de-de-csagent-6`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 26-year-old Social Worker from Germany. Speaks German. Currently brainstorming in a meeting. Sounds confident and clear.

##### Call Center Agent 8

- 목소리 ID: `de-de-csagent-8`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Social Worker)
- 용도: Growth & Marketing
- 공식 설명: 25-year-old Social Worker from Germany. Speaks German. Voice is deep, velvety, and unhurried.

##### Concierge 1

- 목소리 ID: `de-de-concierge-1`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Concierge & EA
- 용도: Enterprise Agent
- 공식 설명: 51-year-old Concierge from Germany. Speaks German. Voice is fast-paced, articulate, energetic.

##### Concierge 10

- 목소리 ID: `de-de-concierge-10`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Concierge & EA
- 용도: Enterprise Agent
- 공식 설명: 51-year-old Concierge from Germany. Speaks German. Voice is crisp and eager.

##### Concierge 12

- 목소리 ID: `de-de-concierge-12`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Concierge & EA
- 용도: Enterprise Agent
- 공식 설명: 51-year-old Concierge from Germany. Speaks German. Voice is crisp and eager.

##### Concierge 5

- 목소리 ID: `de-de-concierge-5`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 45-year-old Hotel Concierge from Germany. Speaks German. Voice is cool, confident, and collaborative.

##### Concierge 7

- 목소리 ID: `de-de-concierge-7`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Executive Assistant from Germany. Speaks German. Voice is relaxed.

##### Concierge 9

- 목소리 ID: `de-de-concierge-9`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Concierge & EA
- 용도: Enterprise Agent
- 공식 설명: 50-year-old Concierge from Germany. Speaks German. Voice is bright, breezy, and youthful.

##### Digital Assistant 1

- 목소리 ID: `de-de-assistant-1`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 50-year-old Sibling from Germany. Speaks German. Tone is objective, direct, and helpful

##### Digital Assistant 10

- 목소리 ID: `de-de-assistant-10`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 35-year-old Sibling from Germany. Speaks German. Tone is peer-to-peer and curious

##### Digital Assistant 3

- 목소리 ID: `de-de-assistant-3`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Video Voiceover & Host / Training Voiceover (Parent)
- 용도: Content & Media
- 공식 설명: 35-year-old Parent from Germany. Speaks German. Currently on npr. Sounds confident and clear.

##### Digital Assistant 6

- 목소리 ID: `de-de-assistant-6`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Parent)
- 용도: Growth & Marketing
- 공식 설명: 38-year-old Parent from Germany. Speaks German. Currently in an oscar winning film. Sounds confident and clear.

##### Digital Assistant 8

- 목소리 ID: `de-de-assistant-8`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 26-year-old Sibling from Germany. Speaks German. Currently sitting next to you on an airplane. Tone is professional yet approachable.

##### Digital Assistant 9

- 목소리 ID: `de-de-assistant-9`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 38-year-old Friend from Germany. Speaks German. Currently at an appointment. Sounds confident and clear.

##### Podcaster 1

- 목소리 ID: `de-de-podcaster-1`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Video Voiceover & Host / Training Voiceover (Trivia Host) | News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 52-year-old Trivia Host from Germany. Speaks German. Voice is cool, confident, and collaborative.

##### Podcaster 3

- 목소리 ID: `de-de-podcaster-3`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: medium
- 억양: German
- 역할: Video Voiceover & Host / Training Voiceover (Trivia Host) | News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 29-year-old Trivia Host from Germany. Speaks German. Voice is energetic, colorful, and fast

##### Storyteller 2

- 목소리 ID: `de-de-storyteller-2`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 35-year-old Storyteller from Germany. Speaks German. Currently in an indie film. Sounds confident and clear.

##### Storyteller 3

- 목소리 ID: `de-de-storyteller-3`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 51-year-old Storyteller from Germany. Speaks German. Currently on npr. Tone is professional yet approachable.

##### Storyteller 5

- 목소리 ID: `de-de-storyteller-5`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 58-year-old Nature Documentary Narrator from Germany. Speaks German. Tone is objective, direct, and helpful

##### Storyteller 7

- 목소리 ID: `de-de-storyteller-7`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: medium
- 억양: German
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 59-year-old Philosopher from Germany. Speaks German. Tone is reflective, calm, and reassuring

##### Storyteller 8

- 목소리 ID: `de-de-storyteller-8`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 60-year-old Nature Documentary Narrator from Germany. Speaks German. Voice is textured, resonant, and soothing.

##### Tech Advisor 11

- 목소리 ID: `de-de-techagent-11`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Architect from Germany. Speaks German. Voice is cool, confident, and collaborative.

##### Tech Advisor 2

- 목소리 ID: `de-de-techagent-2`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Tech Support Agent from Germany. Speaks German. Voice is crisp and eager.

##### Tech Advisor 3

- 목소리 ID: `de-de-techagent-3`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: medium
- 억양: German
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Tech Support Agent from Germany. Speaks German. Voice is laid-back, encouraging, and chill.

##### Tech Advisor 5

- 목소리 ID: `de-de-techagent-5`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 26-year-old Tech Support Agent from Germany. Speaks German. Currently in an indie film. Tone is professional yet approachable.

##### Tech Advisor 7

- 목소리 ID: `de-de-techagent-7`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Tech Support Agent from Germany. Speaks German. Voice is cool, confident, and collaborative.

##### Tech Advisor 8

- 목소리 ID: `de-de-techagent-8`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Tech Support Agent from Germany. Speaks German. Voice is cool, confident, and collaborative.

##### Training Voiceover 1

- 목소리 ID: `de-de-training-1`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Cooking Show Host)
- 용도: Growth & Marketing
- 공식 설명: 24-year-old Cooking Show Host from Germany. Speaks German. Voice is crisp and eager.

##### Training Voiceover 3

- 목소리 ID: `de-de-training-3`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 56-year-old Cooking Show Host from Germany. Speaks German. Tone is peer-to-peer and curious

##### Training Voiceover 4

- 목소리 ID: `de-de-training-4`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Cooking Show Host)
- 용도: Growth & Marketing
- 공식 설명: 42-year-old Cooking Show Host from Germany. Speaks German. Voice is resonant and witty.

##### Tutor 1

- 목소리 ID: `de-de-tutor-1`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Customer Support Agent / Call Center Agent (Professor) | Educational Tutor (Professor)
- 용도: Enterprise Agent | Conversational / Edu
- 공식 설명: 38-year-old Professor from Germany. Speaks German. Voice is comforting someone who is stressed.

##### Tutor 11

- 목소리 ID: `de-de-tutor-11`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 49-year-old Professor from Germany. Speaks German. Voice is fast-paced, articulate, energetic.

##### Tutor 12

- 목소리 ID: `de-de-tutor-12`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Coach & Motivational Guide (Fitness Trainer)
- 용도: Wellness & Culture
- 공식 설명: 31-year-old Fitness Trainer from Germany. Speaks German. Tone is enthusiastic, engaging, and fun

##### Tutor 4

- 목소리 ID: `de-de-tutor-4`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Storyteller & Narrator (Therapist) | Coach & Motivational Guide (Therapist)
- 용도: Content & Media | Wellness & Culture
- 공식 설명: 27-year-old Therapist from Germany. Speaks German. Tone is enthusiastic, engaging, and fun

##### Tutor 5

- 목소리 ID: `de-de-tutor-5`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 44-year-old Professor from Germany. Speaks German. Currently at a meditation retreat. Sounds confident and clear.

##### Tutor 6

- 목소리 ID: `de-de-tutor-6`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: male
- 음높이: low
- 억양: German
- 역할: News & Podcast Host / Podcaster (Professor)
- 용도: Content & Media
- 공식 설명: 35-year-old Professor from Germany. Speaks German. Currently sitting on couch. Tone is professional yet approachable.

#### 중성 — 2개

##### Call Center Agent 10

- 목소리 ID: `de-de-csagent-10`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: neutral
- 음높이: medium
- 억양: German
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Social Worker)
- 용도: Growth & Marketing
- 공식 설명: 44-year-old Social Worker from Germany. Speaks German. Tone is peer-to-peer and curious

##### Tech Advisor 6

- 목소리 ID: `de-de-techagent-6`
- 유형: prebuilt
- 언어: de-DE
- 지역: DE
- 성별: neutral
- 음높이: low
- 억양: German
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Tech Support Agent)
- 용도: Growth & Marketing
- 공식 설명: 36-year-old Tech Support Agent from Germany. Speaks German. Currently sitting next to you on an airplane. Tone is professional yet approachable.

### 그리스어·그리스 (el-GR) — 41개

#### 여성 — 22개

##### Authoritative Advisor 2

- 목소리 ID: `el-gr-advisor-2`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: medium
- 억양: Greek
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Lawyer from Greece. Speaks Greek. Tone is reflective, calm, and reassuring

##### Authoritative Advisor 5

- 목소리 ID: `el-gr-advisor-5`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: medium
- 억양: Greek
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Lawyer from Greece. Speaks Greek. Voice is engaging and empathic.

##### Authoritative Advisor 6

- 목소리 ID: `el-gr-advisor-6`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: medium
- 억양: Greek
- 역할: Character & Theatrical (Lawyer)
- 용도: Entertainment & Gaming
- 공식 설명: 46-year-old Lawyer from Greece. Speaks Greek. Voice is natural and clear.

##### Authoritative Advisor 8

- 목소리 ID: `el-gr-advisor-8`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: medium
- 억양: Greek
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 45-year-old Lawyer from Greece. Speaks Greek. Voice is textured, resonant, and soothing.

##### Concierge 1

- 목소리 ID: `el-gr-concierge-1`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: high
- 억양: Greek
- 역할: Customer Support Agent / Call Center Agent (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 23-year-old Executive Assistant from Greece. Speaks Greek. Currently sitting on couch. Voice is warm and engaging.

##### Concierge 3

- 목소리 ID: `el-gr-concierge-3`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: medium
- 억양: Greek
- 역할: News & Podcast Host / Podcaster (Executive Assistant)
- 용도: Content & Media
- 공식 설명: 40-year-old Executive Assistant from Greece. Speaks Greek. Tone is reflective, calm, and reassuring

##### Concierge 4

- 목소리 ID: `el-gr-concierge-4`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: high
- 억양: Greek
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Executive Assistant from Greece. Speaks Greek. Voice is relaxed.

##### Concierge 5

- 목소리 ID: `el-gr-concierge-5`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: medium
- 억양: Greek
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 48-year-old Executive Assistant from Greece. Speaks Greek. Currently at an appointment. Tone is professional yet approachable.

##### Concierge 6

- 목소리 ID: `el-gr-concierge-6`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: medium
- 억양: Greek
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Executive Assistant from Greece. Speaks Greek. Voice is engaging and empathic.

##### Concierge 7

- 목소리 ID: `el-gr-concierge-7`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: low
- 억양: Greek
- 역할: News & Podcast Host / Podcaster (Event Planner)
- 용도: Content & Media
- 공식 설명: 58-year-old Event Planner from Greece. Speaks Greek. Currently on podcast. Sounds confident and clear.

##### Concierge 8

- 목소리 ID: `el-gr-concierge-8`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: medium
- 억양: Greek
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 57-year-old Executive Assistant from Greece. Speaks Greek. Voice is cool, confident, and collaborative.

##### Digital Assistant 1

- 목소리 ID: `el-gr-assistant-1`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: low
- 억양: Greek
- 역할: Customer Support Agent / Call Center Agent (Parent)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Parent from Greece. Speaks Greek. Voice is cool, confident, and collaborative.

##### Digital Assistant 3

- 목소리 ID: `el-gr-assistant-3`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: medium
- 억양: Greek
- 역할: Tech Support Agent / Tech Advisor (Parent)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Parent from Greece. Speaks Greek. Voice is engaging and empathic.

##### Digital Assistant 4

- 목소리 ID: `el-gr-assistant-4`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: high
- 억양: Greek
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 24-year-old Sibling from Greece. Speaks Greek. Currently at an appointment. Voice is warm and engaging.

##### Digital Assistant 5

- 목소리 ID: `el-gr-assistant-5`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: low
- 억양: Greek
- 역할: Storyteller & Narrator (Parent)
- 용도: Content & Media
- 공식 설명: 47-year-old Parent from Greece. Speaks Greek. Tone is enthusiastic, engaging, and fun

##### Storyteller 2

- 목소리 ID: `el-gr-storyteller-2`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: high
- 억양: Greek
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 45-year-old Philosopher from Greece. Speaks Greek. Currently on the phone. Sounds confident and clear.

##### Training Voiceover 1

- 목소리 ID: `el-gr-training-1`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: high
- 억양: Greek
- 역할: Tech Support Agent / Tech Advisor (Instructional Video Host)
- 용도: Enterprise Agent
- 공식 설명: 54-year-old Instructional Video Host from Greece. Speaks Greek. Currently at an appointment. Sounds confident and clear.

##### Training Voiceover 3

- 목소리 ID: `el-gr-training-3`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: medium
- 억양: Greek
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 55-year-old Instructional Video Host from Greece. Speaks Greek. Currently on npr. Voice is warm and engaging.

##### Tutor 2

- 목소리 ID: `el-gr-tutor-2`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: low
- 억양: Greek
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 46-year-old Professor from Greece. Speaks Greek. Currently sitting next to you on the bus. Sounds confident and clear.

##### Tutor 3

- 목소리 ID: `el-gr-tutor-3`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: medium
- 억양: Greek
- 역할: Video Voiceover & Host / Training Voiceover (Therapist)
- 용도: Content & Media
- 공식 설명: 25-year-old Therapist from Greece. Speaks Greek. Tone is reflective, calm, and reassuring

##### Tutor 5

- 목소리 ID: `el-gr-tutor-5`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: high
- 억양: Greek
- 역할: Storyteller & Narrator (Fitness Trainer)
- 용도: Content & Media
- 공식 설명: 41-year-old Fitness Trainer from Greece. Speaks Greek. Currently on podcast. Tone is professional yet approachable.

##### Tutor 6

- 목소리 ID: `el-gr-tutor-6`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: female
- 음높이: high
- 억양: Greek
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Writing Tutor)
- 용도: Growth & Marketing
- 공식 설명: 33-year-old Writing Tutor from Greece. Speaks Greek. Currently on the phone. Voice is warm and engaging.

#### 남성 — 18개

##### Authoritative Advisor 1

- 목소리 ID: `el-gr-advisor-1`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: male
- 음높이: low
- 억양: Greek
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Lawyer from Greece. Speaks Greek. Voice is clear, medium-pitch, and friendly.

##### Authoritative Advisor 3

- 목소리 ID: `el-gr-advisor-3`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: male
- 음높이: low
- 억양: Greek
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Lawyer from Greece. Speaks Greek. Voice is comforting someone who is stressed.

##### Authoritative Advisor 4

- 목소리 ID: `el-gr-advisor-4`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: male
- 음높이: low
- 억양: Greek
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 44-year-old Lawyer from Greece. Speaks Greek. Currently in an indie film. Sounds confident and clear.

##### Authoritative Advisor 7

- 목소리 ID: `el-gr-advisor-7`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: male
- 음높이: low
- 억양: Greek
- 역할: Character & Theatrical (Researcher)
- 용도: Entertainment & Gaming
- 공식 설명: 47-year-old Researcher from Greece. Speaks Greek. Voice is natural and clear.

##### Concierge 2

- 목소리 ID: `el-gr-concierge-2`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: male
- 음높이: low
- 억양: Greek
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 29-year-old Executive Assistant from Greece. Speaks Greek. Voice is engaging and empathic.

##### Digital Assistant 2

- 목소리 ID: `el-gr-assistant-2`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: male
- 음높이: low
- 억양: Greek
- 역할: Customer Support Agent / Call Center Agent (Friend)
- 용도: Enterprise Agent
- 공식 설명: 59-year-old Friend from Greece. Speaks Greek. Currently sitting next to you on an airplane. Voice is warm and engaging.

##### Digital Assistant 7

- 목소리 ID: `el-gr-assistant-7`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: male
- 음높이: low
- 억양: Greek
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 54-year-old Friend from Greece. Speaks Greek. Tone is reflective, calm, and reassuring

##### Digital Assistant 8

- 목소리 ID: `el-gr-assistant-8`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: male
- 음높이: low
- 억양: Greek
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 51-year-old Friend from Greece. Speaks Greek. Currently in an oscar winning film. Tone is professional yet approachable.

##### Storyteller 1

- 목소리 ID: `el-gr-storyteller-1`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: male
- 음높이: low
- 억양: Greek
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 59-year-old Philosopher from Greece. Speaks Greek. Currently in a bookstore. Voice is warm and engaging.

##### Tech Advisor 1

- 목소리 ID: `el-gr-techagent-1`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: male
- 음높이: low
- 억양: Greek
- 역할: Customer Support Agent / Call Center Agent (Architect)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Architect from Greece. Speaks Greek. Currently sitting next to you on the bus. Sounds confident and clear.

##### Tech Advisor 2

- 목소리 ID: `el-gr-techagent-2`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: male
- 음높이: medium
- 억양: Greek
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Architect from Greece. Speaks Greek. Voice is bright, breezy, and youthful.

##### Tech Advisor 3

- 목소리 ID: `el-gr-techagent-3`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: male
- 음높이: low
- 억양: Greek
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Architect from Greece. Speaks Greek. Currently in an indie film. Tone is professional yet approachable.

##### Training Voiceover 2

- 목소리 ID: `el-gr-training-2`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: male
- 음높이: low
- 억양: Greek
- 역할: Storyteller & Narrator (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 34-year-old Instructional Video Host from Greece. Speaks Greek. Voice is resonant and witty.

##### Training Voiceover 4

- 목소리 ID: `el-gr-training-4`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: male
- 음높이: low
- 억양: Greek
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 30-year-old Instructional Video Host from Greece. Speaks Greek. Voice is bright, breezy, and youthful.

##### Tutor 1

- 목소리 ID: `el-gr-tutor-1`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: male
- 음높이: low
- 억양: Greek
- 역할: Customer Support Agent / Call Center Agent (Professor)
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Professor from Greece. Speaks Greek. Currently sitting on couch. Sounds confident and clear.

##### Tutor 4

- 목소리 ID: `el-gr-tutor-4`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: male
- 음높이: medium
- 억양: Greek
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 41-year-old Professor from Greece. Speaks Greek. Voice is cool, confident, and collaborative.

##### Tutor 7

- 목소리 ID: `el-gr-tutor-7`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: male
- 음높이: low
- 억양: Greek
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 32-year-old Writing Tutor from Greece. Speaks Greek. Currently on podcast. Sounds confident and clear.

##### Tutor 8

- 목소리 ID: `el-gr-tutor-8`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: male
- 음높이: low
- 억양: Greek
- 역할: Coach & Motivational Guide (Chess Instructor)
- 용도: Wellness & Culture
- 공식 설명: 46-year-old Chess Instructor from Greece. Speaks Greek. Currently sitting next to you on the bus. Tone is professional yet approachable.

#### 중성 — 1개

##### Digital Assistant 6

- 목소리 ID: `el-gr-assistant-6`
- 유형: prebuilt
- 언어: el-GR
- 지역: GR
- 성별: neutral
- 음높이: medium
- 억양: Greek
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 31-year-old Parent from Greece. Speaks Greek. Currently in an oscar winning film. Sounds confident and clear.

### 영어·호주 (en-AU) — 44개

#### 여성 — 24개

##### Authoritative Advisor 5

- 목소리 ID: `en-au-advisor-5`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: medium
- 억양: Sydney English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Lawyer from Sydney Australia. Speaks with a Sydney Australia English accent. Currently at a meditation retreat. Tone is professional yet approachable.

##### Authoritative Advisor 7

- 목소리 ID: `en-au-advisor-7`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: low
- 억양: Sydney English
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Researcher from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is intimate talkshow.

##### Authoritative Advisor 8

- 목소리 ID: `en-au-advisor-8`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: high
- 억양: Sydney English
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Researcher from Sydney Australia. Speaks with a Sydney Australia English accent. Currently on podcast. Sounds confident and clear.

##### Call Center Agent 3

- 목소리 ID: `en-au-csagent-3`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: medium
- 억양: Sydney English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Customer Service Agent from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is laid-back, encouraging, and chill.

##### Call Center Agent 5

- 목소리 ID: `en-au-csagent-5`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: high
- 억양: Sydney English
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 26-year-old Sales Associate from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is fast-paced, articulate, energetic.

##### Concierge 3

- 목소리 ID: `en-au-concierge-3`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: medium
- 억양: Sydney English
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Executive Assistant from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is fast-paced, articulate, energetic.

##### Concierge 5

- 목소리 ID: `en-au-concierge-5`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: medium
- 억양: Sydney English
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 55-year-old Tour Guide from Sydney Australia. Speaks with a Sydney Australia English accent. Tone is objective, direct, and helpful

##### Concierge 6

- 목소리 ID: `en-au-concierge-6`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: high
- 억양: Sydney English
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Hotel Concierge from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is natural and clear.

##### Digital Assistant 2

- 목소리 ID: `en-au-assistant-2`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: medium
- 억양: Sydney English
- 역할: Companion & Peer / Digital Assistant (Best Friend)
- 용도: Conversational / Edu
- 공식 설명: 38-year-old Best Friend from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is intimate talkshow.

##### Podcaster 1

- 목소리 ID: `en-au-podcaster-1`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: medium
- 억양: Sydney English
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 28-year-old Podcast Interviewer from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is deep, velvety, and unhurried.

##### Podcaster 4

- 목소리 ID: `en-au-podcaster-4`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: high
- 억양: Sydney English
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 37-year-old Radio Host from Sydney Australia. Speaks with a Sydney Australia English accent. Currently at a meditation retreat. Sounds confident and clear.

##### Storyteller 1

- 목소리 ID: `en-au-storyteller-1`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: low
- 억양: Sydney English
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 43-year-old Philosopher from Sydney Australia. Speaks with a Sydney Australia English accent. Tone is reflective, calm, and reassuring

##### Storyteller 3

- 목소리 ID: `en-au-storyteller-3`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: high
- 억양: Sydney English
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 43-year-old Philosopher from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is cool, confident, and collaborative.

##### Storyteller 4

- 목소리 ID: `en-au-storyteller-4`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: medium
- 억양: Sydney English
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 26-year-old Philosopher from Sydney Australia. Speaks with a Sydney Australia English accent. Currently in a bookstore. Voice is warm and engaging.

##### Tech Advisor 1

- 목소리 ID: `en-au-techagent-1`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: high
- 억양: Sydney English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Architect from Sydney Australia. Speaks with a Sydney Australia English accent. Currently at an appointment. Tone is professional yet approachable.

##### Tech Advisor 5

- 목소리 ID: `en-au-techagent-5`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: medium
- 억양: Sydney English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 52-year-old Tech Support Agent from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is comforting someone who is stressed.

##### Tech Advisor 6

- 목소리 ID: `en-au-techagent-6`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: high
- 억양: Sydney English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Architect from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is fast-paced, articulate, energetic.

##### Tech Advisor 8

- 목소리 ID: `en-au-techagent-8`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: high
- 억양: Sydney English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Tech Support Agent from Sydney Australia. Speaks with a Sydney Australia English accent. Currently on the phone. Voice is warm and engaging.

##### Training Voiceover 1

- 목소리 ID: `en-au-training-1`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: low
- 억양: Sydney English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 37-year-old Cooking Show Host from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is energetic, colorful, and fast

##### Training Voiceover 6

- 목소리 ID: `en-au-training-6`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: high
- 억양: Sydney English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 57-year-old Cooking Show Host from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is light, airy, and precise

##### Training Voiceover 7

- 목소리 ID: `en-au-training-7`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: medium
- 억양: Sydney English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 43-year-old Instructional Video Host from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is resonant and witty.

##### Tutor 1

- 목소리 ID: `en-au-tutor-1`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: high
- 억양: Sydney English
- 역할: Storyteller & Narrator (Therapist)
- 용도: Content & Media
- 공식 설명: 38-year-old Therapist from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is cool, confident, and collaborative.

##### Tutor 3

- 목소리 ID: `en-au-tutor-3`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: medium
- 억양: Sydney English
- 역할: Educational Tutor (Teacher)
- 용도: Conversational / Edu
- 공식 설명: 33-year-old Teacher from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is resonant and witty.

##### Tutor 4

- 목소리 ID: `en-au-tutor-4`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: female
- 음높이: medium
- 억양: Sydney English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Therapist)
- 용도: Growth & Marketing
- 공식 설명: 26-year-old Therapist from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is clear, medium-pitch, and friendly.

#### 남성 — 19개

##### Authoritative Advisor 1

- 목소리 ID: `en-au-advisor-1`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: male
- 음높이: low
- 억양: Sydney English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Lawyer from Sydney Australia. Speaks with a Sydney Australia English accent. Currently sitting on couch. Tone is professional yet approachable.

##### Authoritative Advisor 3

- 목소리 ID: `en-au-advisor-3`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: male
- 음높이: low
- 억양: Sydney English
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Researcher from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is cool, confident, and collaborative.

##### Authoritative Advisor 6

- 목소리 ID: `en-au-advisor-6`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: male
- 음높이: low
- 억양: Sydney English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Lawyer from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is light, airy, and precise

##### Call Center Agent 1

- 목소리 ID: `en-au-csagent-1`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: male
- 음높이: low
- 억양: Sydney English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Customer Service Agent from Sydney Australia. Speaks with a Sydney Australia English accent. Tone is enthusiastic, engaging, and fun

##### Concierge 1

- 목소리 ID: `en-au-concierge-1`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: male
- 음높이: low
- 억양: Sydney English
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 55-year-old Tour Guide from Sydney Australia. Speaks with a Sydney Australia English accent. Currently brainstorming in a meeting. Voice is warm and engaging.

##### Concierge 7

- 목소리 ID: `en-au-concierge-7`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: male
- 음높이: low
- 억양: Sydney English
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Executive Assistant from Sydney Australia. Speaks with a Sydney Australia English accent. Currently sitting next to you on the bus. Voice is warm and engaging.

##### Concierge 8

- 목소리 ID: `en-au-concierge-8`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: male
- 음높이: medium
- 억양: Sydney English
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 54-year-old Tour Guide from Sydney Australia. Speaks with a Sydney Australia English accent. Tone is objective, direct, and helpful

##### Digital Assistant 7

- 목소리 ID: `en-au-assistant-7`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: male
- 음높이: low
- 억양: Sydney English
- 역할: Tech Support Agent / Tech Advisor (Grandparent)
- 용도: Enterprise Agent
- 공식 설명: 63-year-old Grandparent from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is comforting someone who is stressed.

##### Podcaster 2

- 목소리 ID: `en-au-podcaster-2`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: male
- 음높이: low
- 억양: Sydney English
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 39-year-old Podcast Interviewer from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is clear, medium-pitch, and friendly.

##### Podcaster 3

- 목소리 ID: `en-au-podcaster-3`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: male
- 음높이: low
- 억양: Sydney English
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 38-year-old Podcast Interviewer from Sydney Australia. Speaks with a Sydney Australia English accent. Tone is reflective, calm, and reassuring

##### Podcaster 5

- 목소리 ID: `en-au-podcaster-5`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: male
- 음높이: low
- 억양: Sydney English
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 34-year-old Podcast Interviewer from Sydney Australia. Speaks with a Sydney Australia English accent. Currently sitting on couch. Sounds confident and clear.

##### Podcaster 6

- 목소리 ID: `en-au-podcaster-6`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: male
- 음높이: low
- 억양: Sydney English
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 47-year-old Podcast Interviewer from Sydney Australia. Speaks with a Sydney Australia English accent. Currently on npr. Tone is professional yet approachable.

##### Storyteller 2

- 목소리 ID: `en-au-storyteller-2`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: male
- 음높이: low
- 억양: Sydney English
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 38-year-old Storyteller from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is bright, breezy, and youthful.

##### Tech Advisor 3

- 목소리 ID: `en-au-techagent-3`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: male
- 음높이: low
- 억양: Sydney English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Tech Support Agent from Sydney Australia. Speaks with a Sydney Australia English accent. Currently in an oscar winning film. Tone is professional yet approachable.

##### Tech Advisor 4

- 목소리 ID: `en-au-techagent-4`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: male
- 음높이: low
- 억양: Sydney English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 45-year-old Architect from Sydney Australia. Speaks with a Sydney Australia English accent. Currently in a bookstore. Voice is warm and engaging.

##### Training Voiceover 4

- 목소리 ID: `en-au-training-4`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: male
- 음높이: low
- 억양: Sydney English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 34-year-old Cooking Show Host from Sydney Australia. Speaks with a Sydney Australia English accent. Tone is peer-to-peer and curious

##### Training Voiceover 5

- 목소리 ID: `en-au-training-5`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: male
- 음높이: low
- 억양: Sydney English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 25-year-old Cooking Show Host from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is deep, velvety, and unhurried.

##### Training Voiceover 8

- 목소리 ID: `en-au-training-8`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: male
- 음높이: low
- 억양: Sydney English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 28-year-old Cooking Show Host from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is crisp and eager.

##### Tutor 5

- 목소리 ID: `en-au-tutor-5`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: male
- 음높이: low
- 억양: Sydney English
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 57-year-old Professor from Sydney Australia. Speaks with a Sydney Australia English accent. Tone is conversational, slightly dry humor, and warm

#### 중성 — 1개

##### Digital Assistant 6

- 목소리 ID: `en-au-assistant-6`
- 유형: prebuilt
- 언어: en-AU
- 지역: AU
- 성별: neutral
- 음높이: high
- 억양: Sydney English
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 55-year-old Sibling from Sydney Australia. Speaks with a Sydney Australia English accent. Voice is laid-back, encouraging, and chill.

### 영어·캐나다 (en-CA) — 80개

#### 여성 — 40개

##### Authoritative Advisor 2

- 목소리 ID: `en-ca-advisor-2`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Vancouver English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Lawyer from Vancouver. Speaks with a Vancouver English accent. Currently on podcast. Voice is warm and engaging.

##### Authoritative Advisor 3

- 목소리 ID: `en-ca-advisor-3`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Toronto English
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Financial Advisor from Toronto. Speaks with a Toronto English accent. Currently on npr. Voice is warm and engaging.

##### Authoritative Advisor 5

- 목소리 ID: `en-ca-advisor-5`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Toronto English
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 65-year-old Financial Advisor from Toronto. Speaks with a Toronto English accent. Currently on the phone. Voice is warm and engaging.

##### Authoritative Advisor 6

- 목소리 ID: `en-ca-advisor-6`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Toronto English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 48-year-old Lawyer from Toronto. Speaks with a Toronto English accent. Voice is highly approachable.

##### Call Center Agent 1

- 목소리 ID: `en-ca-csagent-1`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Vancouver English
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 63-year-old Social Worker from Vancouver. Speaks with a Vancouver English accent. Voice is comforting someone who is stressed.

##### Call Center Agent 4

- 목소리 ID: `en-ca-csagent-4`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Toronto English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Customer Service Agent from Toronto. Speaks with a Toronto English accent. Voice is intimate talkshow.

##### Call Center Agent 5

- 목소리 ID: `en-ca-csagent-5`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Vancouver English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Customer Service Agent from Vancouver. Speaks with a Vancouver English accent. Currently at an appointment. Sounds confident and clear.

##### Call Center Agent 7

- 목소리 ID: `en-ca-csagent-7`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Toronto English
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 29-year-old Sales Associate from Toronto. Speaks with a Toronto English accent. Currently on the phone. Sounds confident and clear.

##### Commercial Voiceover 1

- 목소리 ID: `en-ca-commercial-1`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Toronto English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 52-year-old Fashion Consultant from Toronto. Speaks with a Toronto English accent. Voice is engaging and empathic.

##### Commercial Voiceover 2

- 목소리 ID: `en-ca-commercial-2`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Vancouver English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 26-year-old Influencer from Vancouver. Speaks with a Vancouver English accent. Voice is intimate talkshow.

##### Commercial Voiceover 4

- 목소리 ID: `en-ca-commercial-4`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Vancouver English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 29-year-old Influencer from Vancouver. Speaks with a Vancouver English accent. Currently on the phone. Sounds confident and clear.

##### Commercial Voiceover 5

- 목소리 ID: `en-ca-commercial-5`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Toronto English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 30-year-old Influencer from Toronto. Speaks with a Toronto English accent. Currently in a bookstore. Sounds confident and clear.

##### Concierge 1

- 목소리 ID: `en-ca-concierge-1`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Vancouver English
- 역할: Concierge & EA (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 51-year-old Event Planner from Vancouver. Speaks with a Vancouver English accent. Voice is light, airy, and precise

##### Concierge 3

- 목소리 ID: `en-ca-concierge-3`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Vancouver English
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 57-year-old Executive Assistant from Vancouver. Speaks with a Vancouver English accent. Currently in a bookstore. Tone is professional yet approachable.

##### Concierge 5

- 목소리 ID: `en-ca-concierge-5`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Toronto English
- 역할: Concierge & EA (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Event Planner from Toronto. Speaks with a Toronto English accent. Voice is cool, confident, and collaborative.

##### Concierge 8

- 목소리 ID: `en-ca-concierge-8`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Vancouver English
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Hotel Concierge from Vancouver. Speaks with a Vancouver English accent. Voice is fast-paced, articulate, energetic.

##### Digital Assistant 1

- 목소리 ID: `en-ca-assistant-1`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Vancouver English
- 역할: Companion & Peer / Digital Assistant (Grandparent)
- 용도: Conversational / Edu
- 공식 설명: 66-year-old Grandparent from Vancouver. Speaks with a Vancouver English accent. Tone is enthusiastic, engaging, and fun

##### Digital Assistant 3

- 목소리 ID: `en-ca-assistant-3`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Vancouver English
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 31-year-old Sibling from Vancouver. Speaks with a Vancouver English accent. Currently sitting next to you on an airplane. Voice is warm and engaging.

##### Digital Assistant 5

- 목소리 ID: `en-ca-assistant-5`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Toronto English
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 60-year-old Sibling from Toronto. Speaks with a Toronto English accent. Voice is engaging and empathic.

##### Digital Assistant 6

- 목소리 ID: `en-ca-assistant-6`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Toronto English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 32-year-old Parent from Toronto. Speaks with a Toronto English accent. Voice is natural and clear.

##### Podcaster 2

- 목소리 ID: `en-ca-podcaster-2`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Vancouver English
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 49-year-old Radio Host from Vancouver. Speaks with a Vancouver English accent. Currently on npr. Tone is professional yet approachable.

##### Podcaster 3

- 목소리 ID: `en-ca-podcaster-3`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Vancouver English
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 48-year-old Podcast Interviewer from Vancouver. Speaks with a Vancouver English accent. Voice is clear, medium-pitch, and friendly.

##### Podcaster 6

- 목소리 ID: `en-ca-podcaster-6`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Toronto English
- 역할: News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 23-year-old Trivia Host from Toronto. Speaks with a Toronto English accent. Voice is crisp and eager.

##### Podcaster 8

- 목소리 ID: `en-ca-podcaster-8`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Vancouver English
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 49-year-old Radio Host from Vancouver. Speaks with a Vancouver English accent. Currently in an oscar winning film. Tone is professional yet approachable.

##### Storyteller 2

- 목소리 ID: `en-ca-storyteller-2`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Toronto English
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 59-year-old Storyteller from Toronto. Speaks with a Toronto English accent. Currently sitting on couch. Tone is professional yet approachable.

##### Storyteller 4

- 목소리 ID: `en-ca-storyteller-4`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Vancouver English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 46-year-old Nature Documentary Narrator from Vancouver. Speaks with a Vancouver English accent. Tone is objective, direct, and helpful

##### Storyteller 6

- 목소리 ID: `en-ca-storyteller-6`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Toronto English
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 64-year-old Storyteller from Toronto. Speaks with a Toronto English accent. Voice is bright, breezy, and youthful.

##### Storyteller 7

- 목소리 ID: `en-ca-storyteller-7`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Toronto English
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 63-year-old Storyteller from Toronto. Speaks with a Toronto English accent. Voice is energetic, colorful, and fast

##### Tech Advisor 2

- 목소리 ID: `en-ca-techagent-2`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Vancouver English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Architect from Vancouver. Speaks with a Vancouver English accent. Currently in an indie film. Tone is professional yet approachable.

##### Tech Advisor 3

- 목소리 ID: `en-ca-techagent-3`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Toronto English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 57-year-old Tech Support Agent from Toronto. Speaks with a Toronto English accent. Tone is conversational, slightly dry humor, and warm

##### Tech Advisor 6

- 목소리 ID: `en-ca-techagent-6`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Vancouver English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Architect from Vancouver. Speaks with a Vancouver English accent. Voice is light, airy, and precise

##### Tech Advisor 8

- 목소리 ID: `en-ca-techagent-8`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Vancouver English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Architect from Vancouver. Speaks with a Vancouver English accent. Voice is crisp and eager.

##### Training Voiceover 2

- 목소리 ID: `en-ca-training-2`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Toronto English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 33-year-old Cooking Show Host from Toronto. Speaks with a Toronto English accent. Voice is clear, medium-pitch, and friendly.

##### Training Voiceover 3

- 목소리 ID: `en-ca-training-3`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Vancouver English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 56-year-old Instructional Video Host from Vancouver. Speaks with a Vancouver English accent. Tone is peer-to-peer and curious

##### Training Voiceover 4

- 목소리 ID: `en-ca-training-4`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Toronto English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 24-year-old Cooking Show Host from Toronto. Speaks with a Toronto English accent. Currently on npr. Tone is professional yet approachable.

##### Training Voiceover 7

- 목소리 ID: `en-ca-training-7`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Vancouver English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 38-year-old Cooking Show Host from Vancouver. Speaks with a Vancouver English accent. Voice is clear, medium-pitch, and friendly.

##### Tutor 1

- 목소리 ID: `en-ca-tutor-1`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Vancouver English
- 역할: Educational Tutor (Librarian)
- 용도: Conversational / Edu
- 공식 설명: 33-year-old Librarian from Vancouver. Speaks with a Vancouver English accent. Currently in a bookstore. Voice is warm and engaging.

##### Tutor 4

- 목소리 ID: `en-ca-tutor-4`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Toronto English
- 역할: Educational Tutor (Music Teacher)
- 용도: Conversational / Edu
- 공식 설명: 58-year-old Music Teacher from Toronto. Speaks with a Toronto English accent. Voice is clear, medium-pitch, and friendly.

##### Tutor 5

- 목소리 ID: `en-ca-tutor-5`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Toronto English
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 37-year-old Chess Instructor from Toronto. Speaks with a Toronto English accent. Voice is relaxed.

##### Tutor 7

- 목소리 ID: `en-ca-tutor-7`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Toronto English
- 역할: Coach & Motivational Guide (Fitness Trainer)
- 용도: Wellness & Culture
- 공식 설명: 53-year-old Fitness Trainer from Toronto. Speaks with a Toronto English accent. Voice is highly approachable.

#### 남성 — 36개

##### Authoritative Advisor 1

- 목소리 ID: `en-ca-advisor-1`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Toronto English
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 61-year-old Financial Advisor from Toronto. Speaks with a Toronto English accent. Voice is fast-paced, articulate, energetic.

##### Authoritative Advisor 4

- 목소리 ID: `en-ca-advisor-4`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Vancouver English
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Researcher from Vancouver. Speaks with a Vancouver English accent. Currently brainstorming in a meeting. Voice is warm and engaging.

##### Authoritative Advisor 7

- 목소리 ID: `en-ca-advisor-7`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Toronto English
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 59-year-old Financial Advisor from Toronto. Speaks with a Toronto English accent. Voice is energetic, colorful, and fast

##### Authoritative Advisor 8

- 목소리 ID: `en-ca-advisor-8`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Vancouver English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Lawyer from Vancouver. Speaks with a Vancouver English accent. Voice is bright, breezy, and youthful.

##### Call Center Agent 2

- 목소리 ID: `en-ca-csagent-2`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Toronto English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 22-year-old Customer Service Agent from Toronto. Speaks with a Toronto English accent. Voice is relaxed.

##### Call Center Agent 3

- 목소리 ID: `en-ca-csagent-3`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Vancouver English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Customer Service Agent from Vancouver. Speaks with a Vancouver English accent. Currently on the phone. Sounds confident and clear.

##### Call Center Agent 6

- 목소리 ID: `en-ca-csagent-6`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Vancouver English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 53-year-old Customer Service Agent from Vancouver. Speaks with a Vancouver English accent. Currently at an appointment. Tone is professional yet approachable.

##### Call Center Agent 8

- 목소리 ID: `en-ca-csagent-8`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Toronto English
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 64-year-old Social Worker from Toronto. Speaks with a Toronto English accent. Voice is highly approachable.

##### Commercial Voiceover 3

- 목소리 ID: `en-ca-commercial-3`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Toronto English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 26-year-old Influencer from Toronto. Speaks with a Toronto English accent. Voice is natural and clear.

##### Commercial Voiceover 6

- 목소리 ID: `en-ca-commercial-6`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Toronto English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 56-year-old Fashion Consultant from Toronto. Speaks with a Toronto English accent. Voice is crisp and eager.

##### Commercial Voiceover 7

- 목소리 ID: `en-ca-commercial-7`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Toronto English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 38-year-old Fashion Consultant from Toronto. Speaks with a Toronto English accent. Voice is energetic, colorful, and fast

##### Concierge 2

- 목소리 ID: `en-ca-concierge-2`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Toronto English
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 28-year-old Tour Guide from Toronto. Speaks with a Toronto English accent. Voice is clear, medium-pitch, and friendly.

##### Concierge 4

- 목소리 ID: `en-ca-concierge-4`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Vancouver English
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Executive Assistant from Vancouver. Speaks with a Vancouver English accent. Currently in a bookstore. Sounds confident and clear.

##### Concierge 6

- 목소리 ID: `en-ca-concierge-6`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Toronto English
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 59-year-old Tour Guide from Toronto. Speaks with a Toronto English accent. Currently on npr. Voice is warm and engaging.

##### Digital Assistant 2

- 목소리 ID: `en-ca-assistant-2`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Vancouver English
- 역할: Companion & Peer / Digital Assistant (Grandparent)
- 용도: Conversational / Edu
- 공식 설명: 60-year-old Grandparent from Vancouver. Speaks with a Vancouver English accent. Currently sitting on couch. Voice is warm and engaging.

##### Digital Assistant 4

- 목소리 ID: `en-ca-assistant-4`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: medium
- 억양: Vancouver English
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 53-year-old Sibling from Vancouver. Speaks with a Vancouver English accent. Currently sitting on couch. Voice is warm and engaging.

##### Digital Assistant 7

- 목소리 ID: `en-ca-assistant-7`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Toronto English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 30-year-old Parent from Toronto. Speaks with a Toronto English accent. Currently at an appointment. Sounds confident and clear.

##### Digital Assistant 8

- 목소리 ID: `en-ca-assistant-8`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Vancouver English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 32-year-old Parent from Vancouver. Speaks with a Vancouver English accent. Voice is relaxed.

##### Podcaster 1

- 목소리 ID: `en-ca-podcaster-1`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Toronto English
- 역할: News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 48-year-old Trivia Host from Toronto. Speaks with a Toronto English accent. Tone is objective, direct, and helpful

##### Podcaster 4

- 목소리 ID: `en-ca-podcaster-4`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Toronto English
- 역할: Video Voiceover & Host / Training Voiceover (Trivia Host) | News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 52-year-old Trivia Host from Toronto. Speaks with a Toronto English accent. Currently sitting on couch. Tone is professional yet approachable.

##### Podcaster 5

- 목소리 ID: `en-ca-podcaster-5`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Vancouver English
- 역할: News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 44-year-old Trivia Host from Vancouver. Speaks with a Vancouver English accent. Voice is crisp and eager.

##### Podcaster 7

- 목소리 ID: `en-ca-podcaster-7`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Vancouver English
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 30-year-old Radio Host from Vancouver. Speaks with a Vancouver English accent. Voice is fast-paced, articulate, energetic.

##### Storyteller 1

- 목소리 ID: `en-ca-storyteller-1`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Vancouver English
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 57-year-old Storyteller from Vancouver. Speaks with a Vancouver English accent. Voice is engaging and empathic.

##### Storyteller 3

- 목소리 ID: `en-ca-storyteller-3`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Toronto English
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 39-year-old Storyteller from Toronto. Speaks with a Toronto English accent. Currently in a bookstore. Sounds confident and clear.

##### Storyteller 5

- 목소리 ID: `en-ca-storyteller-5`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Toronto English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 37-year-old Nature Documentary Narrator from Toronto. Speaks with a Toronto English accent. Voice is bright, breezy, and youthful.

##### Storyteller 8

- 목소리 ID: `en-ca-storyteller-8`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Vancouver English
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 44-year-old Philosopher from Vancouver. Speaks with a Vancouver English accent. Voice is highly approachable.

##### Tech Advisor 1

- 목소리 ID: `en-ca-techagent-1`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Toronto English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Architect from Toronto. Speaks with a Toronto English accent. Currently on the phone. Sounds confident and clear.

##### Tech Advisor 4

- 목소리 ID: `en-ca-techagent-4`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Toronto English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 62-year-old Tech Support Agent from Toronto. Speaks with a Toronto English accent. Voice is resonant and witty.

##### Tech Advisor 5

- 목소리 ID: `en-ca-techagent-5`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Vancouver English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 50-year-old Architect from Vancouver. Speaks with a Vancouver English accent. Currently at an appointment. Sounds confident and clear.

##### Tech Advisor 7

- 목소리 ID: `en-ca-techagent-7`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Toronto English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Tech Support Agent from Toronto. Speaks with a Toronto English accent. Currently in an indie film. Sounds confident and clear.

##### Training Voiceover 1

- 목소리 ID: `en-ca-training-1`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Vancouver English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 33-year-old Instructional Video Host from Vancouver. Speaks with a Vancouver English accent. Voice is laid-back, encouraging, and chill.

##### Training Voiceover 6

- 목소리 ID: `en-ca-training-6`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: medium
- 억양: Toronto English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 61-year-old Cooking Show Host from Toronto. Speaks with a Toronto English accent. Voice is light, airy, and precise

##### Training Voiceover 8

- 목소리 ID: `en-ca-training-8`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Vancouver English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 47-year-old Instructional Video Host from Vancouver. Speaks with a Vancouver English accent. Currently on npr. Tone is professional yet approachable.

##### Tutor 2

- 목소리 ID: `en-ca-tutor-2`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Toronto English
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 33-year-old Chess Instructor from Toronto. Speaks with a Toronto English accent. Voice is cool, confident, and collaborative.

##### Tutor 3

- 목소리 ID: `en-ca-tutor-3`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Vancouver English
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 55-year-old Chess Instructor from Vancouver. Speaks with a Vancouver English accent. Currently sitting next to you on the bus. Sounds confident and clear.

##### Tutor 6

- 목소리 ID: `en-ca-tutor-6`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Toronto English
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 62-year-old Chess Instructor from Toronto. Speaks with a Toronto English accent. Currently in a bookstore. Sounds confident and clear.

#### 중성 — 4개

##### Commercial Voiceover 8

- 목소리 ID: `en-ca-commercial-8`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: neutral
- 음높이: medium
- 억양: Toronto English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 28-year-old Influencer from Toronto. Speaks with a Toronto English accent. Currently on npr. Tone is professional yet approachable.

##### Concierge 7

- 목소리 ID: `en-ca-concierge-7`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: neutral
- 음높이: medium
- 억양: Vancouver English
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 64-year-old Executive Assistant from Vancouver. Speaks with a Vancouver English accent. Voice is laid-back, encouraging, and chill.

##### Training Voiceover 5

- 목소리 ID: `en-ca-training-5`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: neutral
- 음높이: low
- 억양: Vancouver English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 32-year-old Instructional Video Host from Vancouver. Speaks with a Vancouver English accent. Voice is crisp and eager.

##### Tutor 8

- 목소리 ID: `en-ca-tutor-8`
- 유형: prebuilt
- 언어: en-CA
- 지역: CA
- 성별: neutral
- 음높이: high
- 억양: Vancouver English
- 역할: Educational Tutor (Teacher)
- 용도: Conversational / Edu
- 공식 설명: 27-year-old Teacher from Vancouver. Speaks with a Vancouver English accent. Currently sitting next to you on an airplane. Sounds confident and clear.

### 영어·영국 (en-GB) — 117개

#### 여성 — 69개

##### Authoritative Advisor 1

- 목소리 ID: `en-gb-advisor-1`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Winchester English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Lawyer from Winchester. Speaks with a Winchester English accent. Currently at a meditation retreat. Tone is professional yet approachable.

##### Authoritative Advisor 11

- 목소리 ID: `en-gb-advisor-11`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: high
- 억양: Glasgow English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 44-year-old Lawyer from Glasgow. Speaks with a Glasgow English accent. Currently on npr. Sounds confident and clear.

##### Authoritative Advisor 12

- 목소리 ID: `en-gb-advisor-12`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: high
- 억양: Newcastle English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Lawyer from Newcastle. Speaks with a Newcastle English accent. Voice is engaging and empathic.

##### Authoritative Advisor 4

- 목소리 ID: `en-gb-advisor-4`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: low
- 억양: Winchester English
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Financial Advisor from Winchester. Speaks with a Winchester English accent. Voice is textured, resonant, and soothing.

##### Authoritative Advisor 6

- 목소리 ID: `en-gb-advisor-6`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Winchester English
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Financial Advisor from Winchester. Speaks with a Winchester English accent. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Authoritative Advisor 7

- 목소리 ID: `en-gb-advisor-7`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Newcastle English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Lawyer from Newcastle. Speaks with a Newcastle English accent. Voice is highly approachable.

##### Call Center Agent 1

- 목소리 ID: `en-gb-csagent-1`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: high
- 억양: Manchester English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Customer Service Agent from Manchester. Speaks with a Manchester English accent. Currently at a meditation retreat. Sounds confident and clear.

##### Call Center Agent 10

- 목소리 ID: `en-gb-csagent-10`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Winchester English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Customer Service Agent from Winchester. Speaks with a Winchester English accent. Tone is enthusiastic, engaging, and fun

##### Call Center Agent 2

- 목소리 ID: `en-gb-csagent-2`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Winchester English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Customer Service Agent)
- 용도: Growth & Marketing
- 공식 설명: 33-year-old Customer Service Agent from Winchester. Speaks with a Winchester English accent. Tone is reflective, calm, and reassuring

##### Call Center Agent 4

- 목소리 ID: `en-gb-csagent-4`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: low
- 억양: Winchester English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Customer Service Agent)
- 용도: Growth & Marketing
- 공식 설명: 35-year-old Customer Service Agent from Winchester. Speaks with a Winchester English accent. Tone is conversational, slightly dry humor, and warm

##### Call Center Agent 6

- 목소리 ID: `en-gb-csagent-6`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: high
- 억양: Winchester English
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 23-year-old Social Worker from Winchester. Speaks with a Winchester English accent. Currently sitting on couch. Tone is professional yet approachable.

##### Call Center Agent 8

- 목소리 ID: `en-gb-csagent-8`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: high
- 억양: Winchester English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 22-year-old Customer Service Agent from Winchester. Speaks with a Winchester English accent. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Call Center Agent 9

- 목소리 ID: `en-gb-csagent-9`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Glasgow English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Customer Service Agent)
- 용도: Growth & Marketing
- 공식 설명: 27-year-old Customer Service Agent from Glasgow. Speaks with a Glasgow English accent. Voice is textured, resonant, and soothing.

##### Commercial Voiceover 1

- 목소리 ID: `en-gb-commercial-1`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: high
- 억양: Winchester English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 23-year-old Influencer from Winchester. Speaks with a Winchester English accent. Voice is textured, resonant, and soothing.

##### Commercial Voiceover 2

- 목소리 ID: `en-gb-commercial-2`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: low
- 억양: Winchester English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 26-year-old Influencer from Winchester. Speaks with a Winchester English accent. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Commercial Voiceover 3

- 목소리 ID: `en-gb-commercial-3`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Newcastle English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 23-year-old Influencer from Newcastle. Speaks with a Newcastle English accent. Voice is deep, velvety, and unhurried.

##### Commercial Voiceover 5

- 목소리 ID: `en-gb-commercial-5`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Winchester English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 26-year-old Influencer from Winchester. Speaks with a Winchester English accent. Voice is clear, medium-pitch, and friendly.

##### Commercial Voiceover 6

- 목소리 ID: `en-gb-commercial-6`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Winchester English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 26-year-old Influencer from Winchester. Speaks with a Winchester English accent. Voice is comforting someone who is stressed.

##### Commercial Voiceover 8

- 목소리 ID: `en-gb-commercial-8`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: low
- 억양: Newcastle English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 21-year-old Influencer from Newcastle. Speaks with a Newcastle English accent. Voice is textured, resonant, and soothing.

##### Commercial Voiceover 9

- 목소리 ID: `en-gb-commercial-9`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Winchester English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 25-year-old Influencer from Winchester. Speaks with a Winchester English accent. Voice is engaging and empathic.

##### Concierge 11

- 목소리 ID: `en-gb-concierge-11`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: low
- 억양: Bristol English
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Executive Assistant from Bristol. Speaks with a Bristol English accent. Currently at an appointment. Tone is professional yet approachable.

##### Concierge 2

- 목소리 ID: `en-gb-concierge-2`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Winchester English
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Executive Assistant from Winchester. Speaks with a Winchester English accent. Tone is objective, direct, and helpful

##### Concierge 4

- 목소리 ID: `en-gb-concierge-4`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Winchester English
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Executive Assistant from Winchester. Speaks with a Winchester English accent. Currently in an oscar winning film. Tone is professional yet approachable.

##### Concierge 5

- 목소리 ID: `en-gb-concierge-5`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Winchester English
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Executive Assistant from Winchester. Speaks with a Winchester English accent. Tone is objective, direct, and helpful

##### Concierge 6

- 목소리 ID: `en-gb-concierge-6`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: high
- 억양: Winchester English
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 28-year-old Tour Guide from Winchester. Speaks with a Winchester English accent. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Concierge 7

- 목소리 ID: `en-gb-concierge-7`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: high
- 억양: Winchester English
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 58-year-old Tour Guide from Winchester. Speaks with a Winchester English accent. Currently on npr. Sounds confident and clear.

##### Digital Assistant 1

- 목소리 ID: `en-gb-assistant-1`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: high
- 억양: Winchester English
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 35-year-old Sibling from Winchester. Speaks with a Winchester English accent. Voice is natural and clear.

##### Digital Assistant 12

- 목소리 ID: `en-gb-assistant-12`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Manchester English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 38-year-old Parent from Manchester. Speaks with a Manchester English accent. Voice is highly approachable.

##### Digital Assistant 3

- 목소리 ID: `en-gb-assistant-3`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: low
- 억양: Manchester English
- 역할: Storyteller & Narrator (Aunt/Uncle)
- 용도: Content & Media
- 공식 설명: 45-year-old Aunt/Uncle from Manchester. Speaks with a Manchester English accent. Voice is comforting someone who is stressed.

##### Digital Assistant 6

- 목소리 ID: `en-gb-assistant-6`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: high
- 억양: Glasgow English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 35-year-old Parent from Glasgow. Speaks with a Glasgow English accent. Voice is crisp and eager.

##### Digital Assistant 7

- 목소리 ID: `en-gb-assistant-7`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: low
- 억양: Liverpool English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 47-year-old Parent from Liverpool. Speaks with a Liverpool English accent. Voice is laid-back, encouraging, and chill.

##### Digital Assistant 9

- 목소리 ID: `en-gb-assistant-9`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: low
- 억양: Newcastle English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 30-year-old Parent from Newcastle. Speaks with a Newcastle English accent. Tone is reflective, calm, and reassuring

##### Podcaster 10

- 목소리 ID: `en-gb-podcaster-10`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Winchester English
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 48-year-old Podcast Interviewer from Winchester. Speaks with a Winchester English accent. Currently sitting on couch. Tone is professional yet approachable.

##### Podcaster 12

- 목소리 ID: `en-gb-podcaster-12`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Bristol English
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 58-year-old Podcast Interviewer from Bristol. Speaks with a Bristol English accent. Currently on npr. Sounds confident and clear.

##### Podcaster 2

- 목소리 ID: `en-gb-podcaster-2`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: low
- 억양: Winchester English
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 49-year-old Radio Host from Winchester. Speaks with a Winchester English accent. Currently in an indie film. Tone is professional yet approachable.

##### Podcaster 3

- 목소리 ID: `en-gb-podcaster-3`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: high
- 억양: Winchester English
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 42-year-old Radio Host from Winchester. Speaks with a Winchester English accent. Currently at a meditation retreat. Sounds confident and clear.

##### Podcaster 6

- 목소리 ID: `en-gb-podcaster-6`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Newcastle English
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 31-year-old Podcast Interviewer from Newcastle. Speaks with a Newcastle English accent. Currently on the phone. Sounds confident and clear.

##### Podcaster 7

- 목소리 ID: `en-gb-podcaster-7`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Manchester English
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 39-year-old Podcast Interviewer from Manchester. Speaks with a Manchester English accent. Voice is highly approachable.

##### Storyteller 2

- 목소리 ID: `en-gb-storyteller-2`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: high
- 억양: Winchester English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 51-year-old Nature Documentary Narrator from Winchester. Speaks with a Winchester English accent. Voice is resonant and witty.

##### Storyteller 3

- 목소리 ID: `en-gb-storyteller-3`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: high
- 억양: Newcastle English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 33-year-old Nature Documentary Narrator from Newcastle. Speaks with a Newcastle English accent. Currently on npr. Voice is warm and engaging.

##### Storyteller 5

- 목소리 ID: `en-gb-storyteller-5`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: high
- 억양: Newcastle English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 41-year-old Nature Documentary Narrator from Newcastle. Speaks with a Newcastle English accent. Voice is highly approachable.

##### Tech Advisor 1

- 목소리 ID: `en-gb-techagent-1`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Bristol English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 27-year-old Tech Support Agent from Bristol. Speaks with a Bristol English accent. Currently brainstorming in a meeting. Sounds confident and clear.

##### Tech Advisor 2

- 목소리 ID: `en-gb-techagent-2`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Glasgow English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Tech Support Agent from Glasgow. Speaks with a Glasgow English accent. Currently in an oscar winning film. Voice is warm and engaging.

##### Tech Advisor 4

- 목소리 ID: `en-gb-techagent-4`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: high
- 억양: Manchester English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Architect from Manchester. Speaks with a Manchester English accent. Voice is light, airy, and precise

##### Tech Advisor 5

- 목소리 ID: `en-gb-techagent-5`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Glasgow English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 26-year-old Tech Support Agent from Glasgow. Speaks with a Glasgow English accent. Currently sitting on couch. Voice is warm and engaging.

##### Tech Advisor 6

- 목소리 ID: `en-gb-techagent-6`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: low
- 억양: Manchester English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Tech Support Agent from Manchester. Speaks with a Manchester English accent. Tone is conversational, slightly dry humor, and warm

##### Tech Advisor 7

- 목소리 ID: `en-gb-techagent-7`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: high
- 억양: Manchester English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Architect from Manchester. Speaks with a Manchester English accent. Currently brainstorming in a meeting. Sounds confident and clear.

##### Tech Advisor 8

- 목소리 ID: `en-gb-techagent-8`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: low
- 억양: Manchester English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Architect from Manchester. Speaks with a Manchester English accent. Voice is cool, confident, and collaborative.

##### Training Voiceover 2

- 목소리 ID: `en-gb-training-2`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Winchester English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 64-year-old Instructional Video Host from Winchester. Speaks with a Winchester English accent. Voice is natural and clear.

##### Training Voiceover 4

- 목소리 ID: `en-gb-training-4`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Manchester English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 26-year-old Instructional Video Host from Manchester. Speaks with a Manchester English accent. Voice is comforting someone who is stressed.

##### Training Voiceover 5

- 목소리 ID: `en-gb-training-5`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: high
- 억양: Newcastle English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 29-year-old Instructional Video Host from Newcastle. Speaks with a Newcastle English accent. Currently at an appointment. Sounds confident and clear.

##### Training Voiceover 6

- 목소리 ID: `en-gb-training-6`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Liverpool English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 61-year-old Instructional Video Host from Liverpool. Speaks with a Liverpool English accent. Currently in an oscar winning film. Voice is warm and engaging.

##### Training Voiceover 7

- 목소리 ID: `en-gb-training-7`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Glasgow English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 25-year-old Instructional Video Host from Glasgow. Speaks with a Glasgow English accent. Voice is comforting someone who is stressed.

##### Training Voiceover 9

- 목소리 ID: `en-gb-training-9`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: low
- 억양: Manchester English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 37-year-old Cooking Show Host from Manchester. Speaks with a Manchester English accent. Voice is bright, breezy, and youthful.

##### Tutor 1

- 목소리 ID: `en-gb-tutor-1`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Winchester English
- 역할: Tech Support Agent / Tech Advisor (Librarian)
- 용도: Enterprise Agent
- 공식 설명: 29-year-old Librarian from Winchester. Speaks with a Winchester English accent. Currently sitting next to you on the bus. Sounds confident and clear.

##### Tutor 10

- 목소리 ID: `en-gb-tutor-10`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: high
- 억양: Winchester English
- 역할: Tech Support Agent / Tech Advisor (Librarian)
- 용도: Enterprise Agent
- 공식 설명: 58-year-old Librarian from Winchester. Speaks with a Winchester English accent. Voice is natural and clear.

##### Tutor 11

- 목소리 ID: `en-gb-tutor-11`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Winchester English
- 역할: Educational Tutor (Music Teacher)
- 용도: Conversational / Edu
- 공식 설명: 59-year-old Music Teacher from Winchester. Speaks with a Winchester English accent. Currently in an oscar winning film. Voice is warm and engaging.

##### Tutor 12

- 목소리 ID: `en-gb-tutor-12`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: low
- 억양: Winchester English
- 역할: Storyteller & Narrator (Therapist)
- 용도: Content & Media
- 공식 설명: 32-year-old Therapist from Winchester. Speaks with a Winchester English accent. Voice is deep, velvety, and unhurried.

##### Tutor 13

- 목소리 ID: `en-gb-tutor-13`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Winchester English
- 역할: Storyteller & Narrator (Therapist)
- 용도: Content & Media
- 공식 설명: 33-year-old Therapist from Winchester. Speaks with a Winchester English accent. Voice is clear, medium-pitch, and friendly.

##### Tutor 15

- 목소리 ID: `en-gb-tutor-15`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: high
- 억양: Manchester English
- 역할: Coach & Motivational Guide (Lifestyle Coach)
- 용도: Wellness & Culture
- 공식 설명: 32-year-old Lifestyle Coach from Manchester. Speaks with a Manchester English accent. Currently on podcast. Voice is warm and engaging.

##### Tutor 17

- 목소리 ID: `en-gb-tutor-17`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Newcastle English
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 24-year-old Professor from Newcastle. Speaks with a Newcastle English accent. Currently sitting next to you on an airplane. Voice is warm and engaging.

##### Tutor 18

- 목소리 ID: `en-gb-tutor-18`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Newcastle English
- 역할: Coach & Motivational Guide (Fitness Trainer)
- 용도: Wellness & Culture
- 공식 설명: 34-year-old Fitness Trainer from Newcastle. Speaks with a Newcastle English accent. Tone is objective, direct, and helpful

##### Tutor 19

- 목소리 ID: `en-gb-tutor-19`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Winchester English
- 역할: Companion & Peer / Digital Assistant (Mentor)
- 용도: Conversational / Edu
- 공식 설명: 48-year-old Mentor from Winchester. Speaks with a Winchester English accent. Currently at a meditation retreat. Tone is professional yet approachable.

##### Tutor 20

- 목소리 ID: `en-gb-tutor-20`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: high
- 억양: Winchester English
- 역할: Companion & Peer / Digital Assistant (Mentor)
- 용도: Conversational / Edu
- 공식 설명: 63-year-old Mentor from Winchester. Speaks with a Winchester English accent. Currently on npr. Sounds confident and clear.

##### Tutor 21

- 목소리 ID: `en-gb-tutor-21`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Winchester English
- 역할: Companion & Peer / Digital Assistant (Mentor)
- 용도: Conversational / Edu
- 공식 설명: 33-year-old Mentor from Winchester. Speaks with a Winchester English accent. Voice is crisp and eager.

##### Tutor 4

- 목소리 ID: `en-gb-tutor-4`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: low
- 억양: Winchester English
- 역할: Educational Tutor (Teacher)
- 용도: Conversational / Edu
- 공식 설명: 37-year-old Teacher from Winchester. Speaks with a Winchester English accent. Voice is textured, resonant, and soothing.

##### Tutor 5

- 목소리 ID: `en-gb-tutor-5`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: medium
- 억양: Glasgow English
- 역할: Storyteller & Narrator (Therapist)
- 용도: Content & Media
- 공식 설명: 62-year-old Therapist from Glasgow. Speaks with a Glasgow English accent. Currently at an appointment. Sounds confident and clear.

##### Tutor 6

- 목소리 ID: `en-gb-tutor-6`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: low
- 억양: Winchester English
- 역할: Educational Tutor (Teacher)
- 용도: Conversational / Edu
- 공식 설명: 54-year-old Teacher from Winchester. Speaks with a Winchester English accent. Voice is bright, breezy, and youthful.

##### Tutor 7

- 목소리 ID: `en-gb-tutor-7`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: female
- 음높이: high
- 억양: Winchester English
- 역할: Coach & Motivational Guide (Mentor)
- 용도: Wellness & Culture
- 공식 설명: 37-year-old Mentor from Winchester. Speaks with a Winchester English accent. Currently sitting next to you on an airplane. Voice is warm and engaging.

#### 남성 — 47개

##### Authoritative Advisor 10

- 목소리 ID: `en-gb-advisor-10`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Bristol English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Lawyer from Bristol. Speaks with a Bristol English accent. Tone is conversational, slightly dry humor, and warm

##### Authoritative Advisor 2

- 목소리 ID: `en-gb-advisor-2`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: medium
- 억양: Manchester English
- 역할: Storyteller & Narrator (Lawyer)
- 용도: Content & Media
- 공식 설명: 44-year-old Lawyer from Manchester. Speaks with a Manchester English accent. Voice is highly approachable.

##### Authoritative Advisor 3

- 목소리 ID: `en-gb-advisor-3`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Bristol English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Lawyer from Bristol. Speaks with a Bristol English accent. Currently sitting next to you on an airplane. Tone is professional yet approachable.

##### Authoritative Advisor 5

- 목소리 ID: `en-gb-advisor-5`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Manchester English
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 48-year-old Financial Advisor from Manchester. Speaks with a Manchester English accent. Currently in an indie film. Voice is warm and engaging.

##### Authoritative Advisor 8

- 목소리 ID: `en-gb-advisor-8`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Winchester English
- 역할: High-Trust Advisor / Authoritative Advisor (Doctor)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Doctor from Winchester. Speaks with a Winchester English accent. Voice is crisp and eager.

##### Authoritative Advisor 9

- 목소리 ID: `en-gb-advisor-9`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Glasgow English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 50-year-old Lawyer from Glasgow. Speaks with a Glasgow English accent. Voice is engaging and empathic.

##### Call Center Agent 11

- 목소리 ID: `en-gb-csagent-11`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Liverpool English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Customer Service Agent from Liverpool. Speaks with a Liverpool English accent. Voice is comforting someone who is stressed.

##### Call Center Agent 12

- 목소리 ID: `en-gb-csagent-12`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Newcastle English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 45-year-old Customer Service Agent from Newcastle. Speaks with a Newcastle English accent. Voice is light, airy, and precise

##### Call Center Agent 13

- 목소리 ID: `en-gb-csagent-13`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Bristol English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 22-year-old Customer Service Agent from Bristol. Speaks with a Bristol English accent. Currently at an appointment. Tone is professional yet approachable.

##### Call Center Agent 14

- 목소리 ID: `en-gb-csagent-14`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Bristol English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 57-year-old Customer Service Agent from Bristol. Speaks with a Bristol English accent. Voice is crisp and eager.

##### Call Center Agent 3

- 목소리 ID: `en-gb-csagent-3`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: medium
- 억양: Manchester English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 62-year-old Customer Service Agent from Manchester. Speaks with a Manchester English accent. Voice is cool, confident, and collaborative.

##### Call Center Agent 5

- 목소리 ID: `en-gb-csagent-5`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Liverpool English
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Social Worker from Liverpool. Speaks with a Liverpool English accent. Currently on podcast. Voice is warm and engaging.

##### Call Center Agent 7

- 목소리 ID: `en-gb-csagent-7`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Winchester English
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 29-year-old Social Worker from Winchester. Speaks with a Winchester English accent. Voice is clear, medium-pitch, and friendly.

##### Commercial Voiceover 4

- 목소리 ID: `en-gb-commercial-4`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Glasgow English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 24-year-old Influencer from Glasgow. Speaks with a Glasgow English accent. Currently at a meditation retreat. Sounds confident and clear.

##### Commercial Voiceover 7

- 목소리 ID: `en-gb-commercial-7`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Winchester English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 27-year-old Influencer from Winchester. Speaks with a Winchester English accent. Voice is crisp and eager.

##### Concierge 1

- 목소리 ID: `en-gb-concierge-1`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Bristol English
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Executive Assistant from Bristol. Speaks with a Bristol English accent. Voice is deep, velvety, and unhurried.

##### Concierge 10

- 목소리 ID: `en-gb-concierge-10`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Liverpool English
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 64-year-old Hotel Concierge from Liverpool. Speaks with a Liverpool English accent. Voice is deep, velvety, and unhurried.

##### Concierge 12

- 목소리 ID: `en-gb-concierge-12`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Newcastle English
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 57-year-old Hotel Concierge from Newcastle. Speaks with a Newcastle English accent. Voice is crisp and eager.

##### Concierge 3

- 목소리 ID: `en-gb-concierge-3`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Manchester English
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Executive Assistant from Manchester. Speaks with a Manchester English accent. Currently on npr. Voice is warm and engaging.

##### Concierge 8

- 목소리 ID: `en-gb-concierge-8`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: medium
- 억양: Glasgow English
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 62-year-old Tour Guide from Glasgow. Speaks with a Glasgow English accent. Currently in an indie film. Tone is professional yet approachable.

##### Concierge 9

- 목소리 ID: `en-gb-concierge-9`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Newcastle English
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Hotel Concierge from Newcastle. Speaks with a Newcastle English accent. Currently brainstorming in a meeting. Sounds confident and clear.

##### Digital Assistant 10

- 목소리 ID: `en-gb-assistant-10`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Winchester English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 32-year-old Parent from Winchester. Speaks with a Winchester English accent. Tone is enthusiastic, engaging, and fun

##### Digital Assistant 2

- 목소리 ID: `en-gb-assistant-2`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Winchester English
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 25-year-old Friend from Winchester. Speaks with a Winchester English accent. Currently on the phone. Tone is professional yet approachable.

##### Digital Assistant 4

- 목소리 ID: `en-gb-assistant-4`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Winchester English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 35-year-old Parent from Winchester. Speaks with a Winchester English accent. Currently in a bookstore. Sounds confident and clear.

##### Digital Assistant 5

- 목소리 ID: `en-gb-assistant-5`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Glasgow English
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 62-year-old Friend from Glasgow. Speaks with a Glasgow English accent. Currently sitting next to you on an airplane. Tone is professional yet approachable.

##### Digital Assistant 8

- 목소리 ID: `en-gb-assistant-8`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Bristol English
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 39-year-old Friend from Bristol. Speaks with a Bristol English accent. Voice is crisp and eager.

##### Podcaster 1

- 목소리 ID: `en-gb-podcaster-1`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Winchester English
- 역할: Tech Support Agent / Tech Advisor (Radio Host)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Radio Host from Winchester. Speaks with a Winchester English accent. Voice is intimate talkshow.

##### Podcaster 11

- 목소리 ID: `en-gb-podcaster-11`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Liverpool English
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 57-year-old Radio Host from Liverpool. Speaks with a Liverpool English accent. Tone is objective, direct, and helpful

##### Podcaster 4

- 목소리 ID: `en-gb-podcaster-4`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Winchester English
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 22-year-old Radio Host from Winchester. Speaks with a Winchester English accent. Tone is objective, direct, and helpful

##### Podcaster 5

- 목소리 ID: `en-gb-podcaster-5`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: medium
- 억양: Glasgow English
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 41-year-old Radio Host from Glasgow. Speaks with a Glasgow English accent. Tone is objective, direct, and helpful

##### Podcaster 8

- 목소리 ID: `en-gb-podcaster-8`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Glasgow English
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 37-year-old Podcast Interviewer from Glasgow. Speaks with a Glasgow English accent. Voice is relaxed.

##### Podcaster 9

- 목소리 ID: `en-gb-podcaster-9`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Manchester English
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 45-year-old Podcast Interviewer from Manchester. Speaks with a Manchester English accent. Tone is objective, direct, and helpful

##### Storyteller 1

- 목소리 ID: `en-gb-storyteller-1`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Bristol English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 27-year-old Nature Documentary Narrator from Bristol. Speaks with a Bristol English accent. Voice is comforting someone who is stressed.

##### Storyteller 4

- 목소리 ID: `en-gb-storyteller-4`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Bristol English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 56-year-old Nature Documentary Narrator from Bristol. Speaks with a Bristol English accent. Voice is deep, velvety, and unhurried.

##### Tech Advisor 3

- 목소리 ID: `en-gb-techagent-3`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Glasgow English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 55-year-old Tech Support Agent from Glasgow. Speaks with a Glasgow English accent. Tone is reflective, calm, and reassuring

##### Training Voiceover 1

- 목소리 ID: `en-gb-training-1`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Winchester English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 55-year-old Instructional Video Host from Winchester. Speaks with a Winchester English accent. Currently sitting next to you on the bus. Sounds confident and clear.

##### Training Voiceover 10

- 목소리 ID: `en-gb-training-10`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Winchester English
- 역할: Tech Support Agent / Tech Advisor (Cooking Show Host)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Cooking Show Host from Winchester. Speaks with a Winchester English accent. Currently in an oscar winning film. Tone is professional yet approachable.

##### Training Voiceover 11

- 목소리 ID: `en-gb-training-11`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Newcastle English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 53-year-old Cooking Show Host from Newcastle. Speaks with a Newcastle English accent. Voice is relaxed.

##### Training Voiceover 12

- 목소리 ID: `en-gb-training-12`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Bristol English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 41-year-old Instructional Video Host from Bristol. Speaks with a Bristol English accent. Voice is fast-paced, articulate, energetic.

##### Training Voiceover 3

- 목소리 ID: `en-gb-training-3`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Winchester English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 24-year-old Instructional Video Host from Winchester. Speaks with a Winchester English accent. Tone is objective, direct, and helpful

##### Training Voiceover 8

- 목소리 ID: `en-gb-training-8`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Glasgow English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 41-year-old Instructional Video Host from Glasgow. Speaks with a Glasgow English accent. Currently on npr. Voice is warm and engaging.

##### Tutor 14

- 목소리 ID: `en-gb-tutor-14`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Winchester English
- 역할: Educational Tutor
- 용도: Conversational / Edu
- 공식 설명: 32-year-old Tutor from Winchester. Speaks with a Winchester English accent. Currently on the phone. Sounds confident and clear.

##### Tutor 16

- 목소리 ID: `en-gb-tutor-16`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: medium
- 억양: Glasgow English
- 역할: Coach & Motivational Guide (Fitness Trainer)
- 용도: Wellness & Culture
- 공식 설명: 53-year-old Fitness Trainer from Glasgow. Speaks with a Glasgow English accent. Currently on podcast. Tone is professional yet approachable.

##### Tutor 2

- 목소리 ID: `en-gb-tutor-2`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: medium
- 억양: Newcastle English
- 역할: Storyteller & Narrator (Fitness Trainer)
- 용도: Content & Media
- 공식 설명: 42-year-old Fitness Trainer from Newcastle. Speaks with a Newcastle English accent. Tone is peer-to-peer and curious

##### Tutor 3

- 목소리 ID: `en-gb-tutor-3`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Bristol English
- 역할: Storyteller & Narrator (Fitness Trainer) | Coach & Motivational Guide (Fitness Trainer)
- 용도: Content & Media | Wellness & Culture
- 공식 설명: 29-year-old Fitness Trainer from Bristol. Speaks with a Bristol English accent. Voice is relaxed.

##### Tutor 8

- 목소리 ID: `en-gb-tutor-8`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Winchester English
- 역할: Tech Support Agent / Tech Advisor (Librarian)
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Librarian from Winchester. Speaks with a Winchester English accent. Voice is relaxed.

##### Tutor 9

- 목소리 ID: `en-gb-tutor-9`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: male
- 음높이: low
- 억양: Winchester English
- 역할: Storyteller & Narrator (Counselor)
- 용도: Content & Media
- 공식 설명: 46-year-old Counselor from Winchester. Speaks with a Winchester English accent. Voice is crisp and eager.

#### 중성 — 1개

##### Digital Assistant 11

- 목소리 ID: `en-gb-assistant-11`
- 유형: prebuilt
- 언어: en-GB
- 지역: GB
- 성별: neutral
- 음높이: high
- 억양: Bristol English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 38-year-old Parent from Bristol. Speaks with a Bristol English accent. Voice is deep, velvety, and unhurried.

### 영어·아일랜드 (en-IE) — 80개

#### 여성 — 39개

##### Authoritative Advisor 2

- 목소리 ID: `en-ie-advisor-2`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: low
- 억양: Dublin English
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 52-year-old Financial Advisor from Dublin. Speaks with a Dublin English accent. Currently on the phone. Tone is professional yet approachable.

##### Authoritative Advisor 4

- 목소리 ID: `en-ie-advisor-4`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: medium
- 억양: Dublin English
- 역할: High-Trust Advisor / Authoritative Advisor (Doctor)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Doctor from Dublin. Speaks with a Dublin English accent. Tone is objective, direct, and helpful

##### Authoritative Advisor 5

- 목소리 ID: `en-ie-advisor-5`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: high
- 억양: Dublin English
- 역할: High-Trust Advisor / Authoritative Advisor (Doctor)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Doctor from Dublin. Speaks with a Dublin English accent. Currently brainstorming in a meeting. Voice is warm and engaging.

##### Authoritative Advisor 7

- 목소리 ID: `en-ie-advisor-7`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: medium
- 억양: Dublin English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Lawyer from Dublin. Speaks with a Dublin English accent. Currently in an indie film. Sounds confident and clear.

##### Call Center Agent 2

- 목소리 ID: `en-ie-csagent-2`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: high
- 억양: Dublin English
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Social Worker from Dublin. Speaks with a Dublin English accent. Currently sitting next to you on an airplane. Tone is professional yet approachable.

##### Call Center Agent 3

- 목소리 ID: `en-ie-csagent-3`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: medium
- 억양: Dublin English
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Social Worker from Dublin. Speaks with a Dublin English accent. Voice is clear, medium-pitch, and friendly.

##### Call Center Agent 5

- 목소리 ID: `en-ie-csagent-5`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: low
- 억양: Dublin English
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 62-year-old Social Worker from Dublin. Speaks with a Dublin English accent. Currently on the phone. Voice is warm and engaging.

##### Call Center Agent 7

- 목소리 ID: `en-ie-csagent-7`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: high
- 억양: Dublin English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Customer Service Agent from Dublin. Speaks with a Dublin English accent. Voice is fast-paced, articulate, energetic.

##### Commercial Voiceover 1

- 목소리 ID: `en-ie-commercial-1`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: high
- 억양: Dublin English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 29-year-old Fashion Consultant from Dublin. Speaks with a Dublin English accent. Currently brainstorming in a meeting. Tone is professional yet approachable.

##### Commercial Voiceover 4

- 목소리 ID: `en-ie-commercial-4`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: low
- 억양: Dublin English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 52-year-old Fashion Consultant from Dublin. Speaks with a Dublin English accent. Voice is deep, velvety, and unhurried.

##### Commercial Voiceover 5

- 목소리 ID: `en-ie-commercial-5`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: low
- 억양: Dublin English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 58-year-old Fashion Consultant from Dublin. Speaks with a Dublin English accent. Currently in an oscar winning film. Tone is professional yet approachable.

##### Commercial Voiceover 7

- 목소리 ID: `en-ie-commercial-7`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: medium
- 억양: Dublin English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 25-year-old Fashion Consultant from Dublin. Speaks with a Dublin English accent. Voice is highly approachable.

##### Concierge 1

- 목소리 ID: `en-ie-concierge-1`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: medium
- 억양: Dublin English
- 역할: Concierge & EA (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Event Planner from Dublin. Speaks with a Dublin English accent. Currently on podcast. Voice is warm and engaging.

##### Concierge 3

- 목소리 ID: `en-ie-concierge-3`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: low
- 억양: Dublin English
- 역할: Concierge & EA (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Event Planner from Dublin. Speaks with a Dublin English accent. Voice is fast-paced, articulate, energetic.

##### Concierge 5

- 목소리 ID: `en-ie-concierge-5`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: low
- 억양: Dublin English
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Hotel Concierge from Dublin. Speaks with a Dublin English accent. Currently sitting on couch. Tone is professional yet approachable.

##### Concierge 7

- 목소리 ID: `en-ie-concierge-7`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: high
- 억양: Dublin English
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Tour Guide from Dublin. Speaks with a Dublin English accent. Voice is crisp and eager.

##### Digital Assistant 1

- 목소리 ID: `en-ie-assistant-1`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: low
- 억양: Dublin English
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 33-year-old Sibling from Dublin. Speaks with a Dublin English accent. Voice is intimate talkshow.

##### Digital Assistant 3

- 목소리 ID: `en-ie-assistant-3`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: medium
- 억양: Dublin English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 38-year-old Parent from Dublin. Speaks with a Dublin English accent. Voice is light, airy, and precise

##### Digital Assistant 4

- 목소리 ID: `en-ie-assistant-4`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: high
- 억양: Dublin English
- 역할: Companion & Peer / Digital Assistant (Aunt/Uncle)
- 용도: Conversational / Edu
- 공식 설명: 43-year-old Aunt/Uncle from Dublin. Speaks with a Dublin English accent. Currently at an appointment. Tone is professional yet approachable.

##### Digital Assistant 5

- 목소리 ID: `en-ie-assistant-5`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: high
- 억양: Dublin English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 31-year-old Parent from Dublin. Speaks with a Dublin English accent. Currently in an indie film. Sounds confident and clear.

##### Podcaster 1

- 목소리 ID: `en-ie-podcaster-1`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: medium
- 억양: Dublin English
- 역할: News & Podcast Host / Podcaster (Journalist)
- 용도: Content & Media
- 공식 설명: 47-year-old Journalist from Dublin. Speaks with a Dublin English accent. Currently at an appointment. Voice is warm and engaging.

##### Podcaster 3

- 목소리 ID: `en-ie-podcaster-3`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: high
- 억양: Dublin English
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 43-year-old Podcast Interviewer from Dublin. Speaks with a Dublin English accent. Voice is fast-paced, articulate, energetic.

##### Podcaster 4

- 목소리 ID: `en-ie-podcaster-4`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: low
- 억양: Dublin English
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 33-year-old Podcast Interviewer from Dublin. Speaks with a Dublin English accent. Currently on the phone. Voice is warm and engaging.

##### Podcaster 5

- 목소리 ID: `en-ie-podcaster-5`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: high
- 억양: Dublin English
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 51-year-old Podcast Interviewer from Dublin. Speaks with a Dublin English accent. Currently in an oscar winning film. Sounds confident and clear.

##### Storyteller 1

- 목소리 ID: `en-ie-storyteller-1`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: high
- 억양: Dublin English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 31-year-old Nature Documentary Narrator from Dublin. Speaks with a Dublin English accent. Voice is light, airy, and precise

##### Storyteller 4

- 목소리 ID: `en-ie-storyteller-4`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: low
- 억양: Dublin English
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 47-year-old Storyteller from Dublin. Speaks with a Dublin English accent. Voice is laid-back, encouraging, and chill.

##### Storyteller 6

- 목소리 ID: `en-ie-storyteller-6`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: low
- 억양: Dublin English
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 62-year-old Philosopher from Dublin. Speaks with a Dublin English accent. Voice is crisp and eager.

##### Tech Advisor 2

- 목소리 ID: `en-ie-techagent-2`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: high
- 억양: Dublin English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Architect from Dublin. Speaks with a Dublin English accent. Tone is objective, direct, and helpful

##### Tech Advisor 4

- 목소리 ID: `en-ie-techagent-4`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: high
- 억양: Dublin English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 48-year-old Tech Support Agent from Dublin. Speaks with a Dublin English accent. Voice is laid-back, encouraging, and chill.

##### Tech Advisor 5

- 목소리 ID: `en-ie-techagent-5`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: low
- 억양: Dublin English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 48-year-old Tech Support Agent from Dublin. Speaks with a Dublin English accent. Voice is laid-back, encouraging, and chill.

##### Tech Advisor 6

- 목소리 ID: `en-ie-techagent-6`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: medium
- 억양: Dublin English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 27-year-old Tech Support Agent from Dublin. Speaks with a Dublin English accent. Tone is enthusiastic, engaging, and fun

##### Training Voiceover 1

- 목소리 ID: `en-ie-training-1`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: medium
- 억양: Dublin English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 36-year-old Instructional Video Host from Dublin. Speaks with a Dublin English accent. Tone is objective, direct, and helpful

##### Training Voiceover 3

- 목소리 ID: `en-ie-training-3`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: medium
- 억양: Dublin English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 40-year-old Instructional Video Host from Dublin. Speaks with a Dublin English accent. Tone is enthusiastic, engaging, and fun

##### Training Voiceover 4

- 목소리 ID: `en-ie-training-4`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: low
- 억양: Dublin English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 40-year-old Cooking Show Host from Dublin. Speaks with a Dublin English accent. Voice is deep, velvety, and unhurried.

##### Training Voiceover 6

- 목소리 ID: `en-ie-training-6`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: high
- 억양: Dublin English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 25-year-old Cooking Show Host from Dublin. Speaks with a Dublin English accent. Currently in an oscar winning film. Tone is professional yet approachable.

##### Tutor 1

- 목소리 ID: `en-ie-tutor-1`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: medium
- 억양: Dublin English
- 역할: Coach & Motivational Guide (Nutritionist)
- 용도: Wellness & Culture
- 공식 설명: 49-year-old Nutritionist from Dublin. Speaks with a Dublin English accent. Voice is light, airy, and precise

##### Tutor 3

- 목소리 ID: `en-ie-tutor-3`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: low
- 억양: Dublin English
- 역할: Coach & Motivational Guide (Mentor)
- 용도: Wellness & Culture
- 공식 설명: 25-year-old Mentor from Dublin. Speaks with a Dublin English accent. Voice is light, airy, and precise

##### Tutor 5

- 목소리 ID: `en-ie-tutor-5`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: high
- 억양: Dublin English
- 역할: Coach & Motivational Guide (Nutritionist)
- 용도: Wellness & Culture
- 공식 설명: 45-year-old Nutritionist from Dublin. Speaks with a Dublin English accent. Voice is engaging and empathic.

##### Tutor 6

- 목소리 ID: `en-ie-tutor-6`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: female
- 음높이: high
- 억양: Dublin English
- 역할: Companion & Peer / Digital Assistant (Mentor)
- 용도: Conversational / Edu
- 공식 설명: 34-year-old Mentor from Dublin. Speaks with a Dublin English accent. Currently on npr. Sounds confident and clear.

#### 남성 — 37개

##### Authoritative Advisor 1

- 목소리 ID: `en-ie-advisor-1`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: High-Trust Advisor / Authoritative Advisor (Doctor)
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Doctor from Dublin. Speaks with a Dublin English accent. Voice is intimate talkshow.

##### Authoritative Advisor 3

- 목소리 ID: `en-ie-advisor-3`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 45-year-old Researcher from Dublin. Speaks with a Dublin English accent. Currently at an appointment. Sounds confident and clear.

##### Authoritative Advisor 6

- 목소리 ID: `en-ie-advisor-6`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Lawyer from Dublin. Speaks with a Dublin English accent. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Authoritative Advisor 8

- 목소리 ID: `en-ie-advisor-8`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: High-Trust Advisor / Authoritative Advisor (Doctor)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Doctor from Dublin. Speaks with a Dublin English accent. Voice is textured, resonant, and soothing.

##### Call Center Agent 1

- 목소리 ID: `en-ie-csagent-1`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Customer Service Agent from Dublin. Speaks with a Dublin English accent. Voice is deep, velvety, and unhurried.

##### Call Center Agent 4

- 목소리 ID: `en-ie-csagent-4`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Customer Service Agent from Dublin. Speaks with a Dublin English accent. Voice is clear, medium-pitch, and friendly.

##### Call Center Agent 6

- 목소리 ID: `en-ie-csagent-6`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Customer Service Agent from Dublin. Speaks with a Dublin English accent. Voice is intimate talkshow.

##### Call Center Agent 8

- 목소리 ID: `en-ie-csagent-8`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: high
- 억양: Dublin English
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 28-year-old Sales Associate from Dublin. Speaks with a Dublin English accent. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Commercial Voiceover 2

- 목소리 ID: `en-ie-commercial-2`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 35-year-old Fashion Consultant from Dublin. Speaks with a Dublin English accent. Currently in an oscar winning film. Tone is professional yet approachable.

##### Commercial Voiceover 3

- 목소리 ID: `en-ie-commercial-3`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: medium
- 억양: Dublin English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 54-year-old Fashion Consultant from Dublin. Speaks with a Dublin English accent. Tone is conversational, slightly dry humor, and warm

##### Commercial Voiceover 6

- 목소리 ID: `en-ie-commercial-6`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 56-year-old Fashion Consultant from Dublin. Speaks with a Dublin English accent. Voice is clear, medium-pitch, and friendly.

##### Concierge 2

- 목소리 ID: `en-ie-concierge-2`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 52-year-old Tour Guide from Dublin. Speaks with a Dublin English accent. Tone is objective, direct, and helpful

##### Concierge 4

- 목소리 ID: `en-ie-concierge-4`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 28-year-old Hotel Concierge from Dublin. Speaks with a Dublin English accent. Currently at an appointment. Sounds confident and clear.

##### Concierge 8

- 목소리 ID: `en-ie-concierge-8`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Concierge & EA
- 용도: Enterprise Agent
- 공식 설명: 48-year-old Concierge from Dublin. Speaks with a Dublin English accent. Currently in an indie film. Sounds confident and clear.

##### Digital Assistant 2

- 목소리 ID: `en-ie-assistant-2`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 27-year-old Sibling from Dublin. Speaks with a Dublin English accent. Currently in a bookstore. Sounds confident and clear.

##### Digital Assistant 7

- 목소리 ID: `en-ie-assistant-7`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 47-year-old Friend from Dublin. Speaks with a Dublin English accent. Voice is fast-paced, articulate, energetic.

##### Digital Assistant 8

- 목소리 ID: `en-ie-assistant-8`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 49-year-old Sibling from Dublin. Speaks with a Dublin English accent. Voice is highly approachable.

##### Podcaster 2

- 목소리 ID: `en-ie-podcaster-2`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 43-year-old Podcast Interviewer from Dublin. Speaks with a Dublin English accent. Voice is laid-back, encouraging, and chill.

##### Podcaster 6

- 목소리 ID: `en-ie-podcaster-6`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 43-year-old Podcast Interviewer from Dublin. Speaks with a Dublin English accent. Currently at an appointment. Tone is professional yet approachable.

##### Podcaster 7

- 목소리 ID: `en-ie-podcaster-7`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 39-year-old Podcast Interviewer from Dublin. Speaks with a Dublin English accent. Voice is highly approachable.

##### Podcaster 8

- 목소리 ID: `en-ie-podcaster-8`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 54-year-old Podcast Interviewer from Dublin. Speaks with a Dublin English accent. Voice is crisp and eager.

##### Storyteller 2

- 목소리 ID: `en-ie-storyteller-2`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 39-year-old Philosopher from Dublin. Speaks with a Dublin English accent. Voice is relaxed.

##### Storyteller 3

- 목소리 ID: `en-ie-storyteller-3`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 64-year-old Storyteller from Dublin. Speaks with a Dublin English accent. Currently in an oscar winning film. Tone is professional yet approachable.

##### Storyteller 5

- 목소리 ID: `en-ie-storyteller-5`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: medium
- 억양: Dublin English
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 55-year-old Storyteller from Dublin. Speaks with a Dublin English accent. Voice is intimate talkshow.

##### Storyteller 7

- 목소리 ID: `en-ie-storyteller-7`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 48-year-old Philosopher from Dublin. Speaks with a Dublin English accent. Currently on the phone. Tone is professional yet approachable.

##### Storyteller 8

- 목소리 ID: `en-ie-storyteller-8`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 34-year-old Storyteller from Dublin. Speaks with a Dublin English accent. Voice is laid-back, encouraging, and chill.

##### Tech Advisor 1

- 목소리 ID: `en-ie-techagent-1`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Architect from Dublin. Speaks with a Dublin English accent. Tone is reflective, calm, and reassuring

##### Tech Advisor 3

- 목소리 ID: `en-ie-techagent-3`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Architect from Dublin. Speaks with a Dublin English accent. Currently at an appointment. Sounds confident and clear.

##### Tech Advisor 7

- 목소리 ID: `en-ie-techagent-7`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 61-year-old Tech Support Agent from Dublin. Speaks with a Dublin English accent. Voice is comforting someone who is stressed.

##### Tech Advisor 8

- 목소리 ID: `en-ie-techagent-8`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Architect from Dublin. Speaks with a Dublin English accent. Currently on podcast. Voice is warm and engaging.

##### Training Voiceover 2

- 목소리 ID: `en-ie-training-2`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 48-year-old Cooking Show Host from Dublin. Speaks with a Dublin English accent. Voice is cool, confident, and collaborative.

##### Training Voiceover 5

- 목소리 ID: `en-ie-training-5`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 62-year-old Cooking Show Host from Dublin. Speaks with a Dublin English accent. Currently sitting next to you on an airplane. Voice is warm and engaging.

##### Training Voiceover 7

- 목소리 ID: `en-ie-training-7`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 46-year-old Cooking Show Host from Dublin. Speaks with a Dublin English accent. Tone is peer-to-peer and curious

##### Training Voiceover 8

- 목소리 ID: `en-ie-training-8`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 61-year-old Instructional Video Host from Dublin. Speaks with a Dublin English accent. Voice is engaging and empathic.

##### Tutor 2

- 목소리 ID: `en-ie-tutor-2`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Educational Tutor
- 용도: Conversational / Edu
- 공식 설명: 64-year-old Tutor from Dublin. Speaks with a Dublin English accent. Currently on npr. Voice is warm and engaging.

##### Tutor 4

- 목소리 ID: `en-ie-tutor-4`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 42-year-old Writing Tutor from Dublin. Speaks with a Dublin English accent. Voice is fast-paced, articulate, energetic.

##### Tutor 7

- 목소리 ID: `en-ie-tutor-7`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: male
- 음높이: low
- 억양: Dublin English
- 역할: Educational Tutor
- 용도: Conversational / Edu
- 공식 설명: 50-year-old Tutor from Dublin. Speaks with a Dublin English accent. Tone is objective, direct, and helpful

#### 중성 — 4개

##### Commercial Voiceover 8

- 목소리 ID: `en-ie-commercial-8`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: neutral
- 음높이: low
- 억양: Dublin English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 49-year-old Fashion Consultant from Dublin. Speaks with a Dublin English accent. Voice is textured, resonant, and soothing.

##### Concierge 6

- 목소리 ID: `en-ie-concierge-6`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: neutral
- 음높이: low
- 억양: Dublin English
- 역할: Concierge & EA
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Concierge from Dublin. Speaks with a Dublin English accent. Voice is comforting someone who is stressed.

##### Digital Assistant 6

- 목소리 ID: `en-ie-assistant-6`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: neutral
- 음높이: high
- 억양: Dublin English
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 22-year-old Sibling from Dublin. Speaks with a Dublin English accent. Voice is light, airy, and precise

##### Tutor 8

- 목소리 ID: `en-ie-tutor-8`
- 유형: prebuilt
- 언어: en-IE
- 지역: IE
- 성별: neutral
- 음높이: high
- 억양: Dublin English
- 역할: Companion & Peer / Digital Assistant (Mentor)
- 용도: Conversational / Edu
- 공식 설명: 32-year-old Mentor from Dublin. Speaks with a Dublin English accent. Voice is deep, velvety, and unhurried.

### 영어·인도 (en-IN) — 120개

#### 여성 — 60개

##### Authoritative Advisor 10

- 목소리 ID: `en-in-advisor-10`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Lawyer from India. Speaks Hinglish. Voice is relaxed.

##### Authoritative Advisor 11

- 목소리 ID: `en-in-advisor-11`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Lawyer from India. Speaks Hinglish. Tone is objective, direct, and helpful

##### Authoritative Advisor 2

- 목소리 ID: `en-in-advisor-2`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Indian English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Lawyer from India. Speaks Hinglish. Voice is highly approachable.

##### Authoritative Advisor 4

- 목소리 ID: `en-in-advisor-4`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 44-year-old Financial Advisor from India. Speaks Hinglish. Tone is enthusiastic, engaging, and fun

##### Authoritative Advisor 6

- 목소리 ID: `en-in-advisor-6`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Financial Advisor from India. Speaks Hinglish. Currently on podcast. Tone is professional yet approachable.

##### Authoritative Advisor 8

- 목소리 ID: `en-in-advisor-8`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Indian English
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 48-year-old Financial Advisor from India. Speaks Hinglish. Currently at a meditation retreat. Voice is warm and engaging.

##### Call Center Agent 2

- 목소리 ID: `en-in-csagent-2`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 60-year-old Sales Associate from India. Speaks Hinglish. Voice is fast-paced, articulate, energetic.

##### Call Center Agent 3

- 목소리 ID: `en-in-csagent-3`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Indian English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Customer Service Agent from India. Speaks Hinglish. Currently brainstorming in a meeting. Sounds confident and clear.

##### Call Center Agent 5

- 목소리 ID: `en-in-csagent-5`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Indian English
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Sales Associate from India. Speaks Hinglish. Voice is clear, medium-pitch, and friendly.

##### Call Center Agent 6

- 목소리 ID: `en-in-csagent-6`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Sales Associate from India. Speaks Hinglish. Tone is enthusiastic, engaging, and fun

##### Call Center Agent 8

- 목소리 ID: `en-in-csagent-8`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Indian English
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Sales Associate from India. Speaks Hinglish. Tone is peer-to-peer and curious

##### Call Center Agent 9

- 목소리 ID: `en-in-csagent-9`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Social Worker from India. Speaks Hinglish. Voice is light, airy, and precise

##### Commercial Voiceover 10

- 목소리 ID: `en-in-commercial-10`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 26-year-old Influencer from India. Speaks Hinglish. Currently sitting on couch. Tone is professional yet approachable.

##### Commercial Voiceover 11

- 목소리 ID: `en-in-commercial-11`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 27-year-old Influencer from India. Speaks Hinglish. Currently in an oscar winning film. Voice is warm and engaging.

##### Commercial Voiceover 2

- 목소리 ID: `en-in-commercial-2`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Indian English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 24-year-old Influencer from India. Speaks Hinglish. Voice is bright, breezy, and youthful.

##### Commercial Voiceover 3

- 목소리 ID: `en-in-commercial-3`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Indian English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 22-year-old Influencer from India. Speaks Hinglish. Currently in a bookstore. Sounds confident and clear.

##### Commercial Voiceover 5

- 목소리 ID: `en-in-commercial-5`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 30-year-old Influencer from India. Speaks Hinglish. Currently on the phone. Voice is warm and engaging.

##### Commercial Voiceover 8

- 목소리 ID: `en-in-commercial-8`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Indian English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 26-year-old Influencer from India. Speaks Hinglish. Currently sitting on couch. Tone is professional yet approachable.

##### Concierge 10

- 목소리 ID: `en-in-concierge-10`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 60-year-old Tour Guide from India. Speaks Hinglish. Voice is relaxed.

##### Concierge 2

- 목소리 ID: `en-in-concierge-2`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Indian English
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Executive Assistant from India. Speaks Hinglish. Tone is enthusiastic, engaging, and fun

##### Concierge 3

- 목소리 ID: `en-in-concierge-3`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Indian English
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Executive Assistant from India. Speaks Hinglish. Currently at an appointment. Tone is professional yet approachable.

##### Concierge 5

- 목소리 ID: `en-in-concierge-5`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 56-year-old Tour Guide from India. Speaks Hinglish. Currently sitting next to you on the bus. Voice is warm and engaging.

##### Concierge 6

- 목소리 ID: `en-in-concierge-6`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Executive Assistant from India. Speaks Hinglish. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Concierge 7

- 목소리 ID: `en-in-concierge-7`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Indian English
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 61-year-old Executive Assistant from India. Speaks Hinglish. Tone is conversational, slightly dry humor, and warm

##### Digital Assistant 2

- 목소리 ID: `en-in-assistant-2`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Indian English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 44-year-old Parent from India. Speaks Hinglish. Voice is comforting someone who is stressed.

##### Digital Assistant 3

- 목소리 ID: `en-in-assistant-3`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 37-year-old Parent from India. Speaks Hinglish. Currently on podcast. Voice is warm and engaging.

##### Digital Assistant 5

- 목소리 ID: `en-in-assistant-5`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Indian English
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 51-year-old Sibling from India. Speaks Hinglish. Voice is comforting someone who is stressed.

##### Digital Assistant 6

- 목소리 ID: `en-in-assistant-6`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Indian English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 46-year-old Parent from India. Speaks Hinglish. Voice is engaging and empathic.

##### Digital Assistant 7

- 목소리 ID: `en-in-assistant-7`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Indian English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 44-year-old Parent from India. Speaks Hinglish. Voice is comforting someone who is stressed.

##### Digital Assistant 8

- 목소리 ID: `en-in-assistant-8`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 31-year-old Sibling from India. Speaks Hinglish. Voice is crisp and eager.

##### Podcaster 10

- 목소리 ID: `en-in-podcaster-10`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Indian English
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 51-year-old Radio Host from India. Speaks Hinglish. Voice is crisp and eager.

##### Podcaster 11

- 목소리 ID: `en-in-podcaster-11`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 33-year-old Radio Host from India. Speaks Hinglish. Voice is clear, medium-pitch, and friendly.

##### Podcaster 2

- 목소리 ID: `en-in-podcaster-2`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 46-year-old Radio Host from India. Speaks Hinglish. Voice is engaging and empathic.

##### Podcaster 4

- 목소리 ID: `en-in-podcaster-4`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Indian English
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 60-year-old Radio Host from India. Speaks Hinglish. Currently on podcast. Voice is warm and engaging.

##### Podcaster 6

- 목소리 ID: `en-in-podcaster-6`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 31-year-old Podcast Interviewer from India. Speaks Hinglish. Voice is light, airy, and precise

##### Podcaster 8

- 목소리 ID: `en-in-podcaster-8`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Indian English
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 50-year-old Radio Host from India. Speaks Hinglish. Currently on npr. Voice is warm and engaging.

##### Storyteller 1

- 목소리 ID: `en-in-storyteller-1`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Indian English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 25-year-old Nature Documentary Narrator from India. Speaks Hinglish. Voice is natural and clear.

##### Storyteller 10

- 목소리 ID: `en-in-storyteller-10`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Indian English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 36-year-old Nature Documentary Narrator from India. Speaks Hinglish. Voice is deep, velvety, and unhurried.

##### Storyteller 3

- 목소리 ID: `en-in-storyteller-3`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Indian English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 41-year-old Nature Documentary Narrator from India. Speaks Hinglish. Voice is comforting someone who is stressed.

##### Storyteller 5

- 목소리 ID: `en-in-storyteller-5`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 22-year-old Nature Documentary Narrator from India. Speaks Hinglish. Currently at an appointment. Voice is warm and engaging.

##### Storyteller 8

- 목소리 ID: `en-in-storyteller-8`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Indian English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 28-year-old Nature Documentary Narrator from India. Speaks Hinglish. Tone is objective, direct, and helpful

##### Storyteller 9

- 목소리 ID: `en-in-storyteller-9`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 61-year-old Nature Documentary Narrator from India. Speaks Hinglish. Tone is conversational, slightly dry humor, and warm

##### Tech Advisor 1

- 목소리 ID: `en-in-techagent-1`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Indian English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 59-year-old Tech Support Agent from India. Speaks Hinglish. Voice is comforting someone who is stressed.

##### Tech Advisor 10

- 목소리 ID: `en-in-techagent-10`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Tech Support Agent from India. Speaks Hinglish. Tone is peer-to-peer and curious

##### Tech Advisor 12

- 목소리 ID: `en-in-techagent-12`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Indian English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 56-year-old Tech Support Agent from India. Speaks Hinglish. Voice is intimate talkshow.

##### Tech Advisor 3

- 목소리 ID: `en-in-techagent-3`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 56-year-old Tech Support Agent from India. Speaks Hinglish. Voice is intimate talkshow.

##### Tech Advisor 7

- 목소리 ID: `en-in-techagent-7`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Tech Support Agent from India. Speaks Hinglish. Currently brainstorming in a meeting. Tone is professional yet approachable.

##### Tech Advisor 9

- 목소리 ID: `en-in-techagent-9`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Indian English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Tech Support Agent from India. Speaks Hinglish. Voice is fast-paced, articulate, energetic.

##### Training Voiceover 1

- 목소리 ID: `en-in-training-1`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 42-year-old Instructional Video Host from India. Speaks Hinglish. Tone is conversational, slightly dry humor, and warm

##### Training Voiceover 3

- 목소리 ID: `en-in-training-3`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Indian English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 48-year-old Cooking Show Host from India. Speaks Hinglish. Currently at an appointment. Sounds confident and clear.

##### Training Voiceover 5

- 목소리 ID: `en-in-training-5`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Indian English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 36-year-old Cooking Show Host from India. Speaks Hinglish. Currently in an indie film. Tone is professional yet approachable.

##### Training Voiceover 6

- 목소리 ID: `en-in-training-6`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 40-year-old Cooking Show Host from India. Speaks Hinglish. Voice is intimate talkshow.

##### Training Voiceover 7

- 목소리 ID: `en-in-training-7`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Indian English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 38-year-old Cooking Show Host from India. Speaks Hinglish. Voice is light, airy, and precise

##### Training Voiceover 8

- 목소리 ID: `en-in-training-8`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 24-year-old Instructional Video Host from India. Speaks Hinglish. Voice is deep, velvety, and unhurried.

##### Tutor 11

- 목소리 ID: `en-in-tutor-11`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Companion & Peer / Digital Assistant (Mentor)
- 용도: Conversational / Edu
- 공식 설명: 42-year-old Mentor from India. Speaks Hinglish. Voice is crisp and eager.

##### Tutor 2

- 목소리 ID: `en-in-tutor-2`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Indian English
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 47-year-old Professor from India. Speaks Hinglish. Voice is engaging and empathic.

##### Tutor 3

- 목소리 ID: `en-in-tutor-3`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Indian English
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 44-year-old Writing Tutor from India. Speaks Hinglish. Voice is comforting someone who is stressed.

##### Tutor 5

- 목소리 ID: `en-in-tutor-5`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Indian English
- 역할: Coach & Motivational Guide (Mentor)
- 용도: Wellness & Culture
- 공식 설명: 54-year-old Mentor from India. Speaks Hinglish. Currently in an oscar winning film. Tone is professional yet approachable.

##### Tutor 7

- 목소리 ID: `en-in-tutor-7`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Educational Tutor (Teacher)
- 용도: Conversational / Edu
- 공식 설명: 37-year-old Teacher from India. Speaks Hinglish. Voice is intimate talkshow.

##### Tutor 9

- 목소리 ID: `en-in-tutor-9`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Indian English
- 역할: Coach & Motivational Guide (Fitness Trainer)
- 용도: Wellness & Culture
- 공식 설명: 48-year-old Fitness Trainer from India. Speaks Hinglish. Voice is cool, confident, and collaborative.

#### 남성 — 53개

##### Authoritative Advisor 1

- 목소리 ID: `en-in-advisor-1`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Lawyer from India. Speaks Hinglish. Currently sitting on couch. Voice is warm and engaging.

##### Authoritative Advisor 12

- 목소리 ID: `en-in-advisor-12`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: medium
- 억양: Indian English
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 65-year-old Financial Advisor from India. Speaks Hinglish. Voice is laid-back, encouraging, and chill.

##### Authoritative Advisor 3

- 목소리 ID: `en-in-advisor-3`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Financial Advisor from India. Speaks Hinglish. Voice is natural and clear.

##### Authoritative Advisor 5

- 목소리 ID: `en-in-advisor-5`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Financial Advisor from India. Speaks Hinglish. Voice is comforting someone who is stressed.

##### Authoritative Advisor 7

- 목소리 ID: `en-in-advisor-7`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 53-year-old Financial Advisor from India. Speaks Hinglish. Voice is light, airy, and precise

##### Authoritative Advisor 9

- 목소리 ID: `en-in-advisor-9`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 50-year-old Lawyer from India. Speaks Hinglish. Voice is relaxed.

##### Call Center Agent 1

- 목소리 ID: `en-in-csagent-1`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Customer Service Agent from India. Speaks Hinglish. Voice is natural and clear.

##### Call Center Agent 11

- 목소리 ID: `en-in-csagent-11`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Sales Associate from India. Speaks Hinglish. Voice is comforting someone who is stressed.

##### Call Center Agent 12

- 목소리 ID: `en-in-csagent-12`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 22-year-old Sales Associate from India. Speaks Hinglish. Voice is natural and clear.

##### Call Center Agent 4

- 목소리 ID: `en-in-csagent-4`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Sales Associate from India. Speaks Hinglish. Voice is crisp and eager.

##### Call Center Agent 7

- 목소리 ID: `en-in-csagent-7`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 29-year-old Customer Service Agent from India. Speaks Hinglish. Voice is relaxed.

##### Commercial Voiceover 1

- 목소리 ID: `en-in-commercial-1`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 23-year-old Influencer from India. Speaks Hinglish. Tone is enthusiastic, engaging, and fun

##### Commercial Voiceover 12

- 목소리 ID: `en-in-commercial-12`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 20-year-old Influencer from India. Speaks Hinglish. Voice is light, airy, and precise

##### Commercial Voiceover 4

- 목소리 ID: `en-in-commercial-4`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 25-year-old Influencer from India. Speaks Hinglish. Currently at a meditation retreat. Tone is professional yet approachable.

##### Commercial Voiceover 6

- 목소리 ID: `en-in-commercial-6`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 26-year-old Influencer from India. Speaks Hinglish. Currently on the phone. Voice is warm and engaging.

##### Commercial Voiceover 7

- 목소리 ID: `en-in-commercial-7`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: medium
- 억양: Indian English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 26-year-old Influencer from India. Speaks Hinglish. Tone is objective, direct, and helpful

##### Commercial Voiceover 9

- 목소리 ID: `en-in-commercial-9`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 26-year-old Influencer from India. Speaks Hinglish. Tone is objective, direct, and helpful

##### Concierge 1

- 목소리 ID: `en-in-concierge-1`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Tour Guide from India. Speaks Hinglish. Currently at an appointment. Voice is warm and engaging.

##### Concierge 11

- 목소리 ID: `en-in-concierge-11`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: medium
- 억양: Indian English
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Executive Assistant from India. Speaks Hinglish. Tone is objective, direct, and helpful

##### Concierge 4

- 목소리 ID: `en-in-concierge-4`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Tour Guide from India. Speaks Hinglish. Voice is light, airy, and precise

##### Concierge 8

- 목소리 ID: `en-in-concierge-8`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Tour Guide from India. Speaks Hinglish. Voice is bright, breezy, and youthful.

##### Concierge 9

- 목소리 ID: `en-in-concierge-9`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 51-year-old Executive Assistant from India. Speaks Hinglish. Voice is crisp and eager.

##### Digital Assistant 1

- 목소리 ID: `en-in-assistant-1`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 40-year-old Sibling from India. Speaks Hinglish. Voice is engaging and empathic.

##### Digital Assistant 10

- 목소리 ID: `en-in-assistant-10`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 37-year-old Friend from India. Speaks Hinglish. Tone is reflective, calm, and reassuring

##### Digital Assistant 11

- 목소리 ID: `en-in-assistant-11`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 39-year-old Parent from India. Speaks Hinglish. Voice is textured, resonant, and soothing.

##### Digital Assistant 4

- 목소리 ID: `en-in-assistant-4`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 42-year-old Sibling from India. Speaks Hinglish. Voice is highly approachable.

##### Digital Assistant 9

- 목소리 ID: `en-in-assistant-9`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: medium
- 억양: Indian English
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 23-year-old Sibling from India. Speaks Hinglish. Tone is peer-to-peer and curious

##### Podcaster 1

- 목소리 ID: `en-in-podcaster-1`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 63-year-old Radio Host from India. Speaks Hinglish. Voice is deep, velvety, and unhurried.

##### Podcaster 3

- 목소리 ID: `en-in-podcaster-3`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 44-year-old Radio Host from India. Speaks Hinglish. Currently on npr. Tone is professional yet approachable.

##### Podcaster 5

- 목소리 ID: `en-in-podcaster-5`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 46-year-old Radio Host from India. Speaks Hinglish. Currently at an appointment. Voice is warm and engaging.

##### Podcaster 7

- 목소리 ID: `en-in-podcaster-7`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 31-year-old Podcast Interviewer from India. Speaks Hinglish. Voice is crisp and eager.

##### Podcaster 9

- 목소리 ID: `en-in-podcaster-9`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 27-year-old Podcast Interviewer from India. Speaks Hinglish. Tone is peer-to-peer and curious

##### Storyteller 11

- 목소리 ID: `en-in-storyteller-11`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 35-year-old Nature Documentary Narrator from India. Speaks Hinglish. Currently on podcast. Sounds confident and clear.

##### Storyteller 2

- 목소리 ID: `en-in-storyteller-2`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 27-year-old Nature Documentary Narrator from India. Speaks Hinglish. Currently on npr. Tone is professional yet approachable.

##### Storyteller 4

- 목소리 ID: `en-in-storyteller-4`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 54-year-old Nature Documentary Narrator from India. Speaks Hinglish. Currently brainstorming in a meeting. Tone is professional yet approachable.

##### Storyteller 6

- 목소리 ID: `en-in-storyteller-6`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 54-year-old Nature Documentary Narrator from India. Speaks Hinglish. Currently brainstorming in a meeting. Tone is professional yet approachable.

##### Storyteller 7

- 목소리 ID: `en-in-storyteller-7`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 53-year-old Nature Documentary Narrator from India. Speaks Hinglish. Currently in an indie film. Voice is warm and engaging.

##### Tech Advisor 11

- 목소리 ID: `en-in-techagent-11`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: medium
- 억양: Indian English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 45-year-old Tech Support Agent from India. Speaks Hinglish. Currently in a bookstore. Sounds confident and clear.

##### Tech Advisor 2

- 목소리 ID: `en-in-techagent-2`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Tech Support Agent from India. Speaks Hinglish. Voice is textured, resonant, and soothing.

##### Tech Advisor 4

- 목소리 ID: `en-in-techagent-4`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 28-year-old Tech Support Agent from India. Speaks Hinglish. Voice is deep, velvety, and unhurried.

##### Tech Advisor 5

- 목소리 ID: `en-in-techagent-5`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Tech Support Agent from India. Speaks Hinglish. Voice is energetic, colorful, and fast

##### Tech Advisor 8

- 목소리 ID: `en-in-techagent-8`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 45-year-old Tech Support Agent from India. Speaks Hinglish. Voice is natural and clear.

##### Training Voiceover 10

- 목소리 ID: `en-in-training-10`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: medium
- 억양: Indian English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 48-year-old Cooking Show Host from India. Speaks Hinglish. Currently in a bookstore. Tone is professional yet approachable.

##### Training Voiceover 11

- 목소리 ID: `en-in-training-11`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 26-year-old Instructional Video Host from India. Speaks Hinglish. Voice is intimate talkshow.

##### Training Voiceover 12

- 목소리 ID: `en-in-training-12`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 64-year-old Cooking Show Host from India. Speaks Hinglish. Voice is intimate talkshow.

##### Training Voiceover 2

- 목소리 ID: `en-in-training-2`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 39-year-old Instructional Video Host from India. Speaks Hinglish. Voice is engaging and empathic.

##### Training Voiceover 4

- 목소리 ID: `en-in-training-4`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 54-year-old Instructional Video Host from India. Speaks Hinglish. Voice is fast-paced, articulate, energetic.

##### Tutor 1

- 목소리 ID: `en-in-tutor-1`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Educational Tutor (Teacher)
- 용도: Conversational / Edu
- 공식 설명: 23-year-old Teacher from India. Speaks Hinglish. Voice is energetic, colorful, and fast

##### Tutor 10

- 목소리 ID: `en-in-tutor-10`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Educational Tutor
- 용도: Conversational / Edu
- 공식 설명: 56-year-old Tutor from India. Speaks Hinglish. Currently on npr. Voice is warm and engaging.

##### Tutor 12

- 목소리 ID: `en-in-tutor-12`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 43-year-old Professor from India. Speaks Hinglish. Currently at an appointment. Sounds confident and clear.

##### Tutor 4

- 목소리 ID: `en-in-tutor-4`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: medium
- 억양: Indian English
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 27-year-old Writing Tutor from India. Speaks Hinglish. Voice is energetic, colorful, and fast

##### Tutor 6

- 목소리 ID: `en-in-tutor-6`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Educational Tutor
- 용도: Conversational / Edu
- 공식 설명: 58-year-old Tutor from India. Speaks Hinglish. Voice is energetic, colorful, and fast

##### Tutor 8

- 목소리 ID: `en-in-tutor-8`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Indian English
- 역할: Coach & Motivational Guide (Mentor)
- 용도: Wellness & Culture
- 공식 설명: 55-year-old Mentor from India. Speaks Hinglish. Voice is deep, velvety, and unhurried.

#### 중성 — 7개

##### Call Center Agent 10

- 목소리 ID: `en-in-csagent-10`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: neutral
- 음높이: high
- 억양: Indian English
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Social Worker from India. Speaks Hinglish. Tone is enthusiastic, engaging, and fun

##### Concierge 12

- 목소리 ID: `en-in-concierge-12`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: neutral
- 음높이: high
- 억양: Indian English
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Tour Guide from India. Speaks Hinglish. Voice is fast-paced, articulate, energetic.

##### Digital Assistant 12

- 목소리 ID: `en-in-assistant-12`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: neutral
- 음높이: high
- 억양: Indian English
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 55-year-old Sibling from India. Speaks Hinglish. Currently in a bookstore. Tone is professional yet approachable.

##### Podcaster 12

- 목소리 ID: `en-in-podcaster-12`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: neutral
- 음높이: high
- 억양: Indian English
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 31-year-old Podcast Interviewer from India. Speaks Hinglish. Voice is light, airy, and precise

##### Storyteller 12

- 목소리 ID: `en-in-storyteller-12`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: neutral
- 음높이: high
- 억양: Indian English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 34-year-old Nature Documentary Narrator from India. Speaks Hinglish. Currently in an oscar winning film. Voice is warm and engaging.

##### Tech Advisor 6

- 목소리 ID: `en-in-techagent-6`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: neutral
- 음높이: medium
- 억양: Indian English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 27-year-old Tech Support Agent from India. Speaks Hinglish. Voice is natural and clear.

##### Training Voiceover 9

- 목소리 ID: `en-in-training-9`
- 유형: prebuilt
- 언어: en-IN
- 지역: IN
- 성별: neutral
- 음높이: medium
- 억양: Indian English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 59-year-old Cooking Show Host from India. Speaks Hinglish. Voice is relaxed.

### 영어·뉴질랜드 (en-NZ) — 27개

#### 여성 — 12개

##### Authoritative Advisor 2

- 목소리 ID: `en-nz-advisor-2`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: female
- 음높이: high
- 억양: Auckland New Zealand English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Lawyer from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Voice is cool, confident, and collaborative.

##### Call Center Agent 2

- 목소리 ID: `en-nz-csagent-2`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: female
- 음높이: low
- 억양: Auckland New Zealand English
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 52-year-old Social Worker from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Currently on podcast. Voice is warm and engaging.

##### Call Center Agent 7

- 목소리 ID: `en-nz-csagent-7`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: female
- 음높이: high
- 억양: Auckland New Zealand English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 60-year-old Customer Service Agent from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Commercial Voiceover 3

- 목소리 ID: `en-nz-commercial-3`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: female
- 음높이: medium
- 억양: Auckland New Zealand English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 27-year-old Influencer from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Voice is energetic, colorful, and fast

##### Concierge 2

- 목소리 ID: `en-nz-concierge-2`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: female
- 음높이: medium
- 억양: Auckland New Zealand English
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 44-year-old Executive Assistant from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Voice is crisp and eager.

##### Digital Assistant 3

- 목소리 ID: `en-nz-assistant-3`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: female
- 음높이: low
- 억양: Auckland New Zealand English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 42-year-old Parent from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Voice is light, airy, and precise

##### Digital Assistant 4

- 목소리 ID: `en-nz-assistant-4`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: female
- 음높이: medium
- 억양: Auckland New Zealand English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 43-year-old Parent from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Voice is deep, velvety, and unhurried.

##### Digital Assistant 5

- 목소리 ID: `en-nz-assistant-5`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: female
- 음높이: medium
- 억양: Auckland New Zealand English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 43-year-old Parent from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Voice is deep, velvety, and unhurried.

##### Podcaster 7

- 목소리 ID: `en-nz-podcaster-7`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: female
- 음높이: low
- 억양: Auckland New Zealand English
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 30-year-old Radio Host from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Currently sitting on couch. Sounds confident and clear.

##### Podcaster 8

- 목소리 ID: `en-nz-podcaster-8`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: female
- 음높이: high
- 억양: Auckland New Zealand English
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 30-year-old Podcast Interviewer from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Currently in an indie film. Voice is warm and engaging.

##### Training Voiceover 3

- 목소리 ID: `en-nz-training-3`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: female
- 음높이: medium
- 억양: Auckland New Zealand English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 33-year-old Instructional Video Host from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Tone is reflective, calm, and reassuring

##### Tutor 6

- 목소리 ID: `en-nz-tutor-6`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: female
- 음높이: low
- 억양: Auckland New Zealand English
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 57-year-old Professor from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Tone is peer-to-peer and curious

#### 남성 — 14개

##### Authoritative Advisor 4

- 목소리 ID: `en-nz-advisor-4`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: male
- 음높이: low
- 억양: Auckland New Zealand English
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Lawyer from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Currently at an appointment. Voice is warm and engaging.

##### Call Center Agent 4

- 목소리 ID: `en-nz-csagent-4`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: male
- 음높이: low
- 억양: Auckland New Zealand English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Customer Service Agent from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Currently sitting on couch. Sounds confident and clear.

##### Call Center Agent 6

- 목소리 ID: `en-nz-csagent-6`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: male
- 음높이: low
- 억양: Auckland New Zealand English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Customer Service Agent from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Voice is comforting someone who is stressed.

##### Commercial Voiceover 1

- 목소리 ID: `en-nz-commercial-1`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: male
- 음높이: low
- 억양: Auckland New Zealand English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 21-year-old Influencer from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Voice is cool, confident, and collaborative.

##### Commercial Voiceover 2

- 목소리 ID: `en-nz-commercial-2`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: male
- 음높이: medium
- 억양: Auckland New Zealand English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 23-year-old Influencer from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Currently on npr. Sounds confident and clear.

##### Concierge 4

- 목소리 ID: `en-nz-concierge-4`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: male
- 음높이: low
- 억양: Auckland New Zealand English
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 65-year-old Tour Guide from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Voice is engaging and empathic.

##### Digital Assistant 1

- 목소리 ID: `en-nz-assistant-1`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: male
- 음높이: low
- 억양: Auckland New Zealand English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 43-year-old Parent from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Voice is clear, medium-pitch, and friendly.

##### Digital Assistant 8

- 목소리 ID: `en-nz-assistant-8`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: male
- 음높이: high
- 억양: Auckland New Zealand English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 30-year-old Parent from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Currently in an indie film. Sounds confident and clear.

##### Tech Advisor 2

- 목소리 ID: `en-nz-techagent-2`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: male
- 음높이: low
- 억양: Auckland New Zealand English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Architect from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Currently at an appointment. Voice is warm and engaging.

##### Tech Advisor 7

- 목소리 ID: `en-nz-techagent-7`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: male
- 음높이: low
- 억양: Auckland New Zealand English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 63-year-old Tech Support Agent from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Voice is light, airy, and precise

##### Training Voiceover 2

- 목소리 ID: `en-nz-training-2`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: male
- 음높이: low
- 억양: Auckland New Zealand English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 41-year-old Instructional Video Host from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Currently on npr. Sounds confident and clear.

##### Tutor 2

- 목소리 ID: `en-nz-tutor-2`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: male
- 음높이: low
- 억양: Auckland New Zealand English
- 역할: Educational Tutor
- 용도: Conversational / Edu
- 공식 설명: 30-year-old Tutor from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Currently at an appointment. Voice is warm and engaging.

##### Tutor 7

- 목소리 ID: `en-nz-tutor-7`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: male
- 음높이: low
- 억양: Auckland New Zealand English
- 역할: Coach & Motivational Guide (Nutritionist)
- 용도: Wellness & Culture
- 공식 설명: 56-year-old Nutritionist from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Voice is cool, confident, and collaborative.

##### Tutor 8

- 목소리 ID: `en-nz-tutor-8`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: male
- 음높이: low
- 억양: Auckland New Zealand English
- 역할: Coach & Motivational Guide (Nutritionist)
- 용도: Wellness & Culture
- 공식 설명: 55-year-old Nutritionist from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Tone is peer-to-peer and curious

#### 중성 — 1개

##### Call Center Agent 8

- 목소리 ID: `en-nz-csagent-8`
- 유형: prebuilt
- 언어: en-NZ
- 지역: NZ
- 성별: neutral
- 음높이: high
- 억양: Auckland New Zealand English
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Customer Service Agent from Auckland New Zealand. Speaks with an Auckland New Zealand English accent. Voice is engaging and empathic.

### 영어·미국 (en-US) — 185개

#### 여성 — 90개

##### Authoritative Advisor 1

- 목소리 ID: `en-us-advisor-1`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: Northwest
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 65-year-old Financial Advisor from the Northwest. Speaks with a Northwest accent. Currently at a meditation retreat. Tone is professional yet approachable.

##### Authoritative Advisor 10

- 목소리 ID: `en-us-advisor-10`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: West Coast
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 51-year-old Researcher from the West Coast. Speaks with a West Coast accent. Currently in an indie film. Sounds confident and clear.

##### Authoritative Advisor 11

- 목소리 ID: `en-us-advisor-11`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: West Coast
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Financial Advisor from the West Coast. Speaks with a West Coast accent. Tone is objective, direct, and helpful

##### Authoritative Advisor 2

- 목소리 ID: `en-us-advisor-2`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: Northwest
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Financial Advisor from the Northwest. Speaks with a Northwest accent. Voice is relaxed.

##### Authoritative Advisor 3

- 목소리 ID: `en-us-advisor-3`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: East Coast
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 60-year-old Financial Advisor from the East Coast. Speaks with an East Coast accent. Voice is engaging and empathic.

##### Authoritative Advisor 9

- 목소리 ID: `en-us-advisor-9`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: Midwest
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 48-year-old Researcher from the Midwest. Speaks with a Midwest accent. Voice is fast-paced, articulate, energetic.

##### Call Center Agent 10

- 목소리 ID: `en-us-csagent-10`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: Gulf Coast
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Customer Service Agent from the Gulf Coast. Speaks with a Gulf Coast accent. Currently brainstorming in a meeting. Tone is professional yet approachable.

##### Call Center Agent 11

- 목소리 ID: `en-us-csagent-11`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: Midwest
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 28-year-old Social Worker from the Midwest. Speaks with a Midwest accent. Currently at an appointment. Tone is professional yet approachable.

##### Call Center Agent 14

- 목소리 ID: `en-us-csagent-14`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: Northwest
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 57-year-old Sales Associate from the Northwest. Speaks with a Northwest accent. Currently in an indie film. Sounds confident and clear.

##### Call Center Agent 2

- 목소리 ID: `en-us-csagent-2`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: Northwest
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 51-year-old Customer Service Agent from the Northwest. Speaks with a Northwest accent. Voice is crisp and eager.

##### Call Center Agent 4

- 목소리 ID: `en-us-csagent-4`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: Northwest
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 63-year-old Customer Service Agent from the Northwest. Speaks with a Northwest accent. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Call Center Agent 5

- 목소리 ID: `en-us-csagent-5`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: East Coast
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Customer Service Agent from the East Coast. Speaks with an East Coast accent. Voice is deep, velvety, and unhurried.

##### Call Center Agent 6

- 목소리 ID: `en-us-csagent-6`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: West Coast
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 57-year-old Customer Service Agent from the West Coast. Speaks with a West Coast accent. Voice is crisp and eager.

##### Call Center Agent 7

- 목소리 ID: `en-us-csagent-7`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: Northwest
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Customer Service Agent from the Northwest. Speaks with a Northwest accent. Voice is light, airy, and precise

##### Cleo

- 목소리 ID: `en-us-cleo`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: East Coast
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Hotel Concierge from the East Coast. Speaks with an East Coast accent. Currently on the phone. Voice is warm and engaging.

##### Commercial Voiceover 10

- 목소리 ID: `en-us-commercial-10`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: Midwest
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 29-year-old Influencer from the Midwest. Speaks with a Midwest accent. Currently on npr. Sounds confident and clear.

##### Commercial Voiceover 11

- 목소리 ID: `en-us-commercial-11`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: Northwest
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 63-year-old Fashion Consultant from the Northwest. Speaks with a Northwest accent. Voice is resonant and witty.

##### Commercial Voiceover 14

- 목소리 ID: `en-us-commercial-14`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: East Coast
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 48-year-old Fashion Consultant from the East Coast. Speaks with an East Coast accent. Voice is relaxed.

##### Commercial Voiceover 15

- 목소리 ID: `en-us-commercial-15`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: East Coast
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 25-year-old Fashion Consultant from the East Coast. Speaks with an East Coast accent. Voice is light, airy, and precise

##### Commercial Voiceover 16

- 목소리 ID: `en-us-commercial-16`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: East Coast
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 32-year-old Fashion Consultant from the East Coast. Speaks with an East Coast accent. Tone is objective, direct, and helpful

##### Commercial Voiceover 18

- 목소리 ID: `en-us-commercial-18`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: East Coast
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 33-year-old Fashion Consultant from the East Coast. Speaks with an East Coast accent. Voice is relaxed.

##### Commercial Voiceover 2

- 목소리 ID: `en-us-commercial-2`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: Inland Southern
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 58-year-old Fashion Consultant from the Inland South. Speaks with an Inland Southern accent. Currently sitting next to you on an airplane. Sounds confident and clear.

##### Commercial Voiceover 7

- 목소리 ID: `en-us-commercial-7`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: Northwest
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 28-year-old Influencer from the Northwest. Speaks with a Northwest accent. Currently at a meditation retreat. Sounds confident and clear.

##### Concierge 11

- 목소리 ID: `en-us-concierge-11`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: Inland Southern
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 62-year-old Executive Assistant from the Inland South. Speaks with an Inland Southern accent. Tone is conversational, slightly dry humor, and warm

##### Concierge 13

- 목소리 ID: `en-us-concierge-13`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: Inland Southern
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Executive Assistant from the Inland South. Speaks with an Inland Southern accent. Currently sitting on couch. Voice is warm and engaging.

##### Concierge 5

- 목소리 ID: `en-us-concierge-5`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: West Coast
- 역할: Concierge & EA
- 용도: Enterprise Agent
- 공식 설명: 53-year-old Concierge from the West Coast. Speaks with a West Coast accent. Tone is objective, direct, and helpful

##### Concierge 6

- 목소리 ID: `en-us-concierge-6`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: East Coast
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Hotel Concierge from the East Coast. Speaks with an East Coast accent. Currently on the phone. Voice is warm and engaging.

##### Concierge 7

- 목소리 ID: `en-us-concierge-7`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: Northwest
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Executive Assistant from the Northwest. Speaks with a Northwest accent. Currently in an oscar winning film. Voice is warm and engaging.

##### Concierge 8

- 목소리 ID: `en-us-concierge-8`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: Inland Southern
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 44-year-old Tour Guide from the Inland South. Speaks with an Inland Southern accent. Currently sitting on couch. Sounds confident and clear.

##### Concierge 9

- 목소리 ID: `en-us-concierge-9`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: East Coast
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Tour Guide from the East Coast. Speaks with an East Coast accent. Voice is highly approachable.

##### Digital Assistant 1

- 목소리 ID: `en-us-assistant-1`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: Midwest
- 역할: Companion & Peer / Digital Assistant (Mentor)
- 용도: Conversational / Edu
- 공식 설명: 29-year-old Mentor from the Midwest. Speaks with a Midwest accent. Voice is textured, resonant, and soothing.

##### Digital Assistant 11

- 목소리 ID: `en-us-assistant-11`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: Gulf Coast
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 41-year-old Parent from the Gulf Coast. Speaks with a Gulf Coast accent. Tone is reflective, calm, and reassuring

##### Digital Assistant 12

- 목소리 ID: `en-us-assistant-12`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: Midwest
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 39-year-old Parent from the Midwest. Speaks with a Midwest accent. Currently sitting next to you on an airplane. Sounds confident and clear.

##### Digital Assistant 13

- 목소리 ID: `en-us-assistant-13`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: Inland Southern
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 51-year-old Sibling from the Inland South. Speaks with an Inland Southern accent. Voice is fast-paced, articulate, energetic.

##### Digital Assistant 14

- 목소리 ID: `en-us-assistant-14`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: Inland Southern
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 42-year-old Sibling from the Inland South. Speaks with an Inland Southern accent. Currently in an oscar winning film. Tone is professional yet approachable.

##### Digital Assistant 15

- 목소리 ID: `en-us-assistant-15`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: Inland Southern
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 57-year-old Sibling from the Inland South. Speaks with an Inland Southern accent. Voice is cool, confident, and collaborative.

##### Digital Assistant 3

- 목소리 ID: `en-us-assistant-3`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: Northwest
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 22-year-old Sibling from the Northwest. Speaks with a Northwest accent. Voice is crisp and eager.

##### Digital Assistant 4

- 목소리 ID: `en-us-assistant-4`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: Midwest
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 41-year-old Parent from the Midwest. Speaks with a Midwest accent. Currently in an indie film. Tone is professional yet approachable.

##### Digital Assistant 5

- 목소리 ID: `en-us-assistant-5`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: East Coast
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 33-year-old Parent from the East Coast. Speaks with an East Coast accent. Tone is enthusiastic, engaging, and fun

##### Digital Assistant 6

- 목소리 ID: `en-us-assistant-6`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: Gulf Coast
- 역할: Storyteller & Narrator (Aunt/Uncle)
- 용도: Content & Media
- 공식 설명: 50-year-old Aunt/Uncle from the Gulf Coast. Speaks with a Gulf Coast accent. Voice is crisp and eager.

##### Digital Assistant 7

- 목소리 ID: `en-us-assistant-7`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: Inland Southern
- 역할: Storyteller & Narrator (Aunt/Uncle)
- 용도: Content & Media
- 공식 설명: 31-year-old Aunt/Uncle from the Inland South. Speaks with an Inland Southern accent. Currently sitting on couch. Voice is warm and engaging.

##### Digital Assistant 8

- 목소리 ID: `en-us-assistant-8`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: West Coast
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 47-year-old Parent from the West Coast. Speaks with a West Coast accent. Voice is laid-back, encouraging, and chill.

##### Digital Assistant 9

- 목소리 ID: `en-us-assistant-9`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: East Coast
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 42-year-old Parent from the East Coast. Speaks with an East Coast accent. Voice is fast-paced, articulate, energetic.

##### Enya

- 목소리 ID: `en-us-enya`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: Gulf Coast
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 28-year-old Tech Support Agent from the Gulf Coast. Speaks with a Gulf Coast accent. Currently in an oscar winning film. Tone is professional yet approachable.

##### Fola

- 목소리 ID: `en-us-fola`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: Northwest
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Customer Service Agent from the Northwest. Speaks with a Northwest accent. Voice is clear, medium-pitch, and friendly.

##### Hali

- 목소리 ID: `en-us-hali`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: Midwest
- 역할: Character & Theatrical (Person Giving Driving Directions)
- 용도: Entertainment & Gaming
- 공식 설명: 43-year-old Person Giving Driving Directions from the Midwest. Speaks with a Midwest accent. Voice is comforting someone who is stressed.

##### Jori

- 목소리 ID: `en-us-jori`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: Northwest
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 38-year-old Radio Host from the Northwest. Speaks with a Northwest accent. Currently sitting on couch. Tone is professional yet approachable.

##### Kira

- 목소리 ID: `en-us-kira`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: West Coast
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 46-year-old Instructional Video Host from the West Coast. Speaks with a West Coast accent. Voice is cool, confident, and collaborative.

##### Lora

- 목소리 ID: `en-us-lora`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: Inland Southern
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Executive Assistant from the Inland South. Speaks with an Inland Southern accent. Voice is clear, medium-pitch, and friendly.

##### Lumi

- 목소리 ID: `en-us-lumi`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: Gulf Coast
- 역할: Educational Tutor (Teacher)
- 용도: Conversational / Edu
- 공식 설명: 61-year-old Teacher from the Gulf Coast. Speaks with a Gulf Coast accent. Currently on the phone. Tone is professional yet approachable.

##### Nika

- 목소리 ID: `en-us-nika`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: West Coast
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 27-year-old Influencer from the West Coast. Speaks with a West Coast accent. Currently brainstorming in a meeting. Tone is professional yet approachable.

##### Nyla

- 목소리 ID: `en-us-nyla`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: Northwest
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Architect from the Northwest. Speaks with a Northwest accent. Currently sitting next to you on an airplane. Tone is professional yet approachable.

##### Podcaster 10

- 목소리 ID: `en-us-podcaster-10`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: Midwest
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 37-year-old Podcast Interviewer from the Midwest. Speaks with a Midwest accent. Tone is objective, direct, and helpful

##### Podcaster 11

- 목소리 ID: `en-us-podcaster-11`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: West Coast
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 57-year-old Radio Host from the West Coast. Speaks with a West Coast accent. Voice is natural and clear.

##### Podcaster 2

- 목소리 ID: `en-us-podcaster-2`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: East Coast
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 27-year-old Podcast Interviewer from the East Coast. Speaks with an East Coast accent. Currently on npr. Voice is warm and engaging.

##### Podcaster 3

- 목소리 ID: `en-us-podcaster-3`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: West Coast
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 65-year-old Podcast Interviewer from the West Coast. Speaks with a West Coast accent. Voice is fast-paced, articulate, energetic.

##### Podcaster 8

- 목소리 ID: `en-us-podcaster-8`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: Gulf Coast
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 44-year-old Podcast Interviewer from the Gulf Coast. Speaks with a Gulf Coast accent. Currently in an indie film. Tone is professional yet approachable.

##### Rina

- 목소리 ID: `en-us-rina`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: Inland Southern
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 24-year-old Cooking Show Host from the Inland South. Speaks with an Inland Southern accent. Voice is relaxed.

##### Sami

- 목소리 ID: `en-us-sami`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: East Coast
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 64-year-old Nature Documentary Narrator from the East Coast. Speaks with an East Coast accent. Voice is cool, confident, and collaborative.

##### Sola

- 목소리 ID: `en-us-sola`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: West Coast
- 역할: Educational Tutor (Teacher)
- 용도: Conversational / Edu
- 공식 설명: 31-year-old Teacher from the West Coast. Speaks with a West Coast accent. Voice is relaxed.

##### Storyteller 1

- 목소리 ID: `en-us-storyteller-1`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: East Coast
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 57-year-old Storyteller from the East Coast. Speaks with an East Coast accent. Currently sitting next to you on the bus. Voice is warm and engaging.

##### Storyteller 11

- 목소리 ID: `en-us-storyteller-11`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: East Coast
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 53-year-old Philosopher from the East Coast. Speaks with an East Coast accent. Voice is light, airy, and precise

##### Storyteller 6

- 목소리 ID: `en-us-storyteller-6`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: Gulf Coast
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 56-year-old Nature Documentary Narrator from the Gulf Coast. Speaks with a Gulf Coast accent. Tone is objective, direct, and helpful

##### Tari

- 목소리 ID: `en-us-tari`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: Midwest
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 35-year-old Parent from the Midwest. Speaks with a Midwest accent. Currently in an oscar winning film. Sounds confident and clear.

##### Tavi

- 목소리 ID: `en-us-tavi`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: Gulf Coast
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 28-year-old Fashion Consultant from the Gulf Coast. Speaks with a Gulf Coast accent. Voice is intimate talkshow.

##### Tech Advisor 1

- 목소리 ID: `en-us-techagent-1`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: East Coast
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 60-year-old Tech Support Agent from the East Coast. Speaks with an East Coast accent. Currently on npr. Tone is professional yet approachable.

##### Tech Advisor 11

- 목소리 ID: `en-us-techagent-11`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: East Coast
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Tech Support Agent from the East Coast. Speaks with an East Coast accent. Tone is objective, direct, and helpful

##### Tech Advisor 2

- 목소리 ID: `en-us-techagent-2`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: East Coast
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Architect from the East Coast. Speaks with an East Coast accent. Currently at a meditation retreat. Tone is professional yet approachable.

##### Tech Advisor 5

- 목소리 ID: `en-us-techagent-5`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: Gulf Coast
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Tech Support Agent from the Gulf Coast. Speaks with a Gulf Coast accent. Currently in a bookstore. Tone is professional yet approachable.

##### Tech Advisor 6

- 목소리 ID: `en-us-techagent-6`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: East Coast
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Tech Support Agent from the East Coast. Speaks with an East Coast accent. Currently in an oscar winning film. Sounds confident and clear.

##### Tech Advisor 7

- 목소리 ID: `en-us-techagent-7`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: Inland Southern
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Architect from the Inland South. Speaks with an Inland Southern accent. Currently at an appointment. Voice is warm and engaging.

##### Tova

- 목소리 ID: `en-us-tova`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: Northwest
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Lawyer from the Northwest. Speaks with a Northwest accent. Voice is textured, resonant, and soothing.

##### Training Voiceover 1

- 목소리 ID: `en-us-training-1`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: East Coast
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 47-year-old Cooking Show Host from the East Coast. Speaks with an East Coast accent. Currently at a meditation retreat. Voice is warm and engaging.

##### Training Voiceover 11

- 목소리 ID: `en-us-training-11`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: Midwest
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 22-year-old Cooking Show Host from the Midwest. Speaks with a Midwest accent. Voice is cool, confident, and collaborative.

##### Training Voiceover 4

- 목소리 ID: `en-us-training-4`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: East Coast
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 26-year-old Cooking Show Host from the East Coast. Speaks with an East Coast accent. Voice is fast-paced, articulate, energetic.

##### Training Voiceover 7

- 목소리 ID: `en-us-training-7`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: East Coast
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 29-year-old Cooking Show Host from the East Coast. Speaks with an East Coast accent. Tone is objective, direct, and helpful

##### Training Voiceover 8

- 목소리 ID: `en-us-training-8`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: Gulf Coast
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 23-year-old Instructional Video Host from the Gulf Coast. Speaks with a Gulf Coast accent. Voice is intimate talkshow.

##### Tutor 10

- 목소리 ID: `en-us-tutor-10`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: Inland Southern
- 역할: Educational Tutor (Music Teacher)
- 용도: Conversational / Edu
- 공식 설명: 22-year-old Music Teacher from the Inland South. Speaks with an Inland Southern accent. Voice is natural and clear.

##### Tutor 11

- 목소리 ID: `en-us-tutor-11`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: Gulf Coast
- 역할: Educational Tutor (Teacher)
- 용도: Conversational / Edu
- 공식 설명: 24-year-old Teacher from the Gulf Coast. Speaks with a Gulf Coast accent. Currently on npr. Sounds confident and clear.

##### Tutor 13

- 목소리 ID: `en-us-tutor-13`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: Northwest
- 역할: Educational Tutor (Teacher)
- 용도: Conversational / Edu
- 공식 설명: 59-year-old Teacher from the Northwest. Speaks with a Northwest accent. Currently on the phone. Sounds confident and clear.

##### Tutor 14

- 목소리 ID: `en-us-tutor-14`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: Northwest
- 역할: Tech Support Agent / Tech Advisor (Librarian)
- 용도: Enterprise Agent
- 공식 설명: 61-year-old Librarian from the Northwest. Speaks with a Northwest accent. Voice is clear, medium-pitch, and friendly.

##### Tutor 17

- 목소리 ID: `en-us-tutor-17`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: low
- 억양: Northwest
- 역할: Educational Tutor (Teacher)
- 용도: Conversational / Edu
- 공식 설명: 26-year-old Teacher from the Northwest. Speaks with a Northwest accent. Tone is peer-to-peer and curious

##### Tutor 18

- 목소리 ID: `en-us-tutor-18`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: Northwest
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 47-year-old Chess Instructor from the Northwest. Speaks with a Northwest accent. Tone is objective, direct, and helpful

##### Tutor 21

- 목소리 ID: `en-us-tutor-21`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: Northwest
- 역할: Tech Support Agent / Tech Advisor (Librarian)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Librarian from the Northwest. Speaks with a Northwest accent. Voice is textured, resonant, and soothing.

##### Tutor 23

- 목소리 ID: `en-us-tutor-23`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: West Coast
- 역할: Tech Support Agent / Tech Advisor (Librarian)
- 용도: Enterprise Agent
- 공식 설명: 55-year-old Librarian from the West Coast. Speaks with a West Coast accent. Currently sitting next to you on the bus. Sounds confident and clear.

##### Tutor 5

- 목소리 ID: `en-us-tutor-5`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: East Coast
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 57-year-old Writing Tutor from the East Coast. Speaks with an East Coast accent. Currently on podcast. Voice is warm and engaging.

##### Tutor 9

- 목소리 ID: `en-us-tutor-9`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: West Coast
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 65-year-old Writing Tutor from the West Coast. Speaks with a West Coast accent. Voice is light, airy, and precise

##### Veda

- 목소리 ID: `en-us-veda`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: high
- 억양: Inland Southern
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 30-year-old Radio Host from the Inland South. Speaks with an Inland Southern accent. Voice is highly approachable.

##### Zali

- 목소리 ID: `en-us-zali`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: Northwest
- 역할: Character & Theatrical (Comedian)
- 용도: Entertainment & Gaming
- 공식 설명: 62-year-old Comedian from the Northwest. Speaks with a Northwest accent. Voice is engaging and empathic.

##### Zuri

- 목소리 ID: `en-us-zuri`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: female
- 음높이: medium
- 억양: East Coast
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Financial Advisor from the East Coast. Speaks with an East Coast accent. Voice is natural and clear.

#### 남성 — 92개

##### Arlo

- 목소리 ID: `en-us-arlo`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Northwest
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 61-year-old Tour Guide from the Northwest. Speaks with a Northwest accent. Currently sitting on couch. Sounds confident and clear.

##### Authoritative Advisor 4

- 목소리 ID: `en-us-advisor-4`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Gulf Coast
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Financial Advisor from the Gulf Coast. Speaks with a Gulf Coast accent. Voice is relaxed.

##### Authoritative Advisor 5

- 목소리 ID: `en-us-advisor-5`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Inland Southern
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 51-year-old Financial Advisor from the Inland South. Speaks with an Inland Southern accent. Currently in an oscar winning film. Voice is warm and engaging.

##### Authoritative Advisor 6

- 목소리 ID: `en-us-advisor-6`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Gulf Coast
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Lawyer from the Gulf Coast. Speaks with a Gulf Coast accent. Voice is comforting someone who is stressed.

##### Authoritative Advisor 7

- 목소리 ID: `en-us-advisor-7`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Inland Southern
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 26-year-old Researcher from the Inland South. Speaks with an Inland Southern accent. Voice is fast-paced, articulate, energetic.

##### Authoritative Advisor 8

- 목소리 ID: `en-us-advisor-8`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: medium
- 억양: Midwest
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 51-year-old Researcher from the Midwest. Speaks with a Midwest accent. Voice is fast-paced, articulate, energetic.

##### Bodi

- 목소리 ID: `en-us-bodi`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: West Coast
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 55-year-old Chess Instructor from the West Coast. Speaks with a West Coast accent. Voice is intimate talkshow.

##### Brio

- 목소리 ID: `en-us-brio`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: West Coast
- 역할: News & Podcast Host / Podcaster (Journalist)
- 용도: Content & Media
- 공식 설명: 29-year-old Journalist from the West Coast. Speaks with a West Coast accent. Voice is intimate talkshow.

##### Call Center Agent 1

- 목소리 ID: `en-us-csagent-1`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Midwest
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 54-year-old Customer Service Agent from the Midwest. Speaks with a Midwest accent. Currently sitting on couch. Tone is professional yet approachable.

##### Call Center Agent 12

- 목소리 ID: `en-us-csagent-12`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: West Coast
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Customer Service Agent from the West Coast. Speaks with a West Coast accent. Currently at an appointment. Sounds confident and clear.

##### Call Center Agent 13

- 목소리 ID: `en-us-csagent-13`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Inland Southern
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 26-year-old Customer Service Agent from the Inland South. Speaks with an Inland Southern accent. Currently at an appointment. Tone is professional yet approachable.

##### Call Center Agent 15

- 목소리 ID: `en-us-csagent-15`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Inland Southern
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 64-year-old Sales Associate from the Inland South. Speaks with an Inland Southern accent. Currently sitting next to you on an airplane. Voice is warm and engaging.

##### Call Center Agent 3

- 목소리 ID: `en-us-csagent-3`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Northwest
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Customer Service Agent from the Northwest. Speaks with a Northwest accent. Voice is relaxed.

##### Call Center Agent 8

- 목소리 ID: `en-us-csagent-8`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Social Worker from the East Coast. Speaks with an East Coast accent. Currently at an appointment. Sounds confident and clear.

##### Call Center Agent 9

- 목소리 ID: `en-us-csagent-9`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Customer Service Agent from the East Coast. Speaks with an East Coast accent. Voice is fast-paced, articulate, energetic.

##### Commercial Voiceover 1

- 목소리 ID: `en-us-commercial-1`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Gulf Coast
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 23-year-old Influencer from the Gulf Coast. Speaks with a Gulf Coast accent. Tone is reflective, calm, and reassuring

##### Commercial Voiceover 12

- 목소리 ID: `en-us-commercial-12`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: medium
- 억양: Inland Southern
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 22-year-old Fashion Consultant from the Inland South. Speaks with an Inland Southern accent. Tone is peer-to-peer and curious

##### Commercial Voiceover 13

- 목소리 ID: `en-us-commercial-13`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Northwest
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 47-year-old Fashion Consultant from the Northwest. Speaks with a Northwest accent. Tone is objective, direct, and helpful

##### Commercial Voiceover 17

- 목소리 ID: `en-us-commercial-17`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: medium
- 억양: Gulf Coast
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 47-year-old Fashion Consultant from the Gulf Coast. Speaks with a Gulf Coast accent. Voice is fast-paced, articulate, energetic.

##### Commercial Voiceover 3

- 목소리 ID: `en-us-commercial-3`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 59-year-old Fashion Consultant from the East Coast. Speaks with an East Coast accent. Currently in an indie film. Sounds confident and clear.

##### Commercial Voiceover 4

- 목소리 ID: `en-us-commercial-4`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: medium
- 억양: East Coast
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 34-year-old Fashion Consultant from the East Coast. Speaks with an East Coast accent. Currently in a bookstore. Sounds confident and clear.

##### Commercial Voiceover 5

- 목소리 ID: `en-us-commercial-5`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 59-year-old Fashion Consultant from the East Coast. Speaks with an East Coast accent. Tone is objective, direct, and helpful

##### Commercial Voiceover 6

- 목소리 ID: `en-us-commercial-6`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Northwest
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 23-year-old Influencer from the Northwest. Speaks with a Northwest accent. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Commercial Voiceover 8

- 목소리 ID: `en-us-commercial-8`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Gulf Coast
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 25-year-old Influencer from the Gulf Coast. Speaks with a Gulf Coast accent. Currently on npr. Tone is professional yet approachable.

##### Commercial Voiceover 9

- 목소리 ID: `en-us-commercial-9`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Midwest
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 20-year-old Influencer from the Midwest. Speaks with a Midwest accent. Currently sitting on couch. Tone is professional yet approachable.

##### Concierge 1

- 목소리 ID: `en-us-concierge-1`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: West Coast
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Hotel Concierge from the West Coast. Speaks with a West Coast accent. Voice is natural and clear.

##### Concierge 10

- 목소리 ID: `en-us-concierge-10`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Tour Guide from the East Coast. Speaks with an East Coast accent. Voice is deep, velvety, and unhurried.

##### Concierge 12

- 목소리 ID: `en-us-concierge-12`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Inland Southern
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 29-year-old Executive Assistant from the Inland South. Speaks with an Inland Southern accent. Currently on npr. Voice is warm and engaging.

##### Concierge 2

- 목소리 ID: `en-us-concierge-2`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Gulf Coast
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Hotel Concierge from the Gulf Coast. Speaks with a Gulf Coast accent. Voice is clear, medium-pitch, and friendly.

##### Concierge 3

- 목소리 ID: `en-us-concierge-3`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: medium
- 억양: West Coast
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 62-year-old Hotel Concierge from the West Coast. Speaks with a West Coast accent. Voice is light, airy, and precise

##### Concierge 4

- 목소리 ID: `en-us-concierge-4`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Midwest
- 역할: Concierge & EA (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Event Planner from the Midwest. Speaks with a Midwest accent. Voice is energetic, colorful, and fast

##### Cruz

- 목소리 ID: `en-us-cruz`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Northwest
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Lawyer from the Northwest. Speaks with a Northwest accent. Currently in a bookstore. Tone is professional yet approachable.

##### Daro

- 목소리 ID: `en-us-daro`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Northwest
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 26-year-old Customer Service Agent from the Northwest. Speaks with a Northwest accent. Currently in an oscar winning film. Sounds confident and clear.

##### Digital Assistant 10

- 목소리 ID: `en-us-assistant-10`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Northwest
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 55-year-old Sibling from the Northwest. Speaks with a Northwest accent. Currently brainstorming in a meeting. Voice is warm and engaging.

##### Digital Assistant 2

- 목소리 ID: `en-us-assistant-2`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Inland Southern
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 31-year-old Podcast Interviewer from the Inland South. Speaks with an Inland Southern accent. Currently on the phone. Tone is professional yet approachable.

##### Elio

- 목소리 ID: `en-us-elio`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: medium
- 억양: East Coast
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 45-year-old Lawyer from the East Coast. Speaks with an East Coast accent. Voice is comforting someone who is stressed.

##### Enzo

- 목소리 ID: `en-us-enzo`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: West Coast
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 62-year-old Storyteller from the West Coast. Speaks with a West Coast accent. Voice is crisp and eager.

##### Finn

- 목소리 ID: `en-us-finn`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Northwest
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 23-year-old Hotel Concierge from the Northwest. Speaks with a Northwest accent. Currently in an indie film. Tone is professional yet approachable.

##### Gero

- 목소리 ID: `en-us-gero`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Inland Southern
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 22-year-old Sibling from the Inland South. Speaks with an Inland Southern accent. Voice is clear, medium-pitch, and friendly.

##### Jett

- 목소리 ID: `en-us-jett`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 61-year-old Tech Support Agent from the East Coast. Speaks with an East Coast accent. Voice is engaging and empathic.

##### Knox

- 목소리 ID: `en-us-knox`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 61-year-old Tech Support Agent from the East Coast. Speaks with an East Coast accent. Tone is conversational, slightly dry humor, and warm

##### Koda

- 목소리 ID: `en-us-koda`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Inland Southern
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 21-year-old Influencer from the Inland South. Speaks with an Inland Southern accent. Tone is objective, direct, and helpful

##### Ludo

- 목소리 ID: `en-us-ludo`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Northwest
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 46-year-old Instructional Video Host from the Northwest. Speaks with a Northwest accent. Currently sitting next to you on an airplane. Sounds confident and clear.

##### Mako

- 목소리 ID: `en-us-mako`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Northwest
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 45-year-old Instructional Video Host from the Northwest. Speaks with a Northwest accent. Voice is energetic, colorful, and fast

##### Milo

- 목소리 ID: `en-us-milo`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Customer Service Agent from the East Coast. Speaks with an East Coast accent. Voice is intimate talkshow.

##### Neno

- 목소리 ID: `en-us-neno`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Inland Southern
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 29-year-old Sibling from the Inland South. Speaks with an Inland Southern accent. Voice is deep, velvety, and unhurried.

##### Olin

- 목소리 ID: `en-us-olin`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Inland Southern
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 44-year-old Parent from the Inland South. Speaks with an Inland Southern accent. Voice is light, airy, and precise

##### Podcaster 1

- 목소리 ID: `en-us-podcaster-1`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Northwest
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 60-year-old Radio Host from the Northwest. Speaks with a Northwest accent. Voice is deep, velvety, and unhurried.

##### Podcaster 12

- 목소리 ID: `en-us-podcaster-12`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 49-year-old Podcast Interviewer from the East Coast. Speaks with an East Coast accent. Currently in an oscar winning film. Sounds confident and clear.

##### Podcaster 4

- 목소리 ID: `en-us-podcaster-4`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Northwest
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 34-year-old Radio Host from the Northwest. Speaks with a Northwest accent. Currently at an appointment. Sounds confident and clear.

##### Podcaster 5

- 목소리 ID: `en-us-podcaster-5`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Northwest
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 44-year-old Radio Host from the Northwest. Speaks with a Northwest accent. Tone is enthusiastic, engaging, and fun

##### Podcaster 6

- 목소리 ID: `en-us-podcaster-6`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Inland Southern
- 역할: News & Podcast Host / Podcaster (Journalist)
- 용도: Content & Media
- 공식 설명: 26-year-old Journalist from the Inland South. Speaks with an Inland Southern accent. Voice is cool, confident, and collaborative.

##### Podcaster 7

- 목소리 ID: `en-us-podcaster-7`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 36-year-old Podcast Interviewer from the East Coast. Speaks with an East Coast accent. Currently sitting next to you on an airplane. Tone is professional yet approachable.

##### Podcaster 9

- 목소리 ID: `en-us-podcaster-9`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Inland Southern
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 32-year-old Podcast Interviewer from the Inland South. Speaks with an Inland Southern accent. Tone is objective, direct, and helpful

##### Rami

- 목소리 ID: `en-us-rami`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 29-year-old Podcast Interviewer from the East Coast. Speaks with an East Coast accent. Currently in an indie film. Tone is professional yet approachable.

##### Riko

- 목소리 ID: `en-us-riko`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 47-year-old Nature Documentary Narrator from the East Coast. Speaks with an East Coast accent. Currently in a bookstore. Sounds confident and clear.

##### Storyteller 10

- 목소리 ID: `en-us-storyteller-10`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Northwest
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 43-year-old Philosopher from the Northwest. Speaks with a Northwest accent. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Storyteller 12

- 목소리 ID: `en-us-storyteller-12`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: West Coast
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 65-year-old Storyteller from the West Coast. Speaks with a West Coast accent. Voice is intimate talkshow.

##### Storyteller 13

- 목소리 ID: `en-us-storyteller-13`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 42-year-old Philosopher from the East Coast. Speaks with an East Coast accent. Voice is intimate talkshow.

##### Storyteller 14

- 목소리 ID: `en-us-storyteller-14`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 28-year-old Nature Documentary Narrator from the East Coast. Speaks with an East Coast accent. Voice is cool, confident, and collaborative.

##### Storyteller 3

- 목소리 ID: `en-us-storyteller-3`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Gulf Coast
- 역할: Character & Theatrical (Reality TV Star)
- 용도: Entertainment & Gaming
- 공식 설명: 22-year-old Reality TV Star from the Gulf Coast. Speaks with a Gulf Coast accent. Voice is comforting someone who is stressed.

##### Storyteller 4

- 목소리 ID: `en-us-storyteller-4`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Gulf Coast
- 역할: Character & Theatrical (Reality TV Star)
- 용도: Entertainment & Gaming
- 공식 설명: 28-year-old Reality TV Star from the Gulf Coast. Speaks with a Gulf Coast accent. Currently at a meditation retreat. Tone is professional yet approachable.

##### Storyteller 5

- 목소리 ID: `en-us-storyteller-5`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Gulf Coast
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 25-year-old Nature Documentary Narrator from the Gulf Coast. Speaks with a Gulf Coast accent. Currently brainstorming in a meeting. Tone is professional yet approachable.

##### Storyteller 7

- 목소리 ID: `en-us-storyteller-7`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: high
- 억양: Gulf Coast
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 40-year-old Storyteller from the Gulf Coast. Speaks with a Gulf Coast accent. Tone is objective, direct, and helpful

##### Storyteller 8

- 목소리 ID: `en-us-storyteller-8`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 40-year-old Nature Documentary Narrator from the East Coast. Speaks with an East Coast accent. Currently on podcast. Tone is professional yet approachable.

##### Storyteller 9

- 목소리 ID: `en-us-storyteller-9`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 55-year-old Nature Documentary Narrator from the East Coast. Speaks with an East Coast accent. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Tech Advisor 10

- 목소리 ID: `en-us-techagent-10`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Tech Support Agent from the East Coast. Speaks with an East Coast accent. Voice is relaxed.

##### Tech Advisor 3

- 목소리 ID: `en-us-techagent-3`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Northwest
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Architect from the Northwest. Speaks with a Northwest accent. Currently at an appointment. Sounds confident and clear.

##### Tech Advisor 4

- 목소리 ID: `en-us-techagent-4`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 48-year-old Architect from the East Coast. Speaks with an East Coast accent. Voice is cool, confident, and collaborative.

##### Tech Advisor 8

- 목소리 ID: `en-us-techagent-8`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Tech Support Agent from the East Coast. Speaks with an East Coast accent. Currently in an oscar winning film. Sounds confident and clear.

##### Tech Advisor 9

- 목소리 ID: `en-us-techagent-9`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Architect from the East Coast. Speaks with an East Coast accent. Voice is crisp and eager.

##### Training Voiceover 2

- 목소리 ID: `en-us-training-2`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Gulf Coast
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 48-year-old Cooking Show Host from the Gulf Coast. Speaks with a Gulf Coast accent. Voice is relaxed.

##### Training Voiceover 3

- 목소리 ID: `en-us-training-3`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 54-year-old Instructional Video Host from the East Coast. Speaks with an East Coast accent. Voice is highly approachable.

##### Training Voiceover 5

- 목소리 ID: `en-us-training-5`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: West Coast
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 45-year-old Cooking Show Host from the West Coast. Speaks with a West Coast accent. Voice is deep, velvety, and unhurried.

##### Training Voiceover 6

- 목소리 ID: `en-us-training-6`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Midwest
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 27-year-old Cooking Show Host from the Midwest. Speaks with a Midwest accent. Currently in a bookstore. Sounds confident and clear.

##### Tutor 1

- 목소리 ID: `en-us-tutor-1`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 30-year-old Writing Tutor from the East Coast. Speaks with an East Coast accent. Voice is clear, medium-pitch, and friendly.

##### Tutor 12

- 목소리 ID: `en-us-tutor-12`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: West Coast
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 48-year-old Writing Tutor from the West Coast. Speaks with a West Coast accent. Voice is relaxed.

##### Tutor 15

- 목소리 ID: `en-us-tutor-15`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Gulf Coast
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 55-year-old Professor from the Gulf Coast. Speaks with a Gulf Coast accent. Currently sitting next to you on an airplane. Tone is professional yet approachable.

##### Tutor 16

- 목소리 ID: `en-us-tutor-16`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 56-year-old Professor from the East Coast. Speaks with an East Coast accent. Currently in an oscar winning film. Sounds confident and clear.

##### Tutor 19

- 목소리 ID: `en-us-tutor-19`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Midwest
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 55-year-old Chess Instructor from the Midwest. Speaks with a Midwest accent. Currently on npr. Tone is professional yet approachable.

##### Tutor 2

- 목소리 ID: `en-us-tutor-2`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Northwest
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 50-year-old Chess Instructor from the Northwest. Speaks with a Northwest accent. Currently in an oscar winning film. Voice is warm and engaging.

##### Tutor 20

- 목소리 ID: `en-us-tutor-20`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: West Coast
- 역할: Educational Tutor (Music Teacher)
- 용도: Conversational / Edu
- 공식 설명: 50-year-old Music Teacher from the West Coast. Speaks with a West Coast accent. Tone is enthusiastic, engaging, and fun

##### Tutor 22

- 목소리 ID: `en-us-tutor-22`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Northwest
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 39-year-old Writing Tutor from the Northwest. Speaks with a Northwest accent. Voice is engaging and empathic.

##### Tutor 24

- 목소리 ID: `en-us-tutor-24`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: West Coast
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 51-year-old Chess Instructor from the West Coast. Speaks with a West Coast accent. Voice is crisp and eager.

##### Tutor 25

- 목소리 ID: `en-us-tutor-25`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: West Coast
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 53-year-old Writing Tutor from the West Coast. Speaks with a West Coast accent. Tone is conversational, slightly dry humor, and warm

##### Tutor 3

- 목소리 ID: `en-us-tutor-3`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Northwest
- 역할: Tech Support Agent / Tech Advisor (Librarian)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Librarian from the Northwest. Speaks with a Northwest accent. Voice is clear, medium-pitch, and friendly.

##### Tutor 4

- 목소리 ID: `en-us-tutor-4`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Northwest
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 24-year-old Writing Tutor from the Northwest. Speaks with a Northwest accent. Currently at an appointment. Sounds confident and clear.

##### Tutor 6

- 목소리 ID: `en-us-tutor-6`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Educational Tutor
- 용도: Conversational / Edu
- 공식 설명: 22-year-old Tutor from the East Coast. Speaks with an East Coast accent. Voice is engaging and empathic.

##### Tutor 7

- 목소리 ID: `en-us-tutor-7`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Northwest
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 42-year-old Chess Instructor from the Northwest. Speaks with a Northwest accent. Voice is resonant and witty.

##### Tutor 8

- 목소리 ID: `en-us-tutor-8`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: East Coast
- 역할: Educational Tutor (Teacher)
- 용도: Conversational / Edu
- 공식 설명: 36-year-old Teacher from the East Coast. Speaks with an East Coast accent. Currently in an indie film. Sounds confident and clear.

##### Varo

- 목소리 ID: `en-us-varo`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: low
- 억양: Northwest
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 36-year-old Writing Tutor from the Northwest. Speaks with a Northwest accent. Voice is laid-back, encouraging, and chill.

##### Zeno

- 목소리 ID: `en-us-zeno`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: male
- 음높이: high
- 억양: Northwest
- 역할: Character & Theatrical (Reality TV Star)
- 용도: Entertainment & Gaming
- 공식 설명: 27-year-old Reality TV Star from the Northwest. Speaks with a Northwest accent. Voice is cool, confident, and collaborative.

#### 중성 — 3개

##### Storyteller 2

- 목소리 ID: `en-us-storyteller-2`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: neutral
- 음높이: low
- 억양: Gulf Coast
- 역할: Character & Theatrical (Comedian)
- 용도: Entertainment & Gaming
- 공식 설명: 34-year-old Comedian from the Gulf Coast. Speaks with a Gulf Coast accent. Currently at a meditation retreat. Voice is warm and engaging.

##### Training Voiceover 10

- 목소리 ID: `en-us-training-10`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: neutral
- 음높이: high
- 억양: East Coast
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 30-year-old Cooking Show Host from the East Coast. Speaks with an East Coast accent. Voice is comforting someone who is stressed.

##### Training Voiceover 9

- 목소리 ID: `en-us-training-9`
- 유형: prebuilt
- 언어: en-US
- 지역: US
- 성별: neutral
- 음높이: low
- 억양: Inland Southern
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 45-year-old Instructional Video Host from the Inland South. Speaks with an Inland Southern accent. Tone is reflective, calm, and reassuring

### 영어·남아프리카공화국 (en-ZA) — 80개

#### 여성 — 40개

##### Authoritative Advisor 1

- 목소리 ID: `en-za-advisor-1`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: medium
- 억양: Cape Town English
- 역할: High-Trust Advisor / Authoritative Advisor (Doctor)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Doctor from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Tone is objective, direct, and helpful

##### Authoritative Advisor 3

- 목소리 ID: `en-za-advisor-3`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: low
- 억양: Cape Town English
- 역할: High-Trust Advisor / Authoritative Advisor (Doctor)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Doctor from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is cool, confident, and collaborative.

##### Authoritative Advisor 6

- 목소리 ID: `en-za-advisor-6`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: low
- 억양: Cape Town English
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 26-year-old Financial Advisor from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently on the phone. Sounds confident and clear.

##### Authoritative Advisor 8

- 목소리 ID: `en-za-advisor-8`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: high
- 억양: Cape Town English
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Financial Advisor from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is laid-back, encouraging, and chill.

##### Call Center Agent 2

- 목소리 ID: `en-za-csagent-2`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: medium
- 억양: Cape Town English
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 50-year-old Social Worker from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently on podcast. Tone is professional yet approachable.

##### Call Center Agent 3

- 목소리 ID: `en-za-csagent-3`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: medium
- 억양: Cape Town English
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Social Worker from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is light, airy, and precise

##### Call Center Agent 5

- 목소리 ID: `en-za-csagent-5`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: high
- 억양: Cape Town English
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 29-year-old Social Worker from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Tone is objective, direct, and helpful

##### Call Center Agent 7

- 목소리 ID: `en-za-csagent-7`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: low
- 억양: Cape Town English
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 28-year-old Social Worker from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Tone is conversational, slightly dry humor, and warm

##### Commercial Voiceover 2

- 목소리 ID: `en-za-commercial-2`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: high
- 억양: Cape Town English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 62-year-old Fashion Consultant from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Tone is peer-to-peer and curious

##### Commercial Voiceover 3

- 목소리 ID: `en-za-commercial-3`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: medium
- 억양: Cape Town English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 30-year-old Influencer from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is fast-paced, articulate, energetic.

##### Commercial Voiceover 5

- 목소리 ID: `en-za-commercial-5`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: low
- 억양: Cape Town English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 60-year-old Fashion Consultant from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is bright, breezy, and youthful.

##### Commercial Voiceover 6

- 목소리 ID: `en-za-commercial-6`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: high
- 억양: Cape Town English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 28-year-old Influencer from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently sitting next to you on the bus. Voice is warm and engaging.

##### Concierge 2

- 목소리 ID: `en-za-concierge-2`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: medium
- 억양: Cape Town English
- 역할: Concierge & EA (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Event Planner from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently on podcast. Sounds confident and clear.

##### Concierge 4

- 목소리 ID: `en-za-concierge-4`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: high
- 억양: Cape Town English
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Executive Assistant from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is natural and clear.

##### Concierge 5

- 목소리 ID: `en-za-concierge-5`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: low
- 억양: Cape Town English
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Hotel Concierge from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is energetic, colorful, and fast

##### Concierge 7

- 목소리 ID: `en-za-concierge-7`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: high
- 억양: Cape Town English
- 역할: Concierge & EA (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 50-year-old Event Planner from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is textured, resonant, and soothing.

##### Digital Assistant 1

- 목소리 ID: `en-za-assistant-1`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: medium
- 억양: Cape Town English
- 역할: Companion & Peer / Digital Assistant (Best Friend)
- 용도: Conversational / Edu
- 공식 설명: 23-year-old Best Friend from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently on the phone. Sounds confident and clear.

##### Digital Assistant 3

- 목소리 ID: `en-za-assistant-3`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: high
- 억양: Cape Town English
- 역할: Companion & Peer / Digital Assistant (Aunt/Uncle)
- 용도: Conversational / Edu
- 공식 설명: 39-year-old Aunt/Uncle from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is laid-back, encouraging, and chill.

##### Digital Assistant 5

- 목소리 ID: `en-za-assistant-5`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: medium
- 억양: Cape Town English
- 역할: Tech Support Agent / Tech Advisor (Grandparent)
- 용도: Enterprise Agent
- 공식 설명: 73-year-old Grandparent from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is laid-back, encouraging, and chill.

##### Digital Assistant 7

- 목소리 ID: `en-za-assistant-7`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: high
- 억양: Cape Town English
- 역할: Storyteller & Narrator (Aunt/Uncle)
- 용도: Content & Media
- 공식 설명: 50-year-old Aunt/Uncle from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is energetic, colorful, and fast

##### Podcaster 1

- 목소리 ID: `en-za-podcaster-1`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: low
- 억양: Cape Town English
- 역할: News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 52-year-old Trivia Host from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently sitting on couch. Tone is professional yet approachable.

##### Podcaster 3

- 목소리 ID: `en-za-podcaster-3`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: high
- 억양: Cape Town English
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 58-year-old Podcast Interviewer from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is natural and clear.

##### Podcaster 6

- 목소리 ID: `en-za-podcaster-6`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: medium
- 억양: Cape Town English
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 42-year-old Radio Host from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Tone is objective, direct, and helpful

##### Podcaster 8

- 목소리 ID: `en-za-podcaster-8`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: high
- 억양: Cape Town English
- 역할: News & Podcast Host / Podcaster (Journalist)
- 용도: Content & Media
- 공식 설명: 57-year-old Journalist from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is highly approachable.

##### Storyteller 2

- 목소리 ID: `en-za-storyteller-2`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: low
- 억양: Cape Town English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 56-year-old Nature Documentary Narrator from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is deep, velvety, and unhurried.

##### Storyteller 4

- 목소리 ID: `en-za-storyteller-4`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: low
- 억양: Cape Town English
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 28-year-old Philosopher from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is highly approachable.

##### Storyteller 5

- 목소리 ID: `en-za-storyteller-5`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: medium
- 억양: Cape Town English
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 43-year-old Storyteller from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is natural and clear.

##### Storyteller 7

- 목소리 ID: `en-za-storyteller-7`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: high
- 억양: Cape Town English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 39-year-old Nature Documentary Narrator from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is fast-paced, articulate, energetic.

##### Tech Advisor 1

- 목소리 ID: `en-za-techagent-1`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: medium
- 억양: Cape Town English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 44-year-old Architect from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Tone is conversational, slightly dry humor, and warm

##### Tech Advisor 3

- 목소리 ID: `en-za-techagent-3`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: low
- 억양: Cape Town English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Architect from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently on the phone. Tone is professional yet approachable.

##### Tech Advisor 5

- 목소리 ID: `en-za-techagent-5`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: medium
- 억양: Cape Town English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Architect from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is light, airy, and precise

##### Tech Advisor 8

- 목소리 ID: `en-za-techagent-8`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: high
- 억양: Cape Town English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Architect from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is clear, medium-pitch, and friendly.

##### Training Voiceover 2

- 목소리 ID: `en-za-training-2`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: medium
- 억양: Cape Town English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 28-year-old Cooking Show Host from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently sitting next to you on an airplane. Sounds confident and clear.

##### Training Voiceover 3

- 목소리 ID: `en-za-training-3`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: low
- 억양: Cape Town English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 40-year-old Cooking Show Host from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is highly approachable.

##### Training Voiceover 6

- 목소리 ID: `en-za-training-6`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: medium
- 억양: Cape Town English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 25-year-old Instructional Video Host from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is textured, resonant, and soothing.

##### Training Voiceover 7

- 목소리 ID: `en-za-training-7`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: high
- 억양: Cape Town English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 52-year-old Cooking Show Host from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is bright, breezy, and youthful.

##### Tutor 2

- 목소리 ID: `en-za-tutor-2`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: high
- 억양: Cape Town English
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 33-year-old Writing Tutor from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is energetic, colorful, and fast

##### Tutor 3

- 목소리 ID: `en-za-tutor-3`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: low
- 억양: Cape Town English
- 역할: Educational Tutor
- 용도: Conversational / Edu
- 공식 설명: 48-year-old Tutor from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is cool, confident, and collaborative.

##### Tutor 5

- 목소리 ID: `en-za-tutor-5`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: low
- 억양: Cape Town English
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 46-year-old Professor from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Tone is conversational, slightly dry humor, and warm

##### Tutor 7

- 목소리 ID: `en-za-tutor-7`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: female
- 음높이: medium
- 억양: Cape Town English
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 24-year-old Writing Tutor from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently in a bookstore. Sounds confident and clear.

#### 남성 — 37개

##### Authoritative Advisor 2

- 목소리 ID: `en-za-advisor-2`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: medium
- 억양: Cape Town English
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 57-year-old Researcher from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently at an appointment. Voice is warm and engaging.

##### Authoritative Advisor 4

- 목소리 ID: `en-za-advisor-4`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: High-Trust Advisor / Authoritative Advisor (Doctor)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Doctor from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is comforting someone who is stressed.

##### Authoritative Advisor 5

- 목소리 ID: `en-za-advisor-5`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: High-Trust Advisor / Authoritative Advisor (Doctor)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Doctor from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently on the phone. Tone is professional yet approachable.

##### Call Center Agent 1

- 목소리 ID: `en-za-csagent-1`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: medium
- 억양: Cape Town English
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 55-year-old Social Worker from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is bright, breezy, and youthful.

##### Call Center Agent 4

- 목소리 ID: `en-za-csagent-4`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 28-year-old Social Worker from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Tone is reflective, calm, and reassuring

##### Call Center Agent 6

- 목소리 ID: `en-za-csagent-6`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 44-year-old Social Worker from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently in an oscar winning film. Voice is warm and engaging.

##### Call Center Agent 8

- 목소리 ID: `en-za-csagent-8`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Social Worker from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is light, airy, and precise

##### Commercial Voiceover 1

- 목소리 ID: `en-za-commercial-1`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 53-year-old Fashion Consultant from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is cool, confident, and collaborative.

##### Commercial Voiceover 4

- 목소리 ID: `en-za-commercial-4`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: medium
- 억양: Cape Town English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 38-year-old Fashion Consultant from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Tone is objective, direct, and helpful

##### Commercial Voiceover 7

- 목소리 ID: `en-za-commercial-7`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 42-year-old Fashion Consultant from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is energetic, colorful, and fast

##### Commercial Voiceover 8

- 목소리 ID: `en-za-commercial-8`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 28-year-old Influencer from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Tone is enthusiastic, engaging, and fun

##### Concierge 1

- 목소리 ID: `en-za-concierge-1`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 29-year-old Tour Guide from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Tone is conversational, slightly dry humor, and warm

##### Concierge 3

- 목소리 ID: `en-za-concierge-3`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 58-year-old Executive Assistant from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently at an appointment. Sounds confident and clear.

##### Concierge 6

- 목소리 ID: `en-za-concierge-6`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Hotel Concierge from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is deep, velvety, and unhurried.

##### Digital Assistant 2

- 목소리 ID: `en-za-assistant-2`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 47-year-old Parent from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is clear, medium-pitch, and friendly.

##### Digital Assistant 4

- 목소리 ID: `en-za-assistant-4`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 35-year-old Parent from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is crisp and eager.

##### Digital Assistant 6

- 목소리 ID: `en-za-assistant-6`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Companion & Peer / Digital Assistant (Best Friend)
- 용도: Conversational / Edu
- 공식 설명: 37-year-old Best Friend from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is crisp and eager.

##### Digital Assistant 8

- 목소리 ID: `en-za-assistant-8`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: medium
- 억양: Cape Town English
- 역할: Storyteller & Narrator (Aunt/Uncle)
- 용도: Content & Media
- 공식 설명: 30-year-old Aunt/Uncle from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is relaxed.

##### Podcaster 2

- 목소리 ID: `en-za-podcaster-2`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: News & Podcast Host / Podcaster (Journalist)
- 용도: Content & Media
- 공식 설명: 30-year-old Journalist from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is intimate talkshow.

##### Podcaster 4

- 목소리 ID: `en-za-podcaster-4`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: medium
- 억양: Cape Town English
- 역할: News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 51-year-old Trivia Host from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is resonant and witty.

##### Podcaster 5

- 목소리 ID: `en-za-podcaster-5`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 57-year-old Podcast Interviewer from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is resonant and witty.

##### Podcaster 7

- 목소리 ID: `en-za-podcaster-7`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 49-year-old Radio Host from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Tone is reflective, calm, and reassuring

##### Storyteller 1

- 목소리 ID: `en-za-storyteller-1`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: medium
- 억양: Cape Town English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 49-year-old Nature Documentary Narrator from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is cool, confident, and collaborative.

##### Storyteller 3

- 목소리 ID: `en-za-storyteller-3`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 45-year-old Storyteller from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently brainstorming in a meeting. Sounds confident and clear.

##### Storyteller 6

- 목소리 ID: `en-za-storyteller-6`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 52-year-old Nature Documentary Narrator from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is laid-back, encouraging, and chill.

##### Storyteller 8

- 목소리 ID: `en-za-storyteller-8`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: high
- 억양: Cape Town English
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 62-year-old Storyteller from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Tone is conversational, slightly dry humor, and warm

##### Tech Advisor 2

- 목소리 ID: `en-za-techagent-2`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Architect from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently in an indie film. Sounds confident and clear.

##### Tech Advisor 4

- 목소리 ID: `en-za-techagent-4`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Architect from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently sitting on couch. Tone is professional yet approachable.

##### Tech Advisor 6

- 목소리 ID: `en-za-techagent-6`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 48-year-old Tech Support Agent from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently at a meditation retreat. Sounds confident and clear.

##### Tech Advisor 7

- 목소리 ID: `en-za-techagent-7`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Architect from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently brainstorming in a meeting. Sounds confident and clear.

##### Training Voiceover 1

- 목소리 ID: `en-za-training-1`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 38-year-old Instructional Video Host from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently at an appointment. Tone is professional yet approachable.

##### Training Voiceover 4

- 목소리 ID: `en-za-training-4`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 57-year-old Cooking Show Host from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is highly approachable.

##### Training Voiceover 5

- 목소리 ID: `en-za-training-5`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 49-year-old Cooking Show Host from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently in an oscar winning film. Tone is professional yet approachable.

##### Training Voiceover 8

- 목소리 ID: `en-za-training-8`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: high
- 억양: Cape Town English
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 58-year-old Instructional Video Host from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently in an indie film. Tone is professional yet approachable.

##### Tutor 1

- 목소리 ID: `en-za-tutor-1`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Coach & Motivational Guide (Dating Coach)
- 용도: Wellness & Culture
- 공식 설명: 26-year-old Dating Coach from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is comforting someone who is stressed.

##### Tutor 4

- 목소리 ID: `en-za-tutor-4`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Educational Tutor (Music Teacher)
- 용도: Conversational / Edu
- 공식 설명: 23-year-old Music Teacher from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently on npr. Voice is warm and engaging.

##### Tutor 6

- 목소리 ID: `en-za-tutor-6`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: male
- 음높이: low
- 억양: Cape Town English
- 역할: Coach & Motivational Guide (Dating Coach)
- 용도: Wellness & Culture
- 공식 설명: 41-year-old Dating Coach from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is natural and clear.

#### 중성 — 3개

##### Authoritative Advisor 7

- 목소리 ID: `en-za-advisor-7`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: neutral
- 음높이: high
- 억양: Cape Town English
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Researcher from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is bright, breezy, and youthful.

##### Concierge 8

- 목소리 ID: `en-za-concierge-8`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: neutral
- 음높이: high
- 억양: Cape Town English
- 역할: Concierge & EA (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 44-year-old Event Planner from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Voice is cool, confident, and collaborative.

##### Tutor 8

- 목소리 ID: `en-za-tutor-8`
- 유형: prebuilt
- 언어: en-ZA
- 지역: ZA
- 성별: neutral
- 음높이: medium
- 억양: Cape Town English
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 34-year-old Chess Instructor from Cape Town South Africa. Speaks with a Cape Town South Africa English accent. Currently brainstorming in a meeting. Tone is professional yet approachable.

### 스페인어·라틴아메리카 (es-419) — 86개

#### 여성 — 45개

##### Authoritative Advisor 1

- 목소리 ID: `es-419-advisor-1`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: medium
- 억양: Argentina Spanish
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Lawyer from Argentina. Speaks Argentine Spanish. Tone is reflective, calm, and reassuring

##### Authoritative Advisor 12

- 목소리 ID: `es-419-advisor-12`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: low
- 억양: Argentina Spanish
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Lawyer from Argentina. Speaks Argentine Spanish. Tone is objective, direct, and helpful

##### Authoritative Advisor 4

- 목소리 ID: `es-419-advisor-4`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: high
- 억양: Mexico Spanish
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Lawyer from Mexico. Speaks Mexican Spanish. Currently on podcast. Tone is professional yet approachable.

##### Authoritative Advisor 5

- 목소리 ID: `es-419-advisor-5`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: low
- 억양: Argentina Spanish
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Lawyer from Argentina. Speaks Argentine Spanish. Tone is objective, direct, and helpful

##### Authoritative Advisor 6

- 목소리 ID: `es-419-advisor-6`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: high
- 억양: Mexico Spanish
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Lawyer from Mexico. Speaks Mexican Spanish. Voice is cool, confident, and collaborative.

##### Authoritative Advisor 7

- 목소리 ID: `es-419-advisor-7`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: high
- 억양: Mexico Spanish
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Lawyer from Mexico. Speaks Mexican Spanish. Currently on npr. Tone is professional yet approachable.

##### Call Center Agent 1

- 목소리 ID: `es-419-csagent-1`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: high
- 억양: Argentina Spanish
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Customer Service Agent from Argentina. Speaks Argentine Spanish. Currently in a bookstore. Tone is professional yet approachable.

##### Call Center Agent 12

- 목소리 ID: `es-419-csagent-12`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: high
- 억양: Argentina Spanish
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 48-year-old Customer Service Agent from Argentina. Speaks Argentine Spanish. Currently sitting on couch. Voice is warm and engaging.

##### Call Center Agent 2

- 목소리 ID: `es-419-csagent-2`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: low
- 억양: Argentina Spanish
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Customer Service Agent from Argentina. Speaks Argentine Spanish. Currently on npr. Sounds confident and clear.

##### Call Center Agent 7

- 목소리 ID: `es-419-csagent-7`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: high
- 억양: Mexico Spanish
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Customer Service Agent from Mexico. Speaks Mexican Spanish. Voice is bright, breezy, and youthful.

##### Commercial Voiceover 2

- 목소리 ID: `es-419-commercial-2`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: high
- 억양: Argentina Spanish
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 27-year-old Influencer from Argentina. Speaks Argentine Spanish. Voice is textured, resonant, and soothing.

##### Commercial Voiceover 6

- 목소리 ID: `es-419-commercial-6`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: medium
- 억양: Mexico Spanish
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 23-year-old Influencer from Mexico. Speaks Mexican Spanish. Voice is deep, velvety, and unhurried.

##### Commercial Voiceover 8

- 목소리 ID: `es-419-commercial-8`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: high
- 억양: Mexico Spanish
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 24-year-old Influencer from Mexico. Speaks Mexican Spanish. Currently sitting next to you on the bus. Sounds confident and clear.

##### Commercial Voiceover 9

- 목소리 ID: `es-419-commercial-9`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: high
- 억양: Mexico Spanish
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 28-year-old Influencer from Mexico. Speaks Mexican Spanish. Tone is objective, direct, and helpful

##### Concierge 1

- 목소리 ID: `es-419-concierge-1`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: high
- 억양: Argentina Spanish
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Executive Assistant from Argentina. Speaks Argentine Spanish. Voice is cool, confident, and collaborative.

##### Concierge 10

- 목소리 ID: `es-419-concierge-10`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: high
- 억양: Argentina Spanish
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 51-year-old Tour Guide from Argentina. Speaks Argentine Spanish. Voice is engaging and empathic.

##### Concierge 5

- 목소리 ID: `es-419-concierge-5`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: high
- 억양: Mexico Spanish
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Executive Assistant from Mexico. Speaks Mexican Spanish. Currently on the phone. Sounds confident and clear.

##### Concierge 6

- 목소리 ID: `es-419-concierge-6`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: medium
- 억양: Argentina Spanish
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Executive Assistant from Argentina. Speaks Argentine Spanish. Currently sitting on couch. Voice is warm and engaging.

##### Concierge 9

- 목소리 ID: `es-419-concierge-9`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: medium
- 억양: Argentina Spanish
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 26-year-old Executive Assistant from Argentina. Speaks Argentine Spanish. Voice is natural and clear.

##### Digital Assistant 1

- 목소리 ID: `es-419-assistant-1`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: high
- 억양: Mexico Spanish
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 25-year-old Sibling from Mexico. Speaks Mexican Spanish. Voice is highly approachable.

##### Digital Assistant 11

- 목소리 ID: `es-419-assistant-11`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: high
- 억양: Argentina Spanish
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 39-year-old Friend from Argentina. Speaks Argentine Spanish. Currently at an appointment. Tone is professional yet approachable.

##### Digital Assistant 2

- 목소리 ID: `es-419-assistant-2`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: high
- 억양: Mexico Spanish
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 39-year-old Friend from Mexico. Speaks Mexican Spanish. Voice is laid-back, encouraging, and chill.

##### Digital Assistant 5

- 목소리 ID: `es-419-assistant-5`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: low
- 억양: Argentina Spanish
- 역할: Storyteller & Narrator (Parent)
- 용도: Content & Media
- 공식 설명: 36-year-old Parent from Argentina. Speaks Argentine Spanish. Voice is natural and clear.

##### Digital Assistant 6

- 목소리 ID: `es-419-assistant-6`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: medium
- 억양: Mexico Spanish
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 47-year-old Parent from Mexico. Speaks Mexican Spanish. Currently sitting next to you on an airplane. Tone is professional yet approachable.

##### Digital Assistant 8

- 목소리 ID: `es-419-assistant-8`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: medium
- 억양: Argentina Spanish
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 42-year-old Sibling from Argentina. Speaks Argentine Spanish. Voice is light, airy, and precise

##### Podcaster 10

- 목소리 ID: `es-419-podcaster-10`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: medium
- 억양: Argentina Spanish
- 역할: Storyteller & Narrator (Radio Host) | News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 28-year-old Radio Host from Argentina. Speaks Argentine Spanish. Tone is objective, direct, and helpful

##### Podcaster 11

- 목소리 ID: `es-419-podcaster-11`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: medium
- 억양: Argentina Spanish
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 60-year-old Podcast Interviewer from Argentina. Speaks Argentine Spanish. Currently sitting next to you on an airplane. Tone is professional yet approachable.

##### Podcaster 2

- 목소리 ID: `es-419-podcaster-2`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: high
- 억양: Mexico Spanish
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 25-year-old Radio Host from Mexico. Speaks Mexican Spanish. Currently on npr. Tone is professional yet approachable.

##### Podcaster 6

- 목소리 ID: `es-419-podcaster-6`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: low
- 억양: Argentina Spanish
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 62-year-old Podcast Interviewer from Argentina. Speaks Argentine Spanish. Tone is reflective, calm, and reassuring

##### Podcaster 9

- 목소리 ID: `es-419-podcaster-9`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: medium
- 억양: Argentina Spanish
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 28-year-old Radio Host from Argentina. Speaks Argentine Spanish. Voice is textured, resonant, and soothing.

##### Tech Advisor 1

- 목소리 ID: `es-419-techagent-1`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: medium
- 억양: Argentina Spanish
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 26-year-old Tech Support Agent from Argentina. Speaks Argentine Spanish. Voice is intimate talkshow.

##### Tech Advisor 11

- 목소리 ID: `es-419-techagent-11`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: high
- 억양: Argentina Spanish
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Tech Support Agent from Argentina. Speaks Argentine Spanish. Currently sitting next to you on an airplane. Sounds confident and clear.

##### Tech Advisor 3

- 목소리 ID: `es-419-techagent-3`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: medium
- 억양: Argentina Spanish
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 48-year-old Tech Support Agent from Argentina. Speaks Argentine Spanish. Tone is objective, direct, and helpful

##### Tech Advisor 7

- 목소리 ID: `es-419-techagent-7`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: low
- 억양: Argentina Spanish
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Tech Support Agent from Argentina. Speaks Argentine Spanish. Voice is textured, resonant, and soothing.

##### Tech Advisor 8

- 목소리 ID: `es-419-techagent-8`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: high
- 억양: Argentina Spanish
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Tech Support Agent from Argentina. Speaks Argentine Spanish. Voice is highly approachable.

##### Training Voiceover 1

- 목소리 ID: `es-419-training-1`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: high
- 억양: Argentina Spanish
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 27-year-old Cooking Show Host from Argentina. Speaks Argentine Spanish. Voice is clear, medium-pitch, and friendly.

##### Training Voiceover 4

- 목소리 ID: `es-419-training-4`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: medium
- 억양: Argentina Spanish
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 30-year-old Instructional Video Host from Argentina. Speaks Argentine Spanish. Currently brainstorming in a meeting. Sounds confident and clear.

##### Training Voiceover 5

- 목소리 ID: `es-419-training-5`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: high
- 억양: Argentina Spanish
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 38-year-old Cooking Show Host from Argentina. Speaks Argentine Spanish. Currently brainstorming in a meeting. Sounds confident and clear.

##### Training Voiceover 7

- 목소리 ID: `es-419-training-7`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: low
- 억양: Mexico Spanish
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 25-year-old Cooking Show Host from Mexico. Speaks Mexican Spanish. Voice is intimate talkshow.

##### Training Voiceover 8

- 목소리 ID: `es-419-training-8`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: medium
- 억양: Mexico Spanish
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 32-year-old Cooking Show Host from Mexico. Speaks Mexican Spanish. Voice is bright, breezy, and youthful.

##### Tutor 1

- 목소리 ID: `es-419-tutor-1`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: medium
- 억양: Argentina Spanish
- 역할: Storyteller & Narrator (Mentor) | Coach & Motivational Guide (Mentor)
- 용도: Content & Media | Wellness & Culture
- 공식 설명: 60-year-old Mentor from Argentina. Speaks Argentine Spanish. Voice is bright, breezy, and youthful.

##### Tutor 10

- 목소리 ID: `es-419-tutor-10`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: medium
- 억양: Argentina Spanish
- 역할: Educational Tutor (Teacher)
- 용도: Conversational / Edu
- 공식 설명: 39-year-old Teacher from Argentina. Speaks Argentine Spanish. Currently in an oscar winning film. Sounds confident and clear.

##### Tutor 3

- 목소리 ID: `es-419-tutor-3`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: low
- 억양: Mexico Spanish
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 56-year-old Professor from Mexico. Speaks Mexican Spanish. Voice is highly approachable.

##### Tutor 8

- 목소리 ID: `es-419-tutor-8`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: medium
- 억양: Argentina Spanish
- 역할: Storyteller & Narrator (Therapist)
- 용도: Content & Media
- 공식 설명: 43-year-old Therapist from Argentina. Speaks Argentine Spanish. Currently on podcast. Sounds confident and clear.

##### Tutor 9

- 목소리 ID: `es-419-tutor-9`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: female
- 음높이: high
- 억양: Argentina Spanish
- 역할: Educational Tutor (Teacher)
- 용도: Conversational / Edu
- 공식 설명: 26-year-old Teacher from Argentina. Speaks Argentine Spanish. Currently in an indie film. Sounds confident and clear.

#### 남성 — 38개

##### Authoritative Advisor 10

- 목소리 ID: `es-419-advisor-10`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Argentina Spanish
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 45-year-old Lawyer from Argentina. Speaks Argentine Spanish. Currently sitting on couch. Voice is warm and engaging.

##### Authoritative Advisor 11

- 목소리 ID: `es-419-advisor-11`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: medium
- 억양: Argentina Spanish
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Lawyer from Argentina. Speaks Argentine Spanish. Currently on npr. Voice is warm and engaging.

##### Authoritative Advisor 3

- 목소리 ID: `es-419-advisor-3`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Argentina Spanish
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 44-year-old Financial Advisor from Argentina. Speaks Argentine Spanish. Currently sitting next to you on an airplane. Sounds confident and clear.

##### Call Center Agent 10

- 목소리 ID: `es-419-csagent-10`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Argentina Spanish
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 51-year-old Sales Associate from Argentina. Speaks Argentine Spanish. Voice is natural and clear.

##### Call Center Agent 11

- 목소리 ID: `es-419-csagent-11`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Argentina Spanish
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Customer Service Agent from Argentina. Speaks Argentine Spanish. Voice is cool, confident, and collaborative.

##### Call Center Agent 4

- 목소리 ID: `es-419-csagent-4`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Mexico Spanish
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 44-year-old Customer Service Agent from Mexico. Speaks Mexican Spanish. Voice is bright, breezy, and youthful.

##### Call Center Agent 9

- 목소리 ID: `es-419-csagent-9`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Mexico Spanish
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 57-year-old Social Worker from Mexico. Speaks Mexican Spanish. Voice is textured, resonant, and soothing.

##### Commercial Voiceover 1

- 목소리 ID: `es-419-commercial-1`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Mexico Spanish
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 24-year-old Influencer from Mexico. Speaks Mexican Spanish. Currently in a bookstore. Tone is professional yet approachable.

##### Commercial Voiceover 10

- 목소리 ID: `es-419-commercial-10`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Argentina Spanish
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 49-year-old Fashion Consultant from Argentina. Speaks Argentine Spanish. Currently on npr. Voice is warm and engaging.

##### Commercial Voiceover 11

- 목소리 ID: `es-419-commercial-11`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Mexico Spanish
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 27-year-old Influencer from Mexico. Speaks Mexican Spanish. Currently on npr. Tone is professional yet approachable.

##### Commercial Voiceover 12

- 목소리 ID: `es-419-commercial-12`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Mexico Spanish
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 23-year-old Influencer from Mexico. Speaks Mexican Spanish. Currently at a meditation retreat. Sounds confident and clear.

##### Commercial Voiceover 4

- 목소리 ID: `es-419-commercial-4`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Mexico Spanish
- 역할: Character & Theatrical (Reality TV Star)
- 용도: Entertainment & Gaming
- 공식 설명: 21-year-old Reality TV Star from Mexico. Speaks Mexican Spanish. Voice is textured, resonant, and soothing.

##### Commercial Voiceover 5

- 목소리 ID: `es-419-commercial-5`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Argentina Spanish
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 30-year-old Fashion Consultant from Argentina. Speaks Argentine Spanish. Currently sitting next to you on the bus. Voice is warm and engaging.

##### Concierge 2

- 목소리 ID: `es-419-concierge-2`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Mexico Spanish
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 61-year-old Tour Guide from Mexico. Speaks Mexican Spanish. Currently at an appointment. Sounds confident and clear.

##### Concierge 7

- 목소리 ID: `es-419-concierge-7`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Mexico Spanish
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 59-year-old Tour Guide from Mexico. Speaks Mexican Spanish. Tone is objective, direct, and helpful

##### Concierge 8

- 목소리 ID: `es-419-concierge-8`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Mexico Spanish
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Tour Guide from Mexico. Speaks Mexican Spanish. Tone is conversational, slightly dry humor, and warm

##### Digital Assistant 10

- 목소리 ID: `es-419-assistant-10`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Argentina Spanish
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 50-year-old Parent from Argentina. Speaks Argentine Spanish. Voice is relaxed.

##### Digital Assistant 7

- 목소리 ID: `es-419-assistant-7`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Argentina Spanish
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 40-year-old Sibling from Argentina. Speaks Argentine Spanish. Currently at a meditation retreat. Sounds confident and clear.

##### Digital Assistant 9

- 목소리 ID: `es-419-assistant-9`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: medium
- 억양: Mexico Spanish
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 28-year-old Sibling from Mexico. Speaks Mexican Spanish. Voice is crisp and eager.

##### Podcaster 1

- 목소리 ID: `es-419-podcaster-1`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Mexico Spanish
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 37-year-old Radio Host from Mexico. Speaks Mexican Spanish. Currently in a bookstore. Tone is professional yet approachable.

##### Podcaster 12

- 목소리 ID: `es-419-podcaster-12`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Argentina Spanish
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 31-year-old Podcast Interviewer from Argentina. Speaks Argentine Spanish. Currently on the phone. Sounds confident and clear.

##### Podcaster 3

- 목소리 ID: `es-419-podcaster-3`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Mexico Spanish
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 37-year-old Podcast Interviewer from Mexico. Speaks Mexican Spanish. Voice is cool, confident, and collaborative.

##### Podcaster 4

- 목소리 ID: `es-419-podcaster-4`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Mexico Spanish
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 43-year-old Podcast Interviewer from Mexico. Speaks Mexican Spanish. Currently brainstorming in a meeting. Sounds confident and clear.

##### Podcaster 8

- 목소리 ID: `es-419-podcaster-8`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Argentina Spanish
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 63-year-old Podcast Interviewer from Argentina. Speaks Argentine Spanish. Currently on podcast. Sounds confident and clear.

##### Tech Advisor 10

- 목소리 ID: `es-419-techagent-10`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Argentina Spanish
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Tech Support Agent from Argentina. Speaks Argentine Spanish. Tone is conversational, slightly dry humor, and warm

##### Tech Advisor 12

- 목소리 ID: `es-419-techagent-12`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Argentina Spanish
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Architect from Argentina. Speaks Argentine Spanish. Currently on the phone. Sounds confident and clear.

##### Tech Advisor 2

- 목소리 ID: `es-419-techagent-2`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Argentina Spanish
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 52-year-old Tech Support Agent from Argentina. Speaks Argentine Spanish. Voice is fast-paced, articulate, energetic.

##### Tech Advisor 6

- 목소리 ID: `es-419-techagent-6`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Argentina Spanish
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Tech Support Agent from Argentina. Speaks Argentine Spanish. Voice is engaging and empathic.

##### Tech Advisor 9

- 목소리 ID: `es-419-techagent-9`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Argentina Spanish
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Tech Support Agent from Argentina. Speaks Argentine Spanish. Voice is comforting someone who is stressed.

##### Training Voiceover 10

- 목소리 ID: `es-419-training-10`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Mexico Spanish
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 51-year-old Cooking Show Host from Mexico. Speaks Mexican Spanish. Currently in an indie film. Tone is professional yet approachable.

##### Training Voiceover 2

- 목소리 ID: `es-419-training-2`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Argentina Spanish
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 47-year-old Cooking Show Host from Argentina. Speaks Argentine Spanish. Tone is peer-to-peer and curious

##### Training Voiceover 6

- 목소리 ID: `es-419-training-6`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Argentina Spanish
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 31-year-old Cooking Show Host from Argentina. Speaks Argentine Spanish. Tone is objective, direct, and helpful

##### Tutor 11

- 목소리 ID: `es-419-tutor-11`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Argentina Spanish
- 역할: Educational Tutor
- 용도: Conversational / Edu
- 공식 설명: 44-year-old Tutor from Argentina. Speaks Argentine Spanish. Currently on podcast. Voice is warm and engaging.

##### Tutor 2

- 목소리 ID: `es-419-tutor-2`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Mexico Spanish
- 역할: Coach & Motivational Guide (Nutritionist)
- 용도: Wellness & Culture
- 공식 설명: 46-year-old Nutritionist from Mexico. Speaks Mexican Spanish. Voice is textured, resonant, and soothing.

##### Tutor 4

- 목소리 ID: `es-419-tutor-4`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Mexico Spanish
- 역할: Coach & Motivational Guide (Mentor)
- 용도: Wellness & Culture
- 공식 설명: 39-year-old Mentor from Mexico. Speaks Mexican Spanish. Voice is highly approachable.

##### Tutor 5

- 목소리 ID: `es-419-tutor-5`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Mexico Spanish
- 역할: Storyteller & Narrator (Therapist)
- 용도: Content & Media
- 공식 설명: 29-year-old Therapist from Mexico. Speaks Mexican Spanish. Voice is relaxed.

##### Tutor 6

- 목소리 ID: `es-419-tutor-6`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Argentina Spanish
- 역할: Storyteller & Narrator (Therapist)
- 용도: Content & Media
- 공식 설명: 22-year-old Therapist from Argentina. Speaks Argentine Spanish. Currently sitting next to you on the bus. Sounds confident and clear.

##### Tutor 7

- 목소리 ID: `es-419-tutor-7`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: male
- 음높이: low
- 억양: Argentina Spanish
- 역할: Storyteller & Narrator (Therapist)
- 용도: Content & Media
- 공식 설명: 58-year-old Therapist from Argentina. Speaks Argentine Spanish. Voice is natural and clear.

#### 중성 — 3개

##### Call Center Agent 8

- 목소리 ID: `es-419-csagent-8`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: neutral
- 음높이: medium
- 억양: Mexico Spanish
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 63-year-old Customer Service Agent from Mexico. Speaks Mexican Spanish. Voice is light, airy, and precise

##### Concierge 11

- 목소리 ID: `es-419-concierge-11`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: neutral
- 음높이: low
- 억양: Argentina Spanish
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Executive Assistant from Argentina. Speaks Argentine Spanish. Currently sitting on couch. Voice is warm and engaging.

##### Digital Assistant 12

- 목소리 ID: `es-419-assistant-12`
- 유형: prebuilt
- 언어: es-419
- 지역: 419
- 성별: neutral
- 음높이: medium
- 억양: Argentina Spanish
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 42-year-old Sibling from Argentina. Speaks Argentine Spanish. Currently in a bookstore. Sounds confident and clear.

### 스페인어·스페인 (es-ES) — 22개

#### 여성 — 9개

##### Call Center Agent 5

- 목소리 ID: `es-es-csagent-5`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: female
- 음높이: medium
- 억양: Castilian Spanish
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Customer Service Agent from Spain. Speaks Castilian Spanish (Castellano). Currently brainstorming in a meeting. Sounds confident and clear.

##### Call Center Agent 6

- 목소리 ID: `es-es-csagent-6`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: female
- 음높이: low
- 억양: Castilian Spanish
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 56-year-old Customer Service Agent from Spain. Speaks Castilian Spanish (Castellano). Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Commercial Voiceover 3

- 목소리 ID: `es-es-commercial-3`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: female
- 음높이: medium
- 억양: Castilian Spanish
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 30-year-old Influencer from Spain. Speaks Castilian Spanish (Castellano). Currently on npr. Voice is warm and engaging.

##### Commercial Voiceover 7

- 목소리 ID: `es-es-commercial-7`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: female
- 음높이: medium
- 억양: Castilian Spanish
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 30-year-old Influencer from Spain. Speaks Castilian Spanish (Castellano). Voice is fast-paced, articulate, energetic.

##### Concierge 3

- 목소리 ID: `es-es-concierge-3`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: female
- 음높이: medium
- 억양: Castilian Spanish
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Executive Assistant from Spain. Speaks Castilian Spanish (Castellano). Voice is comforting someone who is stressed.

##### Podcaster 5

- 목소리 ID: `es-es-podcaster-5`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: female
- 음높이: low
- 억양: Castilian Spanish
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 56-year-old Radio Host from Spain. Speaks Castilian Spanish (Castellano). Voice is resonant and witty.

##### Tech Advisor 5

- 목소리 ID: `es-es-techagent-5`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: female
- 음높이: medium
- 억양: Castilian Spanish
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 29-year-old Tech Support Agent from Spain. Speaks Castilian Spanish (Castellano). Voice is highly approachable.

##### Training Voiceover 12

- 목소리 ID: `es-es-training-12`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: female
- 음높이: high
- 억양: Castilian Spanish
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 47-year-old Instructional Video Host from Spain. Speaks Castilian Spanish (Castellano). Voice is clear, medium-pitch, and friendly.

##### Tutor 12

- 목소리 ID: `es-es-tutor-12`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: female
- 음높이: medium
- 억양: Castilian Spanish
- 역할: Storyteller & Narrator (Therapist)
- 용도: Content & Media
- 공식 설명: 41-year-old Therapist from Spain. Speaks Castilian Spanish (Castellano). Voice is intimate talkshow.

#### 남성 — 12개

##### Authoritative Advisor 2

- 목소리 ID: `es-es-advisor-2`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: male
- 음높이: low
- 억양: Castilian Spanish
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Lawyer from Spain. Speaks Castilian Spanish (Castellano). Tone is peer-to-peer and curious

##### Authoritative Advisor 9

- 목소리 ID: `es-es-advisor-9`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: male
- 음높이: low
- 억양: Castilian Spanish
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 44-year-old Lawyer from Spain. Speaks Castilian Spanish (Castellano). Currently at a meditation retreat. Sounds confident and clear.

##### Call Center Agent 3

- 목소리 ID: `es-es-csagent-3`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: male
- 음높이: low
- 억양: Castilian Spanish
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Sales Associate from Spain. Speaks Castilian Spanish (Castellano). Voice is engaging and empathic.

##### Concierge 12

- 목소리 ID: `es-es-concierge-12`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: male
- 음높이: low
- 억양: Castilian Spanish
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 27-year-old Tour Guide from Spain. Speaks Castilian Spanish (Castellano). Tone is objective, direct, and helpful

##### Concierge 4

- 목소리 ID: `es-es-concierge-4`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: male
- 음높이: low
- 억양: Castilian Spanish
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Tour Guide from Spain. Speaks Castilian Spanish (Castellano). Voice is cool, confident, and collaborative.

##### Digital Assistant 3

- 목소리 ID: `es-es-assistant-3`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: male
- 음높이: low
- 억양: Castilian Spanish
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 59-year-old Sibling from Spain. Speaks Castilian Spanish (Castellano). Voice is resonant and witty.

##### Digital Assistant 4

- 목소리 ID: `es-es-assistant-4`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: male
- 음높이: low
- 억양: Castilian Spanish
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 54-year-old Sibling from Spain. Speaks Castilian Spanish (Castellano). Voice is clear, medium-pitch, and friendly.

##### Podcaster 7

- 목소리 ID: `es-es-podcaster-7`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: male
- 음높이: low
- 억양: Castilian Spanish
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 51-year-old Radio Host from Spain. Speaks Castilian Spanish (Castellano). Tone is objective, direct, and helpful

##### Tech Advisor 4

- 목소리 ID: `es-es-techagent-4`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: male
- 음높이: low
- 억양: Castilian Spanish
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 50-year-old Tech Support Agent from Spain. Speaks Castilian Spanish (Castellano). Currently sitting next to you on an airplane. Voice is warm and engaging.

##### Training Voiceover 11

- 목소리 ID: `es-es-training-11`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: male
- 음높이: low
- 억양: Castilian Spanish
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 31-year-old Cooking Show Host from Spain. Speaks Castilian Spanish (Castellano). Voice is natural and clear.

##### Training Voiceover 3

- 목소리 ID: `es-es-training-3`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: male
- 음높이: low
- 억양: Castilian Spanish
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 44-year-old Cooking Show Host from Spain. Speaks Castilian Spanish (Castellano). Currently on npr. Voice is warm and engaging.

##### Training Voiceover 9

- 목소리 ID: `es-es-training-9`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: male
- 음높이: low
- 억양: Castilian Spanish
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 23-year-old Instructional Video Host from Spain. Speaks Castilian Spanish (Castellano). Currently brainstorming in a meeting. Sounds confident and clear.

#### 중성 — 1개

##### Authoritative Advisor 8

- 목소리 ID: `es-es-advisor-8`
- 유형: prebuilt
- 언어: es-ES
- 지역: ES
- 성별: neutral
- 음높이: low
- 억양: Castilian Spanish
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Lawyer from Spain. Speaks Castilian Spanish (Castellano). Voice is comforting someone who is stressed.

### 프랑스어·캐나다 (fr-CA) — 68개

#### 여성 — 37개

##### Authoritative Advisor 1

- 목소리 ID: `fr-ca-advisor-1`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Montreal French
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Lawyer from Montreal. Speaks Montreal French. Currently on npr. Sounds confident and clear.

##### Authoritative Advisor 4

- 목소리 ID: `fr-ca-advisor-4`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Montreal French
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Financial Advisor from Montreal. Speaks Montreal French. Voice is intimate talkshow.

##### Authoritative Advisor 6

- 목소리 ID: `fr-ca-advisor-6`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Montreal French
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 23-year-old Financial Advisor from Montreal. Speaks Montreal French. Voice is comforting someone who is stressed.

##### Authoritative Advisor 7

- 목소리 ID: `fr-ca-advisor-7`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Montreal French
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 53-year-old Financial Advisor from Montreal. Speaks Montreal French. Voice is textured, resonant, and soothing.

##### Call Center Agent 1

- 목소리 ID: `fr-ca-csagent-1`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Montreal French
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Social Worker from Montreal. Speaks Montreal French. Voice is light, airy, and precise

##### Call Center Agent 3

- 목소리 ID: `fr-ca-csagent-3`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Montreal French
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Customer Service Agent from Montreal. Speaks Montreal French. Currently at an appointment. Voice is warm and engaging.

##### Call Center Agent 4

- 목소리 ID: `fr-ca-csagent-4`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Montreal French
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 22-year-old Social Worker from Montreal. Speaks Montreal French. Currently on the phone. Tone is professional yet approachable.

##### Call Center Agent 7

- 목소리 ID: `fr-ca-csagent-7`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Montreal French
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Social Worker from Montreal. Speaks Montreal French. Voice is comforting someone who is stressed.

##### Commercial Voiceover 1

- 목소리 ID: `fr-ca-commercial-1`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Montreal French
- 역할: Storyteller & Narrator (Fashion Consultant)
- 용도: Content & Media
- 공식 설명: 39-year-old Fashion Consultant from Montreal. Speaks Montreal French. Currently on npr. Sounds confident and clear.

##### Commercial Voiceover 3

- 목소리 ID: `fr-ca-commercial-3`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Montreal French
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 28-year-old Influencer from Montreal. Speaks Montreal French. Voice is comforting someone who is stressed.

##### Commercial Voiceover 4

- 목소리 ID: `fr-ca-commercial-4`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Montreal French
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 21-year-old Influencer from Montreal. Speaks Montreal French. Currently brainstorming in a meeting. Sounds confident and clear.

##### Commercial Voiceover 5

- 목소리 ID: `fr-ca-commercial-5`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Montreal French
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 23-year-old Influencer from Montreal. Speaks Montreal French. Currently in a bookstore. Sounds confident and clear.

##### Commercial Voiceover 6

- 목소리 ID: `fr-ca-commercial-6`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Montreal French
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 26-year-old Influencer from Montreal. Speaks Montreal French. Voice is clear, medium-pitch, and friendly.

##### Commercial Voiceover 7

- 목소리 ID: `fr-ca-commercial-7`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Montreal French
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 60-year-old Fashion Consultant from Montreal. Speaks Montreal French. Voice is cool, confident, and collaborative.

##### Concierge 2

- 목소리 ID: `fr-ca-concierge-2`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Montreal French
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 58-year-old Tour Guide from Montreal. Speaks Montreal French. Voice is intimate talkshow.

##### Concierge 4

- 목소리 ID: `fr-ca-concierge-4`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Montreal French
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Tour Guide from Montreal. Speaks Montreal French. Currently in a bookstore. Tone is professional yet approachable.

##### Concierge 7

- 목소리 ID: `fr-ca-concierge-7`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Montreal French
- 역할: Concierge & EA
- 용도: Enterprise Agent
- 공식 설명: 58-year-old Concierge from Montreal. Speaks Montreal French. Voice is crisp and eager.

##### Concierge 8

- 목소리 ID: `fr-ca-concierge-8`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Montreal French
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Hotel Concierge from Montreal. Speaks Montreal French. Voice is crisp and eager.

##### Digital Assistant 1

- 목소리 ID: `fr-ca-assistant-1`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Montreal French
- 역할: Companion & Peer / Digital Assistant (Grandparent)
- 용도: Conversational / Edu
- 공식 설명: 60-year-old Grandparent from Montreal. Speaks Montreal French. Voice is light, airy, and precise

##### Digital Assistant 3

- 목소리 ID: `fr-ca-assistant-3`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Montreal French
- 역할: Companion & Peer / Digital Assistant (Grandparent)
- 용도: Conversational / Edu
- 공식 설명: 86-year-old Grandparent from Montreal. Speaks Montreal French. Voice is cool, confident, and collaborative.

##### Digital Assistant 4

- 목소리 ID: `fr-ca-assistant-4`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Montreal French
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 34-year-old Parent from Montreal. Speaks Montreal French. Voice is crisp and eager.

##### Digital Assistant 6

- 목소리 ID: `fr-ca-assistant-6`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Montreal French
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 50-year-old Parent from Montreal. Speaks Montreal French. Currently on the phone. Tone is professional yet approachable.

##### Digital Assistant 7

- 목소리 ID: `fr-ca-assistant-7`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Montreal French
- 역할: Tech Support Agent / Tech Advisor (Grandparent)
- 용도: Enterprise Agent
- 공식 설명: 61-year-old Grandparent from Montreal. Speaks Montreal French. Currently sitting on couch. Sounds confident and clear.

##### Podcaster 1

- 목소리 ID: `fr-ca-podcaster-1`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Montreal French
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 25-year-old Radio Host from Montreal. Speaks Montreal French. Voice is clear, medium-pitch, and friendly.

##### Podcaster 3

- 목소리 ID: `fr-ca-podcaster-3`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Montreal French
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 25-year-old Radio Host from Montreal. Speaks Montreal French. Voice is clear, medium-pitch, and friendly.

##### Podcaster 5

- 목소리 ID: `fr-ca-podcaster-5`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Montreal French
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 27-year-old Radio Host from Montreal. Speaks Montreal French. Voice is deep, velvety, and unhurried.

##### Podcaster 7

- 목소리 ID: `fr-ca-podcaster-7`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Montreal French
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 49-year-old Radio Host from Montreal. Speaks Montreal French. Currently brainstorming in a meeting. Sounds confident and clear.

##### Storyteller 1

- 목소리 ID: `fr-ca-storyteller-1`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Montreal French
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 29-year-old Storyteller from Montreal. Speaks Montreal French. Currently sitting next to you on the bus. Voice is warm and engaging.

##### Storyteller 3

- 목소리 ID: `fr-ca-storyteller-3`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Montreal French
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 65-year-old Philosopher from Montreal. Speaks Montreal French. Currently sitting on couch. Sounds confident and clear.

##### Tech Advisor 1

- 목소리 ID: `fr-ca-techagent-1`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Montreal French
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Architect from Montreal. Speaks Montreal French. Voice is engaging and empathic.

##### Tech Advisor 3

- 목소리 ID: `fr-ca-techagent-3`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Montreal French
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 44-year-old Architect from Montreal. Speaks Montreal French. Currently in an oscar winning film. Sounds confident and clear.

##### Training Voiceover 2

- 목소리 ID: `fr-ca-training-2`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Montreal French
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 34-year-old Cooking Show Host from Montreal. Speaks Montreal French. Voice is intimate talkshow.

##### Training Voiceover 3

- 목소리 ID: `fr-ca-training-3`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Montreal French
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 44-year-old Cooking Show Host from Montreal. Speaks Montreal French. Tone is objective, direct, and helpful

##### Tutor 1

- 목소리 ID: `fr-ca-tutor-1`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: high
- 억양: Montreal French
- 역할: Tech Support Agent / Tech Advisor (Librarian)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Librarian from Montreal. Speaks Montreal French. Voice is natural and clear.

##### Tutor 3

- 목소리 ID: `fr-ca-tutor-3`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: low
- 억양: Montreal French
- 역할: Educational Tutor (Librarian)
- 용도: Conversational / Edu
- 공식 설명: 46-year-old Librarian from Montreal. Speaks Montreal French. Voice is textured, resonant, and soothing.

##### Tutor 5

- 목소리 ID: `fr-ca-tutor-5`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Montreal French
- 역할: Coach & Motivational Guide (Mentor)
- 용도: Wellness & Culture
- 공식 설명: 25-year-old Mentor from Montreal. Speaks Montreal French. Voice is engaging and empathic.

##### Tutor 7

- 목소리 ID: `fr-ca-tutor-7`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: female
- 음높이: medium
- 억양: Montreal French
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 37-year-old Chess Instructor from Montreal. Speaks Montreal French. Tone is peer-to-peer and curious

#### 남성 — 31개

##### Authoritative Advisor 2

- 목소리 ID: `fr-ca-advisor-2`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: medium
- 억양: Montreal French
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Lawyer from Montreal. Speaks Montreal French. Currently sitting on couch. Voice is warm and engaging.

##### Authoritative Advisor 3

- 목소리 ID: `fr-ca-advisor-3`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 60-year-old Financial Advisor from Montreal. Speaks Montreal French. Currently at an appointment. Sounds confident and clear.

##### Authoritative Advisor 5

- 목소리 ID: `fr-ca-advisor-5`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 58-year-old Financial Advisor from Montreal. Speaks Montreal French. Voice is clear, medium-pitch, and friendly.

##### Authoritative Advisor 8

- 목소리 ID: `fr-ca-advisor-8`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 23-year-old Financial Advisor from Montreal. Speaks Montreal French. Voice is intimate talkshow.

##### Call Center Agent 2

- 목소리 ID: `fr-ca-csagent-2`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Sales Associate from Montreal. Speaks Montreal French. Tone is reflective, calm, and reassuring

##### Call Center Agent 5

- 목소리 ID: `fr-ca-csagent-5`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 60-year-old Sales Associate from Montreal. Speaks Montreal French. Voice is clear, medium-pitch, and friendly.

##### Call Center Agent 6

- 목소리 ID: `fr-ca-csagent-6`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 57-year-old Sales Associate from Montreal. Speaks Montreal French. Currently on npr. Sounds confident and clear.

##### Call Center Agent 8

- 목소리 ID: `fr-ca-csagent-8`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: medium
- 억양: Montreal French
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Social Worker from Montreal. Speaks Montreal French. Currently sitting on couch. Sounds confident and clear.

##### Commercial Voiceover 2

- 목소리 ID: `fr-ca-commercial-2`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 51-year-old Fashion Consultant from Montreal. Speaks Montreal French. Voice is light, airy, and precise

##### Commercial Voiceover 8

- 목소리 ID: `fr-ca-commercial-8`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: high
- 억양: Montreal French
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 40-year-old Fashion Consultant from Montreal. Speaks Montreal French. Tone is objective, direct, and helpful

##### Concierge 1

- 목소리 ID: `fr-ca-concierge-1`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 45-year-old Tour Guide from Montreal. Speaks Montreal French. Currently sitting next to you on an airplane. Tone is professional yet approachable.

##### Concierge 3

- 목소리 ID: `fr-ca-concierge-3`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 53-year-old Tour Guide from Montreal. Speaks Montreal French. Currently brainstorming in a meeting. Sounds confident and clear.

##### Concierge 5

- 목소리 ID: `fr-ca-concierge-5`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Tour Guide from Montreal. Speaks Montreal French. Voice is intimate talkshow.

##### Concierge 6

- 목소리 ID: `fr-ca-concierge-6`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Tour Guide from Montreal. Speaks Montreal French. Currently sitting on couch. Sounds confident and clear.

##### Digital Assistant 2

- 목소리 ID: `fr-ca-assistant-2`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 48-year-old Parent from Montreal. Speaks Montreal French. Currently on podcast. Tone is professional yet approachable.

##### Digital Assistant 5

- 목소리 ID: `fr-ca-assistant-5`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 43-year-old Parent from Montreal. Speaks Montreal French. Tone is conversational, slightly dry humor, and warm

##### Digital Assistant 8

- 목소리 ID: `fr-ca-assistant-8`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: medium
- 억양: Montreal French
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 35-year-old Parent from Montreal. Speaks Montreal French. Tone is enthusiastic, engaging, and fun

##### Podcaster 2

- 목소리 ID: `fr-ca-podcaster-2`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 41-year-old Radio Host from Montreal. Speaks Montreal French. Tone is conversational, slightly dry humor, and warm

##### Podcaster 4

- 목소리 ID: `fr-ca-podcaster-4`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 52-year-old Radio Host from Montreal. Speaks Montreal French. Voice is laid-back, encouraging, and chill.

##### Podcaster 6

- 목소리 ID: `fr-ca-podcaster-6`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: medium
- 억양: Montreal French
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 25-year-old Radio Host from Montreal. Speaks Montreal French. Currently at an appointment. Tone is professional yet approachable.

##### Podcaster 8

- 목소리 ID: `fr-ca-podcaster-8`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: News & Podcast Host / Podcaster (Journalist)
- 용도: Content & Media
- 공식 설명: 47-year-old Journalist from Montreal. Speaks Montreal French. Currently at an appointment. Tone is professional yet approachable.

##### Storyteller 2

- 목소리 ID: `fr-ca-storyteller-2`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 61-year-old Storyteller from Montreal. Speaks Montreal French. Currently at a meditation retreat. Voice is warm and engaging.

##### Tech Advisor 2

- 목소리 ID: `fr-ca-techagent-2`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Architect from Montreal. Speaks Montreal French. Currently in an indie film. Voice is warm and engaging.

##### Tech Advisor 4

- 목소리 ID: `fr-ca-techagent-4`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Architect from Montreal. Speaks Montreal French. Currently sitting next to you on an airplane. Voice is warm and engaging.

##### Training Voiceover 1

- 목소리 ID: `fr-ca-training-1`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 40-year-old Cooking Show Host from Montreal. Speaks Montreal French. Voice is cool, confident, and collaborative.

##### Training Voiceover 4

- 목소리 ID: `fr-ca-training-4`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 26-year-old Cooking Show Host from Montreal. Speaks Montreal French. Currently on the phone. Voice is warm and engaging.

##### Training Voiceover 5

- 목소리 ID: `fr-ca-training-5`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 45-year-old Cooking Show Host from Montreal. Speaks Montreal French. Voice is natural and clear.

##### Tutor 2

- 목소리 ID: `fr-ca-tutor-2`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 54-year-old Writing Tutor from Montreal. Speaks Montreal French. Currently sitting next to you on the bus. Sounds confident and clear.

##### Tutor 4

- 목소리 ID: `fr-ca-tutor-4`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 25-year-old Chess Instructor from Montreal. Speaks Montreal French. Currently sitting on couch. Voice is warm and engaging.

##### Tutor 6

- 목소리 ID: `fr-ca-tutor-6`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: Coach & Motivational Guide (Mentor)
- 용도: Wellness & Culture
- 공식 설명: 28-year-old Mentor from Montreal. Speaks Montreal French. Voice is textured, resonant, and soothing.

##### Tutor 8

- 목소리 ID: `fr-ca-tutor-8`
- 유형: prebuilt
- 언어: fr-CA
- 지역: CA
- 성별: male
- 음높이: low
- 억양: Montreal French
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 29-year-old Professor from Montreal. Speaks Montreal French. Voice is textured, resonant, and soothing.

### 프랑스어·프랑스 (fr-FR) — 81개

#### 여성 — 48개

##### Authoritative Advisor 1

- 목소리 ID: `fr-fr-advisor-1`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: Tech Support Agent / Tech Advisor (Financial Advisor) | High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Financial Advisor from Paris. Speaks Paris French. Voice is natural and clear.

##### Authoritative Advisor 10

- 목소리 ID: `fr-fr-advisor-10`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: high
- 억양: Paris French
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Financial Advisor from Paris. Speaks Paris French. Voice is crisp and eager.

##### Authoritative Advisor 11

- 목소리 ID: `fr-fr-advisor-11`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Lawyer from Paris. Speaks Paris French. Voice is light, airy, and precise

##### Authoritative Advisor 12

- 목소리 ID: `fr-fr-advisor-12`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Lawyer from Paris. Speaks Paris French. Voice is engaging and empathic.

##### Authoritative Advisor 3

- 목소리 ID: `fr-fr-advisor-3`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: low
- 억양: Paris French
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Lawyer from Paris. Speaks Paris French. Voice is natural and clear.

##### Authoritative Advisor 5

- 목소리 ID: `fr-fr-advisor-5`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: high
- 억양: Paris French
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Lawyer from Paris. Speaks Paris French. Voice is highly approachable.

##### Authoritative Advisor 6

- 목소리 ID: `fr-fr-advisor-6`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Lawyer from Paris. Speaks Paris French. Voice is clear, medium-pitch, and friendly.

##### Authoritative Advisor 7

- 목소리 ID: `fr-fr-advisor-7`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Lawyer from Paris. Speaks Paris French. Currently on npr. Sounds confident and clear.

##### Authoritative Advisor 8

- 목소리 ID: `fr-fr-advisor-8`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: low
- 억양: Paris French
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Lawyer from Paris. Speaks Paris French. Currently sitting next to you on an airplane. Tone is professional yet approachable.

##### Authoritative Advisor 9

- 목소리 ID: `fr-fr-advisor-9`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 29-year-old Financial Advisor from Paris. Speaks Paris French. Currently at a meditation retreat. Voice is warm and engaging.

##### Call Center Agent 1

- 목소리 ID: `fr-fr-csagent-1`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: low
- 억양: Paris French
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Social Worker from Paris. Speaks Paris French. Voice is highly approachable.

##### Call Center Agent 11

- 목소리 ID: `fr-fr-csagent-11`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: high
- 억양: Paris French
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 62-year-old Customer Service Agent from Paris. Speaks Paris French. Voice is highly approachable.

##### Call Center Agent 12

- 목소리 ID: `fr-fr-csagent-12`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: low
- 억양: Paris French
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 59-year-old Social Worker from Paris. Speaks Paris French. Voice is laid-back, encouraging, and chill.

##### Call Center Agent 3

- 목소리 ID: `fr-fr-csagent-3`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 51-year-old Customer Service Agent from Paris. Speaks Paris French. Voice is textured, resonant, and soothing.

##### Call Center Agent 5

- 목소리 ID: `fr-fr-csagent-5`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: low
- 억양: Paris French
- 역할: Tech Support Agent / Tech Advisor (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 23-year-old Social Worker from Paris. Speaks Paris French. Voice is engaging and empathic.

##### Call Center Agent 6

- 목소리 ID: `fr-fr-csagent-6`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: high
- 억양: Paris French
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Customer Service Agent from Paris. Speaks Paris French. Currently in a bookstore. Voice is warm and engaging.

##### Call Center Agent 7

- 목소리 ID: `fr-fr-csagent-7`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Customer Service Agent from Paris. Speaks Paris French. Currently in an oscar winning film. Sounds confident and clear.

##### Call Center Agent 8

- 목소리 ID: `fr-fr-csagent-8`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 45-year-old Social Worker from Paris. Speaks Paris French. Voice is intimate talkshow.

##### Concierge 1

- 목소리 ID: `fr-fr-concierge-1`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: Tech Support Agent / Tech Advisor (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Tour Guide from Paris. Speaks Paris French. Currently sitting on couch. Sounds confident and clear.

##### Concierge 12

- 목소리 ID: `fr-fr-concierge-12`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: high
- 억양: Paris French
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Executive Assistant from Paris. Speaks Paris French. Voice is fast-paced, articulate, energetic.

##### Concierge 3

- 목소리 ID: `fr-fr-concierge-3`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 58-year-old Tour Guide from Paris. Speaks Paris French. Currently sitting next to you on the bus. Sounds confident and clear.

##### Concierge 5

- 목소리 ID: `fr-fr-concierge-5`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 23-year-old Executive Assistant from Paris. Speaks Paris French. Voice is comforting someone who is stressed.

##### Concierge 6

- 목소리 ID: `fr-fr-concierge-6`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Hotel Concierge from Paris. Speaks Paris French. Voice is crisp and eager.

##### Concierge 9

- 목소리 ID: `fr-fr-concierge-9`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: high
- 억양: Paris French
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Tour Guide from Paris. Speaks Paris French. Currently on podcast. Tone is professional yet approachable.

##### Digital Assistant 1

- 목소리 ID: `fr-fr-assistant-1`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: Customer Support Agent / Call Center Agent (Sibling) | Companion & Peer / Digital Assistant (Sibling)
- 용도: Enterprise Agent | Conversational / Edu
- 공식 설명: 35-year-old Sibling from Paris. Speaks Paris French. Tone is enthusiastic, engaging, and fun

##### Digital Assistant 12

- 목소리 ID: `fr-fr-assistant-12`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: high
- 억양: Paris French
- 역할: Companion & Peer / Digital Assistant (Best Friend)
- 용도: Conversational / Edu
- 공식 설명: 22-year-old Best Friend from Paris. Speaks Paris French. Voice is bright, breezy, and youthful.

##### Digital Assistant 3

- 목소리 ID: `fr-fr-assistant-3`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: high
- 억양: Paris French
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 31-year-old Friend from Paris. Speaks Paris French. Voice is relaxed.

##### Digital Assistant 5

- 목소리 ID: `fr-fr-assistant-5`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: low
- 억양: Paris French
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 44-year-old Sibling from Paris. Speaks Paris French. Currently at an appointment. Voice is warm and engaging.

##### Digital Assistant 6

- 목소리 ID: `fr-fr-assistant-6`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: high
- 억양: Paris French
- 역할: Storyteller & Narrator (Sibling)
- 용도: Content & Media
- 공식 설명: 31-year-old Sibling from Paris. Speaks Paris French. Voice is energetic, colorful, and fast

##### Digital Assistant 8

- 목소리 ID: `fr-fr-assistant-8`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: News & Podcast Host / Podcaster (Parent)
- 용도: Content & Media
- 공식 설명: 45-year-old Parent from Paris. Speaks Paris French. Currently in an indie film. Sounds confident and clear.

##### Podcaster 1

- 목소리 ID: `fr-fr-podcaster-1`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: low
- 억양: Paris French
- 역할: Tech Support Agent / Tech Advisor (Radio Host) | News & Podcast Host / Podcaster (Radio Host)
- 용도: Enterprise Agent | Content & Media
- 공식 설명: 41-year-old Radio Host from Paris. Speaks Paris French. Voice is clear, medium-pitch, and friendly.

##### Podcaster 11

- 목소리 ID: `fr-fr-podcaster-11`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: Character & Theatrical (Podcast Interviewer)
- 용도: Entertainment & Gaming
- 공식 설명: 50-year-old Podcast Interviewer from Paris. Speaks Paris French. Tone is objective, direct, and helpful

##### Podcaster 3

- 목소리 ID: `fr-fr-podcaster-3`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: high
- 억양: Paris French
- 역할: Tech Support Agent / Tech Advisor (Podcast Interviewer) | News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Enterprise Agent | Content & Media
- 공식 설명: 34-year-old Podcast Interviewer from Paris. Speaks Paris French. Currently at an appointment. Sounds confident and clear.

##### Podcaster 5

- 목소리 ID: `fr-fr-podcaster-5`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: Character & Theatrical (Radio Host)
- 용도: Entertainment & Gaming
- 공식 설명: 61-year-old Radio Host from Paris. Speaks Paris French. Currently in an oscar winning film. Tone is professional yet approachable.

##### Podcaster 7

- 목소리 ID: `fr-fr-podcaster-7`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: low
- 억양: Paris French
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 46-year-old Podcast Interviewer from Paris. Speaks Paris French. Voice is intimate talkshow.

##### Podcaster 9

- 목소리 ID: `fr-fr-podcaster-9`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 28-year-old Radio Host from Paris. Speaks Paris French. Voice is natural and clear.

##### Training Voiceover 1

- 목소리 ID: `fr-fr-training-1`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: Storyteller & Narrator (Cooking Show Host) | Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 28-year-old Cooking Show Host from Paris. Speaks Paris French. Voice is fast-paced, articulate, energetic.

##### Training Voiceover 3

- 목소리 ID: `fr-fr-training-3`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: high
- 억양: Paris French
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 46-year-old Cooking Show Host from Paris. Speaks Paris French. Voice is fast-paced, articulate, energetic.

##### Training Voiceover 5

- 목소리 ID: `fr-fr-training-5`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: high
- 억양: Paris French
- 역할: Storyteller & Narrator (Cooking Show Host) | Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 53-year-old Cooking Show Host from Paris. Speaks Paris French. Voice is energetic, colorful, and fast

##### Training Voiceover 6

- 목소리 ID: `fr-fr-training-6`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: low
- 억양: Paris French
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Cooking Show Host)
- 용도: Growth & Marketing
- 공식 설명: 46-year-old Cooking Show Host from Paris. Speaks Paris French. Currently sitting next to you on an airplane. Voice is warm and engaging.

##### Training Voiceover 7

- 목소리 ID: `fr-fr-training-7`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: low
- 억양: Paris French
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 43-year-old Cooking Show Host from Paris. Speaks Paris French. Voice is relaxed.

##### Training Voiceover 8

- 목소리 ID: `fr-fr-training-8`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: low
- 억양: Paris French
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 50-year-old Cooking Show Host from Paris. Speaks Paris French. Voice is textured, resonant, and soothing.

##### Tutor 11

- 목소리 ID: `fr-fr-tutor-11`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: low
- 억양: Paris French
- 역할: News & Podcast Host / Podcaster (Fitness Trainer)
- 용도: Content & Media
- 공식 설명: 36-year-old Fitness Trainer from Paris. Speaks Paris French. Currently at a meditation retreat. Tone is professional yet approachable.

##### Tutor 12

- 목소리 ID: `fr-fr-tutor-12`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: Educational Tutor
- 용도: Conversational / Edu
- 공식 설명: 26-year-old Tutor from Paris. Speaks Paris French. Voice is light, airy, and precise

##### Tutor 2

- 목소리 ID: `fr-fr-tutor-2`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: low
- 억양: Paris French
- 역할: Storyteller & Narrator (Fitness Trainer) | Coach & Motivational Guide (Fitness Trainer)
- 용도: Content & Media | Wellness & Culture
- 공식 설명: 54-year-old Fitness Trainer from Paris. Speaks Paris French. Voice is deep, velvety, and unhurried.

##### Tutor 4

- 목소리 ID: `fr-fr-tutor-4`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: Tech Support Agent / Tech Advisor (Therapist) | Coach & Motivational Guide (Therapist)
- 용도: Enterprise Agent | Wellness & Culture
- 공식 설명: 41-year-old Therapist from Paris. Speaks Paris French. Currently on npr. Voice is warm and engaging.

##### Tutor 5

- 목소리 ID: `fr-fr-tutor-5`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: medium
- 억양: Paris French
- 역할: High-Trust Advisor / Authoritative Advisor (Therapist)
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Therapist from Paris. Speaks Paris French. Voice is clear, medium-pitch, and friendly.

##### Tutor 9

- 목소리 ID: `fr-fr-tutor-9`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: female
- 음높이: high
- 억양: Paris French
- 역할: Storyteller & Narrator (Nutritionist) | Coach & Motivational Guide (Nutritionist)
- 용도: Content & Media | Wellness & Culture
- 공식 설명: 34-year-old Nutritionist from Paris. Speaks Paris French. Voice is relaxed.

#### 남성 — 28개

##### Authoritative Advisor 2

- 목소리 ID: `fr-fr-advisor-2`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: Tech Support Agent / Tech Advisor (Lawyer) | High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Lawyer from Paris. Speaks Paris French. Voice is highly approachable.

##### Authoritative Advisor 4

- 목소리 ID: `fr-fr-advisor-4`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Lawyer from Paris. Speaks Paris French. Currently brainstorming in a meeting. Sounds confident and clear.

##### Call Center Agent 2

- 목소리 ID: `fr-fr-csagent-2`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Customer Service Agent)
- 용도: Growth & Marketing
- 공식 설명: 28-year-old Customer Service Agent from Paris. Speaks Paris French. Voice is crisp and eager.

##### Call Center Agent 4

- 목소리 ID: `fr-fr-csagent-4`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 60-year-old Social Worker from Paris. Speaks Paris French. Tone is peer-to-peer and curious

##### Concierge 11

- 목소리 ID: `fr-fr-concierge-11`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Executive Assistant from Paris. Speaks Paris French. Currently in an indie film. Tone is professional yet approachable.

##### Concierge 2

- 목소리 ID: `fr-fr-concierge-2`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 26-year-old Tour Guide from Paris. Speaks Paris French. Tone is enthusiastic, engaging, and fun

##### Concierge 4

- 목소리 ID: `fr-fr-concierge-4`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 55-year-old Tour Guide from Paris. Speaks Paris French. Tone is peer-to-peer and curious

##### Concierge 7

- 목소리 ID: `fr-fr-concierge-7`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: medium
- 억양: Paris French
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Executive Assistant from Paris. Speaks Paris French. Voice is cool, confident, and collaborative.

##### Concierge 8

- 목소리 ID: `fr-fr-concierge-8`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Tour Guide from Paris. Speaks Paris French. Currently sitting next to you on the bus. Sounds confident and clear.

##### Digital Assistant 10

- 목소리 ID: `fr-fr-assistant-10`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 35-year-old Sibling from Paris. Speaks Paris French. Voice is engaging and empathic.

##### Digital Assistant 11

- 목소리 ID: `fr-fr-assistant-11`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 33-year-old Parent from Paris. Speaks Paris French. Voice is light, airy, and precise

##### Digital Assistant 2

- 목소리 ID: `fr-fr-assistant-2`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 39-year-old Friend from Paris. Speaks Paris French. Tone is objective, direct, and helpful

##### Digital Assistant 4

- 목소리 ID: `fr-fr-assistant-4`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 61-year-old Sibling from Paris. Speaks Paris French. Currently brainstorming in a meeting. Sounds confident and clear.

##### Digital Assistant 7

- 목소리 ID: `fr-fr-assistant-7`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 34-year-old Friend from Paris. Speaks Paris French. Currently brainstorming in a meeting. Sounds confident and clear.

##### Podcaster 12

- 목소리 ID: `fr-fr-podcaster-12`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 55-year-old Podcast Interviewer from Paris. Speaks Paris French. Voice is natural and clear.

##### Podcaster 2

- 목소리 ID: `fr-fr-podcaster-2`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 34-year-old Radio Host from Paris. Speaks Paris French. Voice is resonant and witty.

##### Podcaster 4

- 목소리 ID: `fr-fr-podcaster-4`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 51-year-old Radio Host from Paris. Speaks Paris French. Voice is laid-back, encouraging, and chill.

##### Podcaster 6

- 목소리 ID: `fr-fr-podcaster-6`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: medium
- 억양: Paris French
- 역할: Character & Theatrical (Radio Host)
- 용도: Entertainment & Gaming
- 공식 설명: 26-year-old Radio Host from Paris. Speaks Paris French. Currently in a bookstore. Sounds confident and clear.

##### Podcaster 8

- 목소리 ID: `fr-fr-podcaster-8`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 28-year-old Podcast Interviewer from Paris. Speaks Paris French. Currently on podcast. Voice is warm and engaging.

##### Training Voiceover 2

- 목소리 ID: `fr-fr-training-2`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 49-year-old Cooking Show Host from Paris. Speaks Paris French. Voice is resonant and witty.

##### Training Voiceover 4

- 목소리 ID: `fr-fr-training-4`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 25-year-old Cooking Show Host from Paris. Speaks Paris French. Currently in an oscar winning film. Tone is professional yet approachable.

##### Training Voiceover 9

- 목소리 ID: `fr-fr-training-9`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 34-year-old Cooking Show Host from Paris. Speaks Paris French. Voice is cool, confident, and collaborative.

##### Tutor 1

- 목소리 ID: `fr-fr-tutor-1`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: Customer Support Agent / Call Center Agent (Fitness Trainer) | Coach & Motivational Guide (Fitness Trainer)
- 용도: Enterprise Agent | Wellness & Culture
- 공식 설명: 42-year-old Fitness Trainer from Paris. Speaks Paris French. Voice is light, airy, and precise

##### Tutor 10

- 목소리 ID: `fr-fr-tutor-10`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: Educational Tutor
- 용도: Conversational / Edu
- 공식 설명: 30-year-old Tutor from Paris. Speaks Paris French. Currently at an appointment. Sounds confident and clear.

##### Tutor 3

- 목소리 ID: `fr-fr-tutor-3`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: Tech Support Agent / Tech Advisor (Professor) | Educational Tutor (Professor)
- 용도: Enterprise Agent | Conversational / Edu
- 공식 설명: 23-year-old Professor from Paris. Speaks Paris French. Voice is energetic, colorful, and fast

##### Tutor 6

- 목소리 ID: `fr-fr-tutor-6`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: Tech Support Agent / Tech Advisor (Teacher) | Educational Tutor (Teacher)
- 용도: Enterprise Agent | Conversational / Edu
- 공식 설명: 59-year-old Teacher from Paris. Speaks Paris French. Currently sitting on couch. Voice is warm and engaging.

##### Tutor 7

- 목소리 ID: `fr-fr-tutor-7`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: low
- 억양: Paris French
- 역할: High-Trust Advisor / Authoritative Advisor (Teacher) | Educational Tutor (Teacher)
- 용도: Enterprise Agent | Conversational / Edu
- 공식 설명: 61-year-old Teacher from Paris. Speaks Paris French. Tone is conversational, slightly dry humor, and warm

##### Tutor 8

- 목소리 ID: `fr-fr-tutor-8`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: male
- 음높이: medium
- 억양: Paris French
- 역할: High-Trust Advisor / Authoritative Advisor (Professor) | Educational Tutor (Professor)
- 용도: Enterprise Agent | Conversational / Edu
- 공식 설명: 52-year-old Professor from Paris. Speaks Paris French. Voice is fast-paced, articulate, energetic.

#### 중성 — 5개

##### Call Center Agent 10

- 목소리 ID: `fr-fr-csagent-10`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: neutral
- 음높이: medium
- 억양: Paris French
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 53-year-old Sales Associate from Paris. Speaks Paris French. Voice is relaxed.

##### Call Center Agent 9

- 목소리 ID: `fr-fr-csagent-9`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: neutral
- 음높이: medium
- 억양: Paris French
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 53-year-old Sales Associate from Paris. Speaks Paris French. Voice is relaxed.

##### Concierge 10

- 목소리 ID: `fr-fr-concierge-10`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: neutral
- 음높이: medium
- 억양: Paris French
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Executive Assistant from Paris. Speaks Paris French. Currently in a bookstore. Sounds confident and clear.

##### Digital Assistant 9

- 목소리 ID: `fr-fr-assistant-9`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: neutral
- 음높이: low
- 억양: Paris French
- 역할: Storyteller & Narrator (Parent)
- 용도: Content & Media
- 공식 설명: 45-year-old Parent from Paris. Speaks Paris French. Voice is intimate talkshow.

##### Podcaster 10

- 목소리 ID: `fr-fr-podcaster-10`
- 유형: prebuilt
- 언어: fr-FR
- 지역: FR
- 성별: neutral
- 음높이: medium
- 억양: Paris French
- 역할: Character & Theatrical (Radio Host)
- 용도: Entertainment & Gaming
- 공식 설명: 22-year-old Radio Host from Paris. Speaks Paris French. Tone is enthusiastic, engaging, and fun

### 힌디어·인도 (hi-IN) — 114개

#### 여성 — 57개

##### Authoritative Advisor 1

- 목소리 ID: `hi-in-advisor-1`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Awadhi Hindi
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Lawyer from Uttar Pradesh, India. Speaks Awadhi Hindi. Voice is comforting someone who is stressed.

##### Authoritative Advisor 12

- 목소리 ID: `hi-in-advisor-12`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Urdu
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 54-year-old Financial Advisor from Delhi, India. Speaks Urdu. Currently sitting on couch. Voice is warm and engaging.

##### Authoritative Advisor 3

- 목소리 ID: `hi-in-advisor-3`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Haryanvi Hindi
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Lawyer from Haryana, India. Speaks Haryanvi Hindi. Currently sitting next to you on the bus. Voice is warm and engaging.

##### Authoritative Advisor 5

- 목소리 ID: `hi-in-advisor-5`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Awadhi Hindi
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 48-year-old Lawyer from Uttar Pradesh, India. Speaks Awadhi Hindi. Currently at an appointment. Voice is warm and engaging.

##### Authoritative Advisor 7

- 목소리 ID: `hi-in-advisor-7`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Bhojpuri Hindi
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Financial Advisor from Bihar, India. Speaks Bhojpuri Hindi. Voice is highly approachable.

##### Authoritative Advisor 8

- 목소리 ID: `hi-in-advisor-8`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Haryanvi Hindi
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Lawyer from Haryana, India. Speaks Haryanvi Hindi. Currently sitting next to you on the bus. Voice is warm and engaging.

##### Call Center Agent 1

- 목소리 ID: `hi-in-csagent-1`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Haryanvi Hindi
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Customer Service Agent from Haryana, India. Speaks Haryanvi Hindi. Currently on podcast. Sounds confident and clear.

##### Call Center Agent 10

- 목소리 ID: `hi-in-csagent-10`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Bhojpuri Hindi
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Customer Service Agent from Bihar, India. Speaks Bhojpuri Hindi. Voice is highly approachable.

##### Call Center Agent 12

- 목소리 ID: `hi-in-csagent-12`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Bhojpuri Hindi
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 56-year-old Customer Service Agent from Bihar, India. Speaks Bhojpuri Hindi. Tone is peer-to-peer and curious

##### Call Center Agent 4

- 목소리 ID: `hi-in-csagent-4`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Urdu
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Social Worker from Delhi, India. Speaks Urdu. Voice is crisp and eager.

##### Call Center Agent 6

- 목소리 ID: `hi-in-csagent-6`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Haryanvi Hindi
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Customer Service Agent from Haryana, India. Speaks Haryanvi Hindi. Currently sitting on couch. Sounds confident and clear.

##### Call Center Agent 8

- 목소리 ID: `hi-in-csagent-8`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Haryanvi Hindi
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 52-year-old Customer Service Agent from Haryana, India. Speaks Haryanvi Hindi. Tone is enthusiastic, engaging, and fun

##### Commercial Voiceover 1

- 목소리 ID: `hi-in-commercial-1`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Haryanvi Hindi
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 26-year-old Influencer from Haryana, India. Speaks Haryanvi Hindi. Currently on the phone. Tone is professional yet approachable.

##### Commercial Voiceover 11

- 목소리 ID: `hi-in-commercial-11`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Urdu
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 35-year-old Fashion Consultant from Delhi, India. Speaks Urdu. Voice is light, airy, and precise

##### Commercial Voiceover 3

- 목소리 ID: `hi-in-commercial-3`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Bhojpuri Hindi
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 25-year-old Influencer from Bihar, India. Speaks Bhojpuri Hindi. Currently in a bookstore. Sounds confident and clear.

##### Commercial Voiceover 5

- 목소리 ID: `hi-in-commercial-5`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Awadhi Hindi
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 20-year-old Influencer from Uttar Pradesh, India. Speaks Awadhi Hindi. Currently in an indie film. Tone is professional yet approachable.

##### Commercial Voiceover 6

- 목소리 ID: `hi-in-commercial-6`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Bundeli Hindi
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 21-year-old Influencer from Madhya Pradesh, India. Speaks Bundeli Hindi. Voice is clear, medium-pitch, and friendly.

##### Commercial Voiceover 7

- 목소리 ID: `hi-in-commercial-7`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Awadhi Hindi
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 20-year-old Influencer from Uttar Pradesh, India. Speaks Awadhi Hindi. Currently in an indie film. Tone is professional yet approachable.

##### Concierge 1

- 목소리 ID: `hi-in-concierge-1`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Bhojpuri Hindi
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Tour Guide from Bihar, India. Speaks Bhojpuri Hindi. Currently at an appointment. Tone is professional yet approachable.

##### Concierge 12

- 목소리 ID: `hi-in-concierge-12`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Urdu
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Tour Guide from Delhi, India. Speaks Urdu. Tone is peer-to-peer and curious

##### Concierge 3

- 목소리 ID: `hi-in-concierge-3`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Awadhi Hindi
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 54-year-old Tour Guide from Uttar Pradesh, India. Speaks Awadhi Hindi. Voice is deep, velvety, and unhurried.

##### Concierge 6

- 목소리 ID: `hi-in-concierge-6`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Awadhi Hindi
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 28-year-old Tour Guide from Uttar Pradesh, India. Speaks Awadhi Hindi. Tone is objective, direct, and helpful

##### Concierge 7

- 목소리 ID: `hi-in-concierge-7`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Bundeli Hindi
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 65-year-old Tour Guide from Madhya Pradesh, India. Speaks Bundeli Hindi. Voice is deep, velvety, and unhurried.

##### Concierge 8

- 목소리 ID: `hi-in-concierge-8`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Urdu
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 62-year-old Tour Guide from Delhi, India. Speaks Urdu. Voice is highly approachable.

##### Digital Assistant 12

- 목소리 ID: `hi-in-assistant-12`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Urdu
- 역할: Companion & Peer / Digital Assistant (Best Friend)
- 용도: Conversational / Edu
- 공식 설명: 34-year-old Best Friend from Delhi, India. Speaks Urdu. Currently brainstorming in a meeting. Tone is professional yet approachable.

##### Digital Assistant 2

- 목소리 ID: `hi-in-assistant-2`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Awadhi Hindi
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 56-year-old Sibling from Uttar Pradesh, India. Speaks Awadhi Hindi. Currently at an appointment. Voice is warm and engaging.

##### Digital Assistant 3

- 목소리 ID: `hi-in-assistant-3`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Haryanvi Hindi
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 44-year-old Parent from Haryana, India. Speaks Haryanvi Hindi. Voice is bright, breezy, and youthful.

##### Digital Assistant 5

- 목소리 ID: `hi-in-assistant-5`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Awadhi Hindi
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 33-year-old Friend from Uttar Pradesh, India. Speaks Awadhi Hindi. Currently sitting next to you on an airplane. Sounds confident and clear.

##### Digital Assistant 6

- 목소리 ID: `hi-in-assistant-6`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Haryanvi Hindi
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 52-year-old Friend from Haryana, India. Speaks Haryanvi Hindi. Currently on podcast. Voice is warm and engaging.

##### Digital Assistant 9

- 목소리 ID: `hi-in-assistant-9`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Bhojpuri Hindi
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 23-year-old Sibling from Bihar, India. Speaks Bhojpuri Hindi. Voice is natural and clear.

##### Podcaster 1

- 목소리 ID: `hi-in-podcaster-1`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Urdu
- 역할: Storyteller & Narrator (Podcast Interviewer) | News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 47-year-old Podcast Interviewer from Delhi, India. Speaks Urdu. Voice is highly approachable.

##### Podcaster 10

- 목소리 ID: `hi-in-podcaster-10`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Bundeli Hindi
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 36-year-old Podcast Interviewer from Madhya Pradesh, India. Speaks Bundeli Hindi. Currently sitting next to you on an airplane. Voice is warm and engaging.

##### Podcaster 4

- 목소리 ID: `hi-in-podcaster-4`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Haryanvi Hindi
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 25-year-old Radio Host from Haryana, India. Speaks Haryanvi Hindi. Currently sitting next to you on the bus. Voice is warm and engaging.

##### Podcaster 5

- 목소리 ID: `hi-in-podcaster-5`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Bhojpuri Hindi
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 63-year-old Podcast Interviewer from Bihar, India. Speaks Bhojpuri Hindi. Currently brainstorming in a meeting. Voice is warm and engaging.

##### Podcaster 6

- 목소리 ID: `hi-in-podcaster-6`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Bundeli Hindi
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 41-year-old Radio Host from Madhya Pradesh, India. Speaks Bundeli Hindi. Voice is deep, velvety, and unhurried.

##### Podcaster 9

- 목소리 ID: `hi-in-podcaster-9`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Urdu
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 25-year-old Radio Host from Delhi, India. Speaks Urdu. Voice is intimate talkshow.

##### Storyteller 2

- 목소리 ID: `hi-in-storyteller-2`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Bundeli Hindi
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 38-year-old Nature Documentary Narrator from Madhya Pradesh, India. Speaks Bundeli Hindi. Voice is comforting someone who is stressed.

##### Storyteller 4

- 목소리 ID: `hi-in-storyteller-4`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Bundeli Hindi
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 38-year-old Nature Documentary Narrator from Madhya Pradesh, India. Speaks Bundeli Hindi. Voice is comforting someone who is stressed.

##### Storyteller 6

- 목소리 ID: `hi-in-storyteller-6`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Bundeli Hindi
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 23-year-old Nature Documentary Narrator from Madhya Pradesh, India. Speaks Bundeli Hindi. Currently sitting next to you on an airplane. Sounds confident and clear.

##### Tech Advisor 1

- 목소리 ID: `hi-in-techagent-1`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Bhojpuri Hindi
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 52-year-old Tech Support Agent from Bihar, India. Speaks Bhojpuri Hindi. Currently sitting on couch. Tone is professional yet approachable.

##### Tech Advisor 11

- 목소리 ID: `hi-in-techagent-11`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Bhojpuri Hindi
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Tech Support Agent from Bihar, India. Speaks Bhojpuri Hindi. Voice is clear, medium-pitch, and friendly.

##### Tech Advisor 4

- 목소리 ID: `hi-in-techagent-4`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Urdu
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Tech Support Agent from Delhi, India. Speaks Urdu. Voice is textured, resonant, and soothing.

##### Tech Advisor 5

- 목소리 ID: `hi-in-techagent-5`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Awadhi Hindi
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Tech Support Agent from Uttar Pradesh, India. Speaks Awadhi Hindi. Currently on podcast. Sounds confident and clear.

##### Tech Advisor 7

- 목소리 ID: `hi-in-techagent-7`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Bhojpuri Hindi
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 61-year-old Tech Support Agent from Bihar, India. Speaks Bhojpuri Hindi. Voice is clear, medium-pitch, and friendly.

##### Tech Advisor 9

- 목소리 ID: `hi-in-techagent-9`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Haryanvi Hindi
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Tech Support Agent from Haryana, India. Speaks Haryanvi Hindi. Currently brainstorming in a meeting. Tone is professional yet approachable.

##### Training Voiceover 10

- 목소리 ID: `hi-in-training-10`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Bundeli Hindi
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 26-year-old Cooking Show Host from Madhya Pradesh, India. Speaks Bundeli Hindi. Currently at an appointment. Sounds confident and clear.

##### Training Voiceover 2

- 목소리 ID: `hi-in-training-2`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Bundeli Hindi
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 37-year-old Cooking Show Host from Madhya Pradesh, India. Speaks Bundeli Hindi. Voice is deep, velvety, and unhurried.

##### Training Voiceover 3

- 목소리 ID: `hi-in-training-3`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Awadhi Hindi
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 57-year-old Cooking Show Host from Uttar Pradesh, India. Speaks Awadhi Hindi. Currently sitting next to you on an airplane. Sounds confident and clear.

##### Training Voiceover 5

- 목소리 ID: `hi-in-training-5`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Bundeli Hindi
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 51-year-old Cooking Show Host from Madhya Pradesh, India. Speaks Bundeli Hindi. Currently in an oscar winning film. Voice is warm and engaging.

##### Training Voiceover 6

- 목소리 ID: `hi-in-training-6`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Bhojpuri Hindi
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 51-year-old Cooking Show Host from Bihar, India. Speaks Bhojpuri Hindi. Currently at a meditation retreat. Sounds confident and clear.

##### Training Voiceover 9

- 목소리 ID: `hi-in-training-9`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Bhojpuri Hindi
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 36-year-old Cooking Show Host from Bihar, India. Speaks Bhojpuri Hindi. Currently sitting next to you on the bus. Sounds confident and clear.

##### Tutor 10

- 목소리 ID: `hi-in-tutor-10`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Awadhi Hindi
- 역할: Coach & Motivational Guide (Fitness Trainer)
- 용도: Wellness & Culture
- 공식 설명: 30-year-old Fitness Trainer from Uttar Pradesh, India. Speaks Awadhi Hindi. Voice is comforting someone who is stressed.

##### Tutor 2

- 목소리 ID: `hi-in-tutor-2`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Haryanvi Hindi
- 역할: Coach & Motivational Guide (Fitness Trainer)
- 용도: Wellness & Culture
- 공식 설명: 37-year-old Fitness Trainer from Haryana, India. Speaks Haryanvi Hindi. Currently in a bookstore. Tone is professional yet approachable.

##### Tutor 4

- 목소리 ID: `hi-in-tutor-4`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Bundeli Hindi
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 28-year-old Professor from Madhya Pradesh, India. Speaks Bundeli Hindi. Currently sitting on couch. Voice is warm and engaging.

##### Tutor 6

- 목소리 ID: `hi-in-tutor-6`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Bundeli Hindi
- 역할: Coach & Motivational Guide (Lifestyle Coach)
- 용도: Wellness & Culture
- 공식 설명: 55-year-old Lifestyle Coach from Madhya Pradesh, India. Speaks Bundeli Hindi. Currently sitting on couch. Tone is professional yet approachable.

##### Tutor 7

- 목소리 ID: `hi-in-tutor-7`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Urdu
- 역할: Storyteller & Narrator (Librarian)
- 용도: Content & Media
- 공식 설명: 29-year-old Librarian from Delhi, India. Speaks Urdu. Voice is bright, breezy, and youthful.

##### Tutor 9

- 목소리 ID: `hi-in-tutor-9`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Awadhi Hindi
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 25-year-old Professor from Uttar Pradesh, India. Speaks Awadhi Hindi. Currently on npr. Voice is warm and engaging.

#### 남성 — 53개

##### Authoritative Advisor 10

- 목소리 ID: `hi-in-advisor-10`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Haryanvi Hindi
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Lawyer from Haryana, India. Speaks Haryanvi Hindi. Voice is textured, resonant, and soothing.

##### Authoritative Advisor 11

- 목소리 ID: `hi-in-advisor-11`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Urdu
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Financial Advisor from Delhi, India. Speaks Urdu. Voice is relaxed.

##### Authoritative Advisor 2

- 목소리 ID: `hi-in-advisor-2`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Bhojpuri Hindi
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Lawyer from Bihar, India. Speaks Bhojpuri Hindi. Currently brainstorming in a meeting. Tone is professional yet approachable.

##### Authoritative Advisor 4

- 목소리 ID: `hi-in-advisor-4`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: medium
- 억양: Bundeli Hindi
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 54-year-old Financial Advisor from Madhya Pradesh, India. Speaks Bundeli Hindi. Voice is laid-back, encouraging, and chill.

##### Authoritative Advisor 6

- 목소리 ID: `hi-in-advisor-6`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Bundeli Hindi
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Financial Advisor from Madhya Pradesh, India. Speaks Bundeli Hindi. Tone is objective, direct, and helpful

##### Authoritative Advisor 9

- 목소리 ID: `hi-in-advisor-9`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Bhojpuri Hindi
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Lawyer from Bihar, India. Speaks Bhojpuri Hindi. Currently sitting next to you on an airplane. Tone is professional yet approachable.

##### Call Center Agent 11

- 목소리 ID: `hi-in-csagent-11`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: medium
- 억양: Urdu
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 28-year-old Social Worker from Delhi, India. Speaks Urdu. Voice is crisp and eager.

##### Call Center Agent 2

- 목소리 ID: `hi-in-csagent-2`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Awadhi Hindi
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Sales Associate from Uttar Pradesh, India. Speaks Awadhi Hindi. Tone is objective, direct, and helpful

##### Call Center Agent 3

- 목소리 ID: `hi-in-csagent-3`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Bundeli Hindi
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 27-year-old Customer Service Agent from Madhya Pradesh, India. Speaks Bundeli Hindi. Voice is intimate talkshow.

##### Call Center Agent 5

- 목소리 ID: `hi-in-csagent-5`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Bundeli Hindi
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 63-year-old Customer Service Agent from Madhya Pradesh, India. Speaks Bundeli Hindi. Currently in a bookstore. Tone is professional yet approachable.

##### Call Center Agent 7

- 목소리 ID: `hi-in-csagent-7`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Awadhi Hindi
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Sales Associate from Uttar Pradesh, India. Speaks Awadhi Hindi. Tone is conversational, slightly dry humor, and warm

##### Commercial Voiceover 12

- 목소리 ID: `hi-in-commercial-12`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Urdu
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 59-year-old Fashion Consultant from Delhi, India. Speaks Urdu. Currently in a bookstore. Sounds confident and clear.

##### Commercial Voiceover 2

- 목소리 ID: `hi-in-commercial-2`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Awadhi Hindi
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 24-year-old Influencer from Uttar Pradesh, India. Speaks Awadhi Hindi. Currently at a meditation retreat. Tone is professional yet approachable.

##### Commercial Voiceover 4

- 목소리 ID: `hi-in-commercial-4`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Bundeli Hindi
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 25-year-old Influencer from Madhya Pradesh, India. Speaks Bundeli Hindi. Currently on npr. Tone is professional yet approachable.

##### Commercial Voiceover 8

- 목소리 ID: `hi-in-commercial-8`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Haryanvi Hindi
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 23-year-old Influencer from Haryana, India. Speaks Haryanvi Hindi. Currently in a bookstore. Tone is professional yet approachable.

##### Commercial Voiceover 9

- 목소리 ID: `hi-in-commercial-9`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Bhojpuri Hindi
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 25-year-old Influencer from Bihar, India. Speaks Bhojpuri Hindi. Currently at a meditation retreat. Sounds confident and clear.

##### Concierge 10

- 목소리 ID: `hi-in-concierge-10`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: medium
- 억양: Bhojpuri Hindi
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 57-year-old Executive Assistant from Bihar, India. Speaks Bhojpuri Hindi. Voice is clear, medium-pitch, and friendly.

##### Concierge 11

- 목소리 ID: `hi-in-concierge-11`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: high
- 억양: Bundeli Hindi
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Tour Guide from Madhya Pradesh, India. Speaks Bundeli Hindi. Tone is reflective, calm, and reassuring

##### Concierge 2

- 목소리 ID: `hi-in-concierge-2`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Bundeli Hindi
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Tour Guide from Madhya Pradesh, India. Speaks Bundeli Hindi. Tone is reflective, calm, and reassuring

##### Concierge 4

- 목소리 ID: `hi-in-concierge-4`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Haryanvi Hindi
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Hotel Concierge from Haryana, India. Speaks Haryanvi Hindi. Currently at an appointment. Tone is professional yet approachable.

##### Concierge 5

- 목소리 ID: `hi-in-concierge-5`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: medium
- 억양: Bundeli Hindi
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 26-year-old Tour Guide from Madhya Pradesh, India. Speaks Bundeli Hindi. Voice is cool, confident, and collaborative.

##### Concierge 9

- 목소리 ID: `hi-in-concierge-9`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Haryanvi Hindi
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 60-year-old Executive Assistant from Haryana, India. Speaks Haryanvi Hindi. Currently sitting next to you on an airplane. Tone is professional yet approachable.

##### Digital Assistant 1

- 목소리 ID: `hi-in-assistant-1`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Urdu
- 역할: Companion & Peer / Digital Assistant (Best Friend)
- 용도: Conversational / Edu
- 공식 설명: 55-year-old Best Friend from Delhi, India. Speaks Urdu. Tone is conversational, slightly dry humor, and warm

##### Digital Assistant 10

- 목소리 ID: `hi-in-assistant-10`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Bundeli Hindi
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 43-year-old Sibling from Madhya Pradesh, India. Speaks Bundeli Hindi. Voice is cool, confident, and collaborative.

##### Digital Assistant 11

- 목소리 ID: `hi-in-assistant-11`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: high
- 억양: Awadhi Hindi
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 37-year-old Parent from Uttar Pradesh, India. Speaks Awadhi Hindi. Voice is textured, resonant, and soothing.

##### Digital Assistant 4

- 목소리 ID: `hi-in-assistant-4`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Bhojpuri Hindi
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 44-year-old Parent from Bihar, India. Speaks Bhojpuri Hindi. Currently in an oscar winning film. Tone is professional yet approachable.

##### Digital Assistant 7

- 목소리 ID: `hi-in-assistant-7`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Bundeli Hindi
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 47-year-old Parent from Madhya Pradesh, India. Speaks Bundeli Hindi. Voice is highly approachable.

##### Digital Assistant 8

- 목소리 ID: `hi-in-assistant-8`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Bundeli Hindi
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 36-year-old Sibling from Madhya Pradesh, India. Speaks Bundeli Hindi. Currently on the phone. Voice is warm and engaging.

##### Podcaster 11

- 목소리 ID: `hi-in-podcaster-11`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Haryanvi Hindi
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 47-year-old Podcast Interviewer from Haryana, India. Speaks Haryanvi Hindi. Currently at an appointment. Tone is professional yet approachable.

##### Podcaster 12

- 목소리 ID: `hi-in-podcaster-12`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Haryanvi Hindi
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 22-year-old Podcast Interviewer from Haryana, India. Speaks Haryanvi Hindi. Voice is clear, medium-pitch, and friendly.

##### Podcaster 2

- 목소리 ID: `hi-in-podcaster-2`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Bhojpuri Hindi
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 23-year-old Podcast Interviewer from Bihar, India. Speaks Bhojpuri Hindi. Currently brainstorming in a meeting. Voice is warm and engaging.

##### Podcaster 3

- 목소리 ID: `hi-in-podcaster-3`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Awadhi Hindi
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 42-year-old Podcast Interviewer from Uttar Pradesh, India. Speaks Awadhi Hindi. Tone is peer-to-peer and curious

##### Podcaster 7

- 목소리 ID: `hi-in-podcaster-7`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Awadhi Hindi
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 42-year-old Podcast Interviewer from Uttar Pradesh, India. Speaks Awadhi Hindi. Tone is peer-to-peer and curious

##### Podcaster 8

- 목소리 ID: `hi-in-podcaster-8`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: medium
- 억양: Urdu
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 42-year-old Radio Host from Delhi, India. Speaks Urdu. Tone is enthusiastic, engaging, and fun

##### Storyteller 1

- 목소리 ID: `hi-in-storyteller-1`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Awadhi Hindi
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 45-year-old Nature Documentary Narrator from Uttar Pradesh, India. Speaks Awadhi Hindi. Voice is bright, breezy, and youthful.

##### Storyteller 3

- 목소리 ID: `hi-in-storyteller-3`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Awadhi Hindi
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 45-year-old Nature Documentary Narrator from Uttar Pradesh, India. Speaks Awadhi Hindi. Voice is bright, breezy, and youthful.

##### Storyteller 5

- 목소리 ID: `hi-in-storyteller-5`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Awadhi Hindi
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 52-year-old Nature Documentary Narrator from Uttar Pradesh, India. Speaks Awadhi Hindi. Currently sitting on couch. Sounds confident and clear.

##### Tech Advisor 10

- 목소리 ID: `hi-in-techagent-10`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: medium
- 억양: Awadhi Hindi
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 54-year-old Tech Support Agent from Uttar Pradesh, India. Speaks Awadhi Hindi. Voice is intimate talkshow.

##### Tech Advisor 12

- 목소리 ID: `hi-in-techagent-12`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Urdu
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 27-year-old Tech Support Agent from Delhi, India. Speaks Urdu. Tone is reflective, calm, and reassuring

##### Tech Advisor 2

- 목소리 ID: `hi-in-techagent-2`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Awadhi Hindi
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Tech Support Agent from Uttar Pradesh, India. Speaks Awadhi Hindi. Voice is natural and clear.

##### Tech Advisor 3

- 목소리 ID: `hi-in-techagent-3`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Haryanvi Hindi
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Tech Support Agent from Haryana, India. Speaks Haryanvi Hindi. Currently on podcast. Voice is warm and engaging.

##### Tech Advisor 6

- 목소리 ID: `hi-in-techagent-6`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Haryanvi Hindi
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 23-year-old Tech Support Agent from Haryana, India. Speaks Haryanvi Hindi. Voice is light, airy, and precise

##### Tech Advisor 8

- 목소리 ID: `hi-in-techagent-8`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Awadhi Hindi
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 52-year-old Tech Support Agent from Uttar Pradesh, India. Speaks Awadhi Hindi. Voice is engaging and empathic.

##### Training Voiceover 1

- 목소리 ID: `hi-in-training-1`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Urdu
- 역할: Storyteller & Narrator (Instructional Video Host) | Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 41-year-old Instructional Video Host from Delhi, India. Speaks Urdu. Voice is highly approachable.

##### Training Voiceover 12

- 목소리 ID: `hi-in-training-12`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Urdu
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 56-year-old Instructional Video Host from Delhi, India. Speaks Urdu. Currently in a bookstore. Tone is professional yet approachable.

##### Training Voiceover 4

- 목소리 ID: `hi-in-training-4`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Urdu
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 28-year-old Cooking Show Host from Delhi, India. Speaks Urdu. Voice is highly approachable.

##### Training Voiceover 7

- 목소리 ID: `hi-in-training-7`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Awadhi Hindi
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 34-year-old Instructional Video Host from Uttar Pradesh, India. Speaks Awadhi Hindi. Voice is textured, resonant, and soothing.

##### Training Voiceover 8

- 목소리 ID: `hi-in-training-8`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Awadhi Hindi
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 24-year-old Cooking Show Host from Uttar Pradesh, India. Speaks Awadhi Hindi. Currently sitting on couch. Tone is professional yet approachable.

##### Tutor 1

- 목소리 ID: `hi-in-tutor-1`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Urdu
- 역할: Storyteller & Narrator (Librarian)
- 용도: Content & Media
- 공식 설명: 56-year-old Librarian from Delhi, India. Speaks Urdu. Currently in a bookstore. Sounds confident and clear.

##### Tutor 11

- 목소리 ID: `hi-in-tutor-11`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Bhojpuri Hindi
- 역할: Storyteller & Narrator (Therapist)
- 용도: Content & Media
- 공식 설명: 63-year-old Therapist from Bihar, India. Speaks Bhojpuri Hindi. Currently in a bookstore. Sounds confident and clear.

##### Tutor 3

- 목소리 ID: `hi-in-tutor-3`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Awadhi Hindi
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 24-year-old Professor from Uttar Pradesh, India. Speaks Awadhi Hindi. Voice is comforting someone who is stressed.

##### Tutor 5

- 목소리 ID: `hi-in-tutor-5`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Bhojpuri Hindi
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 35-year-old Writing Tutor from Bihar, India. Speaks Bhojpuri Hindi. Voice is resonant and witty.

##### Tutor 8

- 목소리 ID: `hi-in-tutor-8`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Haryanvi Hindi
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 53-year-old Professor from Haryana, India. Speaks Haryanvi Hindi. Voice is light, airy, and precise

#### 중성 — 4개

##### Call Center Agent 9

- 목소리 ID: `hi-in-csagent-9`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: neutral
- 음높이: high
- 억양: Haryanvi Hindi
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Social Worker from Haryana, India. Speaks Haryanvi Hindi. Voice is crisp and eager.

##### Commercial Voiceover 10

- 목소리 ID: `hi-in-commercial-10`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: neutral
- 음높이: low
- 억양: Awadhi Hindi
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 23-year-old Influencer from Uttar Pradesh, India. Speaks Awadhi Hindi. Currently at an appointment. Voice is warm and engaging.

##### Training Voiceover 11

- 목소리 ID: `hi-in-training-11`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: neutral
- 음높이: medium
- 억양: Awadhi Hindi
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 59-year-old Instructional Video Host from Uttar Pradesh, India. Speaks Awadhi Hindi. Voice is intimate talkshow.

##### Tutor 12

- 목소리 ID: `hi-in-tutor-12`
- 유형: prebuilt
- 언어: hi-IN
- 지역: IN
- 성별: neutral
- 음높이: high
- 억양: Haryanvi Hindi
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 30-year-old Professor from Haryana, India. Speaks Haryanvi Hindi. Voice is cool, confident, and collaborative.

### 이탈리아어·이탈리아 (it-IT) — 53개

#### 여성 — 27개

##### Authoritative Advisor 1

- 목소리 ID: `it-it-advisor-1`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: medium
- 억양: Italian
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Researcher from Italy. Speaks Italian. Voice is crisp and eager.

##### Authoritative Advisor 3

- 목소리 ID: `it-it-advisor-3`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: medium
- 억양: Italian
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Researcher from Italy. Speaks Italian. Currently in an indie film. Tone is professional yet approachable.

##### Authoritative Advisor 4

- 목소리 ID: `it-it-advisor-4`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: medium
- 억양: Italian
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Researcher from Italy. Speaks Italian. Voice is cool, confident, and collaborative.

##### Authoritative Advisor 5

- 목소리 ID: `it-it-advisor-5`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: medium
- 억양: Italian
- 역할: Character & Theatrical (Lawyer)
- 용도: Entertainment & Gaming
- 공식 설명: 43-year-old Lawyer from Italy. Speaks Italian. Voice is natural and clear.

##### Authoritative Advisor 6

- 목소리 ID: `it-it-advisor-6`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: high
- 억양: Italian
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 50-year-old Researcher from Italy. Speaks Italian. Tone is peer-to-peer and curious

##### Call Center Agent 1

- 목소리 ID: `it-it-csagent-1`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: medium
- 억양: Italian
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Social Worker from Italy. Speaks Italian. Voice is crisp and eager.

##### Call Center Agent 3

- 목소리 ID: `it-it-csagent-3`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: low
- 억양: Italian
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 22-year-old Social Worker from Italy. Speaks Italian. Voice is comforting someone who is stressed.

##### Call Center Agent 4

- 목소리 ID: `it-it-csagent-4`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: high
- 억양: Italian
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Social Worker from Italy. Speaks Italian. Tone is peer-to-peer and curious

##### Call Center Agent 6

- 목소리 ID: `it-it-csagent-6`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: medium
- 억양: Italian
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Social Worker from Italy. Speaks Italian. Voice is textured, resonant, and soothing.

##### Call Center Agent 7

- 목소리 ID: `it-it-csagent-7`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: low
- 억양: Italian
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Social Worker from Italy. Speaks Italian. Voice is textured, resonant, and soothing.

##### Digital Assistant 1

- 목소리 ID: `it-it-assistant-1`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: low
- 억양: Italian
- 역할: Concierge & EA (Parent)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Parent from Italy. Speaks Italian. Currently brainstorming in a meeting. Voice is warm and engaging.

##### Digital Assistant 4

- 목소리 ID: `it-it-assistant-4`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: medium
- 억양: Italian
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 53-year-old Sibling from Italy. Speaks Italian. Currently in a bookstore. Voice is warm and engaging.

##### Digital Assistant 5

- 목소리 ID: `it-it-assistant-5`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: medium
- 억양: Italian
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 38-year-old Parent from Italy. Speaks Italian. Currently brainstorming in a meeting. Voice is warm and engaging.

##### Digital Assistant 8

- 목소리 ID: `it-it-assistant-8`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: high
- 억양: Italian
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 36-year-old Parent from Italy. Speaks Italian. Currently on npr. Sounds confident and clear.

##### Podcaster 1

- 목소리 ID: `it-it-podcaster-1`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: medium
- 억양: Italian
- 역할: News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 45-year-old Trivia Host from Italy. Speaks Italian. Voice is crisp and eager.

##### Tech Advisor 2

- 목소리 ID: `it-it-techagent-2`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: low
- 억양: Italian
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Tech Support Agent from Italy. Speaks Italian. Currently at a meditation retreat. Tone is professional yet approachable.

##### Tech Advisor 4

- 목소리 ID: `it-it-techagent-4`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: medium
- 억양: Italian
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Architect from Italy. Speaks Italian. Currently on npr. Tone is professional yet approachable.

##### Training Voiceover 1

- 목소리 ID: `it-it-training-1`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: high
- 억양: Italian
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 44-year-old Cooking Show Host from Italy. Speaks Italian. Currently in an indie film. Tone is professional yet approachable.

##### Training Voiceover 3

- 목소리 ID: `it-it-training-3`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: low
- 억양: Italian
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 32-year-old Cooking Show Host from Italy. Speaks Italian. Currently sitting next to you on the bus. Voice is warm and engaging.

##### Training Voiceover 4

- 목소리 ID: `it-it-training-4`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: medium
- 억양: Italian
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 52-year-old Cooking Show Host from Italy. Speaks Italian. Voice is highly approachable.

##### Training Voiceover 5

- 목소리 ID: `it-it-training-5`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: high
- 억양: Italian
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 45-year-old Instructional Video Host from Italy. Speaks Italian. Voice is cool, confident, and collaborative.

##### Training Voiceover 6

- 목소리 ID: `it-it-training-6`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: low
- 억양: Italian
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 53-year-old Instructional Video Host from Italy. Speaks Italian. Voice is bright, breezy, and youthful.

##### Training Voiceover 7

- 목소리 ID: `it-it-training-7`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: low
- 억양: Italian
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 63-year-old Cooking Show Host from Italy. Speaks Italian. Voice is light, airy, and precise

##### Tutor 1

- 목소리 ID: `it-it-tutor-1`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: medium
- 억양: Italian
- 역할: Concierge & EA (Teacher)
- 용도: Enterprise Agent
- 공식 설명: 65-year-old Teacher from Italy. Speaks Italian. Currently brainstorming in a meeting. Voice is warm and engaging.

##### Tutor 3

- 목소리 ID: `it-it-tutor-3`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: high
- 억양: Italian
- 역할: Concierge & EA (Teacher)
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Teacher from Italy. Speaks Italian. Voice is intimate talkshow.

##### Tutor 5

- 목소리 ID: `it-it-tutor-5`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: low
- 억양: Italian
- 역할: News & Podcast Host / Podcaster (Teacher)
- 용도: Content & Media
- 공식 설명: 41-year-old Teacher from Italy. Speaks Italian. Voice is intimate talkshow.

##### Tutor 7

- 목소리 ID: `it-it-tutor-7`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: female
- 음높이: high
- 억양: Italian
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 25-year-old Writing Tutor from Italy. Speaks Italian. Currently sitting next to you on the bus. Sounds confident and clear.

#### 남성 — 25개

##### Authoritative Advisor 2

- 목소리 ID: `it-it-advisor-2`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Lawyer from Italy. Speaks Italian. Voice is laid-back, encouraging, and chill.

##### Call Center Agent 2

- 목소리 ID: `it-it-csagent-2`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 60-year-old Social Worker from Italy. Speaks Italian. Voice is laid-back, encouraging, and chill.

##### Call Center Agent 5

- 목소리 ID: `it-it-csagent-5`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Social Worker from Italy. Speaks Italian. Voice is textured, resonant, and soothing.

##### Concierge 1

- 목소리 ID: `it-it-concierge-1`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: Concierge & EA (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Event Planner from Italy. Speaks Italian. Voice is bright, breezy, and youthful.

##### Digital Assistant 2

- 목소리 ID: `it-it-assistant-2`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: News & Podcast Host / Podcaster (Sibling)
- 용도: Content & Media
- 공식 설명: 49-year-old Sibling from Italy. Speaks Italian. Voice is highly approachable.

##### Digital Assistant 3

- 목소리 ID: `it-it-assistant-3`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: Concierge & EA (Parent)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Parent from Italy. Speaks Italian. Voice is natural and clear.

##### Digital Assistant 6

- 목소리 ID: `it-it-assistant-6`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: medium
- 억양: Italian
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 63-year-old Sibling from Italy. Speaks Italian. Voice is textured, resonant, and soothing.

##### Digital Assistant 7

- 목소리 ID: `it-it-assistant-7`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 38-year-old Parent from Italy. Speaks Italian. Currently sitting next to you on the bus. Sounds confident and clear.

##### Storyteller 1

- 목소리 ID: `it-it-storyteller-1`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 43-year-old Storyteller from Italy. Speaks Italian. Tone is reflective, calm, and reassuring

##### Storyteller 2

- 목소리 ID: `it-it-storyteller-2`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 38-year-old Philosopher from Italy. Speaks Italian. Voice is fast-paced, articulate, energetic.

##### Storyteller 3

- 목소리 ID: `it-it-storyteller-3`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 25-year-old Philosopher from Italy. Speaks Italian. Currently on npr. Sounds confident and clear.

##### Storyteller 4

- 목소리 ID: `it-it-storyteller-4`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 50-year-old Storyteller from Italy. Speaks Italian. Currently on npr. Tone is professional yet approachable.

##### Storyteller 5

- 목소리 ID: `it-it-storyteller-5`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 52-year-old Philosopher from Italy. Speaks Italian. Currently on npr. Voice is warm and engaging.

##### Storyteller 6

- 목소리 ID: `it-it-storyteller-6`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 32-year-old Philosopher from Italy. Speaks Italian. Currently on podcast. Tone is professional yet approachable.

##### Tech Advisor 1

- 목소리 ID: `it-it-techagent-1`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Architect from Italy. Speaks Italian. Voice is engaging and empathic.

##### Tech Advisor 3

- 목소리 ID: `it-it-techagent-3`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 28-year-old Tech Support Agent from Italy. Speaks Italian. Currently on npr. Voice is warm and engaging.

##### Tech Advisor 5

- 목소리 ID: `it-it-techagent-5`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Architect from Italy. Speaks Italian. Voice is fast-paced, articulate, energetic.

##### Tech Advisor 6

- 목소리 ID: `it-it-techagent-6`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 48-year-old Architect from Italy. Speaks Italian. Currently sitting next to you on the bus. Sounds confident and clear.

##### Tech Advisor 7

- 목소리 ID: `it-it-techagent-7`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 45-year-old Architect from Italy. Speaks Italian. Voice is natural and clear.

##### Training Voiceover 2

- 목소리 ID: `it-it-training-2`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 31-year-old Cooking Show Host from Italy. Speaks Italian. Currently on npr. Voice is warm and engaging.

##### Training Voiceover 8

- 목소리 ID: `it-it-training-8`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 27-year-old Instructional Video Host from Italy. Speaks Italian. Voice is cool, confident, and collaborative.

##### Tutor 2

- 목소리 ID: `it-it-tutor-2`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 50-year-old Chess Instructor from Italy. Speaks Italian. Currently on npr. Tone is professional yet approachable.

##### Tutor 4

- 목소리 ID: `it-it-tutor-4`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: News & Podcast Host / Podcaster (Therapist)
- 용도: Content & Media
- 공식 설명: 23-year-old Therapist from Italy. Speaks Italian. Currently at an appointment. Tone is professional yet approachable.

##### Tutor 6

- 목소리 ID: `it-it-tutor-6`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: high
- 억양: Italian
- 역할: Coach & Motivational Guide (Fitness Trainer)
- 용도: Wellness & Culture
- 공식 설명: 58-year-old Fitness Trainer from Italy. Speaks Italian. Currently in a bookstore. Voice is warm and engaging.

##### Tutor 8

- 목소리 ID: `it-it-tutor-8`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: male
- 음높이: low
- 억양: Italian
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 22-year-old Writing Tutor from Italy. Speaks Italian. Currently brainstorming in a meeting. Sounds confident and clear.

#### 중성 — 1개

##### Call Center Agent 8

- 목소리 ID: `it-it-csagent-8`
- 유형: prebuilt
- 언어: it-IT
- 지역: IT
- 성별: neutral
- 음높이: medium
- 억양: Italian
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 55-year-old Social Worker from Italy. Speaks Italian. Voice is engaging and empathic.

### 일본어·일본 (ja-JP) — 115개

#### 여성 — 61개

##### Authoritative Advisor 11

- 목소리 ID: `ja-jp-advisor-11`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 62-year-old Researcher from Tokyo. Speaks Tokyo Japanese. Voice is cool, confident, and collaborative.

##### Authoritative Advisor 12

- 목소리 ID: `ja-jp-advisor-12`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: High-Trust Advisor / Authoritative Advisor (Doctor)
- 용도: Enterprise Agent
- 공식 설명: 50-year-old Doctor from Tokyo. Speaks Tokyo Japanese. Voice is natural and clear.

##### Authoritative Advisor 2

- 목소리 ID: `ja-jp-advisor-2`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: low
- 억양: Tokyo Japanese
- 역할: High-Trust Advisor / Authoritative Advisor (Doctor)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Doctor from Tokyo. Speaks Tokyo Japanese. Currently sitting next to you on the bus. Sounds confident and clear.

##### Authoritative Advisor 4

- 목소리 ID: `ja-jp-advisor-4`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: medium
- 억양: Osaka Japanese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Lawyer from Osaka. Speaks Osaka Japanese. Currently on npr. Voice is warm and engaging.

##### Authoritative Advisor 5

- 목소리 ID: `ja-jp-advisor-5`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Researcher from Tokyo. Speaks Tokyo Japanese. Currently brainstorming in a meeting. Sounds confident and clear.

##### Authoritative Advisor 7

- 목소리 ID: `ja-jp-advisor-7`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Lawyer from Tokyo. Speaks Tokyo Japanese. Tone is objective, direct, and helpful

##### Call Center Agent 11

- 목소리 ID: `ja-jp-csagent-11`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Customer Service Agent from Tokyo. Speaks Tokyo Japanese. Currently in an indie film. Voice is warm and engaging.

##### Call Center Agent 12

- 목소리 ID: `ja-jp-csagent-12`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 59-year-old Customer Service Agent from Tokyo. Speaks Tokyo Japanese. Currently sitting on couch. Sounds confident and clear.

##### Call Center Agent 2

- 목소리 ID: `ja-jp-csagent-2`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Osaka Japanese
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 23-year-old Customer Service Agent from Osaka. Speaks Osaka Japanese. Voice is natural and clear.

##### Call Center Agent 4

- 목소리 ID: `ja-jp-csagent-4`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: medium
- 억양: Tokyo Japanese
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 64-year-old Customer Service Agent from Tokyo. Speaks Tokyo Japanese. Voice is natural and clear.

##### Call Center Agent 6

- 목소리 ID: `ja-jp-csagent-6`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: medium
- 억양: Osaka Japanese
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Customer Service Agent from Osaka. Speaks Osaka Japanese. Currently in a bookstore. Tone is professional yet approachable.

##### Call Center Agent 8

- 목소리 ID: `ja-jp-csagent-8`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 23-year-old Sales Associate from Tokyo. Speaks Tokyo Japanese. Currently in an oscar winning film. Voice is warm and engaging.

##### Commercial Voiceover 1

- 목소리 ID: `ja-jp-commercial-1`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 21-year-old Influencer from Tokyo. Speaks Tokyo Japanese. Voice is deep, velvety, and unhurried.

##### Commercial Voiceover 3

- 목소리 ID: `ja-jp-commercial-3`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 28-year-old Influencer from Tokyo. Speaks Tokyo Japanese. Voice is highly approachable.

##### Commercial Voiceover 6

- 목소리 ID: `ja-jp-commercial-6`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 25-year-old Influencer from Tokyo. Speaks Tokyo Japanese. Currently in an oscar winning film. Sounds confident and clear.

##### Commercial Voiceover 7

- 목소리 ID: `ja-jp-commercial-7`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Osaka Japanese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 23-year-old Influencer from Osaka. Speaks Osaka Japanese. Voice is deep, velvety, and unhurried.

##### Concierge 1

- 목소리 ID: `ja-jp-concierge-1`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Executive Assistant from Tokyo. Speaks Tokyo Japanese. Currently at an appointment. Tone is professional yet approachable.

##### Concierge 10

- 목소리 ID: `ja-jp-concierge-10`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Osaka Japanese
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 57-year-old Executive Assistant from Osaka. Speaks Osaka Japanese. Currently at an appointment. Tone is professional yet approachable.

##### Concierge 11

- 목소리 ID: `ja-jp-concierge-11`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Fukuoka Japanese
- 역할: Concierge & EA (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 63-year-old Event Planner from Fukuoka. Speaks Fukuoka Japanese. Currently at a meditation retreat. Tone is professional yet approachable.

##### Concierge 3

- 목소리 ID: `ja-jp-concierge-3`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: low
- 억양: Osaka Japanese
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Executive Assistant from Osaka. Speaks Osaka Japanese. Currently on the phone. Tone is professional yet approachable.

##### Concierge 5

- 목소리 ID: `ja-jp-concierge-5`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Hotel Concierge from Tokyo. Speaks Tokyo Japanese. Voice is engaging and empathic.

##### Concierge 7

- 목소리 ID: `ja-jp-concierge-7`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: medium
- 억양: Tokyo Japanese
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Tour Guide from Tokyo. Speaks Tokyo Japanese. Tone is reflective, calm, and reassuring

##### Digital Assistant 1

- 목소리 ID: `ja-jp-assistant-1`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 36-year-old Parent from Tokyo. Speaks Tokyo Japanese. Voice is textured, resonant, and soothing.

##### Digital Assistant 4

- 목소리 ID: `ja-jp-assistant-4`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: medium
- 억양: Tokyo Japanese
- 역할: Companion & Peer / Digital Assistant (Best Friend)
- 용도: Conversational / Edu
- 공식 설명: 22-year-old Best Friend from Tokyo. Speaks Tokyo Japanese. Currently sitting on couch. Sounds confident and clear.

##### Digital Assistant 5

- 목소리 ID: `ja-jp-assistant-5`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: low
- 억양: Osaka Japanese
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 30-year-old Friend from Osaka. Speaks Osaka Japanese. Currently in an indie film. Tone is professional yet approachable.

##### Digital Assistant 6

- 목소리 ID: `ja-jp-assistant-6`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: medium
- 억양: Tokyo Japanese
- 역할: Tech Support Agent / Tech Advisor (Grandparent)
- 용도: Enterprise Agent
- 공식 설명: 74-year-old Grandparent from Tokyo. Speaks Tokyo Japanese. Currently on podcast. Tone is professional yet approachable.

##### Digital Assistant 7

- 목소리 ID: `ja-jp-assistant-7`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 31-year-old Friend from Tokyo. Speaks Tokyo Japanese. Voice is bright, breezy, and youthful.

##### Digital Assistant 8

- 목소리 ID: `ja-jp-assistant-8`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Osaka Japanese
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 24-year-old Sibling from Osaka. Speaks Osaka Japanese. Voice is laid-back, encouraging, and chill.

##### Podcaster 10

- 목소리 ID: `ja-jp-podcaster-10`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: medium
- 억양: Tokyo Japanese
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 56-year-old Radio Host from Tokyo. Speaks Tokyo Japanese. Voice is light, airy, and precise

##### Podcaster 12

- 목소리 ID: `ja-jp-podcaster-12`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: Video Voiceover & Host / Training Voiceover (Trivia Host) | News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 38-year-old Trivia Host from Tokyo. Speaks Tokyo Japanese. Voice is light, airy, and precise

##### Podcaster 2

- 목소리 ID: `ja-jp-podcaster-2`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 28-year-old Podcast Interviewer from Tokyo. Speaks Tokyo Japanese. Currently on npr. Sounds confident and clear.

##### Podcaster 3

- 목소리 ID: `ja-jp-podcaster-3`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: low
- 억양: Osaka Japanese
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 33-year-old Podcast Interviewer from Osaka. Speaks Osaka Japanese. Currently sitting next to you on the bus. Sounds confident and clear.

##### Podcaster 6

- 목소리 ID: `ja-jp-podcaster-6`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: medium
- 억양: Tokyo Japanese
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 37-year-old Podcast Interviewer from Tokyo. Speaks Tokyo Japanese. Currently in an oscar winning film. Sounds confident and clear.

##### Podcaster 9

- 목소리 ID: `ja-jp-podcaster-9`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: Video Voiceover & Host / Training Voiceover (Trivia Host) | News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 43-year-old Trivia Host from Tokyo. Speaks Tokyo Japanese. Voice is light, airy, and precise

##### Storyteller 1

- 목소리 ID: `ja-jp-storyteller-1`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 29-year-old Nature Documentary Narrator from Tokyo. Speaks Tokyo Japanese. Voice is engaging and empathic.

##### Storyteller 10

- 목소리 ID: `ja-jp-storyteller-10`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 57-year-old Storyteller from Tokyo. Speaks Tokyo Japanese. Currently on the phone. Tone is professional yet approachable.

##### Storyteller 11

- 목소리 ID: `ja-jp-storyteller-11`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: medium
- 억양: Tokyo Japanese
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 36-year-old Philosopher from Tokyo. Speaks Tokyo Japanese. Voice is intimate talkshow.

##### Storyteller 3

- 목소리 ID: `ja-jp-storyteller-3`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: low
- 억양: Fukuoka Japanese
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 48-year-old Philosopher from Fukuoka. Speaks Fukuoka Japanese. Voice is engaging and empathic.

##### Storyteller 7

- 목소리 ID: `ja-jp-storyteller-7`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: medium
- 억양: Fukuoka Japanese
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 29-year-old Storyteller from Fukuoka. Speaks Fukuoka Japanese. Voice is comforting someone who is stressed.

##### Storyteller 8

- 목소리 ID: `ja-jp-storyteller-8`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: medium
- 억양: Tokyo Japanese
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 59-year-old Nature Documentary Narrator from Tokyo. Speaks Tokyo Japanese. Currently at an appointment. Tone is professional yet approachable.

##### Tech Advisor 1

- 목소리 ID: `ja-jp-techagent-1`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Fukuoka Japanese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Architect)
- 용도: Growth & Marketing
- 공식 설명: 43-year-old Architect from Fukuoka. Speaks Fukuoka Japanese. Tone is reflective, calm, and reassuring

##### Tech Advisor 3

- 목소리 ID: `ja-jp-techagent-3`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: low
- 억양: Osaka Japanese
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Architect from Osaka. Speaks Osaka Japanese. Tone is reflective, calm, and reassuring

##### Tech Advisor 5

- 목소리 ID: `ja-jp-techagent-5`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: medium
- 억양: Osaka Japanese
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Tech Support Agent from Osaka. Speaks Osaka Japanese. Voice is light, airy, and precise

##### Tech Advisor 6

- 목소리 ID: `ja-jp-techagent-6`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: medium
- 억양: Tokyo Japanese
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Architect from Tokyo. Speaks Tokyo Japanese. Currently on the phone. Voice is warm and engaging.

##### Tech Advisor 7

- 목소리 ID: `ja-jp-techagent-7`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Tech Support Agent from Tokyo. Speaks Tokyo Japanese. Voice is clear, medium-pitch, and friendly.

##### Tech Advisor 9

- 목소리 ID: `ja-jp-techagent-9`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: low
- 억양: Fukuoka Japanese
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 48-year-old Architect from Fukuoka. Speaks Fukuoka Japanese. Voice is textured, resonant, and soothing.

##### Training Voiceover 1

- 목소리 ID: `ja-jp-training-1`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 62-year-old Instructional Video Host from Tokyo. Speaks Tokyo Japanese. Currently on npr. Sounds confident and clear.

##### Training Voiceover 10

- 목소리 ID: `ja-jp-training-10`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 60-year-old Instructional Video Host from Tokyo. Speaks Tokyo Japanese. Tone is reflective, calm, and reassuring

##### Training Voiceover 12

- 목소리 ID: `ja-jp-training-12`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: medium
- 억양: Tokyo Japanese
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 60-year-old Cooking Show Host from Tokyo. Speaks Tokyo Japanese. Currently in an oscar winning film. Tone is professional yet approachable.

##### Training Voiceover 3

- 목소리 ID: `ja-jp-training-3`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: medium
- 억양: Osaka Japanese
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 61-year-old Cooking Show Host from Osaka. Speaks Osaka Japanese. Voice is engaging and empathic.

##### Training Voiceover 5

- 목소리 ID: `ja-jp-training-5`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 27-year-old Cooking Show Host from Tokyo. Speaks Tokyo Japanese. Voice is clear, medium-pitch, and friendly.

##### Training Voiceover 6

- 목소리 ID: `ja-jp-training-6`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 23-year-old Instructional Video Host from Tokyo. Speaks Tokyo Japanese. Currently on npr. Tone is professional yet approachable.

##### Training Voiceover 7

- 목소리 ID: `ja-jp-training-7`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: medium
- 억양: Fukuoka Japanese
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 47-year-old Instructional Video Host from Fukuoka. Speaks Fukuoka Japanese. Voice is intimate talkshow.

##### Training Voiceover 8

- 목소리 ID: `ja-jp-training-8`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Osaka Japanese
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 61-year-old Cooking Show Host from Osaka. Speaks Osaka Japanese. Voice is engaging and empathic.

##### Training Voiceover 9

- 목소리 ID: `ja-jp-training-9`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: low
- 억양: Fukuoka Japanese
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 37-year-old Cooking Show Host from Fukuoka. Speaks Fukuoka Japanese. Currently in an oscar winning film. Tone is professional yet approachable.

##### Tutor 1

- 목소리 ID: `ja-jp-tutor-1`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: medium
- 억양: Tokyo Japanese
- 역할: Video Voiceover & Host / Training Voiceover (Librarian)
- 용도: Content & Media
- 공식 설명: 42-year-old Librarian from Tokyo. Speaks Tokyo Japanese. Tone is conversational, slightly dry humor, and warm

##### Tutor 10

- 목소리 ID: `ja-jp-tutor-10`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: medium
- 억양: Tokyo Japanese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Chess Instructor)
- 용도: Growth & Marketing
- 공식 설명: 55-year-old Chess Instructor from Tokyo. Speaks Tokyo Japanese. Currently sitting on couch. Tone is professional yet approachable.

##### Tutor 3

- 목소리 ID: `ja-jp-tutor-3`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 25-year-old Professor from Tokyo. Speaks Tokyo Japanese. Tone is conversational, slightly dry humor, and warm

##### Tutor 5

- 목소리 ID: `ja-jp-tutor-5`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Fukuoka Japanese
- 역할: Educational Tutor (Teacher)
- 용도: Conversational / Edu
- 공식 설명: 26-year-old Teacher from Fukuoka. Speaks Fukuoka Japanese. Currently in a bookstore. Tone is professional yet approachable.

##### Tutor 6

- 목소리 ID: `ja-jp-tutor-6`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: low
- 억양: Fukuoka Japanese
- 역할: Educational Tutor (Teacher)
- 용도: Conversational / Edu
- 공식 설명: 45-year-old Teacher from Fukuoka. Speaks Fukuoka Japanese. Currently brainstorming in a meeting. Tone is professional yet approachable.

##### Tutor 8

- 목소리 ID: `ja-jp-tutor-8`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: female
- 음높이: high
- 억양: Tokyo Japanese
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 64-year-old Writing Tutor from Tokyo. Speaks Tokyo Japanese. Voice is cool, confident, and collaborative.

#### 남성 — 51개

##### Authoritative Advisor 1

- 목소리 ID: `ja-jp-advisor-1`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Osaka Japanese
- 역할: High-Trust Advisor / Authoritative Advisor (Doctor)
- 용도: Enterprise Agent
- 공식 설명: 44-year-old Doctor from Osaka. Speaks Osaka Japanese. Tone is objective, direct, and helpful

##### Authoritative Advisor 10

- 목소리 ID: `ja-jp-advisor-10`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Financial Advisor from Tokyo. Speaks Tokyo Japanese. Currently on podcast. Voice is warm and engaging.

##### Authoritative Advisor 3

- 목소리 ID: `ja-jp-advisor-3`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Lawyer from Tokyo. Speaks Tokyo Japanese. Currently on podcast. Sounds confident and clear.

##### Authoritative Advisor 6

- 목소리 ID: `ja-jp-advisor-6`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Osaka Japanese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Lawyer from Osaka. Speaks Osaka Japanese. Voice is relaxed.

##### Authoritative Advisor 8

- 목소리 ID: `ja-jp-advisor-8`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Lawyer from Tokyo. Speaks Tokyo Japanese. Voice is clear, medium-pitch, and friendly.

##### Authoritative Advisor 9

- 목소리 ID: `ja-jp-advisor-9`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Fukuoka Japanese
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 58-year-old Researcher from Fukuoka. Speaks Fukuoka Japanese. Voice is textured, resonant, and soothing.

##### Call Center Agent 1

- 목소리 ID: `ja-jp-csagent-1`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Sales Associate from Tokyo. Speaks Tokyo Japanese. Currently on npr. Tone is professional yet approachable.

##### Call Center Agent 10

- 목소리 ID: `ja-jp-csagent-10`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: medium
- 억양: Fukuoka Japanese
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 29-year-old Social Worker from Fukuoka. Speaks Fukuoka Japanese. Voice is energetic, colorful, and fast

##### Call Center Agent 3

- 목소리 ID: `ja-jp-csagent-3`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Character & Theatrical (Person Giving Driving Directions)
- 용도: Entertainment & Gaming
- 공식 설명: 39-year-old Person Giving Driving Directions from Tokyo. Speaks Tokyo Japanese. Voice is intimate talkshow.

##### Call Center Agent 5

- 목소리 ID: `ja-jp-csagent-5`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Fukuoka Japanese
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Social Worker from Fukuoka. Speaks Fukuoka Japanese. Voice is comforting someone who is stressed.

##### Call Center Agent 7

- 목소리 ID: `ja-jp-csagent-7`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 51-year-old Sales Associate from Tokyo. Speaks Tokyo Japanese. Voice is clear, medium-pitch, and friendly.

##### Call Center Agent 9

- 목소리 ID: `ja-jp-csagent-9`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Customer Service Agent from Tokyo. Speaks Tokyo Japanese. Currently on npr. Tone is professional yet approachable.

##### Commercial Voiceover 2

- 목소리 ID: `ja-jp-commercial-2`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 22-year-old Fashion Consultant from Tokyo. Speaks Tokyo Japanese. Voice is resonant and witty.

##### Commercial Voiceover 4

- 목소리 ID: `ja-jp-commercial-4`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 28-year-old Influencer from Tokyo. Speaks Tokyo Japanese. Voice is bright, breezy, and youthful.

##### Commercial Voiceover 5

- 목소리 ID: `ja-jp-commercial-5`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 22-year-old Fashion Consultant from Tokyo. Speaks Tokyo Japanese. Voice is resonant and witty.

##### Concierge 12

- 목소리 ID: `ja-jp-concierge-12`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Concierge & EA
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Concierge from Tokyo. Speaks Tokyo Japanese. Voice is engaging and empathic.

##### Concierge 2

- 목소리 ID: `ja-jp-concierge-2`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Fukuoka Japanese
- 역할: Concierge & EA (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Event Planner from Fukuoka. Speaks Fukuoka Japanese. Voice is clear, medium-pitch, and friendly.

##### Concierge 4

- 목소리 ID: `ja-jp-concierge-4`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Concierge & EA
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Concierge from Tokyo. Speaks Tokyo Japanese. Voice is resonant and witty.

##### Concierge 6

- 목소리 ID: `ja-jp-concierge-6`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: medium
- 억양: Tokyo Japanese
- 역할: Concierge & EA (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 52-year-old Event Planner from Tokyo. Speaks Tokyo Japanese. Voice is crisp and eager.

##### Concierge 8

- 목소리 ID: `ja-jp-concierge-8`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Concierge & EA
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Concierge from Tokyo. Speaks Tokyo Japanese. Currently sitting on couch. Tone is professional yet approachable.

##### Digital Assistant 10

- 목소리 ID: `ja-jp-assistant-10`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: medium
- 억양: Fukuoka Japanese
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 28-year-old Friend from Fukuoka. Speaks Fukuoka Japanese. Voice is bright, breezy, and youthful.

##### Digital Assistant 11

- 목소리 ID: `ja-jp-assistant-11`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Fukuoka Japanese
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 35-year-old Parent from Fukuoka. Speaks Fukuoka Japanese. Voice is light, airy, and precise

##### Digital Assistant 12

- 목소리 ID: `ja-jp-assistant-12`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 44-year-old Friend from Tokyo. Speaks Tokyo Japanese. Voice is crisp and eager.

##### Digital Assistant 2

- 목소리 ID: `ja-jp-assistant-2`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Osaka Japanese
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 38-year-old Parent from Osaka. Speaks Osaka Japanese. Currently on podcast. Sounds confident and clear.

##### Digital Assistant 3

- 목소리 ID: `ja-jp-assistant-3`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Fukuoka Japanese
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 30-year-old Friend from Fukuoka. Speaks Fukuoka Japanese. Currently sitting on couch. Tone is professional yet approachable.

##### Podcaster 1

- 목소리 ID: `ja-jp-podcaster-1`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 57-year-old Podcast Interviewer from Tokyo. Speaks Tokyo Japanese. Voice is engaging and empathic.

##### Podcaster 11

- 목소리 ID: `ja-jp-podcaster-11`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: medium
- 억양: Tokyo Japanese
- 역할: Video Voiceover & Host / Training Voiceover (Trivia Host) | News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 38-year-old Trivia Host from Tokyo. Speaks Tokyo Japanese. Tone is objective, direct, and helpful

##### Podcaster 4

- 목소리 ID: `ja-jp-podcaster-4`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Political Activist)
- 용도: Growth & Marketing
- 공식 설명: 39-year-old Political Activist from Tokyo. Speaks Tokyo Japanese. Currently sitting on couch. Tone is professional yet approachable.

##### Podcaster 5

- 목소리 ID: `ja-jp-podcaster-5`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: medium
- 억양: Osaka Japanese
- 역할: Video Voiceover & Host / Training Voiceover (Trivia Host) | News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 38-year-old Trivia Host from Osaka. Speaks Osaka Japanese. Tone is objective, direct, and helpful

##### Podcaster 7

- 목소리 ID: `ja-jp-podcaster-7`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 65-year-old Podcast Interviewer from Tokyo. Speaks Tokyo Japanese. Voice is energetic, colorful, and fast

##### Podcaster 8

- 목소리 ID: `ja-jp-podcaster-8`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 34-year-old Radio Host from Tokyo. Speaks Tokyo Japanese. Voice is bright, breezy, and youthful.

##### Storyteller 12

- 목소리 ID: `ja-jp-storyteller-12`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 26-year-old Philosopher from Tokyo. Speaks Tokyo Japanese. Currently brainstorming in a meeting. Tone is professional yet approachable.

##### Storyteller 2

- 목소리 ID: `ja-jp-storyteller-2`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Osaka Japanese
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 27-year-old Storyteller from Osaka. Speaks Osaka Japanese. Voice is engaging and empathic.

##### Storyteller 4

- 목소리 ID: `ja-jp-storyteller-4`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 49-year-old Philosopher from Tokyo. Speaks Tokyo Japanese. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Storyteller 5

- 목소리 ID: `ja-jp-storyteller-5`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 24-year-old Nature Documentary Narrator from Tokyo. Speaks Tokyo Japanese. Currently on npr. Tone is professional yet approachable.

##### Storyteller 6

- 목소리 ID: `ja-jp-storyteller-6`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Osaka Japanese
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 27-year-old Nature Documentary Narrator from Osaka. Speaks Osaka Japanese. Voice is light, airy, and precise

##### Storyteller 9

- 목소리 ID: `ja-jp-storyteller-9`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Osaka Japanese
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 38-year-old Philosopher from Osaka. Speaks Osaka Japanese. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Tech Advisor 10

- 목소리 ID: `ja-jp-techagent-10`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: medium
- 억양: Tokyo Japanese
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Architect from Tokyo. Speaks Tokyo Japanese. Voice is bright, breezy, and youthful.

##### Tech Advisor 11

- 목소리 ID: `ja-jp-techagent-11`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Fukuoka Japanese
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Architect from Fukuoka. Speaks Fukuoka Japanese. Currently on npr. Voice is warm and engaging.

##### Tech Advisor 12

- 목소리 ID: `ja-jp-techagent-12`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Architect from Tokyo. Speaks Tokyo Japanese. Voice is crisp and eager.

##### Tech Advisor 2

- 목소리 ID: `ja-jp-techagent-2`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Architect from Tokyo. Speaks Tokyo Japanese. Voice is resonant and witty.

##### Tech Advisor 4

- 목소리 ID: `ja-jp-techagent-4`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Architect from Tokyo. Speaks Tokyo Japanese. Tone is peer-to-peer and curious

##### Tech Advisor 8

- 목소리 ID: `ja-jp-techagent-8`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Fukuoka Japanese
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Tech Support Agent from Fukuoka. Speaks Fukuoka Japanese. Currently on the phone. Voice is warm and engaging.

##### Training Voiceover 2

- 목소리 ID: `ja-jp-training-2`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: medium
- 억양: Fukuoka Japanese
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 40-year-old Instructional Video Host from Fukuoka. Speaks Fukuoka Japanese. Tone is conversational, slightly dry humor, and warm

##### Training Voiceover 4

- 목소리 ID: `ja-jp-training-4`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 63-year-old Instructional Video Host from Tokyo. Speaks Tokyo Japanese. Voice is clear, medium-pitch, and friendly.

##### Tutor 11

- 목소리 ID: `ja-jp-tutor-11`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: high
- 억양: Fukuoka Japanese
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 31-year-old Professor from Fukuoka. Speaks Fukuoka Japanese. Currently in a bookstore. Sounds confident and clear.

##### Tutor 12

- 목소리 ID: `ja-jp-tutor-12`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Osaka Japanese
- 역할: Storyteller & Narrator (Counselor)
- 용도: Content & Media
- 공식 설명: 39-year-old Counselor from Osaka. Speaks Osaka Japanese. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Tutor 2

- 목소리 ID: `ja-jp-tutor-2`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Storyteller & Narrator (Therapist)
- 용도: Content & Media
- 공식 설명: 36-year-old Therapist from Tokyo. Speaks Tokyo Japanese. Voice is cool, confident, and collaborative.

##### Tutor 4

- 목소리 ID: `ja-jp-tutor-4`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 24-year-old Professor from Tokyo. Speaks Tokyo Japanese. Currently on podcast. Tone is professional yet approachable.

##### Tutor 7

- 목소리 ID: `ja-jp-tutor-7`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Osaka Japanese
- 역할: Coach & Motivational Guide (Lifestyle Coach)
- 용도: Wellness & Culture
- 공식 설명: 22-year-old Lifestyle Coach from Osaka. Speaks Osaka Japanese. Voice is comforting someone who is stressed.

##### Tutor 9

- 목소리 ID: `ja-jp-tutor-9`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: male
- 음높이: low
- 억양: Tokyo Japanese
- 역할: Tech Support Agent / Tech Advisor (Librarian)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Librarian from Tokyo. Speaks Tokyo Japanese. Currently on npr. Sounds confident and clear.

#### 중성 — 3개

##### Concierge 9

- 목소리 ID: `ja-jp-concierge-9`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: neutral
- 음높이: medium
- 억양: Tokyo Japanese
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Hotel Concierge from Tokyo. Speaks Tokyo Japanese. Voice is relaxed.

##### Digital Assistant 9

- 목소리 ID: `ja-jp-assistant-9`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: neutral
- 음높이: high
- 억양: Tokyo Japanese
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 29-year-old Friend from Tokyo. Speaks Tokyo Japanese. Voice is resonant and witty.

##### Training Voiceover 11

- 목소리 ID: `ja-jp-training-11`
- 유형: prebuilt
- 언어: ja-JP
- 지역: JP
- 성별: neutral
- 음높이: high
- 억양: Tokyo Japanese
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 41-year-old Cooking Show Host from Tokyo. Speaks Tokyo Japanese. Tone is objective, direct, and helpful

### 자바어·인도네시아 (jv-ID) — 8개

#### 여성 — 6개

##### Concierge 1

- 목소리 ID: `jv-id-concierge-1`
- 유형: prebuilt
- 언어: jv-ID
- 지역: ID
- 성별: female
- 음높이: high
- 억양: Javanese
- 역할: Customer Support Agent / Call Center Agent (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 48-year-old Event Planner from Java, Indonesia. Speaks Javanese. Voice is textured, resonant, and soothing.

##### Concierge 3

- 목소리 ID: `jv-id-concierge-3`
- 유형: prebuilt
- 언어: jv-ID
- 지역: ID
- 성별: female
- 음높이: high
- 억양: Javanese
- 역할: Customer Support Agent / Call Center Agent (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Event Planner from Java, Indonesia. Speaks Javanese. Currently sitting next to you on the bus. Voice is warm and engaging.

##### Concierge 4

- 목소리 ID: `jv-id-concierge-4`
- 유형: prebuilt
- 언어: jv-ID
- 지역: ID
- 성별: female
- 음높이: low
- 억양: Javanese
- 역할: Customer Support Agent / Call Center Agent (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 50-year-old Event Planner from Java, Indonesia. Speaks Javanese. Currently in an indie film. Tone is professional yet approachable.

##### Concierge 5

- 목소리 ID: `jv-id-concierge-5`
- 유형: prebuilt
- 언어: jv-ID
- 지역: ID
- 성별: female
- 음높이: high
- 억양: Javanese
- 역할: Tech Support Agent / Tech Advisor (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Event Planner from Java, Indonesia. Speaks Javanese. Voice is highly approachable.

##### Concierge 6

- 목소리 ID: `jv-id-concierge-6`
- 유형: prebuilt
- 언어: jv-ID
- 지역: ID
- 성별: female
- 음높이: medium
- 억양: Javanese
- 역할: Tech Support Agent / Tech Advisor (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Event Planner from Java, Indonesia. Speaks Javanese. Currently in an oscar winning film. Tone is professional yet approachable.

##### Concierge 8

- 목소리 ID: `jv-id-concierge-8`
- 유형: prebuilt
- 언어: jv-ID
- 지역: ID
- 성별: female
- 음높이: medium
- 억양: Javanese
- 역할: Tech Support Agent / Tech Advisor (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Event Planner from Java, Indonesia. Speaks Javanese. Currently at an appointment. Sounds confident and clear.

#### 남성 — 2개

##### Concierge 2

- 목소리 ID: `jv-id-concierge-2`
- 유형: prebuilt
- 언어: jv-ID
- 지역: ID
- 성별: male
- 음높이: low
- 억양: Javanese
- 역할: Tech Support Agent / Tech Advisor (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Event Planner from Java, Indonesia. Speaks Javanese. Voice is engaging and empathic.

##### Concierge 7

- 목소리 ID: `jv-id-concierge-7`
- 유형: prebuilt
- 언어: jv-ID
- 지역: ID
- 성별: male
- 음높이: low
- 억양: Javanese
- 역할: Concierge & EA (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Event Planner from Java, Indonesia. Speaks Javanese. Voice is resonant and witty.

### 한국어·대한민국 (ko-KR) — 117개

#### 여성 — 59개

##### Authoritative Advisor 2

- 목소리 ID: `ko-kr-advisor-2`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Lawyer from Seoul, South Korea. Speaks Seoul Korean. Voice is light, airy, and precise

##### Authoritative Advisor 4

- 목소리 ID: `ko-kr-advisor-4`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Lawyer from Seoul, South Korea. Speaks Seoul Korean. Tone is objective, direct, and helpful

##### Authoritative Advisor 6

- 목소리 ID: `ko-kr-advisor-6`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Lawyer from Seoul, South Korea. Speaks Seoul Korean. Tone is conversational, slightly dry humor, and warm

##### Authoritative Advisor 7

- 목소리 ID: `ko-kr-advisor-7`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 44-year-old Lawyer from Seoul, South Korea. Speaks Seoul Korean. Voice is clear, medium-pitch, and friendly.

##### Authoritative Advisor 9

- 목소리 ID: `ko-kr-advisor-9`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Lawyer from Seoul, South Korea. Speaks Seoul Korean. Currently sitting next to you on an airplane. Sounds confident and clear.

##### Call Center Agent 1

- 목소리 ID: `ko-kr-csagent-1`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 29-year-old Social Worker from Seoul, South Korea. Speaks Seoul Korean. Currently in an oscar winning film. Sounds confident and clear.

##### Call Center Agent 10

- 목소리 ID: `ko-kr-csagent-10`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 26-year-old Sales Associate from Seoul, South Korea. Speaks Seoul Korean. Voice is light, airy, and precise

##### Call Center Agent 3

- 목소리 ID: `ko-kr-csagent-3`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: low
- 억양: Seoul Korean
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 57-year-old Sales Associate from Seoul, South Korea. Speaks Seoul Korean. Currently sitting on couch. Tone is professional yet approachable.

##### Call Center Agent 5

- 목소리 ID: `ko-kr-csagent-5`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Social Worker from Seoul, South Korea. Speaks Seoul Korean. Voice is comforting someone who is stressed.

##### Call Center Agent 7

- 목소리 ID: `ko-kr-csagent-7`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 53-year-old Social Worker from Seoul, South Korea. Speaks Seoul Korean. Tone is enthusiastic, engaging, and fun

##### Call Center Agent 9

- 목소리 ID: `ko-kr-csagent-9`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Sales Associate from Seoul, South Korea. Speaks Seoul Korean. Voice is clear, medium-pitch, and friendly.

##### Commercial Voiceover 1

- 목소리 ID: `ko-kr-commercial-1`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 36-year-old Fashion Consultant from Seoul, South Korea. Speaks Seoul Korean. Currently at an appointment. Sounds confident and clear.

##### Commercial Voiceover 11

- 목소리 ID: `ko-kr-commercial-11`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 37-year-old Fashion Consultant from Seoul, South Korea. Speaks Seoul Korean. Tone is peer-to-peer and curious

##### Commercial Voiceover 12

- 목소리 ID: `ko-kr-commercial-12`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 23-year-old Fashion Consultant from Seoul, South Korea. Speaks Seoul Korean. Voice is laid-back, encouraging, and chill.

##### Commercial Voiceover 3

- 목소리 ID: `ko-kr-commercial-3`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: low
- 억양: Seoul Korean
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 60-year-old Fashion Consultant from Seoul, South Korea. Speaks Seoul Korean. Currently brainstorming in a meeting. Tone is professional yet approachable.

##### Commercial Voiceover 6

- 목소리 ID: `ko-kr-commercial-6`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 29-year-old Influencer from Seoul, South Korea. Speaks Seoul Korean. Voice is textured, resonant, and soothing.

##### Commercial Voiceover 9

- 목소리 ID: `ko-kr-commercial-9`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Busan Korean
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 21-year-old Influencer from Busan, South Korea. Speaks Busan Korean. Tone is peer-to-peer and curious

##### Concierge 1

- 목소리 ID: `ko-kr-concierge-1`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Tour Guide from Seoul, South Korea. Speaks Seoul Korean. Voice is bright, breezy, and youthful.

##### Concierge 11

- 목소리 ID: `ko-kr-concierge-11`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 50-year-old Tour Guide from Seoul, South Korea. Speaks Seoul Korean. Voice is light, airy, and precise

##### Concierge 12

- 목소리 ID: `ko-kr-concierge-12`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Tour Guide from Seoul, South Korea. Speaks Seoul Korean. Currently in an oscar winning film. Sounds confident and clear.

##### Concierge 4

- 목소리 ID: `ko-kr-concierge-4`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Tour Guide from Seoul, South Korea. Speaks Seoul Korean. Voice is light, airy, and precise

##### Concierge 5

- 목소리 ID: `ko-kr-concierge-5`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 55-year-old Tour Guide from Seoul, South Korea. Speaks Seoul Korean. Voice is natural and clear.

##### Concierge 8

- 목소리 ID: `ko-kr-concierge-8`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 59-year-old Tour Guide from Seoul, South Korea. Speaks Seoul Korean. Voice is bright, breezy, and youthful.

##### Digital Assistant 11

- 목소리 ID: `ko-kr-assistant-11`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 44-year-old Friend from Seoul, South Korea. Speaks Seoul Korean. Voice is clear, medium-pitch, and friendly.

##### Digital Assistant 2

- 목소리 ID: `ko-kr-assistant-2`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Busan Korean
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 34-year-old Sibling from Busan, South Korea. Speaks Busan Korean. Voice is textured, resonant, and soothing.

##### Digital Assistant 3

- 목소리 ID: `ko-kr-assistant-3`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: low
- 억양: Seoul Korean
- 역할: Storyteller & Narrator (Aunt/Uncle)
- 용도: Content & Media
- 공식 설명: 26-year-old Aunt/Uncle from Seoul, South Korea. Speaks Seoul Korean. Voice is bright, breezy, and youthful.

##### Digital Assistant 6

- 목소리 ID: `ko-kr-assistant-6`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Busan Korean
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 51-year-old Sibling from Busan, South Korea. Speaks Busan Korean. Voice is natural and clear.

##### Digital Assistant 7

- 목소리 ID: `ko-kr-assistant-7`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 44-year-old Sibling from Seoul, South Korea. Speaks Seoul Korean. Tone is peer-to-peer and curious

##### Digital Assistant 9

- 목소리 ID: `ko-kr-assistant-9`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 44-year-old Sibling from Seoul, South Korea. Speaks Seoul Korean. Voice is laid-back, encouraging, and chill.

##### Podcaster 1

- 목소리 ID: `ko-kr-podcaster-1`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: News & Podcast Host / Podcaster (Journalist)
- 용도: Content & Media
- 공식 설명: 36-year-old Journalist from Seoul, South Korea. Speaks Seoul Korean. Tone is objective, direct, and helpful

##### Podcaster 12

- 목소리 ID: `ko-kr-podcaster-12`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: News & Podcast Host / Podcaster (Journalist)
- 용도: Content & Media
- 공식 설명: 43-year-old Journalist from Seoul, South Korea. Speaks Seoul Korean. Voice is fast-paced, articulate, energetic.

##### Podcaster 4

- 목소리 ID: `ko-kr-podcaster-4`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: News & Podcast Host / Podcaster (Journalist)
- 용도: Content & Media
- 공식 설명: 41-year-old Journalist from Seoul, South Korea. Speaks Seoul Korean. Tone is enthusiastic, engaging, and fun

##### Podcaster 5

- 목소리 ID: `ko-kr-podcaster-5`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: News & Podcast Host / Podcaster (Journalist)
- 용도: Content & Media
- 공식 설명: 41-year-old Journalist from Seoul, South Korea. Speaks Seoul Korean. Voice is light, airy, and precise

##### Podcaster 6

- 목소리 ID: `ko-kr-podcaster-6`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: News & Podcast Host / Podcaster (Journalist)
- 용도: Content & Media
- 공식 설명: 31-year-old Journalist from Seoul, South Korea. Speaks Seoul Korean. Currently brainstorming in a meeting. Tone is professional yet approachable.

##### Podcaster 7

- 목소리 ID: `ko-kr-podcaster-7`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: News & Podcast Host / Podcaster (Journalist)
- 용도: Content & Media
- 공식 설명: 36-year-old Journalist from Seoul, South Korea. Speaks Seoul Korean. Currently on npr. Tone is professional yet approachable.

##### Storyteller 11

- 목소리 ID: `ko-kr-storyteller-11`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 26-year-old Nature Documentary Narrator from Seoul, South Korea. Speaks Seoul Korean. Voice is laid-back, encouraging, and chill.

##### Storyteller 2

- 목소리 ID: `ko-kr-storyteller-2`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 60-year-old Nature Documentary Narrator from Seoul, South Korea. Speaks Seoul Korean. Tone is conversational, slightly dry humor, and warm

##### Storyteller 4

- 목소리 ID: `ko-kr-storyteller-4`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 27-year-old Nature Documentary Narrator from Seoul, South Korea. Speaks Seoul Korean. Currently on npr. Voice is warm and engaging.

##### Storyteller 6

- 목소리 ID: `ko-kr-storyteller-6`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 25-year-old Nature Documentary Narrator from Seoul, South Korea. Speaks Seoul Korean. Voice is textured, resonant, and soothing.

##### Storyteller 7

- 목소리 ID: `ko-kr-storyteller-7`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 30-year-old Nature Documentary Narrator from Seoul, South Korea. Speaks Seoul Korean. Currently at a meditation retreat. Sounds confident and clear.

##### Storyteller 9

- 목소리 ID: `ko-kr-storyteller-9`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 45-year-old Nature Documentary Narrator from Seoul, South Korea. Speaks Seoul Korean. Tone is reflective, calm, and reassuring

##### Tech Advisor 1

- 목소리 ID: `ko-kr-techagent-1`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: High-Trust Advisor / Authoritative Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Architect from Seoul, South Korea. Speaks Seoul Korean. Voice is textured, resonant, and soothing.

##### Tech Advisor 10

- 목소리 ID: `ko-kr-techagent-10`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: low
- 억양: Busan Korean
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 52-year-old Tech Support Agent from Busan, South Korea. Speaks Busan Korean. Currently on the phone. Voice is warm and engaging.

##### Tech Advisor 12

- 목소리 ID: `ko-kr-techagent-12`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Architect from Seoul, South Korea. Speaks Seoul Korean. Voice is crisp and eager.

##### Tech Advisor 4

- 목소리 ID: `ko-kr-techagent-4`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Busan Korean
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Tech Support Agent from Busan, South Korea. Speaks Busan Korean. Voice is crisp and eager.

##### Tech Advisor 7

- 목소리 ID: `ko-kr-techagent-7`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Tech Support Agent from Seoul, South Korea. Speaks Seoul Korean. Voice is natural and clear.

##### Tech Advisor 8

- 목소리 ID: `ko-kr-techagent-8`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Architect from Seoul, South Korea. Speaks Seoul Korean. Currently in an indie film. Sounds confident and clear.

##### Training Voiceover 1

- 목소리 ID: `ko-kr-training-1`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 51-year-old Instructional Video Host from Seoul, South Korea. Speaks Seoul Korean. Voice is comforting someone who is stressed.

##### Training Voiceover 3

- 목소리 ID: `ko-kr-training-3`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: low
- 억양: Seoul Korean
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 26-year-old Instructional Video Host from Seoul, South Korea. Speaks Seoul Korean. Tone is enthusiastic, engaging, and fun

##### Training Voiceover 6

- 목소리 ID: `ko-kr-training-6`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: low
- 억양: Seoul Korean
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 37-year-old Instructional Video Host from Seoul, South Korea. Speaks Seoul Korean. Voice is bright, breezy, and youthful.

##### Training Voiceover 7

- 목소리 ID: `ko-kr-training-7`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 37-year-old Instructional Video Host from Seoul, South Korea. Speaks Seoul Korean. Voice is bright, breezy, and youthful.

##### Training Voiceover 8

- 목소리 ID: `ko-kr-training-8`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 42-year-old Instructional Video Host from Seoul, South Korea. Speaks Seoul Korean. Voice is textured, resonant, and soothing.

##### Training Voiceover 9

- 목소리 ID: `ko-kr-training-9`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 37-year-old Cooking Show Host from Seoul, South Korea. Speaks Seoul Korean. Voice is intimate talkshow.

##### Tutor 10

- 목소리 ID: `ko-kr-tutor-10`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: Coach & Motivational Guide (Dating Coach)
- 용도: Wellness & Culture
- 공식 설명: 34-year-old Dating Coach from Seoul, South Korea. Speaks Seoul Korean. Voice is bright, breezy, and youthful.

##### Tutor 2

- 목소리 ID: `ko-kr-tutor-2`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Busan Korean
- 역할: Coach & Motivational Guide (Nutritionist)
- 용도: Wellness & Culture
- 공식 설명: 49-year-old Nutritionist from Busan, South Korea. Speaks Busan Korean. Voice is light, airy, and precise

##### Tutor 3

- 목소리 ID: `ko-kr-tutor-3`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: Educational Tutor (Music Teacher)
- 용도: Conversational / Edu
- 공식 설명: 33-year-old Music Teacher from Seoul, South Korea. Speaks Seoul Korean. Voice is crisp and eager.

##### Tutor 5

- 목소리 ID: `ko-kr-tutor-5`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: Storyteller & Narrator (Counselor)
- 용도: Content & Media
- 공식 설명: 43-year-old Counselor from Seoul, South Korea. Speaks Seoul Korean. Voice is fast-paced, articulate, energetic.

##### Tutor 7

- 목소리 ID: `ko-kr-tutor-7`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: medium
- 억양: Seoul Korean
- 역할: Coach & Motivational Guide (Dating Coach)
- 용도: Wellness & Culture
- 공식 설명: 26-year-old Dating Coach from Seoul, South Korea. Speaks Seoul Korean. Voice is clear, medium-pitch, and friendly.

##### Tutor 8

- 목소리 ID: `ko-kr-tutor-8`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: female
- 음높이: high
- 억양: Seoul Korean
- 역할: Educational Tutor (Music Teacher)
- 용도: Conversational / Edu
- 공식 설명: 33-year-old Music Teacher from Seoul, South Korea. Speaks Seoul Korean. Currently on podcast. Tone is professional yet approachable.

#### 남성 — 57개

##### Authoritative Advisor 1

- 목소리 ID: `ko-kr-advisor-1`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Lawyer from Seoul, South Korea. Speaks Seoul Korean. Currently on podcast. Voice is warm and engaging.

##### Authoritative Advisor 3

- 목소리 ID: `ko-kr-advisor-3`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Lawyer from Seoul, South Korea. Speaks Seoul Korean. Voice is comforting someone who is stressed.

##### Authoritative Advisor 5

- 목소리 ID: `ko-kr-advisor-5`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Lawyer from Seoul, South Korea. Speaks Seoul Korean. Currently on podcast. Voice is warm and engaging.

##### Authoritative Advisor 8

- 목소리 ID: `ko-kr-advisor-8`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Lawyer from Seoul, South Korea. Speaks Seoul Korean. Currently on the phone. Sounds confident and clear.

##### Call Center Agent 11

- 목소리 ID: `ko-kr-csagent-11`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 28-year-old Social Worker from Seoul, South Korea. Speaks Seoul Korean. Currently in a bookstore. Sounds confident and clear.

##### Call Center Agent 12

- 목소리 ID: `ko-kr-csagent-12`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 59-year-old Social Worker from Seoul, South Korea. Speaks Seoul Korean. Voice is engaging and empathic.

##### Call Center Agent 2

- 목소리 ID: `ko-kr-csagent-2`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Busan Korean
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Customer Service Agent from Busan, South Korea. Speaks Busan Korean. Voice is fast-paced, articulate, energetic.

##### Call Center Agent 4

- 목소리 ID: `ko-kr-csagent-4`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Social Worker from Seoul, South Korea. Speaks Seoul Korean. Currently on the phone. Tone is professional yet approachable.

##### Call Center Agent 6

- 목소리 ID: `ko-kr-csagent-6`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Sales Associate from Seoul, South Korea. Speaks Seoul Korean. Tone is conversational, slightly dry humor, and warm

##### Call Center Agent 8

- 목소리 ID: `ko-kr-csagent-8`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Social Worker from Seoul, South Korea. Speaks Seoul Korean. Tone is objective, direct, and helpful

##### Commercial Voiceover 10

- 목소리 ID: `ko-kr-commercial-10`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 22-year-old Fashion Consultant from Seoul, South Korea. Speaks Seoul Korean. Currently at an appointment. Voice is warm and engaging.

##### Commercial Voiceover 2

- 목소리 ID: `ko-kr-commercial-2`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Busan Korean
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 21-year-old Influencer from Busan, South Korea. Speaks Busan Korean. Voice is textured, resonant, and soothing.

##### Commercial Voiceover 4

- 목소리 ID: `ko-kr-commercial-4`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: medium
- 억양: Busan Korean
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 29-year-old Influencer from Busan, South Korea. Speaks Busan Korean. Voice is clear, medium-pitch, and friendly.

##### Commercial Voiceover 5

- 목소리 ID: `ko-kr-commercial-5`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 25-year-old Fashion Consultant from Seoul, South Korea. Speaks Seoul Korean. Voice is intimate talkshow.

##### Commercial Voiceover 7

- 목소리 ID: `ko-kr-commercial-7`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 55-year-old Fashion Consultant from Seoul, South Korea. Speaks Seoul Korean. Voice is textured, resonant, and soothing.

##### Commercial Voiceover 8

- 목소리 ID: `ko-kr-commercial-8`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Fashion Consultant)
- 용도: Growth & Marketing
- 공식 설명: 25-year-old Fashion Consultant from Seoul, South Korea. Speaks Seoul Korean. Currently in an indie film. Voice is warm and engaging.

##### Concierge 10

- 목소리 ID: `ko-kr-concierge-10`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Executive Assistant from Seoul, South Korea. Speaks Seoul Korean. Voice is engaging and empathic.

##### Concierge 2

- 목소리 ID: `ko-kr-concierge-2`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Busan Korean
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 44-year-old Executive Assistant from Busan, South Korea. Speaks Busan Korean. Voice is bright, breezy, and youthful.

##### Concierge 3

- 목소리 ID: `ko-kr-concierge-3`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 61-year-old Executive Assistant from Seoul, South Korea. Speaks Seoul Korean. Currently on npr. Tone is professional yet approachable.

##### Concierge 6

- 목소리 ID: `ko-kr-concierge-6`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Tour Guide from Seoul, South Korea. Speaks Seoul Korean. Voice is crisp and eager.

##### Concierge 7

- 목소리 ID: `ko-kr-concierge-7`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 60-year-old Tour Guide from Seoul, South Korea. Speaks Seoul Korean. Currently at a meditation retreat. Voice is warm and engaging.

##### Concierge 9

- 목소리 ID: `ko-kr-concierge-9`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Concierge & EA (Tour Guide)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Tour Guide from Seoul, South Korea. Speaks Seoul Korean. Voice is light, airy, and precise

##### Digital Assistant 1

- 목소리 ID: `ko-kr-assistant-1`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Companion & Peer / Digital Assistant (Best Friend)
- 용도: Conversational / Edu
- 공식 설명: 28-year-old Best Friend from Seoul, South Korea. Speaks Seoul Korean. Voice is engaging and empathic.

##### Digital Assistant 10

- 목소리 ID: `ko-kr-assistant-10`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 33-year-old Parent from Seoul, South Korea. Speaks Seoul Korean. Voice is resonant and witty.

##### Digital Assistant 12

- 목소리 ID: `ko-kr-assistant-12`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Companion & Peer / Digital Assistant (Best Friend)
- 용도: Conversational / Edu
- 공식 설명: 59-year-old Best Friend from Seoul, South Korea. Speaks Seoul Korean. Currently at an appointment. Tone is professional yet approachable.

##### Digital Assistant 4

- 목소리 ID: `ko-kr-assistant-4`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Busan Korean
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 51-year-old Sibling from Busan, South Korea. Speaks Busan Korean. Currently brainstorming in a meeting. Sounds confident and clear.

##### Digital Assistant 5

- 목소리 ID: `ko-kr-assistant-5`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Storyteller & Narrator (Aunt/Uncle)
- 용도: Content & Media
- 공식 설명: 31-year-old Aunt/Uncle from Seoul, South Korea. Speaks Seoul Korean. Currently on npr. Voice is warm and engaging.

##### Digital Assistant 8

- 목소리 ID: `ko-kr-assistant-8`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 38-year-old Parent from Seoul, South Korea. Speaks Seoul Korean. Currently on npr. Sounds confident and clear.

##### Podcaster 10

- 목소리 ID: `ko-kr-podcaster-10`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 48-year-old Podcast Interviewer from Seoul, South Korea. Speaks Seoul Korean. Currently on the phone. Sounds confident and clear.

##### Podcaster 11

- 목소리 ID: `ko-kr-podcaster-11`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: News & Podcast Host / Podcaster (Journalist)
- 용도: Content & Media
- 공식 설명: 39-year-old Journalist from Seoul, South Korea. Speaks Seoul Korean. Currently sitting next to you on the bus. Sounds confident and clear.

##### Podcaster 2

- 목소리 ID: `ko-kr-podcaster-2`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Busan Korean
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 23-year-old Radio Host from Busan, South Korea. Speaks Busan Korean. Voice is light, airy, and precise

##### Podcaster 3

- 목소리 ID: `ko-kr-podcaster-3`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: News & Podcast Host / Podcaster (Journalist)
- 용도: Content & Media
- 공식 설명: 57-year-old Journalist from Seoul, South Korea. Speaks Seoul Korean. Currently in a bookstore. Voice is warm and engaging.

##### Podcaster 8

- 목소리 ID: `ko-kr-podcaster-8`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: News & Podcast Host / Podcaster (Journalist)
- 용도: Content & Media
- 공식 설명: 35-year-old Journalist from Seoul, South Korea. Speaks Seoul Korean. Voice is highly approachable.

##### Podcaster 9

- 목소리 ID: `ko-kr-podcaster-9`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 41-year-old Radio Host from Seoul, South Korea. Speaks Seoul Korean. Voice is highly approachable.

##### Storyteller 1

- 목소리 ID: `ko-kr-storyteller-1`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 59-year-old Nature Documentary Narrator from Seoul, South Korea. Speaks Seoul Korean. Voice is laid-back, encouraging, and chill.

##### Storyteller 10

- 목소리 ID: `ko-kr-storyteller-10`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 34-year-old Nature Documentary Narrator from Seoul, South Korea. Speaks Seoul Korean. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Storyteller 12

- 목소리 ID: `ko-kr-storyteller-12`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 49-year-old Nature Documentary Narrator from Seoul, South Korea. Speaks Seoul Korean. Voice is light, airy, and precise

##### Storyteller 3

- 목소리 ID: `ko-kr-storyteller-3`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 23-year-old Nature Documentary Narrator from Seoul, South Korea. Speaks Seoul Korean. Voice is clear, medium-pitch, and friendly.

##### Storyteller 5

- 목소리 ID: `ko-kr-storyteller-5`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: medium
- 억양: Seoul Korean
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 41-year-old Nature Documentary Narrator from Seoul, South Korea. Speaks Seoul Korean. Voice is crisp and eager.

##### Storyteller 8

- 목소리 ID: `ko-kr-storyteller-8`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 33-year-old Nature Documentary Narrator from Seoul, South Korea. Speaks Seoul Korean. Voice is bright, breezy, and youthful.

##### Tech Advisor 11

- 목소리 ID: `ko-kr-techagent-11`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Architect from Seoul, South Korea. Speaks Seoul Korean. Currently in an oscar winning film. Tone is professional yet approachable.

##### Tech Advisor 2

- 목소리 ID: `ko-kr-techagent-2`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Busan Korean
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 45-year-old Architect from Busan, South Korea. Speaks Busan Korean. Voice is relaxed.

##### Tech Advisor 3

- 목소리 ID: `ko-kr-techagent-3`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Architect from Seoul, South Korea. Speaks Seoul Korean. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Tech Advisor 5

- 목소리 ID: `ko-kr-techagent-5`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Architect from Seoul, South Korea. Speaks Seoul Korean. Voice is cool, confident, and collaborative.

##### Tech Advisor 6

- 목소리 ID: `ko-kr-techagent-6`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: medium
- 억양: Seoul Korean
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Architect from Seoul, South Korea. Speaks Seoul Korean. Currently brainstorming in a meeting. Sounds confident and clear.

##### Tech Advisor 9

- 목소리 ID: `ko-kr-techagent-9`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Architect from Seoul, South Korea. Speaks Seoul Korean. Voice is clear, medium-pitch, and friendly.

##### Training Voiceover 11

- 목소리 ID: `ko-kr-training-11`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 44-year-old Cooking Show Host from Seoul, South Korea. Speaks Seoul Korean. Voice is relaxed.

##### Training Voiceover 12

- 목소리 ID: `ko-kr-training-12`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 57-year-old Instructional Video Host from Seoul, South Korea. Speaks Seoul Korean. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Training Voiceover 2

- 목소리 ID: `ko-kr-training-2`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 57-year-old Instructional Video Host from Seoul, South Korea. Speaks Seoul Korean. Voice is cool, confident, and collaborative.

##### Training Voiceover 4

- 목소리 ID: `ko-kr-training-4`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: medium
- 억양: Seoul Korean
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 46-year-old Instructional Video Host from Seoul, South Korea. Speaks Seoul Korean. Currently on podcast. Sounds confident and clear.

##### Training Voiceover 5

- 목소리 ID: `ko-kr-training-5`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 54-year-old Instructional Video Host from Seoul, South Korea. Speaks Seoul Korean. Voice is textured, resonant, and soothing.

##### Tutor 1

- 목소리 ID: `ko-kr-tutor-1`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Storyteller & Narrator (Counselor)
- 용도: Content & Media
- 공식 설명: 54-year-old Counselor from Seoul, South Korea. Speaks Seoul Korean. Tone is reflective, calm, and reassuring

##### Tutor 11

- 목소리 ID: `ko-kr-tutor-11`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Coach & Motivational Guide (Nutritionist)
- 용도: Wellness & Culture
- 공식 설명: 53-year-old Nutritionist from Seoul, South Korea. Speaks Seoul Korean. Voice is crisp and eager.

##### Tutor 12

- 목소리 ID: `ko-kr-tutor-12`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Educational Tutor
- 용도: Conversational / Edu
- 공식 설명: 45-year-old Tutor from Seoul, South Korea. Speaks Seoul Korean. Voice is crisp and eager.

##### Tutor 4

- 목소리 ID: `ko-kr-tutor-4`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Busan Korean
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 23-year-old Writing Tutor from Busan, South Korea. Speaks Busan Korean. Currently brainstorming in a meeting. Tone is professional yet approachable.

##### Tutor 6

- 목소리 ID: `ko-kr-tutor-6`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: medium
- 억양: Seoul Korean
- 역할: Coach & Motivational Guide (Dating Coach)
- 용도: Wellness & Culture
- 공식 설명: 26-year-old Dating Coach from Seoul, South Korea. Speaks Seoul Korean. Tone is enthusiastic, engaging, and fun

##### Tutor 9

- 목소리 ID: `ko-kr-tutor-9`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: male
- 음높이: low
- 억양: Seoul Korean
- 역할: Coach & Motivational Guide (Nutritionist)
- 용도: Wellness & Culture
- 공식 설명: 38-year-old Nutritionist from Seoul, South Korea. Speaks Seoul Korean. Currently in an oscar winning film. Sounds confident and clear.

#### 중성 — 1개

##### Training Voiceover 10

- 목소리 ID: `ko-kr-training-10`
- 유형: prebuilt
- 언어: ko-KR
- 지역: KR
- 성별: neutral
- 음높이: high
- 억양: Seoul Korean
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 31-year-old Instructional Video Host from Seoul, South Korea. Speaks Seoul Korean. Currently in an oscar winning film. Tone is professional yet approachable.

### 네덜란드어·네덜란드 (nl-NL) — 33개

#### 여성 — 16개

##### Authoritative Advisor 1

- 목소리 ID: `nl-nl-advisor-1`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: female
- 음높이: high
- 억양: Dutch
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Lawyer from The Netherlands. Speaks Dutch. Currently on npr. Tone is professional yet approachable.

##### Authoritative Advisor 3

- 목소리 ID: `nl-nl-advisor-3`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: female
- 음높이: medium
- 억양: Dutch
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 50-year-old Researcher from The Netherlands. Speaks Dutch. Currently at an appointment. Voice is warm and engaging.

##### Call Center Agent 1

- 목소리 ID: `nl-nl-csagent-1`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: female
- 음높이: high
- 억양: Dutch
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 58-year-old Social Worker from The Netherlands. Speaks Dutch. Voice is clear, medium-pitch, and friendly.

##### Concierge 2

- 목소리 ID: `nl-nl-concierge-2`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: female
- 음높이: medium
- 억양: Dutch
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Executive Assistant from The Netherlands. Speaks Dutch. Tone is reflective, calm, and reassuring

##### Digital Assistant 2

- 목소리 ID: `nl-nl-assistant-2`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: female
- 음높이: medium
- 억양: Dutch
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 32-year-old Sibling from The Netherlands. Speaks Dutch. Currently sitting on couch. Sounds confident and clear.

##### Digital Assistant 4

- 목소리 ID: `nl-nl-assistant-4`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: female
- 음높이: low
- 억양: Dutch
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 47-year-old Parent from The Netherlands. Speaks Dutch. Currently at a meditation retreat. Tone is professional yet approachable.

##### Storyteller 1

- 목소리 ID: `nl-nl-storyteller-1`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: female
- 음높이: medium
- 억양: Dutch
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 65-year-old Storyteller from The Netherlands. Speaks Dutch. Voice is bright, breezy, and youthful.

##### Storyteller 3

- 목소리 ID: `nl-nl-storyteller-3`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: female
- 음높이: high
- 억양: Dutch
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 60-year-old Storyteller from The Netherlands. Speaks Dutch. Voice is crisp and eager.

##### Tech Advisor 1

- 목소리 ID: `nl-nl-techagent-1`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: female
- 음높이: low
- 억양: Dutch
- 역할: Customer Support Agent / Call Center Agent (Tech Support Agent)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Tech Support Agent from The Netherlands. Speaks Dutch. Currently at an appointment. Sounds confident and clear.

##### Tech Advisor 3

- 목소리 ID: `nl-nl-techagent-3`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: female
- 음높이: high
- 억양: Dutch
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Tech Support Agent from The Netherlands. Speaks Dutch. Currently sitting on couch. Sounds confident and clear.

##### Tech Advisor 4

- 목소리 ID: `nl-nl-techagent-4`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: female
- 음높이: high
- 억양: Dutch
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Architect from The Netherlands. Speaks Dutch. Voice is light, airy, and precise

##### Tech Advisor 5

- 목소리 ID: `nl-nl-techagent-5`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: female
- 음높이: medium
- 억양: Dutch
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Architect from The Netherlands. Speaks Dutch. Tone is conversational, slightly dry humor, and warm

##### Tutor 1

- 목소리 ID: `nl-nl-tutor-1`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: female
- 음높이: medium
- 억양: Dutch
- 역할: Customer Support Agent / Call Center Agent (Therapist)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Therapist from The Netherlands. Speaks Dutch. Currently on podcast. Voice is warm and engaging.

##### Tutor 3

- 목소리 ID: `nl-nl-tutor-3`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: female
- 음높이: medium
- 억양: Dutch
- 역할: Customer Support Agent / Call Center Agent (Teacher)
- 용도: Enterprise Agent
- 공식 설명: 59-year-old Teacher from The Netherlands. Speaks Dutch. Voice is relaxed.

##### Tutor 5

- 목소리 ID: `nl-nl-tutor-5`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: female
- 음높이: high
- 억양: Dutch
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 32-year-old Professor from The Netherlands. Speaks Dutch. Tone is objective, direct, and helpful

##### Tutor 6

- 목소리 ID: `nl-nl-tutor-6`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: female
- 음높이: medium
- 억양: Dutch
- 역할: High-Trust Advisor / Authoritative Advisor (Therapist)
- 용도: Enterprise Agent
- 공식 설명: 22-year-old Therapist from The Netherlands. Speaks Dutch. Voice is resonant and witty.

#### 남성 — 17개

##### Authoritative Advisor 2

- 목소리 ID: `nl-nl-advisor-2`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: male
- 음높이: low
- 억양: Dutch
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Lawyer from The Netherlands. Speaks Dutch. Currently sitting on couch. Sounds confident and clear.

##### Authoritative Advisor 4

- 목소리 ID: `nl-nl-advisor-4`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: male
- 음높이: low
- 억양: Dutch
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Researcher from The Netherlands. Speaks Dutch. Voice is clear, medium-pitch, and friendly.

##### Concierge 1

- 목소리 ID: `nl-nl-concierge-1`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: male
- 음높이: low
- 억양: Dutch
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 51-year-old Executive Assistant from The Netherlands. Speaks Dutch. Tone is objective, direct, and helpful

##### Digital Assistant 1

- 목소리 ID: `nl-nl-assistant-1`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: male
- 음높이: low
- 억양: Dutch
- 역할: Customer Support Agent / Call Center Agent (Sibling)
- 용도: Enterprise Agent
- 공식 설명: 63-year-old Sibling from The Netherlands. Speaks Dutch. Voice is natural and clear.

##### Digital Assistant 3

- 목소리 ID: `nl-nl-assistant-3`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: male
- 음높이: low
- 억양: Dutch
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 31-year-old Sibling from The Netherlands. Speaks Dutch. Voice is bright, breezy, and youthful.

##### Digital Assistant 5

- 목소리 ID: `nl-nl-assistant-5`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: male
- 음높이: low
- 억양: Dutch
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 61-year-old Sibling from The Netherlands. Speaks Dutch. Voice is highly approachable.

##### Digital Assistant 6

- 목소리 ID: `nl-nl-assistant-6`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: male
- 음높이: low
- 억양: Dutch
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 44-year-old Sibling from The Netherlands. Speaks Dutch. Currently in a bookstore. Sounds confident and clear.

##### Digital Assistant 7

- 목소리 ID: `nl-nl-assistant-7`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: male
- 음높이: low
- 억양: Dutch
- 역할: Storyteller & Narrator (Parent)
- 용도: Content & Media
- 공식 설명: 44-year-old Parent from The Netherlands. Speaks Dutch. Currently at an appointment. Tone is professional yet approachable.

##### Storyteller 2

- 목소리 ID: `nl-nl-storyteller-2`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: male
- 음높이: low
- 억양: Dutch
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 54-year-old Storyteller from The Netherlands. Speaks Dutch. Currently on podcast. Sounds confident and clear.

##### Tech Advisor 2

- 목소리 ID: `nl-nl-techagent-2`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: male
- 음높이: low
- 억양: Dutch
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Tech Support Agent from The Netherlands. Speaks Dutch. Currently on the phone. Sounds confident and clear.

##### Tech Advisor 6

- 목소리 ID: `nl-nl-techagent-6`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: male
- 음높이: low
- 억양: Dutch
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Architect from The Netherlands. Speaks Dutch. Voice is resonant and witty.

##### Training Voiceover 1

- 목소리 ID: `nl-nl-training-1`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: male
- 음높이: low
- 억양: Dutch
- 역할: Concierge & EA (Cooking Show Host)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Cooking Show Host from The Netherlands. Speaks Dutch. Voice is textured, resonant, and soothing.

##### Training Voiceover 2

- 목소리 ID: `nl-nl-training-2`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: male
- 음높이: low
- 억양: Dutch
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 56-year-old Instructional Video Host from The Netherlands. Speaks Dutch. Currently on podcast. Tone is professional yet approachable.

##### Tutor 2

- 목소리 ID: `nl-nl-tutor-2`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: male
- 음높이: low
- 억양: Dutch
- 역할: Video Voiceover & Host / Training Voiceover (Chess Instructor)
- 용도: Content & Media
- 공식 설명: 58-year-old Chess Instructor from The Netherlands. Speaks Dutch. Tone is reflective, calm, and reassuring

##### Tutor 4

- 목소리 ID: `nl-nl-tutor-4`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: male
- 음높이: low
- 억양: Dutch
- 역할: Concierge & EA (Professor)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Professor from The Netherlands. Speaks Dutch. Tone is objective, direct, and helpful

##### Tutor 7

- 목소리 ID: `nl-nl-tutor-7`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: male
- 음높이: low
- 억양: Dutch
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 29-year-old Chess Instructor from The Netherlands. Speaks Dutch. Currently in a bookstore. Sounds confident and clear.

##### Tutor 8

- 목소리 ID: `nl-nl-tutor-8`
- 유형: prebuilt
- 언어: nl-NL
- 지역: NL
- 성별: male
- 음높이: high
- 억양: Dutch
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 27-year-old Chess Instructor from The Netherlands. Speaks Dutch. Tone is enthusiastic, engaging, and fun

### 폴란드어·폴란드 (pl-PL) — 63개

#### 여성 — 31개

##### Authoritative Advisor 2

- 목소리 ID: `pl-pl-advisor-2`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: low
- 억양: Polish
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Lawyer from Poland. Speaks Polish. Voice is light, airy, and precise

##### Authoritative Advisor 6

- 목소리 ID: `pl-pl-advisor-6`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: medium
- 억양: Polish
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Lawyer from Poland. Speaks Polish. Voice is relaxed.

##### Authoritative Advisor 7

- 목소리 ID: `pl-pl-advisor-7`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: high
- 억양: Polish
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Researcher from Poland. Speaks Polish. Currently on the phone. Sounds confident and clear.

##### Authoritative Advisor 8

- 목소리 ID: `pl-pl-advisor-8`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: high
- 억양: Polish
- 역할: High-Trust Advisor / Authoritative Advisor (Researcher)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Researcher from Poland. Speaks Polish. Currently brainstorming in a meeting. Tone is professional yet approachable.

##### Call Center Agent 1

- 목소리 ID: `pl-pl-csagent-1`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: medium
- 억양: Polish
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Social Worker from Poland. Speaks Polish. Voice is cool, confident, and collaborative.

##### Call Center Agent 3

- 목소리 ID: `pl-pl-csagent-3`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: high
- 억양: Polish
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Social Worker from Poland. Speaks Polish. Currently on podcast. Sounds confident and clear.

##### Call Center Agent 5

- 목소리 ID: `pl-pl-csagent-5`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: high
- 억양: Polish
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Social Worker from Poland. Speaks Polish. Voice is fast-paced, articulate, energetic.

##### Call Center Agent 7

- 목소리 ID: `pl-pl-csagent-7`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: low
- 억양: Polish
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Social Worker from Poland. Speaks Polish. Voice is crisp and eager.

##### Call Center Agent 8

- 목소리 ID: `pl-pl-csagent-8`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: medium
- 억양: Polish
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Social Worker from Poland. Speaks Polish. Voice is comforting someone who is stressed.

##### Concierge 2

- 목소리 ID: `pl-pl-concierge-2`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: medium
- 억양: Polish
- 역할: Concierge & EA (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Event Planner from Poland. Speaks Polish. Currently brainstorming in a meeting. Voice is warm and engaging.

##### Concierge 4

- 목소리 ID: `pl-pl-concierge-4`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: low
- 억양: Polish
- 역할: Concierge & EA (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Event Planner from Poland. Speaks Polish. Tone is peer-to-peer and curious

##### Digital Assistant 1

- 목소리 ID: `pl-pl-assistant-1`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: medium
- 억양: Polish
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 37-year-old Parent from Poland. Speaks Polish. Currently sitting on couch. Sounds confident and clear.

##### Digital Assistant 6

- 목소리 ID: `pl-pl-assistant-6`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: medium
- 억양: Polish
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 39-year-old Parent from Poland. Speaks Polish. Currently on podcast. Voice is warm and engaging.

##### Digital Assistant 7

- 목소리 ID: `pl-pl-assistant-7`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: high
- 억양: Polish
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 30-year-old Sibling from Poland. Speaks Polish. Currently at a meditation retreat. Sounds confident and clear.

##### Digital Assistant 8

- 목소리 ID: `pl-pl-assistant-8`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: medium
- 억양: Polish
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 40-year-old Parent from Poland. Speaks Polish. Tone is enthusiastic, engaging, and fun

##### Podcaster 2

- 목소리 ID: `pl-pl-podcaster-2`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: medium
- 억양: Polish
- 역할: News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 43-year-old Trivia Host from Poland. Speaks Polish. Voice is cool, confident, and collaborative.

##### Podcaster 3

- 목소리 ID: `pl-pl-podcaster-3`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: low
- 억양: Polish
- 역할: Video Voiceover & Host / Training Voiceover (Trivia Host) | News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 36-year-old Trivia Host from Poland. Speaks Polish. Currently on the phone. Voice is warm and engaging.

##### Podcaster 4

- 목소리 ID: `pl-pl-podcaster-4`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: medium
- 억양: Polish
- 역할: News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 36-year-old Trivia Host from Poland. Speaks Polish. Tone is objective, direct, and helpful

##### Podcaster 7

- 목소리 ID: `pl-pl-podcaster-7`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: low
- 억양: Polish
- 역할: News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 40-year-old Trivia Host from Poland. Speaks Polish. Currently in a bookstore. Tone is professional yet approachable.

##### Tech Advisor 2

- 목소리 ID: `pl-pl-techagent-2`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: medium
- 억양: Polish
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Tech Support Agent from Poland. Speaks Polish. Voice is resonant and witty.

##### Tech Advisor 4

- 목소리 ID: `pl-pl-techagent-4`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: high
- 억양: Polish
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 53-year-old Tech Support Agent from Poland. Speaks Polish. Currently sitting next to you on an airplane. Sounds confident and clear.

##### Tech Advisor 6

- 목소리 ID: `pl-pl-techagent-6`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: medium
- 억양: Polish
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Architect from Poland. Speaks Polish. Currently at an appointment. Tone is professional yet approachable.

##### Tech Advisor 8

- 목소리 ID: `pl-pl-techagent-8`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: medium
- 억양: Polish
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Architect from Poland. Speaks Polish. Currently sitting next to you on an airplane. Sounds confident and clear.

##### Training Voiceover 2

- 목소리 ID: `pl-pl-training-2`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: low
- 억양: Polish
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 42-year-old Instructional Video Host from Poland. Speaks Polish. Voice is highly approachable.

##### Training Voiceover 4

- 목소리 ID: `pl-pl-training-4`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: medium
- 억양: Polish
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 41-year-old Instructional Video Host from Poland. Speaks Polish. Voice is bright, breezy, and youthful.

##### Training Voiceover 6

- 목소리 ID: `pl-pl-training-6`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: high
- 억양: Polish
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 42-year-old Cooking Show Host from Poland. Speaks Polish. Currently brainstorming in a meeting. Voice is warm and engaging.

##### Training Voiceover 8

- 목소리 ID: `pl-pl-training-8`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: medium
- 억양: Polish
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 41-year-old Cooking Show Host from Poland. Speaks Polish. Tone is peer-to-peer and curious

##### Tutor 2

- 목소리 ID: `pl-pl-tutor-2`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: medium
- 억양: Polish
- 역할: Coach & Motivational Guide (Fitness Trainer)
- 용도: Wellness & Culture
- 공식 설명: 37-year-old Fitness Trainer from Poland. Speaks Polish. Voice is energetic, colorful, and fast

##### Tutor 5

- 목소리 ID: `pl-pl-tutor-5`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: medium
- 억양: Polish
- 역할: Coach & Motivational Guide (Fitness Trainer)
- 용도: Wellness & Culture
- 공식 설명: 39-year-old Fitness Trainer from Poland. Speaks Polish. Currently sitting on couch. Sounds confident and clear.

##### Tutor 7

- 목소리 ID: `pl-pl-tutor-7`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: low
- 억양: Polish
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 28-year-old Professor from Poland. Speaks Polish. Voice is comforting someone who is stressed.

##### Tutor 8

- 목소리 ID: `pl-pl-tutor-8`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: female
- 음높이: high
- 억양: Polish
- 역할: Educational Tutor (Teacher)
- 용도: Conversational / Edu
- 공식 설명: 55-year-old Teacher from Poland. Speaks Polish. Currently in a bookstore. Sounds confident and clear.

#### 남성 — 31개

##### Authoritative Advisor 1

- 목소리 ID: `pl-pl-advisor-1`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Lawyer from Poland. Speaks Polish. Voice is resonant and witty.

##### Authoritative Advisor 3

- 목소리 ID: `pl-pl-advisor-3`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Lawyer from Poland. Speaks Polish. Voice is clear, medium-pitch, and friendly.

##### Authoritative Advisor 4

- 목소리 ID: `pl-pl-advisor-4`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Lawyer from Poland. Speaks Polish. Voice is intimate talkshow.

##### Authoritative Advisor 5

- 목소리 ID: `pl-pl-advisor-5`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 48-year-old Lawyer from Poland. Speaks Polish. Currently at a meditation retreat. Tone is professional yet approachable.

##### Call Center Agent 2

- 목소리 ID: `pl-pl-csagent-2`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Social Worker from Poland. Speaks Polish. Currently in an oscar winning film. Voice is warm and engaging.

##### Call Center Agent 4

- 목소리 ID: `pl-pl-csagent-4`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Social Worker from Poland. Speaks Polish. Voice is intimate talkshow.

##### Call Center Agent 6

- 목소리 ID: `pl-pl-csagent-6`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Social Worker from Poland. Speaks Polish. Voice is textured, resonant, and soothing.

##### Concierge 1

- 목소리 ID: `pl-pl-concierge-1`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 63-year-old Executive Assistant from Poland. Speaks Polish. Voice is intimate talkshow.

##### Concierge 3

- 목소리 ID: `pl-pl-concierge-3`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 27-year-old Executive Assistant from Poland. Speaks Polish. Currently on podcast. Voice is warm and engaging.

##### Concierge 5

- 목소리 ID: `pl-pl-concierge-5`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Concierge & EA (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 25-year-old Event Planner from Poland. Speaks Polish. Voice is cool, confident, and collaborative.

##### Concierge 6

- 목소리 ID: `pl-pl-concierge-6`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Executive Assistant from Poland. Speaks Polish. Currently at an appointment. Sounds confident and clear.

##### Concierge 7

- 목소리 ID: `pl-pl-concierge-7`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Executive Assistant from Poland. Speaks Polish. Currently at an appointment. Sounds confident and clear.

##### Digital Assistant 2

- 목소리 ID: `pl-pl-assistant-2`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 38-year-old Sibling from Poland. Speaks Polish. Tone is conversational, slightly dry humor, and warm

##### Digital Assistant 3

- 목소리 ID: `pl-pl-assistant-3`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 47-year-old Sibling from Poland. Speaks Polish. Voice is textured, resonant, and soothing.

##### Digital Assistant 5

- 목소리 ID: `pl-pl-assistant-5`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 37-year-old Parent from Poland. Speaks Polish. Voice is deep, velvety, and unhurried.

##### Podcaster 1

- 목소리 ID: `pl-pl-podcaster-1`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Storyteller & Narrator (Trivia Host)
- 용도: Content & Media
- 공식 설명: 23-year-old Trivia Host from Poland. Speaks Polish. Voice is laid-back, encouraging, and chill.

##### Podcaster 5

- 목소리 ID: `pl-pl-podcaster-5`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 24-year-old Trivia Host from Poland. Speaks Polish. Voice is engaging and empathic.

##### Podcaster 6

- 목소리 ID: `pl-pl-podcaster-6`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 64-year-old Trivia Host from Poland. Speaks Polish. Currently sitting on couch. Sounds confident and clear.

##### Storyteller 1

- 목소리 ID: `pl-pl-storyteller-1`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: medium
- 억양: Polish
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 45-year-old Philosopher from Poland. Speaks Polish. Tone is peer-to-peer and curious

##### Tech Advisor 1

- 목소리 ID: `pl-pl-techagent-1`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Architect from Poland. Speaks Polish. Voice is cool, confident, and collaborative.

##### Tech Advisor 3

- 목소리 ID: `pl-pl-techagent-3`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 26-year-old Tech Support Agent from Poland. Speaks Polish. Voice is clear, medium-pitch, and friendly.

##### Tech Advisor 5

- 목소리 ID: `pl-pl-techagent-5`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: medium
- 억양: Polish
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 38-year-old Architect from Poland. Speaks Polish. Voice is fast-paced, articulate, energetic.

##### Tech Advisor 7

- 목소리 ID: `pl-pl-techagent-7`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Architect from Poland. Speaks Polish. Voice is bright, breezy, and youthful.

##### Training Voiceover 1

- 목소리 ID: `pl-pl-training-1`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Storyteller & Narrator (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 25-year-old Instructional Video Host from Poland. Speaks Polish. Currently on npr. Sounds confident and clear.

##### Training Voiceover 3

- 목소리 ID: `pl-pl-training-3`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 36-year-old Instructional Video Host from Poland. Speaks Polish. Currently at an appointment. Tone is professional yet approachable.

##### Training Voiceover 5

- 목소리 ID: `pl-pl-training-5`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 61-year-old Cooking Show Host from Poland. Speaks Polish. Voice is resonant and witty.

##### Training Voiceover 7

- 목소리 ID: `pl-pl-training-7`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 31-year-old Instructional Video Host from Poland. Speaks Polish. Currently in an indie film. Sounds confident and clear.

##### Tutor 1

- 목소리 ID: `pl-pl-tutor-1`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 31-year-old Chess Instructor from Poland. Speaks Polish. Currently in an indie film. Voice is warm and engaging.

##### Tutor 3

- 목소리 ID: `pl-pl-tutor-3`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 32-year-old Chess Instructor from Poland. Speaks Polish. Currently on npr. Voice is warm and engaging.

##### Tutor 4

- 목소리 ID: `pl-pl-tutor-4`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: low
- 억양: Polish
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 26-year-old Chess Instructor from Poland. Speaks Polish. Voice is intimate talkshow.

##### Tutor 6

- 목소리 ID: `pl-pl-tutor-6`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: male
- 음높이: medium
- 억양: Polish
- 역할: Coach & Motivational Guide (Fitness Trainer)
- 용도: Wellness & Culture
- 공식 설명: 52-year-old Fitness Trainer from Poland. Speaks Polish. Voice is cool, confident, and collaborative.

#### 중성 — 1개

##### Digital Assistant 4

- 목소리 ID: `pl-pl-assistant-4`
- 유형: prebuilt
- 언어: pl-PL
- 지역: PL
- 성별: neutral
- 음높이: low
- 억양: Polish
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Aunt/Uncle)
- 용도: Growth & Marketing
- 공식 설명: 27-year-old Aunt/Uncle from Poland. Speaks Polish. Tone is peer-to-peer and curious

### 포르투갈어·브라질 (pt-BR) — 107개

#### 여성 — 51개

##### Authoritative Advisor 1

- 목소리 ID: `pt-br-advisor-1`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Lawyer from Brazil. Speaks Brazilian Portuguese. Currently on npr. Voice is warm and engaging.

##### Authoritative Advisor 12

- 목소리 ID: `pt-br-advisor-12`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: high
- 억양: Brazilian Portuguese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Lawyer from Brazil. Speaks Brazilian Portuguese. Currently in an oscar winning film. Voice is warm and engaging.

##### Authoritative Advisor 3

- 목소리 ID: `pt-br-advisor-3`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 45-year-old Lawyer from Brazil. Speaks Brazilian Portuguese. Currently sitting on couch. Sounds confident and clear.

##### Authoritative Advisor 5

- 목소리 ID: `pt-br-advisor-5`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 48-year-old Lawyer from Brazil. Speaks Brazilian Portuguese. Currently on podcast. Sounds confident and clear.

##### Authoritative Advisor 7

- 목소리 ID: `pt-br-advisor-7`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: high
- 억양: Brazilian Portuguese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Lawyer from Brazil. Speaks Brazilian Portuguese. Currently at an appointment. Voice is warm and engaging.

##### Authoritative Advisor 8

- 목소리 ID: `pt-br-advisor-8`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Lawyer from Brazil. Speaks Brazilian Portuguese. Currently brainstorming in a meeting. Sounds confident and clear.

##### Call Center Agent 1

- 목소리 ID: `pt-br-csagent-1`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Customer Service Agent from Brazil. Speaks Brazilian Portuguese. Currently sitting on couch. Voice is warm and engaging.

##### Call Center Agent 11

- 목소리 ID: `pt-br-csagent-11`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: high
- 억양: Brazilian Portuguese
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Customer Service Agent from Brazil. Speaks Brazilian Portuguese. Voice is light, airy, and precise

##### Call Center Agent 12

- 목소리 ID: `pt-br-csagent-12`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: high
- 억양: Brazilian Portuguese
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 26-year-old Customer Service Agent from Brazil. Speaks Brazilian Portuguese. Currently in a bookstore. Voice is warm and engaging.

##### Call Center Agent 3

- 목소리 ID: `pt-br-csagent-3`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Customer Service Agent from Brazil. Speaks Brazilian Portuguese. Tone is objective, direct, and helpful

##### Call Center Agent 5

- 목소리 ID: `pt-br-csagent-5`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: high
- 억양: Brazilian Portuguese
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Customer Service Agent from Brazil. Speaks Brazilian Portuguese. Tone is objective, direct, and helpful

##### Call Center Agent 8

- 목소리 ID: `pt-br-csagent-8`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 45-year-old Social Worker from Brazil. Speaks Brazilian Portuguese. Voice is energetic, colorful, and fast

##### Commercial Voiceover 2

- 목소리 ID: `pt-br-commercial-2`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 29-year-old Influencer from Brazil. Speaks Brazilian Portuguese. Currently at an appointment. Sounds confident and clear.

##### Commercial Voiceover 3

- 목소리 ID: `pt-br-commercial-3`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: high
- 억양: Brazilian Portuguese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 23-year-old Influencer from Brazil. Speaks Brazilian Portuguese. Currently sitting on couch. Tone is professional yet approachable.

##### Commercial Voiceover 7

- 목소리 ID: `pt-br-commercial-7`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 25-year-old Influencer from Brazil. Speaks Brazilian Portuguese. Voice is relaxed.

##### Concierge 1

- 목소리 ID: `pt-br-concierge-1`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Executive Assistant from Brazil. Speaks Brazilian Portuguese. Currently brainstorming in a meeting. Sounds confident and clear.

##### Concierge 4

- 목소리 ID: `pt-br-concierge-4`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: high
- 억양: Brazilian Portuguese
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 29-year-old Executive Assistant from Brazil. Speaks Brazilian Portuguese. Voice is bright, breezy, and youthful.

##### Concierge 5

- 목소리 ID: `pt-br-concierge-5`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Executive Assistant from Brazil. Speaks Brazilian Portuguese. Currently on podcast. Voice is warm and engaging.

##### Concierge 6

- 목소리 ID: `pt-br-concierge-6`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: high
- 억양: Brazilian Portuguese
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 22-year-old Executive Assistant from Brazil. Speaks Brazilian Portuguese. Currently sitting on couch. Sounds confident and clear.

##### Concierge 8

- 목소리 ID: `pt-br-concierge-8`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: high
- 억양: Brazilian Portuguese
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Executive Assistant from Brazil. Speaks Brazilian Portuguese. Currently in an oscar winning film. Tone is professional yet approachable.

##### Digital Assistant 1

- 목소리 ID: `pt-br-assistant-1`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: Concierge & EA (Sibling) | Companion & Peer / Digital Assistant (Sibling)
- 용도: Enterprise Agent | Conversational / Edu
- 공식 설명: 38-year-old Sibling from Brazil. Speaks Brazilian Portuguese. Voice is relaxed.

##### Digital Assistant 10

- 목소리 ID: `pt-br-assistant-10`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 33-year-old Parent from Brazil. Speaks Brazilian Portuguese. Voice is highly approachable.

##### Digital Assistant 12

- 목소리 ID: `pt-br-assistant-12`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 44-year-old Parent from Brazil. Speaks Brazilian Portuguese. Tone is objective, direct, and helpful

##### Digital Assistant 4

- 목소리 ID: `pt-br-assistant-4`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Concierge & EA (Parent) | Companion & Peer / Digital Assistant (Parent)
- 용도: Enterprise Agent | Conversational / Edu
- 공식 설명: 40-year-old Parent from Brazil. Speaks Brazilian Portuguese. Voice is light, airy, and precise

##### Digital Assistant 5

- 목소리 ID: `pt-br-assistant-5`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 31-year-old Sibling from Brazil. Speaks Brazilian Portuguese. Voice is clear, medium-pitch, and friendly.

##### Digital Assistant 6

- 목소리 ID: `pt-br-assistant-6`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: high
- 억양: Brazilian Portuguese
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 38-year-old Parent from Brazil. Speaks Brazilian Portuguese. Currently in a bookstore. Voice is warm and engaging.

##### Podcaster 11

- 목소리 ID: `pt-br-podcaster-11`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: high
- 억양: Brazilian Portuguese
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 27-year-old Radio Host from Brazil. Speaks Brazilian Portuguese. Currently at an appointment. Tone is professional yet approachable.

##### Podcaster 12

- 목소리 ID: `pt-br-podcaster-12`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: high
- 억양: Brazilian Portuguese
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 35-year-old Radio Host from Brazil. Speaks Brazilian Portuguese. Voice is bright, breezy, and youthful.

##### Podcaster 2

- 목소리 ID: `pt-br-podcaster-2`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 29-year-old Radio Host from Brazil. Speaks Brazilian Portuguese. Currently in an indie film. Sounds confident and clear.

##### Podcaster 4

- 목소리 ID: `pt-br-podcaster-4`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: high
- 억양: Brazilian Portuguese
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 26-year-old Radio Host from Brazil. Speaks Brazilian Portuguese. Voice is engaging and empathic.

##### Podcaster 6

- 목소리 ID: `pt-br-podcaster-6`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: News & Podcast Host / Podcaster (Radio Host)
- 용도: Content & Media
- 공식 설명: 39-year-old Radio Host from Brazil. Speaks Brazilian Portuguese. Currently on the phone. Tone is professional yet approachable.

##### Podcaster 8

- 목소리 ID: `pt-br-podcaster-8`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 33-year-old Radio Host from Brazil. Speaks Brazilian Portuguese. Voice is relaxed.

##### Storyteller 1

- 목소리 ID: `pt-br-storyteller-1`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 50-year-old Nature Documentary Narrator from Brazil. Speaks Brazilian Portuguese. Currently on npr. Sounds confident and clear.

##### Storyteller 3

- 목소리 ID: `pt-br-storyteller-3`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: high
- 억양: Brazilian Portuguese
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 24-year-old Nature Documentary Narrator from Brazil. Speaks Brazilian Portuguese. Currently in an indie film. Sounds confident and clear.

##### Storyteller 7

- 목소리 ID: `pt-br-storyteller-7`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 60-year-old Nature Documentary Narrator from Brazil. Speaks Brazilian Portuguese. Voice is light, airy, and precise

##### Storyteller 9

- 목소리 ID: `pt-br-storyteller-9`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 50-year-old Nature Documentary Narrator from Brazil. Speaks Brazilian Portuguese. Currently on podcast. Voice is warm and engaging.

##### Tech Advisor 2

- 목소리 ID: `pt-br-techagent-2`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Tech Support Agent from Brazil. Speaks Brazilian Portuguese. Currently sitting on couch. Sounds confident and clear.

##### Tech Advisor 3

- 목소리 ID: `pt-br-techagent-3`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: high
- 억양: Brazilian Portuguese
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Tech Support Agent from Brazil. Speaks Brazilian Portuguese. Voice is relaxed.

##### Tech Advisor 6

- 목소리 ID: `pt-br-techagent-6`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Tech Support Agent from Brazil. Speaks Brazilian Portuguese. Voice is light, airy, and precise

##### Training Voiceover 11

- 목소리 ID: `pt-br-training-11`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 63-year-old Cooking Show Host from Brazil. Speaks Brazilian Portuguese. Voice is clear, medium-pitch, and friendly.

##### Training Voiceover 12

- 목소리 ID: `pt-br-training-12`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 33-year-old Instructional Video Host from Brazil. Speaks Brazilian Portuguese. Currently on podcast. Sounds confident and clear.

##### Training Voiceover 2

- 목소리 ID: `pt-br-training-2`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Cooking Show Host)
- 용도: Growth & Marketing
- 공식 설명: 23-year-old Cooking Show Host from Brazil. Speaks Brazilian Portuguese. Tone is objective, direct, and helpful

##### Training Voiceover 3

- 목소리 ID: `pt-br-training-3`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 51-year-old Cooking Show Host from Brazil. Speaks Brazilian Portuguese. Voice is cool, confident, and collaborative.

##### Training Voiceover 7

- 목소리 ID: `pt-br-training-7`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: high
- 억양: Brazilian Portuguese
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 23-year-old Instructional Video Host from Brazil. Speaks Brazilian Portuguese. Voice is fast-paced, articulate, energetic.

##### Training Voiceover 8

- 목소리 ID: `pt-br-training-8`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 59-year-old Instructional Video Host from Brazil. Speaks Brazilian Portuguese. Voice is engaging and empathic.

##### Tutor 1

- 목소리 ID: `pt-br-tutor-1`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: Tech Support Agent / Tech Advisor (Tutor) | Educational Tutor
- 용도: Enterprise Agent | Conversational / Edu
- 공식 설명: 38-year-old Tutor from Brazil. Speaks Brazilian Portuguese. Voice is relaxed.

##### Tutor 10

- 목소리 ID: `pt-br-tutor-10`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Coach & Motivational Guide (Mentor)
- 용도: Wellness & Culture
- 공식 설명: 29-year-old Mentor from Brazil. Speaks Brazilian Portuguese. Tone is conversational, slightly dry humor, and warm

##### Tutor 11

- 목소리 ID: `pt-br-tutor-11`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 34-year-old Chess Instructor from Brazil. Speaks Brazilian Portuguese. Tone is conversational, slightly dry humor, and warm

##### Tutor 12

- 목소리 ID: `pt-br-tutor-12`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: high
- 억양: Brazilian Portuguese
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 45-year-old Chess Instructor from Brazil. Speaks Brazilian Portuguese. Voice is clear, medium-pitch, and friendly.

##### Tutor 4

- 목소리 ID: `pt-br-tutor-4`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 36-year-old Professor from Brazil. Speaks Brazilian Portuguese. Tone is reflective, calm, and reassuring

##### Tutor 5

- 목소리 ID: `pt-br-tutor-5`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: female
- 음높이: high
- 억양: Brazilian Portuguese
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 62-year-old Professor from Brazil. Speaks Brazilian Portuguese. Currently in a bookstore. Voice is warm and engaging.

#### 남성 — 56개

##### Authoritative Advisor 10

- 목소리 ID: `pt-br-advisor-10`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Lawyer from Brazil. Speaks Brazilian Portuguese. Voice is comforting someone who is stressed.

##### Authoritative Advisor 11

- 목소리 ID: `pt-br-advisor-11`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Financial Advisor from Brazil. Speaks Brazilian Portuguese. Voice is laid-back, encouraging, and chill.

##### Authoritative Advisor 2

- 목소리 ID: `pt-br-advisor-2`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: High-Trust Advisor / Authoritative Advisor (Financial Advisor)
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Financial Advisor from Brazil. Speaks Brazilian Portuguese. Voice is relaxed.

##### Authoritative Advisor 4

- 목소리 ID: `pt-br-advisor-4`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Lawyer from Brazil. Speaks Brazilian Portuguese. Tone is peer-to-peer and curious

##### Authoritative Advisor 6

- 목소리 ID: `pt-br-advisor-6`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 48-year-old Lawyer from Brazil. Speaks Brazilian Portuguese. Voice is crisp and eager.

##### Authoritative Advisor 9

- 목소리 ID: `pt-br-advisor-9`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 45-year-old Lawyer from Brazil. Speaks Brazilian Portuguese. Tone is objective, direct, and helpful

##### Call Center Agent 10

- 목소리 ID: `pt-br-csagent-10`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Customer Support Agent / Call Center Agent (Sales Associate)
- 용도: Enterprise Agent
- 공식 설명: 53-year-old Sales Associate from Brazil. Speaks Brazilian Portuguese. Voice is bright, breezy, and youthful.

##### Call Center Agent 2

- 목소리 ID: `pt-br-csagent-2`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 22-year-old Customer Service Agent from Brazil. Speaks Brazilian Portuguese. Currently at a meditation retreat. Sounds confident and clear.

##### Call Center Agent 4

- 목소리 ID: `pt-br-csagent-4`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Social Worker)
- 용도: Growth & Marketing
- 공식 설명: 55-year-old Social Worker from Brazil. Speaks Brazilian Portuguese. Currently on npr. Sounds confident and clear.

##### Call Center Agent 6

- 목소리 ID: `pt-br-csagent-6`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Customer Service Agent from Brazil. Speaks Brazilian Portuguese. Currently in an oscar winning film. Sounds confident and clear.

##### Call Center Agent 7

- 목소리 ID: `pt-br-csagent-7`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Customer Service Agent from Brazil. Speaks Brazilian Portuguese. Voice is bright, breezy, and youthful.

##### Call Center Agent 9

- 목소리 ID: `pt-br-csagent-9`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: Customer Support Agent / Call Center Agent (Customer Service Agent)
- 용도: Enterprise Agent
- 공식 설명: 57-year-old Customer Service Agent from Brazil. Speaks Brazilian Portuguese. Voice is laid-back, encouraging, and chill.

##### Commercial Voiceover 1

- 목소리 ID: `pt-br-commercial-1`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 25-year-old Influencer from Brazil. Speaks Brazilian Portuguese. Currently sitting on couch. Tone is professional yet approachable.

##### Commercial Voiceover 4

- 목소리 ID: `pt-br-commercial-4`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 28-year-old Influencer from Brazil. Speaks Brazilian Portuguese. Voice is highly approachable.

##### Commercial Voiceover 5

- 목소리 ID: `pt-br-commercial-5`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 27-year-old Influencer from Brazil. Speaks Brazilian Portuguese. Currently on npr. Voice is warm and engaging.

##### Commercial Voiceover 6

- 목소리 ID: `pt-br-commercial-6`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Influencer)
- 용도: Growth & Marketing
- 공식 설명: 27-year-old Influencer from Brazil. Speaks Brazilian Portuguese. Currently on npr. Voice is warm and engaging.

##### Concierge 10

- 목소리 ID: `pt-br-concierge-10`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 64-year-old Hotel Concierge from Brazil. Speaks Brazilian Portuguese. Voice is relaxed.

##### Concierge 2

- 목소리 ID: `pt-br-concierge-2`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Executive Assistant from Brazil. Speaks Brazilian Portuguese. Currently sitting on couch. Sounds confident and clear.

##### Concierge 3

- 목소리 ID: `pt-br-concierge-3`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 62-year-old Hotel Concierge from Brazil. Speaks Brazilian Portuguese. Voice is resonant and witty.

##### Concierge 7

- 목소리 ID: `pt-br-concierge-7`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 59-year-old Hotel Concierge from Brazil. Speaks Brazilian Portuguese. Tone is objective, direct, and helpful

##### Concierge 9

- 목소리 ID: `pt-br-concierge-9`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Concierge & EA (Hotel Concierge)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Hotel Concierge from Brazil. Speaks Brazilian Portuguese. Voice is clear, medium-pitch, and friendly.

##### Digital Assistant 11

- 목소리 ID: `pt-br-assistant-11`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 33-year-old Sibling from Brazil. Speaks Brazilian Portuguese. Voice is deep, velvety, and unhurried.

##### Digital Assistant 2

- 목소리 ID: `pt-br-assistant-2`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 52-year-old Sibling from Brazil. Speaks Brazilian Portuguese. Voice is engaging and empathic.

##### Digital Assistant 3

- 목소리 ID: `pt-br-assistant-3`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 46-year-old Parent from Brazil. Speaks Brazilian Portuguese. Currently at a meditation retreat. Sounds confident and clear.

##### Digital Assistant 7

- 목소리 ID: `pt-br-assistant-7`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 57-year-old Sibling from Brazil. Speaks Brazilian Portuguese. Currently sitting next to you on an airplane. Tone is professional yet approachable.

##### Digital Assistant 8

- 목소리 ID: `pt-br-assistant-8`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 61-year-old Sibling from Brazil. Speaks Brazilian Portuguese. Currently in an oscar winning film. Sounds confident and clear.

##### Digital Assistant 9

- 목소리 ID: `pt-br-assistant-9`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 46-year-old Sibling from Brazil. Speaks Brazilian Portuguese. Currently on npr. Voice is warm and engaging.

##### Podcaster 1

- 목소리 ID: `pt-br-podcaster-1`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Tech Support Agent / Tech Advisor (Podcast Interviewer) | News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Enterprise Agent | Content & Media
- 공식 설명: 48-year-old Podcast Interviewer from Brazil. Speaks Brazilian Portuguese. Tone is conversational, slightly dry humor, and warm

##### Podcaster 10

- 목소리 ID: `pt-br-podcaster-10`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 42-year-old Radio Host from Brazil. Speaks Brazilian Portuguese. Tone is objective, direct, and helpful

##### Podcaster 3

- 목소리 ID: `pt-br-podcaster-3`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 56-year-old Podcast Interviewer from Brazil. Speaks Brazilian Portuguese. Voice is textured, resonant, and soothing.

##### Podcaster 5

- 목소리 ID: `pt-br-podcaster-5`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Companion & Peer / Digital Assistant (Podcast Interviewer)
- 용도: Conversational / Edu
- 공식 설명: 56-year-old Podcast Interviewer from Brazil. Speaks Brazilian Portuguese. Voice is textured, resonant, and soothing.

##### Podcaster 7

- 목소리 ID: `pt-br-podcaster-7`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: News & Podcast Host / Podcaster (Podcast Interviewer)
- 용도: Content & Media
- 공식 설명: 45-year-old Podcast Interviewer from Brazil. Speaks Brazilian Portuguese. Voice is cool, confident, and collaborative.

##### Podcaster 9

- 목소리 ID: `pt-br-podcaster-9`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Companion & Peer / Digital Assistant (Radio Host)
- 용도: Conversational / Edu
- 공식 설명: 53-year-old Radio Host from Brazil. Speaks Brazilian Portuguese. Voice is textured, resonant, and soothing.

##### Storyteller 10

- 목소리 ID: `pt-br-storyteller-10`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 56-year-old Nature Documentary Narrator from Brazil. Speaks Brazilian Portuguese. Voice is engaging and empathic.

##### Storyteller 11

- 목소리 ID: `pt-br-storyteller-11`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 34-year-old Nature Documentary Narrator from Brazil. Speaks Brazilian Portuguese. Currently on podcast. Sounds confident and clear.

##### Storyteller 2

- 목소리 ID: `pt-br-storyteller-2`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: News & Podcast Host / Podcaster (Comedian) | Character & Theatrical (Comedian)
- 용도: Content & Media | Entertainment & Gaming
- 공식 설명: 49-year-old Comedian from Brazil. Speaks Brazilian Portuguese. Voice is engaging and empathic.

##### Storyteller 4

- 목소리 ID: `pt-br-storyteller-4`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Comedian) | Character & Theatrical (Comedian)
- 용도: Growth & Marketing | Entertainment & Gaming
- 공식 설명: 47-year-old Comedian from Brazil. Speaks Brazilian Portuguese. Currently brainstorming in a meeting. Tone is professional yet approachable.

##### Storyteller 5

- 목소리 ID: `pt-br-storyteller-5`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 42-year-old Nature Documentary Narrator from Brazil. Speaks Brazilian Portuguese. Currently in an indie film. Tone is professional yet approachable.

##### Storyteller 6

- 목소리 ID: `pt-br-storyteller-6`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 27-year-old Nature Documentary Narrator from Brazil. Speaks Brazilian Portuguese. Voice is laid-back, encouraging, and chill.

##### Storyteller 8

- 목소리 ID: `pt-br-storyteller-8`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Storyteller & Narrator (Nature Documentary Narrator)
- 용도: Content & Media
- 공식 설명: 44-year-old Nature Documentary Narrator from Brazil. Speaks Brazilian Portuguese. Currently sitting on couch. Tone is professional yet approachable.

##### Tech Advisor 1

- 목소리 ID: `pt-br-techagent-1`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 57-year-old Tech Support Agent from Brazil. Speaks Brazilian Portuguese. Voice is cool, confident, and collaborative.

##### Tech Advisor 4

- 목소리 ID: `pt-br-techagent-4`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 22-year-old Tech Support Agent from Brazil. Speaks Brazilian Portuguese. Voice is fast-paced, articulate, energetic.

##### Tech Advisor 5

- 목소리 ID: `pt-br-techagent-5`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 59-year-old Tech Support Agent from Brazil. Speaks Brazilian Portuguese. Tone is objective, direct, and helpful

##### Tech Advisor 7

- 목소리 ID: `pt-br-techagent-7`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 63-year-old Tech Support Agent from Brazil. Speaks Brazilian Portuguese. Currently brainstorming in a meeting. Sounds confident and clear.

##### Training Voiceover 1

- 목소리 ID: `pt-br-training-1`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Tech Support Agent / Tech Advisor (Instructional Video Host) | Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Enterprise Agent | Content & Media
- 공식 설명: 46-year-old Instructional Video Host from Brazil. Speaks Brazilian Portuguese. Currently on npr. Sounds confident and clear.

##### Training Voiceover 10

- 목소리 ID: `pt-br-training-10`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 24-year-old Instructional Video Host from Brazil. Speaks Brazilian Portuguese. Voice is comforting someone who is stressed.

##### Training Voiceover 4

- 목소리 ID: `pt-br-training-4`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 58-year-old Instructional Video Host from Brazil. Speaks Brazilian Portuguese. Voice is light, airy, and precise

##### Training Voiceover 5

- 목소리 ID: `pt-br-training-5`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 27-year-old Instructional Video Host from Brazil. Speaks Brazilian Portuguese. Tone is objective, direct, and helpful

##### Training Voiceover 6

- 목소리 ID: `pt-br-training-6`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 22-year-old Instructional Video Host from Brazil. Speaks Brazilian Portuguese. Currently sitting next to you on an airplane. Sounds confident and clear.

##### Training Voiceover 9

- 목소리 ID: `pt-br-training-9`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 37-year-old Instructional Video Host from Brazil. Speaks Brazilian Portuguese. Voice is cool, confident, and collaborative.

##### Tutor 2

- 목소리 ID: `pt-br-tutor-2`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Tech Support Agent / Tech Advisor (Tutor) | Educational Tutor
- 용도: Enterprise Agent | Conversational / Edu
- 공식 설명: 25-year-old Tutor from Brazil. Speaks Brazilian Portuguese. Currently sitting next to you on the bus. Sounds confident and clear.

##### Tutor 3

- 목소리 ID: `pt-br-tutor-3`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 34-year-old Professor from Brazil. Speaks Brazilian Portuguese. Voice is comforting someone who is stressed.

##### Tutor 6

- 목소리 ID: `pt-br-tutor-6`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Educational Tutor (Writing Tutor)
- 용도: Conversational / Edu
- 공식 설명: 34-year-old Writing Tutor from Brazil. Speaks Brazilian Portuguese. Currently brainstorming in a meeting. Voice is warm and engaging.

##### Tutor 7

- 목소리 ID: `pt-br-tutor-7`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: medium
- 억양: Brazilian Portuguese
- 역할: Educational Tutor (Teacher)
- 용도: Conversational / Edu
- 공식 설명: 37-year-old Teacher from Brazil. Speaks Brazilian Portuguese. Currently on podcast. Tone is professional yet approachable.

##### Tutor 8

- 목소리 ID: `pt-br-tutor-8`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Coach & Motivational Guide (Fitness Trainer)
- 용도: Wellness & Culture
- 공식 설명: 65-year-old Fitness Trainer from Brazil. Speaks Brazilian Portuguese. Currently on podcast. Sounds confident and clear.

##### Tutor 9

- 목소리 ID: `pt-br-tutor-9`
- 유형: prebuilt
- 언어: pt-BR
- 지역: BR
- 성별: male
- 음높이: low
- 억양: Brazilian Portuguese
- 역할: Educational Tutor
- 용도: Conversational / Edu
- 공식 설명: 55-year-old Tutor from Brazil. Speaks Brazilian Portuguese. Currently on the phone. Sounds confident and clear.

### 포르투갈어·포르투갈 (pt-PT) — 56개

#### 여성 — 33개

##### Authoritative Advisor 2

- 목소리 ID: `pt-pt-advisor-2`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: medium
- 억양: Peninsular Portuguese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Lawyer)
- 용도: Growth & Marketing
- 공식 설명: 36-year-old Lawyer from Portugal. Speaks European Portuguese. Voice is light, airy, and precise

##### Authoritative Advisor 3

- 목소리 ID: `pt-pt-advisor-3`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: medium
- 억양: Peninsular Portuguese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Lawyer from Portugal. Speaks European Portuguese. Currently sitting next to you on an airplane. Sounds confident and clear.

##### Authoritative Advisor 4

- 목소리 ID: `pt-pt-advisor-4`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Lawyer)
- 용도: Growth & Marketing
- 공식 설명: 33-year-old Lawyer from Portugal. Speaks European Portuguese. Tone is objective, direct, and helpful

##### Authoritative Advisor 7

- 목소리 ID: `pt-pt-advisor-7`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: high
- 억양: Peninsular Portuguese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 45-year-old Lawyer from Portugal. Speaks European Portuguese. Voice is fast-paced, articulate, energetic.

##### Call Center Agent 1

- 목소리 ID: `pt-pt-csagent-1`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: medium
- 억양: Peninsular Portuguese
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Social Worker from Portugal. Speaks European Portuguese. Voice is resonant and witty.

##### Call Center Agent 2

- 목소리 ID: `pt-pt-csagent-2`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 65-year-old Social Worker from Portugal. Speaks European Portuguese. Voice is highly approachable.

##### Concierge 1

- 목소리 ID: `pt-pt-concierge-1`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 23-year-old Executive Assistant from Portugal. Speaks European Portuguese. Tone is reflective, calm, and reassuring

##### Concierge 2

- 목소리 ID: `pt-pt-concierge-2`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: medium
- 억양: Peninsular Portuguese
- 역할: Concierge & EA (Event Planner)
- 용도: Enterprise Agent
- 공식 설명: 59-year-old Event Planner from Portugal. Speaks European Portuguese. Voice is bright, breezy, and youthful.

##### Concierge 3

- 목소리 ID: `pt-pt-concierge-3`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: medium
- 억양: Peninsular Portuguese
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 26-year-old Executive Assistant from Portugal. Speaks European Portuguese. Currently sitting next to you on an airplane. Sounds confident and clear.

##### Digital Assistant 1

- 목소리 ID: `pt-pt-assistant-1`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: high
- 억양: Peninsular Portuguese
- 역할: Customer Support Agent / Call Center Agent (Sibling)
- 용도: Enterprise Agent
- 공식 설명: 23-year-old Sibling from Portugal. Speaks European Portuguese. Currently sitting on couch. Voice is warm and engaging.

##### Digital Assistant 6

- 목소리 ID: `pt-pt-assistant-6`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: medium
- 억양: Peninsular Portuguese
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 40-year-old Parent from Portugal. Speaks European Portuguese. Voice is highly approachable.

##### Digital Assistant 7

- 목소리 ID: `pt-pt-assistant-7`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 39-year-old Parent from Portugal. Speaks European Portuguese. Currently on npr. Sounds confident and clear.

##### Digital Assistant 8

- 목소리 ID: `pt-pt-assistant-8`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Storyteller & Narrator (Aunt/Uncle)
- 용도: Content & Media
- 공식 설명: 23-year-old Aunt/Uncle from Portugal. Speaks European Portuguese. Voice is cool, confident, and collaborative.

##### Podcaster 1

- 목소리 ID: `pt-pt-podcaster-1`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: medium
- 억양: Peninsular Portuguese
- 역할: News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 32-year-old Trivia Host from Portugal. Speaks European Portuguese. Voice is resonant and witty.

##### Podcaster 3

- 목소리 ID: `pt-pt-podcaster-3`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: high
- 억양: Peninsular Portuguese
- 역할: News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 44-year-old Trivia Host from Portugal. Speaks European Portuguese. Tone is objective, direct, and helpful

##### Storyteller 1

- 목소리 ID: `pt-pt-storyteller-1`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: medium
- 억양: Peninsular Portuguese
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 43-year-old Storyteller from Portugal. Speaks European Portuguese. Voice is natural and clear.

##### Storyteller 3

- 목소리 ID: `pt-pt-storyteller-3`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: high
- 억양: Peninsular Portuguese
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 53-year-old Storyteller from Portugal. Speaks European Portuguese. Voice is crisp and eager.

##### Storyteller 5

- 목소리 ID: `pt-pt-storyteller-5`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 25-year-old Storyteller from Portugal. Speaks European Portuguese. Voice is intimate talkshow.

##### Storyteller 8

- 목소리 ID: `pt-pt-storyteller-8`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: medium
- 억양: Peninsular Portuguese
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 28-year-old Storyteller from Portugal. Speaks European Portuguese. Currently in an oscar winning film. Voice is warm and engaging.

##### Tech Advisor 1

- 목소리 ID: `pt-pt-techagent-1`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Tech Support Agent from Portugal. Speaks European Portuguese. Voice is deep, velvety, and unhurried.

##### Tech Advisor 3

- 목소리 ID: `pt-pt-techagent-3`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: medium
- 억양: Peninsular Portuguese
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Tech Support Agent from Portugal. Speaks European Portuguese. Voice is light, airy, and precise

##### Tech Advisor 5

- 목소리 ID: `pt-pt-techagent-5`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Tech Support Agent from Portugal. Speaks European Portuguese. Voice is comforting someone who is stressed.

##### Tech Advisor 6

- 목소리 ID: `pt-pt-techagent-6`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: medium
- 억양: Peninsular Portuguese
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Architect from Portugal. Speaks European Portuguese. Voice is clear, medium-pitch, and friendly.

##### Tech Advisor 7

- 목소리 ID: `pt-pt-techagent-7`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Architect from Portugal. Speaks European Portuguese. Currently in an indie film. Sounds confident and clear.

##### Tech Advisor 8

- 목소리 ID: `pt-pt-techagent-8`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: medium
- 억양: Peninsular Portuguese
- 역할: Tech Support Agent / Tech Advisor (Architect)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Architect from Portugal. Speaks European Portuguese. Tone is objective, direct, and helpful

##### Training Voiceover 1

- 목소리 ID: `pt-pt-training-1`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: medium
- 억양: Peninsular Portuguese
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 30-year-old Cooking Show Host from Portugal. Speaks European Portuguese. Currently in an indie film. Voice is warm and engaging.

##### Training Voiceover 3

- 목소리 ID: `pt-pt-training-3`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: medium
- 억양: Peninsular Portuguese
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 30-year-old Cooking Show Host from Portugal. Speaks European Portuguese. Currently in an indie film. Voice is warm and engaging.

##### Training Voiceover 5

- 목소리 ID: `pt-pt-training-5`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 55-year-old Cooking Show Host from Portugal. Speaks European Portuguese. Currently on npr. Sounds confident and clear.

##### Training Voiceover 7

- 목소리 ID: `pt-pt-training-7`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: high
- 억양: Peninsular Portuguese
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 56-year-old Instructional Video Host from Portugal. Speaks European Portuguese. Currently on the phone. Tone is professional yet approachable.

##### Tutor 1

- 목소리 ID: `pt-pt-tutor-1`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: medium
- 억양: Peninsular Portuguese
- 역할: Customer Support Agent / Call Center Agent (Nutritionist)
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Nutritionist from Portugal. Speaks European Portuguese. Currently at a meditation retreat. Voice is warm and engaging.

##### Tutor 3

- 목소리 ID: `pt-pt-tutor-3`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: high
- 억양: Peninsular Portuguese
- 역할: Educational Tutor (Teacher)
- 용도: Conversational / Edu
- 공식 설명: 31-year-old Teacher from Portugal. Speaks European Portuguese. Currently in a bookstore. Voice is warm and engaging.

##### Tutor 4

- 목소리 ID: `pt-pt-tutor-4`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Concierge & EA (Nutritionist)
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Nutritionist from Portugal. Speaks European Portuguese. Currently at a meditation retreat. Voice is warm and engaging.

##### Tutor 5

- 목소리 ID: `pt-pt-tutor-5`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: female
- 음높이: high
- 억양: Peninsular Portuguese
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 47-year-old Professor from Portugal. Speaks European Portuguese. Voice is cool, confident, and collaborative.

#### 남성 — 23개

##### Authoritative Advisor 1

- 목소리 ID: `pt-pt-advisor-1`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 49-year-old Lawyer from Portugal. Speaks European Portuguese. Currently brainstorming in a meeting. Tone is professional yet approachable.

##### Authoritative Advisor 5

- 목소리 ID: `pt-pt-advisor-5`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 50-year-old Lawyer from Portugal. Speaks European Portuguese. Tone is conversational, slightly dry humor, and warm

##### Authoritative Advisor 6

- 목소리 ID: `pt-pt-advisor-6`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Lawyer from Portugal. Speaks European Portuguese. Voice is natural and clear.

##### Authoritative Advisor 8

- 목소리 ID: `pt-pt-advisor-8`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: News & Podcast Host / Podcaster (Lawyer)
- 용도: Content & Media
- 공식 설명: 45-year-old Lawyer from Portugal. Speaks European Portuguese. Voice is textured, resonant, and soothing.

##### Digital Assistant 2

- 목소리 ID: `pt-pt-assistant-2`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 32-year-old Parent from Portugal. Speaks European Portuguese. Tone is objective, direct, and helpful

##### Digital Assistant 3

- 목소리 ID: `pt-pt-assistant-3`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 33-year-old Parent from Portugal. Speaks European Portuguese. Currently in a bookstore. Tone is professional yet approachable.

##### Digital Assistant 4

- 목소리 ID: `pt-pt-assistant-4`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 47-year-old Parent from Portugal. Speaks European Portuguese. Voice is highly approachable.

##### Digital Assistant 5

- 목소리 ID: `pt-pt-assistant-5`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 48-year-old Sibling from Portugal. Speaks European Portuguese. Voice is highly approachable.

##### Podcaster 2

- 목소리 ID: `pt-pt-podcaster-2`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: News & Podcast Host / Podcaster (Trivia Host)
- 용도: Content & Media
- 공식 설명: 43-year-old Trivia Host from Portugal. Speaks European Portuguese. Currently on npr. Voice is warm and engaging.

##### Storyteller 2

- 목소리 ID: `pt-pt-storyteller-2`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Storyteller & Narrator (Philosopher)
- 용도: Content & Media
- 공식 설명: 46-year-old Philosopher from Portugal. Speaks European Portuguese. Currently in an oscar winning film. Sounds confident and clear.

##### Storyteller 4

- 목소리 ID: `pt-pt-storyteller-4`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 57-year-old Storyteller from Portugal. Speaks European Portuguese. Voice is natural and clear.

##### Storyteller 6

- 목소리 ID: `pt-pt-storyteller-6`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 51-year-old Storyteller from Portugal. Speaks European Portuguese. Voice is deep, velvety, and unhurried.

##### Storyteller 7

- 목소리 ID: `pt-pt-storyteller-7`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: medium
- 억양: Peninsular Portuguese
- 역할: Storyteller & Narrator
- 용도: Content & Media
- 공식 설명: 55-year-old Storyteller from Portugal. Speaks European Portuguese. Voice is laid-back, encouraging, and chill.

##### Tech Advisor 2

- 목소리 ID: `pt-pt-techagent-2`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 56-year-old Tech Support Agent from Portugal. Speaks European Portuguese. Currently sitting next to you on an airplane. Tone is professional yet approachable.

##### Tech Advisor 4

- 목소리 ID: `pt-pt-techagent-4`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Tech Support Agent from Portugal. Speaks European Portuguese. Voice is comforting someone who is stressed.

##### Training Voiceover 2

- 목소리 ID: `pt-pt-training-2`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 40-year-old Cooking Show Host from Portugal. Speaks European Portuguese. Currently at a meditation retreat. Sounds confident and clear.

##### Training Voiceover 4

- 목소리 ID: `pt-pt-training-4`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 30-year-old Cooking Show Host from Portugal. Speaks European Portuguese. Voice is engaging and empathic.

##### Training Voiceover 6

- 목소리 ID: `pt-pt-training-6`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 35-year-old Cooking Show Host from Portugal. Speaks European Portuguese. Currently on npr. Voice is warm and engaging.

##### Training Voiceover 8

- 목소리 ID: `pt-pt-training-8`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 32-year-old Instructional Video Host from Portugal. Speaks European Portuguese. Voice is natural and clear.

##### Tutor 2

- 목소리 ID: `pt-pt-tutor-2`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Customer Support Agent / Call Center Agent (Nutritionist)
- 용도: Enterprise Agent
- 공식 설명: 59-year-old Nutritionist from Portugal. Speaks European Portuguese. Voice is comforting someone who is stressed.

##### Tutor 6

- 목소리 ID: `pt-pt-tutor-6`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Concierge & EA (Nutritionist)
- 용도: Enterprise Agent
- 공식 설명: 52-year-old Nutritionist from Portugal. Speaks European Portuguese. Voice is laid-back, encouraging, and chill.

##### Tutor 7

- 목소리 ID: `pt-pt-tutor-7`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Educational Tutor (Chess Instructor)
- 용도: Conversational / Edu
- 공식 설명: 44-year-old Chess Instructor from Portugal. Speaks European Portuguese. Currently at an appointment. Tone is professional yet approachable.

##### Tutor 8

- 목소리 ID: `pt-pt-tutor-8`
- 유형: prebuilt
- 언어: pt-PT
- 지역: PT
- 성별: male
- 음높이: low
- 억양: Peninsular Portuguese
- 역할: Coach & Motivational Guide (Fitness Trainer)
- 용도: Wellness & Culture
- 공식 설명: 24-year-old Fitness Trainer from Portugal. Speaks European Portuguese. Currently at an appointment. Voice is warm and engaging.

### 스와힐리어·케냐 (sw-KE) — 44개

#### 여성 — 19개

##### Authoritative Advisor 1

- 목소리 ID: `sw-ke-advisor-1`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: female
- 음높이: low
- 억양: Swahili
- 역할: Concierge & EA (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Lawyer from Kenya. Speaks Swahili. Voice is textured, resonant, and soothing.

##### Authoritative Advisor 4

- 목소리 ID: `sw-ke-advisor-4`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: female
- 음높이: high
- 억양: Swahili
- 역할: News & Podcast Host / Podcaster (Lawyer)
- 용도: Content & Media
- 공식 설명: 34-year-old Lawyer from Kenya. Speaks Swahili. Tone is enthusiastic, engaging, and fun

##### Authoritative Advisor 6

- 목소리 ID: `sw-ke-advisor-6`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: female
- 음높이: medium
- 억양: Swahili
- 역할: Character & Theatrical (Lawyer)
- 용도: Entertainment & Gaming
- 공식 설명: 43-year-old Lawyer from Kenya. Speaks Swahili. Voice is energetic, colorful, and fast

##### Authoritative Advisor 7

- 목소리 ID: `sw-ke-advisor-7`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: female
- 음높이: high
- 억양: Swahili
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Lawyer from Kenya. Speaks Swahili. Currently sitting on couch. Voice is warm and engaging.

##### Call Center Agent 1

- 목소리 ID: `sw-ke-csagent-1`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: female
- 음높이: low
- 억양: Swahili
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 58-year-old Social Worker from Kenya. Speaks Swahili. Currently at an appointment. Voice is warm and engaging.

##### Call Center Agent 4

- 목소리 ID: `sw-ke-csagent-4`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: female
- 음높이: medium
- 억양: Swahili
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Social Worker from Kenya. Speaks Swahili. Voice is comforting someone who is stressed.

##### Call Center Agent 5

- 목소리 ID: `sw-ke-csagent-5`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: female
- 음높이: high
- 억양: Swahili
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 52-year-old Social Worker from Kenya. Speaks Swahili. Tone is enthusiastic, engaging, and fun

##### Call Center Agent 6

- 목소리 ID: `sw-ke-csagent-6`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: female
- 음높이: low
- 억양: Swahili
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 55-year-old Social Worker from Kenya. Speaks Swahili. Currently in an oscar winning film. Sounds confident and clear.

##### Digital Assistant 1

- 목소리 ID: `sw-ke-assistant-1`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: female
- 음높이: medium
- 억양: Swahili
- 역할: Tech Support Agent / Tech Advisor (Friend)
- 용도: Enterprise Agent
- 공식 설명: 28-year-old Friend from Kenya. Speaks Swahili. Tone is enthusiastic, engaging, and fun

##### Digital Assistant 3

- 목소리 ID: `sw-ke-assistant-3`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: female
- 음높이: low
- 억양: Swahili
- 역할: Tech Support Agent / Tech Advisor (Friend)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Friend from Kenya. Speaks Swahili. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Digital Assistant 5

- 목소리 ID: `sw-ke-assistant-5`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: female
- 음높이: medium
- 억양: Swahili
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 55-year-old Friend from Kenya. Speaks Swahili. Voice is laid-back, encouraging, and chill.

##### Digital Assistant 7

- 목소리 ID: `sw-ke-assistant-7`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: female
- 음높이: high
- 억양: Swahili
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 47-year-old Friend from Kenya. Speaks Swahili. Tone is objective, direct, and helpful

##### Training Voiceover 1

- 목소리 ID: `sw-ke-training-1`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: female
- 음높이: medium
- 억양: Swahili
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 26-year-old Cooking Show Host from Kenya. Speaks Swahili. Currently in a bookstore. Tone is professional yet approachable.

##### Training Voiceover 3

- 목소리 ID: `sw-ke-training-3`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: female
- 음높이: high
- 억양: Swahili
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 58-year-old Cooking Show Host from Kenya. Speaks Swahili. Voice is light, airy, and precise

##### Training Voiceover 4

- 목소리 ID: `sw-ke-training-4`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: female
- 음높이: low
- 억양: Swahili
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 29-year-old Cooking Show Host from Kenya. Speaks Swahili. Voice is energetic, colorful, and fast

##### Training Voiceover 6

- 목소리 ID: `sw-ke-training-6`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: female
- 음높이: high
- 억양: Swahili
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 29-year-old Cooking Show Host from Kenya. Speaks Swahili. Currently on the phone. Tone is professional yet approachable.

##### Tutor 1

- 목소리 ID: `sw-ke-tutor-1`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: female
- 음높이: medium
- 억양: Swahili
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 36-year-old Professor from Kenya. Speaks Swahili. Currently sitting next to you on an airplane. Voice is warm and engaging.

##### Tutor 4

- 목소리 ID: `sw-ke-tutor-4`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: female
- 음높이: medium
- 억양: Swahili
- 역할: Storyteller & Narrator (Therapist)
- 용도: Content & Media
- 공식 설명: 29-year-old Therapist from Kenya. Speaks Swahili. Voice is highly approachable.

##### Tutor 5

- 목소리 ID: `sw-ke-tutor-5`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: female
- 음높이: low
- 억양: Swahili
- 역할: Storyteller & Narrator (Therapist)
- 용도: Content & Media
- 공식 설명: 38-year-old Therapist from Kenya. Speaks Swahili. Voice is crisp and eager.

#### 남성 — 23개

##### Authoritative Advisor 2

- 목소리 ID: `sw-ke-advisor-2`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: low
- 억양: Swahili
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Lawyer from Kenya. Speaks Swahili. Voice is intimate talkshow.

##### Authoritative Advisor 3

- 목소리 ID: `sw-ke-advisor-3`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: low
- 억양: Swahili
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Lawyer from Kenya. Speaks Swahili. Currently at a meditation retreat. Sounds confident and clear.

##### Authoritative Advisor 5

- 목소리 ID: `sw-ke-advisor-5`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: low
- 억양: Swahili
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Lawyer from Kenya. Speaks Swahili. Voice is engaging and empathic.

##### Authoritative Advisor 8

- 목소리 ID: `sw-ke-advisor-8`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: low
- 억양: Swahili
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Lawyer from Kenya. Speaks Swahili. Currently sitting next to you on an airplane. Tone is professional yet approachable.

##### Call Center Agent 2

- 목소리 ID: `sw-ke-csagent-2`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: low
- 억양: Swahili
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 64-year-old Social Worker from Kenya. Speaks Swahili. Voice is natural and clear.

##### Call Center Agent 3

- 목소리 ID: `sw-ke-csagent-3`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: low
- 억양: Swahili
- 역할: Tech Support Agent / Tech Advisor (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 56-year-old Social Worker from Kenya. Speaks Swahili. Currently on podcast. Voice is warm and engaging.

##### Call Center Agent 7

- 목소리 ID: `sw-ke-csagent-7`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: medium
- 억양: Swahili
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 51-year-old Social Worker from Kenya. Speaks Swahili. Voice is energetic, colorful, and fast

##### Call Center Agent 8

- 목소리 ID: `sw-ke-csagent-8`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: high
- 억양: Swahili
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Social Worker from Kenya. Speaks Swahili. Voice is textured, resonant, and soothing.

##### Concierge 1

- 목소리 ID: `sw-ke-concierge-1`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: low
- 억양: Swahili
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Executive Assistant from Kenya. Speaks Swahili. Currently sitting on couch. Voice is warm and engaging.

##### Concierge 2

- 목소리 ID: `sw-ke-concierge-2`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: low
- 억양: Swahili
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 56-year-old Executive Assistant from Kenya. Speaks Swahili. Currently at an appointment. Sounds confident and clear.

##### Concierge 3

- 목소리 ID: `sw-ke-concierge-3`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: low
- 억양: Swahili
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 46-year-old Executive Assistant from Kenya. Speaks Swahili. Voice is engaging and empathic.

##### Concierge 4

- 목소리 ID: `sw-ke-concierge-4`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: low
- 억양: Swahili
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Executive Assistant from Kenya. Speaks Swahili. Voice is fast-paced, articulate, energetic.

##### Digital Assistant 2

- 목소리 ID: `sw-ke-assistant-2`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: low
- 억양: Swahili
- 역할: Tech Support Agent / Tech Advisor (Friend)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Friend from Kenya. Speaks Swahili. Voice is natural and clear.

##### Digital Assistant 4

- 목소리 ID: `sw-ke-assistant-4`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: low
- 억양: Swahili
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 46-year-old Friend from Kenya. Speaks Swahili. Voice is engaging and empathic.

##### Digital Assistant 6

- 목소리 ID: `sw-ke-assistant-6`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: low
- 억양: Swahili
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 49-year-old Sibling from Kenya. Speaks Swahili. Currently in an oscar winning film. Tone is professional yet approachable.

##### Digital Assistant 8

- 목소리 ID: `sw-ke-assistant-8`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: low
- 억양: Swahili
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 41-year-old Sibling from Kenya. Speaks Swahili. Currently brainstorming in a meeting. Voice is warm and engaging.

##### Training Voiceover 2

- 목소리 ID: `sw-ke-training-2`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: low
- 억양: Swahili
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 58-year-old Cooking Show Host from Kenya. Speaks Swahili. Currently sitting next to you on an airplane. Sounds confident and clear.

##### Training Voiceover 5

- 목소리 ID: `sw-ke-training-5`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: low
- 억양: Swahili
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 46-year-old Cooking Show Host from Kenya. Speaks Swahili. Currently in a bookstore. Voice is warm and engaging.

##### Training Voiceover 8

- 목소리 ID: `sw-ke-training-8`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: low
- 억양: Swahili
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 36-year-old Cooking Show Host from Kenya. Speaks Swahili. Currently in an oscar winning film. Tone is professional yet approachable.

##### Tutor 2

- 목소리 ID: `sw-ke-tutor-2`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: low
- 억양: Swahili
- 역할: Storyteller & Narrator (Therapist)
- 용도: Content & Media
- 공식 설명: 26-year-old Therapist from Kenya. Speaks Swahili. Currently sitting next to you on an airplane. Sounds confident and clear.

##### Tutor 3

- 목소리 ID: `sw-ke-tutor-3`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: low
- 억양: Swahili
- 역할: News & Podcast Host / Podcaster (Therapist)
- 용도: Content & Media
- 공식 설명: 51-year-old Therapist from Kenya. Speaks Swahili. Currently on npr. Sounds confident and clear.

##### Tutor 6

- 목소리 ID: `sw-ke-tutor-6`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: low
- 억양: Swahili
- 역할: Coach & Motivational Guide (Fitness Trainer)
- 용도: Wellness & Culture
- 공식 설명: 48-year-old Fitness Trainer from Kenya. Speaks Swahili. Currently brainstorming in a meeting. Tone is professional yet approachable.

##### Tutor 8

- 목소리 ID: `sw-ke-tutor-8`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: male
- 음높이: high
- 억양: Swahili
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Therapist)
- 용도: Growth & Marketing
- 공식 설명: 62-year-old Therapist from Kenya. Speaks Swahili. Currently in a bookstore. Tone is professional yet approachable.

#### 중성 — 2개

##### Training Voiceover 7

- 목소리 ID: `sw-ke-training-7`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: neutral
- 음높이: high
- 억양: Swahili
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 26-year-old Cooking Show Host from Kenya. Speaks Swahili. Currently in a bookstore. Tone is professional yet approachable.

##### Tutor 7

- 목소리 ID: `sw-ke-tutor-7`
- 유형: prebuilt
- 언어: sw-KE
- 지역: KE
- 성별: neutral
- 음높이: high
- 억양: Swahili
- 역할: Storyteller & Narrator (Therapist)
- 용도: Content & Media
- 공식 설명: 33-year-old Therapist from Kenya. Speaks Swahili. Tone is peer-to-peer and curious

### 타밀어·인도 (ta-IN) — 25개

#### 여성 — 14개

##### Authoritative Advisor 5

- 목소리 ID: `ta-in-advisor-5`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Tamil
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Lawyer from Tamil Nadu, India Nadu, India. Speaks Tamil. Currently on the phone. Tone is professional yet approachable.

##### Authoritative Advisor 6

- 목소리 ID: `ta-in-advisor-6`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Tamil
- 역할: Storyteller & Narrator (Lawyer)
- 용도: Content & Media
- 공식 설명: 33-year-old Lawyer from Tamil Nadu, India Nadu, India. Speaks Tamil. Currently sitting on couch. Tone is professional yet approachable.

##### Call Center Agent 3

- 목소리 ID: `ta-in-csagent-3`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Tamil
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 51-year-old Social Worker from Tamil Nadu, India Nadu, India. Speaks Tamil. Tone is peer-to-peer and curious

##### Call Center Agent 6

- 목소리 ID: `ta-in-csagent-6`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Tamil
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Social Worker from Tamil Nadu, India Nadu, India. Speaks Tamil. Voice is textured, resonant, and soothing.

##### Concierge 1

- 목소리 ID: `ta-in-concierge-1`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Tamil
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 28-year-old Executive Assistant from Tamil Nadu, India Nadu, India. Speaks Tamil. Voice is cool, confident, and collaborative.

##### Concierge 3

- 목소리 ID: `ta-in-concierge-3`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Tamil
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Executive Assistant from Tamil Nadu, India Nadu, India. Speaks Tamil. Tone is enthusiastic, engaging, and fun

##### Concierge 4

- 목소리 ID: `ta-in-concierge-4`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Tamil
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 64-year-old Executive Assistant from Tamil Nadu, India Nadu, India. Speaks Tamil. Currently on npr. Voice is warm and engaging.

##### Digital Assistant 1

- 목소리 ID: `ta-in-assistant-1`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Tamil
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 36-year-old Sibling from Tamil Nadu, India Nadu, India. Speaks Tamil. Currently at a meditation retreat. Voice is warm and engaging.

##### Digital Assistant 3

- 목소리 ID: `ta-in-assistant-3`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Tamil
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 40-year-old Parent from Tamil Nadu, India Nadu, India. Speaks Tamil. Currently in an oscar winning film. Tone is professional yet approachable.

##### Digital Assistant 4

- 목소리 ID: `ta-in-assistant-4`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Tamil
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 44-year-old Parent from Tamil Nadu, India Nadu, India. Speaks Tamil. Currently at an appointment. Voice is warm and engaging.

##### Tech Advisor 5

- 목소리 ID: `ta-in-techagent-5`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Tamil
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 29-year-old Tech Support Agent from Tamil Nadu, India Nadu, India. Speaks Tamil. Voice is highly approachable.

##### Training Voiceover 8

- 목소리 ID: `ta-in-training-8`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Tamil
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 62-year-old Cooking Show Host from Tamil Nadu, India Nadu, India. Speaks Tamil. Currently sitting next to you on an airplane. Voice is warm and engaging.

##### Tutor 3

- 목소리 ID: `ta-in-tutor-3`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Tamil
- 역할: Coach & Motivational Guide (Therapist)
- 용도: Wellness & Culture
- 공식 설명: 58-year-old Therapist from Tamil Nadu, India Nadu, India. Speaks Tamil. Voice is comforting someone who is stressed.

##### Tutor 5

- 목소리 ID: `ta-in-tutor-5`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Tamil
- 역할: News & Podcast Host / Podcaster (Fitness Trainer)
- 용도: Content & Media
- 공식 설명: 43-year-old Fitness Trainer from Tamil Nadu, India Nadu, India. Speaks Tamil. Voice is textured, resonant, and soothing.

#### 남성 — 9개

##### Authoritative Advisor 2

- 목소리 ID: `ta-in-advisor-2`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Tamil
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 36-year-old Lawyer from Tamil Nadu, India Nadu, India. Speaks Tamil. Currently in an oscar winning film. Tone is professional yet approachable.

##### Authoritative Advisor 4

- 목소리 ID: `ta-in-advisor-4`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Tamil
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Lawyer from Tamil Nadu, India Nadu, India. Speaks Tamil. Voice is natural and clear.

##### Call Center Agent 2

- 목소리 ID: `ta-in-csagent-2`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Tamil
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Social Worker from Tamil Nadu, India Nadu, India. Speaks Tamil. Voice is natural and clear.

##### Concierge 6

- 목소리 ID: `ta-in-concierge-6`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Tamil
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 52-year-old Executive Assistant from Tamil Nadu, India Nadu, India. Speaks Tamil. Currently sitting on couch. Sounds confident and clear.

##### Tech Advisor 2

- 목소리 ID: `ta-in-techagent-2`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Tamil
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 29-year-old Tech Support Agent from Tamil Nadu, India Nadu, India. Speaks Tamil. Voice is cool, confident, and collaborative.

##### Tech Advisor 8

- 목소리 ID: `ta-in-techagent-8`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Tamil
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Tech Support Agent from Tamil Nadu, India Nadu, India. Speaks Tamil. Currently sitting on couch. Sounds confident and clear.

##### Training Voiceover 2

- 목소리 ID: `ta-in-training-2`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Tamil
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 31-year-old Cooking Show Host from Tamil Nadu, India Nadu, India. Speaks Tamil. Currently in an oscar winning film. Voice is warm and engaging.

##### Tutor 2

- 목소리 ID: `ta-in-tutor-2`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Tamil
- 역할: Coach & Motivational Guide (Nutritionist)
- 용도: Wellness & Culture
- 공식 설명: 49-year-old Nutritionist from Tamil Nadu, India Nadu, India. Speaks Tamil. Voice is energetic, colorful, and fast

##### Tutor 8

- 목소리 ID: `ta-in-tutor-8`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Tamil
- 역할: Coach & Motivational Guide (Fitness Trainer)
- 용도: Wellness & Culture
- 공식 설명: 43-year-old Fitness Trainer from Tamil Nadu, India Nadu, India. Speaks Tamil. Voice is intimate talkshow.

#### 중성 — 2개

##### Concierge 8

- 목소리 ID: `ta-in-concierge-8`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: neutral
- 음높이: high
- 억양: Tamil
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 56-year-old Executive Assistant from Tamil Nadu, India Nadu, India. Speaks Tamil. Voice is natural and clear.

##### Tutor 6

- 목소리 ID: `ta-in-tutor-6`
- 유형: prebuilt
- 언어: ta-IN
- 지역: IN
- 성별: neutral
- 음높이: high
- 억양: Tamil
- 역할: News & Podcast Host / Podcaster (Fitness Trainer)
- 용도: Content & Media
- 공식 설명: 58-year-old Fitness Trainer from Tamil Nadu, India Nadu, India. Speaks Tamil. Voice is bright, breezy, and youthful.

### 텔루구어·인도 (te-IN) — 31개

#### 여성 — 15개

##### Authoritative Advisor 1

- 목소리 ID: `te-in-advisor-1`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Telugu
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 34-year-old Lawyer from Andhra Pradesh, India. Speaks Telugu. Voice is relaxed.

##### Authoritative Advisor 3

- 목소리 ID: `te-in-advisor-3`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Telugu
- 역할: Character & Theatrical (Lawyer)
- 용도: Entertainment & Gaming
- 공식 설명: 41-year-old Lawyer from Andhra Pradesh, India. Speaks Telugu. Tone is objective, direct, and helpful

##### Call Center Agent 1

- 목소리 ID: `te-in-csagent-1`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Telugu
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 41-year-old Social Worker from Andhra Pradesh, India. Speaks Telugu. Voice is comforting someone who is stressed.

##### Call Center Agent 5

- 목소리 ID: `te-in-csagent-5`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Telugu
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 23-year-old Social Worker from Andhra Pradesh, India. Speaks Telugu. Currently sitting on couch. Voice is warm and engaging.

##### Call Center Agent 8

- 목소리 ID: `te-in-csagent-8`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Telugu
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 47-year-old Social Worker from Andhra Pradesh, India. Speaks Telugu. Currently on npr. Tone is professional yet approachable.

##### Concierge 7

- 목소리 ID: `te-in-concierge-7`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Telugu
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Executive Assistant from Andhra Pradesh, India. Speaks Telugu. Voice is textured, resonant, and soothing.

##### Digital Assistant 5

- 목소리 ID: `te-in-assistant-5`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Telugu
- 역할: Storyteller & Narrator (Parent)
- 용도: Content & Media
- 공식 설명: 41-year-old Parent from Andhra Pradesh, India. Speaks Telugu. Voice is highly approachable.

##### Tech Advisor 1

- 목소리 ID: `te-in-techagent-1`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Telugu
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 62-year-old Tech Support Agent from Andhra Pradesh, India. Speaks Telugu. Voice is laid-back, encouraging, and chill.

##### Tech Advisor 3

- 목소리 ID: `te-in-techagent-3`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Telugu
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 37-year-old Tech Support Agent from Andhra Pradesh, India. Speaks Telugu. Voice is textured, resonant, and soothing.

##### Tech Advisor 7

- 목소리 ID: `te-in-techagent-7`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: female
- 음높이: medium
- 억양: Telugu
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 27-year-old Tech Support Agent from Andhra Pradesh, India. Speaks Telugu. Voice is laid-back, encouraging, and chill.

##### Training Voiceover 1

- 목소리 ID: `te-in-training-1`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Telugu
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 22-year-old Instructional Video Host from Andhra Pradesh, India. Speaks Telugu. Currently at an appointment. Sounds confident and clear.

##### Training Voiceover 3

- 목소리 ID: `te-in-training-3`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: female
- 음높이: low
- 억양: Telugu
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 49-year-old Instructional Video Host from Andhra Pradesh, India. Speaks Telugu. Voice is natural and clear.

##### Training Voiceover 6

- 목소리 ID: `te-in-training-6`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Telugu
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 34-year-old Instructional Video Host from Andhra Pradesh, India. Speaks Telugu. Currently in a bookstore. Voice is warm and engaging.

##### Tutor 1

- 목소리 ID: `te-in-tutor-1`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Telugu
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 33-year-old Professor from Andhra Pradesh, India. Speaks Telugu. Currently in a bookstore. Voice is warm and engaging.

##### Tutor 4

- 목소리 ID: `te-in-tutor-4`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: female
- 음높이: high
- 억양: Telugu
- 역할: News & Podcast Host / Podcaster (Fitness Trainer)
- 용도: Content & Media
- 공식 설명: 41-year-old Fitness Trainer from Andhra Pradesh, India. Speaks Telugu. Currently on podcast. Sounds confident and clear.

#### 남성 — 13개

##### Authoritative Advisor 7

- 목소리 ID: `te-in-advisor-7`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Telugu
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Lawyer from Andhra Pradesh, India. Speaks Telugu. Currently sitting next to you on an airplane. Voice is warm and engaging.

##### Authoritative Advisor 8

- 목소리 ID: `te-in-advisor-8`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: male
- 음높이: medium
- 억양: Telugu
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Lawyer from Andhra Pradesh, India. Speaks Telugu. Voice is energetic, colorful, and fast

##### Call Center Agent 4

- 목소리 ID: `te-in-csagent-4`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Telugu
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 28-year-old Social Worker from Andhra Pradesh, India. Speaks Telugu. Voice is textured, resonant, and soothing.

##### Concierge 2

- 목소리 ID: `te-in-concierge-2`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Telugu
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 63-year-old Executive Assistant from Andhra Pradesh, India. Speaks Telugu. Currently sitting next to you on the bus. Tone is professional yet approachable.

##### Concierge 5

- 목소리 ID: `te-in-concierge-5`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Telugu
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 29-year-old Executive Assistant from Andhra Pradesh, India. Speaks Telugu. Currently on npr. Sounds confident and clear.

##### Digital Assistant 2

- 목소리 ID: `te-in-assistant-2`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Telugu
- 역할: Character & Theatrical (Friend)
- 용도: Entertainment & Gaming
- 공식 설명: 62-year-old Friend from Andhra Pradesh, India. Speaks Telugu. Voice is energetic, colorful, and fast

##### Digital Assistant 7

- 목소리 ID: `te-in-assistant-7`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Telugu
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 63-year-old Sibling from Andhra Pradesh, India. Speaks Telugu. Currently brainstorming in a meeting. Voice is warm and engaging.

##### Digital Assistant 8

- 목소리 ID: `te-in-assistant-8`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Telugu
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 30-year-old Sibling from Andhra Pradesh, India. Speaks Telugu. Currently sitting on couch. Voice is warm and engaging.

##### Tech Advisor 4

- 목소리 ID: `te-in-techagent-4`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Telugu
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 51-year-old Tech Support Agent from Andhra Pradesh, India. Speaks Telugu. Currently in an oscar winning film. Sounds confident and clear.

##### Tech Advisor 6

- 목소리 ID: `te-in-techagent-6`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Telugu
- 역할: Tech Support Agent / Tech Advisor
- 용도: Enterprise Agent
- 공식 설명: 56-year-old Tech Support Agent from Andhra Pradesh, India. Speaks Telugu. Tone is peer-to-peer and curious

##### Training Voiceover 4

- 목소리 ID: `te-in-training-4`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Telugu
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 27-year-old Instructional Video Host from Andhra Pradesh, India. Speaks Telugu. Voice is laid-back, encouraging, and chill.

##### Training Voiceover 5

- 목소리 ID: `te-in-training-5`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Telugu
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 44-year-old Instructional Video Host from Andhra Pradesh, India. Speaks Telugu. Voice is cool, confident, and collaborative.

##### Tutor 7

- 목소리 ID: `te-in-tutor-7`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: male
- 음높이: low
- 억양: Telugu
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 53-year-old Professor from Andhra Pradesh, India. Speaks Telugu. Voice is light, airy, and precise

#### 중성 — 3개

##### Call Center Agent 7

- 목소리 ID: `te-in-csagent-7`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: neutral
- 음높이: medium
- 억양: Telugu
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Social Worker from Andhra Pradesh, India. Speaks Telugu. Currently brainstorming in a meeting. Voice is warm and engaging.

##### Digital Assistant 6

- 목소리 ID: `te-in-assistant-6`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: neutral
- 음높이: medium
- 억양: Telugu
- 역할: News & Podcast Host / Podcaster (Parent)
- 용도: Content & Media
- 공식 설명: 46-year-old Parent from Andhra Pradesh, India. Speaks Telugu. Currently on npr. Voice is warm and engaging.

##### Training Voiceover 7

- 목소리 ID: `te-in-training-7`
- 유형: prebuilt
- 언어: te-IN
- 지역: IN
- 성별: neutral
- 음높이: high
- 억양: Telugu
- 역할: Video Voiceover & Host / Training Voiceover (Cooking Show Host)
- 용도: Content & Media
- 공식 설명: 65-year-old Cooking Show Host from Andhra Pradesh, India. Speaks Telugu. Voice is engaging and empathic.

### 베트남어·베트남 (vi-VN) — 40개

#### 여성 — 23개

##### Authoritative Advisor 1

- 목소리 ID: `vi-vn-advisor-1`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: medium
- 억양: Vietnamese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Lawyer from Vietnam. Speaks Vietnamese. Voice is cool, confident, and collaborative.

##### Authoritative Advisor 3

- 목소리 ID: `vi-vn-advisor-3`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: medium
- 억양: Vietnamese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 40-year-old Lawyer from Vietnam. Speaks Vietnamese. Voice is comforting someone who is stressed.

##### Authoritative Advisor 4

- 목소리 ID: `vi-vn-advisor-4`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: low
- 억양: Vietnamese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Lawyer from Vietnam. Speaks Vietnamese. Currently in a bookstore. Voice is warm and engaging.

##### Authoritative Advisor 6

- 목소리 ID: `vi-vn-advisor-6`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: medium
- 억양: Vietnamese
- 역할: Storyteller & Narrator (Lawyer)
- 용도: Content & Media
- 공식 설명: 40-year-old Lawyer from Vietnam. Speaks Vietnamese. Tone is enthusiastic, engaging, and fun

##### Authoritative Advisor 7

- 목소리 ID: `vi-vn-advisor-7`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: medium
- 억양: Vietnamese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 45-year-old Lawyer from Vietnam. Speaks Vietnamese. Currently in an oscar winning film. Sounds confident and clear.

##### Call Center Agent 2

- 목소리 ID: `vi-vn-csagent-2`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: low
- 억양: Vietnamese
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 53-year-old Social Worker from Vietnam. Speaks Vietnamese. Voice is resonant and witty.

##### Call Center Agent 3

- 목소리 ID: `vi-vn-csagent-3`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: medium
- 억양: Vietnamese
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 39-year-old Social Worker from Vietnam. Speaks Vietnamese. Voice is textured, resonant, and soothing.

##### Call Center Agent 4

- 목소리 ID: `vi-vn-csagent-4`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: high
- 억양: Vietnamese
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 24-year-old Social Worker from Vietnam. Speaks Vietnamese. Currently at an appointment. Voice is warm and engaging.

##### Call Center Agent 5

- 목소리 ID: `vi-vn-csagent-5`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: medium
- 억양: Vietnamese
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 35-year-old Social Worker from Vietnam. Speaks Vietnamese. Tone is objective, direct, and helpful

##### Call Center Agent 6

- 목소리 ID: `vi-vn-csagent-6`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: low
- 억양: Vietnamese
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 45-year-old Social Worker from Vietnam. Speaks Vietnamese. Voice is engaging and empathic.

##### Call Center Agent 7

- 목소리 ID: `vi-vn-csagent-7`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: medium
- 억양: Vietnamese
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 28-year-old Social Worker from Vietnam. Speaks Vietnamese. Currently on the phone. Sounds confident and clear.

##### Digital Assistant 2

- 목소리 ID: `vi-vn-assistant-2`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: medium
- 억양: Vietnamese
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 37-year-old Parent from Vietnam. Speaks Vietnamese. Voice is relaxed.

##### Digital Assistant 4

- 목소리 ID: `vi-vn-assistant-4`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: low
- 억양: Vietnamese
- 역할: Companion & Peer / Digital Assistant (Parent)
- 용도: Conversational / Edu
- 공식 설명: 34-year-old Parent from Vietnam. Speaks Vietnamese. Currently on podcast. Voice is warm and engaging.

##### Digital Assistant 6

- 목소리 ID: `vi-vn-assistant-6`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: medium
- 억양: Vietnamese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Parent)
- 용도: Growth & Marketing
- 공식 설명: 41-year-old Parent from Vietnam. Speaks Vietnamese. Tone is peer-to-peer and curious

##### Digital Assistant 8

- 목소리 ID: `vi-vn-assistant-8`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: high
- 억양: Vietnamese
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 24-year-old Sibling from Vietnam. Speaks Vietnamese. Tone is conversational, slightly dry humor, and warm

##### Training Voiceover 1

- 목소리 ID: `vi-vn-training-1`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: medium
- 억양: Vietnamese
- 역할: Tech Support Agent / Tech Advisor (Instructional Video Host)
- 용도: Enterprise Agent
- 공식 설명: 30-year-old Instructional Video Host from Vietnam. Speaks Vietnamese. Voice is cool, confident, and collaborative.

##### Training Voiceover 3

- 목소리 ID: `vi-vn-training-3`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: low
- 억양: Vietnamese
- 역할: Tech Support Agent / Tech Advisor (Cooking Show Host)
- 용도: Enterprise Agent
- 공식 설명: 53-year-old Cooking Show Host from Vietnam. Speaks Vietnamese. Currently sitting next to you on an airplane. Sounds confident and clear.

##### Training Voiceover 4

- 목소리 ID: `vi-vn-training-4`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: medium
- 억양: Vietnamese
- 역할: Concierge & EA (Instructional Video Host)
- 용도: Enterprise Agent
- 공식 설명: 55-year-old Instructional Video Host from Vietnam. Speaks Vietnamese. Currently on npr. Tone is professional yet approachable.

##### Training Voiceover 5

- 목소리 ID: `vi-vn-training-5`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: medium
- 억양: Vietnamese
- 역할: Concierge & EA (Cooking Show Host)
- 용도: Enterprise Agent
- 공식 설명: 32-year-old Cooking Show Host from Vietnam. Speaks Vietnamese. Voice is clear, medium-pitch, and friendly.

##### Tutor 1

- 목소리 ID: `vi-vn-tutor-1`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: high
- 억양: Vietnamese
- 역할: Tech Support Agent / Tech Advisor (Professor)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Professor from Vietnam. Speaks Vietnamese. Voice is energetic, colorful, and fast

##### Tutor 3

- 목소리 ID: `vi-vn-tutor-3`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: high
- 억양: Vietnamese
- 역할: Tech Support Agent / Tech Advisor (Teacher)
- 용도: Enterprise Agent
- 공식 설명: 59-year-old Teacher from Vietnam. Speaks Vietnamese. Voice is fast-paced, articulate, energetic.

##### Tutor 5

- 목소리 ID: `vi-vn-tutor-5`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: medium
- 억양: Vietnamese
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 22-year-old Professor from Vietnam. Speaks Vietnamese. Currently brainstorming in a meeting. Sounds confident and clear.

##### Tutor 8

- 목소리 ID: `vi-vn-tutor-8`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: female
- 음높이: high
- 억양: Vietnamese
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 22-year-old Professor from Vietnam. Speaks Vietnamese. Currently brainstorming in a meeting. Sounds confident and clear.

#### 남성 — 16개

##### Authoritative Advisor 2

- 목소리 ID: `vi-vn-advisor-2`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: male
- 음높이: low
- 억양: Vietnamese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 33-year-old Lawyer from Vietnam. Speaks Vietnamese. Currently on podcast. Sounds confident and clear.

##### Authoritative Advisor 5

- 목소리 ID: `vi-vn-advisor-5`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: male
- 음높이: low
- 억양: Vietnamese
- 역할: High-Trust Advisor / Authoritative Advisor (Lawyer)
- 용도: Enterprise Agent
- 공식 설명: 42-year-old Lawyer from Vietnam. Speaks Vietnamese. Voice is bright, breezy, and youthful.

##### Call Center Agent 1

- 목소리 ID: `vi-vn-csagent-1`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: male
- 음높이: low
- 억양: Vietnamese
- 역할: Customer Support Agent / Call Center Agent (Social Worker)
- 용도: Enterprise Agent
- 공식 설명: 31-year-old Social Worker from Vietnam. Speaks Vietnamese. Currently on podcast. Sounds confident and clear.

##### Concierge 1

- 목소리 ID: `vi-vn-concierge-1`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: male
- 음높이: low
- 억양: Vietnamese
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 22-year-old Executive Assistant from Vietnam. Speaks Vietnamese. Currently on the phone. Tone is professional yet approachable.

##### Concierge 2

- 목소리 ID: `vi-vn-concierge-2`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: male
- 음높이: low
- 억양: Vietnamese
- 역할: Concierge & EA (Executive Assistant)
- 용도: Enterprise Agent
- 공식 설명: 23-year-old Executive Assistant from Vietnam. Speaks Vietnamese. Voice is engaging and empathic.

##### Digital Assistant 1

- 목소리 ID: `vi-vn-assistant-1`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: male
- 음높이: low
- 억양: Vietnamese
- 역할: Tech Support Agent / Tech Advisor (Parent)
- 용도: Enterprise Agent
- 공식 설명: 43-year-old Parent from Vietnam. Speaks Vietnamese. Currently sitting next to you on an airplane. Sounds confident and clear.

##### Digital Assistant 3

- 목소리 ID: `vi-vn-assistant-3`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: male
- 음높이: low
- 억양: Vietnamese
- 역할: Companion & Peer / Digital Assistant (Sibling)
- 용도: Conversational / Edu
- 공식 설명: 30-year-old Sibling from Vietnam. Speaks Vietnamese. Currently brainstorming in a meeting. Voice is warm and engaging.

##### Digital Assistant 5

- 목소리 ID: `vi-vn-assistant-5`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: male
- 음높이: low
- 억양: Vietnamese
- 역할: Companion & Peer / Digital Assistant (Friend)
- 용도: Conversational / Edu
- 공식 설명: 40-year-old Friend from Vietnam. Speaks Vietnamese. Currently on podcast. Voice is warm and engaging.

##### Digital Assistant 7

- 목소리 ID: `vi-vn-assistant-7`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: male
- 음높이: low
- 억양: Vietnamese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Sibling)
- 용도: Growth & Marketing
- 공식 설명: 36-year-old Sibling from Vietnam. Speaks Vietnamese. Voice is light, airy, and precise

##### Training Voiceover 2

- 목소리 ID: `vi-vn-training-2`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: male
- 음높이: low
- 억양: Vietnamese
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 43-year-old Instructional Video Host from Vietnam. Speaks Vietnamese. Voice is comforting someone who is stressed.

##### Training Voiceover 6

- 목소리 ID: `vi-vn-training-6`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: male
- 음높이: low
- 억양: Vietnamese
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 49-year-old Instructional Video Host from Vietnam. Speaks Vietnamese. Voice is fast-paced, articulate, energetic.

##### Training Voiceover 8

- 목소리 ID: `vi-vn-training-8`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: male
- 음높이: low
- 억양: Vietnamese
- 역할: Video Voiceover & Host / Training Voiceover (Instructional Video Host)
- 용도: Content & Media
- 공식 설명: 33-year-old Instructional Video Host from Vietnam. Speaks Vietnamese. Currently sitting on couch. Tone is professional yet approachable.

##### Tutor 2

- 목소리 ID: `vi-vn-tutor-2`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: male
- 음높이: low
- 억양: Vietnamese
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 62-year-old Professor from Vietnam. Speaks Vietnamese. Tone is objective, direct, and helpful

##### Tutor 4

- 목소리 ID: `vi-vn-tutor-4`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: male
- 음높이: low
- 억양: Vietnamese
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 38-year-old Professor from Vietnam. Speaks Vietnamese. Voice is laid-back, encouraging, and chill.

##### Tutor 6

- 목소리 ID: `vi-vn-tutor-6`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: male
- 음높이: low
- 억양: Vietnamese
- 역할: News & Podcast Host / Podcaster (Teacher)
- 용도: Content & Media
- 공식 설명: 39-year-old Teacher from Vietnam. Speaks Vietnamese. Currently on the phone. Sounds confident and clear.

##### Tutor 7

- 목소리 ID: `vi-vn-tutor-7`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: male
- 음높이: low
- 억양: Vietnamese
- 역할: Educational Tutor (Professor)
- 용도: Conversational / Edu
- 공식 설명: 55-year-old Professor from Vietnam. Speaks Vietnamese. Currently in an indie film. Voice is warm and engaging.

#### 중성 — 1개

##### Training Voiceover 7

- 목소리 ID: `vi-vn-training-7`
- 유형: prebuilt
- 언어: vi-VN
- 지역: VN
- 성별: neutral
- 음높이: low
- 억양: Vietnamese
- 역할: Advertising Pitch & Commerce / Commercial Voiceover (Cooking Show Host)
- 용도: Growth & Marketing
- 공식 설명: 55-year-old Cooking Show Host from Vietnam. Speaks Vietnamese. Currently brainstorming in a meeting. Sounds confident and clear.

## 3. 사용자 제작 목소리 — 반환 0개

이번 무필터 조회에서 `prompted`(설명으로 만든 목소리)와 `replicated`(복제 목소리)는 반환되지 않았다. 공식 문서상 ListVoices는 프로젝트에 저장된 사용자 제작 목소리와 기본 카탈로그를 조회한다. 저장되지 않은 임시 목소리나 다른 프로젝트의 비공개 목소리를 전 세계 공통 목록으로 제공하는 것은 아니다.
