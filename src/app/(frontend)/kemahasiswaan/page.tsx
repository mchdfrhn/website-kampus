export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import KemahasiswaanOverview from '@/components/sections/kemahasiswaan/KemahasiswaanOverview';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Kemahasiswaan | STTPU Jakarta',
  description: 'Kehidupan kemahasiswaan STTPU Jakarta — organisasi mahasiswa, UKM, prestasi, layanan, dan panduan mahasiswa baru.',
  path: '/kemahasiswaan',
});

export default function KemahasiswaanPage() {
  return <KemahasiswaanOverview />;
}
