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
    <article>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-[#1E3A5F] mb-4">Tentang Kami</h2>
        {sejarahHtml ? (
          <div className="prose prose-gray max-w-none text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: sejarahHtml }} />
        ) : (
          <p className="text-sm text-gray-500">Deskripsi sejarah belum tersedia.</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#1E3A5F] mb-6">Perjalanan Kami</h2>
        <ol className="relative border-l-2 border-[#1E3A5F]/20 space-y-0" aria-label="Tonggak sejarah STTPU">
          {milestones.map((item, idx) => (
            <li key={idx} className="ml-6 pb-8 last:pb-0">
              <span
                className="absolute -left-[11px] flex items-center justify-center w-5 h-5 rounded-full bg-[#1E3A5F] border-2 border-white"
                aria-hidden="true"
              />
              <div className="mb-1 flex items-center gap-3">
                <span className="inline-block bg-[#F5A623] text-[#1E3A5F] font-bold text-xs px-2.5 py-0.5 rounded">
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
      </section>
    </article>
  );
}
