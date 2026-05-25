import { FlaskConical, Users, Phone, MapPin, Sparkles } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';

type UnitItem = {
  id: string | number;
  nama: string;
  singkatan?: string | null;
  deskripsi?: string | null;
  fokus?: { poin?: string | null }[] | null;
  kepala?: string | null;
  lokasi?: string | null;
  kontak?: string | null;
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

export default async function UnitPenelitianContent() {
  let units: UnitItem[] = [];

  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'unit-penelitian',
      sort: 'urutan',
    });
    units = docs as unknown as UnitItem[];
  } catch (error) {
    console.error('Error fetching units:', error);
  }

  return (
    <article className="space-y-10 sm:space-y-12">
      <SectionCard title="Tridarma Perguruan Tinggi" eyebrow="Research Ecosystem">
        <div className="flex items-start gap-4 p-5 rounded-2xl border border-brand-navy/10 bg-brand-navy/[0.02]">
          <Sparkles size={24} className="text-brand-navy flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-gray-600 text-sm font-semibold leading-relaxed">
            STTPU memiliki <strong className="text-brand-navy font-extrabold">{units.length} unit riset dan laboratorium aktif</strong> yang mendukung tridarma
            perguruan tinggi. Setiap unit dibina oleh dosen doktor berpengalaman dan terbuka untuk
            kolaborasi penelitian dengan mahasiswa, industri, dan pemerintah.
          </p>
        </div>
      </SectionCard>

      {units.length === 0 ? (
        <div className="rounded-premium border border-dashed border-gray-200 p-10 text-center text-gray-500 font-bold">
          Data unit penelitian belum tersedia.
        </div>
      ) : (
        <SectionCard title="Daftar Unit &amp; Lab" eyebrow="List of Centers">
          <div className="space-y-6">
            {units.map((unit) => (
              <div
                key={unit.id}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-premium hover:border-brand-navy/10 transition-all duration-300 group"
              >
                <div className="px-6 py-5 border-b border-gray-50 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-navy flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-brand-gold transition-colors duration-300">
                    <FlaskConical size={18} className="text-white group-hover:text-brand-navy transition-colors duration-300" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy text-sm sm:text-base group-hover:text-brand-gold transition-colors duration-300 leading-snug">{unit.nama}</h4>
                    {unit.singkatan && (
                      <span className="text-[10px] font-black uppercase tracking-wider text-brand-gold bg-brand-navy px-2 py-0.5 rounded mt-1.5 inline-block">{unit.singkatan}</span>
                    )}
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-5">
                  <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">{unit.deskripsi}</p>

                  {unit.fokus && unit.fokus.length > 0 && (
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Fokus &amp; Bidang Riset</p>
                      <ul className="flex flex-wrap gap-2">
                        {unit.fokus.map((f: { poin?: string | null }, idx: number) => (
                          <li key={idx} className="text-[10px] sm:text-xs font-bold bg-brand-navy/[0.03] text-brand-navy border border-brand-navy/5 px-3 py-1 rounded-lg">{f.poin}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-gray-50 text-gray-500 font-semibold text-xs">
                    {unit.kepala && (
                      <div className="flex items-center gap-2">
                        <Users size={14} aria-hidden="true" className="text-brand-navy" />
                        <span><strong className="text-brand-navy">Ka. Lab:</strong> {unit.kepala}</span>
                      </div>
                    )}
                    {unit.lokasi && (
                      <div className="flex items-center gap-2">
                        <MapPin size={14} aria-hidden="true" className="text-brand-navy" />
                        <span>{unit.lokasi}</span>
                      </div>
                    )}
                    {unit.kontak && (
                      <div className="flex items-center gap-2">
                        <Phone size={14} aria-hidden="true" className="text-brand-navy" />
                        <span>{unit.kontak}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </article>
  );
}
