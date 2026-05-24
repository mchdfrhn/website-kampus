import { Reveal } from '@/components/ui/motion/Reveal';
import ImageWithLoading from '@/components/ui/media/ImageWithLoading';
import { getMediaUrl } from '@/lib/media';

type MitraItem = {
  nama: string;
  kategori?: string | null;
  url?: string | null;
  logo?: { url?: string | null; alt?: string | null } | null;
};

type MitraSectionProps = {
  title?: string | null;
  description?: string | null;
  items: MitraItem[];
};

function MitraLogo({ item }: { item: MitraItem }) {
  const logoUrl = getMediaUrl(item.logo, 'logo');
  const logoAlt = typeof item.logo === 'object' ? item.logo?.alt : null;

  const content = (
    <div className="group/logo relative flex h-32 w-56 sm:h-36 sm:w-64 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white px-7 py-6 shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition-all duration-500 hover:border-brand-gold/50 hover:shadow-[0_18px_36px_rgba(15,23,42,0.1)]">
      {logoUrl ? (
        <ImageWithLoading
          src={logoUrl}
          alt={logoAlt || item.nama}
          width={240}
          height={110}
          sizes="(max-width: 640px) 224px, 256px"
          className="max-h-20 w-auto max-w-full object-contain grayscale opacity-70 transition-all duration-500 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 sm:max-h-24"
          skeletonClassName="rounded-xl"
        />
      ) : (
        <span className="text-center text-xs font-bold uppercase tracking-[0.16em] text-brand-navy/30">
          {item.nama}
        </span>
      )}
    </div>
  );

  if (item.url) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Kunjungi website ${item.nama}`}
        className="inline-flex shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-4"
      >
        {content}
      </a>
    );
  }

  return <div className="inline-flex shrink-0">{content}</div>;
}

export default function MitraSection({ title, description, items }: MitraSectionProps) {
  const mitra = items.filter((item) => getMediaUrl(item.logo, 'logo'));

  if (mitra.length === 0) return null;

  const marqueeItems = [...mitra, ...mitra];
  const shouldMarquee = mitra.length >= 5;

  return (
    <section className="relative overflow-hidden bg-white py-18 sm:py-20 lg:py-24 border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal width="100%">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-gold">Kolaborasi</p>
            <h2 className="text-3xl font-bold leading-[1.2] tracking-tight text-brand-navy md:text-4xl">
              {title || 'Mitra & Kerja Sama'}
            </h2>
            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-brand-gold" />
            <p className="mx-auto mt-6 max-w-2xl text-sm font-medium leading-relaxed text-gray-500 sm:text-base">
              {description ||
                'STTPU berkolaborasi dengan berbagai institusi, industri, dan lembaga untuk mendukung pendidikan vokasi dan pengembangan karier mahasiswa.'}
            </p>
          </div>
        </Reveal>

        <Reveal width="100%" yOffset={18}>
          {shouldMarquee ? (
            <div className="relative -mx-4 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent sm:w-32" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent sm:w-32" />
              <div className="group flex overflow-hidden py-2" aria-label="Daftar logo mitra">
                <div className="flex min-w-max gap-4 animate-partner-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] sm:gap-5">
                  {marqueeItems.map((item, index) => (
                    <MitraLogo key={`${item.nama}-${index}`} item={item} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
              {mitra.map((item) => (
                <MitraLogo key={item.nama} item={item} />
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
