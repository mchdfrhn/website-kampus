// @ts-nocheck
/* eslint-disable */
import 'dotenv/config'
import { getPayloadClient } from '../src/lib/payload'

const richText = (paragraphs: string[]) => ({
  root: {
    children: paragraphs.map((text) => ({
      children: [
        {
          detail: 0,
          format: 0,
          mode: 'normal' as const,
          style: '',
          text,
          type: 'text',
          version: 1,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      type: 'paragraph',
      version: 1,
    })),
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    type: 'root',
    version: 1,
  },
})

const subpages = [
  {
    slug: 'sejarah',
    title: 'Sejarah & Profil STTPU',
    subtitle:
      'Perjalanan institusi dari gagasan pendidikan teknologi pekerjaan umum hingga menjadi kampus yang berfokus pada inovasi infrastruktur berkelanjutan.',
    breadcrumb: 'Sejarah & Profil',
  },
  {
    slug: 'visi-misi',
    title: 'Visi, Misi & Nilai',
    subtitle:
      'Arah strategis, tujuan, dan nilai utama yang menjadi pedoman pendidikan, penelitian, pengabdian, dan tata kelola STTPU.',
    breadcrumb: 'Visi, Misi & Nilai',
  },
  {
    slug: 'pimpinan',
    title: 'Profil Pimpinan',
    subtitle:
      'Jajaran pimpinan STTPU yang mengawal pengembangan akademik, kemahasiswaan, kerja sama, dan tata kelola institusi.',
    breadcrumb: 'Profil Pimpinan',
  },
  {
    slug: 'akreditasi',
    title: 'Akreditasi & Legalitas',
    subtitle:
      'Informasi status akreditasi program studi, akreditasi institusi, dan dokumen legalitas STTPU yang dapat menjadi rujukan publik.',
    breadcrumb: 'Akreditasi & Legalitas',
  },
  {
    slug: 'struktur-organisasi',
    title: 'Struktur Organisasi',
    subtitle:
      'Susunan kepemimpinan, senat akademik, unit pelaksana teknis, dan bagian administrasi yang mendukung layanan kampus.',
    breadcrumb: 'Struktur Organisasi',
  },
  {
    slug: 'fasilitas',
    title: 'Fasilitas Kampus',
    subtitle:
      'Sarana pembelajaran, laboratorium, dan fasilitas pendukung yang menunjang praktik, riset terapan, dan aktivitas mahasiswa.',
    breadcrumb: 'Fasilitas Kampus',
  },
  {
    slug: 'kerjasama',
    title: 'Kerjasama & Mitra',
    subtitle:
      'Kolaborasi dengan pemerintah, industri, akademisi, dan komunitas untuk memperkuat pembelajaran serta kontribusi STTPU.',
    breadcrumb: 'Kerjasama & Mitra',
  },
]

const overviewSections = [
  {
    title: 'Sejarah & Profil',
    desc:
      'Kenali perjalanan STTPU, akar historis Sapta Taruna, dan fokus institusi pada pendidikan teknologi pekerjaan umum.',
    href: '/tentang/sejarah',
  },
  {
    title: 'Visi, Misi & Nilai',
    desc:
      'Arah pengembangan kampus, misi tridharma, tujuan pendidikan, dan nilai yang membentuk budaya akademik STTPU.',
    href: '/tentang/visi-misi',
  },
  {
    title: 'Profil Pimpinan',
    desc:
      'Jajaran pimpinan yang mengelola strategi akademik, tata kelola, kemahasiswaan, dan kerja sama institusi.',
    href: '/tentang/pimpinan',
  },
  {
    title: 'Akreditasi & Legalitas',
    desc:
      'Status akreditasi program studi dan dokumen legalitas institusi sebagai bagian dari transparansi mutu pendidikan.',
    href: '/tentang/akreditasi',
  },
  {
    title: 'Struktur Organisasi',
    desc:
      'Peta organisasi, unit pelaksana teknis, dan bagian administrasi yang mendukung layanan akademik serta operasional.',
    href: '/tentang/struktur-organisasi',
  },
  {
    title: 'Fasilitas Kampus',
    desc:
      'Laboratorium dan sarana pendukung yang membantu mahasiswa belajar melalui praktik, simulasi, dan proyek terapan.',
    href: '/tentang/fasilitas',
  },
  {
    title: 'Kerjasama & Mitra',
    desc:
      'Ruang kolaborasi STTPU bersama pemerintah, industri, akademisi, dan mitra strategis lain di bidang infrastruktur.',
    href: '/tentang/kerjasama',
  },
]

const milestones = [
  {
    tahun: '1990',
    judul: 'Lahirnya Akademi Teknologi Sapta Taruna',
    deskripsi:
      'Gagasan pendidikan teknologi Sapta Taruna tumbuh dari semangat pengabdian insan pekerjaan umum untuk menyiapkan tenaga teknis yang dekat dengan kebutuhan pembangunan.',
  },
  {
    tahun: '2003',
    judul: 'Pengembangan Menjadi Sekolah Tinggi Teknologi',
    deskripsi:
      'Institusi berkembang menjadi sekolah tinggi teknologi dengan cakupan pendidikan yang lebih luas dan tata kelola akademik yang semakin terstruktur.',
  },
  {
    tahun: '2024',
    judul: 'Penguatan Identitas STT Pekerjaan Umum',
    deskripsi:
      'Nama dan arah institusi diperkuat untuk menegaskan fokus pada bidang pekerjaan umum, infrastruktur, konstruksi, lingkungan, dan teknologi pendukungnya.',
  },
  {
    tahun: '2025',
    judul: 'Penguatan Mutu dan Layanan Digital',
    deskripsi:
      'STTPU memperluas publikasi informasi akademik, layanan digital kampus, dan kanal komunikasi agar lebih mudah diakses calon mahasiswa, mahasiswa, alumni, dan mitra.',
  },
]

const misi = [
  {
    poin:
      'Menyelenggarakan pendidikan tinggi teknologi pekerjaan umum yang aplikatif, adaptif, dan berorientasi pada kebutuhan pembangunan infrastruktur berkelanjutan.',
  },
  {
    poin:
      'Mengembangkan penelitian terapan yang menghasilkan solusi untuk permasalahan infrastruktur, lingkungan, konstruksi, dan teknologi pendukung pekerjaan umum.',
  },
  {
    poin:
      'Melaksanakan pengabdian kepada masyarakat melalui penerapan ilmu pengetahuan dan inovasi yang relevan bagi pemerintah, industri, dan komunitas.',
  },
  {
    poin:
      'Membangun kolaborasi dengan mitra akademik, industri, pemerintah, dan alumni untuk memperkuat kualitas pembelajaran serta peluang karier lulusan.',
  },
  {
    poin:
      'Mewujudkan tata kelola perguruan tinggi yang transparan, akuntabel, dan berorientasi pada peningkatan mutu berkelanjutan.',
  },
]

const tujuan = [
  {
    poin:
      'Menghasilkan lulusan yang kompeten, profesional, berintegritas, dan mampu berkontribusi pada pengembangan infrastruktur pekerjaan umum.',
  },
  {
    poin:
      'Menghasilkan kurikulum yang selaras dengan kebutuhan industri, kebijakan pembangunan, dan perkembangan teknologi.',
  },
  {
    poin:
      'Meningkatkan kapasitas penelitian terapan dosen dan mahasiswa melalui proyek yang relevan dengan persoalan nyata di lapangan.',
  },
  {
    poin:
      'Memperkuat layanan akademik, kemahasiswaan, dan administrasi yang responsif bagi seluruh sivitas akademika.',
  },
  {
    poin:
      'Memperluas jejaring kerja sama yang mendukung magang, riset, pengabdian masyarakat, dan pengembangan karier lulusan.',
  },
]

const nilaiNilai = [
  {
    nama: 'Integritas',
    deskripsi:
      'Menjunjung kejujuran akademik, tanggung jawab profesional, dan etika dalam setiap kegiatan kampus.',
  },
  {
    nama: 'Kompetensi',
    deskripsi:
      'Mengutamakan penguasaan ilmu, keterampilan praktik, dan kemampuan menyelesaikan masalah secara tepat.',
  },
  {
    nama: 'Inovasi',
    deskripsi:
      'Mendorong gagasan baru, riset terapan, dan pemanfaatan teknologi untuk menjawab kebutuhan pembangunan.',
  },
  {
    nama: 'Kolaborasi',
    deskripsi:
      'Membangun kerja bersama antara mahasiswa, dosen, alumni, mitra, dan masyarakat.',
  },
  {
    nama: 'Keberlanjutan',
    deskripsi:
      'Memperhatikan dampak lingkungan, sosial, dan ekonomi dalam pendidikan serta praktik pekerjaan umum.',
  },
]

function keepExistingFile(existingItem: any, nextItem: any, key: string) {
  return {
    ...nextItem,
    [key]: existingItem?.[key] || nextItem[key] || null,
  }
}

async function main() {
  const payload = await getPayloadClient()
  const existing = await payload.findGlobal({ slug: 'tentang-kami', depth: 0 }) as any

  const existingAkreditasi = existing.akreditasiProdi || []
  const existingLegalitas = existing.legalitas || []
  const existingFasilitas = existing.fasilitas || []

  const akreditasiProdi = [
    keepExistingFile(
      existingAkreditasi.find((item: any) => item.prodi === 'Teknik Sipil'),
      {
        prodi: 'Teknik Sipil',
        jenjang: 'S1',
        akreditasi: 'Baik',
        nomorSK: 'LAM Teknik No. 0856/SK/LAM Teknik/AS/XII/2024',
        berlakuHingga: '20 Desember 2027',
      },
      'fileSK',
    ),
    keepExistingFile(
      existingAkreditasi.find((item: any) => item.prodi?.toLowerCase().includes('ling')),
      {
        prodi: 'Teknik Lingkungan',
        jenjang: 'S1',
        akreditasi: 'Baik',
        nomorSK: 'No. 0857/SK/LAM Teknik/AS/XII/2024',
        berlakuHingga: '20 Desember 2027',
      },
      'fileSK',
    ),
    keepExistingFile(
      existingAkreditasi.find((item: any) => item.prodi === 'Teknik Informatika'),
      {
        prodi: 'Teknik Informatika',
        jenjang: 'S1',
        akreditasi: 'Baik',
        nomorSK: 'Nomor: 001/SK/LAM-INFOKOM/Ak.PNB/S1/2025',
        berlakuHingga: '14 Desember 2027',
      },
      'fileSK',
    ),
  ]

  const fasilitas = [
    keepExistingFile(
      existingFasilitas.find((item: any) => item.nama === 'Laboratorium Teknik Sipil'),
      {
        nama: 'Laboratorium Teknik Sipil',
        deskripsi:
          'Ruang praktik untuk pengujian material, struktur, dan simulasi pekerjaan konstruksi yang mendukung pembelajaran berbasis proyek.',
        kapasitas: '30 mahasiswa',
        kategori: 'laboratorium',
        items: [
          { nama: 'Uji material' },
          { nama: 'Praktik struktur' },
          { nama: 'Simulasi konstruksi' },
        ],
      },
      'foto',
    ),
    keepExistingFile(
      existingFasilitas.find((item: any) => item.nama?.toLowerCase().includes('ling')),
      {
        nama: 'Laboratorium Teknik Lingkungan',
        deskripsi:
          'Laboratorium untuk praktik pengujian kualitas air, sanitasi, persampahan, dan pengelolaan lingkungan berbasis data.',
        kapasitas: '25 mahasiswa',
        kategori: 'laboratorium',
        items: [
          { nama: 'Uji kualitas air' },
          { nama: 'Sanitasi' },
          { nama: 'Pengelolaan limbah' },
        ],
      },
      'foto',
    ),
    keepExistingFile(
      existingFasilitas.find((item: any) => item.nama === 'Laboratorium Teknik Informatika'),
      {
        nama: 'Laboratorium Teknik Informatika',
        deskripsi:
          'Ruang komputer untuk pembelajaran pemrograman, sistem informasi, komputasi teknik, dan pengembangan solusi digital kampus.',
        kapasitas: '35 mahasiswa',
        kategori: 'digital',
        items: [
          { nama: 'Pemrograman' },
          { nama: 'Sistem informasi' },
          { nama: 'Komputasi teknik' },
        ],
      },
      'foto',
    ),
    {
      nama: 'Perpustakaan & Referensi Digital',
      deskripsi:
        'Akses koleksi buku, referensi teknis, karya ilmiah, dan sumber belajar digital untuk mendukung studi mandiri mahasiswa.',
      kapasitas: '40 pengguna',
      kategori: 'perpustakaan',
      items: [
        { nama: 'Referensi teknik' },
        { nama: 'Karya ilmiah' },
        { nama: 'Ruang baca' },
      ],
    },
    {
      nama: 'Ruang Diskusi dan Seminar',
      deskripsi:
        'Fasilitas pendukung kegiatan kuliah tamu, workshop, diskusi proyek, presentasi mahasiswa, dan koordinasi organisasi.',
      kapasitas: '60 peserta',
      kategori: 'penunjang',
      items: [
        { nama: 'Presentasi' },
        { nama: 'Workshop' },
        { nama: 'Diskusi proyek' },
      ],
    },
  ]

  const legalitas = [
    keepExistingFile(
      existingLegalitas.find((item: any) => item.dokumen === 'SK BAN PT NASIONAL'),
      {
        dokumen: 'SK BAN-PT Akreditasi Perguruan Tinggi',
        nomor: '2803/SK/BAN-PT/Ak/PT/X/2025',
        tanggal: '07 Oktober 2025',
        keterangan:
          'Dokumen akreditasi perguruan tinggi sebagai rujukan status mutu institusi STTPU.',
      },
      'file',
    ),
    {
      dokumen: 'Dokumen Tata Kelola dan Penjaminan Mutu',
      nomor: '-',
      tanggal: '-',
      keterangan:
        'Rujukan internal untuk pelaksanaan tata kelola, evaluasi mutu, dan peningkatan layanan akademik.',
    },
  ]

  await payload.updateGlobal({
    slug: 'tentang-kami',
    data: {
      ...existing,
      overviewTitle: 'Tentang STT Pekerjaan Umum',
      overviewDescription:
        'STTPU adalah perguruan tinggi teknologi yang berfokus pada pendidikan, riset terapan, dan pengabdian di bidang pekerjaan umum, infrastruktur, lingkungan, konstruksi, dan teknologi pendukung.',
      overviewStats: [
        { value: '1990', label: 'Akar Sejarah' },
        { value: '3', label: 'Program Studi Aktif' },
        { value: '5+', label: 'Fokus Keilmuan' },
        { value: 'Baik', label: 'Akreditasi Prodi' },
      ],
      overviewCommitmentTitle: 'Komitmen Kami',
      overviewCommitmentText:
        'STTPU berkomitmen menghadirkan pendidikan tinggi teknologi yang dekat dengan kebutuhan pembangunan. Melalui kurikulum aplikatif, praktik laboratorium, riset terapan, dan kolaborasi dengan mitra, kampus menyiapkan lulusan yang mampu bekerja profesional serta berkontribusi pada infrastruktur pekerjaan umum yang andal dan berkelanjutan.',
      overviewSections,
      subpages,
      sidebarTitle: 'Navigasi Tentang',
      sejarahDeskripsi: richText([
        'Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) lahir dari semangat Sapta Taruna dan kebutuhan akan sumber daya manusia yang menguasai bidang pekerjaan umum. Identitas ini menempatkan kampus sebagai ruang pembelajaran teknologi yang dekat dengan persoalan infrastruktur, konstruksi, lingkungan, dan tata kelola pembangunan.',
        'Dalam perkembangannya, STTPU terus memperkuat kurikulum, fasilitas laboratorium, layanan akademik, dan kerja sama dengan berbagai pihak. Fokus pendidikan diarahkan agar mahasiswa tidak hanya memahami teori, tetapi juga mampu menerapkannya melalui praktik, proyek, riset terapan, dan pengabdian kepada masyarakat.',
        'Saat ini STTPU mengembangkan diri sebagai kampus teknologi pekerjaan umum yang adaptif terhadap perubahan kebutuhan industri, perkembangan digital, dan tuntutan pembangunan berkelanjutan.',
      ]),
      milestones,
      visi:
        existing.visi ||
        'Sekolah Tinggi Teknologi Pekerjaan Umum sebagai pelopor inovasi infrastruktur pekerjaan umum yang handal dan berkelanjutan.',
      misi,
      tujuan,
      nilaiNilai,
      strukturCatatan:
        'Struktur organisasi STTPU disusun untuk mendukung layanan akademik, kemahasiswaan, administrasi, penjaminan mutu, laboratorium, perpustakaan, dan kerja sama institusi.',
      strukturSenat: existing.strukturSenat?.jabatan
        ? existing.strukturSenat
        : {
            jabatan: 'Senat Akademik',
            nama: 'Pimpinan dan perwakilan akademik STTPU',
          },
      strukturUPT: [
        { unit: 'UPT Perpustakaan', kepala: existing.strukturUPT?.[0]?.kepala || '' },
        { unit: 'UPT Teknologi Informasi dan Komunikasi', kepala: existing.strukturUPT?.[1]?.kepala || '' },
        { unit: 'UPT Laboratorium Terpadu', kepala: existing.strukturUPT?.[2]?.kepala || '' },
        { unit: 'UPT Penjaminan Mutu dan Kerja Sama', kepala: existing.strukturUPT?.[3]?.kepala || '' },
      ],
      strukturBagian: [
        {
          bagian: 'Bagian Administrasi Akademik dan Kemahasiswaan',
          kepala: existing.strukturBagian?.[0]?.kepala || '',
        },
        {
          bagian: 'Bagian Keuangan, Kepegawaian, dan Umum',
          kepala: existing.strukturBagian?.[1]?.kepala || '',
        },
        {
          bagian: 'Bagian Perencanaan, Humas, dan Kerja Sama',
          kepala: existing.strukturBagian?.[2]?.kepala || '',
        },
      ],
      fasilitasIntro:
        'Fasilitas STTPU disiapkan untuk mendukung pembelajaran berbasis praktik, riset terapan, dan pengembangan kompetensi mahasiswa. Pengelolaan fasilitas diarahkan agar kegiatan akademik berlangsung lebih efektif, aman, dan relevan dengan kebutuhan lapangan.',
      fasilitasCtaTitle: 'Ingin Melihat Fasilitas Kampus?',
      fasilitasCtaDescription:
        'Hubungi tim informasi STTPU untuk jadwal kunjungan, konsultasi program studi, atau kebutuhan dokumentasi fasilitas kampus.',
      fasilitasCtaButtonLabel: 'Hubungi Kampus',
      fasilitasCtaButtonHref: '/kontak',
      fasilitas,
      kerjasamaIntro:
        'STTPU membuka ruang kolaborasi dengan pemerintah, industri, perguruan tinggi, asosiasi profesi, alumni, dan komunitas untuk memperkuat pembelajaran, riset terapan, magang, pengabdian masyarakat, serta pengembangan karier lulusan.',
      kerjasamaFormUrl: '/kontak',
      kerjasamaMitra: [
        {
          nama: 'Kementerian Pekerjaan Umum',
          kategori: 'pemerintah',
          tahun: 'Kemitraan strategis',
          deskripsi:
            'Kolaborasi dalam penguatan ekosistem pendidikan teknologi pekerjaan umum dan pengembangan sumber daya manusia infrastruktur.',
        },
        {
          nama: 'Mitra Industri Konstruksi dan Infrastruktur',
          kategori: 'industri',
          tahun: 'Berkelanjutan',
          deskripsi:
            'Kerja sama untuk kuliah tamu, magang, studi kasus proyek, dan penguatan keterampilan kerja mahasiswa.',
        },
        {
          nama: 'Perguruan Tinggi dan Komunitas Akademik',
          kategori: 'akademik',
          tahun: 'Berkelanjutan',
          deskripsi:
            'Kolaborasi dalam seminar, riset terapan, publikasi, pertukaran pengetahuan, dan kegiatan akademik bersama.',
        },
      ],
      akreditasiIntro:
        'STTPU menempatkan penjaminan mutu sebagai bagian penting dari tata kelola institusi. Informasi berikut memuat status akreditasi program studi dan dokumen legalitas yang tersedia untuk publik.',
      akreditasiProdi,
      legalitas,
    },
  })

  console.log('Tentang Kami payload updated.')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
