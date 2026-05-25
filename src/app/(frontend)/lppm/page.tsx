import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import SectionPageHeader from '@/components/layout/SectionPageHeader';
import { getPayloadClient } from '@/lib/payload';
import { resolveLppmSections, type PayloadSectionMeta } from '@/lib/frontend-section-routing';
import { buildBreadcrumbJsonLd, buildPageMetadata } from '@/lib/seo';

type StatItem = { value: string; label: string };

const defaultStats: StatItem[] = [
  { value: '3', label: 'Ruang Layanan' },
  { value: '120+', label: 'Publikasi' },
  { value: '5+', label: 'Fokus Riset' },
  { value: '18', label: 'Hibah & Program' },
];

export const metadata: Metadata = buildPageMetadata({
  title: 'LPPM | STTPU Jakarta',
  description: 'Lembaga Penelitian dan Pengabdian kepada Masyarakat STTPU Jakarta.',
  path: '/lppm',
});

export default async function LppmPage() {
  let sections = resolveLppmSections();
  let stats = defaultStats;

  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'lppm-page' as never });
    const data = global as { subpages?: PayloadSectionMeta[]; stats?: StatItem[] };
    sections = resolveLppmSections(data.subpages || []);
    if (Array.isArray(data.stats) && data.stats.length > 0) stats = data.stats;
  } catch {
    // keep defaults
  }

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'LPPM', path: '/lppm' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SectionPageHeader
        title="LPPM"
        subtitle="Lembaga Penelitian dan Pengabdian kepada Masyarakat yang mengelola riset terapan, publikasi ilmiah, pedoman penelitian, dan program pengabdian STTPU."
        breadcrumbs={[{ label: 'LPPM', href: '/lppm' }]}
      />
      <section className="border-b border-gray-100 bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ul className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4" aria-label="Statistik LPPM">
            {stats.map((stat) => (
              <li key={stat.label} className="text-center">
                <p className="break-words text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">{stat.value}</p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.slug}
              href={`/lppm/${section.slug}`}
              className="group rounded-premium border border-gray-100 bg-white p-6 shadow-premium transition-all hover:-translate-y-1 hover:shadow-premium-hover sm:rounded-premium-lg"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">LPPM</p>
              <h2 className="mt-3 text-xl font-black text-brand-navy">{section.breadcrumb || section.title}</h2>
              <p className="mt-4 text-sm font-medium leading-7 text-gray-500">{section.subtitle}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-brand-navy">
                Buka Halaman
                <ChevronRight size={16} className="text-brand-gold transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
