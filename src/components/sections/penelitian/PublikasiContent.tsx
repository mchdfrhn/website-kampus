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
    <article className="space-y-6">
      <div className="bg-[#F0F4F8] rounded-xl p-5">
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
