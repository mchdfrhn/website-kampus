import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';
import ImageWithLoading from '@/components/ui/media/ImageWithLoading';
import { Reveal } from '@/components/ui/motion/Reveal';

export type SambutanKetuaData = {
  nama: string;
  jabatan: string;
  sambutan?: string | null;
  keahlian?: string | null;
  foto?: { url?: string | null; alt?: string | null } | null;
};

const defaultSambutan =
  'STTPU Jakarta hadir untuk menghubungkan ilmu, praktik, dan kebutuhan nyata dunia infrastruktur. Kami berkomitmen menyiapkan lulusan yang adaptif, berintegritas, dan siap berkontribusi bagi pembangunan Indonesia.';
const defaultKetuaPhoto = '/images/pimpinan/ketua-sttpu-arie-setiadi.webp';

const portraitStageClassName =
  'relative mx-auto flex min-h-[460px] w-full max-w-sm items-end justify-center overflow-hidden rounded-xl border border-brand-navy/10 bg-[linear-gradient(180deg,#f8fafc_0%,#eef6f8_100%)] shadow-[0_22px_60px_rgba(15,23,42,0.12)] sm:min-h-[540px] lg:max-w-md';

export default function SambutanKetuaSection({
  ketua,
}: {
  ketua?: SambutanKetuaData | null;
}) {
  const nama = ketua?.nama || 'Dr. Ir. Arie Setiadi Moerwanto, M.Sc.';
  const jabatan = ketua?.jabatan || 'Ketua STT Pekerjaan Umum Jakarta';
  const sambutan = ketua?.sambutan || defaultSambutan;
  const fotoUrl = defaultKetuaPhoto;

  return (
    <section className="relative overflow-hidden bg-white py-18 sm:py-20 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-navy/10 to-transparent" />
      <div className="mx-auto grid max-w-7xl items-end gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:px-8">
        <Reveal width="100%" yOffset={24}>
          <div className={portraitStageClassName}>
            <div className="absolute inset-x-6 bottom-0 h-[86%] rounded-t-premium-lg bg-[radial-gradient(circle_at_28%_18%,rgba(252,182,3,0.18),transparent_26%),linear-gradient(155deg,#08245c_0%,#061a45_58%,#041334_100%)]" />
            <div className="absolute inset-x-6 bottom-0 h-[86%] rounded-t-premium-lg bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px] opacity-25" />
            <div className="absolute left-6 top-7 h-24 w-24 rounded-full border border-brand-gold/20 bg-brand-gold/10" />
            <div className="absolute right-7 top-12 h-16 w-16 rounded-full border border-white/20 bg-white/10" />
            <div className="absolute -bottom-10 -left-8 h-44 w-44 rounded-full bg-brand-gold/20" />
            <div className="absolute bottom-16 right-8 h-28 w-28 rounded-full border border-white/10 bg-white/[0.03]" />
            <div className="absolute inset-x-10 bottom-0 h-16 rounded-[50%] bg-black/24 blur-2xl" />

            <div className="relative z-10 h-[455px] w-full sm:h-[540px]">
              <ImageWithLoading
                src={fotoUrl}
                alt={nama}
                fill
                sizes="(max-width: 1024px) 82vw, 440px"
                className="object-contain object-bottom drop-shadow-[0_24px_28px_rgba(0,0,0,0.22)] [transform:scaleX(-1)]"
                skeletonClassName="bg-brand-navy/15"
                priority
              />
            </div>
          </div>
        </Reveal>

        <Reveal width="100%" yOffset={24} delay={0.08}>
          <div className="pb-1 lg:pb-8">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-gold">
              Sambutan Ketua
            </p>
            <h2 className="max-w-2xl text-3xl font-extrabold leading-[1.16] tracking-tight text-brand-navy md:text-4xl">
              Menyiapkan lulusan yang siap berkontribusi untuk pembangunan Indonesia
            </h2>
            <div className="mt-6 h-1 w-16 rounded-full bg-brand-gold" />

            <div className="mt-8 border-l-4 border-brand-gold pl-5 sm:pl-6">
              <Quote className="mb-4 text-brand-gold" size={28} aria-hidden="true" />
              <p className="text-lg font-semibold leading-relaxed text-brand-navy sm:text-xl">
                &ldquo;{sambutan}&rdquo;
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-5 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-extrabold leading-tight text-brand-navy">{nama}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-gray-400">
                  {jabatan}
                </p>
                {ketua?.keahlian ? (
                  <p className="mt-2 text-sm font-medium text-gray-500">{ketua.keahlian}</p>
                ) : null}
              </div>
              <Link
                href="/tentang/pimpinan"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-brand-navy/15 bg-white px-5 py-3 text-sm font-bold text-brand-navy transition-colors hover:border-brand-gold/60 hover:bg-brand-mist focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
              >
                Baca Profil Pimpinan
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
