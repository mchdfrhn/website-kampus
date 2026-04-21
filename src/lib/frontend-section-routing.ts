import type { ComponentType } from 'react';
import SejarahContent from '@/components/sections/tentang/SejarahContent';
import VisiMisiContent from '@/components/sections/tentang/VisiMisiContent';
import PimpinanContent from '@/components/sections/tentang/PimpinanContent';
import AkreditasiContent from '@/components/sections/tentang/AkreditasiContent';
import StrukturOrganisasiContent from '@/components/sections/tentang/StrukturOrganisasiContent';
import FasilitasContent from '@/components/sections/tentang/FasilitasContent';
import OrganisasiContent from '@/components/sections/kemahasiswaan/OrganisasiContent';
import UKMContent from '@/components/sections/kemahasiswaan/UKMContent';
import PrestasiContent from '@/components/sections/kemahasiswaan/PrestasiContent';
import LayananContent from '@/components/sections/kemahasiswaan/LayananContent';
import MahasiswaBaruContent from '@/components/sections/kemahasiswaan/MahasiswaBaruContent';
import UnitPenelitianContent from '@/components/sections/penelitian/UnitPenelitianContent';
import PublikasiContent from '@/components/sections/penelitian/PublikasiContent';
import HibahContent from '@/components/sections/penelitian/HibahContent';

export type PayloadSectionMeta = {
  slug: string
  title: string
  subtitle?: string
  breadcrumb?: string
};

export type ResolvedSectionConfig = {
  key: string
  slug: string
  title: string
  subtitle: string
  breadcrumb: string
  component: ComponentType
};

type SectionDefinition = {
  key: string
  defaultSlug: string
  title: string
  subtitle: string
  breadcrumb: string
  component: ComponentType
  aliases?: string[]
};

function normalizeText(value?: string | null) {
  return (value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function resolvePayloadSections(
  definitions: SectionDefinition[],
  payloadSections?: PayloadSectionMeta[],
): ResolvedSectionConfig[] {
  if (!Array.isArray(payloadSections) || payloadSections.length === 0) {
    return definitions.map((definition) => ({
      key: definition.key,
      slug: definition.defaultSlug,
      title: definition.title,
      subtitle: definition.subtitle,
      breadcrumb: definition.breadcrumb,
      component: definition.component,
    }));
  }

  const usedKeys = new Set<string>();

  const resolved = payloadSections
    .map((section, index) => {
      const directMatch = definitions.find((definition) => {
        if (usedKeys.has(definition.key)) return false;

        const candidates = [
          definition.key,
          definition.defaultSlug,
          ...(definition.aliases || []),
        ].map(normalizeText);

        const sectionCandidates = [
          section.slug,
          section.title,
          section.breadcrumb,
        ].map(normalizeText);

        return sectionCandidates.some((candidate) => candidate && candidates.includes(candidate));
      });

      const fallbackMatch =
        directMatch ||
        definitions.find((definition, definitionIndex) => {
          if (usedKeys.has(definition.key)) return false;
          return definitionIndex === index;
        }) ||
        definitions.find((definition) => !usedKeys.has(definition.key));

      if (!fallbackMatch) return null;

      usedKeys.add(fallbackMatch.key);

      return {
        key: fallbackMatch.key,
        slug: section.slug,
        title: section.title || fallbackMatch.title,
        subtitle: section.subtitle || fallbackMatch.subtitle,
        breadcrumb: section.breadcrumb || fallbackMatch.breadcrumb,
        component: fallbackMatch.component,
      };
    })
    .filter((section): section is ResolvedSectionConfig => section !== null);

  return resolved.length > 0
    ? resolved
    : definitions.map((definition) => ({
        key: definition.key,
        slug: definition.defaultSlug,
        title: definition.title,
        subtitle: definition.subtitle,
        breadcrumb: definition.breadcrumb,
        component: definition.component,
      }));
}

const tentangDefinitions: SectionDefinition[] = [
  {
    key: 'sejarah',
    defaultSlug: 'sejarah',
    title: 'Sejarah & Profil STTPU',
    subtitle: 'Lebih dari tiga dekade melahirkan tenaga ahli teknologi pekerjaan umum yang berkontribusi bagi pembangunan Indonesia.',
    breadcrumb: 'Sejarah & Profil',
    component: SejarahContent,
  },
  {
    key: 'visi-misi',
    defaultSlug: 'visi-misi',
    title: 'Visi, Misi & Nilai',
    subtitle: 'Arah strategis dan nilai-nilai yang memandu setiap langkah STTPU dalam mencetak generasi insinyur unggul.',
    breadcrumb: 'Visi, Misi & Nilai',
    component: VisiMisiContent,
  },
  {
    key: 'pimpinan',
    defaultSlug: 'pimpinan',
    title: 'Profil Pimpinan',
    subtitle: 'Kenali jajaran pimpinan yang mengelola STTPU dengan komitmen pada keunggulan pendidikan teknologi.',
    breadcrumb: 'Profil Pimpinan',
    component: PimpinanContent,
  },
  {
    key: 'akreditasi',
    defaultSlug: 'akreditasi',
    title: 'Akreditasi & Legalitas',
    subtitle: 'Status akreditasi resmi BAN-PT dan dokumen legalitas institusi yang dapat diverifikasi secara publik.',
    breadcrumb: 'Akreditasi & Legalitas',
    component: AkreditasiContent,
  },
  {
    key: 'struktur-organisasi',
    defaultSlug: 'struktur-organisasi',
    title: 'Struktur Organisasi',
    subtitle: 'Peta kepemimpinan dan unit-unit fungsional yang mendukung operasional akademik dan administratif STTPU.',
    breadcrumb: 'Struktur Organisasi',
    component: StrukturOrganisasiContent,
  },
  {
    key: 'fasilitas',
    defaultSlug: 'fasilitas',
    title: 'Fasilitas Kampus',
    subtitle: 'Infrastruktur dan sarana pendukung pembelajaran yang terus dikembangkan untuk pengalaman akademik terbaik.',
    breadcrumb: 'Fasilitas Kampus',
    component: FasilitasContent,
  },
];

const kemahasiswaanDefinitions: SectionDefinition[] = [
  {
    key: 'organisasi',
    defaultSlug: 'organisasi',
    title: 'Organisasi Mahasiswa',
    subtitle: 'BEM, Senat, dan himpunan profesi yang mewakili dan mengembangkan mahasiswa STTPU.',
    breadcrumb: 'Organisasi Mahasiswa',
    component: OrganisasiContent,
  },
  {
    key: 'ukm',
    defaultSlug: 'ukm',
    title: 'Unit Kegiatan Mahasiswa',
    subtitle: '12 UKM aktif yang memfasilitasi minat dan bakat mahasiswa STTPU di berbagai bidang.',
    breadcrumb: 'Unit Kegiatan Mahasiswa',
    component: UKMContent,
  },
  {
    key: 'prestasi',
    defaultSlug: 'prestasi',
    title: 'Prestasi Mahasiswa',
    subtitle: 'Rekam jejak pencapaian membanggakan mahasiswa STTPU di berbagai kompetisi dan ajang nasional-internasional.',
    breadcrumb: 'Prestasi Mahasiswa',
    component: PrestasiContent,
  },
  {
    key: 'layanan',
    defaultSlug: 'layanan',
    title: 'Layanan Mahasiswa',
    subtitle: 'Berbagai layanan pendukung yang tersedia untuk memastikan kelancaran studi dan kesejahteraan mahasiswa STTPU.',
    breadcrumb: 'Layanan Mahasiswa',
    component: LayananContent,
  },
  {
    key: 'mahasiswa-baru',
    defaultSlug: 'mahasiswa-baru',
    title: 'Panduan Mahasiswa Baru',
    subtitle: 'Semua yang perlu Anda ketahui dan lakukan di awal masa studi di STTPU Jakarta.',
    breadcrumb: 'Panduan Mahasiswa Baru',
    component: MahasiswaBaruContent,
  },
];

const penelitianDefinitions: SectionDefinition[] = [
  {
    key: 'unit',
    defaultSlug: 'unit',
    title: 'Unit Penelitian & Laboratorium',
    subtitle: '5 unit riset dan laboratorium aktif yang mendukung kegiatan penelitian terapan sivitas akademika STTPU.',
    breadcrumb: 'Unit Penelitian & Lab',
    component: UnitPenelitianContent,
  },
  {
    key: 'publikasi',
    defaultSlug: 'publikasi',
    title: 'Database Publikasi',
    subtitle: 'Kumpulan karya ilmiah dosen dan mahasiswa STTPU — jurnal, prosiding, dan buku.',
    breadcrumb: 'Database Publikasi',
    component: PublikasiContent,
  },
  {
    key: 'hibah',
    defaultSlug: 'hibah',
    title: 'Hibah & Pendanaan Penelitian',
    subtitle: 'Skema hibah dari Kemendikti, Kementerian PUPR, mitra industri, dan pendanaan internal LP3M STTPU.',
    breadcrumb: 'Hibah & Pendanaan',
    component: HibahContent,
  },
];

export function resolveTentangSections(payloadSections?: PayloadSectionMeta[]) {
  return resolvePayloadSections(tentangDefinitions, payloadSections);
}

export function resolveKemahasiswaanSections(payloadSections?: PayloadSectionMeta[]) {
  return resolvePayloadSections(kemahasiswaanDefinitions, payloadSections);
}

export function resolvePenelitianSections(payloadSections?: PayloadSectionMeta[]) {
  return resolvePayloadSections(penelitianDefinitions, payloadSections);
}
