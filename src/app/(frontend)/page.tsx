import HeroSection from '@/components/sections/HeroSection';
import StatsBar from '@/components/sections/StatsBar';
import ProgramStudiSection from '@/components/sections/ProgramStudiSection';
import PersonaQuickLinks from '@/components/sections/PersonaQuickLinks';
import BeritaTerakhirSection from '@/components/sections/BeritaTerakhirSection';
import AkreditasiSection from '@/components/sections/AkreditasiSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import WhatsAppFloat from '@/components/sections/WhatsAppFloat';
import { getPayloadClient } from '@/lib/payload';
import { buildPageMetadata } from '@/lib/seo';
import {
  artikelList as artikelStatic,
  getArtikelKategoriLabel,
  mapPayloadToArtikel,
} from '@/lib/data/berita';

export const revalidate = 3600; // Cache for 1 hour

export const metadata = buildPageMetadata({
  title: 'Beranda | STTPU Jakarta',
  description:
    'Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta — Pendidikan vokasi teknologi konstruksi, arsitektur, dan teknologi informasi terbaik sejak 1987.',
  path: '/',
});

type TabLink = { icon: string; label: string; href: string; external?: boolean }
type Tab = { id: string; label: string; links: TabLink[] }

const defaultHomePageData = {
  heroSlides: [
    {
      badge: 'Sekolah Tinggi Teknologi',
      judul: 'Membangun Talenta Infrastruktur Indonesia',
      subjudul: 'STTPU Jakarta menghadirkan pendidikan vokasi teknologi yang terhubung dengan kebutuhan industri konstruksi, sumber daya air, dan infrastruktur masa depan.',
      cta1Teks: 'Lihat Program Studi',
      cta1Href: '/akademik/program-studi',
      cta2Teks: 'Hubungi Kami',
      cta2Href: '/kontak',
    }
  ],
  statistik: [
    { angka: '4', label: 'Program Studi' },
    { angka: '3.000+', label: 'Alumni' },
    { angka: '45+', label: 'Mitra Industri' },
    { angka: '1987', label: 'Tahun Berdiri' },
  ],
};

async function fetchHomePageData() {
  try {
    const payload = await getPayloadClient()
    
    const [halamanUtamaRes, siteSettingsRes, beritaRes] = await Promise.allSettled([
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

    const halamanUtama = halamanUtamaRes.status === 'fulfilled' ? halamanUtamaRes.value : null
    const siteSettings = siteSettingsRes.status === 'fulfilled' ? siteSettingsRes.value : null
    const beritaDocs = beritaRes.status === 'fulfilled' ? beritaRes.value.docs : []

    const mappedBerita = beritaDocs.length > 0 ? beritaDocs.map(mapPayloadToArtikel) : artikelStatic.slice(0, 4)
    
    // Inject top 2 latest news into hero slides
    const newsSlides = mappedBerita.slice(0, 2).map((artikel) => ({
      badge: `BERITA TERKINI — ${getArtikelKategoriLabel(artikel.kategori).toUpperCase() || 'WARTA'}`,
      judul: artikel.judul,
      subjudul: artikel.ringkasan,
      cta1Teks: 'Baca Selengkapnya',
      cta1Href: `/berita/${artikel.slug}`,
      cta2Teks: 'Semua Berita',
      cta2Href: '/berita',
      background: artikel.thumbnailUrl ? { url: artikel.thumbnailUrl } : undefined
    }))
    
    const baseHalamanUtama = halamanUtama ? { ...defaultHomePageData, ...halamanUtama } : defaultHomePageData
    
    // Prepend news slides to existing slides from Payload
    baseHalamanUtama.heroSlides = [...newsSlides, ...(baseHalamanUtama.heroSlides || [])]

    return {
      halamanUtama: baseHalamanUtama,
      siteSettings,
      berita: mappedBerita
    }
  } catch (error) {
    console.error('Error in fetchHomePageData:', error)
    return {
      halamanUtama: defaultHomePageData,
      siteSettings: null,
      berita: artikelStatic.slice(0, 4)
    }
  }
}

export default async function HomePage() {
  const { halamanUtama, siteSettings, berita } = await fetchHomePageData()

  const quickLinksTabs = (halamanUtama as unknown as { quickLinksTabs?: Tab[] })?.quickLinksTabs || []
  const waNumber = (siteSettings as { whatsapp?: string })?.whatsapp || undefined
  const stats = (halamanUtama as { statistik?: { angka: string; label: string }[] })?.statistik || defaultHomePageData.statistik

  return (
    <>
      <HeroSection data={halamanUtama as Parameters<typeof HeroSection>[0]['data']} />
      
      <StatsBar items={stats as { angka: string; label: string }[]} />

      <BeritaTerakhirSection artikelList={berita} />

      <ProgramStudiSection />

      <PersonaQuickLinks tabs={quickLinksTabs} />

      <AkreditasiSection />

      <TestimonialSection />

      <WhatsAppFloat waNumber={waNumber as string | undefined} />
    </>
  );
}
