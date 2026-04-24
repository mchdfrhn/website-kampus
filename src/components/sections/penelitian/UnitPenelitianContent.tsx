import { FlaskConical, Users, Phone, MapPin } from 'lucide-react';
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
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
      <div className="mb-12 text-center lg:mb-16 lg:text-left">
        <h2 className="text-brand-navy font-bold text-3xl md:text-4xl tracking-tight leading-[1.2]">
          Unit Penelitian & Laboratorium
        </h2>
        <div className="w-12 h-1 bg-brand-gold rounded-full mt-6 mx-auto lg:mx-0" />
        <p className="mt-8 text-gray-500 font-medium max-w-3xl leading-relaxed mx-auto lg:mx-0 text-sm md:text-base">
          Peta unit riset dan laboratorium aktif di STTPU Jakarta yang menjadi pusat pengembangan
          keilmuan, eksperimen, dan kolaborasi dengan mahasiswa maupun mitra eksternal.
        </p>
      </div>

      <div className="bg-brand-mist rounded-xl p-5 border border-gray-200">
        <p className="text-sm text-gray-700 leading-relaxed">
          STTPU memiliki <strong>{units.length} unit riset dan laboratorium aktif</strong> yang mendukung tridarma
          perguruan tinggi. Setiap unit dibina oleh dosen doktor berpengalaman dan terbuka untuk
          kolaborasi penelitian dengan mahasiswa, industri, dan pemerintah.
        </p>
      </div>

      {units.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 p-10 text-center text-gray-500">
          Data unit penelitian belum tersedia.
        </div>
      ) : (
      <div className="space-y-5">
        {units.map((unit) => (
          <div key={unit.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-brand-navy hover:shadow-sm transition-all">
            <div className="px-5 py-4 border-b border-gray-100 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-navy flex items-center justify-center flex-shrink-0">
                <FlaskConical size={17} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm leading-snug">{unit.nama}</h3>
                {unit.singkatan && (
                  <span className="text-[11px] font-bold text-brand-navy bg-brand-mist px-2 py-0.5 rounded-full inline-block mt-1">{unit.singkatan}</span>
                )}
              </div>
            </div>

            <div className="px-5 py-4 space-y-3">
              <p className="text-xs text-gray-600 leading-relaxed">{unit.deskripsi}</p>

              {unit.fokus && unit.fokus.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Bidang Riset</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {unit.fokus.map((f: { poin?: string | null }, idx: number) => (
                      <li key={idx} className="text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">{f.poin}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                {unit.kepala && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Users size={13} aria-hidden="true" className="text-gray-400" />
                    <span><strong className="text-gray-700">{unit.kepala}</strong></span>
                  </div>
                )}
                {unit.lokasi && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin size={13} aria-hidden="true" className="text-gray-400" />
                    {unit.lokasi}
                  </div>
                )}
                {unit.kontak && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Phone size={13} aria-hidden="true" className="text-gray-400" />
                    {unit.kontak}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </article>
  );
}
