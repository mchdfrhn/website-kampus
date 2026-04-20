import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, ChevronDown, Accessibility } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { getPayloadClient } from '@/lib/payload';

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; id?: string | null }[] | null;
  id?: string | null;
};

const fallbackNavItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Tentang',
    href: '/tentang',
    children: [
      { label: 'Sejarah & Profil', href: '/tentang/sejarah' },
      { label: 'Visi, Misi & Nilai', href: '/tentang/visi-misi' },
      { label: 'Profil Pimpinan', href: '/tentang/pimpinan' },
      { label: 'Akreditasi & Legalitas', href: '/tentang/akreditasi' },
      { label: 'Struktur Organisasi', href: '/tentang/struktur-organisasi' },
      { label: 'Fasilitas Kampus', href: '/tentang/fasilitas' },
    ],
  },
  {
    label: 'Akademik',
    href: '#',
    children: [
      { label: 'Program Studi', href: '/akademik/program-studi' },
      { label: 'Dosen', href: '/akademik/dosen' },
      { label: 'Kalender Akademik', href: '/akademik/kalender' },
      { label: 'Beasiswa', href: '/akademik/beasiswa' },
    ],
  },
  {
    label: 'Kemahasiswaan',
    href: '/kemahasiswaan',
    children: [
      { label: 'Organisasi Mahasiswa', href: '/kemahasiswaan/organisasi' },
      { label: 'Unit Kegiatan Mahasiswa', href: '/kemahasiswaan/ukm' },
      { label: 'Prestasi Mahasiswa', href: '/kemahasiswaan/prestasi' },
      { label: 'Layanan Mahasiswa', href: '/kemahasiswaan/layanan' },
      { label: 'Panduan Mahasiswa Baru', href: '/kemahasiswaan/mahasiswa-baru' },
    ],
  },
  {
    label: 'Penelitian',
    href: '/penelitian',
    children: [
      { label: 'Unit Penelitian & Lab', href: '/penelitian/unit' },
      { label: 'Database Publikasi', href: '/penelitian/publikasi' },
      { label: 'Hibah & Pendanaan', href: '/penelitian/hibah' },
    ],
  },
  { label: 'Berita', href: '/berita' },
  { label: 'Galeri', href: '/galeri' },
  { label: 'Kontak', href: '/kontak' },
];

export default async function Navbar() {
  let navItems: NavItem[] = fallbackNavItems;
  let settings = {
    teleponUtama: '(021) 2938-2938',
    teleponUtamaHref: '+622129382938',
    emailUtama: 'info@sttpu.ac.id',
    namaInstitusi: 'STTPU Jakarta',
    logoUrl: null as string | null
  };

  try {
    const payload = await getPayloadClient();
    
    // Fetch Menu
    const menu = await payload.findGlobal({ slug: 'main-menu' });
    if (menu.navItems && menu.navItems.length > 0) {
      navItems = menu.navItems as NavItem[];
    }

    // Fetch Settings
    const siteSettings = await payload.findGlobal({ slug: 'site-settings', depth: 1 });
    if (siteSettings) {
      settings = {
        teleponUtama: siteSettings.teleponUtama || settings.teleponUtama,
        teleponUtamaHref: siteSettings.teleponUtamaHref || settings.teleponUtamaHref,
        emailUtama: siteSettings.emailUtama || settings.emailUtama,
        namaInstitusi: siteSettings.namaInstitusi || settings.namaInstitusi,
        logoUrl: typeof siteSettings.logo === 'object' && siteSettings.logo ? siteSettings.logo.url || null : null
      };
    }
  } catch (error) {
    console.error('Error fetching navigation or settings:', error);
  }
  return (
    <header>
      <div className="hidden md:block bg-[#F0F4F8] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9 text-xs text-gray-600">
            <div className="flex items-center gap-5">
              <a
                href={`tel:${settings.teleponUtamaHref}`}
                className="flex items-center gap-1.5 hover:text-[#1E3A5F] transition-colors"
                aria-label="Telepon STTPU"
              >
                <Phone size={12} className="text-[#1E3A5F]" />
                <span>{settings.teleponUtama}</span>
              </a>
              <a
                href={`mailto:${settings.emailUtama}`}
                className="flex items-center gap-1.5 hover:text-[#1E3A5F] transition-colors"
                aria-label="Email STTPU"
              >
                <Mail size={12} className="text-[#1E3A5F]" />
                <span>{settings.emailUtama}</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-gray-300 rounded overflow-hidden text-[11px]">
                <button
                  aria-label="Bahasa Indonesia"
                  className="px-2.5 py-1 bg-[#1E3A5F] text-white font-semibold"
                >
                  ID
                </button>
                <button
                  aria-label="English"
                  className="px-2.5 py-1 bg-white text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  EN
                </button>
              </div>
              <button
                aria-label="Aksesibilitas"
                className="flex items-center justify-center w-7 h-7 rounded border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 hover:text-[#1E3A5F] transition-colors"
              >
                <Accessibility size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <nav
        className="bg-[#1E3A5F] sticky top-0 z-30 shadow-md"
        aria-label="Navigasi utama"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              href="/"
              className="flex items-center gap-3 mr-6 flex-shrink-0"
              aria-label={`STTPU — Beranda`}
            >
              {settings.logoUrl ? (
                <div className="relative w-10 h-10">
                  <Image
                    src={settings.logoUrl}
                    alt={settings.namaInstitusi}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div
                  className="w-10 h-10 bg-[#F5A623] rounded flex items-center justify-center font-black text-[#1E3A5F] text-[11px] leading-tight text-center"
                  aria-hidden="true"
                >
                  STTPU
                </div>
              )}
              <div className="text-white">
                <div className="font-bold text-sm leading-tight">STTPU</div>
                <div className="text-white/70 text-[10px] leading-tight font-normal">
                  {settings.namaInstitusi}
                </div>
              </div>
            </Link>

            <ul className="hidden lg:flex flex-1 items-stretch gap-0" role="list">
              {navItems.map((item) =>
                item.children ? (
                  <li key={item.label} className="relative group">
                    <button
                      className="flex items-center gap-1 px-3.5 py-5 text-white/85 hover:text-white hover:bg-white/10 transition-colors text-sm whitespace-nowrap border-b-[3px] border-transparent group-hover:border-[#F5A623] group-hover:text-white h-full"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {item.label}
                      <ChevronDown size={14} className="opacity-70 group-hover:opacity-100 transition-transform group-hover:rotate-180" />
                    </button>
                    <ul
                      className="absolute top-full left-0 min-w-52 bg-white shadow-lg rounded-b border-t-2 border-[#F5A623] py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 translate-y-1 group-hover:translate-y-0"
                      role="menu"
                    >
                      {item.children.map((child) => (
                        <li key={child.label} role="none">
                          <Link
                            href={child.href}
                            role="menuitem"
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#1E3A5F] hover:text-white transition-colors"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="flex items-center px-3.5 py-5 text-white/85 hover:text-white hover:bg-white/10 transition-colors text-sm whitespace-nowrap border-b-[3px] border-transparent hover:border-[#F5A623] h-full"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>

            <div className="hidden lg:block ml-auto flex-shrink-0">
              <Link
                href="/portal"
                className="inline-flex items-center px-4 py-2 bg-[#F5A623] text-[#1E3A5F] font-bold text-sm rounded hover:bg-[#E09520] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5A623]"
              >
                Portal Mahasiswa
              </Link>
            </div>

            <div className="ml-auto lg:hidden">
              <MobileMenu navItems={navItems} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
