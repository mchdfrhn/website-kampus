import Link from 'next/link';
export default function TentangSidebar({
  pathname,
  title,
  links,
}: {
  pathname: string
  title: string
  links: { label: string; href: string }[]
}) {

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-premium transition-all">
        <div className="bg-brand-navy px-6 py-5">
          <p className="text-white font-black text-[10px] uppercase tracking-[0.2em]">{title}</p>
        </div>
        <nav aria-label="Navigasi Tentang">
          <ul role="list">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href} className="border-b border-gray-50 last:border-0">
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between px-6 py-4 text-xs uppercase tracking-widest transition-all duration-300 ${
                      isActive
                        ? 'bg-brand-navy/[0.02] text-brand-navy font-black border-l-4 border-brand-gold'
                        : 'text-gray-400 font-bold hover:bg-gray-50 hover:text-brand-navy border-l-4 border-transparent'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                    {isActive && <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />}
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
