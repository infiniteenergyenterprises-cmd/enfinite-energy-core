"use client";

import React from 'react';
import { ShieldCheck, Zap, Sun, ArrowRight, IndianRupee } from 'lucide-react';
import { useLeadModal } from '@/context/LeadModalContext';
import { usePageContent } from '@/hooks/usePageContent';

export function SuryaGharScheme() {
  const { openModal } = useLeadModal();
  
  const content = usePageContent('HOME_SURYA_GHAR', {
    title: 'PM Surya Ghar Muft Bijli Yojana',
    description: 'Transform your rooftop into a power plant. The government is covering up to 40% of the installation cost. Join millions of Indians moving towards a sustainable and zero-bill future.',
    imageUrl: '/pm.png'
  });

  const benefits = [
    {
      title: "Up to ₹78,000 Subsidy",
      description: "Direct bank transfer from the government for systems up to 3kW.",
      icon: <IndianRupee className="w-6 h-6 text-amber-500" />
    },
    {
      title: "Zero Electricity Bill",
      description: "Generate your own power and say goodbye to monthly electricity costs.",
      icon: <Zap className="w-6 h-6 text-amber-500" />
    },
    {
      title: "MNRE Approved",
      description: "We are an authorized vendor ensuring a hassle-free process.",
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />
    }
  ];

  return (
    <section className="py-12 lg:py-8 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl relative overflow-hidden text-white shadow-2xl p-6 lg:p-8">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-10 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-10 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 mb-2">
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Government Initiative</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight py-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500">{content.title}</span> 
            </h2>
            
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              {content.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 hover:bg-slate-700/50 hover:border-amber-500/30 transition-all duration-300 shadow-xl flex items-start gap-4">
                  <div className="bg-amber-500/10 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-amber-500/20">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1 text-white">{benefit.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button onClick={() => openModal('PM_SURYA_GHAR')} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-lg hover:shadow-orange-500/25 hover:scale-105 transition-all duration-300">
                Check Your Eligibility <ArrowRight className="w-5 h-5" />
              </button>
              <a href="tel:+917480018007" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-lg transition-all duration-300">
                Get Expert Help
              </a>
            </div>
          </div>

          {/* Right Image/Visual */}
          <div className="lg:w-1/2 w-full mt-8 lg:mt-0 relative pb-16 lg:pb-0">
            <div className="relative rounded-3xl shadow-2xl border border-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10 rounded-3xl pointer-events-none"></div>
              {/* Using a placeholder aesthetic image showing solar panels on an Indian home */}
              <img 
                src={content.imageUrl} 
                alt={content.title} 
                className="w-full h-[250px] sm:h-[350px] object-cover rounded-3xl"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-8 left-4 right-4 sm:-bottom-12 sm:left-6 sm:right-6 z-20 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl py-3 px-4 sm:py-4 sm:px-6 shadow-2xl">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] sm:text-sm text-amber-400 font-bold uppercase tracking-wider mb-1">Maximum Subsidy</p>
                    <p className="text-xl sm:text-3xl md:text-4xl font-black text-white">₹78,000</p>
                  </div>
                  <div className="text-right border-l border-white/10 pl-4 sm:pl-6">
                    <p className="text-[10px] sm:text-sm text-slate-300 font-medium mb-1">System Size</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">3kW</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
