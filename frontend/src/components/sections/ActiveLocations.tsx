"use client";

import React, { useState, useEffect } from 'react';
import { MapPin, Activity, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Location {
  id: string;
  city: string;
  state: string;
  activeProjects: number;
  status: string;
}

const FALLBACK_LOCATIONS: Location[] = [
  { id: 'f1', city: "Patna", state: "Bihar", activeProjects: 45, status: "High Activity" },
  { id: 'f2', city: "Varanasi", state: "Uttar Pradesh", activeProjects: 38, status: "High Activity" },
  { id: 'f3', city: "Gaya", state: "Bihar", activeProjects: 22, status: "Active" },
  { id: 'f4', city: "Gorakhpur", state: "Uttar Pradesh", activeProjects: 29, status: "High Activity" },
  { id: 'f5', city: "Muzaffarpur", state: "Bihar", activeProjects: 18, status: "Active" },
  { id: 'f6', city: "Prayagraj", state: "Uttar Pradesh", activeProjects: 31, status: "High Activity" },
];

export function ActiveLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/locations')
      .then(r => r.json())
      .then(data => {
        if (data.status === 'success' && data.data.length > 0) {
          setLocations(data.data);
        } else {
          setLocations(FALLBACK_LOCATIONS);
        }
      })
      .catch(() => setLocations(FALLBACK_LOCATIONS))
      .finally(() => setLoading(false));
  }, []);

  const visibleLocations = showAll ? locations : locations.slice(0, 6);

  return (
    <section className="py-8 bg-slate-50 relative border-b border-gray-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border border-orange-200 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            <span className="text-orange-700 font-bold text-sm">Live Operations</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Where We Are Installing <span className="text-amber-500">Right Now</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our teams are actively deploying solar solutions across multiple cities. See where the solar revolution is happening today.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleLocations.map((loc) => (
                <div key={loc.id} className="bg-orange-50/50 rounded-2xl p-8 shadow-sm border border-orange-200 hover:shadow-md hover:bg-orange-100/80 transition-all group flex flex-col justify-between h-[180px]">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">{loc.city}</h3>
                        <p className="text-sm text-gray-500">{loc.state}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 ${
                      loc.status === "High Activity" ? "bg-amber-100 text-amber-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      <Activity className="w-3 h-3" /> {loc.status}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-orange-500" />
                      <span><span className="font-bold text-slate-900">{loc.activeProjects}</span> Active Sites</span>
                    </div>
                    <Link href="/our-work" className="text-orange-600 font-medium text-sm hover:underline cursor-pointer flex items-center">
                      View Sites →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {!showAll && locations.length > 6 && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setShowAll(true)}
                  className="bg-orange-100 text-orange-600 hover:bg-orange-200 hover:text-orange-700 font-bold py-3 px-8 rounded-full transition-colors flex items-center gap-2"
                >
                  Load More Locations
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
