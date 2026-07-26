"use client";

import React from 'react';
import { Button } from '../ui/Button';
import { CheckCircle2, Award, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { useLeadModal } from '@/context/LeadModalContext';

export function HeroSection() {
  const { openModal } = useLeadModal();

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105 animate-slow-zoom"
        style={{ 
          backgroundImage: 'url("/hero-bg.png")',
          backgroundPosition: '50% 30%'
        }}
      ></div>
      
      {/* Deep Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-[#0A192F]/40 mix-blend-multiply"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0A192F]/90 via-[#0A192F]/60 to-transparent"></div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Content */}
        <div className="w-full lg:w-3/5 text-left space-y-8 py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium text-gray-200 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Empowering India with Clean Energy
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Future-Proof Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-orange-500">
              Energy Independence
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl font-light leading-relaxed">
            Premium solar infrastructure for residential, commercial, and industrial setups. Lower your bills and elevate your sustainability with intelligent, high-efficiency solar systems.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
            <Button onClick={() => openModal('CONTACT')} size="lg" className="bg-gradient-to-r from-primary to-orange-500 text-[#0A192F] font-bold text-lg px-8 hover:scale-105 transition-transform duration-300 border-none shadow-[0_0_20px_rgba(245,158,11,0.4)] group">
              Get Your Free Quote
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link href="/solutions">
              <Button size="lg" variant="outline" className="bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white/10 hover:border-white/40 text-lg px-8 transition-all">
                Explore Solutions
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-12 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-gray-300">Govt.<br/>Approved</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-gray-300">25 Years<br/>Warranty</span>
            </div>
            <div className="flex items-center gap-3 hidden sm:flex">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-gray-300">High<br/>Efficiency</span>
            </div>
          </div>
        </div>

        {/* Right Content - Glassmorphism Card */}
        <div className="hidden lg:block w-full lg:w-1/3 lg:max-w-sm ml-auto">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-blue/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-1">Instant Savings Estimate</h3>
              <p className="text-gray-300 mb-5 text-xs">Find out how much you can save on your electricity bill.</p>
              
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Monthly Bill</label>
                  <div className="mt-1 flex items-center border border-white/20 rounded-lg bg-white/5 overflow-hidden focus-within:border-primary transition-colors">
                    <span className="pl-3 text-gray-400 font-medium text-sm">₹</span>
                    <input type="number" placeholder="Enter amount" className="w-full bg-transparent text-white p-2.5 text-sm outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Property Type</label>
                  <select className="mt-1 w-full border border-white/20 rounded-lg bg-[#0A192F]/50 text-white p-2.5 text-sm outline-none appearance-none focus:border-primary transition-colors">
                    <option>Residential Home</option>
                    <option>Commercial Office</option>
                    <option>Industrial Factory</option>
                  </select>
                </div>
                
                <Button className="w-full mt-3 bg-white text-[#0A192F] hover:bg-gray-100 font-bold py-5 text-sm group">
                  Calculate Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
