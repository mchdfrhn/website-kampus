import type { Metadata } from 'next';
import KemahasiswaanOverview from '@/components/sections/kemahasiswaan/KemahasiswaanOverview';

export const metadata: Metadata = {
  title: 'Kemahasiswaan | STTPU Jakarta',
  description: 'Kehidupan kampus STTPU Jakarta — organisasi mahasiswa, UKM, prestasi, layanan, dan panduan mahasiswa baru.',
};

export default function KemahasiswaanPage() {
  return <KemahasiswaanOverview />;
}
