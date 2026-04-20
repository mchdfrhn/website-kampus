import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../lib/revalidate'

export const PanduanMaba: GlobalConfig = {
  slug: 'panduan-maba',
  label: 'Panduan Mahasiswa Baru',
  access: { read: () => true },
  fields: [
    { name: 'judul', type: 'text', label: 'Judul Halaman', defaultValue: 'Selamat Datang di STTPU Jakarta!' },
    { name: 'deskripsi', type: 'textarea', label: 'Deskripsi Sambutan' },
    {
      name: 'langkah',
      type: 'array',
      label: 'Langkah-Langkah Awal',
      fields: [
        { name: 'judul', type: 'text', label: 'Judul Langkah', required: true },
        { name: 'tenggat', type: 'text', label: 'Tenggat Waktu / Jadwal' },
        { name: 'deskripsi', type: 'textarea', label: 'Keterangan Langkah' },
        { name: 'link', type: 'text', label: 'Link Terkait (opsional)' },
        {
          name: 'status',
          type: 'select',
          label: 'Status',
          options: [
            { label: 'Wajib', value: 'wajib' },
            { label: 'Penting', value: 'penting' },
            { label: 'Dianjurkan', value: 'dianjurkan' },
          ],
        },
      ],
    },
    {
      name: 'tips',
      type: 'array',
      label: 'Tips Sukses',
      fields: [{ name: 'tip', type: 'text', label: 'Isi Tip' }],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal(['/kemahasiswaan/mahasiswa-baru'])],
  },
}
