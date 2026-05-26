'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

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
  return { num: parseInt(match[1].replace(/[.,]/g, '')), suffix: match[2].trim() };
}

export default function AnimatedStats({ stats, ariaLabel }: { stats: { value: string; label: string }[]; ariaLabel?: string }) {
  const containerRef = useRef<HTMLUListElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <ul ref={containerRef} className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4" aria-label={ariaLabel}>
      {stats.map((stat, idx) => {
        const { num, suffix } = parseAngka(stat.value);
        const count = useCountUp(num, 1500, isInView);
        
        return (
          <motion.li 
            key={stat.label} 
            className="text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <p className="font-bold text-2xl sm:text-3xl text-brand-navy tracking-tight break-words">
              {count}{suffix}
            </p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2">{stat.label}</p>
          </motion.li>
        );
      })}
    </ul>
  );
}
