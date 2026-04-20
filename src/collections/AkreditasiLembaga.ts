import type { CollectionConfig } from 'payload'
import { revalidateCollection, revalidateDelete } from '../lib/revalidate'

export const AkreditasiLembaga: CollectionConfig = {
  slug: 'akreditasi-lembaga',
  labels: { singular: 'Lembaga Akreditasi', plural: 'Lembaga Akreditasi' },
  admin: { useAsTitle: 'nama' },
  access: { read: () => true },
  fields: [
    { name: 'nama', type: 'text', label: 'Nama Lembaga', required: true },
    { name: 'status', type: 'text', label: 'Status / Nilai Akreditasi', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo Lembaga' },
    { name: 'urutan', type: 'number', label: 'Urutan Tampil', defaultValue: 0 },
  ],
  hooks: {
    afterChange: [revalidateCollection(['/'])],
    afterDelete: [revalidateDelete(['/'])],
  },
}
