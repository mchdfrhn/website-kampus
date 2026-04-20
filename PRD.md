# PRD: Website Resmi STTPU (Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta)

**Status**: Draft  
**Penulis**: Product Manager  
**Terakhir Diperbarui**: 18 April 2026  
**Versi**: 1.0  
**Stakeholder**: Pimpinan STTPU, Tim IT, Bagian Akademik, Bagian Kemahasiswaan, Bagian Humas & Marketing, Bagian Keuangan

---

## Daftar Isi

1. [Executive Summary](#1-executive-summary)
2. [Latar Belakang & Konteks](#2-latar-belakang--konteks)
3. [Target Pengguna & Persona](#3-target-pengguna--persona)
4. [Masalah Pengguna & Jobs to Be Done](#4-masalah-pengguna--jobs-to-be-done)
5. [Goals & Success Metrics](#5-goals--success-metrics)
6. [Scope](#6-scope)
7. [Feature Requirements](#7-feature-requirements)
8. [Information Architecture](#8-information-architecture)
9. [Prinsip Desain](#9-prinsip-desain)
10. [Technical Requirements](#10-technical-requirements)
11. [Strategi Konten](#11-strategi-konten)
12. [Fase & Roadmap](#12-fase--roadmap)
13. [Risiko & Mitigasi](#13-risiko--mitigasi)
14. [Open Questions](#14-open-questions)

---

## 1. Executive Summary

Website resmi STTPU (Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta) adalah pintu gerbang digital utama institusi kepada seluruh pemangku kepentingan — calon mahasiswa, mahasiswa aktif, dosen, orang tua, mitra industri, dan masyarakat luas. Proyek ini bertujuan membangun sebuah platform web yang tidak sekadar menjadi brosur digital, melainkan infrastruktur informasi hidup yang mendukung seluruh siklus hidup mahasiswa: dari penemuan institusi, pendaftaran, proses belajar, hingga kelulusan dan keterlibatan alumni.

Berdasarkan analisis komparatif terhadap website universitas-universitas terkemuka Indonesia (ITB, UGM, ITS, UNAIR), ditemukan bahwa institusi-institusi tersebut unggul dalam menampilkan prestasi dan peringkat, namun lemah dalam hal: narasi pengalaman mahasiswa, transparansi biaya, navigasi yang benar-benar intuitif bagi calon mahasiswa, dan konten yang mobile-first. Website STTPU dirancang untuk melampaui benchmark tersebut dengan pendekatan yang lebih berpusat pada pengguna.

**Tujuan bisnis utama:**
- Meningkatkan volume dan kualitas pendaftar mahasiswa baru melalui jalur digital
- Membangun kredibilitas dan kepercayaan publik terhadap STTPU sebagai institusi teknologi unggulan
- Mengurangi beban pertanyaan berulang ke staf dengan menyediakan informasi self-service yang komprehensif
- Memperkuat ekosistem akademik: dosen, peneliti, dan mahasiswa memiliki ruang digital yang mendukung aktivitas mereka

---

## 2. Latar Belakang & Konteks

### 2.1 Mengapa Website Ini Dibutuhkan Sekarang

Perguruan tinggi di Indonesia beroperasi di pasar yang semakin kompetitif. Calon mahasiswa generasi Z membuat keputusan berdasarkan pencarian online, media sosial, dan reputasi digital jauh sebelum mengunjungi kampus secara fisik. Sebuah website yang lemah bukan hanya kerugian marketing — ia secara aktif mengalihkan kandidat terbaik ke institusi lain.

Kondisi saat ini:
- Informasi STTPU tersebar di berbagai kanal yang tidak terkoordinasi (media sosial, brosur fisik, komunikasi informal)
- Tidak ada satu sumber kebenaran (single source of truth) untuk informasi akademik, jadwal, dan pengumuman resmi
- Calon mahasiswa dan orang tua kesulitan menemukan informasi program studi, biaya, dan jalur pendaftaran secara mandiri
- Dosen dan mahasiswa tidak memiliki portal terpadu untuk mendukung aktivitas akademik dan administratif

### 2.2 Lanskap Kompetitif — Temuan Riset

Analisis langsung terhadap website empat universitas terkemuka Indonesia menghasilkan temuan berikut:

#### Institut Teknologi Bandung (ITB)
- **Kelebihan**: Navigasi hierarki yang jelas, highlight prestasi dan peringkat QS, informasi multi-kampus terstruktur, transparansi kelembagaan (laporan keuangan, zona integritas)
- **Kekurangan**: Minimnya testimonial mahasiswa, tidak ada live support/chat, visibilitas database publikasi riset rendah, informasi layanan karir tidak menonjol
- **Pola yang diadopsi**: Struktur navigasi dual-bahasa, banner layanan quick-access, section berita berbasis kategori

#### Universitas Gadjah Mada (UGM)
- **Kelebihan**: Integrasi SDGs dengan dashboard khusus, fitur aksesibilitas (contrast toggle, font-size control), majalah digital "Kabar UGM", layanan krisis dan hotline, integrasi AI untuk literasi
- **Kekurangan**: Kehidupan mahasiswa kurang terwakili, direktori keahlian dosen tidak menonjol, jalur mahasiswa internasional tidak jelas
- **Pola yang diadopsi**: Toolbar aksesibilitas, portal multi-layanan, integrasi SDG, sistem pengaduan publik

#### Institut Teknologi Sepuluh Nopember (ITS)
- **Kelebihan**: Dashboard statistik riset (1.121 peneliti, 265 unit riset, 20.134 output riset), visualisasi 17 SDG, multi-ranking display (QS, THE, UI GreenMetric), dokumentasi fasilitas kampus komprehensif
- **Kekurangan**: Profil dosen/peneliti minim, informasi biaya kuliah tidak transparan, layanan mahasiswa (konseling, aksesibilitas) tersembunyi
- **Pola yang diadopsi**: Statistics dashboard, multi-ranking display, section campus life terstruktur

#### Universitas Airlangga (UNAIR)
- **Kelebihan**: Desain multi-audience (portal terpisah untuk mahasiswa, orang tua, alumni, staf), integrasi media sosial lengkap (WhatsApp, Instagram, TikTok), olimpiade sains berbranding kuat
- **Kekurangan**: Deskripsi program studi minim, visual storytelling sangat terbatas, navigasi menu kompleks dengan pengulangan, perbandingan antar kampus sulit
- **Pola yang diadopsi**: Segmentasi audience dengan portal terpisah, integrasi WhatsApp sebagai kanal dukungan, branding event akademik

#### Gap Umum di Semua Universitas yang Dianalisis
1. Tidak ada yang menampilkan kalkulator biaya atau transparansi biaya secara langsung
2. Testimonial mahasiswa dan kisah sukses alumni hampir tidak ada di homepage
3. Mobile experience tidak diprioritaskan — terasa seperti desktop yang dikecilkan
4. Informasi untuk orang tua jarang mendapat ruang khusus meskipun mereka merupakan decision-maker utama
5. Waktu loading umumnya lambat karena aset besar yang tidak dioptimasi

Website STTPU dirancang untuk mengisi gap-gap ini sambil mengadopsi pola terbaik dari setiap institusi.

---

## 3. Target Pengguna & Persona

### Persona 1: Calon Mahasiswa — "Reza" (Prioritas Utama)

**Profil**: Siswa SMA/SMK kelas 12, usia 17-18 tahun, tinggal di Jawa Timur. Aktif di Instagram dan TikTok. Mencari jurusan teknologi. Keputusan dipengaruhi oleh orang tua dan teman sebaya. Bandwidth internet menengah; sering akses via smartphone.

**Kebutuhan utama**: Menemukan program studi yang relevan dengan minatnya, memahami biaya dan beasiswa, mengetahui proses dan jadwal pendaftaran, mendapatkan gambaran kehidupan kampus.

**Frustrasi umum**: Informasi tersebar, harus menghubungi admin untuk hal-hal yang seharusnya ada di website, website lambat di HP, tidak bisa membandingkan program studi dengan mudah.

---

### Persona 2: Orang Tua Calon Mahasiswa — "Bu Sari" (Prioritas Utama)

**Profil**: Ibu rumah tangga/pekerja, usia 40-50 tahun, tinggal di kota kecil atau kabupaten. Tidak selalu melek teknologi. Ingin memastikan anaknya mendaftar ke tempat yang tepat, aman, dan terjangkau. Menggunakan WhatsApp sebagai kanal komunikasi utama.

**Kebutuhan utama**: Transparansi biaya kuliah dan mekanisme cicilan/beasiswa, informasi akreditasi dan legalitas institusi, fasilitas dan keamanan kampus, kontak yang mudah dihubungi.

**Frustrasi umum**: Website terlalu teknis, tidak ada informasi biaya yang jelas, tidak tahu harus tanya ke mana.

---

### Persona 3: Mahasiswa Aktif — "Dinda" (Prioritas Tinggi)

**Profil**: Mahasiswi semester 3, jurusan Teknik Informatika. Aktif di organisasi kemahasiswaan. Membutuhkan akses cepat ke jadwal kuliah, nilai, pengumuman, dan informasi beasiswa. Mengakses website dari laptop maupun HP.

**Kebutuhan utama**: Portal akademik terintegrasi (jadwal, nilai, KRS), informasi kegiatan kemahasiswaan dan UKM, pengumuman resmi dari kampus, akses ke sumber belajar dan jurnal.

**Frustrasi umum**: Harus masuk ke banyak sistem berbeda, pengumuman penting terlambat diterima, informasi kegiatan tidak terpusat.

---

### Persona 4: Dosen & Tenaga Kependidikan — "Pak Andi" (Prioritas Menengah)

**Profil**: Dosen tetap, usia 35 tahun, sedang mengembangkan penelitian dan ingin meningkatkan visibilitas publikasi. Juga bertanggung jawab sebagai pembimbing akademik.

**Kebutuhan utama**: Profil akademik yang representatif dan mudah diperbarui, publikasi penelitian yang terindeks dan terpublikasi di website, informasi hibah dan kerjasama riset, pengumuman kelembagaan.

**Frustrasi umum**: Profil dosen di website tidak mencerminkan pencapaian aktual, publikasi tidak terekspos dengan baik, komunikasi internal masih via WhatsApp group yang tidak terstruktur.

---

### Persona 5: Masyarakat & Mitra Industri — "Pak Budi" (Prioritas Menengah)

**Profil**: Manajer HRD perusahaan teknologi di Surabaya, ingin menjalin kerja sama rekrutmen atau riset bersama STTPU. Juga termasuk jurnalis, peneliti eksternal, dan masyarakat umum yang mencari informasi publik.

**Kebutuhan utama**: Informasi kontak dan struktur organisasi yang jelas, rekam jejak riset dan publikasi institusi, prosedur kerjasama formal, berita dan prestasi terbaru.

**Frustrasi umum**: Tidak tahu harus menghubungi siapa untuk kerjasama, tidak menemukan profil riset institusi yang meyakinkan.

---

## 4. Masalah Pengguna & Jobs to Be Done

| Persona | Situasi | Job to Be Done | Hambatan Saat Ini |
|---------|---------|----------------|-------------------|
| Calon Mahasiswa | Memilih perguruan tinggi | Bandingkan program studi STTPU dengan pilihan lain dalam satu kunjungan | Tidak ada halaman perbandingan; info tersebar |
| Orang Tua | Menilai kelayakan institusi | Verifikasi akreditasi, legalitas, dan reputasi STTPU dalam 10 menit | Akreditasi dan izin operasional tidak mudah ditemukan |
| Orang Tua | Mempertimbangkan biaya | Pahami total biaya 4 tahun dan opsi beasiswa tanpa harus menelepon | Tidak ada halaman biaya yang transparan |
| Mahasiswa Aktif | Awal semester | Selesaikan KRS (Kartu Rencana Studi) tepat waktu | Portal akademik terpisah, link tidak mudah ditemukan |
| Mahasiswa Aktif | Mencari kegiatan | Temukan UKM atau event kampus yang relevan dengan minatnya | Informasi kemahasiswaan tidak terpusat |
| Dosen | Membangun reputasi akademik | Tampilkan profil dan publikasi saya kepada publik akademik | Profil dosen tidak ada atau tidak diperbarui |
| Mitra Industri | Mengeksplorasi kerjasama | Hubungi kontak yang tepat untuk diskusi MoU dalam satu langkah | Struktur organisasi tidak jelas, tidak ada form kerjasama |

---

## 5. Goals & Success Metrics

### OKR Utama

**Objective**: Menjadikan website STTPU sebagai referensi digital terpercaya yang secara aktif mendukung pertumbuhan mahasiswa baru dan reputasi institusi.

| Key Result | Baseline (Pre-launch) | Target (12 bulan post-launch) | Jendela Pengukuran |
|------------|----------------------|-------------------------------|-------------------|
| Bounce rate homepage | N/A | < 50% | Bulanan |
| Waktu rata-rata penyelesaian task "cari info program studi" (user test) | N/A | < 2 menit | Kuartalan |
| Skor Core Web Vitals (LCP, FID, CLS) | N/A | Semua "Good" (hijau) | Bulanan |
| Volume pertanyaan telepon/WA repetitif ke admin | Baseline diukur M-1 | Turun 40% dalam 6 bulan | Bulanan |
| Jumlah sesi unik per bulan | Baseline diukur | +150% dalam 12 bulan | Bulanan |
| Persentase akses mobile | Baseline diukur | Bounce rate mobile < 55% | Bulanan |
| Kepuasan pengguna website (survey) | N/A | Skor ≥ 4.0/5.0 | Per 6 bulan |

### KPI Konten

| KPI | Target |
|-----|--------|
| Frekuensi update berita | Minimal 2x per minggu |
| Akurasi informasi (0 kesalahan kritis di halaman utama) | 100% |
| Halaman dengan broken link | 0% |
| Artikel dengan SEO meta deskripsi lengkap | 100% |

---

## 6. Scope

### Dalam Scope (v1.0 — Phase 1 & 2)

- Website publik responsif dengan semua halaman utama (lihat Feature Requirements)
- Sistem manajemen konten (CMS) untuk tim non-teknis
- Integrasi WhatsApp Business untuk kanal dukungan
- Portal login mahasiswa dan dosen (wrapper/SSO ke sistem akademik yang sudah ada atau akan dibangun)
- Galeri foto dan video
- Halaman berita dan pengumuman dengan sistem kategori dan tag
- Halaman profil dosen dengan publikasi
- Optimasi SEO on-page
- Versi bilingual dasar (Bahasa Indonesia sebagai utama, Bahasa Inggris sebagai sekunder)
- Analytics (Google Analytics 4 + Search Console)

### Luar Scope (v1.0)

- Sistem Informasi Akademik (SIAKAD) penuh — website hanya menjadi portal/gateway ke sistem tersendiri
- Learning Management System (LMS) — integrasi link ke platform yang ada (Moodle, dll.)
- Forum diskusi atau komunitas online
- Sistem pembayaran UKT terintegrasi langsung di website (diarahkan ke portal perbankan/midtrans yang ada)
- Aplikasi mobile native (iOS/Android) — mobile web sudah cukup untuk Phase 1
- Sistem email institusi (@sttpu.ac.id) — ini infrastruktur terpisah
- Chatbot AI — pertimbangkan di Phase 3

### Asumsi

- STTPU sudah memiliki atau akan memiliki domain `.ac.id` yang aktif
- Tersedia minimal 1 orang staf yang bertanggung jawab atas update konten
- Sistem akademik (SIAKAD) yang sudah berjalan akan tetap digunakan; website ini adalah frontend gateway, bukan pengganti
- Anggaran hosting dan pemeliharaan tahunan sudah disetujui oleh pimpinan

---

## 7. Feature Requirements

Prioritas:
- **P0** = Wajib ada di launch (website tidak dapat go-live tanpanya)
- **P1** = Harus ada dalam 30 hari setelah launch
- **P2** = Penting, dijadwalkan untuk Phase 2 (bulan 2-4)
- **P3** = Nice-to-have, Phase 3 atau backlog

---

### 7.1 Halaman Beranda (Homepage)

**Tujuan**: Menjadi pintu masuk yang dalam 5 detik pertama menjawab: "Apa itu STTPU, apakah ini untuk saya, dan apa yang harus saya lakukan selanjutnya?"

| Fitur | Prioritas | Deskripsi | Acceptance Criteria |
|-------|-----------|-----------|-------------------|
| Hero Section dengan CTA utama | P0 | Visual kuat dengan headline nilai proposisi STTPU, CTA utama: "Pelajari Program Studi" + link ke website PMB | CTA menggunakan warna brand, hero load < 2 detik |
| Statistik institusi | P0 | Angka kunci: jumlah mahasiswa aktif, program studi, tahun berdiri, akreditasi | Data akurat, diperbarui manual tiap semester |
| Section Program Studi unggulan | P0 | Kartu program studi dengan nama, jenjang, deskripsi singkat, dan link ke halaman detail | Maksimal 6 kartu di homepage, ada link "Lihat semua program" |
| Berita & Pengumuman terbaru | P1 | Grid atau list 3-4 artikel terbaru dengan thumbnail, judul, dan tanggal | Auto-update saat artikel baru dipublikasikan di CMS |
| Section akreditasi & legalitas | P1 | Logo BAN-PT, nomor SK, peringkat akreditasi per program | Klik bisa membuka dokumen resmi (PDF) |
| Testimonial mahasiswa/alumni | P1 | 3-5 kutipan dengan foto, nama, jurusan, dan angkatan | Dirotasi secara carousel, dapat dikelola dari CMS |
| Quick links untuk tiap persona | P1 | Section "Saya adalah..." dengan link berbeda untuk calon mahasiswa, mahasiswa aktif, dosen, mitra | Maksimal 4 segmen, setiap segmen memiliki 3-5 link terpopuler |
| Footer komprehensif | P0 | Alamat, nomor telepon, email, media sosial, peta lokasi mini, link navigasi utama | Konsisten di semua halaman, link tidak broken |
| Floating WhatsApp button | P1 | Tombol WhatsApp mengambang di sudut bawah kanan | Terhubung ke nomor WhatsApp Business resmi, buka di tab baru |

---

### 7.2 Profil Kampus (Tentang STTPU)

**Tujuan**: Membangun kepercayaan dan legitimasi institusi kepada calon mahasiswa, orang tua, dan mitra.

| Fitur | Prioritas | Deskripsi | Acceptance Criteria |
|-------|-----------|-----------|-------------------|
| Sejarah & latar belakang | P0 | Narasi pendirian, tonggak penting, visi ke depan | Minimal 500 kata, dilengkapi timeline visual |
| Visi, Misi, dan Nilai | P0 | Pernyataan resmi visi, misi, tujuan, dan nilai-nilai institusi | Sesuai dokumen resmi yang telah disahkan pimpinan |
| Struktur organisasi | P1 | Bagan org dengan foto, nama, dan jabatan setiap pejabat | Dapat diperbarui dari CMS, foto wajib ada untuk semua pimpinan |
| Profil pimpinan (Ketua STTPU) | P0 | Foto, pesan sambutan, riwayat akademik singkat | Ditandatangani dan disetujui oleh pimpinan bersangkutan |
| Akreditasi & legalitas | P0 | Nomor SK Kemendikti, status akreditasi BAN-PT per prodi, sertifikat dapat diunduh | Dokumen PDF dapat diunduh, tanggal berlaku akreditasi terlihat |
| Kerjasama & MoU | P2 | Daftar mitra industri, institusi pendidikan, dan pemerintah yang sudah MoU | Logo mitra ditampilkan, tahun kerjasama dicantumkan |
| Penghargaan & prestasi institusi | P2 | Kumpulan penghargaan dengan foto, deskripsi, dan tahun | Diurutkan dari terbaru |
| Fasilitas kampus | P1 | Foto dan deskripsi fasilitas: lab, perpustakaan, aula, kantin, area olahraga | Galeri foto per fasilitas, dilengkapi keterangan kapasitas |

---

### 7.3 Program Studi / Akademik

**Tujuan**: Membantu calon mahasiswa dan mahasiswa aktif memahami penawaran akademik secara lengkap.

| Fitur | Prioritas | Deskripsi | Acceptance Criteria |
|-------|-----------|-----------|-------------------|
| Halaman indeks semua program studi | P0 | Daftar semua prodi dengan jenjang, akreditasi, dan link ke halaman detail | Filter berdasarkan jenjang (D3/D4/S1/S2) tersedia |
| Halaman detail per program studi | P0 | Visi-misi prodi, kurikulum (per semester), kompetensi lulusan, prospek karir, akreditasi | Setiap halaman prodi memiliki URL unik dan meta deskripsi SEO |
| Profil dosen per program studi | P1 | Daftar dosen pengampu dengan foto, gelar, keahlian, dan link ke profil lengkap | Minimal NIDN dan gelar akademik terakhir ditampilkan |
| Kalender akademik | P1 | Jadwal resmi semester aktif: perkuliahan, UTS, UAS, libur, wisuda | Dapat diunduh sebagai PDF, diperbarui tiap semester |
| Kurikulum yang dapat diunduh | P1 | PDF kurikulum resmi per program studi | Versi terbaru tersedia, tanggal revisi tercantum |
| Sistem kredit dan aturan akademik | P2 | Penjelasan SKS, IPK, syarat kelulusan, aturan cuti akademik | Merujuk ke peraturan akademik resmi yang dapat diunduh |
| Halaman beasiswa akademik | P1 | Daftar beasiswa tersedia (internal & eksternal), syarat, cara mendaftar, deadline | Diperbarui saat ada pembukaan beasiswa baru |

---

### 7.4 Berita & Pengumuman

**Tujuan**: Menjadi sumber informasi resmi dan aktual tentang kegiatan, prestasi, dan pengumuman STTPU.

| Fitur | Prioritas | Deskripsi | Acceptance Criteria |
|-------|-----------|-----------|-------------------|
| Halaman indeks berita | P0 | Daftar semua artikel dengan thumbnail, judul, kategori, dan tanggal | Paginasi atau infinite scroll; maks 12 artikel per halaman |
| Sistem kategori berita | P0 | Kategori: Akademik, Kemahasiswaan, Penelitian, Kerjasama, Prestasi, Pengumuman Resmi | Filter kategori di halaman indeks; setiap artikel wajib memiliki kategori |
| Halaman detail artikel | P0 | Artikel dengan konten lengkap, gambar, share button media sosial | Reading time estimasi ditampilkan; artikel terkait di bawah |
| Pengumuman resmi | P0 | Section terpisah atau tag khusus untuk pengumuman penting (jadwal UTS, libur, dll.) | Pengumuman penting dapat di-pin di atas; bisa dikirim via email newsletter |
| Sistem tag | P1 | Tag bebas untuk mempermudah penemuan konten terkait | Halaman per tag yang menampilkan semua artikel dengan tag tersebut |
| Pencarian artikel | P1 | Search bar di halaman berita dengan filter tanggal dan kategori | Hasil muncul dalam < 1 detik; tidak ada halaman hasil kosong tanpa saran |
| RSS Feed | P2 | Feed RSS untuk subscriber yang mengikuti berita STTPU | Format standar RSS 2.0 |
| Newsletter subscription | P2 | Form subscribe email untuk mendapatkan update berkala | Double opt-in; unsubscribe mudah |

---

### 7.5 Penelitian & Publikasi

**Tujuan**: Membangun kredibilitas akademik STTPU dan meningkatkan visibilitas riset dosen kepada komunitas akademik dan mitra industri.

| Fitur | Prioritas | Deskripsi | Acceptance Criteria |
|-------|-----------|-----------|-------------------|
| Halaman utama penelitian | P1 | Overview kegiatan riset: unit penelitian aktif, jumlah peneliti, total publikasi | Angka-angka diperbarui minimal sekali per semester |
| Direktori unit/laboratorium penelitian | P1 | Daftar lab dan pusat riset dengan deskripsi, kepala lab, dan keahlian | Setiap lab memiliki halaman detail dengan kontak |
| Database publikasi dosen | P1 | Daftar publikasi dengan filter: tahun, penulis, jurnal, topik | Integrasi atau sinkronisasi dengan SINTA/Google Scholar jika memungkinkan; manual input sebagai fallback |
| Halaman profil peneliti | P2 | Profil dosen sebagai peneliti: foto, keahlian, publikasi, proyek aktif, h-index | Dosen dapat request update profil melalui form; bukan self-edit untuk menjaga kualitas |
| Informasi hibah & pendanaan riset | P2 | Informasi hibah yang tersedia (Kemendikti, industri), deadline, syarat | Diperbarui saat ada hibah baru; link ke sumber resmi |
| Jurnal atau prosiding STTPU | P3 | Jika STTPU memiliki jurnal sendiri, halaman khusus dengan indexing dan submission info | Integrasi ke OJS (Open Journal System) jika tersedia |

---

### 7.6 Kemahasiswaan

**Tujuan**: Memberikan gambaran kehidupan kampus yang hidup dan memudahkan mahasiswa aktif menemukan kegiatan dan layanan.

| Fitur | Prioritas | Deskripsi | Acceptance Criteria |
|-------|-----------|-----------|-------------------|
| Halaman utama kemahasiswaan | P1 | Overview: BEM, UKM, prestasi mahasiswa, kegiatan terbaru | Diperbarui minimal 1x per bulan; mencerminkan keaktifan organisasi |
| Direktori UKM (Unit Kegiatan Mahasiswa) | P1 | Daftar UKM dengan deskripsi, foto kegiatan, kontak, dan cara bergabung | Minimal: nama, bidang, kontak penanggung jawab |
| Kalender kegiatan mahasiswa | P2 | Kalender event kemahasiswaan: kompetisi, seminar, kegiatan sosial | Sinkron dengan kalender akademik; event dapat disubmit oleh UKM melalui form |
| Prestasi mahasiswa | P1 | Showcase pencapaian mahasiswa: lomba, beasiswa, program magang bergengsi | Diperbarui setiap ada pencapaian baru; format kartu dengan foto |
| Layanan kemahasiswaan | P1 | Informasi: bimbingan konseling, kesehatan, beasiswa, career center, asrama (jika ada) | Setiap layanan memiliki kontak dan jam operasional yang jelas |
| Panduan mahasiswa baru | P1 | Halaman khusus orientasi mahasiswa baru: apa yang perlu dilakukan, link sistem akademik | Diperbarui tiap tahun akademik baru; format step-by-step |

---

### 7.7 Kontak & Lokasi

**Tujuan**: Memastikan setiap pengunjung dapat menghubungi STTPU dengan mudah melalui kanal yang mereka prefer.

| Fitur | Prioritas | Deskripsi | Acceptance Criteria |
|-------|-----------|-----------|-------------------|
| Halaman kontak komprehensif | P0 | Alamat lengkap, telepon, email umum, jam operasional, peta lokasi | Peta terintegrasi (Google Maps embed), alamat sesuai format resmi |
| Direktori kontak per unit | P1 | Tabel kontak: Akademik, Keuangan, PMB, Kemahasiswaan, IT, Perpustakaan | Setiap kontak terverifikasi aktif minimal 1x per semester |
| Formulir kontak umum | P1 | Form dengan field: nama, email, subjek, pesan, unit tujuan | Notifikasi email ke unit terkait; konfirmasi otomatis ke pengirim; response time SLA ditetapkan |
| Panduan menuju kampus | P1 | Petunjuk arah dari titik referensi utama (stasiun, terminal, tol) via kendaraan umum dan pribadi | Dilengkapi foto landmark untuk memudahkan navigasi |
| Integrasi media sosial | P0 | Link aktif ke semua akun resmi: Instagram, YouTube, LinkedIn, Twitter/X, TikTok | Semua link diverifikasi aktif; ikon media sosial konsisten |

---

### 7.8 Portal / Login Mahasiswa & Dosen

**Tujuan**: Menyediakan akses terpusat ke seluruh sistem digital yang digunakan civitas akademika STTPU.

> Catatan: Website ini berfungsi sebagai portal gateway, bukan sistem backend itu sendiri. Sistem akademik (SIAKAD, LMS, email) tetap berjalan di platform masing-masing.

| Fitur | Prioritas | Deskripsi | Acceptance Criteria |
|-------|-----------|-----------|-------------------|
| Landing page portal | P0 | Halaman /portal dengan dua jalur: Mahasiswa dan Dosen/Staf | Desain bersih, minimal 2 CTA utama, jelas untuk pengguna baru |
| SSO atau redirect ke SIAKAD | P0 | Tombol login yang mengarahkan ke sistem akademik yang sudah ada | Link tidak broken; URL tujuan diverifikasi aktif sebelum launch |
| Quick links mahasiswa | P0 | Link ke: SIAKAD (KRS/nilai), LMS/e-learning, email kampus, perpustakaan digital, kalender akademik | Setiap link diberi ikon dan label yang jelas |
| Quick links dosen/staf | P0 | Link ke: SIAKAD dosen, sistem pengajuan penelitian, email, direktori SDM | Dipisahkan dari quick links mahasiswa |
| Panduan penggunaan sistem | P1 | Artikel bantuan atau video tutorial untuk sistem-sistem yang terhubung | Format FAQ atau video walkthrough maks 3 menit |
| Pengumuman khusus pengguna login | P2 | Section pengumuman yang relevan untuk mahasiswa/dosen (berbeda dari pengumuman publik) | Dikelola dari CMS dengan flag "hanya untuk portal" |

---

### 7.9 Galeri & Media

**Tujuan**: Membangun narasi visual yang kuat tentang kehidupan kampus, kegiatan, dan prestasi STTPU.

| Fitur | Prioritas | Deskripsi | Acceptance Criteria |
|-------|-----------|-----------|-------------------|
| Galeri foto | P1 | Koleksi foto terorganisir dalam album: Kegiatan Kampus, Fasilitas, Wisuda, Prestasi | Lazy loading untuk performa; thumbnail dikompresi; lightbox untuk tampilan penuh |
| Galeri video | P2 | Playlist atau embed video dari YouTube channel resmi STTPU | Tidak meng-host video langsung di server; gunakan YouTube embed |
| Virtual tour kampus | P3 | Tur 360° atau video tour fasilitas kampus | Menggunakan platform third-party (Matterport/Google Street View) yang di-embed |
| Media kit untuk jurnalis | P2 | Logo resmi STTPU (berbagai format), foto kampus resolusi tinggi, boilerplate institusi | Download ZIP tersedia; kontak humas tercantum |

---

## 8. Information Architecture

### 8.1 Sitemap Utama

```
STTPU Website
├── Beranda (/)
│
├── Tentang (/tentang)
│   ├── Sejarah & Profil (/tentang/sejarah)
│   ├── Visi, Misi & Nilai (/tentang/visi-misi)
│   ├── Pimpinan (/tentang/pimpinan)
│   ├── Struktur Organisasi (/tentang/struktur-organisasi)
│   ├── Akreditasi & Legalitas (/tentang/akreditasi)
│   ├── Fasilitas (/tentang/fasilitas)
│   └── Kerjasama & Mitra (/tentang/kerjasama)
│
├── Akademik (/akademik)
│   ├── Program Studi (/akademik/program-studi)
│   │   ├── [Nama Prodi 1] (/akademik/program-studi/[slug])
│   │   ├── [Nama Prodi 2] (/akademik/program-studi/[slug])
│   │   └── ... (satu halaman per prodi)
│   ├── Dosen (/akademik/dosen)
│   │   └── [Profil Dosen] (/akademik/dosen/[slug])
│   ├── Kalender Akademik (/akademik/kalender)
│   └── Beasiswa (/akademik/beasiswa)
│
├── Penelitian (/penelitian)
│   ├── Gambaran Umum (/penelitian)
│   ├── Unit Penelitian & Lab (/penelitian/unit)
│   ├── Publikasi (/penelitian/publikasi)
│   └── Hibah & Pendanaan (/penelitian/hibah)
│
├── Kemahasiswaan (/kemahasiswaan)
│   ├── Organisasi Mahasiswa (/kemahasiswaan/organisasi)
│   ├── UKM (/kemahasiswaan/ukm)
│   ├── Prestasi Mahasiswa (/kemahasiswaan/prestasi)
│   ├── Layanan Mahasiswa (/kemahasiswaan/layanan)
│   └── Panduan Mahasiswa Baru (/kemahasiswaan/mahasiswa-baru)
│
├── Berita & Pengumuman (/berita)
│   ├── Semua Berita (/berita)
│   ├── [Kategori] (/berita/kategori/[slug])
│   └── [Detail Artikel] (/berita/[slug])
│
├── Galeri (/galeri)
│   ├── Foto (/galeri/foto)
│   └── Video (/galeri/video)
│
├── Portal (/portal)
│   ├── Login Mahasiswa
│   └── Login Dosen/Staf
│
└── Kontak (/kontak)
```

### 8.2 Navigasi Primer (Menu Utama)

```
[Logo STTPU] | Tentang | Akademik | Penelitian | Kemahasiswaan | Berita | Portal | Kontak
```

- Di mobile: hamburger menu dengan accordions untuk sub-navigasi
- Sticky navbar saat scroll turun

### 8.3 Navigasi Sekunder (Footer)

- Kolom 1: Link navigasi utama
- Kolom 2: Link cepat (Kalender Akademik, Beasiswa, Perpustakaan, FAQ)
- Kolom 3: Kontak & media sosial
- Kolom 4: Informasi legal (Kebijakan Privasi, Hak Cipta, PPID)

---

## 9. Prinsip Desain

### 9.1 Identitas Visual

Website STTPU harus mencerminkan identitas institusi: teknologi yang berkualitas, semangat perjuangan (Pahlawan), dan keunggulan akademik. Desain bukan sekadar estetika — ia adalah argumen pertama kepada calon mahasiswa bahwa STTPU adalah institusi yang serius dan profesional.

**Panduan visual:**
- **Palet warna**: Gunakan warna brand resmi STTPU sebagai warna primer. Pastikan kontras warna memenuhi standar WCAG 2.1 Level AA (rasio kontras minimal 4.5:1 untuk teks normal).
- **Tipografi**: Gunakan font yang bersih dan mudah dibaca di layar. Rekomendasi: sistem font stack atau Google Fonts (contoh: Inter atau Plus Jakarta Sans untuk teks umum). Skala tipografi yang jelas: H1 > H2 > H3 > body > caption.
- **Ikonografi**: Gunakan library ikon yang konsisten (contoh: Phosphor Icons atau Heroicons). Tidak mencampur style ikon dari berbagai sumber.
- **Fotografi**: Foto manusia nyata — mahasiswa, dosen, kegiatan kampus — lebih diprioritaskan daripada stock photo. Foto harus mencerminkan keberagaman dan kehidupan kampus yang autentik.
- **Whitespace**: Beri ruang nafas yang cukup. Kepadatan konten tinggi adalah musuh keterbacaan.

### 9.2 Mobile-First

Lebih dari 70% pengguna website pendidikan di Indonesia mengakses via smartphone (benchmark dari analisis UNAIR dan ITS). Website harus dirancang dengan pendekatan mobile-first, bukan mobile-adapted.

- **Breakpoint**: Mobile (< 768px) sebagai baseline desain; Tablet (768-1024px); Desktop (> 1024px)
- **Touch targets**: Minimum 44x44px untuk semua elemen interaktif
- **Form di mobile**: Input field cukup besar, keyboard yang tepat ditrigger (email keyboard untuk field email, nomor untuk nomor HP)
- **Tabel responsif**: Tabel data harus dapat di-scroll horizontal atau dikonversi ke card layout di mobile
- **Gambar**: Menggunakan format modern (WebP), lazy loading, dan srcset untuk responsivitas

### 9.3 Aksesibilitas

Mengacu pada standar WCAG 2.1 Level AA sebagai target minimum.

- Semua gambar memiliki atribut `alt` yang deskriptif
- Navigasi keyboard penuh (tab order logis, focus states terlihat)
- Kontras warna minimal 4.5:1 untuk teks, 3:1 untuk elemen UI
- Tidak ada informasi yang hanya disampaikan melalui warna saja
- Heading hierarchy yang benar (H1 > H2 > H3 tidak dilompati)
- Form dengan label yang terhubung secara semantik ke input
- Video dilengkapi subtitle/caption (minimal untuk konten utama)
- Pertimbangkan toolbar aksesibilitas sederhana (seperti di website UGM): toggle kontras tinggi dan ukuran font

### 9.4 Performa sebagai Fitur

Berdasarkan observasi kompetitor, website universitas Indonesia umumnya lambat karena aset yang tidak dioptimasi. Ini adalah peluang diferensiasi.

- Target Core Web Vitals: LCP < 2.5 detik, FID < 100ms, CLS < 0.1
- Semua gambar dikompresi dan dalam format WebP
- Lazy loading untuk gambar dan komponen below-the-fold
- Minimisasi dan kompresi CSS/JS
- CDN untuk aset statis
- Server response time < 200ms

### 9.5 Bahasa & Tone of Voice

- **Bahasa utama**: Bahasa Indonesia yang baku namun tidak kaku — ramah, jelas, dan informatif
- **Bahasa sekunder**: Bahasa Inggris untuk halaman-halaman yang menyasar audiens internasional (halaman penelitian, kerjasama, profil institusi)
- **Tone**: Otoritatif namun approachable. Hindari jargon birokrasi yang sulit dipahami. Bayangkan menjelaskan kepada orang tua calon mahasiswa yang tidak familiar dengan sistem pendidikan tinggi.
- **Headline prinsip**: Gunakan kalimat aktif, manfaat-pertama. Contoh: "Daftarkan Diri Anda" bukan "Pendaftaran Dapat Dilakukan".

---

## 10. Technical Requirements

### 10.1 Rekomendasi Tech Stack

Rekomendasi ini mempertimbangkan kebutuhan tim non-teknis untuk mengelola konten, skalabilitas jangka panjang, dan ekosistem pengembang lokal Indonesia.

#### Opsi A: CMS Berbasis (Direkomendasikan untuk tim dengan resource teknis terbatas)

| Layer | Teknologi | Alasan |
|-------|-----------|--------|
| CMS | WordPress + ACF atau Payload CMS | Ekosistem luas, banyak developer tersedia, dukungan komunitas kuat. Payload CMS sebagai alternatif modern jika tim punya developer JS |
| Hosting | VPS (Niagahoster, Dewaweb, atau CloudKilat) atau cloud (GCP/AWS region Jakarta) | Data center di Indonesia untuk latensi rendah; pilih yang ada SLA uptime 99.9% |
| Database | MySQL / PostgreSQL | Standar industri, didukung oleh semua layanan hosting |
| CDN | Cloudflare (free tier atau Pro) | Caching, DDoS protection, dan SSL otomatis |
| Email transaksional | Mailgun atau Brevo (SendinBlue) | Untuk notifikasi PMB, form kontak; lebih andal daripada SMTP server sendiri |
| Analitik | Google Analytics 4 + Google Search Console | Gratis, standar industri |

#### Opsi B: Headless CMS + Framework Modern (Direkomendasikan jika ada tim developer JS)

| Layer | Teknologi | Alasan |
|-------|-----------|--------|
| Frontend | Next.js (React) | SSG/SSR untuk performa optimal; SEO-friendly; ekosistem kaya |
| CMS (headless) | Sanity.io atau Strapi | API-first, konten fleksibel, antarmuka editor yang ramah non-teknis |
| Hosting Frontend | Vercel atau Netlify | Deploy otomatis, edge network global, free tier memadai |
| Hosting CMS/API | Railway atau Render (untuk Strapi) | Murah, mudah di-deploy |
| Database | PostgreSQL via Supabase | Managed, ada free tier, dukungan realtime |

### 10.2 SEO Requirements

- Setiap halaman memiliki `<title>` unik (format: `[Nama Halaman] | STTPU`)
- Meta description unik untuk setiap halaman (120-160 karakter)
- URL struktur bersih: `/program-studi/teknik-informatika` bukan `/page?id=42`
- Open Graph tags untuk semua halaman publik (penting untuk share di media sosial)
- Structured data (JSON-LD) untuk: Organisasi, Artikel Berita, Breadcrumb, FAQ
- Sitemap XML otomatis dan teregistrasi di Google Search Console
- File `robots.txt` yang benar (tidak memblokir halaman publik)
- Canonical URL untuk menghindari duplicate content
- Breadcrumb navigasi di semua halaman internal

### 10.3 Keamanan

- SSL/HTTPS wajib untuk semua halaman (redirect otomatis dari HTTP)
- Form dengan CAPTCHA atau honeypot untuk mencegah spam
- Rate limiting pada endpoint formulir
- Upload file: validasi tipe dan ukuran file di server-side, bukan hanya client-side
- Backup otomatis harian, disimpan di lokasi terpisah
- Update rutin CMS, plugin, dan dependensi (jadwal bulanan)
- Header keamanan HTTP: CSP, X-Frame-Options, HSTS

### 10.4 Infrastruktur & Uptime

| Requirement | Target |
|-------------|--------|
| Uptime | 99.9% (maksimal 8.7 jam downtime/tahun) |
| Backup | Harian, retensi 30 hari, tersimpan di lokasi berbeda |
| Disaster recovery | RTO < 4 jam, RPO < 24 jam |
| Monitoring | Uptime monitoring aktif (UptimeRobot atau Pingdom) dengan alert ke tim IT |
| Domain | `.ac.id` (wajib untuk institusi pendidikan di Indonesia; daftar via PDDIKTI) |

### 10.5 Integrasi Eksternal

| Integrasi | Tujuan | Prioritas |
|-----------|--------|-----------|
| Google Maps Embed | Peta lokasi kampus | P0 |
| YouTube Embed | Video profil dan kegiatan | P1 |
| WhatsApp Business API | Tombol "Chat Sekarang" ke nomor resmi | P1 |
| Google Analytics 4 | Analitik perilaku pengunjung | P0 |
| SINTA API (opsional) | Sinkronisasi data publikasi dosen | P2 |
| Sistem SIAKAD (redirect/SSO) | Portal login mahasiswa dan dosen | P0 |

---

## 11. Strategi Konten

### 11.1 Tipe Konten & Kepemilikan

| Tipe Konten | Frekuensi Update | Pemilik Konten | Format |
|-------------|-----------------|----------------|--------|
| Berita kampus | 2x per minggu | Humas/Marketing | Artikel (500-1000 kata) + foto |
| Pengumuman resmi | Sesuai kebutuhan | Akademik/Pimpinan | Teks singkat + lampiran PDF |
| Profil program studi | Per tahun akademik | Kaprodi + Akademik | Long-form (1500-3000 kata) |
| Profil dosen | Saat ada perubahan | Dosen bersangkutan + IT | Semi-structured (form input) |
| Kalender akademik | Per semester | Bagian Akademik | PDF + data terstruktur |
| Galeri foto | Setelah setiap event | Humas/Fotografer | Foto (maks 2MB, WebP/JPEG) |
| Prestasi mahasiswa/dosen | Saat terjadi | Kemahasiswaan/Humas | Artikel pendek + foto |

### 11.2 Tata Kelola Konten (Content Governance)

**Prinsip**: Setiap konten memiliki pemilik yang jelas. Tidak ada konten yang "dimiliki bersama" karena artinya tidak dimiliki siapa pun.

**Alur publikasi konten berita:**
1. Penulis (Humas) membuat draft di CMS → status: Draft
2. Editor (Kepala Humas atau Wakil Ketua) mereview → status: Pending Review
3. Jika disetujui: dipublikasikan → status: Published
4. Jika perlu revisi: dikembalikan ke penulis dengan catatan

**Alur update informasi akademik:**
1. Perubahan diinisiasi oleh unit terkait (Kaprodi, Akademik)
2. Draft perubahan disampaikan ke tim IT/web
3. Tim IT memperbarui di CMS
4. Verifikasi oleh unit terkait sebelum dipublikasikan

**Audit konten rutin:**
- Setiap 3 bulan: cek broken link, informasi kedaluwarsa (kontak, jadwal, biaya)
- Setiap 6 bulan: review kelengkapan profil dosen dan program studi
- Setiap tahun: full content audit — relevansi, akurasi, dan performa SEO

### 11.3 SEO Content Guidelines

- Setiap artikel berita minimal 400 kata
- Heading mengandung kata kunci yang relevan secara natural
- Setiap artikel memiliki minimal 1 gambar dengan alt text yang deskriptif
- URL menggunakan kata kunci dalam Bahasa Indonesia
- Internal linking: setiap artikel terhubung ke minimal 2 halaman lain di website
- Hindari duplikasi konten antar halaman

### 11.4 Strategi Konten untuk Calon Mahasiswa (Prioritas Tertinggi)

Konten untuk memenangkan calon mahasiswa tidak cukup hanya berupa informasi prosedural. Dibutuhkan konten naratif yang membangun kepercayaan:

- **Kisah mahasiswa**: Series artikel/video "Mahasiswa STTPU Bercerita" — pengalaman perkuliahan, kegiatan, dan pencapaian
- **Day in the life**: Konten yang menggambarkan kehidupan sehari-hari mahasiswa di kampus
- **Alumni spotlight**: Profil alumni yang berhasil, dengan fokus pada perjalanan karir
- **Behind the scenes lab**: Foto dan video kegiatan di laboratorium — konkret dan spesifik, bukan foto generik
- **Frequently Googled questions**: Identifikasi 20-30 pertanyaan paling sering dicari di Google terkait STTPU (misal: "biaya kuliah STTPU", "jurusan di STTPU", "akreditasi STTPU") dan buat halaman atau artikel yang menjawab setiap pertanyaan

---

## 12. Fase & Roadmap

### Overview

| Fase | Nama | Durasi | Output Utama |
|------|------|--------|-------------|
| Phase 0 | Fondasi & Persiapan | Minggu 1-3 | Domain, hosting, CMS setup, design system |
| Phase 1 | Core Website Launch | Minggu 4-10 | Website live dengan semua P0 features |
| Phase 2 | Enrichment | Minggu 11-20 | Semua P1 features + optimasi berdasarkan data |
| Phase 3 | Scale & Innovate | Bulan 6-12 | P2/P3 features, integrasi lanjutan |

---

### Phase 0 — Fondasi & Persiapan (Minggu 1-3)

**Tujuan**: Membangun fondasi teknis dan konten sebelum development dimulai.

| Tugas | Penanggung Jawab | Deadline |
|-------|-----------------|----------|
| Daftarkan domain sttpu.ac.id (jika belum ada) | IT + Pimpinan | Minggu 1 |
| Setup hosting dan environment (dev/staging/prod) | Tim IT | Minggu 1 |
| Finalisasi brand guidelines (warna, logo, tipografi) | Desainer + Humas | Minggu 2 |
| Instalasi dan konfigurasi CMS | Tim IT | Minggu 2 |
| Inventaris konten yang sudah ada (foto, dokumen, data prodi) | Humas + Akademik | Minggu 2 |
| Setup Google Analytics 4 dan Search Console | Tim IT | Minggu 2 |
| Workshop onboarding CMS untuk staf konten | Tim IT | Minggu 3 |
| Setup email transaksional untuk notifikasi form | Tim IT | Minggu 3 |

**Gate untuk masuk Phase 1**: Hosting aktif, CMS berjalan di staging, brand guidelines final disetujui pimpinan.

---

### Phase 1 — Core Website Launch (Minggu 4-10)

**Tujuan**: Website publik live dengan semua P0 features. Calon mahasiswa dapat menemukan informasi dasar dan mendaftar online.

| Sprint | Fokus | Deliverable |
|--------|-------|-------------|
| Sprint 1 (W4-5) | Homepage + Navigation | Hero, statistik, section prodi, footer, navigasi responsif |
| Sprint 2 (W5-6) | Profil Kampus | Sejarah, visi-misi, pimpinan, akreditasi, fasilitas |
| Sprint 3 (W6-7) | Akademik - Program Studi | Halaman indeks prodi, minimal 3 halaman detail prodi |
| Sprint 4 (W7-8) | Berita & Portal | Sistem berita (kategori, artikel), halaman portal dengan SSO/redirect |
| Sprint 5 (W8-9) | Kontak, QA & Launch | Halaman kontak, SEO on-page, bug fixing, performance audit, go-live |

**Launch checklist Phase 1:**
- [ ] Semua P0 features berjalan tanpa bug kritis
- [ ] Core Web Vitals semua halaman utama di zona "Good"
- [ ] SSL aktif dan semua halaman redirect ke HTTPS
- [ ] Google Analytics merekam data
- [ ] Semua link di navigasi utama tidak broken
- [ ] Halaman 404 custom aktif
- [ ] robots.txt dan sitemap.xml sudah benar
- [ ] Tim konten sudah bisa publish berita mandiri

**Kriteria rollback**: Jika halaman utama tidak bisa diakses lebih dari 15 menit, rollback ke versi sebelumnya dan page on-call IT.

---

### Phase 2 — Enrichment (Minggu 11-20)

**Tujuan**: Melengkapi semua P1 features, mengoptimasi berdasarkan data perilaku pengguna minggu pertama, dan meningkatkan kualitas konten.

| Periode | Fokus | Deliverable |
|---------|-------|-------------|
| W11-12 | Mahasiswa & Kemahasiswaan | UKM directory, prestasi mahasiswa, layanan kemahasiswaan |
| W12-13 | Penelitian | Halaman penelitian, unit lab, database publikasi manual |
| W13-14 | Galeri | Galeri foto terstruktur per album, embed video YouTube |
| W14-15 | Profil dosen lengkap | Halaman profil dosen dengan publikasi per dosen |
| W15-16 | Konten enrichment | Testimonial mahasiswa, kisah alumni, whitespace content gaps |
| W17-18 | SEO & performa | Optimasi berdasarkan data GSC, perbaikan Core Web Vitals |
| W18-20 | Aksesibilitas & QA | Audit WCAG, perbaikan aksesibilitas, user testing dengan 5 pengguna nyata |

**Success gate Phase 2:**
- Bounce rate homepage < 55%
- Minimal 5 berita terpublikasi per bulan
- Semua halaman program studi memiliki konten lengkap
- User testing menunjukkan task completion rate > 80% untuk 3 task utama (cari info prodi, temukan informasi beasiswa, hubungi kampus)

---

### Phase 3 — Scale & Innovate (Bulan 6-12)

**Tujuan**: Menambahkan P2/P3 features berdasarkan data dan feedback, memperkuat posisi digital STTPU.

| Inisiatif | Hipotesis | Sinyal untuk Dimulai |
|-----------|-----------|---------------------|
| Newsletter & email marketing | Engagement email lebih tinggi daripada traffic organik untuk pengumuman | Subscriber list mencapai 500+ |
| Bilingual penuh (Inggris) | Ada pertanyaan dari calon mahasiswa/mitra luar negeri | Lebih dari 5% traffic dari luar Indonesia |
| Database publikasi terintegrasi SINTA | Dosen mengeluhkan profil publikasi tidak update | SINTA API tersedia dan stabil |
| Chatbot FAQ sederhana | Volume pertanyaan berulang ke WhatsApp masih tinggi setelah Phase 1 | >50 pertanyaan identik per bulan di WhatsApp |
| Virtual tour kampus | Calon mahasiswa dari luar kota bertanya tentang fasilitas | Tersedia anggaran dan vendor |
| Portal kemahasiswaan self-service | Mahasiswa sering meminta surat keterangan aktif dan dokumen standar | Permintaan dokumen > 50 per bulan |

---

## 13. Risiko & Mitigasi

| Risiko | Kemungkinan | Dampak | Mitigasi |
|--------|-------------|--------|----------|
| Konten tidak tersedia saat launch (profil prodi, foto, dokumen akreditasi) | Tinggi | Tinggi | Inventaris konten di Phase 0; minimal viable content per halaman ditetapkan; halaman "coming soon" sebagai fallback |
| Tim staf tidak dapat mengoperasikan CMS secara mandiri | Sedang | Tinggi | Workshop onboarding wajib + panduan tertulis + video tutorial singkat; CMS dipilih berdasarkan kemudahan penggunaan |
| Domain .ac.id proses registrasi lambat (bisa 2-4 minggu) | Sedang | Tinggi | Inisiasi pendaftaran domain di hari pertama Phase 0; siapkan domain sementara jika diperlukan |
| Budget tidak cukup untuk menyelesaikan semua fase | Sedang | Sedang | Prioritaskan P0 dengan ketat; Phase 1 saja sudah menghasilkan nilai; Phase 2 & 3 bersifat incremental |
| Perubahan scope di tengah development | Tinggi | Sedang | Semua permintaan perubahan didokumentasikan dan dievaluasi formal; tidak ada scope yang ditambahkan secara informal |
| Foto dan media visual berkualitas rendah | Sedang | Sedang | Briefing fotografer sebelum Phase 0 berakhir; identifikasi 5-10 sesi foto prioritas; stock photo hanya sebagai last resort |
| Website menjadi target spam/serangan | Rendah | Sedang | Cloudflare untuk DDoS protection; CAPTCHA di semua form; update rutin; monitoring keamanan |
| Tim IT terbatas dan tidak punya bandwidth | Tinggi | Tinggi | Pertimbangkan menggunakan vendor/freelancer untuk development; tim IT internal fokus pada konfigurasi dan pemeliharaan |

---

## 14. Open Questions

Pertanyaan-pertanyaan berikut harus dijawab sebelum development Phase 1 dimulai. Setiap pertanyaan memiliki pemilik dan deadline.

| # | Pertanyaan | Pemilik | Deadline | Status |
|---|------------|---------|----------|--------|
| 1 | Apakah domain `sttpu.ac.id` sudah dimiliki? Jika belum, siapa yang memproses pendaftaran? | Kepala IT | Minggu 1 | Terbuka |
| 2 | Sistem SIAKAD apa yang digunakan saat ini? Apakah mendukung SSO atau hanya redirect? | Kepala IT | Minggu 1 | Terbuka |
| 3 | Siapa yang ditunjuk sebagai Content Manager utama yang bertanggung jawab atas update konten harian? | Pimpinan | Minggu 2 | Terbuka |
| 4 | Berapa anggaran total yang dialokasikan untuk website ini (development + hosting + pemeliharaan tahun pertama)? | Pimpinan/Keuangan | Minggu 1 | Terbuka |
| 5 | Apakah ada logo dan brand guidelines STTPU yang sudah final? Atau perlu dibuat dari awal? | Humas | Minggu 2 | Terbuka |
| 6 | Berapa program studi yang aktif saat ini? Apakah ada rencana pembukaan prodi baru dalam 12 bulan ke depan? | Akademik | Minggu 2 | Terbuka |
| 7 | Apakah STTPU ingin menampilkan informasi biaya UKT secara transparan di website publik? | Pimpinan + Keuangan | Minggu 2 | Terbuka |
| 8 | Apakah ada vendor atau freelancer development yang sudah dipertimbangkan, atau akan dibangun oleh tim internal? | Kepala IT + Pimpinan | Minggu 1 | Terbuka |
| 10 | Apakah website perlu bilingual dari launch, atau Bahasa Indonesia saja dulu untuk Phase 1? | Pimpinan | Minggu 2 | Terbuka |
| 11 | Siapa yang berwenang memberikan final approval untuk konten sebelum dipublikasikan? | Pimpinan | Minggu 2 | Terbuka |
| 12 | Apakah ada kebijakan privasi yang perlu ditampilkan di website (form kontak mengumpulkan data email/telepon)? | Legal/Pimpinan | Minggu 3 | Terbuka |

---

## Appendix

### A. Referensi Riset Kompetitor

Website yang dianalisis untuk PRD ini:
- **ITB** (itb.ac.id): Pola navigasi hierarki, transparansi kelembagaan, multi-kampus structure
- **UGM** (ugm.ac.id): SDG integration, toolbar aksesibilitas, portal multi-layanan, AI literacy features
- **ITS** (its.ac.id): Research statistics dashboard, multi-ranking display, campus life structure, SDG visualization
- **UNAIR** (unair.ac.id): Multi-audience portal design, WhatsApp integration, event branding, social media completeness

### B. Referensi Standar

- WCAG 2.1 Guidelines — https://www.w3.org/WAI/WCAG21/quickref/
- Google Core Web Vitals — https://web.dev/vitals/
- Panduan Domain .ac.id — https://pandi.id
- UU ITE dan regulasi perlindungan data pribadi Indonesia (UU No. 27 Tahun 2022)
- Peraturan BAN-PT tentang publikasi akreditasi
- PDDIKTI — Pangkalan Data Pendidikan Tinggi (untuk verifikasi data institusi)

### C. Metric Baseline Measurement Plan

Sebelum launch, ukur baseline berikut:
1. Volume pertanyaan masuk ke WhatsApp/telepon admin per bulan (kategorikan per topik)
2. Traffic ke media sosial STTPU (sebagai proxy minat audiens)
3. Search volume untuk kata kunci terkait STTPU di Google Search Console (jika domain sudah ada)

Data baseline ini akan menjadi pembanding untuk mengukur dampak website setelah launch.

---

*Dokumen ini adalah living document. Setiap perubahan signifikan harus didiskusikan dengan seluruh stakeholder dan diverifikasi perubahan versinya di bagian header.*

*Versi 1.0 — 18 April 2026*
