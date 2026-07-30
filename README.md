This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 변경 사항
- Gemini 3.1 버전에 맞춰 TTS API 파라미터 구조 업데이트 (pitch, speakingRate 제거)
- UI에 Gemini 3.1 인라인 오디오 감정 태그 추가 (한국어 라벨 제공)
- API 프롬프트 지침을 감독 모드(director mode)로 최적화하여 태그 인식률 개선
- 지시어 입력창을 멀티라인 편집창(textarea)으로 변경
- package.json에 개발/운영 모드 실행 스크립트 추가 (dev:watch, start:watch)
- package.json 스크립트 수정: pm2를 npx로 실행하도록 변경 및 start:init, start:prod, stop, delete 추가
- 프로젝트의 기획 및 요구사항을 명세한 PRD.md 문서 추가
- next.config.ts에 outputFileTracingRoot 설정 추가하여 다중 lockfile 경고 해결
- 음성 새로 생성 시 이전 완료 문구 및 오디오 플레이어가 즉시 사라지도록 UI 상태 초기화 로직 추가
- Gemini 오디오 청크를 24kHz/16bit/Mono PCM으로 스트리밍하여 첫 청크부터 자동 재생
- 생성 중 다시 듣기·다운로드 비활성화, 완료 후 WAV 다시 듣기·다운로드 활성화
- 긴 원고를 최대 300자의 문장 경계 조각으로 나누어 Gemini TTS에 순차 요청하고, 각 24kHz PCM 응답을 하나의 스트림으로 연결
- Gemini 응답의 종료 사유를 검사하여 출력 한도 등으로 잘린 부분 오디오가 완성본으로 표시되지 않도록 차단
- 생성 중과 완료 후 다시 듣기에 동일한 Web Audio 재생 경로와 동일 PCM을 사용하여 재생 음질 일치
- 장문 원고는 300자 조각마다 Gemini API 요청 1회를 사용하므로 무료 티어의 일일 요청 한도에 더 빨리 도달할 수 있음
- Gemini 429 할당량 오류는 재시도하지 않고 무료 일일 한도 또는 결제 설정을 확인할 수 있는 한국어 안내로 즉시 반환
- 각 장문 조각은 Gemini 정상 종료를 확인한 뒤 재생하고, `OTHER` 같은 일시적 비정상 종료는 잘린 음성을 내보내지 않고 해당 조각만 자동 재시도

## 검증

```bash
npm test
npm run lint
npm run build
```
