import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BlueAbstractBackground from '@/components/ui/BlueAbstractBackground';

interface TentangPageHeaderProps {
  title: string;
  subtitle: string;
}

export default function TentangPageHeader({ title, subtitle }: TentangPageHeaderProps) {
  return (
    <>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />
        </div>
      </div>

      <div className="bg-brand-navy text-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16 relative overflow-hidden">
        <BlueAbstractBackground />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-black text-3xl sm:text-4xl lg:text-5xl mb-5 sm:mb-6 tracking-tight leading-[1.15] uppercase">{title}</h1>
            <div className="w-14 sm:w-16 h-1 bg-brand-gold rounded-full mb-6 sm:mb-8" />
            <p className="text-white/75 text-sm sm:text-base lg:text-lg font-medium leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
