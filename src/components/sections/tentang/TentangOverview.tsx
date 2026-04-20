import Link from 'next/link';
import { History, Target, Users, ShieldCheck, Building2, Landmark, ArrowRight } from 'lucide-react';

const sections = [
  {
    icon: History,
    title: 'Sejarah & Profil',
    desc: 'Perjalanan STTPU sejak 1987 hingga menjadi perguruan tinggi vokasi teknologi terkemuka di Jakarta.',
    href: '/tentang/sejarah',
  },
  {
    icon: Target,
    title: 'Visi, Misi & Nilai',
    desc: 'Arah, tujuan, dan nilai-nilai yang menjadi landasan setiap kegiatan akademik dan non-akademik STTPU.',
    href: '/tentang/visi-misi',
  },
  {
    icon: Users,
    title: 'Profil Pimpinan',
    desc: 'Kenali Ketua, Wakil Ketua, dan jajaran pimpinan yang mengelola STTPU dengan dedikasi penuh.',
    href: '/tentang/pimpinan',
  },
  {
    icon: ShieldCheck,
    title: 'Akreditasi & Legalitas',
    desc: 'Status akreditasi BAN-PT per program studi dan dokumen legalitas resmi institusi yang dapat diverifikasi.',
    href: '/tentang/akreditasi',
  },
  {
    icon: Landmark,
    title: 'Struktur Organisasi',
    desc: 'Bagan dan daftar pejabat struktural, kepala program studi, serta unit pelaksana teknis STTPU.',
    href: '/tentang/struktur-organisasi',
  },
  {
    icon: Building2,
    title: 'Fasilitas Kampus',
    desc: 'Laboratorium, perpustakaan, fasilitas olahraga, dan infrastruktur digital yang mendukung proses belajar.',
    href: '/tentang/fasilitas',
  },
];

const stats = [
  { value: '1987', label: 'Tahun Berdiri' },
  { value: '4', label: 'Program Studi' },
  { value: '3.000+', label: 'Alumni' },
  { value: 'Baik Sekali', label: 'Akreditasi Institusi' },
];

export default function TentangOverview() {
  return (
    <>
      <div className="bg-white border-b border-gray-200 px-6 py-2.5 text-sm">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-gray-500">
            <Link href="/" className="hover:text-[#1E3A5F] transition-colors">
              Beranda
            </Link>
            <span className="mx-2 text-gray-400">›</span>
            <span className="text-gray-700 font-medium">Tentang STTPU</span>
          </nav>
        </div>
      </div>

      <div className="bg-[#1E3A5F] text-white px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-extrabold text-3xl mb-2">Tentang STTPU</h1>
          <p className="text-white/85 text-sm leading-relaxed max-w-xl">
            Mengenal lebih dalam Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta — sejarah, visi,
            kepemimpinan, dan komitmen kami pada keunggulan pendidikan teknologi.
          </p>
        </div>
      </div>

      <section className="bg-white border-b border-gray-100 py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-6" aria-label="Statistik STTPU">
            {stats.map((stat) => (
              <li key={stat.label} className="text-center">
                <p className="font-extrabold text-2xl text-[#1E3A5F]">{stat.value}</p>
                <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-700 text-sm leading-relaxed max-w-3xl mb-10">
            Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta adalah perguruan tinggi vokasi
            yang berdedikasi menghasilkan tenaga ahli di bidang teknologi infrastruktur, konstruksi,
            dan pekerjaan umum. Didirikan sejak 1987, kami telah meluluskan ribuan alumni yang
            berkontribusi nyata bagi pembangunan Indonesia.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" aria-label="Navigasi halaman tentang">
            {sections.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex flex-col h-full p-5 bg-white border border-gray-200 rounded-xl hover:border-[#1E3A5F] hover:shadow-md transition-all"
                  >
                    <div
                      className="w-10 h-10 bg-[#1E3A5F]/10 group-hover:bg-[#1E3A5F] rounded-lg flex items-center justify-center mb-4 transition-colors"
                      aria-hidden="true"
                    >
                      <Icon size={18} className="text-[#1E3A5F] group-hover:text-[#F5A623] transition-colors" />
                    </div>
                    <h2 className="font-bold text-gray-900 text-sm mb-1.5">{item.title}</h2>
                    <p className="text-gray-500 text-xs leading-relaxed flex-1">{item.desc}</p>
                    <div className="flex items-center gap-1 text-[#1E3A5F] text-xs font-semibold mt-4 group-hover:gap-2 transition-all">
                      Selengkapnya
                      <ArrowRight size={13} aria-hidden="true" />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
