import type { Metadata } from 'next';
import TentangOverview from '@/components/sections/tentang/TentangOverview';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Tentang STTPU | Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta',
  description: 'Profil lengkap STTPU Jakarta — sejarah, visi misi, pimpinan, akreditasi, struktur organisasi, dan fasilitas kampus.',
  path: '/tentang',
});

export default function TentangPage() {
  return <TentangOverview />;
}
