import { GraduationCap, Award, BookOpen, User } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';

type PimpinanItem = {
  jabatan: string
  nama: string
  nip?: string
  keahlian?: string
  pendidikan?: { jenjang: string }[]
  pengalaman?: string
  sambutan?: string
  urutan?: number
  foto?: { url?: string } | null
}

export default async function PimpinanContent() {
  let pimpinan: PimpinanItem[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'pimpinan',
      sort: 'urutan',
      limit: 20,
      depth: 1,
    })
    pimpinan = result.docs as unknown as PimpinanItem[]
  } catch {
    // DB unavailable
  }

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
      <div className="mb-12 text-center lg:mb-16 lg:text-left">
        <h2 className="text-brand-navy font-bold text-3xl md:text-4xl tracking-tight leading-[1.2]">
          Pimpinan Institusi
        </h2>
        <div className="w-12 h-1 bg-brand-gold rounded-full mt-6 mx-auto lg:mx-0" />
        <p className="mt-8 text-gray-500 font-medium max-w-3xl leading-relaxed mx-auto lg:mx-0 text-sm md:text-base">
          Kenali para pemimpin STTPU Jakarta yang mengarahkan visi dan strategi institusi dalam mencetak lulusan berkualitas di bidang teknologi dan ilmu pengetahuan terapan.
        </p>
      </div>

      {pimpinan.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 p-10 text-center text-gray-500">
          Data pimpinan belum tersedia.
        </div>
      ) : null}
      {pimpinan.map((person, idx) => (
        <section
          key={idx}
          className="border border-gray-200 rounded-xl overflow-hidden"
        >
          <div className={`${idx === 0 ? 'bg-brand-navy' : 'bg-brand-mist'} px-6 py-3`}>
            <p
              className={`font-bold text-xs uppercase tracking-wide ${idx === 0 ? 'text-brand-gold' : 'text-brand-navy'}`}
            >
              {person.jabatan}
            </p>
          </div>

          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0">
                {person.foto?.url ? (
                  <img src={person.foto.url} alt={person.nama} className="w-24 h-28 object-cover rounded-lg border border-gray-200" />
                ) : (
                  <div
                    className="w-24 h-28 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <User size={32} className="text-gray-400" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 leading-tight">{person.nama}</h3>
                  {person.nip && <p className="text-gray-500 text-xs mt-0.5">{person.nip}</p>}
                  {person.keahlian && (
                    <p className="text-brand-navy text-sm font-medium mt-1">{person.keahlian}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-brand-mist/40 rounded-xl p-4 border border-gray-100">
                  {person.pendidikan && person.pendidikan.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <GraduationCap size={15} className="text-brand-gold" aria-hidden="true" />
                        <h3 className="font-semibold text-gray-800 text-sm">Riwayat Pendidikan</h3>
                      </div>
                      <ul className="space-y-1">
                        {person.pendidikan.map((edu, i) => (
                          <li key={i} className="text-gray-600 text-xs leading-relaxed flex items-start gap-2">
                            <span className="text-brand-gold mt-1" aria-hidden="true">•</span>
                            {edu.jenjang}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {person.pengalaman && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Award size={15} className="text-brand-gold" aria-hidden="true" />
                        <h3 className="font-semibold text-gray-800 text-sm">Pengalaman</h3>
                      </div>
                      <p className="text-gray-600 text-xs leading-relaxed">{person.pengalaman}</p>
                    </div>
                  )}
                </div>

                {person.sambutan && (
                  <div className="bg-brand-mist rounded-lg p-4 border-l-4 border-brand-gold">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen size={14} className="text-brand-navy" aria-hidden="true" />
                      <h3 className="font-semibold text-brand-navy text-sm">Sambutan {person.jabatan}</h3>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed italic">
                      &ldquo;{person.sambutan}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </article>
  );
}
