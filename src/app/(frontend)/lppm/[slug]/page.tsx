import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SectionPageHeader from '@/components/layout/SectionPageHeader';
import PenelitianSidebar from '@/components/sections/penelitian/PenelitianSidebar';
import UnitPenelitianContent from '@/components/sections/penelitian/UnitPenelitianContent';
import PublikasiContent from '@/components/sections/penelitian/PublikasiContent';
import PedomanContent from '@/components/sections/penelitian/PedomanContent';
import { buildBreadcrumbJsonLd, buildPageMetadata } from '@/lib/seo';

const lppmSections = [
  {
    slug: 'unit-penelitian',
    title: 'Unit Penelitian',
    subtitle: 'Unit riset dan laboratorium aktif yang mendukung kegiatan penelitian terapan sivitas akademika STTPU.',
    breadcrumb: 'Unit Penelitian',
    component: UnitPenelitianContent,
  },
  {
    slug: 'publikasi',
    title: 'Publikasi',
    subtitle: 'Kumpulan karya ilmiah dosen dan mahasiswa STTPU, meliputi jurnal, prosiding, dan buku.',
    breadcrumb: 'Publikasi',
    component: PublikasiContent,
  },
  {
    slug: 'pedoman',
    title: 'Pedoman',
    subtitle: 'Acuan kegiatan penelitian, pengabdian kepada masyarakat, publikasi, dan etika riset LPPM STTPU.',
    breadcrumb: 'Pedoman',
    component: PedomanContent,
  },
];

const sidebarLinks = lppmSections.map((section) => ({
  label: section.breadcrumb,
  href: `/lppm/${section.slug}`,
}));

export function generateStaticParams() {
  return lppmSections.map((section) => ({ slug: section.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const section = lppmSections.find((item) => item.slug === slug);
  if (!section) return {};

  return buildPageMetadata({
    title: `${section.title} LPPM | STTPU Jakarta`,
    description: section.subtitle,
    path: `/lppm/${section.slug}`,
  });
}

export default async function LppmSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const section = lppmSections.find((item) => item.slug === slug);
  if (!section) notFound();

  const Content = section.component;
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'LPPM', path: '/lppm' },
    { name: section.breadcrumb, path: `/lppm/${section.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SectionPageHeader
        title={section.title}
        subtitle={section.subtitle}
        breadcrumbs={[
          { label: 'LPPM', href: '/lppm' },
          { label: section.breadcrumb, href: `/lppm/${section.slug}` },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <PenelitianSidebar pathname={`/lppm/${section.slug}`} title="Navigasi LPPM" links={sidebarLinks} />
          <div className="flex-1 min-w-0">
            <Content />
          </div>
        </div>
      </div>
    </>
  );
}
