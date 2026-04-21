"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useRef, useState, Suspense } from "react";

const FINISH_DELAY = 220;

function RouteProgressLogic() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const finishTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const clearTimers = () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (finishTimeoutRef.current) {
        window.clearTimeout(finishTimeoutRef.current);
        finishTimeoutRef.current = null;
      }
    };

    const startLoading = () => {
      clearTimers();
      setIsLoading(true);
      setProgress(shouldReduceMotion ? 80 : 12);

      intervalRef.current = window.setInterval(() => {
        setProgress((current) => {
          const limit = shouldReduceMotion ? 92 : 88;
          if (current >= limit) return current;

          if (current < 35) return current + 10;
          if (current < 60) return current + 6;
          if (current < 78) return current + 3;
          return current + 1.2;
        });
      }, shouldReduceMotion ? 120 : 180);
    };

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      const url = new URL(anchor.href, window.location.href);
      const current = new URL(window.location.href);
      const isInternal = url.origin === current.origin;
      const isSamePageHashOnly =
        url.pathname === current.pathname &&
        url.search === current.search &&
        url.hash &&
        url.hash !== current.hash;

      if (!isInternal || isSamePageHashOnly) return;

      const isRouteChange =
        url.pathname !== current.pathname ||
        url.search !== current.search ||
        (url.hash !== current.hash && url.pathname !== current.pathname);

      if (isRouteChange) {
        startLoading();
      }
    };

    const handlePopState = () => {
      startLoading();
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);
      clearTimers();
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!isLoading) return;

    if (finishTimeoutRef.current) {
      window.clearTimeout(finishTimeoutRef.current);
      finishTimeoutRef.current = null;
    }

    setProgress((current) => (current < 92 ? Math.max(current, 92) : current));

    finishTimeoutRef.current = window.setTimeout(() => {
      setProgress(100);
      window.setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, shouldReduceMotion ? 70 : 160);
    }, shouldReduceMotion ? 40 : FINISH_DELAY);
  }, [pathname, searchParams, isLoading, shouldReduceMotion]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="route-progress"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.2 }}
          className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1"
        >
          <div className="absolute inset-0 bg-brand-navy/10 backdrop-blur-[2px]" />
          <motion.div
            className="relative h-full overflow-hidden bg-gradient-to-r from-brand-gold via-brand-gold-soft to-brand-gold shadow-[0_0_18px_rgba(252,182,3,0.45)]"
            animate={{ width: `${progress}%` }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: shouldReduceMotion ? 0.12 : 0.24 }}
          >
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-white/0 via-white/70 to-white/0 opacity-80" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function RouteProgressProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <RouteProgressLogic />
      </Suspense>
      {children}
    </>
  );
}
