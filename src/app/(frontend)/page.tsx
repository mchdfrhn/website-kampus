import HeroSection from '@/components/sections/HeroSection';
import StatsBar from '@/components/sections/StatsBar';
import ProgramStudiSection from '@/components/sections/ProgramStudiSection';
import PersonaQuickLinks from '@/components/sections/PersonaQuickLinks';
import BeritaTerakhirSection from '@/components/sections/BeritaTerakhirSection';
import AkreditasiSection from '@/components/sections/AkreditasiSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import WhatsAppFloat from '@/components/sections/WhatsAppFloat';
import { getPayloadClient } from '@/lib/payload';
import { artikelList as artikelStatic, mapPayloadToArtikel, type Artikel } from '@/lib/data/berita';

export const metadata = {
  title: 'Beranda | STTPU Jakarta',
  description:
    'Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta — Pendidikan vokasi teknologi konstruksi, arsitektur, dan teknologi informasi terbaik sejak 1987.',
};

async function fetchBeritaTerbaru(): Promise<Artikel[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'berita',
      where: { status: { equals: 'terbit' } },
      limit: 4,
      sort: '-tanggalTerbit',
      depth: 1,
    });
    if (result.docs.length > 0) {
      return result.docs.map(mapPayloadToArtikel);
    }
  } catch {
    // DB not available — fall through to static data
  }
  return artikelStatic.slice(0, 4);
}

export default async function HomePage() {
  const artikelList = await fetchBeritaTerbaru();

  return (
    <>
      <HeroSection />
      <StatsBar />
      <ProgramStudiSection />
      <PersonaQuickLinks />
      <BeritaTerakhirSection artikelList={artikelList} />
      <AkreditasiSection />
      <TestimonialSection />
      <WhatsAppFloat />
    </>
  );
}
