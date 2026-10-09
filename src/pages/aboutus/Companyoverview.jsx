import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Terminal, Cpu, Network, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Paragraph from '../../components/Paragraph';

const METRICS = [
  { value: "50+", label: "Enterprise Tapeouts" },
  { value: "10B+", label: "Data Transactions Scaled" },
  { value: "3", label: "Global Engineering Hubs" },
  { value: "0", label: "Failed Deliveries" }
];

const PRINCIPLES = [
  {
    icon: <Terminal size={24} strokeWidth={1.5} />,
    title: "Velocity",
    desc: "Speed without compromise. We operate with the agility of a startup but the extreme rigor of a Tier-1 design house."
  },
  {
    icon: <Cpu size={24} strokeWidth={1.5} />,
    title: "Precision",
    desc: "From formal verification of ASIC logic to ASIL-D automotive compliance, we engineer for zero-defect outcomes."
  },
  {
    icon: <Globe size={24} strokeWidth={1.5} />,
    title: "Autonomy",
    desc: "We hire world-class talent and eliminate bureaucracy. Our engineers have the absolute freedom to solve impossible problems."
  },
  {
    icon: <Network size={24} strokeWidth={1.5} />,
    title: "Scale",
    desc: "We don't build prototypes. We architect mission-critical infrastructure designed to operate flawlessly at global scale."
  }
];

export default function Companyoverview() {
  const { t } = useTranslation();

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="bg-white min-h-screen text-neutral-900 pt-32 pb-16 px-[4%] max-w-[1400px] mx-auto">
      
      {/* HERO */}
      <div className="w-full pb-16 border-b border-black/10">
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariant} className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-normal tracking-tight uppercase leading-tight text-neutral-900">
            The Global Vanguard of Engineering.
          </h1>
        </motion.div>
        <Paragraph 
          className="text-sm lg:text-base xl:text-lg leading-relaxed text-neutral-500 font-normal mt-8 max-w-3xl"
          text="We are the invisible force powering the next generation of global technological infrastructure."
        />
      </div>

      {/* THE MANIFESTO */}
      <div className="w-full py-24 border-b border-black/10">
        <motion.div 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl"
        >
          <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-8 block">The Mission</span>
          <p className="text-3xl md:text-4xl lg:text-5xl font-normal text-neutral-900 leading-[1.2] tracking-tight">
            We don't build generic applications. We engineer the bleeding edge. From navigating the extreme physics of sub-3nm silicon tapeouts to architecting cloud-native enterprise systems that process billions of events, we exist to solve the industry's most punishing technical challenges.
          </p>
        </motion.div>
      </div>

      {/* METRICS (BRUTALIST GRID) */}
      <div className="w-full py-24 border-b border-black/10">
        <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-neutral-900 mb-16">By The Numbers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-black/10">
          {METRICS.map((metric, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-10 border-b border-r border-black/10 flex flex-col group hover:bg-black transition-colors duration-500"
            >
              <div className="text-5xl md:text-6xl font-normal tracking-tight text-neutral-900 mb-4 group-hover:text-white transition-colors duration-500">
                {metric.value}
              </div>
              <div className="text-sm text-neutral-500 uppercase tracking-widest font-normal group-hover:text-neutral-400 transition-colors">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* IMAGE BREAK */}
      <div className="w-full py-24 border-b border-black/10">
        <motion.div 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full aspect-[21/9] bg-neutral-100 overflow-hidden relative group"
        >
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=2000&auto=format&fit=crop&q=80" 
            alt="Engineering lab" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
          />
          <div className="absolute inset-0 border border-black/10 pointer-events-none" />
        </motion.div>
      </div>

      {/* CORE PRINCIPLES */}
      <div className="w-full py-24 border-b border-black/10">
        <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-neutral-900 mb-16">Core Principles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-black/10">
          {PRINCIPLES.map((principle, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-10 border-b border-r border-black/10 flex flex-col group hover:bg-neutral-50 transition-colors duration-500"
            >
              <div className="text-neutral-900 mb-8">
                {principle.icon}
              </div>
              <h3 className="text-2xl font-normal text-neutral-900 tracking-tight mb-4">
                {principle.title}
              </h3>
              <p className="text-neutral-500 font-normal text-sm leading-relaxed">
                {principle.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div 
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full mt-24 bg-black text-white p-12 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-12"
      >
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-none mb-6">
            Ready to engineer your next big breakthrough?
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl font-normal">
            Whether you need to tape out a complex 5nm ASIC or build a highly scalable cloud application, our engineers are ready.
          </p>
        </div>
        
        <Link 
          to="/contact" 
          className="group inline-flex items-center gap-4 px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-normal tracking-wide whitespace-nowrap"
        >
          Contact Our Team
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

    </div>
  );
}
