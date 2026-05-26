'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

type Milestone = { tahun: string; judul: string; deskripsi?: string };

export default function TimelineList({ milestones }: { milestones: Milestone[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -16 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.ol
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      className="relative border-l-2 border-brand-navy/10 space-y-0"
      aria-label="Tonggak sejarah STTPU"
    >
      {milestones.map((item, idx) => (
        <motion.li
          key={idx}
          variants={itemVariants}
          className="ml-8 pb-10 last:pb-0 relative group"
        >
          <span
            className="absolute -left-[41px] top-1.5 flex items-center justify-center w-6 h-6 rounded-xl bg-white border border-brand-navy/15 text-brand-navy shadow-sm group-hover:bg-brand-navy group-hover:text-white transition-colors duration-300"
            aria-hidden="true"
          >
            <Calendar size={12} />
          </span>
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <span className="inline-block bg-brand-gold text-brand-navy font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md group-hover:scale-105 transition-transform duration-300">
              {item.tahun}
            </span>
            <h4 className="font-bold text-brand-navy text-sm sm:text-base leading-tight group-hover:text-brand-gold transition-colors duration-300">
              {item.judul}
            </h4>
          </div>
          {item.deskripsi && (
            <p className="text-gray-500 text-sm font-medium leading-relaxed mt-2 pl-1 border-l-2 border-transparent group-hover:border-brand-gold/30 transition-all duration-300">
              {item.deskripsi}
            </p>
          )}
        </motion.li>
      ))}
    </motion.ol>
  );
}
