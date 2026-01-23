
import { generateDoraResponse } from './geminiService';
import { ChatMessage } from '../types';

/**
 * A wrapper for the AI chat service. 
 * Now integrated with the official Gemini API using the provided key.
 */
export const generateFreeChatResponse = async (message: string): Promise<string> => {
    try {
        // We pass the message in a history-like format for the Gemini service
        const history: ChatMessage[] = [{ role: 'user', content: message }];
        return await generateDoraResponse(history);
    } catch (error) {
        console.error("Chat Service Error:", error);
        return "I'm having a bit of trouble connecting to my neural network. Please try again in a moment!";
    }
};
