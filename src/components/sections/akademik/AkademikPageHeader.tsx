import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BlueAbstractBackground from '@/components/ui/BlueAbstractBackground';

interface AkademikPageHeaderProps {
  title: string;
  subtitle: string;
}

export default function AkademikPageHeader({ title, subtitle }: AkademikPageHeaderProps) {
  return (
    <>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Breadcrumbs />
        </div>
      </div>

      <div className="bg-brand-navy text-white px-6 py-16 relative overflow-hidden">
        <BlueAbstractBackground />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-6 tracking-tight leading-[1.2]">{title}</h1>
            <div className="w-16 h-1 bg-brand-gold rounded-full mb-8" />
            <p className="text-white/70 text-base md:text-lg font-medium leading-relaxed">{subtitle}</p>
          </div>
        </div>
      </div>
    </>
  );
}
