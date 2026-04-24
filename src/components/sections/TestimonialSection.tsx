import Image from 'next/image';
import { getPayloadClient } from '@/lib/payload';
import { Reveal } from '@/components/ui/motion/Reveal';
import MotionWrapper from '@/components/ui/motion/MotionWrapper';

type TestimonialItem = {
  teks: string;
  nama: string;
  prodi: string;
  foto?: {
    url?: string;
    alt?: string;
  } | null;
}

export default async function TestimonialSection() {
  let items: TestimonialItem[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'testimonial',
      depth: 1,
      where: { status: { equals: 'aktif' } },
      sort: 'urutan',
      limit: 6,
    })
    items = result.docs as unknown as TestimonialItem[]
  } catch {
    // DB unavailable
  }

  if (items.length === 0) return null

  return (
    <section className="bg-white py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal width="100%">
          <div className="text-center mb-20">
            <h2 className="text-brand-navy font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.2]">Inspirasi Alumni</h2>
            <div className="w-16 h-1 bg-brand-gold rounded-full mx-auto mt-6" />
            <p className="text-gray-500 mt-8 text-lg font-medium max-w-3xl mx-auto leading-relaxed">
              Kisah nyata dari para sarjana terapan kami yang kini telah menjadi pilar utama dalam pembangunan infrastruktur strategis di seluruh penjuru Indonesia.
            </p>
          </div>
        </Reveal>
        
        <MotionWrapper 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          staggerChildren={0.15}
        >
          {items.map((item) => (
            <div key={item.nama} 
              className="group bg-gray-50 border border-gray-100 rounded-3xl p-12 relative hover:bg-brand-navy transition-all duration-700 hover:shadow-premium-hover hover:-translate-y-3 active:scale-[0.98] flex flex-col h-full"
            >
              <div className="text-7xl text-brand-gold absolute top-8 right-12 opacity-20 group-hover:opacity-10 transition-opacity font-serif italic">&rdquo;</div>
              
              <div className="flex-1 relative z-10">
                <p className="text-lg text-gray-500 leading-relaxed font-medium italic mb-16 group-hover:text-white/70 transition-colors duration-500">
                  &ldquo;{item.teks}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-6 mt-auto relative z-10">
                <div className="relative w-16 h-16 rounded-2xl bg-brand-gold flex-shrink-0 flex items-center justify-center overflow-hidden shadow-2xl shadow-brand-gold/20 group-hover:bg-white group-hover:scale-110 transition-all duration-700">
                  {item.foto?.url ? (
                    <Image
                      src={item.foto.url}
                      alt={item.foto.alt || item.nama}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-brand-navy text-[10px] font-black uppercase tracking-wider">
                      {item.nama
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-bold text-brand-navy text-lg group-hover:text-brand-gold transition-colors duration-500 tracking-tight">
                    {item.nama}
                  </p>
                  <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest group-hover:text-white/30 transition-colors duration-500 mt-1.5">
                    {item.prodi}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </MotionWrapper>
      </div>
    </section>
  );
}
