export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import AkademikOverview from '@/components/sections/akademik/AkademikOverview';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Akademik | STTPU Jakarta',
  description: 'Program studi, direktori dosen, kalender akademik, dan beasiswa di STTPU Jakarta.',
  path: '/akademik',
});

export default function AkademikPage() {
  return <AkademikOverview />;
}
