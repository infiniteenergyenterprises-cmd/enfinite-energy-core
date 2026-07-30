'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Users, Activity, Eye, TrendingUp, Clock, Globe,
  Phone, Mail, MessageSquare, Zap, Sun, Shield,
  RefreshCw, ArrowRight, LayoutPanelTop, BarChart3, Calendar,
} from 'lucide-react';

interface DashStats { totalVisits:number; todayVisits:number; recentVisits:any[]; }
interface Lead { id:string; name:string; email:string; phone:string; type:string; status:string; message:string; createdAt:string; }

const TYPE_BADGE: Record<string,string> = {
  CONTACT:'bg-sky-500/15 text-sky-300 border border-sky-500/20',
  CONSULTATION:'bg-amber-500/15 text-amber-300 border border-amber-500/20',
  SURVEY:'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20',
  QUOTE:'bg-violet-500/15 text-violet-300 border border-violet-500/20',
  NEWSLETTER:'bg-pink-500/15 text-pink-300 border border-pink-500/20',
  CALLBACK:'bg-orange-500/15 text-orange-300 border border-orange-500/20',
};

function timeAgo(d:string){
  const m=Math.floor((Date.now()-new Date(d).getTime())/60000);
  if(m<60)return`${m}m ago`;
  const h=Math.floor(m/60);
  if(h<24)return`${h}h ago`;
  return`${Math.floor(h/24)}d ago`;
}

export default function AdminDashboard() {
  const [stats,setStats]=useState<DashStats>({totalVisits:0,todayVisits:0,recentVisits:[]});
  const [leads,setLeads]=useState<Lead[]>([]);
  const [loading,setLoading]=useState(true);
  const [now,setNow]=useState('');

  const load=async()=>{
    setLoading(true);
    try{
      const token = localStorage.getItem('adminToken');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : undefined;
      const[vR,lR]=await Promise.all([
        fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/visitors/stats', { headers }),
        fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/leads', { headers }),
      ]);
      const vD=await vR.json();const lD=await lR.json();
      if(vD.status==='success')setStats(vD.data);
      if(lD.success)setLeads(lD.leads);
    }catch{}
    setLoading(false);
  };

  useEffect(()=>{
    load();
    setNow(new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata',day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}));
  },[]);

  const newLeads   =leads.filter(l=>l.status==='NEW').length;
  const todayLeads =leads.filter(l=>new Date(l.createdAt).toDateString()===new Date().toDateString()).length;
  const convRate   =leads.length>0?Math.round((leads.filter(l=>l.status==='CONVERTED').length/leads.length)*100):0;

  return(
    <div className="min-h-screen" style={{background:'#0a0f1e'}}>
    <div className="max-w-7xl mx-auto px-1 py-6 space-y-6 pb-12">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Sun className="w-4 h-4 text-white"/>
            </div>
            <h1 className="text-xl font-black text-white">Dashboard</h1>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">Live</span>
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1 ml-11">
            <Calendar className="w-3 h-3"/>{now} IST
          </p>
        </div>
        <button onClick={load} disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-300 border border-white/8 hover:border-amber-400/40 hover:text-amber-400 transition-all disabled:opacity-40"
          style={{background:'rgba(255,255,255,0.04)'}}>
          <RefreshCw className={`w-3.5 h-3.5 ${loading?'animate-spin text-amber-400':''}`}/>Refresh
        </button>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {icon:<Users className="w-4 h-4"/>,   label:'Total Visitors', value:loading?'…':stats.totalVisits.toLocaleString(), sub:'All time',          from:'#3b82f6',to:'#1d4ed8'},
          {icon:<Activity className="w-4 h-4"/>, label:'Today Visitors', value:loading?'…':stats.todayVisits.toLocaleString(), sub:'Last 24 hrs',       from:'#f59e0b',to:'#d97706'},
          {icon:<MessageSquare className="w-4 h-4"/>,label:'New Leads',  value:loading?'…':newLeads.toString(),               sub:'Awaiting reply',    from:'#a855f7',to:'#7c3aed'},
          {icon:<TrendingUp className="w-4 h-4"/>,label:'Today Leads',  value:loading?'…':todayLeads.toString(),             sub:'Submitted today',   from:'#10b981',to:'#059669'},
        ].map(k=>(
          <div key={k.label} className="relative rounded-2xl p-5 overflow-hidden border border-white/6"
            style={{background:'rgba(255,255,255,0.04)'}}>
            <div className="absolute inset-0 opacity-10"
              style={{background:`radial-gradient(circle at top right, ${k.from}, transparent 70%)`}}/>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{k.label}</span>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{background:`linear-gradient(135deg,${k.from},${k.to})`,boxShadow:`0 4px 12px ${k.from}40`}}>
                  <span className="text-white">{k.icon}</span>
                </div>
              </div>
              <p className="text-3xl font-black text-white mb-0.5">{k.value}</p>
              <p className="text-[10px] text-slate-600">{k.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Recent Leads */}
        <div className="lg:col-span-2 rounded-2xl border border-white/6 overflow-hidden"
          style={{background:'rgba(255,255,255,0.04)'}}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
            <h2 className="font-black text-white text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-400"/>Recent Leads
            </h2>
            <Link href="/admin/leads" className="text-[10px] font-black text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors">
              View All<ArrowRight className="w-3 h-3"/>
            </Link>
          </div>
          <div className="divide-y divide-white/4">
            {loading?(
              [...Array(4)].map((_,i)=>(
                <div key={i} className="px-5 py-3.5 flex items-center gap-3 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-white/6 shrink-0"/>
                  <div className="flex-1 space-y-1.5">
                    <div className="h-2.5 bg-white/6 rounded w-1/3"/>
                    <div className="h-2 bg-white/4 rounded w-1/2"/>
                  </div>
                  <div className="h-5 w-16 bg-white/6 rounded-lg"/>
                </div>
              ))
            ):leads.slice(0,6).length===0?(
              <div className="px-5 py-10 text-center text-slate-600 text-sm">No leads yet</div>
            ):(
              leads.slice(0,6).map(l=>(
                <div key={l.id} className="px-5 py-3.5 flex items-center gap-3 hover:bg-white/3 transition-colors">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{background:'linear-gradient(135deg,#f59e0b,#f97316)'}}>
                    <span className="text-xs font-black text-white">{l.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-white truncate">{l.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      {l.phone&&<span className="text-[10px] text-slate-500 flex items-center gap-1"><Phone className="w-2.5 h-2.5"/>{l.phone}</span>}
                      {l.email&&<span className="text-[10px] text-slate-500 truncate hidden sm:flex items-center gap-1"><Mail className="w-2.5 h-2.5"/>{l.email}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-lg ${TYPE_BADGE[l.type]||'bg-slate-500/15 text-slate-400 border border-slate-500/20'}`}>{l.type}</span>
                    <span className="text-[9px] text-slate-600 flex items-center gap-1"><Clock className="w-2.5 h-2.5"/>{timeAgo(l.createdAt)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Col */}
        <div className="space-y-4">

          {/* Conversion Ring */}
          <div className="rounded-2xl border border-white/6 p-5" style={{background:'rgba(255,255,255,0.04)'}}>
            <h3 className="font-black text-white text-sm mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-400"/>Lead Overview
            </h3>
            <div className="flex justify-center mb-5">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none"/>
                  <circle cx="48" cy="48" r="40" stroke="url(#grad)" strokeWidth="10" fill="none"
                    strokeDasharray={`${(convRate/100)*251} 251`} strokeLinecap="round"
                    style={{transition:'stroke-dasharray 1s ease'}}/>
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b"/>
                      <stop offset="100%" stopColor="#f97316"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-white">{convRate}%</span>
                  <span className="text-[9px] text-slate-500 font-bold">Converted</span>
                </div>
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                {label:'Total',value:leads.length,color:'#3b82f6'},
                {label:'New',value:leads.filter(l=>l.status==='NEW').length,color:'#f59e0b'},
                {label:'Contacted',value:leads.filter(l=>l.status==='CONTACTED').length,color:'#a855f7'},
                {label:'Converted',value:leads.filter(l=>l.status==='CONVERTED').length,color:'#10b981'},
              ].map(s=>(
                <div key={s.label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{background:s.color,boxShadow:`0 0 6px ${s.color}`}}/>
                    <span className="text-slate-500 font-semibold">{s.label}</span>
                  </div>
                  <span className="font-black text-white tabular-nums">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="rounded-2xl border border-white/6 p-5" style={{background:'rgba(255,255,255,0.04)'}}>
            <h3 className="font-black text-white text-sm mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400"/>System Status
            </h3>
            <div className="space-y-3">
              {['Backend API','Database','Cloudinary CDN','Email (SMTP)','Firebase'].map(s=>(
                <div key={s} className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-semibold">{s}</span>
                  <span className="flex items-center gap-1.5 font-black text-[10px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>Online
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div>
        <h2 className="font-black text-white mb-4 text-sm flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400"/>Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {href:'/admin/pages',icon:<LayoutPanelTop className="w-5 h-5"/>,label:'Content Manager',desc:'Edit images & text',  from:'#3b82f6',to:'#1d4ed8'},
            {href:'/admin/leads',   icon:<TrendingUp className="w-5 h-5"/>,    label:'Lead Management',desc:'View submissions',     from:'#f59e0b',to:'#d97706'},
            {href:'/admin/visitors',icon:<Eye className="w-5 h-5"/>,           label:'Visitor Logs',  desc:'Track traffic',        from:'#a855f7',to:'#7c3aed'},
            {href:'/',              icon:<Globe className="w-5 h-5"/>,          label:'View Live Site', desc:'Open website',        from:'#10b981',to:'#059669',target:'_blank'},
          ].map(q=>(
            <Link key={q.href} href={q.href} target={(q as any).target}
              className="group relative rounded-2xl p-5 border border-white/6 overflow-hidden hover:border-white/15 hover:-translate-y-1 transition-all flex flex-col gap-3"
              style={{background:'rgba(255,255,255,0.04)'}}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{background:`radial-gradient(circle at top left, ${q.from}15, transparent 60%)`}}/>
              <div className="relative w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
                style={{background:`linear-gradient(135deg,${q.from},${q.to})`,boxShadow:`0 4px 14px ${q.from}40`}}>
                {q.icon}
              </div>
              <div className="relative">
                <p className="font-black text-sm text-white group-hover:text-amber-400 transition-colors">{q.label}</p>
                <p className="text-[11px] text-slate-600 mt-0.5">{q.desc}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-700 group-hover:text-amber-400 group-hover:translate-x-1 transition-all mt-auto relative"/>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Recent Visitors ── */}
      <div className="rounded-2xl border border-white/6 overflow-hidden" style={{background:'rgba(255,255,255,0.04)'}}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
          <h2 className="font-black text-white text-sm flex items-center gap-2">
            <Eye className="w-4 h-4 text-violet-400"/>Recent Visitors
          </h2>
          <span className="text-[10px] text-slate-600 font-semibold">Last 10 visits</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/4">
                {['IP Address','Page','Time','Device'].map(h=>(
                  <th key={h} className="px-5 py-3 text-[9px] font-black uppercase tracking-widest text-slate-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {loading?(
                <tr><td colSpan={4} className="px-5 py-8 text-center text-slate-600 text-sm">Loading…</td></tr>
              ):stats.recentVisits.length===0?(
                <tr><td colSpan={4} className="px-5 py-10 text-center text-slate-600 text-sm">No visits yet</td></tr>
              ):(
                stats.recentVisits.map((v:any)=>(
                  <tr key={v.id} className="hover:bg-white/3 transition-colors">
                    <td className="px-5 py-3 text-xs font-bold text-white font-mono">{v.ipAddress||'Unknown'}</td>
                    <td className="px-5 py-3 text-xs text-slate-500 max-w-[140px] truncate">{v.path||'/'}</td>
                    <td className="px-5 py-3 text-xs text-slate-600 whitespace-nowrap">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3"/>{timeAgo(v.visitedAt)}</span>
                    </td>
                    <td className="px-5 py-3 text-xs text-slate-500">
                      {v.userAgent?v.userAgent.includes('Mobile')?'📱 Mobile':v.userAgent.includes('Chrome')?'🖥 Chrome':v.userAgent.includes('Firefox')?'🦊 Firefox':'💻 Desktop':'Unknown'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
    </div>
  );
}
