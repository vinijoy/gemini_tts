import type { CatalogVoice } from "./voice-catalog";
import { GENDERS, PITCHES } from "./tts-labels";
export const VOICE_CATEGORIES = [
  {key:"languages",label:"언어"}, {key:"regions",label:"지역"},
  {key:"contexts",label:"용도"}, {key:"persona",label:"역할"},
  {key:"gender",label:"성별 표현"}, {key:"pitch",label:"높낮이"}, {key:"accent",label:"억양"},
] as const;
export type CategoryKey = typeof VOICE_CATEGORIES[number]["key"];
export const UNKNOWN_CATEGORY = "__unknown__";
const labels: Record<string,string> = {
 ...GENDERS,...PITCHES,
 "Enterprise Agent":"업무·고객 응대", "Content & Media":"콘텐츠·미디어", "Conversational / Edu":"대화·교육", "Conversational":"대화",
 "Growth & Marketing":"광고·마케팅", "Wellness & Culture":"건강·문화", "Entertainment & Gaming":"오락·게임",
 "Advertising Pitch & Commerce":"광고·판매", "Character & Theatrical":"캐릭터·연기", "Coach & Motivational Guide":"코칭·동기 부여",
 "Companion & Peer":"친구·동반자", "Concierge & EA":"안내·개인 비서", "Customer Support Agent":"고객 상담", "Educational Tutor":"학습 지도",
 "High-Trust Advisor":"전문 상담", "News & Podcast Host":"뉴스·팟캐스트 진행", "Podcaster":"팟캐스트 진행", "Storyteller & Narrator":"이야기·내레이션",
 "Tech Support Agent":"기술 지원", "Video Voiceover & Host":"영상 해설·진행",
};
const accents = ["아르헨티나 스페인어","오클랜드 뉴질랜드 영어","아와디 힌디어","보즈푸리 힌디어","브라질 포르투갈어","브리스틀 영어","분델리 힌디어","부산 한국어","케이프타운 영어","카스티야 스페인어","체코어","더블린 영어","네덜란드어","미국 동부","이집트 아랍어","후쿠오카 일본어","일반 미국 영어","독일어","글래스고 영어","그리스어","미국 멕시코만 연안","하리아나 힌디어","인도 영어","미국 남부 내륙","이탈리아어","자바어","리버풀 영어","맨체스터 영어","멕시코 스페인어","미국 중서부","현대 표준 아랍어","몬트리올 프랑스어","뉴캐슬 영어","미국 북서부","오사카 일본어","파리 프랑스어","포르투갈 포르투갈어","폴란드어","서울 한국어","스와힐리어","시드니 영어","타밀어","텔루구어","도쿄 일본어","토론토 영어","우르두어","밴쿠버 영어","베트남어","미국 서부","윈체스터 영어"];
const accentKeys = ["Argentina Spanish","Auckland New Zealand English","Awadhi Hindi","Bhojpuri Hindi","Brazilian Portuguese","Bristol English","Bundeli Hindi","Busan Korean","Cape Town English","Castilian Spanish","Czech","Dublin English","Dutch","East Coast","Egyptian Arabic","Fukuoka Japanese","General American","German","Glasgow English","Greek","Gulf Coast","Haryanvi Hindi","Indian English","Inland Southern","Italian","Javanese","Liverpool English","Manchester English","Mexico Spanish","Midwest","Modern Standard Arabic","Montreal French","Newcastle English","Northwest","Osaka Japanese","Paris French","Peninsular Portuguese","Polish","Seoul Korean","Swahili","Sydney English","Tamil","Telugu","Tokyo Japanese","Toronto English","Urdu","Vancouver English","Vietnamese","West Coast","Winchester English"];
accentKeys.forEach((key,i)=>{labels[key]=accents[i];});
export function categoryValues(voice:CatalogVoice,key:CategoryKey):string[] {
 const raw=voice[key];
 let values=(Array.isArray(raw)?raw:raw?[raw]:[]).filter(Boolean);
 // 제공 목록의 복수 용도는 각각 선택 가능하게 하고 역할은 넓은 직군으로 묶는다.
 if(key==="contexts") values=values.flatMap(value=>value.split("|").map(v=>v.trim()));
 if(key==="persona") values=values.map(value=>value.split(" / ")[0].split(" (")[0].trim());
 return values.length?[...new Set(values)]:[UNKNOWN_CATEGORY];
}
export function categoryLabel(key:CategoryKey,value:string):string {
 if(value===UNKNOWN_CATEGORY)return "미분류";
 if(key==="languages"||key==="regions")try{return new Intl.DisplayNames(["ko"],{type:key==="languages"?"language":"region"}).of(value)??value;}catch{return value;}
 return labels[value]??value;
}
export function categoryMatches(voice:CatalogVoice,filters:Partial<Record<CategoryKey,string>>):boolean {
 return VOICE_CATEGORIES.every(({key})=>!filters[key]||categoryValues(voice,key).includes(filters[key]!));
}
