"use client";
import { useEffect, useState } from "react";

function AnnouncementText({message}:{message:string}) {
 const [visible,setVisible]=useState(true);
 useEffect(()=>{
  const timer=window.setTimeout(()=>setVisible(false),3000);
  return()=>window.clearTimeout(timer);
 },[]);
 return visible?message:null;
}
/** 라이브 영역은 유지하고 안내 내용만 3초 후 비운다. */
export default function TimedLiveRegion({message}:{message:string}) {
 return <div role="status" aria-live="polite" aria-atomic="true" className="sr-only"><AnnouncementText key={message} message={message}/></div>;
}
