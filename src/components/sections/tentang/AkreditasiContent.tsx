import { ShieldCheck, FileText, Calendar, Download } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';

type AkreditasiProdi = {
  prodi: string
  jenjang?: string
  akreditasi?: string
  nomorSK?: string
  berlakuHingga?: string
  fileSK?: { url?: string } | null
}

type LegalitasItem = {
  dokumen: string
  nomor?: string
  tanggal?: string
  keterangan?: string
  file?: { url?: string } | null
}

const badgeColor = (akreditasi?: string) => {
  if (akreditasi === 'Unggul') return 'bg-green-100 text-green-800 border border-green-300'
  if (akreditasi === 'Baik Sekali') return 'bg-blue-100 text-blue-800 border border-blue-300'
  if (akreditasi === 'Baik') return 'bg-yellow-100 text-yellow-800 border border-yellow-300'
  return 'bg-gray-100 text-gray-700 border border-gray-300'
}

export default async function AkreditasiContent() {
  let akreditasiProdi: AkreditasiProdi[] = []
  let legalitas: LegalitasItem[] = []
  let intro = ''

  try {
    const payload = await getPayloadClient()
    const global = await payload.findGlobal({ slug: 'tentang-kami', depth: 1 })
    const data = global as unknown as {
      akreditasiIntro?: string
      akreditasiProdi?: AkreditasiProdi[]
      legalitas?: LegalitasItem[]
    }
    intro = data.akreditasiIntro || ''
    akreditasiProdi = data.akreditasiProdi || []
    legalitas = data.legalitas || []
  } catch {
    // DB unavailable
  }

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
      <div className="mb-12 text-center lg:mb-16 lg:text-left">
        <h2 className="text-brand-navy font-bold text-3xl md:text-4xl tracking-tight leading-[1.2]">
          Akreditasi &amp; Legalitas
        </h2>
        <div className="w-12 h-1 bg-brand-gold rounded-full mt-6 mx-auto lg:mx-0" />
        <p className="mt-8 text-gray-500 font-medium max-w-3xl leading-relaxed mx-auto lg:mx-0 text-sm md:text-base">
          Status akreditasi program studi dan dokumen legalitas institusi STTPU Jakarta yang diterbitkan oleh lembaga penjaminan mutu pendidikan dan kementerian terkait.
        </p>
      </div>

      <section className="bg-brand-mist rounded-xl p-5 border border-gray-200">
        <div className="flex items-start gap-3">
          <ShieldCheck size={20} className="text-brand-navy flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-gray-700 text-sm leading-relaxed">{intro || 'Informasi akreditasi dan legalitas belum tersedia.'}</p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-brand-navy mb-1">Akreditasi Program Studi</h3>
        <p className="text-gray-500 text-sm mb-5">Status akreditasi resmi setiap program studi yang ditetapkan oleh BAN-PT.</p>
        {akreditasiProdi.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 p-10 text-center text-gray-500">
            Data akreditasi program studi belum tersedia.
          </div>
        ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm border-collapse" aria-label="Akreditasi program studi STTPU">
            <thead>
              <tr className="bg-brand-navy text-white">
                <th className="text-left px-4 py-3 font-semibold rounded-tl-lg">Program Studi</th>
                <th className="text-left px-4 py-3 font-semibold">Jenjang</th>
                <th className="text-left px-4 py-3 font-semibold">Akreditasi</th>
                <th className="text-left px-4 py-3 font-semibold">Berlaku Hingga</th>
                <th className="text-left px-4 py-3 font-semibold">SK</th>
                <th className="text-left px-4 py-3 font-semibold rounded-tr-lg">Unduh</th>
              </tr>
            </thead>
            <tbody>
              {akreditasiProdi.map((item, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-brand-mist/50'}`}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">{item.prodi}</td>
                  <td className="px-4 py-3 text-gray-600">{item.jenjang}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeColor(item.akreditasi)}`}>
                      {item.akreditasi}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} aria-hidden="true" />
                      {item.berlakuHingga}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{item.nomorSK}</td>
                  <td className="px-4 py-3">
                    {item.fileSK?.url ? (
                      <a href={item.fileSK.url} target="_blank" rel="noopener noreferrer" className="text-brand-navy underline text-xs">Unduh SK</a>
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </section>

      <section>
        <h3 className="text-xl font-bold text-brand-navy mb-1">Legalitas Institusi</h3>
        <p className="text-gray-500 text-sm mb-5">Dokumen izin operasional dan legalitas STTPU Jakarta yang diterbitkan oleh kementerian terkait.</p>
        {legalitas.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 p-10 text-center text-gray-500">
            Dokumen legalitas belum tersedia.
          </div>
        ) : (
        <ul className="space-y-4" aria-label="Dokumen legalitas STTPU">
          {legalitas.map((item, idx) => (
            <li key={idx} className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-xl">
              <div className="w-10 h-10 bg-brand-navy/10 rounded-lg flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <FileText size={18} className="text-brand-navy" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm">{item.dokumen}</p>
                {item.nomor && <p className="text-brand-navy font-medium text-xs mt-0.5">{item.nomor}</p>}
                {item.tanggal && item.tanggal !== '-' && (
                  <p className="text-gray-500 text-xs mt-0.5">Ditetapkan: {item.tanggal}</p>
                )}
                {item.keterangan && (
                  <p className="text-gray-600 text-xs mt-1 leading-relaxed">{item.keterangan}</p>
                )}
                {item.file?.url && (
                  <a href={item.file.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand-navy text-xs font-semibold mt-1 hover:underline">
                    <Download size={11} />Unduh Dokumen
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
        )}
      </section>
    </article>
  );
}
