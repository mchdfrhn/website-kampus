import { History, Target, Users, ShieldCheck, Building2, Landmark, Handshake } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';
import OverviewPageLayout from '@/components/layout/OverviewPageLayout';
import { resolveTentangSections, type PayloadSectionMeta } from '@/lib/frontend-section-routing';
import { synchronizeOverviewSections } from '@/lib/section-links';

const defaultSections = [
  {
    icon: History,
    title: 'Sejarah & Profil',
    desc: 'Perjalanan STTPU sejak 1987 hingga menjadi perguruan tinggi vokasi teknologi terkemuka di Jakarta.',
    href: '/tentang/sejarah',
  },
  {
    icon: Target,
    title: 'Visi, Misi & Nilai',
    desc: 'Arah, tujuan, dan nilai-nilai yang menjadi landasan setiap kegiatan akademik dan non-akademik STTPU.',
    href: '/tentang/visi-misi',
  },
  {
    icon: Users,
    title: 'Profil Pimpinan',
    desc: 'Kenali Ketua, Wakil Ketua, dan jajaran pimpinan yang mengelola STTPU dengan dedikasi penuh.',
    href: '/tentang/pimpinan',
  },
  {
    icon: ShieldCheck,
    title: 'Akreditasi & Legalitas',
    desc: 'Status akreditasi BAN-PT per program studi dan dokumen legalitas resmi institusi yang dapat diverifikasi.',
    href: '/tentang/akreditasi',
  },
  {
    icon: Landmark,
    title: 'Struktur Organisasi',
    desc: 'Bagan dan daftar pejabat struktural, kepala program studi, serta unit pelaksana teknis STTPU.',
    href: '/tentang/struktur-organisasi',
  },
  {
    icon: Building2,
    title: 'Fasilitas Kampus',
    desc: 'Laboratorium, perpustakaan, fasilitas olahraga, dan infrastruktur digital yang mendukung proses belajar.',
    href: '/tentang/fasilitas',
  },
  {
    icon: Handshake,
    title: 'Kerjasama & Mitra',
    desc: 'Mitra industri, akademik, dan pemerintah yang berkolaborasi bersama STTPU dalam memajukan pendidikan teknologi.',
    href: '/tentang/kerjasama',
  },
];

const defaultStats = [
  { value: '1987', label: 'Tahun Berdiri' },
  { value: '4', label: 'Program Studi' },
  { value: '3.000+', label: 'Alumni' },
  { value: 'Baik Sekali', label: 'Akreditasi Institusi' },
];

const defaultContent = {
  title: 'Tentang STTPU',
  description:
    'Membangun masa depan infrastruktur Indonesia melalui pendidikan vokasi yang inovatif, berintegritas, dan kompeten.',
  commitmentTitle: 'Komitmen Kami',
  commitmentText:
    'Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta adalah pilar utama pengembangan sumber daya manusia di bidang teknologi infrastruktur. Sejak 1987, kami fokus pada kurikulum yang selaras dengan kebutuhan industri (Link and Match) untuk memastikan setiap lulusan siap menghadapi tantangan pembangunan nasional.',
}

type OverviewSection = { title: string; desc: string; href: string }
type OverviewStat = { value: string; label: string }

const iconMap: Record<string, typeof History> = {
  '/tentang/sejarah': History,
  '/tentang/visi-misi': Target,
  '/tentang/pimpinan': Users,
  '/tentang/akreditasi': ShieldCheck,
  '/tentang/struktur-organisasi': Landmark,
  '/tentang/fasilitas': Building2,
  '/tentang/kerjasama': Handshake,
}

export default async function TentangOverview() {
  let content = defaultContent
  let sections = defaultSections.map(({ title, desc, href }) => ({ title, desc, href }))
  let stats = defaultStats
  let resolvedSections = resolveTentangSections()

  try {
    const payload = await getPayloadClient()
    const global = await payload.findGlobal({ slug: 'tentang-kami' })
    const data = global as {
      overviewTitle?: string
      overviewDescription?: string
      overviewStats?: OverviewStat[]
      overviewCommitmentTitle?: string
      overviewCommitmentText?: string
      overviewSections?: OverviewSection[]
      subpages?: PayloadSectionMeta[]
    }

    resolvedSections = resolveTentangSections(data.subpages || [])

    content = {
      title: data.overviewTitle || defaultContent.title,
      description: data.overviewDescription || defaultContent.description,
      commitmentTitle: data.overviewCommitmentTitle || defaultContent.commitmentTitle,
      commitmentText: data.overviewCommitmentText || defaultContent.commitmentText,
    }

    if (data.overviewStats && data.overviewStats.length > 0) {
      stats = data.overviewStats
    }

    if (data.overviewSections && data.overviewSections.length > 0) {
      sections = data.overviewSections
    }
  } catch {
    // DB unavailable — use defaults
  }

  sections = synchronizeOverviewSections('/tentang', resolvedSections, sections)

  return (
    <OverviewPageLayout
      title={content.title}
      subtitle={content.description}
      breadcrumbs={[{ label: 'Tentang', href: '/tentang' }]}
      stats={stats}
      statsLabel="Statistik STTPU"
      intro={`${content.commitmentTitle}: ${content.commitmentText}`}
      cards={sections.map((item) => ({
        ...item,
        eyebrow: 'Tentang',
        icon: iconMap[item.href] || History,
      }))}
    />
  );
}
