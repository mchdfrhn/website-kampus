import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../lib/revalidate'

export const LpmiPage: GlobalConfig = {
  slug: 'lpmi-page',
  label: 'Halaman LPMI',
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateGlobal(['/lpmi', '/lpmi/[slug]'])],
  },
  fields: [
    {
      name: 'sidebarTitle',
      type: 'text',
      label: 'Judul Sidebar',
      defaultValue: 'Menu LPMI',
    },
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
      name: 'subpages',
      type: 'array',
      label: 'Konfigurasi Subhalaman',
      fields: [
        { name: 'slug', type: 'text', label: 'Slug', required: true },
        { name: 'title', type: 'text', label: 'Judul', required: true },
        { name: 'subtitle', type: 'textarea', label: 'Subtitle' },
        { name: 'contentTitle', type: 'text', label: 'Judul Konten Utama' },
        { name: 'contentSubtitle', type: 'textarea', label: 'Deskripsi Konten Utama' },
        { name: 'breadcrumb', type: 'text', label: 'Breadcrumb' },
        { name: 'intro', type: 'textarea', label: 'Teks Pengantar' },
        {
          name: 'highlights',
          type: 'array',
          label: 'Highlights (Kelebihan/Nilai)',
          fields: [
            { name: 'title', type: 'text', label: 'Judul', required: true },
            { name: 'description', type: 'textarea', label: 'Deskripsi', required: true },
          ],
        },
        {
          name: 'standards',
          type: 'array',
          label: 'Ruang Lingkup Standar',
          fields: [
            { name: 'text', type: 'text', label: 'Butir Standar', required: true },
          ],
        },
        {
          name: 'documents',
          type: 'array',
          label: 'Dokumen Terkait',
          fields: [
            { name: 'text', type: 'text', label: 'Nama Dokumen Terkait', required: true },
          ],
        },
      ],
    },
  ],
}
