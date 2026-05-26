export type ProgramStudi = {
  slug: string;
  nama: string;
  jenjang: string;
  accentColor?: string;
  akreditasi: string;
  deskripsiSingkat: string;
  deskripsi: string;
  deskripsiHtml?: string;
  thumbnailUrl?: string;
  visi: string;
  misi: string[];
  kompetensiLulusan: string[];
  prospekKarir: string[];
  // Fields managed by static data only (not in Payload collection)
  kurikulum: { semester: number; mataKuliah: string[] }[];
  nomorSKAkreditasi: string;
  berlakuHingga: string;
  jumlahSKS: number;
  masaStudi: string;
  gelarLulusan?: string;
  kurikulumPdfUrl?: string;
};

export function normalizeProgramStudiSlug(value?: string | null): string {
  return (value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatJenjang(value?: string | null): string {
  const normalized = (value || '').trim().toLowerCase();

  const jenjangMap: Record<string, string> = {
    d3: 'D3',
    d4: 'D4',
    'd-3': 'D3',
    'd-4': 'D4',
    'd iii': 'D3',
    'd iv': 'D4',
    s1: 'S1',
    s2: 'S2',
    s3: 'S3',
    's-1': 'S1',
    's-2': 'S2',
    's-3': 'S3',
  };

  if (jenjangMap[normalized]) return jenjangMap[normalized];
  return (value || '').trim().toUpperCase();
}

export function resolveProgramStudiAccentColor(
  nama?: string | null,
  accentColor?: string | null,
): string {
  const explicit = (accentColor || '').trim().toLowerCase();
  if (explicit) return explicit;

  const normalizedName = (nama || '').trim().toLowerCase();

  if (normalizedName.includes('teknik sipil')) return 'blue';
  if (normalizedName.includes('teknik lingkungan')) return 'green';
  if (normalizedName.includes('teknik informatika')) return 'orange';

  return 'navy';
}

export const programStudiList: ProgramStudi[] = [
  {
    slug: 'teknik-sipil',
    nama: 'Teknik Sipil',
    jenjang: 'D-IV',
    akreditasi: 'Unggul',
    deskripsiSingkat:
      'Program studi yang menghasilkan ahli madya teknik sipil kompeten di bidang perencanaan, perancangan, dan pelaksanaan konstruksi infrastruktur.',
    deskripsi:
      'Program Studi Teknik Sipil D-IV STTPU Jakarta dirancang untuk menghasilkan tenaga ahli yang memiliki kompetensi mendalam dalam perencanaan, perancangan, pengawasan, dan manajemen konstruksi infrastruktur. Program ini berorientasi pada kebutuhan industri konstruksi nasional yang terus berkembang, dengan kurikulum yang mengintegrasikan teori akademik dengan praktik lapangan yang intensif.',
    visi:
      'Menjadi program studi Teknik Sipil vokasi yang unggul dan terkemuka dalam menghasilkan sarjana terapan yang kompeten, inovatif, dan berdaya saing nasional di bidang konstruksi dan infrastruktur pada tahun 2030.',
    misi: [
      'Menyelenggarakan pendidikan vokasi Teknik Sipil yang berorientasi pada kompetensi teknis dan kemampuan aplikasi lapangan.',
      'Melaksanakan penelitian terapan yang relevan dengan permasalahan konstruksi dan infrastruktur Indonesia.',
      'Mengembangkan kemitraan strategis dengan industri konstruksi, pemerintah, dan asosiasi profesi.',
      'Menerapkan sistem penjaminan mutu pendidikan yang berkelanjutan and terstandarisasi.',
    ],
    kompetensiLulusan: [
      'Mampu merencanakan dan merancang struktur bangunan gedung bertingkat rendah hingga menengah',
      'Mampu menghitung estimasi biaya dan menyusun Rencana Anggaran Biaya (RAB) konstruksi',
      'Mampu mengawasi pelaksanaan konstruksi sesuai standar K3 dan mutu',
      'Mampu mengoperasikan perangkat lunak teknik sipil (AutoCAD, SAP2000, MS Project)',
      'Mampu membaca dan membuat gambar teknik dan detail konstruksi',
      'Memahami peraturan konstruksi nasional (SNI) dan prosedur pengadaan jasa konstruksi',
    ],
    prospekKarir: [
      'Pelaksana / Pengawas Lapangan di Kontraktor BUMN & Swasta',
      'Estimator & Cost Engineer',
      'Drafter & Junior Structural Engineer',
      'Pengawas Proyek Kementerian PUPR',
      'Konsultan Pengawas Konstruksi',
      'Site Manager Perumahan & Properti',
      'PNS di Dinas Pekerjaan Umum Daerah',
      'Wirausaha Bidang Konstruksi',
    ],
    kurikulum: [
      {
        semester: 1,
        mataKuliah: [
          'Matematika Terapan I',
          'Fisika Teknik',
          'Menggambar Teknik',
          'Mekanika Rekayasa I',
          'Material Konstruksi',
          'Pendidikan Pancasila',
        ],
      },
      {
        semester: 2,
        mataKuliah: [
          'Matematika Terapan II',
          'Mekanika Rekayasa II',
          'Mekanika Tanah I',
          'Hidrolika',
          'AutoCAD 2D & 3D',
          'Bahasa Inggris Teknik',
        ],
      },
      {
        semester: 3,
        mataKuliah: [
          'Struktur Beton Bertulang I',
          'Mekanika Tanah II',
          'Teknik Pondasi',
          'Estimasi Biaya Konstruksi',
          'Manajemen Konstruksi',
          'Pengukuran & Pemetaan',
        ],
      },
      {
        semester: 4,
        mataKuliah: [
          'Struktur Beton Bertulang II',
          'Struktur Baja',
          'Perancangan Jalan Raya',
          'Drainase Perkotaan',
          'SAP2000 & ETABS',
          'Kontrak & Dokumen Pengadaan',
        ],
      },
      {
        semester: 5,
        mataKuliah: [
          'Konstruksi Jembatan',
          'Manajemen Proyek & Penjadwalan',
          'Analisis Harga Satuan',
          'Perancangan Bangunan Gedung',
          'BIM (Revit Architecture)',
          'K3 Konstruksi',
        ],
      },
      {
        semester: 6,
        mataKuliah: [
          'Rekayasa Pondasi Dalam',
          'Manajemen Risiko Proyek',
          'Sistem Drainase Jalan',
          'Metodologi Penelitian',
          'Pengendalian Mutu Konstruksi',
          'Kewirausahaan Konstruksi',
        ],
      },
      { semester: 7, mataKuliah: ['Praktik Kerja Lapangan (PKL)', 'Seminar PKL'] },
      { semester: 8, mataKuliah: ['Tugas Akhir (Proyek Terapan)'] },
    ],
    nomorSKAkreditasi: '1234/SK/BAN-PT/Akred/Dpl-IV/V/2023',
    berlakuHingga: '2028',
    jumlahSKS: 144,
    masaStudi: '4 Tahun (8 Semester)',
    gelarLulusan: 'S.Tr.T.',
  },
  {
    slug: 'teknik-lingkungan',
    nama: 'Teknik Lingkungan',
    jenjang: 'D-IV',
    akreditasi: 'Baik Sekali',
    deskripsiSingkat:
      'Program studi yang menghasilkan ahli teknologi lingkungan kompeten di bidang pengelolaan air bersih, sanitasi, persampahan, dan kualitas udara.',
    deskripsi:
      'Program Studi Teknik Lingkungan D-IV STTPU Jakarta menghasilkan lulusan yang mampu merancang dan mengelola sistem infrastruktur lingkungan perkotaan dan perdesaan. Bidang keahlian meliputi sistem penyediaan air minum (SPAM), instalasi pengolahan air limbah (IPAL), pengelolaan sampah terpadu, dan pengendalian pencemaran udara dan tanah.',
    visi:
      'Menjadi program studi Teknik Lingkungan vokasi terdepan yang menghasilkan ahli teknologi lingkungan yang kompeten, berwawasan keberlanjutan, dan berkontribusi pada Indonesia bersih dan sehat.',
    misi: [
      'Menyelenggarakan pendidikan vokasi Teknik Lingkungan yang berorientasi pada solusi masalah lingkungan nyata.',
      'Melaksanakan penelitian terapan di bidang pengelolaan air, sanitasi, dan persampahan.',
      'Mengembangkan kemitraan dengan Kementerian PUPR, KLHK, PDAM, dan industri pengelolaan lingkungan.',
      'Mengintegrasikan konsep pembangunan berkelanjutan (SDGs) dalam setiap aspek kurikulum.',
    ],
    kompetensiLulusan: [
      'Mampu merancang sistem penyediaan air minum (SPAM) skala perkotaan',
      'Mampu merancang IPAL domestik dan industri skala kecil-menengah',
      'Mampu melakukan analisis kualitas air, udara, dan tanah',
      'Mampu menyusun dokumen AMDAL/UKL-UPL',
      'Mampu merancang sistem pengelolaan sampah terpadu',
      'Menguasai regulasi lingkungan hidup dan standar baku mutu nasional',
    ],
    prospekKarir: [
      'Staf Teknis PDAM / BUMD Air Minum',
      'Pengawas Proyek Sanitasi Kementerian PUPR',
      'Analis Lingkungan di Perusahaan Industri',
      'Konsultan AMDAL & UKL-UPL',
      'Operator IPAL Kawasan Industri',
      'Staf Teknis Dinas Lingkungan Hidup',
      'Pengelola TPA & Fasilitas Daur Ulang',
    ],
    kurikulum: [
      { semester: 1, mataKuliah: ['Matematika Terapan', 'Kimia Lingkungan', 'Fisika Lingkungan', 'Biologi Lingkungan', 'Menggambar Teknik', 'Pendidikan Pancasila'] },
      { semester: 2, mataKuliah: ['Hidrologi Lingkungan', 'Hidrolika', 'Mekanika Fluida', 'Pengantar Teknik Lingkungan', 'Mikrobiologi Lingkungan', 'Bahasa Inggris Teknik'] },
      { semester: 3, mataKuliah: ['Teknologi Air Minum', 'Pengelolaan Air Limbah I', 'Teknik Analisis Kualitas Air', 'Pengolahan Sampah Padat', 'AutoCAD & SIG Lingkungan', 'Kesehatan Lingkungan'] },
      { semester: 4, mataKuliah: ['Pengelolaan Air Limbah II', 'Pencemaran Udara & Pengendalian', 'SPAM Perkotaan', 'Pencemaran Tanah & Remediasi', 'Perancangan IPAL', 'Regulasi Lingkungan Hidup'] },
      { semester: 5, mataKuliah: ['AMDAL & UKL-UPL', 'Sanitasi Permukiman', 'Perancangan TPA Sanitary Landfill', 'Sistem Drainase Lingkungan', 'Ekotoksikologi', 'Kewirausahaan Lingkungan'] },
      { semester: 6, mataKuliah: ['Manajemen Lingkungan ISO 14001', 'Perubahan Iklim & Mitigasi', 'Teknologi Daur Ulang', 'Metodologi Penelitian', 'Audit Lingkungan', 'Seminar Proposal'] },
      { semester: 7, mataKuliah: ['Praktik Kerja Lapangan (PKL)', 'Seminar PKL'] },
      { semester: 8, mataKuliah: ['Tugas Akhir (Proyek Terapan)'] },
    ],
    nomorSKAkreditasi: '1236/SK/BAN-PT/Akred/Dpl-IV/VI/2022',
    berlakuHingga: '2027',
    jumlahSKS: 144,
    masaStudi: '4 Tahun (8 Semester)',
    gelarLulusan: 'S.Tr.T.',
  },
  {
    slug: 'teknik-informatika',
    nama: 'Teknik Informatika',
    jenjang: 'D-IV',
    akreditasi: 'Baik',
    deskripsiSingkat:
      'Menyelenggarakan pendidikan tinggi yang berfokus pada integrasi teoretis dan praktis dalam transformasi informasi digital melalui penguasaan algoritma, arsitektur sistem komputasi, dan keamanan siber.',
    deskripsi:
      'Merupakan disiplin akademik yang berorientasi pada studi sistematis mengenai proses algoritma yang mendasari transformasi informasi. Prodi ini tidak sekadar mengajarkan teknis pemrograman, melainkan membedah abstraksi logika dan matematika untuk menciptakan solusi komputasi yang efisien, skalabel, dan adaptif terhadap dinamika industri 5.0.',
    visi:
      'Terwujudnya Program Studi Teknik Informatika Yang Berdaya Saing Di Tingkat Nasional Dalam Pengembangan Perangkat Lunak Dan Infrastruktur Teknologi Informasi Yang Berintegritas Profesional Dan Kompeten Pada Tahun 2040.',
    misi: [
      'Menyelenggarakan pendidikan menghasilkan lulusan Sarjana Teknik Informatika yang memiliki kemampuan dalam bidang pengembangan perangkat lunak dan infrastruktur teknologi informasi.',
      'Menyelenggarakan penelitian dan pengembangan keilmuan dalam bidang Informatika.',
      'Menyelenggarakan pengabdian pada masyarakat untuk menerapkan IPTEK bidang Teknik Informatika.',
      'Mengembangkan keilmuan Teknik Informatika bidang ke-PU-an.',
    ],
    kompetensiLulusan: [
      'Memiliki kemampuan untuk melakukan dekomposisi masalah kompleks dan mentransformasikannya ke dalam model matematika serta logika komputasi yang presisi.',
      'Mampu merancang, mengimplementasikan, dan mengevaluasi algoritma dengan mempertimbangkan aspek kompleksitas ruang dan waktu ($O$ notation), guna menjamin efisiensi sumber daya pada sistem berskala besar.',
      'Menguasai metodologi pengembangan perangkat lunak modern (seperti Agile atau DevOps) secara sistematis, mulai dari analisis kebutuhan (requirements gathering) hingga pemeliharaan (maintenance).',
      'Mampu membangun arsitektur perangkat lunak yang robust, scalable, dan maintainable dengan menerapkan design patterns serta prinsip clean code untuk memitigasi utang teknis (technical debt).',
      'Memiliki kemahiran dalam merancang arsitektur jaringan komputer dan sistem basis data yang terintegrasi, dengan mengedepankan performa distribusi data yang optimal.',
      'Mampu menerapkan protokol keamanan informasi yang ketat untuk melindungi integritas dan kerahasiaan data dari ancaman siber yang bersifat asimetris dan dinamis.',
      'Mampu menerapkan teknik data mining dan machine learning untuk melakukan inferensi terhadap data mentah menjadi informasi strategis yang mendukung pengambilan keputusan berbasis bukti (evidence-based decision making).',
      'Menguasai landasan statistik dan probabilitas dalam mengembangkan model prediktif yang mampu beradaptasi dengan ketidakpastian data di lapangan.',
      'Menjunjung tinggi kode etik profesi IT, memiliki kesadaran hukum terhadap hak kekayaan intelektual, serta memahami implikasi sosial-etis dari teknologi yang dikembangkan.',
      'Memiliki kapasitas reflektif untuk melakukan pembaruan pengetahuan secara mandiri (self-directed learning) di tengah akselerasi teknologi yang konstan, menyadari bahwa pengetahuan adalah proses menjadi yang tiada henti.',
    ],
    prospekKarir: [
      'Arsitektur dan Perekayasaan Sistem (System & Software Engineering) Lulusan memiliki kapasitas untuk menjabat sebagai Software Architect atau Senior Developer.',
      'Analisis Data dan Inteligensi Bisnis (Data Science & Business Intelligence) Sebagai Data Scientist atau Data Analyst, lulusan berperan dalam mentransformasi data mentah (raw data) menjadi wawasan strategis (strategic insights).',
      'Spesialisasi Keamanan Siber dan Ketahanan Digital (Cybersecurity Specialist) Di era transparansi radikal, peran Cybersecurity Analyst menjadi garda terdepan dalam mitigasi risiko digital.',
      'Konsultasi Teknologi dan Transformasi Digital (IT Consultant) Sebagai IT Consultant, lulusan berperan sebagai mediator teknis yang mampu menerjemahkan visi strategis pemangku kepentingan ke dalam peta jalan teknologi.',
      'Penelitian dan Pengembangan Akademik (Academic Research & Development) Bagi mereka yang memiliki panggilan terhadap pengembangan ilmu pengetahuan, jalur sebagai Researcher atau Akademisi menawarkan ruang untuk melakukan eksplorasi teoretis pada domain mutakhir.',
    ],
    kurikulum: [
      {
        semester: 1,
        mataKuliah: [
          'Dasar Pemrograman',
          'Matematika Diskrit',
          'Pengantar Teknologi Informasi',
          'Arsitektur & Organisasi Komputer',
          'Pendidikan Agama',
          'Bahasa Inggris Umum',
        ],
      },
      {
        semester: 2,
        mataKuliah: [
          'Struktur Data & Algoritma',
          'Aljabar Linear',
          'Sistem Operasi',
          'Pendidikan Pancasila & Kewarganegaraan',
          'Bahasa Inggris Akademik',
          'Statistika & Probabilitas',
        ],
      },
      {
        semester: 3,
        mataKuliah: [
          'Pemrograman Berorientasi Objek',
          'Sistem Basis Data',
          'Jaringan Komputer',
          'Rekayasa Perangkat Lunak',
          'Matematika Rekayasa',
          'Analisis & Desain Sistem',
        ],
      },
      {
        semester: 4,
        mataKuliah: [
          'Pemrograman Web',
          'Keamanan Informasi & Kriptografi',
          'Interaksi Manusia & Komputer',
          'Sistem Terdistribusi',
          'Manajemen Basis Data',
          'Etika Profesi & Hukum IT',
        ],
      },
      {
        semester: 5,
        mataKuliah: [
          'Pemrograman Mobile',
          'Kecerdasan Buatan (AI)',
          'Analisis & Desain Algoritma',
          'Manajemen Proyek Perangkat Lunak',
          'Cloud Computing',
          'Metodologi Penelitian',
        ],
      },
      {
        semester: 6,
        mataKuliah: [
          'Data Mining & Data Warehousing',
          'Pengujian Perangkat Lunak',
          'Kewirausahaan Teknologi',
          'Kecerdasan Bisnis (BI)',
          'Seminar Proposal',
        ],
      },
      { semester: 7, mataKuliah: ['Praktik Kerja Lapangan (PKL)', 'Seminar PKL'] },
      { semester: 8, mataKuliah: ['Tugas Akhir (Proyek Terapan)'] },
    ],
    nomorSKAkreditasi: '011/SK/LAM-INFOKOM/Ak.B/S/XII/2022',
    berlakuHingga: '2027',
    jumlahSKS: 144,
    masaStudi: '4 Tahun (8 Semester)',
    gelarLulusan: 'S.Tr.Kom.',
    kurikulumPdfUrl: 'https://drive.google.com/drive/folders/1NOaBydF-kqS1hmdepw-boEAJCGje0TGw?usp=sharing',
  },
];

export function getProgramStudiBySlug(slug: string): ProgramStudi | undefined {
  const normalizedSlug = normalizeProgramStudiSlug(slug);
  return programStudiList.find((p) => normalizeProgramStudiSlug(p.slug) === normalizedSlug);
}

import { convertLexicalToHTML, defaultHTMLConverters } from '@payloadcms/richtext-lexical/html';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapPayloadToProgramStudi(doc: any): ProgramStudi {

  let deskripsiHtml = '';
  if (doc.deskripsi) {
    try {
      deskripsiHtml = convertLexicalToHTML({ data: doc.deskripsi, converters: defaultHTMLConverters });
    } catch {
      deskripsiHtml = '';
    }
  }

  const thumbnailUrl: string | undefined =
    doc.thumbnail && typeof doc.thumbnail === 'object' && doc.thumbnail.url
      ? (doc.thumbnail.url as string)
      : undefined;

  const misi: string[] = Array.isArray(doc.misi)
    ? doc.misi.map((m: { poin: string }) => m.poin ?? '')
    : [];

  const kompetensiLulusan: string[] = Array.isArray(doc.kompetensiLulusan)
    ? doc.kompetensiLulusan.map((k: { kompetensi: string }) => k.kompetensi ?? '')
    : [];

  const prospekKarir: string[] = Array.isArray(doc.prospekKarir)
    ? doc.prospekKarir.map((p: { karir: string }) => p.karir ?? '')
    : [];

  const kurikulum = Array.isArray(doc.kurikulum)
    ? doc.kurikulum.map((semester: { semester?: number; mataKuliah?: { nama?: string }[] }) => ({
        semester: typeof semester.semester === 'number' ? semester.semester : 0,
        mataKuliah: Array.isArray(semester.mataKuliah)
          ? semester.mataKuliah.map((item) => item.nama ?? '').filter(Boolean)
          : [],
      }))
    : [];

  return {
    slug: normalizeProgramStudiSlug(doc.slug ?? doc.nama ?? ''),
    nama: doc.nama ?? '',
    jenjang: formatJenjang(doc.jenjang),
    accentColor: resolveProgramStudiAccentColor(doc.nama, doc.accentColor),
    akreditasi: doc.akreditasi ?? '',
    deskripsiSingkat: doc.deskripsiSingkat ?? '',
    deskripsi: deskripsiHtml || '',
    deskripsiHtml,
    thumbnailUrl,
    visi: doc.visi ?? '',
    misi,
    kompetensiLulusan,
    prospekKarir,
    kurikulum,
    nomorSKAkreditasi: doc.nomorSKAkreditasi ?? '',
    berlakuHingga: doc.berlakuHingga ?? '',
    jumlahSKS: typeof doc.jumlahSKS === 'number' ? doc.jumlahSKS : 0,
    masaStudi: doc.masaStudi ?? '',
    gelarLulusan: doc.gelarLulusan ?? '',
    kurikulumPdfUrl: doc.kurikulumPdfUrl ?? '',
  };
}
