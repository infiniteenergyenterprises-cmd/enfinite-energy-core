'use client';

import React, { useState, useEffect } from 'react';
import {
  Save, Loader2, Upload, Link as LinkIcon, Image as ImageIcon,
  Trash2, Plus, Edit2, Phone, Mail, MapPin, Users, Building2,
  BarChart3, Globe, Wand2
} from 'lucide-react';

const API       = 'http://localhost:5000';

async function uploadImg(file: File): Promise<string> {
  const form = new FormData();
  form.append('image', file);
  const res  = await fetch(`http://localhost:5000/api/upload`, { method:'POST', body:form });
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
  await fetch(`${API}/api/content`, {
    method:'PUT', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ tabGroup:'Pages', sectionKey:key, sectionName:name, title, description:desc, imageUrl:img }),
  });
}

/* ─── shared ────────────────────────────────────────────── */
function Field({ label, value, onChange, maxLen=200, rows=1, placeholder='' }: {
  label:string; value:string; onChange:(v:string)=>void; maxLen?:number; rows?:number; placeholder?:string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{label}</span>
        <span className={`text-[10px] font-bold ${value.length>maxLen*0.9?'text-amber-400':'text-white/25'}`}>{value.length}/{maxLen}</span>
      </div>
      {rows>1
        ? <textarea rows={rows} maxLength={maxLen} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50 resize-none placeholder-white/20"/>
        : <input type="text" maxLength={maxLen} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50 placeholder-white/20"/>
      }
    </div>
  );
}

function ImgUpload({ value, onChange }: { value:string; onChange:(v:string)=>void }) {
  const [up, setUp] = useState(false);
  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setUp(true); try { onChange(await uploadImg(f)); } catch { alert('Upload failed'); } setUp(false);
  };
  return (
    <div className="space-y-2">
      <div className="w-full h-20 rounded-xl bg-black/40 border border-white/10 overflow-hidden">
        {value ? <img src={value} alt="" className="w-full h-full object-cover opacity-80"/> : <div className="w-full h-full flex items-center justify-center text-white/20"><ImageIcon className="w-5 h-5"/></div>}
      </div>
      <div className="flex gap-2">
        <div className="flex-1 flex items-center bg-black/30 border border-white/10 rounded-lg overflow-hidden">
          <LinkIcon className="w-3 h-3 text-white/30 ml-2 shrink-0"/>
          <input type="text" placeholder="URL" value={value} onChange={e=>onChange(e.target.value)} className="w-full bg-transparent text-[11px] text-white p-2 outline-none placeholder-white/20"/>
        </div>
        <label className="flex items-center gap-1 px-3 py-2 bg-white/8 hover:bg-white/15 text-white/70 text-[11px] font-semibold rounded-lg cursor-pointer border border-white/5 whitespace-nowrap">
          {up?<Loader2 className="w-3 h-3 animate-spin"/>:<Upload className="w-3 h-3"/>}{up?'…':'Upload'}
          <input type="file" accept="image/*" className="hidden" onChange={handle} disabled={up}/>
        </label>
      </div>
    </div>
  );
}

function SaveBtn({ saving, label='Save', onClick }: { saving:boolean; label?:string; onClick:()=>void }) {
  return (
    <button onClick={onClick} disabled={saving}
      className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-[#0A192F] font-bold rounded-xl text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50">
      {saving?<Loader2 className="w-4 h-4 animate-spin"/>:<Save className="w-4 h-4"/>}{label}
    </button>
  );
}

/* ─── Contact Info Manager ───────────────────────────────── */
function ContactInfoManager({ map }: { map:Record<string,any> }) {
  const K = 'CONTACT_INFO';
  let saved: any = {};
  try { saved = JSON.parse(map[K]?.description || '{}'); } catch {}

  const [phone1,   setPhone1]   = useState(saved.phone1   || '+91 74800 18007');
  const [phone2,   setPhone2]   = useState(saved.phone2   || '');
  const [email1,   setEmail1]   = useState(saved.email1   || 'infiniteenergyenterprises@gmail.com');
  const [email2,   setEmail2]   = useState(saved.email2   || '');
  const [whatsapp, setWhatsapp] = useState(saved.whatsapp || '+91 74800 18007');
  const [address,  setAddress]  = useState(saved.address  || 'Bhabua, Mohania, Kaimur, Bihar 821109');
  const [hours,    setHours]    = useState(saved.hours    || 'Mon-Sat: 9AM - 7PM IST');
  const [sv, setSv] = useState(false);

  const save = async () => {
    setSv(true);
    const payload = JSON.stringify({ phone1, phone2, email1, email2, whatsapp, address, hours });
    await saveContent(K, 'Contact Information', 'Contact Info', payload, '');
    setSv(false); alert('Contact info saved!');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Primary Phone" value={phone1} onChange={setPhone1} maxLen={20} placeholder="+91 74800 18007"/>
        <Field label="Secondary Phone (optional)" value={phone2} onChange={setPhone2} maxLen={20} placeholder="+91 XXXXX XXXXX"/>
        <Field label="Primary Email" value={email1} onChange={setEmail1} maxLen={80} placeholder="email@company.com"/>
        <Field label="Secondary Email (optional)" value={email2} onChange={setEmail2} maxLen={80} placeholder="support@company.com"/>
        <Field label="WhatsApp Number" value={whatsapp} onChange={setWhatsapp} maxLen={20} placeholder="+91 74800 18007"/>
        <Field label="Working Hours" value={hours} onChange={setHours} maxLen={60} placeholder="Mon-Sat: 9AM - 7PM IST"/>
      </div>
      <Field label="Main Address" value={address} onChange={setAddress} maxLen={200} placeholder="Full address..." rows={2}/>
      <div className="flex justify-end"><SaveBtn saving={sv} onClick={save}/></div>
    </div>
  );
}

/* ─── Stats Manager ─────────────────────────────────────── */
function StatsManager({ map }: { map:Record<string,any> }) {
  const K = 'ABOUT_STATS';
  let saved: any[] = [];
  try { saved = JSON.parse(map[K]?.description || '[]'); } catch {}

  const defaults = [
    { val:'5,000+', label:'Solar Installations' },
    { val:'50 MW+', label:'Installed Capacity'  },
    { val:'₹15 Cr+',label:'Customer Savings'    },
    { val:'20+',    label:'Cities Served'        },
    { val:'15,000+',label:'Happy Customers'      },
    { val:'18K Tons',label:'CO₂ Reduced'         },
  ];
  const [stats, setStats] = useState<{val:string;label:string}[]>(saved.length ? saved : defaults);
  const [sv, setSv] = useState(false);

  const update = (i:number, field:'val'|'label', v:string) =>
    setStats(p => p.map((s,idx) => idx===i ? {...s,[field]:v} : s));

  const save = async () => {
    setSv(true);
    await saveContent(K,'About Stats','Stats',JSON.stringify(stats),'');
    setSv(false); alert('Stats saved!');
  };

  return (
    <div className="space-y-3">
      <p className="text-white/40 text-xs">Edit the impact numbers shown on About/Company page</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {stats.map((s,i) => (
          <div key={i} className="bg-black/20 border border-white/8 rounded-xl p-4 space-y-2">
            <input type="text" value={s.val} onChange={e=>update(i,'val',e.target.value)} placeholder="e.g. 5,000+" className="w-full bg-white/5 border border-white/10 rounded-lg text-white text-lg font-black p-2 outline-none focus:border-amber-400/50 placeholder-white/20"/>
            <input type="text" value={s.label} onChange={e=>update(i,'label',e.target.value)} placeholder="Label" className="w-full bg-white/5 border border-white/10 rounded-lg text-white/60 text-xs p-2 outline-none focus:border-amber-400/50 placeholder-white/20"/>
          </div>
        ))}
      </div>
      <div className="flex justify-end"><SaveBtn saving={sv} onClick={save}/></div>
    </div>
  );
}

/* ─── Team Manager ──────────────────────────────────────── */
interface TeamMember { name:string; role:string; exp:string; img:string; bio:string; }
const EMPTY_MEMBER = (): TeamMember => ({ name:'', role:'', exp:'', img:'', bio:'' });

function TeamManager({ map }: { map:Record<string,any> }) {
  const K = 'ABOUT_TEAM';
  let saved: TeamMember[] = [];
  try { saved = JSON.parse(map[K]?.description || '[]'); } catch {}

  const defaults: TeamMember[] = [
    { name:'Rajesh Sharma', role:'Founder & CEO',   exp:'15+ years in renewable energy',     img:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80', bio:'Rajesh oversees strategic growth at Enfinite Energy.' },
    { name:'Neha Verma',    role:'CTO',             exp:'Expert in solar technology',          img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80', bio:'Neha leads our R&D wing focusing on smart grid integrations.' },
    { name:'Amit Mehta',    role:'COO',             exp:'Operations leader',                   img:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&q=80', bio:'Amit manages end-to-end operations.' },
    { name:'Vikram Singh',  role:'Head – Projects', exp:'Ensures quality delivery',            img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80', bio:'Vikram coordinates on-site installers.' },
  ];

  const [members, setMembers] = useState<TeamMember[]>(saved.length ? saved : defaults);
  const [editIdx, setEditIdx] = useState<number|null>(null);
  const [form,    setForm]    = useState(EMPTY_MEMBER());
  const [sv,      setSv]      = useState(false);
  const [up,      setUp]      = useState(false);

  const startEdit = (i:number) => { setEditIdx(i); setForm({...members[i]}); };
  const cancel    = () => { setEditIdx(null); setForm(EMPTY_MEMBER()); };
  const addNew    = () => { setEditIdx(-1); setForm(EMPTY_MEMBER()); };

  const apply = () => {
    if (!form.name) return alert('Name required');
    if (editIdx === -1) setMembers(p => [...p, form]);
    else if (editIdx !== null) setMembers(p => p.map((m,i) => i===editIdx ? form : m));
    cancel();
  };

  const del = (i:number) => { if (confirm('Remove this team member?')) setMembers(p => p.filter((_,idx)=>idx!==i)); };

  const saveAll = async () => {
    setSv(true);
    await saveContent(K,'About Team','Team',JSON.stringify(members),'');
    setSv(false); alert('Team saved!');
  };

  const handleImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setUp(true); 
    try { 
      const url = await uploadImg(f);
      setForm(p=>({...p,img:url})); 
    } catch { alert('Upload failed'); } 
    setUp(false);
  };

  return (
    <div className="space-y-4">
      {/* Member cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {members.map((m,i) => (
          <div key={i} className="bg-black/20 border border-white/8 rounded-xl p-3 text-center group">
            <div className="w-14 h-14 rounded-full overflow-hidden mx-auto mb-2 border-2 border-amber-400/30">
              {m.img ? <img src={m.img} alt={m.name} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-amber-400/20 flex items-center justify-center text-amber-400 font-black">{m.name[0]}</div>}
            </div>
            <p className="text-white font-black text-sm truncate">{m.name}</p>
            <p className="text-amber-400 text-[10px] font-bold truncate">{m.role}</p>
            <div className="flex gap-1 justify-center mt-2">
              <button onClick={()=>startEdit(i)} className="px-2 py-1 bg-white/5 border border-white/10 text-white/50 rounded text-[10px] hover:bg-white/10"><Edit2 className="w-3 h-3"/></button>
              <button onClick={()=>del(i)} className="px-2 py-1 bg-red-500/10 border border-red-500/20 text-red-400 rounded text-[10px]"><Trash2 className="w-3 h-3"/></button>
            </div>
          </div>
        ))}
        <button onClick={addNew} className="bg-black/10 border border-dashed border-white/15 rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:border-amber-400/40 transition text-white/30 hover:text-amber-400 min-h-[120px]">
          <Plus className="w-5 h-5"/><span className="text-xs font-bold">Add Member</span>
        </button>
      </div>

      {/* Edit form */}
      {editIdx !== null && (
        <div className="bg-black/20 border border-amber-400/20 rounded-xl p-4 space-y-3">
          <p className="text-amber-400 font-black text-sm">{editIdx===-1?'Add New':'Edit'} Team Member</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-3">
              <Field label="Name" value={form.name} onChange={v=>setForm(p=>({...p,name:v}))} maxLen={60} placeholder="Full Name"/>
              <Field label="Role/Title" value={form.role} onChange={v=>setForm(p=>({...p,role:v}))} maxLen={60} placeholder="CEO, CTO..."/>
              <Field label="Experience" value={form.exp} onChange={v=>setForm(p=>({...p,exp:v}))} maxLen={80} placeholder="15+ years in..."/>
              <Field label="Bio" value={form.bio} onChange={v=>setForm(p=>({...p,bio:v}))} maxLen={200} rows={3} placeholder="Short bio..."/>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Profile Photo</p>
              <ImgUpload value={form.img} onChange={v=>setForm(p=>({...p,img:v}))}/>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={cancel} className="px-4 py-2 bg-white/5 border border-white/10 text-white/60 rounded-xl text-sm font-bold hover:bg-white/10">Cancel</button>
            <button onClick={async () => {
                const btn = document.getElementById('ai-team-btn') as HTMLButtonElement; if(btn) btn.disabled = true;
                try {
                  const res = await fetch('http://localhost:5000/api/ai/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: `Write a short professional bio for a team member named ${form.name || 'someone'} who works as a ${form.role || 'professional'} with experience: ${form.exp || 'various experience'}.`, sectionName: "Team Bio" }) });
                  const data = await res.json();
                  if (data.status === 'success' && data.data.text) setForm(p => ({...p, bio: data.data.text}));
                  else alert('AI Generation failed.');
                } catch { alert('Error generating text.'); }
                if(btn) btn.disabled = false;
            }} id="ai-team-btn" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-all disabled:opacity-50">
              <Wand2 className="w-4 h-4 text-amber-400" /> AI Gen
            </button>
            <button onClick={apply} className="px-5 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-[#0A192F] font-bold rounded-xl text-sm">Apply</button>
          </div>
        </div>
      )}

      <div className="flex justify-end"><SaveBtn saving={sv} label="Save All Team" onClick={saveAll}/></div>
    </div>
  );
}

/* ─── Office Locations Manager ──────────────────────────── */
interface Office { city:string; state:string; pin:string; phone:string; address:string; type:string; }
const EMPTY_OFFICE = (): Office => ({ city:'', state:'', pin:'', phone:'', address:'', type:'Office' });

function OfficeManager({ map }: { map:Record<string,any> }) {
  const K = 'CONTACT_OFFICES';
  let saved: Office[] = [];
  try { saved = JSON.parse(map[K]?.description || '[]'); } catch {}

  const defaults: Office[] = [
    { city:'Gurugram',  state:'Haryana',      pin:'122001', phone:'+91 74800 18007', address:'Gurugram, Haryana', type:'HQ'     },
    { city:'Bhabua',    state:'Bihar',         pin:'821109', phone:'+91 74800 18007', address:'Bhabua, Kaimur, Bihar 821109', type:'Office' },
    { city:'Mohania',   state:'Bihar',         pin:'821101', phone:'+91 74800 18007', address:'Mohania, Kaimur, Bihar 821101', type:'Office' },
    { city:'Noida',     state:'Uttar Pradesh', pin:'201301', phone:'+91 74800 18007', address:'Noida, Uttar Pradesh', type:'Office' },
  ];

  const [offices, setOffices] = useState<Office[]>(saved.length ? saved : defaults);
  const [editIdx, setEditIdx] = useState<number|null>(null);
  const [form,    setForm]    = useState(EMPTY_OFFICE());
  const [sv,      setSv]      = useState(false);

  const startEdit = (i:number) => { setEditIdx(i); setForm({...offices[i]}); };
  const cancel    = () => { setEditIdx(null); setForm(EMPTY_OFFICE()); };
  const addNew    = () => { setEditIdx(-1); setForm(EMPTY_OFFICE()); };
  const apply     = () => {
    if (!form.city) return alert('City required');
    if (editIdx===-1) setOffices(p=>[...p,form]);
    else if (editIdx!==null) setOffices(p=>p.map((o,i)=>i===editIdx?form:o));
    cancel();
  };
  const del = (i:number) => { if (confirm('Remove this office?')) setOffices(p=>p.filter((_,idx)=>idx!==i)); };

  const saveAll = async () => {
    setSv(true);
    await saveContent(K,'Contact Offices','Offices',JSON.stringify(offices),'');
    setSv(false); alert('Offices saved!');
  };

  const TYPES = ['HQ','Office','Service Center','Warehouse'];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {offices.map((o,i)=>(
          <div key={i} className="flex items-center gap-3 bg-black/20 border border-white/8 rounded-xl p-3">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0"/>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm">{o.city}, {o.state} {o.pin && `- ${o.pin}`}</p>
              <p className="text-white/40 text-[11px]">{o.phone} · {o.type}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={()=>startEdit(i)} className="px-2.5 py-1.5 bg-white/5 border border-white/10 text-white/60 rounded-lg text-xs hover:bg-white/10"><Edit2 className="w-3 h-3"/></button>
              <button onClick={()=>del(i)} className="px-2.5 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs"><Trash2 className="w-3 h-3"/></button>
            </div>
          </div>
        ))}
        <button onClick={addNew} className="w-full flex items-center justify-center gap-2 py-3 bg-black/10 border border-dashed border-white/15 rounded-xl text-white/40 hover:text-amber-400 hover:border-amber-400/30 transition text-sm font-bold">
          <Plus className="w-4 h-4"/> Add Office Location
        </button>
      </div>

      {editIdx!==null && (
        <div className="bg-black/20 border border-amber-400/20 rounded-xl p-4 space-y-3">
          <p className="text-amber-400 font-black text-sm">{editIdx===-1?'Add':'Edit'} Office</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Field label="City *" value={form.city} onChange={v=>setForm(p=>({...p,city:v}))} maxLen={50} placeholder="Lucknow"/>
            <Field label="State" value={form.state} onChange={v=>setForm(p=>({...p,state:v}))} maxLen={50} placeholder="Uttar Pradesh"/>
            <Field label="PIN Code" value={form.pin} onChange={v=>setForm(p=>({...p,pin:v}))} maxLen={10} placeholder="226001"/>
            <Field label="Phone" value={form.phone} onChange={v=>setForm(p=>({...p,phone:v}))} maxLen={20} placeholder="+91 XXXXX XXXXX"/>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5">Type</p>
              <select value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))} className="w-full bg-white/5 border border-white/10 rounded-xl text-white text-sm p-3 outline-none focus:border-amber-400/50">
                {TYPES.map(t=><option key={t} value={t} className="bg-[#0a0f1e]">{t}</option>)}
              </select>
            </div>
            <Field label="Full Address" value={form.address} onChange={v=>setForm(p=>({...p,address:v}))} maxLen={150} placeholder="Full address..."/>
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={cancel} className="px-4 py-2 bg-white/5 border border-white/10 text-white/60 rounded-xl text-sm font-bold hover:bg-white/10">Cancel</button>
            <button onClick={apply} className="px-5 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-[#0A192F] font-bold rounded-xl text-sm">Apply</button>
          </div>
        </div>
      )}
      <div className="flex justify-end"><SaveBtn saving={sv} label="Save All Offices" onClick={saveAll}/></div>
    </div>
  );
}

/* ─── About Hero Manager ────────────────────────────────── */
function AboutHeroManager({ map }: { map:Record<string,any> }) {
  const K = 'ABOUT_HERO';
  const [title, setTitle] = useState(map[K]?.title || "Powering India's Sustainable Future");
  const [desc,  setDesc]  = useState(map[K]?.description || 'We are a team of passionate engineers, sales professionals, and sustainability advocates committed to making solar energy accessible to every Indian.');
  const [img,   setImg]   = useState(map[K]?.imageUrl || '/images/16.png');
  const [sv, setSv] = useState(false);
  const save = async () => { setSv(true); await saveContent(K,'About Hero',title,desc,img); setSv(false); alert('Saved!'); };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Field label="Hero Heading" value={title} onChange={setTitle} maxLen={100}/>
          <Field label="Subheading / Description" value={desc} onChange={setDesc} maxLen={300} rows={4}/>
        </div>
        <div><p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Hero Image</p><ImgUpload value={img} onChange={setImg}/></div>
      </div>
      <div className="flex justify-end gap-3">
        <button onClick={async () => {
            const btn = document.getElementById('ai-about-hero-btn') as HTMLButtonElement; if(btn) btn.disabled = true;
            try {
              const res = await fetch('http://localhost:5000/api/ai/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: `Generate a catchy hero title and a short description for the About page of a solar energy company.`, sectionName: "About Hero" }) });
              const data = await res.json();
              if (data.status === 'success' && data.data.text) setDesc(data.data.text);
              else alert('AI Generation failed.');
            } catch { alert('Error generating text.'); }
            if(btn) btn.disabled = false;
        }} id="ai-about-hero-btn" className="flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-all disabled:opacity-50">
          <Wand2 className="w-4 h-4 text-amber-400" /> AI Auto-Generate
        </button>
        <SaveBtn saving={sv} onClick={save}/>
      </div>
    </div>
  );
}

/* ─── Contact Hero Manager ──────────────────────────────── */
function ContactHeroManager({ map }: { map:Record<string,any> }) {
  const K = 'CONTACT_HERO';
  const [title, setTitle] = useState(map[K]?.title || "Let's Build Your Solar Future Together");
  const [desc,  setDesc]  = useState(map[K]?.description || 'Have a question? Want a free site survey? Our solar experts are ready to help you switch to clean energy.');
  const [img,   setImg]   = useState(map[K]?.imageUrl || '');
  const [sv, setSv] = useState(false);
  const save = async () => { setSv(true); await saveContent(K,'Contact Hero',title,desc,img); setSv(false); alert('Saved!'); };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Field label="Hero Heading" value={title} onChange={setTitle} maxLen={100}/>
          <Field label="Subheading" value={desc} onChange={setDesc} maxLen={250} rows={3}/>
        </div>
        <div><p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Hero Image (optional)</p><ImgUpload value={img} onChange={setImg}/></div>
      </div>
      <div className="flex justify-end gap-3">
        <button onClick={async () => {
            const btn = document.getElementById('ai-contact-hero-btn') as HTMLButtonElement; if(btn) btn.disabled = true;
            try {
              const res = await fetch('http://localhost:5000/api/ai/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: `Generate a catchy hero title and a short description for the Contact page of a solar energy company.`, sectionName: "Contact Hero" }) });
              const data = await res.json();
              if (data.status === 'success' && data.data.text) setDesc(data.data.text);
              else alert('AI Generation failed.');
            } catch { alert('Error generating text.'); }
            if(btn) btn.disabled = false;
        }} id="ai-contact-hero-btn" className="flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-sm hover:bg-white/10 transition-all disabled:opacity-50">
          <Wand2 className="w-4 h-4 text-amber-400" /> AI Auto-Generate
        </button>
        <SaveBtn saving={sv} onClick={save}/>
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */
export default function PagesAdminPage() {
  const [map,     setMap]     = useState<Record<string,any>>({});
  const [loading, setLoading] = useState(true);
  const [tab,     setTab]     = useState<'contact-info'|'offices'|'stats'|'team'|'about-hero'|'contact-hero'>('contact-info');

  useEffect(() => { getContent().then(m => { setMap(m); setLoading(false); }); }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-amber-400 animate-spin"/></div>;

  const TABS = [
    { id:'contact-info',  label:'Contact Info',   icon:<Phone className="w-4 h-4"/>     },
    { id:'offices',       label:'Office Locations',icon:<Building2 className="w-4 h-4"/>},
    { id:'stats',         label:'Impact Stats',    icon:<BarChart3 className="w-4 h-4"/> },
    { id:'team',          label:'Team Members',    icon:<Users className="w-4 h-4"/>     },
    { id:'about-hero',    label:'About Hero',      icon:<Globe className="w-4 h-4"/>     },
    { id:'contact-hero',  label:'Contact Hero',    icon:<MapPin className="w-4 h-4"/>    },
  ] as const;

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-16">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-3">
          <Globe className="w-3.5 h-3.5"/> About & Contact Manager
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">About & Contact Pages</h1>
        <p className="text-sm text-white/50 mt-1">Update contact info, team members, office locations, stats and hero sections.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab===t.id?'bg-amber-400 text-[#0A192F]':'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'}`}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        {tab==='contact-info' && (<><div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5"><Phone className="w-4 h-4 text-amber-400"/><h2 className="text-xl font-black text-white">Contact Information</h2><span className="ml-auto text-xs text-white/30">Shown on Contact page & Footer</span></div><ContactInfoManager map={map}/></>)}
        {tab==='offices'      && (<><div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5"><Building2 className="w-4 h-4 text-amber-400"/><h2 className="text-xl font-black text-white">Office Locations</h2><span className="ml-auto text-xs text-white/30">Shown on Contact page</span></div><OfficeManager map={map}/></>)}
        {tab==='stats'        && (<><div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5"><BarChart3 className="w-4 h-4 text-amber-400"/><h2 className="text-xl font-black text-white">Impact Stats</h2><span className="ml-auto text-xs text-white/30">Shown on About/Company page</span></div><StatsManager map={map}/></>)}
        {tab==='team'         && (<><div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5"><Users className="w-4 h-4 text-amber-400"/><h2 className="text-xl font-black text-white">Team Members</h2><span className="ml-auto text-xs text-white/30">Shown on About/Company page</span></div><TeamManager map={map}/></>)}
        {tab==='about-hero'   && (<><div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5"><Globe className="w-4 h-4 text-amber-400"/><h2 className="text-xl font-black text-white">About Page Hero</h2></div><AboutHeroManager map={map}/></>)}
        {tab==='contact-hero' && (<><div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5"><MapPin className="w-4 h-4 text-amber-400"/><h2 className="text-xl font-black text-white">Contact Page Hero</h2></div><ContactHeroManager map={map}/></>)}
      </div>
    </div>
  );
}
