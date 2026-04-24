# Panduan Admin Payload CMS

Panduan ini ditulis untuk admin non-teknis yang mengelola website STTPU melalui panel Payload CMS.

## Akses Admin

1. Buka halaman admin di `/admin`.
2. Login menggunakan akun yang sudah dibuat oleh tim IT.
3. Setelah masuk, Anda akan melihat menu utama untuk `Collections` dan `Globals`.

## Memahami Struktur CMS

Secara sederhana:

- `Collections` dipakai untuk data yang jumlahnya banyak dan terus bertambah.
  Contoh: berita, dosen, galeri, beasiswa, testimoni.
- `Globals` dipakai untuk pengaturan atau halaman tunggal.
  Contoh: halaman utama, tentang kami, kalender akademik, menu utama.

## Menu Penting yang Paling Sering Dipakai

### Globals

- `Site Settings`
  Untuk identitas situs, kontak dasar, dan pengaturan umum.
- `Halaman Utama`
  Untuk konten beranda.
- `Tentang Kami`
  Untuk isi halaman `/tentang/*`, termasuk sejarah, visi misi, pimpinan, fasilitas, struktur organisasi, dan akreditasi.
- `Kalender Akademik`
  Untuk isi halaman `/akademik/kalender`.
- `Panduan Maba`
  Untuk isi halaman `/kemahasiswaan/mahasiswa-baru`.
- `Kemahasiswaan Page`
  Untuk navigasi subpage kemahasiswaan.
- `Penelitian Page`
  Untuk navigasi subpage penelitian.
- `Akademik Page`
  Untuk navigasi subpage akademik.
- `Kontak Page`
  Untuk konten halaman kontak.
- `Main Menu`
  Untuk menu navigasi utama website.
- `Portal Links`
  Untuk tautan portal/layanan eksternal.
- `Berita Page`
  Untuk pengaturan halaman berita.

### Collections

- `Media`
  Semua gambar dan file upload.
- `Berita`
  Artikel berita dan pengumuman.
- `Kategori Berita`
  Kategori berita.
- `Galeri`
  Album galeri kegiatan.
- `Kategori Galeri`
  Kategori album galeri.
- `Program Studi`
  Data halaman program studi.
- `Dosen`
  Profil dosen.
- `Pimpinan`
  Profil pimpinan institusi.
- `Testimonial`
  Testimoni alumni/mahasiswa.
- `Beasiswa`
  Informasi beasiswa.
- `UKM`
  Unit kegiatan mahasiswa.
- `Organisasi`
  Organisasi mahasiswa.
- `Prestasi`
  Prestasi mahasiswa.
- `Layanan`
  Layanan mahasiswa.
- `Unit Penelitian`
  Unit riset/laboratorium.
- `Publikasi`
  Data publikasi ilmiah.
- `Hibah`
  Hibah dan pendanaan riset.
- `Unit Kontak`
  Direktori unit kontak kampus.
- `Pesan`
  Pesan yang masuk dari form website.

## Alur Kerja Dasar

### Menambahkan gambar atau file

1. Buka `Media`.
2. Klik `Create New`.
3. Upload file.
4. Isi `Alt` dengan deskripsi singkat yang jelas.
5. Simpan.

Catatan:
- Gunakan nama file yang rapi.
- Isi `Alt` dengan deskripsi nyata, misalnya `Laboratorium Hidrolika STTPU`.

### Mengedit halaman tunggal

1. Buka menu `Globals`.
2. Pilih halaman yang ingin diubah, misalnya `Tentang Kami`.
3. Ubah field yang diperlukan.
4. Klik `Save`.

### Menambah data baru

1. Buka `Collection` yang sesuai.
2. Klik `Create New`.
3. Isi semua field penting.
4. Jika ada field `status`, pilih `aktif` bila konten siap tampil.
5. Klik `Save`.

## Panduan Berdasarkan Kebutuhan

### Mengubah isi Beranda

Masuk ke `Globals -> Halaman Utama`.

Biasanya yang diubah:
- judul hero
- subjudul hero
- tombol CTA
- statistik singkat
- blok highlight konten

### Mengubah isi halaman Tentang

Masuk ke `Globals -> Tentang Kami`.

Bagian di dalamnya mencakup:
- overview / pengantar
- sejarah
- visi dan misi
- pimpinan
- struktur organisasi
- fasilitas
- akreditasi dan legalitas

Contoh penting:
- isi subpage `/tentang/fasilitas` ada di bagian `Fasilitas`
- field yang dipakai antara lain:
  - `fasilitasIntro`
  - `fasilitasCtaTitle`
  - `fasilitasCtaDescription`
  - `fasilitasCtaButtonLabel`
  - `fasilitasCtaButtonHref`
  - `fasilitas[]`

Isi setiap item fasilitas:
- `nama`
- `deskripsi`
- `kapasitas`
- `foto`
- `kategori`
- `items`

### Mengubah menu subpage Tentang, Akademik, Kemahasiswaan, dan Penelitian

Masuk ke global berikut:
- `Tentang Kami`
- `Akademik Page`
- `Kemahasiswaan Page`
- `Penelitian Page`

Biasanya ada field:
- `sidebarTitle`
- `subpages`

Di `subpages`, Anda bisa mengatur:
- judul
- subtitle
- breadcrumb
- slug

Catatan penting:
- Jangan mengubah `slug` sembarangan jika halaman sudah dipakai publik.
- Jika ingin mengganti nama menu, lebih aman ubah `title` atau `breadcrumb` dulu.

### Mengubah Kalender Akademik

Masuk ke `Globals -> Kalender Akademik`.

Yang bisa diisi:
- tahun akademik
- deskripsi
- file PDF kalender
- semester ganjil
- semester genap
- kegiatan penting lainnya

### Mengelola Berita

Masuk ke `Collections -> Berita`.

Langkah umum:
1. Buat kategori dulu di `Kategori Berita` bila belum ada.
2. Tambahkan berita baru.
3. Isi judul, ringkasan, isi berita, kategori, thumbnail jika ada.
4. Pastikan slug benar.
5. Simpan.

Tips:
- Gunakan judul yang singkat dan jelas.
- Isi ringkasan 1-2 kalimat.
- Cek kategori sudah benar sebelum simpan.

### Mengelola Program Studi dan Dosen

Masuk ke:
- `Program Studi`
- `Dosen`

Untuk `Program Studi`, periksa:
- nama
- slug
- deskripsi
- visi
- misi
- urutan tampil
- status aktif

Untuk `Dosen`, periksa:
- nama
- NIDN
- jabatan fungsional
- email
- program studi
- bidang keahlian
- foto
- bio

Tips:
- Pastikan foto dosen sudah diupload dengan benar.
- Isi relasi program studi agar dosen tampil pada halaman yang sesuai.

### Mengelola Kemahasiswaan

Collection yang sering dipakai:
- `UKM`
- `Organisasi`
- `Prestasi`
- `Layanan`

Global tambahan:
- `Panduan Maba`
- `Kemahasiswaan Page`

Gunakan:
- `Panduan Maba` untuk isi panduan mahasiswa baru
- `Kemahasiswaan Page` untuk mengatur urutan dan label subpage

### Mengelola Penelitian

Collection yang sering dipakai:
- `Unit Penelitian`
- `Publikasi`
- `Hibah`

Global tambahan:
- `Penelitian Page`

Gunakan:
- `Penelitian Page` untuk mengatur navigasi subpage
- `Unit Penelitian` untuk laboratorium/unit riset
- `Publikasi` untuk publikasi ilmiah dosen
- `Hibah` untuk informasi pendanaan riset

### Mengelola Testimoni

Masuk ke `Collections -> Testimonial`.

Isi field:
- `teks`
- `nama`
- `prodi`
- `foto`
- `urutan`
- `status`

Agar testimoni tampil:
- `status` harus `aktif`
- jika memakai foto, pastikan file berhasil upload

## Tips Aman Sebelum Menyimpan

Sebelum klik `Save`, cek:

- judul sudah benar
- tidak ada typo
- slug tidak bentrok
- gambar sudah terpasang
- tombol/link mengarah ke tujuan yang benar
- status konten sudah sesuai

## Checklist Setelah Update Konten

Setelah menyimpan perubahan:

1. Buka halaman website yang terkait.
2. Refresh halaman.
3. Pastikan:
   - teks tampil benar
   - gambar muncul
   - urutan item sudah sesuai
   - link bisa diklik
   - tidak ada layout yang rusak di desktop dan mobile

## Kesalahan yang Sering Terjadi

### Gambar tidak muncul

Periksa:
- file sudah ada di `Media`
- field upload sudah terpilih
- konten sudah disimpan

### Konten tidak tampil di website

Periksa:
- status konten masih `aktif` atau belum
- item disimpan di menu yang benar
- relasi yang dibutuhkan sudah diisi

### Urutan tampil tidak sesuai

Periksa field:
- `urutan`

Biasanya angka kecil tampil lebih dulu.

### Link salah

Periksa:
- apakah memakai link internal atau eksternal
- tidak ada salah ketik
- URL lengkap untuk link eksternal, misalnya `https://...`

## Saran Operasional

- Upload gambar ke `Media` terlebih dulu sebelum mengedit halaman.
- Hindari mengganti slug halaman yang sudah live kecuali benar-benar perlu.
- Untuk perubahan besar, lakukan di jam kerja agar mudah dicek bersama tim.
- Setelah update penting, selalu cek langsung di frontend.

## Jika Bingung Harus Edit di Mana

Gunakan panduan sederhana ini:

- kalau yang diubah adalah satu halaman tetap, cek `Globals`
- kalau yang diubah adalah daftar item yang bisa banyak, cek `Collections`
- kalau yang diubah adalah gambar/file, cek `Media`

## Ringkasan Cepat

- `Beranda`: `Halaman Utama`
- `Tentang`: `Tentang Kami`
- `Kalender Akademik`: `Kalender Akademik`
- `Panduan Maba`: `Panduan Maba`
- `Navigasi section`: `Main Menu` atau global page terkait
- `Berita`: `Berita`
- `Galeri`: `Galeri`
- `Dosen`: `Dosen`
- `Program Studi`: `Program Studi`
- `Testimoni`: `Testimonial`
- `Kontak`: `Kontak Page` dan `Unit Kontak`
