import type { CollectionConfig } from 'payload'
import { revalidateCollection, revalidateDelete } from '../lib/revalidate'

const lpmiPaths = [
  '/lpmi',
  '/lpmi/kebijakan',
  '/lpmi/pedoman',
  '/lpmi/standar-pendidikan',
  '/lpmi/standar-penelitian',
  '/lpmi/standar-pkm',
  '/sitemap.xml',
]

export const LpmiDokumen: CollectionConfig = {
  slug: 'lpmi-dokumen',
  labels: { singular: 'Dokumen LPMI', plural: 'Dokumen LPMI' },
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'section', 'status', 'urutan'],
    group: 'LPMI',
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user != null,
    update: ({ req }) => req.user != null,
    delete: ({ req }) => req.user != null,
  },
  fields: [
    { name: 'judul', type: 'text', label: 'Judul Dokumen', required: true },
    {
      name: 'section',
      type: 'select',
      label: 'Halaman LPMI',
      required: true,
      options: [
        { label: 'Kebijakan', value: 'kebijakan' },
        { label: 'Pedoman', value: 'pedoman' },
        { label: 'Standar Pendidikan', value: 'standar-pendidikan' },
        { label: 'Standar Penelitian', value: 'standar-penelitian' },
        { label: 'Standar PKM', value: 'standar-pkm' },
      ],
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: 'File Dokumen',
      required: true,
      admin: {
        description: 'Upload file PDF/DOC/DOCX/XLS/XLSX melalui Media, lalu pilih di sini.',
      },
    },
    { name: 'deskripsi', type: 'textarea', label: 'Deskripsi Singkat' },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'terbit',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Terbit', value: 'terbit' },
      ],
      admin: { position: 'sidebar' },
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
    afterChange: [revalidateCollection(lpmiPaths)],
    afterDelete: [revalidateDelete(lpmiPaths)],
  },
}
