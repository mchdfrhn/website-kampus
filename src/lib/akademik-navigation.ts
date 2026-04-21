import { getPayloadClient } from '@/lib/payload';

export type AkademikSectionMeta = {
  slug: string
  title: string
  subtitle?: string
  breadcrumb?: string
};

const defaultSections: AkademikSectionMeta[] = [
  {
    slug: 'program-studi',
    title: 'Program Studi',
    subtitle:
      'Empat program studi D-IV yang dirancang untuk menghasilkan sarjana terapan kompeten di sektor pekerjaan umum dan infrastruktur nasional.',
    breadcrumb: 'Program Studi',
  },
  {
    slug: 'dosen',
    title: 'Direktori Dosen',
    subtitle:
      'Tenaga pengajar STTPU Jakarta yang berpengalaman, berkualifikasi tinggi, dan aktif dalam penelitian serta pengabdian masyarakat.',
    breadcrumb: 'Dosen',
  },
  {
    slug: 'kalender',
    title: 'Kalender Akademik',
    subtitle:
      'Jadwal resmi kegiatan akademik STTPU Jakarta Tahun Akademik 2025/2026 — dari registrasi KRS hingga wisuda.',
    breadcrumb: 'Kalender Akademik',
  },
  {
    slug: 'beasiswa',
    title: 'Beasiswa',
    subtitle:
      'Berbagai program beasiswa tersedia untuk mendukung mahasiswa STTPU Jakarta dalam menyelesaikan pendidikan dengan optimal.',
    breadcrumb: 'Beasiswa',
  },
];

export async function getAkademikNavigation() {
  let sidebarTitle = 'Navigasi Akademik';
  let sections = defaultSections;

  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'akademik-page' as never });
    const data = global as {
      sections?: AkademikSectionMeta[];
      sidebarTitle?: string;
    };

    if (data.sidebarTitle) sidebarTitle = data.sidebarTitle;
    if (Array.isArray(data.sections) && data.sections.length > 0) {
      sections = data.sections.map((section) => ({
        slug: section.slug,
        title: section.title,
        subtitle: section.subtitle,
        breadcrumb: section.breadcrumb,
      }));
    }
  } catch {
    // Keep defaults when Payload is unavailable.
  }

  return {
    sidebarTitle,
    sections,
    links: sections.map((section) => ({
      label: section.breadcrumb || section.title,
      href: `/akademik/${section.slug}`,
    })),
  };
}
