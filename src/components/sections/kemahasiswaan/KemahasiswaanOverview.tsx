import { Users, Trophy, Heart, BookOpen, Flag } from 'lucide-react';
import OverviewPageLayout from '@/components/layout/OverviewPageLayout';
import { getPayloadClient } from '@/lib/payload';
import { resolveKemahasiswaanSections, type PayloadSectionMeta } from '@/lib/frontend-section-routing';
import { synchronizeOverviewSections } from '@/lib/section-links';

const defaultSections = [
  { icon: Flag, title: 'Organisasi Mahasiswa', desc: 'BEM dan Senat Mahasiswa sebagai wadah aspirasi dan kepemimpinan.', href: '/kemahasiswaan/organisasi' },
  { icon: Users, title: 'Unit Kegiatan Mahasiswa', desc: '12 UKM aktif mencakup bidang olahraga, seni, riset, dan sosial kemasyarakatan.', href: '/kemahasiswaan/ukm' },
  { icon: Trophy, title: 'Prestasi Mahasiswa', desc: 'Rekam jejak pencapaian mahasiswa di kompetisi nasional dan internasional.', href: '/kemahasiswaan/prestasi' },
  { icon: Heart, title: 'Layanan Mahasiswa', desc: 'Bimbingan konseling, career center, kesehatan, dan layanan administrasi mahasiswa.', href: '/kemahasiswaan/layanan' },
  { icon: BookOpen, title: 'Panduan Mahasiswa Baru', desc: 'Panduan lengkap orientasi, sistem akademik, dan tips sukses perkuliahan di STTPU.', href: '/kemahasiswaan/mahasiswa-baru' },
];

const defaultStats = [
  { value: '1.200+', label: 'Mahasiswa Aktif' },
  { value: '12', label: 'UKM Aktif' },
  { value: '45+', label: 'Prestasi/Tahun' },
  { value: '4', label: 'Organisasi Mahasiswa' },
];

const defaultContent = {
  heroTitle: 'Kemahasiswaan',
  heroDescription:
    'Kehidupan kampus STTPU yang dinamis — dari organisasi dan UKM hingga layanan mahasiswa dan rekam prestasi yang membanggakan.',
  introText:
    'STTPU percaya bahwa pendidikan terbaik tidak hanya terjadi di dalam kelas. Kehidupan kemahasiswaan yang aktif membentuk karakter, kepemimpinan, dan kompetensi lunak yang dibutuhkan di dunia kerja.',
}

type SectionItem = { title: string; desc: string; href: string }
type StatItem = { value: string; label: string }

const iconMap: Record<string, typeof Flag> = {
  '/kemahasiswaan/organisasi': Flag,
  '/kemahasiswaan/ukm': Users,
  '/kemahasiswaan/prestasi': Trophy,
  '/kemahasiswaan/layanan': Heart,
  '/kemahasiswaan/mahasiswa-baru': BookOpen,
}

export default async function KemahasiswaanOverview() {
  let content = defaultContent
  let sections = defaultSections.map(({ title, desc, href }) => ({ title, desc, href }))
  let stats = defaultStats
  let resolvedSections = resolveKemahasiswaanSections()

  try {
    const payload = await getPayloadClient()
    const global = await payload.findGlobal({ slug: 'kemahasiswaan-page' as never })
    const data = global as {
      heroTitle?: string
      heroDescription?: string
      introText?: string
      stats?: StatItem[]
      sections?: SectionItem[]
      subpages?: PayloadSectionMeta[]
    }

    resolvedSections = resolveKemahasiswaanSections(data.subpages || [])

    content = {
      heroTitle: data.heroTitle || defaultContent.heroTitle,
      heroDescription: data.heroDescription || defaultContent.heroDescription,
      introText: data.introText || defaultContent.introText,
    }

    if (data.stats && data.stats.length > 0) {
      stats = data.stats
    }

    if (data.sections && data.sections.length > 0) {
      sections = data.sections
    }
  } catch {
    // DB unavailable — use defaults
  }

  sections = synchronizeOverviewSections('/kemahasiswaan', resolvedSections, sections)

  return (
    <OverviewPageLayout
      title={content.heroTitle}
      subtitle={content.heroDescription}
      breadcrumbs={[{ label: 'Kemahasiswaan', href: '/kemahasiswaan' }]}
      stats={stats}
      statsLabel="Statistik Kemahasiswaan"
      intro={content.introText}
      cards={sections.map((item) => ({
        ...item,
        eyebrow: 'Kemahasiswaan',
        icon: iconMap[item.href] || Flag,
      }))}
    />
  );
}
