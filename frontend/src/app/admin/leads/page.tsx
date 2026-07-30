'use client';

import React, { useEffect, useState } from 'react';
import {
  Phone, Mail, MessageSquare, Clock, RefreshCw,
  CheckCircle2, XCircle, User, Tag, TrendingUp,
  Search, Filter, Download, ChevronRight, Zap
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  type: string;
  status: string;
  createdAt: string;
}

const TYPE_COLORS: Record<string, string> = {
  CONTACT:      'bg-blue-500/10 text-blue-400 border-blue-500/20',
  CONSULTATION: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  SURVEY:       'bg-green-500/10 text-green-400 border-green-500/20',
  QUOTE:        'bg-purple-500/10 text-purple-400 border-purple-500/20',
  NEWSLETTER:   'bg-pink-500/10 text-pink-400 border-pink-500/20',
  CAREER:       'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  EVENT:        'bg-red-500/10 text-red-400 border-red-500/20',
  CALLBACK:     'bg-orange-500/10 text-orange-400 border-orange-500/20',
  SUBSIDY:      'bg-teal-500/10 text-teal-400 border-teal-500/20',
  PM_SURYA_GHAR:'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
};

const STATUS_COLORS: Record<string, string> = {
  NEW:       'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  CONTACTED: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  CONVERTED: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  CLOSED:    'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{message: string, action: () => void} | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/leads', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.status === 401) {
        showToast("Session expired. Please log out and log in again.", 'error');
      }
      if (data.success) setLeads(data.leads);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, []);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + ''}/leads/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
      });
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    } finally {
      setUpdatingId(null);
    }
  };

  const sendConfirmationEmail = async (id: string) => {
    setConfirmDialog({
      message: 'Are you sure you want to send the AI Confirmation email to this user?',
      action: async () => {
        setConfirmDialog(null);
        setUpdatingId(id);
        try {
          const token = localStorage.getItem('adminToken');
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + ''}/leads/${id}/confirm-email`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
          const data = await res.json();
          if (data.success) {
            showToast('Confirmation email sent successfully!', 'success');
            setLeads(prev => prev.map(l => l.id === id ? { ...l, status: 'CONTACTED' } : l));
          } else {
            showToast(data.message || 'Failed to send email', 'error');
          }
        } catch (e) {
          console.error(e);
          showToast('Network error while sending email.', 'error');
        } finally {
          setUpdatingId(null);
        }
      }
    });
  };

  const filtered = leads.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) || l.email.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'ALL' || l.type === typeFilter;
    const matchStatus = statusFilter === 'ALL' || l.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  // Stats
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'NEW').length,
    contacted: leads.filter(l => l.status === 'CONTACTED').length,
    converted: leads.filter(l => l.status === 'CONVERTED').length,
  };

  const exportCSV = () => {
    const rows = [['Name', 'Email', 'Phone', 'Type', 'Status', 'Message', 'Date']];
    filtered.forEach(l => rows.push([l.name, l.email, l.phone, l.type, l.status, l.message || '', new Date(l.createdAt).toLocaleString('en-IN')]));
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'leads.csv'; a.click();
  };

  const types = ['ALL', ...Array.from(new Set(leads.map(l => l.type)))];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {toast && (
        <div className={`fixed bottom-4 right-4 px-4 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3 font-bold text-sm animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5"/> : <XCircle className="w-5 h-5"/>}
          {toast.message}
        </div>
      )}
      {confirmDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0B1E3D] border border-white/10 p-6 rounded-3xl shadow-2xl max-w-sm w-full mx-4 animate-in zoom-in-95">
            <h3 className="text-xl font-black text-white mb-2">Confirm Action</h3>
            <p className="text-sm text-white/70 mb-6 leading-relaxed">{confirmDialog.message}</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setConfirmDialog(null)} className="px-4 py-2.5 text-sm font-bold text-white/60 hover:bg-white/10 rounded-xl transition-all">Cancel</button>
              <button onClick={confirmDialog.action} className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#0B1E3D] font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20">Yes, Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-4">
            <Zap className="w-3.5 h-3.5" /> Real-time Updates
          </div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
            Lead Management
          </h1>
          <p className="text-sm text-white/50 mt-2 font-medium">Monitor and manage all form submissions from the website.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchLeads} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-all shadow-lg hover:shadow-white/5">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <button onClick={exportCSV} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-sm font-bold hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-orange-500/20">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Leads', value: stats.total, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: <User className="w-5 h-5" /> },
          { label: 'New', value: stats.new, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: <CheckCircle2 className="w-5 h-5" /> },
          { label: 'Contacted', value: stats.contacted, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: <Phone className="w-5 h-5" /> },
          { label: 'Converted', value: stats.converted, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: <TrendingUp className="w-5 h-5" /> },
        ].map(s => (
          <div key={s.label} className="relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm group hover:bg-white/[0.07] transition-all">
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${s.bg} blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`}></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${s.bg} ${s.border} ${s.color}`}>
                {s.icon}
              </div>
              <div>
                <p className="text-3xl font-black text-white">{s.value}</p>
                <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mt-1">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 bg-white/5 p-2 rounded-2xl border border-white/10 shadow-lg backdrop-blur-md">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input type="text" placeholder="Search name, phone, email..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-transparent text-white text-sm font-medium focus:outline-none placeholder-white/30" />
        </div>
        <div className="w-px bg-white/10 my-2 hidden sm:block"></div>
        <div className="flex items-center gap-3 pr-2">
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
            className="bg-transparent text-white text-sm font-semibold focus:outline-none cursor-pointer appearance-none pl-4 pr-8 py-2 hover:text-amber-400 transition-colors">
            {types.map(t => <option key={t} value={t} className="bg-[#0a0f1e] text-white py-2">{t === 'ALL' ? 'All Types' : t}</option>)}
          </select>
          <div className="w-px h-4 bg-white/10"></div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="bg-transparent text-white text-sm font-semibold focus:outline-none cursor-pointer appearance-none pl-4 pr-8 py-2 hover:text-amber-400 transition-colors">
            {['ALL', 'NEW', 'CONTACTED', 'CONVERTED', 'CLOSED'].map(s => (
              <option key={s} value={s} className="bg-[#0a0f1e] text-white py-2">{s === 'ALL' ? 'All Status' : s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl shadow-xl backdrop-blur-md overflow-hidden">
        {loading ? (
          <div className="p-20 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 relative mb-4">
              <div className="absolute inset-0 border-4 border-amber-500/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-amber-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-white/50 font-bold text-sm tracking-wide uppercase">Fetching leads...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-5">
              <User className="w-8 h-8 text-white/20" />
            </div>
            <h3 className="text-lg font-black text-white mb-2">No leads found</h3>
            <p className="text-white/40 text-sm font-medium">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  {['Lead Details', 'Contact Info', 'Lead Type', 'Message Preview', 'Received', 'Status', 'Manage'].map(h => (
                    <th key={h} className="px-3 md:px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white/30 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(lead => (
                  <tr key={lead.id} className="hover:bg-white/[0.03] transition-colors group">
                    {/* Name */}
                    <td className="px-3 md:px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-amber-500/30 transition-colors">
                          <span className="text-sm font-black text-white">{lead.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                          <span className="font-bold text-sm text-white block truncate max-w-[120px] sm:max-w-[150px] lg:max-w-[200px]" title={lead.name}>{lead.name}</span>
                          <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">ID: {lead.id.slice(-6)}</span>
                        </div>
                      </div>
                    </td>
                    {/* Contact */}
                    <td className="px-3 md:px-4 py-4 whitespace-nowrap">
                      <div className="space-y-2">
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-[11px] text-white/60 hover:text-amber-400 font-medium transition-colors">
                            <Phone className="w-3.5 h-3.5 opacity-70" />{lead.phone}
                          </a>
                        )}
                        {lead.email && (
                          <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-[11px] text-white/60 hover:text-amber-400 font-medium transition-colors">
                            <Mail className="w-3.5 h-3.5 opacity-70" />{lead.email}
                          </a>
                        )}
                      </div>
                    </td>
                    {/* Type */}
                    <td className="px-3 md:px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center justify-center text-[9px] md:text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded border ${TYPE_COLORS[lead.type] || 'bg-white/5 text-white/60 border-white/10'}`}>
                        {lead.type.replace(/_/g, ' ')}
                      </span>
                    </td>
                    {/* Message */}
                    <td className="px-3 md:px-4 py-4 max-w-[150px] lg:max-w-[220px]">
                      <p className="text-[11px] text-white/50 line-clamp-2 leading-relaxed font-medium group-hover:text-white/70 transition-colors" title={lead.message}>{lead.message || '—'}</p>
                    </td>
                    {/* Time */}
                    <td className="px-3 md:px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-[11px] text-white/50 font-semibold">
                        <Clock className="w-3 h-3 opacity-70" />{timeAgo(lead.createdAt)}
                      </div>
                    </td>
                    {/* Status Badge */}
                    <td className="px-3 md:px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center justify-center text-[9px] md:text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded border ${STATUS_COLORS[lead.status] || STATUS_COLORS['NEW']}`}>
                        {lead.status}
                      </span>
                    </td>
                    {/* Action */}
                    <td className="px-3 md:px-4 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-2">
                        <div className="relative w-28">
                          <select
                            value={lead.status}
                            disabled={updatingId === lead.id}
                            onChange={e => updateStatus(lead.id, e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-[11px] font-bold text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 cursor-pointer disabled:opacity-50 appearance-none hover:bg-white/10 transition-all"
                          >
                            <option value="NEW" className="bg-[#0a0f1e]">New</option>
                            <option value="CONTACTED" className="bg-[#0a0f1e]">Contacted</option>
                            <option value="CONVERTED" className="bg-[#0a0f1e]">Converted</option>
                            <option value="CLOSED" className="bg-[#0a0f1e]">Closed</option>
                          </select>
                          <ChevronRight className="w-3 h-3 text-white/30 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                        </div>
                        {lead.email && (
                          <button 
                            onClick={() => sendConfirmationEmail(lead.id)}
                            disabled={updatingId === lead.id}
                            className="w-28 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-2 py-1.5 rounded text-[9px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center disabled:opacity-50"
                          >
                            Confirm Mail
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

