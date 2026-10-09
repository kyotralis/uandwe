import { motion } from "framer-motion";

const pageTransition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.22,
};

const pageVariants = {
  initial: { opacity: 0 },
  in:      { opacity: 1 },
  out:     { opacity: 0 },
};

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}
