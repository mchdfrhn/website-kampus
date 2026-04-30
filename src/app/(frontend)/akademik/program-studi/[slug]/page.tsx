import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AkademikPageHeader from '@/components/sections/akademik/AkademikPageHeader';
import ProgramStudiDetailContent from '@/components/sections/akademik/ProgramStudiDetailContent';
import DetailBackButton from '@/components/ui/DetailBackButton';
import { getAkademikNavigation } from '@/lib/akademik-navigation';
import { mapPayloadToProgramStudi, normalizeProgramStudiSlug } from '@/lib/data/program-studi';
import type { ProgramStudi } from '@/lib/data/program-studi';
import { getPayloadClient } from '@/lib/payload';
import {

  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildProgramJsonLd,
} from '@/lib/seo';

export async function generateStaticParams() {
  if (process.env.BUILD_SKIP_DB) return [];
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'program-studi',
      depth: 0,
      limit: 100,
    });
    if (result.docs.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return result.docs
        .map((doc: any) => ({ slug: normalizeProgramStudiSlug(doc.slug as string) }))
        .filter((doc) => doc.slug);
    }
  } catch {
    // ignore
  }
  return [];
}

async function fetchProdi(slug: string): Promise<ProgramStudi | undefined> {
  try {
    const normalizedSlug = normalizeProgramStudiSlug(slug);
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'program-studi',
      depth: 1,
      limit: 1,
      where: { slug: { equals: normalizedSlug } },
    });
    if (result.docs.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return mapPayloadToProgramStudi(result.docs[0] as any);
    }

    const fallbackResult = await payload.find({
      collection: 'program-studi',
      depth: 1,
      limit: 100,
    });

    const matchedDoc = fallbackResult.docs.find((doc) => {
      const candidate = doc as { slug?: string | null; nama?: string | null };
      return normalizeProgramStudiSlug(candidate.slug || candidate.nama || '') === normalizedSlug;
    });

    if (matchedDoc) {
      return mapPayloadToProgramStudi(matchedDoc);
    }
  } catch {
    return undefined;
  }
  return undefined;
}

async function fetchRelatedProdi(slug: string): Promise<ProgramStudi[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'program-studi',
      depth: 1,
      limit: 10,
      where: {
        and: [
          { status: { equals: 'aktif' } },
          { slug: { not_equals: slug } },
        ],
      },
      sort: 'urutan',
    });
    return result.docs.map((doc) => mapPayloadToProgramStudi(doc));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const prodi = await fetchProdi(slug);
  if (!prodi) return {};
  return buildPageMetadata({
    title: `${prodi.nama} (${prodi.jenjang}) | STTPU Jakarta`,
    description: prodi.deskripsiSingkat,
    path: `/akademik/program-studi/${prodi.slug}`,
    image: prodi.thumbnailUrl,
  });
}

export default async function ProgramStudiDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prodi = await fetchProdi(normalizeProgramStudiSlug(slug));
  if (!prodi) notFound();
  const others = await fetchRelatedProdi(slug);
  const { sidebarTitle, links } = await getAkademikNavigation();
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'Akademik', path: '/akademik/program-studi' },
    { name: 'Program Studi', path: '/akademik/program-studi' },
    { name: `${prodi.nama} (${prodi.jenjang})`, path: `/akademik/program-studi/${prodi.slug}` },
  ]);
  const programJsonLd = buildProgramJsonLd({
    name: `${prodi.nama} (${prodi.jenjang})`,
    path: `/akademik/program-studi/${prodi.slug}`,
    description: prodi.deskripsiSingkat,
    image: prodi.thumbnailUrl,
    providerName: 'STTPU Jakarta',
    credentialCategory: prodi.jenjang,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programJsonLd) }}
      />
      <AkademikPageHeader
        title={`${prodi.nama} (${prodi.jenjang})`}
        subtitle={prodi.deskripsiSingkat}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ProgramStudiDetailContent
          prodi={prodi}
          others={others}
          sidebarTitle={sidebarTitle}
          sidebarLinks={links}
        />
        <div className="mt-10 border-t border-gray-100 pt-8">
          <DetailBackButton href="/akademik/program-studi" label="Kembali ke Program Studi" />
        </div>
      </div>
    </>
  );
}
