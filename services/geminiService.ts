
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const refineProposalText = async (text: string, context: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Você é um redator sênior de propostas comerciais para estúdios de Motion Design. 
      Refine o seguinte texto para torná-lo mais profissional, persuasivo e elegante, mantendo o sentido original em português:
      
      Contexto da seção: ${context}
      Texto Original: ${text}
      
      Retorne apenas o texto refinado sem comentários adicionais.`,
    });
    
    return response.text?.trim() || text;
  } catch (error) {
    console.error("Gemini refinement failed:", error);
    return text;
  }
};

export const suggestScope = async (projectName: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere uma lista de 5 itens de escopo técnico para um projeto de Motion Design chamado "${projectName}". 
      Responda em JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            items: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["items"]
        }
      }
    });
    
    const data = JSON.parse(response.text || '{"items":[]}');
    return data.items;
  } catch (error) {
    console.error("Gemini scope suggestion failed:", error);
    return [];
  }
};
