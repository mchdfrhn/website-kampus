'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  formatGaleriTanggal,
  type Album,
  type AlbumKategori,
} from '@/lib/data/galeri';
import { getKategoriSoftBadgeClass } from '@/lib/data/kategori';

const semua = 'semua';

export default function GaleriContent({
  albumList,
  categories,
  initialFilter = semua,
}: {
  albumList: Album[];
  categories: AlbumKategori[];
  initialFilter?: string;
}) {
  const availableCategories =
    categories.length > 0
      ? categories
      : albumList.reduce<AlbumKategori[]>((acc, album) => {
          if (acc.some((item) => item.slug === album.kategori.slug)) return acc;
          acc.push(album.kategori);
          return acc;
        }, []);

  const hasInitialFilter =
    initialFilter !== semua && availableCategories.some((item) => item.slug === initialFilter);
  const [filter, setFilter] = useState<string>(hasInitialFilter ? initialFilter : semua);
  const filterOptions = [
    { value: semua, label: 'Semua' },
    ...availableCategories.map((item) => ({
      value: item.slug,
      label: item.nama,
    })),
  ];

  const filtered =
    filter === semua ? albumList : albumList.filter((a) => a.kategori.slug === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div
        className="flex flex-wrap gap-2 mb-8"
        role="group"
        aria-label="Filter kategori galeri"
      >
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
          <p className="text-lg font-bold text-gray-900 mb-2">Belum ada album</p>
          <p className="text-sm font-medium">Album akan segera tersedia.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((album) => (
            <div
              key={album.id}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-500 flex flex-col"
            >
              <div className="h-52 bg-gray-50 relative overflow-hidden flex-shrink-0">
                {album.coverFotoUrl ? (
                  <Image
                    src={album.coverFotoUrl}
                    alt={album.judul}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-300 text-[10px] font-bold uppercase tracking-widest italic">Album Dokumentasi</p>
                  </div>
                )}
                <span className={`absolute top-4 left-4 text-[9px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider shadow-lg border ${getKategoriSoftBadgeClass(album.kategori.warna, 'navy')}`}>
                  {album.kategori.nama}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-brand-navy text-base leading-snug mb-2 line-clamp-2 group-hover:text-brand-gold transition-colors">
                  {album.judul}
                </h3>
                {album.deskripsi && (
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2 flex-1 font-medium">
                    {album.deskripsi}
                  </p>
                )}
                <div className="flex items-center justify-between text-[11px] text-gray-400 mt-auto pt-4 border-t border-gray-50 font-medium">
                  <span>{album.jumlahFoto} foto</span>
                  {album.tanggal && <span>{formatGaleriTanggal(album.tanggal)}</span>}
                </div>
                <Link
                  href="#"
                  className="mt-5 inline-block text-center bg-brand-navy text-white font-bold text-[10px] uppercase tracking-wider px-4 py-3 rounded-xl hover:bg-brand-navy/90 hover:shadow-lg transition-all"
                >
                  Lihat Album
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
