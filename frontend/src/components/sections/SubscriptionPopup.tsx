'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, ShieldCheck, User, Phone, ChevronDown, Sun } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface SubscriptionPopupProps {
  show: boolean;
  onClose: () => void;
}

const VISIT_REASONS = [
  'Solar Subsidy / Govt. Scheme',
  'Residential Rooftop Solar',
  'Commercial / Industrial Solar',
  'Agriculture Solar Pump',
];

export function SubscriptionPopup({ show, onClose }: SubscriptionPopupProps) {
  const { width, height } = useWindowSize();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (show) {
      const t = setTimeout(() => setVisible(true), 50);
      // Lock background scroll
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty('--scroll-y', `-${scrollY}px`);
      document.body.classList.add('scroll-locked');
      return () => {
        clearTimeout(t);
        document.body.classList.remove('scroll-locked');
        document.documentElement.style.removeProperty('--scroll-y');
        window.scrollTo(0, scrollY);
      };
    } else {
      setVisible(false);
      document.body.classList.remove('scroll-locked');
    }
  }, [show]);

  if (!show) return null;

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile) return;
    
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: mobile,
          message: reason ? `Interested in: ${reason}` : 'Subscription Popup Lead',
          type: 'CONTACT'
        })
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setTimeout(() => handleClose(), 2500);
      } else {
        alert(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error, please try again.');
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center p-4 transition-all duration-300 ${
        visible ? 'bg-black/60 backdrop-blur-md' : 'bg-transparent backdrop-blur-none pointer-events-none'
      }`}
      onClick={handleClose}
    >
      {submitted && (
        <Confetti width={width} height={height} recycle={false} numberOfPieces={600} style={{ zIndex: 100, position: 'fixed' }} />
      )}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
          visible ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8'
        }`}
      >
        {/* Top gradient bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300" />

        {/* ── Close Button — inside card, top-right corner ── */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-50 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shadow hover:bg-red-50 hover:text-red-500 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        <div className="p-7">
          {submitted ? (
            /* ── Success State ── */
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-400/30">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-1">Thank You, {name}! 🙏</h3>
              <p className="text-sm text-gray-500 mb-2">Our solar expert will call you within</p>
              <p className="text-2xl font-black text-amber-500">30 Minutes</p>
              <p className="text-xs text-gray-400 mt-3">+91 74800 18007</p>
            </div>
          ) : (
            <>
              {/* ── Header ── */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 shadow-md" style={{width:'52px',height:'52px'}}>
                  <Sun className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-500">Free Callback</p>
                  <h3 className="text-lg font-extrabold text-gray-900 leading-tight">Get Solar Consultation</h3>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                Fill your details — our expert will call you <strong className="text-gray-700">within 30 minutes</strong> with a free quote.
              </p>

              {/* ── Form ── */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    required
                    type="text"
                    placeholder="Your full name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 rounded-xl text-sm text-gray-900 bg-gray-50 focus:bg-white transition-all"
                  />
                </div>

                {/* Mobile */}
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">+91</span>
                  <Phone className="absolute left-12 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    required
                    type="tel"
                    placeholder="Mobile number *"
                    value={mobile}
                    maxLength={10}
                    pattern="[6-9][0-9]{9}"
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-[4.5rem] pr-4 py-3 border border-gray-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 rounded-xl text-sm text-gray-900 bg-gray-50 focus:bg-white transition-all"
                  />
                </div>

                {/* Reason Dropdown */}
                <div className="relative">
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full pl-4 pr-9 py-3 border border-gray-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 rounded-xl text-sm text-gray-600 bg-gray-50 focus:bg-white appearance-none transition-all"
                  >
                    <option value="">Why are you visiting? (Optional)</option>
                    {VISIT_REASONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 active:scale-95 text-[#0A192F] font-black py-4 rounded-xl transition-all text-sm shadow-lg shadow-amber-400/25"
                >
                  Get Free Callback
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center justify-center gap-1.5 mt-5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[10px] text-gray-400">100% private · No spam · Unsubscribe anytime</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
