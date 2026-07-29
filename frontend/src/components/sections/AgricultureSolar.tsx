"use client";

import React from 'react';
import { ArrowRight, Leaf, Droplets, Sun, CheckCircle2, ChevronRight, Calculator, Tractor, Sprout, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { usePageContent } from '@/hooks/usePageContent';
import { useLeadModal } from '@/context/LeadModalContext';

export function AgricultureSolar() {
  const { openModal } = useLeadModal();
  const content = usePageContent('HOME_AGRICULTURE', {
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop',
    title: 'Solar Water Pumps for Agriculture',
    description: 'Replace expensive diesel pumps with reliable, zero-running-cost solar water pumps. Enfinite Energy provides complete solutions from site assessment to PM-KUSUM subsidy processing.'
  });

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
          {/* Content Left */}
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-50 text-green-700 font-bold text-xs uppercase tracking-wider mb-5">
              <Sprout className="w-4 h-4" />
              <span>Agriculture Solutions</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1E3D] mb-4">
              {content.title}
            </h2>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              {content.description}
            </p>
            
            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0 text-green-600">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0A192F] text-sm mb-1">Heavy Tubewells</h4>
                  <p className="text-[13px] text-gray-500">Easily run 5HP to 10HP water pumps continuously.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0 text-orange-500">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0A192F] text-sm mb-1">Zero Diesel Cost</h4>
                  <p className="text-[13px] text-gray-500">Eliminate expensive diesel and grid dependency.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0A192F] text-sm mb-1">Low Maintenance</h4>
                  <p className="text-[13px] text-gray-500">Built tough to withstand harsh rural environments.</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => openModal('Agriculture Solar')}
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white bg-[#0A192F] hover:bg-orange-500 rounded-md transition-colors"
            >
              Explore Agri Solar
            </button>
          </div>
          
          {/* Images Right */}
          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
              <img 
                src={content.imageUrl} 
                alt="Solar Powered Tubewell and Farming" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
            
            {/* Live Action floating badge */}
            <div className="absolute left-4 right-4 md:left-auto md:right-auto md:-left-4 -bottom-6 md:-bottom-4 bg-white/95 backdrop-blur px-5 py-3 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 z-10">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <div className="text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-0.5">Live Action</div>
                <div className="font-bold text-sm text-[#0A192F]">10HP Solar Pump in village</div>
              </div>
            </div>
            
            {/* Small floating badge */}
            <div className="absolute -right-4 -top-6 bg-white px-4 py-3 rounded-xl shadow-lg border border-gray-100 hidden md:flex items-center gap-3">
              <div className="bg-orange-100 text-orange-600 p-1.5 rounded-full">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <div className="font-extrabold text-sm text-[#0A192F]">100% Off-Grid</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
