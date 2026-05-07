import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "mitra" (
    "id" serial PRIMARY KEY NOT NULL,
    "nama" varchar NOT NULL,
    "logo_id" integer,
    "kategori" varchar,
    "url" varchar,
    "aktif" boolean DEFAULT true,
    "urutan" numeric DEFAULT 0,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
   );

   ALTER TABLE "halaman_utama" ADD COLUMN IF NOT EXISTS "mitra_enabled" boolean DEFAULT true;
   ALTER TABLE "halaman_utama" ADD COLUMN IF NOT EXISTS "mitra_title" varchar DEFAULT 'Mitra & Kerja Sama';
   ALTER TABLE "halaman_utama" ADD COLUMN IF NOT EXISTS "mitra_description" varchar DEFAULT 'STTPU berkolaborasi dengan berbagai institusi, industri, dan lembaga untuk mendukung pendidikan vokasi dan pengembangan karier mahasiswa.';
   ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "mitra_id" integer;

   DO $$
   BEGIN
    IF NOT EXISTS (
     SELECT 1 FROM pg_constraint WHERE conname = 'mitra_logo_id_media_id_fk'
    ) THEN
     ALTER TABLE "mitra"
      ADD CONSTRAINT "mitra_logo_id_media_id_fk"
      FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
   END $$;

   DO $$
   BEGIN
    IF NOT EXISTS (
     SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_mitra_fk'
    ) THEN
     ALTER TABLE "payload_locked_documents_rels"
      ADD CONSTRAINT "payload_locked_documents_rels_mitra_fk"
      FOREIGN KEY ("mitra_id") REFERENCES "public"."mitra"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
   END $$;

   CREATE INDEX IF NOT EXISTS "mitra_logo_idx" ON "mitra" USING btree ("logo_id");
   CREATE INDEX IF NOT EXISTS "mitra_updated_at_idx" ON "mitra" USING btree ("updated_at");
   CREATE INDEX IF NOT EXISTS "mitra_created_at_idx" ON "mitra" USING btree ("created_at");
   CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_mitra_id_idx" ON "payload_locked_documents_rels" USING btree ("mitra_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "payload_locked_documents_rels_mitra_id_idx";
   DROP INDEX IF EXISTS "mitra_created_at_idx";
   DROP INDEX IF EXISTS "mitra_updated_at_idx";
   DROP INDEX IF EXISTS "mitra_logo_idx";

   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_mitra_fk";
   ALTER TABLE "mitra" DROP CONSTRAINT IF EXISTS "mitra_logo_id_media_id_fk";
   ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "mitra_id";
   ALTER TABLE "halaman_utama" DROP COLUMN IF EXISTS "mitra_description";
   ALTER TABLE "halaman_utama" DROP COLUMN IF EXISTS "mitra_title";
   ALTER TABLE "halaman_utama" DROP COLUMN IF EXISTS "mitra_enabled";
   DROP TABLE IF EXISTS "mitra";
  `)
}
