import type { Metadata } from 'next';
import TentangOverview from '@/components/sections/tentang/TentangOverview';

export const metadata: Metadata = {
  title: 'Tentang STTPU | STTPU Jakarta',
  description:
    'Kenali Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta — sejarah, visi misi, profil pimpinan, akreditasi, dan fasilitas kampus.',
};

export default function TentangPage() {
  return <TentangOverview />;
}
