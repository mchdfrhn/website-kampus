import Link from 'next/link';
import { ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

type Hibah = {
  id: string;
  nama: string;
  penyelenggara: string;
  kategori: 'kemendikti' | 'kementerian' | 'industri' | 'internal';
  dana: string;
  durasi: string;
  deskripsi: string;
  syarat: string[];
  jadwal: string;
  url?: string;
};

const hibahList: Hibah[] = [
  {
    id: 'ptupt',
    nama: 'Penelitian Terapan Unggulan Perguruan Tinggi (PTUPT)',
    penyelenggara: 'Kemendikti Ristek',
    kategori: 'kemendikti',
    dana: 'Rp 100 juta – Rp 300 juta / tahun',
    durasi: '2–3 tahun',
    deskripsi: 'Skema hibah kompetitif untuk penelitian terapan yang berorientasi pada hilirisasi dan penerapan teknologi. Dosen STTPU telah berhasil meraih hibah ini sejak 2019.',
    syarat: ['Jabatan fungsional minimal Lektor', 'Memiliki rekam jejak publikasi terindeks Sinta', 'Track record penelitian sesuai roadmap', 'Proposal melalui Simlitabmas'],
    jadwal: 'Biasanya dibuka Januari–Maret setiap tahun',
    url: 'https://simlitabmas.kemdikbud.go.id',
  },
  {
    id: 'pkm',
    nama: 'Program Kreativitas Mahasiswa (PKM)',
    penyelenggara: 'Kemendikti Ristek',
    kategori: 'kemendikti',
    dana: 'Rp 6 juta – Rp 12 juta / tim',
    durasi: '4–6 bulan',
    deskripsi: 'Program kompetitif untuk mahasiswa S1, meliputi PKM-Penelitian, PKM-Kewirausahaan, PKM-Pengabdian, PKM-Teknologi, dan PKM-Karsa Cipta. Dibimbing dosen pendamping.',
    syarat: ['Mahasiswa aktif S1 minimal semester 2', 'Tim 3–5 orang', 'Dibimbing dosen STTPU', 'Proposal submit melalui Simbelmawa'],
    jadwal: 'Pendaftaran biasanya September–November',
    url: '#',
  },
  {
    id: 'pupr',
    nama: 'Hibah Riset Kemitraan PUPR',
    penyelenggara: 'Kementerian Pekerjaan Umum dan Perumahan Rakyat',
    kategori: 'kementerian',
    dana: 'Rp 150 juta – Rp 500 juta',
    durasi: '1–2 tahun',
    deskripsi: 'Program riset kemitraan antara PT dan unit kerja Kementerian PUPR. Fokus pada infrastruktur jalan, jembatan, sumber daya air, dan permukiman. STTPU memiliki MoU aktif dengan beberapa Balai PUPR.',
    syarat: ['Memiliki hubungan dengan unit kerja PUPR', 'Penelitian relevan dengan program PUPR', 'Dosen bergelar Doktor atau berpengalaman min. 10 tahun'],
    jadwal: 'Sesuai RKAKL mitra PUPR (Januari–Maret)',
    url: '#',
  },
  {
    id: 'industri',
    nama: 'Dana Riset dari Mitra Industri',
    penyelenggara: 'BUMN & Perusahaan Swasta',
    kategori: 'industri',
    dana: 'Negotiable (biasanya Rp 50 juta – Rp 250 juta)',
    durasi: '6–18 bulan',
    deskripsi: 'Kolaborasi riset langsung dengan mitra industri: WIKA, HK, PP, Jasa Marga, PAM Jaya, dan lainnya. Riset ini bersifat terapan dan langsung dimanfaatkan mitra. Koordinasi melalui LP3M STTPU.',
    syarat: ['Topik relevan dengan kebutuhan mitra', 'MoU antara STTPU dan mitra', 'Dosen pengusul memiliki keahlian sesuai'],
    jadwal: 'Bisa diajukan sepanjang tahun melalui LP3M',
    url: '/kontak',
  },
  {
    id: 'internal',
    nama: 'Hibah Penelitian Internal STTPU',
    penyelenggara: 'LP3M STTPU Jakarta',
    kategori: 'internal',
    dana: 'Rp 5 juta – Rp 25 juta',
    durasi: '6 bulan – 1 tahun',
    deskripsi: 'Skema pendanaan internal untuk mendorong produktivitas riset dosen, terutama bagi dosen muda yang belum memiliki rekam jejak hibah eksternal. Meliputi hibah pemula dan hibah pengabdian masyarakat.',
    syarat: ['Dosen tetap STTPU', 'Belum memiliki hibah eksternal aktif (untuk skema pemula)', 'Proposal disetujui Kaprodi dan LP3M'],
    jadwal: 'Siklus April dan Oktober setiap tahun',
    url: '#',
  },
];

const kategoriColor: Record<string, string> = {
  kemendikti: 'bg-blue-100 text-blue-800',
  kementerian: 'bg-purple-100 text-purple-800',
  industri: 'bg-amber-100 text-amber-800',
  internal: 'bg-green-100 text-green-800',
};
const kategoriLabel: Record<string, string> = {
  kemendikti: 'Kemendikti',
  kementerian: 'Kementerian',
  industri: 'Industri',
  internal: 'Internal STTPU',
};

export default function HibahContent() {
  return (
    <article className="space-y-8">
      <div className="bg-[#F0F4F8] rounded-xl p-5">
        <p className="text-sm text-gray-700 leading-relaxed">
          Berikut adalah skema hibah penelitian yang dapat diakses oleh dosen dan mahasiswa STTPU.
          Untuk bimbingan proposal, hubungi <strong>LP3M STTPU</strong> (lp3m@sttpu.ac.id).
        </p>
      </div>

      <div className="space-y-5">
        {hibahList.map((hibah) => (
          <div key={hibah.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#1E3A5F] hover:shadow-sm transition-all">
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="font-bold text-gray-900 text-sm leading-snug">{hibah.nama}</h2>
                  <p className="text-xs text-gray-500 mt-0.5">{hibah.penyelenggara}</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${kategoriColor[hibah.kategori]}`}>
                  {kategoriLabel[hibah.kategori]}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 mt-3">
                <span className="text-xs text-gray-700"><span className="text-gray-400">Dana:</span> <strong>{hibah.dana}</strong></span>
                <span className="text-xs text-gray-700"><span className="text-gray-400">Durasi:</span> {hibah.durasi}</span>
              </div>
            </div>

            <div className="px-5 py-4 space-y-3">
              <p className="text-xs text-gray-600 leading-relaxed">{hibah.deskripsi}</p>

              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Persyaratan Utama</p>
                <ul className="space-y-1">
                  {hibah.syarat.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-xs text-gray-600">
                      <CheckCircle size={12} className="text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                <p className="text-xs text-gray-500">🗓 {hibah.jadwal}</p>
                {hibah.url && (
                  <Link
                    href={hibah.url}
                    className="inline-flex items-center gap-1 text-xs text-[#1E3A5F] font-semibold hover:text-[#F5A623] transition-colors"
                    {...(hibah.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    Info lengkap <ArrowRight size={11} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
        <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-semibold text-amber-900 text-sm mb-1">Butuh Bantuan Menyusun Proposal?</p>
          <p className="text-amber-800 text-xs leading-relaxed">
            LP3M STTPU menyelenggarakan workshop penulisan proposal hibah setiap semester.
            Dosen baru dan yang pertama kali mengajukan hibah eksternal diprioritaskan.
          </p>
          <Link href="/kontak" className="inline-flex items-center gap-1 text-xs text-amber-900 font-semibold mt-2 underline hover:text-[#1E3A5F] transition-colors">
            Hubungi LP3M <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    </article>
  );
}
