"use client";

import React from 'react';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { useLeadModal } from '@/context/LeadModalContext';

export function CallToAction() {
  const { openModal } = useLeadModal();

  return (
    <section className="py-8 md:py-10 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Outer Container with Background Image and Gradient */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#0A192F]">
          <div className="absolute inset-0">
            <img 
              src="/images/14.png" 
              alt="Solar Panels" 
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-[#0A192F]/80"></div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 md:p-8 lg:p-10 gap-8 border border-white/5 rounded-2xl">
            
            {/* Left side */}
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-bold uppercase tracking-wider mb-4 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                Book a Consultation
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight leading-tight">
                Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-primary">Free Site Survey</span>
              </h2>
              <p className="text-gray-300 text-sm md:text-[15px] mb-6 leading-relaxed max-w-xl">
                Our certified experts will visit your location, assess your energy needs, and provide a customized solar solution.
              </p>
              <button 
                onClick={() => openModal('CONTACT')}
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transform hover:-translate-y-0.5 text-sm"
              >
                Book Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            {/* Divider */}
            <div className="hidden md:block w-px h-48 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            
            {/* Right side */}
            <div className="flex-1 max-w-sm w-full bg-yellow-500/10 backdrop-blur-md border border-yellow-500/20 p-6 rounded-xl shadow-xl">
              <h3 className="text-xl font-bold text-white mb-1.5">Need Help?</h3>
              <p className="text-gray-400 text-xs mb-5">
                Talk to our solar experts today!
              </p>
              
              <div className="space-y-4">
                <a href="tel:+919876543210" className="flex items-center gap-4 text-white hover:text-orange-400 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-orange-500/20 group-hover:text-orange-400 transition-all shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Call Us</div>
                    <div className="font-bold text-base tracking-wide">+91 98765 43210</div>
                  </div>
                </a>
                
                <a href="mailto:info@solarsmile.com" className="flex items-center gap-4 text-white hover:text-orange-400 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-orange-500/20 group-hover:text-orange-400 transition-all shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Email Us</div>
                    <div className="font-bold text-[15px] tracking-wide">info@solarsmile.com</div>
                  </div>
                </a>
                
                <a href="https://wa.me/919876543210" className="flex items-center gap-4 text-white hover:text-green-400 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-green-500/20 group-hover:text-green-400 transition-all shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">WhatsApp</div>
                    <div className="font-bold text-[15px] tracking-wide">Chat with us</div>
                  </div>
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
