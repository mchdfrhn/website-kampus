'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import HomeNavLink from './HomeNavLink';
import { usePathname } from 'next/navigation';

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; id?: string | null }[] | null;
  id?: string | null;
};

type MobileMenuProps = {
  navItems: NavItem[];
  logoUrl?: string | null;
  institutionName?: string;
};

export default function MobileMenu({ navItems = [], logoUrl, institutionName = 'STTPU Jakarta' }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const matchesPath = (href: string) => {
    if (!href || href === '#') return false;
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isItemActive = (item: NavItem) => {
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
        className="relative z-[100] flex items-center justify-center w-12 h-12 -mr-2 text-white hover:bg-white/10 rounded-xl transition-all"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Menu size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110]">
            {/* Backdrop dengan Blur yang lebih kuat */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
              onClick={toggleMenu}
            />

            {/* Sidebar dengan Transparansi 95% sesuai Desktop */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 h-[100dvh] w-[300px] bg-brand-navy/95 backdrop-blur-md shadow-[20px_0_100px_rgba(0,0,0,0.5)] flex flex-col border-r border-white/10 overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 h-20 border-b border-white/10 bg-brand-navy/40 flex-shrink-0">
                <HomeNavLink href="/" onClick={toggleMenu} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-gold rounded-xl flex items-center justify-center font-bold text-brand-navy text-xs">
                    STTPU
                  </div>
                  <div className="text-white">
                    <div className="font-bold text-base leading-tight tracking-tight uppercase">STTPU</div>
                    <div className="text-brand-gold text-[10px] font-bold uppercase tracking-widest">Navigation</div>
                  </div>
                </HomeNavLink>
                <button onClick={toggleMenu} className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-6 px-4">
                <div className="space-y-2">
                  {navItems && navItems.length > 0 ? (
                    navItems.map((item) => {
                      const hasChildren = Array.isArray(item.children) && item.children.length > 0;
                      const active = isItemActive(item);
                      const isSubOpen = openSubmenu === item.label;

                      return (
                        <div key={item.label} className="relative">
                          {/* Indikator Emas untuk Menu Aktif */}
                          {active && (
                            <motion.div
                              layoutId="active-nav-mobile"
                              className="absolute left-0 top-2 bottom-2 w-1.5 bg-brand-gold rounded-full z-10"
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                            />
                          )}

                          {hasChildren ? (
                            <>
                              <button
                                onClick={() => toggleSubmenu(item.label)}
                                className={cn(
                                  "w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 text-[14px] font-bold",
                                  isSubOpen || active
                                    ? "bg-white/10 text-brand-gold"
                                    : "text-white hover:bg-white/5"
                                )}
                              >
                                <span className={cn(active && "pl-2 transition-all duration-300")}>{item.label}</span>
                                <ChevronDown 
                                  size={16} 
                                  className={cn(
                                    "transition-transform duration-500",
                                    isSubOpen ? "rotate-180 text-brand-gold" : "text-white/20"
                                  )} 
                                />
                              </button>
                              <AnimatePresence>
                                {isSubOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="bg-black/20 rounded-2xl p-2 mt-2 ml-4 space-y-1 border border-white/5">
                                      {item.children!.map((child) => (
                                        <Link
                                          key={child.label}
                                          href={child.href}
                                          onClick={toggleMenu}
                                          className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-[13px] font-bold",
                                            matchesPath(child.href)
                                              ? 'bg-brand-gold text-brand-navy'
                                              : 'text-white/60 hover:text-white'
                                          )}
                                        >
                                          <div className={cn(
                                            "w-1.5 h-1.5 rounded-full",
                                            matchesPath(child.href) ? 'bg-brand-navy' : 'bg-brand-gold'
                                          )} />
                                          {child.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={toggleMenu}
                              className={cn(
                                "flex items-center px-4 py-4 rounded-2xl transition-all duration-300 text-[14px] font-bold",
                                active
                                  ? "bg-white/10 text-brand-gold"
                                  : "text-white hover:bg-white/5"
                              )}
                            >
                              <span className={cn(active && "pl-2 transition-all duration-300")}>{item.label}</span>
                            </Link>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="px-4 py-20 text-center space-y-4">
                      <div className="inline-block w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
                      <div className="text-white/40 text-xs font-bold uppercase tracking-widest">
                        Memuat Menu...
                      </div>
                    </div>
                  )}
                </div>
              </nav>

              <div className="p-6 border-t border-white/10 bg-brand-navy/40 mt-auto">
                <Link
                  href="/portal"
                  onClick={toggleMenu}
                  className="flex items-center justify-center w-full py-4 bg-brand-gold text-brand-navy font-bold text-sm uppercase tracking-widest rounded-2xl shadow-xl active:scale-95 transition-all"
                >
                  Portal Mahasiswa
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
