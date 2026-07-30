import React, { useState } from 'react';
import {
  Landmark, ArrowRight, CheckCircle2, Download, ShieldCheck,
  Home, Building2, Sprout, FileText, Calculator, ClipboardList,
  MapPin, ChevronRight, Phone, MessageCircle, Star, Info, X, Zap
} from 'lucide-react';

const schemeCards = [
  { num: "01", icon: <Home className="w-6 h-6" />, color: "#10B981", bg: "bg-emerald-500/10 border-emerald-500/20", title: "PM Surya Ghar\nMuft Bijli Yojana", desc: "Rooftop Solar for Residential Homes. Get up to ₹78,000 subsidy from Government of India." },
  { num: "02", icon: <Building2 className="w-6 h-6" />, color: "#3B82F6", bg: "bg-blue-500/10 border-blue-500/20", title: "State Government\nSubsidies", desc: "Additional subsidies and benefits available from State Governments. Varies from state to state." },
  { num: "03", icon: <Sprout className="w-6 h-6" />, color: "#F59E0B", bg: "bg-amber-500/10 border-amber-500/20", title: "Agriculture\nSolar Scheme", desc: "Solar water pumps and agriculture schemes under PM-KUSUM. Higher subsidy for farmers." },
  { num: "04", icon: <FileText className="w-6 h-6" />, color: "#8B5CF6", bg: "bg-purple-500/10 border-purple-500/20", title: "Required\nDocuments", desc: "Know the list of documents required to apply for solar subsidy." },
  { num: "05", icon: <Calculator className="w-6 h-6" />, color: "#06B6D4", bg: "bg-cyan-500/10 border-cyan-500/20", title: "Subsidy\nCalculator", desc: "Calculate your estimated subsidy and total savings on rooftop solar installation." },
  { num: "06", icon: <ClipboardList className="w-6 h-6" />, color: "#EF4444", bg: "bg-red-500/10 border-red-500/20", title: "Application\nProcess", desc: "Step-by-step process to apply for solar subsidy and get your system installed." },
];

const stateSubsidies = [
  { state: "Uttar Pradesh", amount: "Up to ₹78,000" },
  { state: "Maharashtra", amount: "Up to ₹90,000" },
  { state: "Rajasthan", amount: "Up to ₹85,000" },
  { state: "Gujarat", amount: "Up to ₹60,000" },
  { state: "Karnataka", amount: "Up to ₹70,000" },
  { state: "Bihar", amount: "Up to ₹78,000" },
  { state: "Madhya Pradesh", amount: "Up to ₹75,000" },
  { state: "Tamil Nadu", amount: "Up to ₹65,000" },
  { state: "Telangana", amount: "Up to ₹72,000" },
];

const topSchemes = [
  { icon: "🏠", title: "PM Surya Ghar Muft Bijli Yojana", sub: "Residential Rooftop Solar Scheme", color: "text-emerald-400" },
  { icon: "🌾", title: "PM-KUSUM Scheme", sub: "Solar Pumps for Farmers", color: "text-amber-400" },
  { icon: "⚡", title: "Grid Connected Rooftop Scheme", sub: "For Residential, Commercial & Industrial", color: "text-blue-400" },
  { icon: "🏙️", title: "Solar City Mission", sub: "Promoting Solar in Urban Areas", color: "text-purple-400" },
];

const appSteps = [
  { icon: "👤", label: "Register", sub: "Register on National Portal" },
  { icon: "🔍", label: "Site Survey", sub: "Vendor visit and site inspection" },
  { icon: "✅", label: "Approval", sub: "Application approval by DISCOM" },
  { icon: "🔧", label: "Installation", sub: "Solar system installation" },
  { icon: "🔎", label: "Inspection", sub: "DISCOM inspection & verification" },
  { icon: "💰", label: "Subsidy Credited", sub: "Subsidy directly in your bank account" },
];

const documents = [
  "Aadhaar Card", "Recent Electricity Bill", "Bank Passbook / Cancelled Cheque",
  "Property Proof", "Passport Size Photo", "Mobile Number",
];

const stateOptions = ["Uttar Pradesh", "Maharashtra", "Rajasthan", "Gujarat", "Karnataka", "Delhi", "Punjab", "Haryana"];

export function GovernmentSchemes() {
  const [bill, setBill] = useState(1500);
  const [capacity, setCapacity] = useState("3 KW");
  const [selState, setSelState] = useState("Uttar Pradesh");

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('Apply for Solar Subsidy');
  const [modalType, setModalType] = useState('SCHEME_APPLICATION');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const capacityMap: Record<string, { subsidy: number; contrib: number; total: number }> = {
    "1 KW": { subsidy: 30000, contrib: 35000, total: 65000 },
    "2 KW": { subsidy: 54000, contrib: 62000, total: 116000 },
    "3 KW": { subsidy: 78000, contrib: 97000, total: 175000 },
    "5 KW": { subsidy: 78000, contrib: 172000, total: 250000 },
    "10 KW": { subsidy: 78000, contrib: 322000, total: 400000 },
  };
  const calc = capacityMap[capacity] || capacityMap["3 KW"];

  const openFormModal = (title: string, type: string) => {
    setModalTitle(title);
    setModalType(type);
    setShowModal(true);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return alert('Name and Mobile Number are required.');
    setSubmitting(true);
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          message: `Submission from News Page schemes panel: Type - ${modalType}. Calc Bill - ₹${bill}, capacity - ${capacity}, state - ${selState}`,
          type: 'SCHEME_LEAD'
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('Thank you! Details submitted successfully. Our solar expert will call you shortly.');
        setShowModal(false);
        setName('');
        setEmail('');
        setPhone('');
      } else {
        alert(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error, please check connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mb-8 pt-6 border-t border-gray-200">
      {/* ── Header ── */}
      <div className="relative rounded-2xl overflow-hidden bg-[#0B1120] mb-6">
        {/* Background image overlay */}
        <div className="absolute inset-0 bg-[url('/17.png')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/90 to-transparent" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Landmark className="w-5 h-5 text-primary" />
              <span className="text-xs font-black text-primary uppercase tracking-widest">Government Initiative</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">
              Government Solar Subsidy<br />&amp; Schemes
            </h2>
            <p className="text-sm text-white/60 font-medium mb-4">
              Save more with Central &amp; State Government Subsidies on Rooftop Solar
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <ShieldCheck className="w-3.5 h-3.5" />, label: "Trusted Government Schemes" },
                { icon: <Star className="w-3.5 h-3.5" />, label: "100% Transparency" },
                { icon: <Zap className="w-3.5 h-3.5" />, label: "Hassle-free Process" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/70 font-bold">
                  <span className="text-primary">{b.icon}</span> {b.label}
                </div>
              ))}
            </div>
          </div>

          {/* Highlight card */}
          <div className="bg-white rounded-xl p-4 w-full md:w-56 shrink-0 shadow-2xl">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-lg">🏠</span>
              <span className="text-xs font-black text-gray-900">PM Surya Ghar<br />Muft Bijli Yojana</span>
            </div>
            <p className="text-2xl font-black text-emerald-600 mb-1">Up to ₹78,000</p>
            <p className="text-xs text-gray-500">Subsidy for Residential Rooftop Solar</p>
            <button 
              onClick={() => openFormModal('Apply PM Surya Ghar Yojana', 'PM_SURYA_GHAR')}
              className="mt-3 w-full bg-primary text-[#0B1120] text-xs font-black py-2 rounded-lg hover:brightness-110 transition-all"
            >
              Apply Now →
            </button>
          </div>
        </div>
      </div>

      {/* ── 6 Scheme Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {schemeCards.map((c, i) => (
          <div 
            key={i} 
            onClick={() => openFormModal(`More details: ${c.title.replace('\n', ' ')}`, `SCHEME_${c.num}`)}
            className="bg-[#0B1120] border border-white/10 rounded-xl p-4 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${c.bg} border flex items-center justify-center`} style={{ color: c.color }}>
                {c.icon}
              </div>
              <span className="text-[10px] font-black text-white/20">{c.num}</span>
            </div>
            <h4 className="text-xs font-black text-white leading-snug mb-1 whitespace-pre-line group-hover:text-primary transition-colors">{c.title}</h4>
            <p className="text-[10px] text-white/40 leading-relaxed line-clamp-2">{c.desc}</p>
            <button className="mt-3 text-[10px] font-black flex items-center gap-1 transition-all" style={{ color: c.color }}>
              View Details <ArrowRight className="w-2.5 h-2.5" />
            </button>
          </div>
        ))}
      </div>

      {/* ── Bottom 3-Column Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">

        {/* Subsidy Calculator */}
        <div className="bg-[#0B1120] border border-white/10 rounded-2xl p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-black text-white">Subsidy Calculator</h3>
          </div>
          <p className="text-[10px] text-white/40 mb-4">Calculate your estimated subsidy and savings</p>

          <div className="space-y-3">
            <div>
              <label className="text-[10px] text-white/50 font-bold uppercase tracking-widest block mb-1">Monthly Electricity Bill</label>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                <span className="text-white/40 text-sm">₹</span>
                <input
                  type="number"
                  value={bill}
                  onChange={e => setBill(Number(e.target.value))}
                  className="bg-transparent text-white text-sm font-bold flex-grow outline-none w-full"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-white/50 font-bold uppercase tracking-widest block mb-1">System Size Required</label>
              <select
                value={capacity}
                onChange={e => setCapacity(e.target.value)}
                className="w-full bg-[#0f1d35] border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-bold outline-none cursor-pointer"
                style={{ colorScheme: 'dark' }}
              >
                {Object.keys(capacityMap).map(k => <option key={k} value={k} className="bg-[#0f1d35] text-white">{k}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-white/50 font-bold uppercase tracking-widest block mb-1">Select State</label>
              <select
                value={selState}
                onChange={e => setSelState(e.target.value)}
                className="w-full bg-[#0f1d35] border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-bold outline-none cursor-pointer"
                style={{ colorScheme: 'dark' }}
              >
                {stateOptions.map(s => <option key={s} value={s} className="bg-[#0f1d35] text-white">{s}</option>)}
              </select>
            </div>
          </div>

          {/* Unified Result Card */}
          <div className="mt-4 bg-white/5 border border-emerald-500/20 rounded-2xl overflow-hidden flex-grow">
            {/* Top — Subsidy highlight */}
            <div className="bg-emerald-500/10 px-4 pt-4 pb-3 border-b border-white/10">
              <p className="text-[9px] text-white/40 uppercase tracking-widest mb-0.5">Government Subsidy</p>
              <p className="text-3xl font-black text-emerald-400">₹ {calc.subsidy.toLocaleString('en-IN')}</p>
            </div>

            {/* Rows */}
            {[
              { label: "Your Contribution", value: `₹ ${calc.contrib.toLocaleString('en-IN')}`, color: "text-white" },
              { label: "Total System Cost", value: `₹ ${calc.total.toLocaleString('en-IN')}`, color: "text-white" },
              { label: "Annual Savings", value: `₹ ${Math.round(bill * 12 * 0.7).toLocaleString('en-IN')}`, color: "text-primary" },
              { label: "Payback Period", value: "4–6 Years", color: "text-cyan-400" },
              { label: "CO₂ Saved / Year", value: "≈ 2.8 Tons", color: "text-emerald-400" },
              { label: "System Lifespan", value: "25 Years", color: "text-amber-400" },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 last:border-b-0">
                <span className="text-[11px] text-white/50">{row.label}</span>
                <span className={`text-[11px] font-black ${row.color}`}>{row.value}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={() => openFormModal('Detailed Subsidy & Savings Consultation', 'CALCULATOR_DETAILED')}
            className="mt-4 w-full bg-primary text-[#0B1120] font-black text-xs py-2.5 rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <Calculator className="w-3.5 h-3.5" /> Calculate Detailed Savings →
          </button>
        </div>

        {/* State-wise Subsidies */}
        <div className="bg-[#0B1120] border border-white/10 rounded-2xl p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-black text-white">State-wise Subsidy Schemes</h3>
          </div>
          <p className="text-[10px] text-white/40 mb-4">Select your state to know available subsidies</p>

          {/* India map placeholder */}
          <div className="w-full h-28 bg-white/5 border border-white/10 rounded-xl mb-4 flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl">🗺️</span>
              <p className="text-[10px] text-white/40 mt-1">India Subsidy Map</p>
            </div>
          </div>

          <div className="space-y-2">
            {stateSubsidies.map((s, i) => (
              <div 
                key={i} 
                onClick={() => openFormModal(`Get Subsidy Quote for ${s.state}`, `STATE_SUBSIDY_${s.state.toUpperCase()}`)}
                className="flex items-center justify-between py-2 border-b border-white/5 group cursor-pointer hover:border-primary/30 transition-colors"
              >
                <span className="text-xs text-white/70 font-medium group-hover:text-white transition-colors">{s.state}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-emerald-400">{s.amount}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => openFormModal('Request State-wise Subsidy Chart', 'STATE_WISE_CHART')}
            className="mt-auto pt-4 text-xs font-black text-primary flex items-center gap-1 hover:gap-2 transition-all text-left"
          >
            View All States → 
          </button>
        </div>

        {/* Right Column: Top Schemes + CTA */}
        <div className="flex flex-col gap-4">
          {/* Top Schemes */}
          <div className="bg-[#0B1120] border border-white/10 rounded-2xl p-5 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-black text-white">Top Government Schemes</h3>
            </div>
            <div className="space-y-3">
              {topSchemes.map((s, i) => (
                <div 
                  key={i} 
                  onClick={() => openFormModal(`Consultation for: ${s.title}`, `TOP_SCHEME_${i}`)}
                  className="flex items-start gap-3 py-2 border-b border-white/5 cursor-pointer group hover:border-primary/20 transition-colors"
                >
                  <span className="text-xl">{s.icon}</span>
                  <div className="flex-grow min-w-0">
                    <p className={`text-xs font-black ${s.color} group-hover:text-white transition-colors leading-snug`}>{s.title}</p>
                    <p className="text-[10px] text-white/40">{s.sub}</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-white/20 shrink-0 group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
            <button 
              onClick={() => openFormModal('View All Government Solar Schemes', 'ALL_SCHEMES_LIST')}
              className="mt-3 text-xs font-black text-primary flex items-center gap-1 hover:gap-2 transition-all text-left"
            >
              View All Schemes →
            </button>
          </div>

          {/* Not Sure CTA */}
          <div className="bg-[#0B1120] border border-primary/30 rounded-2xl p-5 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🤔</span>
              </div>
              <p className="text-sm font-black text-white mb-1">Not Sure Which Scheme<br />is Right for You?</p>
              <p className="text-[10px] text-white/50 mb-4">Our solar experts will help you choose the best scheme and get maximum benefit.</p>
              <button 
                onClick={() => openFormModal('Check Your Solar Scheme Eligibility', 'ELIGIBILITY_CHECK')}
                className="w-full bg-primary text-[#0B1120] font-black text-xs py-2.5 rounded-lg hover:brightness-110 transition-all mb-2"
              >
                Check Eligibility Now →
              </button>
              <p className="text-[10px] text-white/30 mb-2">or</p>
              <a 
                href="https://wa.me/919999999999?text=Hi,%20I%20want%20to%20know%20my%20solar%20subsidy%20eligibility" 
                target="_blank" 
                rel="noreferrer"
                className="w-full bg-white/5 border border-white/10 text-white/80 hover:text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all hover:border-primary/30"
              >
                <MessageCircle className="w-3.5 h-3.5 text-green-400" /> Chat with Expert on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Application Process ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <div className="bg-[#0B1120] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-5">
            <ClipboardList className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-black text-white">Application Process</h3>
          </div>
          <div className="flex items-start gap-0 overflow-x-auto pb-2">
            {appSteps.map((step, i) => (
              <div 
                key={i} 
                onClick={() => openFormModal(`Help with Application Step: ${step.label}`, `APP_STEP_${i}`)}
                className="flex flex-col items-center min-w-[80px] cursor-pointer group"
              >
                <div className="flex items-center w-full">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 group-hover:border-primary/50 flex items-center justify-center text-lg flex-shrink-0 transition-colors">
                    {step.icon}
                  </div>
                  {i < appSteps.length - 1 && (
                    <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent min-w-[20px]" />
                  )}
                </div>
                <p className="text-[10px] font-black text-white mt-2 text-center leading-snug group-hover:text-primary transition-colors">{step.label}</p>
                <p className="text-[9px] text-white/30 text-center leading-snug mt-0.5 px-1">{step.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Required Documents */}
        <div className="bg-[#0B1120] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-5">
            <FileText className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-black text-white">Required Documents</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {documents.map((doc, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-xs text-white/70 font-medium">{doc}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-[10px] text-blue-300">All subsidies are subject to government guidelines and updates. Please check official government websites for latest information.</p>
          </div>
        </div>
      </div>

      {/* ── Approved Vendor Badge ── */}
      <div className="bg-gradient-to-r from-[#0B1120] to-[#0f1d35] border border-primary/20 rounded-xl p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-grow">
          <h4 className="text-sm font-black text-white mb-0.5">MNRE Approved Vendor — Zero Hassle Subsidy Processing</h4>
          <p className="text-xs text-white/50">Enfinite Energy handles 100% of the subsidy paperwork, approvals and follow-ups. You just enjoy your free electricity.</p>
        </div>
        <button 
          onClick={() => openFormModal('Apply with MNRE Approved Vendor', 'APPROVED_VENDOR_APPLY')}
          className="shrink-0 bg-primary text-[#0B1120] font-black text-xs px-4 py-2 rounded-lg hover:brightness-110 transition-all whitespace-nowrap"
        >
          Get Started →
        </button>
      </div>

      {/* LEAD POPUP DIALOG */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f1d35] border border-white/10 rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-lg font-black text-white mb-1">Check Subsidy &amp; Schemes</h3>
            <p className="text-xs text-primary font-bold mb-4">{modalTitle}</p>
            
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name" 
                  className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary placeholder-white/20"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary placeholder-white/20"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1.5">Mobile Number</label>
                <input 
                  type="tel" 
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter mobile number" 
                  className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary placeholder-white/20"
                />
              </div>
              
              <button 
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:brightness-110 disabled:opacity-50 text-[#0A192F] font-black py-3 rounded-xl shadow-lg shadow-primary/20 transition-all text-sm mt-2"
              >
                {submitting ? 'Submitting details...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
