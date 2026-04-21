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

  try {
    const payload = await getPayloadClient()

    const [pimpinanResult, global] = await Promise.all([
      payload.find({ collection: 'pimpinan', sort: 'urutan', limit: 20 }),
      payload.findGlobal({ slug: 'tentang-kami' }),
    ])

    if (pimpinanResult.docs.length > 0) {
      pimpinan = pimpinanResult.docs as unknown as PimpinanItem[]
    }

    const tentang = global as unknown as {
      strukturSenat?: { jabatan: string; nama: string }
      strukturUPT?: UnitItem[]
      strukturBagian?: { bagian: string; kepala?: string }[]
      strukturCatatan?: string
    }

    if (tentang.strukturSenat?.jabatan) senat = tentang.strukturSenat
    upt = tentang.strukturUPT || []
    bagian = (tentang.strukturBagian || []).map((b) => ({ bagian: b.bagian, kepala: b.kepala }))
    catatan = tentang.strukturCatatan || ''
  } catch {
    // DB unavailable
  }

  const [ketua, ...wakilKetua] = pimpinan

  return (
    <article className="space-y-8">
      {!ketua && upt.length === 0 && bagian.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 p-10 text-center text-gray-500">
          Struktur organisasi belum tersedia.
        </div>
      ) : null}
      <section>
        <div className="bg-[#1E3A5F] rounded-xl p-5 text-center text-white mb-6">
          <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Pimpinan Tertinggi</p>
          <p className="font-bold text-lg">{ketua?.jabatan}</p>
          <p className="text-[#F5A623] font-medium text-sm mt-0.5">{ketua?.nama}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {wakilKetua.map((item, idx) => (
            <div key={idx} className="border-2 border-[#1E3A5F] rounded-xl p-4 text-center bg-white">
              <p className="text-[#1E3A5F] font-semibold text-xs uppercase tracking-wide mb-2">{item.jabatan}</p>
              <p className="text-gray-800 text-sm font-medium leading-snug">{item.nama}</p>
            </div>
          ))}
          <div className="border border-dashed border-gray-400 rounded-xl p-4 text-center bg-[#F0F4F8]">
            <p className="text-gray-600 font-semibold text-xs uppercase tracking-wide mb-2">{senat.jabatan}</p>
            <p className="text-gray-700 text-sm font-medium leading-snug">{senat.nama}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-[#1E3A5F] mb-4">Unit Pelaksana Teknis (UPT)</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {upt.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 p-4 bg-[#F0F4F8] border border-gray-200 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] flex-shrink-0 mt-2" aria-hidden="true" />
              <div>
                <p className="font-medium text-gray-900 text-sm">{item.unit}</p>
                {item.kepala && <p className="text-gray-500 text-xs mt-0.5">Kepala: {item.kepala}</p>}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold text-[#1E3A5F] mb-4">Bagian Administrasi</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {bagian.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F] flex-shrink-0 mt-2" aria-hidden="true" />
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
