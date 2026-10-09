import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { CASE_STUDIES } from '../../data/caseStudyData';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

export default function CaseStudyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Scroll to top when study changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const rawStudy = CASE_STUDIES.find(s => s.id === id);

  if (!rawStudy) {
    return (
      <div className="bg-white min-h-screen text-black flex items-center justify-center px-[4%]">
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase tracking-tight mb-4">Study not found</h1>
          <button
            onClick={() => navigate('/resources/casestudies')}
            className="text-black font-medium uppercase tracking-widest text-sm hover:underline underline-offset-4"
          >
            ← Back to Case Studies
          </button>
        </div>
      </div>
    );
  }

  const study = {
    ...rawStudy,
    title: t(`insights_content.caseStudyData.${rawStudy.id}.title`, rawStudy.title),
    client: t(`insights_content.caseStudyData.${rawStudy.id}.client`, rawStudy.client),
    category: t(`insights_content.caseStudyData.${rawStudy.id}.category`, rawStudy.category),
    impact: t(`insights_content.caseStudyData.${rawStudy.id}.impact`, rawStudy.impact),
    overview: t(`insights_content.caseStudyData.${rawStudy.id}.overview`, rawStudy.overview),
    author: t(`insights_content.caseStudyData.${rawStudy.id}.author`, rawStudy.author),
    role: t(`insights_content.caseStudyData.${rawStudy.id}.role`, rawStudy.role),
    content: t(`insights_content.caseStudyData.${rawStudy.id}.content`, rawStudy.content)
  };

  // Find 3 related studies (prefer same category, exclude current)
  const relatedStudies = CASE_STUDIES.filter(s => s.id !== study.id)
    .sort((a, b) => (a.category === study.category ? -1 : 1))
    .slice(0, 3);

  return (
    <div className="bg-white min-h-screen text-black pb-16">
      
      {/* HERO SECTION */}
      <div className="w-full px-[4%] max-w-[1200px] mx-auto pt-32 md:pt-48 pb-12 border-b border-black/10">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/resources/casestudies')}
          className="flex items-center gap-2 text-black text-sm font-bold tracking-widest uppercase mb-12 hover:underline underline-offset-4 transition-all"
        >
          <ArrowLeft size={16} />
          {t("insights_content.details.backToCaseStudies", "Back to Case Studies")}
        </motion.button>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-black mb-6">
            <span>{study.client}</span>
            <span className="w-1.5 h-1.5 bg-black rounded-full" />
            <span className="text-neutral-500">{study.category}</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal leading-[1.1] tracking-tight text-black mb-8">
            {study.title}
          </h1>
        </motion.div>
      </div>

      {/* CONTENT LAYOUT */}
      <div className="w-full px-[4%] max-w-[1200px] mx-auto py-16 flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* MAIN ARTICLE */}
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-2/3"
        >
          {/* Main Image */}
          <div className="w-full aspect-[16/9] bg-neutral-100 mb-16 overflow-hidden">
            <img 
              src={study.image} 
              alt={study.title} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
            />
          </div>

          {/* Article Body */}
          <div className="text-lg text-neutral-600 leading-relaxed font-light space-y-8">
            
            <h2 className="text-2xl md:text-3xl font-normal text-black mt-0 mb-8 uppercase tracking-tight">
              The Challenge
            </h2>
            <p className="text-2xl md:text-3xl font-normal text-black leading-snug mb-12">
              {study.overview}
            </p>
            <p>
              When {study.client} approached UANDWE, they were facing unprecedented engineering bottlenecks. {study.content.split('. ')[0]}. Traditional off-the-shelf components were simply unable to meet the stringent power, thermal, and performance requirements dictated by the market.
            </p>

            <blockquote className="border-l-4 border-black pl-8 py-4 my-16 text-2xl md:text-4xl font-normal text-black leading-tight">
              "The success of this project hinged entirely on our ability to ignore convention and redesign the fundamental architecture from the ground up."
            </blockquote>

            <h2 className="text-2xl md:text-3xl font-normal text-black mt-16 mb-8 uppercase tracking-tight">
              The UANDWE Solution
            </h2>
            <p className="text-lg md:text-xl text-black">
              {study.content}
            </p>
            <p>
              Successfully navigating these technological shifts requires an unyielding focus on foundational principles. As systems grow in complexity, our teams prioritized the following dimensions to execute the solution:
            </p>
            <ul className="list-disc pl-6 space-y-4 my-8">
              <li>
                <strong className="text-black font-medium">Custom Architecture:</strong> We stripped away unnecessary overhead and designed a bespoke solution tailored strictly to {study.client}'s operational needs.
              </li>
              <li>
                <strong className="text-black font-medium">Rigorous Verification:</strong> At every stage of the pipeline, our teams utilized advanced simulation techniques to guarantee first-pass success before committing to hardware.
              </li>
              <li>
                <strong className="text-black font-medium">Thermal & Power Envelopes:</strong> Managing physical and thermal constraints was just as critical as raw compute power.
              </li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-normal text-black mt-16 mb-8 uppercase tracking-tight">
              The Impact
            </h2>
            <p>
              The results were transformative. By partnering closely with {study.client}'s internal engineering teams, we successfully achieved a monumental <strong className="text-black font-medium">{study.impact}</strong>. 
            </p>
            <p>
              This not only accelerated their product roadmap by months but also established a new benchmark for efficiency and scale within the {study.category.toLowerCase()} sector. The evolution of this platform will undoubtedly dictate the pace of advancement for their next-generation portfolio.
            </p>
          </div>
        </motion.article>

        {/* SIDEBAR */}
        <motion.aside 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full lg:w-1/3"
        >
          <div className="sticky top-32 border border-black/10 p-10 flex flex-col items-center text-center bg-neutral-50">
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-8 w-full text-left border-b border-black/10 pb-4">
              Lead Architect
            </div>
            
            <div className="w-32 h-32 rounded-full bg-white border border-black/10 flex items-center justify-center text-4xl font-normal text-black mb-6">
              {study.author.split(' ').map(n => n[0]).join('')}
            </div>
            
            <h3 className="text-2xl font-normal text-black mb-2">{study.author}</h3>
            <p className="text-neutral-500 font-light text-sm uppercase tracking-wider">{study.role}</p>
            
            <div className="w-full h-px bg-black/10 my-8" />
            
            <p className="text-sm text-neutral-500 font-light leading-relaxed">
              {study.author} led the engineering efforts for the {study.client} project, utilizing deep expertise in {study.category.toLowerCase()} architectures to deliver breakthrough results.
            </p>
          </div>
        </motion.aside>

      </div>

      {/* RELATED STUDIES */}
      {relatedStudies.length > 0 && (
        <div className="w-full px-[4%] max-w-[1200px] mx-auto pt-24 pb-16 border-t border-black/10">
          <h2 className="text-3xl font-normal text-black uppercase tracking-tight mb-12">
            Related Success Stories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {relatedStudies.map((relatedStudy) => (
              <motion.div
                key={relatedStudy.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onClick={() => navigate(`/resources/casestudies/${relatedStudy.id}`)}
                className="group cursor-pointer flex flex-col h-full"
              >
                {/* Image Container with Grayscale-to-Color hover effect */}
                <div className="relative overflow-hidden w-full bg-neutral-100 aspect-[4/3] mb-6">
                  <img 
                    src={relatedStudy.image} 
                    alt={relatedStudy.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out transform group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-black mb-4">
                    <span>{t(`insights_content.caseStudyData.${relatedStudy.id}.client`, relatedStudy.client)}</span>
                    <span className="w-1 h-1 bg-black rounded-full" />
                    <span className="text-neutral-500">{t(`insights_content.caseStudyData.${relatedStudy.id}.impact`, relatedStudy.impact)}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-normal leading-tight text-black mb-4 group-hover:underline decoration-1 underline-offset-4 decoration-black/0 group-hover:decoration-black transition-all duration-300">
                    {t(`insights_content.caseStudyData.${relatedStudy.id}.title`, relatedStudy.title)}
                  </h3>

                  <p className="text-sm mb-6 text-neutral-500 font-light leading-relaxed line-clamp-3">
                    {t(`insights_content.caseStudyData.${relatedStudy.id}.overview`, relatedStudy.overview)}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-4">
                    <div className="text-sm font-medium text-black uppercase tracking-wider">
                      By {t(`insights_content.caseStudyData.${relatedStudy.id}.author`, relatedStudy.author)}
                    </div>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full border border-black/20 group-hover:bg-black group-hover:text-white transition-all duration-300 shrink-0">
                      <ArrowUpRight size={18} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
