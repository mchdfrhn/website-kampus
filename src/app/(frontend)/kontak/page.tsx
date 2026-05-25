import type { Metadata } from 'next';
import { unstable_cache } from 'next/cache';
import PageHeader from '@/components/sections/kontak/PageHeader';
import MapSection from '@/components/sections/kontak/MapSection';
import DirectorySection from '@/components/sections/kontak/DirectorySection';
import ContactFormSection from '@/components/sections/kontak/ContactFormSection';
import SocialMediaSection from '@/components/sections/kontak/SocialMediaSection';
import DirectionsSection from '@/components/sections/kontak/DirectionsSection';
import { getPayloadClient } from '@/lib/payload';
import { buildBreadcrumbJsonLd, buildPageMetadata, getSiteUrl } from '@/lib/seo';


export const metadata: Metadata = buildPageMetadata({
  title: 'Kontak',
  description:
    'Hubungi STTPU Jakarta — temukan kontak unit, kirim pesan, atau kunjungi kampus kami.',
  path: '/kontak',
});

type ContactGlobal = {
  heroTitle?: string
  heroDescription?: string
  formTitle?: string
  directChannels?: { icon?: string; label: string; desc: string; href: string; external?: boolean }[]
  faqLinks?: { label: string; href: string }[]
  directions?: { icon?: string; emoji?: string; heading: string; steps?: { text: string }[] }[]
}

type SiteSettingsContact = {
  namaInstitusi?: string | null
  emailUtama?: string | null
  teleponUtama?: string | null
  alamat?: string | null
}

async function resolveKontakPageData() {
  let pageContent: ContactGlobal = {}
  let unitOptions: { label: string; value: string }[] = []
  let siteSettings: SiteSettingsContact = {}

  try {
    const payload = await getPayloadClient()
    const [contactGlobal, unitResult, settingsGlobal] = await Promise.all([
      payload.findGlobal({ slug: 'kontak-page' as never }),
      payload.find({ collection: 'unit-kontak', sort: 'urutan', limit: 50 }),
      payload.findGlobal({ slug: 'site-settings' }),
    ])

    pageContent = contactGlobal as ContactGlobal
    siteSettings = settingsGlobal as SiteSettingsContact
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

  return { pageContent, unitOptions, siteSettings }
}

const getKontakPageData = unstable_cache(
  resolveKontakPageData,
  ['kontak-page-data'],
  { revalidate: 60 },
)

export default async function KontakPage() {
  const { pageContent, unitOptions, siteSettings } = await getKontakPageData()

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'Kontak', path: '/kontak' },
  ]);

  const contactPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Kontak STTPU Jakarta',
    url: `${getSiteUrl()}/kontak`,
    mainEntity: {
      '@type': 'CollegeOrUniversity',
      name: siteSettings.namaInstitusi || 'STTPU Jakarta',
      ...(siteSettings.teleponUtama ? { telephone: siteSettings.teleponUtama } : {}),
      ...(siteSettings.emailUtama ? { email: siteSettings.emailUtama } : {}),
      ...(siteSettings.alamat
        ? {
            address: {
              '@type': 'PostalAddress',
              streetAddress: siteSettings.alamat,
              addressCountry: 'ID',
            },
          }
        : {}),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
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
