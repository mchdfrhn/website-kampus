import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BlueAbstractBackground from '@/components/ui/BlueAbstractBackground';

interface Props { title: string; subtitle: string; breadcrumb: string; }

export default function PenelitianPageHeader({ title, subtitle, breadcrumb }: Props) {
  return (
    <>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Breadcrumbs
            customItems={[
              { label: 'Penelitian', href: '/penelitian' },
              { label: breadcrumb, href: `/penelitian/${breadcrumb.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` },
            ]}
          />
        </div>
      </div>
      <div className="bg-brand-navy text-white px-6 py-16 lg:py-20 relative overflow-hidden">
        <BlueAbstractBackground />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-black text-4xl lg:text-5xl mb-6 tracking-tight leading-tight uppercase">{title}</h1>
            <div className="w-16 h-1 bg-brand-gold rounded-full mb-8" />
            <p className="text-white/70 text-base lg:text-lg font-medium leading-relaxed">{subtitle}</p>
          </div>
        </div>
      </div>
    </>
  );
}
