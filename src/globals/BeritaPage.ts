import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../lib/revalidate'

export const BeritaPage: GlobalConfig = {
  slug: 'berita-page',
  label: 'Halaman Berita',
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateGlobal(['/berita'])],
  },
  fields: [
    { name: 'title', type: 'text', label: 'Judul Halaman', defaultValue: 'Berita & Pengumuman' },
    { name: 'description', type: 'textarea', label: 'Deskripsi Halaman' },
    { name: 'contactCtaTitle', type: 'text', label: 'Judul CTA Kontak' },
    { name: 'contactCtaDescription', type: 'textarea', label: 'Deskripsi CTA Kontak' },
    { name: 'contactCtaButtonLabel', type: 'text', label: 'Teks Tombol CTA' },
    { name: 'contactCtaButtonHref', type: 'text', label: 'Link Tombol CTA' },
  ],
}
