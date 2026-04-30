// src/utils/audio.ts

// Base64 문자열을 ArrayBuffer로 변환하는 함수
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// raw PCM 데이터를 WAV 형식의 Blob으로 변환하는 함수
// 제미나이 2.5 Flash TTS는 주로 24kHz (또는 22050Hz), 16bit, Mono 형태로 오디오를 반환합니다.
export function createWavBlobFromPcm(base64Data: string, sampleRate: number = 24000): Blob {
  const pcmBuffer = base64ToArrayBuffer(base64Data);
  
  // 만약 이미 WAV 파일이라면 (헤더가 'RIFF'로 시작한다면) 그대로 반환
  if (pcmBuffer.byteLength > 4) {
    const view = new DataView(pcmBuffer);
    const isRiff = view.getUint8(0) === 82 && // 'R'
                   view.getUint8(1) === 73 && // 'I'
                   view.getUint8(2) === 70 && // 'F'
                   view.getUint8(3) === 70;   // 'F'
    if (isRiff) {
      return new Blob([pcmBuffer], { type: 'audio/wav' });
    }
  }
  const numChannels = 1; // 모노
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmBuffer.byteLength;
  const wavSize = 36 + dataSize;
  const arrayBuffer = new ArrayBuffer(8 + wavSize);
  const view = new DataView(arrayBuffer);

  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  // RIFF chunk descriptor
  writeString(view, 0, 'RIFF');
  view.setUint32(4, wavSize, true);
  writeString(view, 8, 'WAVE');

  // fmt sub-chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);

  // data sub-chunk
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  // raw PCM data 쓰기
  const pcmArray = new Uint8Array(pcmBuffer);
  const wavArray = new Uint8Array(arrayBuffer);
  wavArray.set(pcmArray, 44);

  return new Blob([arrayBuffer], { type: 'audio/wav' });
}
