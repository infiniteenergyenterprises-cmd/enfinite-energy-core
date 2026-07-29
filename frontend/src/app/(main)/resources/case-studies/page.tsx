'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Zap, Sun, Factory, Home, Tractor, ChevronRight, ArrowRight, Award } from 'lucide-react';

const sectors = ['All', 'Residential', 'Commercial', 'Agriculture'];

const caseStudies = [
  {
    id: 1, sector: 'Commercial', tag: 'Factory — 100 kW',
    title: 'Garment Factory Cuts Energy Bill by 85% with Industrial Solar',
    location: 'Naugarh, Chandauli, UP', year: '2025',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    before: '₹2.8 Lakh/month', after: '₹42,000/month',
    metrics: [{ label: 'System Size', value: '100 kW' }, { label: 'Annual Savings', value: '₹28.5 Lakh' }, { label: 'Payback Period', value: '2.8 Years' }, { label: 'CO₂ Offset', value: '120 Ton/yr' }],
    desc: 'A large garment manufacturing unit with heavy machinery running 10 hours daily was spending ₹2.8 lakh/month on electricity. After deploying a 100 kW on-grid solar system, their bill dropped to ₹42,000 — an 85% reduction within 6 months of installation.'
  },
  {
    id: 2, sector: 'Residential', tag: 'Home — 5 kW',
    title: 'Family Home in Bhabua Achieves Zero Electricity Bill',
    location: 'Bhabua, Kaimur, Bihar', year: '2026',
    image: 'https://images.unsplash.com/photo-1509391366360-1e97f52ce23b?w=800&q=80',
    before: '₹4,200/month', after: '₹0/month',
    metrics: [{ label: 'System Size', value: '5 kW' }, { label: 'Annual Savings', value: '₹50,400' }, { label: 'Payback Period', value: '3.5 Years' }, { label: 'Subsidy Received', value: '₹78,000' }],
    desc: 'A four-member family in Bhabua with a monthly electricity bill of ₹4,200 installed a 5 kW rooftop solar system under the PM Surya Ghar scheme. After receiving ₹78,000 in government subsidy, they now generate more power than they consume and export surplus to the grid.'
  },
  {
    id: 3, sector: 'Agriculture', tag: 'Farm — 7.5 HP Pump',
    title: 'Paddy Farmer Saves ₹2.4 Lakh/Year by Eliminating Diesel',
    location: 'Mohania, Kaimur, Bihar', year: '2025',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    before: '₹20,000/month diesel', after: '₹0 fuel cost',
    metrics: [{ label: 'System Size', value: '7.5 kW' }, { label: 'Annual Savings', value: '₹2.4 Lakh' }, { label: 'Payback Period', value: '2.2 Years' }, { label: 'Diesel Saved', value: '3,600 L/yr' }],
    desc: 'A paddy farmer running a 7.5 HP diesel pump for 8 hours daily was spending ₹20,000/month on diesel. Enfinite Energy installed an off-grid solar pump system with battery backup. The farmer now irrigates freely, saving ₹2.4 lakh annually with zero recurring fuel costs.'
  },
  {
    id: 4, sector: 'Commercial', tag: 'Hotel — 25 kW',
    title: '3-Star Hotel in Varanasi Reduces Power Costs by 68%',
    location: 'Varanasi, UP', year: '2026',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    before: '₹85,000/month', after: '₹27,200/month',
    metrics: [{ label: 'System Size', value: '25 kW' }, { label: 'Annual Savings', value: '₹6.9 Lakh' }, { label: 'Payback Period', value: '3.1 Years' }, { label: 'CO₂ Offset', value: '30 Ton/yr' }],
    desc: 'A popular 3-star hotel with 40 rooms and restaurant operations was facing a monthly electricity bill of ₹85,000. After installation of a 25 kW hybrid solar system with battery backup, peak-hour grid dependency dropped to near-zero and bills fell to ₹27,200/month.'
  },
  {
    id: 5, sector: 'Residential', tag: 'Apartment — 10 kW',
    title: 'Society Apartment Block Splits Solar Cost & Savings Equitably',
    location: 'Patna, Bihar', year: '2026',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    before: '₹38,000/month common area', after: '₹6,000/month',
    metrics: [{ label: 'System Size', value: '10 kW' }, { label: 'Annual Savings', value: '₹3.8 Lakh' }, { label: 'Payback Period', value: '2.6 Years' }, { label: 'Apartments', value: '24 Units' }],
    desc: 'A 24-unit residential society in Patna running lifts, common lights, and water pumps collectively had a ₹38,000/month common electricity bill. A 10 kW rooftop system now covers 84% of common area consumption, saving over ₹3.8 lakh annually for the society.'
  },
  {
    id: 6, sector: 'Agriculture', tag: 'Cold Storage — 15 kW',
    title: 'Potato Cold Storage Powers Refrigeration 100% via Solar',
    location: 'Robertsganj, UP', year: '2025',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80',
    before: '₹55,000/month electricity', after: '₹8,000/month',
    metrics: [{ label: 'System Size', value: '15 kW' }, { label: 'Annual Savings', value: '₹5.6 Lakh' }, { label: 'Payback Period', value: '2.4 Years' }, { label: 'Grid Independence', value: '85%' }],
    desc: 'A potato cold storage facility with continuous 24/7 refrigeration was struggling with ₹55,000/month electricity costs. A 15 kW solar + battery system slashed daytime grid consumption by 100% and overall costs by 85%, making cold storage operations commercially viable.'
  },
];

const iconMap: Record<string, React.ReactNode> = {
  Residential: <Home className="w-4 h-4" />,
  Commercial: <Factory className="w-4 h-4" />,
  Agriculture: <Tractor className="w-4 h-4" />,
};

export default function CaseStudiesPage() {
  const [sector, setSector] = useState('All');
  const [expanded, setExpanded] = useState<number | null>(null);
  const filtered = caseStudies.filter(c => sector === 'All' || c.sector === sector);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-20">
      {/* Hero */}
      <section className="relative bg-[#0B1E3D] py-20 px-4 overflow-hidden text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=40')] bg-cover bg-center opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-black uppercase tracking-widest mb-5">
            <Award className="w-3.5 h-3.5" /> Proven Results
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-5 leading-tight">
            Real Projects. <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Real Savings.</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Explore documented solar installations across homes, farms, and businesses in Bihar and UP.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[{ label: 'Projects Completed', value: '500+' }, { label: 'MW Installed', value: '12 MW' }, { label: 'Avg. Annual Savings', value: '₹4.2L' }, { label: 'CO₂ Offset/yr', value: '800 Ton' }].map(s => (
            <div key={s.label}>
              <p className="text-2xl sm:text-3xl font-black text-[#0B1E3D]">{s.value}</p>
              <p className="text-xs text-gray-400 font-semibold mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="sticky top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {sectors.map(s => (
            <button key={s} onClick={() => setSector(s)} className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all border ${sector === s ? 'bg-[#0B1E3D] border-[#0B1E3D] text-white' : 'bg-white border-gray-200 text-gray-500 hover:border-amber-400 hover:text-amber-600'}`}>
              {s !== 'All' && iconMap[s]}{s}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400 font-semibold whitespace-nowrap pl-4">{filtered.length} case stud{filtered.length !== 1 ? 'ies' : 'y'}</span>
        </div>
      </div>

      {/* Case Studies Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filtered.map(cs => (
            <div key={cs.id} className="bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img src={cs.image} alt={cs.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D]/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="inline-block bg-amber-400 text-[#0B1E3D] text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg mb-2">{cs.tag}</span>
                    <p className="text-white text-xs font-semibold">{cs.location} · {cs.year}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-300 uppercase tracking-wider">Bill Reduced</p>
                    <p className="text-white font-black text-sm">{cs.before} → <span className="text-amber-400">{cs.after}</span></p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-lg font-black text-[#0B1E3D] mb-3 leading-snug group-hover:text-amber-500 transition-colors">{cs.title}</h2>

                {/* Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {cs.metrics.map(m => (
                    <div key={m.label} className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-2.5 text-center">
                      <p className="text-xs font-black text-[#0B1E3D]">{m.value}</p>
                      <p className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>

                <p className={`text-sm text-gray-500 leading-relaxed ${expanded === cs.id ? '' : 'line-clamp-2'}`}>{cs.desc}</p>
                <button onClick={() => setExpanded(expanded === cs.id ? null : cs.id)} className="mt-2 text-xs font-black text-amber-500 hover:text-amber-600 flex items-center gap-1">
                  {expanded === cs.id ? 'Show less' : 'Read full case study'} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="relative bg-[#0B1E3D] rounded-3xl p-10 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl" />
          <TrendingUp className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Want results like these?</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">Get a free site assessment and custom savings estimate for your property.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#0B1E3D] font-black text-sm px-8 py-4 rounded-xl transition-all">Get Free Assessment <ChevronRight className="w-4 h-4" /></Link>
        </div>
      </section>
    </div>
  );
}
