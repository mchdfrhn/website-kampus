import Link from 'next/link';
import { History, Target, Users, ShieldCheck, Building2, Landmark, ArrowRight } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';
import SectionPageHeader from '@/components/layout/SectionPageHeader';
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
    <>
      <SectionPageHeader title={content.title} subtitle={content.description} />

      <section className="bg-white border-b border-gray-50 px-4 py-10 sm:px-6 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <ul className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4" aria-label="Statistik STTPU">
            {stats.map((stat) => (
              <li key={stat.label} className="text-center group">
                <p className="font-black text-2xl sm:text-3xl text-brand-navy group-hover:text-brand-gold transition-colors break-words">{stat.value}</p>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl mb-12 sm:mb-16 lg:mb-20">
             <h2 className="text-2xl sm:text-3xl font-black text-brand-navy mb-5 sm:mb-6 tracking-tight uppercase">{content.commitmentTitle}</h2>
             <div className="w-12 h-1 bg-brand-gold rounded-full mb-8" />
             <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-medium">
              {content.commitmentText}
             </p>
          </div>

          <ul className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3" aria-label="Navigasi halaman tentang">
            {sections.map((item) => {
              const Icon = iconMap[item.href] || History;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex h-full flex-col items-center rounded-[2rem] border border-gray-100 bg-gray-50 p-6 text-center sm:rounded-[2.25rem] sm:p-8 lg:rounded-[2.5rem] lg:p-10 hover:bg-brand-navy hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-500"
                  >
                    <div
                      className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm transition-colors group-hover:bg-brand-gold sm:mb-8"
                      aria-hidden="true"
                    >
                      <Icon size={20} className="text-brand-navy group-hover:text-brand-navy" />
                    </div>
                    <h3 className="mb-4 text-lg font-black uppercase tracking-tight text-brand-navy transition-colors group-hover:text-brand-gold">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1 group-hover:text-white/60 transition-colors font-medium">{item.desc}</p>
                    <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-navy transition-all group-hover:text-white">
                      Eksplorasi
                      <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" aria-hidden="true" />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
