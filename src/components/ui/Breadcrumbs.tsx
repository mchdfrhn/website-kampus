'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

type BreadcrumbProps = {
  customItems?: { label: string; href: string }[];
  className?: string;
};

export default function Breadcrumbs({ customItems, className }: BreadcrumbProps) {
  const pathname = usePathname();
  
  // If custom items are provided, use them. Otherwise, generate from pathname.
  const items = customItems || pathname
    .split('/')
    .filter((path) => path !== '')
    .map((path, index, array) => {
      const href = `/${array.slice(0, index + 1).join('/')}`;
      const label = path
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return { label, href };
    });

  return (
    <nav aria-label="Breadcrumb" className={cn("py-4", className)}>
      <ol className="flex items-center flex-wrap gap-2 text-[11px] font-semibold">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-brand-navy/40 hover:text-brand-gold transition-colors"
          >
            <Home size={12} />
            <span>Beranda</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              <ChevronRight size={10} className="text-brand-navy/20" />
              {isLast ? (
                <span className="text-brand-navy/60" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-brand-navy/40 hover:text-brand-gold transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
