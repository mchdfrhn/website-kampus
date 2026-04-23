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
      'Menerapkan sistem penjaminan mutu pendidikan yang berkelanjutan dan terstandarisasi.',
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
  },
  {
    slug: 'teknik-pengairan',
    nama: 'Teknik Pengairan',
    jenjang: 'D-IV',
    akreditasi: 'Baik Sekali',
    deskripsiSingkat:
      'Program studi yang menghasilkan tenaga ahli pengelolaan sumber daya air, jaringan irigasi, drainase, dan bangunan air.',
    deskripsi:
      'Program Studi Teknik Pengairan D-IV STTPU Jakarta berfokus pada ilmu dan teknologi pengelolaan sumber daya air untuk mendukung ketahanan pangan, pengendalian banjir, dan penyediaan air bersih. Lulusan program ini memiliki kompetensi dalam perencanaan, perancangan, dan pengelolaan jaringan irigasi, bendungan, embung, serta sistem drainase skala wilayah.',
    visi:
      'Menjadi program studi Teknik Pengairan vokasi yang unggul dalam menghasilkan ahli teknologi sumber daya air yang kompeten dan berwawasan lingkungan untuk mendukung ketahanan pangan dan air nasional.',
    misi: [
      'Menyelenggarakan pendidikan vokasi Teknik Pengairan yang mengintegrasikan teori dan praktik lapangan secara seimbang.',
      'Melaksanakan penelitian terapan di bidang pengelolaan sumber daya air dan pengembangan irigasi.',
      'Membangun kerjasama dengan Kementerian PUPR, Balai Besar Wilayah Sungai, dan perusahaan pengelola air.',
      'Mengembangkan kurikulum yang responsif terhadap isu perubahan iklim dan ketahanan air.',
    ],
    kompetensiLulusan: [
      'Mampu merencanakan dan merancang jaringan irigasi teknis',
      'Mampu melakukan analisis hidrologi dan hidrolika sungai',
      'Mampu merancang bangunan air: bendung, embung, dan tanggul',
      'Mampu mengoperasikan perangkat lunak HEC-RAS dan SWMM',
      'Mampu menyusun laporan teknis pengelolaan daerah irigasi',
      'Memahami regulasi pengelolaan sumber daya air di Indonesia',
    ],
    prospekKarir: [
      'Pengawas / Pelaksana Proyek Irigasi Kementerian PUPR',
      'Staf Teknis Balai Besar Wilayah Sungai',
      'Junior Hydrology Engineer di Konsultan',
      'Operator Jaringan Irigasi BUMN (PJT I/II, Jasa Tirta)',
      'Staf Teknis Dinas Pengairan Provinsi/Kabupaten/Kota',
      'Pengawas Pembangunan Embung & Bendungan Kecil',
    ],
    kurikulum: [
      {
        semester: 1,
        mataKuliah: ['Matematika Terapan I', 'Fisika Teknik', 'Menggambar Teknik', 'Mekanika Rekayasa', 'Material Bangunan Air', 'Pendidikan Pancasila'],
      },
      {
        semester: 2,
        mataKuliah: ['Matematika Terapan II', 'Hidrologi Teknik', 'Hidrolika I', 'Mekanika Tanah', 'AutoCAD & SIG Dasar', 'Bahasa Inggris Teknik'],
      },
      {
        semester: 3,
        mataKuliah: ['Hidrolika II', 'Irigasi & Drainase I', 'Bangunan Air I', 'Pengukuran & Pemetaan Lahan', 'Estimasi Biaya Pengairan', 'Pengelolaan DAS'],
      },
      {
        semester: 4,
        mataKuliah: ['Irigasi & Drainase II', 'Bangunan Air II', 'Pengendalian Banjir', 'HEC-RAS & SWMM', 'Manajemen Daerah Irigasi', 'K3 & Hukum Air'],
      },
      { semester: 5, mataKuliah: ['Konstruksi Bendungan & Embung', 'Kualitas Air & Lingkungan', 'Manajemen Proyek Pengairan', 'Perubahan Iklim & Adaptasi', 'PLTA Skala Kecil', 'Kewirausahaan'] },
      { semester: 6, mataKuliah: ['Rekayasa Pantai & Muara', 'Sistem Informasi SDA', 'Metodologi Penelitian', 'Pengembangan Wilayah Irigasi', 'Audit Teknis Jaringan Irigasi', 'Seminar Proposal'] },
      { semester: 7, mataKuliah: ['Praktik Kerja Lapangan (PKL)', 'Seminar PKL'] },
      { semester: 8, mataKuliah: ['Tugas Akhir (Proyek Terapan)'] },
    ],
    nomorSKAkreditasi: '1235/SK/BAN-PT/Akred/Dpl-IV/V/2022',
    berlakuHingga: '2027',
    jumlahSKS: 144,
    masaStudi: '4 Tahun (8 Semester)',
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
  },
  {
    slug: 'manajemen-konstruksi',
    nama: 'Manajemen Konstruksi',
    jenjang: 'D-IV',
    akreditasi: 'Baik Sekali',
    deskripsiSingkat:
      'Program studi yang menghasilkan manajer konstruksi profesional yang kompeten dalam perencanaan, pengendalian biaya, waktu, mutu, dan K3 proyek.',
    deskripsi:
      'Program Studi Manajemen Konstruksi D-IV STTPU Jakarta mencetak profesional yang mampu mengelola proyek konstruksi dari aspek perencanaan, pembiayaan, penjadwalan, pengadaan, mutu, dan keselamatan kerja. Program ini sangat relevan dengan kebutuhan industri konstruksi yang semakin kompleks dan membutuhkan manajer proyek yang handal.',
    visi:
      'Menjadi program studi Manajemen Konstruksi vokasi yang terkemuka dalam menghasilkan manajer konstruksi profesional, berintegritas, dan berdaya saing di era industri 4.0.',
    misi: [
      'Menyelenggarakan pendidikan vokasi Manajemen Konstruksi berbasis kompetensi yang diakui industri.',
      'Melaksanakan penelitian terapan di bidang manajemen proyek, estimasi biaya, dan pengadaan konstruksi.',
      'Mengembangkan kemitraan dengan asosiasi konstruksi (GAPENSI, ASPEKNAS) dan kontraktor terkemuka.',
      'Mengintegrasikan standar manajemen proyek internasional (PMI-PMBOK, PRINCE2) dalam kurikulum.',
    ],
    kompetensiLulusan: [
      'Mampu menyusun Rencana Anggaran Biaya (RAB) dan estimasi proyek secara komprehensif',
      'Mampu menyusun jadwal proyek dengan metode CPM, PERT, dan kurva S',
      'Mampu mengelola kontrak konstruksi dan proses pengadaan barang/jasa',
      'Mampu menerapkan sistem manajemen mutu dan K3 di proyek konstruksi',
      'Mampu mengoperasikan MS Project, Primavera, dan BIM (Revit)',
      'Memahami hukum konstruksi, perpajakan proyek, dan regulasi pengadaan publik',
    ],
    prospekKarir: [
      'Quantity Surveyor / Cost Engineer',
      'Site Manager / Project Manager Junior',
      'Staf Pengadaan Barang & Jasa (LPSE/ULP)',
      'Pengendali Mutu (Quality Control) Proyek',
      'Koordinator K3 Proyek Konstruksi',
      'Estimator di Kontraktor & Developer',
      'Staf Manajemen Kontrak BUMN Konstruksi (Waskita, Wijaya Karya, PP)',
    ],
    kurikulum: [
      { semester: 1, mataKuliah: ['Matematika Keuangan', 'Pengantar Teknik Sipil', 'Menggambar Teknik', 'Material & Teknologi Konstruksi', 'Pengantar Manajemen', 'Pendidikan Pancasila'] },
      { semester: 2, mataKuliah: ['Statistika Teknik', 'Mekanika Rekayasa Dasar', 'Akuntansi Biaya Konstruksi', 'Proses Konstruksi & Metode Kerja', 'AutoCAD', 'Bahasa Inggris Teknik'] },
      { semester: 3, mataKuliah: ['Estimasi Biaya Konstruksi I', 'Penjadwalan Proyek (CPM/PERT)', 'Manajemen Sumber Daya', 'Pengendalian Proyek', 'MS Project', 'Hukum Konstruksi'] },
      { semester: 4, mataKuliah: ['Estimasi Biaya Konstruksi II', 'Manajemen Pengadaan & Kontrak', 'Analisis Nilai Perolehan (EVM)', 'K3 Konstruksi', 'Manajemen Risiko', 'Pajak & Keuangan Proyek'] },
      { semester: 5, mataKuliah: ['Manajemen Mutu ISO 9001', 'BIM untuk Quantity Takeoff', 'Primavera P6', 'Manajemen Klaim Konstruksi', 'Due Diligence & Audit Proyek', 'Kewirausahaan Konstruksi'] },
      { semester: 6, mataKuliah: ['Manajemen Proyek Infrastruktur Publik', 'Peraturan Pengadaan (Perpres 16/2018)', 'Rekayasa Nilai (Value Engineering)', 'Metodologi Penelitian', 'Green Building & Konstruksi Berkelanjutan', 'Seminar Proposal'] },
      { semester: 7, mataKuliah: ['Praktik Kerja Lapangan (PKL)', 'Seminar PKL'] },
      { semester: 8, mataKuliah: ['Tugas Akhir (Proyek Terapan)'] },
    ],
    nomorSKAkreditasi: '1237/SK/BAN-PT/Akred/Dpl-IV/III/2023',
    berlakuHingga: '2028',
    jumlahSKS: 144,
    masaStudi: '4 Tahun (8 Semester)',
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
