import type { Metadata } from 'next';
import BeritaIndexContent from '@/components/sections/berita/BeritaIndexContent';
import SectionPageHeader from '@/components/layout/SectionPageHeader';
import { getPayloadClient } from '@/lib/payload';
import {
  mapPayloadToArtikel,
  resolveArtikelKategori,
  type Artikel,
  type ArtikelKategori,
} from '@/lib/data/berita';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Berita & Pengumuman | STTPU Jakarta',
  description:
    'Berita terkini, pengumuman resmi, dan informasi kegiatan Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta.',
  path: '/berita',
});


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

async function fetchKategoriBerita(): Promise<ArtikelKategori[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'kategori-berita',
      limit: 100,
      sort: 'urutan',
    });

    return result.docs.map(resolveArtikelKategori).filter((item) => item.slug);
  } catch {
    return [];
  }
}

export default async function BeritaPage({
  searchParams,
}: {
  searchParams?: Promise<{ kategori?: string }>;
}) {
  const artikelList = await fetchArtikelList();
  const categories = await fetchKategoriBerita();
  const resolvedSearchParams = (await searchParams) ?? {};
  const initialFilter = resolvedSearchParams.kategori ?? 'semua';

  return (
    <>
      <SectionPageHeader
        title="Berita & Pengumuman"
        subtitle="Informasi resmi, berita terkini, dan pengumuman penting dari Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta."
        breadcrumbs={[{ label: 'Berita & Pengumuman', href: '/berita' }]}
      />
      <BeritaIndexContent
        artikelList={artikelList}
        categories={categories}
        initialFilter={initialFilter}
      />
    </>
  );
}
