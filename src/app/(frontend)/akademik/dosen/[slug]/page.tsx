import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AkademikPageHeader from '@/components/sections/akademik/AkademikPageHeader';
import AkademikSidebar from '@/components/sections/akademik/AkademikSidebar';
import DosenDetailContent from '@/components/sections/akademik/DosenDetailContent';
import { getAkademikNavigation } from '@/lib/akademik-navigation';
import { mapPayloadToDosen } from '@/lib/data/dosen';
import type { Dosen } from '@/lib/data/dosen';
import { getPayloadClient } from '@/lib/payload';

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
  return {
    title: `${dosen.nama} | Dosen STTPU Jakarta`,
    description: `Profil akademik ${dosen.nama} — ${dosen.jabatanFungsional} di ${dosen.programStudi.join(', ')}, STTPU Jakarta.`,
  };
}

export default async function DosenDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dosen = await fetchDosen(slug);
  if (!dosen) notFound();
  const { sidebarTitle, links } = await getAkademikNavigation();

  return (
    <>
      <AkademikPageHeader
        title={dosen.nama}
        subtitle={`${dosen.jabatanFungsional} · ${dosen.programStudi.join(', ')}`}
        breadcrumbs={[
          { label: 'Akademik' },
          { label: 'Dosen', href: '/akademik/dosen' },
          { label: dosen.nama.split(',')[0] },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <AkademikSidebar pathname="/akademik/dosen" title={sidebarTitle} links={links} />
          <div className="flex-1 min-w-0">
            <DosenDetailContent dosen={dosen} />
          </div>
        </div>
      </div>
    </>
  );
}
