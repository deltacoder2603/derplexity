import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "./env";

export const genAI = new GoogleGenerativeAI(env.GOOGLE_API_KEY);

export const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.8,
    topP: 1,
    topK: 1,
    maxOutputTokens: 2048,
  },
});