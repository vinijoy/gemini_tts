import { BASIC_VOICES } from "./voice-catalog";
export const MODEL_LABELS: Record<string, string> = {
  "gemini-3.8-flash-tts": "제미나이 3.8 플래시 — 기본 음성 생성 모델",
  "gemini-3.8-flash-lite-tts": "제미나이 3.8 플래시 라이트 — 경량 음성 생성 모델",
};
export const ENCODING_LABELS: Record<string, string> = {
  AUDIO_L16: "원본 음성 — 생성하면서 바로 듣기 (기본)",
  AUDIO_WAV: "웨이브 파일 — 생성 완료 후 듣기",
  AUDIO_MULAW: "뮤로 압축 — 전화 음성용",
  AUDIO_ALAW: "에이로 압축 — 전화 음성용",
};
export const TIER_LABELS: Record<string, string> = {standard: "표준", flex: "여유 처리", priority: "우선 처리", unknown: "미확인"};
export const GENDERS = {female: "여성 느낌", male: "남성 느낌", neutral: "중성 느낌"};
export const PITCHES = {low: "낮은 목소리", medium: "중간 높이", high: "높은 목소리"};
export const VOICE_TYPES = {prebuilt: "기본 목소리", prompted: "설명으로 만든 목소리", replicated: "녹음으로 복제한 목소리"};
const voiceNames = ["제퍼", "퍽", "카론", "코레", "펜리르", "레다", "오루스", "아오이데", "칼리로에", "아우토노에", "엔셀라두스", "이아페투스", "움브리엘", "알기에바", "데스피나", "에리노메", "알게니브", "라스알게티", "라오메데이아", "아케르나르", "알닐람", "셰다르", "가크룩스", "풀케리마", "아키르드", "주벤엘게누비", "빈데미아트릭스", "사다크비아", "사달타게르", "술라파트"];
export function voiceLabel(id: string) {
  const index = BASIC_VOICES.findIndex(voice => voice.id === id);
  return index < 0 ? id : `${voiceNames[index]} — ${BASIC_VOICES[index].description}`;
}
