import Link from 'next/link';
import { ArrowRight, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
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
    buka: 'bg-green-50 text-green-700 border border-green-100',
    tutup: 'bg-red-50 text-red-700 border border-red-100',
    periodik: 'bg-blue-50 text-blue-700 border border-blue-100',
  };

  const statusLabel: Record<string, string> = {
    buka: 'Pendaftaran Buka',
    tutup: 'Pendaftaran Tutup',
    periodik: 'Pendaftaran Periodik',
  };

  return (
    <article className="space-y-10 sm:space-y-12">
      <section className="rounded-premium border border-gray-100 bg-white p-6 shadow-sm shadow-brand-navy/[0.04] sm:rounded-premium-lg sm:p-8 lg:p-10">
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-gray-400">Funding Options</p>
        <h3 className="text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">Skema Riset Aktif</h3>
        <div className="mt-4 h-1 w-12 rounded-full bg-brand-gold" />
        <div className="mt-8 flex items-start gap-4 p-5 rounded-2xl border border-brand-navy/10 bg-brand-navy/[0.02]">
          <Sparkles size={24} className="text-brand-navy flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-gray-600 text-sm font-semibold leading-relaxed">
            Berikut adalah skema hibah penelitian yang dapat diakses oleh dosen dan mahasiswa STTPU.
            Untuk bimbingan proposal, hubungi <strong className="text-brand-navy">LP3M STTPU</strong> (lp3m@sttpu.ac.id).
          </p>
        </div>
      </section>

      {hibahList.length === 0 ? (
        <div className="rounded-premium border border-dashed border-gray-200 p-10 text-center text-gray-500">
          Data hibah penelitian belum tersedia.
        </div>
      ) : (
        <section className="rounded-premium border border-gray-100 bg-white p-6 shadow-sm shadow-brand-navy/[0.04] sm:rounded-premium-lg sm:p-8 lg:p-10">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-gray-400">Grants Directory</p>
          <h3 className="text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">Daftar Hibah</h3>
          <div className="mt-4 h-1 w-12 rounded-full bg-brand-gold" />

          <div className="mt-8 space-y-6">
            {hibahList.map((hibah) => (
              <div
                key={hibah.id}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-premium hover:border-brand-navy/10 transition-all duration-300 group"
              >
                <div className="px-6 py-5 border-b border-gray-50 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-brand-navy text-sm sm:text-base group-hover:text-brand-gold transition-colors duration-300 leading-snug">{hibah.nama}</h4>
                    <p className="text-[11px] font-semibold text-gray-400 mt-1">{hibah.penyelenggara}</p>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md flex-shrink-0 ${statusColor[hibah.status || 'buka']}`}>
                    {statusLabel[hibah.status || 'buka']}
                  </span>
                </div>

                <div className="p-6 sm:p-8 space-y-5">
                  <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">{hibah.deskripsi}</p>

                  {hibah.persyaratan && hibah.persyaratan.length > 0 && (
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Persyaratan Utama</p>
                      <ul className="space-y-2">
                        {hibah.persyaratan.map((s: { poin?: string | null }, idx: number) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-gray-500">
                            <CheckCircle size={14} className="text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{s.poin}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between flex-wrap gap-4 pt-5 border-t border-gray-50 text-xs text-gray-500 font-semibold">
                    {hibah.deadline && (
                      <div className="flex items-center gap-1.5">
                        <span>🗓 <strong className="text-brand-navy">Deadline:</strong> {hibah.deadline}</span>
                      </div>
                    )}
                    {hibah.url && (
                      <Link
                        href={hibah.url}
                        className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-brand-navy hover:text-brand-gold transition-colors ml-auto"
                        {...(hibah.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        Info lengkap <ArrowRight size={13} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-premium border border-gray-100 bg-white p-6 shadow-sm shadow-brand-navy/[0.04] sm:rounded-premium-lg sm:p-8 lg:p-10">
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-gray-400">Assistance</p>
        <h3 className="text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">Bantuan Proposal</h3>
        <div className="mt-4 h-1 w-12 rounded-full bg-brand-gold" />
        
        <div className="mt-8 p-5 rounded-2xl border border-brand-gold/20 bg-brand-gold/[0.02] flex items-start gap-4">
          <AlertCircle size={24} className="text-brand-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h4 className="text-sm font-bold text-brand-navy">Butuh Bantuan Menyusun Proposal?</h4>
            <p className="mt-2 text-xs sm:text-sm font-semibold leading-relaxed text-gray-500">
              LP3M STTPU menyelenggarakan workshop penulisan proposal hibah setiap semester.
              Dosen baru dan yang pertama kali mengajukan hibah eksternal diprioritaskan.
            </p>
            <Link href="/kontak" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-navy hover:text-brand-gold transition-colors mt-4">
              Hubungi LP3M <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
