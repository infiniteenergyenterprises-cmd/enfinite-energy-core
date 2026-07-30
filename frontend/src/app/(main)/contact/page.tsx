'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MapPin, Phone, Mail, Clock, Shield, Award, Sparkles, CheckCircle2,
  Calendar, ArrowRight, UploadCloud, MessageSquare, Calculator,
  TrendingUp, Leaf, Check, HelpCircle, AlertCircle, Heart, Users,
  CheckCircle, Globe, Sun, Zap, HardHat, PhoneCall, Video
} from 'lucide-react';

/* ─── DATA ─── */
const states = [
  'Uttar Pradesh', 'Bihar', 'Delhi NCR', 'Haryana', 'Maharashtra', 
  'Karnataka', 'Rajasthan', 'Madhya Pradesh', 'Gujarat'
];

const partners = [
  { name: 'Adani Solar', logo: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=120&q=80' },
  { name: 'Waaree', logo: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=120&q=80' },
  { name: 'Tata Power Solar', logo: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=120&q=80' },
  { name: 'Canadian Solar', logo: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=120&q=80' },
  { name: 'Loom Solar', logo: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=120&q=80' },
  { name: 'V-Guard', logo: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=120&q=80' },
];

export default function ContactPage() {
  /* CMS contact info */
  const [cmsContact, setCmsContact] = React.useState<any>(null);
  const [heroTitle,  setHeroTitle]  = React.useState("Let's Build Your Solar Future Together");
  const [heroDesc,   setHeroDesc]   = React.useState('Have a question? Want a free site survey? Our solar experts are ready to help you switch to clean energy.');

  React.useEffect(() => {
    fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/content')
      .then(r => r.json())
      .then(d => {
        const map = d.map || {};
        if (map['CONTACT_INFO'])  { try { setCmsContact(JSON.parse(map['CONTACT_INFO'].description || '{}')); } catch {} }
        if (map['CONTACT_HERO']) {
          if (map['CONTACT_HERO'].title)       setHeroTitle(map['CONTACT_HERO'].title);
          if (map['CONTACT_HERO'].description) setHeroDesc(map['CONTACT_HERO'].description);
        }
      })
      .catch(() => {});
  }, []);

  const phone1   = cmsContact?.phone1   || '+91 74800 18007';
  const email1   = cmsContact?.email1   || 'infiniteenergyenterprises@gmail.com';
  const whatsapp = cmsContact?.whatsapp || '+91 74800 18007';
  const address  = cmsContact?.address  || 'Bhabua, Mohania, Kaimur, Bihar 821109';
  const hours    = cmsContact?.hours    || 'Mon-Sat: 9AM - 7PM IST';

  /* 1. Main Consultation Form State */
  const [consultForm, setConsultForm] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    state: 'Uttar Pradesh',
    customerType: 'Residential',
    monthlyBill: '',
    roofArea: '',
    roofType: 'Concrete Roof',
    message: '',
    services: [] as string[]
  });
  
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const [consultError, setConsultError] = useState('');
  const [consultLoading, setConsultLoading] = useState(false);

  /* 2. Solar Calculator State */
  const [billInput, setBillInput] = useState<number>(5000);
  const [calcResults, setCalcResults] = useState({
    systemSize: 5,
    monthlySavings: 3750,
    annualSavings: 45000,
    subsidy: 78000,
    payback: '2.5 - 3 Years'
  });

  /* Calculate dynamic solar savings whenever bill input changes */
  useEffect(() => {
    const bill = Number(billInput) || 0;
    // Standard system size calculation: 1kW per ₹1000 of bill
    const kw = Math.max(1, Math.ceil(bill / 1000));
    const savingsM = Math.round(bill * 0.90);
    const savingsA = savingsM * 12;
    
    // PM Surya Ghar subsidy rules:
    // 1kW: ₹30,000 | 2kW: ₹60,000 | 3kW+: ₹78,000 max
    let sub = 0;
    if (kw === 1) sub = 30000;
    else if (kw === 2) sub = 60000;
    else if (kw >= 3) sub = 78000;

    // Approximate cost: ₹60,000 per kW
    const totalCost = kw * 60000;
    const netCost = totalCost - sub;
    const years = savingsA > 0 ? (netCost / savingsA).toFixed(1) : '3';
    
    setCalcResults({
      systemSize: kw,
      monthlySavings: savingsM,
      annualSavings: savingsA,
      subsidy: sub,
      payback: `${years} Years`
    });
  }, [billInput]);

  /* 3. Site Survey Form State */
  const [surveyForm, setSurveyForm] = useState({
    date: '2026-07-27',
    timeSlot: '10:00 AM - 12:00 PM',
    location: ''
  });
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [surveyError, setSurveyError] = useState('');
  const [surveyLoading, setSurveyLoading] = useState(false);
  const [selectedMapLoc, setSelectedMapLoc] = useState('bhabua');

  /* Services array for checkboxes */
  const servicesList = [
    'Residential Solar', 'Commercial Solar', 'Industrial Solar', 'Agriculture Solar',
    'EV Charging', 'Battery Storage', 'AMC / Maintenance', 'Government Subsidy'
  ];

  const handleServiceChange = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(prev => prev.filter(s => s !== service));
    } else {
      setSelectedServices(prev => [...prev, service]);
    }
  };

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setConsultError('');
    setConsultLoading(true);
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: consultForm.name,
          email: consultForm.email,
          phone: consultForm.mobile,
          type: consultForm.customerType.toUpperCase(),
          message: `City: ${consultForm.city}, State: ${consultForm.state}, Bill: ${consultForm.monthlyBill}, Roof: ${consultForm.roofArea} sq.ft (${consultForm.roofType}), Services: ${selectedServices.join(', ')}. ${consultForm.message}`
        })
      });
      const data = await res.json();
      if (data.success) {
        setConsultSubmitted(true);
        setTimeout(() => {
          setConsultSubmitted(false);
          setConsultForm({
            name: '', mobile: '', email: '', city: '', state: 'Uttar Pradesh',
            customerType: 'Residential', monthlyBill: '', roofArea: '',
            roofType: 'Concrete Roof', message: '', services: []
          });
          setSelectedServices([]);
          setUploadedFileName('');
        }, 3000);
      } else {
        setConsultError(data.message || 'Submission failed');
      }
    } catch (err) {
      setConsultError('Network error. Please try again later.');
    }
    setConsultLoading(false);
  };

  const handleSurveySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSurveyError('');
    setSurveyLoading(true);
    
    // Quick prompt for Name, Email, Phone since survey form only has Date/Time/Location in UI
    const name = window.prompt("Please enter your Full Name:");
    if (!name) { setSurveyLoading(false); return; }
    const phone = window.prompt("Please enter your Mobile Number (10 digits):");
    if (!phone || phone.length !== 10) { alert('Valid 10-digit phone required.'); setSurveyLoading(false); return; }
    const email = window.prompt("Please enter your Email (Optional):") || '';

    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          type: 'SURVEY',
          message: `Survey Date: ${surveyForm.date}, Time: ${surveyForm.timeSlot}, Location: ${surveyForm.location}`
        })
      });
      const data = await res.json();
      if (data.success) {
        setSurveySubmitted(true);
        setTimeout(() => {
          setSurveySubmitted(false);
          setSurveyForm({ date: '2026-07-27', timeSlot: '10:00 AM - 12:00 PM', location: '' });
        }, 3000);
      } else {
        alert(data.message || 'Submission failed');
      }
    } catch (err) {
      alert('Network error. Please try again later.');
    }
    setSurveyLoading(false);
  };

  return (
    <div className="bg-white min-h-screen text-gray-900 overflow-x-hidden">

      {/* ══════════════════════ HERO SECTION ══════════════════════ */}
      <section className="relative pt-32 pb-10 bg-[#0B1E3D] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/20.png')] bg-cover bg-center opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3D]/95 via-[#0B1E3D]/70 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-4 lg:px-6">
          {/* Header titles */}
          <div className="mb-12">
            <p className="text-[#F5A623] text-xs font-black uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" /> Contact Us
            </p>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Let's Build Your <span className="text-[#F5A623]">Solar Future</span> Together
            </h1>
            <p className="text-white/60 text-sm mt-2 max-w-xl">
              Have a question or ready to switch to solar? We're here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* FLOATING CONTACT STRIP ON BOUNDARY */}
      <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white border-t-4 border-t-[#F5A623] border-x border-b border-gray-100 rounded-xl p-4 md:p-5 shadow-md shadow-gray-200/50">
          <div className="grid grid-cols-4 gap-1 divide-x divide-gray-150">
            {[
              { label: 'Call Us', val: '+91 74800 18007', shortVal: 'Call', desc: 'Mon - Sat: 9 AM - 7 PM', icon: <Phone className="w-3.5 h-3.5 md:w-5 md:h-5" />, bg: 'bg-[#F5A623]/10 text-[#F5A623] group-hover:bg-[#F5A623]/20', href: 'tel:+917480018007' },
              { label: 'WhatsApp', val: 'Chat with Expert', shortVal: 'Chat', desc: 'Instant support desk', icon: <MessageSquare className="w-3.5 h-3.5 md:w-5 md:h-5" />, bg: 'bg-green-500/10 text-green-600 group-hover:bg-green-500/20', href: 'https://wa.me/917480018007' },
              { label: 'Email Us', val: 'infiniteenergyenterprises@gmail.com', shortVal: 'Email', desc: 'Response in 4 hours', icon: <Mail className="w-3.5 h-3.5 md:w-5 md:h-5" />, bg: 'bg-blue-500/10 text-blue-600 group-hover:bg-blue-500/20', href: 'mailto:infiniteenergyenterprises@gmail.com' },
              { label: 'Location', val: 'Bhabua, Mohania, Varanasi', shortVal: 'Office', desc: 'Pin: 821109 & 821101 (Bihar, UP)', icon: <MapPin className="w-3.5 h-3.5 md:w-5 md:h-5" />, bg: 'bg-red-500/10 text-red-500 group-hover:bg-red-500/20', href: '#offices' },
            ].map((c, i) => (
              <a key={i} href={c.href} className="px-1 md:px-4 py-1.5 flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 hover:scale-[1.01] transition-all group w-full text-center sm:text-left">
                <div className={`p-1 sm:p-2 rounded-lg shrink-0 transition-colors ${c.bg}`}>{c.icon}</div>
                <div className="min-w-0">
                  <p className="text-[7px] sm:text-[10px] text-gray-400 uppercase tracking-wider font-black leading-none">{c.label}</p>
                  <p className="text-[10px] sm:text-xs font-black text-gray-900 truncate mt-0.5 leading-none">
                    <span className="hidden sm:inline">{c.val}</span>
                    <span className="inline sm:hidden">{c.shortVal}</span>
                  </p>
                  <p className="text-[9px] text-gray-500 truncate mt-0.5 hidden sm:block">{c.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT: CONSULTATION + CALCULATOR + SURVEY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 pt-8 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* COLUMN 1 & 2: GET FREE CONSULTATION FORM */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-50/90 via-white/80 to-slate-100/50 backdrop-blur-md border border-slate-200/60 rounded-2xl p-6 shadow-xl shadow-gray-200/40">
            <div className="mb-5">
              <h2 className="text-xl font-black text-gray-900">Get Free Consultation</h2>
              <p className="text-xs text-gray-500 mt-1">Fill out the form and our solar expert will contact you shortly.</p>
            </div>

            {consultSubmitted ? (
              <div className="py-8 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-500">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-gray-900">Consultation Request Received!</h3>
                <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                  Thank you for reaching out. Our solar executive will contact you within 24 hours to guide you.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="space-y-4">
                {consultError && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs border border-red-100 mb-2">
                    {consultError}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-black text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                    <input required type="text" placeholder="Enter your name" value={consultForm.name} onChange={(e) => setConsultForm({...consultForm, name: e.target.value})} className="w-full bg-white border border-gray-300 font-semibold rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-all shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black text-gray-700 mb-1">Mobile Number <span className="text-red-500">*</span></label>
                    <input required type="tel" pattern="[0-9]{10}" maxLength={10} minLength={10} title="10-digit mobile number" placeholder="Enter mobile number" value={consultForm.mobile} onChange={(e) => setConsultForm({...consultForm, mobile: e.target.value})} className="w-full bg-white border border-gray-300 font-semibold rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-all shadow-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-black text-gray-700 mb-1">Email Address</label>
                    <input type="email" placeholder="Enter your email" value={consultForm.email} onChange={(e) => setConsultForm({...consultForm, email: e.target.value})} className="w-full bg-white border border-gray-300 font-semibold rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-all shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black text-gray-700 mb-1">City <span className="text-red-500">*</span></label>
                    <input required type="text" placeholder="Enter your city (e.g. Bhabua, Varanasi)" value={consultForm.city} onChange={(e) => setConsultForm({...consultForm, city: e.target.value})} className="w-full bg-white border border-gray-300 font-semibold rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-all shadow-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-black text-gray-700 mb-1">State <span className="text-red-500">*</span></label>
                    <select value={consultForm.state} onChange={(e) => setConsultForm({...consultForm, state: e.target.value})} className="w-full bg-white border border-gray-300 font-semibold rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-all shadow-sm">
                      {states.map((st, i) => <option key={i} value={st}>{st}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black text-gray-700 mb-1">Customer Type <span className="text-red-500">*</span></label>
                    <select value={consultForm.customerType} onChange={(e) => setConsultForm({...consultForm, customerType: e.target.value})} className="w-full bg-white border border-gray-300 font-semibold rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-all shadow-sm">
                      <option value="Residential">Residential Solar</option>
                      <option value="Commercial">Commercial Solar</option>
                      <option value="Industrial">Industrial Solar</option>
                      <option value="Agriculture">Agriculture / Pump</option>
                    </select>
                  </div>
                </div>

                {/* Service checkboxes */}
                <div>
                  <label className="block text-[10px] uppercase font-black text-gray-700 mb-2">Service Required <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {servicesList.map((service, i) => (
                      <button key={i} type="button" onClick={() => handleServiceChange(service)}
                        className={`border text-left px-3 py-2 rounded-xl text-[11px] font-black transition-all flex items-center justify-between shadow-sm ${selectedServices.includes(service) ? 'bg-[#0B1E3D] border-[#0B1E3D] text-white scale-[1.02]' : 'bg-white border-gray-300 text-gray-700 hover:bg-slate-50'}`}>
                        {service}
                        {selectedServices.includes(service) && <Check className="w-3.5 h-3.5 text-[#F5A623]" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-black text-gray-700 mb-1">Monthly Electricity Bill (₹)</label>
                    <input type="number" placeholder="e.g. 5000" value={consultForm.monthlyBill} onChange={(e) => { setConsultForm({...consultForm, monthlyBill: e.target.value}); if(e.target.value) setBillInput(Number(e.target.value)); }} className="w-full bg-white border border-gray-300 font-semibold rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-all shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black text-gray-700 mb-1">Approx. Roof Area (sq. ft.)</label>
                    <input type="text" placeholder="e.g. 500" value={consultForm.roofArea} onChange={(e) => setConsultForm({...consultForm, roofArea: e.target.value})} className="w-full bg-white border border-gray-300 font-semibold rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-all shadow-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-black text-gray-700 mb-1">Roof Type</label>
                    <select value={consultForm.roofType} onChange={(e) => setConsultForm({...consultForm, roofType: e.target.value})} className="w-full bg-white border border-gray-300 font-semibold rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-all shadow-sm">
                      <option>Concrete Roof</option>
                      <option>Tin Shade</option>
                      <option>Asbestos Roof</option>
                      <option>Ground Mounted</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black text-gray-700 mb-1">Upload Electricity Bill (Optional)</label>
                    <div className="relative border-2 border-dashed border-gray-300 hover:border-[#F5A623] rounded-xl py-2 px-3 flex items-center justify-center gap-2 cursor-pointer transition-all bg-white hover:bg-slate-50 shadow-sm">
                      <UploadCloud className="w-4 h-4 text-gray-400" />
                      <span className="text-[11px] text-gray-500 font-black truncate max-w-[200px]">{uploadedFileName || 'Click to upload bill PDF/JPG'}</span>
                      <input type="file" accept="image/*,.pdf" onChange={(e) => { if(e.target.files?.[0]) setUploadedFileName(e.target.files[0].name); }} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-black text-gray-700 mb-1">Message (Optional)</label>
                  <textarea rows={3} placeholder="Tell us about your requirement..." value={consultForm.message} onChange={(e) => setConsultForm({...consultForm, message: e.target.value})} className="w-full bg-white border border-gray-300 font-semibold rounded-xl px-3.5 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-all resize-none shadow-sm" />
                </div>

                <button type="submit" disabled={consultLoading} className="w-full bg-[#F5A623] text-[#0B1E3D] font-black py-3 rounded-xl hover:brightness-110 transition-all shadow-md shadow-[#F5A623]/20 flex items-center justify-center gap-2 text-xs uppercase tracking-wider disabled:opacity-70">
                  {consultLoading ? 'Submitting...' : 'Get Free Quote'} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* COLUMN 3: CALCULATOR + SITE SURVEY */}
          <div className="space-y-6">

            {/* SOLAR SAVINGS CALCULATOR */}
            <div className="bg-gradient-to-br from-[#0B1E3D] to-[#1a3260] border border-white/10 rounded-2xl p-5 shadow-lg text-white">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-[#F5A623]" />
                <h3 className="text-sm font-black uppercase tracking-wider text-white">Solar Savings Calculator</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-white/50 mb-1">Monthly Electricity Bill (₹)</label>
                  <input type="number" value={billInput} onChange={(e) => setBillInput(Number(e.target.value))} className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5A623]" />
                </div>

                <div className="border-t border-white/10 pt-3 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-white/60">System Size</span>
                    <span className="text-white font-bold">{calcResults.systemSize} kW</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-white/60">Est. Monthly Savings</span>
                    <span className="text-emerald-400 font-bold">₹{calcResults.monthlySavings}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-white/60">Est. Annual Savings</span>
                    <span className="text-[#F5A623] font-bold">₹{calcResults.annualSavings}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-white/60">Available Subsidy</span>
                    <span className="text-blue-400 font-bold">₹{calcResults.subsidy}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold border-t border-white/10 pt-2">
                    <span className="text-white/60">Payback Period</span>
                    <span className="text-[#F5A623] font-black">{calcResults.payback}</span>
                  </div>
                </div>

                <button onClick={() => setConsultForm(prev => ({ ...prev, monthlyBill: String(billInput) }))} className="w-full bg-white/10 border border-white/20 text-white hover:bg-white/15 font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5">
                  Calculate Your Savings
                </button>
              </div>
            </div>

            {/* BOOK FREE SITE SURVEY */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-7 shadow-lg shadow-gray-100/50">
              <div className="flex items-center gap-2 mb-5">
                <Calendar className="w-5 h-5 text-[#F5A623]" />
                <h3 className="text-sm font-black uppercase tracking-wider text-gray-900">Book Free Site Survey</h3>
              </div>

              {surveySubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-500">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-black text-xs text-gray-900">Survey Booked!</h4>
                  <p className="text-[11px] text-gray-500 mt-1">Our engineer will contact you to confirm the time slot.</p>
                </div>
              ) : (
                <form onSubmit={handleSurveySubmit} className="space-y-4.5">
                  <div>
                    <label className="block text-[10px] uppercase font-black text-gray-700 mb-1.5">Select Date</label>
                    <input required type="date" value={surveyForm.date} onChange={(e) => setSurveyForm({...surveyForm, date: e.target.value})} className="w-full bg-white border border-gray-300 font-semibold rounded-xl px-3.5 py-3 text-xs text-gray-900 focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black text-gray-700 mb-1.5">Select Time</label>
                    <select value={surveyForm.timeSlot} onChange={(e) => setSurveyForm({...surveyForm, timeSlot: e.target.value})} className="w-full bg-white border border-gray-300 font-semibold rounded-xl px-3.5 py-3 text-xs text-gray-900 focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] shadow-sm">
                      <option>10:00 AM - 12:00 PM</option>
                      <option>12:00 PM - 02:00 PM</option>
                      <option>02:00 PM - 04:00 PM</option>
                      <option>04:00 PM - 06:00 PM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black text-gray-700 mb-1.5">Your Location / Address</label>
                    <input required type="text" placeholder="Enter complete address" value={surveyForm.location} onChange={(e) => setSurveyForm({...surveyForm, location: e.target.value})} className="w-full bg-white border border-gray-300 font-semibold rounded-xl px-3.5 py-3 text-xs text-gray-900 focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] shadow-sm" />
                  </div>
                  <button type="submit" disabled={surveyLoading} className="w-full bg-[#0B1E3D] hover:bg-[#1a3260] text-white font-black py-3.5 rounded-xl text-xs transition-all uppercase tracking-wider shadow-md mt-2 disabled:opacity-70">
                    {surveyLoading ? 'Booking...' : 'Book Site Survey'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* MAP & OFFICE INFO */}
      <section className="bg-gray-50 py-10" id="offices">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6">
          
          {/* Location Switcher Tabs */}
          <div className="flex flex-wrap gap-2 mb-4 bg-white border border-gray-100 p-2 rounded-xl shadow-sm max-w-2xl">
            {[
              { id: 'bhabua', label: 'Bhabua (Bihar)', address: 'Ward No. 12, Collectorate Road, Bhabua, Bihar – 821109', tel: '+91 98765 43215', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14443.435777413622!2d83.5932598!3d25.0478051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398db57a1515bb6b%3A0xc1b96a1a1f0a2df3!2sBhabua%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000' },
              { id: 'mohania', label: 'Mohania (Bihar)', address: 'GT Road, Near Station Chowk, Mohania, Bihar – 821101', tel: '+91 98765 43216', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14440.407987827878!2d83.6163351!3d25.1704205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398db148fb3083db%3A0x7d0a2db0f8e9cdfa!2sMohania%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000' },
              { id: 'varanasi', label: 'Varanasi (UP)', address: 'Sigra Crossing, Varanasi, Uttar Pradesh – 221010', tel: '+91 98765 43217', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57715.111200234127!2d82.9525852!3d25.3176452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2db76978f5f9%3A0x1b0d21051515bb6b!2sVaranasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000' },
              { id: 'noida', label: 'Noida HQ (NCR)', address: 'Plot No. 45, Sector 63, Noida, Uttar Pradesh – 201301', tel: '+91 74800 18007', map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.7744783307613!2d77.3789428!3d28.6065415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce561c28c8959%3A0xc07a72d3fbd3f392!2sNoida%20Sector%2063!5e0!3m2!1sen!2sin!4v1700000000000' }
            ].map((tab) => (
              <button key={tab.id} onClick={() => setSelectedMapLoc(tab.id)}
                className={`text-xs font-black px-4 py-2 rounded-xl transition-all ${selectedMapLoc === tab.id ? 'bg-[#0B1E3D] text-[#F5A623] shadow-md' : 'bg-transparent text-gray-500 hover:text-gray-900'}`}>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* Map Frame (Left 2 cols) */}
            <div className="lg:col-span-2 bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 min-h-[350px] relative">
              <iframe 
                src={
                  selectedMapLoc === 'bhabua' ? 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14443.435777413622!2d83.5932598!3d25.0478051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398db57a1515bb6b%3A0xc1b96a1a1f0a2df3!2sBhabua%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000' :
                  selectedMapLoc === 'mohania' ? 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14440.407987827878!2d83.6163351!3d25.1704205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398db148fb3083db%3A0x7d0a2db0f8e9cdfa!2sMohania%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000' :
                  selectedMapLoc === 'varanasi' ? 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57715.111200234127!2d82.9525852!3d25.3176452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2db76978f5f9%3A0x1b0d21051515bb6b!2sVaranasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000' :
                  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.7744783307613!2d77.3789428!3d28.6065415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce561c28c8959%3A0xc07a72d3fbd3f392!2sNoida%20Sector%2063!5e0!3m2!1sen!2sin!4v1700000000000'
                }
                className="w-full h-full border-0 absolute inset-0"
                allowFullScreen={false}
                loading="lazy"
              />
            </div>

            {/* Office Details */}
            <div className="bg-[#0B1E3D] text-white border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5A623]/5 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <p className="text-[#F5A623] text-[10px] font-black uppercase tracking-widest mb-1.5">
                  {selectedMapLoc === 'noida' ? 'Headquarters' : 'Regional Branch'}
                </p>
                <h3 className="text-xl font-black mb-4">
                  {selectedMapLoc === 'bhabua' ? 'Bhabua Office' :
                   selectedMapLoc === 'mohania' ? 'Mohania Office' :
                   selectedMapLoc === 'varanasi' ? 'Varanasi Office' : 'Noida Head Office'}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#F5A623] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-black text-white">Enfinite Energy Pvt. Ltd.</p>
                      <p className="text-[11px] text-white/60 mt-0.5 leading-relaxed">
                        {selectedMapLoc === 'bhabua' ? 'Ward No. 12, Collectorate Road, Bhabua, Bihar – 821109' :
                         selectedMapLoc === 'mohania' ? 'GT Road, Near Station Chowk, Mohania, Bihar – 821101' :
                         selectedMapLoc === 'varanasi' ? 'Sigra Crossing, Varanasi, Uttar Pradesh – 221010' :
                         'Plot No. 45, Sector 63, Noida, Uttar Pradesh – 201301'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#F5A623] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-black text-white">Call Office Desk</p>
                      <p className="text-[11px] text-white/60 mt-0.5">
                        {selectedMapLoc === 'bhabua' ? '+91 98765 43215' :
                         selectedMapLoc === 'mohania' ? '+91 98765 43216' :
                         selectedMapLoc === 'varanasi' ? '+91 98765 43217' :
                         '+91 74800 18007'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#F5A623] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-black text-white">Email Address</p>
                      <p className="text-[11px] text-white/60 mt-0.5">infiniteenergyenterprises@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 border-t border-white/10 pt-4 mt-6">
                <p className="text-[10px] text-white/40 uppercase font-black tracking-wide">Working Hours</p>
                <p className="text-xs text-white/70 mt-1 leading-snug">Mon – Sat: 9:00 AM – 7:00 PM<br/>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE TRUST SIGNALS ROW */}
      <section className="bg-[#0B1E3D]/95 text-white py-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { val: 'PAN India Service', label: 'We serve in 20+ states across India', icon: <Globe className="text-[#F5A623] w-5 h-5" /> },
              { val: 'Expert Engineers', label: '100+ certified solar tech experts', icon: <HardHat className="text-blue-400 w-5 h-5" /> },
              { val: 'Quick Installation', label: 'System goes live in 7 - 15 days', icon: <Zap className="text-amber-400 w-5 h-5" /> },
              { val: 'Quality Assurance', label: '25 years performance guarantee', icon: <Shield className="text-emerald-400 w-5 h-5" /> },
              { val: 'Government Approved', label: 'MNRE & ALMM subsidy registered', icon: <Award className="text-purple-400 w-5 h-5" /> },
              { val: 'Customer Support', label: '24x7 call and repair assistance', icon: <Clock className="text-pink-400 w-5 h-5" /> },
            ].map((s,i)=>(
              <div key={i} className="border border-white/10 bg-white/5 shadow-sm p-4 rounded-xl text-center flex flex-col items-center justify-center hover:scale-105 transition-all">
                <div className="mb-2">{s.icon}</div>
                <p className="text-xs font-black text-white leading-tight">{s.val}</p>
                <p className="text-[9px] text-white/50 mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGIONAL OFFICES + HELP CHANNELS + SUBSIDY HELP */}
      <section className="bg-[#0B1E3D] border-t border-b border-white/10 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Regional Offices */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg">
              <h3 className="text-sm font-black uppercase tracking-wider text-white mb-3.5 border-b border-white/10 pb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" /> Regional Offices
              </h3>
              <div className="space-y-2.5">
                {[
                  { city: 'Delhi Office', state: 'New Delhi, India', tel: '+91 98765 43211' },
                  { city: 'Mumbai Office', state: 'Mumbai, Maharashtra', tel: '+91 98765 43212' },
                  { city: 'Bangalore Office', state: 'Bangalore, Karnataka', tel: '+91 98765 43213' },
                  { city: 'Jaipur Office', state: 'Jaipur, Rajasthan', tel: '+91 98765 43214' },
                  { city: 'Bhabua Office (Bihar)', state: 'Bhabua, Bihar - 821109', tel: '+91 98765 43215' },
                  { city: 'Mohania Office (Bihar)', state: 'Mohania, Bihar - 821101', tel: '+91 98765 43216' },
                  { city: 'Varanasi Office (UP)', state: 'Varanasi, Uttar Pradesh', tel: '+91 98765 43217' },
                ].map((off,i)=>(
                  <div key={i} className="flex items-center justify-between text-xs border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                    <div>
                      <p className="font-black text-white/90">{off.city}</p>
                      <p className="text-[9px] text-white/55 mt-0.5">{off.state}</p>
                    </div>
                    <a href={`tel:${off.tel.replace(/\s+/g, '')}`} className="text-[10px] font-bold text-[#F5A623] hover:underline shrink-0">{off.tel}</a>
                  </div>
                ))}
              </div>
            </div>

            {/* Help Channels */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg">
              <h3 className="text-sm font-black uppercase tracking-wider text-white mb-3.5 border-b border-white/10 pb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" /> We're Here to Help You
              </h3>
              <div className="space-y-3.5">
                {[
                  { icon: <MessageSquare className="w-4 h-4 text-blue-400"/>, title: 'Live Chat Support', desc: 'Chat with our solar expert online', link: '#' },
                  { icon: <PhoneCall className="w-4 h-4 text-green-400"/>, title: 'WhatsApp Chat', desc: 'Get instant replies on WhatsApp', link: 'https://wa.me/917480018007' },
                  { icon: <Phone className="w-4 h-4 text-[#F5A623]"/>, title: 'Request a Callback', desc: 'We will call you back immediately', link: '#' },
                  { icon: <Video className="w-4 h-4 text-purple-400"/>, title: 'Video Consultation', desc: 'Talk to our expert via video call', link: '#' },
                ].map((item,i)=>(
                  <a key={i} href={item.link} className="flex items-center gap-3.5 p-2 border border-white/5 rounded-xl hover:bg-white/5 hover:border-[#F5A623]/30 transition-all">
                    <div className="shrink-0">{item.icon}</div>
                    <div>
                      <p className="text-xs font-black text-white/90">{item.title}</p>
                      <p className="text-[9px] text-white/55 mt-0.5">{item.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Government Subsidy Help */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg">
              <h3 className="text-sm font-black uppercase tracking-wider text-white mb-3.5 border-b border-white/10 pb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" /> Government Subsidy Help
              </h3>
              <p className="text-[11px] text-white/50 mb-4">We help you get maximum subsidy benefits from current schemes.</p>
              
              <div className="space-y-3.5">
                {[
                  { title: 'PM Surya Ghar Yojana', desc: 'Up to 40% subsidy for residential homes.' },
                  { title: 'PM-KUSUM Yojana', desc: 'Subsidized solar pumps for farmers & agriculture.' },
                  { title: 'State Government Subsidy', desc: 'Additional state-wise green benefits.' },
                  { title: 'Subsidy Eligibility Check', desc: 'Check your eligibility criteria now.' },
                ].map((item,i)=>(
                  <div key={i} onClick={() => alert(`${item.title}: our team will help submit your application under this scheme.`)} className="flex items-start gap-2 cursor-pointer group">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-xs font-black text-white/90 leading-tight group-hover:text-[#F5A623] transition-colors">{item.title}</p>
                      <p className="text-[10px] text-white/50 mt-0.5 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* AUTHORIZED TECHNOLOGY & BRAND PARTNERS */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-4 lg:px-6 border-t border-gray-150">
        <div className="text-center mb-8">
          <span className="text-[#F5A623] text-xs font-black uppercase tracking-widest mb-1.5 inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" /> Certified Ecosystems
          </span>
          <h2 className="text-lg md:text-xl font-black text-[#0B1E3D] uppercase tracking-wider">
            Authorized Technology & <span className="text-[#F5A623]">Brand Partners</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'adani solar', tier: 'Gold Distributor', hoverBg: 'group-hover:bg-amber-500', hoverText: 'group-hover:text-amber-600', hoverBadge: 'group-hover:text-amber-600 group-hover:border-amber-200 group-hover:bg-amber-50/50' },
            { name: 'WAAREE', tier: 'OEM Module Partner', hoverBg: 'group-hover:bg-blue-500', hoverText: 'group-hover:text-blue-600', hoverBadge: 'group-hover:text-blue-600 group-hover:border-blue-200 group-hover:bg-blue-50/50' },
            { name: 'TATA POWER', tier: 'System Integrator', hoverBg: 'group-hover:bg-red-500', hoverText: 'group-hover:text-red-600', hoverBadge: 'group-hover:text-red-600 group-hover:border-red-200 group-hover:bg-red-50/50' },
            { name: 'CanadianSolar', tier: 'Tier-1 Supplier', hoverBg: 'group-hover:bg-emerald-500', hoverText: 'group-hover:text-emerald-600', hoverBadge: 'group-hover:text-emerald-600 group-hover:border-emerald-200 group-hover:bg-emerald-50/50' },
            { name: 'Loom Solar', tier: 'Lithium Battery Partner', hoverBg: 'group-hover:bg-purple-500', hoverText: 'group-hover:text-purple-600', hoverBadge: 'group-hover:text-purple-600 group-hover:border-purple-200 group-hover:bg-purple-50/50' },
            { name: 'V-GUARD', tier: 'Inverter Partner', hoverBg: 'group-hover:bg-pink-500', hoverText: 'group-hover:text-pink-600', hoverBadge: 'group-hover:text-pink-600 group-hover:border-pink-200 group-hover:bg-pink-50/50' }
          ].map((brand, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-4 text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-md hover:shadow-gray-100/50 bg-white group cursor-default relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1 bg-transparent transition-all duration-300 ${brand.hoverBg}`} />
              <p className={`text-sm font-black text-gray-800 tracking-tight uppercase transition-colors duration-300 ${brand.hoverText}`}>{brand.name}</p>
              <span className={`inline-block text-[9px] font-black text-gray-400 uppercase tracking-wider mt-1.5 px-2 py-0.5 bg-gray-50 border border-gray-100 rounded-full transition-all duration-300 ${brand.hoverBadge}`}>{brand.tier}</span>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA STRIP */}
      <section className="bg-[#0B1E3D] text-white py-14 relative overflow-hidden border-t-4 border-[#F5A623]">
        {/* Abstract blur background elements */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-4 lg:px-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-md">
            <div>
              <span className="text-[#F5A623] text-[10px] font-black uppercase tracking-widest mb-1.5 flex items-center gap-1.5 justify-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" /> Start Your Solar Journey
              </span>
              <h3 className="text-xl md:text-3xl font-black tracking-tight text-white leading-none">Ready to Switch to Solar?</h3>
              <p className="text-xs text-white/60 mt-2 max-w-xl leading-relaxed">
                Get a free consultation and start saving on your electricity bills today. Our certified team will help you step-by-step.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })} 
                className="bg-[#F5A623] text-[#0B1E3D] font-black px-7 py-3.5 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all text-xs uppercase tracking-wider shadow-lg shadow-[#F5A623]/20 hover:brightness-110">
                Get Free Quote
              </button>
              <button onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })} 
                className="bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-[#F5A623]/50 hover:text-[#F5A623] font-black px-7 py-3.5 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all text-xs uppercase tracking-wider">
                Book Site Survey
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
