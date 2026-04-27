import { Building2, Handshake } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';

type KerjasamaMitra = {
  nama: string
  kategori?: 'industri' | 'akademik' | 'pemerintah'
  deskripsi?: string
  tahun?: string
  logo?: { url?: string } | null
  website?: string
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
  } catch {
    // DB unavailable
  }

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
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
        <div className="rounded-xl border border-dashed border-gray-200 p-14 text-center">
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
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-brand-mist border border-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {mitra.logo?.url ? (
                    <img
                      src={mitra.logo.url}
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

      <div className="bg-brand-navy rounded-2xl p-6 sm:p-8 text-white">
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
