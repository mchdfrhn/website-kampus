import type { Metadata } from 'next';
import BeritaIndexContent from '@/components/sections/berita/BeritaIndexContent';
import SectionPageHeader from '@/components/layout/SectionPageHeader';
import { getPayloadClient } from '@/lib/payload';
import { mapPayloadToArtikel, type Artikel } from '@/lib/data/berita';

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
    return [];
  }
}

export default async function BeritaPage() {
  const artikelList = await fetchArtikelList();

  return (
    <>
      <SectionPageHeader
        title="Berita & Pengumuman"
        subtitle="Informasi resmi, berita terkini, dan pengumuman penting dari Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta."
        breadcrumbs={[{ label: 'Berita & Pengumuman', href: '/berita' }]}
      />
      <BeritaIndexContent artikelList={artikelList} />
    </>
  );
}
