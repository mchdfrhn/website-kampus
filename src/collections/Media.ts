import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "alt",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Teks Alt (SEO)",
      required: true,
    },
    {
      name: "caption",
      type: "text",
      label: "Keterangan",
    },
  ],
  upload: true,
};
