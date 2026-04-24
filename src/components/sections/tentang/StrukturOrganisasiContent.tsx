import { getPayloadClient } from '@/lib/payload';

type PimpinanItem = { jabatan: string; nama: string; urutan?: number }
type UnitItem = { unit: string; kepala?: string }
type BagianItem = { bagian: string; kepala?: string }

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
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
      <div className="mb-12 text-center lg:mb-16 lg:text-left">
        <h2 className="text-brand-navy font-bold text-3xl md:text-4xl tracking-tight leading-[1.2]">
          Struktur Organisasi
        </h2>
        <div className="w-12 h-1 bg-brand-gold rounded-full mt-6 mx-auto lg:mx-0" />
        <p className="mt-8 text-gray-500 font-medium max-w-3xl leading-relaxed mx-auto lg:mx-0 text-sm md:text-base">
          Gambaran hierarki kepemimpinan dan tata kelola institusi STTPU Jakarta, mulai dari pimpinan pusat hingga unit pelaksana teknis dan bagian administrasi.
        </p>
      </div>

      {strukturGambar?.url && (
        <div className="rounded-xl overflow-hidden border border-gray-200">
          <img src={strukturGambar.url} alt="Struktur Organisasi STTPU Jakarta" className="w-full h-auto" />
        </div>
      )}

      {!ketua && upt.length === 0 && bagian.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 p-10 text-center text-gray-500">
          Struktur organisasi belum tersedia.
        </div>
      ) : null}
      <section>
        <div className="bg-brand-navy rounded-xl p-5 text-center text-white mb-6">
          <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Pimpinan Tertinggi</p>
          <p className="font-bold text-lg">{ketua?.jabatan}</p>
          <p className="text-brand-gold font-medium text-sm mt-0.5">{ketua?.nama}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {wakilKetua.map((item, idx) => (
            <div key={idx} className="border border-gray-200 rounded-xl p-4 text-center bg-white">
              <p className="text-brand-navy font-semibold text-xs uppercase tracking-wide mb-2">{item.jabatan}</p>
              <p className="text-gray-800 text-sm font-medium leading-snug">{item.nama}</p>
            </div>
          ))}
          <div className="border border-gray-200 rounded-xl p-4 text-center bg-white">
            <p className="text-gray-600 font-semibold text-xs uppercase tracking-wide mb-2">{senat.jabatan}</p>
            <p className="text-gray-700 text-sm font-medium leading-snug">{senat.nama}</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-brand-navy mb-1">Unit Pelaksana Teknis (UPT)</h3>
        <p className="text-gray-500 text-sm mb-4">Unit-unit fungsional yang mendukung operasional akademik dan layanan kampus.</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {upt.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 p-4 bg-brand-mist border border-gray-200 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0 mt-2" aria-hidden="true" />
              <div>
                <p className="font-medium text-gray-900 text-sm">{item.unit}</p>
                {item.kepala && <p className="text-gray-500 text-xs mt-0.5">Kepala: {item.kepala}</p>}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-lg font-bold text-brand-navy mb-1">Bagian Administrasi</h3>
        <p className="text-gray-500 text-sm mb-4">Bagian-bagian yang mengelola administrasi, keuangan, dan layanan umum institusi.</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {bagian.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-navy flex-shrink-0 mt-2" aria-hidden="true" />
              <div>
                <p className="font-medium text-gray-900 text-sm">{item.bagian}</p>
                {item.kepala && <p className="text-gray-500 text-xs mt-0.5">Kepala: {item.kepala}</p>}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {catatan ? <p className="text-gray-500 text-xs border-t border-gray-200 pt-4">{catatan}</p> : null}
    </article>
  );
}
