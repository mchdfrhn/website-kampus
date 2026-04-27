export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import PenelitianOverview from '@/components/sections/penelitian/PenelitianOverview';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Penelitian & Pengabdian | STTPU Jakarta',
  description: 'Riset terapan, unit penelitian, database publikasi, dan hibah pendanaan di STTPU Jakarta.',
  path: '/penelitian',
});

export default function PenelitianPage() {
  return <PenelitianOverview />;
}
