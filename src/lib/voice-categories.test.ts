import {expect,it} from "vitest";
import {categoryValues,categoryMatches,categoryLabel} from "./voice-categories";
import {BASIC_VOICES} from "./voice-catalog";
it("복수 용도를 따로 고르고 세부 직함은 역할별로 묶는다",()=>{
 const voice={...BASIC_VOICES[0],contexts:["Enterprise Agent | Content & Media"],persona:["High-Trust Advisor / Authoritative Advisor (Lawyer)"]};
 expect(categoryValues(voice,"contexts")).toEqual(["Enterprise Agent","Content & Media"]);
 expect(categoryValues(voice,"persona")).toEqual(["High-Trust Advisor"]);
 expect(categoryMatches(voice,{contexts:"Content & Media",persona:"High-Trust Advisor"})).toBe(true);
 expect(categoryMatches(voice,{contexts:"Entertainment & Gaming"})).toBe(false);
 expect(categoryLabel("persona","High-Trust Advisor")).toBe("전문 상담");
});
