import { ExternalLink, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';
import type { BeasiswaPageContent } from '@/lib/data/akademik-page';

type BeasiswaItem = {
  nama: string
  penyelenggara: string
  tipe: 'internal' | 'eksternal'
  jenis?: string
  nilai?: string
  syarat?: { poin: string }[]
  deadline?: string
  status?: string
  deskripsi?: string
  url?: string
}

const statusLabel: Record<string, string> = {
  buka: 'Buka',
  tutup: 'Tutup',
  tahunan: 'Tahunan',
  periodik: 'Periodik',
  conditional: 'Conditional',
  'buka-pmb': 'Buka saat PMB',
}

const statusColor: Record<string, string> = {
  buka: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  tutup: 'bg-rose-50 text-rose-800 border-rose-200',
  tahunan: 'bg-blue-50 text-blue-800 border-blue-200',
  periodik: 'bg-purple-50 text-purple-800 border-purple-200',
  conditional: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  'buka-pmb': 'bg-blue-50 text-blue-800 border-blue-200',
}

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

export default async function BeasiswaContent({ content }: { content?: BeasiswaPageContent | null }) {
  let beasiswaList: BeasiswaItem[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'beasiswa',
      sort: 'urutan',
      limit: 50,
    })
    if (result.docs.length > 0) {
      beasiswaList = result.docs as unknown as BeasiswaItem[]
    }
  } catch {
    // DB unavailable
  }

  const internal = beasiswaList.filter((b) => b.tipe === 'internal')
  const eksternal = beasiswaList.filter((b) => b.tipe === 'eksternal')

  const renderList = (list: BeasiswaItem[]) =>
    list.map((b, idx) => (
      <li
        key={idx}
        className="group overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 transition-all hover:bg-white hover:border-brand-navy/15 hover:shadow-premium duration-300"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-100 bg-white group-hover:bg-brand-mist/20 transition-all duration-300">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-brand-navy text-sm md:text-base leading-snug">{b.nama}</h4>
              {b.url && b.url !== '#' && (
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Website ${b.nama}`}
                  className="text-brand-navy hover:text-brand-gold transition-colors"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-1">{b.penyelenggara}</p>
          </div>
          <div className="flex flex-wrap gap-2 flex-shrink-0">
            {b.status && (
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${statusColor[b.status] ?? 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                {statusLabel[b.status] ?? b.status}
              </span>
            )}
            {b.jenis && (
              <span className="border border-brand-navy/10 bg-brand-navy/[0.03] text-brand-navy text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                {b.jenis}
              </span>
            )}
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {b.nilai && (
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Nilai Beasiswa</p>
                <p className="text-brand-navy font-bold text-sm sm:text-base">{b.nilai}</p>
              </div>
            )}
            {b.deadline && (
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Calendar size={12} className="text-brand-gold" aria-hidden="true" />
                  Batas Pendaftaran
                </p>
                <p className="text-gray-700 text-xs sm:text-sm font-semibold">{b.deadline}</p>
              </div>
            )}
            {b.deskripsi && (
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-medium mt-1">
                {b.deskripsi}
              </p>
            )}
          </div>
          {b.syarat && b.syarat.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Persyaratan Utama</p>
              <ul className="space-y-2">
                {b.syarat.map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-gray-600">
                    <CheckCircle size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{s.poin}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </li>
    ))

  return (
    <article className="py-10 sm:py-12 space-y-10">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3 shadow-sm">
        <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-amber-800 text-xs sm:text-sm font-semibold leading-relaxed">
          Informasi beasiswa diperbarui secara berkala. Untuk informasi terkini, hubungi Bagian Kemahasiswaan STTPU Jakarta.
        </p>
      </div>

      {beasiswaList.length === 0 ? (
        <div className="rounded-premium border border-dashed border-gray-200 p-10 text-center text-gray-500 bg-white">
          Data beasiswa belum tersedia.
        </div>
      ) : null}

      {internal.length > 0 && (
        <SectionCard
          title={content?.internalTitle || 'Beasiswa Internal STTPU'}
          eyebrow="INTERNAL SCHOLARSHIP"
        >
          {content?.internalDescription && (
            <p className="text-gray-500 text-sm sm:text-base font-semibold leading-relaxed mb-6">
              {content.internalDescription}
            </p>
          )}
          <ul className="space-y-6">{renderList(internal)}</ul>
        </SectionCard>
      )}

      {eksternal.length > 0 && (
        <SectionCard
          title={content?.externalTitle || 'Beasiswa Eksternal'}
          eyebrow="EXTERNAL SCHOLARSHIP"
        >
          {content?.externalDescription && (
            <p className="text-gray-500 text-sm sm:text-base font-semibold leading-relaxed mb-6">
              {content.externalDescription}
            </p>
          )}
          <ul className="space-y-6">{renderList(eksternal)}</ul>
        </SectionCard>
      )}
    </article>
  );
}
