import Link from 'next/link';
import { CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';

type LangkahItem = {
  judul: string;
  tenggat?: string;
  deskripsi: string;
  link?: string;
  status: 'wajib' | 'penting' | 'dianjurkan';
}

const defaultLangkah: LangkahItem[] = [
  {
    judul: 'Registrasi Online & Unggah Berkas',
    tenggat: 'Minggu ke-1 masuk kuliah',
    deskripsi: 'Daftarkan diri Anda di portal SIAKAD menggunakan NIM dan password yang diberikan saat PMB. Unggah dokumen: ijazah, transkrip nilai, KTP, KK, dan pas foto.',
    status: 'wajib',
  },
  {
    judul: 'Ikuti Orientasi Mahasiswa Baru (OMBA)',
    tenggat: 'Sesuai jadwal dari Kemahasiswaan',
    deskripsi: 'OMBA adalah kegiatan wajib yang memperkenalkan kehidupan akademik STTPU, sistem perkuliahan, aturan kampus, dan organisasi kemahasiswaan.',
    status: 'wajib',
  },
];

const defaultTips = [
  'Simpan nomor kontak dosen PA (Pembimbing Akademik) Anda sejak awal semester',
  'Aktifkan notifikasi SIAKAD agar tidak melewatkan pengumuman akademik penting',
];

const statusStyle: Record<string, string> = {
  wajib: 'bg-red-100 text-red-800 border-red-200',
  penting: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  dianjurkan: 'bg-green-100 text-green-800 border-green-200',
};

function SectionCard({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-premium border border-gray-100 bg-white p-6 shadow-premium sm:rounded-premium-lg sm:p-8 lg:p-10">
      {eyebrow ? (
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">{eyebrow}</p>
      ) : null}
      <h2 className="text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">{title}</h2>
      <div className="mt-4 h-1 w-12 rounded-full bg-brand-gold" />
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default async function MahasiswaBaruContent() {
  let judul = 'Selamat Datang di STTPU Jakarta!'
  let deskripsi = 'Anda kini menjadi bagian dari keluarga besar STTPU. Panduan ini akan membantu Anda memulai perjalanan akademik dengan langkah yang tepat dan terencana.'
  let langkah = defaultLangkah
  let tips = defaultTips

  try {
    const payload = await getPayloadClient()
    const global = await payload.findGlobal({ slug: 'panduan-maba' })
    const data = global as unknown as {
      judul?: string
      deskripsi?: string
      langkah?: LangkahItem[]
      tips?: { tip: string }[]
    }
    if (data.judul) judul = data.judul
    if (data.deskripsi) deskripsi = data.deskripsi
    if (data.langkah && data.langkah.length > 0) langkah = data.langkah
    if (data.tips && data.tips.length > 0) tips = data.tips.map(t => t.tip)
  } catch {
    // DB unavailable — use defaults
  }

  return (
    <article className="space-y-10 sm:space-y-12">
      <div className="bg-brand-navy rounded-2xl p-6 sm:p-8 text-white shadow-premium">
        <h3 className="font-bold text-lg mb-2">{judul}</h3>
        <p className="text-white/85 text-sm sm:text-base leading-relaxed">{deskripsi}</p>
      </div>

      <SectionCard title="Langkah-Langkah Awal" eyebrow="Orientation">
        <p className="text-gray-500 text-sm mb-6 font-semibold">Prioritas utama yang perlu segera Anda lakukan pada minggu-minggu pertama perkuliahan.</p>
        <ol className="space-y-4" aria-label="Langkah awal mahasiswa baru">
          {langkah.map((l, idx) => (
            <li key={idx} className="flex items-start gap-4 bg-white border border-gray-150 rounded-xl p-5 hover:border-brand-navy hover:shadow-premium transition-all">
              <span
                className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-navy text-white font-bold text-sm flex items-center justify-center shadow-sm"
                aria-hidden="true"
              >
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h3 className="font-bold text-gray-950 text-sm sm:text-base leading-tight">{l.judul}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusStyle[l.status]}`}>
                    {l.status}
                  </span>
                </div>
                {l.tenggat && <p className="text-gray-500 text-xs mb-1 font-semibold">⏰ {l.tenggat}</p>}
                <p className="text-gray-600 text-xs sm:text-sm font-semibold leading-relaxed">{l.deskripsi}</p>
                {l.link && (
                  <Link
                    href={l.link}
                    className="inline-flex items-center gap-1 text-xs text-brand-navy font-semibold mt-2 hover:text-brand-gold transition-colors"
                  >
                    Lihat informasi <ArrowRight size={11} aria-hidden="true" />
                  </Link>
                )}
              </div>
              <CheckCircle size={18} className="text-gray-200 flex-shrink-0 mt-0.5" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </SectionCard>

      <SectionCard title="Tips Sukses di STTPU" eyebrow="Academic Tips">
        <p className="text-gray-500 text-sm mb-4 font-semibold">Kebiasaan kecil yang akan sangat membantu Anda beradaptasi dengan ritme kuliah dan kehidupan kampus.</p>
        <ul className="space-y-2.5">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3 text-sm font-semibold text-gray-600 leading-relaxed">
              <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </SectionCard>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3 shadow-sm">
        <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-bold text-amber-900 text-sm sm:text-base mb-1">Ada pertanyaan?</p>
          <p className="text-amber-800 text-xs sm:text-sm font-semibold leading-relaxed">
            Jangan ragu menghubungi Bagian Kemahasiswaan atau Dosen PA Anda. Tidak ada pertanyaan
            yang terlalu sepele — lebih baik bertanya daripada salah langkah.
          </p>
          <Link href="/kontak" className="inline-flex items-center gap-1 text-xs text-amber-950 font-bold mt-2 underline hover:text-brand-navy transition-colors">
            Hubungi Kami <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    </article>
  );
}
