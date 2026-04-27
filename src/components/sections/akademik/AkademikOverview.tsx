import Link from 'next/link';
import { GraduationCap, Users, CalendarDays, Award, ArrowRight } from 'lucide-react';
import SectionPageHeader from '@/components/layout/SectionPageHeader';
import { getAkademikNavigation } from '@/lib/akademik-navigation';

const defaultStats = [
  { value: '4', label: 'Program Studi' },
  { value: '35+', label: 'Dosen Pengampu' },
  { value: '3.000+', label: 'Alumni' },
  { value: '2025/2026', label: 'Tahun Akademik' },
];

const defaultHeroTitle = 'Akademik';
const defaultHeroDescription =
  'Program studi unggulan, direktori dosen, kalender akademik, dan informasi beasiswa STTPU Jakarta.';

const iconMap: Record<string, typeof GraduationCap> = {
  '/akademik/program-studi': GraduationCap,
  '/akademik/dosen': Users,
  '/akademik/kalender': CalendarDays,
  '/akademik/beasiswa': Award,
};

export default async function AkademikOverview() {
  const { sections } = await getAkademikNavigation();

  const cards = sections.map((section) => ({
    href: `/akademik/${section.slug}`,
    title: section.title,
    desc: section.subtitle || '',
  }));

  return (
    <>
      <SectionPageHeader
        title={defaultHeroTitle}
        subtitle={defaultHeroDescription}
        breadcrumbs={[{ label: 'Akademik', href: '/akademik' }]}
      />

      <section className="bg-white border-b border-gray-100 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ul className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {defaultStats.map((s) => (
              <li key={s.label} className="text-center">
                <p className="font-bold text-2xl sm:text-3xl text-brand-navy tracking-tight break-words">{s.value}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {cards.map((item) => {
            const Icon = iconMap[item.href] || GraduationCap;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex flex-col h-full rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 hover:border-brand-navy hover:shadow-premium-hover hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 bg-gray-50 group-hover:bg-brand-navy rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
                    aria-hidden="true"
                  >
                    <Icon size={20} className="text-brand-navy group-hover:text-brand-gold transition-colors" />
                  </div>
                  <h2 className="font-bold text-brand-navy text-lg mb-3 tracking-tight group-hover:text-brand-gold transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 font-medium">{item.desc}</p>
                  <div className="flex items-center gap-2 text-[10px] text-brand-navy font-bold uppercase tracking-wider mt-6 group-hover:text-brand-gold transition-all">
                    Selengkapnya{' '}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
