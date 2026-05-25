import { ShieldCheck, FileText, Calendar, Download, FileSpreadsheet } from 'lucide-react';
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
  if (akreditasi === 'Unggul') return 'bg-emerald-50 text-emerald-700 border border-emerald-200'
  if (akreditasi === 'Baik Sekali') return 'bg-indigo-50 text-indigo-700 border border-indigo-200'
  if (akreditasi === 'Baik') return 'bg-amber-50 text-amber-700 border border-amber-200'
  return 'bg-slate-50 text-slate-700 border border-slate-200'
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
    <article className="space-y-10 sm:space-y-12">
      <SectionCard title="Penjaminan Mutu" eyebrow="Statement">
        <div className="flex items-start gap-4 p-5 rounded-2xl border border-brand-gold/15 bg-brand-gold/[0.03]">
          <ShieldCheck size={24} className="text-brand-navy flex-shrink-0" aria-hidden="true" />
          <p className="text-gray-600 text-sm font-semibold leading-relaxed">{intro || 'Informasi akreditasi dan legalitas belum tersedia.'}</p>
        </div>
      </SectionCard>

      <SectionCard title="Akreditasi Program Studi" eyebrow="Accreditation">
        {akreditasiProdi.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 p-10 text-center text-gray-400 font-semibold text-sm">
            Data akreditasi program studi belum tersedia.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
            <table className="w-full text-sm border-collapse" aria-label="Akreditasi program studi STTPU">
              <thead>
                <tr className="bg-brand-navy text-white text-[11px] uppercase tracking-wider">
                  <th className="text-left px-5 py-4 font-bold rounded-tl-2xl">Program Studi</th>
                  <th className="text-left px-5 py-4 font-bold">Jenjang</th>
                  <th className="text-left px-5 py-4 font-bold">Akreditasi</th>
                  <th className="text-left px-5 py-4 font-bold">Berlaku Hingga</th>
                  <th className="text-left px-5 py-4 font-bold">Nomor SK</th>
                  <th className="text-right px-5 py-4 font-bold rounded-tr-2xl">Unduh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {akreditasiProdi.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50/50 transition-colors duration-200"
                  >
                    <td className="px-5 py-4 font-bold text-brand-navy">{item.prodi}</td>
                    <td className="px-5 py-4 text-gray-500 font-semibold">{item.jenjang}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${badgeColor(item.akreditasi)}`}>
                        {item.akreditasi}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-500 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-brand-navy" aria-hidden="true" />
                        {item.berlakuHingga}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-400 font-semibold text-xs">{item.nomorSK}</td>
                    <td className="px-5 py-4 text-right">
                      {item.fileSK?.url ? (
                        <a
                          href={item.fileSK.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 bg-brand-navy/5 text-brand-navy hover:bg-brand-navy hover:text-white transition-colors px-3 py-1.5 rounded-lg text-xs font-bold"
                        >
                          <Download size={12} /> Unduh SK
                        </a>
                      ) : (
                        <span className="text-gray-300 text-xs font-semibold">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      <SectionCard title="Legalitas Institusi" eyebrow="Legality">
        {legalitas.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 p-10 text-center text-gray-400 font-semibold text-sm">
            Dokumen legalitas belum tersedia.
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4" aria-label="Dokumen legalitas STTPU">
            {legalitas.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-4 p-5 bg-gray-50 border border-gray-100 rounded-2xl transition-all hover:bg-white hover:shadow-premium hover:border-brand-navy/10 duration-300"
              >
                <div className="w-10 h-10 bg-brand-navy/5 rounded-xl flex items-center justify-center flex-shrink-0 text-brand-navy" aria-hidden="true">
                  <FileText size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-brand-navy text-sm sm:text-base leading-tight">{item.dokumen}</p>
                  {item.nomor && <p className="text-brand-gold font-bold text-xs mt-1.5">{item.nomor}</p>}
                  {item.tanggal && item.tanggal !== '-' && (
                    <p className="text-gray-400 text-xs font-semibold mt-1">Ditetapkan: {item.tanggal}</p>
                  )}
                  {item.keterangan && (
                    <p className="text-gray-500 text-xs sm:text-sm font-semibold mt-2 leading-relaxed">{item.keterangan}</p>
                  )}
                  {item.file?.url && (
                    <a
                      href={item.file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-brand-navy text-white hover:bg-brand-gold hover:text-brand-navy transition-colors px-3 py-1.5 rounded-lg text-xs font-bold mt-4 shadow-sm"
                    >
                      <Download size={12} /> Unduh Dokumen
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </article>
  );
}
