'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, Calendar, Clock, ArrowRight, ChevronRight,
  Rss, Globe, RefreshCw, Wifi, WifiOff, ExternalLink, Tag,
  TrendingUp, Zap, Sun, Leaf
} from 'lucide-react';

// ── Static local articles ─────────────────────────────────────────────────────
const LOCAL_ARTICLES = [
  {
    id: 'local-1',
    title: 'How to Claim PM Surya Ghar Subsidy in Kaimur & Bhabua Districts',
    tag: 'Govt Subsidies', source: 'Enfinite Team',
    date: 'July 24, 2026',
    image: '/bloggg.png',
    desc: 'Step-by-step documentation guide for claiming the national solar rooftop subsidy. Special insights for village residents of Kaimur, Mohania, and Bhabua.',
    link: '#', isLocal: true,
  },
  {
    id: 'local-2',
    title: 'Rooftop Solar Regulations: Net Metering Rules in Bihar for 2026',
    tag: 'Govt Subsidies', source: 'Enfinite Team',
    date: 'July 18, 2026',
    image: 'https://images.unsplash.com/photo-1548168063-87c1e7a9c70d?w=800&q=80',
    desc: 'Understanding SBPDCL guidelines for solar grid synchronization, export credits, and electricity bill savings.',
    link: '#', isLocal: true,
  },
  {
    id: 'local-3',
    title: 'Solar vs. Diesel Tubewells: A Guide for Farmers in Mohania',
    tag: 'Solar Guides', source: 'Enfinite Team',
    date: 'July 12, 2026',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45249ff78?w=800&q=80',
    desc: 'A mathematical breakdown comparing 5HP diesel pumps against off-grid solar-powered irrigation pumps. Calculate your payback period in under 2 years.',
    link: '#', isLocal: true,
  },
  {
    id: 'local-4',
    title: 'A Clean Step-by-Step Rooftop Solar Installation Process',
    tag: 'Installation', source: 'Enfinite Team',
    date: 'June 29, 2026',
    image: 'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&q=80',
    desc: 'What happens during structural engineering, panel mounting, electrical wiring, and net meter provisioning? Here is what to expect from our installers.',
    link: '#', isLocal: true,
  },
];

// Solar panel specific fallback images
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1509391366360-1e97f52ce23b?w=800&q=80', // rooftop solar panels
  'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&q=80', // solar farm field
  'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80', // solar panel close up
  'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80', // solar panels sky
  'https://images.unsplash.com/photo-1621905251189-08b45249ff78?w=800&q=80', // solar installation worker
  'https://images.unsplash.com/photo-1548168063-87c1e7a9c70d?w=800&q=80', // solar panels on roof
  'https://images.unsplash.com/photo-1587613753048-9cc30f6dbd49?w=800&q=80', // solar energy
  'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&q=80', // solar panels residential
];

const TABS = ['All', 'Local Articles', 'Industry News', 'India', 'Tech'] as const;
type Tab = typeof TABS[number];

interface Article {
  id: string;
  title: string;
  desc: string;
  link: string;
  date: string;
  source: string;
  tag: string;
  image: string | null;
  isLocal?: boolean;
}

function timeAgo(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<Tab>('All');
  const [liveArticles, setLiveArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false); // false — local articles turant dikhenge
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchFeed = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    // Don't set loading=true on initial fetch — show local articles immediately
    setError(false);
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/rss/solar');
      const data = await res.json();
      if (data.status === 'success') {
        setLiveArticles(data.data || []);
        setLastUpdated(new Date());
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchFeed(); }, []);

  // Merge local + live
  const allArticles: Article[] = [
    ...LOCAL_ARTICLES,
    ...liveArticles.map((a, i) => ({
      ...a,
      image: a.image || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
    })),
  ];

  const filtered = allArticles.filter(a => {
    const matchTab =
      tab === 'All' ||
      (tab === 'Local Articles' && a.isLocal) ||
      (!a.isLocal && a.tag === tab);
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.desc.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0B1E3D] pt-32 pb-20 px-4 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509391366360-1e97f52ce23b?w=1600&q=30')] bg-cover bg-center opacity-10" />
        {/* Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-black uppercase tracking-widest mb-6">
            <Rss className="w-3.5 h-3.5" />
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live Solar News Feed
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-5 leading-[1.05] tracking-tight">
            Solar <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500">Knowledge</span> Hub
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Local expert guides + live solar industry news from top global & Indian publications — updated every 15 minutes.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/10 focus-within:ring-2 focus-within:ring-amber-400/50 transition-all">
            <Search className="w-5 h-5 text-gray-400 ml-4 shrink-0" />
            <input
              type="text"
              placeholder="Search solar news, guides, subsidies..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 px-3 py-4 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent font-medium"
            />
            {search && (
              <button onClick={() => setSearch('')} className="pr-4 text-xs text-gray-400 hover:text-gray-600 font-bold">Clear</button>
            )}
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-10">
            {[
              { icon: <Globe className="w-4 h-4" />, label: '5 Live Sources' },
              { icon: <Zap className="w-4 h-4" />, label: 'Updated Every 15 min' },
              { icon: <Sun className="w-4 h-4" />, label: '4 Expert Guides' },
              { icon: <Leaf className="w-4 h-4" />, label: 'India Focused' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2 text-amber-300/80 text-xs font-bold uppercase tracking-wider">
                {s.icon}{s.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sticky Tab Bar ───────────────────────────────────────────────── */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all border ${
                tab === t
                  ? 'bg-[#0B1E3D] border-[#0B1E3D] text-white shadow-md'
                  : 'bg-white border-gray-200 text-gray-500 hover:border-amber-400 hover:text-amber-600'
              }`}
            >
              {t}
            </button>
          ))}

          {/* Right side: live status + refresh */}
          <div className="ml-auto flex items-center gap-3 pl-4 shrink-0">
            {loading ? (
              <span className="flex items-center gap-1.5 text-[10px] text-amber-500 font-black uppercase"><RefreshCw className="w-3 h-3 animate-spin" />Loading</span>
            ) : error ? (
              <span className="flex items-center gap-1.5 text-[10px] text-red-400 font-black uppercase"><WifiOff className="w-3 h-3" />Offline</span>
            ) : (
              <span className="flex items-center gap-1.5 text-[10px] text-green-500 font-black uppercase"><Wifi className="w-3 h-3" />Live</span>
            )}
            <button
              onClick={() => fetchFeed(true)}
              disabled={refreshing}
              className="flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-amber-500 font-black uppercase transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            {lastUpdated && (
              <span className="text-[10px] text-gray-300 font-semibold hidden sm:block">
                Updated {timeAgo(lastUpdated.toISOString())}
              </span>
            )}
            <span className="text-[10px] text-gray-400 font-semibold whitespace-nowrap">
              {filtered.length} article{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* ── Error Banner ─────────────────────────────────────────────────── */}
      {error && !loading && (
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-center gap-3 text-sm">
            <WifiOff className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <span className="font-black text-amber-700">Live feed unavailable</span>
              <span className="text-amber-600 ml-2">— showing local articles. Make sure the backend server is running.</span>
            </div>
            <button onClick={() => fetchFeed()} className="ml-auto text-xs font-black text-amber-600 hover:text-amber-700 bg-amber-100 px-3 py-1.5 rounded-lg">Retry</button>
          </div>
        </div>
      )}

      {/* ── Loading Skeleton — only for live feed, shown below local articles ── */}
      {loading && liveArticles.length === 0 && tab !== 'Local Articles' && (
        <section className="max-w-7xl mx-auto px-4 pb-8">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
            <RefreshCw className="w-3 h-3 animate-spin text-amber-400" /> Loading live solar news...
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-3xl overflow-hidden animate-pulse">
                <div className="h-52 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-5 bg-gray-200 rounded w-5/6" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Main Feed ─────────────────────────────────────────────────────── */}
      {filtered.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">

          {/* Featured Article */}
          {featured && (
            <a
              href={featured.link}
              target={featured.isLocal ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="group block mb-10 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row min-h-[280px]">
                <div className="relative w-full lg:w-1/2 h-64 sm:h-72 lg:h-auto lg:min-h-[280px] overflow-hidden shrink-0 bg-gray-200">
                  <img
                    src={featured.image || FALLBACK_IMAGES[0]}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={e => { (e.target as HTMLImageElement).src = FALLBACK_IMAGES[0]; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3D]/60 via-transparent to-transparent lg:block hidden" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-amber-400 text-[#0B1E3D] text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg">{featured.tag}</span>
                    {!featured.isLocal && (
                      <span className="bg-green-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />Live
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-4">
                    <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-amber-400" />{featured.source}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-amber-400" />{timeAgo(featured.date)}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E3D] leading-snug mb-4 group-hover:text-amber-500 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-6">{featured.desc}</p>
                  <div className="flex items-center gap-2 text-sm font-black text-[#0B1E3D] group-hover:text-amber-500 transition-colors">
                    {featured.isLocal ? 'Read Article' : 'Read on Source'} <ArrowRight className="w-4 h-4" />
                    {!featured.isLocal && <ExternalLink className="w-3.5 h-3.5 opacity-60" />}
                  </div>
                </div>
              </div>
            </a>
          )}

          {/* Article Grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((article) => (
                <a
                  key={article.id}
                  href={article.link}
                  target={article.isLocal ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="group bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Image */}
                  <div className="h-52 bg-gray-100 overflow-hidden relative shrink-0">
                    <span className="absolute top-4 left-4 z-10 bg-[#0B1E3D] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg">
                      {article.tag}
                    </span>
                    {!article.isLocal && (
                      <span className="absolute top-4 right-4 z-10 bg-green-500/90 text-white text-[9px] font-black px-2 py-1 rounded-lg flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-white animate-pulse" />Live
                      </span>
                    )}
                    <img
                      src={article.image || FALLBACK_IMAGES[0]}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={e => { (e.target as HTMLImageElement).src = FALLBACK_IMAGES[0]; }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-3 border-b border-gray-50 pb-3">
                      <span className="flex items-center gap-1 truncate"><Globe className="w-3 h-3 text-amber-400 shrink-0" />{article.source}</span>
                      <span className="shrink-0">·</span>
                      <span className="shrink-0">{timeAgo(article.date)}</span>
                    </div>
                    <h3 className="text-base font-black text-[#0B1E3D] leading-snug mb-3 group-hover:text-amber-500 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4 flex-1">{article.desc}</p>
                    <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
                      <span className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
                        <Tag className="w-3 h-3 text-amber-400" />{article.tag}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-black text-[#0B1E3D] group-hover:text-amber-500 transition-colors">
                        {article.isLocal ? 'Read' : 'Visit Source'}
                        <ArrowRight className="w-3.5 h-3.5" />
                        {!article.isLocal && <ExternalLink className="w-3 h-3 opacity-50" />}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── Empty State ───────────────────────────────────────────────────── */}
      {!loading && filtered.length === 0 && (
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="bg-white border border-gray-100 rounded-3xl p-16 shadow-sm">
            <Search className="w-14 h-14 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 text-lg font-semibold mb-2">No articles found</p>
            <p className="text-gray-300 text-sm">Try a different search term or category</p>
            <button onClick={() => { setSearch(''); setTab('All'); }} className="mt-6 text-xs font-black text-amber-500 hover:text-amber-600 bg-amber-50 px-5 py-2.5 rounded-xl transition-colors">
              Clear Filters
            </button>
          </div>
        </section>
      )}

      {/* ── Live Sources Banner ───────────────────────────────────────────── */}
      <section className="bg-white border-t border-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-5 flex items-center justify-center gap-2">
            <Rss className="w-4 h-4 text-amber-400" /> Live Feed Sources
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['PV Magazine', 'Solar Power World', 'CleanTechnica', 'Mercom India', 'Solar Quarter'].map(s => (
              <span key={s} className="bg-gray-50 border border-gray-200 text-gray-600 text-xs font-bold px-4 py-2 rounded-xl">
                {s}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-4">Content belongs to respective publishers. Enfinite Energy aggregates public RSS feeds for educational purposes.</p>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="relative bg-[#0B1E3D] rounded-3xl p-10 sm:p-14 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />
          <TrendingUp className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Have a Solar Question?</h2>
          <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Our experts are ready to answer. Get a free consultation call within 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+917480018007" className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#0B1E3D] font-black text-sm px-8 py-4 rounded-xl transition-all shadow-lg">
              Call Our Expert
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-black text-sm px-8 py-4 rounded-xl transition-all">
              Get Free Quote <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
