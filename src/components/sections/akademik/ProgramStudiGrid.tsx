import Link from 'next/link';
import type { ProgramStudi } from '@/lib/data/program-studi';
import type { ProgramStudiPageContent } from '@/lib/data/akademik-page';
import { resolveProgramStudiAccentColor } from '@/lib/data/program-studi';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import BlueAbstractBackground from '@/components/ui/BlueAbstractBackground';

import { cn } from '@/lib/utils';

const akreditasiColor: Record<string, string> = {
  Unggul: 'bg-green-50 text-green-700 border-green-200',
  'Baik Sekali': 'bg-brand-navy/5 text-brand-navy border-brand-navy/10',
  Baik: 'bg-yellow-50 text-yellow-700 border-yellow-200',
};

const accentTheme: Record<string, {
  accent: string;
  badge: string;
  icon: string;
}> = {
  navy: {
    accent: 'bg-brand-navy',
    badge: 'bg-brand-navy/5 text-brand-navy border-brand-navy/10',
    icon: 'bg-brand-navy text-white',
  },
  blue: {
    accent: 'bg-sky-700',
    badge: 'bg-sky-50 text-sky-800 border-sky-200',
    icon: 'bg-sky-700 text-white',
  },
  green: {
    accent: 'bg-emerald-700',
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    icon: 'bg-emerald-700 text-white',
  },
  orange: {
    accent: 'bg-orange-700',
    badge: 'bg-orange-50 text-orange-800 border-orange-200',
    icon: 'bg-orange-700 text-white',
  },
};

export default function ProgramStudiGrid({
  prodiList,
  content,
}: {
  prodiList?: ProgramStudi[];
  content?: ProgramStudiPageContent | null;
}) {
  const list = prodiList ?? [];
  const gridTitle = content?.gridTitle || 'Program Studi Unggulan';
  const gridDescription =
    content?.gridDescription ||
    'STTPU Jakarta menawarkan kurikulum vokasi berbasis teknologi yang dirancang khusus untuk menghasilkan sarjana terapan yang kompeten di sektor infrastruktur dan pekerjaan umum nasional.';
  const consultationTitle = content?.consultationTitle || 'Konsultasi Akademik';
  const consultationDescription =
    content?.consultationDescription ||
    'Tim akademik kami siap membantu Anda memilih program studi yang paling sesuai dengan visi karir Anda.';
  const primaryLabel = content?.consultationPrimaryLabel || 'Hubungi Kami';
  const primaryHref = content?.consultationPrimaryHref || '/kontak';
  const secondaryLabel = content?.consultationSecondaryLabel || 'Info Beasiswa';
  const secondaryHref = content?.consultationSecondaryHref || '/akademik/beasiswa';

  return (
    <section className="py-10 sm:py-12">
      <div className="mb-12 text-center lg:mb-16 lg:text-left">
        <h2 className="text-brand-navy font-bold text-3xl md:text-4xl tracking-tight leading-[1.2]">{gridTitle}</h2>
        <div className="w-12 h-1 bg-brand-gold rounded-full mt-6 mx-auto lg:mx-0" />
        <p className="mt-8 text-gray-500 font-medium max-w-3xl leading-relaxed mx-auto lg:mx-0 text-sm md:text-base">
          {gridDescription}
        </p>
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 p-12 text-center text-gray-500">
          Data program studi belum tersedia.
        </div>
      ) : (
      <ul
        className="mt-10 mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 sm:mb-10 lg:mb-12"
        aria-label="Daftar program studi STTPU"
      >
        {list.map((prodi) => {
          const accent = accentTheme[resolveProgramStudiAccentColor(prodi.nama, prodi.accentColor)] ?? accentTheme.navy;

          return (
            <li key={prodi.slug}>
              <Link
                href={`/akademik/program-studi/${prodi.slug}`}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-premium transition-all duration-500 hover:-translate-y-1 hover:border-brand-navy/15 hover:shadow-premium-hover active:scale-[0.99] sm:p-8",
                )}
              >
                <span className={cn("absolute inset-x-0 top-0 h-1", accent.accent)} aria-hidden="true" />

                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className={cn("flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl", accent.icon)}>
                    <ShieldCheck size={20} aria-hidden="true" />
                  </div>
                  <span className={cn(
                    "inline-flex min-h-8 items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
                    akreditasiColor[prodi.akreditasi] ?? 'bg-gray-50 text-gray-500 border-gray-100'
                  )}>
                    Akreditasi {prodi.akreditasi}
                  </span>
                </div>

                <div className="mb-4">
                  <span className={cn(
                    "inline-flex min-h-8 items-center rounded-lg border px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
                    accent.badge,
                  )}>
                    {prodi.jenjang}
                  </span>
                </div>

                <h3 className="mb-4 text-xl font-bold leading-tight tracking-tight text-brand-navy transition-colors group-hover:text-brand-gold">
                  {prodi.nama}
                </h3>
                <p className="mb-8 flex-1 text-sm font-medium leading-relaxed text-gray-500">
                  {prodi.deskripsiSingkat}
                </p>

                <div className="mb-8 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider mb-1">Masa Studi</p>
                    <p className="font-bold text-brand-navy text-sm tracking-tight">{prodi.masaStudi}</p>
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider mb-1">Beban SKS</p>
                    <p className="font-bold text-brand-navy text-sm tracking-tight">{prodi.jumlahSKS} SKS</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-gray-100 pt-5 text-[10px] font-bold uppercase tracking-wider text-brand-navy transition-all group-hover:gap-4">
                  Detail Kurikulum & Prospek
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      )}

      <div className="bg-brand-navy rounded-3xl p-6 sm:p-8 lg:p-16 text-white relative overflow-hidden shadow-2xl shadow-brand-navy/20">
        <BlueAbstractBackground />
        <div className="relative z-10 flex flex-col items-start gap-8 sm:gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl text-center lg:text-left">
            <h3 className="font-bold text-2xl md:text-3xl mb-4 tracking-tight">{consultationTitle}</h3>
            <p className="text-white/60 text-base md:text-lg font-medium leading-relaxed">
              {consultationDescription}
            </p>
          </div>
          <div className="flex w-full flex-col sm:w-auto sm:flex-row flex-wrap justify-center lg:justify-end gap-3 sm:gap-4">
            <Link
              href={primaryHref}
              className="w-full sm:w-auto text-center bg-brand-gold text-brand-navy text-[10px] font-bold uppercase tracking-wider px-6 sm:px-8 py-4 rounded-xl hover:bg-white transition-all shadow-xl shadow-brand-gold/10"
            >
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              className="w-full sm:w-auto text-center border-2 border-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-6 sm:px-8 py-4 rounded-xl hover:bg-white/10 transition-all"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
