import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AkademikPageHeader from '@/components/sections/akademik/AkademikPageHeader';
import AkademikSidebar from '@/components/sections/akademik/AkademikSidebar';
import ProgramStudiDetailContent from '@/components/sections/akademik/ProgramStudiDetailContent';
import { getAkademikNavigation } from '@/lib/akademik-navigation';
import { mapPayloadToProgramStudi } from '@/lib/data/program-studi';
import type { ProgramStudi } from '@/lib/data/program-studi';
import { getPayloadClient } from '@/lib/payload';

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
      return result.docs.map((doc: any) => ({ slug: doc.slug as string }));
    }
  } catch {
    // ignore
  }
  return [];
}

async function fetchProdi(slug: string): Promise<ProgramStudi | undefined> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'program-studi',
      depth: 1,
      limit: 1,
      where: { slug: { equals: slug } },
    });
    if (result.docs.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return mapPayloadToProgramStudi(result.docs[0] as any);
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
  return {
    title: `${prodi.nama} (${prodi.jenjang}) | STTPU Jakarta`,
    description: prodi.deskripsiSingkat,
  };
}

export default async function ProgramStudiDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prodi = await fetchProdi(slug);
  if (!prodi) notFound();
  const others = await fetchRelatedProdi(slug);
  const { sidebarTitle, links } = await getAkademikNavigation();

  return (
    <>
      <AkademikPageHeader
        title={`${prodi.nama} (${prodi.jenjang})`}
        subtitle={prodi.deskripsiSingkat}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <AkademikSidebar pathname="/akademik/program-studi" title={sidebarTitle} links={links} />
          <div className="flex-1 min-w-0">
            <ProgramStudiDetailContent prodi={prodi} others={others} />
          </div>
        </div>
      </div>
    </>
  );
}
