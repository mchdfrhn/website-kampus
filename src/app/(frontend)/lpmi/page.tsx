import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import SectionPageHeader from '@/components/layout/SectionPageHeader';
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
      <SectionPageHeader
        title="LPMI"
        subtitle="Lembaga Penjaminan Mutu Internal yang mengawal kebijakan, pedoman, standar pendidikan, standar penelitian, dan standar PKM STTPU."
        breadcrumbs={[{ label: 'LPMI', href: '/lpmi' }]}
      />
      <section className="border-b border-gray-100 bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ul className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4" aria-label="Statistik LPMI">
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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.slug}
              href={`/lpmi/${section.slug}`}
              className="group rounded-premium border border-gray-100 bg-white p-6 shadow-premium transition-all hover:-translate-y-1 hover:shadow-premium-hover sm:rounded-premium-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gold/15 text-brand-navy">
                <ShieldCheck size={22} />
              </div>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">LPMI</p>
              <h2 className="mt-3 text-xl font-black text-brand-navy">{section.breadcrumb || section.title}</h2>
              {section.subtitle ? (
                <p className="mt-4 text-sm font-medium leading-7 text-gray-500">{section.subtitle}</p>
              ) : null}
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
