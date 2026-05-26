import type { Metadata } from 'next';
import AkademikPageHeader from '@/components/sections/akademik/AkademikPageHeader';
import DosenGrid from '@/components/sections/akademik/DosenGrid';
import AkademikSidebar from '@/components/sections/akademik/AkademikSidebar';
import AkademikCTA from '@/components/sections/akademik/AkademikCTA';
import { getAkademikPageContent } from '@/lib/data/akademik-page';
import { mapPayloadToDosen } from '@/lib/data/dosen';
import type { Dosen } from '@/lib/data/dosen';
import { getPayloadClient } from '@/lib/payload';
import { buildPageMetadata } from '@/lib/seo';


export const metadata: Metadata = buildPageMetadata({
  title: 'Dosen | STTPU Jakarta',
  description:
    'Direktori dosen STTPU Jakarta — tenaga pengajar berpengalaman dan berkualifikasi tinggi di bidang teknik sipil, teknik lingkungan, dan teknik informatika.',
  path: '/akademik/dosen',
});

async function fetchDosenList(): Promise<Dosen[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'dosen',
      depth: 1,
      limit: 200,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return result.docs.map((doc: any) => mapPayloadToDosen(doc));
  } catch {
    return [];
  }
}

async function fetchProgramOrder(): Promise<string[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'program-studi',
      depth: 0,
      limit: 100,
      sort: 'urutan',
      where: { status: { equals: 'aktif' } },
    });

    return result.docs
      .map((doc) => {
        const item = doc as { nama?: string | null };
        return item.nama?.trim() || '';
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

export default async function DosenPage() {
  const [fetchedDosenList, programOrder, pageContent] = await Promise.all([
    fetchDosenList(),
    fetchProgramOrder(),
    getAkademikPageContent(),
  ]);

  return (
    <>
      <AkademikPageHeader
        title="Direktori Dosen"
        subtitle="Tenaga pengajar STTPU Jakarta yang berpengalaman, berkualifikasi tinggi, dan aktif dalam penelitian serta pengabdian masyarakat."
        breadcrumbs={[
          { label: 'Akademik', href: '/akademik' },
          { label: 'Dosen', href: '/akademik/dosen' },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_20rem] xl:grid-cols-[1fr_22rem]">
          <div className="min-w-0">
            <DosenGrid
              dosenList={fetchedDosenList}
              programOrder={programOrder}
              content={pageContent.dosenContent}
            />
            <AkademikCTA card={pageContent.consultationCard} className="mt-12" />
          </div>
          <AkademikSidebar currentPath="/akademik/dosen" />
        </div>
      </div>
    </>
  );
}
