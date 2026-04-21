import SectionPageHeader from '@/components/layout/SectionPageHeader';

interface TentangPageHeaderProps {
  title: string;
  subtitle: string;
}

export default function TentangPageHeader({ title, subtitle }: TentangPageHeaderProps) {
  return <SectionPageHeader title={title} subtitle={subtitle} />;
}
