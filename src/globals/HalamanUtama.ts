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
          label: 'Hero Carousel',
          fields: [
            {
              name: 'heroSlides',
              type: 'array',
              label: 'Slides',
              minRows: 1,
              maxRows: 5,
              fields: [
                { name: 'badge', type: 'text', label: 'Teks Badge', defaultValue: 'Sekolah Tinggi Teknologi' },
                { name: 'judul', type: 'text', label: 'Judul Utama', required: true },
                { name: 'subjudul', type: 'textarea', label: 'Deskripsi / Subjudul' },
                { name: 'cta1Teks', type: 'text', label: 'CTA Utama — Teks' },
                { name: 'cta1Href', type: 'text', label: 'CTA Utama — URL' },
                { name: 'cta2Teks', type: 'text', label: 'CTA Kedua — Teks' },
                { name: 'cta2Href', type: 'text', label: 'CTA Kedua — URL' },
                { name: 'background', type: 'upload', relationTo: 'media', label: 'Gambar Background' },
              ],
            },
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
        {
          label: 'Video Profil',
          fields: [
            { name: 'videoJudul', type: 'text', label: 'Judul Section Video', defaultValue: 'Jelajahi Kampus Kami' },
            { name: 'videoDeskripsi', type: 'textarea', label: 'Deskripsi Video' },
            { name: 'videoUrl', type: 'text', label: 'URL Video (YouTube Embed)', admin: { description: 'Contoh: https://www.youtube.com/embed/XXXXXX' } },
            { name: 'videoThumbnail', type: 'upload', relationTo: 'media', label: 'Thumbnail Video' },
          ],
        },
        {
          label: 'Mengapa STTPU',
          fields: [
            {
              name: 'whyEnabled',
              type: 'checkbox',
              label: 'Tampilkan Section Mengapa STTPU',
              defaultValue: true,
            },
            {
              name: 'whyEyebrow',
              type: 'text',
              label: 'Label Kecil',
              defaultValue: 'Alasan Memilih STTPU',
            },
            {
              name: 'whyTitle',
              type: 'text',
              label: 'Judul Section',
              defaultValue: 'Mengapa Harus Kuliah di STT Pekerjaan Umum Jakarta?',
            },
            {
              name: 'whyDescription',
              type: 'textarea',
              label: 'Deskripsi Pembuka',
              defaultValue:
                'STTPU Jakarta dirancang untuk mahasiswa yang ingin masuk ke bidang infrastruktur, pekerjaan umum, lingkungan, dan teknologi dengan arah belajar yang jelas sejak awal.',
            },
            {
              name: 'whyProof',
              type: 'textarea',
              label: 'Argumen Pendukung',
              defaultValue:
                'Kurikulum dan ekosistem kampus diarahkan untuk menghubungkan teori, kebutuhan lapangan, layanan digital, dan jejaring mitra yang relevan dengan pembangunan Indonesia.',
            },
            {
              name: 'whyCtaLabel',
              type: 'text',
              label: 'CTA — Teks',
              defaultValue: 'Lihat Program Studi',
            },
            {
              name: 'whyCtaHref',
              type: 'text',
              label: 'CTA — URL',
              defaultValue: '/akademik/program-studi',
            },
            {
              name: 'whyItems',
              type: 'array',
              label: 'Daftar Alasan',
              minRows: 3,
              maxRows: 6,
              fields: [
                { name: 'icon', type: 'text', label: 'Icon Lucide', defaultValue: 'Building2' },
                {
                  name: 'background',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Gambar Background Card',
                  admin: {
                    description: 'Opsional. Jika diisi, card memakai gambar ini sebagai background dengan overlay.',
                  },
                },
                { name: 'title', type: 'text', label: 'Judul Alasan', required: true },
                { name: 'description', type: 'textarea', label: 'Deskripsi Alasan', required: true },
              ],
            },
          ],
        },
        {
          label: 'Mitra',
          fields: [
            { name: 'mitraEnabled', type: 'checkbox', label: 'Tampilkan Section Mitra', defaultValue: true },
            { name: 'mitraTitle', type: 'text', label: 'Judul Section', defaultValue: 'Mitra & Kerja Sama' },
            {
              name: 'mitraDescription',
              type: 'textarea',
              label: 'Deskripsi Section',
              defaultValue:
                'STTPU berkolaborasi dengan berbagai institusi, industri, dan lembaga untuk mendukung pendidikan vokasi dan pengembangan karier mahasiswa.',
            },
          ],
        },
      ],
    },
  ],
}
