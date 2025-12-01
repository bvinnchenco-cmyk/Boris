
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Snowflake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Добро пожаловать. Готовы погрузиться в холод?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(scrollToBottom, 100);

    const responseText = await sendMessageToGemini(input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[90vw] md:w-80 bg-[#0f172a] shadow-2xl shadow-[#06b6d4]/20 rounded-none border border-[#06b6d4]/30 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#020617] p-4 flex justify-between items-center border-b border-[#06b6d4]/20">
              <div className="flex items-center gap-3">
                <Snowflake className="w-4 h-4 text-[#06b6d4] animate-pulse" />
                <h3 className="font-bold text-white text-sm tracking-widest uppercase">Гид Arctic</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors" data-hover="true">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="h-80 overflow-y-auto p-4 space-y-4 bg-[#0f172a]"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 text-sm ${
                      msg.role === 'user'
                        ? 'bg-[#06b6d4] text-[#020617] font-medium skew-x-[-5deg]'
                        : 'bg-white/5 text-slate-200 border border-white/10 skew-x-[-5deg]'
                    }`}
                  >
                    <div className="skew-x-[5deg]">{msg.text}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 skew-x-[-5deg] border border-white/10 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#06b6d4] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#06b6d4] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#06b6d4] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 bg-[#020617] border-t border-[#06b6d4]/20">
              <div className="flex gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend();
                  }}
                  placeholder="Спросите о восстановлении..."
                  className="flex-1 bg-[#0f172a] text-white placeholder-slate-500 text-sm focus:outline-none border border-white/10 px-4 py-2 focus:border-[#06b6d4] transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-[#06b6d4] p-2 hover:bg-[#0891b2] transition-colors disabled:opacity-50 text-[#020617]"
                  data-hover="true"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#06b6d4] flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] z-50 text-[#020617]"
        data-hover="true"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;
