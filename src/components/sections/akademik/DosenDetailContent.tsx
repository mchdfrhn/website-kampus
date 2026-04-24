import Image from 'next/image';
import type { Dosen } from '@/lib/data/dosen';
import DetailBackButton from '@/components/ui/DetailBackButton';
import {
  Award,
  BookOpen,
  ExternalLink,
  GraduationCap,
  Mail,
  Users,
} from 'lucide-react';

const jabatanColor: Record<string, string> = {
  Profesor: 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200',
  'Lektor Kepala': 'bg-blue-50 text-blue-800 border-blue-200',
  Lektor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  'Asisten Ahli': 'bg-amber-50 text-amber-800 border-amber-200',
};

function getInitials(name: string) {
  return (
    name
      .split(',')
      .shift()
      ?.split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || 'DS'
  );
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
    <section className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm shadow-brand-navy/[0.04] sm:p-8">
      {eyebrow ? (
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">{eyebrow}</p>
      ) : null}
      <h2 className="text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">{title}</h2>
      <div className="mt-4 h-1 w-12 rounded-full bg-brand-gold" />
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function DosenDetailContent({ dosen }: { dosen: Dosen }) {
  const initials = getInitials(dosen.nama);

  return (
    <div className="space-y-8 sm:space-y-10">
      <section className="rounded-[2rem] border border-brand-navy/10 bg-gradient-to-br from-white via-brand-mist/40 to-white p-6 shadow-sm shadow-brand-navy/[0.05] sm:p-8 lg:p-10">
        <div className="grid gap-6 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-8">
          <div className="relative h-44 w-36 overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white shadow-sm shadow-brand-navy/[0.06]">
            {dosen.fotoUrl ? (
              <Image src={dosen.fotoUrl} alt={dosen.nama} fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(160deg,#eff6ff_0%,#f8fafc_45%,#fef3c7_100%)]">
                <span className="text-3xl font-bold tracking-[0.18em] text-brand-navy/45">{initials}</span>
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap gap-3">
              <span
                className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] ${jabatanColor[dosen.jabatanFungsional] ?? 'bg-gray-50 text-gray-700 border-gray-200'}`}
              >
                {dosen.jabatanFungsional}
              </span>
              <span className="inline-flex items-center rounded-lg border border-brand-navy/10 bg-brand-navy/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-navy">
                {dosen.publikasi.length} Publikasi
              </span>
            </div>

            <h1 className="mt-6 text-3xl font-bold leading-[1.15] tracking-tight text-brand-navy sm:text-4xl">
              {dosen.nama}
            </h1>

            <p className="mt-4 text-sm font-medium leading-7 text-gray-600 sm:text-base">
              Profil akademik dosen STTPU Jakarta yang aktif mengajar pada {dosen.programStudi.join(', ')} dan
              memiliki fokus keahlian pada {dosen.bidangKeahlian.slice(0, 3).join(', ')}.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-gray-100 bg-white p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">NIDN</p>
                <p className="mt-2 text-sm font-bold tracking-tight text-brand-navy">{dosen.nidn || '-'}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Pendidikan</p>
                <p className="mt-2 text-sm font-bold tracking-tight text-brand-navy">{dosen.pendidikanTerakhir || '-'}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:col-span-2 xl:col-span-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Kontak Akademik</p>
                <a
                  href={`mailto:${dosen.email}`}
                  className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-brand-navy transition-colors hover:text-brand-gold"
                >
                  <Mail size={14} />
                  <span className="truncate">{dosen.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
        <article className="space-y-8">
          <SectionCard title="Profil Dosen" eyebrow="Overview">
            <p className="text-base font-medium leading-8 text-gray-600">
              {dosen.bio || 'Biografi dosen belum tersedia.'}
            </p>
          </SectionCard>

          <SectionCard title="Publikasi Akademik" eyebrow="Research Output">
            {dosen.publikasi.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 p-10 text-center text-sm text-gray-500">
                Data publikasi belum tersedia.
              </div>
            ) : (
              <ul className="space-y-4">
                {dosen.publikasi.map((pub, idx) => (
                  <li
                    key={`${pub.judul}-${idx}`}
                    className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:border-brand-navy/15 hover:shadow-sm hover:shadow-brand-navy/[0.04]"
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-navy text-xs font-bold text-white">
                      {pub.tahun}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold leading-6 text-brand-navy sm:text-[15px]">{pub.judul}</h3>
                      <p className="mt-1 text-sm font-medium text-gray-500">{pub.jurnal}</p>
                    </div>
                    {pub.url ? (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Baca publikasi: ${pub.judul}`}
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-gray-200 text-brand-navy transition-colors hover:border-brand-gold hover:bg-brand-gold hover:text-brand-navy"
                      >
                        <ExternalLink size={15} />
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>
        </article>

        <aside className="space-y-8">
          <SectionCard title="Informasi Akademik" eyebrow="Academic Profile">
            <div className="space-y-4">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold/10">
                    <GraduationCap size={18} className="text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Pendidikan Terakhir</p>
                    <p className="mt-1 text-sm font-bold text-brand-navy">{dosen.pendidikanTerakhir || '-'}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold/10">
                    <Award size={18} className="text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Jabatan Fungsional</p>
                    <p className="mt-1 text-sm font-bold text-brand-navy">{dosen.jabatanFungsional || '-'}</p>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Bidang Keahlian" eyebrow="Expertise">
            <ul className="flex flex-wrap gap-2.5">
              {dosen.bidangKeahlian.length > 0 ? (
                dosen.bidangKeahlian.map((keahlian) => (
                  <li
                    key={keahlian}
                    className="rounded-full border border-brand-navy/10 bg-brand-navy/[0.03] px-3.5 py-2 text-sm font-semibold text-brand-navy"
                  >
                    {keahlian}
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500">Bidang keahlian belum tersedia.</li>
              )}
            </ul>
          </SectionCard>

          <SectionCard title="Program Studi" eyebrow="Teaching Scope">
            <ul className="space-y-3">
              {dosen.programStudi.map((program) => (
                <li
                  key={program}
                  className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 text-sm font-semibold text-brand-navy"
                >
                  <Users size={16} className="text-brand-gold" />
                  <span>{program}</span>
                </li>
              ))}
            </ul>
          </SectionCard>

          <DetailBackButton href="/akademik/dosen" label="Kembali ke Direktori Dosen" />
        </aside>
      </div>
    </div>
  );
}
