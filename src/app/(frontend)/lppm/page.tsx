import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import { BookOpenCheck, ClipboardList, Microscope } from 'lucide-react';
import OverviewPageLayout from '@/components/layout/OverviewPageLayout';
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

const iconMap = {
  'unit-penelitian': Microscope,
  publikasi: BookOpenCheck,
  pedoman: ClipboardList,
};

export const metadata: Metadata = buildPageMetadata({
  title: 'LPPM | STTPU Jakarta',
  description: 'Lembaga Penelitian dan Pengabdian kepada Masyarakat STTPU Jakarta.',
  path: '/lppm',
});

async function resolveLppmPageData() {
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

  return { sections, stats };
}

const getLppmPageData = unstable_cache(
  resolveLppmPageData,
  ['lppm-page-data'],
  { revalidate: 60 },
);

export default async function LppmPage() {
  const { sections, stats } = await getLppmPageData();

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
      <OverviewPageLayout
        title="LPPM"
        subtitle="Lembaga Penelitian dan Pengabdian kepada Masyarakat yang mengelola riset terapan, publikasi ilmiah, pedoman penelitian, dan program pengabdian STTPU."
        breadcrumbs={[{ label: 'LPPM', href: '/lppm' }]}
        stats={stats}
        statsLabel="Statistik LPPM"
        cards={sections.map((section) => ({
          title: section.breadcrumb || section.title,
          desc: section.subtitle,
          href: `/lppm/${section.slug}`,
          eyebrow: 'LPPM',
          icon: iconMap[section.key as keyof typeof iconMap] || Microscope,
        }))}
      />
    </>
  );
}
