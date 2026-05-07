import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../lib/revalidate'

export const PortalLinks: GlobalConfig = {
  slug: 'portal-links',
  label: 'Tautan Portal',
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateGlobal(['/portal'])],
  },
  fields: [
    {
      name: 'portals',
      type: 'array',
      label: 'Daftar Portal',
      fields: [
        { name: 'nama', type: 'text', label: 'Nama Portal', required: true },
        {
          name: 'kategori',
          type: 'select',
          label: 'Kategori',
          defaultValue: 'layanan',
          required: true,
          options: [
            { label: 'Penerimaan Mahasiswa Baru', value: 'penerimaan' },
            { label: 'Akademik', value: 'akademik' },
            { label: 'Pembelajaran', value: 'pembelajaran' },
            { label: 'Layanan Referensi', value: 'referensi' },
            { label: 'Portal Nasional', value: 'nasional' },
            { label: 'Layanan Kampus', value: 'layanan' },
          ],
          admin: { width: '50%' },
        },
        { name: 'url', type: 'text', label: 'URL Portal', required: true },
        { name: 'deskripsi', type: 'text', label: 'Deskripsi Singkat' },
        { name: 'icon', type: 'text', label: 'Icon (Lucide name)' },
      ],
    },
    {
      name: 'tautanCepat',
      type: 'array',
      label: 'Tautan Cepat (Footer/Menu)',
      fields: [
        { name: 'label', type: 'text', label: 'Label', required: true },
        { name: 'url', type: 'text', label: 'URL', required: true },
      ],
    },
    {
      name: 'bantuanTeknis',
      type: 'group',
      label: 'Bantuan Teknis',
      fields: [
        {
          name: 'judul',
          type: 'text',
          label: 'Judul',
          defaultValue: 'Butuh Bantuan Teknis?',
        },
        {
          name: 'deskripsi',
          type: 'textarea',
          label: 'Deskripsi',
          defaultValue:
            'Jika mengalami kendala akses atau lupa kata sandi, hubungi UPT Teknologi Informasi STTPU.',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email Bantuan',
          defaultValue: 'it@sttpu.ac.id',
        },
        {
          name: 'emailLabel',
          type: 'text',
          label: 'Label Tombol Email',
          defaultValue: 'it@sttpu.ac.id',
        },
        {
          name: 'whatsappLabel',
          type: 'text',
          label: 'Label Tombol WhatsApp',
          defaultValue: 'Chat WhatsApp Bantuan',
        },
        {
          name: 'whatsappUrl',
          type: 'text',
          label: 'Link WhatsApp',
          admin: {
            description: 'Contoh: https://wa.me/6281234567890',
          },
        },
      ],
    },
  ],
}
