import type { Metadata } from 'next';
import BeritaIndexContent from '@/components/sections/berita/BeritaIndexContent';
import SectionPageHeader from '@/components/layout/SectionPageHeader';
import { getBeritaPageContent } from '@/lib/data/berita-page';
import { getPayloadClient } from '@/lib/payload';
import {
  mapPayloadToArtikel,
  resolveArtikelKategori,
  type Artikel,
  type ArtikelKategori,
} from '@/lib/data/berita';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getBeritaPageContent();

  return buildPageMetadata({
    title: `${pageContent.title || 'Berita & Pengumuman'} | STTPU Jakarta`,
    description:
      pageContent.description ||
      'Berita terkini, pengumuman resmi, dan informasi kegiatan Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta.',
    path: '/berita',
  });
}


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
  const [artikelList, categories, pageContent] = await Promise.all([
    fetchArtikelList(),
    fetchKategoriBerita(),
    getBeritaPageContent(),
  ]);
  const resolvedSearchParams = (await searchParams) ?? {};
  const initialFilter = resolvedSearchParams.kategori ?? 'semua';
  const title = pageContent.title || 'Berita & Pengumuman';
  const description =
    pageContent.description ||
    'Informasi resmi, berita terkini, dan pengumuman penting dari Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta.';

  return (
    <>
      <SectionPageHeader
        title={title}
        subtitle={description}
        breadcrumbs={[{ label: title, href: '/berita' }]}
      />
      <BeritaIndexContent
        artikelList={artikelList}
        categories={categories}
        initialFilter={initialFilter}
        pageContent={pageContent}
      />
    </>
  );
}
