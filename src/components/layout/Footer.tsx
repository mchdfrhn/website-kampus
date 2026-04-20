import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Camera, PlayCircle, Users, X, Globe } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';

const quickLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang Kami', href: '/tentang' },
  { label: 'Program Studi', href: '/akademik/program-studi' },
  { label: 'Berita', href: '/berita' },
  { label: 'Kontak', href: '/kontak' },
  { label: 'Portal Mahasiswa', href: '/portal' },
];

const studyPrograms = [
  { label: 'Teknik Sipil', href: '/akademik/program-studi/teknik-sipil' },
  { label: 'Teknik Pengairan', href: '/akademik/program-studi/teknik-pengairan' },
  { label: 'Teknik Lingkungan', href: '/akademik/program-studi/teknik-lingkungan' },
  { label: 'Manajemen Konstruksi', href: '/akademik/program-studi/manajemen-konstruksi' },
];

const platformIcon: Record<string, React.ElementType> = {
  instagram: Camera,
  youtube: PlayCircle,
  facebook: Users,
  linkedin: Globe,
  twitter: X,
  tiktok: Camera,
}

const defaultContact = {
  alamat: 'Jl. Pattimura No.20, Kebayoran Baru, Jakarta Selatan 12110',
  teleponUtama: '(021) 2938-2938',
  teleponUtamaHref: '+622129382938',
  emailUtama: 'info@sttpu.ac.id',
  deskripsiFooter: 'Mencetak tenaga ahli teknologi pekerjaan umum yang kompeten, profesional, dan berdedikasi untuk pembangunan infrastruktur Indonesia.',
  socialMedia: [
    { platform: 'instagram', url: 'https://instagram.com/sttpu', handle: 'Instagram STTPU' },
    { platform: 'youtube', url: 'https://youtube.com/@sttpu', handle: 'YouTube STTPU' },
    { platform: 'facebook', url: 'https://facebook.com/sttpu', handle: 'Facebook STTPU' },
    { platform: 'twitter', url: 'https://twitter.com/sttpu', handle: 'Twitter/X STTPU' },
  ],
  jamOperasional: [
    { hari: 'Senin – Jumat', jam: '08.00 – 16.00 WIB' },
  ],
}

export default async function Footer() {
  const currentYear = new Date().getFullYear()
  let contact = defaultContact

  try {
    const payload = await getPayloadClient()
    const global = await payload.findGlobal({ slug: 'site-settings' })
    const data = global as unknown as typeof defaultContact
    if (data.alamat || data.teleponUtama) {
      contact = { ...defaultContact, ...data }
    }
  } catch {
    // DB unavailable — use defaults
  }

  const socials = contact.socialMedia ?? defaultContact.socialMedia
  const jamPrimary = contact.jamOperasional?.[0]

  return (
    <footer className="bg-[#1E3A5F] text-white" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-5" aria-label="STTPU — Beranda">
              <div
                className="w-10 h-10 bg-[#F5A623] rounded flex items-center justify-center font-black text-[#1E3A5F] text-[11px] leading-tight text-center flex-shrink-0"
                aria-hidden="true"
              >
                STTPU
              </div>
              <div>
                <div className="font-bold text-sm leading-tight">STTPU</div>
                <div className="text-white/60 text-[10px] leading-tight">Sekolah Tinggi Teknologi PU Jakarta</div>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              {contact.deskripsiFooter || defaultContact.deskripsiFooter}
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => {
                const Icon = platformIcon[s.platform] ?? Camera
                return (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.handle || s.platform}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F5A623] hover:text-[#1E3A5F] transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-sm mb-5 text-[#F5A623] uppercase tracking-wide">Tautan Cepat</h3>
            <ul className="space-y-2.5" role="list">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 text-sm hover:text-[#F5A623] transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#F5A623]/50 group-hover:bg-[#F5A623] transition-colors flex-shrink-0" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm mb-5 text-[#F5A623] uppercase tracking-wide">Program Studi</h3>
            <ul className="space-y-2.5" role="list">
              {studyPrograms.map((program) => (
                <li key={program.label}>
                  <Link href={program.href} className="text-white/70 text-sm hover:text-[#F5A623] transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#F5A623]/50 group-hover:bg-[#F5A623] transition-colors flex-shrink-0" aria-hidden="true" />
                    {program.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm mb-5 text-[#F5A623] uppercase tracking-wide">Kontak</h3>
            <ul className="space-y-4" role="list">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin size={15} className="text-[#F5A623] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{contact.alamat || defaultContact.alamat}</span>
              </li>
              {(contact.teleponUtamaHref || contact.teleponUtama) && (
                <li>
                  <a
                    href={contact.teleponUtamaHref ? `tel:${contact.teleponUtamaHref}` : '#'}
                    className="flex items-center gap-3 text-sm text-white/70 hover:text-[#F5A623] transition-colors"
                    aria-label="Telepon STTPU"
                  >
                    <Phone size={15} className="text-[#F5A623] flex-shrink-0" aria-hidden="true" />
                    <span>{contact.teleponUtama}</span>
                  </a>
                </li>
              )}
              {contact.emailUtama && (
                <li>
                  <a
                    href={`mailto:${contact.emailUtama}`}
                    className="flex items-center gap-3 text-sm text-white/70 hover:text-[#F5A623] transition-colors"
                    aria-label="Email STTPU"
                  >
                    <Mail size={15} className="text-[#F5A623] flex-shrink-0" aria-hidden="true" />
                    <span>{contact.emailUtama}</span>
                  </a>
                </li>
              )}
              {jamPrimary && (
                <li className="flex items-start gap-3 text-sm text-white/70">
                  <Clock size={15} className="text-[#F5A623] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <div>{jamPrimary.hari}</div>
                    <div>{jamPrimary.jam}</div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
            <span>
              &copy; {currentYear} Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta. Hak cipta dilindungi.
            </span>
            <div className="flex items-center gap-4">
              <Link href="/kebijakan-privasi" className="hover:text-white/80 transition-colors">Kebijakan Privasi</Link>
              <span aria-hidden="true">·</span>
              <Link href="/syarat-ketentuan" className="hover:text-white/80 transition-colors">Syarat &amp; Ketentuan</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
