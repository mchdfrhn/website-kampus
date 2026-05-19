"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";

const NAVBAR_OFFSET = 96;
const TOUCH_SCROLL_QUERY = "(max-width: 767px), (pointer: coarse)";

function usePrefersNativeScroll() {
  const [prefersNativeScroll, setPrefersNativeScroll] = useState(true);

  useEffect(() => {
    const media = window.matchMedia(TOUCH_SCROLL_QUERY);
    const update = () => setPrefersNativeScroll(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return prefersNativeScroll;
}

function ScrollSync() {
  const lenis = useLenis();
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const scrollToHash = (hash: string, immediate = false, attempt = 0) => {
      if (!hash || hash === "#") return;

      const id = decodeURIComponent(hash.slice(1));
      const target = document.getElementById(id);

      if (!target) {
        if (attempt < 10) {
          window.setTimeout(() => scrollToHash(hash, immediate, attempt + 1), 120);
        }
        return;
      }

      if (lenis) {
        lenis.scrollTo(target, {
          offset: -NAVBAR_OFFSET,
          duration: immediate ? 0 : 0.7,
        });
        return;
      }

      const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
      window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
    };

    const handleAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;

      const anchor = (event.target as HTMLElement | null)?.closest('a[href*="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const url = new URL(anchor.href, window.location.href);
      const isSamePage = url.origin === window.location.origin && url.pathname === window.location.pathname;

      if (!isSamePage || !url.hash) return;

      event.preventDefault();
      window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
      scrollToHash(url.hash);
    };

    const handleHashChange = () => {
      if (window.location.hash) {
        scrollToHash(window.location.hash);
      }
    };

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("hashchange", handleHashChange);

    if (window.location.hash) {
      scrollToHash(window.location.hash, previousPathname.current !== pathname);
    } else if (previousPathname.current !== pathname) {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    }

    previousPathname.current = pathname;

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [lenis, pathname]);

  return null;
}

export default function ScrollProvider({ children }: { children: ReactNode }) {
  const prefersNativeScroll = usePrefersNativeScroll();

  if (prefersNativeScroll) {
    return (
      <>
        <ScrollSync />
        {children}
      </>
    );
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 0.75,
        smoothWheel: true,
        // Native touch scrolling is smoother and more reliable on mobile.
        // Lenis syncTouch can feel stuttery on iOS/Android because it replaces
        // browser momentum with simulated inertia.
        syncTouch: false,
        syncTouchLerp: 0.075,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        infinite: false,
      }}
    >
      <ScrollSync />
      {children}
    </ReactLenis>
  );
}
