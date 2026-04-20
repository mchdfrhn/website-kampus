import type { CollectionConfig } from "payload";

export const Galeri: CollectionConfig = {
  slug: "galeri",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "judul",
    defaultColumns: ["judul", "kategori", "status", "tanggal"],
  },
  fields: [
    {
      name: "judul",
      type: "text",
      label: "Nama Album",
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
        { label: "Kegiatan Kampus", value: "kegiatan" },
        { label: "Fasilitas", value: "fasilitas" },
        { label: "Wisuda", value: "wisuda" },
        { label: "Prestasi & Penghargaan", value: "prestasi" },
      ],
    },
    {
      name: "deskripsi",
      type: "textarea",
      label: "Deskripsi Album",
    },
    {
      name: "coverFoto",
      type: "upload",
      relationTo: "media",
      label: "Foto Sampul Album",
    },
    {
      name: "foto",
      type: "array",
      label: "Koleksi Foto",
      fields: [
        {
          name: "gambar",
          type: "upload",
          relationTo: "media",
          label: "Gambar",
          required: true,
        },
        {
          name: "keterangan",
          type: "text",
          label: "Keterangan Foto",
        },
      ],
    },
    {
      name: "tanggal",
      type: "date",
      label: "Tanggal Kegiatan / Album",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly" },
      },
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
};
