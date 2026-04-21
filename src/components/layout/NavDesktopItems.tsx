"use client";

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import HomeNavLink from './HomeNavLink';

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; id?: string | null }[] | null;
  id?: string | null;
};

function matchesPath(pathname: string, href: string) {
  if (!href || href === '#') return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isItemActive(pathname: string, item: NavItem) {
  if (matchesPath(pathname, item.href)) return true;
  if (Array.isArray(item.children)) {
    return item.children.some((child) => matchesPath(pathname, child.href));
  }
  return false;
}

export default function NavDesktopItems({ navItems }: { navItems: NavItem[] }) {
  const pathname = usePathname();

  return (
    <ul className="hidden xl:flex items-center gap-1" role="list">
      {navItems.map((item) => {
        const hasChildren = Array.isArray(item.children) && item.children.length > 0;
        const active = isItemActive(pathname, item);

        return hasChildren ? (
          <li key={item.label} className="relative group">
            <button
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-semibold h-full ${
                active
                  ? 'bg-white/10 text-white shadow-lg shadow-brand-navy-dark/20'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
              aria-haspopup="true"
              aria-expanded="false"
            >
              {item.label}
              <ChevronDown
                size={14}
                className={`transition-all group-hover:rotate-180 ${
                  active
                    ? 'text-brand-gold opacity-100'
                    : 'opacity-40 group-hover:opacity-100 group-hover:text-brand-gold'
                }`}
              />
            </button>
            <div className="absolute top-full left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              <ul
                className="min-w-64 bg-brand-navy border border-white/10 shadow-[0_20px_50px_rgba(0,22,51,0.28)] rounded-2xl p-2 overflow-hidden"
                role="menu"
              >
                {item.children!.map((child) => {
                  const childActive = matchesPath(pathname, child.href);

                  return (
                    <li key={child.label} role="none">
                      <Link
                        href={child.href}
                        role="menuitem"
                        aria-current={childActive ? 'page' : undefined}
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                          childActive
                            ? 'bg-white/10 text-brand-gold'
                            : 'text-white/60 hover:text-brand-gold hover:bg-white/5'
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${childActive ? 'bg-brand-gold' : 'bg-brand-gold/30'}`} />
                        {child.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ) : (
          <li key={item.label}>
            {item.href === '/' ? (
              <HomeNavLink
                href={item.href}
                className={`flex items-center px-4 py-2 rounded-xl transition-all duration-300 text-sm font-semibold ${
                  active
                    ? 'bg-white/10 text-white shadow-lg shadow-brand-navy-dark/20'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </HomeNavLink>
            ) : (
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center px-4 py-2 rounded-xl transition-all duration-300 text-sm font-semibold ${
                  active
                    ? 'bg-white/10 text-white shadow-lg shadow-brand-navy-dark/20'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
