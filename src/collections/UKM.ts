import type { CollectionConfig } from 'payload'
import { revalidateCollection, revalidateDelete } from '../lib/revalidate'

export const UKM: CollectionConfig = {
  slug: 'ukm',
  labels: { singular: 'UKM', plural: 'UKM' },
  admin: { useAsTitle: 'nama' },
  access: { read: () => true },
  fields: [
    { name: 'nama', type: 'text', label: 'Nama UKM', required: true },
    {
      name: 'bidang',
      type: 'select',
      label: 'Bidang',
      required: true,
      options: [
        { label: 'Olahraga', value: 'Olahraga' },
        { label: 'Seni & Budaya', value: 'Seni & Budaya' },
        { label: 'Riset & Teknologi', value: 'Riset & Teknologi' },
        { label: 'Sosial & Keagamaan', value: 'Sosial & Keagamaan' },
      ],
    },
    { name: 'deskripsi', type: 'textarea', label: 'Deskripsi', required: true },
    { name: 'prestasi', type: 'text', label: 'Prestasi Terkini (opsional)' },
    { name: 'anggota', type: 'number', label: 'Jumlah Anggota' },
    { name: 'kontak', type: 'email', label: 'Email Kontak' },
    { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo UKM (opsional)' },
  ],
  hooks: {
    afterChange: [revalidateCollection(['/kemahasiswaan/ukm'])],
    afterDelete: [revalidateDelete(['/kemahasiswaan/ukm'])],
  },
}
