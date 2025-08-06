import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEY,
});

export async function queryGem(model, input, prompt, history) {
  const his = Array.from(history);
  his.push({
    role: "user",
    parts: [{ text: input }],
  });
  const response = await ai.models.generateContent({
    model: model,
    config: {
      systemInstruction: {
        role: "system",
        parts: [{ text: prompt }],
      },
    },
    contents: his,
  });

  return response;
}
