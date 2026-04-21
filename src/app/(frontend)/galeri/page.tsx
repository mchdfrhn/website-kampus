import type { Metadata } from 'next';
import SectionPageHeader from '@/components/layout/SectionPageHeader';
import { getPayloadClient } from '@/lib/payload';
import GaleriContent, { type Album } from '@/components/sections/galeri/GaleriContent';

export const metadata: Metadata = {
  title: 'Galeri | STTPU Jakarta',
  description:
    'Galeri foto dokumentasi kegiatan, fasilitas, wisuda, dan momen berharga di kampus Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta.',
};

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
    if (result.docs.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return result.docs.map((doc: any): Album => {
        const coverFotoUrl: string | undefined =
          doc.coverFoto && typeof doc.coverFoto === 'object' && doc.coverFoto.url
            ? (doc.coverFoto.url as string)
            : undefined;

        return {
          id: String(doc.id),
          judul: doc.judul ?? '',
          slug: doc.slug ?? '',
          kategori: doc.kategori ?? 'kegiatan',
          deskripsi: doc.deskripsi ?? undefined,
          coverFotoUrl,
          jumlahFoto: doc.foto?.length ?? 0,
          tanggal: doc.tanggal ?? undefined,
        };
      });
    }
  } catch {
    // DB not available — fall through to empty list
  }
  return [];
}

export default async function GaleriPage() {
  const albumList = await fetchAlbumList();

  return (
    <>
      <SectionPageHeader
        title="Galeri"
        subtitle="Dokumentasi kegiatan, fasilitas, dan momen berharga di kampus STTPU Jakarta."
        breadcrumbs={[{ label: 'Galeri', href: '/galeri' }]}
      />
      <GaleriContent albumList={albumList} />
    </>
  );
}
