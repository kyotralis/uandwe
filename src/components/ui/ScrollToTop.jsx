import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const isFirstRender = useRef(true);

  // Disable browser's automatic scroll restoration on history navigation
  // to avoid erratic clamping to bottom/footer during exit animations
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Clear returnToSection if user navigates to an unrelated page
  useEffect(() => {
    if (pathname !== "/" && !pathname.startsWith("/insights/news")) {
      sessionStorage.removeItem("returnToSection");
    }
  }, [pathname]);

  // 1. Save scroll position on scroll
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // 2. Restore scroll position instantly on load, or jump to top / target on route change
  useLayoutEffect(() => {
    const returnSection = pathname === "/" ? sessionStorage.getItem("returnToSection") : null;
    const targetId = hash ? hash.replace("#", "") : returnSection;

    if (targetId) {
      if (returnSection) {
        sessionStorage.removeItem("returnToSection");
      }
      isFirstRender.current = false;

      const scrollToTarget = () => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          return true;
        }
        return false;
      };

      // Poll until target element is mounted in the DOM (accounts for PageTransition 180ms delay)
      let attempts = 0;
      let scrolled = false;
      const maxAttempts = 30; // 30 * 40ms = 1200ms
      const interval = setInterval(() => {
        attempts++;
        if (!scrolled && scrollToTarget()) {
          scrolled = true;
          // Follow-up check after PageTransition animation finishes (~220ms) for pixel-perfect placement
          setTimeout(() => {
            scrollToTarget();
          }, 220);
          clearInterval(interval);
        } else if (attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }, 40);

      return () => clearInterval(interval);
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      // On refresh, instantly scroll to the saved position before the screen paints
      const savedScroll = sessionStorage.getItem(`scroll-${pathname}`);
      if (savedScroll) {
        window.scrollTo({ top: parseInt(savedScroll, 10), behavior: "instant" });
      }
      return;
    }

    // On actual route changes (without hash / targetId), jump to top instantly
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;