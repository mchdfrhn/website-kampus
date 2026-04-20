import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_testimonial_status" AS ENUM('aktif', 'nonaktif');
  CREATE TYPE "public"."enum_ukm_bidang" AS ENUM('Olahraga', 'Seni & Budaya', 'Riset & Teknologi', 'Sosial & Keagamaan');
  CREATE TYPE "public"."enum_beasiswa_tipe" AS ENUM('internal', 'eksternal');
  CREATE TYPE "public"."enum_beasiswa_status" AS ENUM('buka', 'tutup', 'tahunan', 'periodik', 'conditional', 'buka-pmb');
  CREATE TYPE "public"."enum_site_settings_social_media_platform" AS ENUM('instagram', 'youtube', 'facebook', 'linkedin', 'twitter', 'tiktok');
  CREATE TYPE "public"."enum_tentang_kami_fasilitas_kategori" AS ENUM('laboratorium', 'perpustakaan', 'olahraga', 'penunjang', 'digital');
  CREATE TYPE "public"."enum_tentang_kami_akreditasi_prodi_akreditasi" AS ENUM('Unggul', 'Baik Sekali', 'Baik', 'Dalam Proses');
  CREATE TABLE "testimonial" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"teks" varchar NOT NULL,
  	"nama" varchar NOT NULL,
  	"prodi" varchar NOT NULL,
  	"foto_id" integer,
  	"urutan" numeric DEFAULT 0,
  	"status" "enum_testimonial_status" DEFAULT 'aktif',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pimpinan_pendidikan" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"jenjang" varchar NOT NULL
  );
  
  CREATE TABLE "pimpinan" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"jabatan" varchar NOT NULL,
  	"nama" varchar NOT NULL,
  	"nip" varchar,
  	"keahlian" varchar,
  	"foto_id" integer,
  	"pengalaman" varchar,
  	"sambutan" varchar,
  	"urutan" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "ukm" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nama" varchar NOT NULL,
  	"bidang" "enum_ukm_bidang" NOT NULL,
  	"deskripsi" varchar NOT NULL,
  	"prestasi" varchar,
  	"anggota" numeric,
  	"kontak" varchar,
  	"logo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "beasiswa_syarat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"poin" varchar NOT NULL
  );
  
  CREATE TABLE "beasiswa" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nama" varchar NOT NULL,
  	"penyelenggara" varchar NOT NULL,
  	"tipe" "enum_beasiswa_tipe" DEFAULT 'internal' NOT NULL,
  	"jenis" varchar,
  	"nilai" varchar,
  	"deadline" varchar,
  	"status" "enum_beasiswa_status" DEFAULT 'buka',
  	"deskripsi" varchar,
  	"url" varchar,
  	"urutan" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "akreditasi_lembaga" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nama" varchar NOT NULL,
  	"status" varchar NOT NULL,
  	"logo_id" integer,
  	"urutan" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "unit_kontak" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"unit" varchar NOT NULL,
  	"kepala" varchar,
  	"telepon" varchar,
  	"tel_href" varchar,
  	"email" varchar,
  	"tugas" varchar,
  	"urutan" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_telepon_lainnya" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nomor" varchar NOT NULL,
  	"href" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "site_settings_email_lainnya" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "site_settings_jam_operasional" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hari" varchar NOT NULL,
  	"jam" varchar,
  	"tutup" boolean
  );
  
  CREATE TABLE "site_settings_social_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_media_platform" NOT NULL,
  	"handle" varchar,
  	"url" varchar NOT NULL,
  	"followers" varchar
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nama_institusi" varchar DEFAULT 'STTPU Jakarta',
  	"deskripsi_footer" varchar,
  	"alamat" varchar,
  	"telepon_utama" varchar,
  	"telepon_utama_href" varchar,
  	"email_utama" varchar,
  	"whatsapp" varchar,
  	"whatsapp_tampil" varchar,
  	"google_maps_embed" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "halaman_utama_statistik" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"angka" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "halaman_utama_quick_links_tabs_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"external" boolean
  );
  
  CREATE TABLE "halaman_utama_quick_links_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "halaman_utama" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_badge" varchar DEFAULT 'Sekolah Tinggi Teknologi',
  	"hero_judul" varchar NOT NULL,
  	"hero_subjudul" varchar,
  	"hero_cta1_teks" varchar,
  	"hero_cta1_href" varchar,
  	"hero_cta2_teks" varchar,
  	"hero_cta2_href" varchar,
  	"hero_foto_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "tentang_kami_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tahun" varchar NOT NULL,
  	"judul" varchar NOT NULL,
  	"deskripsi" varchar
  );
  
  CREATE TABLE "tentang_kami_misi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"poin" varchar NOT NULL
  );
  
  CREATE TABLE "tentang_kami_tujuan" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"poin" varchar NOT NULL
  );
  
  CREATE TABLE "tentang_kami_nilai_nilai" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nama" varchar NOT NULL,
  	"deskripsi" varchar
  );
  
  CREATE TABLE "tentang_kami_struktur_u_p_t" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"unit" varchar NOT NULL,
  	"kepala" varchar
  );
  
  CREATE TABLE "tentang_kami_struktur_bagian" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"bagian" varchar NOT NULL,
  	"kepala" varchar
  );
  
  CREATE TABLE "tentang_kami_fasilitas_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nama" varchar NOT NULL
  );
  
  CREATE TABLE "tentang_kami_fasilitas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nama" varchar NOT NULL,
  	"deskripsi" varchar,
  	"kapasitas" varchar,
  	"foto_id" integer,
  	"kategori" "enum_tentang_kami_fasilitas_kategori"
  );
  
  CREATE TABLE "tentang_kami_akreditasi_prodi" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prodi" varchar NOT NULL,
  	"jenjang" varchar,
  	"akreditasi" "enum_tentang_kami_akreditasi_prodi_akreditasi",
  	"nomor_s_k" varchar,
  	"berlaku_hingga" varchar,
  	"file_s_k_id" integer
  );
  
  CREATE TABLE "tentang_kami_legalitas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"dokumen" varchar NOT NULL,
  	"nomor" varchar,
  	"tanggal" varchar,
  	"keterangan" varchar,
  	"file_id" integer
  );
  
  CREATE TABLE "tentang_kami" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"sejarah_deskripsi" jsonb,
  	"visi" varchar,
  	"struktur_gambar_id" integer,
  	"struktur_senat_jabatan" varchar,
  	"struktur_senat_nama" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "kalender_akademik_semester_ganjil_kegiatan" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kegiatan" varchar NOT NULL,
  	"tanggal" varchar NOT NULL,
  	"keterangan" varchar
  );
  
  CREATE TABLE "kalender_akademik_semester_genap_kegiatan" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kegiatan" varchar NOT NULL,
  	"tanggal" varchar NOT NULL,
  	"keterangan" varchar
  );
  
  CREATE TABLE "kalender_akademik_kegiatan_penting" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nama" varchar NOT NULL,
  	"tanggal" varchar NOT NULL,
  	"keterangan" varchar
  );
  
  CREATE TABLE "kalender_akademik" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tahun_akademik" varchar NOT NULL,
  	"deskripsi" varchar,
  	"pdf_url" varchar,
  	"semester_ganjil_label" varchar,
  	"semester_genap_label" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimonial_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pimpinan_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "ukm_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "beasiswa_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "akreditasi_lembaga_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "unit_kontak_id" integer;
  ALTER TABLE "testimonial" ADD CONSTRAINT "testimonial_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pimpinan_pendidikan" ADD CONSTRAINT "pimpinan_pendidikan_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pimpinan"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pimpinan" ADD CONSTRAINT "pimpinan_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ukm" ADD CONSTRAINT "ukm_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "beasiswa_syarat" ADD CONSTRAINT "beasiswa_syarat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."beasiswa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "akreditasi_lembaga" ADD CONSTRAINT "akreditasi_lembaga_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_telepon_lainnya" ADD CONSTRAINT "site_settings_telepon_lainnya_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_email_lainnya" ADD CONSTRAINT "site_settings_email_lainnya_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_jam_operasional" ADD CONSTRAINT "site_settings_jam_operasional_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_media" ADD CONSTRAINT "site_settings_social_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "halaman_utama_statistik" ADD CONSTRAINT "halaman_utama_statistik_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."halaman_utama"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "halaman_utama_quick_links_tabs_links" ADD CONSTRAINT "halaman_utama_quick_links_tabs_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."halaman_utama_quick_links_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "halaman_utama_quick_links_tabs" ADD CONSTRAINT "halaman_utama_quick_links_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."halaman_utama"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "halaman_utama" ADD CONSTRAINT "halaman_utama_hero_foto_id_media_id_fk" FOREIGN KEY ("hero_foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tentang_kami_milestones" ADD CONSTRAINT "tentang_kami_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tentang_kami"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tentang_kami_misi" ADD CONSTRAINT "tentang_kami_misi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tentang_kami"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tentang_kami_tujuan" ADD CONSTRAINT "tentang_kami_tujuan_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tentang_kami"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tentang_kami_nilai_nilai" ADD CONSTRAINT "tentang_kami_nilai_nilai_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tentang_kami"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tentang_kami_struktur_u_p_t" ADD CONSTRAINT "tentang_kami_struktur_u_p_t_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tentang_kami"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tentang_kami_struktur_bagian" ADD CONSTRAINT "tentang_kami_struktur_bagian_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tentang_kami"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tentang_kami_fasilitas_items" ADD CONSTRAINT "tentang_kami_fasilitas_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tentang_kami_fasilitas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tentang_kami_fasilitas" ADD CONSTRAINT "tentang_kami_fasilitas_foto_id_media_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tentang_kami_fasilitas" ADD CONSTRAINT "tentang_kami_fasilitas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tentang_kami"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tentang_kami_akreditasi_prodi" ADD CONSTRAINT "tentang_kami_akreditasi_prodi_file_s_k_id_media_id_fk" FOREIGN KEY ("file_s_k_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tentang_kami_akreditasi_prodi" ADD CONSTRAINT "tentang_kami_akreditasi_prodi_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tentang_kami"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tentang_kami_legalitas" ADD CONSTRAINT "tentang_kami_legalitas_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tentang_kami_legalitas" ADD CONSTRAINT "tentang_kami_legalitas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tentang_kami"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tentang_kami" ADD CONSTRAINT "tentang_kami_struktur_gambar_id_media_id_fk" FOREIGN KEY ("struktur_gambar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "kalender_akademik_semester_ganjil_kegiatan" ADD CONSTRAINT "kalender_akademik_semester_ganjil_kegiatan_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kalender_akademik"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kalender_akademik_semester_genap_kegiatan" ADD CONSTRAINT "kalender_akademik_semester_genap_kegiatan_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kalender_akademik"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kalender_akademik_kegiatan_penting" ADD CONSTRAINT "kalender_akademik_kegiatan_penting_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kalender_akademik"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "testimonial_foto_idx" ON "testimonial" USING btree ("foto_id");
  CREATE INDEX "testimonial_updated_at_idx" ON "testimonial" USING btree ("updated_at");
  CREATE INDEX "testimonial_created_at_idx" ON "testimonial" USING btree ("created_at");
  CREATE INDEX "pimpinan_pendidikan_order_idx" ON "pimpinan_pendidikan" USING btree ("_order");
  CREATE INDEX "pimpinan_pendidikan_parent_id_idx" ON "pimpinan_pendidikan" USING btree ("_parent_id");
  CREATE INDEX "pimpinan_foto_idx" ON "pimpinan" USING btree ("foto_id");
  CREATE INDEX "pimpinan_updated_at_idx" ON "pimpinan" USING btree ("updated_at");
  CREATE INDEX "pimpinan_created_at_idx" ON "pimpinan" USING btree ("created_at");
  CREATE INDEX "ukm_logo_idx" ON "ukm" USING btree ("logo_id");
  CREATE INDEX "ukm_updated_at_idx" ON "ukm" USING btree ("updated_at");
  CREATE INDEX "ukm_created_at_idx" ON "ukm" USING btree ("created_at");
  CREATE INDEX "beasiswa_syarat_order_idx" ON "beasiswa_syarat" USING btree ("_order");
  CREATE INDEX "beasiswa_syarat_parent_id_idx" ON "beasiswa_syarat" USING btree ("_parent_id");
  CREATE INDEX "beasiswa_updated_at_idx" ON "beasiswa" USING btree ("updated_at");
  CREATE INDEX "beasiswa_created_at_idx" ON "beasiswa" USING btree ("created_at");
  CREATE INDEX "akreditasi_lembaga_logo_idx" ON "akreditasi_lembaga" USING btree ("logo_id");
  CREATE INDEX "akreditasi_lembaga_updated_at_idx" ON "akreditasi_lembaga" USING btree ("updated_at");
  CREATE INDEX "akreditasi_lembaga_created_at_idx" ON "akreditasi_lembaga" USING btree ("created_at");
  CREATE INDEX "unit_kontak_updated_at_idx" ON "unit_kontak" USING btree ("updated_at");
  CREATE INDEX "unit_kontak_created_at_idx" ON "unit_kontak" USING btree ("created_at");
  CREATE INDEX "site_settings_telepon_lainnya_order_idx" ON "site_settings_telepon_lainnya" USING btree ("_order");
  CREATE INDEX "site_settings_telepon_lainnya_parent_id_idx" ON "site_settings_telepon_lainnya" USING btree ("_parent_id");
  CREATE INDEX "site_settings_email_lainnya_order_idx" ON "site_settings_email_lainnya" USING btree ("_order");
  CREATE INDEX "site_settings_email_lainnya_parent_id_idx" ON "site_settings_email_lainnya" USING btree ("_parent_id");
  CREATE INDEX "site_settings_jam_operasional_order_idx" ON "site_settings_jam_operasional" USING btree ("_order");
  CREATE INDEX "site_settings_jam_operasional_parent_id_idx" ON "site_settings_jam_operasional" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_media_order_idx" ON "site_settings_social_media" USING btree ("_order");
  CREATE INDEX "site_settings_social_media_parent_id_idx" ON "site_settings_social_media" USING btree ("_parent_id");
  CREATE INDEX "halaman_utama_statistik_order_idx" ON "halaman_utama_statistik" USING btree ("_order");
  CREATE INDEX "halaman_utama_statistik_parent_id_idx" ON "halaman_utama_statistik" USING btree ("_parent_id");
  CREATE INDEX "halaman_utama_quick_links_tabs_links_order_idx" ON "halaman_utama_quick_links_tabs_links" USING btree ("_order");
  CREATE INDEX "halaman_utama_quick_links_tabs_links_parent_id_idx" ON "halaman_utama_quick_links_tabs_links" USING btree ("_parent_id");
  CREATE INDEX "halaman_utama_quick_links_tabs_order_idx" ON "halaman_utama_quick_links_tabs" USING btree ("_order");
  CREATE INDEX "halaman_utama_quick_links_tabs_parent_id_idx" ON "halaman_utama_quick_links_tabs" USING btree ("_parent_id");
  CREATE INDEX "halaman_utama_hero_foto_idx" ON "halaman_utama" USING btree ("hero_foto_id");
  CREATE INDEX "tentang_kami_milestones_order_idx" ON "tentang_kami_milestones" USING btree ("_order");
  CREATE INDEX "tentang_kami_milestones_parent_id_idx" ON "tentang_kami_milestones" USING btree ("_parent_id");
  CREATE INDEX "tentang_kami_misi_order_idx" ON "tentang_kami_misi" USING btree ("_order");
  CREATE INDEX "tentang_kami_misi_parent_id_idx" ON "tentang_kami_misi" USING btree ("_parent_id");
  CREATE INDEX "tentang_kami_tujuan_order_idx" ON "tentang_kami_tujuan" USING btree ("_order");
  CREATE INDEX "tentang_kami_tujuan_parent_id_idx" ON "tentang_kami_tujuan" USING btree ("_parent_id");
  CREATE INDEX "tentang_kami_nilai_nilai_order_idx" ON "tentang_kami_nilai_nilai" USING btree ("_order");
  CREATE INDEX "tentang_kami_nilai_nilai_parent_id_idx" ON "tentang_kami_nilai_nilai" USING btree ("_parent_id");
  CREATE INDEX "tentang_kami_struktur_u_p_t_order_idx" ON "tentang_kami_struktur_u_p_t" USING btree ("_order");
  CREATE INDEX "tentang_kami_struktur_u_p_t_parent_id_idx" ON "tentang_kami_struktur_u_p_t" USING btree ("_parent_id");
  CREATE INDEX "tentang_kami_struktur_bagian_order_idx" ON "tentang_kami_struktur_bagian" USING btree ("_order");
  CREATE INDEX "tentang_kami_struktur_bagian_parent_id_idx" ON "tentang_kami_struktur_bagian" USING btree ("_parent_id");
  CREATE INDEX "tentang_kami_fasilitas_items_order_idx" ON "tentang_kami_fasilitas_items" USING btree ("_order");
  CREATE INDEX "tentang_kami_fasilitas_items_parent_id_idx" ON "tentang_kami_fasilitas_items" USING btree ("_parent_id");
  CREATE INDEX "tentang_kami_fasilitas_order_idx" ON "tentang_kami_fasilitas" USING btree ("_order");
  CREATE INDEX "tentang_kami_fasilitas_parent_id_idx" ON "tentang_kami_fasilitas" USING btree ("_parent_id");
  CREATE INDEX "tentang_kami_fasilitas_foto_idx" ON "tentang_kami_fasilitas" USING btree ("foto_id");
  CREATE INDEX "tentang_kami_akreditasi_prodi_order_idx" ON "tentang_kami_akreditasi_prodi" USING btree ("_order");
  CREATE INDEX "tentang_kami_akreditasi_prodi_parent_id_idx" ON "tentang_kami_akreditasi_prodi" USING btree ("_parent_id");
  CREATE INDEX "tentang_kami_akreditasi_prodi_file_s_k_idx" ON "tentang_kami_akreditasi_prodi" USING btree ("file_s_k_id");
  CREATE INDEX "tentang_kami_legalitas_order_idx" ON "tentang_kami_legalitas" USING btree ("_order");
  CREATE INDEX "tentang_kami_legalitas_parent_id_idx" ON "tentang_kami_legalitas" USING btree ("_parent_id");
  CREATE INDEX "tentang_kami_legalitas_file_idx" ON "tentang_kami_legalitas" USING btree ("file_id");
  CREATE INDEX "tentang_kami_struktur_gambar_idx" ON "tentang_kami" USING btree ("struktur_gambar_id");
  CREATE INDEX "kalender_akademik_semester_ganjil_kegiatan_order_idx" ON "kalender_akademik_semester_ganjil_kegiatan" USING btree ("_order");
  CREATE INDEX "kalender_akademik_semester_ganjil_kegiatan_parent_id_idx" ON "kalender_akademik_semester_ganjil_kegiatan" USING btree ("_parent_id");
  CREATE INDEX "kalender_akademik_semester_genap_kegiatan_order_idx" ON "kalender_akademik_semester_genap_kegiatan" USING btree ("_order");
  CREATE INDEX "kalender_akademik_semester_genap_kegiatan_parent_id_idx" ON "kalender_akademik_semester_genap_kegiatan" USING btree ("_parent_id");
  CREATE INDEX "kalender_akademik_kegiatan_penting_order_idx" ON "kalender_akademik_kegiatan_penting" USING btree ("_order");
  CREATE INDEX "kalender_akademik_kegiatan_penting_parent_id_idx" ON "kalender_akademik_kegiatan_penting" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonial_fk" FOREIGN KEY ("testimonial_id") REFERENCES "public"."testimonial"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pimpinan_fk" FOREIGN KEY ("pimpinan_id") REFERENCES "public"."pimpinan"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ukm_fk" FOREIGN KEY ("ukm_id") REFERENCES "public"."ukm"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_beasiswa_fk" FOREIGN KEY ("beasiswa_id") REFERENCES "public"."beasiswa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_akreditasi_lembaga_fk" FOREIGN KEY ("akreditasi_lembaga_id") REFERENCES "public"."akreditasi_lembaga"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_unit_kontak_fk" FOREIGN KEY ("unit_kontak_id") REFERENCES "public"."unit_kontak"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_testimonial_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonial_id");
  CREATE INDEX "payload_locked_documents_rels_pimpinan_id_idx" ON "payload_locked_documents_rels" USING btree ("pimpinan_id");
  CREATE INDEX "payload_locked_documents_rels_ukm_id_idx" ON "payload_locked_documents_rels" USING btree ("ukm_id");
  CREATE INDEX "payload_locked_documents_rels_beasiswa_id_idx" ON "payload_locked_documents_rels" USING btree ("beasiswa_id");
  CREATE INDEX "payload_locked_documents_rels_akreditasi_lembaga_id_idx" ON "payload_locked_documents_rels" USING btree ("akreditasi_lembaga_id");
  CREATE INDEX "payload_locked_documents_rels_unit_kontak_id_idx" ON "payload_locked_documents_rels" USING btree ("unit_kontak_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "testimonial" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pimpinan_pendidikan" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pimpinan" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "ukm" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "beasiswa_syarat" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "beasiswa" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "akreditasi_lembaga" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "unit_kontak" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_telepon_lainnya" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_email_lainnya" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_jam_operasional" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_social_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "halaman_utama_statistik" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "halaman_utama_quick_links_tabs_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "halaman_utama_quick_links_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "halaman_utama" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tentang_kami_milestones" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tentang_kami_misi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tentang_kami_tujuan" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tentang_kami_nilai_nilai" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tentang_kami_struktur_u_p_t" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tentang_kami_struktur_bagian" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tentang_kami_fasilitas_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tentang_kami_fasilitas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tentang_kami_akreditasi_prodi" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tentang_kami_legalitas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tentang_kami" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "kalender_akademik_semester_ganjil_kegiatan" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "kalender_akademik_semester_genap_kegiatan" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "kalender_akademik_kegiatan_penting" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "kalender_akademik" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "testimonial" CASCADE;
  DROP TABLE "pimpinan_pendidikan" CASCADE;
  DROP TABLE "pimpinan" CASCADE;
  DROP TABLE "ukm" CASCADE;
  DROP TABLE "beasiswa_syarat" CASCADE;
  DROP TABLE "beasiswa" CASCADE;
  DROP TABLE "akreditasi_lembaga" CASCADE;
  DROP TABLE "unit_kontak" CASCADE;
  DROP TABLE "site_settings_telepon_lainnya" CASCADE;
  DROP TABLE "site_settings_email_lainnya" CASCADE;
  DROP TABLE "site_settings_jam_operasional" CASCADE;
  DROP TABLE "site_settings_social_media" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "halaman_utama_statistik" CASCADE;
  DROP TABLE "halaman_utama_quick_links_tabs_links" CASCADE;
  DROP TABLE "halaman_utama_quick_links_tabs" CASCADE;
  DROP TABLE "halaman_utama" CASCADE;
  DROP TABLE "tentang_kami_milestones" CASCADE;
  DROP TABLE "tentang_kami_misi" CASCADE;
  DROP TABLE "tentang_kami_tujuan" CASCADE;
  DROP TABLE "tentang_kami_nilai_nilai" CASCADE;
  DROP TABLE "tentang_kami_struktur_u_p_t" CASCADE;
  DROP TABLE "tentang_kami_struktur_bagian" CASCADE;
  DROP TABLE "tentang_kami_fasilitas_items" CASCADE;
  DROP TABLE "tentang_kami_fasilitas" CASCADE;
  DROP TABLE "tentang_kami_akreditasi_prodi" CASCADE;
  DROP TABLE "tentang_kami_legalitas" CASCADE;
  DROP TABLE "tentang_kami" CASCADE;
  DROP TABLE "kalender_akademik_semester_ganjil_kegiatan" CASCADE;
  DROP TABLE "kalender_akademik_semester_genap_kegiatan" CASCADE;
  DROP TABLE "kalender_akademik_kegiatan_penting" CASCADE;
  DROP TABLE "kalender_akademik" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimonial_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pimpinan_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_ukm_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_beasiswa_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_akreditasi_lembaga_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_unit_kontak_fk";
  
  DROP INDEX "payload_locked_documents_rels_testimonial_id_idx";
  DROP INDEX "payload_locked_documents_rels_pimpinan_id_idx";
  DROP INDEX "payload_locked_documents_rels_ukm_id_idx";
  DROP INDEX "payload_locked_documents_rels_beasiswa_id_idx";
  DROP INDEX "payload_locked_documents_rels_akreditasi_lembaga_id_idx";
  DROP INDEX "payload_locked_documents_rels_unit_kontak_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "testimonial_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pimpinan_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "ukm_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "beasiswa_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "akreditasi_lembaga_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "unit_kontak_id";
  DROP TYPE "public"."enum_testimonial_status";
  DROP TYPE "public"."enum_ukm_bidang";
  DROP TYPE "public"."enum_beasiswa_tipe";
  DROP TYPE "public"."enum_beasiswa_status";
  DROP TYPE "public"."enum_site_settings_social_media_platform";
  DROP TYPE "public"."enum_tentang_kami_fasilitas_kategori";
  DROP TYPE "public"."enum_tentang_kami_akreditasi_prodi_akreditasi";`)
}
