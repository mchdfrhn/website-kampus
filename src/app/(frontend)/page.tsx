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

export const revalidate = 3600; // Cache for 1 hour

export const metadata = {
  title: 'Beranda | STTPU Jakarta',
  description:
    'Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta — Pendidikan vokasi teknologi konstruksi, arsitektur, dan teknologi informasi terbaik sejak 1987.',
};

type TabLink = { icon: string; label: string; href: string; external?: boolean }
type Tab = { id: string; label: string; links: TabLink[] }

async function fetchHomePageData() {
  try {
    const payload = await getPayloadClient()
    const [halamanUtama, siteSettings, berita] = await Promise.all([
      payload.findGlobal({ slug: 'halaman-utama', depth: 1 }),
      payload.findGlobal({ slug: 'site-settings', depth: 1 }),
      payload.find({
        collection: 'berita',
        where: { status: { equals: 'terbit' } },
        limit: 4,
        sort: '-tanggalTerbit',
        depth: 1,
      })
    ])

    return {
      halamanUtama,
      siteSettings,
      berita: berita.docs.map(mapPayloadToArtikel)
    }
  } catch (error) {
    console.error('Error fetching home page data:', error)
    return {
      halamanUtama: null,
      siteSettings: null,
      berita: artikelStatic.slice(0, 4)
    }
  }
}

export default async function HomePage() {
  const { halamanUtama, siteSettings, berita } = await fetchHomePageData()

  const quickLinksTabs = (halamanUtama as unknown as { quickLinksTabs?: Tab[] })?.quickLinksTabs || []
  const waNumber = (siteSettings as { whatsapp?: string })?.whatsapp || undefined
  const stats = (halamanUtama as { statistik?: { angka: string; label: string }[] })?.statistik || []

  return (
    <>
      <HeroSection data={halamanUtama as Parameters<typeof HeroSection>[0]['data']} />
      <StatsBar items={stats as { angka: string; label: string }[]} />
      <ProgramStudiSection />
      <PersonaQuickLinks tabs={quickLinksTabs} />
      <BeritaTerakhirSection artikelList={berita} />
      <AkreditasiSection />
      <TestimonialSection />
      <WhatsAppFloat waNumber={waNumber as string | undefined} />
    </>
  );
}
