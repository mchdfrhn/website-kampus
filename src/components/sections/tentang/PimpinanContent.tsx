import { GraduationCap, Award, BookOpen, User, Briefcase } from 'lucide-react';
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
    <article className="space-y-10 sm:space-y-12">
      {pimpinan.length === 0 ? (
        <div className="rounded-premium border border-dashed border-gray-200 p-12 text-center text-gray-400 font-semibold text-sm">
          Data pimpinan belum tersedia.
        </div>
      ) : (
        <div className="space-y-8 sm:space-y-10">
          {pimpinan.map((person, idx) => (
            <SectionCard key={idx} title={person.nama} eyebrow={person.jabatan}>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Photo Profile block */}
                <div className="flex-shrink-0 flex justify-center md:justify-start self-start">
                  {person.foto?.url ? (
                    <div className="relative group h-fit">
                      <div className="absolute inset-0 rounded-2xl bg-brand-gold/10 blur-md group-hover:bg-brand-gold/25 transition-colors duration-300" />
                      <img
                        src={person.foto.url}
                        alt={person.nama}
                        className="relative w-36 h-48 sm:w-40 sm:h-52 object-cover rounded-2xl border-2 border-white shadow-md z-10"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-36 h-48 sm:w-40 sm:h-52 bg-gray-50 border border-gray-100 rounded-2xl flex flex-col items-center justify-center text-gray-400 gap-2 shadow-inner"
                      aria-hidden="true"
                    >
                      <User size={36} className="text-gray-300" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-300">No Photo</span>
                    </div>
                  )}
                </div>

                {/* Profile Metadata Details */}
                <div className="flex-1 space-y-6">
                  <div>
                    {person.nip && (
                      <p className="text-gray-400 text-xs sm:text-sm font-semibold">NIP: {person.nip}</p>
                    )}
                    {person.keahlian && (
                      <span className="inline-block bg-brand-navy/5 text-brand-navy font-bold text-xs px-2.5 py-1 rounded-md mt-3">
                        {person.keahlian}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-2xl border border-gray-100 bg-gray-50/50">
                    {person.pendidikan && person.pendidikan.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-brand-navy">
                          <GraduationCap size={16} className="text-brand-gold" aria-hidden="true" />
                          <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider">Riwayat Pendidikan</h4>
                        </div>
                        <ul className="space-y-2">
                          {person.pendidikan.map((edu, i) => (
                            <li key={i} className="text-gray-600 text-xs sm:text-sm font-semibold flex items-start gap-2 leading-relaxed">
                              <span className="text-brand-gold mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-gold" aria-hidden="true" />
                              <span>{edu.jenjang}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {person.pengalaman && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-brand-navy">
                          <Briefcase size={16} className="text-brand-gold" aria-hidden="true" />
                          <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider">Pengalaman</h4>
                        </div>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-semibold">{person.pengalaman}</p>
                      </div>
                    )}
                  </div>

                  {person.sambutan && (
                    <div className="relative bg-brand-mist/20 rounded-2xl p-5 sm:p-6 border-l-4 border-brand-gold shadow-sm">
                      <div className="flex items-center gap-2 mb-3 text-brand-navy">
                        <BookOpen size={16} aria-hidden="true" />
                        <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider">Sambutan Pimpinan</h4>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed font-semibold italic">
                        &ldquo;{person.sambutan}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </article>
  );
}
