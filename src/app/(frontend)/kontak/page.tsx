import type { Metadata } from 'next';
import PageHeader from '@/components/sections/kontak/PageHeader';
import MapSection from '@/components/sections/kontak/MapSection';
import DirectorySection from '@/components/sections/kontak/DirectorySection';
import ContactFormSection from '@/components/sections/kontak/ContactFormSection';
import SocialMediaSection from '@/components/sections/kontak/SocialMediaSection';
import DirectionsSection from '@/components/sections/kontak/DirectionsSection';

export const metadata: Metadata = {
  title: 'Kontak',
  description:
    'Hubungi STTPU Jakarta — temukan kontak unit, kirim pesan, atau kunjungi kampus kami.',
};

export default function KontakPage() {
  return (
    <>
      <PageHeader />
      <MapSection />
      <DirectorySection />
      <ContactFormSection />
      <SocialMediaSection />
      <DirectionsSection />
    </>
  );
}
