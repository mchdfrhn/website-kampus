import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_berita_kategori" AS ENUM('akademik', 'kemahasiswaan', 'penelitian', 'kerjasama', 'prestasi', 'pengumuman');
  CREATE TYPE "public"."enum_berita_status" AS ENUM('draft', 'terbit');
  CREATE TYPE "public"."enum_dosen_jabatan_fungsional" AS ENUM('asisten-ahli', 'lektor', 'lektor-kepala', 'profesor');
  CREATE TYPE "public"."enum_dosen_pendidikan_terakhir" AS ENUM('s2', 's3');
  CREATE TYPE "public"."enum_program_studi_jenjang" AS ENUM('d3', 'd4', 's1', 's2');
  CREATE TYPE "public"."enum_program_studi_akreditasi" AS ENUM('unggul', 'baik-sekali', 'baik', 'proses');
  CREATE TYPE "public"."enum_program_studi_status" AS ENUM('aktif', 'tidak-aktif');
  CREATE TYPE "public"."enum_galeri_kategori" AS ENUM('kegiatan', 'fasilitas', 'wisuda', 'prestasi');
  CREATE TYPE "public"."enum_galeri_status" AS ENUM('draft', 'terbit');
  CREATE TYPE "public"."enum_pesan_unit" AS ENUM('akademik', 'keuangan', 'kemahasiswaan', 'it', 'perpustakaan', 'umum');
  CREATE TYPE "public"."enum_pesan_status" AS ENUM('baru', 'dibaca', 'dibalas');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "berita_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "berita" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"judul" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"kategori" "enum_berita_kategori" NOT NULL,
  	"thumbnail_id" integer NOT NULL,
  	"ringkasan" varchar,
  	"konten" jsonb NOT NULL,
  	"penulis" varchar,
  	"tanggal_terbit" timestamp(3) with time zone,
  	"is_pinned" boolean DEFAULT false,
  	"status" "enum_berita_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "dosen_bidang_keahlian" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"keahlian" varchar
  );
  
  CREATE TABLE "dosen_publikasi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"judul" varchar,
  	"jurnal" varchar,
  	"tahun" numeric,
  	"url" varchar
  );
  
  CREATE TABLE "dosen" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nama" varchar NOT NULL,
  	"slug" varchar,
  	"nidn" varchar,
  	"foto_id" integer,
  	"jabatan_fungsional" "enum_dosen_jabatan_fungsional",
  	"pendidikan_terakhir" "enum_dosen_pendidikan_terakhir",
  	"bio" varchar,
  	"email" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "dosen_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"program_studi_id" integer
  );
  
  CREATE TABLE "program_studi_misi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"poin" varchar
  );
  
  CREATE TABLE "program_studi_kompetensi_lulusan" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kompetensi" varchar
  );
  
  CREATE TABLE "program_studi_prospek_karir" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"karir" varchar
  );
  
  CREATE TABLE "program_studi" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nama" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"jenjang" "enum_program_studi_jenjang" NOT NULL,
  	"akreditasi" "enum_program_studi_akreditasi",
  	"deskripsi_singkat" varchar,
  	"deskripsi" jsonb,
  	"visi" varchar,
  	"thumbnail_id" integer,
  	"status" "enum_program_studi_status" DEFAULT 'aktif',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "galeri_foto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"gambar_id" integer NOT NULL,
  	"keterangan" varchar
  );
  
  CREATE TABLE "galeri" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"judul" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"kategori" "enum_galeri_kategori",
  	"deskripsi" varchar,
  	"cover_foto_id" integer,
  	"tanggal" timestamp(3) with time zone,
  	"status" "enum_galeri_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pesan" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nama" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"telepon" varchar,
  	"unit" "enum_pesan_unit" NOT NULL,
  	"subjek" varchar NOT NULL,
  	"pesan" varchar NOT NULL,
  	"status" "enum_pesan_status" DEFAULT 'baru',
  	"ip_address" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"berita_id" integer,
  	"dosen_id" integer,
  	"program_studi_id" integer,
  	"galeri_id" integer,
  	"pesan_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "berita_tags" ADD CONSTRAINT "berita_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."berita"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "berita" ADD CONSTRAINT "berita_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dosen_bidang_keahlian" ADD CONSTRAINT "dosen_bidang_keahlian_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dosen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dosen_publikasi" ADD CONSTRAINT "dosen_publikasi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."dosen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dosen" ADD CONSTRAINT "dosen_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "dosen_rels" ADD CONSTRAINT "dosen_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."dosen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "dosen_rels" ADD CONSTRAINT "dosen_rels_program_studi_fk" FOREIGN KEY ("program_studi_id") REFERENCES "public"."program_studi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_studi_misi" ADD CONSTRAINT "program_studi_misi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_studi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_studi_kompetensi_lulusan" ADD CONSTRAINT "program_studi_kompetensi_lulusan_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_studi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_studi_prospek_karir" ADD CONSTRAINT "program_studi_prospek_karir_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."program_studi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "program_studi" ADD CONSTRAINT "program_studi_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "galeri_foto" ADD CONSTRAINT "galeri_foto_gambar_id_media_id_fk" FOREIGN KEY ("gambar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "galeri_foto" ADD CONSTRAINT "galeri_foto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."galeri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "galeri" ADD CONSTRAINT "galeri_cover_foto_id_media_id_fk" FOREIGN KEY ("cover_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_berita_fk" FOREIGN KEY ("berita_id") REFERENCES "public"."berita"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_dosen_fk" FOREIGN KEY ("dosen_id") REFERENCES "public"."dosen"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_program_studi_fk" FOREIGN KEY ("program_studi_id") REFERENCES "public"."program_studi"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_galeri_fk" FOREIGN KEY ("galeri_id") REFERENCES "public"."galeri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pesan_fk" FOREIGN KEY ("pesan_id") REFERENCES "public"."pesan"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "berita_tags_order_idx" ON "berita_tags" USING btree ("_order");
  CREATE INDEX "berita_tags_parent_id_idx" ON "berita_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "berita_slug_idx" ON "berita" USING btree ("slug");
  CREATE INDEX "berita_thumbnail_idx" ON "berita" USING btree ("thumbnail_id");
  CREATE INDEX "berita_updated_at_idx" ON "berita" USING btree ("updated_at");
  CREATE INDEX "berita_created_at_idx" ON "berita" USING btree ("created_at");
  CREATE INDEX "dosen_bidang_keahlian_order_idx" ON "dosen_bidang_keahlian" USING btree ("_order");
  CREATE INDEX "dosen_bidang_keahlian_parent_id_idx" ON "dosen_bidang_keahlian" USING btree ("_parent_id");
  CREATE INDEX "dosen_publikasi_order_idx" ON "dosen_publikasi" USING btree ("_order");
  CREATE INDEX "dosen_publikasi_parent_id_idx" ON "dosen_publikasi" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "dosen_slug_idx" ON "dosen" USING btree ("slug");
  CREATE INDEX "dosen_foto_idx" ON "dosen" USING btree ("foto_id");
  CREATE INDEX "dosen_updated_at_idx" ON "dosen" USING btree ("updated_at");
  CREATE INDEX "dosen_created_at_idx" ON "dosen" USING btree ("created_at");
  CREATE INDEX "dosen_rels_order_idx" ON "dosen_rels" USING btree ("order");
  CREATE INDEX "dosen_rels_parent_idx" ON "dosen_rels" USING btree ("parent_id");
  CREATE INDEX "dosen_rels_path_idx" ON "dosen_rels" USING btree ("path");
  CREATE INDEX "dosen_rels_program_studi_id_idx" ON "dosen_rels" USING btree ("program_studi_id");
  CREATE INDEX "program_studi_misi_order_idx" ON "program_studi_misi" USING btree ("_order");
  CREATE INDEX "program_studi_misi_parent_id_idx" ON "program_studi_misi" USING btree ("_parent_id");
  CREATE INDEX "program_studi_kompetensi_lulusan_order_idx" ON "program_studi_kompetensi_lulusan" USING btree ("_order");
  CREATE INDEX "program_studi_kompetensi_lulusan_parent_id_idx" ON "program_studi_kompetensi_lulusan" USING btree ("_parent_id");
  CREATE INDEX "program_studi_prospek_karir_order_idx" ON "program_studi_prospek_karir" USING btree ("_order");
  CREATE INDEX "program_studi_prospek_karir_parent_id_idx" ON "program_studi_prospek_karir" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "program_studi_slug_idx" ON "program_studi" USING btree ("slug");
  CREATE INDEX "program_studi_thumbnail_idx" ON "program_studi" USING btree ("thumbnail_id");
  CREATE INDEX "program_studi_updated_at_idx" ON "program_studi" USING btree ("updated_at");
  CREATE INDEX "program_studi_created_at_idx" ON "program_studi" USING btree ("created_at");
  CREATE INDEX "galeri_foto_order_idx" ON "galeri_foto" USING btree ("_order");
  CREATE INDEX "galeri_foto_parent_id_idx" ON "galeri_foto" USING btree ("_parent_id");
  CREATE INDEX "galeri_foto_gambar_idx" ON "galeri_foto" USING btree ("gambar_id");
  CREATE UNIQUE INDEX "galeri_slug_idx" ON "galeri" USING btree ("slug");
  CREATE INDEX "galeri_cover_foto_idx" ON "galeri" USING btree ("cover_foto_id");
  CREATE INDEX "galeri_updated_at_idx" ON "galeri" USING btree ("updated_at");
  CREATE INDEX "galeri_created_at_idx" ON "galeri" USING btree ("created_at");
  CREATE INDEX "pesan_updated_at_idx" ON "pesan" USING btree ("updated_at");
  CREATE INDEX "pesan_created_at_idx" ON "pesan" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_berita_id_idx" ON "payload_locked_documents_rels" USING btree ("berita_id");
  CREATE INDEX "payload_locked_documents_rels_dosen_id_idx" ON "payload_locked_documents_rels" USING btree ("dosen_id");
  CREATE INDEX "payload_locked_documents_rels_program_studi_id_idx" ON "payload_locked_documents_rels" USING btree ("program_studi_id");
  CREATE INDEX "payload_locked_documents_rels_galeri_id_idx" ON "payload_locked_documents_rels" USING btree ("galeri_id");
  CREATE INDEX "payload_locked_documents_rels_pesan_id_idx" ON "payload_locked_documents_rels" USING btree ("pesan_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "berita_tags" CASCADE;
  DROP TABLE "berita" CASCADE;
  DROP TABLE "dosen_bidang_keahlian" CASCADE;
  DROP TABLE "dosen_publikasi" CASCADE;
  DROP TABLE "dosen" CASCADE;
  DROP TABLE "dosen_rels" CASCADE;
  DROP TABLE "program_studi_misi" CASCADE;
  DROP TABLE "program_studi_kompetensi_lulusan" CASCADE;
  DROP TABLE "program_studi_prospek_karir" CASCADE;
  DROP TABLE "program_studi" CASCADE;
  DROP TABLE "galeri_foto" CASCADE;
  DROP TABLE "galeri" CASCADE;
  DROP TABLE "pesan" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_berita_kategori";
  DROP TYPE "public"."enum_berita_status";
  DROP TYPE "public"."enum_dosen_jabatan_fungsional";
  DROP TYPE "public"."enum_dosen_pendidikan_terakhir";
  DROP TYPE "public"."enum_program_studi_jenjang";
  DROP TYPE "public"."enum_program_studi_akreditasi";
  DROP TYPE "public"."enum_program_studi_status";
  DROP TYPE "public"."enum_galeri_kategori";
  DROP TYPE "public"."enum_galeri_status";
  DROP TYPE "public"."enum_pesan_unit";
  DROP TYPE "public"."enum_pesan_status";`)
}
