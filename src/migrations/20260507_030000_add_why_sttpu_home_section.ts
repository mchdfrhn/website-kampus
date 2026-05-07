import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "halaman_utama" ADD COLUMN IF NOT EXISTS "why_enabled" boolean DEFAULT true;
   ALTER TABLE "halaman_utama" ADD COLUMN IF NOT EXISTS "why_eyebrow" varchar DEFAULT 'Alasan Memilih STTPU';
   ALTER TABLE "halaman_utama" ADD COLUMN IF NOT EXISTS "why_title" varchar DEFAULT 'Mengapa Harus Kuliah di STT Pekerjaan Umum Jakarta?';
   ALTER TABLE "halaman_utama" ADD COLUMN IF NOT EXISTS "why_description" varchar DEFAULT 'STTPU Jakarta dirancang untuk mahasiswa yang ingin masuk ke bidang infrastruktur, pekerjaan umum, lingkungan, dan teknologi dengan arah belajar yang jelas sejak awal.';
   ALTER TABLE "halaman_utama" ADD COLUMN IF NOT EXISTS "why_proof" varchar DEFAULT 'Kurikulum dan ekosistem kampus diarahkan untuk menghubungkan teori, kebutuhan lapangan, layanan digital, dan jejaring mitra yang relevan dengan pembangunan Indonesia.';
   ALTER TABLE "halaman_utama" ADD COLUMN IF NOT EXISTS "why_cta_label" varchar DEFAULT 'Lihat Program Studi';
   ALTER TABLE "halaman_utama" ADD COLUMN IF NOT EXISTS "why_cta_href" varchar DEFAULT '/akademik/program-studi';

   CREATE TABLE IF NOT EXISTS "halaman_utama_why_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "icon" varchar DEFAULT 'Building2',
    "title" varchar NOT NULL,
    "description" varchar NOT NULL
   );

   DO $$
   BEGIN
    IF NOT EXISTS (
     SELECT 1 FROM pg_constraint WHERE conname = 'halaman_utama_why_items_parent_id_fk'
    ) THEN
     ALTER TABLE "halaman_utama_why_items"
      ADD CONSTRAINT "halaman_utama_why_items_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."halaman_utama"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
   END $$;

   CREATE INDEX IF NOT EXISTS "halaman_utama_why_items_order_idx" ON "halaman_utama_why_items" USING btree ("_order");
   CREATE INDEX IF NOT EXISTS "halaman_utama_why_items_parent_id_idx" ON "halaman_utama_why_items" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "halaman_utama_why_items_parent_id_idx";
   DROP INDEX IF EXISTS "halaman_utama_why_items_order_idx";
   ALTER TABLE "halaman_utama_why_items" DROP CONSTRAINT IF EXISTS "halaman_utama_why_items_parent_id_fk";
   DROP TABLE IF EXISTS "halaman_utama_why_items";
   ALTER TABLE "halaman_utama" DROP COLUMN IF EXISTS "why_cta_href";
   ALTER TABLE "halaman_utama" DROP COLUMN IF EXISTS "why_cta_label";
   ALTER TABLE "halaman_utama" DROP COLUMN IF EXISTS "why_proof";
   ALTER TABLE "halaman_utama" DROP COLUMN IF EXISTS "why_description";
   ALTER TABLE "halaman_utama" DROP COLUMN IF EXISTS "why_title";
   ALTER TABLE "halaman_utama" DROP COLUMN IF EXISTS "why_eyebrow";
   ALTER TABLE "halaman_utama" DROP COLUMN IF EXISTS "why_enabled";
  `)
}
