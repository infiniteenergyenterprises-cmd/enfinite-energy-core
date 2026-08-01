"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../ui/Button';
import { CheckCircle2, ShieldCheck, ArrowRight, Zap, ChevronLeft, ChevronRight, Loader2, CheckCheck } from 'lucide-react';
import Link from 'next/link';
import { useLeadModal } from '@/context/LeadModalContext';
import { usePageContent } from '@/hooks/usePageContent';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

// ── Hero Calculator Card ──────────────────────────────────────────────────────
function HeroCalculatorCard() {
  const { width, height } = useWindowSize();
  const [bill, setBill] = useState('');
  const [propType, setPropType] = useState('Residential Home');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleCalc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bill) return;
    setSubmitting(true);
    try {
      await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: phone ? `Hero Calculator — ${phone}` : 'Hero Calculator User',
          email: '',
          phone: phone || '',
          message: `Monthly Bill: ₹${bill} | Property: ${propType}`,
          type: 'QUOTE',
        }),
      });
      setDone(true);
    } catch (_) {}
    finally { setSubmitting(false); }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      {done && (
        <Confetti width={width} height={height} recycle={false} numberOfPieces={600} style={{ zIndex: 100, position: 'fixed', top: 0, left: 0 }} />
      )}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-blue/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-1">Instant Savings Estimate</h3>
        <p className="text-gray-300 mb-5 text-xs">Find out how much you can save on your electricity bill.</p>

        {done ? (
          <div className="flex flex-col items-center justify-center py-6 text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-amber-400/20 flex items-center justify-center">
              <CheckCheck className="w-7 h-7 text-amber-400" />
            </div>
            <p className="text-white font-bold">Request Sent!</p>
            <p className="text-gray-400 text-xs">Our expert will call you with your savings estimate shortly.</p>
            <button onClick={() => { setDone(false); setBill(''); setPhone(''); }} className="text-xs text-amber-400 font-bold hover:text-amber-300 mt-1">Calculate Again</button>
          </div>
        ) : (
          <form onSubmit={handleCalc} className="space-y-3">
            <div>
              <label className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Monthly Bill</label>
              <div className="mt-1 flex items-center border border-white/20 rounded-lg bg-white/5 overflow-hidden focus-within:border-primary transition-colors">
                <span className="pl-3 text-gray-400 font-medium text-sm">₹</span>
                <input required type="number" placeholder="Enter amount" value={bill} onChange={e => setBill(e.target.value)}
                  className="w-full bg-transparent text-white p-2.5 text-sm outline-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Property Type</label>
              <select value={propType} onChange={e => setPropType(e.target.value)}
                className="mt-1 w-full border border-white/20 rounded-lg bg-[#0A192F]/80 text-white p-2.5 text-sm outline-none appearance-none focus:border-primary transition-colors">
                <option>Residential Home</option>
                <option>Commercial Office</option>
                <option>Industrial Factory</option>
                <option>Agriculture / Farm</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Your Mobile (optional)</label>
              <input type="tel" maxLength={10} placeholder="+91 XXXXX XXXXX" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                className="mt-1 w-full border border-white/20 rounded-lg bg-white/5 text-white p-2.5 text-sm outline-none focus:border-primary transition-colors placeholder-gray-500" />
            </div>
            <button type="submit" disabled={submitting || !bill}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-110 text-[#0A192F] font-black py-3 rounded-xl text-sm transition-all shadow-lg shadow-amber-400/25 disabled:opacity-50 active:scale-[0.98]">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ArrowRight className="w-4 h-4" />Calculate Now</>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function HeroSection() {
  const { openModal } = useLeadModal();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Text overlay managed in a single central place
  const heroText = usePageContent('HOME_HERO_TEXT', {
    title: 'Transforming India with Smart Solar Solutions',
    description: 'Empowering homes, businesses, and agriculture with MNRE-approved, high-efficiency solar systems. Join the clean energy revolution.'
  });

  const slide1 = usePageContent('HOME_HERO_1', { imageUrl: '/hero-bg.png' });
  const slide2 = usePageContent('HOME_HERO_2', { imageUrl: 'https://images.unsplash.com/photo-1509391366360-1e97f52ce23b?w=1600&q=80' });
  const slide3 = usePageContent('HOME_HERO_3', { imageUrl: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=1600&q=80' });
  const slide4 = usePageContent('HOME_HERO_4', { imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80' });
  const slide5 = usePageContent('HOME_HERO_5', { imageUrl: '' });
  const slide6 = usePageContent('HOME_HERO_6', { imageUrl: '' });
  const slide7 = usePageContent('HOME_HERO_7', { imageUrl: '' });

  // Filter out slides that don't have an image set to avoid blank screens
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6, slide7].filter(s => s.imageUrl && s.imageUrl.trim() !== '');

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveSlide(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((activeSlide + 1) % slides.length);
  }, [activeSlide, slides.length, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((activeSlide - 1 + slides.length) % slides.length);
  }, [activeSlide, slides.length, goToSlide]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const current = slides[activeSlide];

  return (
    <section className="relative min-h-[100svh] flex items-center pt-24 overflow-hidden">

      {/* Background Images — all preloaded, only active one visible */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
          style={{
            backgroundImage: `url("${slide.imageUrl}")`,
            backgroundPosition: '50% 30%',
            opacity: idx === activeSlide ? 1 : 0,
          }}
        />
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-black/30" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0A192F] via-[#0A192F]/70 to-transparent" />

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

        {/* Left Content */}
        <div className="w-full lg:w-3/5 text-left space-y-6 sm:space-y-8 pt-4 pb-10 sm:pt-6 sm:pb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm font-medium text-gray-200 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Empowering India with Clean Energy
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight text-center lg:text-left drop-shadow-2xl animate-fade-in"
          >
            {heroText.title}
          </h1>

          <p
            className="text-base sm:text-lg text-gray-200 max-w-xl mx-auto lg:mx-0 text-center lg:text-left leading-relaxed drop-shadow-md animate-fade-in"
          >
            {heroText.description}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Button
              onClick={() => openModal('CONTACT')}
              size="lg"
              className="bg-gradient-to-r from-primary to-orange-500 text-[#0A192F] font-bold text-base sm:text-lg px-6 sm:px-8 hover:scale-105 transition-transform duration-300 border-none shadow-[0_0_20px_rgba(245,158,11,0.4)] group justify-center"
            >
              Get Your Free Quote
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link href="/solutions" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white/10 hover:border-white/40 text-base sm:text-lg px-6 sm:px-8 transition-all justify-center"
              >
                Explore Solutions
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 sm:pt-12 border-t border-white/10">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-300">Govt.<br />Approved</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-300">25 Years<br />Warranty</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-300">High<br />Efficiency</span>
            </div>
          </div>

        </div>

        {/* Right — Glassmorphism Card */}
        <div className="hidden lg:block w-full lg:w-1/3 lg:max-w-sm ml-auto">
          <HeroCalculatorCard />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-white/10">
        <div
          className="h-full bg-primary transition-none"
          style={{
            animation: 'hero-progress 5s linear infinite',
            width: '100%',
            transformOrigin: 'left',
          }}
          key={activeSlide}
        />
      </div>

      <style jsx>{`
        @keyframes hero-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}
