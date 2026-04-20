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

type TabLink = { icon: string; label: string; href: string; external?: boolean }
type Tab = { id: string; label: string; links: TabLink[] }

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
    // Jika query berhasil, gunakan data dari DB (walaupun kosong)
    return result.docs.map(mapPayloadToArtikel);
  } catch {
    // Hanya jika DB error — gunakan data statis
    return artikelStatic.slice(0, 4);
  }
}

async function fetchQuickLinksTabs(): Promise<Tab[]> {
  try {
    const payload = await getPayloadClient()
    const global = await payload.findGlobal({ slug: 'halaman-utama' })
    const tabs = (global as unknown as { quickLinksTabs?: Tab[] }).quickLinksTabs
    if (tabs && tabs.length > 0) return tabs
  } catch {
    // DB not available — PersonaQuickLinks uses its own static fallback
  }
  return []
}

async function fetchSiteSettings() {
  try {
    const payload = await getPayloadClient()
    return await payload.findGlobal({ slug: 'site-settings' })
  } catch {
    return null
  }
}

export default async function HomePage() {
  const [artikelList, quickLinksTabs, settings] = await Promise.all([
    fetchBeritaTerbaru(),
    fetchQuickLinksTabs(),
    fetchSiteSettings(),
  ])

  const waNumber = settings?.whatsapp || undefined

  return (
    <>
      <HeroSection />
      <StatsBar />
      <ProgramStudiSection />
      <PersonaQuickLinks tabs={quickLinksTabs} />
      <BeritaTerakhirSection artikelList={artikelList} />
      <AkreditasiSection />
      <TestimonialSection />
      <WhatsAppFloat waNumber={waNumber} />
    </>
  );
}
