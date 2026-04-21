import { getPayloadClient } from '@/lib/payload';

export default async function VisiMisiContent() {
  let visi = ''
  let misi: string[] = []
  let tujuan: string[] = []
  let nilaiNilai: { nama: string; deskripsi?: string }[] = []

  try {
    const payload = await getPayloadClient()
    const global = await payload.findGlobal({ slug: 'tentang-kami' })
    const data = global as unknown as {
      visi?: string
      misi?: { poin: string }[]
      tujuan?: { poin: string }[]
      nilaiNilai?: { nama: string; deskripsi?: string }[]
    }

    visi = data.visi || ''
    misi = data.misi ? data.misi.map((m) => m.poin) : []
    tujuan = data.tujuan ? data.tujuan.map((t) => t.poin) : []
    nilaiNilai = data.nilaiNilai || []
  } catch {
    // DB unavailable
  }

  return (
    <article className="space-y-10">
      <section className="bg-brand-navy rounded-xl p-7 text-white">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-brand-gold rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-brand-navy font-black text-xs">V</span>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-3">Visi</h2>
            <p className="text-white/90 leading-relaxed text-sm">{visi}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-brand-navy mb-5">Misi</h2>
        <ol className="space-y-3" aria-label="Misi STTPU">
          {misi.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3.5 text-sm text-gray-700 leading-relaxed">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-gold/15 text-brand-navy font-bold text-xs flex items-center justify-center mt-0.5"
                aria-hidden="true"
              >
                {idx + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-xl font-bold text-brand-navy mb-5">Tujuan</h2>
        <ul className="space-y-3" aria-label="Tujuan STTPU">
          {tujuan.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
              <span
                className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-gold mt-2"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-brand-navy mb-5">Nilai-Nilai Kami</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Nilai-nilai STTPU">
          {nilaiNilai.map(({ nama, deskripsi }) => (
            <li
              key={nama}
              className="flex items-start gap-3 p-4 bg-brand-mist rounded-lg border border-gray-200"
            >
              <div
                className="w-9 h-9 bg-brand-navy rounded-lg flex items-center justify-center flex-shrink-0 text-brand-gold font-black text-sm"
                aria-hidden="true"
              >
                {nama[0]}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-1">{nama}</p>
                {deskripsi && <p className="text-gray-600 text-xs leading-relaxed">{deskripsi}</p>}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
