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
  upload: {
    adminThumbnail: "thumbnail",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
        withoutEnlargement: true,
        formatOptions: {
          format: "webp",
          options: { quality: 78 },
        },
      },
      {
        name: "card",
        width: 900,
        height: 600,
        position: "centre",
        withoutEnlargement: true,
        formatOptions: {
          format: "webp",
          options: { quality: 78 },
        },
      },
      {
        name: "hero",
        width: 1920,
        height: 1080,
        position: "centre",
        withoutEnlargement: true,
        formatOptions: {
          format: "webp",
          options: { quality: 82 },
        },
      },
      {
        name: "logo",
        width: 512,
        withoutEnlargement: true,
        formatOptions: {
          format: "webp",
          options: { quality: 86 },
        },
      },
      {
        name: "og",
        width: 1200,
        height: 630,
        position: "centre",
        withoutEnlargement: true,
        formatOptions: {
          format: "webp",
          options: { quality: 82 },
        },
      },
    ],
  },
  hooks: {
    afterChange: [revalidateCollection([...publicPagePaths])],
    afterDelete: [revalidateDelete([...publicPagePaths])],
  },
};
