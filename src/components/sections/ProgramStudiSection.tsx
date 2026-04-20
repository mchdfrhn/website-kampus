import Link from 'next/link';
import { getPayloadClient } from '@/lib/payload';

type Program = {
  jenjang: string;
  nama: string;
  deskripsiSingkat: string;
  akreditasi: string;
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
    })
    if (result.docs.length > 0) {
      programs = result.docs as unknown as Program[]
    }
  } catch {
    // DB unavailable — use defaults
  }

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[#1E3A5F] font-extrabold text-3xl">Program Studi</h2>
          <div className="w-12 h-1 bg-[#F5A623] rounded mx-auto mt-3" />
          <p className="text-gray-500 mt-4 text-base max-w-xl mx-auto">
            Pilih program studi sesuai minat dan karir impianmu bersama STTPU Jakarta.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div
              key={program.nama}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col"
            >
              <div className="h-32 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm italic">Foto {program.nama}</span>
              </div>
              <div className="p-5 flex-1">
                <span className="inline-block bg-blue-50 text-[#1E3A5F] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {program.jenjang}
                </span>
                <h3 className="font-bold text-[#1E3A5F] text-base mb-2">{program.nama}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{program.deskripsiSingkat}</p>
              </div>
              <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  Akreditasi {program.akreditasi}
                </span>
                <Link
                  href="/akademik/program-studi"
                  className="text-[#1E3A5F] border border-[#1E3A5F] text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-[#1E3A5F] hover:text-white transition-colors"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/akademik/program-studi"
            className="inline-block bg-[#1E3A5F] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#162d4a] transition-colors"
          >
            Lihat Semua Program Studi
          </Link>
        </div>
      </div>
    </section>
  );
}
