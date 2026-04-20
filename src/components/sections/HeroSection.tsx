import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-[#1E3A5F] min-h-[520px] flex items-center relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(30,58,95,0.98) 40%, rgba(30,58,95,0.6) 80%, rgba(30,58,95,0.2) 100%)',
        }}
      />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-16 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 max-w-[600px]">
          <span className="inline-block bg-[#F5A623] text-[#1E3A5F] font-bold text-xs px-3 py-1 rounded-full mb-5">
            Sekolah Tinggi Teknologi
          </span>
          <h1 className="text-white text-4xl font-extrabold leading-tight mb-5">
            Teknologi untuk Indonesia yang Lebih Baik
          </h1>
          <p className="text-white/90 text-base leading-relaxed mb-8">
            Bergabunglah dengan ribuan alumni STTPU yang telah berkontribusi nyata bagi pembangunan
            Indonesia. Pendidikan vokasi teknologi terbaik di Jakarta Pusat sejak 1987.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/akademik/program-studi"
              className="bg-[#F5A623] text-[#1E3A5F] font-bold px-6 py-3 rounded-lg hover:bg-[#e09615] transition-colors"
            >
              Daftar Sekarang
            </Link>
            <Link
              href="/akademik/program-studi"
              className="border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Pelajari Program Studi
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <div className="w-full max-w-md h-72 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center">
            <p className="text-white/40 text-sm italic">Foto Kampus STTPU</p>
          </div>
        </div>
      </div>
    </section>
  );
}
