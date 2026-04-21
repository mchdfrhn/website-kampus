import { getPayloadClient } from '@/lib/payload';

type FasilitasItem = {
  nama: string
  deskripsi?: string
  kapasitas?: string
  items?: { nama: string }[]
  foto?: { url?: string } | null
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
    <article className="space-y-6">
      {intro ? <p className="text-gray-600 text-sm leading-relaxed">{intro}</p> : null}

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
            <div className="h-36 bg-brand-mist flex items-center justify-center border-b border-gray-200">
              <p className="text-gray-400 text-xs italic">Foto fasilitas</p>
            </div>
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-9 h-9 bg-brand-navy rounded-lg flex items-center justify-center flex-shrink-0 text-brand-gold font-black text-sm"
                  aria-hidden="true"
                >
                  {idx + 1}
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-sm leading-tight">{item.nama}</h2>
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
        <div className="bg-brand-navy rounded-xl p-5 text-white text-center">
          {ctaTitle ? <p className="font-semibold text-sm mb-1">{ctaTitle}</p> : null}
          {ctaDescription ? <p className="text-white/80 text-xs mb-3">{ctaDescription}</p> : null}
          {ctaButtonLabel ? (
            <a
              href={ctaButtonHref}
              className="inline-block bg-brand-gold text-brand-navy font-bold text-sm px-5 py-2 rounded-lg hover:bg-brand-gold-dark transition-colors"
            >
              {ctaButtonLabel}
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
