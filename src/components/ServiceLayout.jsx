import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, ArrowUpRight, ArrowDown, ArrowRight, Plus, Minus, ChevronDown, X, Users, Target, Clock, CheckCircle2, ShieldCheck, Cpu, Zap, Activity, TrendingUp, Sparkles, Award, Star, Quote } from 'lucide-react';
import SectionHeading from './SectionHeading';
import CommonCTA from './CommonCTA';
import Paragraph from './Paragraph';
// Paragraph removed

const PREMIUM_EASE = [0.22, 1, 0.36, 1];

// Slide variants for the feature-group horizontal swap
const groupSlideVariants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

const CinematicPortalSequence = ({
    portalImage,
    gridImage,
    collageImages,
    features,
    featureGroups, // Array of { label, features: [...6 items] }
    aboutText,
    hideTitle
}) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 250,
        damping: 30,
        restDelta: 0.001
    });

    // Parallax Collage scales (0% - 15%)
    const scale4 = useTransform(smoothProgress, [0, 0.15], [1, 4]);
    const scale5 = useTransform(smoothProgress, [0, 0.15], [1, 5]);
    const scale6 = useTransform(smoothProgress, [0, 0.15], [1, 6]);
    const scale8 = useTransform(smoothProgress, [0, 0.15], [1, 8]);
    const scale9 = useTransform(smoothProgress, [0, 0.15], [1, 9]);
    const parallaxOpacity = useTransform(smoothProgress, [0.10, 0.15], [1, 0]);

    // Stage 1 (0%–15%) & Stage 2 (15%-25%) — Shrink to left and hold
    // Main image starts centered at 25vw/25vh
    const cardWidth = useTransform(smoothProgress, [0, 0.15, 0.25, 0.40], ["25vw", "40vw", "40vw", "92vw"]);
    const cardHeight = useTransform(smoothProgress, [0, 0.15, 0.25, 0.40], ["25vh", "70vh", "70vh", "60vh"]);

    const cardLeft = useTransform(smoothProgress, [0, 0.15, 0.25, 0.40], ["37.5vw", "4vw", "4vw", "4vw"]);
    const cardTop = useTransform(smoothProgress, [0, 0.15, 0.25, 0.40], ["37.5vh", "15vh", "15vh", "28vh"]);
    const cardRadius = useTransform(smoothProgress, [0, 0.15], ["0px", "24px"]);

    // Stage 3 (25%–40%) — Shared 3D Transition
    const cardRotateY = useTransform(smoothProgress, [0.25, 0.40], [0, 180]);
    const cardZ = useTransform(smoothProgress, [0.25, 0.325, 0.40], ["0px", "100px", "0px"]);

    // Stage 4 (40%–50%) — Landing
    const cardScale = useTransform(smoothProgress, [0, 0.25, 0.40, 0.50], [1, 1, 1.15, 1]);
    const cardY = useTransform(smoothProgress, [0, 0.25, 0.40, 0.50], ["0px", "0px", "-40px", "0px"]);
    const cardShadow = useTransform(smoothProgress, [0, 0.25, 0.40, 0.50], [
        "0px 0px 0px rgba(0,0,0,0)",
        "0px 20px 50px rgba(0,0,0,0.5)",
        "0px 60px 120px rgba(0,0,0,0.8)",
        "0px 20px 50px rgba(0,0,0,0.5)"
    ]);

    // Stage 5 (50%) — Instant Grid Morph (Eliminates alpha-blend blinking)
    const cardOpacity = useTransform(smoothProgress, [0.499, 0.50], [1, 0]);
    const gridOpacity = useTransform(smoothProgress, [0.499, 0.50], [0, 1]);

    // Stage 6 (55%–75%) — Split Animation
    const splitProgress = useTransform(smoothProgress, [0.55, 0.75], [0, 1]); // 0=joined, 1=split

    // Smoothly fade the borders during the split so there's no sudden flash of lines
    const sliceBorderOpacity = useTransform(splitProgress, [0, 0.05], [0, 1]);
    const outerBorderOpacity = useTransform(splitProgress, [0, 0.05], [1, 0]);

    // Stage 7 (75%–100%) — Card Flip
    const featureFlip = useTransform(smoothProgress, [0.75, 1.0], [0, 180]);

    // About Text Fading (Hidden during parallax collage, fades in at end, fades out before flip)
    const aboutOpacity = useTransform(smoothProgress, [0, 0.10, 0.15, 0.25, 0.30], [0, 0, 1, 1, 0]);

    const bgPositions = ["0% 0%", "50% 0%", "100% 0%", "0% 100%", "50% 100%", "100% 100%"];

    // ── Feature Group Sliding (VLSI → Embedded → Hardware) ──
    const hasGroups = featureGroups && featureGroups.length > 1;
    const [activeGroupIdx, setActiveGroupIdx] = useState(0);
    const [slideDir, setSlideDir] = useState(1);
    const [flipDone, setFlipDone] = useState(false);

    // Detect when the card flip animation finishes (scrollYProgress > 0.95)
    useMotionValueEvent(smoothProgress, 'change', (v) => {
        setFlipDone(v > 0.95);
    });

    const goToGroup = useCallback((idx) => {
        setSlideDir(idx > activeGroupIdx ? 1 : -1);
        setActiveGroupIdx(idx);
    }, [activeGroupIdx]);

    const nextGroup = useCallback(() => {
        if (!hasGroups) return;
        setSlideDir(1);
        setActiveGroupIdx((prev) => (prev < featureGroups.length - 1 ? prev + 1 : 0));
    }, [hasGroups, featureGroups]);

    const prevGroup = useCallback(() => {
        if (!hasGroups) return;
        setSlideDir(-1);
        setActiveGroupIdx((prev) => (prev > 0 ? prev - 1 : featureGroups.length - 1));
    }, [hasGroups, featureGroups]);

    // Resolve which features to show right now
    const activeFeatures = hasGroups ? featureGroups[activeGroupIdx].features : features;

    // Map the incoming scaleIndex to actual scale transform variables
    const scales = {
        4: scale4,
        5: scale5,
        6: scale6,
        8: scale8,
        9: scale9
    };

    return (
        <section ref={containerRef} className="h-[300vh] relative bg-bg">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden perspective-[2000px]">

                <style>{`
                  .preserve-3d { transform-style: preserve-3d; }
                  .backface-hidden { backface-visibility: hidden; }
                `}</style>

                <div className="relative w-full h-full max-w-[100vw] flex justify-center">

                    {/* ABOUT TEXT */}
                    <motion.div
                        style={{ opacity: aboutOpacity }}
                        className="absolute top-0 right-[4vw] w-[48vw] h-full flex flex-col justify-center z-0"
                    >
                        {aboutText}
                    </motion.div>

                    {/* TITLE + GROUP TABS */}
                    <motion.div
                        style={{ opacity: gridOpacity }}
                        className="absolute top-[2vh] sm:top-[4vh] left-[4vw] right-[4vw] z-40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                    >
                        {!hideTitle && (
                            <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-normal text-neutral-900 tracking-tight leading-tight whitespace-nowrap text-left">
                                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Us</span>
                            </h2>
                        )}

                        {/* GROUP TAB PILLS – only visible after flip completes */}
                        {hasGroups && flipDone && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-200 backdrop-blur-md p-1 rounded-full overflow-x-auto"
                            >
                                {featureGroups.map((group, idx) => (
                                    <button
                                        key={group.label}
                                        onClick={() => goToGroup(idx)}
                                        className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap ${idx === activeGroupIdx
                                            ? 'bg-primary text-white shadow-[0_0_20px_rgba(244, 123, 32,0.45)] scale-105'
                                            : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                                            }`}
                                    >
                                        {group.label}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>

                    {/* GROUP SLIDE ARROWS – only visible after flip */}
                    {hasGroups && flipDone && (
                        <>
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={prevGroup}
                                className="absolute left-[1vw] top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full border border-neutral-300 bg-bg/60 backdrop-blur-md text-neutral-900 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-2xl"
                                aria-label="Previous group"
                            >
                                <ChevronLeft size={22} />
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={nextGroup}
                                className="absolute right-[1vw] top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full border border-neutral-300 bg-bg/60 backdrop-blur-md text-neutral-900 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center shadow-2xl"
                                aria-label="Next group"
                            >
                                <ChevronRight size={22} />
                            </motion.button>
                        </>
                    )}

                    {/* PARALLAX COLLAGE */}
                    {collageImages && collageImages.map((img, i) => (
                        <motion.div
                            key={i}
                            style={{ scale: scales[img.scaleIndex] || scale4, opacity: parallaxOpacity }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                        >
                            <div className={`relative ${img.cls}`}>
                                <img src={img.src} alt="Parallax collage" className="h-full w-full object-cover rounded-xl" />
                            </div>
                        </motion.div>
                    ))}

                    {/* TRANSITION CARD */}
                    <motion.div
                        className="absolute z-20 preserve-3d"
                        style={{
                            width: cardWidth,
                            height: cardHeight,
                            top: cardTop,
                            left: cardLeft,
                            borderRadius: cardRadius,
                            rotateY: cardRotateY,
                            z: cardZ,
                            y: cardY,
                            scale: cardScale,
                            opacity: cardOpacity,
                            boxShadow: cardShadow,
                            transformOrigin: "center center"
                        }}
                    >
                        {/* Front: Portal Image */}
                        <div className="absolute inset-0 backface-hidden rounded-[inherit] overflow-hidden bg-bg">
                            <div className="absolute inset-0 border border-neutral-200 rounded-[inherit] z-20 pointer-events-none" />
                            <img
                                src={portalImage}
                                alt="Portal"
                                className="w-full h-full object-cover object-center"
                            />
                        </div>

                        {/* Back: Unified Grid Image */}
                        <motion.div
                            className="absolute inset-0 backface-hidden rounded-[inherit] overflow-hidden bg-bg"
                            style={{ rotateY: 180 }}
                        >
                            <div className="absolute inset-0 border border-neutral-200 rounded-[inherit] z-20 pointer-events-none" />
                            <div
                                className="w-full h-full"
                                style={{ backgroundImage: `url('${gridImage}')`, backgroundSize: "100% 100%", backgroundPosition: "center" }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* ACTUAL GRID (Crossfades in perfectly replacing the transition card) */}
                    <motion.div
                        style={{ opacity: gridOpacity, top: cardTop, left: cardLeft, width: "92vw", height: "60vh" }}
                        className="absolute z-30 overflow-hidden"
                    >
                        {/* When flipDone + hasGroups → use AnimatePresence horizontal slide between groups */}
                        {hasGroups && flipDone ? (
                            <AnimatePresence custom={slideDir} mode="wait">
                                <motion.div
                                    key={activeGroupIdx}
                                    custom={slideDir}
                                    variants={groupSlideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                    className="grid grid-cols-3 grid-rows-2 gap-4 md:gap-6 w-full h-full relative"
                                >
                                    {activeFeatures && activeFeatures.map((feature, i) => (
                                        <div key={feature.id + '-' + activeGroupIdx} className="relative w-full h-full rounded-[24px] bg-bg border border-neutral-200 p-2 sm:p-6 md:p-8 flex flex-col justify-end shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden hover:border-primary/50 transition-colors duration-300 group">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/0 to-primary/10 opacity-50 rounded-[inherit]" />
                                            <div className="relative z-10">
                                                <h3 className="text-[clamp(1rem,2vw,1.5rem)] font-normal text-neutral-900 mb-2 md:mb-4 tracking-tight leading-tight group-hover:text-primary transition-colors">{feature.title}</h3>
                                                <p className="text-neutral-500 text-xs sm:text-sm md:text-base hidden sm:block">{feature.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            /* Default scroll-driven split & flip grid (original behavior) */
                            <div className="grid grid-cols-3 grid-rows-2 gap-0 [--split-x:16px] md:[--split-x:32px] [--split-y:16px] md:[--split-y:32px] w-full h-full relative">
                                {/* Seamless outer border that perfectly matches the transition card */}
                                <motion.div style={{ opacity: outerBorderOpacity }} className="absolute inset-0 border border-neutral-200 rounded-[24px] pointer-events-none z-40" />

                                {activeFeatures && activeFeatures.map((feature, i) => {
                                    const col = i % 3;
                                    const row = Math.floor(i / 3);
                                    const xMultiplier = col === 0 ? -1 : col === 2 ? 1 : 0;
                                    const yMultiplier = row === 0 ? -0.5 : 0.5;

                                    const xPos = useTransform(splitProgress, v => `calc(${v} * var(--split-x) * ${xMultiplier})`);
                                    const yPos = useTransform(splitProgress, v => `calc(${v} * var(--split-y) * ${yMultiplier})`);
                                    const borderRadius = useTransform(splitProgress, [0, 1], ["0px", "24px"]);

                                    return (
                                        <motion.div key={feature.id} style={{ x: xPos, y: yPos }} className="relative w-full h-full perspective-1000">
                                            <motion.div style={{ rotateY: featureFlip }} className="w-full h-full relative preserve-3d">

                                                {/* Front: Image Slice */}
                                                <motion.div style={{ borderRadius }} className="absolute inset-0 backface-hidden overflow-hidden bg-bg">
                                                    <div className="w-full h-full" style={{ backgroundImage: `url('${gridImage}')`, backgroundSize: "300% 200%", backgroundPosition: bgPositions[i] }} />
                                                    <motion.div style={{ opacity: sliceBorderOpacity }} className="absolute inset-0 border border-neutral-200 rounded-[inherit] z-20 pointer-events-none" />
                                                </motion.div>

                                                {/* Back: Feature Card */}
                                                <motion.div style={{ rotateY: 180, borderRadius }} className="absolute inset-0 backface-hidden bg-bg border border-neutral-200 p-2 sm:p-6 md:p-8 flex flex-col justify-end shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/0 to-primary/10 opacity-50" />
                                                    <div className="relative z-10">
                                                        <h3 className="text-[clamp(1rem,2vw,1.5rem)] font-normal text-neutral-900 mb-2 md:mb-4 tracking-tight leading-tight">{feature.title}</h3>
                                                        <p className="text-neutral-500 text-xs sm:text-sm md:text-base hidden sm:block">{feature.desc}</p>
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const CardSlider = ({ title, subtitle, cards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const getVisibleCards = () => {
        const visible = [];
        for (let i = 0; i < 3; i++) {
            const card = cards[currentIndex + i];
            if (card) {
                visible.push(card);
            }
        }
        return visible;
    };

    return (
        <section className="bg-bg pt-8 pb-8 sm:pt-8 sm:pb-8 pl-[4%] font-sans relative z-30 overflow-hidden">
            <div className="w-full">
                {/* Header Row */}
                <div className="relative flex flex-col md:flex-row items-center justify-center mb-12 max-w-7xl mx-auto pr-[4%]">
                    <div className="flex flex-col items-center text-center">
                        <h2 className="text-[2.5rem] md:text-5xl font-normal text-neutral-900 mb-4 tracking-tight">
                            {title}
                        </h2>
                        <p className="text-base md:text-lg text-neutral-600">
                            {subtitle}
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="absolute right-[4%] top-1/2 -translate-y-1/2 hidden md:flex items-center gap-3">
                        <button
                            onClick={prev}
                            disabled={currentIndex === 0}
                            className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${currentIndex === 0
                                ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                                : "bg-[#a4abb6] text-neutral-900 hover:bg-gray-500"
                                }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="text-[15px] font-normal text-gray-400 px-1">
                            {currentIndex + 1} / {cards.length}
                        </span>
                        <button
                            onClick={next}
                            disabled={currentIndex === cards.length - 1}
                            className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${currentIndex === cards.length - 1
                                ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                                : "bg-[#11142d] text-neutral-900 hover:bg-bg"
                                }`}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Mobile Controls */}
                <div className="md:hidden flex items-center justify-center gap-4 mb-8 pr-[4%]">
                    <button
                        onClick={prev}
                        disabled={currentIndex === 0}
                        className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${currentIndex === 0
                            ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                            : "bg-[#a4abb6] text-neutral-900 hover:bg-gray-500"
                            }`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-[15px] font-normal text-gray-400">
                        {currentIndex + 1} / {cards.length}
                    </span>
                    <button
                        onClick={next}
                        disabled={currentIndex === cards.length - 1}
                        className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${currentIndex === cards.length - 1
                            ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                            : "bg-[#11142d] text-neutral-900 hover:bg-bg"
                            }`}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Flex Slider (2.5 cards visible) */}
                <div className="flex gap-6 overflow-visible pl-4 md:pl-0 pb-24 pt-4">
                    <AnimatePresence mode="popLayout">
                        {getVisibleCards().map((card, i) => (
                            <motion.div
                                key={card.id + "-" + i + "-" + currentIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="relative shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] group cursor-pointer"
                            >
                                {/* Full Image Background */}
                                <div className="relative h-[320px] w-full rounded-[24px] overflow-hidden">
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                {/* Floating White Content Box - Exactly half inside, half outside */}
                                <div className="absolute bottom-0 translate-y-1/2 left-6 right-6 bg-bg rounded-[16px] shadow-2xl p-6 min-h-[160px] flex flex-col z-10">
                                    <div className="self-start px-3 py-1.5 bg-[#191543] text-neutral-900 text-xs font-normal rounded-md mb-4 shadow-sm">
                                        {card.tag}
                                    </div>
                                    <h3 className="text-[1.35rem] font-normal text-[#11142d] leading-snug mb-8 line-clamp-2">
                                        {card.title}
                                    </h3>

                                    <div className="mt-auto self-end">
                                        <button className="flex items-center gap-2 bg-[#2d2f36] text-neutral-900 px-4 py-2.5 rounded-md text-sm font-normal hover:bg-bg transition-colors shadow-md">
                                            Read More <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

const EditorialFeatureShowcase = ({ features, backgroundText = "CREATING\nIMPACT" }) => {
    // Take the first 6 features to create two groups of 3
    const displayFeatures = features.slice(0, 6);
    const bgLines = backgroundText.split('\n');

    return (
        <section className="relative w-full bg-bg pt-8 pb-8 sm:pt-8 sm:pb-8">
            {/* Sticky Background Typography */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none z-0">
                <h2
                    className="whitespace-nowrap text-center"
                    style={{
                        fontSize: "clamp(120px, 13vw, 260px)",
                        fontWeight: 900,
                        lineHeight: 0.9,
                        letterSpacing: "-3px",
                        color: "rgba(255,255,255,0.08)"
                    }}
                >
                    {bgLines.map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            {index < bgLines.length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </h2>
            </div>

            {/* Cards Layer (Scrolls normally over the sticky background) */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-[4%] -mt-[100vh] pt-[50vh]">
                <div className="flex flex-col gap-24 md:gap-48 pb-[20vh]">
                    {displayFeatures.map((feature, i) => {
                        // Alternate left and right (Group 1: L, R, L. Group 2: R, L, R)
                        const isRight = i % 2 !== 0;

                        return (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className={`w-full md:w-[80%] lg:w-[70%] flex flex-col md:flex-row gap-8 lg:gap-12 bg-bg/60 backdrop-blur-xl p-6 sm:p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl ${isRight ? 'ml-auto mr-0' : 'mr-auto ml-0'}`}
                            >
                                {/* Image */}
                                <div className={`w-full md:w-1/2 aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden ${isRight ? 'md:order-2' : ''}`}>
                                    <img src={feature.image} alt={feature.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                                </div>

                                {/* Content */}
                                <div className="w-full md:w-1/2 flex flex-col justify-center py-4">
                                    <div className="text-primary font-mono text-lg font-normal tracking-widest mb-4">
                                        {feature.id}
                                    </div>
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-normal text-neutral-900 mb-6 leading-tight tracking-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="text-lg text-neutral-500 mb-8 leading-relaxed">
                                        {feature.description}
                                    </p>
                                    <ul className="space-y-4">
                                        {feature.points.map((pt, idx) => (
                                            <li key={idx} className="flex items-start text-neutral-700 font-normal text-base sm:text-lg">
                                                <div className="w-2 h-2 rounded-full bg-primary mt-2.5 mr-4 shadow-[0_0_8px_#2563eb] shrink-0" />
                                                <span>{pt}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const ServiceImpactStats = ({ data, pageKey }) => {
    const { t } = useTranslation();

    const defaultStats = [
        { 
            stat: "100%",
            label: "First-pass silicon success rate achieved across mission-critical automotive and medical deployments"
        },
        { 
            stat: "30%",
            label: "Reduction in overall time-to-market driven by our highly optimized RTL and verification workflows"
        },
        { 
            stat: "0-Defect",
            label: "Sign-off policy ensuring flawless integration of complex third-party IP and custom architectures"
        },
        { 
            stat: "3x",
            label: "Faster synthesis and PPA closure compared to standard industry engineering benchmarks"
        }
    ];

    const statsList = (data?.stats && data.stats.length > 0) ? data.stats : 
                      (data?.metrics && data.metrics.length > 0) ? data.metrics : defaultStats;

    const titlePart1 = pageKey ? t(`services.${pageKey}.impact_stats.titlePart1`, data?.titlePart1 || "RTL Design") : (data?.titlePart1 || "RTL Design");
    const titlePart2 = pageKey ? t(`services.${pageKey}.impact_stats.titlePart2`, data?.titlePart2 || "Impact") : (data?.titlePart2 || "Impact");

    return (
        <section className="bg-bg py-20 md:py-28 relative overflow-hidden border-t border-neutral-100">
            <div className="w-full mx-auto flex flex-col relative z-10 px-[4%] md:px-[5%] max-w-screen-2xl">
                
                {/* Header Section */}
                <div className="mb-16 md:mb-20">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900">
                        {titlePart1} {titlePart2}
                    </h2>
                </div>

                {/* 4-Column Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {statsList.map((metric, i) => {
                        const label = pageKey ? t(`services.${pageKey}.impact_stats.items.${i}.label`, metric.label) : metric.label;
                        const tag = pageKey ? t(`services.${pageKey}.impact_stats.items.${i}.tag`, metric.tag) : metric.tag;
                        const stat = metric.stat || metric.value || `0${i + 1}`;

                        return (
                            <div 
                                key={i}
                                className="flex flex-col items-start"
                            >
                                {/* Accent Line */}
                                <div className="w-10 h-1 bg-primary mb-6" />
                                
                                {/* Big Number/Stat */}
                                <h3 className="text-5xl md:text-6xl lg:text-[70px] font-bold tracking-tighter text-neutral-900 mb-6 leading-none">
                                    {stat}
                                </h3>
                                
                                {/* Description */}
                                <p className="text-neutral-600 leading-relaxed text-sm md:text-base font-medium pr-4">
                                    {tag && <span className="text-neutral-900 block mb-1">{tag}</span>}
                                    {label}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

const SubServicesBento = ({ subServices, title, variant = "bento", pageKey, hero }) => {
    const { t } = useTranslation();
    if (!subServices || subServices.length === 0) return null;

    const tTitle = (key, fallback) => pageKey ? t(`services.${pageKey}.sub_services_title.${key}`, fallback) : fallback;
    const tVal = (idx, key, fallback) => pageKey ? t(`services.${pageKey}.sub_services.${idx}.${key}`, fallback) : fallback;

    return (
        <section className="pt-8 pb-8 sm:pt-8 sm:pb-8 px-[4%] md:px-[5%] w-full mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-16 items-start text-left">
                <div className="w-full lg:w-1/2">
                    <SectionHeading
                        titlePart1={tTitle('part1', "Driving Innovation")}
                        titlePart2={tTitle('part2', "Across")}
                        className="mb-0"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {subServices.map((service, i) => {
                    if (variant === "simple") {
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease: PREMIUM_EASE }}
                                className="relative w-full h-[250px] rounded-[2rem] bg-neutral-50 border border-neutral-200/60 p-8 flex flex-col justify-center hover:bg-bg hover:border-neutral-300 hover:shadow-xl transition-all duration-500 group overflow-hidden"
                            >
                                <div className="relative z-10 flex flex-col h-full justify-center">
                                    <h3 className="text-xl md:text-2xl font-medium text-neutral-900 mb-3 tracking-tight transition-colors">
                                        {tVal(i, 'title', service.title)}
                                    </h3>
                                    <Paragraph
                                        text={tVal(i, 'description', service.description)}
                                        className="!text-neutral-500 !mb-0"
                                    />
                                </div>
                            </motion.div>
                        );
                    }

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: PREMIUM_EASE }}
                            className="group relative flex flex-col h-[400px] md:h-[450px] rounded-[2rem] overflow-hidden"
                        >
                            {/* Background Image or Dark Fallback */}
                            <div className="absolute inset-0 bg-neutral-900 z-0">
                                {service.image ? (
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                    />
                                ) : (
                                    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-neutral-900 to-black">
                                        <div className="absolute -bottom-8 -right-8 w-48 h-48 text-neutral-800 opacity-40 transition-transform duration-1000 group-hover:scale-110 group-hover:-translate-y-4 group-hover:-translate-x-4">
                                            {service.icon && React.cloneElement(service.icon, { className: 'w-full h-full' })}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-90" />

                            {/* Content (Anchored to bottom) */}
                            <div className="relative z-20 flex-1 p-8 md:p-10 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                {/* Optional Icon in Header (if no image) */}
                                {!service.image && service.icon && (
                                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-auto border border-white/10">
                                        {React.cloneElement(service.icon, { className: 'w-6 h-6' })}
                                    </div>
                                )}
                                
                                <div className="mt-auto">
                                    <h3 className="text-2xl md:text-3xl font-medium text-white tracking-tight transition-colors duration-300">
                                        {tVal(i, 'title', service.title)}
                                    </h3>
                                    
                                    {/* Reveal on Hover */}
                                    <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500 ease-in-out">
                                        <div className="pt-3 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75 ease-out">
                                            <Paragraph
                                                text={tVal(i, 'description', service.description)}
                                                className="!text-neutral-300 !mb-0 line-clamp-3 text-base md:text-lg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

const ServiceAdvantage = ({ advantages, title, pageKey }) => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);

    if (!advantages || advantages.length === 0) return null;

    const tTitle = (key, fallback) => pageKey ? t(`services.${pageKey}.advantages_title.${key}`, fallback) : fallback;
    const tVal = (idx, key, fallback) => pageKey ? t(`services.${pageKey}.advantages.${idx}.${key}`, fallback) : fallback;

    // Premium fallback images for the left side
    const fallbackImages = [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504164996022-09080787b6b3?q=80&w=1000&auto=format&fit=crop"
    ];

    const activeAdvantage = advantages[activeIndex] || advantages[0];
    const currentImage = activeAdvantage.image || fallbackImages[activeIndex % fallbackImages.length];

    return (
        <section className="pt-8 pb-8 sm:pt-8 sm:pb-8 px-[4%] md:px-[5%] w-full mx-auto">
            <div className="flex flex-col gap-8 mb-16 items-start text-left w-full">
                <div className="w-full">
                    <SectionHeading
                        titlePart1={tTitle('part1', title?.part1 || "Why Partner")}
                        titlePart2={tTitle('part2', title?.part2 || "With Us")}
                        className="mb-0"
                    />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-16 relative items-start">
                {/* Sticky Left Image Display */}
                <div className="w-full lg:w-1/2 lg:sticky lg:top-32 h-[400px] lg:h-[calc(100vh-10rem)] lg:max-h-[750px] rounded-[2.5rem] overflow-hidden border border-neutral-200 shadow-2xl relative group bg-neutral-900">

                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentImage}
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "-100%" }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            src={currentImage}
                            alt="Advantage"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>
                </div>

                {/* Scrolling Right Content */}
                <div className="w-full lg:w-1/2 flex flex-col gap-12 lg:py-[10vh] pb-[20vh]">
                    {advantages.map((adv, i) => (
                        <motion.div
                            key={i}
                            onViewportEnter={() => setActiveIndex(i)}
                            viewport={{ amount: 0.5, margin: "-10% 0px -20% 0px" }}
                            className={`border p-10 rounded-3xl transition-all duration-500 cursor-pointer ${activeIndex === i
                                    ? 'bg-bg border-primary/30 shadow-2xl scale-100'
                                    : 'bg-neutral-50 border-neutral-200 opacity-50 scale-95 hover:opacity-100'
                                }`}
                        >
                            {/* Icon removed as requested */}
                            <h3 className={`text-lg sm:text-xl md:text-2xl font-normal mb-4 transition-colors ${activeIndex === i ? 'text-primary' : 'text-neutral-900'}`}>
                                {tVal(i, 'title', adv.title)}
                            </h3>
                            <Paragraph text={tVal(i, 'description', adv.description)} className="!text-neutral-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ServiceFAQ = ({ faqs, pageKey }) => {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState(0);

    if (!faqs || faqs.length === 0) return null;

    const tVal = (idx, key, fallback) => pageKey ? t(`services.${pageKey}.faqs.${idx}.${key}`, fallback) : fallback;

    return (
        <section className="pt-8 pb-8 sm:pt-8 sm:pb-8 px-[4%] md:px-[5%] w-full mx-auto">
            <div className="flex flex-col gap-8 lg:gap-12 items-start w-full">
                {/* Heading */}
                <div className="w-full">
                    <SectionHeading
                        titlePart1={t("services.general.faqs_title_part1", "Frequently Asked")}
                        titlePart2={t("services.general.faqs_title_part2", "Questions")}
                        className="mb-4"
                    />
                </div>

                {/* Accordion */}
                <div className="w-full flex flex-col gap-4">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className={`border-b border-neutral-200 overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-neutral-50 rounded-2xl border-transparent px-4' : 'bg-transparent hover:bg-neutral-50 px-4'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                                    className="w-full text-left py-6 flex items-center justify-between gap-6 outline-none group"
                                >
                                    <h3 className={`text-base sm:text-lg md:text-xl font-normal transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-neutral-900 group-hover:text-primary/80'
                                        }`}>
                                        {tVal(i, 'question', faq.question)}
                                    </h3>
                                    <div className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : 'text-neutral-900/40 group-hover:text-neutral-900'
                                        }`}>
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="pb-6 pt-0 text-neutral-500 text-sm md:text-base leading-relaxed">
                                                {tVal(i, 'answer', faq.answer)}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const ServiceCaseStudies = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Default placeholder data
    const caseStudies = [
        {
            title: "Achieving ASIL-D Compliance in Record Time",
            description: "How we delivered a zero-defect automotive SoC RTL design 3 weeks ahead of schedule for a Tier-1 client.",
            tag: "Automotive VLSI",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Scaling IP Integration for Next-Gen Datacenters",
            description: "Seamlessly integrated 15+ third-party IPs into a complex 5nm AI accelerator chip.",
            tag: "High-Performance Computing",
            image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Power Optimization for Wearable Devices",
            description: "Reduced dynamic power consumption by 40% through aggressive clock-gating and custom architectures.",
            tag: "Low Power IoT",
            image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1000&auto=format&fit=crop"
        }
    ];

    const nextSlide = () => setCurrentIndex((prev) => (prev === caseStudies.length - 1 ? prev : prev + 1));
    const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? prev : prev - 1));

    return (
        <section className="relative bg-bg pt-6 lg:pt-8 pb-12 lg:pb-16 px-[4%] md:px-[5%] overflow-hidden mt-8">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.02] blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />

            <div className="relative z-10 w-full mx-auto">
                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="flex flex-col items-start text-left">
                        <SectionHeading
                            titlePart1="Case"
                            titlePart2="Studies"
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
                                            {study.tag || "Case Study"}
                                        </div>
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-neutral-900 mb-6 tracking-tight leading-snug">
                                            {study.title}
                                        </h3>
                                        <p className="text-neutral-500 text-sm md:text-base leading-relaxed mb-10 line-clamp-4">
                                            {study.description}
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

const ServiceTestimonials = () => {
    const testimonials = [
        {
            quote: "U&WE's engineering rigor is unmatched. They delivered our complete RTL design ahead of schedule with zero linting errors.",
            author: "VP of Engineering",
            company: "Tier-1 Fabless Semiconductor"
        },
        {
            quote: "Their team's ability to seamlessly integrate complex third-party IPs saved us months of validation time.",
            author: "Director of Silicon Design",
            company: "Leading AI Chip Startup"
        },
        {
            quote: "Flawless execution and deep domain expertise. They are our go-to partner for all mission-critical verification tasks.",
            author: "Principal Architect",
            company: "Global Automotive OEM"
        }
    ];

    return (
        <section className="py-24 bg-bg relative isolate">
            <div className="w-full mx-auto px-[4%] md:px-[5%] relative z-10">
                <div className="flex flex-col gap-8 mb-16 items-start text-left w-full">
                    <div className="w-full">
                        <SectionHeading titlePart1="Client" titlePart2="Testimonials" className="mb-0" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`p-8 md:p-10 rounded-[2.5rem] border shadow-sm flex flex-col h-full relative ${
                                i === 0 
                                ? 'bg-orange-50/10 border-primary/30' 
                                : 'bg-white border-neutral-200'
                            }`}
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, idx) => <Star key={idx} className="w-5 h-5 fill-primary text-primary" />)}
                            </div>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-8 flex-1 font-medium">
                                "{t.quote}"
                            </p>
                            
                            {/* Divider Line */}
                            <div className={`w-full h-px mb-6 ${i === 0 ? 'bg-primary/20' : 'bg-neutral-200'}`} />

                            {/* Author Info */}
                            <div className="flex items-center gap-4">
                                {/* Initial Avatar */}
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                                    i === 0 
                                    ? 'bg-primary/10 text-primary border border-primary/20' 
                                    : 'bg-neutral-50 text-neutral-900 border border-neutral-200'
                                }`}>
                                    {t.author.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <div className={`font-semibold ${i === 0 ? 'text-primary' : 'text-neutral-900'}`}>
                                        {t.author}
                                    </div>
                                    <div className="text-neutral-400 text-xs font-bold uppercase tracking-wider mt-1">
                                        {t.company}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const DEFAULT_EXPERTS = [
    {
        name: "Dr. Sarah Chen",
        role: "Lead Hardware Architect",
        description: "15+ years experience in sub-5nm ASIC design and mixed-signal verification.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop"
    },
    {
        name: "James Wilson",
        role: "Principal Firmware Engineer",
        description: "Expert in bare-metal programming, RTOS architecture, and automotive protocols.",
        image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=500&auto=format&fit=crop"
    },
    {
        name: "Elena Rodriguez",
        role: "Head of PCB Design",
        description: "Specializes in high-speed, multi-layer HDI boards and SI/PI optimization.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop"
    },
    {
        name: "David Kim",
        role: "VP of Validation",
        description: "Pioneered automated testing frameworks for EVT/DVT/PVT mass production.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop"
    }
];

const ServiceExperts = ({ experts, title, pageKey }) => {
    const { t } = useTranslation();
    if (!experts || experts.length === 0) return null;

    const tTitle = (key, fallback) => pageKey ? t(`services.${pageKey}.experts_title.${key}`, fallback) : fallback;
    const tVal = (idx, key, fallback) => pageKey ? t(`services.${pageKey}.experts.${idx}.${key}`, fallback) : fallback;

    return (
        <section className="pt-8 pb-16 px-[4%] md:px-[5%] w-full mx-auto">
            <div className="flex flex-col gap-8 mb-12 items-start text-left w-full">
                <div className="w-full">
                    <SectionHeading
                        titlePart1={tTitle('part1', title?.part1 || "Our")}
                        titlePart2={tTitle('part2', title?.part2 || "Experts")}
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
                        <h3 className="text-xl font-normal text-neutral-900 mb-2">{tVal(i, 'name', expert.name)}</h3>
                        <p className="text-primary text-sm mb-4 tracking-wide uppercase">{tVal(i, 'role', expert.role)}</p>
                        <p className="text-neutral-500 text-sm text-center leading-relaxed">{tVal(i, 'description', expert.description)}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const ServiceLayout = ({
    hero,
    portal,
    slider,
    showcase,
    aboutMetrics,
    subServices,
    subServicesTitle,
    subServicesVariant = "bento",
    advantages,
    advantagesTitle,
    experts = DEFAULT_EXPERTS,
    expertsTitle,
    faqs,
    hideCTA = false,
    hideMetrics = false,
    hideCaseStudies = false,
    hideTestimonials = false,
    pageKey
}) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-bg text-neutral-900 relative">
            {/* HERO WRAPPER - Dark theme specifically for hero */}
            <div className="relative pt-[100px] w-full bg-[#0b0b12]">
                {/* Full-Screen Background Image */}
                {hero.image && (
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                        <img
                            src={hero.image}
                            alt={hero.title}
                            className="w-full h-full object-cover opacity-60"
                        />
                        {/* Gradient fades to dark to avoid white shadows on the image */}
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
                            titlePart1={pageKey ? t(`services.${pageKey}.hero.title`, hero.title) : hero.title}
                            className="!mb-6 [&_h2]:!text-[clamp(20px,6vw,32px)] [&_h2]:sm:!text-4xl [&_h2]:md:!text-4xl [&_h2]:lg:!text-5xl [&_h2]:xl:!text-5xl [&_h2]:2xl:!text-6xl [&_h2]:min-[1920px]:!text-[80px] [&_h2]:min-[2560px]:!text-[100px] [&_h2]:!font-black [&_h2]:!text-white [&_h2>span]:!text-white [&_h2]:!text-center flex justify-center drop-shadow-2xl"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-neutral-300 text-[11px] sm:text-xs md:text-[13px] lg:text-sm xl:text-[15px] 2xl:text-base min-[1920px]:text-[17px] min-[2560px]:text-lg leading-relaxed !mb-10 !max-w-3xl mx-auto font-medium drop-shadow-xl"
                        >
                            {pageKey ? t(`services.${pageKey}.hero.description`, hero.description) : hero.description}
                        </motion.p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => {
                                    const cta = document.getElementById('cta-section');
                                    if (cta) cta.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="group flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-white hover:text-primary transition-colors w-full sm:w-auto"
                            >
                                {pageKey ? t(`services.${pageKey}.hero.primaryButtonText`, hero.primaryButtonText || "Explore Services") : (hero.primaryButtonText || "Explore Services")}
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </motion.div>
                </section>
            </div>

            {/* Service Impact / Stats Section */}
            {!hideMetrics && <ServiceImpactStats data={aboutMetrics} pageKey={pageKey} />}
            <SubServicesBento subServices={subServices} title={subServicesTitle} variant={subServicesVariant} pageKey={pageKey} hero={hero} />
            {!hideCaseStudies && <ServiceCaseStudies />}
            <ServiceAdvantage advantages={advantages} title={advantagesTitle} pageKey={pageKey} />
            {!hideTestimonials && <ServiceTestimonials />}
            <ServiceFAQ faqs={faqs} pageKey={pageKey} />
            <ServiceExperts experts={experts} title={expertsTitle} pageKey={pageKey} />
            {!hideCTA && <CommonCTA />}

            {/* CONDITIONAL RENDER SECTIONS */}
            {/* {portal && <CinematicPortalSequence {...portal} />} */}
            {/* {slider && <InfiniteServiceSlider {...slider} />} */}
            {/* {showcase && <HorizontalFeatureShowcase {...showcase} />} */}
        </div>
    );
};

export default ServiceLayout;
