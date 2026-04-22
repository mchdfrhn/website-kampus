import Link from 'next/link';
import { Users, Trophy, Heart, BookOpen, ArrowRight, Flag } from 'lucide-react';
import SectionPageHeader from '@/components/layout/SectionPageHeader';
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
    <>
      <SectionPageHeader
        title={content.heroTitle}
        subtitle={content.heroDescription}
        breadcrumbs={[{ label: 'Kemahasiswaan', href: '/kemahasiswaan' }]}
      />

      <section className="bg-white border-b border-gray-100 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ul className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <li key={s.label} className="text-center">
                <p className="font-bold text-2xl sm:text-3xl text-brand-navy tracking-tight break-words">{s.value}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mb-10 sm:mb-12 font-medium">
          {content.introText}
        </p>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {sections.map((item) => {
            const Icon = iconMap[item.href] || Flag;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex flex-col h-full rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 hover:border-brand-navy hover:shadow-premium-hover hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gray-50 group-hover:bg-brand-navy rounded-xl flex items-center justify-center mb-6 transition-all duration-300" aria-hidden="true">
                    <Icon size={20} className="text-brand-navy group-hover:text-brand-gold transition-colors" />
                  </div>
                  <h2 className="font-bold text-brand-navy text-lg mb-3 tracking-tight group-hover:text-brand-gold transition-colors">{item.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 font-medium">{item.desc}</p>
                  <div className="flex items-center gap-2 text-[10px] text-brand-navy font-bold uppercase tracking-wider mt-6 group-hover:text-brand-gold transition-all">
                    Selengkapnya <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
