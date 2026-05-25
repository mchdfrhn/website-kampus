import type { Metadata } from 'next';
import { ClipboardCheck, FileCheck2, GraduationCap, Handshake, Microscope, ShieldCheck } from 'lucide-react';
import OverviewPageLayout from '@/components/layout/OverviewPageLayout';
import { getPayloadClient } from '@/lib/payload';
import { buildBreadcrumbJsonLd, buildPageMetadata } from '@/lib/seo';

type LpmiSection = {
  slug: string;
  title: string;
  subtitle?: string;
  breadcrumb?: string;
};

type StatItem = { value: string; label: string };

const defaultStats: StatItem[] = [
  { value: '5', label: 'Ruang Standar' },
  { value: 'PPEPP', label: 'Siklus Mutu' },
  { value: 'AMI', label: 'Audit Internal' },
  { value: 'SPMI', label: 'Sistem Mutu' },
];

const defaultSections: LpmiSection[] = [
  { slug: 'kebijakan', title: 'Kebijakan LPMI', subtitle: 'Arah penjaminan mutu internal STTPU.', breadcrumb: 'Kebijakan' },
  { slug: 'pedoman', title: 'Pedoman LPMI', subtitle: 'Panduan kerja penjaminan mutu internal.', breadcrumb: 'Pedoman' },
  { slug: 'standar-pendidikan', title: 'Standar Pendidikan', subtitle: 'Standar mutu penyelenggaraan pendidikan.', breadcrumb: 'Standar Pendidikan' },
  { slug: 'standar-penelitian', title: 'Standar Penelitian', subtitle: 'Standar mutu penelitian STTPU.', breadcrumb: 'Standar Penelitian' },
  { slug: 'standar-pkm', title: 'Standar PKM', subtitle: 'Standar mutu pengabdian kepada masyarakat.', breadcrumb: 'Standar PKM' },
];

const iconMap = {
  kebijakan: ShieldCheck,
  pedoman: ClipboardCheck,
  'standar-pendidikan': GraduationCap,
  'standar-penelitian': Microscope,
  'standar-pkm': Handshake,
};

export const metadata: Metadata = buildPageMetadata({
  title: 'LPMI | STTPU Jakarta',
  description: 'Lembaga Penjaminan Mutu Internal STTPU Jakarta.',
  path: '/lpmi',
});

export default async function LpmiPage() {
  let sections = defaultSections;
  let stats = defaultStats;

  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'lpmi-page' as never });
    const data = global as { subpages?: LpmiSection[]; stats?: StatItem[] };
    if (Array.isArray(data.subpages) && data.subpages.length > 0) sections = data.subpages;
    if (Array.isArray(data.stats) && data.stats.length > 0) stats = data.stats;
  } catch {
    // keep defaults
  }

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'LPMI', path: '/lpmi' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <OverviewPageLayout
        title="LPMI"
        subtitle="Lembaga Penjaminan Mutu Internal yang mengawal kebijakan, pedoman, standar pendidikan, standar penelitian, dan standar PKM STTPU."
        breadcrumbs={[{ label: 'LPMI', href: '/lpmi' }]}
        stats={stats}
        statsLabel="Statistik LPMI"
        cards={sections.map((section) => ({
          title: section.breadcrumb || section.title,
          desc: section.subtitle,
          href: `/lpmi/${section.slug}`,
          eyebrow: 'LPMI',
          icon: iconMap[section.slug as keyof typeof iconMap] || FileCheck2,
        }))}
      />
    </>
  );
}
