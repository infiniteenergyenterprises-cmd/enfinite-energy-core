"use client";

import React from 'react';
import { Flame, ArrowRight, Rss } from 'lucide-react';
import Link from 'next/link';

export function BreakingNews() {
  // In a real app, this would fetch from an RSS feed.
  // We mock the live RSS feed with dummy data.
  const breakingNews = [
    { source: "PV MAGAZINE", time: "2 min ago", title: "India Adds 3.2 GW Solar Capacity in April 2025" },
    { source: "SOLARPOWER EUROPE", time: "10 min ago", title: "European Solar Market Grows 23% in Q1 2025" },
    { source: "RENEWABLE ENERGY WORLD", time: "15 min ago", title: "Global Solar Installations to Surpass 500 GW in 2025" },
    { source: "CLEAN TECHNICA", time: "20 min ago", title: "New Perovskite Solar Cells Achieve 26% Efficiency" },
  ];

  return (
    <div className="bg-white border-b border-gray-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-12 text-sm">
        <div className="flex items-center gap-2 font-bold text-red-600 shrink-0 pr-6 border-r border-gray-200 z-10 bg-white shadow-[10px_0_10px_-10px_rgba(0,0,0,0.1)]">
          <Flame className="w-4 h-4 fill-current animate-pulse" />
          BREAKING NEWS
          <span className="bg-red-100 text-red-600 text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">Live</span>
        </div>
        
        {/* Marquee Container */}
        <div className="flex-grow overflow-hidden relative flex items-center">
          <div className="whitespace-nowrap animate-marquee flex gap-12 pl-12">
            {breakingNews.map((news, idx) => (
              <div key={idx} className="inline-flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">{news.source}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span className="text-gray-900 font-medium hover:text-primary cursor-pointer transition-colors">
                  {news.title}
                </span>
                <span className="text-xs text-gray-400">({news.time})</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="shrink-0 pl-6 border-l border-gray-200 hidden md:flex">
          <button className="text-xs font-bold text-gray-500 hover:text-primary flex items-center gap-1 transition-colors">
            View All <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
