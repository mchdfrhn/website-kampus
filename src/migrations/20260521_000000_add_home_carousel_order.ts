import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "berita" ADD COLUMN IF NOT EXISTS "show_in_hero_carousel" boolean DEFAULT false;
   ALTER TABLE "berita" ADD COLUMN IF NOT EXISTS "hero_carousel_urutan" numeric DEFAULT 10;
   ALTER TABLE "halaman_utama_hero_slides" ADD COLUMN IF NOT EXISTS "urutan" numeric DEFAULT 10;

   CREATE INDEX IF NOT EXISTS "berita_show_in_hero_carousel_idx" ON "berita" USING btree ("show_in_hero_carousel");
   CREATE INDEX IF NOT EXISTS "berita_hero_carousel_urutan_idx" ON "berita" USING btree ("hero_carousel_urutan");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "berita_hero_carousel_urutan_idx";
   DROP INDEX IF EXISTS "berita_show_in_hero_carousel_idx";
   ALTER TABLE "halaman_utama_hero_slides" DROP COLUMN IF EXISTS "urutan";
   ALTER TABLE "berita" DROP COLUMN IF EXISTS "hero_carousel_urutan";
   ALTER TABLE "berita" DROP COLUMN IF EXISTS "show_in_hero_carousel";
  `)
}
