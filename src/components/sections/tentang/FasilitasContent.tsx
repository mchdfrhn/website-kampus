import { getPayloadClient } from '@/lib/payload';

type FasilitasItem = {
  nama: string
  deskripsi?: string
  kapasitas?: string
  items?: { nama: string }[]
  foto?: { url?: string } | null
}

const defaults: FasilitasItem[] = [
  {
    nama: 'Laboratorium Teknik Sipil',
    deskripsi: 'Laboratorium pengujian material konstruksi, mekanika tanah, dan hidrolika yang dilengkapi peralatan uji standar SNI dan ASTM.',
    kapasitas: '30 mahasiswa',
    items: [{ nama: 'Universal Testing Machine' }, { nama: 'Alat Uji Triaksial' }, { nama: 'Flume saluran terbuka' }, { nama: 'Peralatan sondir & boring' }],
  },
  {
    nama: 'Laboratorium Komputer & BIM',
    deskripsi: 'Ruang komputer untuk praktik perangkat lunak teknik: AutoCAD, SAP2000, ETABS, dan aplikasi Building Information Modeling (BIM) seperti Revit dan Tekla.',
    kapasitas: '40 mahasiswa',
    items: [{ nama: '50 unit workstation' }, { nama: 'AutoCAD & Revit license' }, { nama: 'Internet kecepatan tinggi' }, { nama: 'Plotter A0' }],
  },
  {
    nama: 'Laboratorium Lingkungan',
    deskripsi: 'Fasilitas pengujian kualitas air, analisis limbah, dan penelitian lingkungan dengan instrumen analitik modern.',
    kapasitas: '25 mahasiswa',
    items: [{ nama: 'Spektrofotometer UV-Vis' }, { nama: 'AAS' }, { nama: 'DO meter & pH meter' }, { nama: 'Jar test apparatus' }],
  },
  {
    nama: 'Perpustakaan',
    deskripsi: 'Perpustakaan modern dengan koleksi buku teks, jurnal ilmiah, dan akses ke database digital nasional dan internasional.',
    kapasitas: '100 kursi baca',
    items: [{ nama: '20.000+ judul buku' }, { nama: 'Akses GARUDA & ProQuest' }, { nama: 'Ruang diskusi kelompok' }],
  },
  {
    nama: 'Lapangan & Fasilitas Olahraga',
    deskripsi: 'Area olahraga untuk mendukung keseimbangan fisik dan mental mahasiswa, termasuk lapangan futsal dan area fitness.',
    kapasitas: '50 mahasiswa',
    items: [{ nama: 'Lapangan futsal indoor' }, { nama: 'Lapangan basket outdoor' }, { nama: 'Ruang fitness' }],
  },
  {
    nama: 'Infrastruktur Digital',
    deskripsi: 'Infrastruktur teknologi informasi kampus yang mendukung pembelajaran digital, administrasi online, dan konektivitas penuh.',
    kapasitas: 'Seluruh kampus',
    items: [{ nama: 'WiFi kampus 100 Mbps' }, { nama: 'SIAKAD online' }, { nama: 'E-learning Moodle' }],
  },
]

export default async function FasilitasContent() {
  let fasilitas = defaults

  try {
    const payload = await getPayloadClient()
    const global = await payload.findGlobal({ slug: 'tentang-kami', depth: 1 })
    const data = (global as unknown as { fasilitas?: FasilitasItem[] }).fasilitas
    if (data && data.length > 0) {
      fasilitas = data
    }
  } catch {
    // DB unavailable — use defaults
  }

  return (
    <article className="space-y-6">
      <p className="text-gray-600 text-sm leading-relaxed">
        STTPU Jakarta menyediakan fasilitas pembelajaran dan penunjang akademik yang terus
        dikembangkan untuk mendukung proses belajar-mengajar yang efektif dan menyenangkan.
      </p>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5" aria-label="Daftar fasilitas STTPU">
        {fasilitas.map((item, idx) => (
          <li
            key={idx}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-36 bg-[#F0F4F8] flex items-center justify-center border-b border-gray-200">
              <p className="text-gray-400 text-xs italic">Foto fasilitas</p>
            </div>
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-9 h-9 bg-[#1E3A5F] rounded-lg flex items-center justify-center flex-shrink-0 text-[#F5A623] font-black text-sm"
                  aria-hidden="true"
                >
                  {idx + 1}
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-sm leading-tight">{item.nama}</h2>
                  {item.kapasitas && (
                    <p className="text-gray-500 text-xs mt-0.5">Kapasitas: {item.kapasitas}</p>
                  )}
                </div>
              </div>
              {item.deskripsi && (
                <p className="text-gray-600 text-xs leading-relaxed mb-3">{item.deskripsi}</p>
              )}
              {item.items && item.items.length > 0 && (
                <ul className="flex flex-wrap gap-1.5">
                  {item.items.map((f, i) => (
                    <li
                      key={i}
                      className="inline-block bg-[#F0F4F8] text-[#1E3A5F] text-[10px] px-2 py-0.5 rounded font-medium border border-gray-200"
                    >
                      {f.nama}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="bg-[#1E3A5F] rounded-xl p-5 text-white text-center">
        <p className="font-semibold text-sm mb-1">Ingin Melihat Fasilitas Langsung?</p>
        <p className="text-white/80 text-xs mb-3">
          Jadwalkan kunjungan kampus dan rasakan sendiri lingkungan belajar STTPU Jakarta.
        </p>
        <a
          href="/kontak"
          className="inline-block bg-[#F5A623] text-[#1E3A5F] font-bold text-sm px-5 py-2 rounded-lg hover:bg-[#e09615] transition-colors"
        >
          Hubungi Kami
        </a>
      </div>
    </article>
  );
}
