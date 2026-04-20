import Link from 'next/link';
import { Users, Trophy, Heart, BookOpen, ArrowRight, Flag } from 'lucide-react';

const sections = [
  { icon: Flag, title: 'Organisasi Mahasiswa', desc: 'BEM dan Senat Mahasiswa sebagai wadah aspirasi dan kepemimpinan.', href: '/kemahasiswaan/organisasi' },
  { icon: Users, title: 'Unit Kegiatan Mahasiswa', desc: '12 UKM aktif mencakup bidang olahraga, seni, riset, dan sosial kemasyarakatan.', href: '/kemahasiswaan/ukm' },
  { icon: Trophy, title: 'Prestasi Mahasiswa', desc: 'Rekam jejak pencapaian mahasiswa di kompetisi nasional dan internasional.', href: '/kemahasiswaan/prestasi' },
  { icon: Heart, title: 'Layanan Mahasiswa', desc: 'Bimbingan konseling, career center, kesehatan, dan layanan administrasi mahasiswa.', href: '/kemahasiswaan/layanan' },
  { icon: BookOpen, title: 'Panduan Mahasiswa Baru', desc: 'Panduan lengkap orientasi, sistem akademik, dan tips sukses perkuliahan di STTPU.', href: '/kemahasiswaan/mahasiswa-baru' },
];

const stats = [
  { value: '1.200+', label: 'Mahasiswa Aktif' },
  { value: '12', label: 'UKM Aktif' },
  { value: '45+', label: 'Prestasi/Tahun' },
  { value: '4', label: 'Organisasi Mahasiswa' },
];

export default function KemahasiswaanOverview() {
  return (
    <>
      <div className="bg-white border-b border-gray-200 px-6 py-2.5 text-sm">
        <div className="max-w-7xl mx-auto text-gray-500">
          <Link href="/" className="hover:text-[#1E3A5F] transition-colors">Beranda</Link>
          <span className="mx-2 text-gray-400">›</span>
          <span className="text-gray-700 font-medium">Kemahasiswaan</span>
        </div>
      </div>

      <div className="bg-[#1E3A5F] text-white px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-extrabold text-3xl mb-2">Kemahasiswaan</h1>
          <p className="text-white/85 text-sm leading-relaxed max-w-xl">
            Kehidupan kampus STTPU yang dinamis — dari organisasi dan UKM hingga layanan mahasiswa
            dan rekam prestasi yang membanggakan.
          </p>
        </div>
      </div>

      <section className="bg-white border-b border-gray-100 py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s) => (
              <li key={s.label} className="text-center">
                <p className="font-extrabold text-2xl text-[#1E3A5F]">{s.value}</p>
                <p className="text-gray-500 text-xs mt-1">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mb-10">
          STTPU percaya bahwa pendidikan terbaik tidak hanya terjadi di dalam kelas. Kehidupan
          kemahasiswaan yang aktif membentuk karakter, kepemimpinan, dan kompetensi lunak yang
          dibutuhkan di dunia kerja.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex flex-col h-full p-5 bg-white border border-gray-200 rounded-xl hover:border-[#1E3A5F] hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 bg-[#1E3A5F]/10 group-hover:bg-[#1E3A5F] rounded-lg flex items-center justify-center mb-4 transition-colors" aria-hidden="true">
                    <Icon size={18} className="text-[#1E3A5F] group-hover:text-[#F5A623] transition-colors" />
                  </div>
                  <h2 className="font-bold text-gray-900 text-sm mb-1.5">{item.title}</h2>
                  <p className="text-gray-500 text-xs leading-relaxed flex-1">{item.desc}</p>
                  <div className="flex items-center gap-1 text-[#1E3A5F] text-xs font-semibold mt-4 group-hover:gap-2 transition-all">
                    Selengkapnya <ArrowRight size={13} aria-hidden="true" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
