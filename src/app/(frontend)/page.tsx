import HeroSection from '@/components/sections/HeroSection';
import StatsBar from '@/components/sections/StatsBar';
import ProgramStudiSection from '@/components/sections/ProgramStudiSection';
import PersonaQuickLinks from '@/components/sections/PersonaQuickLinks';
import BeritaTerakhirSection from '@/components/sections/BeritaTerakhirSection';
import AkreditasiSection from '@/components/sections/AkreditasiSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import VideoProfileSection from '@/components/sections/VideoProfileSection';
import MitraSection from '@/components/sections/MitraSection';
import WhySttpuSection from '@/components/sections/WhySttpuSection';
import SambutanKetuaSection, {
  type SambutanKetuaData,
} from '@/components/sections/SambutanKetuaSection';
import { getPayloadClient } from '@/lib/payload';
import { buildPageMetadata } from '@/lib/seo';
import {
  artikelList as artikelStatic,
  getArtikelKategoriLabel,
  mapPayloadToArtikel,
} from '@/lib/data/berita';


export const metadata = buildPageMetadata({
  title: 'STTPU Jakarta — Sekolah Tinggi Teknologi Pekerjaan Umum',
  description:
    'Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta — Pendidikan vokasi teknologi konstruksi, arsitektur, dan teknologi informasi terbaik sejak 1987.',
  path: '/',
});

type TabLink = { icon: string; label: string; href: string; external?: boolean }
type Tab = { id: string; label: string; links: TabLink[] }
type WhyItem = { icon?: string | null; title: string; description: string }
type MitraItem = {
  nama: string;
  kategori?: string | null;
  url?: string | null;
  logo?: { url?: string | null; alt?: string | null } | null;
}
type PimpinanDoc = SambutanKetuaData & { urutan?: number | null }
type HeroSlide = {
  urutan?: number | null;
  badge?: string | null;
  judul?: string | null;
  subjudul?: string | null;
  cta1Teks?: string | null;
  cta1Href?: string | null;
  cta2Teks?: string | null;
  cta2Href?: string | null;
  background?: { url: string } | string | null;
}

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
  whyEnabled: true,
  whyEyebrow: 'Alasan Memilih STTPU',
  whyTitle: 'Mengapa Harus Kuliah di STT Pekerjaan Umum Jakarta?',
  whyDescription:
    'STTPU Jakarta dirancang untuk mahasiswa yang ingin masuk ke bidang infrastruktur, pekerjaan umum, lingkungan, dan teknologi dengan arah belajar yang jelas sejak awal.',
  whyProof:
    'Kurikulum dan ekosistem kampus diarahkan untuk menghubungkan teori, kebutuhan lapangan, layanan digital, dan jejaring mitra yang relevan dengan pembangunan Indonesia.',
  whyCtaLabel: 'Lihat Program Studi',
  whyCtaHref: '/akademik/program-studi',
  whyItems: [
    {
      icon: 'Building2',
      title: 'Fokus pada infrastruktur dan pekerjaan umum',
      description:
        'Mahasiswa belajar dalam konteks konstruksi, lingkungan, teknologi, dan kebutuhan pembangunan yang dekat dengan dunia kerja bidang ke-PU-an.',
    },
    {
      icon: 'Network',
      title: 'Terhubung dengan ekosistem pembangunan',
      description:
        'Identitas kampus dibangun di sekitar isu infrastruktur, layanan publik, dan kolaborasi dengan lembaga maupun mitra yang relevan.',
    },
    {
      icon: 'GraduationCap',
      title: 'Program studi punya arah praktis',
      description:
        'Pilihan studi diarahkan untuk membentuk kompetensi yang bisa dipakai di lapangan, bukan hanya memahami teori di ruang kelas.',
    },
    {
      icon: 'BriefcaseBusiness',
      title: 'Membuka jalan ke pengalaman lapangan',
      description:
        'Kegiatan akademik, kemitraan, dan layanan kampus dapat menjadi pintu awal untuk magang, proyek, dan pengenalan dunia profesi.',
    },
  ],
};

async function fetchHomePageData() {
  try {
    const payload = await getPayloadClient()
    
    const [halamanUtamaRes, siteSettingsRes, beritaRes, carouselBeritaRes, mitraRes, pimpinanRes] = await Promise.allSettled([
      payload.findGlobal({ slug: 'halaman-utama', depth: 1 }),
      payload.findGlobal({ slug: 'site-settings', depth: 1 }),
      payload.find({
        collection: 'berita',
        where: { status: { equals: 'terbit' } },
        limit: 4,
        sort: '-tanggalTerbit',
        depth: 1,
      }),
      payload.find({
        collection: 'berita',
        where: {
          and: [
            { status: { equals: 'terbit' } },
            { showInHeroCarousel: { equals: true } },
          ],
        },
        limit: 10,
        sort: 'heroCarouselUrutan,-tanggalTerbit',
        depth: 1,
      }),
      payload.find({
        collection: 'mitra',
        where: { aktif: { equals: true } },
        limit: 40,
        sort: 'urutan',
        depth: 1,
      }),
      payload.find({
        collection: 'pimpinan',
        limit: 20,
        sort: 'urutan',
        depth: 1,
      }),
    ])

    const halamanUtama = halamanUtamaRes.status === 'fulfilled' ? halamanUtamaRes.value : null
    const siteSettings = siteSettingsRes.status === 'fulfilled' ? siteSettingsRes.value : null
    const beritaDocs = beritaRes.status === 'fulfilled' ? beritaRes.value.docs : []
    const carouselBeritaDocs = carouselBeritaRes.status === 'fulfilled' ? carouselBeritaRes.value.docs : []
    const mitraDocs = mitraRes.status === 'fulfilled' ? mitraRes.value.docs : []
    const pimpinanDocs =
      pimpinanRes.status === 'fulfilled' ? (pimpinanRes.value.docs as unknown as PimpinanDoc[]) : []
    const ketua =
      pimpinanDocs.find((person) => person.jabatan?.toLowerCase().includes('ketua')) ||
      pimpinanDocs[0] ||
      null

    const mappedBerita = beritaDocs.length > 0 ? beritaDocs.map(mapPayloadToArtikel) : artikelStatic.slice(0, 4)
    
    // Pastikan berita diurutkan dari yang terbaru (descending)
    const sortedBerita = [...mappedBerita].sort((a, b) => 
      new Date(b.tanggalTerbit).getTime() - new Date(a.tanggalTerbit).getTime()
    )

    const selectedCarouselBerita = carouselBeritaDocs.length > 0 ? carouselBeritaDocs : []

    const newsSlides = selectedCarouselBerita.map((doc) => {
      const artikel = mapPayloadToArtikel(doc)

      return {
        urutan: typeof doc.heroCarouselUrutan === 'number' ? doc.heroCarouselUrutan : 10,
        badge: `BERITA TERKINI — ${getArtikelKategoriLabel(artikel.kategori).toUpperCase() || 'WARTA'}`,
        judul: artikel.judul,
        subjudul: artikel.ringkasan,
        cta1Teks: 'Baca Selengkapnya',
        cta1Href: `/berita/${artikel.slug}`,
        cta2Teks: 'Semua Berita',
        cta2Href: '/berita',
        background: artikel.thumbnailUrl ? { url: artikel.thumbnailUrl } : undefined
      }
    })

    const fallbackNewsSlides = carouselBeritaDocs.length === 0 ? sortedBerita.slice(0, 2).map((artikel, index) => ({
      urutan: index + 1,
      badge: `BERITA TERKINI — ${getArtikelKategoriLabel(artikel.kategori).toUpperCase() || 'WARTA'}`,
      judul: artikel.judul,
      subjudul: artikel.ringkasan,
      cta1Teks: 'Baca Selengkapnya',
      cta1Href: `/berita/${artikel.slug}`,
      cta2Teks: 'Semua Berita',
      cta2Href: '/berita',
      background: artikel.thumbnailUrl ? { url: artikel.thumbnailUrl } : undefined
    })) : []
    
    const baseHalamanUtama = halamanUtama ? { ...defaultHomePageData, ...halamanUtama } : defaultHomePageData
    
    const manualSlides: HeroSlide[] = ((baseHalamanUtama.heroSlides || []) as HeroSlide[])
      .filter((slide) => typeof slide.judul === 'string' && slide.judul.length > 0)
      .map((slide, index) => ({
        ...slide,
        urutan: typeof slide.urutan === 'number' ? slide.urutan : index + 100,
      }))

    const combinedHeroSlides = [...newsSlides, ...fallbackNewsSlides, ...manualSlides]
      .sort((a, b) => (a.urutan ?? 999) - (b.urutan ?? 999))
      .slice(0, 5)
    const typedBaseHalamanUtama = baseHalamanUtama as { heroSlides?: HeroSlide[] }
    typedBaseHalamanUtama.heroSlides = combinedHeroSlides

    return {
      halamanUtama: baseHalamanUtama,
      siteSettings,
      berita: sortedBerita,
      mitra: mitraDocs as unknown as MitraItem[],
      ketua,
    }
  } catch (error) {
    console.error('Error in fetchHomePageData:', error)
    return {
      halamanUtama: defaultHomePageData,
      siteSettings: null,
      berita: artikelStatic.slice(0, 4),
      mitra: [],
      ketua: null,
    }
  }
}

export default async function HomePage() {
  const { halamanUtama, siteSettings, berita, mitra, ketua } = await fetchHomePageData()

  const quickLinksTabs = (halamanUtama as unknown as { quickLinksTabs?: Tab[] })?.quickLinksTabs || []
  const stats = (halamanUtama as { statistik?: { angka: string; label: string }[] })?.statistik || defaultHomePageData.statistik
  const mitraSettings = halamanUtama as {
    mitraEnabled?: boolean | null;
    mitraTitle?: string | null;
    mitraDescription?: string | null;
  }
  const whySettings = halamanUtama as {
    whyEnabled?: boolean | null;
    whyEyebrow?: string | null;
    whyTitle?: string | null;
    whyDescription?: string | null;
    whyProof?: string | null;
    whyCtaLabel?: string | null;
    whyCtaHref?: string | null;
    whyItems?: WhyItem[] | null;
  }

  return (
    <>
      <HeroSection data={halamanUtama as Parameters<typeof HeroSection>[0]['data']} />
      
      <StatsBar items={stats as { angka: string; label: string }[]} />

      {whySettings.whyEnabled !== false && (
        <WhySttpuSection
          eyebrow={whySettings.whyEyebrow}
          title={whySettings.whyTitle}
          description={whySettings.whyDescription}
          proof={whySettings.whyProof}
          ctaLabel={whySettings.whyCtaLabel}
          ctaHref={whySettings.whyCtaHref}
          items={whySettings.whyItems}
        />
      )}

      <SambutanKetuaSection ketua={ketua} />

      <BeritaTerakhirSection artikelList={berita} />

      <ProgramStudiSection />
      
      <VideoProfileSection data={{
        videoJudul: (halamanUtama as any)?.videoJudul,
        videoDeskripsi: (halamanUtama as any)?.videoDeskripsi,
        videoUrl: (halamanUtama as any)?.videoUrl,
        videoThumbnail: (halamanUtama as any)?.videoThumbnail,
      }} />

      <PersonaQuickLinks tabs={quickLinksTabs} />

      <AkreditasiSection />

      {mitraSettings.mitraEnabled !== false && (
        <MitraSection
          title={mitraSettings.mitraTitle}
          description={mitraSettings.mitraDescription}
          items={mitra}
        />
      )}

      <TestimonialSection />
    </>
  );
}
