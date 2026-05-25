import Link from 'next/link';
import { ArrowRight, BookOpenCheck, ClipboardCheck, FileText, ShieldCheck, Sparkles } from 'lucide-react';

const pedomanItems = [
  {
    title: 'Pedoman Proposal Penelitian',
    description:
      'Acuan penyusunan latar belakang, rumusan masalah, metode, jadwal kegiatan, rencana luaran, dan anggaran penelitian.',
    icon: FileText,
  },
  {
    title: 'Pedoman Pengabdian kepada Masyarakat',
    description:
      'Panduan perencanaan program PKM, kemitraan, indikator keberhasilan, dokumentasi kegiatan, dan pelaporan dampak.',
    icon: BookOpenCheck,
  },
  {
    title: 'Pedoman Luaran dan Publikasi',
    description:
      'Standar luaran penelitian, publikasi ilmiah, HKI, prosiding, buku ajar, serta pelaporan capaian akademik.',
    icon: ClipboardCheck,
  },
  {
    title: 'Etika Penelitian',
    description:
      'Prinsip integritas akademik, sitasi, orisinalitas, pengelolaan data, persetujuan partisipan, dan konflik kepentingan.',
    icon: ShieldCheck,
  },
];

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

export default function PedomanContent() {
  return (
    <article className="space-y-10 sm:space-y-12">
      <SectionCard title="Panduan Teknis" eyebrow="Guidelines &amp; Standards">
        <div className="grid gap-6 md:grid-cols-2">
          {pedomanItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-premium hover:border-brand-navy/10 transition-all duration-300 group"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy flex-shrink-0 shadow-sm group-hover:bg-brand-gold transition-colors duration-300">
                  <Icon size={20} className="text-white group-hover:text-brand-navy transition-colors duration-300" aria-hidden="true" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-brand-navy group-hover:text-brand-gold transition-colors duration-300 leading-snug">{item.title}</h4>
                <p className="mt-3 text-xs sm:text-sm font-semibold leading-relaxed text-gray-500">{item.description}</p>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard title="Unduh Dokumen" eyebrow="Notice">
        <div className="p-5 rounded-2xl border border-brand-gold/20 bg-brand-gold/[0.02]">
          <div className="flex items-start gap-4">
            <Sparkles size={24} className="text-brand-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h4 className="text-sm font-bold text-brand-navy">Dokumen unduhan sedang disiapkan</h4>
              <p className="mt-2 text-xs sm:text-sm font-semibold leading-relaxed text-gray-500">
                Untuk permintaan pedoman resmi atau template proposal terbaru, silakan hubungi unit LPPM
                melalui halaman kontak.
              </p>
              <Link
                href="/kontak"
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-navy hover:text-brand-gold transition-colors"
              >
                Hubungi LPPM <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </SectionCard>
    </article>
  );
}
