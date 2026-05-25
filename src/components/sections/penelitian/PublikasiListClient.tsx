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
  jurnal: 'bg-blue-50 text-blue-700 border border-blue-100',
  prosiding: 'bg-purple-50 text-purple-700 border border-purple-100',
  buku: 'bg-amber-50 text-amber-700 border border-amber-100',
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
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterJenis(null)}
            className={`text-xs px-4 py-2 rounded-xl font-bold uppercase tracking-wider border transition-all duration-300 ${filterJenis === null ? 'bg-brand-navy text-white border-brand-navy shadow-sm' : 'bg-white text-gray-500 border-gray-200 hover:border-brand-navy/30'}`}
          >
            Semua Jenis
          </button>
          {jenisList.map((j) => (
            <button
              key={j}
              onClick={() => setFilterJenis(filterJenis === j ? null : j)}
              className={`text-xs px-4 py-2 rounded-xl font-bold uppercase tracking-wider border transition-all duration-300 ${filterJenis === j ? 'bg-brand-navy text-white border-brand-navy shadow-sm' : 'bg-white text-gray-500 border-gray-200 hover:border-brand-navy/30'}`}
            >
              {jenisLabel[j]}
            </button>
          ))}
        </div>
        
        <span className="hidden sm:block w-px h-6 bg-gray-200 mx-1" />
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterTahun(null)}
            className={`text-xs px-4 py-2 rounded-xl font-bold uppercase tracking-wider border transition-all duration-300 ${filterTahun === null ? 'bg-brand-navy text-white border-brand-navy shadow-sm' : 'bg-white text-gray-500 border-gray-200 hover:border-brand-navy/30'}`}
          >
            Semua Tahun
          </button>
          {tahunList.map((t) => (
            <button
              key={t}
              onClick={() => setFilterTahun(filterTahun === t ? null : t)}
              className={`text-xs px-4 py-2 rounded-xl font-bold uppercase tracking-wider border transition-all duration-300 ${filterTahun === t ? 'bg-brand-navy text-white border-brand-navy shadow-sm' : 'bg-white text-gray-500 border-gray-200 hover:border-brand-navy/30'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{filtered.length} Publikasi Ditemukan</p>

      <ol className="space-y-4" aria-label="Daftar publikasi">
        {filtered.map((pub, i) => (
          <li
            key={pub.id}
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
                    href={pub.url}
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
          </li>
        ))}
      </ol>
    </div>
  );
}
