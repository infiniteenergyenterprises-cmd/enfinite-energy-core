'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { ArrowRight, CheckCircle2, Home, Building2, Zap, Shield, Wrench, X } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const API = process.env.NEXT_PUBLIC_API_URL || (process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') : 'http://localhost:5000');
const CONTENT_KEY = 'HOME_SAVINGS_CALCULATOR';

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

export function SavingsCalculator() {
  const { width, height } = useWindowSize();
  const [bill, setBill] = useState(5000);
  const [propertyType, setPropertyType] = useState('residential');
  const [content, setContent] = useState<CalcContent>(DEFAULTS);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return alert('Name and Mobile Number are required.');
    setSubmitting(true);
    
    const systemSize = Math.max(1, Math.round(bill / 1200));
    const annualSavings = (bill * 12 * (propertyType === 'commercial' ? 0.85 : 0.8)).toLocaleString('en-IN');
    
    try {
      const res = await fetch(`${API}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          message: `Requested Free Site Survey. Property: ${propertyType}, Monthly Bill: ₹${bill}, System Size: ${systemSize}kW, Est. Savings: ₹${annualSavings}. Address: ${address}`,
          type: 'SURVEY'
        })
      });
      const data = await res.json();
      if (data.success) {
        setRegistered(true);
      } else {
        alert(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error, please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/api/content`);
        if (res.ok) {
          const { map } = await res.json();
          if (map[CONTENT_KEY]) {
            const saved = map[CONTENT_KEY];
            let extra: Partial<CalcContent> = {};
            try { extra = JSON.parse(saved.description || '{}'); } catch {}
            setContent({
              heading:        saved.title          || DEFAULTS.heading,
              subheading:     extra.subheading     || DEFAULTS.subheading,
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
    })();
  }, []);

  const multiplier = propertyType === 'commercial' ? 0.85 : 0.8;
  const annualSavings = (bill * 12 * multiplier).toLocaleString('en-IN');
  const systemSize = Math.max(1, Math.round(bill / 1200));
  const sliderPercentage = ((bill - 1000) / (50000 - 1000)) * 100;

  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-10 bg-gray-50/50 relative overflow-hidden">
      {/* Custom styles for the slider thumb */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #F59E0B;
          cursor: pointer;
          border: 4px solid white;
          box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
          margin-top: 0px; /* Optional: aligns thumb vertically if needed */
        }
        .custom-slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #F59E0B;
          cursor: pointer;
          border: 4px solid white;
          box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
        }
      `}} />

      {/* Subtle background decoration */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent -z-10"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0A192F] tracking-tight mb-4">
            {content.heading}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.subheading}
          </p>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col md:flex-row">
          
          {/* Left: Input */}
          <div className="p-6 md:p-8 lg:p-10 md:w-1/2 relative bg-white flex flex-col">
            <h3 className="text-xl font-bold text-[#0A192F] mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-blue/5 flex items-center justify-center text-brand-blue text-sm">1</span>
              Tell us about your usage
            </h3>
            
            <div className="mb-10">
              <div className="flex justify-between items-end mb-6">
                <label className="text-sm font-semibold text-gray-700">Monthly Electricity Bill</label>
                <div className="text-3xl font-extrabold text-[#0A192F] tracking-tight">
                  <span className="text-primary text-2xl mr-1">₹</span>
                  {bill.toLocaleString('en-IN')}
                </div>
              </div>
              
              <div className="relative py-2">
                <input 
                  type="range" 
                  min="1000" 
                  max="50000" 
                  step="500" 
                  value={bill} 
                  onChange={(e) => setBill(Number(e.target.value))}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer custom-slider"
                  style={{
                    background: `linear-gradient(to right, #F59E0B ${sliderPercentage}%, #E5E7EB ${sliderPercentage}%)`
                  }}
                />
              </div>
              
              <div className="flex justify-between mt-3 text-xs text-gray-400 font-bold uppercase tracking-wider">
                <span>₹1,000</span>
                <span>₹50,000+</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-4">Property Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setPropertyType('residential')}
                  className={`flex flex-col items-center gap-2 py-4 px-4 rounded-xl border-2 transition-all duration-300 ${
                    propertyType === 'residential' 
                    ? 'border-primary bg-primary/5 text-primary shadow-[0_4px_20px_rgba(245,158,11,0.15)] scale-[1.02]' 
                    : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200 hover:bg-gray-50 hover:text-gray-600 shadow-sm'
                  }`}
                >
                  <Home className="w-6 h-6" />
                  <span className="font-bold text-sm">Residential</span>
                </button>
                <button 
                  onClick={() => setPropertyType('commercial')}
                  className={`flex flex-col items-center gap-2 py-4 px-4 rounded-xl border-2 transition-all duration-300 ${
                    propertyType === 'commercial' 
                    ? 'border-primary bg-primary/5 text-primary shadow-[0_4px_20px_rgba(245,158,11,0.15)] scale-[1.02]' 
                    : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200 hover:bg-gray-50 hover:text-gray-600 shadow-sm'
                  }`}
                >
                  <Building2 className="w-6 h-6" />
                  <span className="font-bold text-sm">Commercial</span>
                </button>
              </div>
            </div>

            <div className="mb-6 flex-1 flex flex-col justify-center">
              <p className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-4">Included with installation</p>
              <ul className="space-y-3.5">
                <li className="flex items-center gap-3 text-sm text-[#0A192F] font-semibold">
                  <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-amber-500" />
                  </div>
                  {content.feature1}
                </li>
                <li className="flex items-center gap-3 text-sm text-[#0A192F] font-semibold">
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4 text-blue-500" />
                  </div>
                  {content.feature2}
                </li>
                <li className="flex items-center gap-3 text-sm text-[#0A192F] font-semibold">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Wrench className="w-4 h-4 text-emerald-500" />
                  </div>
                  {content.feature3}
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-green-50/50 border border-green-100/60 rounded-xl p-5 flex items-start gap-4 mt-auto shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
               <div className="bg-white p-1.5 rounded-full shadow-sm shrink-0">
                 <CheckCircle2 className="w-5 h-5 text-emerald-500" />
               </div>
               <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
                 {content.bottomNote}
               </p>
            </div>
          </div>

          {/* Right: Results & CTA */}
          <div className="p-6 md:p-8 lg:p-10 md:w-1/2 bg-gradient-to-br from-[#0A192F] via-[#0d2240] to-[#112240] relative overflow-hidden flex flex-col justify-center">
            {/* Decorative Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[80px] -mr-20 -mt-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[60px] -ml-20 -mb-10 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">2</div>
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Estimated Results</h3>
              </div>
              
              <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm shadow-inner">
                <div className="text-gray-300 text-sm mb-2 font-medium flex items-center justify-between">
                  Estimated Annual Savings
                  <span className="text-green-400 text-[11px] bg-green-400/10 px-2.5 py-1 rounded-full font-bold">~{content.savingsPercent}% Bill Reduction</span>
                </div>
                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 tracking-tight">
                  ₹{annualSavings}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                  <div className="text-gray-400 text-[11px] mb-1 font-medium uppercase tracking-wider">Recommended System</div>
                  <div className="text-xl font-bold text-white flex items-baseline gap-1.5">
                    {systemSize} <span className="text-xs text-primary">kW</span>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                  <div className="text-gray-400 text-[11px] mb-1 font-medium uppercase tracking-wider">Payback Period</div>
                  <div className="text-xl font-bold text-white flex items-baseline gap-1.5">
                    {content.paybackPeriod} <span className="text-xs text-primary">Years</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto">
                <Button 
                  onClick={() => setShowModal(true)}
                  className="w-full py-4 text-sm font-bold rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 group transition-all duration-300 border border-primary/50 mb-6"
                >
                  {content.ctaText}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="relative w-full h-36 md:h-44 rounded-xl overflow-hidden shadow-lg group">
                  <img src={content.ctaImageUrl} alt="Solar Benefits" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <h4 className="text-white font-bold text-lg md:text-xl leading-tight mb-1">Empower Your Future</h4>
                    <p className="text-gray-300 text-xs md:text-sm font-medium">Join thousands saving with Enfinite Energy.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Survey Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {registered && (
            <Confetti width={width} height={height} recycle={false} numberOfPieces={600} style={{ zIndex: 100, position: 'fixed' }} />
          )}
          <div className="bg-[#0f1d35] border border-white/10 rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-[101]">
            <button 
              onClick={() => { setShowModal(false); setRegistered(false); }}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            {registered ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-black text-white mb-2">Request Submitted!</h3>
                <p className="text-sm text-white/60 mb-6">
                  Thank you! We have received your request for a Free Site Survey. Our expert will contact you shortly to schedule the visit.
                </p>
                <button 
                  onClick={() => { setShowModal(false); setRegistered(false); }}
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 rounded-xl transition-all text-sm"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-black text-white mb-1">Book Free Site Survey</h3>
                <p className="text-xs text-primary font-bold mb-4">Take the first step towards solar savings</p>
                
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name" 
                      className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-white/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email" 
                      className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-white/20"
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
                      className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-white/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1.5">Installation Address</label>
                    <input 
                      type="text" 
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="City or full address" 
                      className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-white/20"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary hover:brightness-110 disabled:opacity-50 text-[#0A192F] font-black py-3 rounded-xl shadow-lg shadow-primary/20 transition-all text-sm mt-2 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#0A192F]/30 border-t-[#0A192F] rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : 'Submit Request'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
