'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft, Calendar, User, Share2, Clock, Eye, Tag,
  Bookmark, ThumbsUp, MessageCircle, ChevronRight, Sun,
  Zap, Shield, TrendingUp, Phone
} from 'lucide-react';

// ── Article data (matches news page IDs) ──────────────────────────────────────
const ARTICLES: Record<string, any> = {
  '1': {
    id: '1',
    category: 'New Project',
    source: 'Enfinite Energy',
    date: 'May 25, 2025',
    readTime: '4 min read',
    views: '2.1K',
    title: '500kW Solar Plant Commissioned in Lucknow',
    subtitle: 'Another milestone towards our mission of clean energy for all.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
    author: { name: 'Enfinite PR Team', role: 'Official Updates', avatar: '/LOGO.png' },
    tags: ['Solar Energy', 'Lucknow', 'Industrial', '500kW', 'Clean Tech'],
    content: [
      {
        type: 'lead',
        text: 'Enfinite Energy is proud to announce the successful commissioning of a 500kW solar plant in Lucknow — marking one of the largest rooftop solar installations in Uttar Pradesh.'
      },
      {
        type: 'para',
        text: 'The facility, installed on the rooftop of a large manufacturing unit in the Gomti Nagar Industrial Area, will generate approximately 7.2 lakh units of clean electricity annually, displacing over 600 tonnes of CO₂ emissions every year.'
      },
      {
        type: 'heading',
        text: 'Project Highlights'
      },
      {
        type: 'bullets',
        items: [
          'Total Installed Capacity: 500 kW DC / 480 kW AC',
          'Annual Energy Generation: ~7,20,000 kWh',
          'Annual CO₂ Offset: 600+ tonnes',
          'Panels Used: 1,000 × 500W Tier-1 Bifacial Modules',
          'Inverter: 3-phase string inverters with monitoring',
          'Project Completion Time: 22 working days',
        ]
      },
      {
        type: 'quote',
        text: '"This installation is a testament to what is possible when technology, policy and determination align. We are proud to deliver clean energy at scale." — CEO, Enfinite Energy'
      },
      {
        type: 'para',
        text: 'The project was executed under the PM Surya Ghar Muft Bijli Yojana framework and is expected to deliver a full return on investment within 3.2 years, after which the client will save approximately ₹55 lakh per year on electricity costs.'
      },
      {
        type: 'heading',
        text: 'What This Means for Businesses'
      },
      {
        type: 'para',
        text: 'With electricity tariffs for industrial consumers averaging ₹8–10/unit in UP, solar energy at ₹2.5–3/unit provides a decisive cost advantage. Enfinite Energy has now delivered over 12 MW of commissioned capacity across Bihar, UP and Rajasthan.'
      },
    ]
  },
  '2': {
    id: '2',
    category: 'Award',
    source: 'Enfinite Energy',
    date: 'May 20, 2025',
    readTime: '3 min read',
    views: '3.4K',
    title: 'Enfinite Energy Wins Green Excellence Award 2025',
    subtitle: 'Honored for outstanding contribution to renewable energy sector.',
    image: '/17.png',
    author: { name: 'Enfinite PR Team', role: 'Official Updates', avatar: '/LOGO.png' },
    tags: ['Award', 'Green Energy', 'Recognition', 'MNRE', 'Excellence'],
    content: [
      {
        type: 'lead',
        text: 'Enfinite Energy has been honoured with the prestigious Green Excellence Award 2025 at the National Renewable Energy Summit held in New Delhi.'
      },
      {
        type: 'para',
        text: 'The award recognises outstanding contributions in clean energy adoption, technical excellence, and community impact in India\'s solar sector. Enfinite Energy was selected from over 200 nominees across the country.'
      },
      {
        type: 'quote',
        text: '"This recognition belongs to every customer who chose clean energy, every engineer who delivered quality, and every team member who believed in our mission." — Founder, Enfinite Energy'
      },
      {
        type: 'heading',
        text: 'Award Criteria'
      },
      {
        type: 'bullets',
        items: [
          'Total solar capacity deployed in FY 2024–25',
          'Customer satisfaction and post-installation support',
          'Contribution to PM Surya Ghar Yojana targets',
          'Environmental impact and CO₂ reduction metrics',
          'Innovation in solar design and financing solutions',
        ]
      },
    ]
  },
  '3': {
    id: '3',
    category: 'Partnership',
    source: 'Enfinite Energy',
    date: 'May 18, 2025',
    readTime: '3 min read',
    views: '1.8K',
    title: 'Strategic Partnership with Leading Solar Inverter Brand',
    subtitle: 'Partnership to deliver advanced solar solutions across India.',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1600&q=80',
    author: { name: 'Enfinite PR Team', role: 'Official Updates', avatar: '/LOGO.png' },
    tags: ['Partnership', 'Inverter', 'Technology', 'Distribution', 'B2B'],
    content: [
      {
        type: 'lead',
        text: 'Enfinite Energy has signed a strategic distribution and installation partnership with one of India\'s top solar inverter manufacturers, enabling faster delivery and better after-sales support for all customers.'
      },
      {
        type: 'para',
        text: 'The partnership covers authorised distribution, warranty management, and service support across Bihar, Uttar Pradesh, Jharkhand and Madhya Pradesh — regions where Enfinite Energy is rapidly expanding.'
      },
      {
        type: 'heading', text: 'Key Benefits for Customers'
      },
      {
        type: 'bullets',
        items: [
          'Faster spare part availability and on-site service',
          'Extended warranty support up to 10 years',
          'Remote monitoring via cloud dashboard included',
          'Genuine product authentication and certification',
          'Priority technical support hotline',
        ]
      },
    ]
  },
  '4': {
    id: '4',
    category: 'CSR',
    source: 'Enfinite Energy',
    date: 'May 15, 2025',
    readTime: '2 min read',
    views: '5.2K',
    title: 'Tree Plantation Drive Across 5 States',
    subtitle: 'Our commitment towards a greener and sustainable future.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80',
    author: { name: 'CSR Team', role: 'Corporate Responsibility', avatar: '/LOGO.png' },
    tags: ['CSR', 'Environment', 'Trees', 'Community', 'Green India'],
    content: [
      {
        type: 'lead',
        text: 'As part of our annual CSR commitment, the Enfinite Energy team planted 5,000 trees across 5 states on World Environment Day — reinforcing that solar is only one part of our commitment to the planet.'
      },
      {
        type: 'para',
        text: 'Volunteers from our regional offices participated in plantation drives in Bihar, UP, Rajasthan, Madhya Pradesh and Maharashtra, partnering with local NGOs and school students.'
      },
      {
        type: 'bullets',
        items: [
          '5,000 saplings planted across 5 states',
          '300+ employee and student volunteers',
          'Partnership with 12 local NGOs',
          'Species selected for native biodiversity support',
          'GPS-tagged trees for 3-year survival tracking',
        ]
      },
    ]
  },
};

const RELATED = [
  { id: '1', title: '500kW Solar Plant Commissioned in Lucknow', category: 'New Project', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80' },
  { id: '2', title: 'Enfinite Energy Wins Green Excellence Award 2025', category: 'Award', image: '/17.png' },
  { id: '3', title: 'Strategic Partnership with Leading Inverter Brand', category: 'Partnership', image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&q=80' },
];

export default function NewsDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id ?? '1';
  const article = ARTICLES[id] ?? ARTICLES['1'];
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(142);

  const handleLike = () => {
    setLiked(p => !p);
    setLikes(p => liked ? p - 1 : p + 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: article.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">

      {/* ── Hero Banner ───────────────────────────────────────────────────── */}
      <div className="relative h-[55vh] min-h-[380px] max-h-[520px] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E3D] via-[#0B1E3D]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3D]/40 to-transparent" />

        {/* Back button — below navbar (navbar is h-20 = 80px, so pt-24) */}
        <div className="absolute top-24 left-0 right-0 z-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full font-bold text-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back to News
            </Link>
          </div>
        </div>

        {/* Hero text overlay */}
        <div className="absolute bottom-0 left-0 right-0 pb-8 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <span className="inline-block bg-amber-400 text-[#0B1E3D] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg mb-3">
              {article.category}
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-3 max-w-3xl">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/60 text-xs font-bold">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-amber-400" />{article.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-amber-400" />{article.readTime}</span>
              <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-amber-400" />{article.views} views</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Main Article */}
          <article className="flex-1 min-w-0">

            {/* Author + actions bar */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <img src={article.author.avatar} alt={article.author.name} className="w-11 h-11 rounded-full object-cover border-2 border-amber-400/30 bg-gray-100" />
                <div>
                  <p className="font-black text-[#0B1E3D] text-sm">{article.author.name}</p>
                  <p className="text-xs text-gray-400 font-semibold">{article.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleLike} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-black transition-all ${liked ? 'bg-amber-50 border-amber-300 text-amber-600' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-amber-300'}`}>
                  <ThumbsUp className="w-3.5 h-3.5" />{likes}
                </button>
                <button onClick={() => setSaved(p => !p)} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-black transition-all ${saved ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-blue-300'}`}>
                  <Bookmark className="w-3.5 h-3.5" />{saved ? 'Saved' : 'Save'}
                </button>
                <button onClick={handleShare} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-400 text-xs font-black transition-all">
                  <Share2 className="w-3.5 h-3.5" />Share
                </button>
              </div>
            </div>

            {/* Article body */}
            <div className="space-y-5">
              {article.content.map((block: any, i: number) => {
                if (block.type === 'lead') return (
                  <p key={i} className="text-lg sm:text-xl text-[#0B1E3D] font-semibold leading-relaxed border-l-4 border-amber-400 pl-5 py-1">
                    {block.text}
                  </p>
                );
                if (block.type === 'para') return (
                  <p key={i} className="text-base text-gray-600 leading-relaxed">{block.text}</p>
                );
                if (block.type === 'heading') return (
                  <h2 key={i} className="text-xl sm:text-2xl font-black text-[#0B1E3D] mt-8 mb-2">{block.text}</h2>
                );
                if (block.type === 'quote') return (
                  <blockquote key={i} className="bg-[#0B1E3D]/5 border-l-4 border-amber-400 px-6 py-5 rounded-r-2xl">
                    <p className="text-base italic text-[#0B1E3D] font-medium leading-relaxed">{block.text}</p>
                  </blockquote>
                );
                if (block.type === 'bullets') return (
                  <ul key={i} className="space-y-2.5">
                    {block.items.map((item: string, j: number) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0 mt-0.5">
                          <ChevronRight className="w-3 h-3 text-amber-600" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                );
                return null;
              })}
            </div>

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap gap-2">
              {article.tags.map((tag: string) => (
                <span key={tag} className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-amber-50 hover:text-amber-600 text-gray-500 rounded-xl text-xs font-bold cursor-pointer transition-colors">
                  <Tag className="w-3 h-3" />#{tag}
                </span>
              ))}
            </div>
          </article>

          {/* ── Sidebar ──────────────────────────────────────────────────── */}
          <aside className="lg:w-72 shrink-0 space-y-6">

            {/* CTA Card */}
            <div className="bg-[#0B1E3D] rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl" />
              <Sun className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-base font-black mb-2">Get a Free Solar Quote</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">Our expert will call you within 30 minutes with a custom savings estimate.</p>
              <a href="tel:+917480018007" className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#0B1E3D] font-black text-xs py-3 rounded-xl transition-all">
                <Phone className="w-3.5 h-3.5" /> Call +91 74800 18007
              </a>
              <Link href="/contact" className="mt-2 w-full flex items-center justify-center text-xs text-white/50 hover:text-white font-semibold py-2 transition-colors">
                Or send a message →
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
              <p className="text-xs font-black text-gray-400 uppercase tracking-wider">Enfinite At a Glance</p>
              {[
                { icon: <Zap className="w-4 h-4 text-amber-400" />, label: '12 MW+ Installed' },
                { icon: <Shield className="w-4 h-4 text-green-500" />, label: 'MNRE Approved' },
                { icon: <TrendingUp className="w-4 h-4 text-blue-500" />, label: '500+ Projects Done' },
                { icon: <Sun className="w-4 h-4 text-orange-400" />, label: '25 yr Warranty' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-3 text-sm font-semibold text-[#0B1E3D]">
                  {s.icon}{s.label}
                </div>
              ))}
            </div>

            {/* Related Articles */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-4">Related Articles</p>
              <div className="space-y-4">
                {RELATED.filter(r => r.id !== id).map(r => (
                  <Link key={r.id} href={`/news/${r.id}`} className="flex gap-3 group">
                    <img src={r.image} alt={r.title} className="w-14 h-14 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform" />
                    <div className="min-w-0">
                      <p className="text-[9px] font-black text-amber-500 uppercase tracking-wider mb-0.5">{r.category}</p>
                      <p className="text-xs font-bold text-[#0B1E3D] group-hover:text-amber-500 transition-colors leading-snug line-clamp-2">{r.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
