"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, Users, Calendar, LayoutGrid, Building2, Briefcase, 
  Landmark, LineChart, Cpu, PlayCircle, Mail, MapPin, ExternalLink, Rss 
} from 'lucide-react';
import Link from 'next/link';

// Import newly created components
import { BreakingNews } from '@/components/news/BreakingNews';
import { NewsCard } from '@/components/news/NewsCard';
import { EventCard } from '@/components/news/EventCard';
import { MarketUpdateWidget } from '@/components/news/MarketUpdateWidget';
import { GovernmentSchemes } from '@/components/news/GovernmentSchemes';

export default function NewsAndEventsPage() {
  const [activeCategory, setActiveCategory] = useState('All Updates');
  const [searchQuery, setSearchQuery] = useState('');
  const [liveNews, setLiveNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('http://localhost:5000/api/news/live');
        const data = await res.json();
        if (data.success) {
          setLiveNews(data.news);
        }
      } catch (err) {
        console.error('Failed to fetch live news:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNews();
  }, []);

  const filterCategories = [
    { name: 'All Updates', icon: <LayoutGrid className="w-4 h-4" /> },
    { name: 'Industry News', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Company News', icon: <Building2 className="w-4 h-4" /> },
    { name: 'Events', icon: <Calendar className="w-4 h-4" /> },
    { name: 'Government Schemes', icon: <Landmark className="w-4 h-4" /> },
    { name: 'Market Update', icon: <LineChart className="w-4 h-4" /> },
    { name: 'Technology', icon: <Cpu className="w-4 h-4" /> },
    { name: 'Videos', icon: <PlayCircle className="w-4 h-4" /> },
  ];

  const latestNews = [
    {
      category: "Policy & Government",
      source: "MNRE India",
      time: "1 hour ago",
      title: "Govt Extends PM Surya Ghar Scheme Deadline to Dec 2025",
      summary: "The Ministry of New and Renewable Energy has extended the deadline for rooftop solar subsidy applications.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      views: "1.2K"
    },
    {
      category: "Industry News",
      source: "SolarQuarter",
      time: "3 hours ago",
      title: "India's Solar Manufacturing Capacity Crosses 60 GW Milestone",
      summary: "India's solar manufacturing capacity has reached a new milestone, reducing import dependence significantly.",
      image: "https://images.unsplash.com/photo-1509391366360-1e97f52ce23b?w=800&q=80",
      views: "876"
    },
    {
      category: "Technology",
      source: "PV Magazine",
      time: "5 hours ago",
      title: "Bifacial Solar Panels: 10% More Energy Generation",
      summary: "New bifacial solar panel technology can generate up to 10% more energy compared to traditional panels.",
      image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80",
      views: "1.5K"
    },
    {
      category: "Market Update",
      source: "Mercom India",
      time: "6 hours ago",
      title: "Solar Module Prices Drop 12% in May 2025",
      summary: "Solar module prices continue to decline globally, bringing more benefits to consumers.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
      views: "632"
    }
  ];

  const companyNews = [
    {
      category: "New Project",
      source: "Enfinite Energy",
      time: "May 25, 2025",
      title: "500kW Solar Plant Commissioned in Lucknow",
      summary: "Another milestone towards our mission of clean energy for all.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      views: "2.1K"
    },
    {
      category: "Award",
      source: "Enfinite Energy",
      time: "May 20, 2025",
      title: "Enfinite Energy Wins Green Excellence Award 2025",
      summary: "Honored for outstanding contribution to renewable energy sector.",
      image: "/17.png",
      views: "3.4K"
    },
    {
      category: "Partnership",
      source: "Enfinite Energy",
      time: "May 18, 2025",
      title: "Strategic Partnership with Leading Solar Inverter Brand",
      summary: "Partnership to deliver advanced solar solutions across India.",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80",
      views: "1.8K"
    },
    {
      category: "CSR",
      source: "Enfinite Energy",
      time: "May 15, 2025",
      title: "Tree Plantation Drive Across 5 States",
      summary: "Our commitment towards a greener and sustainable future.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
      views: "5.2K"
    }
  ];

  const events = [
    {
      day: "15", month: "Jun", year: "2025",
      title: "Solar India Expo 2025",
      location: "Pragati Maidan, New Delhi",
      desc: "Asia's largest solar energy exhibition and conference."
    },
    {
      day: "08", month: "Jul", year: "2025",
      title: "Webinar: Future of Solar Energy in India",
      location: "Online Event",
      desc: "Learn about emerging trends and opportunities."
    },
    {
      day: "20", month: "Jul", year: "2025",
      title: "Rooftop Solar System Design Workshop",
      location: "Online Event",
      desc: "Learn rooftop solar design and estimation."
    }
  ];

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [submittingNewsletter, setSubmittingNewsletter] = useState(false);
  const [ctaName, setCtaName] = useState('');
  const [ctaPhone, setCtaPhone] = useState('');
  const [submittingCta, setSubmittingCta] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return alert('Please enter a valid email address.');
    setSubmittingNewsletter(true);
    try {
      const res = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email: newsletterEmail,
          phone: '',
          message: 'Subscribed to news and updates newsletter',
          type: 'NEWSLETTER'
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('Thank you for subscribing to our newsletter!');
        setNewsletterEmail('');
      } else {
        alert(data.message || 'Subscription failed, please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error, please check connection.');
    } finally {
      setSubmittingNewsletter(false);
    }
  };

  const handleCtaLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ctaName || !ctaPhone) return alert('Please fill in both Name and Mobile Number.');
    setSubmittingCta(true);
    try {
      const res = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: ctaName,
          email: '',
          phone: ctaPhone,
          message: 'Lead captured from News page compact CTA strip',
          type: 'CONSULTATION'
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('Lead submitted successfully! Our expert will call you back shortly.');
        setCtaName('');
        setCtaPhone('');
      } else {
        alert(data.message || 'Lead submission failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error, please check connection.');
    } finally {
      setSubmittingCta(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      
      {/* 1. Hero Section */}
      <section className="relative bg-[#0B1120] pt-16 pb-16 overflow-visible border-b border-gray-200 min-h-[280px]">
        {/* Hero image on the right */}
        <div className="absolute top-0 right-0 w-1/2 h-full hidden md:block">
          <img src="/18.png" alt="Solar News Hero" className="w-full h-full object-cover object-center opacity-90" />
          {/* Gradient fade from left — lighter so image shows */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/40 to-transparent" />
          {/* Gradient fade to bottom — lighter */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/60 via-transparent to-transparent" />
        </div>
        {/* Left dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/80 to-transparent" />

        {/* Hero text */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight tracking-tight">
              News &amp; Events
            </h1>
            <p className="text-base text-gray-300 font-medium">
              Stay updated with the latest solar industry news, company updates and upcoming events.
            </p>
          </div>
        </div>

        {/* Quick Stats Banner — pinned to bottom boundary */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 bg-[#0f1929] backdrop-blur-md border border-white/10 rounded-xl shadow-xl shadow-black/30 divide-x divide-white/10 w-full">
            {[
              { icon: <LayoutGrid className="w-3 h-3 sm:w-5 sm:h-5 text-green-400" />, bg: "bg-green-500/20", val: "2500+", label: "News" },
              { icon: <Calendar className="w-3 h-3 sm:w-5 sm:h-5 text-blue-400" />, bg: "bg-blue-500/20", val: "150+", label: "Events" },
              { icon: <Users className="w-3 h-3 sm:w-5 sm:h-5 text-purple-400" />, bg: "bg-purple-500/20", val: "10K+", label: "Readers" },
              { icon: <Rss className="w-3 h-3 sm:w-5 sm:h-5 text-primary" />, bg: "bg-primary/20", val: "Daily", label: "Updates" },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-3 flex-1 px-1 py-2 sm:px-5 sm:py-4">
                <div className={`w-6 h-6 sm:w-10 sm:h-10 rounded-full ${s.bg} flex items-center justify-center shrink-0`}>
                  {s.icon}
                </div>
                <div>
                  <p className="text-[11px] sm:text-lg font-black text-white leading-none">{s.val}</p>
                  <p className="text-[6.5px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5 leading-none">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Category Filter Bar */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-2 py-3">
            {filterCategories.map(cat => (
              <button
                key={cat.name}
                onClick={() => {
                  setActiveCategory(cat.name);
                  // Dynamic navigation/scrolling for sections on the page
                  if (cat.name === 'Government Schemes') {
                    document.getElementById('government-schemes-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  } else if (cat.name === 'Market Update') {
                    document.getElementById('market-update-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  } else if (cat.name === 'Events') {
                    document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  } else if (cat.name === 'All Updates') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-bold whitespace-nowrap transition-all border ${
                  activeCategory === cat.name
                    ? 'bg-primary/10 text-primary border-primary shadow-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Breaking News Ticker */}
      <BreakingNews />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Latest Solar News Layout */}
        <div className="mb-10">
          
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-gray-900">Latest Solar News</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {isLoading ? (
                // Loading Skeleton
                [1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="animate-pulse bg-white border border-gray-100 rounded-2xl h-80 flex flex-col">
                    <div className="h-40 bg-gray-200 rounded-t-2xl"></div>
                    <div className="p-5 flex flex-col gap-3">
                      <div className="h-3 bg-gray-200 w-1/3 rounded"></div>
                      <div className="h-4 bg-gray-200 w-full rounded"></div>
                      <div className="h-4 bg-gray-200 w-4/5 rounded"></div>
                    </div>
                  </div>
                ))
              ) : liveNews.length > 0 ? (
                liveNews.map((news, idx) => (
                  <NewsCard key={idx} {...news} />
                ))
              ) : (
                <div className="col-span-2 text-center py-10 text-gray-500">
                  Failed to load live news.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Company News & Updates */}
        <div className="mb-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-black text-gray-900">Company News &amp; Updates</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {companyNews.map((news, idx) => (
              <NewsCard key={idx} {...news} />
            ))}
          </div>
        </div>

        {/* Upcoming Events (Moved Below News) */}
        <div id="events-section" className="mb-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-black text-gray-900">Upcoming Events</h2>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 gap-5 md:grid md:grid-cols-3 md:overflow-x-visible md:pb-0 scrollbar-hide">
            {events.map((event, idx) => (
              <div key={idx} className="w-[290px] md:w-auto shrink-0 snap-start">
                <EventCard {...event} />
              </div>
            ))}
          </div>
        </div>

        {/* Government Schemes Section */}
        <div id="government-schemes-section">
          <GovernmentSchemes />
        </div>

        {/* Market Update Widget */}
        <div id="market-update-section">
          <MarketUpdateWidget />
        </div>

      </div>

      {/* Bottom Newsletter and Social Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="relative bg-[#0B1120] rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 overflow-hidden">
          
          {/* Background blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

          {/* Newsletter */}
          <div className="relative z-10 flex-1 flex gap-4 w-full">
            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-grow">
              <h3 className="text-base font-black text-white mb-0.5">Subscribe to Our Newsletter</h3>
              <p className="text-xs text-white/40 mb-3 font-medium">Get the latest solar news, updates and events straight to your inbox.</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  className="flex-grow bg-white/5 border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-white/20"
                />
                <button 
                  type="submit" 
                  disabled={submittingNewsletter}
                  className="bg-primary hover:brightness-110 text-[#0A192F] disabled:opacity-50 font-black px-5 py-2.5 rounded-lg text-sm shadow-lg shadow-primary/20 transition-all whitespace-nowrap"
                >
                  {submittingNewsletter ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>

          <div className="w-px h-16 bg-white/10 hidden lg:block shrink-0" />

          {/* Social */}
          <div className="relative z-10 flex-1 flex gap-4 w-full border-t lg:border-t-0 pt-6 lg:pt-0 border-white/10">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-black text-white mb-0.5">Follow Us</h3>
              <p className="text-xs text-white/40 mb-3 font-medium">Stay connected with us on social media for daily updates.</p>
              <div className="flex gap-2.5">
                <a href="#" className="w-8 h-8 rounded-full bg-[#0077b5] flex items-center justify-center hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0077b5]/40 transition-all">
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-[#1877f2] flex items-center justify-center hover:-translate-y-1 hover:shadow-lg hover:shadow-[#1877f2]/40 transition-all">
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all">
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-[#ff0000] flex items-center justify-center hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/40 transition-all">
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center hover:-translate-y-1 hover:shadow-lg transition-all">
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="w-px h-16 bg-white/10 hidden lg:block shrink-0" />

          {/* RSS */}
          <div className="relative z-10 flex gap-4 w-full lg:w-auto border-t lg:border-t-0 pt-6 lg:pt-0 border-white/10">
            <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
              <Rss className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="text-base font-black text-white mb-0.5">RSS Feed</h3>
              <p className="text-xs text-white/40 mb-3 font-medium">Subscribe to our RSS feed and never miss an update.</p>
              <div className="flex gap-2 flex-wrap">
                <button className="text-xs font-bold text-white/60 bg-white/5 hover:bg-orange-500/10 hover:text-orange-400 border border-white/10 hover:border-orange-500/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all">
                  <Rss className="w-3 h-3 text-orange-400" /> Industry News
                </button>
                <button className="text-xs font-bold text-white/60 bg-white/5 hover:bg-orange-500/10 hover:text-orange-400 border border-white/10 hover:border-orange-500/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all">
                  <Rss className="w-3 h-3 text-orange-400" /> Company News
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative bg-[#0B1120] rounded-2xl border border-white/10 overflow-hidden px-6 py-5">
          <div className="absolute left-1/4 top-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
          <div className="absolute right-1/4 bottom-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">

            {/* Left: Text + stats */}
            <div className="flex items-center gap-6 flex-wrap justify-center md:justify-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">India&apos;s #1 Solar Info Hub</span>
                </div>
                <h2 className="text-lg font-black text-white leading-tight">
                  Stay Updated, <span className="text-primary">Stay Ahead!</span>
                </h2>
                <p className="text-xs text-white/40 mt-0.5">Join <span className="text-white font-bold">50,000+</span> solar professionals for free.</p>
              </div>
              <div className="flex gap-5">
                {[
                  { val: "50K+", label: "Subscribers" },
                  { val: "Daily", label: "Updates" },
                  { val: "100%", label: "Free" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="text-sm font-black text-primary">{s.val}</p>
                    <p className="text-[9px] text-white/30 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Inline mini form + buttons */}
            <form onSubmit={handleCtaLeadSubmit} className="flex items-center gap-2 flex-wrap justify-center">
              <input 
                type="text" 
                value={ctaName}
                onChange={(e) => setCtaName(e.target.value)}
                placeholder="Your Name" 
                className="bg-white/5 border border-white/10 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-primary placeholder-white/20 w-32" 
              />
              <input 
                type="tel" 
                value={ctaPhone}
                onChange={(e) => setCtaPhone(e.target.value)}
                placeholder="Mobile Number" 
                className="bg-white/5 border border-white/10 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-primary placeholder-white/20 w-36" 
              />
              <button 
                type="submit"
                disabled={submittingCta}
                className="bg-primary hover:brightness-110 text-[#0A192F] disabled:opacity-50 font-black px-5 py-2 rounded-lg shadow-lg shadow-primary/20 transition-all text-xs whitespace-nowrap"
              >
                {submittingCta ? 'Submitting...' : 'Get Free Quote →'}
              </button>
              <Link href="/contact">
                <button type="button" className="bg-white/5 border border-white/10 text-white/70 hover:text-white font-bold px-4 py-2 rounded-lg transition-all text-xs whitespace-nowrap">
                  Talk to Expert
                </button>
              </Link>
            </form>

          </div>
        </div>
      </section>

    </div>
  );
}
