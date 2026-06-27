"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Cpu, User } from "lucide-react";

const mockConvo = [
  { role: "assistant", content: "Hi! I'm your ScureScan AI Copilot. How can I help you secure your application today?" },
];

export function AICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(mockConvo);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let aiResponse = "I can help analyze vulnerabilities or suggest remediation steps. Please provide a CVE or describe a security issue.";
      
      const lowerInput = userMsg.content.toLowerCase();
      if (lowerInput.includes("score")) {
        aiResponse = "Your security score is calculated based on open vulnerabilities, historical data, and best practice compliance (like HSTS and CSP headers).";
      } else if (lowerInput.includes("fix") || lowerInput.includes("vulnerability") || lowerInput.includes("xss")) {
        aiResponse = "To fix an XSS vulnerability, you must sanitize user input before reflecting it back to the browser. I can generate a code patch if you tell me your framework (e.g. React, Angular, plain HTML).";
      } else if (lowerInput.includes("thank")) {
        aiResponse = "You're welcome! Stay secure out there.";
      }

      setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
    }, 1500);
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-neon rounded-full flex items-center justify-center text-jet shadow-[0_0_20px_rgba(0,255,136,0.5)] z-50 hover:scale-110 transition-transform"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-dark/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl z-50 flex flex-col overflow-hidden"
          >
            <div className="p-4 bg-jet border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-neon/10 rounded-lg text-neon">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-semibold leading-tight">Security Copilot</h3>
                  <p className="text-xs text-neon flex items-center gap-1"><span className="w-1.5 h-1.5 bg-neon rounded-full animate-pulse"/> Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 h-80 overflow-y-auto flex flex-col gap-4">
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx} 
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-white/10 text-white' : 'bg-neon/10 text-neon'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-white/10 text-white rounded-tr-sm' : 'bg-jet border border-white/5 text-gray-300 rounded-tl-sm shadow-md'}`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center bg-neon/10 text-neon">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="p-4 rounded-2xl bg-jet border border-white/5 flex gap-1 items-center rounded-tl-sm">
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-neon/50 rounded-full" />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-neon/50 rounded-full" />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-neon/50 rounded-full" />
                  </div>
                </div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            <form onSubmit={handleSend} className="p-3 border-t border-white/5 bg-jet flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about vulnerabilities..."
                className="flex-grow bg-dark border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="p-2 bg-neon rounded-lg text-jet disabled:opacity-50 disabled:bg-gray-600 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
