import type { Metadata } from 'next';
import AkademikPageHeader from '@/components/sections/akademik/AkademikPageHeader';
import BeasiswaContent from '@/components/sections/akademik/BeasiswaContent';

export const metadata: Metadata = {
  title: 'Beasiswa | STTPU Jakarta',
  description:
    'Informasi beasiswa internal dan eksternal yang tersedia untuk mahasiswa STTPU Jakarta — KIP Kuliah, LPDP, beasiswa prestasi, dan lainnya.',
};

export default function BeasiswaPage() {
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
      <BeasiswaContent />
    </>
  );
}
