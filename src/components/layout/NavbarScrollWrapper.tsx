'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function NavbarScrollWrapper({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isTransparent = isHome && !scrolled;

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        isTransparent
          ? 'border-transparent'
          : 'bg-brand-navy/95 backdrop-blur-md border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]'
      }`}
    >
      {isTransparent && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-linear-to-b from-brand-navy/75 via-brand-navy/25 to-transparent"
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
