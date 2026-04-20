import Link from 'next/link';

export default function PageHeader() {
  return (
    <>
      <div className="bg-white border-b border-gray-200 px-6 py-2.5 text-sm">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-gray-500">
            <Link href="/" className="hover:text-[#1E3A5F] transition-colors">
              Beranda
            </Link>
            <span className="mx-2 text-gray-400">›</span>
            <span className="text-gray-700 font-medium">Kontak</span>
          </nav>
        </div>
      </div>

      <div className="bg-[#1E3A5F] text-white px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-extrabold text-3xl mb-2">Hubungi Kami</h1>
          <p className="text-white/85 text-sm leading-relaxed max-w-xl">
            Kami senang mendengar dari Anda. Temukan cara terbaik untuk menghubungi tim STTPU sesuai
            kebutuhan Anda.
          </p>
        </div>
      </div>
    </>
  );
}
