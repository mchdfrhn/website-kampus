import type { GlobalConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { revalidateGlobal } from '../lib/revalidate'

export const TentangKami: GlobalConfig = {
  slug: 'tentang-kami',
  label: 'Tentang Kami',
  access: { read: () => true },
  hooks: {
    afterChange: [revalidateGlobal(['/tentang', '/tentang/[slug]'])],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            { name: 'overviewTitle', type: 'text', label: 'Judul Hero', defaultValue: 'Tentang STTPU' },
            { name: 'overviewDescription', type: 'textarea', label: 'Deskripsi Hero' },
            {
              name: 'overviewStats',
              type: 'array',
              label: 'Statistik Ringkas',
              fields: [
                { name: 'value', type: 'text', label: 'Nilai', required: true },
                { name: 'label', type: 'text', label: 'Label', required: true },
              ],
            },
            { name: 'overviewCommitmentTitle', type: 'text', label: 'Judul Komitmen', defaultValue: 'Komitmen Kami' },
            { name: 'overviewCommitmentText', type: 'textarea', label: 'Isi Komitmen' },
            {
              name: 'overviewSections',
              type: 'array',
              label: 'Kartu Section',
              fields: [
                { name: 'title', type: 'text', label: 'Judul', required: true },
                { name: 'desc', type: 'textarea', label: 'Deskripsi' },
                { name: 'href', type: 'text', label: 'Link Tujuan', required: true },
              ],
            },
            {
              name: 'subpages',
              type: 'array',
              label: 'Konfigurasi Subhalaman',
              fields: [
                { name: 'slug', type: 'text', label: 'Slug', required: true },
                { name: 'title', type: 'text', label: 'Judul', required: true },
                { name: 'subtitle', type: 'textarea', label: 'Subtitle' },
                { name: 'breadcrumb', type: 'text', label: 'Breadcrumb' },
              ],
            },
            { name: 'sidebarTitle', type: 'text', label: 'Judul Sidebar', defaultValue: 'Navigasi Institusi' },
          ],
        },
        {
          label: 'Sejarah',
          fields: [
            {
              name: 'sejarahDeskripsi',
              type: 'richText',
              label: 'Deskripsi Sejarah',
              editor: lexicalEditor(),
            },
            {
              name: 'milestones',
              type: 'array',
              label: 'Tonggak Sejarah (Timeline)',
              fields: [
                { name: 'tahun', type: 'text', label: 'Tahun', required: true },
                { name: 'judul', type: 'text', label: 'Judul', required: true },
                { name: 'deskripsi', type: 'textarea', label: 'Deskripsi' },
              ],
            },
          ],
        },
        {
          label: 'Visi & Misi',
          fields: [
            { name: 'visi', type: 'textarea', label: 'Visi' },
            {
              name: 'misi',
              type: 'array',
              label: 'Misi',
              fields: [{ name: 'poin', type: 'text', label: 'Poin Misi', required: true }],
            },
            {
              name: 'tujuan',
              type: 'array',
              label: 'Tujuan',
              fields: [{ name: 'poin', type: 'text', label: 'Poin Tujuan', required: true }],
            },
            {
              name: 'nilaiNilai',
              type: 'array',
              label: 'Nilai-Nilai',
              fields: [
                { name: 'nama', type: 'text', label: 'Nama Nilai', required: true },
                { name: 'deskripsi', type: 'textarea', label: 'Deskripsi' },
              ],
            },
          ],
        },
        {
          label: 'Struktur Organisasi',
          fields: [
            { name: 'strukturGambar', type: 'upload', relationTo: 'media', label: 'Gambar Struktur Organisasi' },
            { name: 'strukturCatatan', type: 'textarea', label: 'Catatan Footer Struktur Organisasi' },
            {
              name: 'strukturSenat',
              type: 'group',
              label: 'Senat Akademik',
              fields: [
                { name: 'jabatan', type: 'text', label: 'Jabatan' },
                { name: 'nama', type: 'text', label: 'Nama' },
              ],
            },
            {
              name: 'strukturUPT',
              type: 'array',
              label: 'Unit Pelaksana Teknis (UPT)',
              fields: [
                { name: 'unit', type: 'text', label: 'Nama Unit', required: true },
                { name: 'kepala', type: 'text', label: 'Kepala Unit' },
              ],
            },
            {
              name: 'strukturBagian',
              type: 'array',
              label: 'Bagian Administrasi',
              fields: [
                { name: 'bagian', type: 'text', label: 'Nama Bagian', required: true },
                { name: 'kepala', type: 'text', label: 'Kepala Bagian' },
              ],
            },
          ],
        },
        {
          label: 'Fasilitas',
          fields: [
            { name: 'fasilitasIntro', type: 'textarea', label: 'Teks Pengantar Fasilitas' },
            { name: 'fasilitasCtaTitle', type: 'text', label: 'Judul CTA Fasilitas' },
            { name: 'fasilitasCtaDescription', type: 'textarea', label: 'Deskripsi CTA Fasilitas' },
            { name: 'fasilitasCtaButtonLabel', type: 'text', label: 'Teks Tombol CTA Fasilitas' },
            { name: 'fasilitasCtaButtonHref', type: 'text', label: 'Link Tombol CTA Fasilitas' },
            {
              name: 'fasilitas',
              type: 'array',
              label: 'Daftar Fasilitas',
              fields: [
                { name: 'nama', type: 'text', label: 'Nama Fasilitas', required: true },
                { name: 'deskripsi', type: 'textarea', label: 'Deskripsi' },
                { name: 'kapasitas', type: 'text', label: 'Kapasitas (mis: 30 mahasiswa)' },
                { name: 'foto', type: 'upload', relationTo: 'media', label: 'Foto Fasilitas' },
                {
                  name: 'kategori',
                  type: 'select',
                  label: 'Kategori',
                  options: [
                    { label: 'Laboratorium', value: 'laboratorium' },
                    { label: 'Perpustakaan', value: 'perpustakaan' },
                    { label: 'Olahraga', value: 'olahraga' },
                    { label: 'Penunjang', value: 'penunjang' },
                    { label: 'Digital', value: 'digital' },
                  ],
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Item Fasilitas',
                  fields: [{ name: 'nama', type: 'text', label: 'Nama Item', required: true }],
                },
              ],
            },
          ],
        },
        {
          label: 'Akreditasi & Legalitas',
          fields: [
            { name: 'akreditasiIntro', type: 'textarea', label: 'Teks Pengantar Akreditasi' },
            {
              name: 'akreditasiProdi',
              type: 'array',
              label: 'Akreditasi Program Studi',
              fields: [
                { name: 'prodi', type: 'text', label: 'Nama Program Studi', required: true },
                { name: 'jenjang', type: 'text', label: 'Jenjang (mis: D-IV)' },
                {
                  name: 'akreditasi',
                  type: 'select',
                  label: 'Nilai Akreditasi',
                  options: [
                    { label: 'Unggul', value: 'Unggul' },
                    { label: 'Baik Sekali', value: 'Baik Sekali' },
                    { label: 'Baik', value: 'Baik' },
                    { label: 'Dalam Proses', value: 'Dalam Proses' },
                  ],
                },
                { name: 'nomorSK', type: 'text', label: 'Nomor SK BAN-PT' },
                { name: 'berlakuHingga', type: 'text', label: 'Berlaku Hingga (tahun)' },
                { name: 'fileSK', type: 'upload', relationTo: 'media', label: 'File SK Akreditasi' },
              ],
            },
            {
              name: 'legalitas',
              type: 'array',
              label: 'Dokumen Legalitas Institusi',
              fields: [
                { name: 'dokumen', type: 'text', label: 'Nama Dokumen', required: true },
                { name: 'nomor', type: 'text', label: 'Nomor Dokumen' },
                { name: 'tanggal', type: 'text', label: 'Tanggal Penetapan' },
                { name: 'keterangan', type: 'textarea', label: 'Keterangan' },
                { name: 'file', type: 'upload', relationTo: 'media', label: 'File Dokumen' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
