export const DEFAULT_TRANSCRIPT_CHUNK_CHARS = 800;

const SENTENCE_END_PATTERN = /[.!?。！？](?:["'”’)\]}」』】》〉]*)\s+/gu;
const SOFT_BREAK_PATTERN = /(?:\r?\n|[,，、;；:：])\s*/gu;
const WHITESPACE_PATTERN = /\s+/gu;

function lastBoundaryAtOrBefore(
  text: string,
  limit: number,
  pattern: RegExp,
): number {
  pattern.lastIndex = 0;
  let boundary = -1;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (pattern.lastIndex > limit) break;
    boundary = pattern.lastIndex;
  }

  return boundary;
}

/**
 * 긴 원고를 가능한 한 자연스러운 발화 경계에서 제한 길이 이하로 나눈다.
 * 문장 끝을 우선하고, 불가능할 때만 약한 구두점·공백·강제 길이를 사용한다.
 */
export function splitTranscript(
  text: string,
  maxChars = DEFAULT_TRANSCRIPT_CHUNK_CHARS,
): string[] {
  if (!Number.isInteger(maxChars) || maxChars < 1) {
    throw new Error("원고 조각의 최대 길이는 1 이상이어야 합니다.");
  }

  let remaining = text.trim();
  const chunks: string[] = [];

  while (remaining.length > maxChars) {
    const boundaries = [
      lastBoundaryAtOrBefore(remaining, maxChars, SENTENCE_END_PATTERN),
      lastBoundaryAtOrBefore(remaining, maxChars, SOFT_BREAK_PATTERN),
      lastBoundaryAtOrBefore(remaining, maxChars, WHITESPACE_PATTERN),
    ];
    const boundary = boundaries.find((value) => value > 0) ?? maxChars;
    const chunk = remaining.slice(0, boundary).trim();

    if (chunk.length > 0) {
      chunks.push(chunk);
    }
    remaining = remaining.slice(boundary).trimStart();
  }

  if (remaining.length > 0) {
    chunks.push(remaining);
  }

  return chunks;
}
