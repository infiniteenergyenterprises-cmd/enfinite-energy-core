'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, Mail, Calendar, User, Clock, ArrowRight, Check, Plus, Minus, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface BlogPost {
  id: number;
  title: string;
  category: 'Solar Guides' | 'Govt Subsidies' | 'Installation' | 'Case Studies';
  date: string;
  author: string;
  readTime: string;
  image: string;
  desc: string;
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

  const categories = ['All', 'Solar Guides', 'Govt Subsidies', 'Installation', 'Case Studies'];

  const blogs: BlogPost[] = [
    {
      id: 1,
      title: "How to Claim PM Surya Ghar Subsidy in Kaimur & Bhabua Districts",
      category: "Govt Subsidies",
      date: "July 24, 2026",
      author: "Er. Amit Kumar",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1509391366360-1e97f52ce23b?w=800&q=80",
      desc: "Step-by-step documentation guide for claiming the national solar rooftop subsidy. Special insights for village residents of Kaimur, Mohania, and Bhabua."
    },
    {
      id: 2,
      title: "Rooftop Solar Regulations: Net Metering Rules in Bihar for 2026",
      category: "Govt Subsidies",
      date: "July 18, 2026",
      author: "Rajesh Sharma",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&q=80",
      desc: "Understanding local distribution company guidelines (SBPDCL) for solar grid synchronization, export credits, and electricity bill savings."
    },
    {
      id: 3,
      title: "Solar vs. Diesel Tubewells: A Guide for Farmers in Mohania",
      category: "Solar Guides",
      date: "July 12, 2026",
      author: "Dr. S. K. Maurya",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80",
      desc: "A mathematical breakdown comparing 5HP diesel pumps against off-grid solar-powered irrigation pumps. Calculate your payback period in under 2 years."
    },
    {
      id: 4,
      title: "A Clean Step-by-Step Rooftop Solar Installation Process",
      category: "Installation",
      date: "June 29, 2026",
      author: "Technician Team",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
      desc: "What happens during structural engineering, panel mounting, electrical wiring, and net meter provisioning? Here is what to expect from our installers."
    },
    {
      id: 5,
      title: "100kW Factory Case Study: Cutting Energy Costs by 85% in UP & Bihar borders",
      category: "Case Studies",
      date: "June 15, 2026",
      author: "Sanjay Verma",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      desc: "How a manufacturing unit synchronized heavy daily machines with clean solar panel systems to eliminate high peak-hour commercial tariff structures."
    },
    {
      id: 6,
      title: "Understanding Solar Panel Warranties: 25-Year Performance Claims",
      category: "Solar Guides",
      date: "June 02, 2026",
      author: "Technical Board",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
      desc: "Demystifying linear power warranty, product workmanship guarantees, and key indicators of panel degradation over years."
    }
  ];

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
      a: "Yes, solar panels generate power from ambient light, meaning they produce energy even in cloudy or rainy weather, though output is reduced to about 10%–25% of their peak capacity. Hybrid battery systems can also store power to keep your home running seamlessly."
    },
    {
      q: "What is net metering and is it available in South Bihar?",
      a: "Net metering is a billing mechanism that credits solar system owners for the electricity they add to the grid. If your panels produce more energy than you consume during the day, the excess power is exported back to SBPDCL, reducing your monthly bill."
    }
  ];

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribedEmail) return;
    setSubscriptionSuccess(true);
    setSubscribedEmail('');
  };

  return (
    <div className="bg-[#FAFBFD] min-h-screen pt-20">
      
      {/* 1. Page Header / Hero */}
      <section className="relative bg-[#0B1E3D] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F5A623]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#F5A623] mb-3 inline-block">
            Enfinite Learning Hub
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
            Knowledge Hub & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A623] via-yellow-400 to-amber-500">Solar Resources</span>
          </h1>
          <p className="text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Stay updated with the latest trends in renewable energy, government subsidies, agricultural solar techniques, and expert insights.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto flex items-center bg-white rounded-2xl p-1.5 shadow-xl border border-white/10">
            <input 
              type="text" 
              placeholder="Search guides, policies, subsidy rules..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-4 py-3 bg-transparent text-gray-900 text-sm focus:outline-none placeholder-gray-400 font-medium" 
            />
            <div className="bg-[#0B1E3D] text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#152e59] transition-all cursor-pointer">
              <Search className="w-4 h-4 text-[#F5A623]" />
              <span className="hidden sm:inline text-xs font-black uppercase tracking-wider">Search</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center border-b border-gray-200/80 pb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-[#F5A623] border-[#F5A623] text-[#0B1E3D] shadow-lg shadow-[#F5A623]/20'
                  : 'bg-white border-gray-200 text-gray-600 hover:text-[#0B1E3D] hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Blog Grid */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-bold mb-2">No articles found matching your criteria.</p>
            <p className="text-xs text-gray-400">Try broadening your search term or selecting another category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map(blog => (
              <article 
                key={blog.id} 
                className="bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Image */}
                <div className="h-56 bg-gray-200 overflow-hidden relative">
                  <span className="absolute top-4 left-4 z-10 bg-[#0B1E3D] border border-white/10 text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-lg shadow-sm">
                    {blog.category}
                  </span>
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col">
                  {/* Meta details */}
                  <div className="flex flex-wrap items-center gap-4 text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider mb-4 border-b border-gray-50 pb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#F5A623]" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#F5A623]" />
                      <span>{blog.author}</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-[#0B1E3D] mb-3 leading-snug group-hover:text-[#F5A623] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed line-clamp-3">
                    {blog.desc}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#F5A623]" /> {blog.readTime}
                    </span>
                    <span className="text-xs font-black uppercase tracking-wider text-[#0B1E3D] hover:text-[#F5A623] flex items-center gap-1 transition-colors">
                      Read Guide <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 3. Govt. Subsidy Highlight Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10">
        <div className="relative rounded-3xl overflow-hidden shadow-xl bg-[#0B1E3D] border border-white/5 p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#F5A623]/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#F5A623]/10 border border-[#F5A623]/20 text-[#F5A623] text-[10px] font-black uppercase tracking-widest mb-4">
              <Info className="w-4 h-4 animate-pulse" /> Govt Scheme updates
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white mb-3">
              Check Your State Subsidy Eligibility Instantly
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
              Under *PM Surya Ghar Yojana*, residential homes across Bihar and UP are securing heavy incentives. Our local engineers guide you from paperwork approvals to bank loan credits.
            </p>
          </div>
          
          <Link href="/contact" className="relative z-10 shrink-0 bg-[#F5A623] hover:brightness-110 text-[#0B1E3D] text-xs font-black uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg transition-all">
            Consult Subsidy Expert
          </Link>
        </div>
      </section>

      {/* 4. FAQs Accordion */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-black text-[#0B1E3D]">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2 font-semibold">Everything you need to know about rooftop solar installs</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isActive = activeFaq === idx;
            return (
              <div 
                key={idx} 
                className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(isActive ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-black text-[#0B1E3D] hover:bg-gray-50/50 transition-colors"
                >
                  <span>{faq.q}</span>
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
      </section>

      {/* 5. Newsletter Sign Up */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#0B1E3D] via-[#112240] to-[#0B1E3D] rounded-3xl p-8 sm:p-12 shadow-xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5A623]/5 rounded-full blur-2xl pointer-events-none" />
          
          <Mail className="w-12 h-12 text-[#F5A623] mx-auto mb-6 animate-pulse" />
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Subscribe to Solar Alerts</h2>
          <p className="text-xs sm:text-sm text-gray-300 mb-8 max-w-lg mx-auto leading-relaxed">
            Get early alerts on new regional solar subsidies, custom panels discount catalogs, and technical blog posts.
          </p>

          {subscriptionSuccess ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl py-4 px-6 max-w-md mx-auto flex items-center justify-center gap-2">
              <Check className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-black uppercase tracking-wider">Subscription Successful! Welcome Aboard.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
              <input 
                required
                type="email" 
                placeholder="Enter your email address" 
                value={subscribedEmail}
                onChange={(e) => setSubscribedEmail(e.target.value)}
                className="flex-grow px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 text-xs focus:outline-none focus:border-[#F5A623] font-medium" 
              />
              <Button type="submit" className="rounded-xl px-8 bg-[#F5A623] hover:brightness-110 text-[#0B1E3D] text-xs font-black uppercase tracking-wider py-3.5 shrink-0">
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </section>
      
    </div>
  );
}
