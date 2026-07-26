import React, { useState } from 'react';
import { MapPin, CheckCircle, ArrowRight, X } from 'lucide-react';

interface EventCardProps {
  day: string;
  month: string;
  year: string;
  title: string;
  location: string;
  desc: string;
}

export function EventCard({ day, month, year, title, location, desc }: EventCardProps) {
  const [registered, setRegistered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return alert('Name and Mobile Number are required.');
    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          message: `Registered for event: ${title} (${day} ${month} ${year})`,
          type: 'EVENT_REGISTRATION'
        })
      });
      const data = await res.json();
      if (data.success) {
        setRegistered(true);
        setShowModal(false);
        alert('Successfully registered for the event!');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error, please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="relative flex bg-gradient-to-br from-[#0B1120] via-[#0f1d35] to-[#0B1120] rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 group shadow-xl hover:shadow-primary/20 hover:shadow-2xl">
        
        {/* Glowing background blob */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500 -translate-y-1/2 translate-x-1/2" />

        {/* Date Column — Glassmorphism box */}
        <div className="relative w-20 shrink-0 flex flex-col items-center justify-center p-3 border-r border-white/10">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-3xl font-black text-primary leading-none">{day}</span>
            <span className="text-[11px] font-black text-white/80 uppercase tracking-widest mt-0.5">{month}</span>
            <span className="text-[9px] font-bold text-white/40 mt-1 bg-white/10 px-1.5 py-0.5 rounded-full">{year}</span>
          </div>
        </div>
        
        {/* Content Column */}
        <div className="p-4 flex-grow flex flex-col justify-center relative z-10">
          <h3 className="font-black text-white text-[15px] mb-1 group-hover:text-primary transition-colors leading-tight">
            {title}
          </h3>
          <p className="text-[11px] font-bold text-primary/80 flex items-center gap-1.5 mb-2 uppercase tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-primary" /> {location}
          </p>
          <p className="text-xs text-white/50 mb-3 line-clamp-2">
            {desc}
          </p>
          
          <div className="mt-auto">
            {registered ? (
              <button disabled className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold py-1.5 px-4 text-xs rounded-full flex items-center gap-1.5 w-max backdrop-blur-sm">
                <CheckCircle className="w-3.5 h-3.5" /> Registered!
              </button>
            ) : (
              <button 
                onClick={() => setShowModal(true)}
                className="bg-primary/10 border border-primary/30 hover:bg-primary hover:border-primary text-primary hover:text-[#0B1120] font-bold py-1.5 px-4 text-xs rounded-full transition-all duration-300 w-max flex items-center gap-1 group/btn backdrop-blur-sm"
              >
                Register Now
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Registration Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f1d35] border border-white/10 rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-lg font-black text-white mb-1">Register for Event</h3>
            <p className="text-xs text-primary font-bold mb-4">{title}</p>
            
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
              
              <button 
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:brightness-110 disabled:opacity-50 text-[#0A192F] font-black py-3 rounded-xl shadow-lg shadow-primary/20 transition-all text-sm mt-2"
              >
                {submitting ? 'Submitting Registration...' : 'Confirm Registration'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
