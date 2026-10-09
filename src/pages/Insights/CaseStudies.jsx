import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CASE_STUDIES } from '../../data/caseStudyData';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

export default function CaseStudies() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(CASE_STUDIES.map(study => study.category))];
  const filteredStudies = CASE_STUDIES.filter(study => 
    activeCategory === "All" || study.category === activeCategory
  );

  return (
    <div className="bg-white min-h-screen text-black pb-32">
      
      {/* HERO SECTION */}
      <div className="w-full px-[4%] max-w-[1600px] mx-auto pt-32 pb-12 border-b border-black/10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl lg:text-[3.5rem] font-normal tracking-tight uppercase leading-tight"
        >
          {t("insights.caseStudies.titlePart1", "Client")} {t("insights.caseStudies.titlePart2", "Success Stories")}
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <p className="text-base md:text-lg text-neutral-500 font-light max-w-2xl leading-relaxed">
            {t("insights.caseStudies.description", "Discover how we've partnered with global leaders to engineer breakthrough silicon, hardware, and embedded solutions.")}
          </p>
          <div className="text-sm font-medium tracking-widest uppercase text-neutral-400">
            [ {filteredStudies.length} Studies ]
          </div>
        </motion.div>
      </div>

      <div className="w-full px-[4%] max-w-[1600px] mx-auto">
        
        {/* CATEGORY FILTERS */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 py-8 border-b border-black/10 text-sm md:text-base uppercase tracking-widest font-medium">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative py-1 transition-colors duration-300 ${
                activeCategory === cat 
                ? 'text-black' 
                : 'text-neutral-400 hover:text-black'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeFilter"
                  className="absolute left-0 right-0 -bottom-1 h-[2px] bg-black"
                />
              )}
            </button>
          ))}
        </div>

        {/* CASE STUDIES GRID */}
        <div className="mt-12 md:mt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
            >
              {filteredStudies.map((study) => (
                <motion.div
                  key={study.id}
                  variants={fadeUp}
                  onClick={() => navigate(`/resources/casestudies/${study.id}`)}
                  className="group cursor-pointer flex flex-col h-full"
                >
                  {/* Image Container with Grayscale-to-Color hover effect and Sharp Edges */}
                  <div className="relative overflow-hidden w-full bg-neutral-100 aspect-[4/3] mb-6">
                    <img 
                      src={study.image} 
                      alt={study.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out transform group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-black mb-4">
                      <span>{t(`insights_content.caseStudyData.${study.id}.client`, study.client)}</span>
                      <span className="w-1 h-1 bg-black rounded-full" />
                      <span className="text-neutral-500">{t(`insights_content.caseStudyData.${study.id}.impact`, study.impact)}</span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-normal leading-tight text-black mb-4 group-hover:underline decoration-1 underline-offset-4 decoration-black/0 group-hover:decoration-black transition-all duration-300">
                      {t(`insights_content.caseStudyData.${study.id}.title`, study.title)}
                    </h2>

                    <p className="text-sm mb-6 text-neutral-500 font-light leading-relaxed line-clamp-3">
                      {t(`insights_content.caseStudyData.${study.id}.overview`, study.overview)}
                    </p>

                    <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-4">
                      <div className="text-sm font-medium text-black uppercase tracking-wider">
                        By {t(`insights_content.caseStudyData.${study.id}.author`, study.author)}
                      </div>
                      <div className="w-10 h-10 flex items-center justify-center rounded-full border border-black/20 group-hover:bg-black group-hover:text-white transition-all duration-300 shrink-0">
                        <ArrowUpRight size={18} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* EMPTY STATE */}
          {filteredStudies.length === 0 && (
            <div className="py-32 text-center">
              <h3 className="text-3xl font-bold uppercase tracking-tight text-black mb-4">No studies found</h3>
              <p className="text-neutral-500 font-light text-lg">We haven't published anything in this category recently.</p>
              <button 
                onClick={() => setActiveCategory("All")}
                className="mt-8 px-8 py-3 bg-black text-white text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
