import { getPayloadClient } from '@/lib/payload';
import { serializeLexical } from '@/lib/utils';

type Milestone = { tahun: string; judul: string; deskripsi?: string }

export default async function SejarahContent() {
  let milestones: Milestone[] = []
  let sejarahHtml = ''

  try {
    const payload = await getPayloadClient()
    const global = await payload.findGlobal({ slug: 'tentang-kami' })
    const data = global as unknown as { milestones?: Milestone[]; sejarahDeskripsi?: unknown }
    milestones = data.milestones || []
    sejarahHtml = serializeLexical(data.sejarahDeskripsi)
  } catch {
    // DB unavailable
  }

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
      <div className="mb-12 text-center lg:mb-16 lg:text-left">
        <h2 className="text-brand-navy font-bold text-3xl md:text-4xl tracking-tight leading-[1.2]">
          Sejarah STTPU Jakarta
        </h2>
        <div className="w-12 h-1 bg-brand-gold rounded-full mt-6 mx-auto lg:mx-0" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8">
          <p className="text-gray-500 font-medium max-w-3xl leading-relaxed mx-auto lg:mx-0 text-sm md:text-base">
            Perjalanan panjang STTPU Jakarta sejak berdiri hingga berkembang menjadi institusi pendidikan tinggi yang dipercaya oleh ribuan mahasiswa dan alumni di seluruh Indonesia.
          </p>
        </div>
      </div>

      <section className="mb-10">
        <h3 className="text-xl font-bold text-brand-navy mb-1">Tentang Kami</h3>
        <p className="text-gray-500 text-sm mb-5">Narasi lengkap perjalanan berdirinya STTPU Jakarta sebagai institusi pendidikan tinggi vokasi.</p>
        <div className="bg-brand-mist rounded-xl p-5 border border-gray-200">
          {sejarahHtml ? (
            <div className="prose prose-gray max-w-none text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: sejarahHtml }} />
          ) : (
            <p className="text-sm text-gray-500">Deskripsi sejarah belum tersedia.</p>
          )}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-brand-navy mb-1">Perjalanan Kami</h3>
        <p className="text-gray-500 text-sm mb-6">Tonggak-tonggak penting dalam sejarah perkembangan STTPU Jakarta dari masa ke masa.</p>
        <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
        <ol className="relative border-l-2 border-brand-navy/20 space-y-0" aria-label="Tonggak sejarah STTPU">
          {milestones.map((item, idx) => (
            <li key={idx} className="ml-6 pb-8 last:pb-0">
              <span
                className="absolute -left-[11px] flex items-center justify-center w-5 h-5 rounded-full bg-brand-navy border-2 border-white"
                aria-hidden="true"
              />
              <div className="mb-1 flex items-center gap-3">
                <span className="inline-block bg-brand-gold text-brand-navy font-bold text-xs px-2.5 py-0.5 rounded">
                  {item.tahun}
                </span>
                <h3 className="font-semibold text-gray-900 text-sm">{item.judul}</h3>
              </div>
              {item.deskripsi && (
                <p className="text-gray-600 text-sm leading-relaxed">{item.deskripsi}</p>
              )}
            </li>
          ))}
        </ol>
        </div>
      </section>
    </article>
  );
}
