import type { ComponentType } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import SectionPageHeader from '@/components/layout/SectionPageHeader';

type StatItem = {
  value: string;
  label: string;
};

type OverviewCard = {
  title: string;
  desc?: string;
  href: string;
  eyebrow?: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
};

type OverviewPageLayoutProps = {
  title: string;
  subtitle: string;
  breadcrumbs?: { label: string; href?: string }[];
  stats: StatItem[];
  statsLabel: string;
  intro?: string;
  cards: OverviewCard[];
  cardColumns?: 'three' | 'four';
  cardEyebrow?: string;
  ctaLabel?: string;
};

export default function OverviewPageLayout({
  title,
  subtitle,
  breadcrumbs,
  stats,
  statsLabel,
  intro,
  cards,
  cardColumns = 'three',
  cardEyebrow,
  ctaLabel = 'Buka Halaman',
}: OverviewPageLayoutProps) {
  const gridClass =
    cardColumns === 'four'
      ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'
      : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3';

  return (
    <>
      <SectionPageHeader title={title} subtitle={subtitle} breadcrumbs={breadcrumbs} />

      <section className="border-b border-gray-100 bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ul className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4" aria-label={statsLabel}>
            {stats.map((stat) => (
              <li key={stat.label} className="text-center">
                <p className="break-words text-2xl font-bold tracking-tight text-brand-navy sm:text-3xl">{stat.value}</p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {intro ? (
          <p className="mb-10 max-w-3xl text-base font-medium leading-8 text-gray-600 sm:text-lg">
            {intro}
          </p>
        ) : null}

        <ul className={`grid gap-4 sm:gap-5 ${gridClass}`} aria-label={`Navigasi ${title}`}>
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <li key={card.href}>
                <Link
                  href={card.href}
                  className="group flex h-full flex-col rounded-premium border border-gray-100 bg-white p-6 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:border-brand-navy/20 hover:shadow-premium-hover sm:rounded-premium-lg sm:p-7"
                >
                  {Icon ? (
                    <div
                      className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold/15 text-brand-navy transition-colors group-hover:bg-brand-navy group-hover:text-brand-gold"
                      aria-hidden="true"
                    >
                      <Icon size={22} className="transition-colors" />
                    </div>
                  ) : null}
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">
                    {card.eyebrow || cardEyebrow || title}
                  </p>
                  <h2 className="mt-3 text-xl font-black tracking-tight text-brand-navy">{card.title}</h2>
                  {card.desc ? (
                    <p className="mt-4 flex-1 text-sm font-medium leading-7 text-gray-500">{card.desc}</p>
                  ) : (
                    <div className="flex-1" />
                  )}
                  <span className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-brand-navy">
                    {ctaLabel}
                    <ChevronRight size={16} className="text-brand-gold transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
