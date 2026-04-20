import type { CollectionConfig } from 'payload'
import { revalidateCollection, revalidateDelete } from '../lib/revalidate'

export const Publikasi: CollectionConfig = {
  slug: 'publikasi',
  labels: { singular: 'Publikasi', plural: 'Publikasi' },
  admin: { useAsTitle: 'judul' },
  access: { read: () => true },
  fields: [
    { name: 'judul', type: 'text', label: 'Judul Publikasi', required: true },
    {
      name: 'penulis',
      type: 'array',
      label: 'Daftar Penulis',
      fields: [{ name: 'nama', type: 'text', label: 'Nama Penulis' }],
      required: true,
    },
    { name: 'tahun', type: 'number', label: 'Tahun Terbit', required: true },
    {
      name: 'jenis',
      type: 'select',
      label: 'Jenis Publikasi',
      required: true,
      options: [
        { label: 'Jurnal', value: 'jurnal' },
        { label: 'Prosiding', value: 'prosiding' },
        { label: 'Buku', value: 'buku' },
      ],
    },
    { name: 'penerbit', type: 'text', label: 'Penerbit / Nama Jurnal', required: true },
    { name: 'url', type: 'text', label: 'URL Publikasi (opsional)' },
    { name: 'prodi', type: 'text', label: 'Program Studi Terkait' },
    {
      name: 'urutan',
      type: 'number',
      label: 'Urutan Tampilan',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    afterChange: [revalidateCollection(['/penelitian/publikasi'])],
    afterDelete: [revalidateDelete(['/penelitian/publikasi'])],
  },
}
