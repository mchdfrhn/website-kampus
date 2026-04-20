'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type Album = {
  id: string;
  judul: string;
  slug: string;
  kategori: 'kegiatan' | 'fasilitas' | 'wisuda' | 'prestasi';
  deskripsi?: string;
  coverFotoUrl?: string;
  jumlahFoto: number;
  tanggal?: string;
};

const kategoriLabel: Record<Album['kategori'], string> = {
  kegiatan: 'Kegiatan Kampus',
  fasilitas: 'Fasilitas',
  wisuda: 'Wisuda',
  prestasi: 'Prestasi',
};

const filterOptions: { value: 'semua' | Album['kategori']; label: string }[] = [
  { value: 'semua', label: 'Semua' },
  { value: 'kegiatan', label: 'Kegiatan Kampus' },
  { value: 'fasilitas', label: 'Fasilitas' },
  { value: 'wisuda', label: 'Wisuda' },
  { value: 'prestasi', label: 'Prestasi' },
];

function formatTanggal(iso: string): string {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function GaleriContent({ albumList }: { albumList: Album[] }) {
  const [filter, setFilter] = useState<'semua' | Album['kategori']>('semua');

  const filtered =
    filter === 'semua' ? albumList : albumList.filter((a) => a.kategori === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div
        className="flex flex-wrap gap-2 mb-8"
        role="group"
        aria-label="Filter kategori galeri"
      >
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
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg font-semibold mb-1">Belum ada album</p>
          <p className="text-sm">Album akan segera tersedia.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((album) => (
            <div
              key={album.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-[#1E3A5F] transition-all flex flex-col"
            >
              <div className="h-48 bg-[#F0F4F8] relative overflow-hidden flex-shrink-0">
                {album.coverFotoUrl ? (
                  <Image
                    src={album.coverFotoUrl}
                    alt={album.judul}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-400 text-xs italic">Foto Album</p>
                  </div>
                )}
                <span className="absolute top-3 left-3 bg-[#F5A623] text-[#1E3A5F] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  {kategoriLabel[album.kategori]}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-[#1E3A5F] text-sm leading-snug mb-1 line-clamp-2">
                  {album.judul}
                </h3>
                {album.deskripsi && (
                  <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2 flex-1">
                    {album.deskripsi}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-3 border-t border-gray-100">
                  <span>{album.jumlahFoto} foto</span>
                  {album.tanggal && <span>{formatTanggal(album.tanggal)}</span>}
                </div>
                <Link
                  href="#"
                  className="mt-3 inline-block text-center text-[#1E3A5F] border border-[#1E3A5F] font-bold text-xs px-4 py-2 rounded-lg hover:bg-[#1E3A5F] hover:text-white transition-colors"
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
