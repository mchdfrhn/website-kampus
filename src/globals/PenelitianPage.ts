import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../lib/revalidate'

export const PenelitianPage: GlobalConfig = {
  slug: 'penelitian-page',
  label: 'Halaman Penelitian',
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateGlobal(['/penelitian'])],
  },
  fields: [
    { name: 'heroTitle', type: 'text', label: 'Judul Hero', defaultValue: 'Penelitian & Pengabdian' },
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
    {
      name: 'sections',
      type: 'array',
      label: 'Kartu Section',
      fields: [
        { name: 'title', type: 'text', label: 'Judul', required: true },
        { name: 'desc', type: 'textarea', label: 'Deskripsi' },
        { name: 'cta', type: 'text', label: 'Teks CTA' },
        { name: 'href', type: 'text', label: 'Link Tujuan', required: true },
      ],
    },
  ],
}
