'use client';
import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, RefreshCw, Globe, Flag, Building2 } from 'lucide-react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface RssArticle {
  id?: string;
  title: string;
  summary: string;
  image: string;
  link: string;
  time: string;
  source: string;
  tag: string;
  category: string;
}

interface CompanyNewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  image: string;
  link: string;
  time: string;
}

// Fallback static news (shown while loading or if API fails)
const FALLBACK: RssArticle[] = [
  {
    title: 'Solar Subsidy Update 2024',
    summary: 'New government solar subsidy scheme announced. Get up to 40% subsidy on rooftop solar systems under PM Surya Ghar Yojana.',
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=800&q=80',
    link: '/news', time: '2 hours ago', source: 'Enfinite Energy', tag: 'India', category: 'India News',
  },
  {
    title: 'Solar Awareness Camp — Lucknow',
    summary: 'We conducted a solar awareness camp in Lucknow to educate people about solar energy benefits and savings.',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=800&q=80',
    link: '/news', time: '1 day ago', source: 'Enfinite Energy', tag: 'India', category: 'India News',
  },
  {
    title: 'Renewable Energy Expo 2024',
    summary: 'Participated in Renewable Energy Expo 2024, Delhi. Great response from visitors, businesses and policy makers.',
    image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80',
    link: '/news', time: '3 days ago', source: 'Enfinite Energy', tag: 'Global', category: 'Industry News',
  },
  {
    title: 'India Solar Capacity Crosses 80 GW',
    summary: 'India achieves a major milestone in its renewable energy journey as installed solar capacity crosses 80 GW mark.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    link: '/news', time: '5 days ago', source: 'Mercom India', tag: 'India', category: 'India News',
  },
];

const TAG_STYLE: Record<string, string> = {
  India:   'bg-orange-50 text-orange-600 border-orange-200',
  Global:  'bg-blue-50   text-blue-600   border-blue-200',
  Company: 'bg-amber-50  text-amber-600  border-amber-200',
};

export function NewsAndEvents() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [articles, setArticles]       = useState<RssArticle[]>(FALLBACK);
  const [companyNews, setCompanyNews] = useState<CompanyNewsItem[]>([]);
  const [loading, setLoading]         = useState(true);
  const [lastUpdate, setLastUpdate]   = useState('');
  const [activeTab, setActiveTab]     = useState<'All' | 'India' | 'Global' | 'Company'>('All');

  const fetchNews = async (force = false) => {
    setLoading(true);
    try {
      const [rssRes, cnRes] = await Promise.allSettled([
        fetch(`${API}/api/rss/solar${force ? '?refresh=1' : ''}`).then(r => r.json()),
        fetch(`${API}/api/company-news`).then(r => r.json()),
      ]);
      if (rssRes.status === 'fulfilled' && rssRes.value.status === 'success' && rssRes.value.data?.length) {
        setArticles(rssRes.value.data);
        setLastUpdate(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
      }
      if (cnRes.status === 'fulfilled' && cnRes.value.status === 'success' && cnRes.value.data?.length) {
        setCompanyNews(cnRes.value.data);
      }
    } catch { /* keep fallback */ }
    setLoading(false);
  };

  // Fetch on mount + auto-refresh every 30 min
  useEffect(() => {
    fetchNews();
    const timer = setInterval(() => fetchNews(), 30 * 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const filtered = activeTab === 'All'
    ? articles
    : activeTab === 'Company'
      ? [] // company news shown separately
      : articles.filter(a => a.tag === activeTab);

  // For company tab, show company news as RssArticle shape
  const displayItems: RssArticle[] = activeTab === 'Company'
    ? companyNews.map(c => ({
        id: c.id, title: c.title, summary: c.summary || '',
        image: c.image || '/17.png', link: c.link || '/news',
        time: c.time || '', source: c.source || 'Enfinite Energy',
        tag: 'Company', category: c.category || 'Company News',
      }))
    : filtered;

  const scroll = (dir: 'left' | 'right') =>
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -400 : 400, behavior: 'smooth' });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
      <style dangerouslySetInnerHTML={{__html:`
        .news-scroll::-webkit-scrollbar { display:none; }
        .news-scroll { -ms-overflow-style:none; scrollbar-width:none; }
      `}} />

      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-xs font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live Updates · Refreshes every 30 min
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A192F] mb-2 tracking-tight">
              Latest News &amp; Events
            </h2>
            <p className="text-gray-500 text-base">
              Stay updated with the latest from Enfinite Energy &amp; the solar industry
              {lastUpdate && <span className="ml-2 text-xs text-gray-400">· Updated {lastUpdate}</span>}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Filter tabs */}
            <div className="flex rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm text-sm font-bold">
              {(['All', 'India', 'Global', 'Company'] as const).map(tab => (
                <button key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 transition-colors flex items-center gap-1.5 ${
                    activeTab === tab
                      ? 'bg-[#0A192F] text-white'
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}>
                  {tab === 'India'   && <Flag    className="w-3 h-3" />}
                  {tab === 'Global'  && <Globe   className="w-3 h-3" />}
                  {tab === 'Company' && <Building2 className="w-3 h-3" />}
                  {tab}
                  {tab === 'Company' && companyNews.length > 0 && (
                    <span className="bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">{companyNews.length}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Refresh */}
            <button onClick={() => fetchNews(true)} disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-amber-600 hover:border-amber-300 text-sm font-bold transition-all shadow-sm disabled:opacity-50">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>

            <Link href="/news"
              className="hidden sm:flex group items-center gap-2 text-sm font-bold text-amber-600 bg-amber-50 hover:bg-amber-500 hover:text-white px-5 py-2 rounded-full transition-all border border-amber-200">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ── Cards scroll ── */}
        {loading && articles === FALLBACK ? (
          /* skeleton */
          <div className="flex gap-6 overflow-hidden pb-2">
            {[1,2,3].map(i => (
              <div key={i} className="flex-shrink-0 w-[85vw] sm:w-[350px] md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.33rem)] bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                <div className="h-52 bg-gray-100" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                  <div className="h-5 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="news-scroll flex gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          >
            {(displayItems.length ? displayItems : articles).map((item, i) => (
              <a
                key={item.id || i}
                href={item.link}
                target={item.link.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="flex-shrink-0 snap-center w-[85vw] sm:w-[350px] md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.33rem)] group bg-white rounded-2xl overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <span className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${TAG_STYLE[item.tag] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                    {item.tag === 'India' ? '🇮🇳 India' : '🌐 Global'}
                  </span>
                  <img
                    src={item.image || '/17.png'}
                    alt={item.title}
                    onError={e => { (e.currentTarget as HTMLImageElement).src = '/17.png'; }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate max-w-[60%]">{item.source}</span>
                    <span className="flex items-center gap-1 text-[10px] text-gray-400 font-semibold whitespace-nowrap">
                      <CalendarDays className="w-3 h-3 text-amber-500" />{item.time}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-[#0A192F] mb-2 leading-snug group-hover:text-amber-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
                    {item.summary}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0A192F] group-hover:text-amber-600 transition-colors">
                    Read Article
                    <span className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-amber-50 transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Mobile — View All */}
        <div className="mt-4 text-center sm:hidden">
          <Link href="/news"
            className="inline-flex group items-center gap-2 text-sm font-bold text-amber-600 bg-amber-50 hover:bg-amber-500 hover:text-white px-5 py-2.5 rounded-full transition-all border border-amber-200">
            View All Updates <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
