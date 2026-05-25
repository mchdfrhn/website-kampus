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

  const force = process.env.FORCE_SEED === 'true';

  // Helper function to recursively merge existing and seed values
  const mergeValues = (existingVal: any, seedVal: any, keyPath: string = ''): any => {
    if (existingVal === undefined || existingVal === null || !hasMeaningfulValue(existingVal)) {
      return seedVal;
    }

    if (Array.isArray(existingVal) && Array.isArray(seedVal)) {
      const merged = [...existingVal];
      for (const seedItem of seedVal) {
        if (seedItem && typeof seedItem === 'object') {
          // Identify matching item by one of these key fields
          const idKey = ['slug', 'label', 'unit', 'nama', 'hari', 'platform'].find(k => k in seedItem);
          if (idKey) {
            const existingItemIndex = existingVal.findIndex(item => item && item[idKey] === seedItem[idKey]);
            if (existingItemIndex > -1) {
              merged[existingItemIndex] = mergeValues(existingVal[existingItemIndex], seedItem, `${keyPath}[${idKey}=${seedItem[idKey]}]`);
            } else {
              merged.push(seedItem);
            }
          } else {
            const isDup = existingVal.some(item => JSON.stringify(item) === JSON.stringify(seedItem));
            if (!isDup) {
              merged.push(seedItem);
            }
          }
        } else {
          if (!existingVal.includes(seedItem)) {
            merged.push(seedItem);
          }
        }
      }
      return merged;
    }

    if (existingVal && typeof existingVal === 'object' && seedVal && typeof seedVal === 'object') {
      const merged = { ...existingVal };
      for (const [k, v] of Object.entries(seedVal)) {
        merged[k] = mergeValues(existingVal[k], v, `${keyPath}.${k}`);
      }
      return merged;
    }

    return existingVal;
  };

  if (!existing) {
    console.log(`Creating Global "${slug}" with seed data...`);
    await payload.updateGlobal({
      slug,
      data,
    });
    return;
  }

  if (force) {
    console.log(`Force-overwriting Global "${slug}" with seed data...`);
    await payload.updateGlobal({
      slug,
      data,
    });
  } else {
    console.log(`Merging seed data into Global "${slug}"...`);
    const { globalType, createdAt, updatedAt, id, ...cleanExisting } = existing as any;
    const mergedData = mergeValues(cleanExisting, data);
    
    await payload.updateGlobal({
      slug,
      data: mergedData,
    });
  }
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
      
      let categorySlug = item.kategori;
      if (categorySlug === 'pengumuman') categorySlug = 'announce';
      
      const catDoc = await payload.find({
        collection: 'kategori-berita',
        where: { slug: { equals: categorySlug } }
      });
      
      let catId: string | number;
      if (catDoc.docs.length > 0) {
        catId = catDoc.docs[0].id;
      } else {
        console.log(`Creating Kategori: ${categorySlug}`);
        const newCat = await payload.create({
          collection: 'kategori-berita',
          data: {
            nama: categorySlug === 'announce' ? 'Pengumuman' : categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1),
            slug: categorySlug,
            warna: categorySlug === 'announce' ? 'red' : 'blue',
            urutan: '0',
          }
        });
        catId = newCat.id;
      }

      await payload.create({
        collection: 'berita',
        data: {
          ...item,
          kategori: catId,
          konten: plainTextToLexical(item.ringkasan)
        } as any
      });
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
      misi: [{ poin: 'Menyelenggarakan pendidikan berkualitas' }, { poin: 'Melakukan riset terapan' }],
      strukturCatatan: 'Catatan: Struktur Organisasi ini berdasarkan Keputusan Ketua STTPU Jakarta Nomor: Kep/012/STTPU/I/2026 tentang Susunan Organisasi dan Tata Kerja.',
      strukturSenat: {
        jabatan: 'Ketua Senat Akademik',
        nama: 'Prof. Dr. Ir. Heru Pramono, M.Sc.',
      },
      strukturUPT: [
        { unit: 'UPT Perpustakaan', kepala: 'Rina Kartika, S.I.Pust.' },
        { unit: 'UPT Teknologi Informasi & Komunikasi', kepala: 'Fajar Nugroho, M.T.' },
        { unit: 'UPT Laboratorium Terpadu', kepala: 'Dr. Ir. Eko Yulianto, M.T.' },
        { unit: 'UPT Bahasa & Kerjasama Internasional', kepala: 'Dian Sastrowardoyo, M.A.' },
      ],
      strukturBagian: [
        { bagian: 'Bagian Administrasi Akademik & Kemahasiswaan (BAAK)', kepala: 'Hendra Wijaya, S.Kom.' },
        { bagian: 'Bagian Keuangan, Kepegawaian & Umum (BKKU)', kepala: 'Sri Wahyuni, S.E.' },
        { bagian: 'Bagian Perencanaan & Hubungan Masyarakat', kepala: 'Budi Santoso, S.Sos.' },
      ],
    },
    ['overviewTitle', 'overviewDescription', 'overviewStats', 'sejarahDeskripsi', 'milestones', 'visi', 'misi', 'strukturCatatan', 'strukturSenat', 'strukturUPT', 'strukturBagian'],
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

  // Akademik Page
  console.log('Seeding Akademik Page...');
  await seedGlobalIfEmpty(
    payload,
    'akademik-page',
    {
      sidebarTitle: 'Navigasi Akademik',
      stats: [
        { value: '3', label: 'Program Studi Aktif' },
        { value: '35+', label: 'Dosen Pengampu' },
        { value: '3.000+', label: 'Alumni' },
        { value: '2025/2026', label: 'Tahun Akademik' }
      ],
      sections: [
        { slug: 'program-studi', title: 'Program Studi', subtitle: 'Program studi unggulan STTPU Jakarta di bidang infrastruktur.', breadcrumb: 'Program Studi' },
        { slug: 'dosen', title: 'Direktori Dosen', subtitle: 'Tenaga pengajar profesional dan berpengalaman di STTPU Jakarta.', breadcrumb: 'Dosen' },
        { slug: 'kalender', title: 'Kalender Akademik', subtitle: 'Agenda dan jadwal penting kegiatan akademik STTPU Jakarta.', breadcrumb: 'Kalender' },
        { slug: 'beasiswa', title: 'Beasiswa', subtitle: 'Informasi beasiswa internal dan eksternal untuk mahasiswa STTPU.', breadcrumb: 'Beasiswa' }
      ],
      programStudiContent: {
        gridTitle: 'Program Studi Unggulan',
        gridDescription: 'STTPU Jakarta menawarkan kurikulum vokasi berbasis teknologi yang dirancang khusus untuk menghasilkan sarjana terapan yang kompeten di sektor infrastruktur dan pekerjaan umum nasional.',
        detailCareerTitle: 'Peluang Karir Lulusan',
        detailCareerDescription: 'Lulusan STTPU memiliki prospek karir yang luas di instansi pemerintah, BUMN, kontraktor nasional, maupun konsultan teknik sipil.',
        detailCareerButtonLabel: 'Informasi Pendaftaran (PMB)',
        detailCareerButtonHref: 'https://pmb.sttpu.ac.id',
        detailInfoTitle: 'Layanan Informasi Akademik',
        detailInfoDescription: 'Hubungi sekretariat program studi untuk informasi detail kurikulum, mata kuliah, dan persyaratan akademik lainnya.',
        detailInfoButtonLabel: 'Kontak Program Studi',
        detailInfoButtonHref: '/kontak'
      },
      dosenContent: {
        gridIntroText: 'Berikut adalah daftar dosen pengajar di lingkungan STTPU Jakarta yang dikelompokkan berdasarkan program studi.'
      },
      beasiswaContent: {
        infoText: 'STTPU Jakarta bekerja sama dengan berbagai pihak untuk menyediakan beasiswa bagi mahasiswa berprestasi dan mahasiswa yang membutuhkan bantuan keuangan.',
        internalTitle: 'Beasiswa Internal',
        internalDescription: 'Beasiswa yang disediakan langsung oleh STTPU Jakarta berupa pembebasan biaya kuliah (UKT) bagi mahasiswa berprestasi.',
        externalTitle: 'Beasiswa Eksternal',
        externalDescription: 'Beasiswa dari instansi mitra seperti KIP Kuliah, Pemerintah Daerah, dan mitra industri.'
      },
      consultationCard: {
        title: 'Konsultasi Akademik',
        description: 'Tim akademik kami siap membantu Anda memilih program studi yang paling sesuai dengan visi karir Anda.',
        primaryLabel: 'Hubungi Kami',
        primaryHref: '/kontak',
        secondaryLabel: 'Info Beasiswa',
        secondaryHref: '/akademik/beasiswa'
      }
    },
    ['sidebarTitle', 'stats', 'sections', 'programStudiContent', 'dosenContent', 'beasiswaContent', 'consultationCard']
  );

  // Kemahasiswaan Page
  console.log('Seeding Kemahasiswaan Page...');
  await seedGlobalIfEmpty(
    payload,
    'kemahasiswaan-page',
    {
      sidebarTitle: 'Navigasi Kemahasiswaan',
      heroTitle: 'Kemahasiswaan',
      heroDescription: 'Kehidupan kampus STTPU yang dinamis — dari organisasi dan UKM hingga layanan mahasiswa dan rekam prestasi yang membanggakan.',
      introText: 'STTPU percaya bahwa pendidikan terbaik tidak hanya terjadi di dalam kelas. Kehidupan kemahasiswaan yang aktif membentuk karakter, kepemimpinan, dan kompetensi lunak yang dibutuhkan di dunia kerja.',
      stats: [
        { value: '1.200+', label: 'Mahasiswa Aktif' },
        { value: '12', label: 'UKM Aktif' },
        { value: '45+', label: 'Prestasi/Tahun' },
        { value: '4', label: 'Organisasi Mahasiswa' }
      ],
      sections: [
        { title: 'Organisasi Mahasiswa', desc: 'BEM dan Senat Mahasiswa sebagai wadah aspirasi dan kepemimpinan.', href: '/kemahasiswaan/organisasi' },
        { title: 'Unit Kegiatan Mahasiswa', desc: '12 UKM aktif mencakup bidang olahraga, seni, riset, dan sosial kemasyarakatan.', href: '/kemahasiswaan/ukm' },
        { title: 'Prestasi Mahasiswa', desc: 'Rekam jejak pencapaian mahasiswa di kompetisi nasional dan internasional.', href: '/kemahasiswaan/prestasi' },
        { title: 'Layanan Mahasiswa', desc: 'Bimbingan konseling, career center, kesehatan, dan layanan administrasi mahasiswa.', href: '/kemahasiswaan/layanan' },
        { title: 'Panduan Mahasiswa Baru', desc: 'Panduan lengkap orientasi, sistem akademik, dan tips sukses perkuliahan di STTPU.', href: '/kemahasiswaan/mahasiswa-baru' }
      ],
      subpages: [
        { slug: 'organisasi', title: 'Organisasi Mahasiswa', subtitle: 'BEM, Senat, and himpunan profesi yang mewakili dan mengembangkan mahasiswa STTPU.', breadcrumb: 'Organisasi Mahasiswa' },
        { slug: 'ukm', title: 'Unit Kegiatan Mahasiswa', subtitle: '12 UKM aktif yang memfasilitasi minat dan bakat mahasiswa STTPU di berbagai bidang.', breadcrumb: 'Unit Kegiatan Mahasiswa' },
        { slug: 'prestasi', title: 'Prestasi Mahasiswa', subtitle: 'Rekam jejak pencapaian membanggakan mahasiswa STTPU di berbagai kompetisi dan ajang nasional-internasional.', breadcrumb: 'Prestasi Mahasiswa' },
        { slug: 'layanan', title: 'Layanan Mahasiswa', subtitle: 'Berbagai layanan pendukung yang tersedia untuk memastikan kelancaran studi dan kesejahteraan mahasiswa STTPU.', breadcrumb: 'Layanan Mahasiswa' },
        { slug: 'mahasiswa-baru', title: 'Panduan Mahasiswa Baru', subtitle: 'Semua yang perlu Anda ketahui dan lakukan di awal masa studi di STTPU Jakarta.', breadcrumb: 'Panduan Mahasiswa Baru' }
      ]
    },
    ['subpages', 'heroTitle', 'heroDescription', 'stats', 'introText', 'sections', 'sidebarTitle']
  );

  // LPPM Page
  console.log('Seeding LPPM Page...');
  await seedGlobalIfEmpty(
    payload,
    'lppm-page',
    {
      sidebarTitle: 'Menu LPPM',
      stats: [
        { value: '3', label: 'Ruang Layanan' },
        { value: '120+', label: 'Publikasi' },
        { value: '5+', label: 'Fokus Riset' },
        { value: '18', label: 'Hibah & Program' }
      ],
      subpages: [
        { slug: 'unit-penelitian', title: 'Unit Penelitian', subtitle: 'Unit riset dan laboratorium aktif yang mendukung kegiatan penelitian terapan sivitas akademika STTPU.', breadcrumb: 'Unit Penelitian' },
        { slug: 'publikasi', title: 'Publikasi', subtitle: 'Kumpulan karya ilmiah dosen dan mahasiswa STTPU, meliputi jurnal, prosiding, dan buku.', breadcrumb: 'Publikasi' },
        { slug: 'pedoman', title: 'Pedoman', subtitle: 'Acuan kegiatan penelitian, pengabdian kepada masyarakat, publikasi, dan etika riset LPPM STTPU.', breadcrumb: 'Pedoman' }
      ]
    },
    ['sidebarTitle', 'stats', 'subpages']
  );

  // LPMI Page
  console.log('Seeding LPMI Page...');
  await seedGlobalIfEmpty(
    payload,
    'lpmi-page',
    {
      sidebarTitle: 'Menu LPMI',
      stats: [
        { value: '5', label: 'Ruang Standar' },
        { value: 'PPEPP', label: 'Siklus Mutu' },
        { value: 'AMI', label: 'Audit Internal' },
        { value: 'SPMI', label: 'Sistem Mutu' }
      ],
      subpages: [
        {
          slug: 'kebijakan',
          title: 'Kebijakan LPMI',
          subtitle: 'Arah penjaminan mutu internal STTPU untuk memastikan pendidikan, penelitian, dan pengabdian berjalan terukur serta berkelanjutan.',
          contentTitle: 'Arah Kerja Mutu',
          contentSubtitle: 'Ikhtisar prinsip, ruang lingkup, dan dokumen pendukung yang dipakai unit kerja dalam menjalankan budaya mutu secara konsisten.',
          breadcrumb: 'Kebijakan',
          intro: 'Kebijakan LPMI menjadi rujukan institusi dalam membangun budaya mutu. Dokumen ini menempatkan siklus penetapan, pelaksanaan, evaluasi, pengendalian, dan peningkatan sebagai cara kerja bersama di tingkat institusi, program studi, unit, dosen, tenaga kependidikan, dan mahasiswa.',
          highlights: [
            { title: 'Budaya mutu institusi', description: 'Setiap kegiatan akademik dan layanan pendukung diarahkan agar memiliki standar, bukti pelaksanaan, evaluasi, serta tindak lanjut yang terdokumentasi.' },
            { title: 'Kepatuhan standar nasional', description: 'Kebijakan mutu diselaraskan dengan SN Dikti, kebutuhan akreditasi, dan arah pengembangan STTPU sebagai perguruan tinggi teknologi pekerjaan umum.' },
            { title: 'Peningkatan berkelanjutan', description: 'Hasil audit, monitoring, dan evaluasi digunakan sebagai dasar perbaikan program, layanan, kurikulum, riset, dan kegiatan PKM.' }
          ],
          standards: [
            { text: 'Komitmen pimpinan terhadap sistem penjaminan mutu internal.' },
            { text: 'Keterlibatan seluruh unit dalam siklus PPEPP.' },
            { text: 'Pengelolaan dokumen mutu yang tertelusur dan mudah diaudit.' },
            { text: 'Penggunaan hasil evaluasi untuk rencana tindak lanjut.' }
          ],
          documents: [
            { text: 'Kebijakan SPMI STTPU' },
            { text: 'Manual SPMI' },
            { text: 'Peta Standar Mutu' },
            { text: 'Rencana tindak lanjut hasil evaluasi mutu' }
          ]
        },
        {
          slug: 'pedoman',
          title: 'Pedoman LPMI',
          subtitle: 'Panduan kerja penjaminan mutu untuk pelaksanaan monitoring, evaluasi, audit mutu internal, dan pengendalian dokumen.',
          contentTitle: 'Panduan Pelaksanaan Mutu',
          contentSubtitle: 'Rangkuman alur monev, audit, pengendalian dokumen, dan tindak lanjut agar proses mutu mudah dijalankan oleh setiap unit.',
          breadcrumb: 'Pedoman',
          intro: 'Pedoman LPMI membantu setiap unit menjalankan proses mutu secara konsisten. Fokusnya adalah memastikan kegiatan terencana dengan jelas, bukti pelaksanaan tersedia, capaian dievaluasi, dan rekomendasi perbaikan ditindaklanjuti.',
          highlights: [
            { title: 'Monitoring dan evaluasi', description: 'Monev dilakukan untuk membaca capaian standar, hambatan pelaksanaan, serta kebutuhan dukungan di tingkat program studi dan unit.' },
            { title: 'Audit mutu internal', description: 'AMI memeriksa kesesuaian pelaksanaan dengan standar, prosedur, dan bukti yang tersedia sebelum dilakukan perbaikan terarah.' },
            { title: 'Pengendalian dokumen', description: 'Dokumen mutu dikelola melalui versi, status berlaku, penanggung jawab, dan arsip agar mudah ditelusuri saat evaluasi.' }
          ],
          standards: [
            { text: 'Setiap pedoman memiliki tujuan, ruang lingkup, prosedur, pelaksana, dan bukti kerja.' },
            { text: 'Hasil monev and AMI dicatat dalam format yang seragam.' },
            { text: 'Rekomendasi perbaikan memiliki penanggung jawab dan target waktu.' },
            { text: 'Dokumen lama diarsipkan tanpa menghapus jejak historis.' }
          ],
          documents: [
            { text: 'Pedoman Monitoring dan Evaluasi' },
            { text: 'Pedoman Audit Mutu Internal' },
            { text: 'Instrumen evaluasi standar' },
            { text: 'Formulir rencana tindak lanjut' }
          ]
        },
        {
          slug: 'standar-pendidikan',
          title: 'Standar Pendidikan',
          subtitle: 'Standar mutu penyelenggaraan pendidikan untuk mendukung proses pembelajaran yang relevan, terukur, dan berorientasi kompetensi.',
          contentTitle: 'Mutu Pembelajaran',
          contentSubtitle: 'Fokus standar pendidikan dari kurikulum, proses belajar, penilaian, dosen, sarana, pengelolaan, hingga pembiayaan pembelajaran.',
          breadcrumb: 'Standar Pendidikan',
          intro: 'Standar pendidikan mengatur mutu pembelajaran mulai dari profil lulusan, kurikulum, proses belajar, penilaian, dosen, sarana, pengelolaan, sampai pembiayaan. Standar ini menjadi acuan program studi dalam menjaga kesesuaian pembelajaran dengan kebutuhan dunia kerja dan perkembangan ilmu.',
          highlights: [
            { title: 'Kurikulum berbasis capaian', description: 'Kurikulum disusun berdasarkan profil lulusan, capaian pembelajaran, bahan kajian, metode pembelajaran, dan asesmen yang saling terhubung.' },
            { title: 'Pembelajaran terukur', description: 'Perkuliahan, praktikum, proyek, dan kegiatan lapangan memiliki rencana pembelajaran serta mekanisme evaluasi yang jelas.' },
            { title: 'Layanan akademik', description: 'Mahasiswa memperoleh informasi akademik, bimbingan, dan layanan pendukung agar proses studi berjalan efektif.' }
          ],
          standards: [
            { text: 'Standar kompetensi lulusan.' },
            { text: 'Standar isi pembelajaran.' },
            { text: 'Standar proses pembelajaran.' },
            { text: 'Standar penilaian pembelajaran.' },
            { text: 'Standar dosen dan tenaga kependidikan.' },
            { text: 'Standar sarana dan prasarana pembelajaran.' },
            { text: 'Standar pengelolaan pembelajaran.' },
            { text: 'Standar pembiayaan pembelajaran.' }
          ],
          documents: [
            { text: 'Dokumen kurikulum program studi' },
            { text: 'Rencana Pembelajaran Semester' },
            { text: 'Rubrik penilaian dan portofolio pembelajaran' },
            { text: 'Laporan evaluasi pembelajaran' }
          ]
        },
        {
          slug: 'standar-penelitian',
          title: 'Standar Penelitian',
          subtitle: 'Standar mutu penelitian untuk memperkuat riset terapan, publikasi ilmiah, dan kontribusi akademik STTPU.',
          contentTitle: 'Tata Kelola Riset',
          contentSubtitle: 'Kerangka mutu untuk memastikan penelitian memiliki rencana, integritas ilmiah, luaran, dokumentasi, dan peluang pemanfaatan hasil.',
          breadcrumb: 'Standar Penelitian',
          intro: 'Standar penelitian memastikan kegiatan riset berjalan sesuai kaidah ilmiah, etika, kebutuhan institusi, dan arah pengembangan teknologi pekerjaan umum. Setiap penelitian didorong memiliki rencana, luaran, dokumentasi, serta peluang pemanfaatan hasil.',
          highlights: [
            { title: 'Riset terapan', description: 'Topik penelitian diarahkan pada masalah nyata di bidang infrastruktur, lingkungan, konstruksi, teknologi, dan layanan publik.' },
            { title: 'Etika dan integritas', description: 'Penelitian memperhatikan kejujuran akademik, sitasi yang benar, perlindungan data, dan kepatuhan terhadap prosedur etik.' },
            { title: 'Luaran akademik', description: 'Hasil penelitian diarahkan menjadi publikasi, bahan ajar, model, prototipe, rekomendasi kebijakan, atau kekayaan intelektual.' }
          ],
          standards: [
            { text: 'Standar hasil penelitian.' },
            { text: 'Standar isi penelitian.' },
            { text: 'Standar proses penelitian.' },
            { text: 'Standar penilaian penelitian.' },
            { text: 'Standar peneliti.' },
            { text: 'Standar sarana dan prasarana penelitian.' },
            { text: 'Standar pengelolaan penelitian.' },
            { text: 'Standar pendanaan dan pembiayaan penelitian.' }
          ],
          documents: [
            { text: 'Roadmap penelitian' },
            { text: 'Pedoman proposal dan laporan penelitian' },
            { text: 'Instrumen evaluasi luaran penelitian' },
            { text: 'Daftar publikasi dan rekam jejak penelitian' }
          ]
        },
        {
          slug: 'standar-pkm',
          title: 'Standar PKM',
          subtitle: 'Standar mutu pengabdian kepada masyarakat untuk memastikan program berdampak, relevan, dan terdokumentasi.',
          contentTitle: 'Dampak Pengabdian',
          contentSubtitle: 'Acuan mutu kegiatan PKM agar kebutuhan mitra, metode pelaksanaan, hasil, umpan balik, dan keberlanjutan program tercatat jelas.',
          breadcrumb: 'Standar PKM',
          intro: 'Standar PKM menjadi acuan kegiatan pengabdian kepada masyarakat agar program yang dilakukan dosen dan mahasiswa memiliki kebutuhan mitra yang jelas, metode pelaksanaan yang tepat, serta hasil yang dapat dievaluasi dan dikembangkan.',
          highlights: [
            { title: 'Berbasis kebutuhan mitra', description: 'Program PKM dimulai dari identifikasi kebutuhan masyarakat, sekolah, industri, pemerintah, atau komunitas sasaran.' },
            { title: 'Kolaboratif', description: 'Pelaksanaan PKM dapat melibatkan program studi, mahasiswa, alumni, mitra industri, dan lembaga pemerintah sesuai konteks kegiatan.' },
            { title: 'Dampak terukur', description: 'Hasil kegiatan dicatat melalui indikator capaian, umpan balik mitra, dokumentasi, dan rekomendasi keberlanjutan program.' }
          ],
          standards: [
            { text: 'Standar hasil PKM.' },
            { text: 'Standar isi PKM.' },
            { text: 'Standar proses PKM.' },
            { text: 'Standar penilaian PKM.' },
            { text: 'Standar pelaksana PKM.' },
            { text: 'Standar sarana dan prasarana PKM.' },
            { text: 'Standar pengelolaan PKM.' },
            { text: 'Standar pendanaan dan pembiayaan PKM.' }
          ],
          documents: [
            { text: 'Pedoman proposal dan laporan PKM' },
            { text: 'Peta mitra dan wilayah binaan' },
            { text: 'Instrumen evaluasi kepuasan mitra' },
            { text: 'Laporan dampak dan keberlanjutan program' }
          ]
        }
      ]
    },
    ['sidebarTitle', 'stats', 'subpages']
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
            { label: 'LPMI', href: '/lpmi/kebijakan' },
          ],
        },
        {
          label: 'Akademik',
          href: '/akademik',
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
          label: 'LPPM',
          href: '/lppm',
          children: [
            { label: 'Unit Penelitian', href: '/lppm/unit-penelitian' },
            { label: 'Publikasi', href: '/lppm/publikasi' },
            { label: 'Pedoman', href: '/lppm/pedoman' },
          ],
        },
        {
          label: 'LPMI',
          href: '/lpmi',
          children: [
            { label: 'Kebijakan', href: '/lpmi/kebijakan' },
            { label: 'Pedoman', href: '/lpmi/pedoman' },
            { label: 'Standar Pendidikan', href: '/lpmi/standar-pendidikan' },
            { label: 'Standar Penelitian', href: '/lpmi/standar-penelitian' },
            { label: 'Standar PKM', href: '/lpmi/standar-pkm' },
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
