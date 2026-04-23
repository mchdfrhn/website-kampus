// @ts-nocheck
/* eslint-disable */
import 'dotenv/config'
import { getPayloadClient } from '../src/lib/payload';

const plainTextToLexical = (text: string) => ({
  root: {
    children: [
      {
        children: [{ detail: 0, format: 0, mode: 'normal' as const, style: '', text: text, type: 'text', version: 1 }],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    type: 'root',
    version: 1,
  },
});

const hasMeaningfulValue = (value: unknown): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number' || typeof value === 'boolean') return true;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).some(hasMeaningfulValue);
  }

  return false;
};

async function seedGlobalIfEmpty(
  payload: Awaited<ReturnType<typeof getPayloadClient>>,
  slug: string,
  data: Record<string, unknown>,
  watchedKeys: string[],
) {
  const existing = await payload.findGlobal({
    slug,
    depth: 0,
  });

  const alreadyHasContent = watchedKeys.some((key) => hasMeaningfulValue(existing?.[key]));

  if (alreadyHasContent) {
    console.log(`Skipping Global "${slug}" because it already has content.`);
    return;
  }

  console.log(`Creating initial data for Global "${slug}"...`);
  await payload.updateGlobal({
    slug,
    data,
  });
}

async function seed() {
  console.log('--- Starting Seeding ---');
  const payload = await getPayloadClient();

  // 1. Seed Program Studi
  console.log('Seeding Program Studi...');
  const prodiData = [
    {
      slug: 'teknik-sipil',
      nama: 'Teknik Sipil',
      jenjang: 'd4',
      akreditasi: 'unggul',
      deskripsiSingkat: 'Program studi yang menghasilkan ahli madya teknik sipil kompeten di bidang perencanaan, perancangan, dan pelaksanaan konstruksi infrastruktur.',
      visi: 'Menjadi program studi Teknik Sipil vokasi yang unggul dan terkemuka dalam menghasilkan sarjana terapan yang kompeten, inovatif, dan berdaya saing nasional di bidang konstruksi dan infrastruktur pada tahun 2030.',
      misi: [
        { poin: 'Menyelenggarakan pendidikan vokasi Teknik Sipil yang berorientasi pada kompetensi teknis dan kemampuan aplikasi lapangan.' },
        { poin: 'Melaksanakan penelitian terapan yang relevan dengan permasalahan konstruksi dan infrastruktur Indonesia.' },
      ],
      status: 'aktif'
    },
    {
      slug: 'teknik-pengairan',
      nama: 'Teknik Pengairan',
      jenjang: 'd4',
      akreditasi: 'baik-sekali',
      deskripsiSingkat: 'Program studi yang menghasilkan tenaga ahli pengelolaan sumber daya air, jaringan irigasi, drainase, dan bangunan air.',
      status: 'aktif'
    },
    {
      slug: 'teknik-lingkungan',
      nama: 'Teknik Lingkungan',
      jenjang: 'd4',
      akreditasi: 'baik-sekali',
      deskripsiSingkat: 'Program studi yang menghasilkan ahli teknologi lingkungan kompeten di bidang pengelolaan air bersih, sanitasi, persampahan, dan kualitas udara.',
      status: 'aktif'
    },
    {
      slug: 'manajemen-konstruksi',
      nama: 'Manajemen Konstruksi',
      jenjang: 'd4',
      akreditasi: 'baik-sekali',
      deskripsiSingkat: 'Program studi yang menghasilkan manajer konstruksi profesional yang kompeten dalam perencanaan, pengendalian biaya, waktu, mutu, dan K3 proyek.',
      status: 'aktif'
    }
  ] as const;

  const prodiIds: Record<string, string | number> = {};
  for (const item of prodiData) {
    const existing = await payload.find({ collection: 'program-studi', where: { slug: { equals: item.slug } } });
    if (existing.docs.length === 0) {
      console.log(`Creating Prodi: ${item.nama}`);
      const doc = await payload.create({ collection: 'program-studi', data: { ...item, deskripsi: plainTextToLexical(item.deskripsiSingkat) } as any });
      prodiIds[item.slug] = doc.id;
    } else {
      prodiIds[item.slug] = existing.docs[0].id;
    }
  }

  // 2. Seed Dosen
  console.log('Seeding Dosen...');
  const dosenData = [
    {
      slug: 'bambang-setiawan',
      nama: 'Prof. Dr. Ir. Bambang Setiawan, M.T.',
      nidn: '0014086201',
      jabatanFungsional: 'profesor',
      pendidikanTerakhir: 's3',
      bidangKeahlian: [{ keahlian: 'Rekayasa Struktur' }, { keahlian: 'Manajemen Konstruksi' }],
      email: 'bambang.setiawan@sttpu.ac.id',
      bio: 'Profesor di bidang rekayasa struktur.',
      programStudi: [prodiIds['teknik-sipil'], prodiIds['manajemen-konstruksi']].filter(Boolean),
    },
    {
      slug: 'siti-rahayu',
      nama: 'Dr. Ir. Siti Rahayu, M.Sc.',
      nidn: '0025037001',
      jabatanFungsional: 'lektor-kepala',
      pendidikanTerakhir: 's3',
      bidangKeahlian: [{ keahlian: 'Teknik Lingkungan' }, { keahlian: 'Pengelolaan SDA' }],
      email: 'siti.rahayu@sttpu.ac.id',
      bio: 'Pakar teknik lingkungan.',
      programStudi: [prodiIds['teknik-lingkungan'], prodiIds['teknik-pengairan']].filter(Boolean),
    }
  ];

  for (const item of dosenData) {
    const existing = await payload.find({ collection: 'dosen', where: { slug: { equals: item.slug } } });
    if (existing.docs.length === 0) {
      console.log(`Creating Dosen: ${item.nama}`);
      await payload.create({ collection: 'dosen', data: item as any });
    }
  }

  // 3. Seed Berita
  console.log('Seeding Berita...');
  const beritaData = [
    {
      slug: 'pengumuman-jadwal-uts-semester-genap-2025-2026',
      judul: 'Jadwal Ujian Tengah Semester (UTS) Genap Tahun Akademik 2025/2026',
      kategori: 'pengumuman',
      ringkasan: 'Bagian Akademik STTPU mengumumkan jadwal resmi UTS Semester Genap TA 2025/2026.',
      penulis: 'Bagian Akademik STTPU',
      tanggalTerbit: '2026-03-02',
      isPinned: true,
      status: 'terbit',
      tags: [{ tag: 'UTS' }, { tag: 'Akademik' }]
    },
    {
      slug: 'mahasiswa-sttpu-juara-kompetisi-beton-nasional-2026',
      judul: 'Tim Mahasiswa STTPU Raih Juara II Kompetisi Beton Nasional',
      kategori: 'prestasi',
      ringkasan: 'Tim Concrete Mix Competition STTPU Jakarta meraih Juara II di ITS Surabaya.',
      penulis: 'Tim Humas STTPU',
      tanggalTerbit: '2026-03-05',
      status: 'terbit',
      tags: [{ tag: 'Prestasi' }, { tag: 'Teknik Sipil' }]
    }
  ];

  for (const item of beritaData) {
    const existing = await payload.find({ collection: 'berita', where: { slug: { equals: item.slug } } });
    if (existing.docs.length === 0) {
      console.log(`Creating Berita: ${item.judul}`);
      await payload.create({ collection: 'berita', data: { ...item, konten: plainTextToLexical(item.ringkasan) } as any });
    }
  }

  // 4. Seed Beasiswa
  console.log('Seeding Beasiswa...');
  const beasiswaData = [
    {
      nama: 'Beasiswa Prestasi Akademik', penyelenggara: 'STTPU Jakarta', tipe: 'internal',
      jenis: 'Pembebasan UKT', nilai: 'Bebas UKT 1 semester', deadline: 'Setiap awal semester', status: 'buka',
      deskripsi: 'Diberikan kepada mahasiswa berprestasi akademik tertinggi.',
      syarat: [{ poin: 'IPK ≥ 3.75' }],
    }
  ];

  for (const item of beasiswaData) {
    const existing = await payload.find({ collection: 'beasiswa', where: { nama: { equals: item.nama } } });
    if (existing.docs.length === 0) {
      console.log(`Creating Beasiswa: ${item.nama}`);
      await payload.create({ collection: 'beasiswa', data: item });
    }
  }

  // 5. Seed UKM
  console.log('Seeding UKM...');
  const ukmData = [
    { nama: 'UKM Futsal', bidang: 'Olahraga', deskripsi: 'UKM futsal STTPU aktif berlatih.', anggota: 35, kontak: 'ukm.futsal@mhs.sttpu.ac.id' },
  ];

  for (const item of ukmData) {
    const existing = await payload.find({ collection: 'ukm', where: { nama: { equals: item.nama } } });
    if (existing.docs.length === 0) {
      console.log(`Creating UKM: ${item.nama}`);
      await payload.create({ collection: 'ukm', data: item });
    }
  }

  // 6. Seed Pimpinan
  console.log('Seeding Pimpinan...');
  const pimpinanData = [
    { jabatan: 'Ketua STTPU', nama: 'Prof. Dr. Ir. Bambang Setiawan, M.T.', urutan: 0 },
  ];

  for (const item of pimpinanData) {
    const existing = await payload.find({ collection: 'pimpinan', where: { nama: { equals: item.nama } } });
    if (existing.docs.length === 0) {
      console.log(`Creating Pimpinan: ${item.nama}`);
      await payload.create({ collection: 'pimpinan', data: item });
    }
  }

  // 7. Seed Unit Kontak
  console.log('Seeding Unit Kontak...');
  const unitData = [
    { unit: 'Bagian Akademik', kepala: 'Dra. Sri Mulyani, M.Pd.', telepon: '(021) 555-1236', email: 'akademik@sttpu.ac.id', urutan: 0 },
  ];

  for (const item of unitData) {
    const existing = await payload.find({ collection: 'unit-kontak', where: { unit: { equals: item.unit } } });
    if (existing.docs.length === 0) {
      console.log(`Creating Unit Kontak: ${item.unit}`);
      await payload.create({ collection: 'unit-kontak', data: item });
    }
  }

  // 8. Seed Testimonial
  console.log('Seeding Testimonial...');
  const testimonialData = [
    { teks: 'Kuliah di STTPU membuka banyak peluang karir.', nama: 'Ahmad Fauzi', prodi: 'D4 Teknik Konstruksi Gedung', status: 'aktif', urutan: 0 },
  ];

  for (const item of testimonialData) {
    const existing = await payload.find({ collection: 'testimonial', where: { nama: { equals: item.nama } } });
    if (existing.docs.length === 0) {
      console.log(`Creating Testimonial: ${item.nama}`);
      await payload.create({ collection: 'testimonial', data: item });
    }
  }

  // 9. Seed Unit Penelitian
  console.log('Seeding Unit Penelitian...');
  const unitPenelitianData = [
    {
      nama: 'Pusat Penelitian Infrastruktur & Konstruksi',
      singkatan: 'PPIK',
      kepala: 'Dr. Ir. Bambang Susilo, M.T.',
      deskripsi: 'Unit riset utama yang mengkaji permasalahan teknis dan manajerial dalam sektor konstruksi.',
      fokus: [{ poin: 'Struktur beton dan baja' }, { poin: 'Manajemen konstruksi berkelanjutan' }],
      lokasi: 'Gedung A, Lantai 3',
      kontak: 'ppik@sttpu.ac.id',
      anggota: 12,
      urutan: 0
    }
  ];

  for (const item of unitPenelitianData) {
    const existing = await payload.find({ collection: 'unit-penelitian', where: { nama: { equals: item.nama } } });
    if (existing.docs.length === 0) {
      console.log(`Creating Unit Penelitian: ${item.nama}`);
      await payload.create({ collection: 'unit-penelitian', data: item });
    }
  }

  // 10. Seed Hibah
  console.log('Seeding Hibah...');
  const hibahData = [
    {
      nama: 'Hibah Penelitian Internal STTPU',
      penyelenggara: 'LP3M STTPU',
      deskripsi: 'Pendanaan riset internal untuk dosen dan mahasiswa.',
      persyaratan: [{ poin: 'Dosen tetap STTPU' }, { poin: 'Melibatkan mahasiswa' }],
      status: 'buka',
      deadline: '30 Mei 2026',
      urutan: 0
    }
  ];

  for (const item of hibahData) {
    const existing = await payload.find({ collection: 'hibah', where: { nama: { equals: item.nama } } });
    if (existing.docs.length === 0) {
      console.log(`Creating Hibah: ${item.nama}`);
      await payload.create({ collection: 'hibah', data: item });
    }
  }

  // 11. Seed Globals
  console.log('Seeding Globals...');
  
  // Halaman Utama
  await seedGlobalIfEmpty(
    payload,
    'halaman-utama',
    {
      heroSlides: [
        {
          badge: 'Sekolah Tinggi Teknologi',
          judul: 'Membangun Talenta Infrastruktur Indonesia',
          subjudul: 'Pendidikan vokasi teknik terbaik untuk mencetak tenaga ahli konstruksi, sumber daya air, dan teknologi lingkungan yang siap pakai.',
          cta1Teks: 'Lihat Program Studi',
          cta1Href: '/akademik/program-studi',
          cta2Teks: 'Kontak Kami',
          cta2Href: '/kontak',
        },
        {
          badge: 'Akreditasi Unggul',
          judul: 'Kampus Vokasi Terdepan di Bidang Konstruksi',
          subjudul: 'Kurikulum berbasis industri dengan dukungan fasilitas laboratorium lengkap dan tenaga pendidik berpengalaman.',
          cta1Teks: 'Pendaftaran Mahasiswa',
          cta1Href: 'https://pmb.sttpu.ac.id',
          cta2Teks: 'Tentang Kami',
          cta2Href: '/tentang',
        },
      ],
      statistik: [
        { angka: '1.200+', label: 'Mahasiswa Aktif' },
        { angka: '3.000+', label: 'Alumni' },
        { angka: '45+', label: 'Mitra Industri' },
        { angka: '12', label: 'UKM Aktif' },
      ],
    },
    ['heroSlides', 'statistik', 'quickLinksTabs'],
  );

  // Tentang Kami
  await seedGlobalIfEmpty(
    payload,
    'tentang-kami',
    {
      sejarahDeskripsi: plainTextToLexical('Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta didirikan untuk mencetak tenaga ahli konstruksi.'),
      milestones: [
        { tahun: '1987', judul: 'Pendirian STTPU', deskripsi: 'Didirikan oleh Kementerian PU.' },
        { tahun: '2024', judul: 'Akreditasi Unggul', deskripsi: 'Meraih predikat Unggul.' }
      ],
      visi: 'Menjadi institusi vokasi terdepan di bidang pekerjaan umum.',
      misi: [{ poin: 'Menyelenggarakan pendidikan berkualitas' }, { poin: 'Melakukan riset terapan' }]
    },
    ['overviewTitle', 'overviewDescription', 'overviewStats', 'sejarahDeskripsi', 'milestones', 'visi', 'misi'],
  );

  // Kalender Akademik
  await seedGlobalIfEmpty(
    payload,
    'kalender-akademik',
    {
      tahunAkademik: '2025/2026',
      semesterGanjil: {
        label: 'Semester Ganjil 2025',
        kegiatan: [
          { kegiatan: 'Awal Perkuliahan', tanggal: '1 September 2025' },
          { kegiatan: 'UTS Ganjil', tanggal: '20 - 30 Oktober 2025' }
        ]
      }
    },
    ['tahunAkademik', 'deskripsi', 'pdfUrl', 'semesterGanjil', 'semesterGenap', 'kegiatanPenting'],
  );

  // Portal Links
  await seedGlobalIfEmpty(
    payload,
    'portal-links',
    {
      portals: [
        { nama: 'SIAKAD', url: 'https://siakad.sttpu.ac.id', deskripsi: 'Sistem Informasi Akademik', icon: 'graduation-cap' },
        { nama: 'ELNINO', url: 'https://elnino.sttpu.ac.id', deskripsi: 'E-Learning Platform', icon: 'laptop' }
      ]
    },
    ['portals', 'tautanCepat'],
  );

  // Main Menu
  console.log('Seeding Main Menu...');
  await seedGlobalIfEmpty(
    payload,
    'main-menu',
    {
      navItems: [
        { label: 'Beranda', href: '/' },
        {
          label: 'Tentang',
          href: '/tentang',
          children: [
            { label: 'Sejarah & Profil', href: '/tentang/sejarah' },
            { label: 'Visi, Misi & Nilai', href: '/tentang/visi-misi' },
            { label: 'Profil Pimpinan', href: '/tentang/pimpinan' },
            { label: 'Akreditasi & Legalitas', href: '/tentang/akreditasi' },
            { label: 'Struktur Organisasi', href: '/tentang/struktur-organisasi' },
            { label: 'Fasilitas Kampus', href: '/tentang/fasilitas' },
          ],
        },
        {
          label: 'Akademik',
          href: '#',
          children: [
            { label: 'Program Studi', href: '/akademik/program-studi' },
            { label: 'Dosen', href: '/akademik/dosen' },
            { label: 'Kalender Akademik', href: '/akademik/kalender' },
            { label: 'Beasiswa', href: '/akademik/beasiswa' },
          ],
        },
        {
          label: 'Kemahasiswaan',
          href: '/kemahasiswaan',
          children: [
            { label: 'Organisasi Mahasiswa', href: '/kemahasiswaan/organisasi' },
            { label: 'Unit Kegiatan Mahasiswa', href: '/kemahasiswaan/ukm' },
            { label: 'Prestasi Mahasiswa', href: '/kemahasiswaan/prestasi' },
            { label: 'Layanan Mahasiswa', href: '/kemahasiswaan/layanan' },
            { label: 'Panduan Mahasiswa Baru', href: '/kemahasiswaan/mahasiswa-baru' },
          ],
        },
        {
          label: 'Penelitian',
          href: '/penelitian',
          children: [
            { label: 'Unit Penelitian & Lab', href: '/penelitian/unit' },
            { label: 'Database Publikasi', href: '/penelitian/publikasi' },
            { label: 'Hibah & Pendanaan', href: '/penelitian/hibah' },
          ],
        },
        { label: 'Berita', href: '/berita' },
        { label: 'Galeri', href: '/galeri' },
        { label: 'Kontak', href: '/kontak' },
      ]
    },
    ['navItems'],
  );

  console.log('--- Seeding Completed Successfully ---');
}

seed().catch((err) => {
  console.error('Error during seeding:', err);
  process.exit(1);
});
