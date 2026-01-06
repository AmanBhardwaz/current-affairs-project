
import { GoogleGenAI, Type } from "@google/genai";
import { AppData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLatestContent = async (): Promise<AppData> => {
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const prompt = `
    Generate a JSON response for a Government Exam Current Affairs website for TODAY: ${today}.
    Focus on events that occurred in the last 24 hours specifically for Bihar, India, and the World.
    
    1. Generate EXACTLY 3 SEPARATE QUIZ SETS (10 MCQs each) based on TODAY'S events.
    2. Generate EXACTLY 10 NEWS ITEMS per category based on TODAY'S events.
    
    CRITICAL RULES:
    - Focus on competitive exams (BPSC, SSC, UPSC).
    - All news MUST be CONFIRMED factual events from today or the immediate last 24 hours.
    - Use absolute factual verbs (launched, approved, inaugurated, etc.).
    - Ensure historical accuracy and precise numbers/names.
    
    The response must match this schema:
    {
      "quizSets": {
        "bihar": { "totalQuestions": 10, "questions": [{ "question": "...", "options": { "A": "...", "B": "...", "C": "...", "D": "..." }, "correctAnswer": "A|B|C|D", "explanation": "..." }] },
        "india": { ... },
        "international": { ... }
      },
      "newsSection": {
        "bihar": ["String news item 1", ...],
        "india": [...],
        "international": [...]
      }
    }
  `;

  const mcqSchema = {
    type: Type.OBJECT,
    properties: {
      question: { type: Type.STRING },
      options: {
        type: Type.OBJECT,
        properties: {
          A: { type: Type.STRING },
          B: { type: Type.STRING },
          C: { type: Type.STRING },
          D: { type: Type.STRING },
        },
        propertyOrdering: ["A", "B", "C", "D"],
      },
      correctAnswer: { type: Type.STRING },
      explanation: { type: Type.STRING },
    },
    propertyOrdering: ["question", "options", "correctAnswer", "explanation"],
  };

  const quizSetSchema = {
    type: Type.OBJECT,
    properties: {
      totalQuestions: { type: Type.INTEGER },
      questions: {
        type: Type.ARRAY,
        items: mcqSchema,
      },
    },
    propertyOrdering: ["totalQuestions", "questions"],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.1,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quizSets: {
              type: Type.OBJECT,
              properties: {
                bihar: quizSetSchema,
                india: quizSetSchema,
                international: quizSetSchema,
              },
              propertyOrdering: ["bihar", "india", "international"],
            },
            newsSection: {
              type: Type.OBJECT,
              properties: {
                bihar: { type: Type.ARRAY, items: { type: Type.STRING } },
                india: { type: Type.ARRAY, items: { type: Type.STRING } },
                international: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              propertyOrdering: ["bihar", "india", "international"],
            }
          },
          propertyOrdering: ["quizSets", "newsSection"],
        }
      }
    });

    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr) as AppData;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
