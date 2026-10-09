import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NEWS_ARTICLES } from "../data/newsData";
import Paragraph from "./Paragraph";

// Individual News Card with continuous 3D curved-arc motion
function NewsCard({
  article,
  index,
  trackX,
  step,
  cardWidth,
  containerWidth,
  visibleCount,
  navigate,
  t,
}) {
  const category = t(`news_insights.articles.${article.id}.category`, {
    defaultValue: article.category,
  });
  const desc = t(`news_insights.articles.${article.id}.desc`, {
    defaultValue: article.desc,
  });

  // Calculate card center X relative to stage center
  const cardCenterX = useTransform(
    trackX,
    (tx) => tx + index * step + cardWidth / 2
  );

  // Normalized distance u from the visible carousel center:
  // u = 0: exact focus center card
  // u = -1: left visible card (in 3-card view)
  // u = +1: right visible card (in 3-card view)
  // u = -2: outgoing card traveling along the curved arc outward
  // u = +2: incoming card traveling along the curved arc inward
  // Normalized distance u from the visible carousel center:
  const u = useTransform(
    cardCenterX,
    (cx) => (cx - containerWidth / 2) / (step || 1)
  );

  // Smooth opacity fading for cards entering / exiting the visible stage
  const opacity = useTransform(u, (val) => {
    const absVal = Math.abs(val);
    const visibleBoundary =
      visibleCount === 3 ? 1.4 : visibleCount === 2 ? 0.9 : 0.6;
    if (absVal <= visibleBoundary) return 1;
    const fadeEnd = visibleBoundary + 0.8;
    if (absVal >= fadeEnd) return 0;
    return 1 - (absVal - visibleBoundary) / 0.8;
  });

  const pointerEvents = useTransform(u, (val) => {
    const visibleBoundary =
      visibleCount === 3 ? 1.45 : visibleCount === 2 ? 0.95 : 0.65;
    return Math.abs(val) <= visibleBoundary ? "auto" : "none";
  });

  return (
    <div
      className="news-card-wrapper h-[420px] sm:h-[460px] lg:h-[480px] xl:h-[540px] 2xl:h-full"
      style={{
        width: cardWidth ? `${cardWidth}px` : "100%",
        flex: cardWidth ? `0 0 ${cardWidth}px` : "0 0 100%",
      }}
    >
      {/* Outer entrance animation container - waits until user scrolls and reaches this section */}
      <motion.div
        initial={{
          opacity: 0,
          y: 35,
          scale: 0.98,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: Math.min(index, 2) * 0.12,
        }}
        className="w-full h-full"
      >
        {/* News Card - Exact same uniform size for all cards */}
        <motion.div
          style={{
            opacity,
            pointerEvents,
          }}
          onClick={() => {
            sessionStorage.setItem("returnToSection", "news-insights");
            navigate(article.link);
          }}
          className="news-card-item group relative flex flex-col w-full h-[420px] sm:h-[460px] lg:h-[480px] xl:h-[540px] 2xl:h-full 2xl:min-h-[72vh] bg-[#141414] border border-gray-200/20 rounded-[2rem] overflow-hidden hover:border-primary/50 transition-[border-color,box-shadow] duration-300 hover:shadow-[0_20px_40px_-15px_rgba(244,123,32,0.25)] cursor-pointer select-none"
        >
          <div
            className="absolute inset-0 bg-[length:100%_100%] bg-no-repeat bg-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
            style={{ backgroundImage: `url(${article.image})` }}
          />
          {/* Dark Gradient Overlay - Lighter to show image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Content Container (Pinned to Bottom) */}
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
            <div className="w-full">
              {/* Big Heading - Category (e.g., Company News) */}
              <h3 className="text-lg md:text-2xl lg:text-3xl font-normal tracking-tight leading-tight text-white transition-colors duration-300">
                {category}
              </h3>

              {/* Content sliding up on hover */}
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-out">
                <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col">
                  <Paragraph
                    text={desc}
                    className="!text-gray-300 line-clamp-3 mb-4 mt-4"
                    animated={false}
                  />

                  <div className="inline-flex items-center text-primary text-xs sm:text-sm font-normal tracking-wider uppercase pb-2">
                    <span>{t("news_insights.read_more")}</span>
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function NewsInsights() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [containerWidth, setContainerWidth] = useState(() => {
    if (typeof window !== "undefined") {
      return Math.max(320, window.innerWidth * 0.9);
    }
    return 1200;
  });

  // Track horizontal translation MotionValue
  const trackX = useMotionValue(0);

  // Compute how many cards are visible based on screen size
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Measure stage container width with ResizeObserver
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        if (width > 0) {
          setContainerWidth(width);
        }
      }
    };

    updateDimensions();
    const ro = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    window.addEventListener("resize", updateDimensions);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const gap = 24; // 1.5rem gap
  const cardWidth = containerWidth > 0
    ? (containerWidth - (visibleCount - 1) * gap) / visibleCount
    : 380;
  const step = cardWidth + gap;
  const maxIndex = Math.max(0, NEWS_ARTICLES.length - visibleCount);

  // Keep track aligned when window/step is resized
  useEffect(() => {
    if (step > 0) {
      trackX.set(-activeIndex * step);
    }
  }, [step]);

  // Smooth curved-arc transition to target index using cubic-bezier [0.22, 1, 0.36, 1]
  const goToIndex = (targetIndex) => {
    const clamped = Math.max(0, Math.min(targetIndex, maxIndex));
    setActiveIndex(clamped);
    animate(trackX, -clamped * step, {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    });
  };

  const scrollLeft = () => {
    if (activeIndex > 0) {
      goToIndex(activeIndex - 1);
    }
  };

  const scrollRight = () => {
    if (activeIndex < maxIndex) {
      goToIndex(activeIndex + 1);
    }
  };

  // Keyboard navigation when hovering section
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && activeIndex > 0) {
        goToIndex(activeIndex - 1);
      } else if (e.key === "ArrowRight" && activeIndex < maxIndex) {
        goToIndex(activeIndex + 1);
      }
    };

    const section = document.getElementById("news-insights");
    if (!section) return;

    const onMouseEnter = () => window.addEventListener("keydown", handleKeyDown);
    const onMouseLeave = () => window.removeEventListener("keydown", handleKeyDown);

    section.addEventListener("mouseenter", onMouseEnter);
    section.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      section.removeEventListener("mouseenter", onMouseEnter);
      section.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [activeIndex, maxIndex, step]);

  const canScrollLeft = activeIndex > 0;
  const canScrollRight = activeIndex < maxIndex;

  return (
    <section
      id="news-insights"
      className="relative z-10 bg-bg text-neutral-900 px-4 sm:px-6 md:px-[5%] pt-12 pb-12 sm:pt-16 sm:pb-16 2xl:pt-14 2xl:pb-14 2xl:min-h-screen 2xl:h-screen 2xl:min-h-[100dvh] 2xl:flex 2xl:flex-col 2xl:justify-between overflow-hidden scroll-mt-24"
    >
      {/* Header & Navigation Area */}
      <div className="w-full mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 2xl:mb-8 2xl:flex-shrink-0">
        <SectionHeading
          titlePart1={t("news_insights.heading.part1")}
          titlePart2={t("news_insights.heading.part2")}
          className="!mb-0"
        />

        {/* Navigation Arrows */}
        <div className="flex gap-4">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? "border-primary/40 bg-primary/10 hover:bg-primary/10 hover:border-primary text-primary cursor-pointer group shadow-sm"
                : "border-gray-200 text-gray-300 cursor-not-allowed opacity-40"
            }`}
            aria-label="Previous articles"
          >
            <ChevronLeft
              className={`w-6 h-6 transition-transform duration-300 ${
                canScrollLeft ? "group-hover:-translate-x-1 text-primary" : "text-gray-300"
              }`}
            />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? "border-primary/40 bg-primary/10 hover:bg-primary/10 hover:border-primary text-primary cursor-pointer group shadow-sm"
                : "border-gray-200 text-gray-300 cursor-not-allowed opacity-40"
            }`}
            aria-label="Next articles"
          >
            <ChevronRight
              className={`w-6 h-6 transition-transform duration-300 ${
                canScrollRight ? "group-hover:translate-x-1 text-primary" : "text-gray-300"
              }`}
            />
          </button>
        </div>
      </div>

      {/* 3D Perspective Stage */}
      <div
        ref={containerRef}
        className="news-carousel-stage w-full pb-4 2xl:flex-1 2xl:h-full"
      >
        {/* Animated 3D Track with Drag/Swipe Support */}
        <motion.div
          className="news-carousel-track cursor-grab active:cursor-grabbing 2xl:h-full"
          style={{ x: trackX }}
          drag="x"
          dragConstraints={{
            left: -maxIndex * step,
            right: 0,
          }}
          dragElastic={0.12}
          onDragEnd={(e, info) => {
            const currentX = trackX.get();
            let targetIndex = activeIndex;
            const swipeOffset = info.offset.x;
            const velocity = info.velocity.x;

            if (swipeOffset < -40 || velocity < -250) {
              targetIndex = Math.min(activeIndex + 1, maxIndex);
            } else if (swipeOffset > 40 || velocity > 250) {
              targetIndex = Math.max(activeIndex - 1, 0);
            } else {
              targetIndex = Math.round(-currentX / (step || 1));
              targetIndex = Math.max(0, Math.min(targetIndex, maxIndex));
            }
            goToIndex(targetIndex);
          }}
        >
          {NEWS_ARTICLES.map((article, index) => (
            <NewsCard
              key={article.id}
              article={article}
              index={index}
              trackX={trackX}
              step={step}
              cardWidth={cardWidth}
              containerWidth={containerWidth}
              visibleCount={visibleCount}
              navigate={navigate}
              t={t}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

