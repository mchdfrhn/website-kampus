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
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Breadcrumbs 
            customItems={[
              { label: 'Berita & Pengumuman', href: '/berita' }
            ]} 
          />
        </div>
      </div>
      <div className="bg-brand-navy text-white px-6 py-12 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="font-bold text-3xl md:text-4xl mb-4 tracking-tight">Berita & Pengumuman</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
            Informasi resmi, berita terkini, dan pengumuman penting dari Sekolah Tinggi Teknologi
            Pekerjaan Umum Jakarta.
          </p>
        </div>
      </div>
      <BeritaIndexContent artikelList={artikelList} />
    </>
  );
}
