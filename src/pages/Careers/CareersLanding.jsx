import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Briefcase, Heart, Compass, Shield, Users, Globe, Zap, ChevronRight } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading'; // Match typography from Home

export default function CareersLanding() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const heroRef = useRef(null);

  // Parallax effect for the hero
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityText = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="bg-white min-h-screen text-neutral-900 font-sans selection:bg-orange-500/30">

      {/* 1. HERO SECTION (FULL SCREEN) */}
      <section ref={heroRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Full Section Background Image with Parallax */}
        <motion.div
          style={{ y: yImage }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-[#0b0b12]/50" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity: opacityText }}
          className="relative z-10 w-full px-[4%] flex flex-col items-center text-center mt-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-500 text-xs tracking-widest uppercase"
          >
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            {t("careers.landing.badge", "Join UANDWE")}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Reusing Home Page Typography style via SectionHeading or matching classes */}
            <h1 className="leading-[1.1] tracking-tight mb-6">
              <span className="block text-neutral-900 text-[clamp(40px,8vw,80px)] lg:text-8xl xl:text-9xl mb-2 font-normal">
                {t("careers.landing.heroTitlePart1", "Shape the")}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-[clamp(40px,8vw,80px)] lg:text-8xl xl:text-9xl font-normal">
                {t("careers.landing.heroTitlePart2", "Future with Us")}
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-500 text-[clamp(16px,2vw,22px)] max-w-3xl leading-relaxed mb-12"
          >
            {t("careers.landing.heroDesc", "We're looking for passionate engineers, designers, and innovators to push the boundaries of technology.")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button
              onClick={() => navigate('/careers/jobs')}
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-orange-500 text-neutral-900 rounded-full text-lg hover:bg-orange-600 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">{t("careers.landing.heroCta", "View Open Roles")}</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>

            <button
              onClick={() => navigate('/careers/work-environment')}
              className="group inline-flex items-center gap-3 px-10 py-4 bg-neutral-50 border border-neutral-200 text-neutral-900 rounded-full text-lg hover:bg-neutral-100 hover:border-neutral-300 transition-all duration-300"
            >
              {t("careers.landing.heroSecondaryCta", "Explore Our Culture")}
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-neutral-900/30 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* PAGE CONTENT CONTAINER */}
      <div className="w-full px-[4%] space-y-40 py-32 relative z-10">

        {/* 2. THE ADVANTAGE (BENTO BOX) */}
        <section>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-16"
          >
            <SectionHeading
              titlePart1={t("careers.landing.cultureTitle", "The UANDWE")}
              titlePart2={t("careers.landing.cultureHighlight", "Advantage")}
            />
            <motion.p variants={fadeUp} className="text-neutral-500 text-xl max-w-2xl leading-relaxed font-light">
              {t("careers.landing.cultureDesc", "We are building an environment where brilliant minds thrive. No bureaucracy, just pure innovation, radical candor, and the autonomy to do your best work.")}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Bento Item 1: Large Image Feature */}
            <motion.div variants={fadeUp} className="md:col-span-2 md:row-span-2 relative rounded-[2rem] overflow-hidden group bg-neutral-50 border border-white/5 p-1 min-h-[400px]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-[#0b0b12]/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-10 z-10">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/20 backdrop-blur-md flex items-center justify-center text-orange-500 mb-6">
                  <Compass size={28} />
                </div>
                <h3 className="text-3xl font-normal mb-3">{t("careers.landing.cultureItem1", "Collaborative Innovation")}</h3>
                <p className="text-neutral-600 max-w-md font-light">{t("careers.landing.cultureItem1Desc", "Work with a global network of talent on bleeding-edge technologies.")}</p>
              </div>
            </motion.div>

            {/* Bento Item 2: Remote First */}
            <motion.div variants={fadeUp} className="rounded-[2rem] bg-neutral-50 border border-white/5 p-8 flex flex-col justify-between hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-500/10 blur-[50px] rounded-full group-hover:bg-orange-500/20 transition-all duration-500" />
              <div className="relative z-10">
                <Globe size={32} className="text-orange-500 mb-6" />
                <h4 className="text-xl font-normal mb-2">{t("careers.landing.cultureItem2", "Remote-First")}</h4>
                <p className="text-neutral-900/50 text-sm leading-relaxed font-light">{t("careers.landing.cultureItem2Desc", "Work from anywhere in the world. We value output over office hours.")}</p>
              </div>
            </motion.div>

            {/* Bento Item 3: Deep Tech */}
            <motion.div variants={fadeUp} className="rounded-[2rem] bg-neutral-50 border border-white/5 p-8 flex flex-col justify-between hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/10 blur-[50px] rounded-full group-hover:bg-blue-500/20 transition-all duration-500" />
              <div className="relative z-10">
                <Zap size={32} className="text-orange-500 mb-6" />
                <h4 className="text-xl font-normal mb-2">{t("careers.landing.cultureItem3", "Deep Tech Focus")}</h4>
                <p className="text-neutral-900/50 text-sm leading-relaxed font-light">{t("careers.landing.cultureItem3Desc", "From ASIC design to AI algorithms, solve the hardest engineering problems.")}</p>
              </div>
            </motion.div>
          </motion.div>

          <div className="mt-8">
            <button
              onClick={() => navigate('/careers/work-environment')}
              className="text-orange-500 inline-flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-widest text-sm"
            >
              {t("careers.landing.cultureLink", "Discover our work environment")} <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* 3. BENEFITS (PREMIUM CARDS) */}
        <section>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <SectionHeading
              titlePart1={t("careers.landing.benefitsTitle", "Invested in")}
              titlePart2={t("careers.landing.benefitsHighlight", "You")}
              className="!mb-6 flex justify-center"
            />
            <motion.p variants={fadeUp} className="text-neutral-500 text-xl font-light">
              {t("careers.landing.benefitsDesc", "We offer top-tier benefits so you can focus on what matters most—your life, your health, and your career.")}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: <Shield size={32} strokeWidth={1.5} />, title: t("careers.landing.benefit1Title", "Premium Health"), desc: t("careers.landing.benefit1Desc", "Top-tier medical, dental, and vision coverage for you and your dependents.") },
              { icon: <Heart size={32} strokeWidth={1.5} />, title: t("careers.landing.benefit2Title", "Mental Wellness"), desc: t("careers.landing.benefit2Desc", "Dedicated resources, therapy sessions, and wellness days for your peace of mind.") },
              { icon: <Briefcase size={32} strokeWidth={1.5} />, title: t("careers.landing.benefit3Title", "Unlimited PTO"), desc: t("careers.landing.benefit3Desc", "Take the time you need to recharge and reset. We encourage real time off.") }
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="group relative rounded-[2rem] bg-neutral-50 border border-white/5 p-10 hover:bg-white/[0.04] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                {/* Hover Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-orange-500/0 group-hover:bg-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.5)] transition-all duration-500" />

                <div className="text-neutral-900/40 group-hover:text-orange-500 transition-colors duration-500 mb-8">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-normal mb-4">{benefit.title}</h3>
                <p className="text-neutral-900/50 leading-relaxed font-light">{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 4. OPEN ROLES (MINIMALIST LIST) */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-neutral-200 pb-8">
            <div>
              <SectionHeading
                titlePart1={t("careers.landing.jobsTitle", "Open")}
                titlePart2={t("careers.landing.jobsHighlight", "Roles")}
                className="!mb-4"
              />
              <p className="text-neutral-500 text-lg max-w-xl font-light">
                {t("careers.landing.jobsDesc", "Join us in building the next generation of hardware and software solutions.")}
              </p>
            </div>
            <button
              onClick={() => navigate('/careers/jobs')}
              className="hidden md:inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors uppercase tracking-widest text-sm"
            >
              {t("careers.landing.viewAllJobs", "View all roles")} <ArrowRight size={16} />
            </button>
          </div>

          <div className="flex flex-col">
            {[
              { title: "Senior Embedded Software Engineer", dept: "Embedded Systems", type: "Full-Time", location: "Remote / Hybrid" },
              { title: "Hardware Design Lead", dept: "Hardware", type: "Full-Time", location: "On-Site" },
              { title: "Full Stack Developer (React/Node)", dept: "Software Engineering", type: "Full-Time", location: "Remote" },
            ].map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                onClick={() => navigate('/careers/jobs')}
                className="group flex flex-col sm:flex-row justify-between items-start sm:items-center py-8 border-b border-white/5 hover:border-orange-500/30 cursor-pointer transition-colors duration-300 relative"
              >
                {/* Subtle row highlight */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 w-full sm:w-1/3 mb-4 sm:mb-0">
                  <span className="text-orange-500/80 text-xs uppercase tracking-widest">{job.dept}</span>
                  <h3 className="text-2xl font-normal text-neutral-900 mt-2 group-hover:text-orange-500 transition-colors">{job.title}</h3>
                </div>

                <div className="relative z-10 flex gap-12 w-full sm:w-1/3">
                  <div className="flex flex-col gap-1 text-neutral-900/50 text-sm font-light">
                    <span className="text-neutral-900/30 uppercase text-[10px] tracking-wider font-normal">Type</span>
                    <span>{job.type}</span>
                  </div>
                  <div className="flex flex-col gap-1 text-neutral-900/50 text-sm font-light">
                    <span className="text-neutral-900/30 uppercase text-[10px] tracking-wider font-normal">Location</span>
                    <span>{job.location}</span>
                  </div>
                </div>

                <div className="relative z-10 hidden sm:flex justify-end w-full sm:w-1/3 overflow-hidden">
                  <div className="flex items-center gap-4 text-neutral-900/40 group-hover:text-neutral-900 transition-colors duration-300 translate-x-8 group-hover:translate-x-0">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-light">View Role</span>
                    <div className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-orange-500 group-hover:bg-orange-500 transition-all duration-300">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="md:hidden text-center mt-12">
            <button
              onClick={() => navigate('/careers/jobs')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-50 border border-neutral-200 rounded-full text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              {t("careers.landing.viewAllJobs", "View all roles")} <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* 5. MASSIVE CTA (REFINED) */}
        <section className="pb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-3xl p-8 md:p-12 text-center overflow-hidden border border-neutral-200 bg-[#12121a]"
          >
            {/* Inner Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&auto=format&fit=crop&q=80')] opacity-5 mix-blend-screen bg-cover bg-center pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <SectionHeading
                titlePart1={t("careers.landing.ctaTitle", "Ready to make an impact?")}
                titlePart2=""
                className="!mb-6"
                titleClassName="text-2xl md:text-3xl font-normal text-neutral-900"
              />
              <p className="text-neutral-500 text-sm md:text-base mb-6 max-w-2xl font-light">
                {t("careers.landing.ctaDesc", "We're constantly looking for top talent. Even if you don't see a perfect role right now, we'd love to hear from you.")}
              </p>

              <button
                onClick={() => navigate('/careers/jobs')}
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,107,26,0.3)] overflow-hidden"
              >
                <span className="relative z-10">{t("careers.landing.ctaButton", "Browse Open Roles")}</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </button>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
