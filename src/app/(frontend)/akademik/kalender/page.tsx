import type { Metadata } from 'next';
import AkademikPageHeader from '@/components/sections/akademik/AkademikPageHeader';
import AkademikSidebar from '@/components/sections/akademik/AkademikSidebar';
import KalenderContent from '@/components/sections/akademik/KalenderContent';
import { getAkademikNavigation } from '@/lib/akademik-navigation';


export const metadata: Metadata = {
  title: 'Kalender Akademik | STTPU Jakarta',
  description:
    'Kalender akademik STTPU Jakarta Tahun Akademik 2025/2026 — jadwal perkuliahan, UTS, UAS, libur, dan wisuda.',
};

export default async function KalenderPage() {
  const { sidebarTitle, links } = await getAkademikNavigation();

  return (
    <>
      <AkademikPageHeader
        title="Kalender Akademik"
        subtitle="Jadwal resmi kegiatan akademik STTPU Jakarta Tahun Akademik 2025/2026 — dari registrasi KRS hingga wisuda."
        breadcrumbs={[
          { label: 'Akademik' },
          { label: 'Kalender Akademik' },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <AkademikSidebar pathname="/akademik/kalender" title={sidebarTitle} links={links} />
          <div className="flex-1 min-w-0">
            <KalenderContent />
          </div>
        </div>
      </div>
    </>
  );
}
