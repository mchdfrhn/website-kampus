import { ImageOff, Sparkles, Building2, MapPin } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';
import BlueAbstractBackground from '@/components/ui/BlueAbstractBackground';

type FasilitasItem = {
  nama: string
  deskripsi?: string
  kapasitas?: string
  items?: { nama: string }[]
  foto?: { url?: string } | null
  kategori?: string
}

function SectionCard({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-premium border border-gray-100 bg-white p-6 shadow-premium sm:rounded-premium-lg sm:p-8 lg:p-10">
      {eyebrow ? (
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">{eyebrow}</p>
      ) : null}
      <h2 className="text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">{title}</h2>
      <div className="mt-4 h-1 w-12 rounded-full bg-brand-gold" />
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default async function FasilitasContent() {
  let fasilitas: FasilitasItem[] = []
  let intro = ''
  let ctaTitle = ''
  let ctaDescription = ''
  let ctaButtonLabel = ''
  let ctaButtonHref = '/kontak'

  try {
    const payload = await getPayloadClient()
    const global = await payload.findGlobal({ slug: 'tentang-kami', depth: 1 })
    const data = global as unknown as {
      fasilitas?: FasilitasItem[]
      fasilitasIntro?: string
      fasilitasCtaTitle?: string
      fasilitasCtaDescription?: string
      fasilitasCtaButtonLabel?: string
      fasilitasCtaButtonHref?: string
    }
    fasilitas = data.fasilitas || []
    intro = data.fasilitasIntro || ''
    ctaTitle = data.fasilitasCtaTitle || ''
    ctaDescription = data.fasilitasCtaDescription || ''
    ctaButtonLabel = data.fasilitasCtaButtonLabel || ''
    ctaButtonHref = data.fasilitasCtaButtonHref || ctaButtonHref
  } catch {
    // DB unavailable
  }

  return (
    <article className="space-y-10 sm:space-y-12">
      {intro ? (
        <SectionCard title="Sarana &amp; Prasarana" eyebrow="Environment">
          <div className="flex items-start gap-4 p-5 rounded-2xl border border-brand-gold/15 bg-brand-gold/[0.03]">
            <Building2 size={24} className="text-brand-navy flex-shrink-0" aria-hidden="true" />
            <p className="text-gray-600 text-sm font-semibold leading-relaxed">{intro}</p>
          </div>
        </SectionCard>
      ) : null}

      <SectionCard title="Daftar Fasilitas" eyebrow="Directory">
        {fasilitas.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 p-10 text-center text-gray-400 font-semibold text-sm">
            Data fasilitas belum tersedia.
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-label="Daftar fasilitas STTPU">
            {fasilitas.map((item, idx) => (
              <li
                key={idx}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-premium hover:border-brand-navy/10 transition-all duration-300 flex flex-col group"
              >
                <div className="relative overflow-hidden h-40 bg-gray-50 flex items-center justify-center">
                  {item.foto?.url ? (
                    <img
                      src={item.foto.url}
                      alt={item.nama}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-300 gap-2">
                      <ImageOff size={28} aria-hidden="true" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">No Photo</span>
                    </div>
                  )}
                  {item.kategori && (
                    <span className="absolute top-4 left-4 bg-brand-navy/90 text-brand-gold text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm z-10">
                      {item.kategori}
                    </span>
                  )}
                </div>
                
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="font-bold text-brand-navy text-sm sm:text-base leading-tight">{item.nama}</h4>
                      {item.kapasitas && (
                        <span className="shrink-0 text-gray-400 text-[10px] font-bold uppercase tracking-wider bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                          Cap: {item.kapasitas}
                        </span>
                      )}
                    </div>
                    {item.deskripsi && (
                      <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed mb-4">{item.deskripsi}</p>
                    )}
                  </div>

                  {item.items && item.items.length > 0 && (
                    <ul className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-50">
                      {item.items.map((f, i) => (
                        <li
                          key={i}
                          className="inline-block bg-brand-navy/5 text-brand-navy text-[10px] px-2 py-1 rounded-md font-bold"
                        >
                          {f.nama}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      {ctaTitle || ctaDescription || ctaButtonLabel ? (
        <section className="relative overflow-hidden rounded-premium bg-brand-navy text-white shadow-2xl shadow-brand-navy/15 sm:rounded-premium-lg">
          <BlueAbstractBackground />
          <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                {ctaTitle && <p className="font-bold text-lg sm:text-xl mb-2">{ctaTitle}</p>}
                {ctaDescription && <p className="text-white/80 text-sm font-semibold leading-relaxed max-w-xl">{ctaDescription}</p>}
              </div>
              {ctaButtonLabel && (
                <a
                  href={ctaButtonHref}
                  className="shrink-0 inline-flex items-center gap-1.5 bg-brand-gold text-brand-navy font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-white hover:text-brand-navy transition-colors shadow-lg"
                >
                  <Sparkles size={16} />
                  {ctaButtonLabel}
                </a>
              )}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
