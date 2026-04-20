import type { CollectionConfig } from 'payload'
import { revalidateCollection, revalidateDelete } from '../lib/revalidate'

export const Prestasi: CollectionConfig = {
  slug: 'prestasi',
  labels: { singular: 'Prestasi', plural: 'Prestasi' },
  admin: { useAsTitle: 'judul' },
  access: { read: () => true },
  fields: [
    { name: 'judul', type: 'text', label: 'Judul Kompetisi/Prestasi', required: true },
    {
      name: 'mahasiswa',
      type: 'array',
      label: 'Daftar Mahasiswa',
      fields: [{ name: 'nama', type: 'text', label: 'Nama Mahasiswa' }],
      required: true,
    },
    { name: 'prodi', type: 'text', label: 'Program Studi', required: true },
    { name: 'penyelenggara', type: 'text', label: 'Penyelenggara', required: true },
    { name: 'peringkat', type: 'text', label: 'Peringkat (e.g. Juara I)', required: true },
    {
      name: 'tingkat',
      type: 'select',
      label: 'Tingkat',
      required: true,
      options: [
        { label: 'Nasional', value: 'Nasional' },
        { label: 'Internasional', value: 'Internasional' },
        { label: 'Regional', value: 'Regional' },
      ],
    },
    { name: 'tahun', type: 'number', label: 'Tahun', required: true },
    { name: 'deskripsi', type: 'textarea', label: 'Deskripsi Singkat', required: true },
    {
      name: 'urutan',
      type: 'number',
      label: 'Urutan Tampilan',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    afterChange: [revalidateCollection(['/kemahasiswaan/prestasi'])],
    afterDelete: [revalidateDelete(['/kemahasiswaan/prestasi'])],
  },
}
