import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "pmb_title" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "pmb_description" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "pmb_button_text" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "pmb_button_url" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "info_title" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "info_description" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "info_button_text" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "info_button_url" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "pmb_title";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "pmb_description";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "pmb_button_text";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "pmb_button_url";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "info_title";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "info_description";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "info_button_text";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "info_button_url";
  `)
}
