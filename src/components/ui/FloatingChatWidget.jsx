import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Search } from 'lucide-react';

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(() => {
    return sessionStorage.getItem('chatWidgetOpen') === 'true';
  });

  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem('chatWidgetMessages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing chat messages:", e);
      }
    }
    return [{ id: 1, text: "Thank you for visiting! How can we help you today?", isBot: true }];
  });

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    sessionStorage.setItem('chatWidgetMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    sessionStorage.setItem('chatWidgetOpen', isOpen);
  }, [isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const newMsg = { id: Date.now(), text: inputValue, isBot: false };
    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Thanks for reaching out! Our team will get back to you soon. Feel free to explore our website in the meantime.",
          isBot: true
        }
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-primary text-white rounded-full shadow-[0_4px_20px_rgba(244, 123, 32, 0.35)] hover:bg-primary/90 transition-transform duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] bg-bg border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-900"
          >
            {/* Header */}
            <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 text-primary border border-primary/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="text-black font-semibold">UANDWE Support</h3>
                  <p className="text-neutral-500 text-xs font-normal">We typically reply in a few minutes</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-black transition-colors p-2"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent bg-bg">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm font-normal leading-relaxed ${msg.isBot
                      ? 'bg-gray-100 text-neutral-800 rounded-tl-none'
                      : 'bg-primary text-neutral-900 rounded-tr-none'
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-gray-50 border-t border-gray-200 relative">
              <div className="relative flex items-center">
                <Search size={18} className="absolute left-3 text-neutral-400" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Search or ask a question..."
                  className="w-full bg-bg border border-gray-200 rounded-full py-3 pl-10 pr-12 text-black text-sm font-normal focus:outline-none focus:border-primary transition-colors shadow-sm"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="absolute right-2 p-2 text-primary hover:text-primary/80 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
