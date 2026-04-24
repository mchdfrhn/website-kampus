import SectionPageHeader from '@/components/layout/SectionPageHeader';

interface TentangPageHeaderProps {
  title: string;
  subtitle: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function TentangPageHeader({ title, subtitle, breadcrumbs }: TentangPageHeaderProps) {
  return <SectionPageHeader title={title} subtitle={subtitle} breadcrumbs={breadcrumbs} />;
}
