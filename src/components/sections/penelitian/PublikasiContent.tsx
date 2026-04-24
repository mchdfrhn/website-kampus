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

export default async function PublikasiContent() {
  let publikasi: Publikasi[] = []

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
    // DB unavailable
  }

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
      <div className="mb-12 text-center lg:mb-16 lg:text-left">
        <h2 className="text-brand-navy font-bold text-3xl md:text-4xl tracking-tight leading-[1.2]">
          Publikasi Ilmiah
        </h2>
        <div className="w-12 h-1 bg-brand-gold rounded-full mt-6 mx-auto lg:mx-0" />
        <p className="mt-8 text-gray-500 font-medium max-w-3xl leading-relaxed mx-auto lg:mx-0 text-sm md:text-base">
          Kumpulan publikasi dosen STTPU Jakarta yang mencerminkan kontribusi institusi pada
          pengembangan ilmu terapan, inovasi, dan diseminasi hasil riset.
        </p>
      </div>

      <div className="bg-brand-mist rounded-xl p-5 border border-gray-200">
        <p className="text-sm text-gray-700 leading-relaxed">
          Database publikasi ilmiah dosen STTPU. Total <strong>{publikasi.length} publikasi</strong> terdaftar
          — mencakup artikel jurnal nasional/internasional, prosiding konferensi, dan buku teks.
        </p>
      </div>

      {publikasi.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 p-10 text-center text-gray-500">
          Data publikasi belum tersedia.
        </div>
      ) : (
        <PublikasiListClient initialPublikasi={publikasi} />
      )}
    </article>
  );
}
