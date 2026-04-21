'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import HomeNavLink from './HomeNavLink';
import { usePathname } from 'next/navigation';

type MobileMenuProps = {
  navItems: { label: string; href: string; children?: { label: string; href: string; id?: string | null }[] | null; id?: string | null }[];
  logoUrl?: string | null;
  institutionName?: string;
};

export default function MobileMenu({ navItems, logoUrl, institutionName = 'Sekolah Tinggi Teknologi PU' }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  const matchesPath = (href: string) => {
    if (!href || href === '#') return false;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isItemActive = (item: { href: string; children?: { href: string }[] | null }) => {
    if (matchesPath(item.href)) return true;
    return Array.isArray(item.children) ? item.children.some((child) => matchesPath(child.href)) : false;
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setOpenSubmenu(null);
  };

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  };

  return (
    <div className="xl:hidden">
      <button
        onClick={toggleMenu}
        aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
        aria-expanded={isOpen}
        className="flex items-center justify-center w-10 h-10 rounded text-white hover:bg-white/10 transition-colors"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-[min(20rem,calc(100vw-0.75rem))] max-w-[calc(100vw-0.75rem)] bg-brand-navy shadow-[0_24px_60px_rgba(0,22,51,0.35)] flex flex-col transition-transform duration-500 ease-in-out border-r border-white/10 rounded-r-3xl',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-5 sm:py-6 border-b border-white/10 bg-brand-navy rounded-tr-3xl">
          <HomeNavLink href="/" onClick={toggleMenu} className="flex items-center gap-3 min-w-0 pr-3">
            {logoUrl ? (
              <div className="relative w-10 h-10 flex-shrink-0 overflow-hidden rounded-xl shadow-lg shadow-black/20">
                <Image
                  src={logoUrl}
                  alt={institutionName}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-brand-gold rounded-xl flex items-center justify-center font-bold text-brand-navy text-xs leading-none shadow-lg shadow-brand-gold/20">
                STTPU
              </div>
            )}
            <div className="text-white min-w-0">
              <div className="font-bold text-sm leading-tight tracking-tight">STTPU</div>
              <div className="text-white/60 text-[10px] leading-tight font-medium break-words">{institutionName}</div>
            </div>
          </HomeNavLink>
          <button
            onClick={toggleMenu}
            aria-label="Tutup menu"
            className="w-10 h-10 flex items-center justify-center rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-5 px-2.5 sm:px-3" aria-label="Menu mobile">
          {navItems.map((item) => {
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            const active = isItemActive(item);

            return (
              <div key={item.label} className="mb-2">
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      aria-expanded={openSubmenu === item.label}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 text-sm font-bold tracking-tight",
                        openSubmenu === item.label || active
                          ? "bg-white/10 text-brand-gold shadow-lg"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <span>{item.label}</span>
                      <div className={cn(
                        "transition-transform duration-300",
                        openSubmenu === item.label ? "rotate-180" : ""
                      )}>
                        <ChevronDown size={18} className={openSubmenu === item.label || active ? "text-brand-gold" : "text-white/30"} />
                      </div>
                    </button>
                    <div className={cn(
                      "overflow-hidden transition-all duration-300",
                      openSubmenu === item.label ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
                    )}>
                      <div className="bg-white/[0.05] border border-white/8 rounded-2xl p-2 ml-2 space-y-1">
                        {item.children!.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={toggleMenu}
                            aria-current={matchesPath(child.href) ? 'page' : undefined}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-xs font-medium ${
                              matchesPath(child.href)
                                ? 'bg-white/10 text-brand-gold'
                                : 'text-white/70 hover:text-brand-gold hover:bg-white/5'
                            }`}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${matchesPath(child.href) ? 'bg-brand-gold' : 'bg-brand-gold/40'}`} />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  item.href === '/' ? (
                    <HomeNavLink
                      href={item.href}
                      onClick={toggleMenu}
                      className={`flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 text-sm font-bold tracking-tight ${
                        active
                          ? 'bg-white/10 text-brand-gold shadow-lg'
                          : 'text-white/80 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </HomeNavLink>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={toggleMenu}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 text-sm font-bold tracking-tight ${
                        active
                          ? 'bg-white/10 text-brand-gold shadow-lg'
                          : 'text-white/80 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 sm:p-6 border-t border-white/10 bg-brand-navy rounded-br-3xl">
          <Link
            href="/portal"
            onClick={toggleMenu}
            className="group relative flex items-center justify-center w-full py-4 bg-brand-gold text-brand-navy font-bold text-sm rounded-xl shadow-xl shadow-brand-gold/10 hover:shadow-brand-gold/30 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Portal</span>
            <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          </Link>
        </div>
      </div>
    </div>
  );
}
