import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Globe, MessageCircle, Mail, Compass, Users } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import Paragraph from '../../components/Paragraph';

const RAW_LEADERSHIP_TEAM = [
  {
    id: 1,
    defaultName: "Dr. Alexander Reed",
    defaultRole: "Chief Executive Officer",
    defaultBio: "With over 20 years in semiconductor and cloud computing, Dr. Reed drives UANDWE's strategic vision, fostering a culture of relentless innovation and global expansion.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&auto=format&fit=crop&q=80",
    socials: { linkedin: "#", twitter: "#", email: "#" },
    colSpan: "md:col-span-2 lg:col-span-2",
    rowSpan: "row-span-1 sm:row-span-2"
  },
  {
    id: 2,
    defaultName: "Sarah Jenkins",
    defaultRole: "Chief Technology Officer",
    defaultBio: "A pioneer in advanced VLSI architectures and embedded systems.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    socials: { linkedin: "#", twitter: "#", email: "#" },
    colSpan: "md:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1"
  },
  {
    id: 3,
    defaultName: "Michael Chen",
    defaultRole: "VP of Engineering",
    defaultBio: "Michael oversees all global hardware and software execution.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80",
    socials: { linkedin: "#", twitter: "#", email: "#" },
    colSpan: "md:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1"
  },
  {
    id: 4,
    defaultName: "Elena Rodriguez",
    defaultRole: "Chief Operations Officer",
    defaultBio: "Elena optimizes our global delivery networks across 15 timezones.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80",
    socials: { linkedin: "#", twitter: "#", email: "#" },
    colSpan: "md:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1"
  },
  {
    id: 5,
    defaultName: "David Kim",
    defaultRole: "Head of Artificial Intelligence",
    defaultBio: "David leads our AI division, integrating automation.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    socials: { linkedin: "#", twitter: "#", email: "#" },
    colSpan: "md:col-span-1 lg:col-span-1",
    rowSpan: "row-span-1"
  },
  {
    id: 6,
    defaultName: "Priya Patel",
    defaultRole: "Head of VLSI & Silicon",
    defaultBio: "A verification guru specializing in ultra-low power FinFET.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80",
    socials: { linkedin: "#", twitter: "#", email: "#" },
    colSpan: "md:col-span-2 lg:col-span-1",
    rowSpan: "row-span-1"
  }
];

export default function Leadership() {
  const [activeLeader, setActiveLeader] = useState(null);
  const { t } = useTranslation();

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const translatedTeam = t("aboutus.leadership.team", { returnObjects: true, defaultValue: [] });

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
            titlePart1={t("aboutus.leadership.hero.titlePart1", "Guided by")}
            titlePart2={t("aboutus.leadership.hero.titlePart2", "Visionaries")}
            className="!mb-6 text-left"
            breakLine={false}
          />
          
          <Paragraph 
            text={t("aboutus.leadership.hero.description", "Our leadership team brings together decades of experience across semiconductor design, enterprise software, and global operations to steer UANDWE toward engineering perfection.")}
            className="text-left max-w-3xl"
            delay={0.2}
          />
        </div>

        {/* LEADERSHIP VISION SECTION (REPLACED PHILOSOPHY) */}
        <motion.div 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full relative rounded-[2rem] md:rounded-[3rem] overflow-hidden group border border-neutral-200 h-[400px] md:h-[500px]"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=80" 
              alt="Corporate Vision"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-white/60 group-hover:bg-white/40 transition-colors duration-700" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-16 lg:p-24 max-w-3xl">
            <div className="w-12 h-1 bg-orange-500 mb-8 rounded-full" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 leading-tight mb-6 tracking-tight">
              {t("aboutus.leadership.vision.quote", "\"True leadership isn't about managing technology; it's about empowering the minds that create it.\"")}
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-neutral-300">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80" 
                  alt="CEO"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-neutral-900 font-semibold">{t("aboutus.leadership.vision.author", "Dr. Alexander Reed")}</div>
                <div className="text-orange-400 text-xs uppercase tracking-widest">{t("aboutus.leadership.vision.authorRole", "CEO & Founder")}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BENTO GRID (TEAM) */}
        <div className="w-full">
          <SectionHeading
            titlePart1={t("aboutus.leadership.team.titlePart1", "Meet The")}
            titlePart2={t("aboutus.leadership.team.titlePart2", "Board")}
            className="!mb-12 text-left"
            breakLine={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
            {RAW_LEADERSHIP_TEAM.map((leader, idx) => {
              const teamObj = Array.isArray(translatedTeam) && translatedTeam[idx] ? translatedTeam[idx] : {};
              const name = teamObj.name || leader.defaultName;
              const role = teamObj.role || leader.defaultRole;
              const bio = teamObj.bio || leader.defaultBio;

              return (
                <motion.div
                  key={leader.id}
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  onMouseEnter={() => setActiveLeader(leader.id)}
                  onMouseLeave={() => setActiveLeader(null)}
                  className={`relative group bg-neutral-50 border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-orange-500/30 ${leader.colSpan} ${leader.rowSpan}`}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={leader.image} 
                      alt={name}
                      className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[20%] group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-[#0b0b12]/50 to-transparent" />
                    <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors duration-500 mix-blend-overlay" />
                  </div>
                  
                  {/* Social Links (Reveal on hover) */}
                  <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 z-20">
                    <a href={leader.socials.linkedin} className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-neutral-300 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-colors">
                      <Globe size={16} className="text-neutral-900" />
                    </a>
                    <a href={leader.socials.twitter} className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-neutral-300 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-colors">
                      <MessageCircle size={16} className="text-neutral-900" />
                    </a>
                    <a href={leader.socials.email} className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-neutral-300 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-colors">
                      <Mail size={16} className="text-neutral-900" />
                    </a>
                  </div>

                  {/* Content Area */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                    <h3 className="text-2xl md:text-3xl font-normal tracking-tight text-neutral-900 mb-2">{name}</h3>
                    <div className="bg-neutral-100 backdrop-blur-md text-neutral-800 text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-neutral-200 group-hover:border-orange-500/30 group-hover:text-orange-400 transition-colors w-fit mb-4">
                      {role}
                    </div>
                    
                    {/* Bio expands on hover */}
                    <div className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <Paragraph text={bio} className="text-sm line-clamp-3 md:line-clamp-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
