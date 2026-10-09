import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-50 w-12 h-12 bg-bg/95 hover:bg-gray-50 backdrop-blur-md border border-gray-200 hover:border-neutral-900 text-neutral-800 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] flex items-center justify-center transition-colors duration-300 hover:scale-110 group cursor-pointer overflow-hidden"
          aria-label="Back to top"
        >
          {/* Animated 3 Stacked Carets ^^^ moving upwards one by one */}
          <div className="flex flex-col items-center justify-center -space-y-2.5 h-7 w-6 pointer-events-none">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.25, 1, 0.25],
                  y: [2, -3, 2],
                  scale: [0.85, 1.08, 0.85],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (2 - i) * 0.22, // Ripples upwards from bottom chevron to top chevron
                }}
              >
                <ChevronUp
                  size={17}
                  strokeWidth={3}
                  className="transition-colors duration-300 text-neutral-700 group-hover:text-neutral-900"
                />
              </motion.div>
            ))}
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
