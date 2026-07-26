'use client';

import React, { useState, useEffect } from 'react';
import { X, MapPin, Bell, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export function SubscriptionPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [contact, setContact] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'requesting' | 'allowed' | 'denied'>('idle');
  const [detectedState, setDetectedState] = useState('');

  useEffect(() => {
    // Show popup after 2.5 seconds on first-time visits
    const visited = localStorage.getItem('solar_smile_visited');
    if (!visited) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('solar_smile_visited', 'true');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return;
    setIsSubscribed(true);
    // Auto-close after 2 seconds
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('denied');
      return;
    }

    setLocationStatus('requesting');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setLocationStatus('allowed');
        // Reverse geocode using a free API (bigdatacloud / openstreetmap)
        try {
          const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`);
          const data = await res.json();
          const stateName = data.principalSubdivision || 'Bihar / UP';
          setDetectedState(stateName);
          localStorage.setItem('solar_detected_state', stateName);
          localStorage.setItem('solar_latitude', String(position.coords.latitude));
          localStorage.setItem('solar_longitude', String(position.coords.longitude));
        } catch (err) {
          setDetectedState('Bihar / UP');
        }
      },
      () => {
        setLocationStatus('denied');
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1E3D]/80 backdrop-blur-md transition-opacity duration-300">
      <div className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden transition-all transform scale-100 mx-2 sm:mx-0">
        
        {/* Accent Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#F5A623] via-yellow-400 to-[#F5A623]" />
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-[#F5A623] mb-3 sm:mb-4">
          <Bell className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
        </div>

        {/* Content */}
        <div className="mb-4 sm:mb-6">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#F5A623]">Limited Time Subsidy Update</span>
          <h3 className="text-lg sm:text-xl md:text-2xl font-black text-[#0B1E3D] leading-tight mt-1">
            Get Up To 40% Govt. Subsidy On Solar!
          </h3>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-2 leading-relaxed">
            Subscribe to our weekly solar discount alerts, and allow location to instantly see subsidies active in your district (e.g., Bihar, UP, or Delhi NCR).
          </p>
        </div>

        {/* Location Request Panel */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-5 flex items-start gap-3">
          <div className="p-2 sm:p-2.5 bg-white border border-gray-100 rounded-lg sm:rounded-xl shrink-0">
            <MapPin className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${locationStatus === 'allowed' ? 'text-emerald-500' : 'text-red-500'}`} />
          </div>
          <div className="min-w-0 flex-grow">
            <h4 className="text-[10px] sm:text-xs font-black text-gray-900 uppercase tracking-wider">Subsidy Location Tracker</h4>
            <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5 leading-snug">
              {locationStatus === 'idle' && 'Allow location access to check local state incentives.'}
              {locationStatus === 'requesting' && 'Accessing secure GPS satellites...'}
              {locationStatus === 'allowed' && `Location Verified! Subsidies customized for: ${detectedState || 'Bihar / UP'}`}
              {locationStatus === 'denied' && 'Access denied. You can select your state manually.'}
            </p>
            {locationStatus !== 'allowed' && locationStatus !== 'denied' && (
              <button 
                onClick={requestLocation}
                disabled={locationStatus === 'requesting'}
                className="mt-2 bg-[#0B1E3D] hover:bg-[#1a3260] text-white text-[9px] sm:text-[10px] font-black px-3.5 py-1.5 rounded-lg transition-all uppercase tracking-wider disabled:opacity-50"
              >
                {locationStatus === 'requesting' ? 'Requesting...' : 'Detect Location'}
              </button>
            )}
          </div>
        </div>

        {/* Subscription Form */}
        {isSubscribed ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 text-center flex items-center justify-center gap-2">
            <Check className="w-5 h-5" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider">Subscription Successful!</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-3">
            <div>
              <label className="block text-[8px] sm:text-[9px] uppercase font-black text-gray-500 mb-1">Enter Mobile or Email Address</label>
              <div className="relative">
                <input 
                  required
                  type="text" 
                  placeholder="Mobile number or email" 
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full bg-white border border-gray-200 focus:border-[#F5A623] focus:outline-none rounded-xl pl-3.5 pr-12 py-2.5 sm:py-3 text-xs text-gray-900 font-semibold shadow-sm"
                />
                <button 
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#F5A623] hover:brightness-110 text-[#0B1E3D] px-3.5 rounded-lg flex items-center justify-center transition-all"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 text-[9px] text-gray-400 mt-2 justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>We never share your information. Unsubscribe anytime.</span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
