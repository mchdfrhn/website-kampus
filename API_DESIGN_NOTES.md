# Catatan Desain API — Website STTPU

**Versi**: 1.0  
**Tanggal**: 18 April 2026  
**Dibuat oleh**: Tim IT STTPU  
**Dokumen terkait**: `PRD.md`, `API_CONTRACT.yaml`

---

## Daftar Isi

1. [Ikhtisar Arsitektur API](#1-ikhtisar-arsitektur-api)
2. [Filosofi Desain](#2-filosofi-desain)
3. [Konvensi Umum](#3-konvensi-umum)
4. [Autentikasi dan Otorisasi](#4-autentikasi-dan-otorisasi)
5. [Struktur Modul API](#5-struktur-modul-api)
6. [Penanganan Error](#6-penanganan-error)
7. [Keamanan dan Rate Limiting](#7-keamanan-dan-rate-limiting)
8. [Performa dan Caching](#8-performa-dan-caching)
9. [Integrasi Pihak Ketiga](#9-integrasi-pihak-ketiga)
10. [Panduan Implementasi untuk Developer Frontend](#10-panduan-implementasi-untuk-developer-frontend)
11. [Roadmap API](#11-roadmap-api)

---

## 1. Ikhtisar Arsitektur API

Website STTPU menggunakan pendekatan **API-first** dengan arsitektur client-server yang terpisah. Frontend (website publik) berkomunikasi dengan backend melalui REST API yang didokumentasikan dalam file `API_CONTRACT.yaml`.

### Topologi Sistem

```
Pengunjung / Pengguna
        |
        v
  [Frontend Website]  ─── CDN (Cloudflare) untuk aset statis
        |
        | HTTPS REST API
        v
  [API Gateway / Backend]
        |
   ┌────┴─────────────────────────┐
   |                              |
[Database Utama]         [Layanan Eksternal]
(MySQL/PostgreSQL)        - Email (Mailgun/Brevo)
                          - SIAKAD (redirect/SSO)
                          - YouTube API
                          - Google Maps Embed
                          - SINTA API (opsional, Phase 2)
```

### Base URL

| Environment | URL |
|-------------|-----|
| Production  | `https://api.sttpu.ac.id/v1` |
| Staging     | `https://api-staging.sttpu.ac.id/v1` |
| Development | `http://localhost:3000/v1` |

Semua endpoint menggunakan prefix `/v1` untuk memudahkan versioning di masa depan.

---

## 2. Filosofi Desain

### 2.1 Prinsip Utama

**Konsisten di atas segalanya.** Setiap endpoint mengikuti konvensi yang sama sehingga developer frontend tidak perlu menebak-nebak format response. Kalau satu endpoint mengembalikan `data` + `meta` untuk pagination, semua endpoint list melakukannya juga.

**Ramah untuk non-developer.** Tim staf STTPU yang mengelola konten via CMS tidak akan melihat API secara langsung, tetapi desain API yang bersih akan mempercepat development dan debugging.

**Gagal dengan anggun.** Setiap error selalu mengembalikan pesan yang informatif dalam Bahasa Indonesia (untuk pesan yang mungkin diteruskan ke pengguna) dan kode error yang konsisten (untuk keperluan logging).

**Privasi sebagai default.** Endpoint yang mengembalikan data pribadi (NIK, nomor HP pendaftar PMB, data mahasiswa) hanya bisa diakses oleh role yang berwenang. Data ini tidak pernah masuk ke endpoint publik.

### 2.2 Apa yang Disengaja Tidak Ada di API

- **Tidak ada endpoint delete untuk PMB**: Data pendaftaran bersifat permanen. Pembatalan dilakukan dengan mengubah status menjadi `tidak_lolos`, bukan menghapus record.
- **Tidak ada self-edit untuk profil dosen**: Berdasarkan PRD, dosen mengajukan request perubahan melalui form, bukan edit langsung. Ini menjaga akurasi data yang ditampilkan publik.
- **Tidak ada endpoint pembayaran langsung**: Pembayaran UKT diarahkan ke portal perbankan atau Midtrans yang sudah ada. Website hanya menampilkan informasi biaya, bukan memproses transaksi.

---

## 3. Konvensi Umum

### 3.1 Format Respons

Semua respons menggunakan format JSON dengan Content-Type `application/json`.

**Respons sukses untuk resource tunggal** mengembalikan objek langsung:

```json
{
  "id": "teknik-informatika",
  "nama": "Teknik Informatika",
  "jenjang": "S1",
  ...
}
```

**Respons sukses untuk list dengan pagination** menggunakan wrapper `data` + `meta`:

```json
{
  "data": [...],
  "meta": {
    "total": 127,
    "per_page": 12,
    "current_page": 1,
    "last_page": 11,
    "from": 1,
    "to": 12
  }
}
```

**Respons sukses tanpa data** (misalnya setelah submit form kontak):

```json
{
  "success": true,
  "message": "Pesan Anda telah berhasil dikirim. Kami akan merespons dalam 1x24 jam kerja."
}
```

### 3.2 Konvensi Penamaan

| Elemen | Konvensi | Contoh |
|--------|----------|--------|
| Field JSON | snake_case | `nomor_pendaftaran`, `tanggal_lahir` |
| URL path | kebab-case | `/program-studi`, `/mahasiswa-baru` |
| Query parameter | snake_case | `?per_page=12&from_date=2026-01-01` |
| Nilai enum | snake_case lowercase | `lolos_seleksi`, `pending_review` |

### 3.3 Format Tanggal dan Waktu

Semua field tanggal dan waktu menggunakan format ISO 8601:

- Tanggal saja: `"2026-08-15"` (format `YYYY-MM-DD`)
- Tanggal + waktu: `"2026-08-15T09:00:00+07:00"` (timezone Asia/Jakarta, WIB)
- Semua waktu disimpan dan dikembalikan dalam timezone WIB (UTC+7)

### 3.4 Nilai Kosong dan Opsional

- Field yang tidak memiliki nilai dikembalikan sebagai `null`, bukan string kosong `""` atau dihilangkan dari respons.
- Ini penting untuk frontend agar bisa membedakan "belum diisi" dengan "tidak ada".

Contoh:
```json
{
  "deadline_pendaftaran": null,
  "catatan_verifikator": null
}
```

### 3.5 Pagination

Default `per_page` adalah 12 (sesuai tampilan grid 3x4 di wireframe berita dan galeri). Maksimum adalah 100. Selalu gunakan parameter `page` dan `per_page` secara eksplisit di frontend untuk menghindari perubahan perilaku default.

---

## 4. Autentikasi dan Otorisasi

### 4.1 Dua Lapisan Akses

API STTPU memiliki dua kelompok besar endpoint:

**Endpoint Publik** — tidak memerlukan autentikasi. Ini adalah mayoritas endpoint yang melayani pengunjung website. Ditandai dengan tag `public` di OpenAPI spec.

**Endpoint Privat** — memerlukan JWT Bearer Token. Terbagi menjadi:
- **Portal** (`mahasiswa`, `dosen`, `staf`): Quick links personal, pengumuman khusus portal
- **CMS Admin** (`admin`, `editor`): Manajemen konten, verifikasi PMB, upload media

### 4.2 Alur Autentikasi

```
1. Client mengirim POST /auth/login
   Body: { username, password, role }

2. Server memvalidasi kredensial terhadap database
   (atau SSO SIAKAD jika sudah terintegrasi)

3. Server mengembalikan:
   { access_token, token_type: "bearer", expires_in: 28800 }

4. Client menyimpan token di memory (bukan localStorage untuk keamanan)

5. Setiap request ke endpoint privat menyertakan header:
   Authorization: Bearer <access_token>

6. Token expired setelah 8 jam. Gunakan POST /auth/refresh sebelum expired.
```

### 4.3 Catatan Keamanan Login

- Maksimum 5 kali percobaan login gagal dalam 15 menit sebelum IP di-rate-limit.
- Password harus di-hash menggunakan bcrypt (cost factor minimal 12) di database.
- Token login tidak boleh disimpan di `localStorage` karena rentan XSS. Gunakan variabel in-memory atau `sessionStorage` dengan pertimbangan matang.

### 4.4 Role dan Permissions

| Role | Akses |
|------|-------|
| `guest` (tidak login) | Semua endpoint publik |
| `mahasiswa` | Publik + quick links mahasiswa + pengumuman portal |
| `dosen` | Publik + quick links dosen/staf + pengumuman portal |
| `staf` | Sama dengan dosen |
| `editor` | Semua diatas + buat/edit artikel berita (tidak bisa publish, hanya `pending_review`) |
| `admin` | Akses penuh termasuk publish artikel, verifikasi PMB, update statistik |

---

## 5. Struktur Modul API

API dibagi ke dalam 10 modul berdasarkan domain fungsional website. Berikut penjelasan keputusan desain per modul.

### 5.1 Modul `institution`

**Endpoint**: `/institution/stats`, `/institution/leaders`, `/institution/accreditations`, `/institution/facilities`, `/institution/partners`

**Keputusan desain**:
- Statistik institusi dipisah menjadi endpoint tersendiri (`/institution/stats`) karena homepage membutuhkan data ini secara terpisah dari konten lain, dan data ini di-cache agresif (TTL 1 jam).
- Akreditasi disajikan sebagai array flat (satu item per program studi) bukan nested di dalam data prodi, karena dibutuhkan di dua halaman berbeda: homepage (badge akreditasi) dan halaman profil kampus (tabel lengkap).

### 5.2 Modul `academic`

**Endpoint**: `/academic/programs`, `/academic/programs/{slug}`, `/academic/lecturers`, `/academic/lecturers/{slug}`, `/academic/calendar`, `/academic/scholarships`

**Keputusan desain**:
- Daftar program studi (`/academic/programs`) hanya mengembalikan summary. Detail kurikulum per semester ada di endpoint terpisah (`/academic/programs/{slug}`) karena data kurikulum bisa sangat besar dan tidak semua halaman membutuhkannya.
- Dosen memiliki endpoint direktori tersendiri (`/academic/lecturers`) yang mendukung filter berdasarkan program studi, karena halaman program studi menampilkan daftar dosen pengampu.
- Kalender akademik menggunakan query parameter `semester` untuk mendukung tampilan semester lampau maupun mendatang, dengan default ke semester yang sedang aktif.

### 5.3 Modul `news`

**Endpoint**: `/news`, `/news/{slug}`, `/news/categories`, `/news/tags`, `/news/subscribe`, `/news/unsubscribe`

**Keputusan desain**:
- Endpoint `/news` mendukung filter `pinned_first=true` secara default, sehingga admin bisa menyematkan pengumuman penting di atas tanpa perlu mengubah urutan artikel lainnya.
- `reading_time_minutes` dihitung server-side saat artikel disimpan, bukan client-side, untuk konsistensi.
- Newsletter menggunakan double opt-in: email konfirmasi dikirim dulu, berlangganan baru aktif setelah link dikonfirmasi. Ini penting untuk kepatuhan terhadap praktik email marketing yang baik dan UU PDP Indonesia.

### 5.4 Modul `research`

**Endpoint**: `/research/publications`, `/research/units`, `/research/grants`

**Keputusan desain**:
- Database publikasi mendukung filter `indeks` (Scopus, SINTA 1-6) karena akreditasi BAN-PT mempertimbangkan indeks publikasi.
- Endpoint `/research/publications` tidak mengintegrasikan SINTA API secara langsung di Phase 1. Data diinput manual. Sinkronisasi SINTA dijadwalkan di Phase 2 sebagai enhancement (`/cms/sync/sinta`).

### 5.5 Modul `student-affairs`

**Endpoint**: `/student-affairs/ukm`, `/student-affairs/achievements`, `/student-affairs/services`

**Keputusan desain**:
- Prestasi menggunakan field `jenis` (mahasiswa/dosen/institusi) dan `tingkat` (kampus/regional/nasional/internasional) untuk memungkinkan filter yang berguna di halaman kemahasiswaan.
- Layanan kemahasiswaan (`/student-affairs/services`) adalah endpoint sederhana yang mengembalikan daftar layanan dengan kontak dan jam operasional, tanpa pagination karena jumlah layanan tidak akan banyak.

### 5.6 Modul `portal`

**Endpoint**: `/auth/login`, `/auth/logout`, `/auth/refresh`, `/portal/quicklinks`, `/portal/announcements`

**Keputusan desain**:
- Website STTPU berfungsi sebagai gateway ke SIAKAD, bukan sistem akademik itu sendiri (sesuai PRD). Endpoint login di sini melakukan autentikasi untuk mengakses fitur portal website (quick links, pengumuman), bukan masuk ke SIAKAD.
- Quick links dikembalikan server-side berdasarkan role pengguna, sehingga admin bisa mengubah URL tujuan dari CMS tanpa perlu deploy frontend ulang.

### 5.7 Modul `contact`

**Endpoint**: `/contact/submit`, `/contact/directory`

**Keputusan desain**:
- Field `unit_tujuan` divalidasi server-side. Email notifikasi diteruskan ke alamat email unit yang bersangkutan, bukan alamat umum. Ini memastikan pertanyaan PMB langsung ke tim PMB, pertanyaan akademik ke bagian akademik, dan seterusnya.
- `captcha_token` bersifat wajib di production untuk mencegah spam. Di environment development, token `"dev-bypass"` diterima tanpa validasi.

### 5.8 Modul `media`

**Endpoint**: `/media/albums`, `/media/albums/{id}`, `/media/videos`

**Keputusan desain**:
- Daftar album (`/media/albums`) mengembalikan summary tanpa array foto lengkap. Foto lengkap hanya dimuat saat membuka detail album (`/media/albums/{id}`). Ini penting untuk performa halaman galeri yang mungkin memiliki banyak album.
- Video tidak di-host di server. Endpoint hanya menyimpan `youtube_id` dan metadata. Frontend bertanggung jawab membuat URL embed dari YouTube ID tersebut. Ini menghindari penggunaan bandwidth server dan memanfaatkan CDN YouTube.

### 5.9 Modul `cms`

**Endpoint**: `/cms/news`, `/cms/news/{id}`, `/cms/institution/stats`, `/cms/media/upload`

**Keputusan desain**:
- Semua endpoint CMS memerlukan autentikasi dan role yang tepat. Ini adalah kelompok endpoint yang digunakan oleh admin dan editor melalui antarmuka CMS.
- Upload gambar CMS (`/cms/media/upload`) memiliki batas ukuran 5 MB, karena foto kegiatan kampus resolusi tinggi diperlukan untuk kualitas galeri.

---

## 6. Penanganan Error

### 7.1 HTTP Status Codes yang Digunakan

| Kode | Arti | Kapan Digunakan |
|------|------|-----------------|
| `200 OK` | Sukses | GET, PUT, PATCH yang berhasil |
| `201 Created` | Sukses membuat | POST yang berhasil membuat resource baru (pendaftaran PMB, artikel) |
| `400 Bad Request` | Input tidak valid | Validasi gagal, format salah |
| `401 Unauthorized` | Tidak terautentikasi | Token tidak ada atau tidak valid |
| `403 Forbidden` | Tidak berwenang | Token valid tapi role tidak memiliki izin |
| `404 Not Found` | Tidak ditemukan | Slug/ID resource tidak ada |
| `409 Conflict` | Konflik | NIK atau email sudah terdaftar |
| `413 Payload Too Large` | File terlalu besar | Upload melebihi batas ukuran |
| `422 Unprocessable Entity` | Logika bisnis gagal | PMB tidak aktif, aksi tidak diizinkan dalam kondisi saat ini |
| `429 Too Many Requests` | Rate limit | Terlalu banyak request dalam waktu singkat |
| `500 Internal Server Error` | Error server | Bug tidak terduga, harus dilaporkan ke tim IT |

### 7.2 Format Error

Setiap error selalu mengembalikan objek dengan struktur yang sama:

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Data yang dikirim tidak valid. Periksa field-field berikut.",
  "errors": {
    "email": ["Format email tidak valid."],
    "nik": ["NIK harus terdiri dari 16 digit angka."]
  }
}
```

Field `errors` hanya ada untuk error validasi (kode 400). Untuk error lain, `errors` tidak disertakan.

### 7.3 Kode Error Internal

| Kode | Deskripsi |
|------|-----------|
| `VALIDATION_ERROR` | Field tidak memenuhi aturan validasi |
| `NOT_FOUND` | Resource tidak ditemukan |
| `UNAUTHORIZED` | Token tidak valid atau tidak diberikan |
| `FORBIDDEN` | Role tidak memiliki izin untuk aksi ini |
| `INVALID_CREDENTIALS` | Username atau password login salah |
| `RATE_LIMIT_EXCEEDED` | Terlalu banyak request |
| `FILE_TOO_LARGE` | Ukuran file melebihi batas (upload media CMS) |
| `INVALID_FILE_TYPE` | Tipe file tidak diizinkan |
| `INTERNAL_ERROR` | Error tidak terduga di sisi server |

---

## 7. Keamanan dan Rate Limiting

### 7.1 Rate Limiting per Endpoint

| Endpoint | Batas | Jendela |
|----------|-------|---------|
| `POST /auth/login` | 5 request | per 15 menit per IP |
| `POST /contact/submit` | 5 request | per 10 menit per IP |
| `POST /news/subscribe` | 3 request | per jam per IP |
| Semua endpoint publik lainnya | 200 request | per menit per IP |
| Semua endpoint CMS | 500 request | per menit per token |

Respons rate limit menyertakan header:
```
X-RateLimit-Limit: 3
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1745234567
Retry-After: 600
```

### 7.2 HTTPS dan Header Keamanan

Semua endpoint hanya dapat diakses melalui HTTPS. Respons API menyertakan header keamanan:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'
```

### 7.3 CORS

API mengizinkan CORS hanya dari origin yang terdaftar:

- `https://sttpu.ac.id`
- `https://www.sttpu.ac.id`
- `https://staging.sttpu.ac.id`
- `http://localhost:3000` (development)

Request dari origin lain akan ditolak dengan status 403.

---

## 8. Performa dan Caching

### 8.1 Strategi Caching

Sesuai target Core Web Vitals di PRD (LCP < 2.5 detik), data yang jarang berubah di-cache agresif di level CDN (Cloudflare).

| Endpoint | Cache TTL | Catatan |
|----------|-----------|---------|
| `GET /institution/stats` | 1 jam | Invalidasi manual saat admin update |
| `GET /institution/accreditations` | 24 jam | Jarang berubah |
| `GET /academic/programs` | 6 jam | |
| `GET /academic/programs/{slug}` | 6 jam | |
| `GET /academic/calendar` | 1 jam | |
| `GET /news` | 5 menit | Update sering |
| `GET /news/{slug}` | 15 menit | |
| `GET /research/publications` | 1 jam | |
| Semua endpoint POST | Tidak di-cache | |
| Semua endpoint CMS | Tidak di-cache | |

Setiap response yang di-cache menyertakan header:
```
Cache-Control: public, max-age=3600
ETag: "abc123def456"
```

### 8.2 Pagination vs Infinite Scroll

Wireframe berita menggunakan pagination konvensional (nomor halaman). API mendukung keduanya:

- **Pagination tradisional**: Gunakan parameter `page` dan `per_page`.
- **Infinite scroll / cursor-based**: Parameter `cursor` dapat ditambahkan di Phase 2 jika diperlukan. Untuk Phase 1, pagination berbasis nomor halaman sudah cukup.

---

## 9. Integrasi Pihak Ketiga

### 9.1 Email Transaksional (Mailgun / Brevo)

Email dikirim untuk kejadian berikut:

| Kejadian | Penerima | Template |
|----------|----------|----------|
| Submit form kontak | Pengirim + unit tujuan | `contact_confirmation` |
| Konfirmasi subscribe newsletter | Subscriber | `newsletter_confirm` |

Semua email menggunakan alamat pengirim `noreply@sttpu.ac.id` dengan reply-to sesuai unit.

### 9.2 Google Maps

Halaman Kontak menggunakan Google Maps Embed API. Ini tidak memerlukan backend API — embed dilakukan langsung di HTML frontend. Tidak ada endpoint di backend untuk ini.

### 9.3 YouTube

Galeri video menyimpan `youtube_id` di database. Frontend membangun URL embed:
```
https://www.youtube.com/embed/{youtube_id}
```
Tidak ada integrasi YouTube Data API di Phase 1. Data video diinput manual melalui CMS.

### 9.4 SINTA API (Phase 2)

Sinkronisasi data publikasi dosen dari SINTA direncanakan di Phase 2. Endpoint yang disiapkan:

```
POST /cms/sync/sinta/{dosen_id}
```

Endpoint ini akan memanggil SINTA API, membandingkan data, dan memperbarui database publikasi. Tidak diimplementasikan di Phase 1 karena:
- Ketersediaan SINTA API tidak dijamin stabil.
- Input manual sudah cukup untuk Phase 1.

### 9.5 SIAKAD

Website tidak terintegrasi langsung dengan database SIAKAD. Endpoint `POST /auth/login` mengautentikasi pengguna terhadap database website sendiri. Akses ke SIAKAD dilakukan via redirect link, bukan SSO di Phase 1. SSO penuh (misal via OAuth 2.0 atau SAML) dipertimbangkan di Phase 2 jika SIAKAD mendukungnya.

---

## 10. Panduan Implementasi untuk Developer Frontend

### 10.1 Refresh Token Sebelum Kadaluarsa

Token berlaku 8 jam. Untuk pengguna yang aktif di portal, perbarui token secara proaktif:

```javascript
// Panggil 15 menit sebelum expires_in tercapai
async function refreshIfNeeded(expiresAt) {
  const fifteenMinutes = 15 * 60 * 1000;
  if (Date.now() > expiresAt - fifteenMinutes) {
    const response = await fetch('/v1/auth/refresh', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${currentToken}` }
    });
    const data = await response.json();
    updateToken(data.access_token);
  }
}
```

---

## 11. Roadmap API

### Phase 1 (Saat Launch) — Endpoint Wajib

Semua endpoint yang ditandai tag `public` di `API_CONTRACT.yaml` harus siap saat go-live, beserta:
- `POST /auth/login`, `/auth/logout`
- `POST /contact/submit`
- Endpoint CMS minimal: artikel, stats institusi, upload media

### Phase 2 (Bulan 2-4) — Enhancement

- `GET /portal/quicklinks` dan `GET /portal/announcements` dengan autentikasi
- `POST /news/subscribe` dan `/news/unsubscribe`
- `GET /research/publications` dengan filter lengkap
- `POST /cms/sync/sinta/{dosen_id}` — sinkronisasi publikasi dari SINTA
- Cursor-based pagination untuk infinite scroll berita

### Phase 3 (Bulan 6-12) — Inovasi

- `POST /chatbot/query` — jika chatbot FAQ diimplementasikan
- `GET /portal/dashboard` — summary data akademik mahasiswa (memerlukan integrasi penuh SIAKAD)
- `POST /ukm/submissions` — mahasiswa submit kegiatan UKM untuk ditampilkan di website
- Bilingual support: parameter `?lang=en` untuk respons dalam Bahasa Inggris
- API versioning ke `/v2` jika ada perubahan breaking pada schema

---

*Dokumen ini adalah living document yang harus diperbarui setiap kali ada perubahan pada `API_CONTRACT.yaml`. Setiap breaking change pada API harus didiskusikan dengan tim frontend sebelum diimplementasikan.*

*Versi 1.0 — 18 April 2026*
