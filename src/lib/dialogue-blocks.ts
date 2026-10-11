import { AppError, speakerAliases, type TtsRequest } from "./tts-contract";

type Turn=TtsRequest["turns"][number];

/** 한 입력 블록 안의 이름 선언만 제거하고 본문·줄바꿈·연출은 원문 그대로 둔다. */
export function dialogueParts(request:TtsRequest,block:Turn,index:number):{parts:Turn[];named:boolean} {
  if(request.mode==="single")return {parts:[block],named:false};
  const aliases=speakerAliases(request.speakers),parts:Turn[]=[];
  let current:Turn={...block,text:""},named=false;
  for(const line of block.text.match(/[^\r\n]*(?:\r\n|\r|\n|$)/g)??[]){
    if(!line)continue;
    const newline=/\r\n$|\r$|\n$/.exec(line)?.[0]??"";
    const body=newline?line.slice(0,-newline.length):line;
    // URL과 시각 표기를 이름 선언으로 오인하지 않는다.
    const ordinary=/^[\t ]*(?:[a-z][a-z0-9+.-]*:\/\/|\d{1,2}:\d{2}(?::\d{2})?)/i.test(body);
    const candidate=/^[\t ]*([\p{L}\p{M}\p{N} _-]+)[:：][\t ]?(.*)$/u.exec(body);
    // 명시적으로 등록한 이름이 URL·시간처럼 보여도 사용자 매핑이 우선이다.
    const registered=candidate&&aliases.has(candidate[1].trim().normalize("NFC"));
    const declaration=ordinary&&!registered?null:candidate;
    if(!declaration){current.text+=line;continue;}
    const name=declaration[1].trim().normalize("NFC"),speaker=aliases.get(name);
    if(Array.from(name).length>40)throw new AppError(400,`${index+1}번째 대사의 화자 이름이 40자 제한을 넘은 상태입니다.`);
    if(!speaker)throw new AppError(400,`${index+1}번째 대사의 ‘${name}’은 화자 대본 이름에 등록되지 않은 이름입니다. 화자 이름 설정을 확인하세요.`);
    if(named&&!current.text.trim())throw new AppError(400,`${index+1}번째 대사에 본문이 없는 발화가 있는 상태입니다.`);
    // 첫 선언 앞에 실제 본문이 있으면 선택한 화자의 발화로 보존한다.
    if(current.text.trim()||named){parts.push(current);current={speaker,text:"",style:block.style};}
    else current.speaker=speaker;
    current.text+=declaration[2]+newline;named=true;
  }
  if(!current.text.trim())throw new AppError(400,`${index+1}번째 대사에 본문이 없는 발화가 있는 상태입니다.`);
  parts.push(current);
  return {parts,named};
}
