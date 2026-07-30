'use client';

import React, { useState, useEffect } from 'react';
import { Upload, Save, Loader2, Wand2, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';


export function HeroManager() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  
  // State for the 4 slides
  const [slides, setSlides] = useState([
    { key: 'HOME_HERO_1', url: '' },
    { key: 'HOME_HERO_2', url: '' },
    { key: 'HOME_HERO_3', url: '' },
    { key: 'HOME_HERO_4', url: '' },
    { key: 'HOME_HERO_5', url: '' },
    { key: 'HOME_HERO_6', url: '' },
    { key: 'HOME_HERO_7', url: '' },
  ]);

  // State for text content
  const [textContent, setTextContent] = useState({
    title: '',
    description: ''
  });

  // Fetch current data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/content');
        if (res.ok) {
          const { map } = await res.json();
          setSlides(slides.map(s => ({
            ...s,
            url: map[s.key]?.imageUrl || ''
          })));
          
          if (map['HOME_HERO_TEXT']) {
            setTextContent({
              title: map['HOME_HERO_TEXT'].title || '',
              description: map['HOME_HERO_TEXT'].description || ''
            });
          }
        }
      } catch (err) {
        console.error("Failed to fetch content", err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Upload image to ImgBB
  const handleUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // We can show a temporary loading state for this specific input if we want,
    // but for simplicity, we'll block the save button
    setSaving(true);
    setUploadingIndex(index);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + ''}/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.status === 'success') {
        const newUrl = data.data.url;
        setSlides(prevSlides => {
          const newSlides = [...prevSlides];
          newSlides[index] = { ...newSlides[index], url: newUrl };
          return newSlides;
        });

        // Auto-save this specific slide to database immediately
        await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tabGroup: 'Home',
            sectionKey: slides[index].key,
            sectionName: `Hero Image ${slides[index].key.split('_').pop()}`,
            imageUrl: newUrl
          })
        });

      } else {
        alert('Image upload failed.');
      }
    } catch (error) {
      alert('Error uploading image.');
    }
    setSaving(false);
    setUploadingIndex(null);
  };

  // Generate AI Text
  const handleAIGenerate = async () => {
    setGenerating(true);
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: "Generate a catchy hero title and a short 2-line description for a solar energy company's home page.",
          sectionName: "Hero Section"
        })
      });
      const data = await res.json();
      if (data.status === 'success' && data.data.text) {
        // AI returns a single block of text, let's just dump it into description for the user to edit,
        // or try to split it. For simplicity, we put it in description.
        setTextContent(prev => ({
          ...prev,
          description: data.data.text
        }));
      } else {
        alert('AI Generation failed.');
      }
    } catch (err) {
      alert('Error generating text.');
    }
    setGenerating(false);
  };

  // Save all to backend
  const handleSave = async () => {
    setSaving(true);
    try {
      // Save the 4 slides
      for (const slide of slides) {
        if (slide.url) {
          await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/content', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              tabGroup: 'Home',
              sectionKey: slide.key,
              sectionName: `Hero Image ${slide.key.split('_').pop()}`,
              imageUrl: slide.url
            })
          });
        }
      }

      // Save the text content
      await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tabGroup: 'Home',
          sectionKey: 'HOME_HERO_TEXT',
          sectionName: 'Hero Text Content',
          title: textContent.title,
          description: textContent.description
        })
      });

      alert('Hero Section updated successfully!');
    } catch (error) {
      alert('Failed to save content.');
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="text-white/50 text-sm animate-pulse flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading Hero Data...</div>;
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-8 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-black text-white">Hero Section</h2>
          <p className="text-xs text-white/50 mt-1">Manage 7 background slides, main heading, and description.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-[#0A192F] font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 shrink-0"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Update Hero Section
        </button>
      </div>

      {/* 4 Image Boxes */}
      <div>
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2"><ImageIcon className="w-4 h-4 text-amber-400"/> Background Slides (Max 7)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {slides.map((slide, idx) => (
            <div key={slide.key} className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-3 group hover:border-amber-400/30 transition-colors">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Image {idx + 1}</span>
              
              {/* Preview */}
              <div className="w-full h-24 rounded-lg bg-black/40 overflow-hidden relative border border-white/5">
                {uploadingIndex === idx ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-10">
                    <Loader2 className="w-6 h-6 animate-spin text-amber-400 mb-1" />
                    <span className="text-[10px] text-amber-400 font-bold">Uploading...</span>
                  </div>
                ) : null}
                {slide.url ? (
                  <img src={slide.url} alt={`Hero ${idx + 1}`} className="w-full h-full object-cover opacity-80" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                    <ImageIcon className="w-6 h-6 mb-1" />
                    <span className="text-[9px]">No Image</span>
                  </div>
                )}
              </div>

              {/* Upload & Link Input */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center bg-black/30 border border-white/10 rounded-lg overflow-hidden focus-within:border-amber-400/50">
                  <LinkIcon className="w-3 h-3 text-white/30 ml-2 shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Image URL" 
                    value={slide.url}
                    onChange={(e) => {
                      const newSlides = [...slides];
                      newSlides[idx].url = e.target.value;
                      setSlides(newSlides);
                    }}
                    className="w-full bg-transparent text-[11px] text-white p-2 outline-none placeholder-white/20"
                  />
                </div>
                
                <label className="flex items-center justify-center gap-1.5 w-full bg-white/10 hover:bg-white/15 text-white/80 text-[11px] font-semibold py-2 rounded-lg cursor-pointer transition-colors border border-white/5">
                  <Upload className="w-3 h-3" />
                  Upload New
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(idx, e)} />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Text Content */}
      <div className="pt-4 border-t border-white/5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white">Text Content</h3>
          <button 
            onClick={handleAIGenerate}
            disabled={generating}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
          >
            {generating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Wand2 className="w-3.5 h-3.5" />}
            AI Auto-Generate
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-end mb-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Main Heading</label>
              <span className={`text-[10px] font-bold ${textContent.title.length > 60 ? 'text-red-400' : 'text-white/30'}`}>{textContent.title.length} / 60</span>
            </div>
            <input 
              type="text" 
              maxLength={60}
              placeholder="e.g. Transforming India with Smart Solar Solutions"
              value={textContent.title}
              onChange={(e) => setTextContent(prev => ({...prev, title: e.target.value}))}
              className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50 transition-colors"
            />
          </div>

          <div>
            <div className="flex justify-between items-end mb-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Subheading / Description</label>
              <span className={`text-[10px] font-bold ${textContent.description.length > 200 ? 'text-red-400' : 'text-white/30'}`}>{textContent.description.length} / 200</span>
            </div>
            <textarea 
              maxLength={200}
              rows={3}
              placeholder="e.g. Empowering homes, businesses, and agriculture with MNRE-approved solar systems."
              value={textContent.description}
              onChange={(e) => setTextContent(prev => ({...prev, description: e.target.value}))}
              className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50 transition-colors resize-none"
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}
