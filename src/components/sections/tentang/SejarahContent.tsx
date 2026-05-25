import { getPayloadClient } from '@/lib/payload';
import { serializeLexical } from '@/lib/utils';
import { Calendar } from 'lucide-react';

type Milestone = { tahun: string; judul: string; deskripsi?: string }

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
    <article className="space-y-10 sm:space-y-12">
      <SectionCard title="Tentang Kami" eyebrow="Overview">
        {sejarahHtml ? (
          <div className="prose prose-slate max-w-none text-gray-600 leading-8 prose-headings:text-brand-navy prose-p:text-gray-600 prose-p:leading-8 prose-strong:text-brand-navy" dangerouslySetInnerHTML={{ __html: sejarahHtml }} />
        ) : (
          <p className="text-sm font-medium text-gray-500">Deskripsi sejarah belum tersedia.</p>
        )}
      </SectionCard>

      <SectionCard title="Perjalanan Kami" eyebrow="Milestones">
        <ol className="relative border-l-2 border-brand-navy/10 space-y-0" aria-label="Tonggak sejarah STTPU">
          {milestones.map((item, idx) => (
            <li key={idx} className="ml-8 pb-10 last:pb-0 relative group">
              <span
                className="absolute -left-[41px] top-1.5 flex items-center justify-center w-6 h-6 rounded-xl bg-white border border-brand-navy/15 text-brand-navy shadow-sm group-hover:bg-brand-navy group-hover:text-white transition-colors duration-300"
                aria-hidden="true"
              >
                <Calendar size={12} />
              </span>
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <span className="inline-block bg-brand-gold text-brand-navy font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md">
                  {item.tahun}
                </span>
                <h4 className="font-bold text-brand-navy text-sm sm:text-base leading-tight">{item.judul}</h4>
              </div>
              {item.deskripsi && (
                <p className="text-gray-500 text-sm font-medium leading-relaxed mt-2">{item.deskripsi}</p>
              )}
            </li>
          ))}
        </ol>
      </SectionCard>
    </article>
  );
}
