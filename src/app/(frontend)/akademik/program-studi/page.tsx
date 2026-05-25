import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import AkademikPageHeader from '@/components/sections/akademik/AkademikPageHeader';
import ProgramStudiGrid from '@/components/sections/akademik/ProgramStudiGrid';
import AkademikSidebar from '@/components/sections/akademik/AkademikSidebar';
import { getAkademikPageContent } from '@/lib/data/akademik-page';
import { mapPayloadToProgramStudi } from '@/lib/data/program-studi';
import type { ProgramStudi } from '@/lib/data/program-studi';
import { getPayloadClient } from '@/lib/payload';
import { buildPageMetadata } from '@/lib/seo';


export const metadata: Metadata = buildPageMetadata({
  title: 'Program Studi | STTPU Jakarta',
  description:
    'Empat program studi D-IV unggulan di STTPU Jakarta: Teknik Sipil, Teknik Pengairan, Teknik Lingkungan, dan Manajemen Konstruksi.',
  path: '/akademik/program-studi',
});

const fetchProdiList = unstable_cache(async (): Promise<ProgramStudi[]> => {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'program-studi',
      depth: 1,
      limit: 100,
      sort: 'urutan',
      where: { status: { equals: 'aktif' } },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return result.docs.map((doc: any) => mapPayloadToProgramStudi(doc));
  } catch {
    return [];
  }
}, ['program-studi-list'], { revalidate: 60 });

export default async function ProgramStudiPage() {
  const prodiList = await fetchProdiList();
  const pageContent = await getAkademikPageContent();

  return (
    <>
      <AkademikPageHeader
        title="Program Studi"
        subtitle="Empat program studi D-IV yang dirancang untuk menghasilkan sarjana terapan kompeten di sektor pekerjaan umum dan infrastruktur nasional."
        breadcrumbs={[
          { label: 'Akademik', href: '/akademik' },
          { label: 'Program Studi', href: '/akademik/program-studi' },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_20rem] xl:grid-cols-[1fr_22rem]">
          <div className="min-w-0">
            <ProgramStudiGrid prodiList={prodiList} content={pageContent.programStudiContent} />
          </div>
          <AkademikSidebar currentPath="/akademik/program-studi" />
        </div>
      </div>
    </>
  );
}
