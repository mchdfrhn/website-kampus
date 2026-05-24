import {
  getKategoriBadgeClass,
  getKategoriDotClass,
  mapPayloadToManagedKategori,
  type ManagedKategori,
} from './kategori';

export type ArtikelKategori = ManagedKategori;

export type Artikel = {
  slug: string;
  judul: string;
  kategori: ArtikelKategori;
  ringkasan: string;
  konten: string;
  kontenHtml?: string;
  thumbnailUrl?: string;
  penulis: string;
  tanggalTerbit: string;
  isPinned: boolean;
  tags: string[];
  readingTime: number;
};

const beritaKategoriDefaults: Record<string, Omit<ArtikelKategori, 'id' | 'urutan'>> = {
  akademik: { nama: 'Akademik', slug: 'akademik', warna: 'blue' },
  kemahasiswaan: { nama: 'Kemahasiswaan', slug: 'kemahasiswaan', warna: 'green' },
  penelitian: { nama: 'Penelitian', slug: 'penelitian', warna: 'purple' },
  kerjasama: { nama: 'Kerjasama', slug: 'kerjasama', warna: 'orange' },
  prestasi: { nama: 'Prestasi', slug: 'prestasi', warna: 'gold' },
  pengumuman: { nama: 'Pengumuman Resmi', slug: 'pengumuman', warna: 'red' },
};

export function resolveArtikelKategori(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
): ArtikelKategori {
  if (typeof value === 'string' && value in beritaKategoriDefaults) {
    return beritaKategoriDefaults[value];
  }

  const mapped = mapPayloadToManagedKategori(value);

  if (mapped?.slug) {
    const fallback = beritaKategoriDefaults[mapped.slug] ?? {
      nama: mapped.nama || 'Berita',
      slug: mapped.slug,
      warna: 'navy',
    };

    return {
      ...fallback,
      ...mapped,
      nama: mapped.nama || fallback.nama,
      warna: mapped.warna || fallback.warna,
    };
  }

  return beritaKategoriDefaults.akademik;
}

export function getArtikelKategoriLabel(kategori: Artikel['kategori']): string {
  return kategori.nama;
}

export function getArtikelKategoriSlug(kategori: Artikel['kategori']): string {
  return kategori.slug;
}

export function getArtikelKategoriColor(kategori: Artikel['kategori']): string {
  return getKategoriBadgeClass(kategori.warna, 'navy');
}

export function getArtikelKategoriDotColor(kategori: Artikel['kategori']): string {
  return getKategoriDotClass(kategori.warna, 'navy');
}

const artikelSeedList = [
  {
    slug: 'pengumuman-jadwal-uts-semester-genap-2025-2026',
    judul: 'Jadwal Ujian Tengah Semester (UTS) Genap Tahun Akademik 2025/2026',
    kategori: 'pengumuman',
    ringkasan: 'Bagian Akademik STTPU mengumumkan jadwal resmi UTS Semester Genap TA 2025/2026 yang akan dilaksanakan pada 16–20 Maret 2026.',
    konten: `Bagian Akademik Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta mengumumkan jadwal resmi Ujian Tengah Semester (UTS) Semester Genap Tahun Akademik 2025/2026.

**Jadwal Pelaksanaan UTS:**
- Tanggal: 16 – 20 Maret 2026
- Waktu: Sesuai jadwal masing-masing program studi
- Tempat: Ruang ujian yang akan diumumkan melalui SIAKAD

**Ketentuan Peserta Ujian:**
Mahasiswa wajib memenuhi ketentuan berikut untuk dapat mengikuti UTS:
1. Kehadiran perkuliahan minimal 75% dari total pertemuan hingga minggu ke-7
2. Telah menyelesaikan pembayaran UKT semester berjalan
3. Terdaftar dalam Kartu Rencana Studi (KRS) untuk mata kuliah yang diujikan

**Tata Tertib Ujian:**
- Mahasiswa wajib hadir 15 menit sebelum ujian dimulai
- Membawa Kartu Tanda Mahasiswa (KTM) yang masih berlaku
- Menggunakan pakaian sopan dan rapi (dilarang memakai sandal)
- Dilarang membawa alat komunikasi/HP ke dalam ruang ujian
- Dilarang bekerja sama dengan peserta lain

**Jadwal Detail Per Program Studi:**
Jadwal lengkap per mata kuliah dapat diakses melalui portal SIAKAD masing-masing. Pengumuman jadwal ujian juga akan ditempelkan di papan pengumuman program studi.

Bagi mahasiswa yang memiliki pertanyaan atau kendala, silakan menghubungi Bagian Akademik STTPU di nomor (021) 2938-2938 atau email akademik@sttpu.ac.id pada hari kerja pukul 08.00–16.00 WIB.

Demikian pengumuman ini kami sampaikan. Kami doakan seluruh mahasiswa sukses dalam menghadapi UTS Semester Genap 2025/2026.`,
    penulis: 'Bagian Akademik STTPU',
    tanggalTerbit: '2026-03-02',
    isPinned: true,
    tags: ['UTS', 'Jadwal Ujian', 'Akademik', '2025/2026'],
    readingTime: 3,
  },
  {
    slug: 'mahasiswa-sttpu-juara-kompetisi-beton-nasional-2026',
    judul: 'Tim Mahasiswa STTPU Raih Juara II Kompetisi Beton Nasional di ITS Surabaya',
    kategori: 'prestasi',
    ringkasan: 'Tim Concrete Mix Competition STTPU Jakarta meraih Juara II dalam ajang kompetisi beton nasional yang diselenggarakan di Institut Teknologi Sepuluh Nopember (ITS) Surabaya.',
    konten: `Sebuah prestasi membanggakan ditorehkan oleh mahasiswa Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta. Tim "Infra-Build STTPU" berhasil meraih **Juara II** dalam Kompetisi Beton Nasional yang diselenggarakan oleh Himpunan Mahasiswa Teknik Sipil Institut Teknologi Sepuluh Nopember (ITS) Surabaya pada 28 Februari – 1 Maret 2026.

**Tentang Kompetisi**

Kompetisi Beton Nasional merupakan ajang bergengsi yang diikuti oleh lebih dari 45 tim dari perguruan tinggi teknik seluruh Indonesia. Peserta ditantang untuk merancang campuran beton (concrete mix design) yang memenuhi spesifikasi kuat tekan tertentu sekaligus menggunakan proporsi material ramah lingkungan.

**Tim STTPU**

Tim "Infra-Build STTPU" terdiri dari empat mahasiswa Program Studi Teknik Sipil semester 5:
- Arief Budiman (Ketua Tim)
- Dewi Anggraeni
- Fajar Nugroho
- Putri Ramadhani

Tim dibimbing oleh Dr. Budi Hartono, S.T., M.T., dosen spesialis material konstruksi STTPU.

**Prestasi yang Diraih**

Tim berhasil merancang campuran beton dengan kuat tekan 42 MPa menggunakan substitusi 20% abu sekam padi sebagai pengganti semen, mengurangi jejak karbon sekaligus mempertahankan performa struktural. Inovasi ini mendapat apresiasi tinggi dari dewan juri.

**Komentar Pembimbing**

"Saya bangga dengan kerja keras tim ini. Mereka berlatih selama dua bulan dengan dedikasi penuh. Hasil ini membuktikan bahwa kualitas pendidikan teknik di STTPU tidak kalah dengan perguruan tinggi besar," ujar Dr. Budi Hartono.

**Pesan Ketua Tim**

"Ini adalah pengalaman luar biasa. Kami belajar banyak dari kompetisi ini, terutama dalam hal inovasi material berkelanjutan. Kami akan terus berlatih untuk tampil lebih baik di kompetisi berikutnya," kata Arief Budiman.

Prestasi ini menjadi motivasi bagi seluruh mahasiswa STTPU untuk terus mengembangkan kemampuan teknis dan inovatif di bidang konstruksi dan infrastruktur.`,
    penulis: 'Tim Humas STTPU',
    tanggalTerbit: '2026-03-05',
    isPinned: false,
    tags: ['Prestasi', 'Kompetisi', 'Teknik Sipil', 'Beton', 'ITS'],
    readingTime: 4,
  },
  {
    slug: 'sttpu-teken-mou-dengan-pt-wijaya-karya',
    judul: 'STTPU Jakarta Tandatangani MoU dengan PT Wijaya Karya (Persero) Tbk',
    kategori: 'kerjasama',
    ringkasan: 'STTPU Jakarta resmi menjalin kerjasama strategis dengan PT Wijaya Karya (Persero) Tbk untuk program magang, rekrutmen lulusan, dan penelitian bersama di bidang konstruksi.',
    konten: `Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta resmi menandatangani Nota Kesepahaman (MoU) dengan PT Wijaya Karya (Persero) Tbk pada Senin, 10 Februari 2026, bertempat di Aula Serbaguna STTPU Jakarta.

Penandatanganan MoU dilakukan langsung oleh Ketua STTPU, Prof. Dr. Ir. Bambang Setiawan, M.T., dan Direktur Human Capital PT Wijaya Karya, Bapak Hendro Wibowo, disaksikan oleh jajaran pimpinan kedua institusi.

**Ruang Lingkup Kerjasama**

MoU ini mencakup beberapa poin kerjasama strategis:

1. **Program Magang Bersertifikat** — Mahasiswa STTPU semester 7 akan mendapatkan kesempatan magang di proyek-proyek konstruksi WIKA selama 6 bulan dengan kompensasi yang kompetitif.

2. **Rekrutmen Lulusan** — WIKA memberikan jalur rekrutmen prioritas bagi lulusan STTPU yang memenuhi standar kompetensi perusahaan.

3. **Penelitian Kolaboratif** — Dosen STTPU dan tim R&D WIKA akan mengembangkan penelitian bersama di bidang konstruksi berkelanjutan dan inovasi material.

4. **Kuliah Tamu & Workshop** — Praktisi senior WIKA akan berkontribusi sebagai dosen tamu dan narasumber workshop di STTPU.

**Komitmen Kedua Pihak**

Prof. Bambang Setiawan menyatakan, "Kerjasama ini merupakan bentuk nyata komitmen STTPU untuk mempersiapkan lulusan yang tidak hanya kompeten secara akademis, tetapi juga siap kerja sejak hari pertama."

Sementara Hendro Wibowo mengungkapkan, "Kami percaya bahwa lulusan vokasi dengan kompetensi teknis yang kuat adalah investasi terbaik bagi industri konstruksi Indonesia."

MoU ini berlaku selama 3 tahun dan dapat diperpanjang atas kesepakatan kedua pihak.`,
    penulis: 'Tim Humas STTPU',
    tanggalTerbit: '2026-02-10',
    isPinned: false,
    tags: ['MoU', 'Kerjasama Industri', 'Wijaya Karya', 'Magang'],
    readingTime: 4,
  },
  {
    slug: 'workshop-bim-revit-mahasiswa-sttpu',
    judul: 'Workshop BIM & Revit: Mempersiapkan Mahasiswa untuk Era Konstruksi Digital',
    kategori: 'akademik',
    ringkasan: 'Program Studi Manajemen Konstruksi STTPU menggelar workshop Building Information Modeling (BIM) menggunakan Autodesk Revit selama dua hari bagi mahasiswa semester 5 dan 6.',
    konten: `Program Studi Manajemen Konstruksi STTPU Jakarta sukses menyelenggarakan Workshop Building Information Modeling (BIM) dan Autodesk Revit selama dua hari, 24–25 Januari 2026, di Laboratorium Komputer STTPU.

**Tentang Workshop**

Workshop ini dihadiri oleh 45 mahasiswa dari semester 5 dan 6 program studi Manajemen Konstruksi dan Teknik Sipil. Kegiatan ini merupakan respons terhadap meningkatnya permintaan industri konstruksi akan tenaga kerja yang menguasai teknologi BIM.

**Narasumber**

Workshop menghadirkan dua narasumber berpengalaman:
- **Ir. Rudi Santoso, M.T.** — BIM Manager PT Nindya Karya (Persero), dengan pengalaman 10 tahun implementasi BIM di proyek konstruksi skala besar
- **Anisa Pertiwi, S.T.** — Autodesk Certified Instructor dan konsultan BIM independen

**Materi Workshop**

Hari pertama difokuskan pada konsep dasar BIM, manfaat implementasi dalam siklus proyek konstruksi, dan pengenalan antarmuka Revit. Hari kedua diisi dengan praktik langsung pemodelan gedung 3D sederhana, dari arsitektur hingga struktur dan MEP (Mechanical, Electrical, Plumbing).

**Respons Peserta**

"Saya tidak menyangka BIM bisa sekuat ini dalam membantu koordinasi antara tim arsitek, struktur, dan MEP. Ini pasti akan sangat berguna di dunia kerja nanti," ujar Farizal, mahasiswa semester 5.

**Rencana Lanjutan**

Berdasarkan antusiasme peserta, Kaprodi Manajemen Konstruksi Dr. Irwan Susanto mengumumkan bahwa BIM akan dimasukkan sebagai mata kuliah wajib mulai semester ganjil 2026/2027.`,
    penulis: 'Tim Akademik STTPU',
    tanggalTerbit: '2026-01-28',
    isPinned: false,
    tags: ['BIM', 'Revit', 'Workshop', 'Manajemen Konstruksi', 'Teknologi Konstruksi'],
    readingTime: 4,
  },
  {
    slug: 'riset-kualitas-air-sungai-ciliwung-sttpu-2026',
    judul: 'Peneliti STTPU Publikasikan Hasil Riset Kualitas Air Sungai Ciliwung di Jurnal Internasional',
    kategori: 'penelitian',
    ringkasan: 'Dr. Ir. Siti Rahayu, M.Sc. berhasil mempublikasikan hasil penelitian kualitas air Sungai Ciliwung pasca normalisasi di jurnal internasional Water Science & Technology.',
    konten: `Dr. Ir. Siti Rahayu, M.Sc., dosen dan peneliti Program Studi Teknik Lingkungan STTPU Jakarta, berhasil mempublikasikan hasil penelitiannya dalam jurnal internasional bereputasi **Water Science & Technology** yang diterbitkan oleh International Water Association (IWA).

**Judul Penelitian**

*"Performance Evaluation of Constructed Wetland for Urban Wastewater Treatment in Tropical Climate: A Case Study of Ciliwung River Catchment"*

**Latar Belakang Penelitian**

Penelitian ini mengkaji efektivitas teknologi constructed wetland (lahan basah buatan) sebagai solusi pengolahan air limbah perkotaan yang murah dan ramah lingkungan, khususnya di kawasan resapan Sungai Ciliwung pasca program normalisasi Pemerintah DKI Jakarta.

**Temuan Utama**

Hasil penelitian menunjukkan bahwa constructed wetland berhasil menurunkan kadar BOD (Biochemical Oxygen Demand) rata-rata sebesar 87% dan TSS (Total Suspended Solids) sebesar 91% dalam kondisi iklim tropis. Temuan ini signifikan karena sebagian besar data acuan sebelumnya didasarkan pada studi di iklim subtropis.

**Dampak untuk Kebijakan**

"Temuan ini bisa menjadi landasan ilmiah bagi Pemerintah DKI Jakarta dan Kementerian PUPR dalam memilih teknologi pengolahan air limbah yang efektif dan terjangkau untuk permukiman padat di sepanjang DAS Ciliwung," jelas Dr. Siti Rahayu.

**Kolaborasi Riset**

Penelitian ini merupakan hasil kolaborasi antara STTPU dengan Balai Teknologi Lingkungan BPPT dan Dinas Lingkungan Hidup DKI Jakarta, serta didukung pendanaan hibah penelitian dari Kemendikbudristek melalui skema Penelitian Terapan Unggulan Perguruan Tinggi (PTUPT).

Publikasi ini memperkuat posisi STTPU sebagai pusat riset terapan di bidang teknologi lingkungan dan sumber daya air.`,
    penulis: 'LPPM STTPU',
    tanggalTerbit: '2026-01-15',
    isPinned: false,
    tags: ['Penelitian', 'Kualitas Air', 'Ciliwung', 'Jurnal Internasional', 'Teknik Lingkungan'],
    readingTime: 5,
  },
  {
    slug: 'orientasi-mahasiswa-baru-sttpu-2025',
    judul: 'Orientasi Mahasiswa Baru 2025: Membangun Fondasi Akademik dan Karakter Sejak Hari Pertama',
    kategori: 'kemahasiswaan',
    ringkasan: 'STTPU Jakarta sukses menyelenggarakan Orientasi Mahasiswa Baru (OMBA) 2025 selama tiga hari yang diikuti oleh 312 mahasiswa baru dari empat program studi.',
    konten: `Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta sukses menyelenggarakan Orientasi Mahasiswa Baru (OMBA) Tahun Akademik 2025/2026 selama tiga hari, 21–23 Juli 2025, di lingkungan kampus STTPU.

**312 Mahasiswa Baru Bergabung**

Sebanyak 312 mahasiswa baru dari empat program studi resmi menjadi bagian dari keluarga besar STTPU:
- Teknik Sipil: 95 mahasiswa
- Teknik Pengairan: 72 mahasiswa
- Teknik Lingkungan: 78 mahasiswa
- Manajemen Konstruksi: 67 mahasiswa

**Rangkaian Kegiatan OMBA**

**Hari 1 — Pengenalan Institusi**
Mahasiswa baru diperkenalkan dengan sejarah, visi-misi, dan nilai-nilai STTPU. Sesi sambutan disampaikan langsung oleh Ketua STTPU, Prof. Dr. Ir. Bambang Setiawan, yang menekankan pentingnya integritas dan kerja keras dalam menempuh pendidikan di STTPU.

**Hari 2 — Akademik & Kemahasiswaan**
Berisi pengenalan sistem akademik (SIAKAD, e-learning), cara pengisian KRS, dan aturan akademik. Sore harinya, perwakilan seluruh UKM dan organisasi kemahasiswaan memperkenalkan diri.

**Hari 3 — Praktik Lapangan & Outbound**
Mahasiswa baru diajak mengunjungi laboratorium-laboratorium STTPU dan mengikuti kegiatan outbound yang dirancang untuk membangun solidaritas dan kerja tim.

**Kesan Mahasiswa Baru**

"Ternyata laboratoriumnya lengkap dan canggih. Saya makin semangat untuk belajar di sini," ujar Rani Setiawati, mahasiswi baru Teknik Lingkungan asal Bogor.

OMBA 2025 ditutup dengan malam keakraban yang penuh semangat, menjadi tanda dimulainya perjalanan akademik mahasiswa baru STTPU angkatan 2025.`,
    penulis: 'Bagian Kemahasiswaan STTPU',
    tanggalTerbit: '2025-07-25',
    isPinned: false,
    tags: ['Mahasiswa Baru', 'OMBA', 'Orientasi', 'Kemahasiswaan', '2025/2026'],
    readingTime: 4,
  },
  {
    slug: 'pendaftaran-kip-kuliah-2026-2027',
    judul: 'Pendaftaran KIP Kuliah Tahun Akademik 2026/2027: Syarat, Jadwal, dan Cara Daftar',
    kategori: 'pengumuman',
    ringkasan: 'Informasi lengkap mengenai pendaftaran program KIP Kuliah untuk mahasiswa baru TA 2026/2027 — syarat penerima, jadwal pendaftaran, dan prosedur pengajuan.',
    konten: `Program KIP Kuliah (Kartu Indonesia Pintar Kuliah) kembali dibuka untuk Tahun Akademik 2026/2027. Berikut adalah informasi lengkap mengenai prosedur pendaftaran bagi calon mahasiswa baru STTPU Jakarta.

**Apa Itu KIP Kuliah?**

KIP Kuliah adalah program bantuan biaya pendidikan dari Pemerintah Republik Indonesia melalui Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi (Kemendikbudristek) yang ditujukan bagi siswa berprestasi dari keluarga kurang mampu.

**Manfaat KIP Kuliah**
- Bebas biaya pendaftaran dan seleksi penerimaan mahasiswa baru
- Biaya kuliah/UKT ditanggung penuh (sesuai ketentuan)
- Biaya hidup bulanan sesuai klaster wilayah

**Syarat Penerima**
1. Siswa SMA/SMK/MA sederajat yang akan lulus atau sudah lulus (maksimal 2 tahun terakhir)
2. Memiliki potensi akademik yang baik
3. Memiliki keterbatasan ekonomi yang dibuktikan dengan:
   - Kartu KIP/KPS/PKH, atau
   - Surat keterangan tidak mampu dari pihak berwenang, atau
   - Data terdaftar di DTKS (Data Terpadu Kesejahteraan Sosial)

**Jadwal Pendaftaran KIP Kuliah 2026/2027**
- Pembukaan pendaftaran: Februari 2026
- Batas pendaftaran online: Maret 2026
- Seleksi administrasi: April 2026
- Pengumuman hasil: Mei 2026

**Cara Mendaftar**
1. Kunjungi portal kip-kuliah.kemdikbud.go.id
2. Buat akun menggunakan NIK dan nomor NISN
3. Lengkapi data diri dan unggah dokumen pendukung
4. Pilih perguruan tinggi dan program studi tujuan
5. Ikuti proses seleksi masuk perguruan tinggi

**Informasi Lebih Lanjut**

Untuk konsultasi dan bantuan pendaftaran KIP Kuliah di STTPU, silakan menghubungi Bagian Kemahasiswaan STTPU di:
- Telepon: (021) 2938-2938 ext. 102
- Email: kemahasiswaan@sttpu.ac.id
- Jam layanan: Senin–Jumat 08.00–16.00 WIB`,
    penulis: 'Bagian Kemahasiswaan STTPU',
    tanggalTerbit: '2026-02-01',
    isPinned: true,
    tags: ['KIP Kuliah', 'Beasiswa', 'Mahasiswa Baru', 'Kemendikbudristek'],
    readingTime: 4,
  },
  {
    slug: 'sttpu-raih-penghargaan-perguruan-tinggi-vokasi-terbaik-2025',
    judul: 'STTPU Raih Penghargaan "Perguruan Tinggi Vokasi Teknologi Terbaik" dari Kementerian PUPR',
    kategori: 'prestasi',
    ringkasan: 'STTPU Jakarta menerima penghargaan sebagai Perguruan Tinggi Vokasi Teknologi Terbaik dalam bidang konstruksi dan pekerjaan umum dari Kementerian Pekerjaan Umum dan Perumahan Rakyat.',
    konten: `Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta meraih penghargaan bergengsi sebagai **"Perguruan Tinggi Vokasi Teknologi Terbaik"** dalam bidang konstruksi dan pekerjaan umum dari Kementerian Pekerjaan Umum dan Perumahan Rakyat (PUPR) pada Malam Apresiasi SDM Infrastruktur, 5 Desember 2025, di Jakarta Convention Center.

**Penghargaan dari Kementerian PUPR**

Penghargaan ini diberikan berdasarkan penilaian komprehensif yang mencakup: kualitas lulusan yang terserap di sektor infrastruktur, relevansi kurikulum dengan kebutuhan industri, kontribusi riset terapan, dan tingkat kerjasama dengan instansi pemerintah dan swasta.

**Sambutan Ketua STTPU**

Prof. Dr. Ir. Bambang Setiawan, M.T. yang menerima langsung penghargaan tersebut menyatakan: "Penghargaan ini bukan milik saya atau pimpinan semata. Ini adalah hasil kerja keras seluruh civitas akademika STTPU — dosen, mahasiswa, staf, dan alumni yang telah membuktikan kualitas diri di lapangan. Ini adalah motivasi untuk terus meningkatkan standar pendidikan kami."

**Kontribusi Alumni**

Data Kementerian PUPR menunjukkan bahwa lebih dari 60% proyek infrastruktur nasional yang sedang berjalan melibatkan alumni STTPU sebagai pelaksana lapangan, pengawas, atau manajer proyek. Angka ini menjadi salah satu faktor kuat dalam penilaian.

**Apresiasi dari Industri**

Direktur PT Waskita Karya, mitra industri STTPU, turut mengucapkan selamat dan menegaskan komitmen perusahaan untuk terus menyerap lulusan STTPU dalam skala lebih besar di tahun-tahun mendatang.

Penghargaan ini semakin mengukuhkan posisi STTPU sebagai perguruan tinggi vokasi rujukan di bidang teknologi pekerjaan umum dan konstruksi nasional.`,
    penulis: 'Tim Humas STTPU',
    tanggalTerbit: '2025-12-08',
    isPinned: false,
    tags: ['Penghargaan', 'Kementerian PUPR', 'Prestasi Institusi', 'Vokasi'],
    readingTime: 4,
  },
];

export const artikelList: Artikel[] = artikelSeedList.map((artikel) => ({
  ...artikel,
  kategori: resolveArtikelKategori(artikel.kategori),
}));

export function getArtikelBySlug(slug: string): Artikel | undefined {
  return artikelList.find((a) => a.slug === slug);
}

export function getArtikelByKategori(kategori: string): Artikel[] {
  return artikelList.filter((a) => a.kategori.slug === kategori);
}

export function getArtikelTerkait(slug: string, kategori: string, limit = 3): Artikel[] {
  return artikelList
    .filter((a) => a.slug !== slug && a.kategori.slug === kategori)
    .slice(0, limit);
}

export function formatTanggal(iso: string): string {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return Math.max(1, Math.ceil(text.split(' ').length / 200));
}

import { convertLexicalToHTML, defaultHTMLConverters } from '@payloadcms/richtext-lexical/html';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapPayloadToArtikel(doc: any): Artikel {
  let kontenHtml = '';
  if (doc.konten) {
    try {
      kontenHtml = convertLexicalToHTML({ data: doc.konten, converters: defaultHTMLConverters });
    } catch {
      kontenHtml = '';
    }
  }

  const thumbnailUrl: string | undefined =
    doc.thumbnail && typeof doc.thumbnail === 'object' && doc.thumbnail.url
      ? (doc.thumbnail.url as string)
      : undefined;

  return {
    slug: doc.slug ?? '',
    judul: doc.judul ?? '',
    kategori: resolveArtikelKategori(doc.kategori),
    ringkasan: doc.ringkasan ?? '',
    konten: '',
    kontenHtml,
    thumbnailUrl,
    penulis: doc.penulis ?? 'Redaksi STTPU',
    tanggalTerbit: doc.tanggalTerbit ?? doc.createdAt ?? new Date().toISOString(),
    isPinned: doc.isPinned ?? false,
    tags: Array.isArray(doc.tags) ? doc.tags.map((t: { tag: string }) => t.tag) : [],
    readingTime: estimateReadingTime(kontenHtml),
  };
}
