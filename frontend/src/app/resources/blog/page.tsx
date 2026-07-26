'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Calendar, User, Clock, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const [query, setQuery] = useState('');
  
  const posts = [
    {
      id: 1,
      title: "How to Claim PM Surya Ghar Subsidy in Bhabua Districts",
      date: "July 24, 2026",
      author: "Er. Amit Kumar",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1509391366360-1e97f52ce23b?w=500&q=80",
      desc: "Step-by-step documentation guide for claiming the national solar rooftop subsidy in Bihar."
    },
    {
      id: 2,
      title: "Net Metering Regulations: SBPDCL Rules in Bihar for 2026",
      date: "July 18, 2026",
      author: "Rajesh Sharma",
      readTime: "4 min",
      image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=500&q=80",
      desc: "Understanding state distribution guidelines for grid connection, export credits, and savings."
    },
    {
      id: 3,
      title: "Solar vs. Diesel Tubewells: A Guide for Farmers in Mohania",
      date: "July 12, 2026",
      author: "Dr. S. K. Maurya",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=500&q=80",
      desc: "Comparing 5HP diesel pumps against off-grid solar-powered irrigation pumps. Calculate payback periods."
    }
  ];

  const filtered = posts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="bg-white min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-xs font-black uppercase text-[#F5A623] tracking-widest">Enfinite Blog</span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0B1E3D] mt-1">Solar Articles & Guides</h1>
      </div>

      <div className="max-w-md mx-auto mb-8 flex border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <input 
          type="text" 
          placeholder="Search articles..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow px-4 py-2.5 text-sm focus:outline-none text-[#0B1E3D] font-semibold"
        />
        <div className="bg-[#0B1E3D] px-4 flex items-center justify-center text-white"><Search className="w-4 h-4 text-[#F5A623]" /></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(post => (
          <article key={post.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group">
            <div className="h-44 bg-gray-100 overflow-hidden relative">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex gap-3 text-[10px] text-gray-400 font-bold uppercase mb-2">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#F5A623]" /> {post.date}</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3 text-[#F5A623]" /> {post.author}</span>
                </div>
                <h3 className="font-extrabold text-base text-[#0B1E3D] mb-2 leading-tight line-clamp-2">{post.title}</h3>
                <p className="text-[11.5px] text-gray-500 mb-4 line-clamp-3">{post.desc}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <span className="text-[9px] text-gray-400 font-bold uppercase">{post.readTime}</span>
                <span className="text-[11px] font-black uppercase text-[#0B1E3D] hover:text-[#F5A623] flex items-center gap-1 transition-colors">Read Guide <ArrowRight className="w-3 h-3" /></span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
