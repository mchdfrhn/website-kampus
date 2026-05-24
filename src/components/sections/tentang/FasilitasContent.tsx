import { ImageOff } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';

type FasilitasItem = {
  nama: string
  deskripsi?: string
  kapasitas?: string
  items?: { nama: string }[]
  foto?: { url?: string } | null
  kategori?: string
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
    <article className="space-y-10 pt-10 sm:pt-12">
      <div className="mb-12 text-center lg:mb-16 lg:text-left">
        <h2 className="text-brand-navy font-bold text-3xl md:text-4xl tracking-tight leading-[1.2]">
          Fasilitas Kampus
        </h2>
        <div className="w-12 h-1 bg-brand-gold rounded-full mt-6 mx-auto lg:mx-0" />
        <p className="mt-8 text-gray-500 font-medium max-w-3xl leading-relaxed mx-auto lg:mx-0 text-sm md:text-base">
          Dukung proses belajar dan pengembangan diri dengan fasilitas lengkap yang tersedia di kampus STTPU Jakarta, dirancang untuk menciptakan lingkungan akademik yang kondusif.
        </p>
      </div>

      {intro ? (
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-premium">
          <p className="text-gray-700 text-sm leading-relaxed">{intro}</p>
        </div>
      ) : null}

      {fasilitas.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 p-10 text-center text-gray-500">
          Data fasilitas belum tersedia.
        </div>
      ) : (
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5" aria-label="Daftar fasilitas STTPU">
        {fasilitas.map((item, idx) => (
          <li
            key={idx}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-hover"
          >
            {item.foto?.url ? (
              <img src={item.foto.url} alt={item.nama} className="h-36 w-full object-cover" />
            ) : (
              <div className="flex h-36 items-center justify-center border-b border-gray-100 bg-gray-50">
                <ImageOff size={28} className="text-gray-400" aria-hidden="true" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-9 h-9 bg-brand-navy rounded-lg flex items-center justify-center flex-shrink-0 text-brand-gold font-black text-sm"
                  aria-hidden="true"
                >
                  {idx + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight">{item.nama}</h3>
                    {item.kategori && (
                      <span className="rounded-full border border-gray-100 bg-gray-50 px-2 py-0.5 text-[10px] font-semibold text-brand-navy">
                        {item.kategori}
                      </span>
                    )}
                  </div>
                  {item.kapasitas && (
                    <p className="text-gray-500 text-xs mt-0.5">Kapasitas: {item.kapasitas}</p>
                  )}
                </div>
              </div>
              {item.deskripsi && (
                <p className="text-gray-600 text-xs leading-relaxed mb-3">{item.deskripsi}</p>
              )}
              {item.items && item.items.length > 0 && (
                <ul className="flex flex-wrap gap-1.5">
                  {item.items.map((f, i) => (
                    <li
                      key={i}
                      className="inline-block rounded border border-gray-100 bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-brand-navy"
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

      {ctaTitle || ctaDescription || ctaButtonLabel ? (
        <div className="relative overflow-hidden rounded-2xl bg-brand-navy p-6 text-white shadow-premium sm:p-8">
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              {ctaTitle ? <p className="font-bold text-base sm:text-lg mb-1">{ctaTitle}</p> : null}
              {ctaDescription ? <p className="text-white/70 text-sm leading-relaxed max-w-lg">{ctaDescription}</p> : null}
            </div>
            {ctaButtonLabel ? (
              <a href={ctaButtonHref} className="shrink-0 inline-block bg-brand-gold text-brand-navy font-bold text-sm px-6 py-3 rounded-xl hover:bg-white transition-colors">
                {ctaButtonLabel}
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </article>
  );
}
