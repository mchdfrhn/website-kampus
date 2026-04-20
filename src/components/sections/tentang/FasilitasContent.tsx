import { FlaskConical, Library, Dumbbell, Wifi, Car, UtensilsCrossed } from 'lucide-react';

const fasilitas = [
  {
    icon: FlaskConical,
    nama: 'Laboratorium Teknik Sipil',
    deskripsi:
      'Laboratorium pengujian material konstruksi, mekanika tanah, dan hidrolika yang dilengkapi peralatan uji standar SNI dan ASTM.',
    kapasitas: '30 mahasiswa',
    items: ['Universal Testing Machine', 'Alat Uji Triaksial', 'Flume saluran terbuka', 'Peralatan sondir & boring'],
  },
  {
    icon: FlaskConical,
    nama: 'Laboratorium Komputer & BIM',
    deskripsi:
      'Ruang komputer untuk praktik perangkat lunak teknik: AutoCAD, SAP2000, ETABS, dan aplikasi Building Information Modeling (BIM) seperti Revit dan Tekla.',
    kapasitas: '40 mahasiswa',
    items: ['50 unit workstation', 'AutoCAD & Revit license', 'Internet kecepatan tinggi', 'Plotter A0'],
  },
  {
    icon: FlaskConical,
    nama: 'Laboratorium Lingkungan',
    deskripsi:
      'Fasilitas pengujian kualitas air, analisis limbah, dan penelitian lingkungan dengan instrumen analitik modern.',
    kapasitas: '25 mahasiswa',
    items: ['Spektrofotometer UV-Vis', 'AAS (Atomic Absorption Spectroscopy)', 'DO meter & pH meter', 'Jar test apparatus'],
  },
  {
    icon: Library,
    nama: 'Perpustakaan',
    deskripsi:
      'Perpustakaan modern dengan koleksi buku teks, jurnal ilmiah, dan akses ke database digital nasional dan internasional.',
    kapasitas: '100 kursi baca',
    items: ['20.000+ judul buku', 'Akses GARUDA & ProQuest', 'Ruang diskusi kelompok', 'Ruang baca dosen'],
  },
  {
    icon: Dumbbell,
    nama: 'Lapangan & Fasilitas Olahraga',
    deskripsi:
      'Area olahraga untuk mendukung keseimbangan fisik dan mental mahasiswa, termasuk lapangan futsal dan area fitness.',
    kapasitas: '50 mahasiswa',
    items: ['Lapangan futsal indoor', 'Lapangan basket outdoor', 'Ruang fitness', 'Tribun penonton'],
  },
  {
    icon: UtensilsCrossed,
    nama: 'Kantin & Ruang Makan',
    deskripsi:
      'Fasilitas makan dan kantin yang menyediakan pilihan menu bergizi dengan harga terjangkau untuk civitas akademika.',
    kapasitas: '150 kursi',
    items: ['Kantin utama', 'Kios minuman & snack', 'Area parkir sepeda', 'Mushola kantin'],
  },
  {
    icon: Wifi,
    nama: 'Infrastruktur Digital',
    deskripsi:
      'Infrastruktur teknologi informasi kampus yang mendukung pembelajaran digital, administrasi online, dan konektivitas penuh.',
    kapasitas: 'Seluruh kampus',
    items: ['WiFi kampus 100 Mbps', 'SIAKAD online', 'E-learning Moodle', 'CCTV & keamanan digital'],
  },
  {
    icon: Car,
    nama: 'Area Parkir & Akses',
    deskripsi:
      'Area parkir yang memadai dengan sistem keamanan untuk kendaraan roda dua dan roda empat.',
    kapasitas: '200 kendaraan',
    items: ['Parkir motor terpisah', 'Parkir mobil', 'Pos keamanan 24 jam', 'Akses difabel'],
  },
];

export default function FasilitasContent() {
  return (
    <article className="space-y-6">
      <p className="text-gray-600 text-sm leading-relaxed">
        STTPU Jakarta menyediakan fasilitas pembelajaran dan penunjang akademik yang terus
        dikembangkan untuk mendukung proses belajar-mengajar yang efektif dan menyenangkan.
      </p>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5" aria-label="Daftar fasilitas STTPU">
        {fasilitas.map((item, idx) => {
          const Icon = item.icon;
          return (
            <li
              key={idx}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-36 bg-[#F0F4F8] flex items-center justify-center border-b border-gray-200">
                <div className="text-center">
                  <Icon size={32} className="text-[#1E3A5F]/30 mx-auto mb-2" aria-hidden="true" />
                  <p className="text-gray-400 text-xs italic">Foto fasilitas</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-9 h-9 bg-[#1E3A5F] rounded-lg flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <Icon size={16} className="text-[#F5A623]" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-sm leading-tight">{item.nama}</h2>
                    <p className="text-gray-500 text-xs mt-0.5">Kapasitas: {item.kapasitas}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed mb-3">{item.deskripsi}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {item.items.map((f, i) => (
                    <li
                      key={i}
                      className="inline-block bg-[#F0F4F8] text-[#1E3A5F] text-[10px] px-2 py-0.5 rounded font-medium border border-gray-200"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
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
