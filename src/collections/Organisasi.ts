import type { CollectionConfig } from 'payload'
import { revalidateCollection, revalidateDelete } from '../lib/revalidate'

export const Organisasi: CollectionConfig = {
  slug: 'organisasi',
  labels: { singular: 'Organisasi', plural: 'Organisasi' },
  admin: { useAsTitle: 'nama' },
  access: { read: () => true },
  fields: [
    { name: 'nama', type: 'text', label: 'Nama Organisasi', required: true },
    { name: 'singkatan', type: 'text', label: 'Singkatan', required: true },
    { name: 'deskripsi', type: 'textarea', label: 'Deskripsi', required: true },
    { name: 'ketua', type: 'text', label: 'Nama Ketua & Angkatan' },
    {
      name: 'program',
      type: 'array',
      label: 'Program Unggulan',
      fields: [{ name: 'nama', type: 'text', label: 'Nama Program' }],
    },
    { name: 'kontak', type: 'email', label: 'Email Kontak' },
    { name: 'instagram', type: 'text', label: 'Handle Instagram (e.g. @bem.sttpu)' },
    {
      name: 'urutan',
      type: 'number',
      label: 'Urutan Tampilan',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    afterChange: [revalidateCollection(['/kemahasiswaan/organisasi'])],
    afterDelete: [revalidateDelete(['/kemahasiswaan/organisasi'])],
  },
}
