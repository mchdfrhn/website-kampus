export type Dosen = {
  slug: string;
  nama: string;
  nidn: string;
  jabatanFungsional: string;
  pendidikanTerakhir: string;
  bidangKeahlian: string[];
  programStudi: string[];
  email: string;
  bio: string;
  fotoUrl?: string;
  publikasi: { judul: string; jurnal: string; tahun: number; url?: string }[];
};

export const dosenList: Dosen[] = [
  {
    slug: 'bambang-setiawan',
    nama: 'Prof. Dr. Ir. Bambang Setiawan, M.T.',
    nidn: '0014086201',
    jabatanFungsional: 'Profesor',
    pendidikanTerakhir: 'S3 Teknik Sipil — Universitas Indonesia',
    bidangKeahlian: ['Rekayasa Struktur', 'Manajemen Konstruksi', 'Beton Prategang'],
    programStudi: ['Teknik Sipil', 'Manajemen Konstruksi'],
    email: 'bambang.setiawan@sttpu.ac.id',
    bio: 'Profesor di bidang rekayasa struktur dengan pengalaman lebih dari 25 tahun dalam penelitian dan konsultansi konstruksi gedung dan jembatan. Aktif sebagai konsultan struktur untuk proyek-proyek infrastruktur strategis nasional.',
    publikasi: [
      { judul: 'Perilaku Geser Balok Beton Bertulang dengan Sengkang Baja Mutu Tinggi', jurnal: 'Jurnal Teknik Sipil ITB', tahun: 2022 },
      { judul: 'Optimasi Desain Struktur Rangka Baja dengan Metode Algoritma Genetika', jurnal: 'Jurnal Rekayasa Sipil Universitas Indonesia', tahun: 2021 },
      { judul: 'Analisis Kinerja Pondasi Tiang pada Tanah Lunak Jakarta', jurnal: 'Jurnal Geoteknik Indonesia', tahun: 2020 },
    ],
  },
  {
    slug: 'siti-rahayu',
    nama: 'Dr. Ir. Siti Rahayu, M.Sc.',
    nidn: '0025037001',
    jabatanFungsional: 'Lektor Kepala',
    pendidikanTerakhir: 'S3 Environmental Engineering — Delft University of Technology, Belanda',
    bidangKeahlian: ['Teknik Lingkungan', 'Pengelolaan Sumber Daya Air', 'Kualitas Air'],
    programStudi: ['Teknik Lingkungan', 'Teknik Pengairan'],
    email: 'siti.rahayu@sttpu.ac.id',
    bio: 'Pakar teknik lingkungan dan pengelolaan sumber daya air dengan pengalaman riset internasional di Belanda. Aktif dalam penelitian kualitas air sungai perkotaan dan pengembangan teknologi pengolahan air limbah skala komunal.',
    publikasi: [
      { judul: 'Performance Evaluation of Constructed Wetland for Urban Wastewater Treatment in Tropical Climate', jurnal: 'Water Science & Technology (IWA)', tahun: 2023 },
      { judul: 'Analisis Kualitas Air Sungai Ciliwung Pasca Program Normalisasi', jurnal: 'Jurnal Teknologi Lingkungan BPPT', tahun: 2022 },
      { judul: 'Pengaruh Perubahan Tata Guna Lahan terhadap Limpasan dan Kualitas Air DAS Cisadane', jurnal: 'Jurnal Sumber Daya Air', tahun: 2021 },
    ],
  },
  {
    slug: 'ahmad-fauzi',
    nama: 'Dr. Ahmad Fauzi, S.T., M.T.',
    nidn: '0015097801',
    jabatanFungsional: 'Lektor Kepala',
    pendidikanTerakhir: 'S3 Geoteknik — Institut Teknologi Bandung',
    bidangKeahlian: ['Geoteknik', 'Rekayasa Pondasi', 'Konstruksi Tanah Lunak'],
    programStudi: ['Teknik Sipil'],
    email: 'ahmad.fauzi@sttpu.ac.id',
    bio: 'Peneliti geoteknik yang berfokus pada permasalahan konstruksi di atas tanah lunak khas dataran rendah Jakarta dan pesisir utara Jawa. Berpengalaman dalam rekayasa pondasi untuk gedung, jembatan, dan infrastruktur transportasi.',
    publikasi: [
      { judul: 'Settlement Analysis of Deep Foundation on Soft Clay in Northern Jakarta', jurnal: 'Geotechnical Engineering Journal (SEAGS)', tahun: 2023 },
      { judul: 'Perkuatan Tanah Lunak dengan Metode Deep Mixing untuk Konstruksi Jalan Tol', jurnal: 'Jurnal Jalan dan Jembatan Kementerian PUPR', tahun: 2022 },
    ],
  },
  {
    slug: 'surya-darma',
    nama: 'Dr. Surya Darma, S.T., M.T.',
    nidn: '0010057201',
    jabatanFungsional: 'Lektor Kepala',
    pendidikanTerakhir: 'S3 Teknik Pengairan — Institut Teknologi Bandung',
    bidangKeahlian: ['Hidrologi', 'Hidrolika', 'Irigasi & Drainase'],
    programStudi: ['Teknik Pengairan'],
    email: 'surya.darma@sttpu.ac.id',
    bio: 'Ahli hidrologi dan hidrolika dengan keahlian khusus di bidang perencanaan jaringan irigasi dan pengendalian banjir. Aktif sebagai konsultan teknis untuk proyek rehabilitasi daerah irigasi di Jawa Barat dan Banten.',
    publikasi: [
      { judul: 'Kalibrasi Model HEC-HMS untuk Simulasi Banjir DAS Citarum Bagian Hulu', jurnal: 'Jurnal Teknik Hidraulik', tahun: 2023 },
      { judul: 'Evaluasi Efisiensi Irigasi Teknis di Daerah Irigasi Jatiluhur', jurnal: 'Jurnal Irigasi Kementerian PUPR', tahun: 2021 },
    ],
  },
  {
    slug: 'maya-indrawati',
    nama: 'Dr. Maya Indrawati, S.T., M.Si.',
    nidn: '0022038001',
    jabatanFungsional: 'Lektor',
    pendidikanTerakhir: 'S3 Ilmu Lingkungan — Universitas Indonesia',
    bidangKeahlian: ['Pengelolaan Limbah B3', 'AMDAL', 'Sanitasi Lingkungan'],
    programStudi: ['Teknik Lingkungan'],
    email: 'maya.indrawati@sttpu.ac.id',
    bio: 'Ahli di bidang pengelolaan limbah bahan berbahaya dan beracun (B3) serta dokumen lingkungan. Berpengalaman sebagai assessor AMDAL untuk proyek-proyek industri dan infrastruktur di Jabodetabek.',
    publikasi: [
      { judul: 'Karakterisasi dan Potensi Daur Ulang Limbah B3 dari Industri Galvanis di Kawasan Industri Bekasi', jurnal: 'Jurnal Teknologi Lingkungan', tahun: 2023 },
      { judul: 'Efektivitas Instalasi Pengolahan Air Limbah (IPAL) Komunal di Permukiman Padat Perkotaan', jurnal: 'Jurnal Permukiman', tahun: 2022 },
    ],
  },
  {
    slug: 'irwan-susanto',
    nama: 'Dr. Irwan Susanto, S.T., M.M.',
    nidn: '0018077501',
    jabatanFungsional: 'Lektor Kepala',
    pendidikanTerakhir: 'S3 Manajemen Proyek — Universitas Gadjah Mada',
    bidangKeahlian: ['Manajemen Proyek Konstruksi', 'Estimasi Biaya', 'Pengadaan Barang & Jasa'],
    programStudi: ['Manajemen Konstruksi'],
    email: 'irwan.susanto@sttpu.ac.id',
    bio: 'Praktisi sekaligus akademisi di bidang manajemen konstruksi dengan pengalaman lebih dari 15 tahun sebagai quantity surveyor dan project manager di berbagai proyek infrastruktur skala besar di Indonesia.',
    publikasi: [
      { judul: 'Analisis Faktor-Faktor Penyebab Cost Overrun pada Proyek Konstruksi Gedung di DKI Jakarta', jurnal: 'Jurnal Manajemen Proyek Indonesia', tahun: 2023 },
      { judul: 'Implementasi BIM dalam Proses Quantity Takeoff untuk Efisiensi Estimasi Biaya', jurnal: 'Jurnal Teknik dan Ilmu Komputer', tahun: 2022 },
    ],
  },
  {
    slug: 'rina-kusumawati',
    nama: 'Dr. Rina Kusumawati, S.T., M.T.',
    nidn: '0007017901',
    jabatanFungsional: 'Lektor',
    pendidikanTerakhir: 'S3 Teknik Sipil — Universitas Diponegoro',
    bidangKeahlian: ['Rekayasa Transportasi', 'Perencanaan Jalan', 'Keselamatan Jalan'],
    programStudi: ['Teknik Sipil'],
    email: 'rina.kusumawati@sttpu.ac.id',
    bio: 'Peneliti di bidang rekayasa transportasi dan keselamatan jalan dengan fokus pada perencanaan geometri jalan dan analisis kecelakaan lalu lintas. Aktif dalam penelitian kolaborasi dengan Kementerian Perhubungan.',
    publikasi: [
      { judul: 'Analisis Tingkat Kecelakaan pada Ruas Jalan Nasional Pantura Jawa Barat', jurnal: 'Jurnal Transportasi', tahun: 2022 },
      { judul: 'Perencanaan Tebal Perkerasan Jalan dengan Metode AASHTO 1993 pada Tanah Expansif', jurnal: 'Jurnal Rekayasa Transportasi', tahun: 2021 },
    ],
  },
  {
    slug: 'budi-hartono',
    nama: 'Dr. Budi Hartono, S.T., M.T.',
    nidn: '0003067601',
    jabatanFungsional: 'Lektor',
    pendidikanTerakhir: 'S3 Teknik Sipil — Universitas Brawijaya',
    bidangKeahlian: ['Konstruksi Beton', 'Material Konstruksi', 'Penjaminan Mutu'],
    programStudi: ['Teknik Sipil', 'Manajemen Konstruksi'],
    email: 'budi.hartono@sttpu.ac.id',
    bio: 'Peneliti di bidang material dan teknologi beton dengan fokus pada pengembangan beton kinerja tinggi menggunakan bahan lokal. Berpengalaman dalam pengujian material konstruksi dan pengembangan standar mutu internal STTPU.',
    publikasi: [
      { judul: 'Pengaruh Penggunaan Abu Sekam Padi sebagai Substitusi Parsial Semen terhadap Kuat Tekan Beton', jurnal: 'Jurnal Teknik Sipil dan Lingkungan IPB', tahun: 2023 },
      { judul: 'Perilaku Lentur Balok Beton Bertulang dengan Serat Polipropilen', jurnal: 'Jurnal Rekayasa Sipil', tahun: 2021 },
    ],
  },
];

export function getDosenBySlug(slug: string): Dosen | undefined {
  return dosenList.find((d) => d.slug === slug);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapPayloadToDosen(doc: any): Dosen {
  const fotoUrl: string | undefined =
    doc.foto && typeof doc.foto === 'object' && doc.foto.url
      ? (doc.foto.url as string)
      : undefined;

  const bidangKeahlian: string[] = Array.isArray(doc.bidangKeahlian)
    ? doc.bidangKeahlian.map((b: { keahlian: string }) => b.keahlian ?? '')
    : [];

  // programStudi is a relationship (hasMany); depth:1 populates the docs
  const programStudi: string[] = Array.isArray(doc.programStudi)
    ? doc.programStudi.map((ps: unknown) => {
        if (ps && typeof ps === 'object') {
          const obj = ps as Record<string, unknown>;
          return typeof obj.nama === 'string' ? obj.nama : '';
        }
        return typeof ps === 'string' ? ps : '';
      }).filter(Boolean)
    : [];

  const publikasi: Dosen['publikasi'] = Array.isArray(doc.publikasi)
    ? doc.publikasi.map((p: { judul: string; jurnal: string; tahun: number; url?: string }) => ({
        judul: p.judul ?? '',
        jurnal: p.jurnal ?? '',
        tahun: typeof p.tahun === 'number' ? p.tahun : Number(p.tahun) || new Date().getFullYear(),
        url: p.url ?? undefined,
      }))
    : [];

  // Map Payload jabatanFungsional enum values to display labels
  const jabatanMap: Record<string, string> = {
    'asisten-ahli': 'Asisten Ahli',
    lektor: 'Lektor',
    'lektor-kepala': 'Lektor Kepala',
    profesor: 'Profesor',
  };

  const jabatanRaw: string = doc.jabatanFungsional ?? '';
  const jabatanFungsional = jabatanMap[jabatanRaw] ?? jabatanRaw;

  // Map Payload pendidikanTerakhir enum values to display labels
  const pendidikanMap: Record<string, string> = {
    s2: 'S2',
    s3: 'S3',
  };
  const pendidikanRaw: string = doc.pendidikanTerakhir ?? '';
  const pendidikanTerakhir = pendidikanMap[pendidikanRaw] ?? pendidikanRaw;

  return {
    slug: doc.slug ?? '',
    nama: doc.nama ?? '',
    nidn: doc.nidn ?? '',
    jabatanFungsional,
    pendidikanTerakhir,
    bidangKeahlian,
    programStudi,
    email: doc.email ?? '',
    bio: doc.bio ?? '',
    fotoUrl,
    publikasi,
  };
}
