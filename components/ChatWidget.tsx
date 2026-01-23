
import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, User, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { generateFreeChatResponse } from '../services/chatService';

export const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { role: 'assistant', content: "Hello! I'm Dora, your AI assistant. I'm ready to help you test your chatbot. Ask me anything!" }
      ]);
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateFreeChatResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having some trouble connecting. Please try again later!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-white">Live Test Assistant</h4>
            <div className="flex items-center text-[10px] text-green-400 font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
              Neural Active
            </div>
          </div>
        </div>
        <Sparkles className="w-5 h-5 text-purple-400" />
      </div>

      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
              msg.role === 'user' 
                ? 'bg-purple-600 text-white rounded-br-none' 
                : 'bg-white/10 border border-white/10 text-gray-200 rounded-bl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 border border-white/10 rounded-2xl rounded-bl-none px-4 py-3">
              <div className="flex space-x-1.5">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white/5 border-t border-white/10">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            disabled={isLoading}
            className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-all disabled:opacity-50"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center hover:bg-purple-600 transition-all disabled:opacity-50"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
