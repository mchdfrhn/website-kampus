import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../lib/revalidate'

export const HalamanUtama: GlobalConfig = {
  slug: 'halaman-utama',
  label: 'Halaman Utama',
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateGlobal(['/'])],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'heroBadge', type: 'text', label: 'Teks Badge', defaultValue: 'Sekolah Tinggi Teknologi' },
            { name: 'heroJudul', type: 'text', label: 'Judul Utama', required: true },
            { name: 'heroSubjudul', type: 'textarea', label: 'Deskripsi / Subjudul' },
            { name: 'heroCta1Teks', type: 'text', label: 'CTA Utama — Teks' },
            { name: 'heroCta1Href', type: 'text', label: 'CTA Utama — URL' },
            { name: 'heroCta2Teks', type: 'text', label: 'CTA Kedua — Teks' },
            { name: 'heroCta2Href', type: 'text', label: 'CTA Kedua — URL' },
            { name: 'heroFoto', type: 'upload', relationTo: 'media', label: 'Foto Kampus' },
          ],
        },
        {
          label: 'Statistik',
          fields: [
            {
              name: 'statistik',
              type: 'array',
              label: 'Item Statistik (Stats Bar)',
              fields: [
                { name: 'angka', type: 'text', label: 'Angka (mis: 2.400+)', required: true },
                { name: 'label', type: 'text', label: 'Label (mis: Mahasiswa Aktif)', required: true },
              ],
            },
          ],
        },
        {
          label: 'Quick Links',
          fields: [
            {
              name: 'quickLinksTabs',
              type: 'array',
              label: 'Tab "Saya adalah..."',
              fields: [
                { name: 'id', type: 'text', label: 'ID Tab (mis: calon)', required: true },
                { name: 'label', type: 'text', label: 'Label Tab (mis: Calon Mahasiswa)', required: true },
                {
                  name: 'links',
                  type: 'array',
                  label: 'Daftar Link',
                  fields: [
                    { 
                      name: 'icon', 
                      type: 'text', 
                      label: 'Nama Icon Lucide (mis: UserPlus)',
                      admin: {
                        description: 'Gunakan PascalCase untuk nama icon. Referensi: https://lucide.dev'
                      }
                    },
                    { name: 'label', type: 'text', label: 'Label Link', required: true },
                    { name: 'href', type: 'text', label: 'URL', required: true },
                    { name: 'external', type: 'checkbox', label: 'Buka di tab baru?' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
