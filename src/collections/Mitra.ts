import type { CollectionConfig } from 'payload'
import { revalidateCollection, revalidateDelete } from '../lib/revalidate'

export const Mitra: CollectionConfig = {
  slug: 'mitra',
  labels: { singular: 'Mitra', plural: 'Mitra' },
  admin: {
    useAsTitle: 'nama',
    defaultColumns: ['nama', 'kategori', 'aktif', 'urutan'],
  },
  access: { read: () => true },
  fields: [
    { name: 'nama', type: 'text', label: 'Nama Mitra', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo Mitra', required: true },
    { name: 'kategori', type: 'text', label: 'Kategori', admin: { description: 'Contoh: Industri, Pemerintah, Pendidikan, Asosiasi' } },
    { name: 'url', type: 'text', label: 'Website Mitra' },
    {
      name: 'aktif',
      type: 'checkbox',
      label: 'Tampilkan di Beranda',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'urutan',
      type: 'number',
      label: 'Urutan Tampilan',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    afterChange: [revalidateCollection(['/'])],
    afterDelete: [revalidateDelete(['/'])],
  },
}
