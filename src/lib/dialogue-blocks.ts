import { AppError, type TtsRequest } from "./tts-contract";

type Turn=TtsRequest["turns"][number];

function declarationIn(body:string):RegExpExecArray|null {
  // 등록 절차가 없으므로 URL·시각 표기는 새 화자 이름으로 추측하지 않는다.
  if(/^[\t ]*(?:[a-z][a-z0-9+.-]*:\/\/|\d{1,2}:\d{2}(?::\d{2})?)/i.test(body))return null;
  return /^[\t ]*([\p{L}\p{M}\p{N} _-]+)[:：][\t ]?(.*)$/u.exec(body);
}

/** 블록별로 재배정하지 않고 요청 전체에서 첫 등장 순서를 한 번만 결정한다. */
export function dialogueAliases(request:TtsRequest):Map<string,string> {
  const aliases=new Map(request.speakers.map(s=>[s.id.normalize("NFC"),s.id]));
  if(request.mode==="single")return aliases;
  const assigned=new Set<string>();
  for(const [index,block] of request.turns.entries())for(const line of block.text.split(/\r\n|\r|\n/)){
    const declaration=declarationIn(line);if(!declaration)continue;
    const name=declaration[1].trim().normalize("NFC");
    if(Array.from(name).length>40)throw new AppError(400,`${index+1}번째 대사의 화자 이름이 40자 제한을 넘은 상태입니다.`);
    let speaker=aliases.get(name);
    if(!speaker){
      speaker=request.speakers.find(s=>!assigned.has(s.id))?.id;
      if(!speaker)throw new AppError(400,`${index+1}번째 대사에 설정된 두 화자를 넘는 이름이 있는 상태입니다.`);
      aliases.set(name,speaker);
    }
    // A/B를 직접 쓴 경우도 해당 목소리를 점유한다. 이후 이름이 다른 화자에 재배정되지 않는다.
    assigned.add(speaker);
  }
  return aliases;
}

/** 한 입력 블록 안의 이름 선언만 제거하고 본문·줄바꿈·연출은 원문 그대로 둔다. */
export function dialogueParts(request:TtsRequest,block:Turn,index:number,aliases=dialogueAliases(request)):{parts:Turn[];named:boolean} {
  if(request.mode==="single")return {parts:[block],named:false};
  const parts:Turn[]=[];
  let current:Turn={...block,text:""},named=false;
  for(const line of block.text.match(/[^\r\n]*(?:\r\n|\r|\n|$)/g)??[]){
    if(!line)continue;
    const newline=/\r\n$|\r$|\n$/.exec(line)?.[0]??"";
    const body=newline?line.slice(0,-newline.length):line;
    const declaration=declarationIn(body);
    if(!declaration){current.text+=line;continue;}
    const name=declaration[1].trim().normalize("NFC"),speaker=aliases.get(name);
    if(Array.from(name).length>40)throw new AppError(400,`${index+1}번째 대사의 화자 이름이 40자 제한을 넘은 상태입니다.`);
    if(!speaker)throw new AppError(400,`${index+1}번째 대사의 화자 연결을 확인할 수 없는 상태입니다.`);
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
