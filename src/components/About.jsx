import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useTranslation } from "react-i18next";
import panel1Img from "../assets/images/realistic_panel1.png";
import panel2Img from "../assets/images/realistic_panel2.jpg";
import panel3Img from "../assets/images/realistic_panel3.jpg";
import panel4Img from "../assets/images/realistic_panel4.jpg";

const PANELS = [
  {
    id: "01",
    titleKey: "about.cards.ideation.title",
    fallbackTitle: "Where innovation meets viability.",
    descKey: "about.cards.ideation.desc",
    fallbackDesc:
      "Great products start with bold ideas. We collaborate with you at the blueprint stage to turn ambitious concepts into actionable, strategic roadmaps.",
    imgUrl: panel1Img,
    accentFrom: "#ec4899",
    accentTo: "#a855f7",
  },
  {
    id: "02",
    titleKey: "about.cards.engineering.title",
    fallbackTitle: "Uncompromising engineering.",
    descKey: "about.cards.engineering.desc",
    fallbackDesc:
      "Ideas are easy; execution is everything. Our teams relentlessly architect, build, and rigorously test every system until perfection is achieved.",
    imgUrl: panel2Img,
    accentFrom: "#3b82f6",
    accentTo: "#06b6d4",
  },
  {
    id: "03",
    titleKey: "about.cards.scale.title",
    fallbackTitle: "Built for global scale.",
    descKey: "about.cards.scale.desc",
    fallbackDesc:
      "Your solutions shouldn't just work in the lab. We design frameworks that deploy effortlessly across borders, handling massive growth without breaking a sweat.",
    imgUrl: panel3Img,
    accentFrom: "#ef4444",
    accentTo: "#f97316",
  },
  {
    id: "04",
    titleKey: "about.cards.partnership.title",
    fallbackTitle: "An extension of your team.",
    descKey: "about.cards.partnership.desc",
    fallbackDesc:
      "We aren't just another vendor. We integrate seamlessly into your culture, becoming a dedicated partner invested in your long-term success.",
    imgUrl: panel4Img,
    accentFrom: "#10b981",
    accentTo: "#14b8a6",
  },
];

/* ─── Single Panel Sub-Component ─── */
function PanelSlide({ panel, scrollYProgress, index, totalPanels }) {
  const { t } = useTranslation();

  const segment = 1 / (totalPanels - 1);

  // ── Image Animation ──
  // Enters from BOTTOM-RIGHT (100%, 100%)
  // Rests at Center (0%, 0%)
  // Exits to LEFT (-100%, 0%)
  let imgInputs, imgXOutputs, imgYOutputs;

  // ── Text Animation ──
  // Enters from BOTTOM-RIGHT (50%, 50%) - slightly faster/subtle
  // Rests at Center (0%, 0%)
  // Exits to RIGHT (100%, 0%)
  let txtXOutputs, txtYOutputs;

  if (index === 0) {
    imgInputs = [0, segment];
    imgXOutputs = ["0%", "-100%"];
    imgYOutputs = ["0%", "0%"];

    txtXOutputs = ["0%", "100%"];
    txtYOutputs = ["0%", "0%"];
  } else if (index === totalPanels - 1) {
    imgInputs = [(index - 1) * segment, index * segment];
    imgXOutputs = ["100%", "0%"];
    imgYOutputs = ["100%", "0%"];

    txtXOutputs = ["100%", "0%"];
    txtYOutputs = ["100%", "0%"];
  } else {
    imgInputs = [(index - 1) * segment, index * segment, (index + 1) * segment];
    imgXOutputs = ["100%", "0%", "-100%"];
    imgYOutputs = ["100%", "0%", "0%"];

    txtXOutputs = ["100%", "0%", "100%"];
    txtYOutputs = ["100%", "0%", "0%"];
  }

  const imgX = useTransform(scrollYProgress, imgInputs, imgXOutputs);
  const imgY = useTransform(scrollYProgress, imgInputs, imgYOutputs);

  const txtX = useTransform(scrollYProgress, imgInputs, txtXOutputs);
  const txtY = useTransform(scrollYProgress, imgInputs, txtYOutputs);

  // Panel background needs to fade in/out so it doesn't block the splitting animation of the panel below it
  // Actually, if we use a solid background, Panel 1 covers Panel 0 entirely.
  // The user says: "The outgoing and incoming panels must overlap during the transition."
  // If Panel 1 is solid white, it covers the gap of Panel 0. This is perfect.

  return (
    <motion.div
      style={{ zIndex: index * 10 }}
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      <div className="relative w-full h-full flex flex-col lg:flex-row pointer-events-auto">

        {/* ── Left: Image Area (Moves Left on Exit, Enters Bottom-Right) ── */}
        <motion.div
          style={{ x: imgX, y: imgY }}
          className="relative w-full lg:w-[55%] h-[45%] lg:h-full overflow-hidden bg-white will-change-transform shadow-[0_0_50px_rgba(0,0,0,0.1)] lg:shadow-none rounded-[10px]"
        >
          <img
            src={panel.imgUrl}
            alt={t(panel.titleKey, panel.fallbackTitle)}
            className="w-full h-full object-cover rounded-[10px]"
          />
          {/* Gradients */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `linear-gradient(135deg, transparent 40%, ${panel.accentFrom}30 70%, ${panel.accentTo}20 100%)` }}
          />
          <div
            className="absolute top-0 right-0 w-1/3 h-full pointer-events-none hidden lg:block"
            style={{ background: `linear-gradient(to right, transparent, ${panel.accentFrom}15, ${panel.accentTo}10)` }}
          />
        </motion.div>

        {/* ── Right: Text Content (Moves Right on Exit, Enters Bottom-Right) ── */}
        <motion.div
          style={{ x: txtX, y: txtY }}
          className="relative w-full lg:w-[45%] h-[55%] lg:h-full flex items-center overflow-hidden bg-white will-change-transform"
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{ background: `radial-gradient(ellipse at left center, ${panel.accentFrom}20 0%, transparent 70%)` }}
          />
          <div className="relative z-10 px-8 lg:px-16 xl:px-20 max-w-xl pl-12 lg:pl-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-light tracking-tight text-neutral-900 leading-tight mb-5 lg:mb-8">
              {t(panel.titleKey, panel.fallbackTitle)}
            </h2>
            <p className="text-sm lg:text-base xl:text-lg leading-relaxed text-neutral-500 font-normal">
              {t(panel.descKey, panel.fallbackDesc)}
            </p>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}

/* ─── Main About Component ─── */
export default function About() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const segment = 1 / (PANELS.length - 1);
    const index = Math.round(latest / segment);
    setActiveIndex(Math.min(Math.max(index, 0), PANELS.length - 1));
  });

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full bg-white"
      style={{ height: `${PANELS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">



        {/* ── Panels ── */}
        {PANELS.map((panel, index) => (
          <PanelSlide
            key={panel.id}
            panel={panel}
            scrollYProgress={scrollYProgress}
            index={index}
            totalPanels={PANELS.length}
          />
        ))}

      </div>
    </section>
  );
}