import type { CollectionConfig } from "payload";
import { revalidateCollection, revalidateDelete } from "../lib/revalidate";

export const Berita: CollectionConfig = {
  slug: "berita",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "judul",
    defaultColumns: ["judul", "kategori", "status", "tanggalTerbit"],
  },
  fields: [
    {
      name: "judul",
      type: "text",
      label: "Judul Artikel",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug URL",
      required: true,
      unique: true,
      admin: { position: "sidebar" },
    },
    {
      name: "kategori",
      type: "select",
      label: "Kategori",
      options: [
        { label: "Akademik", value: "akademik" },
        { label: "Kemahasiswaan", value: "kemahasiswaan" },
        { label: "Penelitian", value: "penelitian" },
        { label: "Kerjasama", value: "kerjasama" },
        { label: "Prestasi", value: "prestasi" },
        { label: "Pengumuman Resmi", value: "pengumuman" },
      ],
      required: true,
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
      label: "Gambar Thumbnail",
    },
    {
      name: "ringkasan",
      type: "textarea",
      label: "Ringkasan (Meta Description)",
      maxLength: 160,
    },
    {
      name: "konten",
      type: "richText",
      label: "Konten Artikel",
      required: true,
    },
    {
      name: "penulis",
      type: "text",
      label: "Penulis",
    },
    {
      name: "tanggalTerbit",
      type: "date",
      label: "Tanggal Terbit",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly" },
      },
    },
    {
      name: "isPinned",
      type: "checkbox",
      label: "Pin di atas (pengumuman penting)",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    {
      name: "tags",
      type: "array",
      label: "Tags",
      admin: { position: "sidebar" },
      fields: [
        { name: "tag", type: "text", label: "Tag" },
      ],
    },
    {
      name: "status",
      type: "select",
      label: "Status",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Terbit", value: "terbit" },
      ],
      defaultValue: "draft",
      admin: { position: "sidebar" },
    },
  ],
  hooks: {
    afterChange: [revalidateCollection(["/berita", "/berita/[slug]"])],
    afterDelete: [revalidateDelete(["/berita", "/berita/[slug]"])],
  },
};
