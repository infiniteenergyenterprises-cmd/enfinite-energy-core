

'use client';

import React from 'react';
import Link from 'next/link';
import { Download, Eye, FileText, Sun, Zap, Home, Factory, Tractor, ChevronRight, Shield, Star } from 'lucide-react';

const brochures = [
  {
    id: 1,
    title: 'Residential Solar Solutions',
    subtitle: 'Complete Guide for Home Owners',
    desc: 'Everything you need to know about installing rooftop solar at your home — system types, sizing guide, subsidy details, and EMI options.',
    pages: '24 Pages', size: '3.2 MB', icon: <Home className="w-6 h-6" />,
    color: 'from-amber-400 to-orange-500',
    tags: ['PM Surya Ghar', 'Net Metering', 'Battery Backup'],
    cover: 'https://images.unsplash.com/photo-1509391366360-1e97f52ce23b?w=600&q=80',
  },
  {
    id: 2,
    title: 'Commercial & Industrial Solar',
    subtitle: 'For Businesses, Factories & Offices',
    desc: 'ROI analysis, power purchase agreements, utility-scale system configurations, and case studies from our 100+ commercial installations.',
    pages: '32 Pages', size: '5.1 MB', icon: <Factory className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-600',
    tags: ['ROI Analysis', 'Load Assessment', 'Grid Tie'],
    cover: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  },
  {
    id: 3,
    title: 'Agriculture Solar Pumps',
    subtitle: 'Solar Irrigation for Farmers',
    desc: 'Comparison of diesel vs solar pumps, pump sizing for different crops, PMKUSUM scheme benefits, and real farmer savings data from Kaimur district.',
    pages: '18 Pages', size: '2.8 MB', icon: <Tractor className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-600',
    tags: ['PMKUSUM', 'Diesel Savings', 'Irrigation Guide'],
    cover: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
  },
  {
    id: 4,
    title: 'Government Subsidy Guide 2026',
    subtitle: 'PM Surya Ghar & MNRE Schemes',
    desc: 'Step-by-step documentation guide for all government solar subsidies applicable in Bihar and UP, including bank loan subsidy and state-level incentives.',
    pages: '20 Pages', size: '2.4 MB', icon: <Shield className="w-6 h-6" />,
    color: 'from-purple-500 to-violet-600',
    tags: ['₹78,000 Subsidy', 'Bank Loan', 'SBPDCL'],
    cover: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&q=80',
  },
  {
    id: 5,
    title: 'Product Catalog 2026',
    subtitle: 'Panels, Inverters & Batteries',
    desc: 'Technical specifications of all solar panels, string inverters, microinverters, and lithium battery systems we install. Includes brand comparison chart.',
    pages: '40 Pages', size: '8.7 MB', icon: <Zap className="w-6 h-6" />,
    color: 'from-rose-500 to-pink-600',
    tags: ['Tier-1 Panels', 'Inverters', 'Battery Systems'],
    cover: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80',
  },
  {
    id: 6,
    title: 'Company Profile',
    subtitle: 'About Enfinite Energy',
    desc: 'Our story, mission, team credentials, completed projects map, certifications, and why 500+ customers trust Enfinite Energy for their solar journey.',
    pages: '16 Pages', size: '4.2 MB', icon: <Star className="w-6 h-6" />,
    color: 'from-cyan-500 to-sky-600',
    tags: ['500+ Projects', 'MNRE Certified', 'Team'],
    cover: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80',
  },
];

export default function BrochurePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-20">
      {/* Hero */}
      <section className="relative bg-[#0B1E3D] py-20 px-4 overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-black uppercase tracking-widest mb-5">
            <FileText className="w-3.5 h-3.5" /> Download Center
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-5 leading-tight">
            Brochures & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Catalogs</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Download our product brochures, subsidy guides, and company profile — all in high-quality PDF format.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-10">
          {[{ v: '6', l: 'Brochures Available' }, { v: '1,200+', l: 'Downloads This Month' }, { v: 'Free', l: 'No Registration Required' }].map(s => (
            <div key={s.l} className="text-center">
              <p className="text-2xl font-black text-[#0B1E3D]">{s.v}</p>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Brochure Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {brochures.map(b => (
            <div key={b.id} className="bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group flex flex-col">
              {/* Cover Image with gradient overlay */}
              <div className="relative h-48 overflow-hidden">
                <img src={b.cover} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className={`absolute inset-0 bg-gradient-to-br ${b.color} opacity-75`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 border border-white/30">
                    {b.icon}
                  </div>
                  <h3 className="text-lg font-black leading-tight">{b.title}</h3>
                  <p className="text-white/80 text-xs mt-1">{b.subtitle}</p>
                </div>
                {/* Meta badge */}
                <div className="absolute top-4 right-4 flex flex-col gap-1.5 items-end">
                  <span className="bg-black/30 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-white/10">{b.pages}</span>
                  <span className="bg-black/30 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-white/10">{b.size}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{b.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {b.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-gray-500">{tag}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-auto flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-[#0B1E3D] hover:bg-[#112e57] text-white font-black text-xs py-3 rounded-xl transition-all">
                    <Download className="w-4 h-4" /> Download PDF
                  </button>
                  <button className="flex items-center justify-center gap-2 border border-gray-200 hover:border-amber-400 hover:text-amber-500 text-gray-500 font-black text-xs px-4 py-3 rounded-xl transition-all">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Request CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="relative bg-gradient-to-br from-[#0B1E3D] to-[#112e57] rounded-3xl p-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl" />
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <Sun className="w-10 h-10 text-amber-400 mb-4" />
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Need a Custom Proposal?</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Get a personalized project report including site assessment, system design, savings projection, and detailed ROI calculation — completely free.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a href="tel:+917480018007" className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#0B1E3D] font-black text-sm px-8 py-4 rounded-xl transition-all">
                Call for Custom Report
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-black text-sm px-8 py-4 rounded-xl transition-all">
                Request Online <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

