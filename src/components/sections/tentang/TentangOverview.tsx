import Link from 'next/link';
import { History, Target, Users, ShieldCheck, Building2, Landmark, ArrowRight } from 'lucide-react';
import BlueAbstractBackground from '@/components/ui/BlueAbstractBackground';
import { getPayloadClient } from '@/lib/payload';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

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
    }

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

  return (
    <>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Breadcrumbs />
        </div>
      </div>

      <div className="bg-brand-navy text-white px-6 py-20 relative overflow-hidden">
        <BlueAbstractBackground />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-black text-4xl lg:text-5xl mb-6 tracking-tight leading-tight uppercase">{content.title}</h1>
            <div className="w-16 h-1 bg-brand-gold rounded-full mb-8" />
            <p className="text-white/70 text-lg font-medium leading-relaxed">
              {content.description}
            </p>
          </div>
        </div>
      </div>

      <section className="bg-white border-b border-gray-50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-8" aria-label="Statistik STTPU">
            {stats.map((stat) => (
              <li key={stat.label} className="text-center group">
                <p className="font-black text-3xl text-brand-navy group-hover:text-brand-gold transition-colors">{stat.value}</p>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl mb-20">
             <h2 className="text-2xl font-black text-brand-navy mb-6 tracking-tight uppercase">{content.commitmentTitle}</h2>
             <div className="w-12 h-1 bg-brand-gold rounded-full mb-8" />
             <p className="text-gray-600 text-lg leading-relaxed font-medium">
              {content.commitmentText}
             </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-label="Navigasi halaman tentang">
            {sections.map((item) => {
              const Icon = iconMap[item.href] || History;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex flex-col h-full p-10 bg-gray-50 border border-gray-100 rounded-[2.5rem] hover:bg-brand-navy hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-500"
                  >
                    <div
                      className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-brand-gold transition-colors"
                      aria-hidden="true"
                    >
                      <Icon size={20} className="text-brand-navy group-hover:text-brand-navy" />
                    </div>
                    <h3 className="font-black text-brand-navy text-lg mb-4 group-hover:text-brand-gold transition-colors uppercase tracking-tight">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1 group-hover:text-white/60 transition-colors font-medium">{item.desc}</p>
                    <div className="flex items-center gap-2 text-brand-navy text-[10px] font-black uppercase tracking-widest mt-8 group-hover:text-white transition-all">
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
