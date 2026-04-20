import Link from 'next/link';
import { CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';

const langkah = [
  {
    no: 1,
    judul: 'Registrasi Online & Unggah Berkas',
    tenggat: 'Minggu ke-1 masuk kuliah',
    deskripsi: 'Daftarkan diri Anda di portal SIAKAD menggunakan NIM dan password yang diberikan saat PMB. Unggah dokumen: ijazah, transkrip nilai, KTP, KK, dan pas foto.',
    link: null,
    status: 'wajib',
  },
  {
    no: 2,
    judul: 'Ikuti Orientasi Mahasiswa Baru (OMBA)',
    tenggat: 'Sesuai jadwal dari Kemahasiswaan',
    deskripsi: 'OMBA adalah kegiatan wajib yang memperkenalkan kehidupan akademik STTPU, sistem perkuliahan, aturan kampus, dan organisasi kemahasiswaan.',
    link: null,
    status: 'wajib',
  },
  {
    no: 3,
    judul: 'Aktivasi Email Kampus',
    tenggat: 'Minggu ke-1',
    deskripsi: 'Aktifkan email institusi Anda (@mhs.sttpu.ac.id) melalui UPT IT. Email ini adalah akun resmi untuk semua komunikasi akademik, termasuk akses SIAKAD dan e-learning.',
    link: null,
    status: 'wajib',
  },
  {
    no: 4,
    judul: 'Pengisian Kartu Rencana Studi (KRS)',
    tenggat: 'Sesuai kalender akademik',
    deskripsi: 'Isi KRS melalui portal SIAKAD sesuai jadwal yang ditentukan. Pastikan konsultasi dengan Dosen Pembimbing Akademik (DPA) sebelum mengunci KRS.',
    link: '/akademik/kalender',
    status: 'wajib',
  },
  {
    no: 5,
    judul: 'Pembayaran UKT',
    tenggat: 'Sebelum perkuliahan dimulai',
    deskripsi: 'Selesaikan pembayaran Uang Kuliah Tunggal (UKT) sebelum batas waktu yang ditentukan. Jika membutuhkan keringanan, ajukan permohonan ke Bagian Kemahasiswaan.',
    link: '/kemahasiswaan/layanan',
    status: 'wajib',
  },
  {
    no: 6,
    judul: 'Daftar Asuransi & BPJS',
    tenggat: 'Bulan pertama kuliah',
    deskripsi: 'Pastikan Anda memiliki BPJS Kesehatan aktif. STTPU juga menyediakan program asuransi kecelakaan mahasiswa — informasikan status Anda ke Bagian Kemahasiswaan.',
    link: null,
    status: 'penting',
  },
  {
    no: 7,
    judul: 'Bergabung dengan Organisasi/UKM',
    tenggat: 'Awal semester 1',
    deskripsi: 'Ikut seleksi/pendaftaran UKM atau organisasi kemahasiswaan yang sesuai minat Anda. Aktif berorganisasi terbukti meningkatkan soft skill dan nilai tambah di dunia kerja.',
    link: '/kemahasiswaan/ukm',
    status: 'dianjurkan',
  },
  {
    no: 8,
    judul: 'Kenali Fasilitas Kampus',
    tenggat: 'Minggu pertama',
    deskripsi: 'Jelajahi dan kenali semua fasilitas: perpustakaan, laboratorium, ruang baca, kantin, mushola, dan Career Center. Pahami aturan penggunaan setiap fasilitas.',
    link: '/tentang/fasilitas',
    status: 'dianjurkan',
  },
];

const tips = [
  'Simpan nomor kontak dosen PA (Pembimbing Akademik) Anda sejak awal semester',
  'Aktifkan notifikasi SIAKAD agar tidak melewatkan pengumuman akademik penting',
  'Buat kelompok studi sejak semester 1 — belajar bersama jauh lebih efektif',
  'Manfaatkan perpustakaan digital dan akses jurnal yang disediakan kampus secara gratis',
  'Hadiri semua sesi OMBA — kenalan sebanyak mungkin, mereka akan menjadi jaringan profesional Anda',
  'Jangan tunda pembayaran UKT — keterlambatan bisa mengakibatkan tidak bisa mengikuti ujian',
  'Simpan semua berkas akademik di Google Drive atau cloud storage sebagai cadangan',
];

const statusStyle: Record<string, string> = {
  wajib: 'bg-red-100 text-red-800 border-red-200',
  penting: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  dianjurkan: 'bg-green-100 text-green-800 border-green-200',
};

export default function MahasiswaBaruContent() {
  return (
    <article className="space-y-10">
      <div className="bg-[#1E3A5F] rounded-xl p-6 text-white">
        <h2 className="font-bold text-base mb-2">Selamat Datang di STTPU Jakarta!</h2>
        <p className="text-white/85 text-sm leading-relaxed">
          Anda kini menjadi bagian dari keluarga besar STTPU. Panduan ini akan membantu Anda
          memulai perjalanan akademik dengan langkah yang tepat dan terencana.
        </p>
      </div>

      <section>
        <h2 className="font-bold text-[#1E3A5F] text-lg mb-6">Langkah-Langkah Awal</h2>
        <ol className="space-y-4" aria-label="Langkah awal mahasiswa baru">
          {langkah.map((l) => (
            <li key={l.no} className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-5 hover:border-[#1E3A5F] hover:shadow-sm transition-all">
              <span
                className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1E3A5F] text-white font-bold text-sm flex items-center justify-center"
                aria-hidden="true"
              >
                {l.no}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h3 className="font-bold text-gray-900 text-sm">{l.judul}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusStyle[l.status]}`}>
                    {l.status}
                  </span>
                </div>
                <p className="text-gray-500 text-xs mb-1">⏰ {l.tenggat}</p>
                <p className="text-gray-700 text-xs leading-relaxed">{l.deskripsi}</p>
                {l.link && (
                  <Link
                    href={l.link}
                    className="inline-flex items-center gap-1 text-xs text-[#1E3A5F] font-semibold mt-2 hover:text-[#F5A623] transition-colors"
                  >
                    Lihat informasi <ArrowRight size={11} aria-hidden="true" />
                  </Link>
                )}
              </div>
              <CheckCircle size={18} className="text-gray-200 flex-shrink-0 mt-0.5" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="font-bold text-[#1E3A5F] text-lg mb-4">Tips Sukses di STTPU</h2>
        <ul className="space-y-2.5">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
              <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
        <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-semibold text-amber-900 text-sm mb-1">Ada pertanyaan?</p>
          <p className="text-amber-800 text-xs leading-relaxed">
            Jangan ragu menghubungi Bagian Kemahasiswaan atau Dosen PA Anda. Tidak ada pertanyaan
            yang terlalu sepele — lebih baik bertanya daripada salah langkah.
          </p>
          <Link href="/kontak" className="inline-flex items-center gap-1 text-xs text-amber-900 font-semibold mt-2 underline hover:text-[#1E3A5F] transition-colors">
            Hubungi Kami <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    </article>
  );
}
