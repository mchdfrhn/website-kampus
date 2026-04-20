import { getPayloadClient } from '@/lib/payload';
import PublikasiListClient from './PublikasiListClient';

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

const defaults: Publikasi[] = [
  {
    id: 'p1',
    judul: 'Analisis Kapasitas Dukung Fondasi Tiang Bor pada Tanah Lunak Jakarta Utara',
    penulis: [{ nama: 'Dr. Rudi Santoso, M.T.' }, { nama: 'Ir. Agus Priyono, M.T.' }],
    tahun: 2024,
    jenis: 'jurnal',
    penerbit: 'Jurnal Teknik Sipil dan Perencanaan, Vol. 26 No. 1',
    url: '#',
    prodi: 'Teknik Sipil',
  },
  {
    id: 'p2',
    judul: 'Efisiensi Irigasi Tetes pada Lahan Pertanian Perkotaan: Studi Kasus Kalideres',
    penulis: [{ nama: 'Dr. Siti Rahayu, M.T.' }, { nama: 'Ir. Farida Hanum, M.T.' }],
    tahun: 2024,
    jenis: 'jurnal',
    penerbit: 'Jurnal Irigasi, Vol. 19 No. 2',
    url: '#',
    prodi: 'Teknik Pengairan',
  },
];

export default async function PublikasiContent() {
  let publikasi = defaults

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'publikasi',
      sort: '-tahun,urutan',
      limit: 100,
    })
    if (result.docs.length > 0) {
      publikasi = result.docs as unknown as Publikasi[]
    }
  } catch {
    // DB unavailable — use defaults
  }

  return (
    <article className="space-y-6">
      <div className="bg-[#F0F4F8] rounded-xl p-5">
        <p className="text-sm text-gray-700 leading-relaxed">
          Database publikasi ilmiah dosen STTPU. Total <strong>{publikasi.length} publikasi</strong> terdaftar
          — mencakup artikel jurnal nasional/internasional, prosiding konferensi, dan buku teks.
        </p>
      </div>

      <PublikasiListClient initialPublikasi={publikasi} />
    </article>
  );
}
