import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

import { Berita } from "./src/collections/Berita";
import { Dosen } from "./src/collections/Dosen";
import { Galeri } from "./src/collections/Galeri";
import { Media } from "./src/collections/Media";
import { Pesan } from "./src/collections/Pesan";
import { ProgramStudi } from "./src/collections/ProgramStudi";
import { Users } from "./src/collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: "— STTPU CMS",
    },
  },
  collections: [Users, Media, Berita, Dosen, ProgramStudi, Galeri, Pesan],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },
});
