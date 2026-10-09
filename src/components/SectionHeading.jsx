import React from "react";
import { motion } from "framer-motion";

const wordVariants = {
    hidden: { opacity: 0, y: '120%', rotate: 4 },
    visible: { 
        opacity: 1, 
        y: 0, 
        rotate: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
};

const AnimatedText = ({ text }) => {
    if (!text) return null;
    const words = text.split(" ");
    return (
        <>
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
        </>
    );
};

export default function SectionHeading({ titlePart1, titlePart2, className = "", breakLine = false, titleClassName }) {
  const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren: 0.1 }
      }
  };

  return (
    <div className={`mb-12 ${className}`}>
      <motion.h2 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className={`${titleClassName || 'text-[clamp(1.5rem,3vw,2.5rem)] font-normal'} leading-[1.1] tracking-tight text-black`}
      >
        {titlePart1 && <AnimatedText text={titlePart1} />}
        {titlePart1 && titlePart2 && !breakLine && " "}
        {breakLine && <br />}
        {titlePart2 && <AnimatedText text={titlePart2} />}
      </motion.h2>
    </div>
  );
}
