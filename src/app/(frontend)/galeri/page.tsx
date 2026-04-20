import type { Metadata } from 'next';
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
      <div className="bg-white border-b border-gray-200 px-6 py-2.5 text-sm">
        <div className="max-w-7xl mx-auto text-gray-500">
          <span>Beranda</span>
          <span className="mx-2 text-gray-400">›</span>
          <span className="text-gray-700 font-medium">Galeri</span>
        </div>
      </div>
      <div className="bg-[#1E3A5F] text-white px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-extrabold text-3xl mb-2">Galeri</h1>
          <p className="text-white/85 text-sm leading-relaxed max-w-xl">
            Dokumentasi kegiatan, fasilitas, dan momen berharga di kampus STTPU Jakarta.
          </p>
        </div>
      </div>
      <GaleriContent albumList={albumList} />
    </>
  );
}
