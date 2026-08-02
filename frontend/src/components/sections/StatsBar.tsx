'use client';

import React from 'react';
import { CheckCircle2, Zap, Users, Clock, MapPin } from 'lucide-react';

export function StatsBar() {
  const stats = [
    {
      icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
      value: "500+",
      label: "Projects Completed"
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      value: "25+ MW",
      label: "Installed Capacity"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      value: "10,000+",
      label: "Happy Customers"
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      value: "15+",
      label: "Years Experience"
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      value: "20+",
      label: "Cities Covered"
    }
  ];

  return (
    <div className="relative z-30 -mt-10 pb-8 w-full px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-[#0A192F] via-[#112240] to-[#0A192F] rounded-xl shadow-[0_15px_40px_rgba(10,25,47,0.3)] p-4 sm:p-5 border-t-2 border-primary relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-primary/10 blur-2xl rounded-full"></div>

        {/* Mobile: Horizontal scroll on 1 line, Desktop: 5-col grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-5 gap-6 sm:gap-1 sm:divide-x sm:divide-white/5 relative z-10 pb-2 sm:pb-0 hide-scrollbar">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center px-4 sm:px-1 py-2 sm:py-0 snap-center min-w-[140px] sm:min-w-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center mb-1.5 shrink-0">
                {React.cloneElement(stat.icon, { className: "w-4 h-4 sm:w-5 sm:h-5 text-primary drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]" })}
              </div>
              <div className="min-w-0">
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-white leading-tight whitespace-nowrap">{stat.value}</div>
                <div className="text-[9px] sm:text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5 leading-tight">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
