import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AkademikPageHeader from '@/components/sections/akademik/AkademikPageHeader';
import ProgramStudiDetailContent from '@/components/sections/akademik/ProgramStudiDetailContent';
import { programStudiList, getProgramStudiBySlug, mapPayloadToProgramStudi } from '@/lib/data/program-studi';
import type { ProgramStudi } from '@/lib/data/program-studi';

export async function generateStaticParams() {
  try {
    const { getPayloadClient } = await import('@/lib/payload');
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
    // fall through to static
  }
  return programStudiList.map((p) => ({ slug: p.slug }));
}

async function fetchProdi(slug: string): Promise<ProgramStudi | undefined> {
  try {
    const { getPayloadClient } = await import('@/lib/payload');
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
    // fall through to static
  }
  return getProgramStudiBySlug(slug);
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

  return (
    <>
      <AkademikPageHeader
        title={`${prodi.nama} (${prodi.jenjang})`}
        subtitle={prodi.deskripsiSingkat}
        breadcrumbs={[
          { label: 'Akademik', href: '#' },
          { label: 'Program Studi', href: '/akademik/program-studi' },
          { label: prodi.nama },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ProgramStudiDetailContent prodi={prodi} />
      </div>
    </>
  );
}
