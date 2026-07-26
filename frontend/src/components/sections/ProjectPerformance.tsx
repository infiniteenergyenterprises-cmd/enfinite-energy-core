"use client";
import React, { useState } from 'react';
import { Sun, Calendar, Zap, CloudRain, TrendingUp, CheckCircle, FileText, Download } from 'lucide-react';

const projectData: Record<string, any> = {
  'Surya Nagar Plant': {
    todayGen: '2.45 MWh',
    monthGen: '65.73 MWh',
    totalGen: '215.40 MWh',
    co2Saved: '18.4 Tonnes',
    moneySaved: '₹ 15.75 Lakhs',
    status: 'Healthy',
    docs: [
      { name: "Site Survey Report", type: "PDF" },
      { name: "System Design", type: "PDF" },
      { name: "Installation Photos", type: "ZIP" },
      { name: "Electrical Drawing", type: "PDF" },
      { name: "Completion Certificate", type: "PDF" },
      { name: "Warranty Certificate", type: "PDF" }
    ]
  },
  'Green Valley Solar': {
    todayGen: '5.10 MWh',
    monthGen: '142.5 MWh',
    totalGen: '850.2 MWh',
    co2Saved: '42.1 Tonnes',
    moneySaved: '₹ 35.20 Lakhs',
    status: 'Healthy',
    docs: [
      { name: "Site Survey Report", type: "PDF" },
      { name: "System Design", type: "PDF" },
      { name: "Installation Photos", type: "ZIP" },
      { name: "Grid Connection Auth", type: "PDF" }
    ]
  }
};

export const ProjectPerformance = () => {
  const [selectedProject, setSelectedProject] = useState('Surya Nagar Plant');
  
  const currentData = projectData[selectedProject];

  const handleDocDownload = (docName: string, docType: string) => {
    // Professional download simulation using a Blob
    const content = `Mock content for ${docName}\nThis is a template file for demonstration purposes.`;
    const mimeType = docType === 'PDF' ? 'application/pdf' : 'application/zip';
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docName.replace(/\s+/g, '_')}.${docType.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  const handleDownloadAll = () => {
    // Professional download simulation for bulk download
    const content = `Mock content for All Documents Archive\nThis is a template file.`;
    const blob = new Blob([content], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedProject.replace(/\s+/g, '_')}_All_Documents.zip`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto text-gray-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Panel: Project Performance (Live) */}
        <div className="bg-[#0B1120] rounded-2xl border border-white/5 p-6 shadow-2xl flex flex-col h-full relative overflow-hidden">
          
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[22px] font-bold text-white">Project Performance (Live)</h3>
            <div className="relative">
              <select 
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="appearance-none bg-[#0A192F] border border-white/10 text-sm text-gray-300 rounded-md py-1.5 pl-3 pr-8 focus:outline-none focus:border-amber-500/50 cursor-pointer"
              >
                <option value="Surya Nagar Plant">Surya Nagar Plant</option>
                <option value="Green Valley Solar">Green Valley Solar</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 flex-grow">
            {/* Stats List */}
            <div className="flex flex-col gap-4 min-w-[220px]">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-400 text-[13px]">
                  <Sun className="w-4 h-4 text-orange-400" />
                  <span>Today's Gen.</span>
                </div>
                <span className="font-bold text-amber-500 text-[13px]">{currentData.todayGen}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-400 text-[13px]">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>This Month</span>
                </div>
                <span className="font-bold text-amber-500 text-[13px]">{currentData.monthGen}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-400 text-[13px]">
                  <Zap className="w-4 h-4 text-orange-500" />
                  <span>Total Gen.</span>
                </div>
                <span className="font-bold text-amber-500 text-[13px]">{currentData.totalGen}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-400 text-[13px]">
                  <CloudRain className="w-4 h-4 text-amber-400" />
                  <span>CO2 Saved</span>
                </div>
                <span className="font-bold text-white text-[13px]">{currentData.co2Saved}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-400 text-[13px]">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <span>Money Saved</span>
                </div>
                <span className="font-bold text-white text-[13px]">{currentData.moneySaved}</span>
              </div>
              <div className="w-full h-px bg-white/10 my-1"></div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-gray-400 text-[13px]">
                  <CheckCircle className="w-4 h-4" />
                  <span>System Status</span>
                </div>
                <span className="font-bold text-amber-400 text-[13px] flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_5px_rgba(245,158,11,0.8)]"></div> {currentData.status}
                </span>
              </div>
            </div>

            {/* Bar Chart Mockup */}
            <div className="flex-grow flex items-end gap-2 relative h-[180px] md:h-auto pl-4 border-l border-white/10 mt-4 md:mt-0">
               <span className="absolute left-1 top-0 text-[10px] text-gray-400 font-medium">MWh</span>
               
               {/* Bars */}
               <div className="w-full flex justify-between items-end h-full pt-8 gap-1.5 sm:gap-2">
                 <div className="w-full relative flex flex-col justify-end h-full group cursor-pointer hover:opacity-80 transition-opacity" onClick={() => alert('View detailed stats for 22 May')}>
                   <div className="bg-amber-500/60 w-full rounded-sm transition-all h-[30%] border-t border-amber-400 group-hover:bg-amber-500"></div>
                 </div>
                 <div className="w-full relative flex flex-col justify-end h-full group cursor-pointer hover:opacity-80 transition-opacity" onClick={() => alert('View detailed stats for 23 May')}>
                   <div className="bg-amber-500/80 w-full rounded-sm transition-all h-[55%] border-t border-amber-400 group-hover:bg-amber-500"></div>
                   <span className="text-[9px] text-gray-400 mt-2 text-center absolute -bottom-5 w-full">22 May</span>
                 </div>
                 <div className="w-full relative flex flex-col justify-end h-full group cursor-pointer hover:opacity-80 transition-opacity" onClick={() => alert('View detailed stats for 24 May')}>
                   <div className="bg-amber-400 w-full rounded-sm transition-all h-[75%] border-t border-amber-300 group-hover:bg-amber-300"></div>
                 </div>
                 <div className="w-full relative flex flex-col justify-end h-full group cursor-pointer hover:opacity-80 transition-opacity" onClick={() => alert('View detailed stats for 25 May')}>
                   <div className="bg-amber-500/80 w-full rounded-sm transition-all h-[45%] border-t border-amber-400 group-hover:bg-amber-500"></div>
                   <span className="text-[9px] text-gray-400 mt-2 text-center absolute -bottom-5 w-full">25 May</span>
                 </div>
                 <div className="w-full relative flex flex-col justify-end h-full group cursor-pointer hover:opacity-80 transition-opacity" onClick={() => alert('View detailed stats for 26 May')}>
                   <div className="bg-amber-400 w-full rounded-sm transition-all h-[95%] border-t border-amber-300 group-hover:bg-amber-300"></div>
                 </div>
                 <div className="w-full relative flex flex-col justify-end h-full group cursor-pointer hover:opacity-80 transition-opacity" onClick={() => alert('View detailed stats for 27 May')}>
                   <div className="bg-amber-500/80 w-full rounded-sm transition-all h-[65%] border-t border-amber-400 group-hover:bg-amber-500"></div>
                   <span className="text-[9px] text-gray-400 mt-2 text-center absolute -bottom-5 w-full">28 May</span>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Project Documents */}
        <div className="bg-[#0B1120] rounded-2xl border border-white/5 p-6 shadow-2xl flex flex-col h-full">
          <h3 className="text-[22px] font-bold text-white mb-6">Project Documents</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
            {currentData.docs.map((doc: any, idx: number) => (
              <div key={idx} onClick={() => handleDocDownload(doc.name, doc.type)} className="border border-white/10 rounded-xl p-3.5 flex items-center gap-3.5 hover:border-amber-500/40 hover:bg-white/5 transition-all cursor-pointer bg-[#0A192F]">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-amber-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white leading-tight">{doc.name}</span>
                  <span className="text-[10px] font-medium text-gray-400 mt-0.5">{doc.type}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-start">
            <button onClick={handleDownloadAll} className="flex items-center gap-2 border border-white/20 hover:border-amber-500 hover:text-amber-400 text-sm font-bold text-white bg-[#0A192F] px-5 py-2.5 rounded-lg transition-colors shadow-sm">
              Download All Documents <Download className="w-4 h-4 ml-1 text-amber-500" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
