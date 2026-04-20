import type { Metadata } from 'next';
import BeritaIndexContent from '@/components/sections/berita/BeritaIndexContent';
import { getPayloadClient } from '@/lib/payload';
import { artikelList as artikelStatic, mapPayloadToArtikel, type Artikel } from '@/lib/data/berita';

export const metadata: Metadata = {
  title: 'Berita & Pengumuman | STTPU Jakarta',
  description:
    'Berita terkini, pengumuman resmi, dan informasi kegiatan Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta.',
};

async function fetchArtikelList(): Promise<Artikel[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'berita',
      where: { status: { equals: 'terbit' } },
      limit: 100,
      sort: '-tanggalTerbit',
      depth: 1,
    });
    return result.docs.map(mapPayloadToArtikel);
  } catch {
    return artikelStatic;
  }
}

export default async function BeritaPage() {
  const artikelList = await fetchArtikelList();

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-6 py-2.5 text-sm">
        <div className="max-w-7xl mx-auto text-gray-500">
          <span>Beranda</span>
          <span className="mx-2 text-gray-400">›</span>
          <span className="text-gray-700 font-medium">Berita & Pengumuman</span>
        </div>
      </div>
      <div className="bg-[#1E3A5F] text-white px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-extrabold text-3xl mb-2">Berita &amp; Pengumuman</h1>
          <p className="text-white/85 text-sm leading-relaxed max-w-xl">
            Informasi resmi, berita terkini, dan pengumuman penting dari Sekolah Tinggi Teknologi
            Pekerjaan Umum Jakarta.
          </p>
        </div>
      </div>
      <BeritaIndexContent artikelList={artikelList} />
    </>
  );
}
