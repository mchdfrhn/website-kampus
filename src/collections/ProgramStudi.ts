import type { CollectionConfig } from "payload";
import { revalidateCollection } from "../lib/revalidate";

export const ProgramStudi: CollectionConfig = {
  slug: "program-studi",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "nama",
    defaultColumns: ["nama", "jenjang", "akreditasi", "status"],
  },
  fields: [
    {
      name: "nama",
      type: "text",
      label: "Nama Program Studi",
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
      name: "jenjang",
      type: "select",
      label: "Jenjang",
      options: [
        { label: "D3", value: "d3" },
        { label: "D4", value: "d4" },
        { label: "S1", value: "s1" },
        { label: "S2", value: "s2" },
      ],
      required: true,
    },
    {
      name: "akreditasi",
      type: "select",
      label: "Akreditasi BAN-PT",
      options: [
        { label: "Unggul", value: "unggul" },
        { label: "Baik Sekali", value: "baik-sekali" },
        { label: "Baik", value: "baik" },
        { label: "Dalam Proses", value: "proses" },
      ],
    },
    {
      name: "deskripsiSingkat",
      type: "textarea",
      label: "Deskripsi Singkat (untuk kartu homepage)",
      maxLength: 200,
    },
    {
      name: "deskripsi",
      type: "richText",
      label: "Deskripsi Lengkap",
    },
    {
      name: "visi",
      type: "textarea",
      label: "Visi",
    },
    {
      name: "misi",
      type: "array",
      label: "Misi",
      fields: [
        { name: "poin", type: "text", label: "Poin Misi" },
      ],
    },
    {
      name: "kompetensiLulusan",
      type: "array",
      label: "Kompetensi Lulusan",
      fields: [
        { name: "kompetensi", type: "text", label: "Kompetensi" },
      ],
    },
    {
      name: "prospekKarir",
      type: "array",
      label: "Prospek Karir",
      fields: [
        { name: "karir", type: "text", label: "Bidang Karir" },
      ],
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
      label: "Gambar Thumbnail",
    },
    {
      name: "status",
      type: "select",
      label: "Status",
      options: [
        { label: "Aktif", value: "aktif" },
        { label: "Tidak Aktif", value: "tidak-aktif" },
      ],
      defaultValue: "aktif",
      admin: { position: "sidebar" },
    },
  ],
  hooks: {
    afterChange: [revalidateCollection(["/akademik/program-studi", "/akademik/program-studi/[slug]"])],
  },
};
