'use client';

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function FaqsPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is the PM Surya Ghar Muft Bijli Yojana subsidy amount?",
      a: "Under the new PM Surya Ghar scheme, residential households get a subsidy of ₹30,000 per kW for solar plants up to 2 kW capacity, and an additional ₹18,000 per kW for capacities above 2 kW up to 3 kW. The maximum subsidy stands at ₹78,000 for systems of 3 kW or higher."
    },
    {
      q: "How long does a typical home solar installation take in Bhabua/Mohania?",
      a: "The physical installation of panels, mounting frames, and wiring takes 1 to 2 days. However, the complete lifecycle—including state board net-metering approvals, inspector visits, and government subsidy credit—takes roughly 15 to 30 days."
    },
    {
      q: "Does solar energy work during rainy or cloudy winter days?",
      a: "Yes, solar panels generate power from ambient light, meaning they produce energy even in cloudy or rainy weather, though output is reduced to about 10%–25% of their peak capacity."
    },
    {
      q: "What is net metering and is it available in South Bihar?",
      a: "Net metering is a billing mechanism that credits solar system owners for the electricity they add to the grid. Excess power generated during the day is exported to SBPDCL, reducing your monthly bill."
    }
  ];

  return (
    <div className="bg-[#FAFBFD] min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-black uppercase text-[#F5A623] tracking-widest">Support Center</span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0B1E3D] mt-1">Frequently Asked Questions</h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isActive = activeFaq === idx;
          return (
            <div key={idx} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden transition-all duration-300">
              <button
                onClick={() => setActiveFaq(isActive ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-black text-[#0B1E3D] hover:bg-gray-50/50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-[#F5A623] shrink-0" />
                  {faq.q}
                </span>
                <span className="p-1 rounded-lg bg-gray-50 border border-gray-100 text-[#0A192F] shrink-0 ml-4">
                  {isActive ? <Minus className="w-4 h-4 text-[#F5A623]" /> : <Plus className="w-4 h-4 text-[#F5A623]" />}
                </span>
              </button>
              {isActive && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-500 leading-relaxed border-t border-gray-50 bg-[#FAFBFD]/30">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
