import Link from 'next/link';
import { ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';

type HibahItem = {
  id: string | number;
  nama: string;
  penyelenggara?: string | null;
  deskripsi?: string | null;
  status?: string | null;
  deadline?: string | null;
  url?: string | null;
  persyaratan?: { poin?: string | null }[] | null;
}

export default async function HibahContent() {
  let hibahList: HibahItem[] = [];

  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'hibah',
      sort: 'urutan',
    });
    hibahList = docs as unknown as HibahItem[];
  } catch (error) {
    console.error('Error fetching hibah:', error);
  }

  const statusColor: Record<string, string> = {
    buka: 'bg-green-100 text-green-800',
    tutup: 'bg-red-100 text-red-800',
    periodik: 'bg-blue-100 text-blue-800',
  };

  const statusLabel: Record<string, string> = {
    buka: 'Pendaftaran Buka',
    tutup: 'Pendaftaran Tutup',
    periodik: 'Pendaftaran Periodik',
  };

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
      <div className="mb-12 text-center lg:mb-16 lg:text-left">
        <h2 className="text-brand-navy font-bold text-3xl md:text-4xl tracking-tight leading-[1.2]">
          Hibah & Pendanaan Riset
        </h2>
        <div className="w-12 h-1 bg-brand-gold rounded-full mt-6 mx-auto lg:mx-0" />
        <p className="mt-8 text-gray-500 font-medium max-w-3xl leading-relaxed mx-auto lg:mx-0 text-sm md:text-base">
          Informasi skema hibah penelitian yang dapat diakses dosen dan mahasiswa STTPU untuk
          memperkuat budaya riset, kolaborasi, dan produksi pengetahuan terapan.
        </p>
      </div>

      <div className="bg-brand-mist rounded-xl p-5 border border-gray-200">
        <p className="text-sm text-gray-700 leading-relaxed">
          Berikut adalah skema hibah penelitian yang dapat diakses oleh dosen dan mahasiswa STTPU.
          Untuk bimbingan proposal, hubungi <strong>LP3M STTPU</strong> (lp3m@sttpu.ac.id).
        </p>
      </div>

      {hibahList.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 p-10 text-center text-gray-500">
          Data hibah penelitian belum tersedia.
        </div>
      ) : (
      <div className="space-y-5">
        {hibahList.map((hibah) => (
          <div key={hibah.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-brand-navy hover:shadow-sm transition-all">
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm leading-snug">{hibah.nama}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{hibah.penyelenggara}</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${statusColor[hibah.status || 'buka']}`}>
                  {statusLabel[hibah.status || 'buka']}
                </span>
              </div>
            </div>

            <div className="px-5 py-4 space-y-3">
              <p className="text-xs text-gray-600 leading-relaxed">{hibah.deskripsi}</p>

              {hibah.persyaratan && hibah.persyaratan.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Persyaratan Utama</p>
                  <ul className="space-y-1">
                    {hibah.persyaratan.map((s: { poin?: string | null }, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                        <CheckCircle size={12} className="text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        {s.poin}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                {hibah.deadline && (
                  <p className="text-xs text-gray-500">🗓 Deadline: {hibah.deadline}</p>
                )}
                {hibah.url && (
                  <Link
                    href={hibah.url}
                    className="inline-flex items-center gap-1 text-xs text-brand-navy font-semibold hover:text-brand-gold transition-colors"
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
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
        <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-semibold text-amber-900 text-sm mb-1">Butuh Bantuan Menyusun Proposal?</p>
          <p className="text-amber-800 text-xs leading-relaxed">
            LP3M STTPU menyelenggarakan workshop penulisan proposal hibah setiap semester.
            Dosen baru dan yang pertama kali mengajukan hibah eksternal diprioritaskan.
          </p>
          <Link href="/kontak" className="inline-flex items-center gap-1 text-xs text-amber-900 font-semibold mt-2 underline hover:text-brand-navy transition-colors">
            Hubungi LP3M <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    </article>
  );
}
