import type { GlobalConfig } from 'payload'

const kegiatanFields = [
  { name: 'kegiatan', type: 'text' as const, label: 'Kegiatan', required: true as const },
  { name: 'tanggal', type: 'text' as const, label: 'Tanggal / Rentang', required: true as const },
  { name: 'keterangan', type: 'text' as const, label: 'Keterangan' },
]

export const KalenderAkademik: GlobalConfig = {
  slug: 'kalender-akademik',
  label: 'Kalender Akademik',
  access: { read: () => true },
  fields: [
    { name: 'tahunAkademik', type: 'text', label: 'Tahun Akademik (mis: 2025/2026)', required: true },
    { name: 'deskripsi', type: 'text', label: 'Deskripsi singkat' },
    { name: 'pdfUrl', type: 'text', label: 'URL PDF Kalender (tombol Unduh PDF)' },
    {
      name: 'semesterGanjil',
      type: 'group',
      label: 'Semester Ganjil',
      fields: [
        { name: 'label', type: 'text', label: 'Label (mis: Semester Ganjil Juli – Desember 2025)' },
        { name: 'kegiatan', type: 'array', label: 'Daftar Kegiatan', fields: kegiatanFields },
      ],
    },
    {
      name: 'semesterGenap',
      type: 'group',
      label: 'Semester Genap',
      fields: [
        { name: 'label', type: 'text', label: 'Label (mis: Semester Genap Januari – Juli 2026)' },
        { name: 'kegiatan', type: 'array', label: 'Daftar Kegiatan', fields: kegiatanFields },
      ],
    },
    {
      name: 'kegiatanPenting',
      type: 'array',
      label: 'Kegiatan Penting Lainnya',
      fields: [
        { name: 'nama', type: 'text', label: 'Nama Kegiatan', required: true },
        { name: 'tanggal', type: 'text', label: 'Tanggal', required: true },
        { name: 'keterangan', type: 'text', label: 'Keterangan' },
      ],
    },
  ],
}
