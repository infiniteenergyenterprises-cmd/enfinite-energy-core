'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Search, MapPin, Briefcase, Clock, ChevronRight, X, Upload,
  Heart, Zap, Coffee, TrendingUp, Users, Star, Shield, CheckCircle2,
  Building2, Laptop, Sprout, Award, ArrowRight, Phone, Mail, Filter,
  BookOpen, Globe, GraduationCap, Handshake, HeartPulse, Calendar,
  Gift, Trophy, HardHat, Smile, Lightbulb
} from 'lucide-react';

interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  experience?: string;
  salary?: string;
  createdAt?: string;
}

const STATIC_JOBS: Career[] = [
  { id: '1', title: 'Senior Solar Project Engineer', department: 'Engineering', location: 'Gurugram, Haryana', type: 'Full Time', description: 'Lead end-to-end design and execution of large-scale commercial rooftop solar projects. Manage teams, vendor coordination, and quality control.', experience: '3-6 Years', salary: '₹8-12 LPA', createdAt: '2 days ago' },
  { id: '2', title: 'Site Engineer (Solar)', department: 'Engineering', location: 'Noida, Uttar Pradesh', type: 'Full Time', description: 'Oversee solar installation at residential and commercial sites. Ensure safety compliance and on-time project delivery.', experience: '2-4 Years', salary: '₹4-6 LPA', createdAt: '3 days ago' },
  { id: '3', title: 'Business Development Manager', department: 'Sales', location: 'Mumbai, Maharashtra', type: 'Full Time', description: 'Drive B2B and B2C solar sales across Maharashtra. Build dealer network, negotiate contracts, and exceed revenue targets.', experience: '5-8 Years', salary: '₹10-18 LPA', createdAt: '1 week ago' },
  { id: '4', title: 'Marketing Executive', department: 'Marketing', location: 'Gurugram, Haryana', type: 'Full Time', description: 'Plan and execute digital and offline marketing campaigns for solar products. Manage social media, SEO, and lead generation.', experience: '1-3 Years', salary: '₹3-5 LPA', createdAt: '2 days ago' },
  { id: '5', title: 'Electrical Design Engineer', department: 'Engineering', location: 'Bengaluru, Karnataka', type: 'Full Time', description: 'Design single-line diagrams, load calculations, and complete electrical systems for solar installations. AutoCAD & PVSyst proficiency required.', experience: '3-5 Years', salary: '₹6-10 LPA', createdAt: '4 days ago' },
  { id: '6', title: 'HR Executive', department: 'Human Resources', location: 'Gurugram, Haryana', type: 'Full Time', description: 'Handle recruitment, employee engagement, payroll coordination, and compliance. Solar industry experience preferred.', experience: '2-4 Years', salary: '₹3-5 LPA', createdAt: '5 days ago' },
  { id: '7', title: 'Solar Sales Executive', department: 'Sales', location: 'Delhi NCR', type: 'Full Time', description: 'Generate leads, pitch solar solutions to homeowners and businesses, and close deals. Excellent communication skills needed.', experience: '1-3 Years', salary: '₹3-6 LPA + Incentives', createdAt: '1 day ago' },
  { id: '8', title: 'Operations Manager', department: 'Operations', location: 'Gurugram, Haryana', type: 'Full Time', description: 'Oversee supply chain, procurement, warehouse management, and logistics for solar projects across North India.', experience: '5-8 Years', salary: '₹8-14 LPA', createdAt: '3 days ago' },
  { id: '9', title: 'Solar Intern – Engineering', department: 'Internship', location: 'Gurugram, Haryana', type: 'Internship', description: 'Assist in solar system design, site surveys, and project documentation. Great opportunity for engineering students.', experience: '0-1 Years', salary: '₹10-15K/month', createdAt: '1 day ago' },
  { id: '10', title: 'Field Sales Executive – Solar', department: 'Sales', location: 'Bhabua, Bihar - 821109', type: 'Full Time', description: 'Generate leads and close solar rooftop sales in Bhabua & surrounding Vranshi area, Kaimur district. Knowledge of local market preferred.', experience: '1-3 Years', salary: '₹2.5-4 LPA + Incentives', createdAt: 'Just now' },
  { id: '11', title: 'Site Supervisor – Solar Installation', department: 'Engineering', location: 'Mohania, Bihar - 821101', type: 'Full Time', description: 'Supervise solar panel installation teams at residential and commercial sites in Mohania & Vranshi area of Kaimur district, Bihar.', experience: '2-4 Years', salary: '₹3-5 LPA', createdAt: 'Just now' },
  { id: '12', title: 'District Sales Manager – UP', department: 'Sales', location: 'Vranshi, Uttar Pradesh', type: 'Full Time', description: 'Lead solar sales operations across Vranshi and surrounding areas in Uttar Pradesh. Build local dealer network and drive residential solar adoption.', experience: '3-6 Years', salary: '₹5-8 LPA + Incentives', createdAt: 'Just now' },
  { id: '13', title: 'Solar Technician – Bihar', department: 'Operations', location: 'Bhabua, Bihar - 821109', type: 'Full Time', description: 'Install, maintain and troubleshoot solar systems across Kaimur district villages. ITI/Diploma in Electrical preferred. Local candidates preferred.', experience: '1-3 Years', salary: '₹2-3.5 LPA', createdAt: '1 day ago' },
];

const DEPARTMENTS = ['All Departments', 'Engineering', 'Sales', 'Marketing', 'Operations', 'Human Resources', 'Internship'];
const LOCATIONS = ['All Locations', 'Gurugram, Haryana', 'Noida, Uttar Pradesh', 'Mumbai, Maharashtra', 'Bengaluru, Karnataka', 'Delhi NCR', 'Bhabua, Bihar - 821109', 'Mohania, Bihar - 821101', 'Vranshi, Uttar Pradesh'];
const EXPERIENCES = ['All Experience', '0-1 Years', '1-3 Years', '2-4 Years', '3-6 Years', '5-8 Years'];

const deptBadge: Record<string, string> = {
  Engineering:      'bg-blue-100 text-blue-700 border border-blue-200',
  Sales:            'bg-emerald-100 text-emerald-700 border border-emerald-200',
  Marketing:        'bg-purple-100 text-purple-700 border border-purple-200',
  Operations:       'bg-amber-100 text-amber-700 border border-amber-200',
  'Human Resources':'bg-pink-100 text-pink-700 border border-pink-200',
  Internship:       'bg-cyan-100 text-cyan-700 border border-cyan-200',
};

export default function CareersPage() {
  const [jobs, setJobs]           = useState<Career[]>(STATIC_JOBS);
  const [loading, setLoading]     = useState(true);
  const [searchQ, setSearchQ]     = useState('');
  const [filterDept, setFilterDept] = useState('All Departments');
  const [filterLoc, setFilterLoc]   = useState('All Locations');
  const [filterExp, setFilterExp]   = useState('All Experience');
  const [activeTab, setActiveTab]   = useState('All Jobs');

  const [showApply, setShowApply]               = useState(false);
  const [showSubmitResume, setShowSubmitResume] = useState(false);
  const [selectedJob, setSelectedJob]           = useState<Career | null>(null);
  const [appName, setAppName]   = useState('');
  const [appEmail, setAppEmail] = useState('');
  const [appPhone, setAppPhone] = useState('');
  const [appResume, setAppResume] = useState('');
  const [appMsg, setAppMsg]     = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/careers')
      .then(r => r.json())
      .then(d => { if (d.success && d.careers?.length > 0) setJobs(d.careers); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openApply = (job: Career) => {
    setSelectedJob(job); setShowApply(true); setSubmitted(false);
    setAppName(''); setAppEmail(''); setAppPhone(''); setAppResume(''); setAppMsg('');
  };
  const openResume = () => {
    setShowSubmitResume(true); setSubmitted(false);
    setAppName(''); setAppEmail(''); setAppPhone(''); setAppResume(''); setAppMsg('');
  };
  const closeModal = () => { setShowApply(false); setShowSubmitResume(false); setSubmitted(false); };

  const submitForm = async (type: string) => {
    if (!appName.trim() || !appEmail.trim() || !appPhone.trim()) { 
      alert('Please fill Name, Email and Phone.'); 
      return; 
    }
    setSubmitting(true);
    try {
      if (type === 'apply') {
        await fetch('http://localhost:5000/api/careers/apply', {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            careerId: selectedJob?.id || '', 
            name: appName, 
            email: appEmail, 
            phone: appPhone, 
            resumeUrl: appResume || 'https://drive.google.com/sample-resume'
          })
        });
      }
      await fetch('http://localhost:5000/api/leads', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: appName, 
          email: appEmail, 
          phone: appPhone,
          message: type === 'apply' 
            ? `Job Application: For Role [${selectedJob?.title || 'General'}] under Dept [${selectedJob?.department || 'Operations'}] at Location [${selectedJob?.location || 'India'}]. Message: ${appMsg}` 
            : `Resume Submission - Message: ${appMsg}`,
          type: type === 'apply' ? 'JOB_APPLICATION' : 'RESUME_SUBMISSION'
        })
      });
      setSubmitted(true);
    } catch (err) { 
      console.error(err);
      alert('Network error. Please try again.'); 
    }
    finally { setSubmitting(false); }
  };

  /* Filter */
  const deptCounts: Record<string, number> = { 'All Jobs': jobs.length };
  jobs.forEach(j => { deptCounts[j.department] = (deptCounts[j.department] || 0) + 1; });
  const tabs = ['All Jobs', 'Engineering', 'Sales', 'Operations', 'Marketing', 'Internship'];

  const filtered = jobs.filter(j => {
    const q = searchQ.toLowerCase();
    return (
      (!q || j.title.toLowerCase().includes(q) || j.department.toLowerCase().includes(q) || j.location.toLowerCase().includes(q)) &&
      (filterDept === 'All Departments' || j.department === filterDept) &&
      (filterLoc  === 'All Locations'   || j.location   === filterLoc)  &&
      (filterExp  === 'All Experience'  || j.experience === filterExp)   &&
      (activeTab  === 'All Jobs'        || j.department === activeTab)
    );
  });

  const whyUs = [
    { icon: <TrendingUp className="w-5 h-5" />, title: 'Growth',   desc: 'Career growth & advancement',       color: 'text-orange-500 bg-orange-50 border-orange-100' },
    { icon: <BookOpen   className="w-5 h-5" />, title: 'Learning', desc: 'Continuous learning & development',  color: 'text-blue-500 bg-blue-50 border-blue-100' },
    { icon: <Globe      className="w-5 h-5" />, title: 'Impact',   desc: 'Make a positive environmental impact', color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
    { icon: <Users      className="w-5 h-5" />, title: 'Culture',  desc: 'Vibrant & inclusive work culture',   color: 'text-purple-500 bg-purple-50 border-purple-100' },
    { icon: <Star       className="w-5 h-5" />, title: 'Benefits', desc: 'Competitive salary & benefits',      color: 'text-amber-500 bg-amber-50 border-amber-100' },
    { icon: <Heart      className="w-5 h-5" />, title: 'Balance',  desc: 'Work-life balance that matters',     color: 'text-pink-500 bg-pink-50 border-pink-100' },
  ];

  const hiringSteps = [
    { num: 1, title: 'Apply Online',         desc: 'Submit your resume & application' },
    { num: 2, title: 'HR Screening',         desc: 'Initial call with our HR team' },
    { num: 3, title: 'Technical Interview',  desc: 'In-depth discussion with hiring manager' },
    { num: 4, title: 'Offer Letter',         desc: 'Receive and review your offer' },
    { num: 5, title: 'Onboarding',           desc: 'Welcome to the Enfinite Energy team!' },
  ];

  const benefits = [
    { icon: <HeartPulse className="w-6 h-6 text-pink-500" />, title: 'Health Insurance',       desc: 'Medical, dental & vision for family', color: 'bg-pink-50 border-pink-100 hover:shadow-pink-50' },
    { icon: <Calendar className="w-6 h-6 text-blue-500" />, title: 'Paid Time Off',           desc: '24 days PTO + 12 public holidays', color: 'bg-blue-50 border-blue-100 hover:shadow-blue-50' },
    { icon: <TrendingUp className="w-6 h-6 text-emerald-500" />, title: 'Performance Bonus',      desc: 'Annual bonus on performance', color: 'bg-emerald-50 border-emerald-100 hover:shadow-emerald-50' },
    { icon: <Laptop className="w-6 h-6 text-purple-500" />, title: 'Flexible Working',       desc: 'Hybrid work policy', color: 'bg-purple-50 border-purple-100 hover:shadow-purple-50' },
    { icon: <Building2 className="w-6 h-6 text-amber-500" />, title: 'PF & ESI',               desc: 'Full statutory benefits', color: 'bg-amber-50 border-amber-100 hover:shadow-amber-50' },
    { icon: <BookOpen className="w-6 h-6 text-cyan-500" />, title: 'Training & Certification', desc: 'Paid certifications & learning', color: 'bg-cyan-50 border-cyan-100 hover:shadow-cyan-50' },
    { icon: <Gift className="w-6 h-6 text-red-500" />, title: 'Festival Bonus',         desc: 'On all major Indian festivals', color: 'bg-red-50 border-red-100 hover:shadow-red-50' },
    { icon: <Users className="w-6 h-6 text-teal-500" />, title: 'Team Outings',           desc: 'Quarterly trips & celebrations', color: 'bg-teal-50 border-teal-100 hover:shadow-teal-50' },
  ];

  const programs = [
    { icon: <Handshake    className="w-5 h-5 text-orange-500" />, title: 'Referral Program',    desc: 'Refer a friend and earn exciting rewards' },
    { icon: <GraduationCap className="w-5 h-5 text-blue-500" />,  title: 'Campus Hiring',        desc: 'We hire young talent from top institutions' },
    { icon: <Laptop       className="w-5 h-5 text-emerald-500" />, title: 'Internship Program',  desc: 'Kickstart your career with real-world experience' },
    { icon: <Users        className="w-5 h-5 text-purple-500" />,  title: 'Diversity & Inclusion', desc: 'We celebrate diversity and promote equality' },
    { icon: <Sprout       className="w-5 h-5 text-green-500" />,   title: 'Sustainability Mission', desc: 'Work with purpose for a better tomorrow' },
  ];

  const inputCls = "w-full bg-white border border-gray-200 text-gray-800 text-sm rounded-lg px-3 py-2.5 outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623]/30 placeholder-gray-400 transition-colors";

  return (
    <div className="bg-white min-h-screen text-gray-900">

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section className="relative pt-28 pb-14 overflow-hidden bg-[#0B1E3D]">
        <div className="absolute inset-0 bg-[url('/19.png')] bg-cover bg-center opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3D] via-[#0B1E3D]/70 to-[#0B1E3D]/30" />
        <div className="absolute top-10 left-10 w-80 h-80 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-96 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#F5A623]/10 border border-[#F5A623]/30 text-[#F5A623] text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" />
                We Are Hiring — {jobs.length}+ Open Positions
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white mb-4">
                Build Your Future<br />
                with <span className="text-[#F5A623]">Enfinite Energy</span>
              </h1>
              <p className="text-sm md:text-base text-white/70 font-medium mb-8 max-w-xl leading-relaxed">
                Join our passionate team and be a part of India's clean energy revolution. We are building a greener, brighter tomorrow — together.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#openings">
                  <button className="bg-[#F5A623] text-[#0B1E3D] font-black px-6 py-3 rounded-xl hover:brightness-110 transition-all shadow-lg shadow-[#F5A623]/20 text-sm flex items-center gap-2">
                    View Open Positions <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
                <button onClick={openResume} className="border border-white/20 text-white hover:border-[#F5A623]/60 hover:text-[#F5A623] font-bold px-6 py-3 rounded-xl transition-all text-sm flex items-center gap-2">
                  <Upload className="w-4 h-4" /> Submit Your Resume
                </button>
              </div>
              {/* Stats */}
              <div className="mt-8 flex flex-wrap gap-6">
                {[{ val: '500+', label: 'Team Members' }, { val: `${jobs.length}+`, label: 'Open Roles' }, { val: '4.8★', label: 'Glassdoor Rating' }, { val: '8 Cities', label: 'Locations' }].map((s, i) => (
                  <div key={i}>
                    <p className="text-xl font-black text-[#F5A623]">{s.val}</p>
                    <p className="text-xs text-white/40 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Join mini grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {whyUs.map((w, i) => (
                <div key={i} className="backdrop-blur-md bg-black/45 border border-white/20 rounded-xl p-4 hover:bg-black/60 hover:border-[#F5A623]/60 transition-all group">
                  <div className="w-9 h-9 rounded-lg border border-white/20 bg-white/10 flex items-center justify-center text-[#F5A623] mb-3 group-hover:scale-110 transition-transform">
                    {w.icon}
                  </div>
                  <p className="text-sm font-black text-white mb-0.5">{w.title}</p>
                  <p className="text-[11px] text-white/70 leading-relaxed font-medium">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ SEARCH BAR ══════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-5">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Search Jobs</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Job title, keyword or skill"
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623]/20 placeholder-gray-400 transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Department</label>
              <select value={filterDept} onChange={e => setFilterDept(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-[#F5A623] bg-white cursor-pointer">
                {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Location</label>
              <select value={filterLoc} onChange={e => setFilterLoc(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-[#F5A623] bg-white cursor-pointer">
                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Experience</label>
              <select value={filterExp} onChange={e => setFilterExp(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-[#F5A623] bg-white cursor-pointer">
                {EXPERIENCES.map(ex => <option key={ex}>{ex}</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-[#F5A623] text-[#0B1E3D] font-black py-2.5 rounded-lg hover:brightness-110 transition-all text-sm shadow-md shadow-[#F5A623]/20 flex items-center justify-center gap-1.5">
                <Search className="w-3.5 h-3.5" /> Search Jobs
              </button>
              <button onClick={() => { setSearchQ(''); setFilterDept('All Departments'); setFilterLoc('All Locations'); setFilterExp('All Experience'); }}
                className="px-3 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-700 text-xs font-bold transition-all">
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ OPENINGS (FULL WIDTH) ══════════════════════ */}
      <section id="openings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black text-gray-900">Current Openings</h2>
          <span className="text-xs font-bold text-gray-400">{filtered.length} positions found</span>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-5">
          {tabs.map(dept => (
            <button key={dept} onClick={() => setActiveTab(dept)}
              className={`py-2 px-2 rounded-lg text-xs font-black transition-all border text-center w-full ${activeTab === dept ? 'bg-[#F5A623] text-[#0B1E3D] border-[#F5A623]' : 'bg-white border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-300'}`}>
              {dept} {deptCounts[dept] ? `(${deptCounts[dept]})` : ''}
            </button>
          ))}
        </div>

        {/* Job Cards — 2 column grid on large screens */}
        {loading ? (
          <div className="text-center py-16 text-gray-400">Loading positions...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">No positions match your filters.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filtered.map(job => {
              // Department specific glassmorphism colors
              let bgGlass = "bg-blue-50/30 border-blue-100 hover:shadow-blue-50";
              if (job.department === "Sales") bgGlass = "bg-emerald-50/30 border-emerald-100 hover:shadow-emerald-50";
              if (job.department === "Marketing") bgGlass = "bg-purple-50/30 border-purple-100 hover:shadow-purple-50";
              if (job.department === "Operations") bgGlass = "bg-amber-50/30 border-amber-100 hover:shadow-amber-50";
              if (job.department === "Human Resources") bgGlass = "bg-pink-50/30 border-pink-100 hover:shadow-pink-50";
              if (job.department === "Internship") bgGlass = "bg-cyan-50/30 border-cyan-100 hover:shadow-cyan-50";

              return (
                <div key={job.id} className={`backdrop-blur-sm border rounded-xl overflow-hidden hover:border-[#F5A623] hover:shadow-md transition-all duration-300 group flex flex-col justify-between ${bgGlass}`}>
                  <div>
                    {/* Top card header */}
                    <div className="bg-white/40 border-b border-black/5 px-3.5 py-2.5 flex items-center justify-between">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${deptBadge[job.department] || 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                        {job.department}
                      </span>
                      <span className="text-[9px] text-gray-400 font-semibold">{job.createdAt || 'Recently'}</span>
                    </div>

                    {/* Card Content */}
                    <div className="p-3.5 pb-2">
                      <h3 className="text-sm font-black text-gray-900 group-hover:text-[#F5A623] transition-colors mb-2 leading-snug">{job.title}</h3>
                      
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-gray-500 mb-2.5 bg-white/50 p-2 rounded-lg border border-black/5">
                        <span className="flex items-center gap-1 min-w-0 truncate"><MapPin className="w-3 h-3 text-gray-400 shrink-0" /> {job.location.split(',')[0]}</span>
                        <span className="flex items-center gap-1 min-w-0 truncate"><Briefcase className="w-3 h-3 text-gray-400 shrink-0" /> {job.type}</span>
                        {job.experience && <span className="flex items-center gap-1 min-w-0 truncate"><Clock className="w-3 h-3 text-gray-400 shrink-0" /> {job.experience}</span>}
                        {job.salary && <span className="text-emerald-600 font-bold min-w-0 truncate">💰 {job.salary}</span>}
                      </div>

                      <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-2">{job.description}</p>
                    </div>
                  </div>

                  {/* Bottom Card Action */}
                  <div className="px-3.5 pb-3.5 pt-2 border-t border-black/5 flex items-center justify-between gap-2 mt-auto">
                    <span className="text-[9px] bg-emerald-50/60 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-100">Actively Hiring</span>
                    <button onClick={() => openApply(job)}
                      className="bg-[#F5A623] text-[#0B1E3D] font-black text-[10px] px-3.5 py-1.5 rounded-lg hover:brightness-110 transition-all whitespace-nowrap shadow-sm shadow-[#F5A623]/10">
                      Apply Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-5 text-center">
          <button onClick={() => { setActiveTab('All Jobs'); setSearchQ(''); setFilterDept('All Departments'); setFilterLoc('All Locations'); setFilterExp('All Experience'); }}
            className="border border-gray-200 text-gray-500 hover:text-[#F5A623] hover:border-[#F5A623]/40 font-bold text-sm px-6 py-2.5 rounded-xl transition-all inline-flex items-center gap-2">
            View All Open Positions <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* ══════════════════════ WHY JOIN + HIRING PROCESS ══════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Why Join */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1E3D] to-[#1a3a6b] border border-white/10 rounded-2xl p-6 shadow-lg">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#F5A623]/15 border border-[#F5A623]/30 text-[#F5A623] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                <Star className="w-3 h-3" /> Why Join Us
              </div>
              <h3 className="text-lg font-black text-white mb-5">Why Join Enfinite Energy?</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {whyUs.map((w, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 hover:border-[#F5A623]/40 hover:bg-white/10 rounded-xl p-3 transition-all group cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-[#F5A623]/15 border border-[#F5A623]/20 flex items-center justify-center text-[#F5A623] mb-2 group-hover:scale-110 transition-transform">{w.icon}</div>
                    <p className="text-xs font-black text-white leading-snug">{w.title}</p>
                    <p className="text-[10px] text-white/50 leading-relaxed mt-0.5">{w.desc}</p>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="mt-5 pt-5 border-t border-white/10 grid grid-cols-4 gap-3 text-center">
                {[
                  { val: '500+', label: 'Employees', icon: <Users className="w-4 h-4" /> },
                  { val: '5+', label: 'Years Old', icon: <Trophy className="w-4 h-4" /> },
                  { val: '4.8★', label: 'Glassdoor', icon: <Star className="w-4 h-4" /> },
                  { val: '8 Cities', label: 'Locations', icon: <Globe className="w-4 h-4" /> },
                ].map((s, i) => (
                  <div key={i} className="bg-white/5 border border-white/8 rounded-xl p-2.5 hover:bg-white/10 hover:border-[#F5A623]/30 transition-all group cursor-default">
                    <div className="flex justify-center text-[#F5A623] mb-1 group-hover:scale-110 transition-transform">{s.icon}</div>
                    <p className="text-sm font-black text-white">{s.val}</p>
                    <p className="text-[9px] text-white/40 uppercase tracking-wider mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a href="#openings" className="mt-4 flex items-center justify-center gap-2 w-full bg-[#F5A623]/10 hover:bg-[#F5A623]/20 border border-[#F5A623]/25 hover:border-[#F5A623]/50 text-[#F5A623] font-black text-xs py-2.5 rounded-xl transition-all group">
                View Open Positions <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Hiring Process */}
          <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 shadow-lg">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#F5A623]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#d4870a] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                <CheckCircle2 className="w-3 h-3" /> Process
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-5">Our Hiring Process</h3>
              <div className="flex flex-col gap-3">
                {hiringSteps.map((s, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="relative flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-[#F5A623] text-[#0B1E3D] font-black text-sm flex items-center justify-center shrink-0 shadow-md shadow-[#F5A623]/30 group-hover:scale-110 transition-transform">{s.num}</div>
                      {i < hiringSteps.length - 1 && <div className="w-0.5 h-6 bg-gradient-to-b from-[#F5A623]/60 to-transparent mt-1" />}
                    </div>
                    <div className="pt-1.5">
                      <p className="text-sm font-black text-gray-800 leading-snug">{s.title}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ DON'T FIND A ROLE ══════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="relative bg-[#0B1E3D] border border-[#F5A623]/20 rounded-2xl p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-xs font-black text-[#F5A623] uppercase tracking-widest mb-1">Open Application</p>
              <h3 className="text-xl md:text-2xl font-black text-white mb-2">Don't Find the Right Role?</h3>
              <p className="text-sm text-white/50 max-w-lg">We are always looking for talented and passionate individuals. Submit your resume and we'll reach out to you when a suitable opportunity arises.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button onClick={openResume}
                className="bg-[#F5A623] text-[#0B1E3D] font-black px-6 py-3 rounded-xl hover:brightness-110 transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#F5A623]/20 whitespace-nowrap">
                <Upload className="w-4 h-4" /> Submit Your Resume
              </button>
              <Link href="/contact">
                <button className="border border-white/20 text-white hover:border-[#F5A623]/50 hover:text-[#F5A623] font-bold px-6 py-3 rounded-xl transition-all text-sm whitespace-nowrap">
                  Contact HR Team
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ LIFE + BENEFITS ══════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center mb-7">
          <h2 className="text-2xl font-black text-gray-900">Life &amp; Benefits</h2>
          <p className="text-sm text-gray-500 mt-1">We invest in our people — your growth, wellbeing, and happiness matter to us.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Life at IE */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1E3D] to-[#16304f] border border-white/10 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-52 h-52 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-lg font-black text-white mb-1">Life at Enfinite Energy</h3>
              <p className="text-xs text-white/50 mb-5">We empower our people, encourage innovation, and work together toward a sustainable future.</p>
              <div className="grid grid-cols-4 gap-3 mb-5">
                {[
                  { icon: <HardHat className="w-6 h-6 text-orange-400" />, bg: "bg-orange-400/10 border-orange-400/20", label: "Safe Sites" },
                  { icon: <Smile className="w-6 h-6 text-blue-400" />, bg: "bg-blue-400/10 border-blue-400/20", label: "Happy Team" },
                  { icon: <Lightbulb className="w-6 h-6 text-[#F5A623]" />, bg: "bg-[#F5A623]/10 border-[#F5A623]/20", label: "Innovation" },
                  { icon: <Sprout className="w-6 h-6 text-emerald-400" />, bg: "bg-emerald-400/10 border-emerald-400/20", label: "Eco Impact" },
                ].map((item, i) => (
                  <div key={i} className={`rounded-xl aspect-square flex flex-col items-center justify-center border p-2 text-center transition-all hover:scale-105 ${item.bg}`}>
                    {item.icon}
                    <span className="text-[10px] font-bold text-white/70 mt-2">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[{ val: '500+', label: 'Team Members' }, { val: '4.8★', label: 'Glassdoor' }, { val: '5+', label: 'Years Strong' }].map((s, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <p className="text-lg font-black text-[#F5A623]">{s.val}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-wide">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-black text-gray-900 mb-1">Employee Benefits</h3>
            <p className="text-xs text-gray-500 mb-4">We take care of our people so they can do their best work.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {benefits.map((b, i) => (
                <div key={i} className={`border rounded-xl p-3 text-center transition-all hover:scale-105 group cursor-default shadow-sm ${b.color}`}>
                  <div className="flex justify-center mb-1.5 group-hover:scale-110 transition-transform">{b.icon}</div>
                  <p className="text-[11px] font-black text-gray-800 leading-snug">{b.title}</p>
                  <p className="text-[9px] text-gray-500 mt-0.5 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ PROGRAMS ══════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-gray-900">Our Programs</h2>
          <p className="text-sm text-gray-500 mt-1">Special initiatives designed to help you grow and thrive.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {programs.map((p, i) => (
            <div key={i} className="relative overflow-hidden bg-gradient-to-br from-[#0B1E3D] to-[#1a3260] border border-white/10 rounded-xl p-4 hover:border-[#F5A623]/60 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#F5A623]/10 transition-all group cursor-pointer shadow-md">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#F5A623]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#F5A623]/15 transition-all" />
              <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/15 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-[#F5A623]/20 group-hover:border-[#F5A623]/40 transition-all">{p.icon}</div>
              <p className="text-xs font-black text-white mb-1 group-hover:text-[#F5A623] transition-colors leading-snug">{p.title}</p>
              <p className="text-[10px] text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════ BOTTOM CTA ══════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="relative rounded-2xl overflow-hidden" style={{background: 'linear-gradient(135deg, #0B1E3D 0%, #1a3260 40%, #0d2440 70%, #0B1E3D 100%)'}}>
          {/* Decorative blobs */}
          <div className="absolute top-0 left-1/4 w-80 h-40 bg-[#F5A623]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-32 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px'}} />
          <div className="relative z-10 p-10 text-center">
            <div className="inline-flex items-center gap-2 bg-[#F5A623]/15 border border-[#F5A623]/30 text-[#F5A623] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" /> Join the Movement
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">Ready to Power<br /><span className="text-[#F5A623]">India's Future?</span></h2>
            <p className="text-white/50 text-sm mb-8 max-w-lg mx-auto leading-relaxed">Browse open positions and apply today. Our HR team will reach out within 48 hours to discuss your fit.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#openings">
                <button className="bg-[#F5A623] text-[#0B1E3D] font-black px-8 py-3.5 rounded-xl hover:brightness-110 transition-all shadow-xl shadow-[#F5A623]/25 text-sm flex items-center gap-2">
                  View All Jobs <ArrowRight className="w-4 h-4" />
                </button>
              </a>
              <Link href="/contact">
                <button className="border border-white/25 bg-white/5 backdrop-blur-sm text-white hover:border-[#F5A623]/60 hover:text-[#F5A623] hover:bg-white/10 font-bold px-8 py-3.5 rounded-xl transition-all text-sm flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Talk to HR
                </button>
              </Link>
            </div>
            {/* Trust signals */}
            <div className="flex flex-wrap gap-6 justify-center mt-8 text-white/30 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Response within 48 hours</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Equal opportunity employer</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 500+ happy employees</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ APPLY / RESUME MODAL ══════════════════════ */}
      {(showApply || showSubmitResume) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg p-7 relative shadow-2xl my-4">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">
                  {showSubmitResume ? 'Resume Submitted!' : 'Application Sent!'}
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Thank you <span className="text-[#d4870a] font-bold">{appName}</span>! Our HR team will review your profile and reach out within 48 hours.
                </p>
                <button onClick={closeModal} className="bg-[#F5A623] text-[#0B1E3D] font-black px-6 py-2.5 rounded-xl hover:brightness-110 transition-all text-sm">
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-black text-gray-900 mb-1">
                  {showSubmitResume ? 'Submit Your Resume' : 'Apply for Position'}
                </h3>
                {selectedJob && !showSubmitResume && (
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${deptBadge[selectedJob.department] || 'bg-gray-100 text-gray-600 border border-gray-200'}`}>{selectedJob.department}</span>
                    <span className="text-xs text-[#d4870a] font-bold">{selectedJob.title}</span>
                    <span className="text-[10px] text-gray-400">· {selectedJob.location}</span>
                  </div>
                )}
                {showSubmitResume && <p className="text-xs text-gray-500 mb-4">Share your details and we'll reach out when a suitable opportunity arises.</p>}

                <form onSubmit={e => { e.preventDefault(); submitForm(showSubmitResume ? 'resume' : 'apply'); }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name *</label>
                      <input type="text" required value={appName} onChange={e => setAppName(e.target.value)} placeholder="Your full name"
                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#F5A623] placeholder-gray-400 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Phone Number *</label>
                      <input type="tel" required value={appPhone} onChange={e => setAppPhone(e.target.value)} placeholder="Mobile number"
                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#F5A623] placeholder-gray-400 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Address *</label>
                    <input type="email" required value={appEmail} onChange={e => setAppEmail(e.target.value)} placeholder="your@email.com"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#F5A623] placeholder-gray-400 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Resume Link <span className="text-gray-400 normal-case font-medium">(Google Drive / LinkedIn)</span></label>
                    <input type="url" value={appResume} onChange={e => setAppResume(e.target.value)} placeholder="https://drive.google.com/your-resume"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#F5A623] placeholder-gray-400 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Cover Message</label>
                    <textarea rows={3} value={appMsg} onChange={e => setAppMsg(e.target.value)} placeholder="Tell us about yourself and why you want to join Enfinite Energy..."
                      className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#F5A623] placeholder-gray-400 transition-colors resize-none" />
                  </div>
                  <button type="submit" disabled={submitting}
                    className="w-full bg-[#F5A623] hover:brightness-110 disabled:opacity-50 text-[#0B1E3D] font-black py-3 rounded-xl shadow-lg shadow-[#F5A623]/20 transition-all text-sm flex items-center justify-center gap-2">
                    {submitting ? 'Submitting...' : <><CheckCircle2 className="w-4 h-4" /> {showSubmitResume ? 'Submit Resume' : 'Submit Application'}</>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
