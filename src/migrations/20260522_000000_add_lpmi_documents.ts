import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$
   BEGIN
    IF NOT EXISTS (
     SELECT 1 FROM pg_type WHERE typname = 'enum_lpmi_dokumen_section'
    ) THEN
     CREATE TYPE "public"."enum_lpmi_dokumen_section" AS ENUM(
      'kebijakan',
      'pedoman',
      'standar-pendidikan',
      'standar-penelitian',
      'standar-pkm'
     );
    END IF;
   END $$;

   DO $$
   BEGIN
    IF NOT EXISTS (
     SELECT 1 FROM pg_type WHERE typname = 'enum_lpmi_dokumen_status'
    ) THEN
     CREATE TYPE "public"."enum_lpmi_dokumen_status" AS ENUM('draft', 'terbit');
    END IF;
   END $$;

   CREATE TABLE IF NOT EXISTS "lpmi_dokumen" (
    "id" serial PRIMARY KEY NOT NULL,
    "judul" varchar NOT NULL,
    "section" "enum_lpmi_dokumen_section" NOT NULL,
    "file_id" integer,
    "deskripsi" varchar,
    "status" "enum_lpmi_dokumen_status" DEFAULT 'terbit',
    "urutan" numeric DEFAULT 0,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
   );

   ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "lpmi_dokumen_id" integer;

   DO $$
   BEGIN
    IF NOT EXISTS (
     SELECT 1 FROM pg_constraint WHERE conname = 'lpmi_dokumen_file_id_media_id_fk'
    ) THEN
     ALTER TABLE "lpmi_dokumen"
      ADD CONSTRAINT "lpmi_dokumen_file_id_media_id_fk"
      FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
   END $$;

   DO $$
   BEGIN
    IF NOT EXISTS (
     SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_lpmi_dokumen_fk'
    ) THEN
     ALTER TABLE "payload_locked_documents_rels"
      ADD CONSTRAINT "payload_locked_documents_rels_lpmi_dokumen_fk"
      FOREIGN KEY ("lpmi_dokumen_id") REFERENCES "public"."lpmi_dokumen"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
   END $$;

   CREATE INDEX IF NOT EXISTS "lpmi_dokumen_section_idx" ON "lpmi_dokumen" USING btree ("section");
   CREATE INDEX IF NOT EXISTS "lpmi_dokumen_file_idx" ON "lpmi_dokumen" USING btree ("file_id");
   CREATE INDEX IF NOT EXISTS "lpmi_dokumen_updated_at_idx" ON "lpmi_dokumen" USING btree ("updated_at");
   CREATE INDEX IF NOT EXISTS "lpmi_dokumen_created_at_idx" ON "lpmi_dokumen" USING btree ("created_at");
   CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_lpmi_dokumen_id_idx" ON "payload_locked_documents_rels" USING btree ("lpmi_dokumen_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "payload_locked_documents_rels_lpmi_dokumen_id_idx";
   DROP INDEX IF EXISTS "lpmi_dokumen_created_at_idx";
   DROP INDEX IF EXISTS "lpmi_dokumen_updated_at_idx";
   DROP INDEX IF EXISTS "lpmi_dokumen_file_idx";
   DROP INDEX IF EXISTS "lpmi_dokumen_section_idx";

   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_lpmi_dokumen_fk";
   ALTER TABLE "lpmi_dokumen" DROP CONSTRAINT IF EXISTS "lpmi_dokumen_file_id_media_id_fk";
   ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "lpmi_dokumen_id";

   DROP TABLE IF EXISTS "lpmi_dokumen";
   DROP TYPE IF EXISTS "public"."enum_lpmi_dokumen_status";
   DROP TYPE IF EXISTS "public"."enum_lpmi_dokumen_section";
  `)
}
