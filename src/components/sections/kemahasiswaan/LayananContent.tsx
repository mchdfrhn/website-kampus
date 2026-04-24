import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { HeartHandshake, Briefcase, BookOpen, ShieldAlert, Landmark, MessageSquare } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';

const iconMap: Record<string, LucideIcon> = {
  HeartHandshake,
  Briefcase,
  BookOpen,
  ShieldAlert,
  Landmark,
  MessageSquare,
};

type LayananItem = {
  icon: string;
  nama: string;
  deskripsi: string;
  jam?: string;
  lokasi?: string;
  kontak?: { type: string; value: string }[];
  layananDetail?: { poin: string }[];
}

const defaults: LayananItem[] = [
  {
    icon: 'HeartHandshake',
    nama: 'Bimbingan & Konseling',
    deskripsi: 'Layanan konseling psikologis dan akademik untuk mendukung kesehatan mental dan keberhasilan studi mahasiswa STTPU.',
    jam: 'Senin–Jumat 09.00–15.00 WIB',
    lokasi: 'Gedung A Lt. 1, Ruang BK',
    kontak: [{ type: 'tel', value: '(021) 2938-2938 ext. 103' }, { type: 'email', value: 'bk@sttpu.ac.id' }],
    layananDetail: [{ poin: 'Konseling individual' }, { poin: 'Konseling kelompok' }, { poin: 'Tes minat & bakat' }, { poin: 'Konsultasi studi lanjut' }],
  },
  {
    icon: 'Briefcase',
    nama: 'Career Center',
    deskripsi: 'Pusat pengembangan karir mahasiswa dan alumni: informasi lowongan, pelatihan soft skill, dan mediasi rekrutmen industri.',
    jam: 'Senin–Jumat 08.00–16.00 WIB',
    lokasi: 'Gedung B Lt. 2, Ruang Career Center',
    kontak: [{ type: 'email', value: 'career@sttpu.ac.id' }, { type: 'wa', value: '+6281234567890' }],
    layananDetail: [{ poin: 'Bursa kerja dan magang' }, { poin: 'Pelatihan interview & CV' }, { poin: 'Job fair tahunan' }, { poin: 'Mentoring alumni-mahasiswa' }],
  },
];

export default async function LayananContent() {
  let layanan = defaults

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'layanan',
      sort: 'urutan',
      limit: 20,
    })
    if (result.docs.length > 0) {
      layanan = result.docs as unknown as LayananItem[]
    }
  } catch {
    // DB unavailable — use defaults
  }

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
      <div className="mb-12 text-center lg:mb-16 lg:text-left">
        <h2 className="text-brand-navy font-bold text-3xl md:text-4xl tracking-tight leading-[1.2]">
          Layanan Mahasiswa
        </h2>
        <div className="w-12 h-1 bg-brand-gold rounded-full mt-6 mx-auto lg:mx-0" />
        <p className="mt-8 text-gray-500 font-medium max-w-3xl leading-relaxed mx-auto lg:mx-0 text-sm md:text-base">
          STTPU menyediakan berbagai layanan kemahasiswaan yang dapat diakses secara langsung maupun
          online untuk mendukung kelancaran studi, kesejahteraan, dan kesiapan karier mahasiswa.
        </p>
      </div>

      <div className="bg-brand-mist rounded-xl p-5 border border-gray-200">
        <p className="text-gray-700 text-sm leading-relaxed">
          Setiap layanan dirancang untuk membantu mahasiswa mendapatkan dukungan akademik,
          psikologis, administratif, hingga pengembangan karier dalam satu ekosistem kampus yang
          lebih responsif.
        </p>
      </div>

      <ul className="space-y-4">
        {layanan.map((l, idx) => {
          const Icon = iconMap[l.icon] || HeartHandshake;
          return (
            <li key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-brand-navy hover:shadow-sm transition-all">
              <div className="flex items-start gap-4 p-5">
                <div className="w-11 h-11 bg-brand-navy rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Icon size={20} className="text-brand-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{l.nama}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed mb-3">{l.deskripsi}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-3">
                    {l.layananDetail && l.layananDetail.length > 0 && (
                      <div>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Layanan</p>
                        <ul className="space-y-1">
                          {l.layananDetail.map((d, i) => (
                            <li key={i} className="flex items-center gap-1.5 text-xs text-gray-700">
                              <span className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" aria-hidden="true" />
                              {d.poin}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="space-y-2">
                      {l.jam && (
                        <div className="flex items-start gap-2 text-xs text-gray-500">
                          <Clock size={12} className="flex-shrink-0 mt-0.5 text-brand-navy" aria-hidden="true" />
                          {l.jam}
                        </div>
                      )}
                      {l.lokasi && (
                        <div className="flex items-start gap-2 text-xs text-gray-500">
                          <MapPin size={12} className="flex-shrink-0 mt-0.5 text-brand-navy" aria-hidden="true" />
                          {l.lokasi}
                        </div>
                      )}
                      {l.kontak?.map((k, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                          {k.type === 'tel' ? (
                            <><Phone size={12} className="flex-shrink-0 text-brand-navy" aria-hidden="true" />
                            <a href={`tel:${k.value.replace(/\D/g, '')}`} className="hover:text-brand-navy transition-colors">{k.value}</a></>
                          ) : k.type === 'email' ? (
                            <><Mail size={12} className="flex-shrink-0 text-brand-navy" aria-hidden="true" />
                            <a href={`mailto:${k.value}`} className="hover:text-brand-navy transition-colors">{k.value}</a></>
                          ) : (
                            <><MessageSquare size={12} className="flex-shrink-0 text-brand-navy" aria-hidden="true" />
                            <span>WhatsApp: {k.value}</span></>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
