import { Trophy, Calendar, Users, Award, ShieldAlert, Sparkles } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';

type Tingkat = 'Nasional' | 'Internasional' | 'Regional';

type PrestasiItem = {
  judul: string;
  mahasiswa: { nama: string }[];
  prodi: string;
  penyelenggara: string;
  peringkat: string;
  tingkat: Tingkat;
  tahun: number;
  deskripsi: string;
}

const tingkatColor: Record<Tingkat, string> = {
  Internasional: 'bg-purple-50 text-purple-700 border-purple-100',
  Nasional: 'bg-blue-50 text-blue-700 border-blue-100',
  Regional: 'bg-emerald-50 text-emerald-700 border-emerald-100',
};

const defaults: PrestasiItem[] = [
  {
    judul: 'Kompetisi Beton Nasional',
    mahasiswa: [{ nama: 'Arief Budiman' }, { nama: 'Dewi Anggraeni' }, { nama: 'Fajar Nugroho' }, { nama: 'Putri Ramadhani' }],
    prodi: 'Teknik Sipil',
    penyelenggara: 'ITS Surabaya',
    peringkat: 'Juara II',
    tingkat: 'Nasional',
    tahun: 2026,
    deskripsi: 'Merancang campuran beton kuat tekan 42 MPa dengan substitusi 20% abu sekam padi.',
  },
  {
    judul: 'Program Kreativitas Mahasiswa (PKM-RE)',
    mahasiswa: [{ nama: 'Bima Sakti' }, { nama: 'Laila Nur' }, { nama: 'Reza Firmansyah' }],
    prodi: 'Teknik Lingkungan',
    penyelenggara: 'Kemendikbudristek RI',
    peringkat: 'Lolos Pendanaan DIKTI',
    tingkat: 'Nasional',
    tahun: 2025,
    deskripsi: 'Penelitian pemanfaatan eceng gondok sebagai biofilter alami untuk pengolahan air limbah domestik.',
  },
  {
    judul: 'Kontes Robot Nasional PUPR',
    mahasiswa: [{ nama: 'Hendra Wijaya' }, { nama: 'Sari Permata' }, { nama: 'Tegar Prasetyo' }],
    prodi: 'Teknik Sipil',
    penyelenggara: 'Kementerian PUPR',
    peringkat: 'Finalis Top 10',
    tingkat: 'Nasional',
    tahun: 2025,
    deskripsi: 'Mengembangkan prototipe robot inspeksi jembatan berbasis sensor ultrasonik dan kamera.',
  },
];

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

export default async function PrestasiContent() {
  let prestasiList = defaults

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'prestasi',
      sort: ['-tahun', 'urutan'],
      limit: 50,
    })
    if (result.docs.length > 0) {
      prestasiList = result.docs as unknown as PrestasiItem[]
    }
  } catch {
    // DB unavailable — use defaults
  }

  const byYear = prestasiList.reduce<Record<number, PrestasiItem[]>>(
    (acc, p) => { (acc[p.tahun] ??= []).push(p); return acc; },
    {},
  );
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a);

  return (
    <article className="space-y-10 sm:space-y-12">
      <SectionCard title="Statistik Prestasi" eyebrow="Achievements Summary">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {(['Nasional', 'Internasional', 'Regional'] as Tingkat[]).map((t) => (
            <div key={t} className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 bg-white hover:shadow-premium transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-navy flex items-center justify-center flex-shrink-0 shadow-sm">
                <Trophy size={20} className="text-brand-gold" />
              </div>
              <div>
                <p className="font-extrabold text-2xl text-brand-navy leading-none">
                  {prestasiList.filter((p) => p.tingkat === t).length}
                </p>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-1">Prestasi {t}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {years.map((year) => (
        <SectionCard key={year} title={`Pencapaian Tahun ${year}`} eyebrow="Timeline">
          <div className="space-y-6">
            {byYear[year].map((p, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 hover:shadow-premium hover:border-brand-navy/10 transition-all duration-300 group"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy/[0.03] border border-brand-navy/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-navy group-hover:border-brand-navy transition-all duration-300">
                      <Trophy size={16} className="text-brand-navy group-hover:text-brand-gold transition-colors duration-300" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-navy text-sm sm:text-base group-hover:text-brand-gold transition-colors duration-300 leading-tight">
                        {p.judul}
                      </h4>
                      <p className="text-gray-400 text-xs font-semibold mt-1">{p.penyelenggara}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap items-center">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${tingkatColor[p.tingkat]}`}>
                      {p.tingkat}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
                      {p.peringkat}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed mb-6">{p.deskripsi}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-5 border-t border-gray-50">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Anggota Tim</p>
                    <p className="text-gray-600 text-xs font-semibold">{p.mahasiswa.map(m => m.nama).join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Program Studi</p>
                    <p className="text-gray-600 text-xs font-semibold">{p.prodi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      ))}
    </article>
  );
}
