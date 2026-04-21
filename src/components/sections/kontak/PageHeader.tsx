import SectionPageHeader from '@/components/layout/SectionPageHeader';

export default function PageHeader({
  title = 'Hubungi Kami',
  description = 'Kami siap membantu Anda. Silakan hubungi unit terkait atau kunjungi kampus kami untuk informasi lebih lanjut.',
}: {
  title?: string
  description?: string
}) {
  return <SectionPageHeader title={title} subtitle={description} />;
}
