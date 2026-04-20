import type { CollectionConfig } from "payload";

export const Dosen: CollectionConfig = {
  slug: "dosen",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "nama",
    defaultColumns: ["nama", "nidn", "programStudi", "jabatanFungsional"],
  },
  fields: [
    {
      name: "nama",
      type: "text",
      label: "Nama Lengkap + Gelar",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug URL",
      unique: true,
      admin: { position: "sidebar" },
    },
    {
      name: "nidn",
      type: "text",
      label: "NIDN",
    },
    {
      name: "foto",
      type: "upload",
      relationTo: "media",
      label: "Foto",
    },
    {
      name: "programStudi",
      type: "relationship",
      relationTo: "program-studi",
      label: "Program Studi",
      hasMany: true,
    },
    {
      name: "jabatanFungsional",
      type: "select",
      label: "Jabatan Fungsional",
      options: [
        { label: "Asisten Ahli", value: "asisten-ahli" },
        { label: "Lektor", value: "lektor" },
        { label: "Lektor Kepala", value: "lektor-kepala" },
        { label: "Profesor", value: "profesor" },
      ],
    },
    {
      name: "pendidikanTerakhir",
      type: "select",
      label: "Pendidikan Terakhir",
      options: [
        { label: "S2 (Magister)", value: "s2" },
        { label: "S3 (Doktor)", value: "s3" },
      ],
    },
    {
      name: "bidangKeahlian",
      type: "array",
      label: "Bidang Keahlian",
      fields: [
        { name: "keahlian", type: "text", label: "Keahlian" },
      ],
    },
    {
      name: "publikasi",
      type: "array",
      label: "Publikasi",
      fields: [
        { name: "judul", type: "text", label: "Judul" },
        { name: "jurnal", type: "text", label: "Jurnal/Prosiding" },
        { name: "tahun", type: "number", label: "Tahun" },
        { name: "url", type: "text", label: "URL (opsional)" },
      ],
    },
    {
      name: "bio",
      type: "textarea",
      label: "Biografi Singkat",
    },
    {
      name: "email",
      type: "email",
      label: "Email",
    },
  ],
};
