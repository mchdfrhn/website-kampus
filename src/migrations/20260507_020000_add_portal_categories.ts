import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "portal_links_portals"
      ADD COLUMN IF NOT EXISTS "kategori" varchar DEFAULT 'layanan' NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "portal_links_portals"
      DROP COLUMN IF EXISTS "kategori";
  `)
}
