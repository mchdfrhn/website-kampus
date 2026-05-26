'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type HibahItem = {
  id: string | number;
  nama: string;
  penyelenggara?: string | null;
  deskripsi?: string | null;
  status?: string | null;
  deadline?: string | null;
  url?: string | null;
  persyaratan?: { poin?: string | null }[] | null;
};

const statusColor: Record<string, string> = {
  buka: 'bg-green-50 text-green-700 border border-green-100',
  tutup: 'bg-red-50 text-red-700 border border-red-100',
  periodik: 'bg-blue-50 text-blue-700 border border-blue-100',
};

const statusLabel: Record<string, string> = {
  buka: 'Pendaftaran Buka',
  tutup: 'Pendaftaran Tutup',
  periodik: 'Pendaftaran Periodik',
};

function getSafeUrl(url?: string | null): string {
  if (!url) return '#';
  try {
    const cleanUrl = url.trim();
    const base = 'https://safe-dummy.sttpu.ac.id';
    const parsed = new URL(cleanUrl, base);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      if (parsed.origin === base) {
        return parsed.pathname + parsed.search + parsed.hash;
      }
      return parsed.href;
    }
  } catch {
    // ignore
  }
  return '#';
}

export default function GrantsList({ hibahList }: { hibahList: HibahItem[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'buka' | 'tutup' | 'periodik'>('all');

  const query = searchQuery.toLowerCase().trim();
  const matchingIndices = hibahList
    .map((hibah, idx) => {
      const statusMatches = activeFilter === 'all' || hibah.status === activeFilter;
      if (!statusMatches) return -1;
      if (!query) return idx;

      const nameMatches = hibah.nama.toLowerCase().includes(query);
      const orgMatches = hibah.penyelenggara?.toLowerCase().includes(query) ?? false;
      const descMatches = hibah.deskripsi?.toLowerCase().includes(query) ?? false;

      return nameMatches || orgMatches || descMatches ? idx : -1;
    })
    .filter((idx) => idx !== -1);

  return (
    <div className="space-y-6">
      {/* Filters & Search Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Status Pills */}
        <div className="flex flex-wrap gap-2">
          {(['all', 'buka', 'periodik', 'tutup'] as const).map((status) => {
            const isActive = activeFilter === status;
            return (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
                  isActive
                    ? 'bg-brand-navy text-white border-brand-navy shadow-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:text-brand-navy hover:border-gray-300'
                }`}
              >
                {status === 'all' ? 'Semua Hibah' : statusLabel[status]}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            type="search"
            placeholder="Cari skema hibah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy/10 focus:border-brand-navy transition-all bg-gray-50/50"
            aria-label="Cari hibah"
          />
        </div>
      </div>

      <motion.div layout className="space-y-6 mt-4">
        <AnimatePresence mode="popLayout">
          {matchingIndices.map((originalIndex, i) => {
            const hibah = hibahList[originalIndex];
            return (
              <motion.div
                key={hibah.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.2) }}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-premium hover:border-brand-navy/10 transition-all duration-300 group"
              >
                <div className="px-6 py-5 border-b border-gray-50 flex-wrap items-start justify-between gap-4 flex">
                <div>
                  <h4 className="font-bold text-brand-navy text-sm sm:text-base group-hover:text-brand-gold transition-colors duration-300 leading-snug">
                    {hibah.nama}
                  </h4>
                  <p className="text-[11px] font-semibold text-gray-400 mt-1">{hibah.penyelenggara}</p>
                </div>
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md flex-shrink-0 ${
                    statusColor[hibah.status || 'buka']
                  }`}
                >
                  {statusLabel[hibah.status || 'buka']}
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">{hibah.deskripsi}</p>

                {hibah.persyaratan && hibah.persyaratan.length > 0 && (
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Persyaratan Utama</p>
                    <ul className="space-y-2">
                      {hibah.persyaratan.map((s: { poin?: string | null }, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-gray-500">
                          <CheckCircle size={14} className="text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{s.poin}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between flex-wrap gap-4 pt-5 border-t border-gray-50 text-xs text-gray-500 font-semibold">
                  {hibah.deadline && (
                    <div className="flex items-center gap-1.5">
                      <span>
                        🗓 <strong className="text-brand-navy">Deadline:</strong> {hibah.deadline}
                      </span>
                    </div>
                  )}
                  {hibah.url && (
                    <Link
                      href={getSafeUrl(hibah.url)}
                      className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-brand-navy hover:text-brand-gold transition-colors ml-auto"
                      {...(getSafeUrl(hibah.url).startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      Info lengkap <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
        </AnimatePresence>

        {matchingIndices.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-400 text-sm font-medium"
          >
            Tidak ada skema hibah yang cocok dengan pencarian dan filter Anda.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
