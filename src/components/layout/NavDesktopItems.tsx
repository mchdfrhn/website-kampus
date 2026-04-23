"use client";

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <ul 
      className="hidden xl:flex items-center gap-1" 
      role="list"
      onMouseLeave={() => setHoveredItem(null)}
    >
      {navItems.map((item) => {
        const hasChildren = Array.isArray(item.children) && item.children.length > 0;
        const active = isItemActive(pathname, item);
        const isHovered = hoveredItem === item.label;

        return (
          <li 
            key={item.label} 
            className="relative"
            onMouseEnter={() => setHoveredItem(item.label)}
          >
            {hasChildren ? (
              <div className="group">
                <button
                  className={`relative flex min-w-[5.5rem] items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl transition-colors duration-300 text-[13px] font-bold h-11 ${
                    active ? 'text-white' : 'text-white/70 group-hover:text-white'
                  }`}
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="relative z-10">{item.label}</span>
                  <ChevronDown
                    size={14}
                    className={`relative z-10 transition-transform duration-500 group-hover:rotate-180 ${
                      active ? 'text-brand-gold' : 'text-white/30 group-hover:text-brand-gold'
                    }`}
                  />
                  
                  {/* Shared Indicator for Hover/Active Pill */}
                  {(isHovered || active) && (
                    <motion.div
                      layoutId="nav-pill"
                      className={`absolute inset-0 rounded-xl z-0 ${
                        active ? 'bg-white/10 shadow-lg' : 'bg-white/5'
                      }`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  {/* Bottom Active Line */}
                  {active && (
                    <motion.div
                      layoutId="nav-line"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-gold rounded-full z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
                
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                  <ul
                    className="min-w-64 bg-brand-navy/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl p-2 overflow-hidden"
                    role="menu"
                  >
                    {item.children!.map((child) => {
                      const childActive = matchesPath(pathname, child.href);

                      return (
                        <li key={child.label} role="none">
                          <Link
                            href={child.href}
                            role="menuitem"
                            className={`flex items-center gap-3 px-4 py-3 text-[13px] font-bold rounded-xl transition-all duration-300 ${
                              childActive
                                ? 'bg-brand-gold text-brand-navy shadow-lg shadow-brand-gold/20'
                                : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${childActive ? 'bg-brand-navy' : 'bg-brand-gold'}`} />
                            {child.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ) : (
              <>
                {item.href === '/' ? (
                  <HomeNavLink
                    href={item.href}
                    className={`relative flex min-w-[5.5rem] items-center justify-center px-5 py-2.5 rounded-xl transition-colors duration-300 text-[13px] font-bold h-11 ${
                      active ? 'text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {(isHovered || active) && (
                      <motion.div
                        layoutId="nav-pill"
                        className={`absolute inset-0 rounded-xl z-0 ${
                          active ? 'bg-white/10 shadow-lg' : 'bg-white/5'
                        }`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    {active && (
                      <motion.div
                        layoutId="nav-line"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-gold rounded-full z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    <span className="relative z-10">{item.label}</span>
                  </HomeNavLink>
                ) : (
                  <Link
                    href={item.href}
                    className={`relative flex min-w-[5.5rem] items-center justify-center px-5 py-2.5 rounded-xl transition-colors duration-300 text-[13px] font-bold h-11 ${
                      active ? 'text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {(isHovered || active) && (
                      <motion.div
                        layoutId="nav-pill"
                        className={`absolute inset-0 rounded-xl z-0 ${
                          active ? 'bg-white/10 shadow-lg' : 'bg-white/5'
                        }`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    {active && (
                      <motion.div
                        layoutId="nav-line"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-gold rounded-full z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    <span className="relative z-10">{item.label}</span>
                  </Link>
                )}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}
