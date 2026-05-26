'use client';

import { useState } from 'react';
import type { Dosen } from '@/lib/data/dosen';
import DetailBackButton from '@/components/ui/DetailBackButton';
import ImageWithLoading from '@/components/ui/media/ImageWithLoading';
import {
  Award,
  ExternalLink,
  GraduationCap,
  Mail,
  Users,
  BookOpen,
  Briefcase,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const jabatanColor: Record<string, string> = {
  Profesor: 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200',
  'Lektor Kepala': 'bg-blue-50 text-blue-800 border-blue-200',
  Lektor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  'Asisten Ahli': 'bg-amber-50 text-amber-800 border-amber-200',
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

export default function DosenDetailContent({ dosen }: { dosen: Dosen }) {
  const initials = getInitials(dosen.nama);
  const [activeTab, setActiveTab] = useState<'profile' | 'academic' | 'publications'>('profile');

  const tabs = [
    { id: 'profile', label: 'Profil', icon: Briefcase },
    { id: 'academic', label: 'Akademik & Keahlian', icon: GraduationCap },
    { id: 'publications', label: `Publikasi (${dosen.publikasi.length})`, icon: BookOpen },
  ] as const;

  return (
    <div className="space-y-8">
      {/* Header Profile Section */}
      <div className="min-w-0">
        <section className="relative overflow-hidden rounded-premium border border-gray-100 bg-white p-6 shadow-premium sm:rounded-premium-lg sm:p-8 lg:p-10">
          <span className="absolute inset-x-0 top-0 h-1 bg-brand-navy" aria-hidden="true" />
          <div className="grid gap-6 lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-8">
            <div className="relative h-40 w-32 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 shadow-sm shadow-brand-navy/[0.04] mx-auto lg:mx-0">
              {dosen.fotoUrl ? (
                <ImageWithLoading
                  src={dosen.fotoUrl}
                  alt={dosen.nama}
                  fill
                  sizes="128px"
                  className="object-cover object-top"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-brand-navy text-white">
                  <span className="text-2xl font-bold tracking-wider">{initials}</span>
                </div>
              )}
            </div>

            <div className="min-w-0 text-center lg:text-left">
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {dosen.jabatanFungsional ? (
                  <span
                    className={`inline-flex min-h-8 items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${jabatanColor[dosen.jabatanFungsional] ?? 'bg-gray-50 text-gray-700 border-gray-200'}`}
                  >
                    {dosen.jabatanFungsional}
                  </span>
                ) : null}
                <span className="inline-flex min-h-8 items-center rounded-full border border-brand-navy/10 bg-brand-navy/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-navy">
                  {dosen.publikasi.length} Publikasi
                </span>
              </div>

              <h1 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-brand-navy sm:text-3xl">
                {dosen.nama}
              </h1>

              <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-gray-600">
                Profil akademik dosen STTPU Jakarta yang aktif mengajar pada {dosen.programStudi.join(', ')} dan
                memiliki fokus keahlian pada {dosen.bidangKeahlian.slice(0, 3).join(', ')}.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 text-left">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">NIDN</p>
                  <p className="mt-2 text-sm font-bold tracking-tight text-brand-navy">{dosen.nidn || '-'}</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Pendidikan</p>
                  <p className="mt-2 text-sm font-bold tracking-tight text-brand-navy">{dosen.pendidikanTerakhir || '-'}</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 sm:col-span-2 xl:col-span-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Kontak Akademik</p>
                  {dosen.email ? (
                    <a
                      href={`mailto:${dosen.email}`}
                      className="mt-2 inline-flex max-w-full items-center gap-2 text-sm font-bold text-brand-navy transition-colors hover:text-brand-gold"
                    >
                      <Mail size={14} />
                      <span className="truncate">{dosen.email}</span>
                    </a>
                  ) : (
                    <p className="mt-2 text-sm font-bold tracking-tight text-brand-navy">-</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-gray-150 gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold transition-all focus:outline-none whitespace-nowrap ${
                isActive ? 'text-brand-navy' : 'text-gray-500 hover:text-brand-navy'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-brand-gold' : 'text-gray-400'} />
              <span>{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeDosenDetailTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Contents with animations */}
      <div className="min-h-[250px]">
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Biografi */}
              <div className="rounded-premium border border-gray-100 bg-white p-6 shadow-premium sm:rounded-premium-lg sm:p-8">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">Overview</p>
                <h2 className="text-lg font-bold tracking-tight text-brand-navy sm:text-xl">Profil Dosen</h2>
                <div className="mt-3 h-1 w-12 rounded-full bg-brand-gold" />
                <p className="mt-6 text-sm font-medium leading-7 text-gray-600">
                  {dosen.bio || 'Biografi dosen belum tersedia.'}
                </p>
              </div>

              {/* Program Studi Pengampu */}
              <div className="rounded-premium border border-gray-100 bg-white p-6 shadow-premium sm:rounded-premium-lg sm:p-8">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400 font-black">Teaching Scope</p>
                <h2 className="text-lg font-bold tracking-tight text-brand-navy sm:text-xl">Program Studi Pengampu</h2>
                <div className="mt-3 h-1 w-12 rounded-full bg-brand-gold" />
                <ul className="grid gap-3 sm:grid-cols-2 mt-6">
                  {dosen.programStudi.map((program) => (
                    <li
                      key={program}
                      className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-4 text-sm font-bold text-brand-navy"
                    >
                      <Users size={16} className="text-brand-gold" />
                      <span>{program}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'academic' && (
            <motion.div
              key="academic"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid gap-6 md:grid-cols-2"
            >
              {/* Informasi Akademik */}
              <div className="rounded-premium border border-gray-100 bg-white p-6 shadow-premium sm:rounded-premium-lg sm:p-8">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">Academic Profile</p>
                <h2 className="text-lg font-bold tracking-tight text-brand-navy sm:text-xl">Informasi Akademik</h2>
                <div className="mt-3 h-1 w-12 rounded-full bg-brand-gold" />
                <div className="space-y-4 mt-6">
                  <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold/10">
                        <GraduationCap size={18} className="text-brand-gold" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Pendidikan Terakhir</p>
                        <p className="mt-1 text-sm font-bold text-brand-navy">{dosen.pendidikanTerakhir || '-'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold/10">
                        <Award size={18} className="text-brand-gold" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Jabatan Fungsional</p>
                        <p className="mt-1 text-sm font-bold text-brand-navy">{dosen.jabatanFungsional || '-'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bidang Keahlian */}
              <div className="rounded-premium border border-gray-100 bg-white p-6 shadow-premium sm:rounded-premium-lg sm:p-8">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">Expertise</p>
                <h2 className="text-lg font-bold tracking-tight text-brand-navy sm:text-xl">Bidang Keahlian</h2>
                <div className="mt-3 h-1 w-12 rounded-full bg-brand-gold" />
                <ul className="flex flex-wrap gap-2.5 mt-6">
                  {dosen.bidangKeahlian.length > 0 ? (
                    dosen.bidangKeahlian.map((keahlian) => (
                      <li
                        key={keahlian}
                        className="rounded-full border border-brand-navy/10 bg-brand-navy/[0.03] px-3 py-1.5 text-xs font-bold leading-5 text-brand-navy"
                      >
                        {keahlian}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-500">Bidang keahlian belum tersedia.</li>
                  )}
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'publications' && (
            <motion.div
              key="publications"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="rounded-premium border border-gray-100 bg-white p-6 shadow-premium sm:rounded-premium-lg sm:p-8"
            >
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">Research Output</p>
              <h2 className="text-lg font-bold tracking-tight text-brand-navy sm:text-xl">Publikasi Akademik</h2>
              <div className="mt-3 h-1 w-12 rounded-full bg-brand-gold" />
              <div className="mt-6">
                {dosen.publikasi.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-gray-200 p-10 text-center text-sm text-gray-500">
                    Data publikasi belum tersedia.
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {dosen.publikasi.map((pub, idx) => (
                      <li
                        key={`${pub.judul}-${idx}`}
                        className="flex gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all duration-300 hover:border-brand-navy/15 hover:bg-white hover:shadow-premium"
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-navy text-[11px] font-bold text-white">
                          {pub.tahun}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-bold leading-6 text-brand-navy">{pub.judul}</h3>
                          <p className="mt-1 text-xs font-medium leading-5 text-gray-500">{pub.jurnal}</p>
                        </div>
                        {pub.url ? (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Baca publikasi: ${pub.judul}`}
                            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-gray-200 text-brand-navy transition-colors hover:border-brand-gold hover:bg-brand-gold hover:text-brand-navy"
                          >
                            <ExternalLink size={15} />
                          </a>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="pt-4">
        <DetailBackButton href="/akademik/dosen" label="Kembali ke Direktori Dosen" />
      </div>
    </div>
  );
}
