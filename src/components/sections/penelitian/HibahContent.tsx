import Link from 'next/link';
import { ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';
import GrantsList from './GrantsList';

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

          <div className="mt-8">
            <GrantsList hibahList={hibahList} />
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
