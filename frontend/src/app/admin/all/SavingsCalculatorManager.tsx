'use client';

import React, { useState, useEffect } from 'react';
import { Save, Loader2, Wand2, Upload, Link as LinkIcon, Image as ImageIcon, Calculator } from 'lucide-react';

const API = 'http://localhost:5000';

interface CalcContent {
  heading: string;
  subheading: string;
  savingsPercent: string;
  paybackPeriod: string;
  feature1: string;
  feature2: string;
  feature3: string;
  ctaText: string;
  ctaImageUrl: string;
  bottomNote: string;
}

const DEFAULTS: CalcContent = {
  heading: 'Instant Savings Calculator',
  subheading: 'Use our smart interactive tool to estimate your potential savings, recommended system size, and payback period by switching to Enfinite Energy.',
  savingsPercent: '80',
  paybackPeriod: '3 - 4',
  feature1: 'Tier-1 Premium Solar Panels',
  feature2: '25-Year Performance Warranty',
  feature3: 'Zero Maintenance Setup',
  ctaText: 'Book Free Site Survey',
  ctaImageUrl: '/12.png',
  bottomNote: 'By switching to solar, you protect yourself from annual tariff hikes and instantly increase your property value.',
};

const CONTENT_KEY = 'HOME_SAVINGS_CALCULATOR';

export function SavingsCalculatorManager() {
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [data, setData]           = useState<CalcContent>(DEFAULTS);

  // fetch existing content
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/api/content`);
        if (res.ok) {
          const { map } = await res.json();
          if (map[CONTENT_KEY]) {
            const saved = map[CONTENT_KEY];
            // description field stores JSON of our extra fields
            let extra: Partial<CalcContent> = {};
            try { extra = JSON.parse(saved.description || '{}'); } catch {}
            setData({
              heading:        saved.title        || DEFAULTS.heading,
              subheading:     extra.subheading   || DEFAULTS.subheading,
              savingsPercent: extra.savingsPercent || DEFAULTS.savingsPercent,
              paybackPeriod:  extra.paybackPeriod  || DEFAULTS.paybackPeriod,
              feature1:       extra.feature1       || DEFAULTS.feature1,
              feature2:       extra.feature2       || DEFAULTS.feature2,
              feature3:       extra.feature3       || DEFAULTS.feature3,
              ctaText:        extra.ctaText        || DEFAULTS.ctaText,
              ctaImageUrl:    saved.imageUrl       || DEFAULTS.ctaImageUrl,
              bottomNote:     extra.bottomNote     || DEFAULTS.bottomNote,
            });
          }
        }
      } catch {}
      setLoading(false);
    })();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append('image', file);
    try {
      const res  = await fetch(`http://localhost:5000/api/upload`, { method: 'POST', body: form });
      const json = await res.json();
      if (json.status === 'success') setData(d => ({ ...d, ctaImageUrl: json.data.url }));
    } catch { alert('Upload failed.'); }
    setUploading(false);
  };

  const handleAI = async () => {
    setGenerating(true);
    try {
      const res  = await fetch(`${API}/api/ai/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: 'Generate a catchy heading and a short subheading (max 200 chars) for the Instant Savings Calculator section of a solar energy website.',
          sectionName: 'Instant Savings Calculator',
        }),
      });
      const json = await res.json();
      if (json.status === 'success' && json.data?.text) {
        const lines = json.data.text.split('\n').filter(Boolean);
        if (lines[0]) setData(d => ({ ...d, heading:    lines[0].replace(/^#+\s*/, '') }));
        if (lines[1]) setData(d => ({ ...d, subheading: lines[1] }));
      }
    } catch {}
    setGenerating(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const { heading, ctaImageUrl, ...rest } = data;
    try {
      await fetch(`${API}/api/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tabGroup:    'Home',
          sectionKey:  CONTENT_KEY,
          sectionName: 'Instant Savings Calculator',
          imageUrl:    ctaImageUrl,
          title:       heading,
          description: JSON.stringify(rest),
        }),
      });
      alert('Savings Calculator updated successfully!');
    } catch { alert('Save failed.'); }
    setSaving(false);
  };

  if (loading) return null;

  const field = (
    label: string,
    key: keyof CalcContent,
    placeholder?: string,
    maxLen = 120,
    rows = 1,
  ) => (
    <div>
      <div className="flex justify-between items-end mb-1.5">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{label}</span>
        <span className={`text-[10px] font-bold ${data[key].length > maxLen * 0.9 ? 'text-amber-400' : 'text-white/25'}`}>
          {data[key].length}/{maxLen}
        </span>
      </div>
      {rows > 1 ? (
        <textarea
          rows={rows}
          maxLength={maxLen}
          value={data[key]}
          onChange={e => setData(d => ({ ...d, [key]: e.target.value }))}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50 resize-none"
        />
      ) : (
        <input
          type="text"
          maxLength={maxLen}
          value={data[key]}
          onChange={e => setData(d => ({ ...d, [key]: e.target.value }))}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50"
        />
      )}
    </div>
  );

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calculator className="w-4 h-4 text-amber-400" />
            <h2 className="text-xl font-black text-white">Instant Savings Calculator</h2>
          </div>
          <p className="text-xs text-white/50">Edit headings, features, savings % and CTA image shown on the calculator section.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleAI} disabled={generating}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold rounded-xl hover:bg-blue-500/20 transition-all text-sm disabled:opacity-50"
          >
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />} AI Generate
          </button>
          <button
            onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-[#0A192F] font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 text-sm"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left col */}
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-400/70 border-b border-white/6 pb-2">Main Text</p>
          {field('Section Heading', 'heading', 'Instant Savings Calculator', 80)}
          {field('Subheading / Description', 'subheading', 'Describe the calculator...', 300, 3)}
          {field('Bottom Note (green box)', 'bottomNote', 'Tip shown below inputs...', 200, 2)}
          {field('CTA Button Text', 'ctaText', 'Book Free Site Survey', 60)}
        </div>

        {/* Right col */}
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-400/70 border-b border-white/6 pb-2">Results & Features</p>

          {/* Savings % + Payback in a row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5">Savings % Label</div>
              <input
                type="text" maxLength={10} value={data.savingsPercent}
                onChange={e => setData(d => ({ ...d, savingsPercent: e.target.value }))}
                placeholder="80"
                className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50"
              />
              <p className="text-[10px] text-white/30 mt-1">Shows as "~{data.savingsPercent}% Bill Reduction"</p>
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5">Payback Period</div>
              <input
                type="text" maxLength={20} value={data.paybackPeriod}
                onChange={e => setData(d => ({ ...d, paybackPeriod: e.target.value }))}
                placeholder="3 - 4"
                className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50"
              />
              <p className="text-[10px] text-white/30 mt-1">Shows as "{data.paybackPeriod} Years"</p>
            </div>
          </div>

          {field('Feature 1 (Zap icon)', 'feature1', 'Tier-1 Premium Solar Panels', 80)}
          {field('Feature 2 (Shield icon)', 'feature2', '25-Year Performance Warranty', 80)}
          {field('Feature 3 (Wrench icon)', 'feature3', 'Zero Maintenance Setup', 80)}

          {/* CTA Image */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">CTA Bottom Image (right panel)</p>
            <div className="w-full h-32 rounded-xl bg-black/40 overflow-hidden border border-white/10 mb-2">
              {data.ctaImageUrl ? (
                <img src={data.ctaImageUrl} alt="CTA" className="w-full h-full object-cover opacity-80" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                  <ImageIcon className="w-7 h-7 mb-1" /><span className="text-xs">No Image</span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center bg-black/30 border border-white/10 rounded-lg overflow-hidden">
                <LinkIcon className="w-3 h-3 text-white/30 ml-3 shrink-0" />
                <input
                  type="text" placeholder="Image URL"
                  value={data.ctaImageUrl}
                  onChange={e => setData(d => ({ ...d, ctaImageUrl: e.target.value }))}
                  className="w-full bg-transparent text-[11px] text-white p-2.5 outline-none placeholder-white/20"
                />
              </div>
              <label className="flex items-center justify-center gap-1.5 w-full bg-white/10 hover:bg-white/15 text-white/80 text-[11px] font-semibold py-2.5 rounded-lg cursor-pointer transition-colors border border-white/5">
                {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                {uploading ? 'Uploading…' : 'Upload New Image'}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
