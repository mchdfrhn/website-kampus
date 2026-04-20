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
import { Testimonial } from "./src/collections/Testimonial";
import { Pimpinan } from "./src/collections/Pimpinan";
import { UKM } from "./src/collections/UKM";
import { Beasiswa } from "./src/collections/Beasiswa";
import { AkreditasiLembaga } from "./src/collections/AkreditasiLembaga";
import { UnitKontak } from "./src/collections/UnitKontak";
import { UnitPenelitian } from "./src/collections/UnitPenelitian";
import { Hibah } from "./src/collections/Hibah";

import { SiteSettings } from "./src/globals/SiteSettings";
import { HalamanUtama } from "./src/globals/HalamanUtama";
import { TentangKami } from "./src/globals/TentangKami";
import { KalenderAkademik } from "./src/globals/KalenderAkademik";
import { PortalLinks } from "./src/globals/PortalLinks";
import { MainMenu } from "./src/globals/MainMenu";

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
  collections: [
    Users,
    Media,
    Berita,
    Dosen,
    ProgramStudi,
    Galeri,
    Pesan,
    Testimonial,
    Pimpinan,
    UKM,
    Beasiswa,
    AkreditasiLembaga,
    UnitKontak,
    UnitPenelitian,
    Hibah,
  ],
  globals: [SiteSettings, HalamanUtama, TentangKami, KalenderAkademik, PortalLinks, MainMenu],
  editor: lexicalEditor(),
  debug: true,
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: (process.env.BUILD_SKIP_DB === "1"
    ? () => ({}) // Mock adapter for build time
    : postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URI || "",
          ssl: false,
        },
      })) as any,
  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },
});
