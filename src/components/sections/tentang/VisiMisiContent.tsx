import { Eye } from 'lucide-react';
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
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
      <div className="mb-12 text-center lg:mb-16 lg:text-left">
        <h2 className="text-brand-navy font-bold text-3xl md:text-4xl tracking-tight leading-[1.2]">
          Visi, Misi &amp; Nilai
        </h2>
        <div className="w-12 h-1 bg-brand-gold rounded-full mt-6 mx-auto lg:mx-0" />
        <p className="mt-8 text-gray-500 font-medium max-w-3xl leading-relaxed mx-auto lg:mx-0 text-sm md:text-base">
          Landasan filosofis dan arah strategis STTPU Jakarta dalam menjalankan Tridharma Perguruan Tinggi serta membentuk karakter lulusan yang unggul dan berintegritas.
        </p>
      </div>

      <section className="bg-brand-navy rounded-xl p-7 text-white">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-brand-gold rounded-lg flex items-center justify-center flex-shrink-0">
            <Eye size={18} className="text-brand-navy" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Visi</h3>
            <p className="text-white/90 leading-relaxed text-sm">{visi}</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-brand-navy mb-1">Misi</h3>
        <p className="text-gray-500 text-sm mb-5">Langkah-langkah strategis STTPU Jakarta dalam mewujudkan visi institusi.</p>
        <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
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
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-brand-navy mb-1">Tujuan</h3>
        <p className="text-gray-500 text-sm mb-5">Sasaran spesifik yang ingin dicapai STTPU Jakarta melalui proses pendidikan.</p>
        <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
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
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-brand-navy mb-1">Nilai-Nilai Kami</h3>
        <p className="text-gray-500 text-sm mb-5">Prinsip-prinsip yang menjadi landasan perilaku dan budaya institusi.</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Nilai-nilai STTPU">
          {nilaiNilai.map(({ nama, deskripsi }) => (
            <li
              key={nama}
              className="flex items-start gap-3 p-4 bg-brand-mist rounded-xl border border-gray-200"
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
