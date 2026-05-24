"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export const Reveal = ({
  children,
  width = "fit-content",
  delay = 0.2,
  duration = 0.3,
  yOffset = 40
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -100px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "visible" }}>
      <div
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : `translateY(${yOffset}px)`,
          transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const StaggerContainer = ({
  children,
  className,
  delayChildren = 0,
  staggerChildren = 0.08
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}) => {
  return (
    <div
      className={className}
      style={{
        transitionDelay: `${delayChildren}s`,
        transitionDuration: `${Math.max(staggerChildren, 0.01)}s`,
      }}
    >
      {children}
    </div>
  );
};

export const StaggerItem = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {children}
    </div>
  );
};
