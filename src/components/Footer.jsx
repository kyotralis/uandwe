import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Paragraph from "./Paragraph";
import { motion, AnimatePresence, useInView } from "framer-motion";

const WORD = "UANDWE";
const LETTER_INTERVAL = 400;   // ms between each new letter
const PAUSE_DURATION = 2000;   // ms to hold the complete word
const RESET_DELAY = 300;       // ms invisible before restarting

const FooterWatermark = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!isInView) return;
    if (visibleCount >= WORD.length) return; // Stop when all letters shown
    const timer = setTimeout(() => {
      setVisibleCount((c) => c + 1);
    }, LETTER_INTERVAL);
    return () => clearTimeout(timer);
  }, [visibleCount, isInView]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute top-1/2 left-0 -translate-y-1/2 text-[22vw] font-black tracking-tighter whitespace-nowrap pointer-events-none select-none z-0 flex"
    >
      {WORD.split("").map((letter, idx) => (
        <AnimatePresence key={idx}>
          {idx < visibleCount && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-black/[0.04]"
            >
              {letter}
            </motion.span>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
};

const Footer = () => {
  const { t } = useTranslation();

  const companyPaths = {
    "About Us": "/aboutus/companyoverview",
    "Careers": "/careers/jobs"
  };

  const servicesPaths = {
    "Semiconductor": "/#industries",
    "Communication": "/#industries",
    "Healthcare": "/#industries",
    "Medical": "/#industries"
  };

  return (
    <footer className="relative w-full bg-bg pt-24 pb-10 overflow-hidden font-[DM Sans] text-neutral-800">
      
      {/* MASSIVE TYPOGRAPHY WATERMARK - Sequential looping reveal */}
      <FooterWatermark />

      <div className="relative z-10 px-4 sm:px-6 md:px-[5%] mx-auto w-full max-w-[1400px]">
        {/* TOP SECTION: BIG BRANDING */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
          <div className="max-w-md">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black mb-6">
              Engineering the future.
            </h2>
            <Paragraph 
              text={t("footer.desc")} 
              className="!text-neutral-500 !text-lg" 
            />
          </div>

          <div className="flex gap-4">
            {["in", "𝕏"].map((icon) => (
              <div
                key={icon}
                className="w-12 h-12 border-2 border-gray-200 bg-transparent rounded-full flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-bg hover:border-black transition-all duration-300 cursor-pointer text-lg"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE SECTION: LINKS GRID */}
        <div className="grid gap-x-10 gap-y-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-t border-gray-200 pt-16 mb-16">
          
          {/* COMPANY */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-6">
              {t("footer.company_title")}
            </h4>
            <ul className="space-y-4">
              {["About Us", "Careers"].map((l) => (
                <li key={l}>
                  <Link to={companyPaths[l] || "/"} className="text-base text-neutral-500 hover:text-black font-medium transition-colors">
                    {t(`footer.company_links.${l}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* INDUSTRIES */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-6">
              INDUSTRIES
            </h4>
            <ul className="space-y-4">
              {["Semiconductor", "Communication", "Healthcare", "Medical"].map((l) => (
                <li key={l}>
                  <a 
                    href={servicesPaths[l] || "/#industries"} 
                    onClick={(e) => {
                      if (window.location.pathname === '/') {
                        e.preventDefault();
                        const el = document.getElementById('industries');
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                          window.history.pushState('', document.title, window.location.pathname + window.location.search);
                        }
                      }
                    }}
                    className="text-base text-neutral-500 hover:text-black font-medium transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-6">
              {t("footer.contact_title")}
            </h4>

            <div className="space-y-5 text-base text-neutral-600">
              <div>
                <span className="text-black font-bold block text-xs uppercase mb-1">{t("footer.headquarters_label")}</span>
                <p className="text-neutral-500">{t("footer.headquarters_value")}</p>
              </div>
              <div>
                <span className="text-black font-bold block text-xs uppercase mb-1">{t("footer.email_label")}</span>
                <p className="text-neutral-500 hover:text-black cursor-pointer transition-colors">hello@uandwe.com</p>
              </div>
              <div>
                <span className="text-black font-bold block text-xs uppercase mb-1">{t("footer.phone_label")}</span>
                <p className="text-neutral-500">+91 80 4200 0000</p>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-neutral-400">
          <p className="font-medium text-neutral-500">{t("footer.copyright")}</p>

          <div className="flex gap-8 flex-wrap justify-center">
            {["Privacy Policy", "Terms of Use", "Cookies"].map((l) => (
              <Link key={l} to="/" className="hover:text-black font-medium transition-colors">
                {t(`footer.bottom_links.${l}`)}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
