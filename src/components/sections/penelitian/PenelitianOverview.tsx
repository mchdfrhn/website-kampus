import Link from 'next/link';
import { ArrowRight, FlaskConical, BookOpen, DollarSign } from 'lucide-react';

const stats = [
  { label: 'Peneliti Aktif', value: '42+' },
  { label: 'Unit Riset & Lab', value: '5' },
  { label: 'Publikasi (5 Tahun)', value: '120+' },
  { label: 'Hibah Diterima', value: '18' },
];

const sections = [
  {
    href: '/penelitian/unit',
    icon: FlaskConical,
    title: 'Unit Penelitian & Laboratorium',
    desc: 'Pusat riset terapan dan laboratorium penunjang yang mendukung kegiatan penelitian dosen dan mahasiswa STTPU.',
    cta: 'Lihat Unit & Lab',
  },
  {
    href: '/penelitian/publikasi',
    icon: BookOpen,
    title: 'Database Publikasi',
    desc: 'Kumpulan karya ilmiah, jurnal, prosiding, dan buku yang dihasilkan sivitas akademika STTPU.',
    cta: 'Lihat Publikasi',
  },
  {
    href: '/penelitian/hibah',
    icon: DollarSign,
    title: 'Hibah & Pendanaan',
    desc: 'Informasi skema hibah penelitian dari Kemendikti, PUPR, dan mitra industri yang tersedia bagi dosen STTPU.',
    cta: 'Lihat Hibah',
  },
];

export default function PenelitianOverview() {
  return (
    <>
      <div className="bg-[#1E3A5F] text-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-extrabold text-3xl mb-2">Penelitian & Pengabdian</h1>
          <p className="text-white/85 text-sm leading-relaxed max-w-xl">
            STTPU mendorong budaya riset terapan yang relevan dengan kebutuhan pembangunan infrastruktur
            dan pengelolaan sumber daya alam Indonesia.
          </p>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-[#1E3A5F]">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-3 gap-6">
          {sections.map((sec) => (
            <Link
              key={sec.href}
              href={sec.href}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-[#1E3A5F] hover:shadow-md transition-all flex flex-col"
            >
              <div className="w-10 h-10 rounded-lg bg-[#F0F4F8] flex items-center justify-center mb-4 group-hover:bg-[#1E3A5F] transition-colors">
                <sec.icon size={20} className="text-[#1E3A5F] group-hover:text-white transition-colors" aria-hidden="true" />
              </div>
              <h2 className="font-bold text-gray-900 text-sm mb-2">{sec.title}</h2>
              <p className="text-gray-500 text-xs leading-relaxed flex-1">{sec.desc}</p>
              <span className="inline-flex items-center gap-1 text-xs text-[#1E3A5F] font-semibold mt-4 group-hover:text-[#F5A623] transition-colors">
                {sec.cta} <ArrowRight size={12} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
