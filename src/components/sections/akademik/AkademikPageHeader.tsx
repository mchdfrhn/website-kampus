import Link from 'next/link';

interface AkademikPageHeaderProps {
  title: string;
  subtitle: string;
  breadcrumbs: { label: string; href?: string }[];
}

export default function AkademikPageHeader({ title, subtitle, breadcrumbs }: AkademikPageHeaderProps) {
  return (
    <>
      <div className="bg-white border-b border-gray-200 px-6 py-2.5 text-sm">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-gray-500 flex flex-wrap items-center gap-0">
            <Link href="/" className="hover:text-[#1E3A5F] transition-colors">
              Beranda
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-0">
                <span className="mx-2 text-gray-400">›</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-[#1E3A5F] transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gray-700 font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>

      <div className="bg-[#1E3A5F] text-white px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-extrabold text-3xl mb-2">{title}</h1>
          <p className="text-white/85 text-sm leading-relaxed max-w-xl">{subtitle}</p>
        </div>
      </div>
    </>
  );
}
