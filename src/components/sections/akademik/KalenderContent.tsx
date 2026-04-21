import { Calendar, Download, AlertCircle } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';

type KegiatanItem = { kegiatan: string; tanggal: string; keterangan?: string }
type KegiatanPenting = { nama: string; tanggal: string; keterangan?: string }

const defaultSemesterGanjil = {
  label: 'Semester Ganjil (Juli – Desember 2025)',
  kegiatan: [
    { kegiatan: 'Registrasi & Pengisian KRS Semester Ganjil', tanggal: '14 – 18 Juli 2025', keterangan: 'Online via SIAKAD' },
    { kegiatan: 'Awal Perkuliahan Semester Ganjil', tanggal: '21 Juli 2025', keterangan: '-' },
    { kegiatan: 'Batas Akhir Perubahan KRS', tanggal: '28 Juli – 1 Agustus 2025', keterangan: 'Maks 2 mata kuliah' },
    { kegiatan: 'Ujian Tengah Semester (UTS)', tanggal: '22 – 26 September 2025', keterangan: 'Sesuai jadwal masing-masing prodi' },
    { kegiatan: 'Ujian Akhir Semester (UAS)', tanggal: '1 – 5 Desember 2025', keterangan: 'Sesuai jadwal masing-masing prodi' },
    { kegiatan: 'Libur Semester Ganjil', tanggal: '29 Desember 2025 – 16 Januari 2026', keterangan: '-' },
  ] as KegiatanItem[],
}

const defaultSemesterGenap = {
  label: 'Semester Genap (Januari – Juli 2026)',
  kegiatan: [
    { kegiatan: 'Registrasi & Pengisian KRS Semester Genap', tanggal: '12 – 16 Januari 2026', keterangan: 'Online via SIAKAD' },
    { kegiatan: 'Awal Perkuliahan Semester Genap', tanggal: '19 Januari 2026', keterangan: '-' },
    { kegiatan: 'Ujian Tengah Semester (UTS)', tanggal: '16 – 20 Maret 2026', keterangan: 'Sesuai jadwal masing-masing prodi' },
    { kegiatan: 'Ujian Akhir Semester (UAS)', tanggal: '18 – 22 Mei 2026', keterangan: 'Sesuai jadwal masing-masing prodi' },
    { kegiatan: 'Wisuda', tanggal: 'Juli 2026', keterangan: 'Jadwal dan lokasi menyusul' },
    { kegiatan: 'Libur Semester Genap', tanggal: '15 Juni – 20 Juli 2026', keterangan: '-' },
  ] as KegiatanItem[],
}

const defaultKegiatanPenting: KegiatanPenting[] = [
  { nama: 'Pendaftaran PKL (Sem. 7)', tanggal: 'Juni 2026', keterangan: 'Syarat: lulus min. 100 SKS' },
  { nama: 'Sidang Tugas Akhir (Sem. 8)', tanggal: 'Mei – Juni 2026', keterangan: 'Daftar ke prodi masing-masing' },
  { nama: 'Wisuda Tahun Akademik 2025/2026', tanggal: 'Juli 2026', keterangan: 'Aula Serbaguna STTPU' },
  { nama: 'Penerimaan Mahasiswa Baru 2026/2027', tanggal: 'Maret – Juli 2026', keterangan: 'Lihat website PMB' },
]

export default async function KalenderContent() {
  let tahunAkademik = 'Tahun Akademik 2025/2026'
  let deskripsi = 'Kalender akademik resmi yang telah ditetapkan oleh Bagian Akademik STTPU Jakarta.'
  let pdfUrl: string | undefined
  let semesterGanjil = defaultSemesterGanjil
  let semesterGenap = defaultSemesterGenap
  let kegiatanPenting: KegiatanPenting[] = defaultKegiatanPenting

  try {
    const payload = await getPayloadClient()
    const global = await payload.findGlobal({ slug: 'kalender-akademik' })
    const data = global as unknown as {
      tahunAkademik?: string
      deskripsi?: string
      pdfUrl?: string
      semesterGanjil?: { label?: string; kegiatan?: KegiatanItem[] }
      semesterGenap?: { label?: string; kegiatan?: KegiatanItem[] }
      kegiatanPenting?: KegiatanPenting[]
    }

    if (data.tahunAkademik) tahunAkademik = data.tahunAkademik
    if (data.deskripsi) deskripsi = data.deskripsi
    if (data.pdfUrl) pdfUrl = data.pdfUrl
    if (data.semesterGanjil?.kegiatan && data.semesterGanjil.kegiatan.length > 0) {
      semesterGanjil = { label: data.semesterGanjil.label || defaultSemesterGanjil.label, kegiatan: data.semesterGanjil.kegiatan }
    }
    if (data.semesterGenap?.kegiatan && data.semesterGenap.kegiatan.length > 0) {
      semesterGenap = { label: data.semesterGenap.label || defaultSemesterGenap.label, kegiatan: data.semesterGenap.kegiatan }
    }
    if (data.kegiatanPenting && data.kegiatanPenting.length > 0) kegiatanPenting = data.kegiatanPenting
  } catch {
    // DB unavailable — use defaults
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8 sm:space-y-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-brand-navy text-lg mb-1">{tahunAkademik}</h2>
          <p className="text-gray-500 text-sm">{deskripsi}</p>
        </div>
        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-navy text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-brand-navy-dark transition-colors flex-shrink-0"
          >
            <Download size={15} aria-hidden="true" />
            Unduh PDF
          </a>
        )}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-5 flex items-start gap-3">
        <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-amber-800 text-sm leading-relaxed">
          Jadwal dapat berubah sewaktu-waktu sesuai kebijakan institusi dan hari libur nasional.
          Selalu cek SIAKAD dan pengumuman resmi untuk update terkini.
        </p>
      </div>

      {[semesterGanjil, semesterGenap].map((sem, semIdx) => (
        <div key={semIdx}>
          <h3 className="font-bold text-brand-navy text-base mb-4 flex items-center gap-2">
            <Calendar size={16} className="text-brand-gold" aria-hidden="true" />
            {sem.label}
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-[640px] w-full text-sm">
              <thead>
                <tr className="bg-brand-navy text-white">
                  <th className="text-left px-4 py-3 font-semibold w-8 rounded-tl-xl">No</th>
                  <th className="text-left px-4 py-3 font-semibold">Kegiatan</th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Tanggal</th>
                  <th className="text-left px-4 py-3 font-semibold rounded-tr-xl">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {sem.kegiatan.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-gray-200 last:border-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-brand-mist/50'}`}
                  >
                    <td className="px-4 py-3 text-gray-500 text-xs">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{item.kegiatan}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{item.tanggal}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{item.keterangan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <div>
        <h3 className="font-bold text-brand-navy text-base mb-4">Kegiatan Penting Lainnya</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {kegiatanPenting.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl">
              <div className="w-8 h-8 bg-brand-gold/15 rounded-lg flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <Calendar size={15} className="text-brand-navy" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{item.nama}</p>
                <p className="text-brand-navy text-xs font-medium mt-0.5">{item.tanggal}</p>
                {item.keterangan && <p className="text-gray-500 text-xs mt-0.5">{item.keterangan}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
