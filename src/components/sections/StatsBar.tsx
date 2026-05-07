'use client';

import { useRef, useState, useEffect } from 'react';
import { Reveal } from '@/components/ui/motion/Reveal';

function useCountUp(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active || target === 0) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const raf = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3); // ease-out cubic
      setValue(Math.round(eased * target));
      if (elapsed < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [target, duration, active]);
  return value;
}

function parseAngka(angka: string): { num: number; suffix: string } {
  const match = angka.match(/^(\d+(?:[.,]\d+)?)(.*)/);
  if (!match) return { num: 0, suffix: angka };
  return { num: parseInt(match[1].replace(/[.,]/, '')), suffix: match[2].trim() };
}

function StatItem({ stat, animated }: { stat: { angka: string; label: string }; animated: boolean }) {
  const { num, suffix } = parseAngka(stat.angka);
  const count = useCountUp(num, 1500, animated);
  return (
    <div className="bg-white flex flex-col items-center py-5 sm:py-8 lg:py-9 px-2 sm:px-5 lg:px-6 group hover:bg-brand-navy/[0.02] active:scale-[0.98] transition-all duration-500 cursor-default">
      <div className="relative">
        <span className="text-brand-navy text-lg sm:text-[1.75rem] lg:text-4xl font-bold tracking-tighter group-hover:text-brand-gold transition-colors duration-500">
          {count}{suffix}
        </span>
        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold group-hover:w-full transition-all duration-500" />
      </div>
      <span className="text-gray-500 text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.15em] mt-1.5 sm:mt-2 text-center leading-tight group-hover:text-brand-navy transition-colors duration-500">
        {stat.label}
      </span>
    </div>
  );
}

export default function StatsBar({ items }: { items?: { angka: string; label: string }[] }) {
  const stats = items && items.length > 0 ? items : [];
  const containerRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (stats.length === 0) return null;

  return (
    <div className="relative z-20 -mt-10 lg:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal width="100%" yOffset={20}>
        <div className="bg-white rounded-2xl shadow-premium border border-brand-navy/5 overflow-hidden">
          <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-brand-navy/5">
            {stats.map((stat) => (
              <StatItem key={stat.label} stat={stat} animated={animated} />
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
