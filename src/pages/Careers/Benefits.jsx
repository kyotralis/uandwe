import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Shield, Heart, Globe, Coffee, BookOpen, Smile, TrendingUp, Sun, ArrowUpRight, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import Paragraph from '../../components/Paragraph';

const BENEFIT_CATEGORIES = [
  {
    id: 'health',
    title: 'Health & Wellness',
    items: [
      {
        icon: <Shield size={32} strokeWidth={1} />,
        defaultTitle: "Comprehensive Coverage",
        defaultDesc: "Premium medical, dental, and vision insurance for you and your dependents, ensuring peace of mind."
      },
      {
        icon: <Heart size={32} strokeWidth={1} />,
        defaultTitle: "Mental Wellness",
        defaultDesc: "Access to premium counseling services and regular wellness days off to prioritize your mental health."
      },
      {
        icon: <Sun size={32} strokeWidth={1} />,
        defaultTitle: "Unlimited PTO",
        defaultDesc: "Take the time you need to recharge. We believe in resting as hard as we work."
      }
    ]
  },
  {
    id: 'financial',
    title: 'Financial & Growth',
    items: [
      {
        icon: <TrendingUp size={32} strokeWidth={1} />,
        defaultTitle: "Competitive Compensation",
        defaultDesc: "Industry-leading base pay, aggressive performance bonuses, and generous equity so you directly share in the success you help build."
      },
      {
        icon: <BookOpen size={32} strokeWidth={1} />,
        defaultTitle: "Continuous Learning",
        defaultDesc: "Generous stipends for conferences, courses, and certifications to keep your skills sharp."
      }
    ]
  },
  {
    id: 'lifestyle',
    title: 'Work & Lifestyle',
    items: [
      {
        icon: <Globe size={32} strokeWidth={1} />,
        defaultTitle: "Flexible Work",
        defaultDesc: "Work from where you thrive. We embrace hybrid and remote work models for optimal work-life balance."
      },
      {
        icon: <Coffee size={32} strokeWidth={1} />,
        defaultTitle: "Office Perks",
        defaultDesc: "Fully stocked kitchens, catered lunches, and state-of-the-art equipment for your home or office setup."
      },
      {
        icon: <Smile size={32} strokeWidth={1} />,
        defaultTitle: "Family First",
        defaultDesc: "Generous parental leave for all new parents, plus childcare stipends and family planning support."
      }
    ]
  }
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function Benefits() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(BENEFIT_CATEGORIES[0]);

  return (
    <div className="bg-white min-h-screen text-neutral-900 pb-32">
      
      {/* HERO SECTION */}
      <div className="w-full px-[4%] max-w-[1600px] mx-auto pt-32 pb-12 border-b border-black/10">


        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl lg:text-[3.5rem] font-normal tracking-tight uppercase leading-tight"
        >
          {t("careers.benefits.heroTitlePart1", "Beyond the")} {t("careers.benefits.heroTitlePart2", "Salary")}
        </motion.h1>

        <Paragraph 
          className="text-sm lg:text-base xl:text-lg leading-relaxed text-neutral-500 font-normal mt-12 max-w-3xl"
          text="We demand excellence, and in return, we provide an ecosystem designed to support your health, wealth, and continuous growth."
        />
      </div>

      <div className="w-full px-[4%] max-w-[1600px] mx-auto mt-20">
        
        {/* INTERACTIVE SHOWCASE (TABS) */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 border-b border-black/10 pb-20">
          
          {/* Left Sidebar - Tab Selectors */}
          <motion.div 
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-1/3 flex flex-col relative"
          >
            {/* Vertical Line for Desktop */}
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-black/10" />
            
            {BENEFIT_CATEGORIES.map((category) => {
              const isActive = activeCategory.id === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category)}
                  className={`relative flex items-center w-full text-left py-8 px-4 lg:pl-12 transition-all duration-300 group border-b lg:border-b-0 lg:border-l lg:border-transparent ${isActive ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-900'}`}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-black hidden lg:block"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabIndicatorMobile"
                      className="absolute left-0 bottom-0 right-0 h-[3px] bg-black block lg:hidden"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <span className="text-2xl md:text-3xl font-normal tracking-tight">
                    {category.title}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Right Panel - Dynamic Content */}
          <div className="w-full lg:w-2/3 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16"
              >
                {activeCategory.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col group">
                    <div className="w-16 h-16 mb-8 flex items-center justify-center text-neutral-900 border border-black/10 rounded-full transition-colors duration-500 group-hover:bg-black group-hover:text-white">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-normal text-neutral-900 mb-4 tracking-tight">
                      {item.defaultTitle}
                    </h3>
                    <Paragraph 
                      className="text-neutral-500 text-base font-normal leading-relaxed"
                      text={item.defaultDesc}
                    />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CORE PHILOSOPHY SECTION */}
        <div className="w-full py-20 flex flex-col gap-12 border-b border-black/10">
          
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Quote Block */}
            <motion.div 
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full lg:w-1/2 bg-white border border-black p-12 md:p-16 flex flex-col justify-center"
            >
              <h3 className="text-2xl md:text-3xl font-normal tracking-tight text-neutral-900 mb-8 border-b border-black/10 pb-4">
                Core Philosophy
              </h3>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-neutral-900 leading-tight tracking-tight">
                "We create an environment where you can do your best work <span className="underline decoration-2 underline-offset-8">without worrying about the essentials.</span>"
              </h2>
            </motion.div>

            {/* Image Block */}
            <motion.div 
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full lg:w-1/2 aspect-square lg:aspect-auto relative overflow-hidden bg-neutral-100"
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop&q=80" 
                alt="Team collaborating" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 hover:scale-105"
              />
            </motion.div>
          </div>

          {/* Bottom Two Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, delay: 0.1 }}
              className="border-t border-black/10 pt-8"
            >
              <h4 className="text-2xl font-normal text-neutral-900 mb-4 tracking-tight">100% Paid Premiums</h4>
              <p className="text-neutral-500 font-normal text-base leading-relaxed">Comprehensive medical, dental, and vision coverage completely covered for you and your dependents, ensuring you never have to compromise on health.</p>
            </motion.div>

            <motion.div 
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, delay: 0.2 }}
              className="border-t border-black/10 pt-8"
            >
              <h4 className="text-2xl font-normal text-neutral-900 mb-4 tracking-tight">Wellness & L&D Budgets</h4>
              <p className="text-neutral-500 font-normal text-base leading-relaxed">Generous stipends provided regularly to fund your gym memberships, health apps, and continuous education programs globally.</p>
            </motion.div>
          </div>
        </div>

        {/* CAREER TRAJECTORY SECTION */}
        <div className="w-full py-20 flex flex-col gap-16 border-b border-black/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 max-w-2xl leading-none">
              Engineering Your Trajectory
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-black/10 pt-16">
            <div className="flex flex-col">
              <span className="text-6xl lg:text-7xl font-normal text-neutral-900 mb-6">01</span>
              <h3 className="text-2xl font-normal text-neutral-900 tracking-tight mb-4">Dedicated Mentorship</h3>
              <p className="text-neutral-500 font-normal text-base leading-relaxed">
                Every new engineer is paired with a Principal Architect for their first 6 months. Weekly 1-on-1s ensure you navigate our complex silicon and software stacks efficiently.
              </p>
            </div>
            <div className="flex flex-col">
              <span className="text-6xl lg:text-7xl font-normal text-neutral-900 mb-6">02</span>
              <h3 className="text-2xl font-normal text-neutral-900 tracking-tight mb-4">Internal Mobility</h3>
              <p className="text-neutral-500 font-normal text-base leading-relaxed">
                Start in embedded firmware and transition to silicon photonics. We actively encourage lateral moves across departments to build truly full-stack hardware engineers.
              </p>
            </div>
            <div className="flex flex-col">
              <span className="text-6xl lg:text-7xl font-normal text-neutral-900 mb-6">03</span>
              <h3 className="text-2xl font-normal text-neutral-900 tracking-tight mb-4">Leadership Fast-Track</h3>
              <p className="text-neutral-500 font-normal text-base leading-relaxed">
                We promote based on merit and architectural impact, not tenure. Our intensive engineering management program prepares senior ICs to lead global teams.
              </p>
            </div>
          </div>
        </div>

        {/* GLOBAL FOOTPRINT */}
        <div className="w-full py-20 flex flex-col gap-12 border-b border-black/10">
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-neutral-900 mb-8">Our Global Hubs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-black p-8 lg:p-12 group hover:bg-black transition-colors duration-500 cursor-default flex flex-col justify-between aspect-square">
              <h3 className="text-2xl lg:text-3xl font-normal text-neutral-900 group-hover:text-white transition-colors">USA</h3>
              <p className="text-neutral-500 text-sm tracking-widest mt-auto group-hover:text-neutral-400 transition-colors">North America Hub</p>
            </div>
            <div className="border border-black p-8 lg:p-12 group hover:bg-black transition-colors duration-500 cursor-default flex flex-col justify-between aspect-square">
              <h3 className="text-2xl lg:text-3xl font-normal text-neutral-900 group-hover:text-white transition-colors">China</h3>
              <p className="text-neutral-500 text-sm tracking-widest mt-auto group-hover:text-neutral-400 transition-colors">Asia Hub</p>
            </div>
            <div className="border border-black p-8 lg:p-12 group hover:bg-black transition-colors duration-500 cursor-default flex flex-col justify-between aspect-square">
              <h3 className="text-2xl lg:text-3xl font-normal text-neutral-900 group-hover:text-white transition-colors">India</h3>
              <p className="text-neutral-500 text-sm tracking-widest mt-auto group-hover:text-neutral-400 transition-colors">South Asia Hub</p>
            </div>
          </div>
        </div>


        {/* DIVERSITY STATEMENT */}
        <div className="w-full py-32 flex flex-col items-center text-center border-b border-black/10">
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-neutral-900 mb-12">
            Commitment to Diversity
          </h2>
          <p className="text-3xl md:text-5xl lg:text-6xl font-normal text-neutral-900 leading-[1.1] tracking-tight max-w-5xl">
            Complex engineering problems require diverse perspectives. We are actively building a global team that defies industry norms.
          </p>
        </div>

        {/* CTA SECTION */}
        <motion.div 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full mt-24 bg-black text-white p-12 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-none mb-6">
              {t("careers.benefits.cta.heading", "Ready to join the team?")}
            </h2>
            <p className="text-neutral-400 text-lg md:text-xl font-normal">
              {t("careers.benefits.cta.subheading", "Explore our open roles and find your next big opportunity with UANDWE.")}
            </p>
          </div>
          
          <Link 
            to="/careers/jobs" 
            className="group flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/20 hover:bg-white hover:text-neutral-900 transition-colors duration-500 shrink-0"
          >
            <span className="sr-only">{t("careers.benefits.cta.button", "View Open Roles")}</span>
            <ArrowUpRight size={40} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
