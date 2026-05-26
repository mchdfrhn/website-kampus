'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Dosen } from '@/lib/data/dosen';
import type { DosenPageContent } from '@/lib/data/akademik-page';
import { resolveProgramStudiAccentColor } from '@/lib/data/program-studi';
import { BookOpen, ChevronRight, Mail, Search, Users } from 'lucide-react';
import ImageWithLoading from '@/components/ui/media/ImageWithLoading';
import { motion, AnimatePresence } from 'framer-motion';

const jabatanLabel: Record<string, string> = {
  Profesor: 'Profesor',
  'Lektor Kepala': 'Lektor Kepala',
  Lektor: 'Lektor',
  'Asisten Ahli': 'Asisten Ahli',
};

const jabatanColor: Record<string, string> = {
  Profesor: 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-800',
  'Lektor Kepala': 'border-sky-200 bg-sky-50 text-sky-800',
  Lektor: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  'Asisten Ahli': 'border-amber-200 bg-amber-50 text-amber-800',
};

const accentTheme: Record<string, {
  accent: string;
  avatar: string;
  chip: string;
}> = {
  navy: {
    accent: 'bg-brand-navy',
    avatar: 'bg-brand-navy text-white',
    chip: 'border-brand-navy/10 bg-brand-navy/[0.03] text-brand-navy',
  },
  blue: {
    accent: 'bg-sky-700',
    avatar: 'bg-sky-700 text-white',
    chip: 'border-sky-100 bg-sky-50 text-sky-800',
  },
  green: {
    accent: 'bg-emerald-700',
    avatar: 'bg-emerald-700 text-white',
    chip: 'border-emerald-100 bg-emerald-50 text-emerald-800',
  },
  orange: {
    accent: 'bg-orange-700',
    avatar: 'bg-orange-700 text-white',
    chip: 'border-orange-100 bg-orange-50 text-orange-800',
  },
};

function getInitials(name: string) {
  return (
    name
      .split(',')
      .shift()
      ?.split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || 'DS'
  );
}

function groupByProgramStudi(list: Dosen[], programOrder: string[] = []) {
  const map = new Map<string, Dosen[]>();

  list.forEach((dosen) => {
    const programs = dosen.programStudi.length > 0 ? dosen.programStudi : ['Lainnya'];

    programs.forEach((program) => {
      const current = map.get(program) ?? [];
      current.push(dosen);
      map.set(program, current);
    });
  });

  const grouped = Array.from(map.entries())
    .map(([program, dosen]) => ({
      program,
      dosen: dosen.sort((a, b) => a.nama.localeCompare(b.nama, 'id')),
    }));

  const orderIndex = new Map(programOrder.map((program, index) => [program, index]));

  return grouped.sort((a, b) => {
    const aIndex = orderIndex.get(a.program);
    const bIndex = orderIndex.get(b.program);

    if (aIndex !== undefined && bIndex !== undefined) return aIndex - bIndex;
    if (aIndex !== undefined) return -1;
    if (bIndex !== undefined) return 1;

    return a.program.localeCompare(b.program, 'id');
  });
}

function DosenCard({ dosen, accentColor }: { dosen: Dosen; accentColor?: string }) {
  const initials = getInitials(dosen.nama);
  const accent = accentTheme[accentColor || 'navy'] ?? accentTheme.navy;
  const [imageFailed, setImageFailed] = useState(false);
  const showPhoto = Boolean(dosen.fotoUrl && !imageFailed);
  const jabatanText = jabatanLabel[dosen.jabatanFungsional] ?? dosen.jabatanFungsional;
  const content = (
    <>
      <span className={`absolute inset-x-0 top-0 h-1 ${accent.accent}`} aria-hidden="true" />

      <div className="flex items-start gap-4 sm:gap-5">
        <div className={`relative flex h-20 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl text-sm font-bold tracking-[0.12em] sm:h-24 sm:w-20 sm:text-base ${showPhoto ? 'border border-gray-100 bg-gray-50' : accent.avatar}`}>
          {showPhoto ? (
            <ImageWithLoading
              src={dosen.fotoUrl as string}
              alt={dosen.nama}
              fill
              sizes="(max-width: 640px) 64px, 80px"
              className="object-cover object-top"
              onError={() => setImageFailed(true)}
            />
          ) : (
            initials
          )}
        </div>

        <div className="min-w-0 flex-1">
          {jabatanText ? (
            <div className="mb-2.5 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${jabatanColor[dosen.jabatanFungsional] ?? 'border-slate-200 bg-slate-100 text-slate-700'}`}
              >
                {jabatanText}
              </span>
            </div>
          ) : null}

          <h3 className="truncate text-[15px] font-bold leading-snug tracking-tight text-brand-navy transition-colors group-hover:text-brand-gold sm:text-base">
            {dosen.nama}
          </h3>
          <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            NIDN {dosen.nidn || '-'}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {dosen.bidangKeahlian.slice(0, 3).map((keahlian) => (
          <span
            key={keahlian}
            className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold leading-5 ${accent.chip}`}
          >
            {keahlian}
          </span>
        ))}
        {dosen.bidangKeahlian.length > 3 ? (
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold leading-5 text-slate-500">
            +{dosen.bidangKeahlian.length - 3} lainnya
          </span>
        ) : null}
      </div>

      <div className="mt-5 flex flex-col gap-2.5 border-t border-gray-100 pt-4 text-[11px] font-medium text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <BookOpen size={13} />
          <span>{dosen.publikasi.length} publikasi terdata</span>
        </div>
        {dosen.email ? (
          <div className="flex min-w-0 items-center gap-2">
            <Mail size={13} />
            <span className="truncate sm:max-w-[20rem]">{dosen.email}</span>
          </div>
        ) : null}
      </div>

      <div className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-brand-navy transition-colors group-hover:text-brand-gold">
        Lihat Profil
        <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </>
  );

  if (dosen.slug) {
    return (
      <Link
        href={`/akademik/dosen/${dosen.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-premium transition-all duration-500 hover:-translate-y-1 hover:border-brand-navy/15 hover:shadow-premium-hover active:scale-[0.99] sm:p-8"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 opacity-85 shadow-premium sm:p-8">
      {content}
    </div>
  );
}

export default function DosenGrid({
  dosenList,
  programOrder = [],
  content,
}: {
  dosenList?: Dosen[];
  programOrder?: string[];
  content?: DosenPageContent | null;
}) {
  const list = dosenList ?? [];
  const groupedPrograms = groupByProgramStudi(list, programOrder);
  const [activeTab, setActiveTab] = useState(groupedPrograms[0]?.program ?? '');
  const [searchQuery, setSearchQuery] = useState('');

  const activeGroup = groupedPrograms.find((group) => group.program === activeTab) ?? groupedPrograms[0];
  const activeAccent = activeGroup ? resolveProgramStudiAccentColor(activeGroup.program) : 'navy';

  return (
    <section className="py-10 sm:py-12">
      {list.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-gray-200 p-12 text-center text-gray-500">
          Data dosen belum tersedia.
        </div>
      ) : activeGroup ? (
        <div className="mt-10 space-y-6">
          {/* Tab navigation with layoutId indicator */}
          <div
            className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Tab program studi"
          >
            {groupedPrograms.map((group) => {
              const isActive = group.program === activeGroup.program;

              return (
                <button
                  key={group.program}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  id={`tab-${group.program.replace(/\s+/g, '-').toLowerCase()}`}
                  aria-controls={`panel-${group.program.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => { setActiveTab(group.program); setSearchQuery(''); }}
                  className={`relative inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-600 hover:text-brand-navy'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeDosenTab"
                      className="absolute inset-0 bg-brand-navy rounded-xl border border-brand-navy/10 shadow-premium -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!isActive && (
                    <span className="absolute inset-0 rounded-xl border border-gray-200 -z-20 bg-white" />
                  )}
                  <span>{group.program}</span>
                  <span
                    className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {group.dosen.length}
                  </span>
                </button>
              );
            })}
          </div>

          <motion.section
            layout
            className="rounded-premium border border-gray-100 bg-white p-6 shadow-premium sm:rounded-premium-lg sm:p-8 lg:p-10"
            role="tabpanel"
            id={`panel-${activeGroup.program.replace(/\s+/g, '-').toLowerCase()}`}
            aria-labelledby={`tab-${activeGroup.program.replace(/\s+/g, '-').toLowerCase()}`}
            tabIndex={0}
          >
            <div className="mb-6 flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                  Program Studi
                </div>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">
                  {activeGroup.program}
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 self-start rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500 sm:self-auto">
                <Users size={13} />
                {activeGroup.dosen.length} dosen
              </div>
            </div>

            <div className="relative mt-4">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                type="search"
                placeholder="Cari dosen berdasarkan nama..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy/10 focus:border-brand-navy transition-all bg-gray-55"
                aria-label="Cari nama dosen"
              />
            </div>

            <motion.div 
              layout 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
            >
              <AnimatePresence mode="popLayout">
                {(() => {
                  const displayedDosen = searchQuery.trim()
                    ? activeGroup.dosen.filter((d) =>
                        d.nama.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                    : activeGroup.dosen;
                  return (
                    <>
                      {displayedDosen.map((dosen, i) => (
                        <motion.div
                          key={`${activeGroup.program}-${dosen.slug || dosen.email || dosen.nama}`}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.3) }}
                        >
                          <DosenCard
                            dosen={dosen}
                            accentColor={activeAccent}
                          />
                        </motion.div>
                      ))}
                      {displayedDosen.length === 0 && (
                        <motion.p 
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="col-span-full text-center py-12 text-gray-400 text-sm font-medium"
                        >
                          Tidak ada dosen dengan nama tersebut.
                        </motion.p>
                      )}
                    </>
                  );
                })()}
              </AnimatePresence>
            </motion.div>
          </motion.section>
        </div>
      ) : null}
    </section>
  );
}
