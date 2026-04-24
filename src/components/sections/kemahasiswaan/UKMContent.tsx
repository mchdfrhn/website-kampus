import { Mail } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';

type Bidang = 'Olahraga' | 'Seni & Budaya' | 'Riset & Teknologi' | 'Sosial & Keagamaan'

type UKMItem = { nama: string; bidang: Bidang; deskripsi: string; prestasi?: string; anggota?: number; kontak?: string }

const bidangColor: Record<string, string> = {
  'Olahraga': 'bg-green-100 text-green-800 border-green-200',
  'Seni & Budaya': 'bg-purple-100 text-purple-800 border-purple-200',
  'Riset & Teknologi': 'bg-blue-100 text-blue-800 border-blue-200',
  'Sosial & Keagamaan': 'bg-orange-100 text-orange-800 border-orange-200',
}

const defaults: UKMItem[] = [
  { nama: 'UKM Futsal', bidang: 'Olahraga', deskripsi: 'UKM futsal STTPU aktif berlatih dan mengikuti kompetisi antar perguruan tinggi se-Jakarta dan nasional.', prestasi: 'Semifinalis Liga Futsal Mahasiswa Jakarta 2025', anggota: 35, kontak: 'ukm.futsal@mhs.sttpu.ac.id' },
  { nama: 'UKM Robotika & IoT', bidang: 'Riset & Teknologi', deskripsi: 'Wadah mahasiswa yang berminat di bidang robotika, elektronika, dan IoT untuk aplikasi konstruksi dan infrastruktur.', prestasi: 'Finalis Kontes Robot Nasional PUPR 2025', anggota: 30, kontak: 'ukm.robotika@mhs.sttpu.ac.id' },
  { nama: 'UKM Mahasiswa Riset (Maris)', bidang: 'Riset & Teknologi', deskripsi: 'Komunitas penelitian mahasiswa yang aktif dalam penulisan KTI, PKM, dan kompetisi riset nasional.', prestasi: '3 tim lolos PKM Dikti 2025', anggota: 45, kontak: 'ukm.maris@mhs.sttpu.ac.id' },
  { nama: 'UKM Paduan Suara', bidang: 'Seni & Budaya', deskripsi: 'Paduan suara STTPU yang tampil di berbagai acara resmi kampus, wisuda, dan lomba paduan suara.', anggota: 40, kontak: 'ukm.ps@mhs.sttpu.ac.id' },
  { nama: 'UKM Kerohanian Islam (Rohis)', bidang: 'Sosial & Keagamaan', deskripsi: 'Mengembangkan nilai-nilai keislaman melalui kajian, kegiatan Ramadan, dan bakti sosial.', anggota: 80, kontak: 'ukm.rohis@mhs.sttpu.ac.id' },
  { nama: 'UKM Pramuka', bidang: 'Sosial & Keagamaan', deskripsi: 'Gerakan pramuka tingkat penegak yang membentuk karakter, kepemimpinan, dan kepedulian sosial mahasiswa.', anggota: 35, kontak: 'ukm.pramuka@mhs.sttpu.ac.id' },
]

export default async function UKMContent() {
  let ukm = defaults

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'ukm',
      sort: 'urutan',
      limit: 50,
    })
    ukm = result.docs as unknown as UKMItem[]
  } catch {
    // DB unavailable — use defaults
  }

  const bidangList = Array.from(new Set(ukm.map((u) => u.bidang)))

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
      <div className="mb-12 text-center lg:mb-16 lg:text-left">
        <h2 className="text-brand-navy font-bold text-3xl md:text-4xl tracking-tight leading-[1.2]">
          Unit Kegiatan Mahasiswa
        </h2>
        <div className="w-12 h-1 bg-brand-gold rounded-full mt-6 mx-auto lg:mx-0" />
        <p className="mt-8 text-gray-500 font-medium max-w-3xl leading-relaxed mx-auto lg:mx-0 text-sm md:text-base">
          STTPU Jakarta memiliki Unit Kegiatan Mahasiswa yang aktif di bidang olahraga, seni dan
          budaya, riset dan teknologi, serta sosial dan keagamaan sebagai ruang tumbuh di luar kelas.
        </p>
      </div>

      <div className="bg-brand-mist rounded-xl p-5 border border-gray-200">
        <p className="text-gray-700 text-sm leading-relaxed">
          Setiap UKM menjadi wadah eksplorasi minat, penguatan relasi antarmahasiswa, dan latihan
          kepemimpinan yang melengkapi pengalaman akademik formal.
        </p>
      </div>

      {bidangList.map((bidang) => (
        <section key={bidang}>
          <h3 className="font-bold text-brand-navy text-base mb-4 flex items-center gap-2">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${bidangColor[bidang] ?? 'bg-gray-100 text-gray-800 border-gray-200'}`}>
              {bidang}
            </span>
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ukm.filter((u) => u.bidang === bidang).map((u, idx) => (
              <li key={idx} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-brand-navy hover:shadow-sm transition-all">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-gray-900 text-sm leading-snug">{u.nama}</h3>
                  {u.anggota !== undefined && (
                    <span className="text-xs text-gray-500 flex-shrink-0">{u.anggota} anggota</span>
                  )}
                </div>
                <p className="text-gray-600 text-xs leading-relaxed mb-3">{u.deskripsi}</p>
                {u.prestasi && (
                  <p className="text-xs text-brand-navy font-medium bg-brand-mist px-2.5 py-1.5 rounded-lg mb-3 flex items-start gap-1.5">
                    <span className="text-brand-gold flex-shrink-0">★</span>
                    {u.prestasi}
                  </p>
                )}
                {u.kontak && (
                  <a href={`mailto:${u.kontak}`} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-navy transition-colors">
                    <Mail size={11} aria-hidden="true" /> {u.kontak}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}
