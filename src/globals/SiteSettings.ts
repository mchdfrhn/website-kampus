import type { GlobalConfig } from 'payload'
import { publicPagePaths, revalidateGlobal } from '../lib/revalidate'
import { isAdmin } from '../access/isAdmin'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Pengaturan Situs',
  access: {
    read: () => true,
    update: isAdmin,
  },
  hooks: {
    afterChange: [revalidateGlobal([...publicPagePaths])],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identitas',
          fields: [
            { name: 'namaInstitusi', type: 'text', label: 'Nama Institusi', defaultValue: 'STTPU Jakarta' },
            { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo Utama' },
            { name: 'favicon', type: 'upload', relationTo: 'media', label: 'Favicon' },
            { name: 'deskripsiFooter', type: 'textarea', label: 'Deskripsi Singkat (Footer)' },
          ],
        },
        {
          label: 'Kontak',
          fields: [
            { name: 'alamat', type: 'textarea', label: 'Alamat Lengkap' },
            { name: 'teleponUtama', type: 'text', label: 'Telepon Utama (tampil)' },
            { name: 'teleponUtamaHref', type: 'text', label: 'Telepon Utama (href, mis: +62215551234)' },
            {
              name: 'teleponLainnya',
              type: 'array',
              label: 'Nomor Telepon Lainnya',
              fields: [
                { name: 'nomor', type: 'text', label: 'Nomor (tampil)', required: true },
                { name: 'href', type: 'text', label: 'href (mis: +62215551234)' },
                { name: 'label', type: 'text', label: 'Label (mis: PMB, Akademik)' },
              ],
            },
            { name: 'emailUtama', type: 'email', label: 'Email Utama' },
            {
              name: 'emailLainnya',
              type: 'array',
              label: 'Email Lainnya',
              fields: [
                { name: 'email', type: 'email', label: 'Email', required: true },
                { name: 'label', type: 'text', label: 'Label' },
              ],
            },
            { name: 'whatsapp', type: 'text', label: 'Nomor WhatsApp (mis: 6281234567890)' },
            { name: 'whatsappTampil', type: 'text', label: 'WhatsApp (tampil, mis: +62 812-3456-7890)' },
            {
              name: 'jamOperasional',
              type: 'array',
              label: 'Jam Operasional',
              fields: [
                { name: 'hari', type: 'text', label: 'Hari', required: true },
                { name: 'jam', type: 'text', label: 'Jam (mis: 08.00 – 16.00 WIB)' },
                { name: 'tutup', type: 'checkbox', label: 'Tutup (hari libur)' },
              ],
            },
            { name: 'googleMapsEmbed', type: 'textarea', label: 'Google Maps Embed URL (src iframe)' },
          ],
        },
        {
          label: 'Media Sosial',
          fields: [
            {
              name: 'socialMedia',
              type: 'array',
              label: 'Akun Media Sosial',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  label: 'Platform',
                  required: true,
                  options: [
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'Twitter / X', value: 'twitter' },
                    { label: 'TikTok', value: 'tiktok' },
                  ],
                },
                { name: 'handle', type: 'text', label: 'Handle / Username (mis: @sttpu.jakarta)' },
                { name: 'url', type: 'text', label: 'URL Profil', required: true },
                { name: 'followers', type: 'text', label: 'Jumlah Followers (teks, mis: 12.4K Followers)' },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerQuickLinks',
              type: 'array',
              label: 'Tautan Cepat (Footer)',
              fields: [
                { name: 'label', type: 'text', label: 'Label', required: true },
                { name: 'href', type: 'text', label: 'URL / Path', required: true },
              ],
            },
          ],
        },
        {
          label: 'Card Promosi Sidebar',
          fields: [
            {
              name: 'pmbTitle',
              type: 'text',
              label: 'Judul Card PMB',
              defaultValue: 'Mulai Karir Anda di Bidang Infrastruktur',
              required: true,
            },
            {
              name: 'pmbDescription',
              type: 'textarea',
              label: 'Deskripsi Card PMB',
              defaultValue: 'Pendaftaran Mahasiswa Baru STTPU Jakarta telah dibuka. Bergabunglah bersama kami dan jadilah tenaga ahli profesional.',
              required: true,
            },
            {
              name: 'pmbButtonText',
              type: 'text',
              label: 'Label Tombol PMB',
              defaultValue: 'Daftar Sekarang',
              required: true,
            },
            {
              name: 'pmbButtonUrl',
              type: 'text',
              label: 'Link Tombol PMB',
              defaultValue: 'https://siakadat.sttpu.ac.id/spmb',
              required: true,
            },
            {
              name: 'infoTitle',
              type: 'text',
              label: 'Judul Card Informasi',
              defaultValue: 'Hubungi Kami',
              required: true,
            },
            {
              name: 'infoDescription',
              type: 'textarea',
              label: 'Deskripsi Card Informasi',
              defaultValue: 'Butuh informasi lebih lanjut mengenai perkuliahan, biaya kuliah, akreditasi, atau fasilitas kampus?',
              required: true,
            },
            {
              name: 'infoButtonText',
              type: 'text',
              label: 'Label Tombol Informasi',
              defaultValue: 'Hubungi Humas',
              required: true,
            },
            {
              name: 'infoButtonUrl',
              type: 'text',
              label: 'Link Tombol Informasi',
              defaultValue: '/kontak',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
