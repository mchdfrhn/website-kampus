import SectionPageHeader from '@/components/layout/SectionPageHeader';

interface Props {
  title: string;
  subtitle: string;
  breadcrumb: string;
}

export default function KemahasiswaanPageHeader({ title, subtitle, breadcrumb }: Props) {
  return (
    <SectionPageHeader
      title={title}
      subtitle={subtitle}
      breadcrumbs={[
        { label: 'Kemahasiswaan', href: '/kemahasiswaan' },
        { label: breadcrumb, href: `/kemahasiswaan/${breadcrumb.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` },
      ]}
    />
  );
}
