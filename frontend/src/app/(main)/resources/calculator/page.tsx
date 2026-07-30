export const dynamic = 'force-dynamic';
export const revalidate = 0;
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator, Zap, IndianRupee, Leaf, TrendingDown, Sun, ArrowRight,
  ChevronRight, Home, Building2, Factory, Tractor, Phone,
  CheckCircle2, BarChart3, Shield, Clock, RefreshCw
} from 'lucide-react';

// ── Constants ─────────────────────────────────────────────────────────────────
const PROPERTY_TYPES = [
  { value: 'residential', label: 'Residential Home', icon: <Home className="w-4 h-4" />, tariff: 6.5 },
  { value: 'commercial', label: 'Commercial Office', icon: <Building2 className="w-4 h-4" />, tariff: 8.2 },
  { value: 'industrial', label: 'Industrial Factory', icon: <Factory className="w-4 h-4" />, tariff: 7.8 },
  { value: 'agriculture', label: 'Agriculture / Farm', icon: <Tractor className="w-4 h-4" />, tariff: 4.5 },
];

const STATES = [
  { value: 'bihar', label: 'Bihar', sun: 5.2 },
  { value: 'up', label: 'Uttar Pradesh', sun: 5.0 },
  { value: 'rajasthan', label: 'Rajasthan', sun: 6.0 },
  { value: 'mp', label: 'Madhya Pradesh', sun: 5.5 },
  { value: 'maharashtra', label: 'Maharashtra', sun: 5.3 },
  { value: 'other', label: 'Other State', sun: 5.0 },
];

function fmt(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${Math.round(n).toLocaleString('en-IN')}`;
}

function calcResults(bill: number, units: number, type: string, state: string, roofArea: number) {
  const pt = PROPERTY_TYPES.find(p => p.value === type) ?? PROPERTY_TYPES[0];
  const st = STATES.find(s => s.value === state) ?? STATES[0];
  const tariff = pt.tariff;
  const sunHours = st.sun;

  const monthlyUnits = units > 0 ? units : bill / tariff;
  const annualUnits = monthlyUnits * 12;

  // System sizing (kW) — based on annual units / (sun hours × 365 × 0.8 efficiency)
  const rawKw = annualUnits / (sunHours * 365 * 0.8);
  const systemKw = Math.max(1, Math.ceil(rawKw * 10) / 10);

  // Roof area check (10 sqft per 100W panel)
  const reqArea = systemKw * 100; // sqft
  const areaOk = roofArea === 0 || roofArea >= reqArea;

  // Cost (₹45–55k/kW depending on type)
  const costPerKw = type === 'residential' ? 50000 : type === 'commercial' ? 48000 : type === 'industrial' ? 45000 : 52000;
  const cost = systemKw * costPerKw;

  // Govt subsidy (PM Surya Ghar — residential only)
  let subsidy = 0;
  if (type === 'residential') {
    if (systemKw <= 2) subsidy = systemKw * 30000;
    else subsidy = Math.min(78000, 60000 + (systemKw - 2) * 18000);
  }

  const netCost = cost - subsidy;
  const annualSavings = monthlyUnits * 12 * tariff * 0.90; // 90% offset
  const monthlySavings = annualSavings / 12;
  const payback = netCost / annualSavings;
  const co2PerYear = Math.round(systemKw * 1400); // kg
  const lifetimeProfit = annualSavings * 25 - netCost;
  const roi25yr = ((lifetimeProfit / netCost) * 100).toFixed(0);
  const annualGeneration = Math.round(systemKw * sunHours * 365 * 0.8);

  return {
    systemKw: Math.round(systemKw * 10) / 10,
    monthlyUnits: Math.round(monthlyUnits),
    annualUnits: Math.round(annualUnits),
    annualGeneration,
    cost, subsidy, netCost,
    annualSavings, monthlySavings,
    payback: Math.round(payback * 10) / 10,
    co2PerYear, lifetimeProfit,
    roi25yr, reqArea, areaOk,
    tariff, sunHours,
  };
}

// ── Progress Ring Component ────────────────────────────────────────────────────
function Ring({ pct, color, size = 80 }: { pct: number; color: string; size?: number }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (Math.min(pct, 100) / 100) * circ;
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#e5e7eb" strokeWidth={8} fill="none" />
      <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={8} fill="none"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{ transition: 'stroke-dasharray 1s ease' }} />
    </svg>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CalculatorPage() {
  const [bill, setBill] = useState('');
  const [units, setUnits] = useState('');
  const [type, setType] = useState('residential');
  const [state, setState] = useState('bihar');
  const [roofArea, setRoofArea] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calcResults> | null>(null);
  const [calculated, setCalculated] = useState(false);
  const [step, setStep] = useState(1); // 1=bill, 2=property, 3=location

  const canCalc = bill || units;

  const handleCalc = () => {
    if (!canCalc) return;
    const r = calcResults(
      parseFloat(bill) || 0,
      parseFloat(units) || 0,
      type, state,
      parseFloat(roofArea) || 0
    );
    setResult(r);
    setCalculated(true);
  };

  const handleReset = () => {
    setBill(''); setUnits(''); setType('residential');
    setState('bihar'); setRoofArea('');
    setResult(null); setCalculated(false); setStep(1);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0B1E3D] pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-400/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
        {/* Background solar image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1600&q=20')] bg-cover bg-center opacity-5" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-black uppercase tracking-widest mb-6">
            <Calculator className="w-3.5 h-3.5" /> Free Solar Calculator
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-5 leading-[1.05]">
            Solar Savings <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Calculator</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Enter your electricity bill and get an instant estimate of system size, savings, subsidy and payback period.
          </p>
          {/* Quick benefit pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {['State-wise Calculation', 'Subsidy Included', 'CO₂ Impact', '25-yr Projection'].map(b => (
              <span key={b} className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/70 text-xs font-semibold px-4 py-1.5 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-amber-400" />{b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calculator ────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ── Input Panel ─────────────────────────────────────────────── */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
            {/* Panel header */}
            <div className="bg-[#0B1E3D] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400/20 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-white">Your Details</h2>
                  <p className="text-[10px] text-white/40">Fill below for accurate results</p>
                </div>
              </div>
              {calculated && (
                <button onClick={handleReset} className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white font-bold transition-colors">
                  <RefreshCw className="w-3.5 h-3.5" />Reset
                </button>
              )}
            </div>

            <div className="p-6 space-y-5">
              {/* Bill */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                  Monthly Electricity Bill <span className="text-red-400">*</span>
                </label>
                <div className="flex items-center border-2 border-gray-100 focus-within:border-amber-400 rounded-xl overflow-hidden transition-all">
                  <span className="pl-4 text-gray-400 font-black text-lg">₹</span>
                  <input type="number" placeholder="e.g. 3000" value={bill} onChange={e => setBill(e.target.value)}
                    className="flex-1 px-3 py-3.5 text-gray-800 text-base font-semibold outline-none bg-transparent" />
                  <span className="pr-4 text-xs text-gray-400 font-bold">/ month</span>
                </div>
              </div>

              {/* Units */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                  Monthly Units <span className="text-gray-300 font-normal normal-case">(optional — overrides bill)</span>
                </label>
                <div className="flex items-center border-2 border-gray-100 focus-within:border-amber-400 rounded-xl overflow-hidden transition-all">
                  <Zap className="w-4 h-4 text-gray-300 ml-4 shrink-0" />
                  <input type="number" placeholder="e.g. 450" value={units} onChange={e => setUnits(e.target.value)}
                    className="flex-1 px-3 py-3.5 text-gray-800 text-base font-semibold outline-none bg-transparent" />
                  <span className="pr-4 text-xs text-gray-400 font-bold">kWh</span>
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">Property Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {PROPERTY_TYPES.map(p => (
                    <button key={p.value} onClick={() => setType(p.value)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-black transition-all border text-left ${
                        type === p.value ? 'bg-[#0B1E3D] border-[#0B1E3D] text-white shadow-md' : 'bg-white border-gray-200 text-gray-500 hover:border-amber-400'
                      }`}>
                      {p.icon}{p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* State */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">State / Location</label>
                <select value={state} onChange={e => setState(e.target.value)}
                  className="w-full border-2 border-gray-100 focus:border-amber-400 rounded-xl px-4 py-3.5 text-sm font-semibold text-gray-700 outline-none bg-white appearance-none transition-all">
                  {STATES.map(s => <option key={s.value} value={s.value}>{s.label} ({s.sun} sun hrs/day)</option>)}
                </select>
              </div>

              {/* Roof Area (optional) */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                  Available Roof Area <span className="text-gray-300 font-normal normal-case">(optional, sqft)</span>
                </label>
                <div className="flex items-center border-2 border-gray-100 focus-within:border-amber-400 rounded-xl overflow-hidden transition-all">
                  <input type="number" placeholder="e.g. 400" value={roofArea} onChange={e => setRoofArea(e.target.value)}
                    className="flex-1 px-4 py-3.5 text-gray-800 text-base font-semibold outline-none bg-transparent" />
                  <span className="pr-4 text-xs text-gray-400 font-bold">sq.ft</span>
                </div>
              </div>

              {/* Calculate Button */}
              <button onClick={handleCalc} disabled={!canCalc}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-110 text-[#0B1E3D] font-black py-4 rounded-xl transition-all shadow-lg shadow-amber-400/25 text-sm disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]">
                <Calculator className="w-5 h-5" /> Calculate My Solar Savings
              </button>

              <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                Estimates based on MNRE solar irradiation data. Actual savings depend on site conditions, shading and consumption patterns.
              </p>
            </div>
          </div>

          {/* ── Results Panel ───────────────────────────────────────────── */}
          {!calculated ? (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-14 text-center flex flex-col items-center justify-center gap-4 min-h-[400px]">
              <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center">
                <Calculator className="w-10 h-10 text-amber-200" />
              </div>
              <p className="text-gray-400 font-semibold text-sm max-w-xs leading-relaxed">
                Enter your monthly electricity bill and click Calculate to see your solar savings estimate
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {['System Size', 'Annual Savings', 'Payback Period', 'Govt Subsidy'].map(h => (
                  <span key={h} className="text-[10px] text-gray-300 border border-gray-200 px-3 py-1 rounded-full font-bold">{h}</span>
                ))}
              </div>
            </div>
          ) : result && (
            <div className="space-y-4">

              {/* System Recommendation Card */}
              <div className="bg-[#0B1E3D] rounded-3xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl" />
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">Recommended System</p>
                    <div className="flex items-end gap-2">
                      <span className="text-5xl font-black">{result.systemKw}</span>
                      <span className="text-xl text-gray-400 mb-1">kW Solar</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">~{result.annualGeneration.toLocaleString()} kWh/year generated</p>
                  </div>
                  {/* Ring indicator — savings % */}
                  <div className="relative shrink-0">
                    <Ring pct={Math.min(90, Math.round((result.annualSavings / (result.systemKw * result.tariff * result.annualGeneration)) * 100))} color="#F5A623" size={76} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-black text-white">90%</span>
                    </div>
                    <p className="text-[8px] text-center text-gray-400 mt-1 uppercase tracking-wider">Bill Offset</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-1">System Cost</p>
                    <p className="text-base font-black text-white">{fmt(result.cost)}</p>
                  </div>
                  <div className="bg-amber-400/10 border border-amber-400/20 rounded-xl p-3">
                    <p className="text-[9px] text-amber-400 uppercase tracking-wider mb-1">Govt Subsidy</p>
                    <p className="text-base font-black text-amber-400">-{fmt(result.subsidy)}</p>
                  </div>
                  <div className="bg-green-400/10 border border-green-400/20 rounded-xl p-3">
                    <p className="text-[9px] text-green-400 uppercase tracking-wider mb-1">Net Investment</p>
                    <p className="text-base font-black text-white">{fmt(result.netCost)}</p>
                  </div>
                </div>

                {/* Roof area warning */}
                {!result.areaOk && (
                  <div className="mt-3 bg-red-500/10 border border-red-400/20 rounded-xl px-4 py-2.5 text-xs text-red-300 font-semibold">
                    ⚠ System needs ~{result.reqArea} sqft. Consider a smaller system or ground mount.
                  </div>
                )}
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <IndianRupee className="w-5 h-5 text-green-500 mb-2" />
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Monthly Savings</p>
                  <p className="text-2xl font-black text-[#0B1E3D]">{fmt(result.monthlySavings)}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{fmt(result.annualSavings)} per year</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <Clock className="w-5 h-5 text-amber-500 mb-2" />
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Payback Period</p>
                  <p className="text-2xl font-black text-[#0B1E3D]">{result.payback} <span className="text-base text-gray-400">yrs</span></p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Return on investment</p>
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <Leaf className="w-5 h-5 text-emerald-500 mb-2" />
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">CO₂ Saved / Year</p>
                  <p className="text-2xl font-black text-[#0B1E3D]">{result.co2PerYear.toLocaleString()} <span className="text-base text-gray-400">kg</span></p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Environmental impact</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-5 shadow-sm">
                  <TrendingDown className="w-5 h-5 text-amber-500 mb-2" />
                  <p className="text-[10px] text-amber-600 uppercase tracking-wider font-bold">25-Year Profit</p>
                  <p className="text-2xl font-black text-amber-600">{fmt(result.lifetimeProfit)}</p>
                  <p className="text-[10px] text-amber-500 mt-0.5">{result.roi25yr}% ROI over 25 years</p>
                </div>
              </div>

              {/* Next Step CTA */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <Shield className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-black text-[#0B1E3D]">Your estimate is ready!</p>
                    <p className="text-xs text-gray-400 mt-0.5">Get a free site visit to confirm with accurate measurements.</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a href="tel:+917480018007" className="flex-1 flex items-center justify-center gap-2 bg-[#0B1E3D] hover:bg-[#112e57] text-white font-black text-xs py-3 rounded-xl transition-all">
                    <Phone className="w-4 h-4" /> Call for Free Visit
                  </a>
                  <Link href="/contact" className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:border-amber-400 text-gray-600 hover:text-amber-600 font-black text-xs py-3 rounded-xl transition-all">
                    Get Detailed Quote <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-gray-100 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1E3D]">How We Calculate</h2>
            <p className="text-sm text-gray-400 mt-2">Based on MNRE data and real Bihar & UP tariff rates</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '01', icon: <Zap className="w-6 h-6 text-white" />, title: 'Analyze Your Consumption', desc: 'We use your monthly bill or unit consumption to estimate daily and annual energy needs.' },
              { step: '02', icon: <BarChart3 className="w-6 h-6 text-white" />, title: 'Size Your System', desc: 'Using state-specific solar irradiation data (peak sun hours), we calculate the optimal system size.' },
              { step: '03', icon: <TrendingDown className="w-6 h-6 text-white" />, title: 'Project Your Returns', desc: 'We apply current tariff rates, government subsidies, and 25-year panel life to project accurate savings.' },
            ].map(s => (
              <div key={s.step} className="text-center group">
                <div className="relative w-16 h-16 rounded-2xl bg-[#0B1E3D] flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:bg-amber-400 transition-colors">
                  {s.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-400 group-hover:bg-[#0B1E3D] text-[#0B1E3D] group-hover:text-white font-black text-[10px] flex items-center justify-center transition-colors">{s.step}</span>
                </div>
                <h3 className="text-base font-black text-[#0B1E3D] mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Assumptions ──────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-[#0B1E3D]/5 border border-[#0B1E3D]/10 rounded-2xl p-6">
          <h3 className="text-sm font-black text-[#0B1E3D] mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-500" /> Calculator Assumptions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'System efficiency: 80% (PR ratio)',
              'Panel degradation: 0.7%/year (industry standard)',
              'Residential tariff: ₹6.50/kWh (Bihar average)',
              'Commercial tariff: ₹8.20/kWh',
              'Industrial tariff: ₹7.80/kWh',
              'System cost: ₹45,000–52,000/kW installed',
              'Subsidy: PM Surya Ghar (residential only)',
              'CO₂ factor: 0.82 kg/kWh (CEA grid emission)',
            ].map(a => (
              <div key={a} className="flex items-center gap-2 text-xs text-gray-500">
                <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />{a}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="relative bg-[#0B1E3D] rounded-3xl p-10 sm:p-14 overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl" />
          <Sun className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Ready to Go Solar?</h2>
          <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Get a free site assessment, accurate savings projection, and subsidy assistance — all at no cost.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+917480018007" className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#0B1E3D] font-black text-sm px-8 py-4 rounded-xl transition-all shadow-lg">
              <Phone className="w-4 h-4" /> Call +91 74800 18007
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-black text-sm px-8 py-4 rounded-xl transition-all">
              Free Site Assessment <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

