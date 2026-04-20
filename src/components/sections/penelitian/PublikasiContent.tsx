'use client';

import { useState } from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

type Publikasi = {
  id: string;
  judul: string;
  penulis: string[];
  tahun: number;
  jenis: 'jurnal' | 'prosiding' | 'buku';
  penerbit: string;
  url?: string;
  prodi: string;
};

const publikasiList: Publikasi[] = [
  {
    id: 'p1',
    judul: 'Analisis Kapasitas Dukung Fondasi Tiang Bor pada Tanah Lunak Jakarta Utara',
    penulis: ['Dr. Rudi Santoso, M.T.', 'Ir. Agus Priyono, M.T.'],
    tahun: 2024,
    jenis: 'jurnal',
    penerbit: 'Jurnal Teknik Sipil dan Perencanaan, Vol. 26 No. 1',
    url: '#',
    prodi: 'Teknik Sipil',
  },
  {
    id: 'p2',
    judul: 'Efisiensi Irigasi Tetes pada Lahan Pertanian Perkotaan: Studi Kasus Kalideres',
    penulis: ['Dr. Siti Rahayu, M.T.', 'Ir. Farida Hanum, M.T.'],
    tahun: 2024,
    jenis: 'jurnal',
    penerbit: 'Jurnal Irigasi, Vol. 19 No. 2',
    url: '#',
    prodi: 'Teknik Pengairan',
  },
  {
    id: 'p3',
    judul: 'Pemodelan Banjir Sungai Ciliwung Segmen Depok–Manggarai dengan HEC-RAS 2D',
    penulis: ['Dr. Siti Rahayu, M.T.', 'Ir. Dian Pratiwi, M.T.'],
    tahun: 2024,
    jenis: 'prosiding',
    penerbit: 'Prosiding Konferensi Hidrolika Nasional 2024',
    url: '#',
    prodi: 'Teknik Pengairan',
  },
  {
    id: 'p4',
    judul: 'Karakteristik Leachate TPA Cipayung dan Pengaruhnya terhadap Kualitas Air Tanah',
    penulis: ['Dr. Hendra Wijaya, M.Sc.', 'Dr. Amalia Fitri, M.T.'],
    tahun: 2023,
    jenis: 'jurnal',
    penerbit: 'Jurnal Teknologi Lingkungan, Vol. 24 No. 2',
    url: '#',
    prodi: 'Teknik Lingkungan',
  },
  {
    id: 'p5',
    judul: 'Manajemen Risiko Proyek Jalan Tol: Analisis Klaim Konstruksi pada 5 Proyek BUJT',
    penulis: ['Dr. Ir. Bambang Susilo, M.T.', 'Ir. Yusuf Adinegoro, M.M.'],
    tahun: 2023,
    jenis: 'jurnal',
    penerbit: 'Jurnal Manajemen Proyek Indonesia, Vol. 5 No. 1',
    url: '#',
    prodi: 'Manajemen Konstruksi',
  },
  {
    id: 'p6',
    judul: 'Implementasi BIM Level 2 pada Proyek Gedung Bertingkat: Hambatan dan Peluang di Indonesia',
    penulis: ['Ir. Dian Pratiwi, M.T.', 'Dr. Ir. Bambang Susilo, M.T.'],
    tahun: 2023,
    jenis: 'prosiding',
    penerbit: 'Prosiding Seminar Nasional Teknik Sipil XII, ITS Surabaya',
    url: '#',
    prodi: 'Manajemen Konstruksi',
  },
  {
    id: 'p7',
    judul: 'Pemanfaatan Abu Terbang PLTU sebagai Substitusi Semen pada Beton Mutu Tinggi',
    penulis: ['Ir. Agus Priyono, M.T.', 'Dr. Rudi Santoso, M.T.'],
    tahun: 2023,
    jenis: 'jurnal',
    penerbit: 'Jurnal Material dan Konstruksi, Vol. 13 No. 2',
    url: '#',
    prodi: 'Teknik Sipil',
  },
  {
    id: 'p8',
    judul: 'Strategi Pengurangan Timbulan Sampah Berbasis Bank Sampah di Permukiman Padat',
    penulis: ['Dr. Hendra Wijaya, M.Sc.'],
    tahun: 2023,
    jenis: 'buku',
    penerbit: 'Penerbit Universitas Indonesia Press, ISBN 978-602-XXXX',
    prodi: 'Teknik Lingkungan',
  },
  {
    id: 'p9',
    judul: 'Analisis Kerentanan Bangunan Tua terhadap Beban Gempa di Zona Rawan Kota Bogor',
    penulis: ['Dr. Ir. Bambang Susilo, M.T.'],
    tahun: 2022,
    jenis: 'jurnal',
    penerbit: 'Jurnal Rekayasa Struktur dan Infrastruktur, Vol. 3 No. 1',
    url: '#',
    prodi: 'Teknik Sipil',
  },
  {
    id: 'p10',
    judul: 'Kinerja IPAL Komunal di Kawasan Pemukiman Informal: Evaluasi 3 Tahun Operasi',
    penulis: ['Dr. Amalia Fitri, M.T.', 'Dr. Hendra Wijaya, M.Sc.'],
    tahun: 2022,
    jenis: 'jurnal',
    penerbit: 'Environmental Engineering Journal, Vol. 8 No. 2',
    url: '#',
    prodi: 'Teknik Lingkungan',
  },
];

const jenisLabel: Record<string, string> = { jurnal: 'Jurnal', prosiding: 'Prosiding', buku: 'Buku' };
const jenisColor: Record<string, string> = {
  jurnal: 'bg-blue-100 text-blue-800',
  prosiding: 'bg-purple-100 text-purple-800',
  buku: 'bg-amber-100 text-amber-800',
};

const tahunList = [...new Set(publikasiList.map((p) => p.tahun))].sort((a, b) => b - a);
const jenisList = ['jurnal', 'prosiding', 'buku'] as const;

export default function PublikasiContent() {
  const [filterTahun, setFilterTahun] = useState<number | null>(null);
  const [filterJenis, setFilterJenis] = useState<string | null>(null);

  const filtered = publikasiList.filter((p) => {
    if (filterTahun && p.tahun !== filterTahun) return false;
    if (filterJenis && p.jenis !== filterJenis) return false;
    return true;
  });

  return (
    <article className="space-y-6">
      <div className="bg-[#F0F4F8] rounded-xl p-5">
        <p className="text-sm text-gray-700 leading-relaxed">
          Database publikasi ilmiah dosen STTPU. Total <strong>{publikasiList.length} publikasi</strong> terdaftar
          — mencakup artikel jurnal nasional/internasional, prosiding konferensi, dan buku teks.
        </p>
      </div>

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
                <p className="text-xs text-gray-500 mb-0.5">{pub.penulis.join('; ')}</p>
                <p className="text-xs text-gray-400">{pub.penerbit} · {pub.tahun}</p>
                {pub.url && (
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
    </article>
  );
}
