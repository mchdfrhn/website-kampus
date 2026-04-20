import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';

type JamItem = { hari: string; jam?: string; tutup?: boolean }
type TeleponItem = { nomor: string; href?: string; label?: string }
type EmailItem = { email: string; label?: string }

const defaultSettings = {
  alamat: 'Jl. Pelajar Pejuang 45 No. 1, Kelurahan Babakan Ciparay, Kota Bandung, Jawa Barat 40264',
  teleponUtama: '(021) 555-1234',
  teleponUtamaHref: '+62215551234',
  teleponLainnya: [
    { nomor: '(021) 555-1235', href: '+62215551235', label: 'PMB' },
    { nomor: '(021) 555-1236', href: '+62215551236', label: 'Akademik' },
  ] as TeleponItem[],
  emailUtama: 'info@sttpu.ac.id',
  emailLainnya: [
    { email: 'pmb@sttpu.ac.id', label: 'Pendaftaran' },
    { email: 'akademik@sttpu.ac.id', label: 'Akademik' },
  ] as EmailItem[],
  whatsapp: '6281234567890',
  whatsappTampil: '+62 812-3456-7890',
  jamOperasional: [
    { hari: 'Senin – Jumat', jam: '08.00 – 16.00 WIB' },
    { hari: 'Sabtu', jam: '08.00 – 12.00 WIB' },
    { hari: 'Minggu & Libur', tutup: true },
  ] as JamItem[],
  googleMapsEmbed: '',
}

export default async function MapSection() {
  let s = defaultSettings

  try {
    const payload = await getPayloadClient()
    const global = await payload.findGlobal({ slug: 'site-settings' })
    const data = global as unknown as typeof defaultSettings
    if (data.alamat) s = { ...defaultSettings, ...data }
  } catch {
    // DB unavailable — use defaults
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      {s.googleMapsEmbed ? (
        <div className="lg:col-span-2 h-80 lg:h-[400px]">
          <iframe
            src={s.googleMapsEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi STTPU Jakarta"
          />
        </div>
      ) : (
        <div className="lg:col-span-2 h-80 lg:h-[400px] bg-gray-200 flex flex-col items-center justify-center gap-3 text-gray-500">
          <MapPin size={48} className="text-gray-400" />
          <span className="text-sm font-medium">Google Maps — Lokasi STTPU Jakarta</span>
        </div>
      )}

      <div className="bg-white p-7 border-l border-gray-200">
        <h2 className="font-bold text-[#1E3A5F] text-base mb-5">Informasi Kontak</h2>

        <div className="flex gap-3 items-start mb-4">
          <MapPin size={16} className="text-[#F5A623] flex-shrink-0 mt-0.5" />
          <div>
            <p className="uppercase text-gray-400 text-xs font-bold tracking-wide mb-0.5">Alamat</p>
            <p className="text-gray-700 text-sm leading-relaxed">{s.alamat}</p>
          </div>
        </div>

        <div className="flex gap-3 items-start mb-4">
          <Phone size={16} className="text-[#F5A623] flex-shrink-0 mt-0.5" />
          <div>
            <p className="uppercase text-gray-400 text-xs font-bold tracking-wide mb-0.5">Telepon</p>
            <div className="flex flex-col gap-0.5">
              {s.teleponUtamaHref ? (
                <a href={`tel:${s.teleponUtamaHref}`} className="text-gray-700 text-sm hover:text-[#1E3A5F] transition-colors">
                  {s.teleponUtama} — Kantor Pusat
                </a>
              ) : (
                <span className="text-gray-700 text-sm">{s.teleponUtama} — Kantor Pusat</span>
              )}
              {s.teleponLainnya?.map((t, i) => (
                t.href ? (
                  <a key={i} href={`tel:${t.href}`} className="text-gray-700 text-sm hover:text-[#1E3A5F] transition-colors">
                    {t.nomor}{t.label ? ` — ${t.label}` : ''}
                  </a>
                ) : (
                  <span key={i} className="text-gray-700 text-sm">{t.nomor}{t.label ? ` — ${t.label}` : ''}</span>
                )
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-start mb-4">
          <Mail size={16} className="text-[#F5A623] flex-shrink-0 mt-0.5" />
          <div>
            <p className="uppercase text-gray-400 text-xs font-bold tracking-wide mb-0.5">Email</p>
            <div className="flex flex-col gap-0.5">
              {s.emailUtama && (
                <a href={`mailto:${s.emailUtama}`} className="text-gray-700 text-sm hover:text-[#1E3A5F] transition-colors">
                  {s.emailUtama} — Umum
                </a>
              )}
              {s.emailLainnya?.map((e, i) => (
                <a key={i} href={`mailto:${e.email}`} className="text-gray-700 text-sm hover:text-[#1E3A5F] transition-colors">
                  {e.email}{e.label ? ` — ${e.label}` : ''}
                </a>
              ))}
            </div>
          </div>
        </div>

        {s.jamOperasional && s.jamOperasional.length > 0 && (
          <div className="flex gap-3 items-start mb-4">
            <Clock size={16} className="text-[#F5A623] flex-shrink-0 mt-0.5" />
            <div>
              <p className="uppercase text-gray-400 text-xs font-bold tracking-wide mb-0.5">Jam Operasional</p>
              <table className="text-sm text-gray-700">
                <tbody>
                  {s.jamOperasional.map((j, i) => (
                    <tr key={i}>
                      <td className={`pr-3 py-0.5 ${j.tutup ? 'text-gray-500' : ''}`}>{j.hari}</td>
                      <td className={`py-0.5 ${j.tutup ? 'text-gray-500' : ''}`}>{j.tutup ? 'Tutup' : j.jam}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {s.whatsapp && (
          <div className="flex gap-3 items-start">
            <MessageCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#25D366' }} />
            <div>
              <p className="uppercase text-gray-400 text-xs font-bold tracking-wide mb-0.5">WhatsApp</p>
              <a
                href={`https://wa.me/${s.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 text-sm hover:text-[#1E3A5F] transition-colors"
              >
                {s.whatsappTampil || `+${s.whatsapp}`}
              </a>
              <p className="text-gray-400 text-xs mt-0.5">Responsif Mon–Fri</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
