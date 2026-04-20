import { ExternalLink, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const beasiswaInternal = [
  {
    nama: 'Beasiswa Prestasi Akademik',
    penyelenggara: 'STTPU Jakarta',
    jenis: 'Pembebasan UKT',
    nilai: 'Bebas UKT 1 semester',
    syarat: ['IPK ≥ 3.75 pada semester sebelumnya', 'Tidak sedang menerima beasiswa lain', 'Tidak memiliki nilai D atau E'],
    deadline: 'Setiap awal semester (Januari & Juli)',
    status: 'Buka',
    statusColor: 'bg-green-100 text-green-800',
    deskripsi: 'Diberikan kepada mahasiswa berprestasi akademik tertinggi di setiap program studi pada semester berjalan.',
  },
  {
    nama: 'Beasiswa Mahasiswa Tidak Mampu',
    penyelenggara: 'STTPU Jakarta',
    jenis: 'Keringanan UKT',
    nilai: 'Diskon UKT 25–50%',
    syarat: ['Surat keterangan tidak mampu dari Kelurahan/Desa', 'Pendapatan orang tua/wali ≤ Rp 3.000.000/bulan', 'IPK ≥ 2.50', 'Tidak sedang menerima beasiswa lain'],
    deadline: 'Awal semester ganjil (Juli)',
    status: 'Buka',
    statusColor: 'bg-green-100 text-green-800',
    deskripsi: 'Program keringanan biaya bagi mahasiswa yang membutuhkan dukungan finansial untuk melanjutkan pendidikan.',
  },
  {
    nama: 'Beasiswa Hafidz Al-Quran',
    penyelenggara: 'STTPU Jakarta',
    jenis: 'Pembebasan UKT',
    nilai: 'Bebas UKT selama studi',
    syarat: ['Hafal minimal 10 juz Al-Quran', 'Lulus tes tilawah dan hafalan', 'IPK ≥ 2.75 setiap semester'],
    deadline: 'Bersamaan dengan pendaftaran mahasiswa baru',
    status: 'Buka saat PMB',
    statusColor: 'bg-blue-100 text-blue-800',
    deskripsi: 'Beasiswa penuh bagi calon mahasiswa yang memiliki hafalan Al-Quran minimal 10 juz sebagai bentuk apresiasi.',
  },
];

const beasiswaEksternal = [
  {
    nama: 'KIP Kuliah (Kartu Indonesia Pintar)',
    penyelenggara: 'Kemendikbudristek RI',
    jenis: 'Beasiswa Penuh',
    nilai: 'Biaya kuliah + biaya hidup',
    syarat: ['Lulus seleksi SNBP/SNBT/Mandiri', 'Pemegang KIP atau dari keluarga tidak mampu', 'Mendaftar melalui kip-kuliah.kemdikbud.go.id'],
    deadline: 'Bersamaan dengan SNBP/SNBT',
    status: 'Tahunan',
    statusColor: 'bg-blue-100 text-blue-800',
    deskripsi: 'Program beasiswa pemerintah untuk mahasiswa dari keluarga kurang mampu yang lolos seleksi masuk perguruan tinggi.',
    url: 'https://kip-kuliah.kemdikbud.go.id',
  },
  {
    nama: 'Beasiswa LPDP',
    penyelenggara: 'Kementerian Keuangan RI',
    jenis: 'Beasiswa S2/S3',
    nilai: 'Biaya penuh termasuk hidup & penelitian',
    syarat: ['Telah menyelesaikan jenjang S1/D-IV', 'IPK ≥ 3.00', 'Usia maks 35 tahun (S2) / 40 tahun (S3)', 'Lulus seleksi LPDP'],
    deadline: 'Dua periode per tahun (lihat website LPDP)',
    status: 'Periodik',
    statusColor: 'bg-purple-100 text-purple-800',
    deskripsi: 'Beasiswa bergengsi dari Kementerian Keuangan untuk melanjutkan studi pascasarjana di dalam dan luar negeri.',
    url: 'https://lpdp.kemenkeu.go.id',
  },
  {
    nama: 'Beasiswa Kementerian PUPR',
    penyelenggara: 'Kementerian Pekerjaan Umum dan PR',
    jenis: 'Beasiswa Ikatan Dinas',
    nilai: 'Biaya kuliah + tunjangan',
    syarat: ['Seleksi internal Kementerian PUPR', 'Rekomendasi dari satuan kerja', 'IPK ≥ 3.00 (D-IV)'],
    deadline: 'Sesuai pengumuman Kementerian PUPR',
    status: 'Conditional',
    statusColor: 'bg-yellow-100 text-yellow-800',
    deskripsi: 'Program beasiswa ikatan dinas dari Kementerian PUPR untuk mengembangkan kompetensi SDM infrastruktur.',
    url: '#',
  },
  {
    nama: 'Beasiswa Bank Indonesia (BI)',
    penyelenggara: 'Bank Indonesia',
    jenis: 'Beasiswa Parsial + Mentoring',
    nilai: 'Bantuan biaya pendidikan + program pengembangan',
    syarat: ['Mahasiswa aktif semester 2 ke atas', 'IPK ≥ 3.00', 'Aktif berorganisasi', 'Lulus seleksi BI'],
    deadline: 'Setiap tahun (sesuai pengumuman BI)',
    status: 'Tahunan',
    statusColor: 'bg-blue-100 text-blue-800',
    deskripsi: 'Beasiswa dari Bank Indonesia yang disertai program pengembangan kepemimpinan dan literasi keuangan.',
    url: 'https://www.bi.go.id',
  },
];

export default function BeasiswaContent() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="bg-[#F0F4F8] rounded-xl p-5 border border-gray-200 flex items-start gap-3">
        <AlertCircle size={16} className="text-[#1E3A5F] flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-gray-700 text-sm leading-relaxed">
          Informasi beasiswa diperbarui secara berkala. Untuk informasi terkini dan prosedur
          pendaftaran, hubungi Bagian Kemahasiswaan STTPU Jakarta atau kunjungi langsung sumber
          beasiswa yang bersangkutan.
        </p>
      </div>

      <div>
        <h2 className="font-bold text-[#1E3A5F] text-lg mb-1">Beasiswa Internal STTPU</h2>
        <p className="text-gray-500 text-sm mb-6">
          Program beasiswa yang diselenggarakan langsung oleh STTPU Jakarta untuk mendukung mahasiswa.
        </p>
        <ul className="space-y-5">
          {beasiswaInternal.map((b, idx) => (
            <li key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 bg-[#F0F4F8]/50">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{b.nama}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">{b.penyelenggara}</p>
                </div>
                <div className="flex flex-wrap gap-2 flex-shrink-0">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${b.statusColor}`}>
                    {b.status}
                  </span>
                  <span className="bg-[#1E3A5F]/10 text-[#1E3A5F] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {b.jenis}
                  </span>
                </div>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Nilai Beasiswa</p>
                    <p className="text-[#1E3A5F] font-bold text-sm">{b.nilai}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      <Calendar size={11} className="inline mr-1" aria-hidden="true" />
                      Deadline
                    </p>
                    <p className="text-gray-700 text-sm">{b.deadline}</p>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed">{b.deskripsi}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Syarat Utama</p>
                  <ul className="space-y-1.5">
                    {b.syarat.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle size={12} className="text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-bold text-[#1E3A5F] text-lg mb-1">Beasiswa Eksternal</h2>
        <p className="text-gray-500 text-sm mb-6">
          Beasiswa dari pemerintah dan lembaga eksternal yang dapat diakses oleh mahasiswa STTPU.
        </p>
        <ul className="space-y-5">
          {beasiswaEksternal.map((b, idx) => (
            <li key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 bg-[#F0F4F8]/50">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-900 text-sm">{b.nama}</h3>
                    {b.url && b.url !== '#' && (
                      <a
                        href={b.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Website ${b.nama}`}
                        className="text-[#1E3A5F] hover:text-[#F5A623] transition-colors"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5">{b.penyelenggara}</p>
                </div>
                <div className="flex flex-wrap gap-2 flex-shrink-0">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${b.statusColor}`}>
                    {b.status}
                  </span>
                  <span className="bg-[#1E3A5F]/10 text-[#1E3A5F] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {b.jenis}
                  </span>
                </div>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Nilai Beasiswa</p>
                    <p className="text-[#1E3A5F] font-bold text-sm">{b.nilai}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      <Calendar size={11} className="inline mr-1" aria-hidden="true" />
                      Deadline
                    </p>
                    <p className="text-gray-700 text-sm">{b.deadline}</p>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed">{b.deskripsi}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Syarat Utama</p>
                  <ul className="space-y-1.5">
                    {b.syarat.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle size={12} className="text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
