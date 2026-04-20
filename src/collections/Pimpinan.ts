import type { CollectionConfig } from 'payload'
import { revalidateCollection, revalidateDelete } from '../lib/revalidate'

export const Pimpinan: CollectionConfig = {
  slug: 'pimpinan',
  labels: { singular: 'Pimpinan', plural: 'Pimpinan' },
  admin: { useAsTitle: 'nama' },
  access: { read: () => true },
  fields: [
    { name: 'jabatan', type: 'text', label: 'Jabatan', required: true },
    { name: 'nama', type: 'text', label: 'Nama Lengkap + Gelar', required: true },
    { name: 'nip', type: 'text', label: 'NIP' },
    { name: 'keahlian', type: 'text', label: 'Bidang Keahlian' },
    { name: 'foto', type: 'upload', relationTo: 'media', label: 'Foto Resmi' },
    {
      name: 'pendidikan',
      type: 'array',
      label: 'Riwayat Pendidikan',
      fields: [
        { name: 'jenjang', type: 'text', label: 'Deskripsi (mis: S3 Teknik Sipil — UI)', required: true },
      ],
    },
    { name: 'pengalaman', type: 'textarea', label: 'Ringkasan Pengalaman' },
    { name: 'sambutan', type: 'textarea', label: 'Sambutan (khusus Ketua, opsional)' },
    { name: 'urutan', type: 'number', label: 'Urutan Tampil (0 = paling atas)', defaultValue: 0 },
  ],
  hooks: {
    afterChange: [revalidateCollection(['/tentang/pimpinan'])],
  },
}
