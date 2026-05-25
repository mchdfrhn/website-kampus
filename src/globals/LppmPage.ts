import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../lib/revalidate'

export const LppmPage: GlobalConfig = {
  slug: 'lppm-page',
  label: 'Halaman LPPM',
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateGlobal(['/lppm', '/lppm/[slug]'])],
  },
  fields: [
    {
      name: 'sidebarTitle',
      type: 'text',
      label: 'Judul Sidebar',
      defaultValue: 'Menu LPPM',
    },
    {
      name: 'subpages',
      type: 'array',
      label: 'Konfigurasi Subhalaman',
      fields: [
        { name: 'slug', type: 'text', label: 'Slug', required: true },
        { name: 'title', type: 'text', label: 'Judul', required: true },
        { name: 'subtitle', type: 'textarea', label: 'Subtitle' },
        { name: 'breadcrumb', type: 'text', label: 'Breadcrumb' },
      ],
    },
  ],
}
