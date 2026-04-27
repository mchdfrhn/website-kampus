export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PenelitianPageHeader from '@/components/sections/penelitian/PenelitianPageHeader';
import PenelitianSidebar from '@/components/sections/penelitian/PenelitianSidebar';
import { getPayloadClient } from '@/lib/payload';
import { resolvePenelitianSections, type PayloadSectionMeta } from '@/lib/frontend-section-routing';
import { buildBreadcrumbJsonLd } from '@/lib/seo';


export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'penelitian-page' as never });
    const subpages = (global as { subpages?: PayloadSectionMeta[] }).subpages || [];
    const resolved = resolvePenelitianSections(subpages);
    if (resolved.length > 0) return resolved.map((item) => ({ slug: item.slug }));
  } catch {
    // fallback below
  }

  return resolvePenelitianSections().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let resolvedSections = resolvePenelitianSections();
  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'penelitian-page' as never });
    const subpages = (global as { subpages?: PayloadSectionMeta[] }).subpages || [];
    resolvedSections = resolvePenelitianSections(subpages);
  } catch {
    // keep defaults
  }
  const s = resolvedSections.find((item) => item.slug === slug);
  if (!s) return {};
  return { title: `${s.title} | STTPU Jakarta`, description: s.subtitle };
}

export default async function PenelitianSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let resolvedSections = resolvePenelitianSections();

  let sidebarTitle = 'Navigasi Penelitian'
  let sidebarLinks = resolvedSections.map((section) => ({
    label: section.breadcrumb,
    href: `/penelitian/${section.slug}`,
  }))

  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'penelitian-page' as never });
    const data = global as { subpages?: PayloadSectionMeta[]; sidebarTitle?: string };
    resolvedSections = resolvePenelitianSections(data.subpages || []);
    sidebarTitle = data.sidebarTitle || sidebarTitle
    if (resolvedSections.length > 0) {
      sidebarLinks = resolvedSections.map((item) => ({
        label: item.breadcrumb || item.title,
        href: `/penelitian/${item.slug}`,
      }))
    }
  } catch {
    // keep defaults
  }

  const s = resolvedSections.find((item) => item.slug === slug);
  if (!s) notFound();

  const { title, subtitle, breadcrumb, component: Content } = s;

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'Penelitian', path: '/penelitian' },
    { name: s.breadcrumb || s.title, path: `/penelitian/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PenelitianPageHeader title={title} subtitle={subtitle} breadcrumb={breadcrumb} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <PenelitianSidebar pathname={`/penelitian/${slug}`} title={sidebarTitle} links={sidebarLinks} />
          <div className="flex-1 min-w-0">
            <Content />
          </div>
        </div>
      </div>
    </>
  );
}
