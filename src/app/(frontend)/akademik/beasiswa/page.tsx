import type { Metadata } from 'next';
import AkademikPageHeader from '@/components/sections/akademik/AkademikPageHeader';
import AkademikSidebar from '@/components/sections/akademik/AkademikSidebar';
import BeasiswaContent from '@/components/sections/akademik/BeasiswaContent';
import { getAkademikNavigation } from '@/lib/akademik-navigation';


export const metadata: Metadata = {
  title: 'Beasiswa | STTPU Jakarta',
  description:
    'Informasi beasiswa internal dan eksternal yang tersedia untuk mahasiswa STTPU Jakarta — KIP Kuliah, LPDP, beasiswa prestasi, dan lainnya.',
};

export default async function BeasiswaPage() {
  const { sidebarTitle, links } = await getAkademikNavigation();

  return (
    <>
      <AkademikPageHeader
        title="Beasiswa"
        subtitle="Berbagai program beasiswa tersedia untuk mendukung mahasiswa STTPU Jakarta dalam menyelesaikan pendidikan dengan optimal."
        breadcrumbs={[
          { label: 'Akademik' },
          { label: 'Beasiswa' },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <AkademikSidebar pathname="/akademik/beasiswa" title={sidebarTitle} links={links} />
          <div className="flex-1 min-w-0">
            <BeasiswaContent />
          </div>
        </div>
      </div>
    </>
  );
}
