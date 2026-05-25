import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AkademikPageHeader from '@/components/sections/akademik/AkademikPageHeader';
import DosenDetailContent from '@/components/sections/akademik/DosenDetailContent';
import AkademikSidebar from '@/components/sections/akademik/AkademikSidebar';
import { mapPayloadToDosen } from '@/lib/data/dosen';
import type { Dosen } from '@/lib/data/dosen';
import { getPayloadClient } from '@/lib/payload';
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildPersonJsonLd,
} from '@/lib/seo';

export async function generateStaticParams() {
  if (process.env.BUILD_SKIP_DB) return [];
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'dosen',
      depth: 0,
      limit: 200,
    });
    if (result.docs.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return result.docs
        .map((doc: any) => ({ slug: doc.slug as string }))
        .filter((doc) => doc.slug);
    }
  } catch {
    // ignore
  }
  return [];
}

async function fetchDosen(slug: string): Promise<Dosen | undefined> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'dosen',
      depth: 1,
      limit: 1,
      where: { slug: { equals: slug } },
    });
    if (result.docs.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return mapPayloadToDosen(result.docs[0] as any);
    }
  } catch {
    return undefined;
  }
  return undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dosen = await fetchDosen(slug);
  if (!dosen) return {};
  return buildPageMetadata({
    title: `${dosen.nama} | Dosen STTPU Jakarta`,
    description: `Profil akademik ${dosen.nama} — ${dosen.jabatanFungsional} di ${dosen.programStudi.join(', ')}, STTPU Jakarta.`,
    path: `/akademik/dosen/${dosen.slug}`,
    image: dosen.fotoUrl,
    type: 'profile',
  });
}

export default async function DosenDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dosen = await fetchDosen(slug);
  if (!dosen) notFound();
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'Akademik', path: '/akademik/dosen' },
    { name: 'Dosen', path: '/akademik/dosen' },
    { name: dosen.nama, path: `/akademik/dosen/${dosen.slug}` },
  ]);
  const personJsonLd = buildPersonJsonLd({
    name: dosen.nama,
    path: `/akademik/dosen/${dosen.slug}`,
    description: dosen.bio,
    image: dosen.fotoUrl,
    email: dosen.email,
    worksFor: 'STTPU Jakarta',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <AkademikPageHeader
        title={dosen.nama}
        subtitle={`${dosen.jabatanFungsional} · ${dosen.programStudi.join(', ')}`}
        breadcrumbs={[
          { label: 'Akademik', href: '/akademik' },
          { label: 'Dosen', href: '/akademik/dosen' },
          { label: dosen.nama.split(',')[0] },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_20rem] xl:grid-cols-[1fr_22rem]">
          <div className="min-w-0">
            <DosenDetailContent dosen={dosen} />
          </div>
          <AkademikSidebar currentPath="/akademik/dosen" />
        </div>
      </div>
    </>
  );
}
