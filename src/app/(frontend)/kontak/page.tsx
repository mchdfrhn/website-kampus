export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import PageHeader from '@/components/sections/kontak/PageHeader';
import MapSection from '@/components/sections/kontak/MapSection';
import DirectorySection from '@/components/sections/kontak/DirectorySection';
import ContactFormSection from '@/components/sections/kontak/ContactFormSection';
import SocialMediaSection from '@/components/sections/kontak/SocialMediaSection';
import DirectionsSection from '@/components/sections/kontak/DirectionsSection';
import { getPayloadClient } from '@/lib/payload';


export const metadata: Metadata = {
  title: 'Kontak',
  description:
    'Hubungi STTPU Jakarta — temukan kontak unit, kirim pesan, atau kunjungi kampus kami.',
};

type ContactGlobal = {
  heroTitle?: string
  heroDescription?: string
  formTitle?: string
  directChannels?: { icon?: string; label: string; desc: string; href: string; external?: boolean }[]
  faqLinks?: { label: string; href: string }[]
  directions?: { icon?: string; emoji?: string; heading: string; steps?: { text: string }[] }[]
}

export default async function KontakPage() {
  let pageContent: ContactGlobal = {}
  let unitOptions: { label: string; value: string }[] = []

  try {
    const payload = await getPayloadClient()
    const [contactGlobal, unitResult] = await Promise.all([
      payload.findGlobal({ slug: 'kontak-page' as never }),
      payload.find({ collection: 'unit-kontak', sort: 'urutan', limit: 50 }),
    ])

    pageContent = contactGlobal as ContactGlobal
    unitOptions = unitResult.docs.map((doc) => {
      const unit = doc as { unit?: string }
      return {
        label: unit.unit || 'Unit Umum',
        value: unit.unit || 'Umum',
      }
    })
  } catch {
    // DB unavailable — use defaults in components
  }

  return (
    <>
      <PageHeader
        title={pageContent.heroTitle}
        description={pageContent.heroDescription}
      />
      <MapSection />
      <DirectorySection />
      <ContactFormSection
        formTitle={pageContent.formTitle}
        unitOptions={unitOptions}
        otherChannels={pageContent.directChannels?.map((item) => ({
          icon: item.icon || 'map',
          label: item.label,
          desc: item.desc,
          href: item.href,
          external: item.external,
        }))}
        faqLinks={pageContent.faqLinks}
      />
      <SocialMediaSection />
      <DirectionsSection
        directions={pageContent.directions?.map((item) => ({
          icon: item.icon || '',
          emoji: item.emoji,
          heading: item.heading,
          steps: (item.steps || []).map((step) => step.text),
        }))}
      />
    </>
  );
}
