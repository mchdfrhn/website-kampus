import Link from 'next/link';
import type { ProgramStudi } from '@/lib/data/program-studi';
import { programStudiList as staticProdiList } from '@/lib/data/program-studi';
import { ArrowRight, ShieldCheck } from 'lucide-react';

const akreditasiColor: Record<string, string> = {
  Unggul: 'bg-green-100 text-green-800 border-green-200',
  'Baik Sekali': 'bg-blue-100 text-blue-800 border-blue-200',
  Baik: 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

const jenjangColor: Record<string, string> = {
  'D-IV': 'bg-[#1E3A5F]/10 text-[#1E3A5F]',
};

export default function ProgramStudiGrid({ prodiList }: { prodiList?: ProgramStudi[] }) {
  const list = prodiList ?? staticProdiList;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
          STTPU Jakarta menawarkan {list.length} program studi jenjang Diploma IV (D-IV)
          yang dirancang untuk menghasilkan sarjana terapan yang siap berkarir di sektor pekerjaan
          umum, konstruksi, dan infrastruktur nasional.
        </p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6" aria-label="Daftar program studi STTPU">
        {list.map((prodi) => (
          <li key={prodi.slug}>
            <Link
              href={`/akademik/program-studi/${prodi.slug}`}
              className="group flex flex-col h-full bg-white border border-gray-200 rounded-xl p-6 hover:border-[#1E3A5F] hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${jenjangColor[prodi.jenjang] ?? 'bg-gray-100 text-gray-700'}`}
                  >
                    {prodi.jenjang}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${akreditasiColor[prodi.akreditasi] ?? 'bg-gray-100 text-gray-700 border-gray-200'}`}
                  >
                    <ShieldCheck size={11} className="inline mr-1" aria-hidden="true" />
                    {prodi.akreditasi}
                  </span>
                </div>
              </div>

              <h2 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-[#1E3A5F] transition-colors">
                {prodi.nama}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5">
                {prodi.deskripsiSingkat}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-5 text-xs">
                <div className="bg-[#F0F4F8] rounded-lg p-3">
                  <p className="text-gray-500 mb-0.5">Masa Studi</p>
                  <p className="font-semibold text-gray-900">{prodi.masaStudi}</p>
                </div>
                <div className="bg-[#F0F4F8] rounded-lg p-3">
                  <p className="text-gray-500 mb-0.5">Total SKS</p>
                  <p className="font-semibold text-gray-900">{prodi.jumlahSKS} SKS</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[#1E3A5F] text-sm font-semibold group-hover:gap-3 transition-all">
                Lihat Detail Program
                <ArrowRight size={15} aria-hidden="true" />
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 bg-[#F0F4F8] rounded-xl p-6 border border-gray-200">
        <h2 className="font-bold text-[#1E3A5F] text-base mb-2">Butuh Informasi Lebih Lanjut?</h2>
        <p className="text-gray-600 text-sm mb-4">
          Hubungi Bagian Akademik STTPU untuk konsultasi pemilihan program studi yang sesuai dengan
          minat dan bakat Anda.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/kontak"
            className="inline-flex items-center gap-1.5 bg-[#1E3A5F] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#162d4a] transition-colors"
          >
            Hubungi Kami
          </Link>
          <Link
            href="/akademik/beasiswa"
            className="inline-flex items-center gap-1.5 border border-[#1E3A5F] text-[#1E3A5F] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1E3A5F]/5 transition-colors"
          >
            Lihat Beasiswa
          </Link>
        </div>
      </div>
    </section>
  );
}
