import { GraduationCap, Award, BookOpen } from 'lucide-react';
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
}

export default async function PimpinanContent() {
  let pimpinan: PimpinanItem[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'pimpinan',
      sort: 'urutan',
      limit: 20,
    })
    pimpinan = result.docs as unknown as PimpinanItem[]
  } catch {
    // DB unavailable
  }

  return (
    <article className="space-y-10">
      {pimpinan.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 p-10 text-center text-gray-500">
          Data pimpinan belum tersedia.
        </div>
      ) : null}
      {pimpinan.map((person, idx) => (
        <section
          key={idx}
          className={`${idx === 0 ? 'border-2 border-[#1E3A5F]' : 'border border-gray-200'} rounded-xl overflow-hidden`}
        >
          <div className={`${idx === 0 ? 'bg-[#1E3A5F]' : 'bg-[#F0F4F8]'} px-6 py-3`}>
            <p
              className={`font-bold text-xs uppercase tracking-wide ${idx === 0 ? 'text-[#F5A623]' : 'text-[#1E3A5F]'}`}
            >
              {person.jabatan}
            </p>
          </div>

          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-shrink-0">
                <div
                  className="w-24 h-28 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="text-gray-400 text-xs text-center px-2">Foto Resmi</span>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="font-bold text-lg text-gray-900 leading-tight">{person.nama}</h2>
                  {person.nip && <p className="text-gray-500 text-xs mt-0.5">{person.nip}</p>}
                  {person.keahlian && (
                    <p className="text-[#1E3A5F] text-sm font-medium mt-1">{person.keahlian}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {person.pendidikan && person.pendidikan.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <GraduationCap size={15} className="text-[#F5A623]" aria-hidden="true" />
                        <h3 className="font-semibold text-gray-800 text-sm">Riwayat Pendidikan</h3>
                      </div>
                      <ul className="space-y-1">
                        {person.pendidikan.map((edu, i) => (
                          <li key={i} className="text-gray-600 text-xs leading-relaxed flex items-start gap-2">
                            <span className="text-[#F5A623] mt-1" aria-hidden="true">•</span>
                            {edu.jenjang}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {person.pengalaman && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Award size={15} className="text-[#F5A623]" aria-hidden="true" />
                        <h3 className="font-semibold text-gray-800 text-sm">Pengalaman</h3>
                      </div>
                      <p className="text-gray-600 text-xs leading-relaxed">{person.pengalaman}</p>
                    </div>
                  )}
                </div>

                {person.sambutan && (
                  <div className="bg-[#F0F4F8] rounded-lg p-4 border-l-4 border-[#F5A623]">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen size={14} className="text-[#1E3A5F]" aria-hidden="true" />
                      <h3 className="font-semibold text-[#1E3A5F] text-sm">Sambutan Ketua</h3>
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
