import { getPayloadClient } from '@/lib/payload';
import Link from 'next/link';
import Image from 'next/image';
import { resolveProgramStudiAccentColor } from '@/lib/data/program-studi';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/motion/Reveal';
import { MotionList, MotionItem } from '@/components/ui/motion/MotionWrapper';
import { cn } from '@/lib/utils';

type Program = {
  slug?: string;
  jenjang: string;
  nama: string;
  accentColor?: string;
  deskripsiSingkat: string;
  akreditasi: string;
  thumbnail?: string | { url: string } | null;
}

const accentTheme: Record<string, {
  card: string;
  badge: string;
  accreditation: string;
  cta: string;
  tint: string;
}> = {
  navy: {
    card: 'border-brand-navy/8 bg-gradient-to-br from-white via-brand-mist/25 to-white',
    badge: 'bg-brand-navy/5 text-brand-navy border-brand-navy/10',
    accreditation: 'bg-brand-navy/[0.03] border-brand-navy/10 text-brand-navy',
    cta: 'text-brand-navy',
    tint: 'from-brand-navy/5 to-brand-gold/5',
  },
  blue: {
    card: 'border-sky-100 bg-gradient-to-br from-white via-sky-50/80 to-white',
    badge: 'bg-sky-50 text-sky-800 border-sky-200',
    accreditation: 'bg-sky-50/70 border-sky-100 text-sky-900',
    cta: 'text-sky-800',
    tint: 'from-sky-100 to-sky-50/80',
  },
  green: {
    card: 'border-emerald-100 bg-gradient-to-br from-white via-emerald-50/80 to-white',
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    accreditation: 'bg-emerald-50/70 border-emerald-100 text-emerald-900',
    cta: 'text-emerald-800',
    tint: 'from-emerald-100 to-emerald-50/80',
  },
  orange: {
    card: 'border-orange-100 bg-gradient-to-br from-white via-orange-50/80 to-white',
    badge: 'bg-orange-50 text-orange-800 border-orange-200',
    accreditation: 'bg-orange-50/70 border-orange-100 text-orange-900',
    cta: 'text-orange-800',
    tint: 'from-orange-100 to-orange-50/80',
  },
};

export default async function ProgramStudiSection() {
  let programs: Program[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'program-studi',
      where: { status: { equals: 'aktif' } },
      limit: 6,
      sort: 'urutan',
      depth: 1,
    })
    programs = result.docs as unknown as Program[]
  } catch {
    // DB unavailable
  }

  if (programs.length === 0) return null

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
            const accent = accentTheme[resolveProgramStudiAccentColor(program.nama, program.accentColor)] ?? accentTheme.navy;
            
            return (
              <MotionItem key={program.nama}>
                <div
                  className={cn(
                    'group rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover hover:-translate-y-2 active:scale-[0.99] transition-all duration-700 ease-in-out flex flex-col h-full border',
                    accent.card,
                  )}
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
                      <div className={`absolute inset-0 bg-gradient-to-br ${accent.tint} flex items-center justify-center`}>
                        <span className="text-brand-navy/10 text-[10px] font-bold uppercase tracking-[0.3em]">Institutional Vision</span>
                      </div>
                    )}
                    <div className={cn(
                      'absolute top-5 left-5 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border shadow-lg',
                      accent.badge,
                    )}>
                      {program.jenjang}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-brand-navy/10 via-brand-navy/0 to-transparent" />
                  </div>

                  <div className="p-10 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="mb-5 text-xl font-bold leading-tight tracking-tight">
                        <Link
                          href={program.slug ? `/akademik/program-studi/${program.slug}` : '/akademik/program-studi'}
                          className="text-brand-navy transition-colors duration-500 hover:text-brand-gold"
                        >
                          {program.nama}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 font-medium">
                        {program.deskripsiSingkat}
                      </p>
                    </div>

                    <div className="mt-10 pt-8 border-t border-brand-navy/[0.03] flex items-center justify-between">
                      <div className={cn(
                        'flex items-center gap-3 rounded-full border px-3 py-2',
                        accent.accreditation,
                      )}>
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/60 border border-white/60">
                          <svg className="w-3 h-3 text-brand-gold-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          Akreditasi {program.akreditasi}
                        </span>
                      </div>
                      
                      <Link
                        href={program.slug ? `/akademik/program-studi/${program.slug}` : '/akademik/program-studi'}
                        className={cn(
                          'inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest group/link hover:text-brand-gold transition-all duration-300',
                          accent.cta,
                        )}
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
