'use client';

import React, { useState, useEffect } from 'react';
import { customConfirm } from '@/components/utils/customConfirm';
import {
  Save, Loader2, Upload, Link as LinkIcon, Image as ImageIcon,
  Trash2, Plus, Briefcase, Edit2, ToggleLeft, ToggleRight, X, Wand2
} from 'lucide-react';

const API       = (process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') : 'http://localhost:5000');

async function uploadImg(file: File): Promise<string> {
  const form = new FormData();
  form.append('image', file);
  const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL || (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + ''}/upload`, { method:'POST', body:form });
  const json = await res.json();
  if (json.status !== 'success') throw new Error('Upload failed');
  return json.data.url;
}

async function getContent(): Promise<Record<string,any>> {
  const res = await fetch(`${API}/api/content`);
  if (!res.ok) return {};
  const { map } = await res.json();
  return map || {};
}

async function saveContent(key: string, name: string, title: string, desc: string, img: string) {
  try {
    const res = await fetch(`${API}/api/content`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tabGroup: 'Careers', sectionKey: key, sectionName: name, title, description: desc, imageUrl: img }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert('Error saving: ' + (err.message || 'Server error'));
      throw new Error('Save failed');
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('content-updated'));
      try { new BroadcastChannel('enfinite-content-sync').postMessage({ type: 'INVALIDATE_CONTENT' }); } catch(e) {}
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/* ─── shared ─────────────────────────────────────────────── */
function Field({ label, value, onChange, maxLen=120, rows=1, placeholder='' }: {
  label:string; value:string; onChange:(v:string)=>void; maxLen?:number; rows?:number; placeholder?:string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{label}</span>
        <span className={`text-[10px] font-bold ${value.length>maxLen*0.9?'text-amber-400':'text-white/25'}`}>{value.length}/{maxLen}</span>
      </div>
      {rows>1
        ? <textarea rows={rows} maxLength={maxLen} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50 resize-none placeholder-white/20" />
        : <input type="text" maxLength={maxLen} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50 placeholder-white/20" />
      }
    </div>
  );
}

function ImgUpload({ label, value, onChange }: { label:string; value:string; onChange:(v:string)=>void }) {
  const [up, setUp] = useState(false);
  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setUp(true); try { onChange(await uploadImg(f)); } catch { alert('Upload failed'); } setUp(false);
  };
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">{label}</p>
      <div className="w-full h-24 rounded-xl bg-black/40 overflow-hidden border border-white/10 mb-2">
        {value ? <img src={value} alt="" className="w-full h-full object-cover opacity-80" />
               : <div className="w-full h-full flex items-center justify-center text-white/20"><ImageIcon className="w-5 h-5"/></div>}
      </div>
      <div className="flex gap-2">
        <div className="flex-1 flex items-center bg-black/30 border border-white/10 rounded-lg overflow-hidden">
          <LinkIcon className="w-3 h-3 text-white/30 ml-2 shrink-0"/>
          <input type="text" placeholder="URL" value={value} onChange={e=>onChange(e.target.value)} className="w-full bg-transparent text-[11px] text-white p-2 outline-none placeholder-white/20"/>
        </div>
        <label className="flex items-center gap-1 px-3 py-2 bg-white/8 hover:bg-white/15 text-white/70 text-[11px] font-semibold rounded-lg cursor-pointer border border-white/5 whitespace-nowrap">
          {up?<Loader2 className="w-3 h-3 animate-spin"/>:<Upload className="w-3 h-3"/>}{up?'Uploading…':'Upload'}
          <input type="file" accept="image/*" className="hidden" onChange={handle} disabled={up}/>
        </label>
      </div>
    </div>
  );
}

function Btn({ saving, label, onClick }: { saving:boolean; label:string; onClick:()=>void }) {
  return (
    <button onClick={onClick} disabled={saving}
      className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-[#0A192F] font-bold rounded-xl text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50">
      {saving?<Loader2 className="w-4 h-4 animate-spin"/>:<Save className="w-4 h-4"/>}{label}
    </button>
  );
}

/* ─── Hero Section ───────────────────────────────────────── */
function HeroManager({ map }: { map:Record<string,any> }) {
  const K = 'CAREERS_HERO';
  const [title, setTitle] = useState(map[K]?.title || 'Build Your Future with Enfinite Energy');
  const [desc,  setDesc]  = useState(map[K]?.description || 'Join our passionate team and be a part of India\'s clean energy revolution.');
  const [img,   setImg]   = useState(map[K]?.imageUrl || '/19.png');
  const [sv,    setSv]    = useState(false);
  const save = async () => { setSv(true); await saveContent(K,'Careers Hero',title,desc,img); setSv(false); alert('Hero saved!'); };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Field label="Hero Heading" value={title} onChange={setTitle} maxLen={100} placeholder="Build Your Future..." />
          <Field label="Subheading" value={desc} onChange={setDesc} maxLen={250} rows={3} placeholder="Join our team..." />
        </div>
        <ImgUpload label="Hero Background Image" value={img} onChange={setImg} />
      </div>
      <div className="flex justify-end gap-3">
        <button onClick={async () => {
            const btn = document.getElementById('ai-career-hero-btn') as HTMLButtonElement; if(btn) btn.disabled = true;
            try {
              const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/ai/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: `Generate a catchy hero title and a short description for the Careers page of a solar energy company.`, sectionName: "Careers Hero" }) });
              const data = await res.json();
              if (data.status === 'success' && data.data.text) setDesc(data.data.text);
              else alert('AI Generation failed.');
            } catch { alert('Error generating text.'); }
            if(btn) btn.disabled = false;
        }} id="ai-career-hero-btn" className="flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-all disabled:opacity-50">
          <Wand2 className="w-4 h-4 text-amber-400" /> AI Auto-Generate
        </button>
        <Btn saving={sv} label="Save Hero" onClick={save}/>
      </div>
    </div>
  );
}

/* ─── Job Listings Manager ───────────────────────────────── */
interface Job { id:string; title:string; department:string; location:string; type:string; description:string; isActive:boolean; experience?:string; salary?:string; createdAt?:string; }

const EMPTY_JOB = (): Omit<Job,'id'> => ({ title:'', department:'Engineering', location:'', type:'Full Time', description:'', isActive:true, experience:'', salary:'' });
const DEPTS = ['Engineering','Sales','Marketing','Operations','Human Resources','Internship','Finance','IT'];
const TYPES = ['Full Time','Part Time','Internship','Contract','Remote'];

function JobsManager() {
  const [jobs,    setJobs]    = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [form,    setForm]    = useState(EMPTY_JOB());
  const [editId,  setEditId]  = useState<string|null>(null);
  const [saving,  setSaving]  = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await fetch(`${API}/api/careers/all`);
    const json = await res.json();
    setJobs(json.success ? json.careers : []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const startEdit = (j: Job) => {
    setEditId(j.id);
    setForm({ title:j.title, department:j.department, location:j.location, type:j.type, description:j.description, isActive:j.isActive, experience:j.experience||'', salary:j.salary||'' });
    document.getElementById('job-form')?.scrollIntoView({ behavior:'smooth' });
  };
  const cancel = () => { setEditId(null); setForm(EMPTY_JOB()); };

  const save = async () => {
    if (!form.title || !form.location) return alert('Title and Location required');
    setSaving(true);
    const url    = editId ? `${API}/api/careers/${editId}` : `${API}/api/careers`;
    const method = editId ? 'PUT' : 'POST';
    await fetch(url, { method, headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
    setSaving(false); cancel(); load();
  };

  const del = async (id: string) => {
    if (!(await customConfirm('Delete this job posting?'))) return;
    await fetch(`${API}/api/careers/${id}`, { method:'DELETE' });
    setJobs(p => p.filter(j => j.id !== id));
  };

  const toggle = async (j: Job) => {
    await fetch(`${API}/api/careers/${j.id}`, {
      method:'PUT', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ ...j, isActive: !j.isActive })
    });
    setJobs(p => p.map(x => x.id===j.id ? {...x, isActive:!x.isActive} : x));
  };

  const deptColor: Record<string,string> = {
    Engineering:'bg-blue-500', Sales:'bg-emerald-500', Marketing:'bg-purple-500',
    Operations:'bg-amber-500', 'Human Resources':'bg-pink-500', Internship:'bg-cyan-500',
    Finance:'bg-indigo-500', IT:'bg-teal-500',
  };

  return (
    <div className="space-y-6">
      {/* Form */}
      <div id="job-form" className="bg-black/20 border border-amber-400/20 rounded-xl p-5 space-y-4">
        <p className="text-amber-400 font-black text-sm">{editId ? '✏️ Edit Job Posting' : '➕ Add New Job Posting'}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Field label="Job Title *" value={form.title} onChange={v=>setForm(p=>({...p,title:v}))} maxLen={100} placeholder="e.g. Senior Solar Engineer" />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5">Department</p>
                <select value={form.department} onChange={e=>setForm(p=>({...p,department:e.target.value}))} className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50">
                  {DEPTS.map(d=><option key={d} value={d} className="bg-[#0a0f1e]">{d}</option>)}
                </select>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5">Job Type</p>
                <select value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))} className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50">
                  {TYPES.map(t=><option key={t} value={t} className="bg-[#0a0f1e]">{t}</option>)}
                </select>
              </div>
            </div>
            <Field label="Location *" value={form.location} onChange={v=>setForm(p=>({...p,location:v}))} maxLen={100} placeholder="e.g. Gurugram, Haryana" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Experience" value={form.experience||''} onChange={v=>setForm(p=>({...p,experience:v}))} maxLen={30} placeholder="e.g. 2-4 Years" />
              <Field label="Salary" value={form.salary||''} onChange={v=>setForm(p=>({...p,salary:v}))} maxLen={40} placeholder="e.g. ₹5-8 LPA" />
            </div>
          </div>
          <div className="space-y-3">
            <Field label="Job Description *" value={form.description} onChange={v=>setForm(p=>({...p,description:v}))} maxLen={500} rows={7} placeholder="Describe the role, responsibilities..." />
            <div className="flex items-center gap-3">
              <button onClick={()=>setForm(p=>({...p,isActive:!p.isActive}))} className="flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white transition">
                {form.isActive ? <ToggleRight className="w-6 h-6 text-emerald-400"/> : <ToggleLeft className="w-6 h-6 text-white/30"/>}
                {form.isActive ? 'Active (visible on site)' : 'Inactive (hidden from site)'}
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          {editId && <button onClick={cancel} className="px-4 py-2 bg-white/5 border border-white/10 text-white/60 rounded-xl text-sm font-bold hover:bg-white/10 transition">Cancel</button>}
          <button onClick={async () => {
            const btn = document.getElementById('ai-job-btn') as HTMLButtonElement; if(btn) btn.disabled = true;
            try {
              const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/ai/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: `Write a short job description for a ${form.title || 'Untitled'} in the ${form.department} department at ${form.location}.`, sectionName: "Job Description" }) });
              const data = await res.json();
              if (data.status === 'success' && data.data.text) setForm(p => ({...p, description: data.data.text}));
              else alert('AI Generation failed.');
            } catch { alert('Error generating text.'); }
            if(btn) btn.disabled = false;
          }} id="ai-job-btn" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-all disabled:opacity-50">
            <Wand2 className="w-4 h-4 text-amber-400" /> AI Gen
          </button>
          <Btn saving={saving} label={editId ? 'Update Job' : 'Add Job'} onClick={save} />
        </div>
      </div>

      {/* Job list */}
      {loading
        ? <div className="flex items-center justify-center h-24"><Loader2 className="w-5 h-5 animate-spin text-amber-400"/></div>
        : jobs.length === 0
          ? <p className="text-center text-white/30 text-sm py-6">No job postings yet. Add above.</p>
          : (
            <div>
              <p className="text-white/30 text-xs mb-3">{jobs.length} job{jobs.length!==1?'s':''} total · {jobs.filter(j=>j.isActive).length} active</p>
              <div className="space-y-2">
                {jobs.map(j => (
                  <div key={j.id} className={`flex items-center gap-3 rounded-xl p-3 border transition-all ${j.isActive ? 'bg-black/20 border-white/8' : 'bg-black/10 border-white/4 opacity-60'}`}>
                    <span className={`w-2 h-2 rounded-full shrink-0 ${j.isActive ? 'bg-emerald-400' : 'bg-white/20'}`}/>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-white font-bold text-sm truncate">{j.title}</p>
                        <span className={`text-[9px] font-black uppercase text-white px-1.5 py-0.5 rounded ${deptColor[j.department]||'bg-gray-500'}`}>{j.department}</span>
                      </div>
                      <p className="text-white/40 text-[11px] mt-0.5">{j.location} · {j.type}{j.experience?` · ${j.experience}`:''}{j.salary?` · ${j.salary}`:''}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={()=>toggle(j)} title={j.isActive?'Deactivate':'Activate'} className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition border ${j.isActive?'bg-emerald-500/10 border-emerald-500/20 text-emerald-400':'bg-white/5 border-white/10 text-white/40'}`}>
                        {j.isActive?'Active':'Inactive'}
                      </button>
                      <button onClick={()=>startEdit(j)} className="px-2.5 py-1.5 bg-white/5 border border-white/10 text-white/60 rounded-lg text-xs font-bold hover:bg-white/10 transition"><Edit2 className="w-3 h-3"/></button>
                      <button onClick={()=>del(j.id)} className="px-2.5 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500/20 transition"><Trash2 className="w-3 h-3"/></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
      }
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */
export default function CareersAdminPage() {
  const [map,     setMap]     = useState<Record<string,any>>({});
  const [loading, setLoading] = useState(true);
  const [tab,     setTab]     = useState<'hero'|'jobs'>('jobs');

  useEffect(() => { getContent().then(m => { setMap(m); setLoading(false); }); }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-amber-400 animate-spin"/></div>;

  const TABS = [
    { id:'jobs', label:'Job Postings', icon:<Briefcase className="w-4 h-4"/> },
    { id:'hero', label:'Hero Section', icon:<ImageIcon className="w-4 h-4"/> },
  ] as const;

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-16">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
          <Briefcase className="w-3.5 h-3.5"/> Careers Page Manager
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">Careers Page</h1>
        <p className="text-sm text-white/50 mt-1">Manage job postings and hero section of the Careers page.</p>
      </div>

      <div className="flex gap-2">
        {TABS.map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${tab===t.id?'bg-amber-400 text-[#0A192F]':'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'}`}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        {tab==='hero' && (
          <><div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5">
            <ImageIcon className="w-4 h-4 text-amber-400"/>
            <h2 className="text-xl font-black text-white">Hero Section</h2>
          </div><HeroManager map={map}/></>
        )}
        {tab==='jobs' && (
          <><div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5">
            <Briefcase className="w-4 h-4 text-amber-400"/>
            <h2 className="text-xl font-black text-white">Job Postings</h2>
            <span className="ml-auto text-xs text-white/30 font-semibold">Add/Edit/Remove jobs — shown live on Careers page</span>
          </div><JobsManager/></>
        )}
      </div>
    </div>
  );
}
