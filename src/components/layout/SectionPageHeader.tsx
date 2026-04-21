import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BlueAbstractBackground from '@/components/ui/BlueAbstractBackground';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface SectionPageHeaderProps {
  title: string;
  subtitle: string;
  breadcrumbs?: BreadcrumbItem[];
}

export default function SectionPageHeader({
  title,
  subtitle,
  breadcrumbs,
}: SectionPageHeaderProps) {
  const customItems = breadcrumbs?.map((item) => ({
    label: item.label,
    href: item.href,
  }));

  return (
    <>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs customItems={customItems} />
        </div>
      </div>

      <div className="relative overflow-hidden bg-brand-navy px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <BlueAbstractBackground />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="mb-5 text-3xl font-bold leading-[1.15] tracking-tight sm:mb-6 sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <div className="mb-6 h-1 w-14 rounded-full bg-brand-gold sm:mb-8 sm:w-16" />
            <p className="text-sm font-medium leading-relaxed text-white/75 sm:text-base lg:text-lg">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
