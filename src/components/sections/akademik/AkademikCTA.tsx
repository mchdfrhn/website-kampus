import Link from 'next/link';
import BlueAbstractBackground from '@/components/ui/BlueAbstractBackground';
import type { ConsultationCard } from '@/lib/data/akademik-page';

export default function AkademikCTA({
  card,
  className = '',
}: {
  card?: ConsultationCard | null;
  className?: string;
}) {
  const title = card?.title || 'Konsultasi Akademik';
  const description =
    card?.description ||
    'Tim akademik kami siap membantu Anda memilih program studi yang paling sesuai dengan visi karir Anda.';
  const primaryLabel = card?.primaryLabel || 'Hubungi Kami';
  const primaryHref = card?.primaryHref || '/kontak';
  const secondaryLabel = card?.secondaryLabel || 'Info Beasiswa';
  const secondaryHref = card?.secondaryHref || '/akademik/beasiswa';

  const isExternal = (href: string) => {
    return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
  };

  return (
    <div className={`bg-brand-navy rounded-3xl p-6 sm:p-8 lg:p-16 text-white relative overflow-hidden shadow-2xl shadow-brand-navy/20 ${className}`}>
      <BlueAbstractBackground />
      <div className="relative z-10 flex flex-col items-start gap-8 sm:gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-2xl text-center lg:text-left">
          <h3 className="font-bold text-2xl md:text-3xl mb-4 tracking-tight">{title}</h3>
          <p className="text-white/60 text-base md:text-lg font-medium leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex w-full flex-col sm:w-auto sm:flex-row flex-wrap justify-center lg:justify-end gap-3 sm:gap-4">
          <Link
            href={primaryHref}
            target={isExternal(primaryHref) ? '_blank' : undefined}
            rel={isExternal(primaryHref) ? 'noopener noreferrer' : undefined}
            className="w-full sm:w-48 text-center bg-brand-gold text-brand-navy text-[10px] font-bold uppercase tracking-wider px-6 sm:px-8 py-4 rounded-xl hover:bg-white transition-all shadow-xl shadow-brand-gold/10"
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            target={isExternal(secondaryHref) ? '_blank' : undefined}
            rel={isExternal(secondaryHref) ? 'noopener noreferrer' : undefined}
            className="w-full sm:w-48 text-center border-2 border-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-6 sm:px-8 py-4 rounded-xl hover:bg-white/10 transition-all"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
