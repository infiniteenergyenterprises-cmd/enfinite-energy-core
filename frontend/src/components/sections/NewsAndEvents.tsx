'use client';
import React, { useRef } from 'react';
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export interface NewsType {
  image: string;
  date: string;
  title: string;
  desc: string;
  tag?: string;
}

interface NewsAndEventsProps {
  newsItems?: NewsType[];
}

export function NewsAndEvents({ newsItems: propNews }: NewsAndEventsProps) {
  const defaultNews: NewsType[] = [
    {
      image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "15 May, 2024",
      title: "Solar Subsidy Update 2024",
      desc: "New government solar subsidy scheme announced. Get up to 40% subsidy on rooftop solar systems.",
      tag: "News"
    },
    {
      image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "10 May, 2024",
      title: "Solar Awareness Camp",
      desc: "We conducted a solar awareness camp in Lucknow to educate people about solar energy benefits.",
      tag: "Event"
    },
    {
      image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "05 May, 2024",
      title: "Renewable Energy Expo",
      desc: "Participated in Renewable Energy Expo 2024, Delhi. Great response from visitors and businesses.",
      tag: "Event"
    },
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      date: "01 May, 2024",
      title: "New Office Opening",
      desc: "We are happy to announce our new office opening in Jaipur. We are now serving more customers.",
      tag: "News"
    }
  ];

  const news = propNews || defaultNews;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 relative z-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A192F] mb-3 tracking-tight">Latest News & Events</h2>
            <p className="text-gray-500 text-lg">Stay updated with the latest from Enfinite Energy</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/news" className="hidden sm:flex group items-center gap-2 text-sm font-bold text-primary bg-primary/10 hover:bg-primary hover:text-white px-5 py-2.5 rounded-full transition-all duration-300">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex gap-6 lg:gap-8 relative z-10 overflow-x-auto snap-x snap-mandatory pb-8 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 hide-scrollbar"
        >
          {news.map((item, index) => (
            <div key={index} className="flex-shrink-0 snap-center w-[85vw] sm:w-[350px] md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.33rem)] group bg-white rounded-2xl overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col">
              <div className="relative h-60 overflow-hidden">
                <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-[11px] font-bold text-brand-blue uppercase tracking-wider shadow-sm">
                  {item.tag || "News"}
                </div>
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-gray-500 font-bold mb-3 uppercase tracking-wider">
                  <CalendarDays className="w-4 h-4 text-primary" />
                  {item.date}
                </div>
                <h3 className="font-extrabold text-xl text-[#0A192F] mb-3 leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed text-sm flex-1">{item.desc}</p>
                
                <Link href="/news" className="inline-flex items-center gap-2 text-sm font-bold text-[#0A192F] hover:text-primary transition-colors group/link">
                  Read Article 
                  <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/link:bg-primary/10 group-hover/link:text-primary transition-all duration-300">
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-2 text-center sm:hidden">
          <Link href="/news" className="inline-flex group items-center gap-2 text-sm font-bold text-primary bg-primary/10 hover:bg-primary hover:text-white px-5 py-2.5 rounded-full transition-all duration-300">
            View All Updates <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
