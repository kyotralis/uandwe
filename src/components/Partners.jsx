import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionHeading from "./SectionHeading";
import Paragraph from "./Paragraph";
import nvidiaLogo from "../assets/images/nvidialogo.png";
import microchipLogo from "../assets/images/microchiplogo.png";
import semiorgLogo from "../assets/images/semiorglogo.png";
import renesasLogo from "../assets/images/renesaslogo.png";

const PARTNERS_DATA = [
  {
    logo: nvidiaLogo,
    nameKey: "whyus.partners.nvidia",
    tag: "AI & Computing",
    alt: "NVIDIA logo",
    description: "Collaborating on cutting-edge GPU-accelerated computing, AI inference, and deep learning solutions for next-generation products.",
  },
  {
    logo: renesasLogo,
    nameKey: "whyus.partners.renesas",
    tag: "Embedded & Automotive",
    alt: "Renesas logo",
    description: "Strategic partnership delivering advanced embedded solutions, automotive microcontrollers, and IoT system-on-chip designs.",
  },
  {
    logo: microchipLogo,
    nameKey: "whyus.partners.microchip",
    tag: "Microcontrollers & FPGA",
    alt: "Microchip logo",
    description: "Joint development of high-reliability microcontroller platforms, analog solutions, and FPGA-based system architectures.",
  },
  {
    logo: semiorgLogo,
    nameKey: "whyus.partners.semi",
    tag: "Industry Ecosystem",
    alt: "SEMI.org logo",
    description: "Active member driving industry standards, workforce development, and global semiconductor supply chain initiatives.",
  },
];

// ── SVG Border Draw Card ──────────────────────────────────────────────
function PartnerCard({ partner, index, t }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  // Even index = left side, Odd index = right side
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="group relative rounded-2xl md:rounded-3xl bg-bg p-6 sm:p-8 md:p-9 flex flex-col justify-between gap-6 overflow-hidden cursor-default shadow-[0_4px_25px_rgba(0,0,0,0.05)] border border-gray-200/60"
      whileHover={{
        y: -6,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
    >
      {/* Ambient blue glow on hover */}
      <div className="absolute top-0 right-0 w-[240px] h-[240px] bg-primary/[0.07] blur-[70px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-x-4 group-hover:translate-y-4 pointer-events-none" />

      {/* Subtle Shimmer sweep on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-primary/[0.03] to-transparent pointer-events-none" />

      {/* Card Content */}
      <div className="relative z-10">
        {/* Top row: Logo box + Title + Category Tag */}
        <div className="flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center p-2.5 shadow-sm group-hover:bg-primary/10/60 group-hover:border-primary/20 transition-all duration-300 flex-shrink-0">
              <img
                src={partner.logo}
                alt={partner.alt}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-black group-hover:text-primary transition-colors duration-300">
                {t(partner.nameKey)}
              </h4>
              <span className="inline-flex sm:hidden mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-primary/10 text-primary border border-primary/20/60">
                {partner.tag}
              </span>
            </div>
          </div>
         
        </div>
      </div>

      {/* Description */}
      <p className="relative z-10 text-neutral-600 text-sm sm:text-[15px] font-normal leading-relaxed group-hover:text-neutral-800 transition-colors duration-300">
        {partner.description}
      </p>

      {/* Bottom Accent Line */}
      <div className="relative z-10 w-full h-[2px] bg-gray-100 overflow-hidden mt-auto">
        <div className="w-0 h-full bg-gradient-to-r from-primary via-primary to-primary-hover group-hover:w-full transition-all duration-500 ease-out" />
      </div>
    </motion.div>
  );
}

// ── Main Partners Section ─────────────────────────────────────────────
export default function Partners() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  // Preload logos
  useEffect(() => {
    PARTNERS_DATA.forEach((partner) => {
      const img = new Image();
      img.src = partner.logo;
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="relative bg-bg text-neutral-900 px-4 sm:px-6 md:px-[5%] py-16 md:py-20 lg:py-24 2xl:py-20 overflow-hidden"
    >
      {/* HEADER — animates first */}
      <div className="w-full mx-auto mb-8 sm:mb-12 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            titlePart1={t("whyus.heading_1")}
            className="!mb-3 sm:!mb-4"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <Paragraph
            text={t("whyus.desc")}
            className="!text-neutral-600 !text-sm sm:!text-base max-w-2xl"
          />
        </motion.div>
      </div>

      {/* Partners Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10 overflow-hidden">
        {PARTNERS_DATA.map((partner, idx) => (
          <PartnerCard
            key={idx}
            partner={partner}
            index={idx}
            t={t}
          />
        ))}
      </div>
    </section>
  );
}