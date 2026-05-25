import { getPayloadClient } from '@/lib/payload';
import PublikasiListClient from './PublikasiListClient';
import { Sparkles } from 'lucide-react';

type Publikasi = {
  id: string;
  judul: string;
  penulis: { nama: string }[];
  tahun: number;
  jenis: 'jurnal' | 'prosiding' | 'buku';
  penerbit: string;
  url?: string;
  prodi?: string;
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

export default async function PublikasiContent() {
  let publikasi: Publikasi[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'publikasi',
      sort: ['-tahun', 'urutan'],
      limit: 100,
    })
    if (result.docs.length > 0) {
      publikasi = result.docs as unknown as Publikasi[]
    }
  } catch {
    // DB unavailable
  }

  return (
    <article className="space-y-10 sm:space-y-12">
      <SectionCard title="Database Karya Ilmiah" eyebrow="Research Publications">
        <div className="flex items-start gap-4 p-5 rounded-2xl border border-brand-navy/10 bg-brand-navy/[0.02]">
          <Sparkles size={24} className="text-brand-navy flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-gray-600 text-sm font-semibold leading-relaxed">
            Database publikasi ilmiah dosen STTPU. Total <strong className="text-brand-navy font-extrabold">{publikasi.length} publikasi</strong> terdaftar
            — mencakup artikel jurnal nasional/internasional, prosiding konferensi, dan buku teks.
          </p>
        </div>
      </SectionCard>

      {publikasi.length === 0 ? (
        <div className="rounded-premium border border-dashed border-gray-200 p-10 text-center text-gray-500 font-bold">
          Data publikasi belum tersedia.
        </div>
      ) : (
        <SectionCard title="Publikasi Dosen &amp; Peneliti" eyebrow="Search Publications">
          <PublikasiListClient initialPublikasi={publikasi} />
        </SectionCard>
      )}
    </article>
  );
}
