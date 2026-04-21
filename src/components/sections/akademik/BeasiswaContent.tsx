import { ExternalLink, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';

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
  buka: 'bg-green-100 text-green-800',
  tutup: 'bg-red-100 text-red-800',
  tahunan: 'bg-blue-100 text-blue-800',
  periodik: 'bg-purple-100 text-purple-800',
  conditional: 'bg-yellow-100 text-yellow-800',
  'buka-pmb': 'bg-blue-100 text-blue-800',
}

export default async function BeasiswaContent() {
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
      <li key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 bg-[#F0F4F8]/50">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-gray-900 text-sm">{b.nama}</h3>
              {b.url && b.url !== '#' && (
                <a href={b.url} target="_blank" rel="noopener noreferrer" aria-label={`Website ${b.nama}`} className="text-[#1E3A5F] hover:text-[#F5A623] transition-colors">
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
            <p className="text-gray-500 text-xs mt-0.5">{b.penyelenggara}</p>
          </div>
          <div className="flex flex-wrap gap-2 flex-shrink-0">
            {b.status && (
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusColor[b.status] ?? 'bg-gray-100 text-gray-700'}`}>
                {statusLabel[b.status] ?? b.status}
              </span>
            )}
            {b.jenis && (
              <span className="bg-[#1E3A5F]/10 text-[#1E3A5F] text-xs font-semibold px-2.5 py-0.5 rounded-full">{b.jenis}</span>
            )}
          </div>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-3">
            {b.nilai && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Nilai Beasiswa</p>
                <p className="text-[#1E3A5F] font-bold text-sm">{b.nilai}</p>
              </div>
            )}
            {b.deadline && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  <Calendar size={11} className="inline mr-1" aria-hidden="true" />
                  Deadline
                </p>
                <p className="text-gray-700 text-sm">{b.deadline}</p>
              </div>
            )}
            {b.deskripsi && <p className="text-gray-600 text-xs leading-relaxed">{b.deskripsi}</p>}
          </div>
          {b.syarat && b.syarat.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Syarat Utama</p>
              <ul className="space-y-1.5">
                {b.syarat.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                    <CheckCircle size={12} className="text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    {s.poin}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </li>
    ))

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="bg-[#F0F4F8] rounded-xl p-5 border border-gray-200 flex items-start gap-3">
        <AlertCircle size={16} className="text-[#1E3A5F] flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-gray-700 text-sm leading-relaxed">
          Informasi beasiswa diperbarui secara berkala. Untuk informasi terkini, hubungi Bagian Kemahasiswaan STTPU Jakarta.
        </p>
      </div>

      {beasiswaList.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 p-10 text-center text-gray-500">
          Data beasiswa belum tersedia.
        </div>
      ) : null}

      {internal.length > 0 && (
        <div>
          <h2 className="font-bold text-[#1E3A5F] text-lg mb-1">Beasiswa Internal STTPU</h2>
          <p className="text-gray-500 text-sm mb-6">Program beasiswa yang diselenggarakan langsung oleh STTPU Jakarta.</p>
          <ul className="space-y-5">{renderList(internal)}</ul>
        </div>
      )}

      {eksternal.length > 0 && (
        <div>
          <h2 className="font-bold text-[#1E3A5F] text-lg mb-1">Beasiswa Eksternal</h2>
          <p className="text-gray-500 text-sm mb-6">Beasiswa dari pemerintah dan lembaga eksternal yang dapat diakses mahasiswa STTPU.</p>
          <ul className="space-y-5">{renderList(eksternal)}</ul>
        </div>
      )}
    </section>
  );
}
