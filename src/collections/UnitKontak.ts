import type { CollectionConfig } from 'payload'
import { revalidateCollection, revalidateDelete } from '../lib/revalidate'

export const UnitKontak: CollectionConfig = {
  slug: 'unit-kontak',
  labels: { singular: 'Unit Kontak', plural: 'Unit Kontak' },
  admin: { useAsTitle: 'unit' },
  access: { read: () => true },
  fields: [
    { name: 'unit', type: 'text', label: 'Nama Unit / Bagian', required: true },
    { name: 'kepala', type: 'text', label: 'Kepala Unit' },
    { name: 'telepon', type: 'text', label: 'Telepon (format tampil, mis: (021) 555-1234)' },
    { name: 'telHref', type: 'text', label: 'Telepon href (mis: +62215551234)' },
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'tugas', type: 'textarea', label: 'Tugas Pokok' },
    { name: 'urutan', type: 'number', label: 'Urutan Tampil', defaultValue: 0 },
  ],
  hooks: {
    afterChange: [revalidateCollection(['/kontak'])],
    afterDelete: [revalidateDelete(['/kontak'])],
  },
}
