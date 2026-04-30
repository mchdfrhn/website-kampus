import type { CollectionConfig } from 'payload';
import { revalidateCollection, revalidateDelete } from '../lib/revalidate';

export const KategoriBerita: CollectionConfig = {
  slug: 'kategori-berita',
  access: {
    read: () => true,
    create: ({ req }) => req.user != null,
    update: ({ req }) => req.user != null,
    delete: ({ req }) => req.user != null,
  },
  admin: {
    useAsTitle: 'nama',
    defaultColumns: ['nama', 'slug', 'warna', 'urutan'],
    group: 'Konten',
  },
  fields: [
    {
      name: 'nama',
      type: 'text',
      label: 'Nama Kategori',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: { description: 'Dipakai untuk filter URL, misalnya /berita?kategori=pengumuman' },
    },
    {
      name: 'warna',
      type: 'select',
      label: 'Aksen Warna',
      defaultValue: 'navy',
      options: [
        { label: 'Navy', value: 'navy' },
        { label: 'Biru', value: 'blue' },
        { label: 'Hijau', value: 'green' },
        { label: 'Orange', value: 'orange' },
        { label: 'Merah', value: 'red' },
        { label: 'Ungu', value: 'purple' },
        { label: 'Emas', value: 'gold' },
      ],
    },
    {
      name: 'urutan',
      type: 'number',
      label: 'Urutan Tampil',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
  hooks: {
    afterChange: [revalidateCollection(['/', '/berita', '/berita/[slug]', '/feed.xml'])],
    afterDelete: [revalidateDelete(['/', '/berita', '/berita/[slug]', '/feed.xml'])],
  },
};
