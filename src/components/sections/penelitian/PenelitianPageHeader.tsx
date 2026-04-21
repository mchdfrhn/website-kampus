import SectionPageHeader from '@/components/layout/SectionPageHeader';

interface Props { title: string; subtitle: string; breadcrumb: string; }

export default function PenelitianPageHeader({ title, subtitle, breadcrumb }: Props) {
  return (
    <SectionPageHeader
      title={title}
      subtitle={subtitle}
      breadcrumbs={[
        { label: 'Penelitian', href: '/penelitian' },
        { label: breadcrumb, href: `/penelitian/${breadcrumb.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` },
      ]}
    />
  );
}
