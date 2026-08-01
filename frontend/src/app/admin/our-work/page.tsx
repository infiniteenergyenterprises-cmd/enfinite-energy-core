'use client';

import React, { useState, useEffect, useRef } from 'react';
import { customConfirm } from '@/components/utils/customConfirm';
import {
  Save, Loader2, Upload, Link as LinkIcon, Image as ImageIcon,
  Award, Zap, Video, Trash2, Plus, Play, X, Grid3X3, MapPin, Activity, Wand2
} from 'lucide-react';

const API       = (process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') : 'http://localhost:5000');

/* ─── upload helper ─────────────────────────────────────── */
async function uploadToImgbb(file: File): Promise<string> {
  const form = new FormData();
  form.append('image', file);
  const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL || (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + ''}/upload`, { method: 'POST', body: form });
  const json = await res.json();
  if (json.status !== 'success') throw new Error('Upload failed');
  return json.data.url;
}

async function getContent(): Promise<Record<string, any>> {
  const res = await fetch(`${API}/api/content?t=${Date.now()}`, { cache: 'no-store' });
  if (!res.ok) return {};
  const { map } = await res.json();
  return map || {};
}

async function saveContent(key: string, name: string, title: string, desc: string, img: string) {
  try {
    const res = await fetch(`${API}/api/content`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tabGroup: 'OurWork', sectionKey: key, sectionName: name, title, description: desc, imageUrl: img }),
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

/* ─── shared UI ─────────────────────────────────────────── */
function Field({ label, value, onChange, maxLen = 100, rows = 1 }: {
  label: string; value: string; onChange: (v: string) => void; maxLen?: number; rows?: number;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{label}</span>
        <span className={`text-[10px] font-bold ${value.length > maxLen * 0.9 ? 'text-amber-400' : 'text-white/25'}`}>{value.length}/{maxLen}</span>
      </div>
      {rows > 1
        ? <textarea rows={rows} maxLength={maxLen} value={value} onChange={e => onChange(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50 resize-none" />
        : <input type="text" maxLength={maxLen} value={value} onChange={e => onChange(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50" />
      }
    </div>
  );
}

function ImgField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [up, setUp] = useState(false);
  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setUp(true);
    try { onChange(await uploadToImgbb(f)); } catch { alert('Upload failed'); }
    setUp(false);
  };
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">{label}</p>
      <div className="w-full h-24 rounded-xl bg-black/40 overflow-hidden border border-white/10 mb-2">
        {value ? <img src={value} alt="" className="w-full h-full object-cover opacity-80" />
               : <div className="w-full h-full flex flex-col items-center justify-center text-white/20"><ImageIcon className="w-5 h-5 mb-1" /><span className="text-[10px]">No image</span></div>}
      </div>
      <div className="flex gap-2">
        <div className="flex-1 flex items-center bg-black/30 border border-white/10 rounded-lg overflow-hidden">
          <LinkIcon className="w-3 h-3 text-white/30 ml-2 shrink-0" />
          <input type="text" placeholder="URL" value={value} onChange={e => onChange(e.target.value)} className="w-full bg-transparent text-[11px] text-white p-2 outline-none placeholder-white/20" />
        </div>
        <label className="flex items-center gap-1.5 px-3 py-1.5 bg-white/8 hover:bg-white/15 text-white/70 text-[11px] font-semibold rounded-lg cursor-pointer transition border border-white/5 whitespace-nowrap">
          {up ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}{up ? 'Uploading…' : 'Upload'}
          <input type="file" accept="image/*" className="hidden" onChange={handle} disabled={up} />
        </label>
      </div>
    </div>
  );
}

function SaveBtn({ saving, onClick, label = 'Save' }: { saving: boolean; onClick: () => void; label?: string }) {
  return (
    <button onClick={onClick} disabled={saving}
      className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-[#0A192F] font-bold rounded-xl text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50">
      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}{label}
    </button>
  );
}

/* ─── Hero Section ──────────────────────────────────────── */
function HeroSection({ map }: { map: Record<string, any> }) {
  const K = 'WORK_HERO';
  const [title, setTitle] = useState(map[K]?.title || 'Our Work\nReal Projects.\nReal Impact.');
  const [desc,  setDesc]  = useState(map[K]?.description || 'Every project we deliver reflects our commitment to quality, performance and a sustainable future.');
  const [img,   setImg]   = useState(map[K]?.imageUrl || '/17.png');
  const [sv,    setSv]    = useState(false);
  const [gen,   setGen]   = useState(false);
  const save = async () => { setSv(true); await saveContent(K, 'Our Work Hero', title, desc, img); setSv(false); alert('Saved!'); };
  const aiGen = async () => {
    setGen(true);
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/ai/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: "Generate a catchy hero title and a short description for an 'Our Work' portfolio section of a solar company.", sectionName: "Our Work Hero" }) });
      const data = await res.json();
      if (data.status === 'success' && data.data.text) setDesc(data.data.text);
      else alert('AI Generation failed.');
    } catch { alert('Error generating text.'); }
    setGen(false);
  };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Field label="Hero Heading" value={title} onChange={setTitle} maxLen={120} rows={3} />
          <Field label="Subheading" value={desc} onChange={setDesc} maxLen={250} rows={3} />
        </div>
        <ImgField label="Hero Background Image" value={img} onChange={setImg} />
      </div>
      <div className="flex justify-end gap-3">
        <button onClick={aiGen} disabled={gen} className="flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-all disabled:opacity-50">
          {gen ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4 text-amber-400" />} AI Auto-Generate
        </button>
        <SaveBtn saving={sv} onClick={save} />
      </div>
    </div>
  );
}

/* ─── Featured Project Card ─────────────────────────────── */
function ProjectCard({ map, projKey, defaultTitle, defaultDesc, tag }: { map: Record<string,any>; projKey: string; defaultTitle: string; defaultDesc: string; tag: string; }) {
  const [title, setTitle] = useState(map[projKey]?.title || defaultTitle);
  const [desc,  setDesc]  = useState(map[projKey]?.description || defaultDesc);
  const [img,   setImg]   = useState(map[projKey]?.imageUrl || '');
  const [sv,    setSv]    = useState(false);
  const tagColor = tag==='Commercial'?'bg-blue-500':tag==='Industrial'?'bg-purple-500':tag==='Agriculture'?'bg-green-500':tag==='Government'?'bg-orange-500':tag==='Residential'?'bg-teal-500':'bg-pink-500';
  const save = async () => { setSv(true); await saveContent(projKey, defaultTitle, title, desc, img); setSv(false); alert('Saved!'); };
  const [gen, setGen] = useState(false);
  const aiGen = async () => {
    setGen(true);
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/ai/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: `Generate a short description for a ${tag} solar project titled ${defaultTitle}.`, sectionName: "Project Card" }) });
      const data = await res.json();
      if (data.status === 'success' && data.data.text) setDesc(data.data.text);
      else alert('AI Generation failed.');
    } catch { alert('Error generating text.'); }
    setGen(false);
  };
  return (
    <div className="bg-black/20 rounded-xl p-4 space-y-3 border border-white/8">
      <div className="flex items-center gap-2">
        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase text-white ${tagColor}`}>{tag}</span>
        <span className="text-amber-400 font-black text-sm">{defaultTitle}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Field label="Title" value={title} onChange={setTitle} maxLen={80} />
          <Field label="Description" value={desc} onChange={setDesc} maxLen={250} rows={3} />
        </div>
        <ImgField label="Image" value={img} onChange={setImg} />
      </div>
      <div className="flex justify-end gap-3">
        <button onClick={aiGen} disabled={gen} className="flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-all disabled:opacity-50">
          {gen ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4 text-amber-400" />} AI Auto-Generate
        </button>
        <SaveBtn saving={sv} onClick={save} />
      </div>
    </div>
  );
}

/* ─── Gallery Manager ───────────────────────────────────── */
interface GalleryItem { id: string; url: string; title?: string; category?: string; type: string; }

function GalleryManager() {
  const [items,    setItems]    = useState<GalleryItem[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [uploading,setUploading]= useState(false);
  const [newUrl,   setNewUrl]   = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCat,   setNewCat]   = useState('Residential');
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch(`${API}/api/gallery`);
    const json = await res.json();
    setItems(json.status === 'success' ? json.data : []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const addItem = async (url: string) => {
    if (!url) return;
    await fetch(`${API}/api/gallery`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, type: 'IMAGE', title: newTitle, category: newCat }),
    });
    setNewUrl(''); setNewTitle('');
    load();
  };

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      try {
        const url = await uploadToImgbb(files[i]);
        await fetch(`${API}/api/gallery`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, type: 'IMAGE', title: files[i].name.replace(/\.[^/.]+$/, ''), category: newCat }),
        });
      } catch { alert(`Failed: ${files[i].name}`); }
    }
    setUploading(false);
    load();
  };

  const deleteItem = async (id: string) => {
    if (!(await customConfirm('Delete this image?'))) return;
    await fetch(`${API}/api/gallery/${id}`, { method: 'DELETE' });
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const CATS = ['Residential', 'Commercial', 'Industrial', 'Agriculture', 'Government', 'Other'];

  return (
    <div className="space-y-6">
      {/* Upload Box */}
      <div className="bg-black/20 border border-white/10 rounded-xl p-5 space-y-4">
        <p className="text-amber-400 font-black text-sm">Add New Images</p>

        {/* Drag & drop / multi-upload */}
        <label
          className="flex flex-col items-center justify-center gap-3 w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-amber-400/50 transition-colors bg-white/3"
          onDragOver={e => { e.preventDefault(); }}
          onDrop={e => { e.preventDefault(); if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files); }}
        >
          {uploading
            ? <><Loader2 className="w-6 h-6 text-amber-400 animate-spin" /><span className="text-sm text-white/60">Uploading…</span></>
            : <><Upload className="w-6 h-6 text-white/30" /><span className="text-sm text-white/50">Drag & drop images or <span className="text-amber-400 font-bold">browse</span></span><span className="text-[11px] text-white/30">Multiple files supported • Unlimited uploads</span></>
          }
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={e => e.target.files && handleFiles(e.target.files)} disabled={uploading} />
        </label>

        {/* Category selector + URL add */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select value={newCat} onChange={e => setNewCat(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50 col-span-1">
            {CATS.map(c => <option key={c} value={c} className="bg-[#0a0f1e]">{c}</option>)}
          </select>
          <input type="text" placeholder="Title (optional)" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50 col-span-1" />
          <div className="flex gap-2 col-span-1">
            <input type="text" placeholder="Or paste image URL" value={newUrl} onChange={e => setNewUrl(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50" />
            <button onClick={() => addItem(newUrl)} disabled={!newUrl} className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-[#0A192F] font-bold rounded-xl text-sm disabled:opacity-40 whitespace-nowrap">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      {loading
        ? <div className="flex items-center justify-center h-32"><Loader2 className="w-6 h-6 animate-spin text-amber-400" /></div>
        : items.length === 0
          ? <div className="text-center py-10 text-white/30 text-sm">No images yet. Upload some above.</div>
          : (
            <div>
              <p className="text-white/40 text-xs mb-3">{items.length} image{items.length !== 1 ? 's' : ''} in gallery</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {items.map(item => (
                  <div key={item.id} className="relative group rounded-xl overflow-hidden aspect-square bg-black/30 border border-white/8">
                    <img src={item.url} alt={item.title || ''} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    {item.category && <span className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">{item.category}</span>}
                    <button onClick={() => deleteItem(item.id)} className="absolute top-1.5 right-1.5 w-7 h-7 bg-red-500/80 hover:bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
      }
    </div>
  );
}

/* ─── Video Blog Manager ────────────────────────────────── */
interface VideoItem { id: string; title: string; description?: string; duration?: string; thumbnail?: string; category?: string; videoUrl?: string; }

const EMPTY_VIDEO = (): Omit<VideoItem,'id'> => ({ title: '', description: '', duration: '', thumbnail: '', category: 'Guide', videoUrl: '' });

function VideoManager() {
  const [videos,   setVideos]   = useState<VideoItem[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [form,     setForm]     = useState(EMPTY_VIDEO());
  const [editId,   setEditId]   = useState<string | null>(null);
  const [saving,   setSaving]   = useState(false);
  const [thumbUp,  setThumbUp]  = useState(false);
  const [vidUp,    setVidUp]    = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await fetch(`${API}/api/videos`);
    const json = await res.json();
    setVideos(json.status === 'success' ? json.data : []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const startEdit = (v: VideoItem) => {
    setEditId(v.id);
    setForm({ title: v.title, description: v.description||'', duration: v.duration||'', thumbnail: v.thumbnail||'', category: v.category||'Guide', videoUrl: v.videoUrl||'' });
  };
  const cancelEdit = () => { setEditId(null); setForm(EMPTY_VIDEO()); };

  const save = async () => {
    if (!form.title) return alert('Title required');
    setSaving(true);
    if (editId) {
      await fetch(`${API}/api/videos/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    } else {
      await fetch(`${API}/api/videos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    setSaving(false);
    cancelEdit();
    load();
  };

  const del = async (id: string) => {
    if (!(await customConfirm('Delete this video?'))) return;
    await fetch(`${API}/api/videos/${id}`, { method: 'DELETE' });
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  const handleThumb = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setThumbUp(true);
    try { setForm(p => ({ ...p, thumbnail: '' })); const url = await uploadToImgbb(f); setForm(p => ({ ...p, thumbnail: url })); } catch { alert('Upload failed'); }
    setThumbUp(false);
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setVidUp(true);
    try { const url = await uploadToImgbb(f); setForm(p => ({ ...p, videoUrl: url })); } catch { alert('Video upload failed'); }
    setVidUp(false);
  };

  const CATS = ['Guide', 'Testimonial', 'Education', 'Project Tour', 'News', 'Other'];

  return (
    <div className="space-y-5">
      <div className="bg-black/20 border border-amber-400/20 rounded-xl p-5 space-y-4">
      <p className="text-amber-400 font-black text-sm">{editId ? 'Edit Video' : 'Add New Video'}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Field label="Video Title *" value={form.title} onChange={v => setForm(p=>({...p,title:v}))} maxLen={120} />
          <Field label="Description" value={form.description||''} onChange={v => setForm(p=>({...p,description:v}))} maxLen={300} rows={3} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Category</p>
              <select value={form.category} onChange={e => setForm(p=>({...p,category:e.target.value}))} className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50">
                {CATS.map(c => <option key={c} value={c} className="bg-[#0a0f1e]">{c}</option>)}
              </select>
            </div>
            <Field label="Duration (e.g. 5:20)" value={form.duration||''} onChange={v => setForm(p=>({...p,duration:v}))} maxLen={10} />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Upload Main Video or Paste Link</label>
              <span className="text-[10px] font-bold text-white/20">{(form.videoUrl||'').length}/300</span>
            </div>
            <div className="flex gap-2">
              <input type="text" value={form.videoUrl||''} onChange={e => setForm(p=>({...p,videoUrl:e.target.value}))} maxLength={300} placeholder="Paste link or upload video" className="flex-1 bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50" />
              <label className="flex items-center justify-center px-4 bg-white/8 hover:bg-white/15 text-white/70 text-xs font-bold rounded-xl cursor-pointer border border-white/5 transition whitespace-nowrap">
                {vidUp ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <Upload className="w-4 h-4 mr-1.5" />} {vidUp ? 'Wait...' : 'Upload'}
                <input type="file" accept="video/*,.mp4,.mkv,.avi,.mov,.webm" className="hidden" onChange={handleVideoUpload} disabled={vidUp} />
              </label>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Video Cover Photo (Thumbnail)</p>
          <div className="w-full h-36 rounded-xl bg-black/40 overflow-hidden border border-white/10 mb-2">
            {form.thumbnail ? <img src={form.thumbnail} alt="" className="w-full h-full object-cover opacity-80" />
                            : <div className="w-full h-full flex flex-col items-center justify-center text-white/20"><Play className="w-7 h-7 mb-1" /><span className="text-xs">No thumbnail</span></div>}
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="Thumbnail URL" value={form.thumbnail||''} onChange={e => setForm(p=>({...p,thumbnail:e.target.value}))} className="flex-1 bg-white/5 border border-white/10 rounded-xl text-white text-xs p-2.5 outline-none focus:border-amber-400/50" />
            <label className="flex items-center gap-1 px-3 py-2 bg-white/8 hover:bg-white/15 text-white/70 text-[11px] font-semibold rounded-lg cursor-pointer border border-white/5 whitespace-nowrap">
              {thumbUp ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}Upload
              <input type="file" accept="image/*" className="hidden" onChange={handleThumb} disabled={thumbUp} />
            </label>
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        {editId && <button onClick={cancelEdit} className="px-4 py-2 bg-white/5 border border-white/10 text-white/60 rounded-xl text-sm font-bold hover:bg-white/10 transition">Cancel</button>}
        <button onClick={async () => {
            const btn = document.getElementById('ai-video-btn') as HTMLButtonElement; if(btn) btn.disabled = true;
            try {
              const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/ai/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: `Write a short description for a solar energy video titled: ${form.title || 'Untitled'}. Category: ${form.category}`, sectionName: "Video Item" }) });
              const data = await res.json();
              if (data.status === 'success' && data.data.text) setForm(p => ({...p, description: data.data.text}));
              else alert('AI Generation failed.');
            } catch { alert('Error generating text.'); }
            if(btn) btn.disabled = false;
        }} id="ai-video-btn" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-all disabled:opacity-50">
          <Wand2 className="w-4 h-4 text-amber-400" /> AI Gen
        </button>
        <SaveBtn saving={saving} onClick={save} label={editId ? 'Update Video' : 'Add Video'} />
      </div>
    </div>

    {loading
        ? <div className="flex items-center justify-center h-24"><Loader2 className="w-6 h-6 animate-spin text-amber-400" /></div>
        : videos.length === 0
          ? <div className="text-center py-8 text-white/30 text-sm">No videos yet. Add one above.</div>
          : (
            <div>
              <p className="text-white/40 text-xs mb-3">{videos.length} video{videos.length !== 1 ? 's' : ''} total</p>
              <div className="space-y-3">
                {videos.map(v => (
                  <div key={v.id} className="flex items-center gap-4 bg-black/20 rounded-xl p-3 border border-white/8 group">
                    <div className="w-20 h-14 rounded-lg overflow-hidden bg-black/40 shrink-0 relative">
                      {v.thumbnail ? <img src={v.thumbnail} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-white/20"><Play className="w-5 h-5" /></div>}
                      {v.duration && <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[8px] font-bold px-1 rounded">{v.duration}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm truncate">{v.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {v.category && <span className="text-[9px] bg-amber-500/15 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">{v.category}</span>}
                        {v.videoUrl && <a href={v.videoUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-400 hover:text-blue-300 truncate max-w-[120px]">🔗 Watch</a>}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => startEdit(v)} className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/60 rounded-lg text-xs font-bold hover:bg-white/10 transition">Edit</button>
                      <button onClick={() => del(v.id)} className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500/20 transition"><Trash2 className="w-3.5 h-3.5" /></button>
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

/* ─── Locations Manager ─────────────────────────────────── */
interface Loc { id: string; city: string; state: string; activeProjects: number; status: string; }
const EMPTY_LOC = (): Omit<Loc,'id'> => ({ city: '', state: '', activeProjects: 0, status: 'Active' });
const STATUSES = ['Active', 'High Activity', 'New', 'Upcoming'];
const INDIA_STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu and Kashmir','Ladakh'];

function LocationsManager() {
  const [locs,    setLocs]    = useState<Loc[]>([]);
  const [loading, setLoading] = useState(true);
  const [form,    setForm]    = useState(EMPTY_LOC());
  const [editId,  setEditId]  = useState<string|null>(null);
  const [saving,  setSaving]  = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await fetch(`${API}/api/locations`);
    const json = await res.json();
    setLocs(json.status === 'success' ? json.data : []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const startEdit = (l: Loc) => { setEditId(l.id); setForm({ city: l.city, state: l.state, activeProjects: l.activeProjects, status: l.status }); };
  const cancelEdit = () => { setEditId(null); setForm(EMPTY_LOC()); };

  const save = async () => {
    if (!form.city) return alert('City is required');
    setSaving(true);
    if (editId) {
      await fetch(`${API}/api/locations/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    } else {
      await fetch(`${API}/api/locations`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    }
    setSaving(false); cancelEdit(); load();
  };

  const del = async (id: string) => {
    if (!(await customConfirm('Delete this location?'))) return;
    await fetch(`${API}/api/locations/${id}`, { method: 'DELETE' });
    setLocs(p => p.filter(l => l.id !== id));
  };

  const statusColor = (s: string) => s === 'High Activity' ? 'bg-amber-500/15 text-amber-400 border-amber-500/25' : s === 'New' ? 'bg-blue-500/15 text-blue-400 border-blue-500/25' : s === 'Upcoming' ? 'bg-purple-500/15 text-purple-400 border-purple-500/25' : 'bg-orange-500/15 text-orange-400 border-orange-500/25';

  return (
    <div className="space-y-5">
      {/* Form */}
      <div className="bg-black/20 border border-amber-400/20 rounded-xl p-5 space-y-4">
        <p className="text-amber-400 font-black text-sm">{editId ? '✏️ Edit Location' : '➕ Add New Location'}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5">City *</p>
            <input type="text" placeholder="e.g. Lucknow" value={form.city} onChange={e => setForm(p=>({...p,city:e.target.value}))}
              className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5">State *</p>
            <select value={form.state} onChange={e => setForm(p=>({...p,state:e.target.value}))}
              className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50">
              <option value="" className="bg-[#0a0f1e]">Select State</option>
              {INDIA_STATES.map(s => <option key={s} value={s} className="bg-[#0a0f1e]">{s}</option>)}
            </select>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5">Active Projects</p>
            <input type="number" min={0} value={form.activeProjects} onChange={e => setForm(p=>({...p,activeProjects:parseInt(e.target.value)||0}))}
              className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5">Status</p>
            <select value={form.status} onChange={e => setForm(p=>({...p,status:e.target.value}))}
              className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50">
              {STATUSES.map(s => <option key={s} value={s} className="bg-[#0a0f1e]">{s}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          {editId && <button onClick={cancelEdit} className="px-4 py-2 bg-white/5 border border-white/10 text-white/60 rounded-xl text-sm font-bold hover:bg-white/10 transition">Cancel</button>}
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-[#0A192F] font-bold rounded-xl text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {editId ? 'Update Location' : 'Add Location'}
          </button>
        </div>
      </div>

      {/* Locations List */}
      {loading
        ? <div className="flex items-center justify-center h-24"><Loader2 className="w-6 h-6 animate-spin text-amber-400" /></div>
        : locs.length === 0
          ? <div className="text-center py-8 text-white/30 text-sm">No locations yet. Add one above.</div>
          : (
            <div>
              <p className="text-white/40 text-xs mb-3">{locs.length} location{locs.length !== 1 ? 's' : ''} — shown on Home & Our Work pages</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {locs.map(loc => (
                  <div key={loc.id} className="bg-black/20 rounded-xl border border-white/8 p-4 group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-orange-500/15 flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-orange-400" />
                        </div>
                        <div>
                          <p className="text-white font-black text-sm">{loc.city}</p>
                          <p className="text-white/40 text-[11px]">{loc.state}</p>
                        </div>
                      </div>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${statusColor(loc.status)} flex items-center gap-1`}>
                        <Activity className="w-2.5 h-2.5" />{loc.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/8">
                      <span className="text-white/60 text-xs font-semibold">
                        <span className="text-white font-black text-base">{loc.activeProjects}</span> active sites
                      </span>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(loc)} className="px-2.5 py-1 bg-white/5 border border-white/10 text-white/60 rounded-lg text-[11px] font-bold hover:bg-white/10 transition">Edit</button>
                        <button onClick={() => del(loc.id)} className="px-2.5 py-1 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-[11px] font-bold hover:bg-red-500/20 transition">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
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
export default function OurWorkAdminPage() {
  const [map,     setMap]     = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'hero'|'projects'|'gallery'|'videos'|'locations'>('hero');

  useEffect(() => { getContent().then(m => { setMap(m); setLoading(false); }); }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-amber-400 animate-spin" /></div>;

  const projects = [
    { key: 'PROJ_100KW', tag: 'Commercial',   title: '100kW Commercial – Noida',     desc: 'Commercial rooftop installation for manufacturing unit.' },
    { key: 'PROJ_500KW', tag: 'Industrial',   title: '500kW Industrial – Surat',     desc: 'Massive industrial solar power plant on factory roofs.' },
    { key: 'PROJ_10HP',  tag: 'Agriculture',  title: '20HP Solar Pump – Hisar',      desc: 'Off-grid solar water pumping system for farmers.' },
    { key: 'PROJ_250KW', tag: 'Government',   title: '250kW Govt Building – Bhopal', desc: 'Government building solar rooftop system.' },
    { key: 'PROJ_5KW',   tag: 'Residential',  title: '10kW Premium Home – Jaipur',   desc: 'Residential villa solar rooftop system.' },
    { key: 'PROJ_50KW',  tag: 'Institutional',title: '50kW University – Pune',       desc: 'University campus solar installation.' },
  ];

  const TABS = [
    { id: 'hero',      label: 'Hero Section',      icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'projects',  label: 'Project Cards',     icon: <Zap className="w-4 h-4" /> },
    { id: 'gallery',   label: 'Gallery',           icon: <Grid3X3 className="w-4 h-4" /> },
    { id: 'videos',    label: 'Video Blog',        icon: <Video className="w-4 h-4" /> },
    { id: 'locations', label: 'Active Locations',  icon: <MapPin className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
          <Award className="w-3.5 h-3.5" /> Our Work Page Manager
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">Our Work Page</h1>
        <p className="text-sm text-white/50 mt-1">Manage gallery images, video blog, project cards and hero section.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab === t.id ? 'bg-amber-400 text-[#0A192F]' : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'}`}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        {tab === 'locations' && (
          <><div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5">
            <MapPin className="w-4 h-4 text-amber-400" />
            <h2 className="text-xl font-black text-white">Active Locations</h2>
            <span className="ml-auto text-xs text-white/30 font-semibold">Shown on Home page & Our Work page</span>
          </div><LocationsManager /></>
        )}
        {tab === 'hero' && (
          <><div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5"><ImageIcon className="w-4 h-4 text-amber-400" /><h2 className="text-xl font-black text-white">Hero Section</h2></div><HeroSection map={map} /></>
        )}
        {tab === 'projects' && (
          <><div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5"><Zap className="w-4 h-4 text-amber-400" /><h2 className="text-xl font-black text-white">Featured Project Cards (6)</h2></div>
          <div className="space-y-4">{projects.map(p => <ProjectCard key={p.key} map={map} projKey={p.key} defaultTitle={p.title} defaultDesc={p.desc} tag={p.tag} />)}</div></>
        )}
        {tab === 'gallery' && (
          <><div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5"><Grid3X3 className="w-4 h-4 text-amber-400" /><h2 className="text-xl font-black text-white">Project Gallery</h2><span className="ml-auto text-xs text-white/30 font-semibold">Unlimited images • shown on Our Work page</span></div><GalleryManager /></>
        )}
        {tab === 'videos' && (
          <><div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5"><Video className="w-4 h-4 text-amber-400" /><h2 className="text-xl font-black text-white">Video Blog</h2><span className="ml-auto text-xs text-white/30 font-semibold">Unlimited videos • top 3 shown on home & our-work</span></div><VideoManager /></>
        )}
      </div>
    </div>
  );
}
