'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Minus, ChevronRight, MessageCircle, Phone } from 'lucide-react';

const faqCategories = ['All', 'General', 'Subsidies & Finance', 'Installation', 'Maintenance'];

const faqs = [
  { cat: 'Subsidies & Finance', q: 'What is the PM Surya Ghar Muft Bijli Yojana subsidy amount?', a: 'Under the PM Surya Ghar scheme, residential households get ₹30,000/kW for systems up to 2 kW, and ₹18,000/kW for capacity above 2 kW up to 3 kW. The maximum subsidy is ₹78,000 for 3 kW or higher systems.' },
  { cat: 'General', q: 'How long does a typical home solar installation take in Bhabua/Mohania?', a: 'Physical installation takes 1–2 days. The complete lifecycle—including state board net-metering approvals, inspector visits, and government subsidy credit—takes roughly 15–30 days.' },
  { cat: 'General', q: 'Does solar energy work during rainy or cloudy winter days?', a: 'Yes. Solar panels generate power from ambient light, producing energy even in cloudy or rainy weather, though output reduces to 10–25% of peak capacity. Hybrid battery systems store power for seamless supply.' },
  { cat: 'Subsidies & Finance', q: 'What is net metering and is it available in South Bihar?', a: 'Net metering credits solar system owners for electricity exported to the grid. If your panels produce more than you consume, the surplus is sent to SBPDCL, reducing your monthly bill directly.' },
  { cat: 'Installation', q: 'How much roof area is needed for a 3 kW rooftop system?', a: 'A 3 kW solar system typically requires approximately 250–300 square feet (23–28 sq meters) of shadow-free roof space with good south-facing orientation for optimal energy production.' },
  { cat: 'Installation', q: 'Can I install solar panels on a rented property?', a: 'Yes, but you will need written permission from the property owner. The subsidy and net metering connection can be processed in the owner\'s name or a co-applicant arrangement with the electricity consumer number.' },
  { cat: 'Maintenance', q: 'How often do solar panels need to be cleaned?', a: 'In dusty regions like Bihar and UP, we recommend cleaning panels once every 2–4 weeks. Dust accumulation can reduce efficiency by 15–25%. Cleaning is simple—a soft cloth and water is sufficient.' },
  { cat: 'Maintenance', q: 'What is the warranty period for solar panels and inverters?', a: 'Solar panels come with a 25-year linear performance warranty and 10-year product warranty. Inverters typically carry a 5–10 year warranty depending on the brand and model selected.' },
  { cat: 'Subsidies & Finance', q: 'Can I get a loan for solar installation?', a: 'Yes. Under PM Surya Ghar, collateral-free loans are available through nationalized banks at subsidized interest rates. We help our customers with end-to-end loan documentation and bank coordination.' },
  { cat: 'General', q: 'What happens to solar panels during a power outage?', a: 'On-grid systems shut down automatically during power cuts for safety. Hybrid or off-grid systems with battery backup continue to supply power to your home even when the grid is down.' },
];

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filtered = faqs.filter(f => activeCategory === 'All' || f.cat === activeCategory);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-20">
      {/* Hero */}
      <section className="relative bg-[#0B1E3D] py-20 px-4 overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-black uppercase tracking-widest mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" /> Support Center
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-5 leading-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Questions</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Everything you need to know about solar energy, government subsidies, and working with Enfinite Energy.
          </p>
        </div>
      </section>

      {/* Category Pills */}
      <div className="sticky top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {faqCategories.map(cat => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setOpenIdx(null); }}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all border ${activeCategory === cat ? 'bg-[#0B1E3D] border-[#0B1E3D] text-white' : 'bg-white border-gray-200 text-gray-500 hover:border-amber-400 hover:text-amber-600'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-4">
          {filtered.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-amber-300 shadow-lg shadow-amber-50' : 'border-gray-100 shadow-sm hover:shadow-md'}`}>
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left gap-4"
                >
                  <div className="flex items-start gap-4">
                    <span className={`shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${isOpen ? 'bg-amber-400 text-[#0B1E3D]' : 'bg-gray-100 text-gray-500'}`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className={`text-sm sm:text-base font-black leading-snug transition-colors ${isOpen ? 'text-amber-500' : 'text-[#0B1E3D]'}`}>{faq.q}</span>
                  </div>
                  <span className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${isOpen ? 'bg-amber-400 border-amber-400 text-[#0B1E3D]' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-0 border-t border-gray-50">
                    <div className="pl-11">
                      <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-gradient-to-br from-[#0B1E3D] to-[#112e57] rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_30%_50%,#F5A623,transparent)]" />
          <MessageCircle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Still have questions?</h2>
          <p className="text-gray-300 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Our solar experts are available 6 days a week. Reach us by phone or submit a query online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+917480018007" className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#0B1E3D] font-black text-sm px-8 py-4 rounded-xl transition-all shadow-lg">
              <Phone className="w-4 h-4" /> Call +91 74800 18007
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-black text-sm px-8 py-4 rounded-xl transition-all">
              Send a Message <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
