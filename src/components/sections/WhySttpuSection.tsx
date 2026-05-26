import Link from 'next/link';
import Image from 'next/image';
import * as LucideIcons from 'lucide-react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/ui/motion/Reveal';

type WhyItem = {
  icon?: string | null;
  background?: { url?: string | null; alt?: string | null } | string | null;
  title: string;
  description: string;
};

type WhySttpuSectionProps = {
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  proof?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  items?: WhyItem[] | null;
};

const defaultItems: WhyItem[] = [
  {
    icon: 'Building2',
    background: {
      url: '/images/why-sttpu/01-infrastruktur.webp',
      alt: 'Mahasiswa teknik meninjau rencana infrastruktur',
    },
    title: 'Fokus pada infrastruktur dan pekerjaan umum',
    description:
      'Mahasiswa belajar dalam konteks konstruksi, lingkungan, teknologi, dan kebutuhan pembangunan yang dekat dengan dunia kerja bidang ke-PU-an.',
  },
  {
    icon: 'Network',
    background: {
      url: '/images/why-sttpu/02-ekosistem.webp',
      alt: 'Visual ekosistem pembangunan dan jaringan infrastruktur',
    },
    title: 'Terhubung dengan ekosistem pembangunan',
    description:
      'Identitas kampus dibangun di sekitar isu infrastruktur, layanan publik, dan kolaborasi dengan lembaga maupun mitra yang relevan.',
  },
  {
    icon: 'GraduationCap',
    background: {
      url: '/images/why-sttpu/03-praktis.webp',
      alt: 'Pembelajaran praktis di ruang kelas dan laboratorium teknik',
    },
    title: 'Program studi punya arah praktis',
    description:
      'Pilihan studi diarahkan untuk membentuk kompetensi yang bisa dipakai di lapangan, bukan hanya memahami teori di ruang kelas.',
  },
  {
    icon: 'BriefcaseBusiness',
    background: {
      url: '/images/why-sttpu/04-lapangan.webp',
      alt: 'Kegiatan lapangan dengan perlengkapan survei infrastruktur',
    },
    title: 'Membuka jalan ke pengalaman lapangan',
    description:
      'Kegiatan akademik, kemitraan, dan layanan kampus dapat menjadi pintu awal untuk magang, proyek, dan pengenalan dunia profesi.',
  },
  {
    icon: 'Rocket',
    background: {
      url: '/images/why-sttpu/05-digital.webp',
      alt: 'Layanan kampus digital dan ruang belajar modern',
    },
    title: 'Kampus sedang tumbuh secara digital',
    description:
      'Portal akademik, LMS, layanan pengajuan, dan kanal informasi kampus membantu mahasiswa mengakses proses belajar dengan lebih tertata.',
  },
  {
    icon: 'MapPinned',
    background: {
      url: '/images/why-sttpu/06-arah-karier.webp',
      alt: 'Mahasiswa dengan arah karier di bidang infrastruktur',
    },
    title: 'Cocok untuk mahasiswa yang ingin arah jelas',
    description:
      'STTPU menjadi pilihan bagi calon mahasiswa yang ingin membangun karier di bidang infrastruktur, lingkungan, dan teknologi terapan.',
  },
];

function getBackgroundUrl(background?: WhyItem['background']) {
  if (!background) return null;
  if (typeof background === 'string') return background;
  if (typeof background === 'object' && typeof background.url === 'string') return background.url;
  return null;
}

function ReasonCard({ item, index }: { item: WhyItem; index: number }) {
  const Icon =
    (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[item.icon || 'CheckCircle2'] ||
    CheckCircle2;
  const backgroundUrl = getBackgroundUrl(item.background);
  const backgroundAlt =
    typeof item.background === 'object' && item.background?.alt ? item.background.alt : '';

  if (backgroundUrl) {
    return (
      <li className="group relative flex min-h-[280px] overflow-hidden rounded-xl border border-gray-200 bg-white p-5 text-brand-navy shadow-[0_10px_28px_rgba(15,23,42,0.05)] transition-[border-color,box-shadow,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-brand-gold/55 hover:shadow-[0_18px_38px_rgba(15,23,42,0.12)] snap-start flex-none w-[85vw] sm:w-[320px] md:w-auto md:flex-initial">
        <Image
          src={backgroundUrl}
          alt={backgroundAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
          className="object-cover opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/78 to-brand-navy/32 opacity-0 backdrop-blur-none transition-[opacity,backdrop-filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-brand-navy/12 opacity-0 backdrop-blur-none transition-[opacity,backdrop-filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:backdrop-blur-[1px]" />
        <div className="relative z-10 mt-auto transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-mist text-brand-navy ring-1 ring-brand-navy/5 transition-[background-color,color,box-shadow] duration-500 ease-out group-hover:bg-white/12 group-hover:text-brand-gold group-hover:ring-white/20 group-hover:backdrop-blur-sm">
            <Icon size={20} aria-hidden="true" />
          </div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-gold">
            Alasan {index + 1}
          </p>
          <h3 className="text-lg font-bold leading-snug text-brand-navy transition-colors duration-500 group-hover:text-white">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-500 transition-colors duration-500 group-hover:text-white/78">
            {item.description}
          </p>
        </div>
      </li>
    );
  }

  return (
    <li className="group flex h-full gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.05)] transition-[border-color,box-shadow,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-brand-gold/55 hover:shadow-[0_18px_38px_rgba(15,23,42,0.12)] snap-start flex-none w-[85vw] sm:w-[320px] md:w-auto md:flex-initial">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-mist text-brand-navy transition-colors duration-500 ease-out group-hover:bg-brand-navy group-hover:text-brand-gold">
        <Icon size={20} aria-hidden="true" />
      </div>
      <div>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-gold">
          Alasan {index + 1}
        </p>
        <h3 className="text-base font-bold leading-snug text-brand-navy">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.description}</p>
      </div>
    </li>
  );
}

export default function WhySttpuSection({
  eyebrow,
  title,
  description,
  proof,
  ctaLabel,
  ctaHref,
  items,
}: WhySttpuSectionProps) {
  const reasons =
    items && items.length > 0
      ? items.map((item, index) => ({
          ...item,
          background: item.background || defaultItems[index % defaultItems.length].background,
        }))
      : defaultItems;
  const resolvedCtaHref = ctaHref || '/akademik/program-studi';

  return (
    <section className="relative overflow-hidden bg-brand-mist/45 py-18 sm:py-20 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.35fr] lg:gap-12 lg:px-8">
        <Reveal width="100%">
          <div className="lg:sticky lg:top-24">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-gold">
              {eyebrow || 'Alasan Memilih STTPU'}
            </p>
            <h2 className="max-w-xl text-3xl font-extrabold leading-[1.16] tracking-tight text-brand-navy md:text-4xl">
              {title || 'Mengapa Harus Kuliah di STT Pekerjaan Umum Jakarta?'}
            </h2>
            <div className="mt-6 h-1 w-16 rounded-full bg-brand-gold" />
            <p className="mt-7 max-w-xl text-base font-medium leading-relaxed text-gray-600">
              {description ||
                'STTPU Jakarta dirancang untuk mahasiswa yang ingin masuk ke bidang infrastruktur, pekerjaan umum, lingkungan, dan teknologi dengan arah belajar yang jelas sejak awal.'}
            </p>
            <div className="mt-6 rounded-xl border border-brand-navy/10 bg-white/80 p-5">
              <p className="text-sm font-semibold leading-relaxed text-brand-navy">
                {proof ||
                  'Kurikulum dan ekosistem kampus diarahkan untuk menghubungkan teori, kebutuhan lapangan, layanan digital, dan jejaring mitra yang relevan dengan pembangunan Indonesia.'}
              </p>
            </div>
            <div className="mt-7">
              <Link
                href={resolvedCtaHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-navy px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-navy-light focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
              >
                {ctaLabel || 'Lihat Program Studi'}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="min-w-0">
          <Reveal width="100%" yOffset={24} delay={0.1}>
            <ul className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-6 -mx-4 px-4 md:grid md:grid-cols-2 md:gap-4 md:p-0 md:-mx-0 scrollbar-none" aria-label="Alasan memilih STTPU Jakarta">
              {reasons.map((item, index) => (
                <ReasonCard key={`${item.title}-${index}`} item={item} index={index} />
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
