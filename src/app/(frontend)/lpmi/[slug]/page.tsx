import type { Metadata } from 'next';
import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import {
  Award,
  BookOpenCheck,
  ChevronRight,
  ClipboardCheck,
  Download,
  FileCheck2,
  FileText,
  GraduationCap,
  Handshake,
  Microscope,
  ShieldCheck,
} from 'lucide-react';
import SectionPageHeader from '@/components/layout/SectionPageHeader';
import { getPayloadClient } from '@/lib/payload';
import { buildBreadcrumbJsonLd, buildPageMetadata } from '@/lib/seo';

type LpmiSection = {
  slug: string;
  title: string;
  subtitle: string;
  contentTitle?: string;
  contentSubtitle?: string;
  breadcrumb?: string;
  intro?: string;
  highlights?: { title: string; description: string }[];
  standards?: { text: string }[];
  documents?: { text: string }[];
};

type LpmiDocument = {
  id?: string | number;
  judul?: string | null;
  deskripsi?: string | null;
  file?: {
    url?: string | null;
    filename?: string | null;
    filesize?: number | null;
    mimeType?: string | null;
  } | string | number | null;
};

const defaultLpmiSections: LpmiSection[] = [
  {
    slug: 'kebijakan',
    title: 'Kebijakan LPMI',
    subtitle:
      'Arah penjaminan mutu internal STTPU untuk memastikan pendidikan, penelitian, dan pengabdian berjalan terukur serta berkelanjutan.',
    contentTitle: 'Arah Kerja Mutu',
    contentSubtitle:
      'Ikhtisar prinsip, ruang lingkup, dan dokumen pendukung yang dipakai unit kerja dalam menjalankan budaya mutu secara konsisten.',
    breadcrumb: 'Kebijakan',
    intro:
      'Kebijakan LPMI menjadi rujukan institusi dalam membangun budaya mutu. Dokumen ini menempatkan siklus penetapan, pelaksanaan, evaluasi, pengendalian, dan peningkatan sebagai cara kerja bersama di tingkat institusi, program studi, unit, dosen, tenaga kependidikan, dan mahasiswa.',
    highlights: [
      {
        title: 'Budaya mutu institusi',
        description:
          'Setiap kegiatan akademik dan layanan pendukung diarahkan agar memiliki standar, bukti pelaksanaan, evaluasi, serta tindak lanjut yang terdokumentasi.',
      },
      {
        title: 'Kepatuhan standar nasional',
        description:
          'Kebijakan mutu diselaraskan dengan SN Dikti, kebutuhan akreditasi, dan arah pengembangan STTPU sebagai perguruan tinggi teknologi pekerjaan umum.',
      },
      {
        title: 'Peningkatan berkelanjutan',
        description:
          'Hasil audit, monitoring, dan evaluasi digunakan sebagai dasar perbaikan program, layanan, kurikulum, riset, dan kegiatan PKM.',
      },
    ],
    standards: [
      { text: 'Komitmen pimpinan terhadap sistem penjaminan mutu internal.' },
      { text: 'Keterlibatan seluruh unit dalam siklus PPEPP.' },
      { text: 'Pengelolaan dokumen mutu yang tertelusur dan mudah diaudit.' },
      { text: 'Penggunaan hasil evaluasi untuk rencana tindak lanjut.' },
    ],
    documents: [
      { text: 'Kebijakan SPMI STTPU' },
      { text: 'Manual SPMI' },
      { text: 'Peta Standar Mutu' },
      { text: 'Rencana tindak lanjut hasil evaluasi mutu' },
    ],
  },
  {
    slug: 'pedoman',
    title: 'Pedoman LPMI',
    subtitle:
      'Panduan kerja penjaminan mutu untuk pelaksanaan monitoring, evaluasi, audit mutu internal, dan pengendalian dokumen.',
    contentTitle: 'Panduan Pelaksanaan Mutu',
    contentSubtitle:
      'Rangkuman alur monev, audit, pengendalian dokumen, dan tindak lanjut agar proses mutu mudah dijalankan oleh setiap unit.',
    breadcrumb: 'Pedoman',
    intro:
      'Pedoman LPMI membantu setiap unit menjalankan proses mutu secara konsisten. Fokusnya adalah memastikan kegiatan terencana dengan jelas, bukti pelaksanaan tersedia, capaian dievaluasi, dan rekomendasi perbaikan ditindaklanjuti.',
    highlights: [
      {
        title: 'Monitoring dan evaluasi',
        description:
          'Monev dilakukan untuk membaca capaian standar, hambatan pelaksanaan, serta kebutuhan dukungan di tingkat program studi dan unit.',
      },
      {
        title: 'Audit mutu internal',
        description:
          'AMI memeriksa kesesuaian pelaksanaan dengan standar, prosedur, dan bukti yang tersedia sebelum dilakukan perbaikan terarah.',
      },
      {
        title: 'Pengendalian dokumen',
        description:
          'Dokumen mutu dikelola melalui versi, status berlaku, penanggung jawab, dan arsip agar mudah ditelusuri saat evaluasi.',
      },
    ],
    standards: [
      { text: 'Setiap pedoman memiliki tujuan, ruang lingkup, prosedur, pelaksana, dan bukti kerja.' },
      { text: 'Hasil monev dan AMI dicatat dalam format yang seragam.' },
      { text: 'Rekomendasi perbaikan memiliki penanggung jawab dan target waktu.' },
      { text: 'Dokumen lama diarsipkan tanpa menghapus jejak historis.' },
    ],
    documents: [
      { text: 'Pedoman Monitoring dan Evaluasi' },
      { text: 'Pedoman Audit Mutu Internal' },
      { text: 'Instrumen evaluasi standar' },
      { text: 'Formulir rencana tindak lanjut' },
    ],
  },
  {
    slug: 'standar-pendidikan',
    title: 'Standar Pendidikan',
    subtitle:
      'Standar mutu penyelenggaraan pendidikan untuk mendukung proses pembelajaran yang relevan, terukur, dan berorientasi kompetensi.',
    contentTitle: 'Mutu Pembelajaran',
    contentSubtitle:
      'Fokus standar pendidikan dari kurikulum, proses belajar, penilaian, dosen, sarana, pengelolaan, hingga pembiayaan pembelajaran.',
    breadcrumb: 'Standar Pendidikan',
    intro:
      'Standar pendidikan mengatur mutu pembelajaran mulai dari profil lulusan, kurikulum, proses belajar, penilaian, dosen, sarana, pengelolaan, sampai pembiayaan. Standar ini menjadi acuan program studi dalam menjaga kesesuaian pembelajaran dengan kebutuhan dunia kerja dan perkembangan ilmu.',
    highlights: [
      {
        title: 'Kurikulum berbasis capaian',
        description:
          'Kurikulum disusun berdasarkan profil lulusan, capaian pembelajaran, bahan kajian, metode pembelajaran, dan asesmen yang saling terhubung.',
      },
      {
        title: 'Pembelajaran terukur',
        description:
          'Perkuliahan, praktikum, proyek, dan kegiatan lapangan memiliki rencana pembelajaran serta mekanisme evaluasi yang jelas.',
      },
      {
        title: 'Layanan akademik',
        description:
          'Mahasiswa memperoleh informasi akademik, bimbingan, dan layanan pendukung agar proses studi berjalan efektif.',
      },
    ],
    standards: [
      { text: 'Standar kompetensi lulusan.' },
      { text: 'Standar isi pembelajaran.' },
      { text: 'Standar proses pembelajaran.' },
      { text: 'Standar penilaian pembelajaran.' },
      { text: 'Standar dosen dan tenaga kependidikan.' },
      { text: 'Standar sarana dan prasarana pembelajaran.' },
      { text: 'Standar pengelolaan pembelajaran.' },
      { text: 'Standar pembiayaan pembelajaran.' },
    ],
    documents: [
      { text: 'Dokumen kurikulum program studi' },
      { text: 'Rencana Pembelajaran Semester' },
      { text: 'Rubrik penilaian dan portofolio pembelajaran' },
      { text: 'Laporan evaluasi pembelajaran' },
    ],
  },
  {
    slug: 'standar-penelitian',
    title: 'Standar Penelitian',
    subtitle:
      'Standar mutu penelitian untuk memperkuat riset terapan, publikasi ilmiah, dan kontribusi akademik STTPU.',
    contentTitle: 'Tata Kelola Riset',
    contentSubtitle:
      'Kerangka mutu untuk memastikan penelitian memiliki rencana, integritas ilmiah, luaran, dokumentasi, dan peluang pemanfaatan hasil.',
    breadcrumb: 'Standar Penelitian',
    intro:
      'Standar penelitian memastikan kegiatan riset berjalan sesuai kaidah ilmiah, etika, kebutuhan institusi, dan arah pengembangan teknologi pekerjaan umum. Setiap penelitian didorong memiliki rencana, luaran, dokumentasi, serta peluang pemanfaatan hasil.',
    highlights: [
      {
        title: 'Riset terapan',
        description:
          'Topik penelitian diarahkan pada masalah nyata di bidang infrastruktur, lingkungan, konstruksi, teknologi, dan layanan publik.',
      },
      {
        title: 'Etika dan integritas',
        description:
          'Penelitian memperhatikan kejujuran akademik, sitasi yang benar, perlindungan data, dan kepatuhan terhadap prosedur etik.',
      },
      {
        title: 'Luaran akademik',
        description:
          'Hasil penelitian diarahkan menjadi publikasi, bahan ajar, model, prototipe, rekomendasi kebijakan, atau kekayaan intelektual.',
      },
    ],
    standards: [
      { text: 'Standar hasil penelitian.' },
      { text: 'Standar isi penelitian.' },
      { text: 'Standar proses penelitian.' },
      { text: 'Standar penilaian penelitian.' },
      { text: 'Standar peneliti.' },
      { text: 'Standar sarana dan prasarana penelitian.' },
      { text: 'Standar pengelolaan penelitian.' },
      { text: 'Standar pendanaan dan pembiayaan penelitian.' },
    ],
    documents: [
      { text: 'Roadmap penelitian' },
      { text: 'Pedoman proposal and laporan penelitian' },
      { text: 'Instrumen evaluasi luaran penelitian' },
      { text: 'Daftar publikasi dan rekam jejak penelitian' },
    ],
  },
  {
    slug: 'standar-pkm',
    title: 'Standar PKM',
    subtitle:
      'Standar mutu pengabdian kepada masyarakat untuk memastikan program berdampak, relevan, dan terdokumentasi.',
    contentTitle: 'Dampak Pengabdian',
    contentSubtitle:
      'Acuan mutu kegiatan PKM agar kebutuhan mitra, metode pelaksanaan, hasil, umpan balik, dan keberlanjutan program tercatat jelas.',
    breadcrumb: 'Standar PKM',
    intro:
      'Standar PKM menjadi acuan kegiatan pengabdian kepada masyarakat agar program yang dilakukan dosen dan mahasiswa memiliki kebutuhan mitra yang jelas, metode pelaksanaan yang tepat, serta hasil yang dapat dievaluasi dan dikembangkan.',
    highlights: [
      {
        title: 'Berbasis kebutuhan mitra',
        description:
          'Program PKM dimulai dari identifikasi kebutuhan masyarakat, sekolah, industri, pemerintah, atau komunitas sasaran.',
      },
      {
        title: 'Kolaboratif',
        description:
          'Pelaksanaan PKM dapat melibatkan program studi, mahasiswa, alumni, mitra industri, dan lembaga pemerintah sesuai konteks kegiatan.',
      },
      {
        title: 'Dampak terukur',
        description:
          'Hasil kegiatan dicatat melalui indikator capaian, umpan balik mitra, dokumentasi, dan rekomendasi keberlanjutan program.',
      },
    ],
    standards: [
      { text: 'Standar hasil PKM.' },
      { text: 'Standar isi PKM.' },
      { text: 'Standar proses PKM.' },
      { text: 'Standar penilaian PKM.' },
      { text: 'Standar pelaksana PKM.' },
      { text: 'Standar sarana dan prasarana PKM.' },
      { text: 'Standar pengelolaan PKM.' },
      { text: 'Standar pendanaan dan pembiayaan PKM.' },
    ],
    documents: [
      { text: 'Pedoman proposal dan laporan PKM' },
      { text: 'Peta mitra dan wilayah binaan' },
      { text: 'Instrumen evaluasi kepuasan mitra' },
      { text: 'Laporan dampak dan keberlanjutan program' },
    ],
  },
];

async function getLpmiSections(): Promise<{ subpages: LpmiSection[]; sidebarTitle: string }> {
  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'lpmi-page' as never });
    const data = global as { subpages?: LpmiSection[]; sidebarTitle?: string };
    if (data.subpages && data.subpages.length > 0) {
      return {
        subpages: data.subpages,
        sidebarTitle: data.sidebarTitle || 'Menu LPMI',
      };
    }
  } catch (error) {
    console.error('Error fetching lpmi page data:', error);
  }
  return {
    subpages: defaultLpmiSections,
    sidebarTitle: 'Menu LPMI',
  };
}

const iconMap = [ShieldCheck, ClipboardCheck, GraduationCap, Microscope, Handshake];

const fetchLpmiDocuments = unstable_cache(async (sectionSlug: string): Promise<LpmiDocument[]> => {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'lpmi-dokumen' as never,
      where: {
        and: [
          { section: { equals: sectionSlug } },
          { status: { equals: 'terbit' } },
        ],
      },
      sort: ['urutan', '-updatedAt'],
      depth: 1,
      limit: 50,
    });

    return result.docs as unknown as LpmiDocument[];
  } catch (error) {
    console.error('Error fetching LPMI documents:', error);
    return [];
  }
}, ['lpmi-documents-by-section'], { revalidate: 60 });

function formatFileSize(value?: number | null) {
  if (!value || value <= 0) return null;
  if (value < 1024 * 1024) return `${Math.ceil(value / 1024)} KB`;
  return `${(value / 1024 / 1024).toFixed(1)} MB`;
}

function SectionCard({
  title,
  eyebrow,
  children,
  className = '',
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-premium border border-gray-100 bg-white p-6 shadow-premium sm:rounded-premium-lg sm:p-8 lg:p-10 ${className}`}>
      {eyebrow ? (
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">{eyebrow}</p>
      ) : null}
      <h2 className="text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">{title}</h2>
      <div className="mt-4 h-1 w-12 rounded-full bg-brand-gold" />
      <div className="mt-8">{children}</div>
    </section>
  );
}

export async function generateStaticParams() {
  const { subpages } = await getLpmiSections();
  return subpages.map((section) => ({ slug: section.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { subpages } = await getLpmiSections();
  const section = subpages.find((item) => item.slug === slug);
  if (!section) return {};

  const pageTitle = section.title.includes('LPMI') ? section.title : `${section.title} LPMI`;

  return buildPageMetadata({
    title: `${pageTitle} | STTPU Jakarta`,
    description: section.subtitle,
    path: `/lpmi/${section.slug}`,
  });
}

export default async function LpmiSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { subpages, sidebarTitle } = await getLpmiSections();
  const section = subpages.find((item) => item.slug === slug);
  if (!section) notFound();
  const documents = await fetchLpmiDocuments(section.slug);

  const sectionIndex = subpages.findIndex((item) => item.slug === slug);
  const HeroIcon = iconMap[sectionIndex] || Award;
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'Tentang', path: '/tentang' },
    { name: 'LPMI', path: '/lpmi/kebijakan' },
    { name: section.breadcrumb || section.title, path: `/lpmi/${section.slug}` },
  ]);

  const sidebarLinks = subpages.map((item) => ({
    label: item.breadcrumb || item.title,
    href: `/lpmi/${item.slug}`,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SectionPageHeader
        title={section.title}
        subtitle={section.subtitle}
        breadcrumbs={[
          { label: 'Tentang', href: '/tentang' },
          { label: 'LPMI', href: '/lpmi/kebijakan' },
          { label: section.breadcrumb || section.title },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_20rem] xl:grid-cols-[1fr_22rem]">
          <div className="min-w-0 space-y-8">
            <div className="space-y-8">

              <section className="overflow-hidden rounded-premium border border-gray-100 bg-white shadow-premium sm:rounded-premium-lg">
                <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="p-6 sm:p-8 lg:p-10">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold/15 text-brand-navy">
                      <HeroIcon size={26} strokeWidth={2.4} />
                    </div>
                    {section.intro && (
                      <p className="text-sm font-semibold leading-7 text-gray-600 sm:text-base">
                        {section.intro}
                      </p>
                    )}
                  </div>
                  <div className="bg-brand-mist p-6 sm:p-8 lg:p-10">
                    <p className="mb-5 text-xs font-black uppercase tracking-[0.12em] text-brand-navy/60">
                      Siklus Mutu
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-5 lg:grid-cols-1">
                      {['Penetapan', 'Pelaksanaan', 'Evaluasi', 'Pengendalian', 'Peningkatan'].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-2xl border border-white bg-white px-4 py-3 shadow-sm"
                        >
                          <FileCheck2 className="h-4 w-4 flex-shrink-0 text-brand-gold-dark" />
                          <span className="text-sm font-black text-brand-navy">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-8">
              {section.highlights && section.highlights.length > 0 && (
                <section className="grid gap-4 md:grid-cols-3">
                  {section.highlights.map((item) => (
                    <article
                      key={item.title}
                      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-premium transition-all hover:-translate-y-1 hover:shadow-premium-hover"
                    >
                      <ClipboardCheck className="mb-4 h-6 w-6 text-brand-gold-dark" />
                      <h3 className="text-lg font-black text-brand-navy">{item.title}</h3>
                      <p className="mt-3 text-sm font-medium leading-7 text-gray-500">{item.description}</p>
                    </article>
                  ))}
                </section>
              )}

              <section className="grid gap-6 lg:grid-cols-2">
                {section.standards && section.standards.length > 0 && (
                  <SectionCard title={section.contentTitle || "Ruang Lingkup Standar"} eyebrow="Scope">
                    <ul className="space-y-3">
                      {section.standards.map((item) => (
                        <li key={item.text} className="flex gap-3 text-sm font-semibold leading-7 text-gray-600">
                          <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </SectionCard>
                )}

                {section.documents && section.documents.length > 0 && (
                  <section className="rounded-premium border border-gray-100 bg-brand-navy p-6 text-white shadow-premium sm:rounded-premium-lg sm:p-8 lg:p-10">
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-white/50">References</p>
                    <div className="mb-5 flex items-center gap-3">
                      <FileCheck2 className="h-6 w-6 text-brand-gold" />
                      <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">Dokumen Terkait</h2>
                    </div>
                    <div className="mt-4 h-1 w-12 rounded-full bg-brand-gold" />
                    <ul className="mt-8 space-y-3">
                      {section.documents.map((item) => (
                        <li key={item.text} className="flex gap-3 text-sm font-semibold leading-7 text-white/75">
                          <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </section>

              <SectionCard title="Dokumen LPMI" eyebrow="Unduhan">
                <p className="mb-6 text-sm font-medium leading-7 text-gray-500">
                  Akses pedoman, standar, dan arsip mutu yang menjadi acuan pelaksanaan penjaminan mutu internal.
                </p>

                {documents.length > 0 ? (
                  <div className="grid gap-4">
                    {documents.map((document) => {
                      const file = typeof document.file === 'object' ? document.file : null;
                      const fileSize = formatFileSize(file?.filesize);
                      return (
                        <article
                          key={document.id ?? document.judul}
                          className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-brand-mist p-5 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex min-w-0 gap-4">
                            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-brand-navy shadow-sm">
                              <FileText size={22} />
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-base font-black text-brand-navy">{document.judul}</h3>
                              {document.deskripsi && (
                                <p className="mt-1 text-sm font-medium leading-6 text-gray-500">
                                  {document.deskripsi}
                                </p>
                              )}
                              {(file?.filename || fileSize) && (
                                <p className="mt-2 text-xs font-bold uppercase tracking-[0.08em] text-brand-navy/40">
                                  {[file?.filename, fileSize].filter(Boolean).join(' - ')}
                                </p>
                              )}
                            </div>
                          </div>

                          {file?.url && (
                            <Link
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-2xl bg-brand-gold px-5 py-3 text-sm font-black text-brand-navy transition-all hover:bg-brand-navy hover:text-white"
                            >
                              <Download size={18} />
                              Download
                            </Link>
                          )}
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm font-semibold leading-7 text-gray-500">
                    Belum ada dokumen yang dipublikasikan untuk halaman ini. Admin dapat menambahkan dokumen melalui
                    collection Dokumen LPMI di Payload.
                  </div>
                )}
              </SectionCard>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 self-start">
            {/* Sidebar Navigation Links */}
            {sidebarLinks.length > 0 && (
              <div className="rounded-premium border border-gray-100 bg-white overflow-hidden shadow-sm shadow-brand-navy/[0.04] sm:rounded-premium-lg">
                <div className="border-b border-gray-50 px-6 py-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400 font-black">Menu</p>
                  <h3 className="mt-1 text-sm sm:text-base font-bold tracking-tight text-brand-navy">{sidebarTitle}</h3>
                </div>
                <ul className="divide-y divide-gray-50">
                  {sidebarLinks.map((link) => {
                    const isActive = link.href === `/lpmi/${slug}`;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`group flex items-center justify-between px-6 py-4 text-xs sm:text-sm font-semibold transition-all ${
                            isActive
                              ? 'bg-brand-navy/[0.02] text-brand-navy font-bold'
                              : 'text-gray-500 hover:bg-gray-50 hover:text-brand-navy'
                          }`}
                        >
                          <span className={`pr-4 leading-relaxed font-bold ${isActive ? 'text-brand-navy font-extrabold' : ''}`}>{link.label}</span>
                          <ChevronRight
                            size={14}
                            className={`flex-shrink-0 transition-all ${
                              isActive ? 'text-brand-gold translate-x-0.5' : 'text-gray-300 group-hover:translate-x-1 group-hover:text-brand-gold'
                            }`}
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* AMI Portal Card */}
            <div className="overflow-hidden rounded-premium bg-brand-gold text-brand-navy shadow-xl shadow-brand-gold/5 sm:rounded-premium-lg">
              <div className="relative px-6 py-8">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-navy/55">Audit Mutu Internal</p>
                    <h3 className="mt-3 text-xl font-bold tracking-tight leading-snug">Portal Penjaminan Mutu STTPU</h3>
                    <p className="mt-4 text-xs font-medium leading-relaxed text-brand-navy/70">
                      Akses instrumen AMI, borang evaluasi, dan laporan kinerja program studi di bawah pengawasan LPMI.
                    </p>
                  </div>
                  <a
                    href="https://siakadat.sttpu.ac.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-brand-navy px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-brand-navy/90"
                  >
                    Masuk Portal
                  </a>
                </div>
              </div>
            </div>

            {/* Hubungi LPMI Card */}
            <div className="rounded-premium border border-gray-100 bg-white p-6 shadow-sm shadow-brand-navy/[0.04] sm:rounded-premium-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-navy/5">
                    <svg className="h-5 w-5 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">Layanan Mutu</p>
                    <p className="mt-1 text-base font-bold tracking-tight text-brand-navy">Kontak LPMI</p>
                  </div>
                </div>
                <p className="mt-5 text-xs font-medium leading-relaxed text-gray-600">
                  Ingin mengajukan masukan atau klarifikasi terkait standar mutu institusi maupun program studi?
                </p>
              </div>
              <Link
                href="/kontak"
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-brand-navy px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy transition-all hover:bg-brand-navy hover:text-white"
              >
                Hubungi Kami
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
