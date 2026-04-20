import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PenelitianPageHeader from '@/components/sections/penelitian/PenelitianPageHeader';
import PenelitianSidebar from '@/components/sections/penelitian/PenelitianSidebar';
import UnitPenelitianContent from '@/components/sections/penelitian/UnitPenelitianContent';
import PublikasiContent from '@/components/sections/penelitian/PublikasiContent';
import HibahContent from '@/components/sections/penelitian/HibahContent';

type SectionConfig = {
  title: string;
  subtitle: string;
  breadcrumb: string;
  component: React.ComponentType;
};

const sections: Record<string, SectionConfig> = {
  unit: {
    title: 'Unit Penelitian & Laboratorium',
    subtitle: '5 unit riset dan laboratorium aktif yang mendukung kegiatan penelitian terapan sivitas akademika STTPU.',
    breadcrumb: 'Unit Penelitian & Lab',
    component: UnitPenelitianContent,
  },
  publikasi: {
    title: 'Database Publikasi',
    subtitle: 'Kumpulan karya ilmiah dosen dan mahasiswa STTPU — jurnal, prosiding, dan buku.',
    breadcrumb: 'Database Publikasi',
    component: PublikasiContent,
  },
  hibah: {
    title: 'Hibah & Pendanaan Penelitian',
    subtitle: 'Skema hibah dari Kemendikti, Kementerian PUPR, mitra industri, dan pendanaan internal LP3M STTPU.',
    breadcrumb: 'Hibah & Pendanaan',
    component: HibahContent,
  },
};

export function generateStaticParams() {
  return Object.keys(sections).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = sections[slug];
  if (!s) return {};
  return { title: `${s.title} | STTPU Jakarta`, description: s.subtitle };
}

export default async function PenelitianSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = sections[slug];
  if (!s) notFound();

  const { title, subtitle, breadcrumb, component: Content } = s;

  return (
    <>
      <PenelitianPageHeader title={title} subtitle={subtitle} breadcrumb={breadcrumb} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <PenelitianSidebar />
          <div className="flex-1 min-w-0">
            <Content />
          </div>
        </div>
      </div>
    </>
  );
}
