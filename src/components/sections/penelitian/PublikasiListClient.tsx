'use client';

import { useState } from 'react';
import { BookOpen, ExternalLink, Search, Filter, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Publikasi = {
  id: string;
  judul: string;
  penulis: { nama: string }[];
  tahun: number;
  jenis: 'jurnal' | 'prosiding' | 'buku';
  penerbit: string;
  url?: string;
  prodi?: string;
};

const jenisLabel: Record<string, string> = { jurnal: 'Jurnal', prosiding: 'Prosiding', buku: 'Buku' };
const jenisColor: Record<string, string> = {
  jurnal: 'bg-blue-50 text-blue-700 border border-blue-100',
  prosiding: 'bg-purple-50 text-purple-700 border border-purple-100',
  buku: 'bg-amber-50 text-amber-700 border border-amber-100',
};

function getSafeUrl(url?: string | null): string {
  if (!url) return '#';
  const trimmed = url.trim();
  // Safe validation check: Only allow absolute http/https protocols to prevent javascript: or data: XSS
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return '#';
}

export default function PublikasiListClient({ initialPublikasi }: { initialPublikasi: Publikasi[] }) {
  const [filterTahun, setFilterTahun] = useState<number | null>(null);
  const [filterJenis, setFilterJenis] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const tahunList = [...new Set(initialPublikasi.map((p) => p.tahun))].sort((a, b) => b - a);
  const jenisList = ['jurnal', 'prosiding', 'buku'] as const;

  const filtered = initialPublikasi.filter((p) => {
    if (filterTahun && p.tahun !== filterTahun) return false;
    if (filterJenis && p.jenis !== filterJenis) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.judul.toLowerCase().includes(q);
      const matchPublisher = p.penerbit.toLowerCase().includes(q);
      const matchAuthors = p.penulis.some((author) => author.nama.toLowerCase().includes(q));
      const matchYear = String(p.tahun).includes(q);
      return matchTitle || matchPublisher || matchAuthors || matchYear;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters Section */}
      <div className="space-y-4">
        {/* Live Search Input */}
        <div className="relative">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            type="search"
            placeholder="Cari berdasarkan judul, penulis, jurnal/penerbit, atau tahun..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy/10 focus:border-brand-navy transition-all"
            aria-label="Cari Publikasi"
          />
        </div>

        {/* Filter Badges Control Panel */}
        <div className="flex flex-col gap-3 p-4 rounded-2xl bg-gray-55 border border-gray-100/85">
          {/* Filter Jenis */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-450 mr-2 flex items-center gap-1">
              <Filter size={10} /> Jenis:
            </span>
            <button
              onClick={() => setFilterJenis(null)}
              className={`text-[10px] px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all ${
                filterJenis === null
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-brand-navy/20'
              }`}
            >
              Semua Jenis
            </button>
            {jenisList.map((j) => (
              <button
                key={j}
                onClick={() => setFilterJenis(filterJenis === j ? null : j)}
                className={`text-[10px] px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider border transition-all ${
                  filterJenis === j
                    ? 'bg-brand-navy text-white border-brand-navy shadow-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-brand-navy/20'
                }`}
              >
                {jenisLabel[j]}
              </button>
            ))}
          </div>

          {/* Divider line */}
          <div className="h-px bg-gray-200/60 w-full" />

          {/* Filter Tahun */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-455 mr-2 flex items-center gap-1">
              <Filter size={10} /> Tahun:
            </span>
            <button
              onClick={() => setFilterTahun(null)}
              className={`text-[10px] px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all ${
                filterTahun === null
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-brand-navy/20'
              }`}
            >
              Semua Tahun
            </button>
            {tahunList.map((t) => (
              <button
                key={t}
                onClick={() => setFilterTahun(filterTahun === t ? null : t)}
                className={`text-[10px] px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider border transition-all ${
                  filterTahun === t
                    ? 'bg-brand-navy text-white border-brand-navy shadow-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-brand-navy/20'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          Menampilkan {filtered.length} dari {initialPublikasi.length} Publikasi
        </p>
        {(filterJenis !== null || filterTahun !== null || searchQuery !== '') && (
          <button
            onClick={() => {
              setFilterJenis(null);
              setFilterTahun(null);
              setSearchQuery('');
            }}
            className="text-[10px] font-bold text-brand-navy hover:text-brand-gold transition-colors"
          >
            Reset Filter
          </button>
        )}
      </div>

      {/* Publication list container */}
      <div className="relative">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-dashed border-gray-200 p-12 text-center bg-white"
            >
              <HelpCircle className="mx-auto text-gray-300 mb-3" size={24} />
              <p className="text-gray-400 font-semibold text-sm">Tidak ada publikasi yang cocok dengan pencarian Anda.</p>
            </motion.div>
          ) : (
            <motion.ol layout className="space-y-4" aria-label="Daftar publikasi">
              {filtered.map((pub, i) => (
                <motion.li
                  key={pub.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.2) }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 hover:shadow-premium hover:border-brand-navy/10 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-brand-navy/[0.03] border border-brand-navy/5 text-brand-navy font-bold text-xs flex items-center justify-center group-hover:bg-brand-navy group-hover:text-brand-gold transition-colors duration-300" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <h4 className="font-bold text-brand-navy text-sm sm:text-base group-hover:text-brand-gold transition-colors duration-300 leading-snug">{pub.judul}</h4>
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${jenisColor[pub.jenis]}`}>
                          {jenisLabel[pub.jenis]}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-1">{pub.penulis.map(p => p.nama).join('; ')}</p>
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{pub.penerbit} · {pub.tahun}</p>
                      {pub.url && pub.url !== '#' && (
                        <a
                          href={getSafeUrl(pub.url)}
                          className="inline-flex items-center gap-1.5 text-xs text-brand-navy font-bold uppercase tracking-wider mt-4 hover:text-brand-gold transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <BookOpen size={13} aria-hidden="true" />
                          Lihat Publikasi <ExternalLink size={12} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
