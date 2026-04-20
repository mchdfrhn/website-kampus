import { getPayloadClient } from '../lib/payload';

const plainTextToLexical = (text: string) => ({
  root: {
    children: [
      {
        children: [{ detail: 0, format: 0, mode: 'normal', style: '', text: text, type: 'text', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
});

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
  ];

  const prodiIds: Record<string, string | number> = {};
  for (const item of prodiData) {
    const existing = await payload.find({ collection: 'program-studi', where: { slug: { equals: item.slug } } });
    if (existing.docs.length === 0) {
      console.log(`Creating Prodi: ${item.nama}`);
      const doc = await payload.create({ collection: 'program-studi', data: { ...item, deskripsi: plainTextToLexical(item.deskripsiSingkat) } });
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
      await payload.create({ collection: 'dosen', data: item });
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
      await payload.create({ collection: 'berita', data: { ...item, konten: plainTextToLexical(item.ringkasan) } });
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

  // 9. Seed Globals
  console.log('Seeding Globals...');
  await payload.updateGlobal({
    slug: 'halaman-utama',
    data: {
      heroJudul: 'Membangun Masa Depan Infrastruktur Indonesia',
      heroSubjudul: 'Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta mencetak sarjana terapan kompeten.',
      statistik: [{ angka: '1.200+', label: 'Mahasiswa Aktif' }, { angka: '12', label: 'UKM Aktif' }]
    }
  });

  console.log('--- Seeding Completed Successfully ---');
}

seed().catch((err) => {
  console.error('Error during seeding:', err);
  process.exit(1);
});
