'use client';

import React, { useState, useEffect } from 'react';
import {
  Save, Loader2, Upload, Link as LinkIcon, Image as ImageIcon,
  Home, Settings, Sun, Zap, ChevronDown, ChevronUp, Check, Wand2
} from 'lucide-react';

const API        = (process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') : 'http://localhost:5000');

/* ─── helpers ─────────────────────────────────────────────── */
async function uploadToImgbb(file: File): Promise<string> {
  const form = new FormData();
  form.append('image', file);
  const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL || (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + ''}/upload`, { method: 'POST', body: form });
  const json = await res.json();
  if (json.status !== 'success') throw new Error('Upload failed');
  return json.data.url;
}

async function getContent(): Promise<Record<string, any>> {
  const res = await fetch(`${API}/api/content`);
  if (!res.ok) return {};
  const { map } = await res.json();
  return map || {};
}

async function saveContent(sectionKey: string, sectionName: string, title: string, description: string, imageUrl: string) {
  await fetch(`${API}/api/content`, {
    method:  'PUT',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ tabGroup: 'Solutions', sectionKey, sectionName, title, description, imageUrl }),
  });
}

/* ─── mini components ──────────────────────────────────────── */
function FieldRow({ label, value, onChange, maxLen = 100, rows = 1 }: {
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

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setUploading(true);
    try { onChange(await uploadToImgbb(f)); } catch { alert('Upload failed'); }
    setUploading(false);
  };
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">{label}</p>
      <div className="w-full h-28 rounded-xl bg-black/40 overflow-hidden border border-white/10 mb-2">
        {value
          ? <img src={value} alt={label} className="w-full h-full object-cover opacity-80" />
          : <div className="w-full h-full flex flex-col items-center justify-center text-white/20"><ImageIcon className="w-6 h-6 mb-1" /><span className="text-xs">No image</span></div>
        }
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center bg-black/30 border border-white/10 rounded-lg overflow-hidden">
          <LinkIcon className="w-3 h-3 text-white/30 ml-2.5 shrink-0" />
          <input type="text" placeholder="Paste image URL" value={value} onChange={e => onChange(e.target.value)} className="w-full bg-transparent text-[11px] text-white p-2 outline-none placeholder-white/20" />
        </div>
        <label className="flex items-center justify-center gap-1.5 w-full bg-white/8 hover:bg-white/15 text-white/70 text-[11px] font-semibold py-2 rounded-lg cursor-pointer transition border border-white/5">
          {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
          {uploading ? 'Uploading…' : 'Upload image'}
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
      </div>
    </div>
  );
}

/* collapsible panel */
function Panel({ title, icon, children, accent = 'amber' }: { title: string; icon: React.ReactNode; children: React.ReactNode; accent?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition">
        <div className="flex items-center gap-3">
          <span className="text-amber-400">{icon}</span>
          <span className="font-black text-white text-base">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
      </button>
      {open && <div className="px-6 pb-6 pt-2 border-t border-white/8">{children}</div>}
    </div>
  );
}

/* single-field save button */
function SaveBtn({ saving, onClick }: { saving: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={saving}
      className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-[#0A192F] font-bold rounded-xl text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50">
      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
      Save
    </button>
  );
}

/* ─── Sub-section managers ─────────────────────────────────── */

/* Hero Banner */
function HeroBanner({ map }: { map: Record<string, any> }) {
  const KEY = 'SOL_HERO';
  const [title, setTitle]       = useState(map[KEY]?.title       || 'Our Solar Solutions');
  const [desc,  setDesc]        = useState(map[KEY]?.description || 'Comprehensive solar solutions for homes, businesses, industries and agriculture.');
  const [img,   setImg]         = useState(map[KEY]?.imageUrl    || '/images/16.png');
  const [saving, setSaving]     = useState(false);
  const save = async () => { setSaving(true); await saveContent(KEY, 'Solutions Hero', title, desc, img); setSaving(false); alert('Saved!'); };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <FieldRow label="Heading" value={title} onChange={setTitle} maxLen={80} />
          <FieldRow label="Subheading" value={desc} onChange={setDesc} maxLen={250} rows={3} />
        </div>
        <ImageField label="Hero Background Image" value={img} onChange={setImg} />
      </div>
      <div className="flex justify-end gap-3">
        <button onClick={async () => {
            const btn = document.getElementById('ai-sol-hero-btn') as HTMLButtonElement; if(btn) btn.disabled = true;
            try {
              const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/ai/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: `Generate a catchy hero title and a short description for the Solutions page of a solar energy company.`, sectionName: "Solutions Hero" }) });
              const data = await res.json();
              if (data.status === 'success' && data.data.text) setDesc(data.data.text);
              else alert('AI Generation failed.');
            } catch { alert('Error generating text.'); }
            if(btn) btn.disabled = false;
        }} id="ai-sol-hero-btn" className="flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-all disabled:opacity-50">
          <Wand2 className="w-4 h-4 text-amber-400" /> AI Auto-Generate
        </button>
        <SaveBtn saving={saving} onClick={save} />
      </div>
    </div>
  );
}

/* Solution Card */
function SolutionCard({ map, cardKey, defaultTitle, defaultDesc }: { map: Record<string, any>; cardKey: string; defaultTitle: string; defaultDesc: string }) {
  const [title,   setTitle]   = useState(map[cardKey]?.title       || defaultTitle);
  const [desc,    setDesc]    = useState(map[cardKey]?.description || defaultDesc);
  const [img,     setImg]     = useState(map[cardKey]?.imageUrl    || '');
  const [saving,  setSaving]  = useState(false);
  const save = async () => { setSaving(true); await saveContent(cardKey, defaultTitle, title, desc, img); setSaving(false); alert('Saved!'); };
  return (
    <div className="bg-black/20 rounded-xl p-4 space-y-3 border border-white/8">
      <p className="text-amber-400 font-black text-sm">{defaultTitle}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <FieldRow label="Card Title" value={title} onChange={setTitle} maxLen={60} />
          <FieldRow label="Card Description" value={desc} onChange={setDesc} maxLen={160} rows={3} />
        </div>
        <ImageField label="Card Image" value={img} onChange={setImg} />
      </div>
      <div className="flex justify-end gap-3">
        <button onClick={async () => {
            const btn = document.getElementById(`ai-sol-card-${cardKey}`) as HTMLButtonElement; if(btn) btn.disabled = true;
            try {
              const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/ai/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: `Write a short description for a solar energy solution card titled: ${title}.`, sectionName: "Solution Card" }) });
              const data = await res.json();
              if (data.status === 'success' && data.data.text) setDesc(data.data.text);
              else alert('AI Generation failed.');
            } catch { alert('Error generating text.'); }
            if(btn) btn.disabled = false;
        }} id={`ai-sol-card-${cardKey}`} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-all disabled:opacity-50">
          <Wand2 className="w-4 h-4 text-amber-400" /> AI Gen
        </button>
        <SaveBtn saving={saving} onClick={save} />
      </div>
    </div>
  );
}

/* Application card */
function AppCard({ map, appKey, defaultTitle, defaultDesc }: { map: Record<string, any>; appKey: string; defaultTitle: string; defaultDesc: string }) {
  const [title,  setTitle]  = useState(map[appKey]?.title       || defaultTitle);
  const [desc,   setDesc]   = useState(map[appKey]?.description || defaultDesc);
  const [img,    setImg]    = useState(map[appKey]?.imageUrl    || '');
  const [saving, setSaving] = useState(false);
  const save = async () => { setSaving(true); await saveContent(appKey, defaultTitle, title, desc, img); setSaving(false); alert('Saved!'); };
  return (
    <div className="bg-black/20 rounded-xl p-4 space-y-3 border border-white/8">
      <p className="text-amber-400 font-black text-sm">{defaultTitle}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <FieldRow label="Title" value={title} onChange={setTitle} maxLen={60} />
          <FieldRow label="Description" value={desc} onChange={setDesc} maxLen={200} rows={3} />
        </div>
        <ImageField label="Image" value={img} onChange={setImg} />
      </div>
      <div className="flex justify-end gap-3">
        <button onClick={async () => {
            const btn = document.getElementById(`ai-app-card-${appKey}`) as HTMLButtonElement; if(btn) btn.disabled = true;
            try {
              const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/ai/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: `Write a short description for a solar energy application card titled: ${title}.`, sectionName: "App Card" }) });
              const data = await res.json();
              if (data.status === 'success' && data.data.text) setDesc(data.data.text);
              else alert('AI Generation failed.');
            } catch { alert('Error generating text.'); }
            if(btn) btn.disabled = false;
        }} id={`ai-app-card-${appKey}`} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-all disabled:opacity-50">
          <Wand2 className="w-4 h-4 text-amber-400" /> AI Gen
        </button>
        <SaveBtn saving={saving} onClick={save} />
      </div>
    </div>
  );
}

/* Project card */
function ProjectCard({ map, projKey, defaultTitle, defaultDesc }: { map: Record<string, any>; projKey: string; defaultTitle: string; defaultDesc: string }) {
  const [title,  setTitle]  = useState(map[projKey]?.title       || defaultTitle);
  const [desc,   setDesc]   = useState(map[projKey]?.description || defaultDesc);
  const [img,    setImg]    = useState(map[projKey]?.imageUrl    || '');
  const [saving, setSaving] = useState(false);
  const save = async () => { setSaving(true); await saveContent(projKey, defaultTitle, title, desc, img); setSaving(false); alert('Saved!'); };
  return (
    <div className="bg-black/20 rounded-xl p-4 space-y-3 border border-white/8">
      <p className="text-amber-400 font-black text-sm">{defaultTitle}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <FieldRow label="Project Title" value={title} onChange={setTitle} maxLen={80} />
          <FieldRow label="Description" value={desc} onChange={setDesc} maxLen={300} rows={4} />
        </div>
        <ImageField label="Project Image" value={img} onChange={setImg} />
      </div>
      <div className="flex justify-end gap-3">
        <button onClick={async () => {
            const btn = document.getElementById(`ai-proj-card-${projKey}`) as HTMLButtonElement; if(btn) btn.disabled = true;
            try {
              const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/ai/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: `Write a short description for a solar energy project card titled: ${title}.`, sectionName: "Project Card" }) });
              const data = await res.json();
              if (data.status === 'success' && data.data.text) setDesc(data.data.text);
              else alert('AI Generation failed.');
            } catch { alert('Error generating text.'); }
            if(btn) btn.disabled = false;
        }} id={`ai-proj-card-${projKey}`} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-all disabled:opacity-50">
          <Wand2 className="w-4 h-4 text-amber-400" /> AI Gen
        </button>
        <SaveBtn saving={saving} onClick={save} />
      </div>
    </div>
  );
}

/* How Solutions Work section */
function HowItWorks({ map }: { map: Record<string, any> }) {
  const KEY = 'SOL_HOW_IT_WORKS';
  const [img,    setImg]    = useState(map[KEY]?.imageUrl    || '/images/15.png');
  const [title,  setTitle]  = useState(map[KEY]?.title       || 'How Our Solutions Work');
  const [desc,   setDesc]   = useState(map[KEY]?.description || 'Smartly designed systems with advanced functions to deliver maximum efficiency.');
  const [saving, setSaving] = useState(false);
  const save = async () => { setSaving(true); await saveContent(KEY, 'How Solutions Work', title, desc, img); setSaving(false); alert('Saved!'); };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <FieldRow label="Section Heading" value={title} onChange={setTitle} maxLen={80} />
          <FieldRow label="Subheading" value={desc} onChange={setDesc} maxLen={200} rows={3} />
        </div>
        <ImageField label="Diagram Image" value={img} onChange={setImg} />
      </div>
      <div className="flex justify-end gap-3">
        <button onClick={async () => {
            const btn = document.getElementById('ai-howitworks-btn') as HTMLButtonElement; if(btn) btn.disabled = true;
            try {
              const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/ai/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: `Write a short description for the 'How Our Solutions Work' section for a solar company. Title: ${title}`, sectionName: "How It Works" }) });
              const data = await res.json();
              if (data.status === 'success' && data.data.text) setDesc(data.data.text);
              else alert('AI Generation failed.');
            } catch { alert('Error generating text.'); }
            if(btn) btn.disabled = false;
        }} id="ai-howitworks-btn" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-all disabled:opacity-50">
          <Wand2 className="w-4 h-4 text-amber-400" /> AI Gen
        </button>
        <SaveBtn saving={saving} onClick={save} />
      </div>
    </div>
  );
}

/* Per-solution detail page editor */
const SOLUTION_SLUGS = [
  { slug: 'residential',  label: 'Residential',  icon: <Home className="w-4 h-4" /> },
  { slug: 'commercial',   label: 'Commercial',   icon: <Settings className="w-4 h-4" /> },
  { slug: 'industrial',   label: 'Industrial',   icon: <Settings className="w-4 h-4" /> },
  { slug: 'agriculture',  label: 'Agriculture',  icon: <Sun className="w-4 h-4" /> },
  { slug: 'ev-charging',  label: 'EV Charging',  icon: <Zap className="w-4 h-4" /> },
];

const SOL_DEFAULTS: Record<string, { subtitle: string; description: string; image: string; benefits: string[]; }> = {
  residential: {
    subtitle:    'Power your home with clean energy and reduce electricity bills significantly.',
    description: 'Transform your home into a sustainable powerhouse. Our residential solar rooftop systems are designed to seamlessly integrate with your home architecture while maximizing energy generation.',
    image:       'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=1600&q=80',
    benefits:    ['Up to 90% reduction in electricity bills', 'Protection against rising energy costs', 'Increased property value', 'Clean, renewable energy'],
  },
  commercial: {
    subtitle:    'Smart energy solutions for offices, shops, malls, and commercial spaces.',
    description: 'Businesses consume high amounts of energy during the day. Our commercial solar solutions allow you to generate your own electricity.',
    image:       'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
    benefits:    ['Significant reduction in operational expenses', 'High Return on Investment (ROI)', 'Tax benefits and accelerated depreciation', 'Enhanced brand image'],
  },
  industrial: {
    subtitle:    'High-capacity systems designed for factories and large-scale manufacturing.',
    description: 'Industries require robust, heavy-duty energy solutions. We build massive, highly efficient solar power plants.',
    image:       'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80',
    benefits:    ['Massive savings on high-tariff electricity', 'Reliable power for uninterrupted manufacturing', 'Hedge against future tariff hikes', 'CSR goals fulfilled'],
  },
  agriculture: {
    subtitle:    'Solar water pumps and off-grid irrigation solutions for farmers.',
    description: 'Empowering farmers with reliable solar water pumps. Run heavy tubewells completely free of grid electricity.',
    image:       'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1600&q=80',
    benefits:    ['Zero electricity bills for irrigation', 'Eliminate expensive diesel costs', 'Reliable water supply during daytime', 'Government subsidies available'],
  },
  'ev-charging': {
    subtitle:    'Sustainable EV charging infrastructure powered by solar energy.',
    description: 'The future of transportation is electric. We integrate solar power with EV charging stations.',
    image:       'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1600&q=80',
    benefits:    ['Charge vehicles using free solar energy', 'Attract customers to your commercial space', 'Future-proof infrastructure', 'Zero carbon footprint'],
  },
};

function SolutionDetailEditor({ slug, label, map }: { slug: string; label: string; map: Record<string, any> }) {
  const KEY      = `SOL_DETAIL_${slug.toUpperCase().replace('-', '_')}`;
  const defaults = SOL_DEFAULTS[slug];
  let saved: any = {};
  try { saved = JSON.parse(map[KEY]?.description || '{}'); } catch {}

  const [title,    setTitle]    = useState(map[KEY]?.title    || `${label} Solar`);
  const [subtitle, setSubtitle] = useState(saved.subtitle    || defaults.subtitle);
  const [desc,     setDesc]     = useState(saved.description || defaults.description);
  const [img,      setImg]      = useState(map[KEY]?.imageUrl || defaults.image);
  const [b0, setB0] = useState(saved.benefits?.[0] ?? defaults.benefits[0]);
  const [b1, setB1] = useState(saved.benefits?.[1] ?? defaults.benefits[1]);
  const [b2, setB2] = useState(saved.benefits?.[2] ?? defaults.benefits[2]);
  const [b3, setB3] = useState(saved.benefits?.[3] ?? defaults.benefits[3]);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const payload = JSON.stringify({ subtitle, description: desc, benefits: [b0, b1, b2, b3] });
    await saveContent(KEY, `${label} Detail Page`, title, payload, img);
    setSaving(false);
    alert(`${label} detail page saved!`);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <FieldRow label="Page Title" value={title} onChange={setTitle} maxLen={80} />
          <FieldRow label="Subtitle" value={subtitle} onChange={setSubtitle} maxLen={200} rows={2} />
          <FieldRow label="Description" value={desc} onChange={setDesc} maxLen={500} rows={4} />
        </div>
        <div className="space-y-4">
          <ImageField label="Hero Image" value={img} onChange={setImg} />
        </div>
      </div>

      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">4 Key Benefits (shown on detail page)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {([b0, b1, b2, b3] as string[]).map((b, i) => (
            <div key={i} className="flex items-center gap-2 bg-black/20 rounded-xl border border-white/8 px-3 py-2">
              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <input
                type="text" maxLength={120} value={b}
                onChange={e => [setB0, setB1, setB2, setB3][i](e.target.value)}
                className="w-full bg-transparent text-white text-sm outline-none placeholder-white/20"
                placeholder={`Benefit ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button onClick={async () => {
            const btn = document.getElementById(`ai-soldet-btn-${slug}`) as HTMLButtonElement; if(btn) btn.disabled = true;
            try {
              const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/ai/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: `Write a detailed description for a specific solar solution page. Solution type: ${slug}. Title: ${title}`, sectionName: "Solution Detail" }) });
              const data = await res.json();
              if (data.status === 'success' && data.data.text) setDesc(data.data.text);
              else alert('AI Generation failed.');
            } catch { alert('Error generating text.'); }
            if(btn) btn.disabled = false;
        }} id={`ai-soldet-btn-${slug}`} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-all disabled:opacity-50">
          <Wand2 className="w-4 h-4 text-amber-400" /> AI Gen
        </button>
        <SaveBtn saving={saving} onClick={save} />
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */
export default function SolutionsAdminPage() {
  const [map,     setMap]     = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContent().then(m => { setMap(m); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-4 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
          <Zap className="w-3.5 h-3.5" /> Solutions Page Manager
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">Solutions Page</h1>
        <p className="text-sm text-white/50 mt-1">Edit every section of the Solutions page and individual solution detail pages.</p>
      </div>

      {/* ── Section 1: Hero Banner ── */}
      <Panel title="1. Hero Banner" icon={<ImageIcon className="w-4 h-4" />}>
        <HeroBanner map={map} />
      </Panel>

      {/* ── Section 2: Solution Cards ── */}
      <Panel title="2. Solution Cards (5 cards)" icon={<Home className="w-4 h-4" />}>
        <div className="space-y-4">
          {[
            { key: 'SOL_CARD_RESIDENTIAL', title: 'Residential Solar',  desc: 'Power your home and reduce electricity bills with rooftop solar.' },
            { key: 'SOL_CARD_COMMERCIAL',  title: 'Commercial Solar',   desc: 'Smart energy solutions for offices, shops and commercial spaces.' },
            { key: 'SOL_CARD_INDUSTRIAL',  title: 'Industrial Solar',   desc: 'High-capacity systems for factories and large-scale operations.' },
            { key: 'SOL_CARD_AGRICULTURE', title: 'Agriculture Solar',  desc: 'Solar water pumps and irrigation solutions for Indian farmers.' },
            { key: 'SOL_CARD_EV',          title: 'EV Charging',        desc: 'Sustainable EV charging solutions for a green and clean future.' },
          ].map(c => (
            <SolutionCard key={c.key} map={map} cardKey={c.key} defaultTitle={c.title} defaultDesc={c.desc} />
          ))}
        </div>
      </Panel>

      {/* ── Section 3: How Solutions Work ── */}
      <Panel title="3. How Our Solutions Work" icon={<Settings className="w-4 h-4" />}>
        <HowItWorks map={map} />
      </Panel>

      {/* ── Section 4: Multiple Applications ── */}
      <Panel title="4. Multiple Applications (5 cards)" icon={<Sun className="w-4 h-4" />}>
        <div className="space-y-4">
          {[
            { key: 'APP_HOMES',    title: 'Homes & Villas',       desc: 'Transform your home with a customized solar rooftop solution.' },
            { key: 'APP_OFFICES',  title: 'Offices & Buildings',  desc: 'Power your commercial spaces with smart solar installations.' },
            { key: 'APP_FACTORIES',title: 'Factories & Industries',desc: 'Heavy-duty industrial solar plants designed to sustain massive loads.' },
            { key: 'APP_FARMS',    title: 'Farms & Agriculture',  desc: 'Empowering farmers with off-grid solar water pumps.' },
            { key: 'APP_EV',       title: 'EV Charging Stations', desc: 'Integrate solar power with EV charging stations.' },
          ].map(a => (
            <AppCard key={a.key} map={map} appKey={a.key} defaultTitle={a.title} defaultDesc={a.desc} />
          ))}
        </div>
      </Panel>

      {/* ── Section 5: Success Stories / Projects ── */}
      <Panel title="5. Success Stories (4 project cards)" icon={<Check className="w-4 h-4" />}>
        <div className="space-y-4">
          {[
            { key: 'PROJ_5KW',   title: '5kW On-Grid – Lucknow',      desc: 'A beautifully integrated residential solar system providing clean energy.' },
            { key: 'PROJ_100KW', title: '100kW Rooftop – Indore',     desc: 'Commercial rooftop installation for a manufacturing unit.' },
            { key: 'PROJ_500KW', title: '500kW Industrial – Pune',    desc: 'A massive industrial solar power plant setup on factory roofs.' },
            { key: 'PROJ_10HP',  title: '10HP Solar Pump – Rajasthan', desc: 'An off-grid solar water pumping system empowering local farmers.' },
          ].map(p => (
            <ProjectCard key={p.key} map={map} projKey={p.key} defaultTitle={p.title} defaultDesc={p.desc} />
          ))}
        </div>
      </Panel>

      {/* ── Section 6: Per-Solution Detail Pages ── */}
      <Panel title="6. Individual Solution Detail Pages" icon={<Zap className="w-4 h-4" />}>
        <p className="text-white/40 text-sm mb-4">Edit title, subtitle, description, hero image and 4 benefits for each solution's detail page.</p>
        <div className="space-y-4">
          {SOLUTION_SLUGS.map(({ slug, label, icon }) => (
            <div key={slug} className="bg-black/20 rounded-xl border border-white/8 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/8 flex items-center gap-2">
                <span className="text-amber-400">{icon}</span>
                <span className="font-black text-white text-sm">{label} Solar — /solutions/{slug}</span>
              </div>
              <div className="p-4">
                <SolutionDetailEditor slug={slug} label={label} map={map} />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
