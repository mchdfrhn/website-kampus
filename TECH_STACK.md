# Tech Stack — Website Resmi STTPU

**Status**: Final Draft  
**Terakhir Diperbarui**: 19 April 2026  
**Versi**: 2.0

---

## Rekomendasi Final: Payload CMS 3.x + Next.js 15

### Mengapa Pilihan Ini

Tiga constraint dominan yang menentukan pilihan:

**1. TypeScript-native dari akar** — Payload CMS 3.x ditulis penuh dalam TypeScript. Collections, fields, access control, dan hooks semuanya tertype. Ini eliminasi sumber bug terbesar pada proyek headless CMS: inkonsistensi shape data antara CMS dan frontend.

**2. Satu runtime, satu proses** — Payload 3.x berjalan di dalam Next.js App Router itu sendiri. Admin panel Payload tersedia di `/admin`, REST API di `/api`, dan halaman publik di route lainnya — semuanya satu deployment, satu `package.json`, satu proses Node.js. Tidak ada orchestrasi dua server (WordPress + Nuxt) yang perlu dikelola.

**3. Database sudah PostgreSQL** — Schema yang dirancang sudah menggunakan PostgreSQL. Payload 3.x mendukung PostgreSQL secara native via Drizzle ORM, sehingga tidak ada migrasi database yang dibutuhkan.

**Mengapa bukan WordPress Headless?** Pendekatan WordPress + Nuxt memerlukan pengelolaan dua runtime terpisah, plugin PHP untuk fungsionalitas yang di Payload sudah built-in (custom fields, media, auth), dan inkonsistensi tipe data antara WP REST API dan frontend TypeScript.

---

## Tabel Tech Stack Lengkap

### Layer Frontend & Presentasi

| Layer | Teknologi | Versi | Alasan Pilihan | Alternatif |
|-------|-----------|-------|----------------|------------|
| Frontend Framework | Next.js (App Router) | 15.x | RSC + SSR + SSG hybrid, SEO-ready, ekosistem React terbesar | Nuxt.js 3, Astro 5 |
| CSS Framework | Tailwind CSS | 4.x | Utility-first, CSS produksi kecil setelah purge | UnoCSS |
| UI Components | shadcn/ui | Latest | Komponen headless berbasis Radix UI, aksesibel (ARIA, keyboard nav), copy-paste ke codebase | Radix UI langsung, Mantine |
| Bahasa | TypeScript | 5.x | Type safety end-to-end dari Payload schema ke React component | JavaScript |
| State Management | Zustand | 5.x | Ringan, TypeScript-first, tanpa boilerplate | Jotai |
| Ikon | Lucide React | Latest | Tree-shakeable, konsisten dengan shadcn/ui | Phosphor Icons |
| Font | Plus Jakarta Sans | - | Mendukung karakter Latin Indonesia, modern, readable di layar kecil | Inter, Noto Sans |
| Optimasi Gambar | Next.js Image (`next/image`) | Built-in | Otomatis WebP conversion, lazy loading, srcset responsif | Sharp manual |
| Internasionalisasi | next-intl | 3.x | Bilingual ID/EN, RSC-compatible, URL-based locale routing, SEO hreflang otomatis | `next-i18next` |
| Form Handling | React Hook Form + Zod | Latest | Validasi schema-first, TypeScript, performa uncontrolled inputs | Conform |
| Rich Text Render | `@payloadcms/richtext-lexical` | Built-in | Render Lexical blocks dari Payload ke React komponen | Custom serializer |

### Layer CMS & Backend

| Layer | Teknologi | Versi | Alasan Pilihan | Alternatif |
|-------|-----------|-------|----------------|------------|
| CMS | Payload CMS | 3.x | TypeScript-native, berjalan di dalam Next.js, tidak butuh plugin eksternal | Sanity.io, Strapi 5 |
| CMS Admin Panel | Payload Admin (built-in) | 3.x | Tersedia di `/admin`, UI modern, granular access control | — |
| REST API | Payload REST API (built-in) | 3.x | Auto-generated dari Collection schema, endpoint `/api/[collection]` | Payload GraphQL (opsional) |
| ORM | Drizzle ORM (via Payload) | Built-in | Dikelola Payload, tidak perlu konfigurasi manual | — |
| Media Storage | Payload Upload + Cloudflare R2 | Built-in + Plugin | Built-in upload handling, offload ke R2 via `@payloadcms/storage-s3` | Cloudinary |
| Email | Payload Email + Resend | Built-in + Adapter | `@payloadcms/email-resend` untuk form kontak dan notifikasi sistem | Brevo SMTP |
| Auth | Payload Auth (built-in) | 3.x | JWT-based, session management, role-based access control built-in | NextAuth.js |

### Layer Database & Storage

| Layer | Teknologi | Versi | Alasan Pilihan | Alternatif |
|-------|-----------|-------|----------------|------------|
| Database | PostgreSQL | 16.x | Native Payload 3.x support via Drizzle, sudah dirancang di schema | MySQL (tidak didukung Payload) |
| Database Adapter | `@payloadcms/db-postgres` | 3.x | Official Payload adapter untuk PostgreSQL | `@payloadcms/db-mongodb` |
| File Storage | Cloudflare R2 | - | Tidak ada biaya egress, S3-compatible, gratis 10GB pertama | AWS S3 |
| Storage Adapter | `@payloadcms/storage-s3` | 3.x | S3-compatible, works dengan R2 | — |

### Layer Infrastruktur & Hosting

| Layer | Teknologi | Spesifikasi | Alasan Pilihan | Alternatif |
|-------|-----------|-------------|----------------|------------|
| Hosting Production | VPS Dewaweb atau Niagahoster | 2 vCPU, 4GB RAM, 50GB SSD | Data center Jakarta, support bahasa Indonesia, SLA 99.9%, tagihan IDR | IDCloudHost, Vercel (USD) |
| Hosting Staging | VPS sama (Nginx virtual host terpisah) | 1 vCPU, 2GB RAM | Satu tagihan, satu manajemen | Server terpisah |
| Web Server | Nginx | 1.24.x stable | Reverse proxy ke Next.js, static file serving, SSL termination | Caddy |
| Runtime | Node.js | 22.x LTS | Untuk Next.js + Payload SSR | Node.js 20 LTS |
| SSL | Let's Encrypt via Certbot | - | Gratis, auto-renewal | Cloudflare SSL |
| CDN & DNS | Cloudflare Free Plan | - | Edge caching, DDoS protection, Jakarta PoP | BunnyCDN |
| Process Manager | PM2 | 5.x | Mengelola proses Node.js, auto-restart, log management, cluster mode | systemd |
| Uptime Monitoring | UptimeRobot | Free Plan | Alert email/Telegram saat downtime, cek tiap 5 menit | Freshping |

### Layer Analytics, Keamanan, Monitoring

| Layer | Teknologi | Alasan Pilihan | Alternatif |
|-------|-----------|----------------|------------|
| Web Analytics | Google Analytics 4 | Gratis, standar industri, tracking konversi | Umami self-hosted |
| Heatmap | Microsoft Clarity | Gratis tanpa batas session, session recording | Hotjar |
| Error Monitoring | Sentry Free Tier | Tangkap JS error production, source maps support Next.js | LogRocket |
| CAPTCHA | Cloudflare Turnstile | Tanpa friction untuk pengguna, gratis, integrasi Cloudflare | reCAPTCHA v3 |
| WAF | Cloudflare WAF (Free) | Rules DDoS dan bot protection di free tier | — |
| Rate Limiting | Next.js Middleware + Upstash Redis | Edge rate limiting sebelum request sampai server | express-rate-limit |

---

## Arsitektur Sistem

```
PENGGUNA AKHIR
[Browser Mobile/Desktop]  [Crawler Google]
           |
           | HTTPS
           v
+------------------------------------------+
|  CLOUDFLARE (Edge Layer)                 |
|  DNS | CDN Cache | WAF | DDoS | SSL       |
|  PoP: Jakarta                            |
+------------------------------------------+
           |
           | Cache MISS / Dynamic Request
           v
+------------------------------------------+
|  VPS DEWAWEB/NIAGAHOSTER JAKARTA         |
|                                          |
|  +----------------+                      |
|  |  Nginx         |                      |
|  |  (port 80/443) |                      |
|  |  SSL termination                      |
|  |  Reverse proxy |                      |
|  +-------+--------+                      |
|          |                               |
|          v                               |
|  +-----------------------------+         |
|  |  Next.js 15 + Payload 3.x  |         |
|  |  (single process, :3000)   |         |
|  |                             |         |
|  |  /           → RSC pages   |         |
|  |  /berita     → SSR/ISR     |         |
|  |  /akademik   → SSG         |         |
|  |  /admin      → Payload UI  |         |
|  |  /api/[*]    → Payload API |         |
|  +-------------+---------------+         |
|                |                         |
|       +--------v--------+                |
|       |  PostgreSQL 16  |                |
|       |  (localhost)    |                |
|       +-----------------+                |
+------------------------------------------+
      |              |              |
      v              v              v
+----------+  +----------+  +-----------+
|Cloudflare|  |  Resend  |  |  Google   |
|    R2    |  |  (Email) |  |  GA4 +    |
|(Storage) |  |Form kontak|  |  Search   |
|Gambar/PDF|  |& sistem  |  |  Console  |
+----------+  +----------+  +-----------+
```

---

## Struktur Monorepo

```
website-kampus/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (frontend)/         # Route group halaman publik
│   │   │   ├── page.tsx        # Halaman beranda
│   │   │   ├── berita/
│   │   │   ├── akademik/
│   │   │   └── ...
│   │   ├── (payload)/          # Route group Payload
│   │   │   └── admin/[[...segments]]/ # Payload Admin UI
│   │   └── api/
│   │       └── [...payload]/   # Payload REST API handler
│   ├── collections/            # Payload Collection definitions
│   │   ├── Berita.ts
│   │   ├── Dosen.ts
│   │   ├── ProgramStudi.ts
│   │   └── Media.ts
│   ├── globals/                # Payload Global definitions
│   │   ├── SiteSettings.ts
│   │   └── HeroSection.ts
│   ├── components/             # React shared components
│   └── lib/                    # Utilities, types
├── payload.config.ts           # Payload configuration
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Development Workflow

### Tiga Environment

| Environment | URL | Tujuan |
|-------------|-----|--------|
| Local | http://localhost:3000 | Development sehari-hari |
| Staging | https://staging.sttpu.ac.id | QA, UAT tim konten |
| Production | https://sttpu.ac.id | Pengguna akhir |

Admin panel CMS tersedia di `/admin` di setiap environment.

### Git Branching (GitHub Flow)

- `main` — production, protected, merge via PR
- `develop` — staging, target merge feature branch
- `feature/[nama]` — per fitur/halaman
- `fix/[nama]` — perbaikan bug
- `hotfix/[nama]` — darurat ke production langsung

### CI/CD via GitHub Actions

- Push ke `develop` → lint + typecheck + `payload generate:types` check + build test + deploy staging
- Merge PR ke `main` → build + SSH deploy ke production via PM2 reload

---

## Environment Variables

```bash
# Database
DATABASE_URI=postgresql://user:password@localhost:5432/sttpu_website

# Payload
PAYLOAD_SECRET=[random string panjang untuk JWT signing]

# Cloudflare R2 (S3-compatible)
S3_ACCESS_KEY_ID=[dari Cloudflare Dashboard]
S3_SECRET_ACCESS_KEY=[dari Cloudflare Dashboard]
S3_BUCKET=sttpu-media
S3_ENDPOINT=https://[account-id].r2.cloudflarestorage.com

# Email via Resend
RESEND_API_KEY=[dari Resend Dashboard]
EMAIL_FROM=no-reply@sttpu.ac.id

# Public env (exposed ke browser via NEXT_PUBLIC_)
NEXT_PUBLIC_SITE_URL=https://sttpu.ac.id
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY=[dari Cloudflare Dashboard]
CF_TURNSTILE_SECRET_KEY=[JANGAN expose ke client]
NEXT_PUBLIC_WHATSAPP_NUMBER=6281234567890
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY=[restrict ke domain sttpu.ac.id]

# Sentry
SENTRY_DSN=[dari Sentry project]
SENTRY_AUTH_TOKEN=[untuk source map upload]
```

---

## Estimasi Biaya Bulanan (IDR)

*Kurs USD diasumsikan Rp 16.000 — April 2026*

| Komponen | Layanan | Biaya/Bulan |
|----------|---------|-------------|
| VPS Production | Dewaweb 2vCPU/4GB/50GB | Rp 280.000 |
| VPS Staging | Dewaweb 1vCPU/2GB/20GB | Rp 140.000 |
| Domain .ac.id | sttpu.ac.id (Rp 210k/tahun) | Rp 17.500 |
| CDN & WAF | Cloudflare Free Plan | Rp 0 |
| Email Transaksional | Resend Free (3.000 email/bulan) | Rp 0 |
| File Storage | Cloudflare R2 (10GB gratis) | Rp 0 |
| Uptime Monitoring | UptimeRobot Free | Rp 0 |
| Error Monitoring | Sentry Free Tier | Rp 0 |
| Rate Limiting | Upstash Redis Free (10k req/hari) | Rp 0 |
| **Total Operasional/Bulan** | | **Rp 437.500** |

*Penghematan Rp 80.000/bulan vs stack sebelumnya (eliminasi ACF Pro).*

### CAPEX Development Tahun Pertama

| Item | Estimasi |
|------|----------|
| Development (6-8 minggu) | Rp 15.000.000 – Rp 40.000.000 |
| Sesi foto kampus profesional | Rp 3.000.000 – Rp 8.000.000 |
| Domain + proses PDDIKTI | Rp 500.000 – Rp 1.000.000 |
| **Total CAPEX Tahun Pertama** | **Rp 18.500.000 – Rp 49.000.000** |

---

## Trade-offs yang Disadari

| Trade-off | Yang Dikorbankan | Yang Diterima | Justifikasi |
|-----------|-----------------|---------------|-------------|
| Pool developer vs Teknologi Modern | Pool developer WordPress Indonesia lebih besar | TypeScript end-to-end, satu codebase, bug lebih sedikit | Payload 3.x + Next.js adalah kombinasi mainstream React ecosystem, developer tersedia |
| Kesederhanaan setup awal vs Long-term DX | Setup WordPress yang cepat via cPanel hosting | DX yang jauh lebih baik: type-safe CMS schema, no PHP context switching | Investasi setup terbayar di maintenance jangka panjang |
| Managed hosting vs VPS | Auto-scaling Vercel | Tagihan IDR tetap, data center Jakarta | Fluktuasi kurs dan latency ke edge Vercel di luar Asia tidak sebanding |
| Custom admin UI vs familiarity WordPress | Antarmuka WordPress yang sangat familiar | Payload Admin yang modern, bersih, dan dapat dikustomisasi | Learning curve 1-2 hari untuk editor konten, setelah itu lebih efisien |

---

*Versi 2.0 — 19 April 2026*
