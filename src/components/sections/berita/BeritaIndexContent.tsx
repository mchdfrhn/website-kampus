'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pin, Clock, ArrowRight, Search } from 'lucide-react';
import {
  kategoriLabel,
  kategoriColor,
  formatTanggal,
  type Artikel,
} from '@/lib/data/berita';

const semua = 'semua';
type Filter = typeof semua | Artikel['kategori'];

const filterOptions: { value: Filter; label: string }[] = [
  { value: 'semua', label: 'Semua' },
  { value: 'pengumuman', label: 'Pengumuman' },
  { value: 'akademik', label: 'Akademik' },
  { value: 'kemahasiswaan', label: 'Kemahasiswaan' },
  { value: 'prestasi', label: 'Prestasi' },
  { value: 'penelitian', label: 'Penelitian' },
  { value: 'kerjasama', label: 'Kerjasama' },
];

export default function BeritaIndexContent({ artikelList }: { artikelList: Artikel[] }) {
  const [filter, setFilter] = useState<Filter>(semua);
  const [query, setQuery] = useState('');

  const pinned = artikelList.filter((a) => a.isPinned);

  const filtered = artikelList
    .filter((a) => !a.isPinned)
    .filter((a) => filter === semua || a.kategori === filter)
    .filter(
      (a) =>
        query === '' ||
        a.judul.toLowerCase().includes(query.toLowerCase()) ||
        a.ringkasan.toLowerCase().includes(query.toLowerCase()),
    )
    .sort((a, b) => new Date(b.tanggalTerbit).getTime() - new Date(a.tanggalTerbit).getTime());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {pinned.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-[#1E3A5F] uppercase tracking-wide mb-4 flex items-center gap-2">
            <Pin size={14} className="text-[#F5A623]" aria-hidden="true" />
            Pengumuman Penting
          </h2>
          <ul className="space-y-3">
            {pinned.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/berita/${a.slug}`}
                  className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-xl hover:border-red-400 hover:shadow-sm transition-all group"
                >
                  <Pin size={16} className="text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-[#1E3A5F] transition-colors line-clamp-1">
                      {a.judul}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">{formatTanggal(a.tanggalTerbit)}</p>
                  </div>
                  <ArrowRight size={15} className="text-gray-400 group-hover:text-[#1E3A5F] flex-shrink-0 mt-0.5 transition-colors" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="Cari berita..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/30 focus:border-[#1E3A5F]"
              aria-label="Cari berita"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter kategori berita">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                filter === opt.value
                  ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#1E3A5F] hover:text-[#1E3A5F]'
              }`}
              aria-pressed={filter === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg font-semibold mb-1">Tidak ada berita ditemukan</p>
            <p className="text-sm">Coba ubah kata kunci atau pilih kategori lain.</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/berita/${a.slug}`}
                  className="group flex flex-col h-full bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#1E3A5F] hover:shadow-lg transition-all"
                >
                  <div className="h-44 bg-[#F0F4F8] border-b border-gray-100 relative overflow-hidden">
                    {a.thumbnailUrl ? (
                      <Image src={a.thumbnailUrl} alt={a.judul} fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-gray-400 text-xs italic">Foto Artikel</p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide ${kategoriColor[a.kategori]}`}
                      >
                        {kategoriLabel[a.kategori]}
                      </span>
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        <Clock size={11} aria-hidden="true" />
                        {a.readingTime} mnt
                      </span>
                    </div>
                    <h2 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-[#1E3A5F] transition-colors line-clamp-2">
                      {a.judul}
                    </h2>
                    <p className="text-gray-500 text-xs leading-relaxed flex-1 line-clamp-3 mb-4">
                      {a.ringkasan}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                      <span>{formatTanggal(a.tanggalTerbit)}</span>
                      <span className="flex items-center gap-1 text-[#1E3A5F] font-semibold group-hover:gap-2 transition-all">
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
