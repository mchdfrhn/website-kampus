import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "kategori_berita" (
    "id" serial PRIMARY KEY NOT NULL,
    "nama" varchar NOT NULL,
    "slug" varchar NOT NULL,
    "warna" varchar DEFAULT 'navy',
    "urutan" numeric DEFAULT 0,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
   );

   CREATE TABLE IF NOT EXISTS "kategori_galeri" (
    "id" serial PRIMARY KEY NOT NULL,
    "nama" varchar NOT NULL,
    "slug" varchar NOT NULL,
    "warna" varchar DEFAULT 'navy',
    "urutan" numeric DEFAULT 0,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
   );

   CREATE UNIQUE INDEX IF NOT EXISTS "kategori_berita_slug_idx" ON "kategori_berita" USING btree ("slug");
   CREATE UNIQUE INDEX IF NOT EXISTS "kategori_galeri_slug_idx" ON "kategori_galeri" USING btree ("slug");

   INSERT INTO "kategori_berita" ("nama", "slug", "warna", "urutan")
   VALUES
    ('Pengumuman Resmi', 'pengumuman', 'red', 0),
    ('Akademik', 'akademik', 'blue', 1),
    ('Kemahasiswaan', 'kemahasiswaan', 'green', 2),
    ('Prestasi', 'prestasi', 'gold', 3),
    ('Penelitian', 'penelitian', 'purple', 4),
    ('Kerjasama', 'kerjasama', 'orange', 5)
   ON CONFLICT ("slug") DO NOTHING;

   INSERT INTO "kategori_galeri" ("nama", "slug", "warna", "urutan")
   VALUES
    ('Kegiatan Kampus', 'kegiatan', 'blue', 0),
    ('Fasilitas', 'fasilitas', 'green', 1),
    ('Wisuda', 'wisuda', 'gold', 2),
    ('Prestasi & Penghargaan', 'prestasi', 'orange', 3)
   ON CONFLICT ("slug") DO NOTHING;

   ALTER TABLE "berita" ADD COLUMN IF NOT EXISTS "kategori_id" integer;
   ALTER TABLE "galeri" ADD COLUMN IF NOT EXISTS "kategori_id" integer;

   DO $$
   BEGIN
    IF EXISTS (
     SELECT 1
     FROM information_schema.columns
     WHERE table_name = 'berita'
       AND column_name = 'kategori_id'
       AND udt_name = 'enum_berita_kategori'
    ) AND NOT EXISTS (
     SELECT 1
     FROM information_schema.columns
     WHERE table_name = 'berita'
       AND column_name = 'kategori_legacy'
    ) THEN
     ALTER TABLE "berita" RENAME COLUMN "kategori_id" TO "kategori_legacy";
     ALTER TABLE "berita" ADD COLUMN "kategori_id" integer;
    END IF;
   END $$;

   DO $$
   BEGIN
    IF EXISTS (
     SELECT 1
     FROM information_schema.columns
     WHERE table_name = 'galeri'
       AND column_name = 'kategori_id'
       AND udt_name = 'enum_galeri_kategori'
    ) AND NOT EXISTS (
     SELECT 1
     FROM information_schema.columns
     WHERE table_name = 'galeri'
       AND column_name = 'kategori_legacy'
    ) THEN
     ALTER TABLE "galeri" RENAME COLUMN "kategori_id" TO "kategori_legacy";
     ALTER TABLE "galeri" ADD COLUMN "kategori_id" integer;
    END IF;
   END $$;

   DO $$
   BEGIN
    IF EXISTS (
     SELECT 1
     FROM information_schema.columns
     WHERE table_name = 'berita' AND column_name = 'kategori'
    ) THEN
     UPDATE "berita" AS "b"
     SET "kategori_id" = "kb"."id"
     FROM "kategori_berita" AS "kb"
     WHERE "kb"."slug" = COALESCE("b"."kategori", 'akademik')
       AND "b"."kategori_id" IS NULL;
    END IF;
   END $$;

   DO $$
   BEGIN
    IF EXISTS (
     SELECT 1
     FROM information_schema.columns
     WHERE table_name = 'berita' AND column_name = 'kategori_legacy'
    ) THEN
     UPDATE "berita" AS "b"
     SET "kategori_id" = "kb"."id"
     FROM "kategori_berita" AS "kb"
     WHERE "kb"."slug" = COALESCE("b"."kategori_legacy"::text, 'akademik')
       AND "b"."kategori_id" IS NULL;
    END IF;
   END $$;

   UPDATE "berita"
   SET "kategori_id" = (
    SELECT "id" FROM "kategori_berita" WHERE "slug" = 'akademik' LIMIT 1
   )
   WHERE "kategori_id" IS NULL;

   DO $$
   BEGIN
    IF EXISTS (
     SELECT 1
     FROM information_schema.columns
     WHERE table_name = 'galeri' AND column_name = 'kategori'
    ) THEN
     UPDATE "galeri" AS "g"
     SET "kategori_id" = "kg"."id"
     FROM "kategori_galeri" AS "kg"
     WHERE "kg"."slug" = COALESCE("g"."kategori", 'kegiatan')
       AND "g"."kategori_id" IS NULL;
    END IF;
   END $$;

   DO $$
   BEGIN
    IF EXISTS (
     SELECT 1
     FROM information_schema.columns
     WHERE table_name = 'galeri' AND column_name = 'kategori_legacy'
    ) THEN
     UPDATE "galeri" AS "g"
     SET "kategori_id" = "kg"."id"
     FROM "kategori_galeri" AS "kg"
     WHERE "kg"."slug" = COALESCE("g"."kategori_legacy"::text, 'kegiatan')
       AND "g"."kategori_id" IS NULL;
    END IF;
   END $$;

   UPDATE "galeri"
   SET "kategori_id" = (
    SELECT "id" FROM "kategori_galeri" WHERE "slug" = 'kegiatan' LIMIT 1
   )
   WHERE "kategori_id" IS NULL;

   ALTER TABLE "berita" DROP COLUMN IF EXISTS "kategori";
   ALTER TABLE "galeri" DROP COLUMN IF EXISTS "kategori";
   ALTER TABLE "berita" DROP COLUMN IF EXISTS "kategori_legacy";
   ALTER TABLE "galeri" DROP COLUMN IF EXISTS "kategori_legacy";

   ALTER TABLE "berita" ALTER COLUMN "kategori_id" SET NOT NULL;

   DO $$
   BEGIN
    IF NOT EXISTS (
     SELECT 1
     FROM pg_constraint
     WHERE conname = 'berita_kategori_id_kategori_berita_id_fk'
    ) THEN
     ALTER TABLE "berita"
      ADD CONSTRAINT "berita_kategori_id_kategori_berita_id_fk"
      FOREIGN KEY ("kategori_id") REFERENCES "public"."kategori_berita"("id") ON DELETE set null ON UPDATE no action;
    END IF;
   END $$;

   DO $$
   BEGIN
    IF NOT EXISTS (
     SELECT 1
     FROM pg_constraint
     WHERE conname = 'galeri_kategori_id_kategori_galeri_id_fk'
    ) THEN
     ALTER TABLE "galeri"
      ADD CONSTRAINT "galeri_kategori_id_kategori_galeri_id_fk"
      FOREIGN KEY ("kategori_id") REFERENCES "public"."kategori_galeri"("id") ON DELETE set null ON UPDATE no action;
    END IF;
   END $$;

   CREATE INDEX IF NOT EXISTS "berita_kategori_idx" ON "berita" USING btree ("kategori_id");
   CREATE INDEX IF NOT EXISTS "galeri_kategori_idx" ON "galeri" USING btree ("kategori_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "berita" DROP CONSTRAINT IF EXISTS "berita_kategori_id_kategori_berita_id_fk";
   ALTER TABLE "galeri" DROP CONSTRAINT IF EXISTS "galeri_kategori_id_kategori_galeri_id_fk";

   DROP INDEX IF EXISTS "berita_kategori_idx";
   DROP INDEX IF EXISTS "galeri_kategori_idx";

   ALTER TABLE "berita" ADD COLUMN IF NOT EXISTS "kategori" varchar;
   ALTER TABLE "galeri" ADD COLUMN IF NOT EXISTS "kategori" varchar;

   UPDATE "berita" AS "b"
   SET "kategori" = "kb"."slug"
   FROM "kategori_berita" AS "kb"
   WHERE "kb"."id" = "b"."kategori_id";

   UPDATE "galeri" AS "g"
   SET "kategori" = "kg"."slug"
   FROM "kategori_galeri" AS "kg"
   WHERE "kg"."id" = "g"."kategori_id";

   ALTER TABLE "berita" DROP COLUMN IF EXISTS "kategori_id";
   ALTER TABLE "galeri" DROP COLUMN IF EXISTS "kategori_id";

   DROP INDEX IF EXISTS "kategori_berita_slug_idx";
   DROP INDEX IF EXISTS "kategori_galeri_slug_idx";

   DROP TABLE IF EXISTS "kategori_berita";
   DROP TABLE IF EXISTS "kategori_galeri";
  `)
}
