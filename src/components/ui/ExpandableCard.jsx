"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function ExpandableCard({
  title,
  src,
  description,
  children,
  className,
  classNameExpanded,
  ...props
}) {
  const [active, setActive] = useState(false);
  const cardRef = useRef(null);
  const id = useId();

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setActive(false);
      }
    };

    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setActive(false);
      }
    };

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [active]);

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg/75 backdrop-blur-md h-full w-full z-[99]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div
            className={cn(
              "fixed inset-0 grid place-items-center z-[100] p-4 sm:p-6 md:p-10 pointer-events-auto",
            )}
          >
            <motion.div
              layoutId={`card-${title}-${id}`}
              ref={cardRef}
              className={cn(
                "w-full max-w-[850px] max-h-[88vh] flex flex-col overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] rounded-2xl sm:rounded-3xl bg-[#11111a] border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative text-neutral-900",
                classNameExpanded,
              )}
              {...props}
            >
              <motion.div layoutId={`image-${title}-${id}`} className="relative flex-shrink-0">
                <div className="relative before:absolute before:inset-x-0 before:bottom-[-1px] before:h-[80px] before:z-20 before:bg-gradient-to-t before:from-[#11111a] before:to-transparent">
                  <img
                    src={src}
                    alt={title}
                    className="w-full h-64 sm:h-80 object-cover object-center"
                  />
                </div>
              </motion.div>
              <div className="relative h-full">
                <div className="flex justify-between items-start p-6 sm:p-8 h-auto gap-4">
                  <div>
                    <motion.p
                      layoutId={`description-${description}-${id}`}
                      className="text-orange-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-1"
                    >
                      {description}
                    </motion.p>
                    <motion.h3
                      layoutId={`title-${title}-${id}`}
                      className="font-semibold text-neutral-900 text-2xl sm:text-3xl lg:text-4xl mt-1 tracking-tight leading-tight"
                    >
                      {title}
                    </motion.h3>
                  </div>
                  <motion.button
                    aria-label="Close card"
                    layoutId={`button-${title}-${id}`}
                    className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-900 hover:bg-orange-500 hover:text-neutral-900 border border-white/15 hover:border-orange-400 transition-colors duration-300 focus:outline-none cursor-pointer"
                    onClick={() => setActive(false)}
                  >
                    <motion.div
                      animate={{ rotate: active ? 45 : 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </motion.div>
                  </motion.button>
                </div>
                <div className="relative px-6 sm:px-8 pb-10">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-300 text-sm sm:text-base leading-relaxed flex flex-col items-start gap-4 [&_h4]:text-lg sm:[&_h4]:text-xl [&_h4]:font-semibold [&_h4]:text-neutral-900 [&_h4]:mt-4 [&_p]:text-gray-300 [&_p]:leading-relaxed"
                  >
                    {children}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        role="dialog"
        aria-labelledby={`card-title-${id}`}
        aria-modal="true"
        layoutId={`card-${title}-${id}`}
        onClick={() => setActive(true)}
        className={cn(
          "h-[370px] sm:h-[390px] lg:h-[410px] 2xl:h-[430px] p-4 sm:p-5 flex flex-col justify-between bg-[#12121c] hover:bg-[#161626] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(255,107,26,0.18)] rounded-2xl sm:rounded-3xl cursor-pointer border border-neutral-200 hover:border-orange-500/40 transition-all duration-300 w-full group overflow-hidden",
          className,
        )}
      >
        <div className="flex flex-col justify-between w-full h-full">
          <motion.div layoutId={`image-${title}-${id}`} className="w-full flex-1 min-h-0 overflow-hidden rounded-xl sm:rounded-2xl relative mb-3 sm:mb-4">
            <img
              src={src}
              alt={title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
          <div className="flex justify-between items-end gap-3 pt-1 flex-shrink-0">
            <div className="flex flex-col flex-1 min-w-0">
              <motion.p
                layoutId={`description-${description}-${id}`}
                className="text-orange-400 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-1 line-clamp-1"
              >
                {description}
              </motion.p>
              <motion.h3
                layoutId={`title-${title}-${id}`}
                className="text-neutral-900 text-base sm:text-lg lg:text-xl font-medium leading-snug line-clamp-2 group-hover:text-orange-300 transition-colors"
              >
                {title}
              </motion.h3>
            </div>
            <motion.button
              aria-label="Open card"
              layoutId={`button-${title}-${id}`}
              className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-neutral-50 group-hover:bg-orange-500 group-hover:text-neutral-900 text-neutral-600 border border-white/15 group-hover:border-orange-400 transition-colors duration-300 focus:outline-none cursor-pointer"
            >
              <motion.div
                animate={{ rotate: active ? 45 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
