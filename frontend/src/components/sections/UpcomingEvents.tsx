"use client";

import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, ArrowRight, Clock, Loader2 } from 'lucide-react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || (process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') : 'http://localhost:5000');

interface Evt {
  id: string;
  title: string;
  desc: string;
  location: string;
  day: string;
  month: string;
  year: string;
  time: string;
  image: string;
}

const FALLBACK: Evt[] = [
  { id:'f1', day:'15', month:'Jun', year:'2025', title:'Solar India Expo 2025', location:'Pragati Maidan, New Delhi', desc:"Asia's largest solar energy exhibition featuring latest innovations in renewable tech.", time:'09:00 AM - 06:00 PM', image:'https://images.unsplash.com/photo-1559336197-f584afb72bf8?w=800&q=80' },
  { id:'f2', day:'08', month:'Jul', year:'2025', title:'Future of Solar Energy in India', location:'Virtual Event (Zoom)', desc:'Join our expert panel to learn about emerging trends, government policies, and business opportunities.', time:'03:00 PM - 05:00 PM', image:'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80' },
  { id:'f3', day:'20', month:'Jul', year:'2025', title:'Rooftop Solar Design Workshop', location:'Enfinite HQ, Lucknow', desc:'Hands-on workshop to learn rooftop solar design, estimation, and deployment strategies.', time:'10:00 AM - 04:00 PM', image:'https://images.unsplash.com/photo-1509391366360-1e97f52ce23b?w=800&q=80' },
];

export function UpcomingEvents() {
  const [events,  setEvents]  = useState<Evt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/events`)
      .then(r => r.json())
      .then(data => {
        if (data.status === 'success' && data.data?.length > 0) setEvents(data.data.slice(0, 3));
        else setEvents(FALLBACK);
      })
      .catch(() => setEvents(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const list = events.slice(0, 3);

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-xs font-bold mb-3">
              <Calendar className="w-3.5 h-3.5" /> Upcoming Events
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A192F] tracking-tight">
              Mark Your <span className="text-amber-500">Calendar</span>
            </h2>
            <p className="text-gray-500 text-sm mt-1">Join us at these exciting upcoming solar events</p>
          </div>
          <Link href="/news#events-section"
            className="hidden sm:flex items-center gap-2 text-sm font-bold text-amber-600 bg-amber-50 hover:bg-amber-500 hover:text-white px-5 py-2 rounded-full transition-all border border-amber-200 whitespace-nowrap">
            View All Events <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-7 h-7 animate-spin text-amber-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {list.map((ev, i) => (
              <Link href="/news#events-section" key={ev.id || i}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-amber-200 transition-all duration-300 flex flex-col">
                {/* Image */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={ev.image || 'https://images.unsplash.com/photo-1559336197-f584afb72bf8?w=800&q=80'}
                    alt={ev.title}
                    onError={e => { (e.currentTarget as HTMLImageElement).src = '/17.png'; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  {/* Date badge */}
                  <div className="absolute top-3 left-3 bg-white rounded-xl px-3 py-1.5 flex flex-col items-center shadow-lg">
                    <span className="text-xl font-black text-amber-500 leading-none">{ev.day}</span>
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">{ev.month}</span>
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-lg backdrop-blur-sm">
                    {ev.year}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-extrabold text-base text-[#0A192F] mb-2 leading-snug group-hover:text-amber-600 transition-colors line-clamp-2">
                    {ev.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate">{ev.location}</span>
                  </div>
                  {ev.time && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3 font-medium">
                      <Clock className="w-3.5 h-3.5 shrink-0" />{ev.time}
                    </div>
                  )}
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex-1 mb-4">{ev.desc}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 group-hover:text-amber-700 transition-colors mt-auto">
                    Register Now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-6 text-center sm:hidden">
          <Link href="/news#events-section"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 bg-amber-50 hover:bg-amber-500 hover:text-white px-5 py-2.5 rounded-full transition-all border border-amber-200">
            View All Events <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
