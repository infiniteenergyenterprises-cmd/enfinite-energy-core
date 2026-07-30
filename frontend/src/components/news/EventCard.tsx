import React, { useState } from 'react';
import { MapPin, CheckCircle, ArrowRight, X } from 'lucide-react';

interface EventCardProps {
  day: string;
  month: string;
  year: string;
  title: string;
  location: string;
  desc: string;
  image?: string;
  time?: string;
}

export function EventCard({ day, month, year, title, location, desc, image, time = "10:00 AM - 4:00 PM" }: EventCardProps) {
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
        // Instead of alert and closing, we will let the UI show the success state.
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
      <div className="relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-primary/50 transition-all duration-300 group shadow-lg hover:shadow-xl hover:shadow-primary/10 h-full">
        
        {/* Top Image Section */}
        <div className="relative h-48 overflow-hidden bg-slate-900">
          <img 
            src={image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"} 
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          {/* Floating Date Badge */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 flex flex-col items-center justify-center shadow-lg border border-white/20">
            <span className="text-2xl font-black text-primary leading-none">{day}</span>
            <span className="text-xs font-black text-slate-800 uppercase tracking-widest mt-0.5">{month}</span>
          </div>
        </div>
        
        {/* Content Column */}
        <div className="p-5 flex-grow flex flex-col relative z-10">
          <div className="flex flex-wrap gap-3 mb-3">
            <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md">
              {year}
            </span>
            <span className="bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md flex items-center gap-1">
               🕒 {time}
            </span>
          </div>

          <h3 className="font-black text-gray-900 text-xl mb-2 group-hover:text-primary transition-colors leading-tight">
            {title}
          </h3>
          
          <p className="text-xs font-bold text-gray-500 flex items-center gap-1.5 mb-3 uppercase tracking-wide">
            <MapPin className="w-4 h-4 text-primary" /> {location}
          </p>
          
          <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
            {desc}
          </p>
          
          <div className="mt-auto pt-4 border-t border-gray-100">
            {registered ? (
              <button disabled className="w-full bg-emerald-50 text-emerald-600 border border-emerald-200 font-bold py-3 px-4 text-sm rounded-xl flex justify-center items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Registered Successfully!
              </button>
            ) : (
              <button 
                onClick={() => setShowModal(true)}
                className="w-full bg-primary/10 border border-primary/30 hover:bg-primary hover:border-primary text-primary hover:text-[#0A192F] font-bold py-3 px-4 text-sm rounded-xl transition-all duration-300 flex justify-center items-center gap-2 group/btn"
              >
                Register for Event
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
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
            
            {registered ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-black text-white mb-2">Registration Successful!</h3>
                <p className="text-sm text-white/60 mb-6">
                  Thank you for registering for <strong>{title}</strong>. We've sent a confirmation email to you with the details.
                </p>
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 rounded-xl transition-all text-sm"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <>
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
                    className="w-full bg-primary hover:brightness-110 disabled:opacity-50 text-[#0A192F] font-black py-3 rounded-xl shadow-lg shadow-primary/20 transition-all text-sm mt-2 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#0A192F]/30 border-t-[#0A192F] rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : 'Confirm Registration'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
