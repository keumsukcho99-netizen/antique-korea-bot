import { GoogleGenAI, Type } from "@google/genai";
import { AppraisalResult, AppraisalConfig } from "../types";

export async function analyzeArtifact(imageBases: string[], config: AppraisalConfig): Promise<AppraisalResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-pro-preview';

  const systemInstruction = `당신은 고미술 전문 감정관입니다. 이미지를 분석하여 역사적 가치, 낙관, 재질 등을 정밀하게 고증하십시오. JSON 형식으로만 응답하십시오.`;

  const imageParts = imageBases.map(base64 => ({
    inlineData: { mimeType: "image/jpeg", data: base64.split(',')[1] }
  }));

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { text: `이 유물을 분석하십시오. 카테고리: ${config.category}. 작가와 시대를 일관되게 고증하십시오.` },
        ...imageParts
      ]
    },
    config: {
      systemInstruction,
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          category: { type: Type.STRING },
          period: { type: Type.STRING },
          description: { type: Type.STRING },
          confidenceScore: { type: Type.NUMBER },
          coreAnalysis: {
            type: Type.OBJECT,
            properties: {
              sealsAndSignatures: { type: Type.OBJECT, properties: { content: { type: Type.STRING }, score: { type: Type.NUMBER } } },
              historicalValue: { type: Type.OBJECT, properties: { content: { type: Type.STRING }, score: { type: Type.NUMBER } } },
              academicVerification: { type: Type.OBJECT, properties: { content: { type: Type.STRING }, score: { type: Type.NUMBER } } },
              materialAndStorage: { type: Type.OBJECT, properties: { content: { type: Type.STRING }, score: { type: Type.NUMBER } } }
            }
          },
          analysis: {
            type: Type.OBJECT,
            properties: {
              artifactDetails: { type: Type.STRING },
              historicalSignificance: { type: Type.STRING },
              conditionReport: { type: Type.STRING }
            }
          },
          estimatedValue: {
            type: Type.OBJECT,
            properties: {
              min: { type: Type.NUMBER },
              max: { type: Type.NUMBER },
              currency: { type: Type.STRING },
              note: { type: Type.STRING }
            }
          }
        }
      }
    }
  });

  const resultData = JSON.parse(response.text || '{}');
  return {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    imageUrls: imageBases,
    ...resultData,
    isDonated: config.allowDigitalMuseum
  };
}
