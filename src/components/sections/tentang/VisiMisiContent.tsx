import { Target, Compass, Star } from 'lucide-react';

const misi = [
  'Menyelenggarakan pendidikan vokasi berkualitas tinggi di bidang teknologi pekerjaan umum yang berorientasi pada kebutuhan industri dan perkembangan IPTEK.',
  'Melaksanakan penelitian terapan yang relevan dengan permasalahan pembangunan infrastruktur dan pekerjaan umum di Indonesia.',
  'Menjalin kemitraan strategis dengan pemerintah, industri, dan masyarakat untuk mengembangkan kompetensi lulusan yang berdaya saing.',
  'Membangun budaya akademik yang berintegritas, inovatif, dan berwawasan kebangsaan dalam mendukung pembangunan berkelanjutan.',
  'Mengembangkan tata kelola institusi yang profesional, transparan, dan akuntabel.',
];

const nilai = [
  {
    icon: Star,
    label: 'Integritas',
    desc: 'Bertindak jujur, transparan, dan konsisten antara ucapan dan perbuatan dalam setiap aktivitas akademik dan administratif.',
  },
  {
    icon: Target,
    label: 'Profesionalisme',
    desc: 'Menjalankan tugas dengan standar kompetensi tertinggi, bertanggung jawab, dan berorientasi pada hasil yang berkualitas.',
  },
  {
    icon: Compass,
    label: 'Inovasi',
    desc: 'Senantiasa mendorong kreativitas dan pemikiran baru untuk menghadapi tantangan pembangunan infrastruktur masa depan.',
  },
  {
    icon: Star,
    label: 'Kolaborasi',
    desc: 'Membangun sinergi yang konstruktif antara civitas akademika, industri, pemerintah, dan masyarakat luas.',
  },
  {
    icon: Target,
    label: 'Keberlanjutan',
    desc: 'Berkomitmen pada praktik pendidikan dan pembangunan yang memperhatikan keseimbangan lingkungan dan sosial.',
  },
  {
    icon: Compass,
    label: 'Kebangsaan',
    desc: 'Menjunjung tinggi nilai-nilai Pancasila dan berkontribusi nyata pada kemajuan dan kejayaan bangsa Indonesia.',
  },
];

const tujuan = [
  'Menghasilkan lulusan vokasi yang kompeten, berkarakter, dan siap berkontribusi pada pembangunan infrastruktur Indonesia.',
  'Menjadi pusat keunggulan riset terapan di bidang teknologi konstruksi, pengairan, lingkungan, dan manajemen infrastruktur.',
  'Memperkuat ekosistem kemitraan dengan dunia industri dan pemerintah untuk meningkatkan relevansi pendidikan.',
  'Mewujudkan tata kelola institusi yang berbasis good governance menuju perguruan tinggi vokasi kelas nasional.',
];

export default function VisiMisiContent() {
  return (
    <article className="space-y-10">
      <section className="bg-[#1E3A5F] rounded-xl p-7 text-white">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[#F5A623] rounded-lg flex items-center justify-center flex-shrink-0">
            <Compass size={20} className="text-[#1E3A5F]" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-bold text-lg mb-3">Visi</h2>
            <p className="text-white/90 leading-relaxed text-sm">
              Menjadi Sekolah Tinggi Teknologi Pekerjaan Umum yang unggul, inovatif, dan berdaya
              saing nasional dalam menghasilkan tenaga ahli teknologi infrastruktur yang berkompeten
              dan berkarakter pada tahun 2030.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#1E3A5F] mb-5">Misi</h2>
        <ol className="space-y-3" aria-label="Misi STTPU">
          {misi.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3.5 text-sm text-gray-700 leading-relaxed">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5A623]/15 text-[#1E3A5F] font-bold text-xs flex items-center justify-center mt-0.5"
                aria-hidden="true"
              >
                {idx + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#1E3A5F] mb-5">Tujuan</h2>
        <ul className="space-y-3" aria-label="Tujuan STTPU">
          {tujuan.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
              <span
                className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#F5A623] mt-2"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#1E3A5F] mb-5">Nilai-Nilai Kami</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Nilai-nilai STTPU">
          {nilai.map(({ icon: Icon, label, desc }) => (
            <li
              key={label}
              className="flex items-start gap-3 p-4 bg-[#F0F4F8] rounded-lg border border-gray-200"
            >
              <div
                className="w-9 h-9 bg-[#1E3A5F] rounded-lg flex items-center justify-center flex-shrink-0"
                aria-hidden="true"
              >
                <Icon size={16} className="text-[#F5A623]" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-1">{label}</p>
                <p className="text-gray-600 text-xs leading-relaxed">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
