'use client';

import React from 'react';
import { Download, FileText, ArrowRight } from 'lucide-react';

export default function BrochurePage() {
  const catalogs = [
    {
      title: "Residential Solar Catalogue",
      size: "2.4 MB",
      desc: "Detailed handbook of rooftop panels, net metering setups, and state subsidy claims for households."
    },
    {
      title: "Commercial & Industrial Brochure",
      size: "4.1 MB",
      desc: "Technical guide on solar grid integration, financial ROI sheets, and structural engineering layout designs."
    },
    {
      title: "Agriculture Solar Pump Catalog",
      size: "1.8 MB",
      desc: "Product specs sheet for 5HP - 10HP DC/AC submersible water pumps and controller modules for village farms."
    }
  ];

  return (
    <div className="bg-[#FAFBFD] min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-black uppercase text-[#F5A623] tracking-widest">Downloads</span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0B1E3D] mt-1">Brochures & Product Catalogs</h1>
        <p className="text-xs text-gray-500 mt-2">Get off-line guides for systems capacities, warranty sheets, and government subsidy details.</p>
      </div>

      <div className="space-y-4">
        {catalogs.map((item, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition-all">
            <div className="p-3 bg-amber-50 rounded-xl text-[#F5A623] shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-grow min-w-0">
              <h3 className="font-extrabold text-sm sm:text-base text-[#0B1E3D] leading-tight">{item.title}</h3>
              <p className="text-[11px] sm:text-xs text-gray-400 mt-1 leading-snug">{item.desc}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-[10px] text-gray-400 font-bold">PDF Size: {item.size}</span>
                <button className="text-[11px] font-black uppercase tracking-wider text-[#F5A623] flex items-center gap-1 hover:text-[#0B1E3D] transition-colors">
                  Download <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
