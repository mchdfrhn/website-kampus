import type { GlobalConfig } from 'payload'

export const PortalLinks: GlobalConfig = {
  slug: 'portal-links',
  label: 'Portal & Tautan Cepat',
  access: { read: () => true },
  fields: [
    {
      name: 'portals',
      type: 'array',
      label: 'Daftar Portal',
      fields: [
        { name: 'nama', type: 'text', label: 'Nama Portal', required: true },
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
  ],
}
