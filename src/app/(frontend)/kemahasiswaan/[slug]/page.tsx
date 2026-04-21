import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import KemahasiswaanPageHeader from '@/components/sections/kemahasiswaan/KemahasiswaanPageHeader';
import KemahasiswaanSidebar from '@/components/sections/kemahasiswaan/KemahasiswaanSidebar';
import { getPayloadClient } from '@/lib/payload';
import { resolveKemahasiswaanSections, type PayloadSectionMeta } from '@/lib/frontend-section-routing';

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'kemahasiswaan-page' as never });
    const subpages = (global as { subpages?: PayloadSectionMeta[] }).subpages || [];
    const resolved = resolveKemahasiswaanSections(subpages);
    if (resolved.length > 0) return resolved.map((item) => ({ slug: item.slug }));
  } catch {
    // fallback below
  }

  return resolveKemahasiswaanSections().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let resolvedSections = resolveKemahasiswaanSections();
  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'kemahasiswaan-page' as never });
    const subpages = (global as { subpages?: PayloadSectionMeta[] }).subpages || [];
    resolvedSections = resolveKemahasiswaanSections(subpages);
  } catch {
    // keep defaults
  }
  const s = resolvedSections.find((item) => item.slug === slug);
  if (!s) return {};
  return { title: `${s.title} | STTPU Jakarta`, description: s.subtitle };
}

export default async function KemahasiswaanSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let resolvedSections = resolveKemahasiswaanSections();

  let sidebarTitle = 'Navigasi Kemahasiswaan'
  let sidebarLinks = resolvedSections.map((section) => ({
    label: section.breadcrumb,
    href: `/kemahasiswaan/${section.slug}`,
  }))

  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'kemahasiswaan-page' as never });
    const data = global as { subpages?: PayloadSectionMeta[]; sidebarTitle?: string };
    resolvedSections = resolveKemahasiswaanSections(data.subpages || []);
    sidebarTitle = data.sidebarTitle || sidebarTitle
    if (resolvedSections.length > 0) {
      sidebarLinks = resolvedSections.map((item) => ({
        label: item.breadcrumb || item.title,
        href: `/kemahasiswaan/${item.slug}`,
      }))
    }
  } catch {
    // keep defaults
  }

  const s = resolvedSections.find((item) => item.slug === slug);
  if (!s) notFound();

  const { title, subtitle, breadcrumb, component: Content } = s;

  return (
    <>
      <KemahasiswaanPageHeader title={title} subtitle={subtitle} breadcrumb={breadcrumb} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <KemahasiswaanSidebar pathname={`/kemahasiswaan/${slug}`} title={sidebarTitle} links={sidebarLinks} />
          <div className="flex-1 min-w-0">
            <Content />
          </div>
        </div>
      </div>
    </>
  );
}
