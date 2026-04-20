'use client';

import { useState } from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

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
  jurnal: 'bg-blue-100 text-blue-800',
  prosiding: 'bg-purple-100 text-purple-800',
  buku: 'bg-amber-100 text-amber-800',
};

export default function PublikasiListClient({ initialPublikasi }: { initialPublikasi: Publikasi[] }) {
  const [filterTahun, setFilterTahun] = useState<number | null>(null);
  const [filterJenis, setFilterJenis] = useState<string | null>(null);

  const tahunList = [...new Set(initialPublikasi.map((p) => p.tahun))].sort((a, b) => b - a);
  const jenisList = ['jurnal', 'prosiding', 'buku'] as const;

  const filtered = initialPublikasi.filter((p) => {
    if (filterTahun && p.tahun !== filterTahun) return false;
    if (filterJenis && p.jenis !== filterJenis) return false;
    return true;
  });

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterJenis(null)}
          className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${filterJenis === null ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#1E3A5F]'}`}
        >
          Semua Jenis
        </button>
        {jenisList.map((j) => (
          <button
            key={j}
            onClick={() => setFilterJenis(filterJenis === j ? null : j)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${filterJenis === j ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#1E3A5F]'}`}
          >
            {jenisLabel[j]}
          </button>
        ))}
        <span className="w-px h-6 bg-gray-200 self-center mx-1" />
        <button
          onClick={() => setFilterTahun(null)}
          className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${filterTahun === null ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#1E3A5F]'}`}
        >
          Semua Tahun
        </button>
        {tahunList.map((t) => (
          <button
            key={t}
            onClick={() => setFilterTahun(filterTahun === t ? null : t)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${filterTahun === t ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#1E3A5F]'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-500">{filtered.length} publikasi ditemukan</p>

      <ol className="space-y-3" aria-label="Daftar publikasi">
        {filtered.map((pub, i) => (
          <li key={pub.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#1E3A5F] hover:shadow-sm transition-all">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#F0F4F8] text-[#1E3A5F] font-bold text-xs flex items-center justify-center" aria-hidden="true">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start gap-2 mb-1.5">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug">{pub.judul}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${jenisColor[pub.jenis]}`}>
                    {jenisLabel[pub.jenis]}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-0.5">{pub.penulis.map(p => p.nama).join('; ')}</p>
                <p className="text-xs text-gray-400">{pub.penerbit} · {pub.tahun}</p>
                {pub.url && pub.url !== '#' && (
                  <a
                    href={pub.url}
                    className="inline-flex items-center gap-1 text-xs text-[#1E3A5F] font-semibold mt-2 hover:text-[#F5A623] transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BookOpen size={11} aria-hidden="true" />
                    Lihat Publikasi <ExternalLink size={10} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
