import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';

type PimpinanItem = {
  jabatan: string
  nama: string
  nip?: string
  keahlian?: string
  pendidikan?: { jenjang: string }[]
  pengalaman?: string
  sambutan?: string
  urutan?: number
}

const defaults: PimpinanItem[] = [
  {
    jabatan: 'Ketua STTPU',
    nama: 'Prof. Dr. Ir. Bambang Setiawan, M.T.',
    nip: 'NIP 196208141988031002',
    keahlian: 'Rekayasa Struktur & Manajemen Konstruksi',
    pendidikan: [
      { jenjang: 'S3 Teknik Sipil — Universitas Indonesia' },
      { jenjang: 'S2 Teknik Sipil — Institut Teknologi Bandung' },
      { jenjang: 'S1 Teknik Sipil — Universitas Gadjah Mada' },
    ],
    pengalaman: 'Lebih dari 25 tahun berkecimpung di bidang pendidikan vokasi teknologi dan konsultansi konstruksi.',
    sambutan: 'Selamat datang di Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta. STTPU hadir dengan tekad kuat untuk mencetak generasi insinyur dan ahli teknologi yang tidak hanya kompeten secara teknis, tetapi juga memiliki karakter yang kuat dan cinta tanah air.',
    urutan: 0,
  },
  {
    jabatan: 'Wakil Ketua I Bidang Akademik',
    nama: 'Dr. Ir. Siti Rahayu, M.Sc.',
    nip: 'NIP 197003251996032001',
    keahlian: 'Teknik Lingkungan & Pengelolaan Sumber Daya Air',
    pendidikan: [
      { jenjang: 'S3 Environmental Engineering — Delft University of Technology, Belanda' },
      { jenjang: 'S2 Water Resources Management — UNESCO-IHE' },
      { jenjang: 'S1 Teknik Lingkungan — Institut Teknologi Bandung' },
    ],
    pengalaman: 'Pakar di bidang teknik lingkungan dan pengelolaan sumber daya air dengan pengalaman konsultansi proyek drainase perkotaan.',
    urutan: 1,
  },
  {
    jabatan: 'Wakil Ketua II Bidang Administrasi & Keuangan',
    nama: 'Drs. Hendra Wijaya, M.M.',
    nip: 'NIP 196511201990031003',
    keahlian: 'Manajemen Organisasi & Keuangan Publik',
    pendidikan: [
      { jenjang: 'S2 Magister Manajemen — Universitas Indonesia' },
      { jenjang: 'S1 Administrasi Negara — Universitas Padjadjaran' },
    ],
    pengalaman: 'Berpengalaman dalam pengelolaan administrasi perguruan tinggi dan manajemen keuangan lembaga pendidikan publik selama lebih dari 20 tahun.',
    urutan: 2,
  },
  {
    jabatan: 'Wakil Ketua III Bidang Kemahasiswaan & Alumni',
    nama: 'Dr. Ahmad Fauzi, S.T., M.T.',
    nip: 'NIP 197809152005011001',
    keahlian: 'Teknik Sipil — Geoteknik & Pondasi',
    pendidikan: [
      { jenjang: 'S3 Geoteknik — Institut Teknologi Bandung' },
      { jenjang: 'S2 Teknik Sipil — Institut Teknologi Bandung' },
      { jenjang: 'S1 Teknik Sipil — Universitas Diponegoro' },
    ],
    pengalaman: 'Aktif dalam pengembangan program kemahasiswaan dan jejaring alumni. Peneliti di bidang rekayasa geoteknik.',
    urutan: 3,
  },
]

export default async function PimpinanContent() {
  let pimpinan = defaults

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'pimpinan',
      sort: 'urutan',
      limit: 20,
    })
    // Jika query berhasil, gunakan data dari DB (walaupun kosong)
    pimpinan = result.docs as unknown as PimpinanItem[]
  } catch {
    // DB unavailable — use defaults
  }

  return (
    <article className="space-y-10">
      {pimpinan.map((person, idx) => (
        <section
          key={idx}
          className={`${idx === 0 ? 'border-2 border-[#1E3A5F]' : 'border border-gray-200'} rounded-xl overflow-hidden`}
        >
          <div className={`${idx === 0 ? 'bg-[#1E3A5F]' : 'bg-[#F0F4F8]'} px-6 py-3`}>
            <p
              className={`font-bold text-xs uppercase tracking-wide ${idx === 0 ? 'text-[#F5A623]' : 'text-[#1E3A5F]'}`}
            >
              {person.jabatan}
            </p>
          </div>

          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0">
                <div
                  className="w-24 h-28 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="text-gray-400 text-xs text-center px-2">Foto Resmi</span>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="font-bold text-lg text-gray-900 leading-tight">{person.nama}</h2>
                  {person.nip && <p className="text-gray-500 text-xs mt-0.5">{person.nip}</p>}
                  {person.keahlian && (
                    <p className="text-[#1E3A5F] text-sm font-medium mt-1">{person.keahlian}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {person.pendidikan && person.pendidikan.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <GraduationCap size={15} className="text-[#F5A623]" aria-hidden="true" />
                        <h3 className="font-semibold text-gray-800 text-sm">Riwayat Pendidikan</h3>
                      </div>
                      <ul className="space-y-1">
                        {person.pendidikan.map((edu, i) => (
                          <li key={i} className="text-gray-600 text-xs leading-relaxed flex items-start gap-2">
                            <span className="text-[#F5A623] mt-1" aria-hidden="true">•</span>
                            {edu.jenjang}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {person.pengalaman && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Award size={15} className="text-[#F5A623]" aria-hidden="true" />
                        <h3 className="font-semibold text-gray-800 text-sm">Pengalaman</h3>
                      </div>
                      <p className="text-gray-600 text-xs leading-relaxed">{person.pengalaman}</p>
                    </div>
                  )}
                </div>

                {person.sambutan && (
                  <div className="bg-[#F0F4F8] rounded-lg p-4 border-l-4 border-[#F5A623]">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen size={14} className="text-[#1E3A5F]" aria-hidden="true" />
                      <h3 className="font-semibold text-[#1E3A5F] text-sm">Sambutan Ketua</h3>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed italic">
                      &ldquo;{person.sambutan}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </article>
  );
}
