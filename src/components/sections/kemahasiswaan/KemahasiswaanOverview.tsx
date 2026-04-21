import Link from 'next/link';
import { Users, Trophy, Heart, BookOpen, ArrowRight, Flag } from 'lucide-react';
import BlueAbstractBackground from '@/components/ui/BlueAbstractBackground';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

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
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Breadcrumbs 
            customItems={[
              { label: 'Kemahasiswaan', href: '/kemahasiswaan' }
            ]} 
          />
        </div>
      </div>

      <div className="bg-brand-navy text-white px-6 py-16 relative overflow-hidden">
        <BlueAbstractBackground />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="font-bold text-3xl md:text-4xl mb-4 tracking-tight">Kemahasiswaan</h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
            Kehidupan kampus STTPU yang dinamis — dari organisasi dan UKM hingga layanan mahasiswa
            dan rekam prestasi yang membanggakan.
          </p>
        </div>
      </div>

      <section className="bg-white border-b border-gray-100 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((s) => (
              <li key={s.label} className="text-center">
                <p className="font-bold text-3xl text-brand-navy tracking-tight">{s.value}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mb-12 font-medium">
          STTPU percaya bahwa pendidikan terbaik tidak hanya terjadi di dalam kelas. Kehidupan
          kemahasiswaan yang aktif membentuk karakter, kepemimpinan, dan kompetensi lunak yang
          dibutuhkan di dunia kerja.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex flex-col h-full p-8 bg-white border border-gray-100 rounded-2xl hover:border-brand-navy hover:shadow-premium-hover hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gray-50 group-hover:bg-brand-navy rounded-xl flex items-center justify-center mb-6 transition-all duration-300" aria-hidden="true">
                    <Icon size={20} className="text-brand-navy group-hover:text-brand-gold transition-colors" />
                  </div>
                  <h2 className="font-bold text-brand-navy text-lg mb-3 tracking-tight group-hover:text-brand-gold transition-colors">{item.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 font-medium">{item.desc}</p>
                  <div className="flex items-center gap-2 text-[10px] text-brand-navy font-bold uppercase tracking-wider mt-6 group-hover:text-brand-gold transition-all">
                    Selengkapnya <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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
