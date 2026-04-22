import { getPayloadClient } from '@/lib/payload';
import { Reveal } from '@/components/ui/motion/Reveal';
import MotionWrapper from '@/components/ui/motion/MotionWrapper';

type LembagaItem = { nama: string; status: string }

export default async function AkreditasiSection() {
  let lembaga: LembagaItem[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'akreditasi-lembaga',
      sort: 'urutan',
      limit: 20,
    })
    lembaga = result.docs as unknown as LembagaItem[]
  } catch {
    // DB unavailable
  }

  if (lembaga.length === 0) return null

  return (
    <section className="bg-gray-50 py-20 lg:py-24 relative overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal width="100%">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-brand-navy font-bold text-3xl md:text-4xl tracking-tight leading-[1.2]">Akreditasi & Legalitas</h2>
            <div className="w-16 h-1 bg-brand-gold rounded-full mx-auto mt-6" />
            <p className="text-gray-500 mt-6 text-sm sm:text-base md:text-lg font-medium max-w-3xl mx-auto leading-relaxed">
              Menjamin mutu pendidikan melalui standarisasi nasional dan internasional yang diakui secara luas di sektor konstruksi.
            </p>
          </div>
        </Reveal>

        <MotionWrapper 
          className="grid grid-cols-1 justify-items-center min-[420px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8"
          staggerChildren={0.1}
        >
          {lembaga.map((item) => (
            <div
              key={item.nama}
              className="group w-full max-w-[18rem] bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 lg:p-10 text-center shadow-premium hover:shadow-premium-hover hover:-translate-y-2 active:scale-95 transition-all duration-700"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 mx-auto mb-6 sm:mb-8 rounded-2xl flex items-center justify-center border border-gray-100 group-hover:bg-brand-navy transition-all duration-700 shadow-inner overflow-hidden">
                <span className="px-2 text-center text-brand-navy/20 group-hover:text-white/20 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em]">{item.nama.split(' ')[0]}</span>
              </div>
              <h3 className="mx-auto max-w-[14rem] text-brand-navy font-bold text-xs sm:text-[11px] uppercase tracking-[0.14em] leading-relaxed mb-5 sm:mb-6 group-hover:text-brand-gold transition-colors break-words">
                {item.nama}
              </h3>
              <div className="inline-flex max-w-full items-center justify-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 bg-green-50 rounded-xl border border-green-100">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                <p className="text-green-700 font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.16em] leading-relaxed break-words">
                  {item.status}
                </p>
              </div>
            </div>
          ))}
        </MotionWrapper>
      </div>
    </section>
  );
}
