"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useRef, useState, Suspense } from "react";

const MIN_LOADING_DURATION = 720;
const REDUCED_MOTION_MIN_LOADING_DURATION = 260;
const HIDE_DELAY = 160;
const REDUCED_MOTION_HIDE_DELAY = 70;

function RouteProgressLogic() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const finishTimeoutRef = useRef<number | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);
  const loadingStartedAtRef = useRef<number | null>(null);

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
      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
    };

    const startLoading = () => {
      const startedAt = performance.now();
      const minDuration = shouldReduceMotion
        ? REDUCED_MOTION_MIN_LOADING_DURATION
        : MIN_LOADING_DURATION;
      const targetBeforeFinish = shouldReduceMotion ? 94 : 96;

      clearTimers();
      loadingStartedAtRef.current = startedAt;
      setIsLoading(true);
      setProgress(shouldReduceMotion ? 20 : 8);

      intervalRef.current = window.setInterval(() => {
        const elapsed = performance.now() - startedAt;
        const ratio = Math.min(elapsed / minDuration, 1);
        const nextProgress = Math.min(
          targetBeforeFinish,
          8 + ratio * (targetBeforeFinish - 8)
        );

        setProgress((current) => (current >= nextProgress ? current : nextProgress));
      }, shouldReduceMotion ? 40 : 16);
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
    if (resetTimeoutRef.current) {
      window.clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }

    const minDuration = shouldReduceMotion
      ? REDUCED_MOTION_MIN_LOADING_DURATION
      : MIN_LOADING_DURATION;
    const elapsed = loadingStartedAtRef.current
      ? performance.now() - loadingStartedAtRef.current
      : minDuration;
    const remaining = Math.max(0, minDuration - elapsed);
    finishTimeoutRef.current = window.setTimeout(() => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setProgress(100);
      resetTimeoutRef.current = window.setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
        loadingStartedAtRef.current = null;
      }, shouldReduceMotion ? REDUCED_MOTION_HIDE_DELAY : HIDE_DELAY);
    }, remaining);
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
