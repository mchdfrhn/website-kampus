import Link from 'next/link';
import type { ProgramStudi } from '@/lib/data/program-studi';
import { ShieldCheck, BookOpen, Briefcase, GraduationCap, Clock, Hash, ChevronRight, User } from 'lucide-react';
import BlueAbstractBackground from '@/components/ui/BlueAbstractBackground';
import { cn } from '@/lib/utils';

const akreditasiColor: Record<string, string> = {
  Unggul: 'bg-green-100 text-green-800 border-green-300',
  'Baik Sekali': 'bg-blue-100 text-blue-800 border-blue-300',
  Baik: 'bg-yellow-100 text-yellow-800 border-yellow-300',
};

export default function ProgramStudiDetailContent({
  prodi,
  others = [],
}: {
  prodi: ProgramStudi
  others?: ProgramStudi[]
}) {

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
      <article className="flex-1 min-w-0 space-y-10 sm:space-y-12 lg:space-y-16">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="bg-brand-navy/5 text-brand-navy text-[9px] font-bold px-3 py-1.5 rounded-lg border border-brand-navy/10 uppercase tracking-wider">
            Jenjang {prodi.jenjang}
          </span>
          <span className={cn(
            "text-[9px] font-bold px-3 py-1.5 rounded-lg border uppercase tracking-wider flex items-center gap-2",
            akreditasiColor[prodi.akreditasi] ?? 'bg-gray-50 text-gray-500 border-gray-100'
          )}>
            <ShieldCheck size={12} aria-hidden="true" />
            Akreditasi {prodi.akreditasi}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { icon: Clock, label: 'Masa Studi', value: prodi.masaStudi },
            { icon: Hash, label: 'Total Beban', value: `${prodi.jumlahSKS} SKS` },
            { icon: GraduationCap, label: 'Gelar Lulusan', value: prodi.gelarLulusan || '-' },
            { icon: ShieldCheck, label: 'Legalitas', value: prodi.berlakuHingga ? `s/d ${prodi.berlakuHingga.split(' ').pop()}` : '-' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 text-center hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mx-auto mb-4">
                <Icon size={20} className="text-brand-gold" aria-hidden="true" />
              </div>
              <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider mb-2">{label}</p>
              <p className="font-bold text-brand-navy text-sm leading-tight tracking-tight">{value}</p>
            </div>
          ))}
        </div>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-brand-navy mb-5 sm:mb-6 tracking-tight">Eksplorasi Program</h2>
          <div className="w-12 h-1 bg-brand-gold rounded-full mb-8" />
          {prodi.deskripsiHtml ? (
            <div
              className="prose prose-slate max-w-none prose-p:text-gray-600 prose-p:leading-relaxed prose-strong:text-brand-navy prose-strong:font-bold"
              dangerouslySetInnerHTML={{ __html: prodi.deskripsiHtml }}
            />
          ) : (
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-medium">{prodi.deskripsi}</p>
          )}
        </section>

        <section className="bg-brand-navy rounded-3xl p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl shadow-brand-navy/20">
           <BlueAbstractBackground />
           <div className="relative z-10">
            <h2 className="font-bold text-xl sm:text-2xl mb-4 tracking-tight">Visi & Misi</h2>
            <div className="w-12 h-1 bg-brand-gold rounded-full mb-8 sm:mb-10" />
            
            <div className="space-y-10">
              <div>
                <p className="text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-4">Visi Strategis</p>
                <p className="text-white/80 text-base sm:text-lg leading-relaxed font-medium italic">&ldquo;{prodi.visi}&rdquo;</p>
              </div>
              
              <div>
                <p className="text-brand-gold text-[10px] font-bold uppercase tracking-wider mb-6">Misi Operasional</p>
                <ol className="space-y-4">
                  {prodi.misi.map((m, i) => (
                    <li key={i} className="flex items-start gap-4 sm:gap-5 text-sm sm:text-base text-white/70 group">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 text-brand-gold font-bold text-xs flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-navy transition-all">
                        {(i + 1).toString().padStart(2, '0')}
                      </span>
                      <span className="font-medium leading-relaxed">{m}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
           </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section>
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center">
                <GraduationCap size={20} className="text-brand-gold" aria-hidden="true" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-brand-navy tracking-tight">Kompetensi</h2>
            </div>
            <ul className="space-y-4">
              {prodi.kompetensiLulusan.map((k, i) => (
                <li key={i} className="flex items-start gap-4 text-sm text-gray-600 leading-relaxed group">
                  <ChevronRight size={14} className="text-brand-gold mt-1 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  <span className="font-medium">{k}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center">
                <Briefcase size={20} className="text-brand-gold" aria-hidden="true" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-brand-navy tracking-tight">Prospek Karir</h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {prodi.prospekKarir.map((k, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm text-brand-navy font-bold hover:bg-brand-navy hover:text-white transition-all cursor-default"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0" aria-hidden="true" />
                  {k}
                </div>
              ))}
            </div>
          </section>
        </div>

        <section>
          <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center">
              <BookOpen size={20} className="text-brand-gold" aria-hidden="true" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-brand-navy tracking-tight">Struktur Kurikulum</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prodi.kurikulum.map((sem) => (
              <details
                key={sem.semester}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden group transition-all"
                open={sem.semester <= 2}
              >
                <summary className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 cursor-pointer select-none hover:bg-gray-50 transition-all list-none">
                  <span className="font-bold text-brand-navy text-[11px] uppercase tracking-wider">
                    Semester {sem.semester.toString().padStart(2, '0')}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-open:rotate-90 transition-all">
                    <ChevronRight size={14} className="text-brand-navy" aria-hidden="true" />
                  </div>
                </summary>
                <div className="px-5 sm:px-8 pb-6 sm:pb-8 pt-2 border-t border-gray-50">
                  <ul className="space-y-3">
                    {sem.mataKuliah.map((mk, i) => (
                      <li key={i} className="flex items-center gap-4 text-[11px] font-bold text-gray-500">
                        <div className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" aria-hidden="true" />
                        {mk}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
          <div className="mt-10 sm:mt-12 p-5 sm:p-8 bg-gray-50 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 border border-gray-100">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider text-center md:text-left">
              * Kurikulum berbasis standar kompetensi nasional (SKKNI).
            </p>
            <a
              href={prodi.kurikulumPdfUrl || '#'}
              target={prodi.kurikulumPdfUrl ? '_blank' : undefined}
              rel={prodi.kurikulumPdfUrl ? 'noopener noreferrer' : undefined}
              className="w-full md:w-auto justify-center bg-brand-navy text-white text-[10px] font-bold uppercase tracking-wider px-6 sm:px-8 py-4 rounded-xl hover:bg-brand-navy/90 transition-all shadow-xl shadow-brand-navy/10 flex items-center gap-2"
            >
              Unduh Kurikulum (PDF)
              <ChevronRight size={14} />
            </a>
          </div>
        </section>
      </article>

      <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">
        <div className="bg-brand-gold rounded-3xl p-6 sm:p-8 lg:p-10 text-brand-navy relative overflow-hidden shadow-2xl shadow-brand-gold/10 group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
          <p className="font-bold text-xl mb-4 tracking-tight">Mulai Karir Anda</p>
          <p className="text-brand-navy/60 text-xs mb-7 sm:mb-10 leading-relaxed font-bold uppercase tracking-wider">
            Pendaftaran Mahasiswa Baru angkatan 2024/2025 telah dibuka secara online.
          </p>
          <a
            href="https://pmb.sttpu.ac.id"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-brand-navy text-white font-bold text-xs uppercase tracking-wider py-5 rounded-xl hover:scale-[1.02] transition-all shadow-xl shadow-brand-navy/10"
          >
            Website PMB
          </a>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xl shadow-brand-navy/5">
          <div className="bg-gray-50 px-5 sm:px-8 py-5 sm:py-6 border-b border-gray-100">
            <p className="font-bold text-brand-navy text-[11px] uppercase tracking-wider">Program Studi Lain</p>
          </div>
          <ul className="divide-y divide-gray-50">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/akademik/program-studi/${p.slug}`}
                  className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 text-[11px] font-bold uppercase tracking-wider text-gray-400 hover:text-brand-gold hover:bg-gray-50 transition-all group"
                >
                  <span className="line-clamp-1">{p.nama}</span>
                  <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex-shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-brand-navy/5 text-center">
          <div className="w-16 h-16 rounded-full bg-brand-navy/5 flex items-center justify-center mx-auto mb-6">
            <User size={24} className="text-brand-navy" />
          </div>
          <p className="font-bold text-brand-navy text-sm mb-3 tracking-tight">Layanan Informasi</p>
          <p className="text-gray-400 text-xs mb-8 leading-relaxed font-bold uppercase tracking-wider">
            Konsultasikan rencana studi Anda dengan tim akademik kami.
          </p>
          <Link
            href="/kontak"
            className="flex items-center justify-center w-full border-2 border-brand-navy text-brand-navy font-bold text-[10px] uppercase tracking-wider py-4 rounded-xl hover:bg-brand-navy hover:text-white transition-all"
          >
            Hubungi Kami
          </Link>
        </div>
      </aside>
    </div>
  );
}
