import { getPayloadClient } from '@/lib/payload';
import { Reveal } from '@/components/ui/motion/Reveal';
import MotionWrapper from '@/components/ui/motion/MotionWrapper';
import ImageWithLoading from '@/components/ui/media/ImageWithLoading';

type LembagaItem = {
  nama: string;
  status: string;
  logo?: { url?: string | null } | null;
}

export default async function AkreditasiSection() {
  let lembaga: LembagaItem[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'akreditasi-lembaga',
      sort: 'urutan',
      limit: 20,
      depth: 1,
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
          className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
          staggerChildren={0.1}
        >
          {lembaga.map((item) => {
            const logoUrl = typeof item.logo === 'object' ? item.logo?.url : null;

            return (
              <div
                key={item.nama}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-premium transition-all duration-500 hover:-translate-y-1 hover:border-brand-navy/15 hover:shadow-premium-hover active:scale-[0.99] sm:p-6"
              >
                <span className="absolute inset-x-0 top-0 h-1 bg-brand-navy" aria-hidden="true" />
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-xl border border-gray-100 bg-gray-50">
                  {logoUrl ? (
                    <div className="relative h-14 w-14">
                      <ImageWithLoading
                        src={logoUrl}
                        alt={item.nama}
                        fill
                        sizes="56px"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span className="px-2 text-center text-[10px] font-bold uppercase tracking-wider text-brand-navy/35">
                      {item.nama.split(' ')[0]}
                    </span>
                  )}
                </div>
                <p className="mx-auto mb-4 line-clamp-2 max-w-[14rem] text-xs font-bold uppercase leading-relaxed tracking-wider text-brand-navy transition-colors group-hover:text-brand-gold">
                  {item.nama}
                </p>
                <div className="mt-auto inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1.5">
                  <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" />
                  <p className="break-words text-[10px] font-bold uppercase leading-none tracking-wider text-green-700">
                    {item.status}
                  </p>
                </div>
              </div>
            );
          })}
        </MotionWrapper>
      </div>
    </section>
  );
}
