"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

type NavItem = {
  href: string;
  children?: { href: string }[] | null;
};

function isPrefetchableHref(href: string, pathname: string) {
  return (
    href.startsWith("/") &&
    !href.startsWith("//") &&
    !href.includes("#") &&
    href !== pathname
  );
}

function flattenNavHrefs(navItems: NavItem[]) {
  const primaryHrefs = new Set<string>(["/", "/portal"]);
  const secondaryHrefs = new Set<string>();

  navItems.forEach((item) => {
    if (item.href) primaryHrefs.add(item.href);
    item.children?.forEach((child) => {
      if (child.href) secondaryHrefs.add(child.href);
    });
  });

  return {
    primary: [...primaryHrefs],
    secondary: [...secondaryHrefs].filter((href) => !primaryHrefs.has(href)),
  };
}

export default function NavPrefetcher({ navItems }: { navItems: NavItem[] }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const { primary, secondary } = flattenNavHrefs(navItems);
    const primaryHrefs = primary.filter((href) => isPrefetchableHref(href, pathname));
    const secondaryHrefs = secondary.filter((href) => isPrefetchableHref(href, pathname));
    if (primaryHrefs.length === 0 && secondaryHrefs.length === 0) return;

    let cancelled = false;
    const timers: number[] = [];

    const schedulePrefetch = (hrefs: string[], initialDelay = 0) => {
      hrefs.forEach((href, index) => {
        const timer = window.setTimeout(() => {
          if (!cancelled) router.prefetch(href);
        }, initialDelay + index * 220);
        timers.push(timer);
      });
    };

    const prefetch = () => {
      schedulePrefetch(primaryHrefs);
      schedulePrefetch(secondaryHrefs, 1800);
    };

    let idleId: number | undefined;
    let fallbackTimer: number | undefined;

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(prefetch, { timeout: 2500 });
    } else {
      fallbackTimer = window.setTimeout(prefetch, 900);
    }

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      if (typeof idleId === "number" && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (typeof fallbackTimer === "number") {
        window.clearTimeout(fallbackTimer);
      }
    };
  }, [navItems, pathname, router]);

  return null;
}
