import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/motion/Reveal';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { kategoriLabel, formatTanggal, type Artikel } from '@/lib/data/berita';

export default function BeritaTerakhirSection({ artikelList }: { artikelList: Artikel[] }) {
  return (
    <section className="bg-white py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Reveal width="100%">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-12">
            <div className="max-w-3xl text-center md:text-left">
              <h2 className="text-brand-navy font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.2]">Warta & Inovasi</h2>
              <div className="w-16 h-1 bg-brand-gold rounded-full mt-6 mx-auto md:mx-0" />
              <p className="text-gray-500 mt-8 text-lg font-medium leading-relaxed">
                Eksplorasi pencapaian, publikasi ilmiah, dan dinamika kehidupan kampus di pusat keunggulan teknologi pekerjaan umum.
              </p>
            </div>
            <Link
              href="/berita"
              className="group hidden md:flex items-center gap-4 text-brand-navy font-bold text-[10px] uppercase tracking-widest hover:text-brand-gold transition-all duration-500"
            >
              Arsip Lengkap
              <div className="w-12 h-12 rounded-xl bg-brand-navy/5 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-navy transition-all duration-500 shadow-inner">
                <ArrowRight size={16} />
              </div>
            </Link>
          </div>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {artikelList.map((item) => (
            <StaggerItem key={item.slug}>
              <article
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover hover:-translate-y-2 active:scale-[0.99] transition-all duration-700 flex flex-col h-full"
              >
                <div className="h-52 bg-gray-100 relative overflow-hidden">
                  {item.thumbnailUrl ? (
                    <Image 
                      src={item.thumbnailUrl} 
                      alt={item.judul} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-brand-navy/[0.03]">
                      <span className="text-brand-navy/10 text-[9px] font-bold uppercase tracking-[0.3em] italic">STTPU News</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-navy/90 backdrop-blur-xl text-white text-[9px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg border border-white/10 shadow-2xl">
                      {kategoriLabel[item.kategori]}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                    <span>{formatTanggal(item.tanggalTerbit)}</span>
                    <div className="w-1 h-1 rounded-full bg-brand-gold" />
                    <span className="text-brand-navy/60">{item.penulis}</span>
                  </div>
                  <h3 className="font-bold text-brand-navy text-base leading-[1.4] mb-4 group-hover:text-brand-gold transition-colors line-clamp-2 tracking-tight">
                    {item.judul}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-6 line-clamp-3 font-medium">{item.ringkasan}</p>
                  
                  <div className="mt-auto pt-6 border-t border-gray-50">
                    <Link 
                      href={`/berita/${item.slug}`}
                      className="group/link inline-flex items-center gap-2 text-brand-navy font-bold text-[10px] uppercase tracking-widest hover:text-brand-gold transition-all duration-300"
                    >
                      Selengkapnya 
                      <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center mt-16 md:hidden">
          <Reveal>
            <Link
              href="/berita"
              className="group inline-flex items-center gap-4 bg-brand-navy text-white text-[10px] font-bold uppercase tracking-widest px-12 py-5 rounded-xl hover:bg-brand-gold hover:text-brand-navy shadow-2xl shadow-brand-navy/20 transition-all duration-500"
            >
              Arsip Lengkap
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
