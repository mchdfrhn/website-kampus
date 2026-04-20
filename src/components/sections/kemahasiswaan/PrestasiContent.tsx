import { Trophy, Calendar } from 'lucide-react';

type Tingkat = 'Nasional' | 'Internasional' | 'Regional';

const tingkatColor: Record<Tingkat, string> = {
  Internasional: 'bg-purple-100 text-purple-800 border-purple-200',
  Nasional: 'bg-blue-100 text-blue-800 border-blue-200',
  Regional: 'bg-green-100 text-green-800 border-green-200',
};

const prestasiList: {
  judul: string;
  mahasiswa: string[];
  prodi: string;
  penyelenggara: string;
  peringkat: string;
  tingkat: Tingkat;
  tahun: number;
  deskripsi: string;
}[] = [
  {
    judul: 'Kompetisi Beton Nasional',
    mahasiswa: ['Arief Budiman', 'Dewi Anggraeni', 'Fajar Nugroho', 'Putri Ramadhani'],
    prodi: 'Teknik Sipil',
    penyelenggara: 'ITS Surabaya',
    peringkat: 'Juara II',
    tingkat: 'Nasional',
    tahun: 2026,
    deskripsi: 'Merancang campuran beton kuat tekan 42 MPa dengan substitusi 20% abu sekam padi.',
  },
  {
    judul: 'Program Kreativitas Mahasiswa (PKM-RE)',
    mahasiswa: ['Bima Sakti', 'Laila Nur', 'Reza Firmansyah'],
    prodi: 'Teknik Lingkungan',
    penyelenggara: 'Kemendikbudristek RI',
    peringkat: 'Lolos Pendanaan DIKTI',
    tingkat: 'Nasional',
    tahun: 2025,
    deskripsi: 'Penelitian pemanfaatan eceng gondok sebagai biofilter alami untuk pengolahan air limbah domestik.',
  },
  {
    judul: 'Kontes Robot Nasional PUPR',
    mahasiswa: ['Hendra Wijaya', 'Sari Permata', 'Tegar Prasetyo'],
    prodi: 'Teknik Sipil',
    penyelenggara: 'Kementerian PUPR',
    peringkat: 'Finalis Top 10',
    tingkat: 'Nasional',
    tahun: 2025,
    deskripsi: 'Mengembangkan prototipe robot inspeksi jembatan berbasis sensor ultrasonik dan kamera.',
  },
  {
    judul: 'Lomba Karya Tulis Ilmiah (LKTI) Teknik Lingkungan',
    mahasiswa: ['Maya Sari', 'Dito Nugroho'],
    prodi: 'Teknik Lingkungan',
    penyelenggara: 'Universitas Indonesia',
    peringkat: 'Juara I',
    tingkat: 'Nasional',
    tahun: 2025,
    deskripsi: 'Karya tulis mengenai sistem pemantauan kualitas air sungai berbasis IoT untuk kota-kota Indonesia.',
  },
  {
    judul: 'Kompetisi Estimasi Biaya Konstruksi',
    mahasiswa: ['Fiqri Ramadan', 'Anisa Dewi', 'Yoga Pratama'],
    prodi: 'Manajemen Konstruksi',
    penyelenggara: 'Universitas Tarumanagara',
    peringkat: 'Juara III',
    tingkat: 'Regional',
    tahun: 2025,
    deskripsi: 'Kompetisi estimasi RAB gedung 5 lantai sesuai standar SNI dan Perpres pengadaan.',
  },
  {
    judul: 'Olimpiade Mahasiswa Bidang Sipil',
    mahasiswa: ['Rini Astuti', 'Bagas Wicaksono'],
    prodi: 'Teknik Sipil',
    penyelenggara: 'FTSL ITB',
    peringkat: 'Juara II',
    tingkat: 'Nasional',
    tahun: 2025,
    deskripsi: 'Olimpiade bidang mekanika rekayasa dan analisis struktur tingkat mahasiswa vokasi.',
  },
  {
    judul: 'International Water Engineering Student Competition',
    mahasiswa: ['Surya Ardiansyah', 'Nurul Hidayah'],
    prodi: 'Teknik Pengairan',
    penyelenggara: 'IHE Delft (Online)',
    peringkat: 'Top 20 Finalis',
    tingkat: 'Internasional',
    tahun: 2025,
    deskripsi: 'Kompetisi desain sistem irigasi mikro untuk lahan pertanian marginal di negara berkembang.',
  },
  {
    judul: 'Kejuaraan Pencak Silat Mahasiswa DKI Jakarta',
    mahasiswa: ['Galih Permana', 'Ayu Fitriani'],
    prodi: 'Teknik Sipil / Manajemen Konstruksi',
    penyelenggara: 'IPSI DKI Jakarta',
    peringkat: 'Juara III',
    tingkat: 'Regional',
    tahun: 2025,
    deskripsi: 'Meraih medali perunggu di kategori tanding putra-putri kelas menengah.',
  },
];

export default function PrestasiContent() {
  const byYear = prestasiList.reduce<Record<number, typeof prestasiList>>(
    (acc, p) => { (acc[p.tahun] ??= []).push(p); return acc; },
    {},
  );
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a);

  return (
    <article className="space-y-10">
      <div className="grid grid-cols-3 gap-4">
        {(['Nasional', 'Internasional', 'Regional'] as Tingkat[]).map((t) => (
          <div key={t} className="text-center bg-[#F0F4F8] rounded-xl p-4 border border-gray-200">
            <p className="font-extrabold text-2xl text-[#1E3A5F]">
              {prestasiList.filter((p) => p.tingkat === t).length}
            </p>
            <p className="text-gray-500 text-xs mt-1">Prestasi {t}</p>
          </div>
        ))}
      </div>

      {years.map((year) => (
        <section key={year}>
          <h2 className="font-bold text-[#1E3A5F] text-base mb-4 flex items-center gap-2">
            <Calendar size={16} className="text-[#F5A623]" aria-hidden="true" /> Tahun {year}
          </h2>
          <ul className="space-y-4">
            {byYear[year].map((p, idx) => (
              <li key={idx} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#1E3A5F] hover:shadow-sm transition-all">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Trophy size={16} className="text-[#F5A623] flex-shrink-0" aria-hidden="true" />
                    <h3 className="font-bold text-gray-900 text-sm">{p.judul}</h3>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tingkatColor[p.tingkat]}`}>
                      {p.tingkat}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F5A623]/20 text-[#1E3A5F] border border-[#F5A623]/30">
                      {p.peringkat}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed mb-3">{p.deskripsi}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-gray-500">
                  <span><span className="font-semibold">Tim:</span> {p.mahasiswa.join(', ')}</span>
                  <span><span className="font-semibold">Prodi:</span> {p.prodi}</span>
                  <span><span className="font-semibold">Penyelenggara:</span> {p.penyelenggara}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}
