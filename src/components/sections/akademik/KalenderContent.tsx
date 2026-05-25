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
    <article className="py-10 sm:py-12 space-y-10 sm:space-y-12">
      {pdfUrl && (
        <div className="flex justify-end">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-navy text-white text-xs font-bold uppercase tracking-wider px-5 py-3.5 rounded-xl hover:bg-brand-gold hover:text-brand-navy transition-all shadow-md shrink-0"
          >
            <Download size={14} aria-hidden="true" />
            Unduh PDF
          </a>
        </div>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3 shadow-sm">
        <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-amber-800 text-xs sm:text-sm font-semibold leading-relaxed">
          Jadwal dapat berubah sewaktu-waktu sesuai kebijakan institusi dan hari libur nasional.
          Selalu cek SIAKAD dan pengumuman resmi untuk update terkini.
        </p>
      </div>

      {[semesterGanjil, semesterGenap].map((sem, semIdx) => (
        <SectionCard
          key={semIdx}
          title={sem.label}
          eyebrow={semIdx === 0 ? "FALL SEMESTER" : "SPRING SEMESTER"}
        >
          <div className="overflow-x-auto rounded-2xl border border-gray-150 shadow-sm">
            <table className="min-w-[640px] w-full text-sm">
              <thead>
                <tr className="bg-brand-navy text-white">
                  <th className="text-left px-5 py-4 font-bold text-xs uppercase tracking-wider w-8 rounded-tl-2xl">No</th>
                  <th className="text-left px-5 py-4 font-bold text-xs uppercase tracking-wider">Kegiatan</th>
                  <th className="text-left px-5 py-4 font-bold text-xs uppercase tracking-wider whitespace-nowrap">Tanggal</th>
                  <th className="text-left px-5 py-4 font-bold text-xs uppercase tracking-wider rounded-tr-2xl">Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {sem.kegiatan.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-brand-mist/20 transition-colors duration-150 ${idx % 2 === 0 ? 'bg-white' : 'bg-brand-mist/10'}`}
                  >
                    <td className="px-5 py-4 text-gray-400 font-bold text-xs">{idx + 1}</td>
                    <td className="px-5 py-4 font-bold text-brand-navy">{item.kegiatan}</td>
                    <td className="px-5 py-4 text-gray-500 font-semibold whitespace-nowrap">{item.tanggal}</td>
                    <td className="px-5 py-4 text-gray-400 font-semibold text-xs">{item.keterangan || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      ))}

      <SectionCard title="Kegiatan Penting Lainnya" eyebrow="OTHER KEY EVENTS">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {kegiatanPenting.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-4 p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:border-brand-navy/10 hover:shadow-premium transition-all duration-300"
            >
              <div className="w-10 h-10 bg-brand-navy/5 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <Calendar size={18} className="text-brand-navy" />
              </div>
              <div>
                <p className="font-bold text-brand-navy text-sm sm:text-base leading-snug">{item.nama}</p>
                <p className="text-brand-gold text-xs font-bold mt-1.5 uppercase tracking-wider">{item.tanggal}</p>
                {item.keterangan && <p className="text-gray-500 text-xs font-semibold mt-1">{item.keterangan}</p>}
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>
    </article>
  );
}
