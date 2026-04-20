import type { Metadata } from 'next';
import PenelitianOverview from '@/components/sections/penelitian/PenelitianOverview';

export const metadata: Metadata = {
  title: 'Penelitian & Pengabdian | STTPU Jakarta',
  description: 'Unit riset, database publikasi, dan informasi hibah penelitian STTPU Jakarta.',
};

export default function PenelitianPage() {
  return <PenelitianOverview />;
}
