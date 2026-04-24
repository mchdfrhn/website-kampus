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
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
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
        <div className="bg-brand-mist rounded-xl p-5 border border-gray-200">
          <p className="text-gray-700 text-sm leading-relaxed">{intro}</p>
        </div>
      ) : null}

      {fasilitas.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 p-10 text-center text-gray-500">
          Data fasilitas belum tersedia.
        </div>
      ) : (
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5" aria-label="Daftar fasilitas STTPU">
        {fasilitas.map((item, idx) => (
          <li
            key={idx}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
          >
            {item.foto?.url ? (
              <img src={item.foto.url} alt={item.nama} className="h-36 w-full object-cover" />
            ) : (
              <div className="h-36 bg-brand-mist flex items-center justify-center border-b border-gray-200">
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
                      <span className="bg-brand-mist text-brand-navy text-[10px] font-semibold px-2 py-0.5 rounded-full">
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
                      className="inline-block bg-brand-mist text-brand-navy text-[10px] px-2 py-0.5 rounded font-medium border border-gray-200"
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
        <div className="bg-brand-navy rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
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
