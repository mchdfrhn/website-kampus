import { getPayloadClient } from '@/lib/payload';
import { serializeLexical } from '@/lib/utils';
import TimelineList from './TimelineList';

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
        <TimelineList milestones={milestones} />
      </SectionCard>
    </article>
  );
}
