import { getPayloadClient } from '@/lib/payload';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/motion/Reveal';
import { MotionList, MotionItem } from '@/components/ui/motion/MotionWrapper';

type Program = {
  jenjang: string;
  nama: string;
  deskripsiSingkat: string;
  akreditasi: string;
  thumbnail?: string | { url: string } | null;
}

const defaultPrograms: Program[] = [
  {
    jenjang: 'D4',
    nama: 'Teknik Konstruksi Gedung',
    deskripsiSingkat:
      'Mempelajari perencanaan, pelaksanaan, dan pengawasan konstruksi gedung dengan pendekatan teknologi terkini dan BIM.',
    akreditasi: 'B',
  },
  {
    jenjang: 'D4',
    nama: 'Teknik Arsitektur',
    deskripsiSingkat:
      'Desain arsitektur kontemporer yang memadukan estetika, fungsi, dan keberlanjutan lingkungan hidup.',
    akreditasi: 'B',
  },
  {
    jenjang: 'D4',
    nama: 'Teknologi Informasi',
    deskripsiSingkat:
      'Pengembangan sistem informasi, rekayasa perangkat lunak, dan infrastruktur TI untuk sektor publik dan swasta.',
    akreditasi: 'B',
  },
  {
    jenjang: 'D3',
    nama: 'Teknik Mesin',
    deskripsiSingkat:
      'Perancangan dan perawatan sistem mekanikal untuk industri konstruksi dan manufaktur nasional.',
    akreditasi: 'B',
  },
  {
    jenjang: 'D3',
    nama: 'Teknik Listrik',
    deskripsiSingkat:
      'Instalasi, pemeliharaan, dan perancangan sistem ketenagalistrikan untuk gedung dan infrastruktur publik.',
    akreditasi: 'B',
  },
  {
    jenjang: 'D4',
    nama: 'Teknik Lingkungan',
    deskripsiSingkat:
      'Pengelolaan lingkungan, sanitasi, dan teknologi pengolahan air bersih serta limbah untuk pembangunan berkelanjutan.',
    akreditasi: 'B',
  },
];

export default async function ProgramStudiSection() {
  let programs = defaultPrograms

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'program-studi',
      where: { status: { equals: 'aktif' } },
      limit: 6,
      sort: 'urutan',
      depth: 1,
    })
    if (result.docs.length > 0) {
      programs = result.docs as unknown as Program[]
    }
  } catch {
    // DB unavailable — use defaults
  }

  return (
    <section className="bg-brand-navy/[0.01] py-24 relative overflow-hidden">
      {/* Premium Background Accents */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-navy/[0.02] rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-brand-gold/[0.03] rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <Reveal width="100%">
          <div className="text-center mb-20">
            <h2 className="text-brand-navy font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.2]">Program Studi Unggulan</h2>
            <div className="w-20 h-1 bg-brand-gold rounded-full mx-auto mt-8" />
            <p className="text-gray-600 mt-8 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
              Mencetak tenaga ahli profesional yang siap membangun masa depan infrastruktur Indonesia dengan kompetensi teknis kelas dunia.
            </p>
          </div>
        </Reveal>

        <MotionList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {programs.map((program) => {
            const thumbUrl = typeof program.thumbnail === 'object' ? program.thumbnail?.url : null;
            
            return (
              <MotionItem key={program.nama}>
                <div
                  className="group bg-white border border-brand-navy/5 rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover hover:-translate-y-2 active:scale-[0.99] transition-all duration-700 ease-in-out flex flex-col h-full"
                >
                  <div className="h-64 bg-brand-navy/[0.02] relative overflow-hidden">
                    {thumbUrl ? (
                      <Image 
                        src={thumbUrl} 
                        alt={program.nama} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out" 
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/5 to-brand-gold/5 flex items-center justify-center">
                        <span className="text-brand-navy/10 text-[10px] font-bold uppercase tracking-[0.3em]">Institutional Vision</span>
                      </div>
                    )}
                    <div className="absolute top-5 left-5 backdrop-blur-xl bg-brand-navy/90 text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-white/10 shadow-2xl">
                      {program.jenjang}
                    </div>
                  </div>

                  <div className="p-10 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="font-bold text-brand-navy text-xl mb-5 group-hover:text-brand-gold transition-colors duration-500 tracking-tight leading-tight">
                        {program.nama}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 font-medium">
                        {program.deskripsiSingkat}
                      </p>
                    </div>

                    <div className="mt-10 pt-8 border-t border-brand-navy/[0.03] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-gold/10 border border-brand-gold/20">
                          <svg className="w-3 h-3 text-brand-gold-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                          Akreditasi <span className="text-brand-navy">{program.akreditasi}</span>
                        </span>
                      </div>
                      
                      <Link
                        href="/akademik/program-studi"
                        className="inline-flex items-center gap-2 text-brand-navy text-[10px] font-bold uppercase tracking-widest group/link hover:text-brand-gold transition-all duration-300"
                      >
                        Detail
                        <ArrowRight size={14} className="group-hover/link:translate-x-1.5 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              </MotionItem>
            )
          })}
        </MotionList>

        <Reveal width="100%" delay={0.5}>
          <div className="text-center mt-24">
            <Link
              href="/akademik/program-studi"
              className="group inline-flex items-center gap-4 bg-brand-navy text-white text-[11px] font-bold uppercase tracking-[0.15em] px-12 py-6 rounded-2xl hover:bg-brand-gold hover:text-brand-navy active:scale-95 shadow-2xl shadow-brand-navy/20 transition-all duration-500"
            >
              Lihat Semua Program Studi
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
