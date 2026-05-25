import { GraduationCap, Users, CalendarDays, Award } from 'lucide-react';
import OverviewPageLayout from '@/components/layout/OverviewPageLayout';
import { getAkademikNavigation } from '@/lib/akademik-navigation';
import { getPayloadClient } from '@/lib/payload';

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

type StatItem = { value: string; label: string };

export default async function AkademikOverview() {
  const { sections } = await getAkademikNavigation();
  let stats = defaultStats;

  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'akademik-page' as never });
    const data = global as { stats?: StatItem[] };

    if (Array.isArray(data.stats) && data.stats.length > 0) {
      stats = data.stats;
    }
  } catch {
    // Payload unavailable — use defaults.
  }

  const cards = sections.map((section) => ({
    href: `/akademik/${section.slug}`,
    title: section.title,
    desc: section.subtitle || '',
  }));

  return (
    <OverviewPageLayout
      title={defaultHeroTitle}
      subtitle={defaultHeroDescription}
      breadcrumbs={[{ label: 'Akademik', href: '/akademik' }]}
      stats={stats}
      statsLabel="Statistik Akademik"
      cards={cards.map((item) => ({
        ...item,
        eyebrow: 'Akademik',
        icon: iconMap[item.href] || GraduationCap,
      }))}
      cardColumns="four"
    />
  );
}
