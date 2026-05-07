import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "halaman_utama_why_items" ADD COLUMN IF NOT EXISTS "background_id" integer;

   DO $$
   BEGIN
    IF NOT EXISTS (
     SELECT 1 FROM pg_constraint WHERE conname = 'halaman_utama_why_items_background_id_media_id_fk'
    ) THEN
     ALTER TABLE "halaman_utama_why_items"
      ADD CONSTRAINT "halaman_utama_why_items_background_id_media_id_fk"
      FOREIGN KEY ("background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
   END $$;

   CREATE INDEX IF NOT EXISTS "halaman_utama_why_items_background_idx" ON "halaman_utama_why_items" USING btree ("background_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "halaman_utama_why_items_background_idx";
   ALTER TABLE "halaman_utama_why_items" DROP CONSTRAINT IF EXISTS "halaman_utama_why_items_background_id_media_id_fk";
   ALTER TABLE "halaman_utama_why_items" DROP COLUMN IF EXISTS "background_id";
  `)
}
