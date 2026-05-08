import SectionPageHeader from '@/components/layout/SectionPageHeader';
import PortalContent from '@/components/sections/portal/PortalContent';
import { buildPageMetadata } from '@/lib/seo';


export const metadata = buildPageMetadata({
  title: 'Portal | STTPU Jakarta',
  description:
    'Akses terpusat ke seluruh sistem digital STTPU Jakarta — SIAKAD, e-learning, email kampus, perpustakaan digital, dan layanan administrasi lainnya.',
  path: '/portal',
});

export default function PortalPage() {
  return (
    <>
      <SectionPageHeader
        title="Portal STTPU"
        subtitle="Akses terpusat ke seluruh sistem digital STTPU Jakarta untuk mahasiswa, dosen, dan tenaga kependidikan."
        breadcrumbs={[{ label: 'Portal', href: '/portal' }]}
      />

      <PortalContent />
    </>
  );
}
