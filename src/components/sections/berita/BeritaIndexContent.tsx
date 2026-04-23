'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pin, Clock, ArrowRight, Search } from 'lucide-react';
import {
  formatTanggal,
  getArtikelKategoriColor,
  getArtikelKategoriLabel,
  getArtikelKategoriSlug,
  type ArtikelKategori,
  type Artikel,
} from '@/lib/data/berita';

const semua = 'semua';
type Filter = typeof semua | string;

export default function BeritaIndexContent({
  artikelList,
  categories,
  initialFilter = semua,
}: {
  artikelList: Artikel[];
  categories: ArtikelKategori[];
  initialFilter?: string;
}) {
  const availableCategories =
    categories.length > 0
      ? categories
      : artikelList.reduce<ArtikelKategori[]>((acc, artikel) => {
          if (acc.some((item) => item.slug === artikel.kategori.slug)) return acc;
          acc.push(artikel.kategori);
          return acc;
        }, []);

  const hasInitialFilter =
    initialFilter !== semua && availableCategories.some((item) => item.slug === initialFilter);
  const [filter, setFilter] = useState<Filter>(hasInitialFilter ? initialFilter : semua);
  const [query, setQuery] = useState('');
  const filterOptions: { value: Filter; label: string }[] = [
    { value: semua, label: 'Semua' },
    ...availableCategories.map((item) => ({
      value: item.slug,
      label: item.nama,
    })),
  ];

  const pinned = artikelList.filter((a) => a.isPinned);

  const filtered = artikelList
    .filter((a) => !a.isPinned)
    .filter((a) => filter === semua || getArtikelKategoriSlug(a.kategori) === filter)
    .filter(
      (a) =>
        query === '' ||
        a.judul.toLowerCase().includes(query.toLowerCase()) ||
        a.ringkasan.toLowerCase().includes(query.toLowerCase()),
    )
    .sort((a, b) => new Date(b.tanggalTerbit).getTime() - new Date(a.tanggalTerbit).getTime());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {pinned.length > 0 && (
        <section>
          <h2 className="text-[11px] font-bold text-brand-navy uppercase tracking-wider mb-6 flex items-center gap-2">
            <Pin size={14} className="text-brand-gold" aria-hidden="true" />
            Pengumuman Penting
          </h2>
          <ul className="space-y-4">
            {pinned.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/berita/${a.slug}`}
                  className="flex items-start gap-4 p-5 bg-red-50/50 border border-red-100 rounded-xl hover:border-red-200 hover:shadow-sm transition-all group"
                >
                  <Pin size={16} className="text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm group-hover:text-brand-navy transition-colors line-clamp-1">
                      {a.judul}
                    </p>
                    <p className="text-gray-500 text-[10px] mt-1 font-medium uppercase tracking-wider">{formatTanggal(a.tanggalTerbit)}</p>
                  </div>
                  <ArrowRight size={15} className="text-gray-300 group-hover:text-brand-navy flex-shrink-0 mt-0.5 transition-colors" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="Cari berita..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/10 focus:border-brand-navy transition-all"
              aria-label="Cari berita"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter kategori berita">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                filter === opt.value
                  ? 'bg-brand-navy text-white border-brand-navy shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-brand-navy hover:text-brand-navy'
              }`}
              aria-pressed={filter === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg font-bold text-gray-900 mb-2">Tidak ada berita ditemukan</p>
            <p className="text-sm font-medium">Coba ubah kata kunci atau pilih kategori lain.</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/berita/${a.slug}`}
                  className="group flex flex-col h-full bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="h-48 bg-gray-50 border-b border-gray-50 relative overflow-hidden">
                    {a.thumbnailUrl ? (
                      <Image src={a.thumbnailUrl} alt={a.judul} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-gray-300 text-[10px] font-bold uppercase tracking-widest italic">STTPU News</p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-[9px] font-bold px-3 py-1 rounded-lg border uppercase tracking-wider ${getArtikelKategoriColor(a.kategori)}`}
                      >
                        {getArtikelKategoriLabel(a.kategori)}
                      </span>
                      <span className="text-gray-400 text-[11px] font-medium flex items-center gap-1.5">
                        <Clock size={12} aria-hidden="true" />
                        {a.readingTime} mnt
                      </span>
                    </div>
                    <h2 className="font-bold text-brand-navy text-base leading-snug mb-3 group-hover:text-brand-gold transition-colors line-clamp-2">
                      {a.judul}
                    </h2>
                    <p className="text-gray-500 text-xs leading-relaxed flex-1 line-clamp-3 mb-6 font-medium">
                      {a.ringkasan}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-gray-400 pt-5 border-t border-gray-50">
                      <span className="font-medium">{formatTanggal(a.tanggalTerbit)}</span>
                      <span className="flex items-center gap-1.5 text-brand-navy font-bold uppercase tracking-wider group-hover:gap-2.5 transition-all">
                        Baca <ArrowRight size={12} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
