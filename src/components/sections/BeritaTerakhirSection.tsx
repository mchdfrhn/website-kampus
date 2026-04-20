import Link from 'next/link';
import Image from 'next/image';
import { kategoriLabel, formatTanggal, type Artikel } from '@/lib/data/berita';

export default function BeritaTerakhirSection({ artikelList }: { artikelList: Artikel[] }) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[#1E3A5F] font-extrabold text-3xl">Berita Terkini</h2>
          <div className="w-12 h-1 bg-[#F5A623] rounded mx-auto mt-3" />
          <p className="text-gray-500 mt-4 text-base">
            Ikuti perkembangan terbaru seputar kegiatan dan prestasi STTPU.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artikelList.map((item) => (
            <article
              key={item.slug}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="h-44 bg-gray-200 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                {item.thumbnailUrl ? (
                  <Image src={item.thumbnailUrl} alt={item.judul} fill className="object-cover" />
                ) : (
                  <span className="text-gray-400 text-sm italic">Foto Berita</span>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <span className="text-[#F5A623] text-xs font-bold uppercase tracking-wide mb-2">
                  {kategoriLabel[item.kategori]}
                </span>
                <h3 className="font-bold text-[#1E3A5F] text-sm leading-snug mb-2 flex-1">
                  {item.judul}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-3">{item.ringkasan}</p>
                <p className="text-gray-400 text-xs">
                  {formatTanggal(item.tanggalTerbit)} &bull; {item.penulis}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/berita"
            className="inline-block text-[#1E3A5F] border border-[#1E3A5F] font-bold px-8 py-3 rounded-lg hover:bg-[#1E3A5F] hover:text-white transition-colors"
          >
            Lihat Semua Berita &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
