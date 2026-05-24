import type { CollectionConfig } from "payload";
import { publicPagePaths, revalidateCollection, revalidateDelete } from "../lib/revalidate";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: ({ req }) => req.user != null,
    update: ({ req }) => req.user != null,
    delete: ({ req }) => req.user != null,
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
  hooks: {
    afterChange: [revalidateCollection([...publicPagePaths])],
    afterDelete: [revalidateDelete([...publicPagePaths])],
  },
};
