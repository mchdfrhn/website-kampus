import type { Metadata } from 'next';
import AkademikPageHeader from '@/components/sections/akademik/AkademikPageHeader';
import AkademikSidebar from '@/components/sections/akademik/AkademikSidebar';
import DosenGrid from '@/components/sections/akademik/DosenGrid';
import { getAkademikNavigation } from '@/lib/akademik-navigation';
import { mapPayloadToDosen } from '@/lib/data/dosen';
import type { Dosen } from '@/lib/data/dosen';
import { getPayloadClient } from '@/lib/payload';

export const metadata: Metadata = {
  title: 'Dosen | STTPU Jakarta',
  description:
    'Direktori dosen STTPU Jakarta — tenaga pengajar berpengalaman dan berkualifikasi tinggi di bidang teknik sipil, pengairan, lingkungan, dan manajemen konstruksi.',
};

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

export default async function DosenPage() {
  const fetchedDosenList = await fetchDosenList();
  const { sidebarTitle, links } = await getAkademikNavigation();

  return (
    <>
      <AkademikPageHeader
        title="Direktori Dosen"
        subtitle="Tenaga pengajar STTPU Jakarta yang berpengalaman, berkualifikasi tinggi, dan aktif dalam penelitian serta pengabdian masyarakat."
        breadcrumbs={[
          { label: 'Akademik' },
          { label: 'Dosen' },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <AkademikSidebar pathname="/akademik/dosen" title={sidebarTitle} links={links} />
          <div className="flex-1 min-w-0">
            <DosenGrid dosenList={fetchedDosenList} />
          </div>
        </div>
      </div>
    </>
  );
}
