import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../lib/revalidate'

export const KemahasiswaanPage: GlobalConfig = {
  slug: 'kemahasiswaan-page',
  label: 'Halaman Kemahasiswaan',
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateGlobal(['/kemahasiswaan'])],
  },
  fields: [
    { name: 'heroTitle', type: 'text', label: 'Judul Hero', defaultValue: 'Kemahasiswaan' },
    { name: 'heroDescription', type: 'textarea', label: 'Deskripsi Hero' },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistik',
      fields: [
        { name: 'value', type: 'text', label: 'Nilai', required: true },
        { name: 'label', type: 'text', label: 'Label', required: true },
      ],
    },
    { name: 'introText', type: 'textarea', label: 'Teks Pengantar' },
    {
      name: 'sections',
      type: 'array',
      label: 'Kartu Section',
      fields: [
        { name: 'title', type: 'text', label: 'Judul', required: true },
        { name: 'desc', type: 'textarea', label: 'Deskripsi' },
        { name: 'href', type: 'text', label: 'Link Tujuan', required: true },
      ],
    },
  ],
}
