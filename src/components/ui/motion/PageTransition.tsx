"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const MOBILE_MOTION_QUERY = "(max-width: 767px), (pointer: coarse)";

function useIsMobileMotion() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_MOTION_QUERY);
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobileMotion();

  const initial = shouldReduceMotion
    ? { opacity: 0 }
    : isMobile
      ? { opacity: 0, y: 4 }
      : { opacity: 0, y: 8 };
  const exit = shouldReduceMotion
    ? { opacity: 0 }
    : isMobile
      ? { opacity: 0, y: 2 }
      : { opacity: 0, y: -4 };

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={pathname}
        initial={initial}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={exit}
        transition={{
          duration: shouldReduceMotion ? 0.06 : isMobile ? 0.16 : 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="min-h-full will-change-transform"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
