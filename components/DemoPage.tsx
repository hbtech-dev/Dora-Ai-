
import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Sparkles, User } from 'lucide-react';
import { ChatMessage } from '../types';
import { generateDoraResponse } from '../services/geminiService';

interface DemoPageProps {
  onGetStarted: () => void;
}

const DemoPage: React.FC<DemoPageProps> = ({ onGetStarted }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const response = await generateDoraResponse(newMessages);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Test Drive <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Dora</span>
          </h2>
          <p className="text-xl text-gray-400">Ask anything to experience our advanced AI capabilities.</p>
        </div>

        <div className="bg-gradient-to-b from-purple-900/10 to-black border border-purple-500/30 rounded-[3rem] overflow-hidden shadow-2xl shadow-purple-500/10 flex flex-col h-[700px]">
          {/* Chat Header */}
          <div className="bg-black/50 backdrop-blur-md p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative mr-4">
                <div className="absolute inset-0 bg-purple-500 rounded-full blur-md opacity-40"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Bot className="w-7 h-7" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">Dora AI Assistant</h3>
                <div className="flex items-center text-xs text-green-400 font-medium">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Online & Learning
                </div>
              </div>
            </div>
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                   <Bot className="w-10 h-10" />
                </div>
                <div>
                  <p className="text-xl font-medium">Hello! I'm Dora.</p>
                  <p className="text-sm">How can I help you today?</p>
                </div>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`flex items-end max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'ml-3 bg-purple-600' : 'mr-3 bg-white/10 border border-white/10'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-[2rem] px-6 py-4 text-lg leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-br-none shadow-lg' 
                      : 'bg-white/10 backdrop-blur-md border border-white/10 rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start animate-in fade-in duration-300">
                 <div className="flex items-end">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center mr-3">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-[2rem] rounded-bl-none px-6 py-4">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-150"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-300"></div>
                      </div>
                    </div>
                 </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-8 bg-black/50 backdrop-blur-xl border-t border-white/10">
            <div className="flex gap-4 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message here..."
                disabled={isLoading}
                className="flex-1 bg-white/5 border border-white/20 rounded-full px-8 py-5 text-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:grayscale"
              >
                <Send className="w-7 h-7 text-white" />
              </button>
            </div>
            <p className="text-center text-gray-500 text-xs mt-4 uppercase tracking-widest font-bold">
              Powered by Dora AI Intelligence
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={onGetStarted}
            className="px-12 py-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-bold text-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition transform hover:scale-105"
          >
            Deploy This Chatbot
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
