import type { Metadata } from 'next';
import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import {
  Award,
  BookOpenCheck,
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
  breadcrumb: string;
  intro: string;
  highlights: { title: string; description: string }[];
  standards: string[];
  documents: string[];
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

const lpmiSections: LpmiSection[] = [
  {
    slug: 'kebijakan',
    title: 'Kebijakan LPMI',
    subtitle:
      'Arah penjaminan mutu internal STTPU untuk memastikan pendidikan, penelitian, dan pengabdian berjalan terukur serta berkelanjutan.',
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
      'Komitmen pimpinan terhadap sistem penjaminan mutu internal.',
      'Keterlibatan seluruh unit dalam siklus PPEPP.',
      'Pengelolaan dokumen mutu yang tertelusur dan mudah diaudit.',
      'Pemanfaatan hasil evaluasi untuk rencana tindak lanjut.',
    ],
    documents: [
      'Kebijakan SPMI STTPU',
      'Manual SPMI',
      'Peta Standar Mutu',
      'Rencana tindak lanjut hasil evaluasi mutu',
    ],
  },
  {
    slug: 'pedoman',
    title: 'Pedoman LPMI',
    subtitle:
      'Panduan kerja penjaminan mutu untuk pelaksanaan monitoring, evaluasi, audit mutu internal, dan pengendalian dokumen.',
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
      'Setiap pedoman memiliki tujuan, ruang lingkup, prosedur, pelaksana, dan bukti kerja.',
      'Hasil monev dan AMI dicatat dalam format yang seragam.',
      'Rekomendasi perbaikan memiliki penanggung jawab dan target waktu.',
      'Dokumen lama diarsipkan tanpa menghapus jejak historis.',
    ],
    documents: [
      'Pedoman Monitoring dan Evaluasi',
      'Pedoman Audit Mutu Internal',
      'Instrumen evaluasi standar',
      'Formulir rencana tindak lanjut',
    ],
  },
  {
    slug: 'standar-pendidikan',
    title: 'Standar Pendidikan',
    subtitle:
      'Standar mutu penyelenggaraan pendidikan untuk mendukung proses pembelajaran yang relevan, terukur, dan berorientasi kompetensi.',
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
      'Standar kompetensi lulusan.',
      'Standar isi pembelajaran.',
      'Standar proses pembelajaran.',
      'Standar penilaian pembelajaran.',
      'Standar dosen dan tenaga kependidikan.',
      'Standar sarana dan prasarana pembelajaran.',
      'Standar pengelolaan pembelajaran.',
      'Standar pembiayaan pembelajaran.',
    ],
    documents: [
      'Dokumen kurikulum program studi',
      'Rencana Pembelajaran Semester',
      'Rubrik penilaian dan portofolio pembelajaran',
      'Laporan evaluasi pembelajaran',
    ],
  },
  {
    slug: 'standar-penelitian',
    title: 'Standar Penelitian',
    subtitle:
      'Standar mutu penelitian untuk memperkuat riset terapan, publikasi ilmiah, dan kontribusi akademik STTPU.',
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
      'Standar hasil penelitian.',
      'Standar isi penelitian.',
      'Standar proses penelitian.',
      'Standar penilaian penelitian.',
      'Standar peneliti.',
      'Standar sarana dan prasarana penelitian.',
      'Standar pengelolaan penelitian.',
      'Standar pendanaan dan pembiayaan penelitian.',
    ],
    documents: [
      'Roadmap penelitian',
      'Pedoman proposal dan laporan penelitian',
      'Instrumen evaluasi luaran penelitian',
      'Daftar publikasi dan rekam jejak penelitian',
    ],
  },
  {
    slug: 'standar-pkm',
    title: 'Standar PKM',
    subtitle:
      'Standar mutu pengabdian kepada masyarakat untuk memastikan program berdampak, relevan, dan terdokumentasi.',
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
      'Standar hasil PKM.',
      'Standar isi PKM.',
      'Standar proses PKM.',
      'Standar penilaian PKM.',
      'Standar pelaksana PKM.',
      'Standar sarana dan prasarana PKM.',
      'Standar pengelolaan PKM.',
      'Standar pendanaan dan pembiayaan PKM.',
    ],
    documents: [
      'Pedoman proposal dan laporan PKM',
      'Peta mitra dan wilayah binaan',
      'Instrumen evaluasi kepuasan mitra',
      'Laporan dampak dan keberlanjutan program',
    ],
  },
];

const sidebarLinks = lpmiSections.map((section) => ({
  label: section.breadcrumb,
  href: `/lpmi/${section.slug}`,
}));

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
      sort: 'urutan,-updatedAt',
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

export function generateStaticParams() {
  return lpmiSections.map((section) => ({ slug: section.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const section = lpmiSections.find((item) => item.slug === slug);
  if (!section) return {};

  return buildPageMetadata({
    title: `${section.title} LPMI | STTPU Jakarta`,
    description: section.subtitle,
    path: `/lpmi/${section.slug}`,
  });
}

function LpmiSidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="w-full flex-shrink-0 lg:w-72 lg:self-start">
      <div className="overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white shadow-premium transition-all sm:rounded-[2rem]">
        <div className="bg-brand-navy px-4 py-4 sm:px-6 sm:py-5">
          <p className="text-xs font-black tracking-[0.08em] text-white">Navigasi LPMI</p>
        </div>
        <nav aria-label="Navigasi LPMI">
          <ul role="list">
            {sidebarLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href} className="border-b border-gray-50 last:border-0">
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center justify-between gap-3 border-l-4 px-4 py-3.5 text-sm leading-snug transition-all duration-300 sm:px-6 sm:py-4 ${
                      active
                        ? 'border-brand-gold bg-brand-navy/[0.02] font-black text-brand-navy'
                        : 'border-transparent font-bold text-gray-400 hover:bg-gray-50 hover:text-brand-navy'
                    }`}
                  >
                    <span className="min-w-0">{link.label}</span>
                    {active && <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-gold" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default async function LpmiSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = lpmiSections.find((item) => item.slug === slug);
  if (!section) notFound();
  const documents = await fetchLpmiDocuments(section.slug);

  const sectionIndex = lpmiSections.findIndex((item) => item.slug === slug);
  const HeroIcon = iconMap[sectionIndex] || Award;
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'LPMI', path: '/lpmi' },
    { name: section.breadcrumb, path: `/lpmi/${section.slug}` },
  ]);

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
          { label: 'LPMI', href: '/lpmi' },
          { label: section.breadcrumb, href: `/lpmi/${section.slug}` },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <LpmiSidebar pathname={`/lpmi/${section.slug}`} />

          <div className="min-w-0 flex-1">
            <section className="overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white shadow-premium sm:rounded-[2rem]">
              <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold/15 text-brand-navy">
                    <HeroIcon size={26} strokeWidth={2.4} />
                  </div>
                  <p className="text-sm font-semibold leading-7 text-gray-600 sm:text-base">
                    {section.intro}
                  </p>
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

            <section className="mt-8 grid gap-4 md:grid-cols-3">
              {section.highlights.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-premium transition-all hover:-translate-y-1 hover:shadow-premium-hover"
                >
                  <ClipboardCheck className="mb-4 h-6 w-6 text-brand-gold-dark" />
                  <h2 className="text-lg font-black text-brand-navy">{item.title}</h2>
                  <p className="mt-3 text-sm font-medium leading-7 text-gray-500">{item.description}</p>
                </article>
              ))}
            </section>

            <section className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-[1.75rem] border border-gray-100 bg-white p-6 shadow-premium sm:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <BookOpenCheck className="h-6 w-6 text-brand-gold-dark" />
                  <h2 className="text-xl font-black text-brand-navy">Ruang Lingkup Standar</h2>
                </div>
                <ul className="space-y-3">
                  {section.standards.map((item) => (
                    <li key={item} className="flex gap-3 text-sm font-semibold leading-7 text-gray-600">
                      <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.75rem] border border-gray-100 bg-brand-navy p-6 text-white shadow-premium sm:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <FileCheck2 className="h-6 w-6 text-brand-gold" />
                  <h2 className="text-xl font-black">Dokumen Terkait</h2>
                </div>
                <ul className="space-y-3">
                  {section.documents.map((item) => (
                    <li key={item} className="flex gap-3 text-sm font-semibold leading-7 text-white/75">
                      <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-8 rounded-[1.75rem] border border-gray-100 bg-white p-6 shadow-premium sm:p-8">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-brand-navy/50">
                    Unduhan
                  </p>
                  <h2 className="mt-2 text-xl font-black text-brand-navy">Dokumen LPMI</h2>
                </div>
                <p className="max-w-xl text-sm font-medium leading-7 text-gray-500">
                  Dokumen yang diunggah melalui admin Payload akan tampil di sini sesuai halaman LPMI yang dipilih.
                </p>
              </div>

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
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
