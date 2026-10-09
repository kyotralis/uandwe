import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, ArrowRight, X, Upload, CheckCircle } from 'lucide-react';
import Paragraph from '../../components/Paragraph';

const RAW_JOBS = [
  {
    id: 1,
    title: "Lead Silicon Architect",
    location: "San Jose, CA",
    type: "Full-Time",
    category: "Hardware",
    desc: "Define the next generation of sub-3nm AI accelerators. Deep expertise in memory subsystems required."
  },
  {
    id: 2,
    title: "Principal AI Hardware Engineer",
    location: "Taipei, Taiwan",
    type: "Full-Time",
    category: "Hardware",
    desc: "Bridge the gap between machine learning models and physical silicon implementations."
  },
  {
    id: 3,
    title: "Senior Firmware Developer (Automotive)",
    location: "Bangalore, India",
    type: "Full-Time",
    category: "Embedded",
    desc: "Develop mission-critical, ASIL-D compliant RTOS firmware for advanced driver-assistance systems."
  },
  {
    id: 4,
    title: "Staff Cloud Infrastructure Engineer",
    location: "Remote (Global)",
    type: "Full-Time",
    category: "Software",
    desc: "Design massively scalable cloud-native architectures for our enterprise compute clusters."
  },
  {
    id: 5,
    title: "Director of Hardware Engineering",
    location: "San Jose, CA",
    type: "Full-Time",
    category: "Hardware",
    desc: "Lead a global team of 50+ engineers through complex tapeout cycles and physical design challenges."
  },
  {
    id: 6,
    title: "Embedded Linux Kernel Hacker",
    location: "Bangalore, India",
    type: "Full-Time",
    category: "Embedded",
    desc: "Port Linux to custom hardware platforms, develop kernel drivers, and optimize boot sequences."
  }
];

const CATEGORIES = ["All", "Hardware", "Embedded", "Software"];

export default function Jobs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const { t } = useTranslation();

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const filteredJobs = RAW_JOBS.filter(job => {
    const matchesCategory = activeCategory === "All" || job.category === activeCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen text-neutral-900 pt-32 pb-16 px-[4%] max-w-[1400px] mx-auto">
      
      {/* HERO */}
      <div className="w-full pb-16 border-b border-black/10">
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariant} className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-normal tracking-tight uppercase leading-tight text-neutral-900">
            Careers at UANDWE
          </h1>
        </motion.div>
        <Paragraph 
          className="text-sm lg:text-base xl:text-lg leading-relaxed text-neutral-500 font-normal mt-8 max-w-3xl"
          text="Join a global network of elite engineers building the absolute edge of hardware and software."
        />
      </div>

      {/* JOB BOARD */}
      <div className="w-full py-24 border-b border-black/10">
        
        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-neutral-900">Open Positions</h2>
          
          <div className="flex flex-col md:flex-row gap-6 w-full lg:w-auto">
            <div className="relative w-full md:w-64">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input 
                type="text" 
                placeholder="Search roles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-black/10 bg-neutral-50 py-3 pl-12 pr-4 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 border transition-colors ${activeCategory === cat ? 'bg-black text-white border-black' : 'bg-transparent text-neutral-600 border-black/10 hover:border-black'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Brutalist List */}
        <div className="flex flex-col border-t border-black/10">
          <AnimatePresence>
            {filteredJobs.map(job => (
              <motion.div 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={job.id} 
                onClick={() => setSelectedJob(job)}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-8 border-b border-black/10 hover:bg-neutral-50 transition-colors group cursor-pointer"
              >
                <div className="flex flex-col max-w-2xl">
                  <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-4">{job.category}</span>
                  <h3 className="text-2xl md:text-3xl font-normal text-neutral-900 mb-2">{job.title}</h3>
                  <p className="text-neutral-500 font-normal line-clamp-2 md:line-clamp-1">{job.desc}</p>
                </div>
                
                <div className="flex items-center gap-12 mt-8 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                  <div className="flex flex-col md:text-right">
                    <span className="text-neutral-900 font-normal">{job.location}</span>
                    <span className="text-neutral-500 font-normal text-sm">{job.type}</span>
                  </div>
                  <ArrowRight className="w-8 h-8 text-neutral-300 group-hover:text-black transition-transform group-hover:translate-x-2 shrink-0" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredJobs.length === 0 && (
            <div className="py-24 text-center">
              <h3 className="text-2xl font-normal text-neutral-900 mb-2">No roles found</h3>
              <p className="text-neutral-500 font-normal">Try adjusting your search or category filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* HOW WE HIRE */}
      <div className="w-full py-24 border-b border-black/10">
        <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-neutral-900 mb-16 text-center">The Hiring Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 border-t border-l border-black/10">
          {[
            { step: "01", title: "Application Review", desc: "Our engineering leaders personally review your portfolio and experience. No automated filters." },
            { step: "02", title: "Technical Deep Dive", desc: "A 60-minute technical discussion focusing on your past projects and architectural decisions." },
            { step: "03", title: "System Design", desc: "Collaborative whiteboarding session to solve a real-world UANDWE engineering challenge." },
            { step: "04", title: "The Offer", desc: "We move fast. If you're a fit, expect an offer within 48 hours of your final interview." }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-10 border-b border-r border-black/10 flex flex-col group hover:bg-black transition-colors duration-500"
            >
              <span className="text-[10px] font-bold tracking-widest text-neutral-400 mb-8 block group-hover:text-neutral-500 transition-colors">PHASE {item.step}</span>
              <h3 className="text-2xl font-normal text-neutral-900 tracking-tight mb-4 group-hover:text-white transition-colors duration-500">{item.title}</h3>
              <p className="text-neutral-500 font-normal text-sm leading-relaxed group-hover:text-neutral-400 transition-colors duration-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => { setSelectedJob(null); setApplySuccess(false); }}
              className="absolute inset-0 bg-white/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 20 }} 
              className="relative w-full max-w-2xl bg-white border border-black/10 p-8 md:p-12 max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <button 
                onClick={() => { setSelectedJob(null); setApplySuccess(false); }}
                className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-black transition-colors"
              >
                <X size={24} />
              </button>

              {!applySuccess ? (
                <>
                  <div className="mb-12 border-b border-black/10 pb-8">
                    <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-4 block">Application Form</span>
                    <h2 className="text-3xl md:text-4xl font-normal text-neutral-900 mb-4">{selectedJob.title}</h2>
                    <div className="flex gap-6 text-neutral-500 font-normal">
                      <span>{selectedJob.location}</span>
                      <span>{selectedJob.type}</span>
                    </div>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setIsApplying(true);
                      setTimeout(() => {
                        setIsApplying(false);
                        setApplySuccess(true);
                      }, 1500);
                    }}
                    className="flex flex-col gap-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-neutral-500">Full Name</label>
                        <input required type="text" className="bg-neutral-50 border border-black/10 p-4 text-neutral-900 focus:outline-none focus:border-black transition-colors" placeholder="John Doe" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-neutral-500">Email Address</label>
                        <input required type="email" className="bg-neutral-50 border border-black/10 p-4 text-neutral-900 focus:outline-none focus:border-black transition-colors" placeholder="john@example.com" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-neutral-500">LinkedIn / Portfolio URL</label>
                      <input type="url" className="bg-neutral-50 border border-black/10 p-4 text-neutral-900 focus:outline-none focus:border-black transition-colors" placeholder="https://" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-neutral-500">Resume / CV</label>
                      <div className="relative">
                        <input required type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        <div className="flex items-center justify-center gap-3 bg-neutral-50 border border-dashed border-black/20 p-8 text-neutral-500 hover:text-black hover:border-black/40 transition-colors">
                          <Upload size={20} />
                          <span className="font-normal">Click to upload or drag and drop</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isApplying}
                      className="mt-6 w-full flex items-center justify-center gap-2 bg-black text-white p-4 font-normal hover:bg-neutral-800 transition-colors disabled:opacity-50"
                    >
                      {isApplying ? "Submitting..." : "Submit Application"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle size={48} className="text-neutral-900 mb-6" />
                  <h3 className="text-3xl font-normal text-neutral-900 mb-4">Application Submitted</h3>
                  <p className="text-neutral-500 font-normal mb-8 max-w-sm">Thank you for applying. Our talent team will review your application and get back to you shortly.</p>
                  <button 
                    onClick={() => { setSelectedJob(null); setApplySuccess(false); }}
                    className="px-8 py-3 bg-black text-white font-normal hover:bg-neutral-800 transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
