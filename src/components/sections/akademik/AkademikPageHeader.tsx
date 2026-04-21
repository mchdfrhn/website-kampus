import SectionPageHeader from '@/components/layout/SectionPageHeader';

interface AkademikPageHeaderProps {
  title: string;
  subtitle: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function AkademikPageHeader({ title, subtitle, breadcrumbs }: AkademikPageHeaderProps) {
  return <SectionPageHeader title={title} subtitle={subtitle} breadcrumbs={breadcrumbs} />;
}
