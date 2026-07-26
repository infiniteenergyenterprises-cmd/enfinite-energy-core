'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function CaseStudiesPage() {
  const cases = [
    {
      title: "5kW On-Grid Villa System",
      loc: "Lucknow, Uttar Pradesh",
      cap: "5 kW",
      save: "₹62,000 / year",
      img: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&q=80",
      desc: "Residential solar rooftop integration for a 4-bedroom villa. Reduced monthly electricity bill by 92% and offers smart app monitoring."
    },
    {
      title: "100kW Factory Rooftop Setup",
      loc: "Indore, Madhya Pradesh",
      cap: "100 kW",
      save: "₹12,50,000 / year",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      desc: "Commercial setup engineered to handle day-time commercial loads, optimizing power tariff and diesel gen-set displacement."
    },
    {
      title: "10HP Solar Pump Village Project",
      loc: "Kaimur, Bihar",
      cap: "10 HP",
      save: "Zero Fuel Cost",
      img: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80",
      desc: "An off-grid high-discharge solar water pumping system empowering village farmers with clean, free daytime tubewell irrigation."
    }
  ];

  return (
    <div className="bg-[#FAFBFD] min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-black uppercase text-[#F5A623] tracking-widest">Case Studies</span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0B1E3D] mt-1">Solar Implementation Studies</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cases.map((c, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all">
            <div className="h-44 bg-gray-200 overflow-hidden relative">
              <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase mb-2">
                  <MapPin className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>{c.loc}</span>
                </div>
                <h3 className="font-extrabold text-base text-[#0B1E3D] mb-2 leading-tight">{c.title}</h3>
                <p className="text-[11.5px] text-gray-500 mb-4">{c.desc}</p>
              </div>
              <div className="pt-3 border-t border-gray-50 flex items-center justify-between text-xs font-bold">
                <span className="text-[#F5A623]">Capacity: {c.cap}</span>
                <span className="text-emerald-600">Savings: {c.save}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
