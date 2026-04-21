import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../lib/revalidate'

export const AkademikPage: GlobalConfig = {
  slug: 'akademik-page',
  label: 'Halaman Akademik',
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateGlobal(['/akademik/program-studi', '/akademik/dosen', '/akademik/kalender', '/akademik/beasiswa'])],
  },
  fields: [
    {
      name: 'sidebarTitle',
      type: 'text',
      label: 'Judul Sidebar',
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Konfigurasi Subhalaman',
      fields: [
        { name: 'slug', type: 'text', label: 'Slug', required: true },
        { name: 'title', type: 'text', label: 'Judul', required: true },
        { name: 'subtitle', type: 'textarea', label: 'Subtitle' },
        { name: 'breadcrumb', type: 'text', label: 'Breadcrumb' },
      ],
    },
    {
      name: 'programStudiContent',
      type: 'group',
      label: 'Konten Program Studi',
      fields: [
        { name: 'gridTitle', type: 'text', label: 'Judul Grid' },
        { name: 'gridDescription', type: 'textarea', label: 'Deskripsi Grid' },
        { name: 'consultationTitle', type: 'text', label: 'Judul CTA Konsultasi' },
        { name: 'consultationDescription', type: 'textarea', label: 'Deskripsi CTA Konsultasi' },
        { name: 'consultationPrimaryLabel', type: 'text', label: 'Teks Tombol Utama' },
        { name: 'consultationPrimaryHref', type: 'text', label: 'Link Tombol Utama' },
        { name: 'consultationSecondaryLabel', type: 'text', label: 'Teks Tombol Kedua' },
        { name: 'consultationSecondaryHref', type: 'text', label: 'Link Tombol Kedua' },
        { name: 'detailCareerTitle', type: 'text', label: 'Judul Box PMB' },
        { name: 'detailCareerDescription', type: 'textarea', label: 'Deskripsi Box PMB' },
        { name: 'detailCareerButtonLabel', type: 'text', label: 'Teks Tombol Box PMB' },
        { name: 'detailCareerButtonHref', type: 'text', label: 'Link Tombol Box PMB' },
        { name: 'detailInfoTitle', type: 'text', label: 'Judul Box Informasi' },
        { name: 'detailInfoDescription', type: 'textarea', label: 'Deskripsi Box Informasi' },
        { name: 'detailInfoButtonLabel', type: 'text', label: 'Teks Tombol Box Informasi' },
        { name: 'detailInfoButtonHref', type: 'text', label: 'Link Tombol Box Informasi' },
      ],
    },
    {
      name: 'dosenContent',
      type: 'group',
      label: 'Konten Dosen',
      fields: [
        { name: 'gridIntroText', type: 'textarea', label: 'Teks Pengantar Grid Dosen' },
      ],
    },
    {
      name: 'beasiswaContent',
      type: 'group',
      label: 'Konten Beasiswa',
      fields: [
        { name: 'infoText', type: 'textarea', label: 'Teks Informasi Atas' },
        { name: 'internalTitle', type: 'text', label: 'Judul Beasiswa Internal' },
        { name: 'internalDescription', type: 'textarea', label: 'Deskripsi Beasiswa Internal' },
        { name: 'externalTitle', type: 'text', label: 'Judul Beasiswa Eksternal' },
        { name: 'externalDescription', type: 'textarea', label: 'Deskripsi Beasiswa Eksternal' },
      ],
    },
  ],
}
