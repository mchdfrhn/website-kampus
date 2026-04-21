import Link from 'next/link';

export default function AkademikSidebar({
  pathname,
  title,
  links,
}: {
  pathname: string
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <aside className="w-full flex-shrink-0 lg:w-72 lg:self-start">
      <div className="overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white shadow-premium transition-all sm:rounded-[2rem]">
        <div className="bg-brand-navy px-4 py-4 sm:px-6 sm:py-5">
          <p className="text-white font-black text-xs tracking-[0.08em]">{title}</p>
        </div>
        <nav aria-label="Navigasi Akademik">
          <ul role="list">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href} className="border-b border-gray-50 last:border-0">
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center justify-between gap-3 px-4 py-3.5 text-sm leading-snug transition-all duration-300 border-l-4 sm:px-6 sm:py-4 ${
                      active
                        ? 'bg-brand-navy/[0.02] text-brand-navy font-black border-brand-gold'
                        : 'text-gray-400 font-bold hover:bg-gray-50 hover:text-brand-navy border-transparent'
                    }`}
                  >
                    <span className="min-w-0">{link.label}</span>
                    {active && <div className="w-1.5 h-1.5 bg-brand-gold rounded-full flex-shrink-0" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
