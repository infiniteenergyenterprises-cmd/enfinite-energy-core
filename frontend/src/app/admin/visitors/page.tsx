import React from 'react';
import { Users, Activity, BarChart, Settings2 } from 'lucide-react';

export default function VisitorLogsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 h-full flex flex-col justify-center items-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
              <Users className="w-10 h-10 text-amber-500" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-white tracking-tight">Visitor Analytics</h1>
              <p className="text-white/50 text-sm max-w-sm mx-auto font-medium">
                The advanced visitor tracking and real-time analytics module is currently being integrated.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <div className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Real-time Traffic</span>
              </div>
              <div className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                <BarChart className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Geo-Location</span>
              </div>
            </div>
            
            <div className="mt-8 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full">
              <Settings2 className="w-3.5 h-3.5 animate-spin-slow" /> Under Construction
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
