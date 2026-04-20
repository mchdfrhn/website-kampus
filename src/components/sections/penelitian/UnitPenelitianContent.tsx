import { FlaskConical, Users, Phone, MapPin } from 'lucide-react';

const units = [
  {
    id: 'puslit-infrastruktur',
    nama: 'Pusat Penelitian Infrastruktur & Konstruksi',
    singkatan: 'PPIK',
    kepala: 'Dr. Ir. Bambang Susilo, M.T.',
    fokus: ['Struktur beton dan baja', 'Manajemen konstruksi berkelanjutan', 'Material inovatif bangunan gedung', 'K3 konstruksi'],
    deskripsi: 'Unit riset utama yang mengkaji permasalahan teknis dan manajerial dalam sektor konstruksi dan infrastruktur, bermitra dengan Kementerian PUPR dan kontraktor nasional.',
    anggota: 12,
    lokasi: 'Gedung A, Lantai 3',
    kontak: 'ppik@sttpu.ac.id',
  },
  {
    id: 'lab-hidro',
    nama: 'Laboratorium Hidrolika & Pengairan',
    singkatan: 'LHP',
    kepala: 'Dr. Siti Rahayu, M.T.',
    fokus: ['Pemodelan aliran sungai', 'Irigasi teknis & efisiensi air', 'Pengendalian banjir dan drainase perkotaan', 'Kualitas air permukaan'],
    deskripsi: 'Laboratorium basah berkapasitas penuh untuk simulasi aliran dan pengujian model fisik. Dilengkapi flume channel, pompa sentrifugal, dan alat ukur debit.',
    anggota: 8,
    lokasi: 'Gedung Lab, Lantai 1',
    kontak: 'lab.hidro@sttpu.ac.id',
  },
  {
    id: 'puslit-lingkungan',
    nama: 'Pusat Riset Lingkungan & Sanitasi',
    singkatan: 'PRLS',
    kepala: 'Dr. Hendra Wijaya, M.Sc.',
    fokus: ['Pengolahan air bersih dan limbah', 'AMDAL dan kajian lingkungan', 'Teknologi sanitasi permukiman', 'Persampahan dan 3R'],
    deskripsi: 'Meneliti solusi teknologi tepat guna untuk permasalahan sanitasi lingkungan perkotaan dan perdesaan, bekerja sama dengan BPLHD dan Dinas Lingkungan Hidup DKI Jakarta.',
    anggota: 9,
    lokasi: 'Gedung Lab, Lantai 2',
    kontak: 'prls@sttpu.ac.id',
  },
  {
    id: 'lab-komputer',
    nama: 'Laboratorium Komputasi & Pemodelan',
    singkatan: 'LKP',
    kepala: 'Ir. Dian Pratiwi, M.T.',
    fokus: ['BIM (Building Information Modeling)', 'Pemodelan struktur dengan SAP2000/ETABS', 'GIS untuk perencanaan wilayah', 'Simulasi numerik berbasis elemen hingga'],
    deskripsi: 'Lab komputer dengan 40 workstation berlisensi software teknik: AutoCAD, SAP2000, ETABS, ArcGIS, EPANET, dan HEC-RAS untuk mendukung riset dan pembelajaran.',
    anggota: 6,
    lokasi: 'Gedung B, Lantai 2',
    kontak: 'lab.komputasi@sttpu.ac.id',
  },
  {
    id: 'lab-mekanika-tanah',
    nama: 'Laboratorium Mekanika Tanah & Geoteknik',
    singkatan: 'LMTG',
    kepala: 'Dr. Rudi Santoso, M.T.',
    fokus: ['Uji karakteristik tanah (CBR, triaksial, konsolidasi)', 'Fondasi dalam & dangkal', 'Stabilisasi tanah', 'Pemetaan geoteknik wilayah Jakarta'],
    deskripsi: 'Laboratorium geoteknik yang dilengkapi peralatan uji standar SNI dan ASTM. Melayani pengujian contoh tanah untuk kebutuhan penelitian dosen, mahasiswa tugas akhir, dan konsultasi eksternal.',
    anggota: 7,
    lokasi: 'Gedung Lab, Lantai 1',
    kontak: 'lab.geoteknik@sttpu.ac.id',
  },
];

export default function UnitPenelitianContent() {
  return (
    <article className="space-y-6">
      <div className="bg-[#F0F4F8] rounded-xl p-5">
        <p className="text-sm text-gray-700 leading-relaxed">
          STTPU memiliki <strong>5 unit riset dan laboratorium aktif</strong> yang mendukung tridarma
          perguruan tinggi. Setiap unit dibina oleh dosen doktor berpengalaman dan terbuka untuk
          kolaborasi penelitian dengan mahasiswa, industri, dan pemerintah.
        </p>
      </div>

      <div className="space-y-5">
        {units.map((unit) => (
          <div key={unit.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#1E3A5F] hover:shadow-sm transition-all">
            <div className="px-5 py-4 border-b border-gray-100 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#1E3A5F] flex items-center justify-center flex-shrink-0">
                <FlaskConical size={17} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-sm leading-snug">{unit.nama}</h2>
                <span className="text-[11px] font-bold text-[#1E3A5F] bg-[#F0F4F8] px-2 py-0.5 rounded-full inline-block mt-1">{unit.singkatan}</span>
              </div>
            </div>

            <div className="px-5 py-4 space-y-3">
              <p className="text-xs text-gray-600 leading-relaxed">{unit.deskripsi}</p>

              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Bidang Riset</p>
                <ul className="flex flex-wrap gap-1.5">
                  {unit.fokus.map((f) => (
                    <li key={f} className="text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">{f}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Users size={13} aria-hidden="true" className="text-gray-400" />
                  <span><strong className="text-gray-700">{unit.kepala}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <MapPin size={13} aria-hidden="true" className="text-gray-400" />
                  {unit.lokasi}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Phone size={13} aria-hidden="true" className="text-gray-400" />
                  {unit.kontak}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
