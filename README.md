# STTPU Website

Website kampus STTPU yang dibangun dengan `Next.js App Router` dan `Payload CMS`, memakai `PostgreSQL` sebagai database dan storage media berbasis `S3 / Cloudflare R2`.

Project ini menggabungkan:
- frontend publik kampus
- admin CMS Payload
- content modeling untuk akademik, berita, galeri, kemahasiswaan, penelitian, dan kontak
- migrasi schema database
- seed data awal

## Stack

- `Next.js 16`
- `React 19`
- `Payload CMS 3`
- `PostgreSQL`
- `Tailwind CSS 4`
- `S3-compatible storage` untuk media

## Fitur Utama

- halaman publik kampus: beranda, tentang, akademik, kemahasiswaan, penelitian, berita, galeri, kontak, portal
- CMS admin di `/admin`
- collection dinamis untuk:
  - `Program Studi`
  - `Dosen`
  - `Berita`
  - `Galeri`
  - `Kategori Berita`
  - `Kategori Galeri`
  - `Beasiswa`
  - `UKM`
  - `Pimpinan`
  - `Unit Kontak`
  - dan collection pendukung lainnya
- global settings untuk:
  - identitas situs
  - halaman utama
  - menu utama
  - halaman section akademik / penelitian / kemahasiswaan / kontak
- sitemap dan robots
- SEO metadata dasar + structured data dasar
- revalidation otomatis setelah perubahan konten di admin

## Struktur Project

```text
src/
  app/
    (frontend)/        # halaman publik
    (payload)/admin/   # admin Payload
    robots.ts
    sitemap.ts
  collections/         # schema collection Payload
  globals/             # schema global Payload
  components/          # komponen UI/section
  lib/                 # mapper data, util, SEO, payload client, revalidate
  migrations/          # migration database

scripts/
  seed.ts              # seed data awal
  backup-postgres.sh   # backup database
```

## Prasyarat

- `Node.js 20+`
- `npm`
- `PostgreSQL`
- bucket `S3 / R2` jika upload media dipakai

## Environment Variables

Salin file contoh:

```bash
cp .env.example .env
```

Minimal env yang perlu diisi agar app berjalan:

```env
DATABASE_URI=postgresql://user:password@localhost:5432/sttpu_website
PAYLOAD_SECRET=isi-dengan-random-string-yang-panjang
NEXT_PUBLIC_SITE_URL=http://localhost:3000

S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_BUCKET=
S3_ENDPOINT=
S3_REGION=
```

Env penting lain:

- `DB_DISABLE_SSL`
- `NEXT_PUBLIC_PORTAL_*`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `BACKUP_*`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID`

Referensi lengkap ada di [.env.example](/home/mchdfrhn/Project/sttpu/website-kampus/.env.example).

## Instalasi

```bash
npm install
```

## Menjalankan Development Server

```bash
npm run dev
```

Lalu buka:

- frontend: `http://localhost:3000`
- admin Payload: `http://localhost:3000/admin`

## Database Migration

Untuk menjalankan migration:

```bash
npx payload migrate
```

Catatan:
- project ini memakai migration manual di `src/migrations`
- jika schema pernah terdorong lewat mode dev Payload, CLI bisa menampilkan prompt peringatan
- migration terbaru juga sudah menangani konversi kategori `berita` dan `galeri` ke model relationship

## Seed Data

Untuk mengisi data awal:

```bash
npm run seed
```

Catatan penting:
- seeding collection dibuat idempotent sebisa mungkin
- seeding global **tidak lagi menimpa** global yang sudah terisi
- kategori `Berita` dan `Galeri` sekarang dikelola dari Payload, jadi seed lama mungkin perlu disesuaikan lagi bila ingin mengisi kategori relasi secara otomatis

## Backup Database

Script backup tersedia di:

```bash
npm run backup:db
```

Dokumentasi detail backup ada di [PGDUMP_BACKUP.md](/home/mchdfrhn/Project/sttpu/website-kampus/PGDUMP_BACKUP.md).

## Build Production

```bash
npm run build
npm run start
```

## SEO & Technical Notes

Project ini sudah memiliki dasar berikut:

- `robots.ts`
- `sitemap.ts`
- metadata dasar per halaman
- canonical / Open Graph / Twitter untuk halaman utama yang sudah dioptimasi
- structured data dasar untuk:
  - organisasi kampus
  - website
  - artikel berita
  - profil dosen
  - program studi
  - breadcrumb

Masih ada beberapa peluang lanjutan, misalnya:
- halaman detail galeri
- structured data tambahan
- audit internal linking
- penguatan konten page prioritas

## Catatan Operasional

- URL dasar situs diambil dari `NEXT_PUBLIC_SITE_URL`
- upload media memakai adapter S3 di [payload.config.ts](/home/mchdfrhn/Project/sttpu/website-kampus/payload.config.ts)
- frontend menggunakan revalidation path setelah perubahan collection/global
- beberapa page detail memakai `generateStaticParams` + data dari Payload

## Dokumentasi Tambahan

- [PRD.md](/home/mchdfrhn/Project/sttpu/website-kampus/PRD.md)
- [TECH_STACK.md](/home/mchdfrhn/Project/sttpu/website-kampus/TECH_STACK.md)
- [DATABASE_SCHEMA.md](/home/mchdfrhn/Project/sttpu/website-kampus/DATABASE_SCHEMA.md)
- [API_DESIGN_NOTES.md](/home/mchdfrhn/Project/sttpu/website-kampus/API_DESIGN_NOTES.md)
- [API_CONTRACT.yaml](/home/mchdfrhn/Project/sttpu/website-kampus/API_CONTRACT.yaml)

## Command Ringkas

```bash
npm run dev
npx payload migrate
npm run seed
npm run build
npm run start
npm run backup:db
```
