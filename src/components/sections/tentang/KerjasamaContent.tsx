import { Building2, Handshake, ExternalLink, Sparkles } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';
import BlueAbstractBackground from '@/components/ui/BlueAbstractBackground';

type KerjasamaMitra = {
  nama: string
  kategori?: string | null
  deskripsi?: string
  tahun?: string
  logo?: { url?: string | null } | null
  website?: string | null
}

const kategoriBadge = (kategori?: string) => {
  if (kategori === 'industri') return 'bg-emerald-50 text-emerald-700 border-emerald-100'
  if (kategori === 'akademik') return 'bg-blue-50 text-blue-700 border-blue-100'
  if (kategori === 'pemerintah') return 'bg-purple-50 text-purple-700 border-purple-100'
  return 'bg-gray-50 text-gray-600 border-gray-100'
}

const kategoriLabel = (kategori?: string) => {
  if (kategori === 'industri') return 'Industri'
  if (kategori === 'akademik') return 'Akademik'
  if (kategori === 'pemerintah') return 'Pemerintah'
  return kategori || ''
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
    <article className="space-y-10 sm:space-y-12">
      <SectionCard title="Mitra Kolaborasi" eyebrow="Institutional Partners">
        {kerjasamaMitra.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 p-14 text-center">
            <Handshake size={40} className="text-gray-300 mx-auto mb-4" aria-hidden="true" />
            <p className="text-gray-500 font-semibold text-sm">Data kerjasama segera dipublikasikan</p>
            <p className="text-gray-400 text-xs mt-1 font-medium">
              Kami sedang mempersiapkan informasi kemitraan STTPU Jakarta.
            </p>
          </div>
        ) : (
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-label="Daftar mitra kerjasama STTPU"
          >
            {kerjasamaMitra.map((mitra, idx) => (
              <li
                key={idx}
                className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-premium hover:border-brand-navy/10 transition-all duration-300 flex flex-col justify-between gap-4 group"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden group-hover:bg-white transition-colors duration-300">
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
                      <h4 className="font-bold text-brand-navy text-sm leading-snug group-hover:text-brand-gold transition-colors duration-300">{mitra.nama}</h4>
                      {mitra.tahun && (
                        <p className="text-gray-400 text-xs font-semibold mt-0.5">Sejak {mitra.tahun}</p>
                      )}
                    </div>
                  </div>

                  {mitra.kategori && (
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${kategoriBadge(mitra.kategori)}`}
                    >
                      {kategoriLabel(mitra.kategori)}
                    </span>
                  )}

                  {mitra.deskripsi && (
                    <p className="text-gray-500 text-xs leading-relaxed font-semibold">{mitra.deskripsi}</p>
                  )}
                </div>

                {mitra.website && (
                  <a
                    href={mitra.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-navy text-xs font-bold hover:text-brand-gold transition-colors flex items-center gap-1.5 self-start pt-2"
                  >
                    Kunjungi Website
                    <ExternalLink size={12} />
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      <section className="relative overflow-hidden rounded-premium bg-brand-navy text-white shadow-2xl shadow-brand-navy/15 sm:rounded-premium-lg">
        <BlueAbstractBackground />
        <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="font-bold text-lg sm:text-xl mb-2">Tertarik Bermitra dengan STTPU?</p>
              <p className="text-white/80 text-sm font-semibold leading-relaxed max-w-xl">
                Kami membuka peluang kerjasama dengan institusi, perusahaan, dan lembaga pemerintah
                yang memiliki visi serupa dalam memajukan pendidikan teknologi.
              </p>
            </div>
            <a
              href={kerjasamaFormUrl}
              className="shrink-0 inline-flex items-center gap-1.5 bg-brand-gold text-brand-navy font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-white hover:text-brand-navy transition-colors shadow-lg"
            >
              <Sparkles size={16} />
              Ajukan Kerjasama
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
