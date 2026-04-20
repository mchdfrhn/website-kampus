import type { CollectionConfig } from 'payload'
import { revalidateCollection, revalidateDelete } from '../lib/revalidate'

export const Testimonial: CollectionConfig = {
  slug: 'testimonial',
  labels: { singular: 'Testimonial', plural: 'Testimonial' },
  admin: { useAsTitle: 'nama' },
  access: { read: () => true },
  fields: [
    { name: 'teks', type: 'textarea', label: 'Isi Testimonial', required: true },
    { name: 'nama', type: 'text', label: 'Nama Alumni', required: true },
    { name: 'prodi', type: 'text', label: 'Program Studi & Angkatan', required: true },
    { name: 'foto', type: 'upload', relationTo: 'media', label: 'Foto (opsional)' },
    { name: 'urutan', type: 'number', label: 'Urutan Tampil', defaultValue: 0 },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'aktif',
      options: [
        { label: 'Aktif', value: 'aktif' },
        { label: 'Nonaktif', value: 'nonaktif' },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateCollection(['/'])],
    afterDelete: [revalidateDelete(['/'])],
  },
}
