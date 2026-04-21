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
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Breadcrumbs 
            customItems={[
              { label: 'Galeri', href: '/galeri' }
            ]} 
          />
        </div>
      </div>
      <div className="bg-brand-navy text-white px-6 py-12 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="font-bold text-3xl md:text-4xl mb-4 tracking-tight">Galeri</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
            Dokumentasi kegiatan, fasilitas, dan momen berharga di kampus STTPU Jakarta.
          </p>
        </div>
      </div>
      <GaleriContent albumList={albumList} />
    </>
  );
}
