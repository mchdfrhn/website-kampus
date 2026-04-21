import Link from 'next/link';
import { ArrowRight, FlaskConical, BookOpen, DollarSign } from 'lucide-react';
import BlueAbstractBackground from '@/components/ui/BlueAbstractBackground';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getPayloadClient } from '@/lib/payload';

const defaultStats = [
  { label: 'Peneliti Aktif', value: '42+' },
  { label: 'Unit Riset & Lab', value: '5' },
  { label: 'Publikasi (5 Tahun)', value: '120+' },
  { label: 'Hibah Diterima', value: '18' },
];

const defaultSections = [
  {
    href: '/penelitian/unit',
    icon: FlaskConical,
    title: 'Unit Penelitian & Laboratorium',
    desc: 'Pusat riset terapan dan laboratorium penunjang yang mendukung kegiatan penelitian dosen dan mahasiswa STTPU.',
    cta: 'Lihat Unit & Lab',
  },
  {
    href: '/penelitian/publikasi',
    icon: BookOpen,
    title: 'Database Publikasi',
    desc: 'Kumpulan karya ilmiah, jurnal, prosiding, dan buku yang dihasilkan sivitas akademika STTPU.',
    cta: 'Lihat Publikasi',
  },
  {
    href: '/penelitian/hibah',
    icon: DollarSign,
    title: 'Hibah & Pendanaan',
    desc: 'Informasi skema hibah penelitian dari Kemendikti, PUPR, dan mitra industri yang tersedia bagi dosen STTPU.',
    cta: 'Lihat Hibah',
  },
];

const defaultContent = {
  heroTitle: 'Penelitian & Pengabdian',
  heroDescription:
    'STTPU mendorong budaya riset terapan yang relevan dengan kebutuhan pembangunan infrastruktur dan pengelolaan sumber daya alam Indonesia.',
}

type StatItem = { label: string; value: string }
type SectionItem = { title: string; desc: string; cta?: string; href: string }

const iconMap: Record<string, typeof FlaskConical> = {
  '/penelitian/unit': FlaskConical,
  '/penelitian/publikasi': BookOpen,
  '/penelitian/hibah': DollarSign,
}

export default async function PenelitianOverview() {
  let content = defaultContent
  let stats = defaultStats
  let sections: SectionItem[] = defaultSections.map(({ href, title, desc, cta }) => ({ href, title, desc, cta }))

  try {
    const payload = await getPayloadClient()
    const global = await payload.findGlobal({ slug: 'penelitian-page' as never })
    const data = global as {
      heroTitle?: string
      heroDescription?: string
      stats?: StatItem[]
      sections?: SectionItem[]
    }

    content = {
      heroTitle: data.heroTitle || defaultContent.heroTitle,
      heroDescription: data.heroDescription || defaultContent.heroDescription,
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

  return (
    <>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Breadcrumbs 
            customItems={[
              { label: 'Penelitian & Pengabdian', href: '/penelitian' }
            ]} 
          />
        </div>
      </div>
      <div className="bg-brand-navy text-white px-6 py-16 relative overflow-hidden">
        <BlueAbstractBackground />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="font-bold text-3xl md:text-4xl mb-4 tracking-tight">{content.heroTitle}</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
            {content.heroDescription}
          </p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-brand-navy tracking-tight">{s.value}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-3 gap-8">
          {sections.map((sec) => (
            <Link
              key={sec.href}
              href={sec.href}
              className="group bg-white border border-gray-100 rounded-2xl p-8 hover:border-brand-navy hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-brand-navy transition-all duration-300">
                {(() => {
                  const Icon = iconMap[sec.href] || FlaskConical
                  return <Icon size={22} className="text-brand-navy group-hover:text-white transition-colors" aria-hidden="true" />
                })()}
              </div>
              <h2 className="font-bold text-brand-navy text-lg mb-3 tracking-tight group-hover:text-brand-gold transition-colors">{sec.title}</h2>
              <p className="text-gray-500 text-sm leading-relaxed flex-1 font-medium">{sec.desc}</p>
              <span className="inline-flex items-center gap-2 text-[10px] text-brand-navy font-bold uppercase tracking-wider mt-6 group-hover:text-brand-gold transition-colors">
                {sec.cta || 'Selengkapnya'} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
