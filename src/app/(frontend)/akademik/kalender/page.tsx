import AkademikPageHeader from '@/components/sections/akademik/AkademikPageHeader';
import KalenderContent from '@/components/sections/akademik/KalenderContent';
import AkademikSidebar from '@/components/sections/akademik/AkademikSidebar';
import { buildPageMetadata } from '@/lib/seo';


export const metadata = buildPageMetadata({
  title: 'Kalender Akademik | STTPU Jakarta',
  description:
    'Kalender akademik STTPU Jakarta Tahun Akademik 2025/2026 — jadwal perkuliahan, UTS, UAS, libur, dan wisuda.',
  path: '/akademik/kalender',
});

export default async function KalenderPage() {
  return (
    <>
      <AkademikPageHeader
        title="Kalender Akademik"
        subtitle="Jadwal resmi kegiatan akademik STTPU Jakarta Tahun Akademik 2025/2026 — dari registrasi KRS hingga wisuda."
        breadcrumbs={[
          { label: 'Akademik', href: '/akademik' },
          { label: 'Kalender Akademik', href: '/akademik/kalender' },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_20rem] xl:grid-cols-[1fr_22rem]">
          <div className="min-w-0">
            <KalenderContent />
          </div>
          <AkademikSidebar currentPath="/akademik/kalender" />
        </div>
      </div>
    </>
  );
}
