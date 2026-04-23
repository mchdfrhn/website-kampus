import type { Metadata } from 'next';
import AkademikPageHeader from '@/components/sections/akademik/AkademikPageHeader';
import AkademikSidebar from '@/components/sections/akademik/AkademikSidebar';
import ProgramStudiGrid from '@/components/sections/akademik/ProgramStudiGrid';
import { getAkademikNavigation } from '@/lib/akademik-navigation';
import { mapPayloadToProgramStudi } from '@/lib/data/program-studi';
import type { ProgramStudi } from '@/lib/data/program-studi';
import { getPayloadClient } from '@/lib/payload';

export const metadata: Metadata = {
  title: 'Program Studi | STTPU Jakarta',
  description:
    'Empat program studi D-IV unggulan di STTPU Jakarta: Teknik Sipil, Teknik Pengairan, Teknik Lingkungan, dan Manajemen Konstruksi.',
};

async function fetchProdiList(): Promise<ProgramStudi[]> {
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
}

export default async function ProgramStudiPage() {
  const prodiList = await fetchProdiList();
  const { sidebarTitle, links } = await getAkademikNavigation();

  return (
    <>
      <AkademikPageHeader
        title="Program Studi"
        subtitle="Empat program studi D-IV yang dirancang untuk menghasilkan sarjana terapan kompeten di sektor pekerjaan umum dan infrastruktur nasional."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <AkademikSidebar pathname="/akademik/program-studi" title={sidebarTitle} links={links} />
          <div className="flex-1 min-w-0">
            <ProgramStudiGrid prodiList={prodiList} />
          </div>
        </div>
      </div>
    </>
  );
}
