import type { CollectionConfig } from 'payload'
import { revalidateCollection, revalidateDelete } from '../lib/revalidate'

export const Hibah: CollectionConfig = {
  slug: 'hibah',
  labels: { singular: 'Hibah Penelitian', plural: 'Hibah Penelitian' },
  admin: { useAsTitle: 'nama' },
  access: { read: () => true },
  fields: [
    { name: 'nama', type: 'text', label: 'Nama Hibah / Skema', required: true },
    { name: 'penyelenggara', type: 'text', label: 'Penyelenggara', required: true },
    { name: 'deskripsi', type: 'textarea', label: 'Deskripsi Hibah' },
    {
      name: 'persyaratan',
      type: 'array',
      label: 'Persyaratan Utama',
      fields: [{ name: 'poin', type: 'text', label: 'Poin Syarat', required: true }],
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status Pendaftaran',
      defaultValue: 'buka',
      options: [
        { label: 'Buka', value: 'buka' },
        { label: 'Tutup', value: 'tutup' },
        { label: 'Periodik', value: 'periodik' },
      ],
    },
    { name: 'deadline', type: 'text', label: 'Deadline' },
    { name: 'url', type: 'text', label: 'URL Informasi (opsional)' },
    { name: 'urutan', type: 'number', label: 'Urutan Tampil', defaultValue: 0 },
  ],
  hooks: {
    afterChange: [revalidateCollection(['/penelitian/hibah'])],
    afterDelete: [revalidateDelete(['/penelitian/hibah'])],
  },
}
