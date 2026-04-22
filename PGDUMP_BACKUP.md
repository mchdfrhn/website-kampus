# Backup Otomatis PostgreSQL dengan `pg_dump`

Panduan ini memakai script:

- [backup-postgres.sh](/home/mchdfrhn/Project/sttpu/website-kampus/scripts/backup-postgres.sh)

## 1. Siapkan environment

Tambahkan variabel berikut ke `.env`:

```env
DATABASE_URI=postgresql://USER:PASSWORD@HOST:PORT/DBNAME

# Opsional. Kalau diisi, ini akan dipakai untuk backup.
BACKUP_DATABASE_URL=

BACKUP_DIR=./backups/postgres
BACKUP_RETENTION_DAYS=14
BACKUP_PREFIX=sttpu-postgres
BACKUP_FORMAT=custom

BACKUP_S3_ENABLED=false
BACKUP_S3_BUCKET=
BACKUP_S3_PREFIX=postgres
BACKUP_S3_REGION=us-east-1
BACKUP_S3_ENDPOINT=
BACKUP_S3_ACCESS_KEY_ID=
BACKUP_S3_SECRET_ACCESS_KEY=
BACKUP_S3_STORAGE_CLASS=STANDARD
```

Catatan:

- `BACKUP_FORMAT=custom` menghasilkan file `.dump` dan ini paling cocok untuk restore fleksibel.
- `BACKUP_FORMAT=plain` menghasilkan file `.sql.gz`.
- Jika `BACKUP_S3_ENABLED=true`, file backup lokal juga akan di-upload ke S3/R2 lewat script Node.js internal project.

## 2. Install client PostgreSQL

Pastikan `pg_dump` tersedia:

```bash
pg_dump --version
```

Kalau belum ada:

Ubuntu / Debian:

```bash
sudo apt update
sudo apt install postgresql-client
```

Alpine:

```bash
apk add postgresql-client
```

macOS:

```bash
brew install postgresql
```

## 2b. Pastikan Node.js tersedia

Upload ke S3/R2 memakai AWS SDK for JavaScript.

```bash
node --version
```

## 3. Buat script executable

```bash
chmod +x scripts/backup-postgres.sh
```

## 4. Tes backup manual

Jalankan:

```bash
./scripts/backup-postgres.sh
```

Hasil backup akan masuk ke:

```bash
./backups/postgres
```

Contoh nama file:

```bash
sttpu-postgres_2026-04-22_08-30-00.dump
```

Jika upload aktif, file yang sama juga akan dikirim ke:

```bash
s3://BUCKET/postgres/sttpu-postgres_2026-04-22_08-30-00.dump
```

## 4b. Contoh konfigurasi S3

Untuk AWS S3:

```env
BACKUP_S3_ENABLED=true
BACKUP_S3_BUCKET=my-db-backup-bucket
BACKUP_S3_PREFIX=postgres/sttpu-production
BACKUP_S3_REGION=ap-southeast-1
BACKUP_S3_ACCESS_KEY_ID=AKIA...
BACKUP_S3_SECRET_ACCESS_KEY=...
BACKUP_S3_STORAGE_CLASS=STANDARD
```

Untuk Cloudflare R2:

```env
BACKUP_S3_ENABLED=true
BACKUP_S3_BUCKET=my-r2-backup-bucket
BACKUP_S3_PREFIX=postgres/sttpu-production
BACKUP_S3_REGION=auto
BACKUP_S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
BACKUP_S3_ACCESS_KEY_ID=...
BACKUP_S3_SECRET_ACCESS_KEY=...
BACKUP_S3_STORAGE_CLASS=STANDARD
```

Catatan:

- Untuk R2, `BACKUP_S3_ENDPOINT` wajib diisi.
- Script ini juga bisa memakai env `S3_*` yang sudah ada di project jika `BACKUP_S3_*` tidak diisi.
- Tidak perlu `aws cli`.

## 5. Setup otomatis dengan cron

Buka crontab:

```bash
crontab -e
```

Contoh backup setiap hari jam 01:00:

```cron
0 1 * * * cd /home/mchdfrhn/Project/sttpu/website-kampus && /usr/bin/env bash ./scripts/backup-postgres.sh >> /home/mchdfrhn/Project/sttpu/website-kampus/backups/postgres/backup.log 2>&1
```

Contoh backup setiap 6 jam:

```cron
0 */6 * * * cd /home/mchdfrhn/Project/sttpu/website-kampus && /usr/bin/env bash ./scripts/backup-postgres.sh >> /home/mchdfrhn/Project/sttpu/website-kampus/backups/postgres/backup.log 2>&1
```

## 5b. Setup otomatis dengan GitHub Actions

Workflow sudah disediakan di:

- [postgres-backup.yml](/home/mchdfrhn/Project/sttpu/website-kampus/.github/workflows/postgres-backup.yml)

Secara default workflow berjalan:

- otomatis setiap hari jam `18:00 UTC`
- bisa dijalankan manual dari tab `Actions` melalui `workflow_dispatch`

### Secret yang perlu dibuat di GitHub

Masuk ke:

- `GitHub Repository`
- `Settings`
- `Secrets and variables`
- `Actions`

Tambahkan secret berikut:

```text
BACKUP_DATABASE_URL
BACKUP_S3_BUCKET
BACKUP_S3_PREFIX
BACKUP_S3_REGION
BACKUP_S3_ENDPOINT
BACKUP_S3_ACCESS_KEY_ID
BACKUP_S3_SECRET_ACCESS_KEY
BACKUP_S3_STORAGE_CLASS
```

Contoh untuk Cloudflare R2:

```text
BACKUP_DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME
BACKUP_S3_BUCKET=nama-bucket-backup
BACKUP_S3_PREFIX=postgres/sttpu-production
BACKUP_S3_REGION=us-east-1
BACKUP_S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
BACKUP_S3_ACCESS_KEY_ID=xxxx
BACKUP_S3_SECRET_ACCESS_KEY=xxxx
BACKUP_S3_STORAGE_CLASS=STANDARD
```

Catatan:

- Jika provider Anda meminta region `us-east-1`, gunakan itu walaupun endpoint bukan AWS.
- Untuk R2, `BACKUP_S3_ENDPOINT` wajib.
- Workflow ini menginstall `postgresql-client`, lalu menjalankan script backup yang sama seperti lokal.

## 6. Cara restore

Jika format `custom`:

```bash
pg_restore \
  --clean \
  --if-exists \
  --no-owner \
  --no-privileges \
  --dbname="postgresql://USER:PASSWORD@HOST:PORT/DBNAME" \
  ./backups/postgres/sttpu-postgres_YYYY-MM-DD_HH-MM-SS.dump
```

Jika format `plain`:

```bash
gunzip -c ./backups/postgres/sttpu-postgres_YYYY-MM-DD_HH-MM-SS.sql.gz | psql "postgresql://USER:PASSWORD@HOST:PORT/DBNAME"
```

## 7. Rekomendasi untuk Zeabur

Jika database PostgreSQL Anda ada di Zeabur:

- jalankan script ini dari server lain, VPS, atau runner terjadwal
- jangan hanya mengandalkan file backup lokal di container app
- aktifkan `BACKUP_S3_ENABLED=true` agar hasil backup langsung tersalin ke S3/R2

## 8. Rekomendasi operasional

- pakai `BACKUP_FORMAT=custom`
- jadwalkan backup saat trafik rendah
- simpan minimal 1 salinan di luar server utama
- atur lifecycle policy di bucket untuk menghapus backup lama otomatis
- uji restore minimal 1 kali
- monitor file `backup.log` secara berkala
