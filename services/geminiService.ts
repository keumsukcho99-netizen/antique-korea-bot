import { GoogleGenAI, Modality, Type } from "@google/genai";
import { BookInterpretationResult } from "../types";

// API 호출을 위한 클라이언트 생성 함수
const createAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY가 설정되지 않았습니다. 관리 집무실에서 설정을 확인해주세요.");
  }
  return new GoogleGenAI({ apiKey });
};

// 전역 오디오 컨텍스트 관리
let globalAudioCtx: AudioContext | null = null;

export const getSharedAudioCtx = () => {
  if (!globalAudioCtx) {
    globalAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  }
  if (globalAudioCtx.state === 'suspended') {
    globalAudioCtx.resume();
  }
  return globalAudioCtx;
};

/**
 * 유물 감정 요청 (최신 Gemini 3 모델 사용)
 */
export const getAppraisal = async (userInput: string, images: { data: string, mimeType: string }[] = []) => {
  const ai = createAI();
  
  const contents = {
    parts: [
      ...images.map(img => ({
        inlineData: { data: img.data, mimeType: img.mimeType }
      })),
      { text: userInput },
      { text: `당신은 황실 유물 감정소의 수석 큐레이터 '고산'입니다. 
      사용자가 올린 유물을 정밀 분석하여 품격 있는 구어체로 설명해주세요.
      답변의 마지막에는 반드시 아래 형식의 JSON 데이터를 포함해야 합니다:
      {
        "certificate": {
          "id": "CERT-${Math.floor(Math.random() * 900000 + 100000)}",
          "itemName": "유물 명칭",
          "period": "추정 시기",
          "rarity": "희귀도 (국보급/희귀/정교함/보통 중 택1)",
          "estimatedValue": "추정 감정가",
          "summary": "유물의 혼을 담은 한 줄 요약",
          "confidenceScore": 95
        }
      }` }
    ]
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: contents,
  });

  return response.text;
};

/**
 * 고서 해석 요청 (Gemini 3 모델 사용)
 */
export const interpretAncientBook = async (parts: any[]) => {
  const ai = createAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: { parts: [...parts, { text: "이 고서를 분석하여 원문(한자), 현대어 번역, 해설, 추정 시대, 저자 노트를 포함한 정보를 JSON으로 출력해주세요." }] },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          originalText: { type: Type.STRING },
          translation: { type: Type.STRING },
          commentary: { type: Type.STRING },
          era: { type: Type.STRING },
          authorNote: { type: Type.STRING }
        },
        required: ["originalText", "translation", "commentary", "era"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}") as BookInterpretationResult;
  } catch (e) {
    console.error("고서 해석 파싱 중 오류 발생:", e);
    throw new Error("고서 해석 결과를 읽어오는 데 실패했습니다.");
  }
};

/**
 * AI 음성 생성 (TTS)
 */
export const generateSpeech = async (text: string) => {
  const ai = createAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: text.slice(0, 500) }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
      },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
};

/**
 * 오디오 디코딩 함수
 */
export async function decodeAudio(base64: string): Promise<AudioBuffer | null> {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  const ctx = getSharedAudioCtx();
  const dataInt16 = new Int16Array(bytes.buffer);
  const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < dataInt16.length; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
}
