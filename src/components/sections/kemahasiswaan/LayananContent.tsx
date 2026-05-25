import { Phone, Mail, Clock, MapPin, Sparkles } from 'lucide-react';
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
    <article className="space-y-10 sm:space-y-12">
      <SectionCard title="Komitmen Layanan" eyebrow="Support System">
        <div className="flex items-start gap-4 p-5 rounded-2xl border border-brand-navy/10 bg-brand-navy/[0.02]">
          <Sparkles size={24} className="text-brand-navy flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-gray-600 text-sm font-semibold leading-relaxed">
            Setiap layanan dirancang untuk membantu mahasiswa mendapatkan dukungan akademik,
            psikologis, administratif, hingga pengembangan karier dalam satu ekosistem kampus yang
            lebih responsif.
          </p>
        </div>
      </SectionCard>

      <SectionCard title="Fasilitas Layanan" eyebrow="Student Services">
        <div className="space-y-6">
          {layanan.map((l, idx) => {
            const Icon = iconMap[l.icon] || HeartHandshake;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-premium hover:border-brand-navy/10 transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row items-start gap-6 p-6 sm:p-8">
                  <div className="w-14 h-14 bg-brand-navy rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm" aria-hidden="true">
                    <Icon size={24} className="text-brand-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h4 className="font-bold text-brand-navy text-base sm:text-lg leading-tight group-hover:text-brand-gold transition-colors duration-300">{l.nama}</h4>
                    </div>
                    <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed mb-6">{l.deskripsi}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 border-t border-gray-50">
                      {l.layananDetail && l.layananDetail.length > 0 && (
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Cakupan Layanan</p>
                          <ul className="space-y-2">
                            {l.layananDetail.map((d, i) => (
                              <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0" aria-hidden="true" />
                                {d.poin}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Informasi Kontak &amp; Operasional</p>
                        <div className="space-y-3">
                          {l.jam && (
                            <div className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-gray-500">
                              <Clock size={16} className="flex-shrink-0 mt-0.5 text-brand-navy" aria-hidden="true" />
                              <span>{l.jam}</span>
                            </div>
                          )}
                          {l.lokasi && (
                            <div className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-gray-500">
                              <MapPin size={16} className="flex-shrink-0 mt-0.5 text-brand-navy" aria-hidden="true" />
                              <span>{l.lokasi}</span>
                            </div>
                          )}
                          {l.kontak?.map((k, i) => (
                            <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-500">
                              {k.type === 'tel' ? (
                                <>
                                  <Phone size={16} className="flex-shrink-0 text-brand-navy" aria-hidden="true" />
                                  <a href={`tel:${k.value.replace(/\D/g, '')}`} className="hover:text-brand-gold transition-colors">{k.value}</a>
                                </>
                              ) : k.type === 'email' ? (
                                <>
                                  <Mail size={16} className="flex-shrink-0 text-brand-navy" aria-hidden="true" />
                                  <a href={`mailto:${k.value}`} className="hover:text-brand-gold transition-colors">{k.value}</a>
                                </>
                              ) : (
                                <>
                                  <MessageSquare size={16} className="flex-shrink-0 text-brand-navy" aria-hidden="true" />
                                  <span>WhatsApp: {k.value}</span>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>
    </article>
  );
}
