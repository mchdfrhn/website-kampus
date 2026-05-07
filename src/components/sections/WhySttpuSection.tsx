import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/ui/motion/Reveal';
import ImageWithLoading from '@/components/ui/media/ImageWithLoading';

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
  {
    icon: 'Rocket',
    title: 'Kampus sedang tumbuh secara digital',
    description:
      'Portal akademik, LMS, layanan pengajuan, dan kanal informasi kampus membantu mahasiswa mengakses proses belajar dengan lebih tertata.',
  },
  {
    icon: 'MapPinned',
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
      <li className="group relative flex min-h-[280px] overflow-hidden rounded-xl border border-brand-navy/10 bg-brand-navy p-5 text-white shadow-[0_16px_36px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold/70 hover:shadow-[0_22px_46px_rgba(15,23,42,0.18)]">
        <ImageWithLoading
          src={backgroundUrl}
          alt={backgroundAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          skeletonClassName="bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-gold/30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/72 to-brand-navy/28" />
        <div className="absolute inset-0 bg-brand-navy/18" />
        <div className="relative z-10 mt-auto">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-white/12 text-brand-gold ring-1 ring-white/20 backdrop-blur-sm">
            <Icon size={20} aria-hidden="true" />
          </div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-gold">
            Alasan {index + 1}
          </p>
          <h3 className="text-lg font-bold leading-snug text-white">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/78">{item.description}</p>
        </div>
      </li>
    );
  }

  return (
    <li className="group flex h-full gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold/60 hover:shadow-[0_18px_38px_rgba(15,23,42,0.09)]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-mist text-brand-navy transition-colors group-hover:bg-brand-navy group-hover:text-brand-gold">
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
  const reasons = items && items.length > 0 ? items : defaultItems;
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

        <Reveal width="100%" yOffset={24} delay={0.1}>
          <ul className="grid gap-4 sm:grid-cols-2" aria-label="Alasan memilih STTPU Jakarta">
            {reasons.map((item, index) => (
              <ReasonCard key={`${item.title}-${index}`} item={item} index={index} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
