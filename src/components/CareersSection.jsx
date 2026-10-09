import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CareersSection() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  // Start animation when section enters viewport (80% from top) and end at the bottom
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end end"],
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use full 0 to 1 range so it completes faster
  const imgWidth = useTransform(scrollYProgress, [0, 1], isMobile ? ["100%", "90%"] : ["100%", "40%"]);
  const imgHeight = useTransform(scrollYProgress, [0, 1], isMobile ? ["100vh", "40vh"] : ["100vh", "70vh"]);
  const imgTop = useTransform(scrollYProgress, [0, 1], isMobile ? ["0vh", "10vh"] : ["0vh", "15vh"]);
  const imgLeft = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "5%"] : ["0%", "5%"]);
  const imgBorderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "24px"]);

  // Text opacity starts earlier and ends at 1
  const textOpacity = useTransform(scrollYProgress, [0.1, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#111116]"
      style={{ height: "150vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-[#111116] relative">

        {/* Animated Image — same pattern as QuoteSlider */}
        <motion.div
          style={{
            width: imgWidth,
            height: imgHeight,
            top: imgTop,
            left: imgLeft,
            borderRadius: imgBorderRadius,
          }}
          className="absolute z-20 overflow-hidden flex-shrink-0 bg-bg"
        >
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=2000&auto=format&fit=crop&q=80"
            alt="Team working together"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none" />


        </motion.div>

        {/* Right Side: Text Content — same pattern as QuoteSlider */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div
            style={{
              opacity: textOpacity,
              top: isMobile ? "50vh" : "15vh",
              left: isMobile ? "5%" : "45%",
              width: isMobile ? "90%" : "50%",
              height: isMobile ? "45vh" : "70vh",
            }}
            className="absolute bg-[#111116] p-8 md:py-16 md:pr-16 md:pl-8 flex flex-col justify-center pointer-events-auto"
          >
            <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-white leading-[1.1] mb-6 tracking-tight max-w-4xl">
              {t("careers_section.title", "Come Build With the Curious")}
            </h3>

            <p className="text-neutral-400 text-sm md:text-base font-normal leading-relaxed mb-12 max-w-3xl">
              {t("careers_section.desc", "Work alongside people who enjoy solving difficult problems, exploring new technologies, and turning ideas into working solutions.")}
            </p>

            <Link
              to="/careers/jobs"
              className="group w-max inline-flex items-center gap-3 px-8 py-3 text-white rounded-full text-base font-medium border-2 border-white hover:bg-bg hover:text-neutral-900 transition-all duration-300"
            >
              {t("careers_section.button", "Explore Open Roles")}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
