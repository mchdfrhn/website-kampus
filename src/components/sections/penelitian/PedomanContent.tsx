import Link from 'next/link';
import { ArrowRight, BookOpenCheck, ClipboardCheck, FileText, ShieldCheck } from 'lucide-react';

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

export default function PedomanContent() {
  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
      <div className="mb-12 text-center lg:mb-16 lg:text-left">
        <h2 className="text-brand-navy font-bold text-3xl md:text-4xl tracking-tight leading-[1.2]">
          Pedoman LPPM
        </h2>
        <div className="w-12 h-1 bg-brand-gold rounded-full mt-6 mx-auto lg:mx-0" />
        <p className="mt-8 text-gray-500 font-medium max-w-3xl leading-relaxed mx-auto lg:mx-0 text-sm md:text-base">
          Kumpulan acuan untuk kegiatan penelitian, pengabdian kepada masyarakat, luaran akademik,
          dan tata kelola etika riset di lingkungan STTPU Jakarta.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {pedomanItems.map((item) => {
          const Icon = item.icon;

          return (
            <section
              key={item.title}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-brand-navy hover:shadow-md"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy text-white">
                <Icon size={20} aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-brand-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">{item.description}</p>
            </section>
          );
        })}
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm font-semibold text-amber-900">Dokumen unduhan sedang disiapkan.</p>
        <p className="mt-2 text-sm leading-relaxed text-amber-800">
          Untuk permintaan pedoman resmi atau template proposal terbaru, silakan hubungi unit LPPM
          melalui halaman kontak.
        </p>
        <Link
          href="/kontak"
          className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-amber-900 underline transition-colors hover:text-brand-navy"
        >
          Hubungi LPPM <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
