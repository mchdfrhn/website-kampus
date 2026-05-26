'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, FileText, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

type SemesterData = {
  semester: number;
  mataKuliah: string[];
};

export default function CurriculumAccordion({
  kurikulum,
  kurikulumPdfUrl,
}: {
  kurikulum: SemesterData[];
  kurikulumPdfUrl?: string | null;
}) {
  // Open semesters 1 and 2 by default
  const [openSemesters, setOpenSemesters] = useState<Record<number, boolean>>({
    1: true,
    2: true,
  });

  const toggleSemester = (sem: number) => {
    setOpenSemesters((prev) => ({
      ...prev,
      [sem]: !prev[sem],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {kurikulum.map((semester) => {
          const isOpen = !!openSemesters[semester.semester];
          const courseCount = semester.mataKuliah.length;
          
          return (
            <div
              key={semester.semester}
              className={cn(
                "overflow-hidden rounded-2xl border transition-all duration-300",
                isOpen 
                  ? "border-brand-gold/40 bg-white shadow-md shadow-brand-navy/[0.02]" 
                  : "border-gray-100 bg-gray-50/70 hover:bg-white hover:shadow-sm"
              )}
            >
              <button
                type="button"
                onClick={() => toggleSemester(semester.semester)}
                className="flex w-full items-center justify-between px-5 py-5 text-left transition-colors sm:px-6 focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-2xl transition-colors",
                    isOpen ? "bg-brand-navy text-white" : "bg-white text-brand-navy border border-gray-100 shadow-sm"
                  )}>
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-400">Semester</p>
                    <p className="mt-1 text-base font-bold tracking-tight text-brand-navy">
                      {semester.semester.toString().padStart(2, '0')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-flex items-center rounded-full bg-brand-navy/[0.04] px-2.5 py-0.5 text-xs font-semibold text-brand-navy">
                    {courseCount} Mata Kuliah
                  </span>
                  <div className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full bg-gray-100/80 transition-transform duration-300",
                    isOpen ? "rotate-90 bg-brand-navy/5 text-brand-navy" : "text-gray-400"
                  )}>
                    <ChevronRight size={16} aria-hidden="true" />
                  </div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="border-t border-gray-100 bg-gray-50/30 px-5 py-5 sm:px-6">
                      <ul className="space-y-3">
                        {semester.mataKuliah.map((mataKuliah, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-start gap-3 text-sm font-semibold leading-relaxed text-gray-600"
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.04 }}
                          >
                            <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-gold" aria-hidden="true" />
                            <span>{mataKuliah}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-gray-100 bg-gray-50 px-5 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400 font-black">Catatan</p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-gray-600">
            Kurikulum disusun berbasis standar kompetensi nasional dan kebutuhan industri infrastruktur.
          </p>
        </div>
        <a
          href={kurikulumPdfUrl || '#'}
          target={kurikulumPdfUrl ? '_blank' : undefined}
          rel={kurikulumPdfUrl ? 'noopener noreferrer' : undefined}
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all',
            kurikulumPdfUrl
              ? 'bg-brand-navy text-white hover:bg-brand-navy/90 hover:scale-[1.02] active:scale-[0.98]'
              : 'cursor-not-allowed bg-gray-200 text-gray-500',
          )}
        >
          <FileText size={14} aria-hidden="true" />
          Unduh Kurikulum
        </a>
      </div>
    </div>
  );
}
