import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Users, Monitor, Zap, Globe, MessageSquare, Compass, ArrowRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import Paragraph from '../../components/Paragraph';

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Senior Embedded Engineer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop&q=80",
    quote: "I've never worked anywhere else where you are handed the keys to massive projects on day one. The trust they place in us is incredible."
  },
  {
    name: "David Park",
    role: "Hardware Architect",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop&q=80",
    quote: "The speed at which we innovate here is staggering. We take designs from whiteboards to prototypes faster than any place I've been."
  },
  {
    name: "Elena Rodriguez",
    role: "AI Research Scientist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&auto=format&fit=crop&q=80",
    quote: "The cross-pollination of ideas between the software and hardware teams creates an environment where you are constantly learning."
  }
];

const RAW_ENVIRONMENT_FEATURES = [
  {
    icon: <Users size={24} strokeWidth={1.5} />,
    defaultTitle: "Synergy & Collaboration",
    defaultDesc: "Innovation doesn't happen in silos. Our ecosystem thrives on cross-functional teamwork, open knowledge-sharing, and collective problem-solving."
  },
  {
    icon: <Zap size={24} strokeWidth={1.5} />,
    defaultTitle: "Rapid Innovation Cycle",
    defaultDesc: "We embrace agility. Our teams are empowered to experiment boldly, iterate rapidly, and pioneer industry-disrupting solutions without red tape."
  },
  {
    icon: <Globe size={24} strokeWidth={1.5} />,
    defaultTitle: "Boundaryless Teams",
    defaultDesc: "Collaborate seamlessly with world-class talent across time zones. Our digital-first infrastructure ensures you're always connected, no matter where you are."
  },
  {
    icon: <Compass size={24} strokeWidth={1.5} />,
    defaultTitle: "Empowered Ownership",
    defaultDesc: "We hire exceptional talent and get out of their way. Experience true autonomy, commanding your projects and shaping your own trajectory from day one."
  },
  {
    icon: <MessageSquare size={24} strokeWidth={1.5} />,
    defaultTitle: "Transparent Communication",
    defaultDesc: "Growth requires honest feedback. We cultivate a culture of open, constructive dialogue where every voice is heard and every team member is supported."
  },
  {
    icon: <Monitor size={24} strokeWidth={1.5} />,
    defaultTitle: "Premium Tech Stack",
    defaultDesc: "Your workflow shouldn't be a bottleneck. We invest in top-tier hardware, cutting-edge software, and premium tools so you can execute flawlessly."
  }
];

export default function Workenvironment() {
  const { t } = useTranslation();
  const translatedFeatures = t("careers.workEnvironment.features", { returnObjects: true, defaultValue: [] });

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
            Where Great Minds Thrive
          </h1>
        </motion.div>
        <Paragraph 
          className="text-sm lg:text-base xl:text-lg leading-relaxed text-neutral-500 font-normal mt-8 max-w-3xl"
          text="An ecosystem engineered for top-tier talent. Zero bureaucracy and absolute freedom to build the future."
        />
      </div>

      {/* SPATIAL DYNAMICS / GALLERY */}
      <div className="w-full py-24 border-b border-black/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="aspect-[4/3] bg-neutral-100 relative group overflow-hidden border border-black/10">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80" alt="Workspaces" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 p-8 bg-white border-t border-r border-black/10 group-hover:bg-black group-hover:text-white transition-colors duration-500">
              <h3 className="text-2xl font-normal tracking-tight mb-2">State-of-the-Art Workspaces</h3>
              <p className="text-sm font-normal text-neutral-500 group-hover:text-neutral-400 transition-colors">Fostering high-energy collaboration.</p>
            </div>
          </motion.div>
          <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="aspect-[4/3] bg-neutral-100 relative group overflow-hidden border border-black/10 mt-0 md:mt-24">
            <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&auto=format&fit=crop&q=80" alt="Inclusive Excellence" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 p-8 bg-white border-t border-r border-black/10 group-hover:bg-black group-hover:text-white transition-colors duration-500">
              <h3 className="text-2xl font-normal tracking-tight mb-2">Inclusive Excellence</h3>
              <p className="text-sm font-normal text-neutral-500 group-hover:text-neutral-400 transition-colors">Thriving on diverse perspectives.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CORE PHILOSOPHY / FEATURES */}
      <div className="w-full py-24 border-b border-black/10">
        <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-neutral-900 mb-16">The Architecture of Innovation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-black/10">
          {RAW_ENVIRONMENT_FEATURES.map((feature, idx) => {
            const featObj = Array.isArray(translatedFeatures) && translatedFeatures[idx] ? translatedFeatures[idx] : {};
            const title = featObj.title || feature.defaultTitle;
            const desc = featObj.desc || feature.defaultDesc;

            return (
              <motion.div
                key={idx}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-10 border-b border-r border-black/10 flex flex-col group hover:bg-black transition-colors duration-500"
              >
                <div className="text-neutral-900 group-hover:text-white transition-colors duration-500 mb-8">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-normal text-neutral-900 tracking-tight mb-4 group-hover:text-white transition-colors duration-500">
                  {title}
                </h3>
                <p className="text-neutral-500 font-normal text-sm leading-relaxed group-hover:text-neutral-400 transition-colors duration-500">
                  {desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* EMPLOYEE VOICES */}
      <div className="w-full py-24 border-b border-black/10">
        <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-neutral-900 mb-16 text-left">Team Perspectives</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col border border-black/10 p-10 bg-neutral-50"
            >
              <div className="mb-8">
                <Quote size={32} className="text-neutral-900/10" />
              </div>
              <p className="text-xl md:text-2xl font-normal text-neutral-900 leading-relaxed mb-12 flex-grow">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-black/10">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 object-cover grayscale" />
                <div>
                  <h4 className="text-neutral-900 font-normal">{testimonial.name}</h4>
                  <p className="text-neutral-500 text-xs tracking-wider">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIFE AT UANDWE GALLERY */}
      <div className="w-full py-24 border-b border-black/10">
        <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-neutral-900 mb-16 text-left">Life at UANDWE</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 border-t border-l border-black/10">
          
          <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-2 aspect-square relative group overflow-hidden border-b border-r border-black/10 bg-neutral-100">
            <img src="https://images.unsplash.com/photo-1530811761207-8d9d22f0a141?w=1200&auto=format&fit=crop&q=80" alt="Team Lunch" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
              <h3 className="text-white text-2xl font-normal tracking-tight">Friday Team Lunches</h3>
              <p className="text-neutral-300 font-normal mt-2">Because code compiles faster on a full stomach.</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-1 aspect-square relative group overflow-hidden border-b border-r border-black/10 bg-neutral-100">
            <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80" alt="Gaming" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
              <h3 className="text-white text-xl font-normal tracking-tight">Gaming Tournaments</h3>
              <p className="text-neutral-300 text-sm font-normal mt-2">Settle architecture debates in Mario Kart.</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-1 aspect-square relative group overflow-hidden border-b border-r border-black/10 bg-neutral-100">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80" alt="Hackathon" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
              <h3 className="text-white text-xl font-normal tracking-tight">Hackathons</h3>
              <p className="text-neutral-300 text-sm font-normal mt-2">24 hours to build something crazy.</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-1 aspect-square relative group overflow-hidden border-b border-r border-black/10 bg-neutral-100">
            <img src="https://images.unsplash.com/photo-1506869640319-fea1a2ab8e40?w=600&auto=format&fit=crop&q=80" alt="Retreat" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
              <h3 className="text-white text-xl font-normal tracking-tight">Annual Retreats</h3>
              <p className="text-neutral-300 text-sm font-normal mt-2">Taking the whole team off-grid.</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-3 aspect-[3/1] relative group overflow-hidden border-b border-r border-black/10 bg-neutral-100">
            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&auto=format&fit=crop&q=80" alt="Celebration" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 md:p-12">
              <h3 className="text-white text-2xl md:text-3xl font-normal tracking-tight">Product Launches</h3>
              <p className="text-neutral-300 font-normal mt-2 max-w-xl">When we ship, we celebrate big. Champagne, custom swag, and a lot of high-fives.</p>
            </div>
          </motion.div>

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
            {t("careers.workEnvironment.cta.heading", "Ready to shape the future?")}
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl font-normal">
            Join a team of driven engineers pushing the boundaries of what's possible.
          </p>
        </div>
        
        <Link 
          to="/careers/jobs" 
          className="group inline-flex items-center gap-4 px-8 py-4 border border-white text-white hover:bg-white hover:text-neutral-900 transition-all duration-300 font-normal tracking-wide whitespace-nowrap"
        >
          {t("careers.workEnvironment.cta.button", "Explore Opportunities")} 
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

    </div>
  );
}
