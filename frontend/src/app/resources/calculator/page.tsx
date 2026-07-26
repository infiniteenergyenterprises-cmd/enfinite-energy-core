'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowRight, CheckCircle2, Home, Building2, Zap, Shield } from 'lucide-react';

export default function CalculatorPage() {
  const [bill, setBill] = useState(5000);
  const [propertyType, setPropertyType] = useState('residential');
  
  const multiplier = propertyType === 'commercial' ? 0.85 : 0.8;
  const annualSavings = (bill * 12 * multiplier).toLocaleString('en-IN');
  const systemSize = Math.max(1, Math.round(bill / 1200));
  const sliderPercentage = ((bill - 1000) / (50000 - 1000)) * 100;

  return (
    <div className="bg-[#FAFBFD] min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Custom styles for slider thumb */}
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

      <div className="text-center mb-8">
        <span className="text-xs font-black uppercase text-[#F5A623] tracking-widest">Savings Estimator</span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0B1E3D] mt-1">Solar Calculator</h1>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col md:flex-row">
        
        {/* Left Input */}
        <div className="p-6 sm:p-8 md:w-1/2 flex flex-col">
          <h3 className="text-lg font-bold text-[#0B1E3D] mb-6 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#0B1E3D]/5 flex items-center justify-center text-xs">1</span>
            Calculate Monthly Usage
          </h3>
          
          <div className="mb-8">
            <div className="flex justify-between items-end mb-4">
              <label className="text-xs font-bold text-gray-500 uppercase">Monthly Bill</label>
              <div className="text-2xl font-black text-[#0B1E3D]">
                <span className="text-[#F5A623] text-lg mr-0.5">₹</span>
                {bill.toLocaleString('en-IN')}
              </div>
            </div>
            
            <input 
              type="range" 
              min="1000" 
              max="50000" 
              step="500" 
              value={bill} 
              onChange={(e) => setBill(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer custom-slider bg-gray-200"
              style={{
                background: `linear-gradient(to right, #F59E0B ${sliderPercentage}%, #E5E7EB ${sliderPercentage}%)`
              }}
            />
            
            <div className="flex justify-between mt-2 text-[9px] text-gray-400 font-bold uppercase">
              <span>₹1,000</span>
              <span>₹50,000+</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-3">Property Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setPropertyType('residential')}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  propertyType === 'residential'
                    ? 'border-[#F5A623] bg-amber-50/40 text-[#F5A623]'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
              >
                <Home className="w-4 h-4" /> Residential
              </button>
              <button 
                onClick={() => setPropertyType('commercial')}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  propertyType === 'commercial'
                    ? 'border-[#F5A623] bg-amber-50/40 text-[#F5A623]'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
              >
                <Building2 className="w-4 h-4" /> Commercial
              </button>
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="p-6 sm:p-8 md:w-1/2 bg-[#0B1E3D] text-white flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs">2</span>
              Estimated Benefits
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Annual Electricity Savings</div>
                <div className="text-3xl font-black text-[#F5A623] mt-0.5">₹{annualSavings}*</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider font-semibold">Recommended size</div>
                  <div className="text-lg font-bold mt-0.5">{systemSize} kW</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider font-semibold">Payback Period</div>
                  <div className="text-lg font-bold mt-0.5">3.5 - 4 Years</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-[10px] text-gray-400 leading-relaxed mb-4">*Savings calculations are estimates based on standard regional solar tariffs.</p>
            <Button className="w-full bg-[#F5A623] hover:brightness-110 text-[#0B1E3D] font-black uppercase text-xs tracking-wider py-4 rounded-xl flex items-center justify-center gap-2">
              Claim Subsidy Now <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
