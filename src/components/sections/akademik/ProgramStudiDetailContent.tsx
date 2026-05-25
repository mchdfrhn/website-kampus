import Image from 'next/image';
import Link from 'next/link';
import type { ProgramStudi } from '@/lib/data/program-studi';
import type { ProgramStudiPageContent } from '@/lib/data/akademik-page';
import {
  ShieldCheck,
  GraduationCap,
  Clock,
  Hash,
  ChevronRight,
  User,
  FileText,
} from 'lucide-react';
import BlueAbstractBackground from '@/components/ui/BlueAbstractBackground';
import { cn } from '@/lib/utils';
import { getAkademikNavigation } from '@/lib/akademik-navigation';

const akreditasiColor: Record<string, string> = {
  Unggul: 'bg-green-50 text-green-700 border-green-200',
  'Baik Sekali': 'bg-blue-50 text-blue-700 border-blue-200',
  Baik: 'bg-yellow-50 text-yellow-700 border-yellow-200',
};

function toTitleCase(value: string) {
  return value
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function SectionCard({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-premium border border-gray-100 bg-white p-6 shadow-premium sm:rounded-premium-lg sm:p-8 lg:p-10">
      {eyebrow ? (
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">{eyebrow}</p>
      ) : null}
      <h2 className="text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">{title}</h2>
      <div className="mt-4 h-1 w-12 rounded-full bg-brand-gold" />
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default async function ProgramStudiDetailContent({
  prodi,
  others = [],
  content,
}: {
  prodi: ProgramStudi;
  others?: ProgramStudi[];
  content?: ProgramStudiPageContent | null;
}) {
  const { sidebarTitle, links } = await getAkademikNavigation();
  const akreditasiLabel = prodi.akreditasi ? toTitleCase(prodi.akreditasi) : '-';
  const careerTitle = content?.detailCareerTitle || 'Mulai Perjalanan Akademik Anda';
  const careerDescription =
    content?.detailCareerDescription ||
    'Dapatkan informasi pendaftaran, jadwal seleksi, dan proses registrasi program studi ini.';
  const careerButtonLabel = content?.detailCareerButtonLabel || 'Website PMB';
  const careerButtonHref = content?.detailCareerButtonHref || 'https://pmb.sttpu.ac.id';
  const infoTitle = content?.detailInfoTitle || 'Butuh Konsultasi?';
  const infoDescription =
    content?.detailInfoDescription ||
    'Tim akademik siap membantu Anda memahami kurikulum, prospek lulusan, dan alur pendaftaran.';
  const infoButtonLabel = content?.detailInfoButtonLabel || 'Hubungi Kami';
  const infoButtonHref = content?.detailInfoButtonHref || '/kontak';
  
  const overviewStats = [
    { icon: Clock, label: 'Masa Studi', value: prodi.masaStudi || '-' },
    { icon: Hash, label: 'Total Beban', value: prodi.jumlahSKS ? `${prodi.jumlahSKS} SKS` : '-' },
    { icon: GraduationCap, label: 'Gelar Lulusan', value: prodi.gelarLulusan || '-' },
    {
      icon: ShieldCheck,
      label: 'Akreditasi',
      value: akreditasiLabel,
    },
  ];

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Overview Stats Card */}
      <section className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-premium sm:p-8">
        <span className="absolute inset-x-0 top-0 h-1 bg-brand-navy" aria-hidden="true" />
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center rounded-md border border-brand-navy/10 bg-brand-navy/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider leading-none text-brand-navy">
              Jenjang {prodi.jenjang}
            </span>
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider leading-none',
                akreditasiColor[akreditasiLabel] ?? 'border-gray-200 bg-gray-50 text-gray-600',
              )}
            >
              <ShieldCheck size={11} aria-hidden="true" />
              Akreditasi {akreditasiLabel}
            </span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {overviewStats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand-navy/15 hover:bg-white hover:shadow-premium"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy text-white">
                  <Icon size={17} aria-hidden="true" />
                </div>
                <p className="mt-4 whitespace-nowrap text-[9px] font-bold uppercase tracking-wide text-gray-400">{label}</p>
                <p className="mt-2 text-sm font-bold leading-relaxed tracking-tight text-brand-navy">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_20rem] xl:grid-cols-[1fr_22rem]">
        {/* Main Content Sections */}
        <article className="min-w-0 space-y-10 sm:space-y-12">
          <SectionCard title="Profil Program" eyebrow="Overview">
            {prodi.deskripsiHtml ? (
              <div
                className="prose prose-slate max-w-none prose-headings:text-brand-navy prose-p:text-gray-600 prose-p:leading-8 prose-strong:text-brand-navy"
                dangerouslySetInnerHTML={{ __html: prodi.deskripsiHtml }}
              />
            ) : (
              <p className="text-base font-medium leading-8 text-gray-600">{prodi.deskripsi}</p>
            )}
          </SectionCard>

          {/* Visi Misi */}
          <section className="overflow-hidden rounded-premium bg-brand-navy text-white shadow-2xl shadow-brand-navy/15 sm:rounded-premium-lg">
            <div className="relative px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              <BlueAbstractBackground />
              <div className="relative z-10 grid gap-10 md:grid-cols-2 md:gap-12">
                <div>
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-gold">Visi Strategis</p>
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Visi</h2>
                  <div className="mt-4 h-1 w-12 rounded-full bg-brand-gold" />
                  <p className="mt-6 text-base font-medium leading-8 text-white/80">
                    &ldquo;{prodi.visi || 'Visi program studi belum tersedia.'}&rdquo;
                  </p>
                </div>

                <div>
                  <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-gold">Misi Operasional</p>
                  <ol className="space-y-4">
                    {prodi.misi.map((m, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-xs font-bold text-brand-gold">
                          {(i + 1).toString().padStart(2, '0')}
                        </span>
                        <span className="pt-1 text-sm font-medium leading-7 text-white/80 sm:text-[15px]">{m}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* Kompetensi & Karir */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <SectionCard title="Kompetensi Lulusan" eyebrow="Outcome">
              <ul className="space-y-4">
                {prodi.kompetensiLulusan.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 text-sm font-medium leading-7 text-gray-600"
                  >
                    <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-gold/12">
                      <ChevronRight size={14} className="text-brand-gold" aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="Prospek Karir" eyebrow="Career Path">
              <ul className="grid gap-4">
                {prodi.prospekKarir.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white px-4 py-4 text-sm font-semibold leading-6 text-brand-navy shadow-sm shadow-brand-navy/[0.03]"
                  >
                    <span className="h-2 w-2 flex-shrink-0 rounded-full bg-brand-gold" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>

          {/* Kurikulum */}
          <SectionCard title="Struktur Kurikulum" eyebrow="Academic Plan">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {prodi.kurikulum.map((semester) => (
                <details
                  key={semester.semester}
                  open={semester.semester <= 2}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 group"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-5 transition-colors hover:bg-white sm:px-6">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">Semester</p>
                      <p className="mt-1 text-base font-bold tracking-tight text-brand-navy">
                        {semester.semester.toString().padStart(2, '0')}
                      </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white group-open:rotate-90 transition-transform">
                      <ChevronRight size={16} className="text-brand-navy" aria-hidden="true" />
                    </div>
                  </summary>
                  <div className="border-t border-gray-100 px-5 py-5 sm:px-6">
                    <ul className="space-y-3">
                      {semester.mataKuliah.map((mataKuliah, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm font-medium leading-6 text-gray-600">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-gold" aria-hidden="true" />
                          <span>{mataKuliah}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-gray-100 bg-gray-50 px-5 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">Catatan</p>
                <p className="mt-2 text-sm font-medium leading-6 text-gray-600">
                  Kurikulum disusun berbasis standar kompetensi nasional dan kebutuhan industri infrastruktur.
                </p>
              </div>
              <a
                href={prodi.kurikulumPdfUrl || '#'}
                target={prodi.kurikulumPdfUrl ? '_blank' : undefined}
                rel={prodi.kurikulumPdfUrl ? 'noopener noreferrer' : undefined}
                className={cn(
                  'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all',
                  prodi.kurikulumPdfUrl
                    ? 'bg-brand-navy text-white hover:bg-brand-navy/90'
                    : 'cursor-not-allowed bg-gray-200 text-gray-500',
                )}
              >
                <FileText size={14} aria-hidden="true" />
                Unduh Kurikulum
              </a>
            </div>
          </SectionCard>
        </article>

        {/* Floating Sidebar (PMB, Contact, & Explore) */}
        <aside className="space-y-6 lg:sticky lg:top-28 self-start">
          {/* Main Academic Menu */}
          {links.length > 0 && (
            <div className="rounded-premium border border-gray-100 bg-white overflow-hidden shadow-sm shadow-brand-navy/[0.04] sm:rounded-premium-lg">
              <div className="border-b border-gray-50 px-6 py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400 font-black">Menu</p>
                <h3 className="mt-1 text-sm sm:text-base font-bold tracking-tight text-brand-navy">{sidebarTitle}</h3>
              </div>
              <ul className="divide-y divide-gray-50">
                {links.map((link) => {
                  const isActive = link.href === '/akademik/program-studi';
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
                        <span className={`pr-4 leading-relaxed font-bold ${isActive ? 'text-brand-navy font-extrabold' : ''}`}>
                          {link.label}
                        </span>
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

          {/* Program Studi Lain Navigation */}
          {others.length > 0 && (
            <div className="rounded-premium border border-gray-100 bg-white overflow-hidden shadow-premium sm:rounded-premium-lg">
              <div className="border-b border-gray-50 px-6 py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400 font-black">Jelajahi</p>
                <h3 className="mt-1 text-sm sm:text-base font-bold tracking-tight text-brand-navy">Program Studi Lain</h3>
              </div>
              <ul className="divide-y divide-gray-50">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/akademik/program-studi/${item.slug}`}
                      className="group flex items-center justify-between px-6 py-4 text-xs sm:text-sm font-semibold text-gray-500 transition-all hover:bg-gray-50 hover:text-brand-navy"
                    >
                      <span className="pr-4 leading-relaxed font-bold">{item.nama}</span>
                      <ChevronRight
                        size={14}
                        className="flex-shrink-0 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-brand-gold"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="overflow-hidden rounded-premium bg-brand-gold text-brand-navy shadow-xl shadow-brand-gold/5 sm:rounded-premium-lg">
            <div className="relative px-6 py-8 sm:px-8">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-navy/55">Penerimaan Mahasiswa Baru</p>
                  <h3 className="mt-3 text-xl font-bold tracking-tight leading-snug sm:text-2xl">{careerTitle}</h3>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-brand-navy/70">
                    {careerDescription}
                  </p>
                </div>
                <a
                  href={careerButtonHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-brand-navy px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-brand-navy/90"
                >
                  {careerButtonLabel}
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-premium border border-gray-100 bg-white p-6 shadow-premium sm:rounded-premium-lg sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-navy/5">
                  <User size={20} className="text-brand-navy" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">Layanan Informasi</p>
                  <p className="mt-1 text-lg font-bold tracking-tight text-brand-navy">{infoTitle}</p>
                </div>
              </div>
              <p className="mt-5 text-sm font-medium leading-relaxed text-gray-600">
                {infoDescription}
              </p>
            </div>
            <Link
              href={infoButtonHref}
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-brand-navy px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy transition-all hover:bg-brand-navy hover:text-white"
            >
              {infoButtonLabel}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
