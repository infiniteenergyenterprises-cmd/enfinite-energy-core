'use client';

import React, { useState, useEffect } from 'react';
import {
  Save, Loader2, Upload, Link as LinkIcon, Image as ImageIcon,
  Trash2, Plus, Newspaper, Calendar, TrendingUp, Edit2, X, Wand2
} from 'lucide-react';

const API       = (process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') : 'http://localhost:5000');

async function uploadImg(file: File): Promise<string> {
  const form = new FormData();
  form.append('image', file);
  const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL || (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + ''}/upload`, { method: 'POST', body: form });
  const json = await res.json();
  if (json.status !== 'success') throw new Error('Upload failed');
  return json.data.url;
}

/* ─── shared field ─────────────────────────────────────── */
function Field({ label, value, onChange, maxLen = 120, rows = 1, placeholder = '' }: {
  label: string; value: string; onChange: (v: string) => void; maxLen?: number; rows?: number; placeholder?: string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{label}</span>
        <span className={`text-[10px] font-bold ${value.length > maxLen * 0.9 ? 'text-amber-400' : 'text-white/25'}`}>{value.length}/{maxLen}</span>
      </div>
      {rows > 1
        ? <textarea rows={rows} maxLength={maxLen} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50 resize-none placeholder-white/20" />
        : <input type="text" maxLength={maxLen} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50 placeholder-white/20" />
      }
    </div>
  );
}

function ImgUpload({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [up, setUp] = useState(false);
  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setUp(true);
    try { onChange(await uploadImg(f)); } catch { alert('Upload failed'); }
    setUp(false);
  };
  return (
    <div className="space-y-2">
      <div className="w-full h-24 rounded-xl bg-black/40 overflow-hidden border border-white/10">
        {value ? <img src={value} alt="" className="w-full h-full object-cover opacity-80" />
               : <div className="w-full h-full flex items-center justify-center text-white/20"><ImageIcon className="w-5 h-5" /></div>}
      </div>
      <div className="flex gap-2">
        <div className="flex-1 flex items-center bg-black/30 border border-white/10 rounded-lg overflow-hidden">
          <LinkIcon className="w-3 h-3 text-white/30 ml-2 shrink-0" />
          <input type="text" placeholder="Image URL" value={value} onChange={e => onChange(e.target.value)} className="w-full bg-transparent text-[11px] text-white p-2 outline-none placeholder-white/20" />
        </div>
        <label className="flex items-center gap-1 px-3 py-2 bg-white/8 hover:bg-white/15 text-white/70 text-[11px] font-semibold rounded-lg cursor-pointer border border-white/5 whitespace-nowrap">
          {up ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}{up ? 'Uploading…' : 'Upload'}
          <input type="file" accept="image/*" className="hidden" onChange={handle} disabled={up} />
        </label>
      </div>
    </div>
  );
}

function SaveBtn({ saving, label, onClick }: { saving: boolean; label?: string; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={saving}
      className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-[#0A192F] font-bold rounded-xl text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50">
      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
      {label || 'Save'}
    </button>
  );
}

/* ─── Company News Manager ──────────────────────────────── */
interface CNews { id: string; title: string; summary: string; category: string; source: string; image: string; link: string; time: string; }
const EMPTY_NEWS = (): Omit<CNews,'id'> => ({ title:'', summary:'', category:'New Project', source:'Enfinite Energy', image:'', link:'', time:'' });
const NEWS_CATS = ['New Project','Award','Partnership','CSR','Product Launch','Announcement','Other'];

function CompanyNewsManager() {
  const [items,   setItems]   = useState<CNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [form,    setForm]    = useState(EMPTY_NEWS());
  const [editId,  setEditId]  = useState<string|null>(null);
  const [saving,  setSaving]  = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await fetch(`${API}/api/company-news`);
    const json = await res.json();
    setItems(json.status === 'success' ? json.data : []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const startEdit = (n: CNews) => { setEditId(n.id); setForm({ title:n.title, summary:n.summary||'', category:n.category||'New Project', source:n.source||'Enfinite Energy', image:n.image||'', link:n.link||'', time:n.time||'' }); };
  const cancel = () => { setEditId(null); setForm(EMPTY_NEWS()); };

  const save = async () => {
    if (!form.title) return alert('Title required');
    setSaving(true);
    const url  = editId ? `${API}/api/company-news/${editId}` : `${API}/api/company-news`;
    const method = editId ? 'PUT' : 'POST';
    await fetch(url, { method, headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(form) });
    setSaving(false); cancel(); load();
  };

  const del = async (id: string) => {
    if (!confirm('Delete this news item?')) return;
    await fetch(`${API}/api/company-news/${id}`, { method:'DELETE' });
    setItems(p => p.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-5">
      <div className="bg-black/20 border border-amber-400/20 rounded-xl p-5 space-y-4">
        <p className="text-amber-400 font-black text-sm">{editId ? '✏️ Edit News' : '➕ Add Company News'}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Field label="Title *" value={form.title} onChange={v=>setForm(p=>({...p,title:v}))} maxLen={120} placeholder="e.g. 500kW Plant Commissioned" />
            <Field label="Summary" value={form.summary} onChange={v=>setForm(p=>({...p,summary:v}))} maxLen={300} rows={3} placeholder="Brief description..." />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5">Category</p>
                <select value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))} className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50">
                  {NEWS_CATS.map(c => <option key={c} value={c} className="bg-[#0a0f1e]">{c}</option>)}
                </select>
              </div>
              <Field label="Source" value={form.source} onChange={v=>setForm(p=>({...p,source:v}))} maxLen={60} placeholder="Enfinite Energy" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date / Time Ago" value={form.time} onChange={v=>setForm(p=>({...p,time:v}))} maxLen={40} placeholder="May 25, 2025" />
              <Field label="Link URL (optional)" value={form.link} onChange={v=>setForm(p=>({...p,link:v}))} maxLen={200} placeholder="/news/1 or https://..." />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">News Image</p>
            <ImgUpload value={form.image} onChange={v=>setForm(p=>({...p,image:v}))} />
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          {editId && <button onClick={cancel} className="px-4 py-2 bg-white/5 border border-white/10 text-white/60 rounded-xl text-sm font-bold hover:bg-white/10 transition">Cancel</button>}
          <button onClick={async () => {
            const btn = document.getElementById('ai-news-btn') as HTMLButtonElement; if(btn) btn.disabled = true;
            try {
              const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/ai/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: `Write a short summary for a news item titled: ${form.title || 'Untitled'}. Category: ${form.category}`, sectionName: "News Item" }) });
              const data = await res.json();
              if (data.status === 'success' && data.data.text) setForm(p => ({...p, summary: data.data.text}));
              else alert('AI Generation failed.');
            } catch { alert('Error generating text.'); }
            if(btn) btn.disabled = false;
          }} id="ai-news-btn" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-all disabled:opacity-50">
            <Wand2 className="w-4 h-4 text-amber-400" /> AI Gen
          </button>
          <SaveBtn saving={saving} onClick={save} label={editId ? 'Update' : 'Add News'} />
        </div>
      </div>

      {loading
        ? <div className="flex items-center justify-center h-20"><Loader2 className="w-5 h-5 animate-spin text-amber-400" /></div>
        : items.length === 0
          ? <p className="text-center text-white/30 text-sm py-6">No company news yet. Add above.</p>
          : <div className="space-y-2">
              <p className="text-white/30 text-xs">{items.length} item{items.length!==1?'s':''}</p>
              {items.map(n => (
                <div key={n.id} className="flex items-center gap-3 bg-black/20 rounded-xl p-3 border border-white/8 group">
                  {n.image && <img src={n.image} alt="" className="w-14 h-10 rounded-lg object-cover shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm truncate">{n.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[9px] bg-amber-500/15 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded-full font-bold">{n.category}</span>
                      {n.time && <span className="text-[10px] text-white/30">{n.time}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={()=>startEdit(n)} className="px-2.5 py-1.5 bg-white/5 border border-white/10 text-white/60 rounded-lg text-xs font-bold hover:bg-white/10 transition"><Edit2 className="w-3 h-3" /></button>
                    <button onClick={()=>del(n.id)} className="px-2.5 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500/20 transition"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
            </div>
      }
    </div>
  );
}

/* ─── Events Manager ────────────────────────────────────── */
interface Evt { id: string; title: string; desc: string; location: string; day: string; month: string; year: string; time: string; image: string; }
const EMPTY_EVT = (): Omit<Evt,'id'> => ({ title:'', desc:'', location:'', day:'', month:'', year:new Date().getFullYear().toString(), time:'10:00 AM - 05:00 PM', image:'' });
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function EventsManager() {
  const [items,   setItems]   = useState<Evt[]>([]);
  const [loading, setLoading] = useState(true);
  const [form,    setForm]    = useState(EMPTY_EVT());
  const [editId,  setEditId]  = useState<string|null>(null);
  const [saving,  setSaving]  = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await fetch(`${API}/api/events`);
    const json = await res.json();
    setItems(json.status === 'success' ? json.data : []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const startEdit = (e: Evt) => { setEditId(e.id); setForm({ title:e.title, desc:e.desc||'', location:e.location||'', day:e.day||'', month:e.month||'', year:e.year||'', time:e.time||'', image:e.image||'' }); };
  const cancel = () => { setEditId(null); setForm(EMPTY_EVT()); };

  const save = async () => {
    if (!form.title) return alert('Title required');
    setSaving(true);
    const url    = editId ? `${API}/api/events/${editId}` : `${API}/api/events`;
    const method = editId ? 'PUT' : 'POST';
    await fetch(url, { method, headers:{ 'Content-Type':'application/json' }, body: JSON.stringify(form) });
    setSaving(false); cancel(); load();
  };

  const del = async (id: string) => {
    if (!confirm('Delete this event?')) return;
    await fetch(`${API}/api/events/${id}`, { method:'DELETE' });
    setItems(p => p.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-5">
      <div className="bg-black/20 border border-amber-400/20 rounded-xl p-5 space-y-4">
        <p className="text-amber-400 font-black text-sm">{editId ? '✏️ Edit Event' : '➕ Add Upcoming Event'}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Field label="Event Title *" value={form.title} onChange={v=>setForm(p=>({...p,title:v}))} maxLen={120} placeholder="e.g. Solar India Expo 2025" />
            <Field label="Description" value={form.desc} onChange={v=>setForm(p=>({...p,desc:v}))} maxLen={400} rows={3} placeholder="Describe the event..." />
            <Field label="Location" value={form.location} onChange={v=>setForm(p=>({...p,location:v}))} maxLen={120} placeholder="e.g. Pragati Maidan, New Delhi" />
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5">Day</p>
                <input type="text" maxLength={2} value={form.day} onChange={e=>setForm(p=>({...p,day:e.target.value}))} placeholder="15" className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50 placeholder-white/20" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5">Month</p>
                <select value={form.month} onChange={e=>setForm(p=>({...p,month:e.target.value}))} className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50">
                  <option value="" className="bg-[#0a0f1e]">Month</option>
                  {MONTHS.map(m => <option key={m} value={m} className="bg-[#0a0f1e]">{m}</option>)}
                </select>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5">Year</p>
                <input type="text" maxLength={4} value={form.year} onChange={e=>setForm(p=>({...p,year:e.target.value}))} placeholder="2025" className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50 placeholder-white/20" />
              </div>
            </div>
            <Field label="Timing" value={form.time} onChange={v=>setForm(p=>({...p,time:v}))} maxLen={60} placeholder="09:00 AM - 06:00 PM" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Event Image</p>
            <ImgUpload value={form.image} onChange={v=>setForm(p=>({...p,image:v}))} />
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          {editId && <button onClick={cancel} className="px-4 py-2 bg-white/5 border border-white/10 text-white/60 rounded-xl text-sm font-bold hover:bg-white/10 transition">Cancel</button>}
          <button onClick={async () => {
            const btn = document.getElementById('ai-event-btn') as HTMLButtonElement; if(btn) btn.disabled = true;
            try {
              const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/ai/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: `Write a short description for an upcoming event titled: ${form.title || 'Untitled'} at ${form.location || 'Unknown location'}.`, sectionName: "Event Item" }) });
              const data = await res.json();
              if (data.status === 'success' && data.data.text) setForm(p => ({...p, desc: data.data.text}));
              else alert('AI Generation failed.');
            } catch { alert('Error generating text.'); }
            if(btn) btn.disabled = false;
          }} id="ai-event-btn" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-all disabled:opacity-50">
            <Wand2 className="w-4 h-4 text-amber-400" /> AI Gen
          </button>
          <SaveBtn saving={saving} onClick={save} label={editId ? 'Update Event' : 'Add Event'} />
        </div>
      </div>

      {loading
        ? <div className="flex items-center justify-center h-20"><Loader2 className="w-5 h-5 animate-spin text-amber-400" /></div>
        : items.length === 0
          ? <p className="text-center text-white/30 text-sm py-6">No events yet. Add above.</p>
          : <div className="space-y-2">
              <p className="text-white/30 text-xs">{items.length} event{items.length!==1?'s':''}</p>
              {items.map(e => (
                <div key={e.id} className="flex items-center gap-3 bg-black/20 rounded-xl p-3 border border-white/8">
                  <div className="w-12 h-10 bg-amber-500/15 rounded-lg flex flex-col items-center justify-center shrink-0 border border-amber-500/20">
                    <span className="text-amber-400 font-black text-sm leading-none">{e.day}</span>
                    <span className="text-amber-400/60 text-[9px] font-bold">{e.month}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm truncate">{e.title}</p>
                    <p className="text-white/30 text-[11px] truncate">{e.location}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={()=>startEdit(e)} className="px-2.5 py-1.5 bg-white/5 border border-white/10 text-white/60 rounded-lg text-xs font-bold hover:bg-white/10 transition"><Edit2 className="w-3 h-3" /></button>
                    <button onClick={()=>del(e.id)} className="px-2.5 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500/20 transition"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
            </div>
      }
    </div>
  );
}

/* ─── News Hero Manager ─────────────────────────────────── */
function NewsHeroManager({ map }: { map: Record<string,any> }) {
  const K = 'NEWS_HERO';
  const [title, setTitle] = useState(map[K]?.title || 'News & Events');
  const [desc,  setDesc]  = useState(map[K]?.description || 'Stay updated with the latest solar industry news, company updates and upcoming events.');
  const [img,   setImg]   = useState(map[K]?.imageUrl || '/18.png');
  const [sv,    setSv]    = useState(false);
  const [up,    setUp]    = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setUp(true);
    try { setImg(await uploadImg(f)); } catch { alert('Upload failed'); }
    setUp(false);
  };

  const save = async () => {
    setSv(true);
    await fetch(`${API}/api/content`, {
      method:'PUT', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ tabGroup:'News', sectionKey:K, sectionName:'News Hero', title, description:desc, imageUrl:img }),
    });
    setSv(false); alert('Hero saved!');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Field label="Hero Heading" value={title} onChange={setTitle} maxLen={80} placeholder="News & Events" />
          <Field label="Subheading" value={desc} onChange={setDesc} maxLen={250} rows={3} placeholder="Stay updated with..." />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Hero Right-Side Image</p>
          <div className="w-full h-28 rounded-xl bg-black/40 overflow-hidden border border-white/10 mb-2">
            {img ? <img src={img} alt="" className="w-full h-full object-cover opacity-80" />
                 : <div className="w-full h-full flex items-center justify-center text-white/20"><ImageIcon className="w-5 h-5"/></div>}
          </div>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center bg-black/30 border border-white/10 rounded-lg overflow-hidden">
              <LinkIcon className="w-3 h-3 text-white/30 ml-2 shrink-0"/>
              <input type="text" placeholder="Image URL" value={img} onChange={e=>setImg(e.target.value)} className="w-full bg-transparent text-[11px] text-white p-2 outline-none placeholder-white/20"/>
            </div>
            <label className="flex items-center gap-1 px-3 py-2 bg-white/8 hover:bg-white/15 text-white/70 text-[11px] font-semibold rounded-lg cursor-pointer border border-white/5 whitespace-nowrap">
              {up?<Loader2 className="w-3 h-3 animate-spin"/>:<Upload className="w-3 h-3"/>}{up?'Uploading…':'Upload'}
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={up}/>
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <button onClick={async () => {
            const btn = document.getElementById('ai-hero-btn') as HTMLButtonElement; if(btn) btn.disabled = true;
            try {
              const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/ai/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: `Generate a catchy hero title and a short description for the News & Events page of a solar energy company.`, sectionName: "News Hero" }) });
              const data = await res.json();
              if (data.status === 'success' && data.data.text) setDesc(data.data.text);
              else alert('AI Generation failed.');
            } catch { alert('Error generating text.'); }
            if(btn) btn.disabled = false;
        }} id="ai-hero-btn" className="flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-all disabled:opacity-50">
          <Wand2 className="w-4 h-4 text-amber-400" /> AI Auto-Generate
        </button>
        <button onClick={save} disabled={sv} className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-[#0A192F] font-bold rounded-xl text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50">
          {sv?<Loader2 className="w-4 h-4 animate-spin"/>:<Save className="w-4 h-4"/>}Save Hero
        </button>
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */
export default function NewsAdminPage() {
  const [tab, setTab] = useState<'news'|'events'|'hero'>('news');
  const [map, setMap] = useState<Record<string,any>>({});
  const [mapLoading, setMapLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/content`).then(r=>r.json()).then(d=>{ setMap(d.map||{}); setMapLoading(false); }).catch(()=>setMapLoading(false));
  }, []);

  const TABS = [
    { id: 'news',   label: 'Company News & Updates', icon: <Newspaper className="w-4 h-4" /> },
    { id: 'events', label: 'Upcoming Events',         icon: <Calendar className="w-4 h-4" /> },
    { id: 'hero',   label: 'Hero Section',            icon: <TrendingUp className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
          <TrendingUp className="w-3.5 h-3.5" /> News & Events Manager
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">News & Events Page</h1>
        <p className="text-sm text-white/50 mt-1">Manage company news, upcoming events — all shown live on the News page.</p>
      </div>

      {/* Info banner */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3 flex items-start gap-3">
        <TrendingUp className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
        <div className="text-xs text-blue-300">
          <strong className="font-black">Live Solar News</strong> (top section) auto-updates from RSS feeds — PV Magazine, Mercom India, CleanTechnica, etc. No action needed.
          Below you can manage <strong>Company News</strong> and <strong>Upcoming Events</strong> which are fully editable.
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === t.id ? 'bg-amber-400 text-[#0A192F]' : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'}`}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        {tab === 'news' && (
          <>
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5">
              <Newspaper className="w-4 h-4 text-amber-400" />
              <h2 className="text-xl font-black text-white">Company News & Updates</h2>
              <span className="ml-auto text-xs text-white/30 font-semibold">Shown on News page → Company News section</span>
            </div>
            <CompanyNewsManager />
          </>
        )}
        {tab === 'events' && (
          <>
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5">
              <Calendar className="w-4 h-4 text-amber-400" />
              <h2 className="text-xl font-black text-white">Upcoming Events</h2>
              <span className="ml-auto text-xs text-white/30 font-semibold">Shown on News page → Upcoming Events section</span>
            </div>
            <EventsManager />
          </>
        )}
        {tab === 'hero' && (
          <>
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5">
              <ImageIcon className="w-4 h-4 text-amber-400" />
              <h2 className="text-xl font-black text-white">News Page Hero Section</h2>
              <span className="ml-auto text-xs text-white/30 font-semibold">Hero image & heading on /news page</span>
            </div>
            {mapLoading ? <div className="flex items-center justify-center h-20"><Loader2 className="w-5 h-5 animate-spin text-amber-400"/></div> : <NewsHeroManager map={map}/>}
          </>
        )}
      </div>
    </div>
  );
}
