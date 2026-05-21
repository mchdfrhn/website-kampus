'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import HomeNavLink from './HomeNavLink';
import { usePathname, useRouter } from 'next/navigation';

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
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);
  const isNavigatingRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    scrollYRef.current = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      if (!isNavigatingRef.current) {
        window.scrollTo({ top: scrollYRef.current, behavior: 'auto' });
      }
    };
  }, [isOpen]);

  useEffect(() => {
    isNavigatingRef.current = false;
    setIsOpen(false);
    setOpenSubmenu(null);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const hrefs = new Set<string>(['/', '/portal']);
    navItems.forEach((item) => {
      if (item.href) hrefs.add(item.href);
      item.children?.forEach((child) => {
        if (child.href) hrefs.add(child.href);
      });
    });

    hrefs.forEach((href) => {
      if (
        href.startsWith('/') &&
        !href.startsWith('//') &&
        !href.includes('#') &&
        href !== pathname
      ) {
        router.prefetch(href);
      }
    });
  }, [isOpen, navItems, pathname, router]);

  useEffect(() => {
    if (!isOpen || !sidebarRef.current) return;

    // Move focus into sidebar on open
    const focusableSelectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const firstFocusable = sidebarRef.current.querySelector<HTMLElement>(focusableSelectors);
    firstFocusable?.focus();

    // Trap focus inside sidebar
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = Array.from(sidebarRef.current!.querySelectorAll<HTMLElement>(focusableSelectors));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
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

  const handleNavigate = () => {
    isNavigatingRef.current = true;
    setIsOpen(false);
    setOpenSubmenu(null);
  };

  const iconMotion = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.14, ease: [0.22, 1, 0.36, 1] as const };
  const backdropMotion = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.16, ease: [0.22, 1, 0.36, 1] as const };
  const panelMotion = shouldReduceMotion
    ? { duration: 0 }
    : { type: 'tween' as const, duration: 0.18, ease: [0.22, 1, 0.36, 1] as const };
  const submenuMotion = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="xl:hidden">
      <button
        onClick={toggleMenu}
        aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
        className="relative z-[100] flex items-center justify-center w-12 h-12 -mr-2 text-white hover:bg-white/10 rounded-xl transition-all"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={shouldReduceMotion ? { opacity: 0 } : { rotate: -45, opacity: 0, scale: 0.92 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { rotate: 0, opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { rotate: 45, opacity: 0, scale: 0.92 }}
              transition={iconMotion}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={shouldReduceMotion ? { opacity: 0 } : { rotate: 45, opacity: 0, scale: 0.92 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { rotate: 0, opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { rotate: -45, opacity: 0, scale: 0.92 }}
              transition={iconMotion}
            >
              <Menu size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={backdropMotion}
              className="absolute inset-0 bg-brand-navy/50 sm:bg-black/40 sm:backdrop-blur-sm"
              onClick={toggleMenu}
            />

            <motion.div
              ref={sidebarRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menu navigasi"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={panelMotion}
              className="absolute top-0 left-0 h-[100dvh] w-[min(20rem,86vw)] bg-brand-navy shadow-[16px_0_60px_rgba(0,0,0,0.36)] sm:bg-brand-navy/95 sm:backdrop-blur-md flex flex-col border-r border-white/10 overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 h-20 border-b border-white/10 bg-brand-navy/40 flex-shrink-0">
                <HomeNavLink href="/" onClick={handleNavigate} className="flex items-center gap-3">
                  {logoUrl ? (
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-lg shadow-black/20 ring-1 ring-black/5">
                      <div className="relative h-full w-full overflow-hidden rounded-lg">
                        <Image
                          src={logoUrl}
                          alt={institutionName}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-brand-gold rounded-xl flex items-center justify-center font-bold text-brand-navy text-xs">
                      STTPU
                    </div>
                  )}
                  <div className="text-white">
                    <div className="font-bold text-base leading-tight tracking-tight uppercase">STTPU</div>
                  </div>
                </HomeNavLink>
                <button onClick={toggleMenu} aria-label="Tutup menu" className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto overscroll-contain py-6 px-4 [-webkit-overflow-scrolling:touch]">
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
                              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={iconMotion}
                            />
                          )}

                          {hasChildren ? (
                            <>
                              <button
                                onClick={() => toggleSubmenu(item.label)}
                                aria-expanded={isSubOpen}
                                aria-controls={`submenu-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
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
                                    id={`submenu-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                                    initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0, y: -4 }}
                                    animate={shouldReduceMotion ? { opacity: 1 } : { height: 'auto', opacity: 1, y: 0 }}
                                    exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0, y: -4 }}
                                    transition={submenuMotion}
                                    className="overflow-hidden"
                                  >
                                    <div className="bg-black/20 rounded-2xl p-2 mt-2 ml-4 space-y-1 border border-white/5">
                                      {item.children!.map((child) => (
                                        <Link
                                          key={child.label}
                                          href={child.href}
                                          onClick={handleNavigate}
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
                              onClick={handleNavigate}
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
                  onClick={handleNavigate}
                  className="flex items-center justify-center w-full py-4 bg-brand-gold text-brand-navy font-bold text-sm uppercase tracking-widest rounded-2xl shadow-xl active:scale-95 transition-all"
                >
                  Portal
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
