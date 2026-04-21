import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TentangPageHeader from '@/components/sections/tentang/TentangPageHeader';
import TentangSidebar from '@/components/sections/tentang/TentangSidebar';
import SejarahContent from '@/components/sections/tentang/SejarahContent';
import VisiMisiContent from '@/components/sections/tentang/VisiMisiContent';
import PimpinanContent from '@/components/sections/tentang/PimpinanContent';
import AkreditasiContent from '@/components/sections/tentang/AkreditasiContent';
import StrukturOrganisasiContent from '@/components/sections/tentang/StrukturOrganisasiContent';
import FasilitasContent from '@/components/sections/tentang/FasilitasContent';

type SectionConfig = {
  title: string;
  subtitle: string;
  breadcrumb: string;
  component: React.ComponentType;
};

const sections: Record<string, SectionConfig> = {
  sejarah: {
    title: 'Sejarah & Profil STTPU',
    subtitle: 'Lebih dari tiga dekade melahirkan tenaga ahli teknologi pekerjaan umum yang berkontribusi bagi pembangunan Indonesia.',
    breadcrumb: 'Sejarah & Profil',
    component: SejarahContent,
  },
  'visi-misi': {
    title: 'Visi, Misi & Nilai',
    subtitle: 'Arah strategis dan nilai-nilai yang memandu setiap langkah STTPU dalam mencetak generasi insinyur unggul.',
    breadcrumb: 'Visi, Misi & Nilai',
    component: VisiMisiContent,
  },
  pimpinan: {
    title: 'Profil Pimpinan',
    subtitle: 'Kenali jajaran pimpinan yang mengelola STTPU dengan komitmen pada keunggulan pendidikan teknologi.',
    breadcrumb: 'Profil Pimpinan',
    component: PimpinanContent,
  },
  akreditasi: {
    title: 'Akreditasi & Legalitas',
    subtitle: 'Status akreditasi resmi BAN-PT dan dokumen legalitas institusi yang dapat diverifikasi secara publik.',
    breadcrumb: 'Akreditasi & Legalitas',
    component: AkreditasiContent,
  },
  'struktur-organisasi': {
    title: 'Struktur Organisasi',
    subtitle: 'Peta kepemimpinan dan unit-unit fungsional yang mendukung operasional akademik dan administratif STTPU.',
    breadcrumb: 'Struktur Organisasi',
    component: StrukturOrganisasiContent,
  },
  fasilitas: {
    title: 'Fasilitas Kampus',
    subtitle: 'Infrastruktur dan sarana pendukung pembelajaran yang terus dikembangkan untuk pengalaman akademik terbaik.',
    breadcrumb: 'Fasilitas Kampus',
    component: FasilitasContent,
  },
};

export async function generateStaticParams() {
  return Object.keys(sections).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const section = sections[slug];
  if (!section) return {};
  return {
    title: `${section.title} | STTPU Jakarta`,
    description: section.subtitle,
  };
}

export default async function TentangSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = sections[slug];
  if (!section) notFound();

  const { title, subtitle, component: SectionContent } = section;

  return (
    <>
      <TentangPageHeader title={title} subtitle={subtitle} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <TentangSidebar />
          <div className="flex-1 min-w-0">
            <SectionContent />
          </div>
        </div>
      </div>
    </>
  );
}
