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
const campusStagePhoto = '/images/pimpinan/sttpu-campus-stage.webp';

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
          <div className="relative mx-auto flex min-h-[360px] w-full max-w-md items-end justify-center overflow-hidden rounded-xl bg-brand-navy shadow-[0_22px_60px_rgba(15,23,42,0.16)] lg:max-w-none">
            <ImageWithLoading
              src={campusStagePhoto}
              alt=""
              fill
              sizes="(max-width: 1024px) 90vw, 540px"
              className="object-cover object-left"
              skeletonClassName="bg-brand-navy"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/58 to-brand-navy/16" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/36 via-transparent to-brand-gold/12" />
            <div className="absolute left-5 top-5 h-20 w-20 rounded-full border border-brand-gold/25 bg-brand-gold/14 backdrop-blur-[1px]" />
            <div className="absolute right-5 top-8 h-14 w-14 rounded-full border border-white/20 bg-white/10 backdrop-blur-[1px]" />
            <div className="absolute -bottom-10 left-0 h-40 w-40 rounded-t-full bg-brand-gold/70 mix-blend-screen" />
            <div className="absolute bottom-16 left-28 h-24 w-24 rounded-tl-full bg-brand-gold/60 mix-blend-screen" />
            <div className="absolute bottom-16 left-28 h-24 w-24 rounded-br-full bg-brand-navy/72" />
            <div className="absolute inset-x-8 bottom-0 h-28 rounded-[50%] bg-black/30 blur-2xl" />

            <div className="relative z-10 h-[380px] w-full sm:h-[455px]">
              <ImageWithLoading
                src={fotoUrl}
                alt={nama}
                fill
                sizes="(max-width: 1024px) 80vw, 520px"
                className="object-contain object-bottom drop-shadow-[0_24px_28px_rgba(0,0,0,0.22)] [transform:translateX(-2rem)_translateY(0.5rem)_scaleX(-1)] sm:[transform:translateX(-3rem)_translateY(0.75rem)_scaleX(-1)_scale(1.08)] lg:[transform:translateX(-3.5rem)_translateY(0.75rem)_scaleX(-1)_scale(1.08)]"
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
