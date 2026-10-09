import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence, LayoutGroup, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, AlertCircle, Target, Zap, ShieldCheck, Cpu, HeartPulse, Car, Radio, ArrowRight, ArrowLeft, Lightbulb, PenTool, CheckSquare, Rocket, ChevronDown, ChevronLeft, ChevronRight, Mail, X, Crosshair, Star } from 'lucide-react';
import CommonCTA from './CommonCTA';
import SectionHeading from './SectionHeading';
import Paragraph, { AnimatedText } from './Paragraph';

const PREMIUM_EASE = [0.22, 1, 0.36, 1];

const PremiumTextReveal = ({ text, className, isParagraph = false }) => {
    const MotionTag = isParagraph ? motion.p : motion.h2;
    const Tag = isParagraph ? "p" : "h2";

    if (!text || typeof text !== 'string') {
        return <Tag className={className}>{text}</Tag>;
    }
    const words = text.split(" ");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 }
        }
    };

    const wordVariants = {
        hidden: { opacity: 0, y: '120%', rotate: 4 },
        visible: {
            opacity: 1,
            y: 0,
            rotate: 0,
            transition: { duration: 0.8, ease: PREMIUM_EASE }
        }
    };

    return (
        <MotionTag
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className={className}
        >
            {words.map((word, index) => (
                <React.Fragment key={index}>
                    <span className="inline-block overflow-hidden relative align-bottom pb-1 pt-1">
                        <motion.span
                            variants={wordVariants}
                            className="inline-block origin-bottom-left"
                        >
                            {word}
                        </motion.span>
                    </span>
                    {index < words.length - 1 && " "}
                </React.Fragment>
            ))}
        </MotionTag>
    );
};

/* ── ServiceRow Component (Replaces ServiceCard) ──────────────── */
const ServiceRow = React.memo(({ service }) => {
    const { t } = useTranslation();

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: PREMIUM_EASE } }
    };

    return (
        <motion.div
            variants={itemVariants}
            className="group relative bg-neutral-50 border border-neutral-200 rounded-3xl p-6 md:p-8 hover:bg-bg hover:border-primary/30 hover:shadow-[0_20px_40px_-15px_rgba(244,123,32,0.15)] transition-all duration-500 overflow-hidden isolate"
        >
            {/* Subtle Gradient Glow on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />

            {/* Accent left border */}
            <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-primary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-out" />

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center relative z-10">
                <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-4 mb-3">
                        <h4 className="text-base sm:text-lg md:text-xl font-medium text-neutral-900 group-hover:text-neutral-900 transition-colors duration-300 truncate">
                            {t(`header_menu.${service.name}`, service.name)}
                        </h4>
                    </div>
                    <div className="cursor-text relative z-20">
                        <Paragraph
                            text={t(`header_menu.desc.${service.name}`, service.description)}
                            animated={false}
                            className="!text-neutral-500 group-hover:!text-neutral-700 transition-colors duration-300 select-text !max-w-none"
                        />
                    </div>
                </div>

                <div className="flex-shrink-0">
                    <Link to={service.path} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-neutral-50 hover:bg-primary border border-neutral-200 hover:border-primary transition-all duration-300 group/btn">
                        <span className="text-sm font-medium text-neutral-600 group-hover/btn:text-neutral-900 transition-colors duration-300">
                            Explore Service
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-neutral-900/50 group-hover/btn:text-neutral-900 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all duration-300" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
});
ServiceRow.displayName = 'ServiceRow';

/* ── Circuit-board SVG background pattern ─────────────────────── */
const CIRCUIT_PATTERN = `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.4'%3E%3Cpath d='M40 0v80'/%3E%3Cpath d='M0 40h80'/%3E%3Cpath d='M20 0v20h20'/%3E%3Cpath d='M60 80v-20h-20'/%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3Ccircle cx='60' cy='60' r='2'/%3E%3C/g%3E%3C/svg%3E")`;

/* ══════════════════════════════════════════════════════════════
   WhyChooseUs Component (Interactive Split-Screen Accordion)
   ══════════════════════════════════════════════════════════════ */
const WhyChooseUs = ({ categories }) => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = React.useRef(null);
    const activeCategory = categories[activeIndex];

    const handleCategoryChange = (idx) => {
        setActiveIndex(idx);
        if (sectionRef.current) {
            // Scroll to the top of the section with a comfortable offset
            const y = sectionRef.current.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <section ref={sectionRef} className="relative bg-bg pt-12 lg:pt-16 pb-4 lg:pb-8 px-[4%] md:px-[5%]">
            {/* Background elements wrapped in overflow-hidden to prevent horizontal scrolling without breaking sticky */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.012]"
                    style={{ backgroundImage: CIRCUIT_PATTERN, backgroundSize: '80px 80px' }}
                />
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-primary/[0.02] blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.15 }
                    }
                }}
                className="relative z-10 w-full mx-auto"
            >
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20">

                    {/* Left Sticky Column */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 40 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: PREMIUM_EASE } }
                        }}
                        className="w-full lg:w-[320px] xl:w-[380px] 2xl:w-[420px] flex-shrink-0 flex flex-col lg:sticky lg:top-32 h-fit"
                    >
                        <SectionHeading
                            titlePart1={t("industries_layout.core", "Core")}
                            titlePart2={t("industries_layout.capabilities", "Capabilities")}
                            className="!mb-6"
                        />

                        <div className="flex flex-col gap-3 mt-4">
                            {categories.map((cat, idx) => (
                                <button
                                    key={cat.name}
                                    onClick={() => handleCategoryChange(idx)}
                                    className={`relative flex items-center justify-between p-4 md:p-5 rounded-2xl transition-all duration-300 text-left overflow-hidden group ${activeIndex === idx ? 'bg-bg/[0.03] border border-white/[0.08]' : 'bg-transparent border border-transparent hover:bg-neutral-50'
                                        }`}
                                >
                                    {activeIndex === idx && (
                                        <motion.div
                                            layoutId="activeCategoryBg"
                                            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none"
                                        />
                                    )}

                                    <div className="relative z-10 flex flex-col gap-1">
                                        <span className={`text-base md:text-lg font-medium transition-colors duration-300 ${activeIndex === idx ? 'text-neutral-900' : 'text-neutral-900/40 group-hover:text-neutral-600'
                                            }`} style={{ whiteSpace: 'nowrap' }}>
                                            {t(`header_menu.${cat.name}`, cat.name)}
                                        </span>
                                        <span className={`text-xs uppercase tracking-wider font-semibold transition-colors duration-300 ${activeIndex === idx ? 'text-primary' : 'text-transparent'
                                            }`}>
                                            Services
                                        </span>
                                    </div>

                                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeIndex === idx ? 'bg-primary shadow-[0_0_15px_rgba(244,123,32,0.3)]' : 'bg-neutral-50 group-hover:bg-neutral-100'
                                        }`}>
                                        <ArrowUpRight className={`w-4 h-4 transition-all duration-300 ${activeIndex === idx ? 'text-neutral-900 rotate-45 scale-110' : 'text-neutral-900/30'
                                            }`} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Scrollable Content Column */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 60 },
                            visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: PREMIUM_EASE } }
                        }}
                        className="w-full flex-1 min-w-0"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: {
                                        opacity: 1, y: 0,
                                        transition: { staggerChildren: 0.1, delayChildren: 0.1, duration: 0.6, ease: PREMIUM_EASE }
                                    },
                                    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: PREMIUM_EASE } }
                                }}
                                className="flex flex-col gap-5"
                            >
                                {activeCategory.links.map((service) => (
                                    <ServiceRow key={service.name} service={service} />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                </div>
            </motion.div>
        </section>
    );
};

/* ══════════════════════════════════════════════════════════════
   IndustryChallenge Component
   ══════════════════════════════════════════════════════════════ */
const defaultChallenge = {
    title: "Navigating Complexity in a Fast-Paced Market",
    description: "Today's engineering landscape is more demanding than ever. Companies face immense pressure to deliver flawless products while balancing tight deadlines, scaling architecture, and meeting stringent international safety regulations.",
    points: [
        {
            title: "Regulatory & Safety Compliance",
            description: "Meeting rigorous international standards and functional safety requirements without delaying critical launch cycles."
        },
        {
            title: "Complex Systems Integration",
            description: "Seamlessly combining hardware, firmware, and software into a unified architecture that operates flawlessly under stress."
        },
        {
            title: "Accelerated Time-to-Market",
            description: "Remaining competitive requires drastically faster development iterations without compromising on precision or product quality."
        }
    ]
};

const IndustryChallenge = ({ challenge = defaultChallenge, pageKey }) => {
    const { t } = useTranslation();
    if (!challenge) return null;

    const tVal = (key, fallback) => pageKey ? t(`industries_pages.${pageKey}.challenge.${key}`, fallback) : fallback;

    return (
        <section className="relative bg-bg pt-20 lg:pt-28 pb-10 lg:pb-16 px-[4%] md:px-[5%] overflow-hidden">
            {/* Soft background accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.02] blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-500/[0.02] blur-[120px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4" />

            <div className="relative z-10 w-full max-w-7xl mx-auto">

                {/* Header Section (Centered) */}
                <div className="flex flex-col items-center text-center mb-16 lg:mb-24">


                    <PremiumTextReveal
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-neutral-900 leading-[1.1] tracking-tight mb-8 max-w-4xl"
                        text={tVal('title', challenge.title)}
                    />

                    <motion.div
                        className="max-w-2xl"
                    >
                        <PremiumTextReveal
                            isParagraph={true}
                            text={tVal('description', challenge.description)}
                            className="text-neutral-500 text-center max-w-none text-base md:text-lg leading-relaxed"
                        />
                    </motion.div>
                </div>

                {/* Challenge Points — Premium Modern Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {challenge.points.map((point, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -150 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: 0.2 + (idx * 0.15), duration: 0.8, ease: PREMIUM_EASE }}
                            className="group relative p-8 md:p-10 rounded-[2rem] bg-neutral-50 border border-neutral-100 hover:bg-bg hover:border-primary/20 hover:shadow-[0_20px_40px_-15px_rgba(244,123,32,0.1)] transition-all duration-500 overflow-hidden flex flex-col"
                        >
                            {/* Decorative top accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:from-primary/10 group-hover:via-primary/40 group-hover:to-transparent transition-all duration-700" />



                            <h4 className="text-xl md:text-2xl font-medium text-neutral-900 mb-4 group-hover:text-primary transition-colors duration-300 tracking-tight">
                                {tVal(`points.${idx}.title`, point.title)}
                            </h4>
                            <div className="mt-auto">
                                <Paragraph
                                    text={tVal(`points.${idx}.description`, point.description)}
                                    className="!text-neutral-500 !max-w-none"
                                    animated={false}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>



            </div>
        </section>
    );
};

/* ══════════════════════════════════════════════════════════════
   IndustryApproach Component
   ══════════════════════════════════════════════════════════════ */
const iconMap = {
    Target: <Target className="w-8 h-8 text-primary" />,
    Zap: <Zap className="w-8 h-8 text-primary" />,
    ShieldCheck: <ShieldCheck className="w-8 h-8 text-primary" />,
    Cpu: <Cpu className="w-8 h-8 text-primary" />,
    HeartPulse: <HeartPulse className="w-8 h-8 text-primary" />,
    Car: <Car className="w-8 h-8 text-primary" />,
    Radio: <Radio className="w-8 h-8 text-primary" />
};

const defaultApproach = [
    {
        icon: "Target",
        title: "Precision Engineering",
        description: "We deliver exact, mission-critical solutions tailored to the unique regulatory and technical demands of the industry."
    },
    {
        icon: "Zap",
        title: "Accelerated Innovation",
        description: "Leveraging our deep tech expertise to drastically reduce time-to-market without compromising on quality or performance."
    },
    {
        icon: "ShieldCheck",
        title: "Uncompromising Reliability",
        description: "Built for scale and endurance, ensuring our hardware and software systems operate flawlessly in the most demanding environments."
    }
];

const IndustryApproach = ({ approach = defaultApproach, pageKey }) => {
    const { t } = useTranslation();
    if (!approach || approach.length === 0) return null;

    const tVal = (idx, key, fallback) => pageKey ? t(`industries_pages.${pageKey}.approach.${idx}.${key}`, fallback) : fallback;

    const containerRef = useRef(null);

    // Map scroll progress when the section enters the viewport
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 85%", "center center"]
    });

    // Add spring physics for smooth scrubbing
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 20,
        restDelta: 0.001
    });

    return (
        <section ref={containerRef} className="relative bg-bg border-t border-neutral-100 py-20 lg:py-32 px-4 sm:px-6 md:px-[5%] overflow-hidden">
            <div className="relative z-10 w-full mx-auto flex flex-col justify-center">

                <div className="w-full flex justify-start items-start text-left mb-12 md:mb-16">
                    <div className="w-full text-left flex justify-start">
                        <SectionHeading
                            titlePart1="How we deliver"
                            titlePart2="excellence."
                            className="mb-0 w-full"
                        />
                    </div>
                </div>

                {/* Right Side: Animated Cards */}
                <div className="w-full flex flex-col gap-6 md:gap-8 relative">
                    {approach.map((item, idx) => {
                        const isFirst = idx === 0;
                        const isLast = idx === approach.length - 1;
                        const isMiddle = !isFirst && !isLast;

                        // First card moves DOWN (115%) to hide behind middle card
                        // Last card moves UP (-115%) to hide behind middle card
                        const yStart = isFirst ? "115%" : isLast ? "-115%" : "0%";

                        // Middle card scales slightly, others scale from 0.8
                        const scaleStart = isMiddle ? 0.95 : 0.8;

                        // Middle card is partially visible at start, others are invisible
                        const opacityStart = isMiddle ? 0.4 : 0;

                        const y = useTransform(smoothProgress, [0.1, 0.9], [yStart, "0%"]);
                        const scale = useTransform(smoothProgress, [0.1, 0.9], [scaleStart, 1]);
                        const opacity = useTransform(smoothProgress, [0.1, 0.8], [opacityStart, 1]);

                        return (
                            <motion.div
                                key={idx}
                                style={{
                                    y,
                                    scale,
                                    opacity,
                                    zIndex: isMiddle ? 20 : 10,
                                    transformOrigin: "center center"
                                }}
                                className="w-full relative"
                            >
                                <div className="group w-full flex flex-col md:flex-row items-start md:items-center gap-8 lg:gap-12 p-8 lg:p-10 rounded-[2rem] bg-bg border border-neutral-200/60 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(244,123,32,0.12)] hover:border-neutral-200 transition-colors duration-500 overflow-hidden">
                                    <div className="flex-grow flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-12 w-full">
                                        <h3 className="text-xl md:text-2xl font-medium text-neutral-900 lg:w-1/3 transition-colors duration-300 tracking-tight">
                                            {tVal(idx, 'title', item.title)}
                                        </h3>

                                        <div className="lg:w-2/3 border-l-0 lg:border-l border-neutral-100 lg:pl-12">
                                            <Paragraph
                                                text={tVal(idx, 'description', item.description)}
                                                className="!text-neutral-500 !max-w-none"
                                                animated={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};


/* ══════════════════════════════════════════════════════════════
   IndustryTestimonial Component (Glassmorphism Grid)
   ══════════════════════════════════════════════════════════════ */
const defaultTestimonials = [
    {
        quote: "UANDWE delivered exceptional engineering talent that seamlessly integrated with our core team. Their dedication to quality and deep domain expertise accelerated our product roadmap by six months.",
        author: "Michael Chang",
        title: "VP of Engineering, Global Tech Corp"
    },
    {
        quote: "The level of professionalism and technical depth is outstanding. They don't just write code; they architect robust solutions that scale gracefully under pressure.",
        author: "Elena Rostova",
        title: "CTO, InnovateX"
    }
];

const IndustryTestimonial = ({ testimonials = defaultTestimonials, pageKey }) => {
    const { t } = useTranslation();
    if (!testimonials || testimonials.length === 0) return null;

    const tVal = (idx, key, fallback) => pageKey ? t(`industries_pages.${pageKey}.testimonials.${idx}.${key}`, fallback) : fallback;

    return (
        <section className="relative bg-bg py-12 lg:py-16 px-[4%] md:px-[5%] overflow-hidden">
            {/* Ambient Background Blur */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/[0.02] blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />

            <div className="relative z-10 w-full mx-auto">
                <SectionHeading titlePart1={t("industries_layout.client", "Client")} titlePart2={t("industries_layout.success_stories", "Success Stories")} className="mb-12 md:mb-20" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {testimonials.map((testimonial, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.15, duration: 0.8, ease: PREMIUM_EASE }}
                            className="group relative flex flex-col justify-between p-8 md:p-10 rounded-3xl bg-bg/[0.015] border border-neutral-200 hover:border-primary/30 hover:bg-bg/[0.03] transition-all duration-500 overflow-hidden isolate"
                        >
                            {/* Hover Glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

                            {/* Top Accent Line */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary transition-all duration-700" />

                            <div className="relative z-10 flex flex-col flex-grow">
                                <div className="flex gap-1 mb-6 relative z-10">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-primary" fill="currentColor" />
                                    ))}
                                </div>

                                <h3 className="relative z-10 text-xs sm:text-sm md:text-[14px] lg:text-[15px] xl:text-base font-medium leading-relaxed text-neutral-700 group-hover:text-neutral-900 transition-colors duration-300 mb-10">
                                    "{tVal(idx, 'quote', testimonial.quote)}"
                                </h3>
                            </div>

                            <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-neutral-200 group-hover:border-primary/20 transition-colors duration-500 mt-auto">
                                <div className="w-12 h-12 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-200 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500 flex-shrink-0">
                                    <span className="text-neutral-900 group-hover:text-primary font-medium text-lg transition-colors duration-500">
                                        {testimonial.author.charAt(0)}
                                    </span>
                                </div>
                                <div className="flex-grow min-w-0">
                                    <h5 className="text-base font-medium text-neutral-900 mb-0.5 tracking-tight group-hover:text-primary transition-colors duration-500 truncate">
                                        {tVal(idx, 'author', testimonial.author)}
                                    </h5>
                                    <p className="text-xs font-medium text-neutral-900/40 uppercase tracking-wider truncate">
                                        {tVal(idx, 'title', testimonial.title)}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ══════════════════════════════════════════════════════════════
   IndustryExperts Component
   ══════════════════════════════════════════════════════════════ */
const defaultExperts = [
    {
        name: "Dr. Alan Turing",
        role: "Chief Systems Architect",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
        bio: "20+ years of deep tech experience leading architecture for next-generation platforms."
    },
    {
        name: "Sarah Connor",
        role: "Head of Engineering",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
        bio: "Specialist in agile deployment and scaling robust teams for mission-critical applications."
    }
];

const IndustryExperts = ({ experts = defaultExperts, pageKey }) => {
    const { t } = useTranslation();
    if (!experts || experts.length === 0) return null;

    const tVal = (idx, key, fallback) => pageKey ? t(`industries_pages.${pageKey}.experts.${idx}.${key}`, fallback) : fallback;

    return (
        <section className="pt-8 pb-16 px-[4%] md:px-[5%] w-full mx-auto relative z-10 bg-bg">
            <div className="flex flex-col gap-8 mb-12 items-start text-left w-full">
                <div className="w-full">
                    <SectionHeading
                        titlePart1={t("industries_layout.our", "Our")}
                        titlePart2={t("industries_layout.experts", "Experts")}
                        className="mb-0"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {experts.map((expert, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: PREMIUM_EASE }}
                        className="group relative flex flex-col items-center bg-neutral-50 border border-neutral-200 rounded-3xl p-6 hover:border-primary/30 transition-all duration-300 hover:bg-bg/[0.04]"
                    >
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 border-4 border-white/5 group-hover:border-primary/50 transition-colors shadow-2xl">
                            <img src={expert.image} alt={expert.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110" />
                        </div>
                        <h3 className="text-xl font-normal text-neutral-900 mb-2 text-center">{tVal(i, 'name', expert.name)}</h3>
                        <p className="text-primary text-sm mb-4 tracking-wide uppercase text-center">{tVal(i, 'role', expert.role)}</p>
                        <p className="text-neutral-500 text-sm text-center leading-relaxed">{tVal(i, 'bio', expert.bio || expert.description)}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};





/* ══════════════════════════════════════════════════════════════
   IndustryCaseStudies Component (Stacked Carousel)
   ══════════════════════════════════════════════════════════════ */
const IndustryCaseStudies = ({ caseStudies, pageKey }) => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!caseStudies || caseStudies.length === 0) return null;

    const nextSlide = () => setCurrentIndex((prev) => (prev === caseStudies.length - 1 ? prev : prev + 1));
    const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? prev : prev - 1));

    return (
        <section className="relative bg-bg pt-6 lg:pt-8 pb-12 lg:pb-16 px-[4%] md:px-[5%] overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.02] blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />

            <div className="relative z-10 w-full max-w-7xl mx-auto">
                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
                    <div>
                        <SectionHeading
                            titlePart1={t("industries_layout.featured", "Featured")}
                            titlePart2={t("industries_layout.case_studies", "Case Studies")}
                            className="mb-0"
                        />
                    </div>

                    <div className="flex items-center gap-4 bg-transparent p-1 rounded-xl">
                        <button
                            onClick={prevSlide}
                            disabled={currentIndex === 0}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${currentIndex === 0 ? 'bg-neutral-900/5 cursor-not-allowed opacity-50' : 'bg-[#111827] hover:bg-black'}`}
                        >
                            <ChevronLeft className={`w-5 h-5 ${currentIndex === 0 ? 'text-neutral-500' : 'text-white'}`} />
                        </button>
                        <span className="text-neutral-900 font-medium text-sm tracking-wide min-w-[3rem] text-center">
                            {currentIndex + 1} / {caseStudies.length}
                        </span>
                        <button
                            onClick={nextSlide}
                            disabled={currentIndex === caseStudies.length - 1}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${currentIndex === caseStudies.length - 1 ? 'bg-neutral-900/5 cursor-not-allowed opacity-50' : 'bg-[#111827] hover:bg-black'}`}
                        >
                            <ChevronRight className={`w-5 h-5 ${currentIndex === caseStudies.length - 1 ? 'text-neutral-500' : 'text-white'}`} />
                        </button>
                    </div>
                </div>

                {/* Stacked Carousel */}
                <div className="relative w-full h-[600px] md:h-[500px] lg:h-[540px] flex items-center mt-4">
                    <AnimatePresence initial={false}>
                        {caseStudies.map((study, idx) => {
                            // Calculate relative stack position without looping
                            let offset = idx - currentIndex;

                            const isPast = offset < 0;
                            const isFront = offset === 0;

                            // Only render top 3 cards in the stack, plus the immediately discarded card for smooth exit animation
                            const isVisible = offset >= 0 && offset < 3;
                            if (!isVisible && offset !== -1) return null;

                            // Animation values based on state
                            let zIndex = 30 - offset * 10;
                            let scale = 1 - offset * 0.04;
                            let x = offset * 40; // Push each behind card 40px to the right
                            let opacity = isVisible ? 1 : 0;

                            if (isPast) {
                                zIndex = 40; // Past card slides over the top
                                scale = 1.05; // Slightly larger as it comes towards camera
                                x = -100; // Slide left
                                opacity = 0; // Fade out
                            }

                            return (
                                <motion.div
                                    key={idx}
                                    initial={false}
                                    animate={{
                                        scale,
                                        x,
                                        opacity,
                                        zIndex
                                    }}
                                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                                    className="absolute left-0 top-0 w-full md:w-[calc(100%-40px)] lg:w-[calc(100%-80px)] h-full flex flex-col md:flex-row rounded-[2rem] overflow-hidden bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-neutral-100"
                                    style={{
                                        transformOrigin: 'right center'
                                    }}
                                >
                                    {/* Overlay for depth shading on background cards */}
                                    {!isFront && !isPast && (
                                        <div
                                            className="absolute inset-0 bg-[#0f172a] rounded-[2rem] z-50 pointer-events-none transition-opacity duration-600"
                                            style={{ opacity: offset * 0.05 }}
                                        />
                                    )}

                                    {/* Left Image */}
                                    <div className="w-full md:w-[50%] lg:w-[55%] h-56 md:h-full relative overflow-hidden bg-neutral-100 flex-shrink-0">
                                        <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Right Content */}
                                    <div className="w-full md:w-[50%] lg:w-[45%] p-8 lg:p-14 flex flex-col justify-center bg-white relative">
                                        <div className="inline-flex px-3 py-1 bg-[#1a1b26] text-white text-[11px] font-semibold tracking-wide uppercase rounded mb-8 self-start">
                                            Case Study
                                        </div>
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-neutral-900 mb-6 tracking-tight leading-snug">
                                            {study.title}
                                        </h3>
                                        <p className="text-neutral-500 text-sm md:text-base leading-relaxed mb-10 line-clamp-4">
                                            {study.challenge} {study.result}
                                        </p>

                                        <div className="mt-auto flex items-center justify-start">
                                            <button className="flex items-center gap-2 bg-[#1a1b26] hover:bg-black text-white px-6 py-3.5 rounded-lg transition-all font-medium text-sm group">
                                                Read More
                                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

const IndustryHero = ({ hero, pageKey }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="relative pt-[100px] w-full bg-[#0b0b12]">
            {/* Full-Screen Background Image */}
            {hero?.image && (
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <img
                        src={hero.image}
                        alt={hero.title}
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0b12]/40 to-[#0b0b12]"></div>
                </div>
            )}

            {/* BACK BUTTON */}
            <div className="w-full px-[4%] md:px-[5%] flex justify-start mb-4 relative z-50">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center p-2.5 md:p-3 bg-bg/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-bg/20 transition-colors text-white shadow-lg"
                >
                    <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                </button>
            </div>

            {/* HERO SECTION */}
            <section className="relative px-[4%] md:px-[5%] min-h-[calc(100vh-150px)] flex flex-col items-center justify-center text-center pb-12 lg:pb-24 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-5xl mx-auto"
                >
                    <SectionHeading
                        titlePart1={pageKey ? t(`industries.${pageKey}.hero.title`, hero?.title) : hero?.title}
                        className="!mb-6 [&_h2]:!text-[clamp(20px,6vw,32px)] [&_h2]:sm:!text-4xl [&_h2]:md:!text-4xl [&_h2]:lg:!text-5xl [&_h2]:xl:!text-5xl [&_h2]:2xl:!text-6xl [&_h2]:min-[1920px]:!text-[80px] [&_h2]:min-[2560px]:!text-[100px] [&_h2]:!font-black [&_h2]:!text-white [&_h2>span]:!text-white [&_h2]:!text-center flex justify-center drop-shadow-2xl"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-neutral-300 text-[11px] sm:text-xs md:text-[13px] lg:text-sm xl:text-[15px] 2xl:text-base min-[1920px]:text-[17px] min-[2560px]:text-lg leading-relaxed !mb-10 !max-w-3xl mx-auto font-medium drop-shadow-xl"
                    >
                        {pageKey ? t(`industries.${pageKey}.hero.description`, hero?.description) : hero?.description}
                    </motion.p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => {
                                const cta = document.getElementById('cta-section');
                                if (cta) cta.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-white hover:text-primary transition-colors w-full sm:w-auto"
                        >
                            {pageKey ? t(`industries.${pageKey}.hero.primaryButtonText`, hero?.primaryButtonText || "Explore Industries") : (hero?.primaryButtonText || "Explore Industries")}
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

/* ══════════════════════════════════════════════════════════════
   IndustriesLayout Component
   ══════════════════════════════════════════════════════════════ */
const IndustriesLayout = ({ hero, categories, approach, challenge, experts, testimonials, caseStudies, pageKey }) => {
    return (
        <div className="min-h-screen bg-bg text-neutral-900 relative">
            <IndustryHero hero={hero} pageKey={pageKey} />
            <IndustryChallenge challenge={challenge} pageKey={pageKey} />
            <IndustryApproach approach={approach} pageKey={pageKey} />
            <WhyChooseUs categories={categories} />
            <IndustryCaseStudies caseStudies={caseStudies} pageKey={pageKey} />
            <IndustryTestimonial testimonials={testimonials} pageKey={pageKey} />
            <IndustryExperts experts={experts} pageKey={pageKey} />
            <CommonCTA />
        </div>
    );
};

export default IndustriesLayout;
