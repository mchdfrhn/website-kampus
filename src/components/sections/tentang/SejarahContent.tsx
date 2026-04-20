import { getPayloadClient } from '@/lib/payload';

type Milestone = { tahun: string; judul: string; deskripsi?: string }

const defaultMilestones: Milestone[] = [
  { tahun: '1987', judul: 'Pendirian STTPU', deskripsi: 'Sekolah Tinggi Teknologi Pekerjaan Umum didirikan atas prakarsa Kementerian Pekerjaan Umum sebagai lembaga pendidikan vokasi yang berfokus pada teknologi infrastruktur dan konstruksi.' },
  { tahun: '1995', judul: 'Akreditasi Pertama BAN-PT', deskripsi: 'STTPU berhasil meraih akreditasi dari Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT) untuk seluruh program studi yang ada.' },
  { tahun: '2003', judul: 'Pengembangan Program Studi Baru', deskripsi: 'Membuka program studi Teknik Pengairan dan Teknik Lingkungan sebagai respons terhadap kebutuhan tenaga ahli di bidang pengelolaan sumber daya air dan lingkungan hidup.' },
  { tahun: '2010', judul: 'Renovasi Kampus & Laboratorium', deskripsi: 'Pembangunan gedung baru dan laboratorium modern yang dilengkapi dengan peralatan mutakhir untuk mendukung kegiatan praktikum dan penelitian mahasiswa.' },
  { tahun: '2015', judul: 'Program Manajemen Konstruksi', deskripsi: 'Pembukaan program studi Manajemen Konstruksi (D-IV) sebagai wujud komitmen STTPU mengikuti kebutuhan industri konstruksi yang semakin berkembang.' },
  { tahun: '2020', judul: 'Transformasi Digital', deskripsi: 'Implementasi sistem pembelajaran daring dan pengembangan infrastruktur IT kampus sebagai respons terhadap era digitalisasi pendidikan tinggi.' },
  { tahun: '2024', judul: 'Akreditasi Unggul', deskripsi: 'Sejumlah program studi STTPU berhasil meraih akreditasi "Unggul" dari BAN-PT, menempatkan STTPU di antara perguruan tinggi vokasi teknologi terkemuka di Indonesia.' },
];

export default async function SejarahContent() {
  let milestones = defaultMilestones

  try {
    const payload = await getPayloadClient()
    const global = await payload.findGlobal({ slug: 'tentang-kami' })
    const data = global as unknown as { milestones?: Milestone[] }
    if (data.milestones && data.milestones.length > 0) {
      milestones = data.milestones
    }
  } catch {
    // DB unavailable — use defaults
  }

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
                  {item.tahun}
                </span>
                <h3 className="font-semibold text-gray-900 text-sm">{item.judul}</h3>
              </div>
              {item.deskripsi && (
                <p className="text-gray-600 text-sm leading-relaxed">{item.deskripsi}</p>
              )}
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
