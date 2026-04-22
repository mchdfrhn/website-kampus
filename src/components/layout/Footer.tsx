import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Globe, Accessibility, Building2, PhoneCall } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';
import HomeNavLink from './HomeNavLink';

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

// Premium Brand Icons (SVG)
const BrandIcons = {
  instagram: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  ),
  facebook: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  ),
  youtube: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 2.78 2.78 0 0 0-.46-5.33z"></path>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
    </svg>
  ),
  linkedin: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  ),
  twitter: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z"></path>
    </svg>
  ),
  tiktok: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
    </svg>
  ),
}

const defaultContact = {
  namaInstitusi: 'STTPU Jakarta',
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

type MediaValue = {
  url?: string | null;
} | null;

export default async function Footer() {
  const currentYear = new Date().getFullYear()
  let contact = defaultContact
  let prodis: { label: string; href: string }[] = studyPrograms
  let links = quickLinks

  try {
    const payload = await getPayloadClient()
    const [settings, prodiDocs] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings' }),
      payload.find({
        collection: 'program-studi',
        where: { status: { equals: 'aktif' } },
        limit: 10,
        sort: 'urutan',
      }),
    ])

    if (settings) {
      contact = { ...defaultContact, ...(settings as unknown as typeof defaultContact) }
      const logo = (typeof settings.logo === 'object' ? settings.logo : null) as MediaValue
      const favicon = (typeof settings.favicon === 'object' ? settings.favicon : null) as MediaValue
      contact = {
        ...contact,
        logoUrl: logo?.url || favicon?.url || null,
      } as typeof defaultContact & { logoUrl?: string | null }
      const dynamicLinks = (settings as unknown as { footerQuickLinks?: { label: string; href: string }[] }).footerQuickLinks
      if (dynamicLinks && dynamicLinks.length > 0) {
        links = dynamicLinks
      }
    }

    if (prodiDocs.docs.length > 0) {
      prodis = prodiDocs.docs.map((doc) => {
        const d = doc as unknown as { nama: string; slug: string }
        return {
          label: d.nama,
          href: `/akademik/program-studi/${d.slug}`,
        }
      })
    }
  } catch {
    // DB unavailable — use defaults
  }

  const socials = contact.socialMedia ?? defaultContact.socialMedia

  return (
    <footer className="bg-brand-navy text-white relative overflow-hidden" aria-label="Footer">
      {/* Premium Decorative Layers */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      <div className="absolute -bottom-48 -right-48 w-[40rem] h-[40rem] bg-brand-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-12">
          <div className="lg:pr-12 text-left">
            <Link href="/" className="inline-flex items-center justify-start gap-4 sm:gap-5 mb-8 sm:mb-10 group" aria-label="STTPU — Beranda">
              {(contact as typeof defaultContact & { logoUrl?: string | null }).logoUrl ? (
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-lg shadow-black/20 ring-1 ring-black/5 transition-transform duration-700 group-hover:scale-110">
                  <div className="relative h-full w-full overflow-hidden rounded-lg">
                    <Image
                      src={(contact as typeof defaultContact & { logoUrl?: string | null }).logoUrl || ''}
                      alt={contact.namaInstitusi || defaultContact.namaInstitusi}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="w-14 h-14 bg-brand-gold rounded-xl flex items-center justify-center font-bold text-brand-navy text-sm leading-tight text-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-700"
                  aria-hidden="true"
                >
                  STTPU
                </div>
              )}
            <div className="text-white">
                <div className="font-bold text-xl leading-tight tracking-tight">STTPU</div>
                <div className="text-white/40 text-[10px] leading-tight font-bold uppercase tracking-wider mt-1">Jakarta</div>
              </div>
            </Link>
            <p className="text-white/30 text-sm leading-relaxed mb-8 sm:mb-10 font-medium italic">
              &ldquo;{contact.deskripsiFooter || defaultContact.deskripsiFooter}&rdquo;
            </p>
            <div className="flex items-center justify-start gap-3 sm:gap-4">
              {socials.map((s) => {
                const Icon = BrandIcons[s.platform as keyof typeof BrandIcons] || BrandIcons.instagram
                return (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.handle || s.platform}
                    className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-navy hover:border-brand-gold transition-all duration-500 group/social"
                  >
                    <Icon className="w-4.5 h-4.5 group-hover/social:scale-110 transition-all duration-500" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="text-left">
            <h3 className="font-bold text-[11px] mb-6 sm:mb-8 text-brand-gold uppercase tracking-wider">Navigasi</h3>
            <ul className="space-y-4" role="list">
              {links.map((link) => (
                <li key={link.label}>
                  {link.href === '/' ? (
                    <HomeNavLink href={link.href} className="text-white/40 text-sm font-medium hover:text-white transition-all inline-flex items-center gap-4 group">
                      <div className="w-1 h-1 rounded-full bg-brand-gold/20 group-hover:bg-brand-gold transition-all" aria-hidden="true" />
                      {link.label}
                    </HomeNavLink>
                  ) : (
                    <Link href={link.href} className="text-white/40 text-sm font-medium hover:text-white transition-all inline-flex items-center gap-4 group">
                      <div className="w-1 h-1 rounded-full bg-brand-gold/20 group-hover:bg-brand-gold transition-all" aria-hidden="true" />
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-left">
            <h3 className="font-bold text-[11px] mb-6 sm:mb-8 text-brand-gold uppercase tracking-wider">Akademik</h3>
            <ul className="space-y-4" role="list">
              {prodis.map((program) => (
                <li key={program.label}>
                  <Link href={program.href} className="text-white/40 text-sm font-medium hover:text-white transition-all inline-flex items-center gap-4 group">
                    <div className="w-1 h-1 rounded-full bg-brand-gold/20 group-hover:bg-brand-gold transition-all" aria-hidden="true" />
                    {program.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-left">
            <h3 className="font-bold text-[11px] mb-6 sm:mb-8 text-brand-gold uppercase tracking-wider">Hubungi</h3>
            <ul className="space-y-6" role="list">
              <li className="flex items-start justify-start gap-4 sm:gap-5 text-sm text-white/40 font-medium group">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-all duration-500">
                  <Building2 size={18} className="text-brand-gold" aria-hidden="true" />
                </div>
                <span className="leading-relaxed mt-1 break-words">{contact.alamat || defaultContact.alamat}</span>
              </li>
              {(contact.teleponUtamaHref || contact.teleponUtama) && (
                <li>
                  <a
                    href={contact.teleponUtamaHref ? `tel:${contact.teleponUtamaHref}` : '#'}
                    className="flex items-center justify-start gap-5 text-sm text-white/40 hover:text-white transition-all group"
                    aria-label="Telepon STTPU"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold/20 transition-all duration-500">
                      <PhoneCall size={18} className="text-brand-gold" aria-hidden="true" />
                    </div>
                    <span className="font-bold text-sm tracking-tight break-all">{contact.teleponUtama}</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 text-[10px] font-semibold uppercase tracking-widest text-white/40">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                {(contact.teleponUtamaHref || contact.teleponUtama) && (
                  <a
                    href={contact.teleponUtamaHref ? `tel:${contact.teleponUtamaHref}` : '#'}
                    className="flex items-center justify-start gap-2 hover:text-brand-gold transition-colors group"
                    aria-label="Telepon STTPU"
                  >
                    <Phone size={10} className="text-brand-gold/50 group-hover:text-brand-gold transition-colors" />
                    <span>{contact.teleponUtama}</span>
                  </a>
                )}
                {(contact.emailUtama || defaultContact.emailUtama) && (
                  <a
                    href={`mailto:${contact.emailUtama || defaultContact.emailUtama}`}
                    className="flex items-center justify-start gap-2 hover:text-brand-gold transition-colors group"
                    aria-label="Email STTPU"
                  >
                    <Mail size={10} className="text-brand-gold/50 group-hover:text-brand-gold transition-colors" />
                    <span className="break-all">{contact.emailUtama || defaultContact.emailUtama}</span>
                  </a>
                )}
              </div>
              <div className="flex items-center justify-start lg:justify-end gap-3 sm:gap-4">
                <div className="flex items-center border border-white/10 rounded-lg overflow-hidden h-6">
                  <button
                    aria-label="Bahasa Indonesia"
                    className="px-3 bg-brand-gold text-brand-navy font-bold"
                  >
                    ID
                  </button>
                  <button
                    aria-label="English"
                    className="px-3 text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    EN
                  </button>
                </div>
                <button
                  aria-label="Aksesibilitas"
                  className="flex items-center justify-center w-6 h-6 rounded-lg border border-white/10 text-white/50 hover:text-brand-gold hover:border-brand-gold/30 hover:bg-white/5 transition-all"
                >
                  <Accessibility size={12} />
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 text-[10px] text-white/20 font-bold uppercase tracking-wider">
            <span className="text-left">
              &copy; {currentYear} Sekolah Tinggi Teknologi Pekerjaan Umum. Excellence in Infrastructure.
            </span>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8">
              <Link href="/kebijakan-privasi" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
              <Link href="/syarat-ketentuan" className="hover:text-brand-gold transition-colors">Terms of Service</Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
