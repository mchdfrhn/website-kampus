import type { CollectionConfig } from 'payload'
import { revalidateCollection, revalidateDelete } from '../lib/revalidate'

export const Layanan: CollectionConfig = {
  slug: 'layanan',
  labels: { singular: 'Layanan', plural: 'Layanan' },
  admin: { useAsTitle: 'nama' },
  access: { read: () => true },
  fields: [
    { name: 'nama', type: 'text', label: 'Nama Layanan', required: true },
    {
      name: 'icon',
      type: 'select',
      label: 'Icon (Lucide)',
      required: true,
      options: [
        { label: 'Heart Handshake (Konseling)', value: 'HeartHandshake' },
        { label: 'Briefcase (Karir)', value: 'Briefcase' },
        { label: 'Book Open (Akademik)', value: 'BookOpen' },
        { label: 'Shield Alert (Kesehatan/Aman)', value: 'ShieldAlert' },
        { label: 'Landmark (Administrasi)', value: 'Landmark' },
        { label: 'Message Square (Pengaduan)', value: 'MessageSquare' },
      ],
    },
    { name: 'deskripsi', type: 'textarea', label: 'Deskripsi', required: true },
    { name: 'jam', type: 'text', label: 'Jam Operasional' },
    { name: 'lokasi', type: 'text', label: 'Lokasi Unit' },
    {
      name: 'kontak',
      type: 'array',
      label: 'Daftar Kontak',
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Jenis Kontak',
          options: [
            { label: 'Telepon', value: 'tel' },
            { label: 'Email', value: 'email' },
            { label: 'WhatsApp', value: 'wa' },
          ],
        },
        { name: 'value', type: 'text', label: 'Nilai Kontak' },
      ],
    },
    {
      name: 'layananDetail',
      type: 'array',
      label: 'Detail Layanan',
      fields: [{ name: 'poin', type: 'text', label: 'Nama Layanan' }],
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
    afterChange: [revalidateCollection(['/kemahasiswaan/layanan'])],
    afterDelete: [revalidateDelete(['/kemahasiswaan/layanan'])],
  },
}
