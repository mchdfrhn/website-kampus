import type { CollectionConfig } from 'payload'

export const Beasiswa: CollectionConfig = {
  slug: 'beasiswa',
  labels: { singular: 'Beasiswa', plural: 'Beasiswa' },
  admin: { useAsTitle: 'nama' },
  access: { read: () => true },
  fields: [
    { name: 'nama', type: 'text', label: 'Nama Beasiswa', required: true },
    { name: 'penyelenggara', type: 'text', label: 'Penyelenggara', required: true },
    {
      name: 'tipe',
      type: 'select',
      label: 'Tipe',
      required: true,
      defaultValue: 'internal',
      options: [
        { label: 'Internal STTPU', value: 'internal' },
        { label: 'Eksternal', value: 'eksternal' },
      ],
    },
    { name: 'jenis', type: 'text', label: 'Jenis (mis: Pembebasan UKT, Beasiswa Penuh)' },
    { name: 'nilai', type: 'text', label: 'Nilai Beasiswa' },
    {
      name: 'syarat',
      type: 'array',
      label: 'Syarat Utama',
      fields: [{ name: 'poin', type: 'text', label: 'Poin Syarat', required: true }],
    },
    { name: 'deadline', type: 'text', label: 'Deadline / Periode' },
    {
      name: 'status',
      type: 'select',
      label: 'Status Pendaftaran',
      defaultValue: 'buka',
      options: [
        { label: 'Buka', value: 'buka' },
        { label: 'Tutup', value: 'tutup' },
        { label: 'Tahunan', value: 'tahunan' },
        { label: 'Periodik', value: 'periodik' },
        { label: 'Conditional', value: 'conditional' },
        { label: 'Buka saat PMB', value: 'buka-pmb' },
      ],
    },
    { name: 'deskripsi', type: 'textarea', label: 'Deskripsi' },
    { name: 'url', type: 'text', label: 'URL Website (opsional)' },
    { name: 'urutan', type: 'number', label: 'Urutan Tampil', defaultValue: 0 },
  ],
}
