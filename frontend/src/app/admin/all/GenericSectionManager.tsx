'use client';

import React, { useState, useEffect } from 'react';
import { Upload, Save, Loader2, Wand2, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';


interface Props {
  title: string;
  description: string;
  contentKey: string;
}

export function GenericSectionManager({ title, description, contentKey }: Props) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  
  const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/content');
        if (res.ok) {
          const { map } = await res.json();
          if (map[contentKey]) {
            setImageUrl(map[contentKey].imageUrl || '');
            setText({
              title: map[contentKey].title || '',
              description: map[contentKey].description || ''
            });
          }
        }
      } catch (err) {}
      setLoading(false);
    };
    fetchData();
  }, [contentKey]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSaving(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + ''}/upload`, { method: 'POST', body: formData });
      const data = await res.json();
      if (data.status === 'success') setImageUrl(data.data.url);
    } catch (error) {
      alert('Error uploading image.');
    }
    setSaving(false);
  };

  const handleAIGenerate = async () => {
    setGenerating(true);
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Generate a catchy title and a short description (max 200 chars) for the ${title} section of a solar energy website.`,
          sectionName: title
        })
      });
      const data = await res.json();
      if (data.status === 'success' && data.data.text) {
        setText(prev => ({ ...prev, description: data.data.text }));
      }
    } catch (err) {}
    setGenerating(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tabGroup: 'Home',
          sectionKey: contentKey,
          sectionName: title,
          imageUrl,
          title: text.title,
          description: text.description
        })
      });
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('content-updated'));
        try { new BroadcastChannel('enfinite-content-sync').postMessage({ type: 'INVALIDATE_CONTENT' }); } catch(e) {}
      }
      alert(`${title} updated successfully!`);
    } catch (error) {
      alert('Failed to save.');
    }
    setSaving(false);
  };

  if (loading) return null;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-black text-white">{title}</h2>
          <p className="text-xs text-white/50 mt-1">{description}</p>
        </div>
        <button 
          onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-[#0A192F] font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 shrink-0"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Update Section
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Image */}
        <div className="lg:col-span-4 space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Section Image</label>
          <div className="w-full h-40 rounded-xl bg-black/40 overflow-hidden relative border border-white/10">
            {imageUrl ? (
              <img src={imageUrl} alt={title} className="w-full h-full object-cover opacity-80" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                <ImageIcon className="w-8 h-8 mb-2" />
                <span className="text-xs">No Image</span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center bg-black/30 border border-white/10 rounded-lg overflow-hidden">
              <LinkIcon className="w-3 h-3 text-white/30 ml-3 shrink-0" />
              <input type="text" placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full bg-transparent text-[11px] text-white p-2.5 outline-none placeholder-white/20" />
            </div>
            <label className="flex items-center justify-center gap-1.5 w-full bg-white/10 hover:bg-white/15 text-white/80 text-[11px] font-semibold py-2.5 rounded-lg cursor-pointer transition-colors border border-white/5">
              <Upload className="w-3.5 h-3.5" /> Upload New
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            </label>
          </div>
        </div>

        {/* Right: Text */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Text Content</label>
            <button onClick={handleAIGenerate} disabled={generating} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-xs font-bold transition-all disabled:opacity-50">
              {generating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />} AI Auto-Generate
            </button>
          </div>
          
          <div>
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-[10px] font-semibold text-white/40">Heading</span>
              <span className={`text-[10px] font-bold ${text.title.length > 60 ? 'text-red-400' : 'text-white/30'}`}>{text.title.length} / 60</span>
            </div>
            <input type="text" maxLength={60} value={text.title} onChange={e => setText(prev => ({...prev, title: e.target.value}))} className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50" />
          </div>

          <div>
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-[10px] font-semibold text-white/40">Description</span>
              <span className={`text-[10px] font-bold ${text.description.length > 250 ? 'text-red-400' : 'text-white/30'}`}>{text.description.length} / 250</span>
            </div>
            <textarea maxLength={250} rows={4} value={text.description} onChange={e => setText(prev => ({...prev, description: e.target.value}))} className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50 resize-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
