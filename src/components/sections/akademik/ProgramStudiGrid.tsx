import Link from 'next/link';
import type { ProgramStudi } from '@/lib/data/program-studi';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import BlueAbstractBackground from '@/components/ui/BlueAbstractBackground';

import { cn } from '@/lib/utils';

const akreditasiColor: Record<string, string> = {
  Unggul: 'bg-green-50 text-green-700 border-green-100',
  'Baik Sekali': 'bg-brand-navy/5 text-brand-navy border-brand-navy/10',
  Baik: 'bg-yellow-50 text-yellow-700 border-yellow-100',
};

export default function ProgramStudiGrid({ prodiList }: { prodiList?: ProgramStudi[] }) {
  const list = prodiList ?? [];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="mb-12 text-center lg:mb-16 lg:text-left">
        <h2 className="text-brand-navy font-bold text-3xl md:text-4xl tracking-tight leading-[1.2]">Program Studi Unggulan</h2>
        <div className="w-12 h-1 bg-brand-gold rounded-full mt-6 mx-auto lg:mx-0" />
        <p className="mt-8 text-gray-500 font-medium max-w-3xl leading-relaxed mx-auto lg:mx-0 text-sm md:text-base">
          STTPU Jakarta menawarkan kurikulum vokasi berbasis teknologi yang dirancang khusus untuk menghasilkan sarjana terapan yang kompeten di sektor infrastruktur dan pekerjaan umum nasional.
        </p>
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 p-12 text-center text-gray-500">
          Data program studi belum tersedia.
        </div>
      ) : (
      <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-10" aria-label="Daftar program studi STTPU">
        {list.map((prodi) => (
          <li key={prodi.slug}>
            <Link
              href={`/akademik/program-studi/${prodi.slug}`}
              className="group flex flex-col h-full bg-white border border-gray-100 rounded-2xl p-5 sm:p-8 lg:p-10 hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-500"
            >
              <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-6 sm:mb-8">
                <span className="bg-brand-navy/5 text-brand-navy text-[10px] font-bold px-3 py-1.5 rounded-lg border border-brand-navy/10 uppercase tracking-wider">
                  {prodi.jenjang}
                </span>
                <span className={cn(
                  "text-[10px] font-bold px-3 py-1.5 rounded-lg border uppercase tracking-wider flex items-center gap-2",
                  akreditasiColor[prodi.akreditasi] ?? 'bg-gray-50 text-gray-500 border-gray-100'
                )}>
                  <ShieldCheck size={12} aria-hidden="true" />
                  Akreditasi {prodi.akreditasi}
                </span>
              </div>

              <h3 className="font-bold text-xl md:text-2xl text-brand-navy mb-4 group-hover:text-brand-gold transition-colors tracking-tight leading-tight">
                {prodi.nama}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-8 sm:mb-10 font-medium">
                {prodi.deskripsiSingkat}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 sm:mb-10">
                <div className="bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-100">
                  <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider mb-1">Masa Studi</p>
                  <p className="font-bold text-brand-navy text-sm tracking-tight">{prodi.masaStudi}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-100">
                  <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider mb-1">Beban SKS</p>
                  <p className="font-bold text-brand-navy text-sm tracking-tight">{prodi.jumlahSKS} SKS</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-brand-navy text-[10px] font-bold uppercase tracking-wider group-hover:gap-4 transition-all">
                Detail Kurikulum & Prospek
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
      )}

      <div className="bg-brand-navy rounded-3xl p-6 sm:p-8 lg:p-16 text-white relative overflow-hidden shadow-2xl shadow-brand-navy/20">
        <BlueAbstractBackground />
        <div className="relative z-10 flex flex-col items-start gap-8 sm:gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl text-center lg:text-left">
            <h3 className="font-bold text-2xl md:text-3xl mb-4 tracking-tight">Konsultasi Akademik</h3>
            <p className="text-white/60 text-base md:text-lg font-medium leading-relaxed">
              Tim akademik kami siap membantu Anda memilih program studi yang paling sesuai dengan visi karir Anda.
            </p>
          </div>
          <div className="flex w-full flex-col sm:w-auto sm:flex-row flex-wrap justify-center lg:justify-end gap-3 sm:gap-4">
            <Link
              href="/kontak"
              className="w-full sm:w-auto text-center bg-brand-gold text-brand-navy text-[10px] font-bold uppercase tracking-wider px-6 sm:px-8 py-4 rounded-xl hover:bg-white transition-all shadow-xl shadow-brand-gold/10"
            >
              Hubungi Kami
            </Link>
            <Link
              href="/akademik/beasiswa"
              className="w-full sm:w-auto text-center border-2 border-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-6 sm:px-8 py-4 rounded-xl hover:bg-white/10 transition-all"
            >
              Info Beasiswa
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
