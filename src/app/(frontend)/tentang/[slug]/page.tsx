export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TentangPageHeader from '@/components/sections/tentang/TentangPageHeader';
import TentangSidebar from '@/components/sections/tentang/TentangSidebar';
import { getPayloadClient } from '@/lib/payload';
import { resolveTentangSections, type PayloadSectionMeta } from '@/lib/frontend-section-routing';


export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'tentang-kami' });
    const subpages = (global as { subpages?: PayloadSectionMeta[] }).subpages || [];
    const resolved = resolveTentangSections(subpages);
    if (resolved.length > 0) return resolved.map((item) => ({ slug: item.slug }));
  } catch {
    // fallback below
  }
  return resolveTentangSections().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let resolvedSections = resolveTentangSections();
  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'tentang-kami' });
    const subpages = (global as { subpages?: PayloadSectionMeta[] }).subpages || [];
    resolvedSections = resolveTentangSections(subpages);
  } catch {
    // keep route defaults
  }
  const section = resolvedSections.find((item) => item.slug === slug);
  if (!section) return {};
  return {
    title: `${section.title} | STTPU Jakarta`,
    description: section.subtitle,
  };
}

export default async function TentangSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let resolvedSections = resolveTentangSections();

  let sidebarTitle = 'Navigasi Institusi'
  let sidebarLinks = resolvedSections.map((section) => ({
    label: section.breadcrumb,
    href: `/tentang/${section.slug}`,
  }))

  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'tentang-kami' });
    const data = global as { subpages?: PayloadSectionMeta[]; sidebarTitle?: string };
    resolvedSections = resolveTentangSections(data.subpages || []);
    sidebarTitle = data.sidebarTitle || sidebarTitle
    if (resolvedSections.length > 0) {
      sidebarLinks = resolvedSections.map((item) => ({
        label: item.breadcrumb || item.title,
        href: `/tentang/${item.slug}`,
      }))
    }
  } catch {
    // keep defaults
  }

  const section = resolvedSections.find((item) => item.slug === slug);
  if (!section) notFound();

  const { title, subtitle, component: SectionContent } = section;

  return (
    <>
      <TentangPageHeader
        title={title}
        subtitle={subtitle}
        breadcrumbs={[
          { label: 'Tentang' },
          { label: section.breadcrumb || title },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <TentangSidebar pathname={`/tentang/${slug}`} title={sidebarTitle} links={sidebarLinks} />
          <div className="flex-1 min-w-0">
            <SectionContent />
          </div>
        </div>
      </div>
    </>
  );
}
