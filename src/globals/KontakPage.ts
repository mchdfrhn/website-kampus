import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../lib/revalidate'

export const KontakPage: GlobalConfig = {
  slug: 'kontak-page',
  label: 'Halaman Kontak',
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateGlobal(['/kontak'])],
  },
  fields: [
    { name: 'heroTitle', type: 'text', label: 'Judul Hero', defaultValue: 'Hubungi Kami' },
    { name: 'heroDescription', type: 'textarea', label: 'Deskripsi Hero' },
    { name: 'formTitle', type: 'text', label: 'Judul Formulir', defaultValue: 'Kirim Pesan' },
    {
      name: 'directChannels',
      type: 'array',
      label: 'Saluran Langsung',
      fields: [
        { name: 'icon', type: 'text', label: 'Kunci Ikon (whatsapp, email, phone, map)' },
        { name: 'label', type: 'text', label: 'Label', required: true },
        { name: 'desc', type: 'text', label: 'Deskripsi' },
        { name: 'href', type: 'text', label: 'Link Tujuan', required: true },
        { name: 'external', type: 'checkbox', label: 'Buka di tab baru?' },
      ],
    },
    {
      name: 'faqLinks',
      type: 'array',
      label: 'Pusat Informasi',
      fields: [
        { name: 'label', type: 'text', label: 'Label', required: true },
        { name: 'href', type: 'text', label: 'Link Tujuan', required: true },
      ],
    },
    {
      name: 'directions',
      type: 'array',
      label: 'Petunjuk Arah',
      fields: [
        { name: 'emoji', type: 'text', label: 'Emoji / Ikon', required: true },
        { name: 'heading', type: 'text', label: 'Judul', required: true },
        {
          name: 'steps',
          type: 'array',
          label: 'Langkah',
          fields: [
            { name: 'text', type: 'text', label: 'Isi Langkah', required: true },
          ],
        },
      ],
    },
  ],
}
