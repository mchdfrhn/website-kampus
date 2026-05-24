import { Building2, Handshake } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';
import { getMediaUrl } from '@/lib/media';

type KerjasamaMitra = {
  nama: string
  kategori?: string | null
  deskripsi?: string
  tahun?: string
  logo?: { url?: string | null; sizes?: Record<string, { url?: string | null } | null> | null } | null
  website?: string | null
}

const kategoriBadge = (kategori?: string) => {
  if (kategori === 'industri') return 'bg-blue-100 text-blue-800 border border-blue-300'
  if (kategori === 'akademik') return 'bg-green-100 text-green-800 border border-green-300'
  if (kategori === 'pemerintah') return 'bg-amber-100 text-amber-800 border border-amber-300'
  return 'bg-gray-100 text-gray-700 border border-gray-300'
}

const kategoriLabel = (kategori?: string) => {
  if (kategori === 'industri') return 'Industri'
  if (kategori === 'akademik') return 'Akademik'
  if (kategori === 'pemerintah') return 'Pemerintah'
  return kategori || ''
}

export default async function KerjasamaContent() {
  let kerjasamaMitra: KerjasamaMitra[] = []
  let kerjasamaIntro =
    'STTPU Jakarta menjalin kerjasama strategis dengan berbagai institusi, industri, dan pemerintah untuk memperkuat kualitas pendidikan dan peluang mahasiswa.'
  let kerjasamaFormUrl = '/kontak'

  try {
    const payload = await getPayloadClient()
    const global = await payload.findGlobal({ slug: 'tentang-kami', depth: 1 })
    const data = global as unknown as {
      kerjasamaIntro?: string
      kerjasamaMitra?: KerjasamaMitra[]
      kerjasamaFormUrl?: string
    }
    if (data.kerjasamaIntro) kerjasamaIntro = data.kerjasamaIntro
    kerjasamaMitra = data.kerjasamaMitra || []
    if (data.kerjasamaFormUrl) kerjasamaFormUrl = data.kerjasamaFormUrl

    const mitraResult = await payload.find({
      collection: 'mitra',
      where: { aktif: { equals: true } },
      sort: 'urutan',
      limit: 100,
      depth: 1,
    })

    if (mitraResult.docs.length > 0) {
      kerjasamaMitra = mitraResult.docs.map((item) => {
        const mitra = item as unknown as {
          nama: string
          kategori?: string | null
          url?: string | null
          logo?: { url?: string | null } | null
        }

        return {
          nama: mitra.nama,
          kategori: mitra.kategori?.toLowerCase() || null,
          logo: mitra.logo,
          website: mitra.url,
        }
      })
    }
  } catch {
    // DB unavailable
  }

  return (
    <article className="space-y-10 pt-10 sm:pt-12">
      <div className="mb-12 text-center lg:mb-16 lg:text-left">
        <h2 className="text-brand-navy font-bold text-3xl md:text-4xl tracking-tight leading-[1.2]">
          Kerjasama &amp; Mitra
        </h2>
        <div className="w-12 h-1 bg-brand-gold rounded-full mt-6 mx-auto lg:mx-0" />
        <p className="mt-8 text-gray-500 font-medium max-w-3xl leading-relaxed mx-auto lg:mx-0 text-sm md:text-base">
          {kerjasamaIntro}
        </p>
      </div>

      {kerjasamaMitra.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 p-14 text-center">
          <Handshake size={40} className="text-gray-300 mx-auto mb-4" aria-hidden="true" />
          <p className="text-gray-500 font-medium text-sm">Data kerjasama segera dipublikasikan</p>
          <p className="text-gray-400 text-xs mt-1">
            Kami sedang mempersiapkan informasi kemitraan STTPU Jakarta.
          </p>
        </div>
      ) : (
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          aria-label="Daftar mitra kerjasama STTPU"
        >
          {kerjasamaMitra.map((mitra, idx) => (
            <li
              key={idx}
              className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-hover"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                  {getMediaUrl(mitra.logo, 'logo') ? (
                    <img
                      src={getMediaUrl(mitra.logo, 'logo') || ''}
                      alt={mitra.nama}
                      className="w-full h-full object-contain p-1"
                    />
                  ) : (
                    <Building2 size={22} className="text-gray-400" aria-hidden="true" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight">{mitra.nama}</h3>
                  {mitra.tahun && (
                    <p className="text-gray-400 text-xs mt-0.5">Sejak {mitra.tahun}</p>
                  )}
                </div>
              </div>

              {mitra.kategori && (
                <span
                  className={`self-start inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${kategoriBadge(mitra.kategori)}`}
                >
                  {kategoriLabel(mitra.kategori)}
                </span>
              )}

              {mitra.deskripsi && (
                <p className="text-gray-600 text-xs leading-relaxed flex-1">{mitra.deskripsi}</p>
              )}

              {mitra.website && (
                <a
                  href={mitra.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-navy text-xs font-semibold hover:underline self-start"
                >
                  Kunjungi Website &rarr;
                </a>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="rounded-2xl bg-brand-navy p-6 text-white shadow-premium sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-base sm:text-lg mb-1">Tertarik Bermitra dengan STTPU?</p>
            <p className="text-white/70 text-sm leading-relaxed max-w-lg">
              Kami membuka peluang kerjasama dengan institusi, perusahaan, dan lembaga pemerintah
              yang memiliki visi serupa dalam memajukan pendidikan teknologi.
            </p>
          </div>
          <a
            href={kerjasamaFormUrl}
            className="shrink-0 inline-block bg-brand-gold text-brand-navy font-bold text-sm px-6 py-3 rounded-xl hover:bg-white transition-colors"
          >
            Ajukan Kerjasama
          </a>
        </div>
      </div>
    </article>
  )
}
