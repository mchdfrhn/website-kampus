import { getPayloadClient } from '@/lib/payload';
import BlueAbstractBackground from '@/components/ui/BlueAbstractBackground';

type PimpinanItem = { jabatan: string; nama: string; urutan?: number }
type UnitItem = { unit: string; kepala?: string }
type BagianItem = { bagian: string; kepala?: string }

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

export default async function StrukturOrganisasiContent() {
  let pimpinan: PimpinanItem[] = []
  let senat = { jabatan: '', nama: '' }
  let upt: UnitItem[] = []
  let bagian: BagianItem[] = []
  let catatan = ''
  let strukturGambar: { url?: string } | null = null

  try {
    const payload = await getPayloadClient()

    const [pimpinanResult, global] = await Promise.all([
      payload.find({ collection: 'pimpinan', sort: 'urutan', limit: 20 }),
      payload.findGlobal({ slug: 'tentang-kami', depth: 1 }),
    ])

    if (pimpinanResult.docs.length > 0) {
      pimpinan = pimpinanResult.docs as unknown as PimpinanItem[]
    }

    const tentang = global as unknown as {
      strukturSenat?: { jabatan: string; nama: string }
      strukturUPT?: UnitItem[]
      strukturBagian?: { bagian: string; kepala?: string }[]
      strukturCatatan?: string
      strukturGambar?: { url?: string } | null
    }

    if (tentang.strukturSenat?.jabatan) senat = tentang.strukturSenat
    upt = tentang.strukturUPT || []
    bagian = (tentang.strukturBagian || []).map((b) => ({ bagian: b.bagian, kepala: b.kepala }))
    catatan = tentang.strukturCatatan || ''
    strukturGambar = tentang.strukturGambar || null
  } catch {
    // DB unavailable
  }

  const [ketua, ...wakilKetua] = pimpinan

  return (
    <article className="space-y-10 sm:space-y-12">
      {strukturGambar?.url && (
        <section className="rounded-premium border border-gray-100 bg-white p-4 shadow-premium sm:rounded-premium-lg">
          <div className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
            <img src={strukturGambar.url} alt="Struktur Organisasi STTPU Jakarta" className="w-full h-auto" />
          </div>
        </section>
      )}

      {!ketua && upt.length === 0 && bagian.length === 0 ? (
        <div className="rounded-premium border border-dashed border-gray-200 p-12 text-center text-gray-400 font-semibold text-sm">
          Struktur organisasi belum tersedia.
        </div>
      ) : null}

      {ketua && (
        <SectionCard title="Jajaran Pimpinan Utama" eyebrow="Leadership Hierarchy">
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl bg-brand-navy text-center text-white py-6 px-4 shadow-md">
              <BlueAbstractBackground />
              <div className="relative z-10">
                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Ketua STTPU</p>
                <p className="font-bold text-lg sm:text-xl text-white">{ketua?.nama}</p>
                <p className="text-brand-gold font-bold text-xs uppercase tracking-wider mt-1.5">{ketua?.jabatan}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {wakilKetua.map((item, idx) => (
                <div key={idx} className="border border-gray-100 rounded-xl p-5 text-center bg-gray-50/50 hover:bg-white hover:shadow-premium hover:border-brand-navy/10 transition-all duration-300">
                  <p className="text-brand-navy font-bold text-[10px] uppercase tracking-wider mb-2">{item.jabatan}</p>
                  <p className="text-gray-600 text-sm font-semibold leading-snug">{item.nama}</p>
                </div>
              ))}
              {senat.jabatan && (
                <div className="border border-gray-100 rounded-xl p-5 text-center bg-gray-50/50 hover:bg-white hover:shadow-premium hover:border-brand-navy/10 transition-all duration-300">
                  <p className="text-brand-gold font-bold text-[10px] uppercase tracking-wider mb-2">{senat.jabatan}</p>
                  <p className="text-gray-600 text-sm font-semibold leading-snug">{senat.nama}</p>
                </div>
              )}
            </div>
          </div>
        </SectionCard>
      )}

      {upt.length > 0 && (
        <SectionCard title="Unit Pelaksana Teknis (UPT)" eyebrow="Technical Units">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upt.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-4 p-5 bg-gray-50 border border-gray-100 rounded-2xl transition-all hover:bg-white hover:shadow-premium hover:border-brand-navy/10 duration-300"
              >
                <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-gold" aria-hidden="true" />
                <div>
                  <p className="font-bold text-brand-navy text-sm sm:text-base leading-tight">{item.unit}</p>
                  {item.kepala && (
                    <p className="text-gray-400 text-xs sm:text-sm font-semibold mt-1">Kepala: {item.kepala}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {bagian.length > 0 && (
        <SectionCard title="Bagian Administrasi" eyebrow="Administration">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bagian.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-4 p-5 bg-gray-50 border border-gray-100 rounded-2xl transition-all hover:bg-white hover:shadow-premium hover:border-brand-navy/10 duration-300"
              >
                <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-navy" aria-hidden="true" />
                <div>
                  <p className="font-bold text-brand-navy text-sm sm:text-base leading-tight">{item.bagian}</p>
                  {item.kepala && (
                    <p className="text-gray-400 text-xs sm:text-sm font-semibold mt-1">Kepala: {item.kepala}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {catatan && (
        <p className="text-gray-400 text-xs font-semibold border-t border-gray-100 pt-5 mt-8">{catatan}</p>
      )}
    </article>
  );
}
