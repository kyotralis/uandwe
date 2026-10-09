import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Quote, Star, ArrowRight, Building, PlayCircle, TrendingUp, ShieldCheck, Zap, Activity } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import Paragraph from '../../components/Paragraph';
import { Link } from 'react-router-dom';

const RAW_TESTIMONIALS = [
  {
    id: 1,
    defaultQuote: "UANDWE didn't just deliver a chip; they delivered a competitive advantage. Their RTL and physical design teams executed flawlessly, ensuring our 5nm automotive ASIC taped out exactly on schedule with zero re-spins. Truly exceptional engineering.",
    defaultAuthor: "Mark Stevenson",
    defaultRole: "VP of Hardware Engineering",
    defaultCompany: "AutoDrive Technologies",
    rating: 5,
    defaultHighlight: "Zero Re-spins on 5nm",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
    colSpan: "lg:col-span-2"
  },
  {
    id: 2,
    defaultQuote: "When we needed to overhaul our entire embedded Linux architecture for a fleet of 100,000 IoT devices, UANDWE was the only partner capable of handling the complexity.",
    defaultAuthor: "Dr. Elena Rostova",
    defaultRole: "Chief Technology Officer",
    defaultCompany: "ConnectSphere IoT",
    rating: 5,
    defaultHighlight: "100k+ Devices Deployed",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    colSpan: "lg:col-span-1"
  },
  {
    id: 3,
    defaultQuote: "The software team at UANDWE fundamentally transformed our backend infrastructure.",
    defaultAuthor: "David Chen",
    defaultRole: "Director of Software",
    defaultCompany: "FinTech Solutions Global",
    rating: 5,
    defaultHighlight: "40% Cloud Cost Reduction",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    colSpan: "lg:col-span-1"
  },
  {
    id: 4,
    defaultQuote: "Their hardware prototyping speed is unmatched. Within weeks, we had functional, high-speed HDI PCBs ready for validation. Their rigorous signal integrity analysis saved us months of debugging in the lab.",
    defaultAuthor: "Sarah O'Connor",
    defaultRole: "Hardware Architect",
    defaultCompany: "NextGen Networks",
    rating: 5,
    defaultHighlight: "Accelerated Time-to-Market",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    colSpan: "lg:col-span-2"
  },
  {
    id: 5,
    defaultQuote: "UANDWE is more than a vendor; they are a seamless extension of our internal team.",
    defaultAuthor: "Michael Chang",
    defaultRole: "Head of Product",
    defaultCompany: "HealthSync Medical",
    rating: 5,
    defaultHighlight: "Seamless Team Integration",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    colSpan: "lg:col-span-1"
  },
  {
    id: 6,
    defaultQuote: "The verification environment they built for our RISC-V core was incredibly robust. Their use of advanced UVM methodologies caught several critical corner-case bugs that our internal team had missed.",
    defaultAuthor: "Priya Patel",
    defaultRole: "Lead Verification Engineer",
    defaultCompany: "Silicon Innovators Inc.",
    rating: 5,
    defaultHighlight: "100% Verification Coverage",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=80",
    colSpan: "lg:col-span-2"
  }
];

export default function Testimonials() {
  const [activeVideo, setActiveVideo] = useState(null);
  const { t } = useTranslation();

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const translatedItems = t("aboutus.testimonials.items", { returnObjects: true, defaultValue: [] });

  return (
    <div className="bg-white min-h-screen text-neutral-900 pt-32 pb-24 overflow-hidden px-4 sm:px-6 md:px-[5%]">
      
      {/* AMBIENT GLOWS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-orange-500/[0.03] blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-blue-500/[0.02] blur-[150px] rounded-full" />
      </div>

      <div className="w-full relative z-10 flex flex-col gap-24 lg:gap-32">
        
        {/* HERO SECTION */}
        <div className="flex flex-col items-start w-full">
          <SectionHeading
            titlePart1={t("aboutus.testimonials.hero.titlePart1", "Trusted by Global")}
            titlePart2={t("aboutus.testimonials.hero.titlePart2", "Industry Leaders")}
            className="!mb-6 text-left"
            breakLine={true}
          />
          
          <Paragraph 
            text={t("aboutus.testimonials.hero.description", "Don't just take our word for it. Hear from the visionaries, CTOs, and engineering leaders who have partnered with UANDWE to turn their complex challenges into flawless realities.")}
            className="text-left max-w-3xl"
            delay={0.2}
          />
        </div>



        {/* FEATURED VIDEO TESTIMONIAL */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden group cursor-pointer border border-white/5 h-[400px] md:h-[600px] w-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1552581234-26160f608093?w=1600&auto=format&fit=crop&q=80" 
            alt="Client Meeting"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
          <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors duration-500 mix-blend-overlay" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-neutral-100 backdrop-blur-md border border-neutral-300 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-500 shadow-[0_0_50px_rgba(255,107,26,0)] group-hover:shadow-[0_0_50px_rgba(255,107,26,0.5)]">
              <PlayCircle size={40} className="text-neutral-900 ml-2" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl md:text-5xl font-light tracking-tight text-neutral-900 mb-4">
              {t("aboutus.testimonials.video.title", "Watch: The AutoDrive Success Story")}
            </h3>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 backdrop-blur-md border border-neutral-200 text-neutral-700 text-sm font-medium">
              {t("aboutus.testimonials.video.subtitle", "How we engineered a 5nm ASIC in record time")}
            </div>
          </div>
        </motion.div>



        {/* ASYMMETRICAL TESTIMONIALS BENTO GRID */}
        <div className="w-full">
          <SectionHeading
            titlePart1={t("aboutus.testimonials.wordsTitlePart1", "Words from")}
            titlePart2={t("aboutus.testimonials.wordsTitlePart2", "Our Partners")}
            className="!mb-12 text-left"
            breakLine={false}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[450px]">
            {RAW_TESTIMONIALS.map((testimonial, idx) => {
              const itemObj = Array.isArray(translatedItems) && translatedItems[idx] ? translatedItems[idx] : {};
              const quote = itemObj.quote || testimonial.defaultQuote;
              const role = itemObj.role || testimonial.defaultRole;
              const company = itemObj.company || testimonial.defaultCompany;
              const highlight = itemObj.highlight || testimonial.defaultHighlight;
              const author = testimonial.defaultAuthor;

              return (
                <motion.div
                  key={testimonial.id}
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className={`relative group bg-neutral-50 border border-white/5 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-orange-500/30 ${testimonial.colSpan}`}
                >
                  {/* Hover Glow Background */}
                  <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Top Section */}
                  <div className="relative z-10 flex items-start justify-between mb-8">
                    <Quote size={48} className="text-neutral-900/10 group-hover:text-orange-500/20 transition-colors duration-500" />
                    <div className="flex gap-1 bg-neutral-50 rounded-full px-3 py-1.5 border border-white/5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={14} className="text-orange-500" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Quote */}
                  <h3 className="relative z-10 text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-neutral-800 group-hover:text-neutral-900 transition-colors duration-300 mb-8 flex-grow">
                    "{quote}"
                  </h3>
                  
                  {/* Bottom Section */}
                  <div className="relative z-10 mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-neutral-200 pt-6 group-hover:border-neutral-300 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-neutral-200 group-hover:border-orange-500 transition-colors duration-500">
                        <img 
                          src={testimonial.image} 
                          alt={author}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      <div>
                        <div className="text-neutral-900 font-semibold text-sm md:text-base">{author}</div>
                        <div className="text-neutral-900/50 text-xs md:text-sm">{role}</div>
                        <div className="text-orange-400 text-[10px] sm:text-xs uppercase tracking-widest mt-1">{company}</div>
                      </div>
                    </div>
                    
                    <div className="bg-neutral-50 rounded-2xl p-3 border border-neutral-200 min-w-max">
                      <div className="text-orange-400 text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Building size={12} /> {t("aboutus.testimonials.keyImpact", "Impact")}
                      </div>
                      <div className="text-neutral-900 font-medium text-xs">{highlight}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA SECTION */}
        <motion.div 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full bg-[#141414] border border-neutral-200 rounded-[2rem] md:rounded-[3rem] p-10 md:p-20 relative overflow-hidden flex flex-col items-center text-center group"
        >
          {/* Dynamic Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-orange-500/20 blur-[100px] rounded-full group-hover:w-[400px] group-hover:h-[400px] group-hover:bg-orange-500/30 transition-all duration-1000" />
          
          <div className="relative z-10 max-w-3xl flex flex-col items-center">
            <SectionHeading
              titlePart1={t("aboutus.testimonials.cta.heading", "Ready to become our next success story?")}
              titlePart2=""
              className="!mb-6"
            />
            <Paragraph 
              text={t("aboutus.testimonials.cta.subheading", "Join the ranks of industry leaders who trust UANDWE to engineer their most critical technologies. Let's build the future together.")}
              className="mb-12"
            />
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full text-base font-medium hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
            >
              {t("aboutus.testimonials.cta.button", "Start Your Project")} 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
