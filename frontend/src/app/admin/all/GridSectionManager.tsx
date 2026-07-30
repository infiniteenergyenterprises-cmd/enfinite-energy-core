'use client';

import React, { useState, useEffect } from 'react';
import { Upload, Save, Loader2, Wand2, Image as ImageIcon, Link as LinkIcon, Edit3 } from 'lucide-react';


interface GridItemConfig {
  key: string;
  defaultTitle: string;
  hasImage: boolean;
}

interface Props {
  title: string;
  description: string;
  headerKey?: string; // Optional if there's a main header to edit
  items: GridItemConfig[];
}

export function GridSectionManager({ title, description, headerKey, items }: Props) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState<string | null>(null); // tracks which key is generating

  const [headerContent, setHeaderContent] = useState({ title: '', description: '' });
  const [gridData, setGridData] = useState<Record<string, { title: string; description: string; url: string }>>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/content');
        if (res.ok) {
          const { map } = await res.json();
          
          if (headerKey && map[headerKey]) {
            setHeaderContent({
              title: map[headerKey].title || '',
              description: map[headerKey].description || ''
            });
          }

          const newGridData: any = {};
          items.forEach(item => {
            newGridData[item.key] = {
              title: map[item.key]?.title || item.defaultTitle,
              description: map[item.key]?.description || '',
              url: map[item.key]?.imageUrl || ''
            };
          });
          setGridData(newGridData);
        }
      } catch (err) {}
      setLoading(false);
    };
    fetchData();
  }, [headerKey, items]);

  const handleUpload = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSaving(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + ''}/upload`, { method: 'POST', body: formData });
      const data = await res.json();
      if (data.status === 'success') {
        const newUrl = data.data.url;
        setGridData(prev => ({
          ...prev,
          [key]: { ...prev[key], url: newUrl }
        }));
        
        // Auto-save this specific grid item image to database immediately
        const item = items.find(i => i.key === key);
        if (item) {
          await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/content', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              tabGroup: 'Home',
              sectionKey: key,
              sectionName: item.defaultTitle,
              imageUrl: newUrl
              // We do not overwrite title/description here, backend upsert will keep existing if undefined passed, wait, if we pass undefined, backend keeps it! Wait, backend update says:
              // title: (title !== undefined && title !== '') ? title : undefined.
              // Actually, if we omit it, req.body.title is undefined.
            })
          });
        }
      }
    } catch (error) {
      alert('Error uploading image.');
    }
    setSaving(false);
  };

  const handleAIGenerate = async (key: string, itemName: string, isHeader = false) => {
    setGenerating(key);
    try {
      const prompt = isHeader 
        ? `Generate a catchy heading and short description for the ${title} section of a solar energy website.`
        : `Write a 1-sentence marketing description (max 150 chars) about "${itemName}" for a solar company's features.`;
        
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, sectionName: title })
      });
      const data = await res.json();
      
      if (data.status === 'success' && data.data.text) {
        if (isHeader) {
          setHeaderContent(prev => ({ ...prev, description: data.data.text }));
        } else {
          setGridData(prev => ({
            ...prev,
            [key]: { ...prev[key], description: data.data.text }
          }));
        }
      }
    } catch (err) {}
    setGenerating(null);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (headerKey) {
        await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tabGroup: 'Home',
            sectionKey: headerKey,
            sectionName: `${title} Header`,
            title: headerContent.title,
            description: headerContent.description
          })
        });
      }

      for (const item of items) {
        const d = gridData[item.key];
        await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tabGroup: 'Home',
            sectionKey: item.key,
            sectionName: item.defaultTitle,
            imageUrl: d.url,
            title: d.title,
            description: d.description
          })
        });
      }
      alert(`${title} updated successfully!`);
    } catch (error) {
      alert('Failed to save.');
    }
    setSaving(false);
  };

  if (loading || Object.keys(gridData).length === 0) return null;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-8">
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

      {headerKey && (
        <div className="bg-black/20 rounded-xl p-5 border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2"><Edit3 className="w-4 h-4 text-amber-400"/> Main Section Header</h3>
            <button onClick={() => handleAIGenerate(headerKey, 'Header', true)} disabled={generating === headerKey} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-xs font-bold transition-all disabled:opacity-50">
              {generating === headerKey ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />} AI Auto-Generate
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-semibold text-white/40 mb-1.5 block">Heading ({headerContent.title.length}/60)</span>
              <input type="text" maxLength={60} value={headerContent.title} onChange={e => setHeaderContent(prev => ({...prev, title: e.target.value}))} className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50" />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-white/40 mb-1.5 block">Description ({headerContent.description.length}/150)</span>
              <input type="text" maxLength={150} value={headerContent.description} onChange={e => setHeaderContent(prev => ({...prev, description: e.target.value}))} className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50" />
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-bold text-white mb-4">Grid Items / Boxes ({items.length})</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, idx) => {
            const d = gridData[item.key];
            return (
              <div key={item.key} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3 group hover:border-amber-400/30 transition-colors">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Box {idx + 1}</span>
                  <button onClick={() => handleAIGenerate(item.key, d.title)} disabled={generating === item.key} className="text-blue-400 hover:text-blue-300">
                    {generating === item.key ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {item.hasImage && (
                  <div className="w-full h-24 rounded-lg bg-black/40 overflow-hidden relative border border-white/5">
                    {d.url ? (
                      <img src={d.url} alt={d.title} className="w-full h-full object-cover opacity-80" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                        <ImageIcon className="w-6 h-6 mb-1" />
                        <span className="text-[9px]">No Image</span>
                      </div>
                    )}
                  </div>
                )}

                {item.hasImage && (
                  <label className="flex items-center justify-center gap-1.5 w-full bg-white/10 hover:bg-white/15 text-white/80 text-[11px] font-semibold py-1.5 rounded-lg cursor-pointer transition-colors border border-white/5">
                    <Upload className="w-3 h-3" /> Upload Image
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(item.key, e)} />
                  </label>
                )}

                <div>
                  <input type="text" placeholder="Title" maxLength={40} value={d.title} onChange={e => setGridData(prev => ({...prev, [item.key]: {...d, title: e.target.value}}))} className="w-full bg-transparent border-b border-white/10 text-white text-sm font-bold p-1 outline-none focus:border-amber-400/50 mb-2" />
                  <textarea rows={3} placeholder="Description (Max 150 chars)" maxLength={150} value={d.description} onChange={e => setGridData(prev => ({...prev, [item.key]: {...d, description: e.target.value}}))} className="w-full bg-black/20 border border-white/5 rounded-lg text-white/70 text-xs p-2 outline-none focus:border-amber-400/50 resize-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
