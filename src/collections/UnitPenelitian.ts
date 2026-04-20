import type { CollectionConfig } from 'payload'
import { revalidateCollection, revalidateDelete } from '../lib/revalidate'

export const UnitPenelitian: CollectionConfig = {
  slug: 'unit-penelitian',
  labels: { singular: 'Unit Penelitian & Lab', plural: 'Unit Penelitian & Lab' },
  admin: { useAsTitle: 'nama' },
  access: { read: () => true },
  fields: [
    { name: 'nama', type: 'text', label: 'Nama Unit / Lab', required: true },
    { name: 'singkatan', type: 'text', label: 'Singkatan (mis: PPIK)' },
    { name: 'kepala', type: 'text', label: 'Kepala Unit / Koordinator' },
    { name: 'deskripsi', type: 'textarea', label: 'Deskripsi Singkat', required: true },
    {
      name: 'fokus',
      type: 'array',
      label: 'Fokus Riset',
      fields: [{ name: 'poin', type: 'text', label: 'Bidang Fokus', required: true }],
    },
    { name: 'lokasi', type: 'text', label: 'Lokasi (Gedung/Lantai)' },
    { name: 'kontak', type: 'text', label: 'Kontak (Email/Telp)' },
    { name: 'anggota', type: 'number', label: 'Jumlah Anggota / Peneliti', defaultValue: 0 },
    { name: 'urutan', type: 'number', label: 'Urutan Tampil', defaultValue: 0 },
  ],
  hooks: {
    afterChange: [revalidateCollection(['/penelitian/unit'])],
    afterDelete: [revalidateDelete(['/penelitian/unit'])],
  },
}
