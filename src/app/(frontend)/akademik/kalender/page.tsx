import AkademikPageHeader from '@/components/sections/akademik/AkademikPageHeader';
import KalenderContent from '@/components/sections/akademik/KalenderContent';
import AkademikSidebar from '@/components/sections/akademik/AkademikSidebar';
import AkademikCTA from '@/components/sections/akademik/AkademikCTA';
import { getAkademikPageContent } from '@/lib/data/akademik-page';
import { buildPageMetadata } from '@/lib/seo';
import { getPayloadClient } from '@/lib/payload';

export const metadata = buildPageMetadata({
  title: 'Kalender Akademik | STTPU Jakarta',
  description:
    'Kalender akademik STTPU Jakarta Tahun Akademik 2025/2026 — jadwal perkuliahan, UTS, UAS, libur, dan wisuda.',
  path: '/akademik/kalender',
});

type KegiatanItem = { kegiatan: string; tanggal: string; keterangan?: string };
type KegiatanPenting = { nama: string; tanggal: string; keterangan?: string };

type KalenderData = {
  tahunAkademik: string;
  deskripsi: string;
  pdfUrl?: string;
  semesterGanjil: { label: string; kegiatan: KegiatanItem[] };
  semesterGenap: { label: string; kegiatan: KegiatanItem[] };
  kegiatanPenting: KegiatanPenting[];
};

const defaultSemesterGanjil = {
  label: 'Semester Ganjil (Juli – Desember 2025)',
  kegiatan: [
    { kegiatan: 'Registrasi & Pengisian KRS Semester Ganjil', tanggal: '14 – 18 Juli 2025', keterangan: 'Online via SIAKAD' },
    { kegiatan: 'Awal Perkuliahan Semester Ganjil', tanggal: '21 Juli 2025', keterangan: '-' },
    { kegiatan: 'Batas Akhir Perubahan KRS', tanggal: '28 Juli – 1 Agustus 2025', keterangan: 'Maks 2 mata kuliah' },
    { kegiatan: 'Ujian Tengah Semester (UTS)', tanggal: '22 – 26 September 2025', keterangan: 'Sesuai jadwal masing-masing prodi' },
    { kegiatan: 'Ujian Akhir Semester (UAS)', tanggal: '1 – 5 Desember 2025', keterangan: 'Sesuai jadwal masing-masing prodi' },
    { kegiatan: 'Libur Semester Ganjil', tanggal: '29 Desember 2025 – 16 Januari 2026', keterangan: '-' },
  ] as KegiatanItem[],
};

const defaultSemesterGenap = {
  label: 'Semester Genap (Januari – Juli 2026)',
  kegiatan: [
    { kegiatan: 'Registrasi & Pengisian KRS Semester Genap', tanggal: '12 – 16 Januari 2026', keterangan: 'Online via SIAKAD' },
    { kegiatan: 'Awal Perkuliahan Semester Genap', tanggal: '19 Januari 2026', keterangan: '-' },
    { kegiatan: 'Ujian Tengah Semester (UTS)', tanggal: '16 – 20 Maret 2026', keterangan: 'Sesuai jadwal masing-masing prodi' },
    { kegiatan: 'Ujian Akhir Semester (UAS)', tanggal: '18 – 22 Mei 2026', keterangan: 'Sesuai jadwal masing-masing prodi' },
    { kegiatan: 'Wisuda', tanggal: 'Juli 2026', keterangan: 'Jadwal dan lokasi menyusul' },
    { kegiatan: 'Libur Semester Genap', tanggal: '15 Juni – 20 Juli 2026', keterangan: '-' },
  ] as KegiatanItem[],
};

const defaultKegiatanPenting: KegiatanPenting[] = [
  { nama: 'Pendaftaran PKL (Sem. 7)', tanggal: 'Juni 2026', keterangan: 'Syarat: lulus min. 100 SKS' },
  { nama: 'Sidang Tugas Akhir (Sem. 8)', tanggal: 'Mei – Juni 2026', keterangan: 'Daftar ke prodi masing-masing' },
  { nama: 'Wisuda Tahun Akademik 2025/2026', tanggal: 'Juli 2026', keterangan: 'Aula Serbaguna STTPU' },
  { nama: 'Penerimaan Mahasiswa Baru 2026/2027', tanggal: 'Maret – Juli 2026', keterangan: 'Lihat website PMB' },
];

async function fetchKalenderData(): Promise<KalenderData> {
  let tahunAkademik = 'Tahun Akademik 2025/2026';
  let deskripsi = 'Kalender akademik resmi yang telah ditetapkan oleh Bagian Akademik STTPU Jakarta.';
  let pdfUrl: string | undefined;
  let semesterGanjil = defaultSemesterGanjil;
  let semesterGenap = defaultSemesterGenap;
  let kegiatanPenting: KegiatanPenting[] = defaultKegiatanPenting;

  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'kalender-akademik' });
    const data = global as unknown as {
      tahunAkademik?: string;
      deskripsi?: string;
      pdfUrl?: string;
      semesterGanjil?: { label?: string; kegiatan?: KegiatanItem[] };
      semesterGenap?: { label?: string; kegiatan?: KegiatanItem[] };
      kegiatanPenting?: KegiatanPenting[];
    };

    if (data.tahunAkademik) tahunAkademik = data.tahunAkademik;
    if (data.deskripsi) deskripsi = data.deskripsi;
    if (data.pdfUrl) pdfUrl = data.pdfUrl;
    if (data.semesterGanjil?.kegiatan && data.semesterGanjil.kegiatan.length > 0) {
      semesterGanjil = { label: data.semesterGanjil.label || defaultSemesterGanjil.label, kegiatan: data.semesterGanjil.kegiatan };
    }
    if (data.semesterGenap?.kegiatan && data.semesterGenap.kegiatan.length > 0) {
      semesterGenap = { label: data.semesterGenap.label || defaultSemesterGenap.label, kegiatan: data.semesterGenap.kegiatan };
    }
    if (data.kegiatanPenting && data.kegiatanPenting.length > 0) kegiatanPenting = data.kegiatanPenting;
  } catch {
    // ignore
  }

  return { tahunAkademik, deskripsi, pdfUrl, semesterGanjil, semesterGenap, kegiatanPenting };
}

export default async function KalenderPage() {
  const [pageContent, kalenderData] = await Promise.all([
    getAkademikPageContent(),
    fetchKalenderData(),
  ]);

  return (
    <>
      <AkademikPageHeader
        title="Kalender Akademik"
        subtitle="Jadwal resmi kegiatan akademik STTPU Jakarta Tahun Akademik 2025/2026 — dari registrasi KRS hingga wisuda."
        breadcrumbs={[
          { label: 'Akademik', href: '/akademik' },
          { label: 'Kalender Akademik', href: '/akademik/kalender' },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_20rem] xl:grid-cols-[1fr_22rem]">
          <div className="min-w-0">
            <KalenderContent data={kalenderData} />
            <AkademikCTA card={pageContent.consultationCard} className="mt-12" />
          </div>
          <AkademikSidebar currentPath="/akademik/kalender" />
        </div>
      </div>
    </>
  );
}

