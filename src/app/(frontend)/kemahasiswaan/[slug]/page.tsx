import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import KemahasiswaanPageHeader from '@/components/sections/kemahasiswaan/KemahasiswaanPageHeader';
import KemahasiswaanSidebar from '@/components/sections/kemahasiswaan/KemahasiswaanSidebar';
import OrganisasiContent from '@/components/sections/kemahasiswaan/OrganisasiContent';
import UKMContent from '@/components/sections/kemahasiswaan/UKMContent';
import PrestasiContent from '@/components/sections/kemahasiswaan/PrestasiContent';
import LayananContent from '@/components/sections/kemahasiswaan/LayananContent';
import MahasiswaBaruContent from '@/components/sections/kemahasiswaan/MahasiswaBaruContent';
import { getPayloadClient } from '@/lib/payload';

type SectionConfig = {
  title: string;
  subtitle: string;
  breadcrumb: string;
  component: React.ComponentType;
};

const sections: Record<string, SectionConfig> = {
  organisasi: {
    title: 'Organisasi Mahasiswa',
    subtitle: 'BEM, Senat, dan himpunan profesi yang mewakili dan mengembangkan mahasiswa STTPU.',
    breadcrumb: 'Organisasi Mahasiswa',
    component: OrganisasiContent,
  },
  ukm: {
    title: 'Unit Kegiatan Mahasiswa',
    subtitle: '12 UKM aktif yang memfasilitasi minat dan bakat mahasiswa STTPU di berbagai bidang.',
    breadcrumb: 'Unit Kegiatan Mahasiswa',
    component: UKMContent,
  },
  prestasi: {
    title: 'Prestasi Mahasiswa',
    subtitle: 'Rekam jejak pencapaian membanggakan mahasiswa STTPU di berbagai kompetisi dan ajang nasional-internasional.',
    breadcrumb: 'Prestasi Mahasiswa',
    component: PrestasiContent,
  },
  layanan: {
    title: 'Layanan Mahasiswa',
    subtitle: 'Berbagai layanan pendukung yang tersedia untuk memastikan kelancaran studi dan kesejahteraan mahasiswa STTPU.',
    breadcrumb: 'Layanan Mahasiswa',
    component: LayananContent,
  },
  'mahasiswa-baru': {
    title: 'Panduan Mahasiswa Baru',
    subtitle: 'Semua yang perlu Anda ketahui dan lakukan di awal masa studi di STTPU Jakarta.',
    breadcrumb: 'Panduan Mahasiswa Baru',
    component: MahasiswaBaruContent,
  },
};

type SectionMeta = { slug: string; title: string; subtitle?: string; breadcrumb?: string }

export function generateStaticParams() {
  return Object.keys(sections).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let s = sections[slug];
  if (!s) return {};
  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'kemahasiswaan-page' as never });
    const subpages = (global as { subpages?: SectionMeta[] }).subpages || [];
    const fromPayload = subpages.find((item) => item.slug === slug);
    if (fromPayload) {
      s = {
        ...s,
        title: fromPayload.title,
        subtitle: fromPayload.subtitle || s.subtitle,
        breadcrumb: fromPayload.breadcrumb || s.breadcrumb,
      };
    }
  } catch {
    // keep defaults
  }
  return { title: `${s.title} | STTPU Jakarta`, description: s.subtitle };
}

export default async function KemahasiswaanSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let s = sections[slug];
  if (!s) notFound();

  let sidebarTitle = 'Navigasi Kemahasiswaan'
  let sidebarLinks = Object.keys(sections).map((key) => ({
    label: sections[key].breadcrumb,
    href: `/kemahasiswaan/${key}`,
  }))

  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'kemahasiswaan-page' as never });
    const data = global as { subpages?: SectionMeta[]; sidebarTitle?: string };
    const fromPayload = (data.subpages || []).find((item) => item.slug === slug);
    if (fromPayload) {
      s = {
        ...s,
        title: fromPayload.title,
        subtitle: fromPayload.subtitle || s.subtitle,
        breadcrumb: fromPayload.breadcrumb || s.breadcrumb,
      };
    }
    sidebarTitle = data.sidebarTitle || sidebarTitle
    if (data.subpages && data.subpages.length > 0) {
      sidebarLinks = data.subpages.map((item) => ({
        label: item.breadcrumb || item.title,
        href: `/kemahasiswaan/${item.slug}`,
      }))
    }
  } catch {
    // keep defaults
  }

  const { title, subtitle, breadcrumb, component: Content } = s;

  return (
    <>
      <KemahasiswaanPageHeader title={title} subtitle={subtitle} breadcrumb={breadcrumb} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <KemahasiswaanSidebar pathname={`/kemahasiswaan/${slug}`} title={sidebarTitle} links={sidebarLinks} />
          <div className="flex-1 min-w-0">
            <Content />
          </div>
        </div>
      </div>
    </>
  );
}
