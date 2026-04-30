import type { Metadata } from 'next';
import SectionPageHeader from '@/components/layout/SectionPageHeader';
import { getPayloadClient } from '@/lib/payload';
import GaleriContent from '@/components/sections/galeri/GaleriContent';
import {
  mapPayloadToAlbum,
  resolveGaleriKategori,
  type Album,
  type AlbumKategori,
} from '@/lib/data/galeri';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Galeri | STTPU Jakarta',
  description:
    'Galeri foto dokumentasi kegiatan, fasilitas, wisuda, dan momen berharga di kampus Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta.',
  path: '/galeri',
});


async function fetchAlbumList(): Promise<Album[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'galeri',
      where: { status: { equals: 'terbit' } },
      limit: 100,
      sort: '-tanggal',
      depth: 1,
    });
    if (result.docs.length > 0) return result.docs.map(mapPayloadToAlbum);
  } catch {
    // DB not available — fall through to empty list
  }
  return [];
}

async function fetchKategoriGaleri(): Promise<AlbumKategori[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'kategori-galeri',
      limit: 100,
      sort: 'urutan',
    });

    return result.docs.map(resolveGaleriKategori).filter((item) => item.slug);
  } catch {
    return [];
  }
}

export default async function GaleriPage({
  searchParams,
}: {
  searchParams?: Promise<{ kategori?: string }>;
}) {
  const albumList = await fetchAlbumList();
  const categories = await fetchKategoriGaleri();
  const resolvedSearchParams = (await searchParams) ?? {};
  const initialFilter = resolvedSearchParams.kategori ?? 'semua';

  return (
    <>
      <SectionPageHeader
        title="Galeri"
        subtitle="Dokumentasi kegiatan, fasilitas, dan momen berharga di kampus STTPU Jakarta."
        breadcrumbs={[{ label: 'Galeri', href: '/galeri' }]}
      />
      <GaleriContent
        albumList={albumList}
        categories={categories}
        initialFilter={initialFilter}
      />
    </>
  );
}
