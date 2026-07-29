'use client';

import React, { useState, useEffect } from 'react';
import { X, Sun, ArrowRight, Zap, IndianRupee, Shield, Star } from 'lucide-react';

interface SuryaGharPopupProps {
  onClose: () => void;
}

export function SuryaGharPopup({ onClose }: SuryaGharPopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    // Reliable scroll lock: save current scroll pos, apply fixed class
    const scrollY = window.scrollY;
    document.documentElement.style.setProperty('--scroll-y', `-${scrollY}px`);
    document.body.classList.add('scroll-locked');
    return () => {
      clearTimeout(t);
      document.body.classList.remove('scroll-locked');
      document.documentElement.style.removeProperty('--scroll-y');
      window.scrollTo(0, scrollY);
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const benefits = [
    { icon: <IndianRupee className="w-3.5 h-3.5" />, label: 'Subsidy', value: 'Up to ₹78,000', color: 'text-amber-400' },
    { icon: <Zap className="w-3.5 h-3.5" />, label: 'Savings', value: 'Zero electricity bill', color: 'text-blue-400' },
    { icon: <Shield className="w-3.5 h-3.5" />, label: 'Authority', value: 'MNRE Approved', color: 'text-green-400' },
    { icon: <Star className="w-3.5 h-3.5" />, label: 'Service', value: 'Free site survey', color: 'text-purple-400' },
  ];

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-300 ${
        visible ? 'bg-black/75 backdrop-blur-md' : 'bg-transparent backdrop-blur-none pointer-events-none'
      }`}
      onClick={handleClose}
    >
      {/* Popup Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-[380px] rounded-2xl shadow-2xl transition-all duration-300 ${
          visible ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8'
        }`}
        style={{ background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2940 50%, #0D1B2A 100%)' }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 z-50 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5 text-gray-700" />
        </button>

        {/* India Tricolor top bar */}
        <div className="h-1.5 w-full rounded-t-2xl overflow-hidden flex">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#138808]" />
        </div>

        <div className="p-6">
          {/* Govt Badges */}
          <div className="flex items-center gap-2 mb-5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-[9px] font-black uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Government of India
            </div>
            <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-500/15 border border-green-400/30 text-green-300 text-[9px] font-black uppercase tracking-widest">
              MNRE Approved
            </div>
          </div>

          {/* Hero */}
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-xl"
              style={{ background: 'linear-gradient(135deg, #FF9933, #f59e0b)' }}>
              <Sun className="w-7 h-7 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-amber-400 text-[11px] font-black uppercase tracking-wider leading-tight">
                PM Surya Ghar Muft Bijli Yojana
              </p>
              <h2 className="text-2xl font-extrabold text-white leading-tight">
                Get Solar <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">100% electricity Free*</span>
              </h2>
              <p className="text-gray-400 text-[10px]">Govt pays up to 40% — you save lakhs</p>
            </div>
          </div>

          {/* Benefit Cards Grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl px-3 py-3">
                <span className={`${b.color} mb-1 block`}>{b.icon}</span>
                <p className="text-[8px] text-gray-500 uppercase tracking-wider font-bold">{b.label}</p>
                <p className="text-xs text-white font-bold mt-0.5">{b.value}</p>
              </div>
            ))}
          </div>

          {/* Subsidy Highlight */}
          <div className="rounded-xl px-4 py-4 mb-5 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(249,115,22,0.10))' }}>
            <div className="absolute inset-0 border border-amber-400/20 rounded-xl" />
            <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Direct Bank Transfer Subsidy</p>
            <p className="text-3xl font-black text-amber-300">₹78,000</p>
            <p className="text-[10px] text-gray-500">for a 3 kW residential system</p>
          </div>

          {/* CTAs */}
          <div className="flex gap-2">
            <button
              onClick={handleClose}
              className="flex-1 flex items-center justify-center gap-2 font-black py-3 rounded-xl text-sm transition-all shadow-lg active:scale-95"
              style={{ background: 'linear-gradient(135deg, #FF9933, #f59e0b)', color: '#0D1B2A' }}
            >
              Check Eligibility
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleClose}
              className="px-5 bg-white/8 hover:bg-white/12 border border-white/10 text-white/70 hover:text-white font-semibold rounded-xl transition-all text-sm active:scale-95"
            >
              Later
            </button>
          </div>

          <p className="text-center text-[9px] text-gray-600 mt-3">
            *Subject to govt. approval · T&C apply
          </p>
        </div>
      </div>
    </div>
  );
}
