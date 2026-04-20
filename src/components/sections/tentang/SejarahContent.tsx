const milestones = [
  {
    year: '1987',
    title: 'Pendirian STTPU',
    description:
      'Sekolah Tinggi Teknologi Pekerjaan Umum didirikan atas prakarsa Kementerian Pekerjaan Umum sebagai lembaga pendidikan vokasi yang berfokus pada teknologi infrastruktur dan konstruksi.',
  },
  {
    year: '1995',
    title: 'Akreditasi Pertama BAN-PT',
    description:
      'STTPU berhasil meraih akreditasi dari Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT) untuk seluruh program studi yang ada, menandai pengakuan resmi kualitas pendidikan.',
  },
  {
    year: '2003',
    title: 'Pengembangan Program Studi Baru',
    description:
      'Membuka program studi Teknik Pengairan dan Teknik Lingkungan sebagai respons terhadap kebutuhan tenaga ahli di bidang pengelolaan sumber daya air dan lingkungan hidup.',
  },
  {
    year: '2010',
    title: 'Renovasi Kampus & Laboratorium',
    description:
      'Pembangunan gedung baru dan laboratorium modern yang dilengkapi dengan peralatan mutakhir untuk mendukung kegiatan praktikum dan penelitian mahasiswa.',
  },
  {
    year: '2015',
    title: 'Program Manajemen Konstruksi',
    description:
      'Pembukaan program studi Manajemen Konstruksi (D-IV) sebagai wujud komitmen STTPU mengikuti kebutuhan industri konstruksi yang semakin berkembang.',
  },
  {
    year: '2020',
    title: 'Transformasi Digital',
    description:
      'Implementasi sistem pembelajaran daring dan pengembangan infrastruktur IT kampus sebagai respons terhadap era digitalisasi pendidikan tinggi.',
  },
  {
    year: '2024',
    title: 'Akreditasi Unggul',
    description:
      'Sejumlah program studi STTPU berhasil meraih akreditasi "Unggul" dari BAN-PT, menempatkan STTPU di antara perguruan tinggi vokasi teknologi terkemuka di Indonesia.',
  },
];

export default function SejarahContent() {
  return (
    <article>
      <section className="mb-10">
        <h2 className="text-xl font-bold text-[#1E3A5F] mb-4">Tentang Kami</h2>
        <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-4 text-sm">
          <p>
            Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta adalah perguruan tinggi vokasi
            yang berdedikasi menghasilkan tenaga ahli di bidang teknologi infrastruktur, konstruksi,
            dan pekerjaan umum. Berdiri sejak 1987 atas inisiatif Kementerian Pekerjaan Umum,
            STTPU hadir untuk menjawab kebutuhan nasional akan sumber daya manusia yang kompeten
            dan siap kerja di sektor pembangunan infrastruktur Indonesia.
          </p>
          <p>
            Selama lebih dari tiga dekade, STTPU telah meluluskan ribuan alumni yang tersebar di
            berbagai instansi pemerintah, BUMN, dan perusahaan swasta nasional maupun multinasional.
            Alumni STTPU dikenal sebagai tenaga profesional yang memiliki kompetensi teknis kuat,
            etos kerja tinggi, dan kemampuan adaptasi yang baik di lapangan.
          </p>
          <p>
            Berlokasi di Jakarta — jantung pengambilan keputusan dan pusat industri konstruksi
            nasional — STTPU memiliki akses strategis ke proyek-proyek infrastruktur skala nasional
            yang menjadi laboratorium pembelajaran nyata bagi mahasiswa.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#1E3A5F] mb-6">Perjalanan Kami</h2>
        <ol className="relative border-l-2 border-[#1E3A5F]/20 space-y-0" aria-label="Tonggak sejarah STTPU">
          {milestones.map((item, idx) => (
            <li key={idx} className="ml-6 pb-8 last:pb-0">
              <span
                className="absolute -left-[11px] flex items-center justify-center w-5 h-5 rounded-full bg-[#1E3A5F] border-2 border-white"
                aria-hidden="true"
              />
              <div className="mb-1 flex items-center gap-3">
                <span className="inline-block bg-[#F5A623] text-[#1E3A5F] font-bold text-xs px-2.5 py-0.5 rounded">
                  {item.year}
                </span>
                <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
