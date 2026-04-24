import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type DetailBackButtonProps = {
  href: string;
  label: string;
  className?: string;
};

export default function DetailBackButton({ href, label, className }: DetailBackButtonProps) {
  return (
    <Link
      href={href}
      className={[
        'group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-brand-navy transition-all hover:text-brand-gold',
        className || '',
      ].join(' ')}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy/5 transition-all group-hover:bg-brand-gold group-hover:text-brand-navy">
        <ArrowLeft size={16} aria-hidden="true" />
      </div>
      {label}
    </Link>
  );
}
