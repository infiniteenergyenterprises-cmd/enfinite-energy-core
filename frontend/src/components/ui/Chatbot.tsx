"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

type Message = {
  id: string;
  text: string;
  sender: "bot" | "user";
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    text: "Hello! Welcome to Enfinite Energy. How can I help you with your solar needs today?",
    sender: "bot",
  },
];

const QUICK_OPTIONS = [
  "PM Surya Ghar Yojana",
  "Residential Solar Setup",
  "Commercial Solar Setup",
  "Solar Pricing & Quote",
  "Maintenance & Service",
  "Contact Support Team"
];

import { usePathname } from "next/navigation";

export function Chatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  
  // Hide chatbot on admin routes
  if (pathname?.startsWith("/admin")) return null;
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent, overrideText?: string) => {
    if (e) e.preventDefault();
    
    const textToSend = overrideText || input;
    if (!textToSend.trim() || isLoading) return;

    const userText = textToSend.trim();
    const userMsg: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: "user",
    };

    const currentHistory = [...messages];
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    if (userText === "Contact Support Team") {
      setTimeout(() => {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: "You can contact our administration and support team directly by emailing us at contact@enfiniteenergy.com or by calling our official helpline.",
          sender: "bot",
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsLoading(false);
      }, 500);
      return;
    }

    const userMessageCount = currentHistory.filter(m => m.sender === 'user').length;
    if (userMessageCount >= 4) {
      setTimeout(() => {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: "It seems you have a lot of detailed questions! To get the best support, please contact our administrator at contact@enfinite.energy or call our helpline.",
          sender: "bot",
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsLoading(false);
      }, 800);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, history: currentHistory }),
      });

      if (!response.ok) {
        throw new Error("API responded with an error");
      }

      const data = await response.json();
      const replyText = data.data?.text || "Sorry, I am having trouble answering that right now.";

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: replyText,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Apologies, I encountered an error connecting to our servers. Please try again later.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-[350px] h-[450px] flex flex-col mb-4 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-[#1B2F4C] text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0B1E3D] rounded-full flex items-center justify-center overflow-hidden border border-[#0B1E3D]">
                <Image src="/chatbot.png" alt="Bot" width={32} height={32} className="object-cover w-full h-full" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Solar Assistant</h3>
                <p className="text-xs text-gray-300">Online</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto overscroll-contain bg-gray-50 flex flex-col gap-3">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-2 max-w-[85%] ${
                  msg.sender === "user" ? "self-end flex-row-reverse" : "self-start"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center overflow-hidden shrink-0 mt-1 ${
                  msg.sender === "user" ? "bg-[#1B2F4C]" : "bg-[#0B1E3D] border border-[#0B1E3D]"
                }`}>
                  {msg.sender === "user" ? (
                    <User size={14} className="text-white" />
                  ) : (
                    <Image src="/chatbot.png" alt="Bot" width={24} height={24} className="object-cover w-full h-full" />
                  )}
                </div>
                <div className={`p-3 rounded-2xl text-sm ${
                  msg.sender === "user" 
                    ? "bg-[#1B2F4C] text-white rounded-tr-none" 
                    : "bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Quick Options for first interaction */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 max-w-[90%] self-start ml-9">
                {QUICK_OPTIONS.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(undefined, option)}
                    className="text-xs px-3 py-1.5 bg-white border border-[#FCA311] text-[#1B2F4C] rounded-full hover:bg-[#FCA311] hover:text-white transition-colors text-left"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex gap-2 max-w-[85%] self-start animate-pulse">
                <div className="w-6 h-6 rounded-full bg-[#0B1E3D] border border-[#0B1E3D] flex items-center justify-center overflow-hidden shrink-0 mt-1">
                  <Image src="/chatbot.png" alt="Bot" width={24} height={24} className="object-cover w-full h-full" />
                </div>
                <div className="p-3 rounded-2xl text-sm bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-200">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#1B2F4C] focus:ring-1 focus:ring-[#1B2F4C] text-sm text-gray-800"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-[#FCA311] hover:bg-[#e5940f] text-white p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-[#0B1E3D] hover:bg-[#1B2F4C] rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 group relative border border-[#0B1E3D] p-1"
        >
          <div className="w-full h-full rounded-full overflow-hidden">
            <Image src="/chatbot.png" alt="Chatbot" width={56} height={56} className="object-cover w-full h-full" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FCA311] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#FCA311]"></span>
          </span>
        </button>
      )}
    </div>
  );
}
