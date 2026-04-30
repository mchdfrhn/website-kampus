'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Dosen } from '@/lib/data/dosen';
import type { DosenPageContent } from '@/lib/data/akademik-page';
import { resolveProgramStudiAccentColor } from '@/lib/data/program-studi';
import { BookOpen, ChevronRight, Mail, Users } from 'lucide-react';

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
  card: string;
  avatar: string;
  chip: string;
}> = {
  navy: {
    card: 'border-brand-navy/8 bg-gradient-to-br from-white via-brand-mist/20 to-white',
    avatar: 'border-brand-navy/10 bg-[linear-gradient(155deg,#eef4ff_0%,#f8fafc_42%,#fff5d9_100%)] text-brand-navy/55',
    chip: 'border-brand-navy/8 bg-brand-navy/[0.03] text-brand-navy',
  },
  blue: {
    card: 'border-sky-100 bg-gradient-to-br from-white via-sky-50/70 to-white',
    avatar: 'border-sky-100 bg-[linear-gradient(155deg,#eff6ff_0%,#f8fbff_45%,#ffffff_100%)] text-sky-700/55',
    chip: 'border-sky-100 bg-sky-50 text-sky-800',
  },
  green: {
    card: 'border-emerald-100 bg-gradient-to-br from-white via-emerald-50/70 to-white',
    avatar: 'border-emerald-100 bg-[linear-gradient(155deg,#ecfdf5_0%,#f7fee7_45%,#ffffff_100%)] text-emerald-700/55',
    chip: 'border-emerald-100 bg-emerald-50 text-emerald-800',
  },
  orange: {
    card: 'border-orange-100 bg-gradient-to-br from-white via-orange-50/70 to-white',
    avatar: 'border-orange-100 bg-[linear-gradient(155deg,#fff7ed_0%,#fffbeb_45%,#ffffff_100%)] text-orange-700/55',
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
  const content = (
    <>
      <div className="flex items-start gap-4 sm:gap-5">
        <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border text-base font-bold tracking-[0.16em] shadow-inner sm:h-16 sm:w-16 sm:text-lg ${accent.avatar}`}>
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2.5 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${jabatanColor[dosen.jabatanFungsional] ?? 'border-slate-200 bg-slate-100 text-slate-700'}`}
            >
              {jabatanLabel[dosen.jabatanFungsional] ?? dosen.jabatanFungsional}
            </span>
          </div>

          <h3 className="text-base font-bold leading-snug tracking-tight text-brand-navy transition-colors group-hover:text-brand-gold">
            {dosen.nama}
          </h3>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
            NIDN {dosen.nidn || '-'}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {dosen.bidangKeahlian.slice(0, 3).map((keahlian) => (
          <span
            key={keahlian}
            className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold ${accent.chip}`}
          >
            {keahlian}
          </span>
        ))}
        {dosen.bidangKeahlian.length > 3 ? (
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-semibold text-slate-500">
            +{dosen.bidangKeahlian.length - 3} lainnya
          </span>
        ) : null}
      </div>

      <div className="mt-5 flex flex-col gap-2.5 border-t border-slate-100 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <BookOpen size={13} />
          <span>{dosen.publikasi.length} publikasi terdata</span>
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <Mail size={13} />
          <span className="truncate sm:max-w-[20rem]">{dosen.email}</span>
        </div>
      </div>

      <div className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-navy transition-colors group-hover:text-brand-gold">
        Lihat Profil
        <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </>
  );

  if (dosen.slug) {
    return (
      <Link
        href={`/akademik/dosen/${dosen.slug}`}
        className={`group flex h-full flex-col rounded-[1.5rem] border bg-white p-5 shadow-[0_16px_40px_rgba(10,31,68,0.04)] transition-all duration-500 hover:-translate-y-1 hover:border-brand-gold/30 hover:shadow-[0_24px_50px_rgba(10,31,68,0.08)] sm:p-6 ${accent.card}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={`flex h-full flex-col rounded-[1.5rem] border bg-white p-5 opacity-85 shadow-[0_16px_40px_rgba(10,31,68,0.04)] sm:p-6 ${accent.card}`}>
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

  const activeGroup = groupedPrograms.find((group) => group.program === activeTab) ?? groupedPrograms[0];
  const activeAccent = activeGroup ? resolveProgramStudiAccentColor(activeGroup.program) : 'navy';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="mb-12 text-center lg:mb-16 lg:text-left">
        <h2 className="text-brand-navy font-bold text-3xl md:text-4xl tracking-tight leading-[1.2]">
          Temukan Dosen Berdasarkan Program Studi
        </h2>
        <div className="w-12 h-1 bg-brand-gold rounded-full mt-6 mx-auto lg:mx-0" />
        <p className="mt-8 text-gray-500 font-medium max-w-3xl leading-relaxed mx-auto lg:mx-0 text-sm md:text-base">
          {content?.gridIntroText ||
            'Jelajahi tenaga pengajar STTPU Jakarta berdasarkan afiliasi program studi untuk melihat fokus keahlian, publikasi, dan profil akademik mereka dalam satu alur yang lebih rapi.'}
        </p>
      </div>

      {list.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-gray-200 p-12 text-center text-gray-500">
          Data dosen belum tersedia.
        </div>
      ) : activeGroup ? (
        <div className="mt-10 space-y-6">
          <div
            className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Tab program studi"
          >
            {groupedPrograms.map((group) => {
              const isActive = group.program === activeGroup.program;

              return (
              <button
                  key={group.program}
                  type="button"
                  onClick={() => setActiveTab(group.program)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? 'border-brand-navy/10 bg-brand-navy text-white shadow-premium'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-brand-navy/20 hover:text-brand-navy'
                  }`}
                >
                  <span>{group.program}</span>
                  <span
                    className={`rounded-lg px-2 py-0.5 text-[10px] font-bold ${
                      isActive ? 'bg-white/14 text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {group.dosen.length}
                  </span>
                </button>
              );
            })}
          </div>

          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-premium sm:p-8">
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

            <div className="grid grid-cols-1 gap-4">
              {activeGroup.dosen.map((dosen) => (
                <DosenCard
                  key={`${activeGroup.program}-${dosen.slug || dosen.email || dosen.nama}`}
                  dosen={dosen}
                  accentColor={activeAccent}
                />
              ))}
            </div>
          </section>
        </div>
      ) : null}
    </section>
  );
}
