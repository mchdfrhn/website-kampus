import { Calendar, Download, AlertCircle } from 'lucide-react';

const kalenderGanjil = [
  { no: 1, kegiatan: 'Registrasi & Pengisian KRS Semester Ganjil', tanggal: '14 – 18 Juli 2025', keterangan: 'Online via SIAKAD' },
  { no: 2, kegiatan: 'Awal Perkuliahan Semester Ganjil', tanggal: '21 Juli 2025', keterangan: '-' },
  { no: 3, kegiatan: 'Batas Akhir Perubahan KRS', tanggal: '28 Juli – 1 Agustus 2025', keterangan: 'Maks 2 mata kuliah' },
  { no: 4, kegiatan: 'Ujian Tengah Semester (UTS)', tanggal: '22 – 26 September 2025', keterangan: 'Sesuai jadwal masing-masing prodi' },
  { no: 5, kegiatan: 'Batas Akhir Pengumpulan Nilai UTS', tanggal: '3 Oktober 2025', keterangan: 'Input dosen ke SIAKAD' },
  { no: 6, kegiatan: 'Libur Nasional', tanggal: 'Sesuai kalender nasional 2025', keterangan: '-' },
  { no: 7, kegiatan: 'Ujian Akhir Semester (UAS)', tanggal: '1 – 5 Desember 2025', keterangan: 'Sesuai jadwal masing-masing prodi' },
  { no: 8, kegiatan: 'Batas Akhir Pengumpulan Nilai UAS', tanggal: '19 Desember 2025', keterangan: 'Input dosen ke SIAKAD' },
  { no: 9, kegiatan: 'Ujian Susulan / Remedial', tanggal: '22 – 26 Desember 2025', keterangan: 'Bagi yang memenuhi syarat' },
  { no: 10, kegiatan: 'Libur Semester Ganjil', tanggal: '29 Desember 2025 – 16 Januari 2026', keterangan: '-' },
];

const kalenderGenap = [
  { no: 1, kegiatan: 'Registrasi & Pengisian KRS Semester Genap', tanggal: '12 – 16 Januari 2026', keterangan: 'Online via SIAKAD' },
  { no: 2, kegiatan: 'Awal Perkuliahan Semester Genap', tanggal: '19 Januari 2026', keterangan: '-' },
  { no: 3, kegiatan: 'Batas Akhir Perubahan KRS', tanggal: '26 – 30 Januari 2026', keterangan: 'Maks 2 mata kuliah' },
  { no: 4, kegiatan: 'Ujian Tengah Semester (UTS)', tanggal: '16 – 20 Maret 2026', keterangan: 'Sesuai jadwal masing-masing prodi' },
  { no: 5, kegiatan: 'Batas Akhir Pengumpulan Nilai UTS', tanggal: '27 Maret 2026', keterangan: 'Input dosen ke SIAKAD' },
  { no: 6, kegiatan: 'Libur Nasional & Hari Raya', tanggal: 'Maret – April 2026', keterangan: 'Sesuai kalender nasional' },
  { no: 7, kegiatan: 'Ujian Akhir Semester (UAS)', tanggal: '18 – 22 Mei 2026', keterangan: 'Sesuai jadwal masing-masing prodi' },
  { no: 8, kegiatan: 'Batas Akhir Pengumpulan Nilai UAS', tanggal: '5 Juni 2026', keterangan: 'Input dosen ke SIAKAD' },
  { no: 9, kegiatan: 'Pengumuman Hasil Studi', tanggal: '12 Juni 2026', keterangan: 'Via SIAKAD' },
  { no: 10, kegiatan: 'Wisuda', tanggal: 'Juli 2026', keterangan: 'Jadwal dan lokasi menyusul' },
  { no: 11, kegiatan: 'Libur Semester Genap', tanggal: '15 Juni – 20 Juli 2026', keterangan: '-' },
];

const kegiatanPenting = [
  { nama: 'Pendaftaran PKL (Sem. 7)', tanggal: 'Juni 2026', ket: 'Syarat: lulus min. 100 SKS' },
  { nama: 'Sidang Tugas Akhir (Sem. 8)', tanggal: 'Mei – Juni 2026', ket: 'Daftar ke prodi masing-masing' },
  { nama: 'Wisuda Tahun Akademik 2025/2026', tanggal: 'Juli 2026', ket: 'Aula Serbaguna STTPU' },
  { nama: 'Penerimaan Mahasiswa Baru 2026/2027', tanggal: 'Maret – Juli 2026', ket: 'Lihat website PMB' },
];

export default function KalenderContent() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-[#1E3A5F] text-lg mb-1">Tahun Akademik 2025/2026</h2>
          <p className="text-gray-500 text-sm">
            Kalender akademik resmi yang telah ditetapkan oleh Bagian Akademik STTPU Jakarta.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#1E3A5F] text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#162d4a] transition-colors flex-shrink-0">
          <Download size={15} aria-hidden="true" />
          Unduh PDF
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-amber-800 text-sm leading-relaxed">
          Jadwal dapat berubah sewaktu-waktu sesuai kebijakan institusi dan hari libur nasional.
          Selalu cek SIAKAD dan pengumuman resmi untuk update terkini.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-[#1E3A5F] text-base mb-4 flex items-center gap-2">
          <Calendar size={16} className="text-[#F5A623]" aria-hidden="true" />
          Semester Ganjil (Juli – Desember 2025)
        </h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm" aria-label="Kalender semester ganjil 2025">
            <thead>
              <tr className="bg-[#1E3A5F] text-white">
                <th className="text-left px-4 py-3 font-semibold w-8 rounded-tl-xl">No</th>
                <th className="text-left px-4 py-3 font-semibold">Kegiatan</th>
                <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Tanggal</th>
                <th className="text-left px-4 py-3 font-semibold rounded-tr-xl">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {kalenderGanjil.map((item, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-200 last:border-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F0F4F8]/50'}`}
                >
                  <td className="px-4 py-3 text-gray-500 text-xs">{item.no}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{item.kegiatan}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{item.tanggal}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{item.keterangan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-[#1E3A5F] text-base mb-4 flex items-center gap-2">
          <Calendar size={16} className="text-[#F5A623]" aria-hidden="true" />
          Semester Genap (Januari – Juli 2026)
        </h3>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm" aria-label="Kalender semester genap 2026">
            <thead>
              <tr className="bg-[#1E3A5F] text-white">
                <th className="text-left px-4 py-3 font-semibold w-8 rounded-tl-xl">No</th>
                <th className="text-left px-4 py-3 font-semibold">Kegiatan</th>
                <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Tanggal</th>
                <th className="text-left px-4 py-3 font-semibold rounded-tr-xl">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {kalenderGenap.map((item, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-200 last:border-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F0F4F8]/50'}`}
                >
                  <td className="px-4 py-3 text-gray-500 text-xs">{item.no}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{item.kegiatan}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{item.tanggal}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{item.keterangan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-[#1E3A5F] text-base mb-4">Kegiatan Penting Lainnya</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {kegiatanPenting.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl">
              <div className="w-8 h-8 bg-[#F5A623]/15 rounded-lg flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <Calendar size={15} className="text-[#1E3A5F]" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{item.nama}</p>
                <p className="text-[#1E3A5F] text-xs font-medium mt-0.5">{item.tanggal}</p>
                <p className="text-gray-500 text-xs mt-0.5">{item.ket}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
