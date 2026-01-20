
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

/**
 * Generates a response from the Dora AI assistant using the Gemini API.
 * Follows the latest @google/genai SDK guidelines for initialization and content generation.
 */
export const generateDoraResponse = async (history: ChatMessage[]): Promise<string> => {
  try {
    // CRITICAL: Initialize GoogleGenAI right before the API call using process.env.API_KEY directly.
    // The API key is assumed to be pre-configured and valid in the environment.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Transform history to contents format. We extract the latest user message for this request.
    const lastUserMessage = history[history.length - 1]?.content || "Hello";
    
    // Use gemini-3-flash-preview for basic text tasks like this chatbot assistant.
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: lastUserMessage,
      config: {
        systemInstruction: "You are Dora, a helpful and friendly AI chatbot assistant for the Dora AI Platform. You help users with their questions in a professional yet warm manner. Keep responses concise and helpful. You are powered by Gemini.",
        temperature: 0.7,
        topP: 0.95,
      },
    });

    // Access the .text property directly (it is a getter, not a function) to extract the generated string.
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I encountered an error processing your request. Please try again later.";
  }
};