import AkademikPageHeader from '@/components/sections/akademik/AkademikPageHeader';
import BeasiswaContent from '@/components/sections/akademik/BeasiswaContent';
import AkademikSidebar from '@/components/sections/akademik/AkademikSidebar';
import { getAkademikPageContent } from '@/lib/data/akademik-page';
import { buildPageMetadata } from '@/lib/seo';


export const metadata = buildPageMetadata({
  title: 'Beasiswa | STTPU Jakarta',
  description:
    'Informasi beasiswa internal dan eksternal yang tersedia untuk mahasiswa STTPU Jakarta — KIP Kuliah, LPDP, beasiswa prestasi, dan lainnya.',
  path: '/akademik/beasiswa',
});

export default async function BeasiswaPage() {
  const pageContent = await getAkademikPageContent();

  return (
    <>
      <AkademikPageHeader
        title="Beasiswa"
        subtitle="Berbagai program beasiswa tersedia untuk mendukung mahasiswa STTPU Jakarta dalam menyelesaikan pendidikan dengan optimal."
        breadcrumbs={[
          { label: 'Akademik', href: '/akademik' },
          { label: 'Beasiswa', href: '/akademik/beasiswa' },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_20rem] xl:grid-cols-[1fr_22rem]">
          <div className="min-w-0">
            <BeasiswaContent content={pageContent.beasiswaContent} />
          </div>
          <AkademikSidebar currentPath="/akademik/beasiswa" />
        </div>
      </div>
    </>
  );
}
