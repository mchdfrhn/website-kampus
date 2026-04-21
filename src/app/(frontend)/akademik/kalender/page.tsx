import type { Metadata } from 'next';
import AkademikPageHeader from '@/components/sections/akademik/AkademikPageHeader';
import KalenderContent from '@/components/sections/akademik/KalenderContent';

export const metadata: Metadata = {
  title: 'Kalender Akademik | STTPU Jakarta',
  description:
    'Kalender akademik STTPU Jakarta Tahun Akademik 2025/2026 — jadwal perkuliahan, UTS, UAS, libur, dan wisuda.',
};

export default function KalenderPage() {
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
      <KalenderContent />
    </>
  );
}
