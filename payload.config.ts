import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import { s3Storage } from "@payloadcms/storage-s3";
import { NodeHttpHandler } from "@smithy/node-http-handler";

import { Berita } from "./src/collections/Berita";
import { Dosen } from "./src/collections/Dosen";
import { Galeri } from "./src/collections/Galeri";
import { KategoriBerita } from "./src/collections/KategoriBerita";
import { KategoriGaleri } from "./src/collections/KategoriGaleri";
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
import { Organisasi } from "./src/collections/Organisasi";
import { Prestasi } from "./src/collections/Prestasi";
import { Publikasi } from "./src/collections/Publikasi";
import { Layanan } from "./src/collections/Layanan";
import { Mitra } from "./src/collections/Mitra";
import { LpmiDokumen } from "./src/collections/LpmiDokumen";

import { SiteSettings } from "./src/globals/SiteSettings";
import { HalamanUtama } from "./src/globals/HalamanUtama";
import { TentangKami } from "./src/globals/TentangKami";
import { KalenderAkademik } from "./src/globals/KalenderAkademik";
import { PortalLinks } from "./src/globals/PortalLinks";
import { MainMenu } from "./src/globals/MainMenu";
import { PanduanMaba } from "./src/globals/PanduanMaba";
import { KemahasiswaanPage } from "./src/globals/KemahasiswaanPage";
import { KontakPage } from "./src/globals/KontakPage";
import { AkademikPage } from "./src/globals/AkademikPage";
import { BeritaPage } from "./src/globals/BeritaPage";
import { LpmiPage } from "./src/globals/LpmiPage";
import { LppmPage } from "./src/globals/LppmPage";


const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const parsePositiveInteger = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const s3ConnectionTimeoutMs = parsePositiveInteger(process.env.S3_CONNECTION_TIMEOUT_MS, 10_000);
const s3RequestTimeoutMs = parsePositiveInteger(process.env.S3_REQUEST_TIMEOUT_MS, 60_000);

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
    KategoriBerita,
    Berita,
    Dosen,
    ProgramStudi,
    KategoriGaleri,
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
    Organisasi,
    Prestasi,
    Publikasi,
    Layanan,
    Mitra,
    LpmiDokumen,
  ],
  globals: [
    SiteSettings,
    HalamanUtama,
    TentangKami,
    KalenderAkademik,
    PortalLinks,
    MainMenu,
    PanduanMaba,
    KemahasiswaanPage,
    KontakPage,
    AkademikPage,
    BeritaPage,
    LpmiPage,
    LppmPage,
  ],
  editor: lexicalEditor(),
  debug: process.env.NODE_ENV !== 'production',
  logger: {
    options: {
      hooks: {
        logMethod(args: any[], method: any, level: number) {
          let is403 = false;
          for (const arg of args) {
            if (arg && typeof arg === 'object') {
              if (
                arg.status === 403 ||
                arg.message?.includes('You are not allowed') ||
                arg.err?.message?.includes('You are not allowed') ||
                arg.err?.status === 403
              ) {
                is403 = true;
                break;
              }
            } else if (typeof arg === 'string' && arg.includes('You are not allowed')) {
              is403 = true;
              break;
            }
          }

          if (is403) {
            // Demote 403 auth errors from ERROR to INFO to keep server error logs clean
            return this.info.apply(this, args as any);
          }
          return method.apply(this, args as any);
        }
      }
    }
  },
  secret: process.env.PAYLOAD_SECRET as string,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: (process.env.BUILD_SKIP_DB === "1"
    ? () => ({}) // Mock adapter for build time
    : postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URI || "",
          ssl: process.env.DB_DISABLE_SSL === 'true' ? false : (process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false),
        },
      })) as any,
  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: (process.env.S3_BUCKET || "").split('#')[0].trim(),
      config: {
        credentials: {
          accessKeyId: (process.env.S3_ACCESS_KEY_ID || "").split('#')[0].trim(),
          secretAccessKey: (process.env.S3_SECRET_ACCESS_KEY || "").split('#')[0].trim(),
        },
        region: (process.env.S3_REGION || "us-east-1").split('#')[0].trim(),
        endpoint: process.env.S3_ENDPOINT ? process.env.S3_ENDPOINT.split('#')[0].trim() : undefined,
        forcePathStyle: true,
        requestHandler: new NodeHttpHandler({
          connectionTimeout: s3ConnectionTimeoutMs,
          requestTimeout: s3RequestTimeoutMs,
        }),
      },
    }),
  ],
});
