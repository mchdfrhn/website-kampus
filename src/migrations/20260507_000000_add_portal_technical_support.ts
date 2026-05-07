import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "portal_links" ADD COLUMN IF NOT EXISTS "bantuan_teknis_judul" varchar DEFAULT 'Butuh Bantuan Teknis?';
   ALTER TABLE "portal_links" ADD COLUMN IF NOT EXISTS "bantuan_teknis_deskripsi" varchar DEFAULT 'Jika mengalami kendala akses atau lupa kata sandi, hubungi UPT Teknologi Informasi STTPU.';
   ALTER TABLE "portal_links" ADD COLUMN IF NOT EXISTS "bantuan_teknis_email" varchar DEFAULT 'it@sttpu.ac.id';
   ALTER TABLE "portal_links" ADD COLUMN IF NOT EXISTS "bantuan_teknis_email_label" varchar DEFAULT 'it@sttpu.ac.id';
   ALTER TABLE "portal_links" ADD COLUMN IF NOT EXISTS "bantuan_teknis_whatsapp_label" varchar DEFAULT 'Chat WhatsApp Bantuan';
   ALTER TABLE "portal_links" ADD COLUMN IF NOT EXISTS "bantuan_teknis_whatsapp_url" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "portal_links" DROP COLUMN IF EXISTS "bantuan_teknis_whatsapp_url";
   ALTER TABLE "portal_links" DROP COLUMN IF EXISTS "bantuan_teknis_whatsapp_label";
   ALTER TABLE "portal_links" DROP COLUMN IF EXISTS "bantuan_teknis_email_label";
   ALTER TABLE "portal_links" DROP COLUMN IF EXISTS "bantuan_teknis_email";
   ALTER TABLE "portal_links" DROP COLUMN IF EXISTS "bantuan_teknis_deskripsi";
   ALTER TABLE "portal_links" DROP COLUMN IF EXISTS "bantuan_teknis_judul";
  `)
}
