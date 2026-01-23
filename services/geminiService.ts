
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// PRO-TIP: We are using the key directly here as requested, 
// but for production, consider using environment variables (VITE_GEMINI_KEY).
const API_KEY = "AIzaSyDV9VjmEbi1_3XAaBC1ipL4j7XwEOYJZ4U";
const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Generates a response from the Gemini AI model using the @google/genai package.
 */
export const generateDoraResponse = async (history: ChatMessage[]): Promise<string> => {
  try {
    // Extract the latest user message
    const lastUserMessage = history[history.length - 1]?.content || "Hello";

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: lastUserMessage,
      config: {
        systemInstruction: "You are Dora, a helpful and friendly AI chatbot assistant for the Dora AI Platform. You help users with their questions in a professional yet warm manner. Keep responses concise and helpful. You are powered by Gemini.",
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I encountered an error connecting to my neural core. Please check the API configuration.";
  }
};