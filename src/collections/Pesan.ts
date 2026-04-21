import type { CollectionConfig } from "payload";

export const Pesan: CollectionConfig = {
  slug: "pesan",
  access: {
    read: ({ req }) => req.user != null,
    create: () => true,
  },
  admin: {
    useAsTitle: "subjek",
    defaultColumns: ["nama", "email", "unit", "status", "createdAt"],
  },
  fields: [
    {
      name: "nama",
      type: "text",
      label: "Nama Pengirim",
      required: true,
    },
    {
      name: "email",
      type: "email",
      label: "Email Pengirim",
      required: true,
    },
    {
      name: "telepon",
      type: "text",
      label: "Nomor Telepon",
    },
    {
      name: "unit",
      type: "text",
      label: "Unit Tujuan",
      required: true,
    },
    {
      name: "subjek",
      type: "text",
      label: "Subjek Pesan",
      required: true,
    },
    {
      name: "pesan",
      type: "textarea",
      label: "Isi Pesan",
      required: true,
    },
    {
      name: "status",
      type: "select",
      label: "Status",
      options: [
        { label: "Baru", value: "baru" },
        { label: "Dibaca", value: "dibaca" },
        { label: "Dibalas", value: "dibalas" },
      ],
      defaultValue: "baru",
      admin: { position: "sidebar" },
    },
    {
      name: "ipAddress",
      type: "text",
      label: "IP Address",
      admin: {
        hidden: true,
      },
    },
  ],
};
