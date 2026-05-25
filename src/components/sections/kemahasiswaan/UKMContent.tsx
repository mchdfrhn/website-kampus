import { Mail, Sparkles, Trophy, Users } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';

type Bidang = 'Olahraga' | 'Seni & Budaya' | 'Riset & Teknologi' | 'Sosial & Keagamaan'

type UKMItem = { nama: string; bidang: Bidang; deskripsi: string; prestasi?: string; anggota?: number; kontak?: string }

const bidangColor: Record<string, string> = {
  'Olahraga': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  'Seni & Budaya': 'bg-purple-50 text-purple-700 border-purple-100',
  'Riset & Teknologi': 'bg-blue-50 text-blue-700 border-blue-100',
  'Sosial & Keagamaan': 'bg-amber-50 text-amber-700 border-amber-100',
}

const defaults: UKMItem[] = [
  { nama: 'UKM Futsal', bidang: 'Olahraga', deskripsi: 'UKM futsal STTPU aktif berlatih dan mengikuti kompetisi antar perguruan tinggi se-Jakarta dan nasional.', prestasi: 'Semifinalis Liga Futsal Mahasiswa Jakarta 2025', anggota: 35, kontak: 'ukm.futsal@mhs.sttpu.ac.id' },
  { nama: 'UKM Robotika & IoT', bidang: 'Riset & Teknologi', deskripsi: 'Wadah mahasiswa yang berminat di bidang robotika, elektronika, dan IoT untuk aplikasi konstruksi dan infrastruktur.', prestasi: 'Finalis Kontes Robot Nasional PUPR 2025', anggota: 30, kontak: 'ukm.robotika@mhs.sttpu.ac.id' },
  { nama: 'UKM Mahasiswa Riset (Maris)', bidang: 'Riset & Teknologi', deskripsi: 'Komunitas penelitian mahasiswa yang aktif dalam penulisan KTI, PKM, dan kompetisi riset nasional.', prestasi: '3 tim lolos PKM Dikti 2025', anggota: 45, kontak: 'ukm.maris@mhs.sttpu.ac.id' },
  { nama: 'UKM Paduan Suara', bidang: 'Seni & Budaya', deskripsi: 'Paduan suara STTPU yang tampil di berbagai acara resmi kampus, wisuda, dan lomba paduan suara.', anggota: 40, kontak: 'ukm.ps@mhs.sttpu.ac.id' },
  { nama: 'UKM Kerohanian Islam (Rohis)', bidang: 'Sosial & Keagamaan', deskripsi: 'Mengembangkan nilai-nilai keislaman melalui kajian, kegiatan Ramadan, dan bakti sosial.', anggota: 80, kontak: 'ukm.rohis@mhs.sttpu.ac.id' },
  { nama: 'UKM Pramuka', bidang: 'Sosial & Keagamaan', deskripsi: 'Gerakan pramuka tingkat penegak yang membentuk karakter, kepemimpinan, dan kepedulian sosial mahasiswa.', anggota: 35, kontak: 'ukm.pramuka@mhs.sttpu.ac.id' },
]

function SectionCard({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-premium border border-gray-100 bg-white p-6 shadow-premium sm:rounded-premium-lg sm:p-8 lg:p-10">
      {eyebrow ? (
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">{eyebrow}</p>
      ) : null}
      <h2 className="text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">{title}</h2>
      <div className="mt-4 h-1 w-12 rounded-full bg-brand-gold" />
      <div className="mt-8">{children}</div>
    </section>
  );
}

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
    <article className="space-y-10 sm:space-y-12">
      <SectionCard title="Kegiatan Ekstrakurikuler" eyebrow="Student Life">
        <div className="flex items-start gap-4 p-5 rounded-2xl border border-brand-navy/10 bg-brand-navy/[0.02]">
          <Sparkles size={24} className="text-brand-navy flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-gray-600 text-sm font-semibold leading-relaxed">
            Setiap UKM menjadi wadah eksplorasi minat, penguatan relasi antarmahasiswa, dan latihan
            kepemimpinan yang melengkapi pengalaman akademik formal.
          </p>
        </div>
      </SectionCard>

      {bidangList.map((bidang) => (
        <SectionCard key={bidang} title={`Kategori: ${bidang}`} eyebrow="Community">
          <div className="mb-6 flex justify-end">
            <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${bidangColor[bidang] ?? 'bg-gray-50 text-gray-600 border-gray-100'}`}>
              {bidang}
            </span>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ukm.filter((u) => u.bidang === bidang).map((u, idx) => (
              <li
                key={idx}
                className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-premium hover:border-brand-navy/10 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h4 className="font-bold text-brand-navy text-sm sm:text-base leading-snug group-hover:text-brand-gold transition-colors duration-300">{u.nama}</h4>
                    {u.anggota !== undefined && (
                      <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-50 px-2 py-0.5 rounded border border-gray-100 flex-shrink-0">{u.anggota} Anggota</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed mb-4">{u.deskripsi}</p>
                  
                  {u.prestasi && (
                    <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-xl mb-4 flex items-start gap-2">
                      <Trophy size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{u.prestasi}</span>
                    </div>
                  )}
                </div>

                {u.kontak && (
                  <a
                    href={`mailto:${u.kontak}`}
                    className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold hover:text-brand-gold transition-colors pt-3 border-t border-gray-50"
                  >
                    <Mail size={12} aria-hidden="true" />
                    {u.kontak}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </SectionCard>
      ))}
    </article>
  );
}
