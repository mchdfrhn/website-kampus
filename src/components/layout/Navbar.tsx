import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from './MobileMenu';
import HomeNavLink from './HomeNavLink';
import NavDesktopItems from './NavDesktopItems';
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
    <header className="h-20">
      <div className="fixed inset-x-0 top-0 z-50 bg-brand-navy border-b border-white/10 shadow-[0_14px_40px_rgba(0,44,102,0.28)]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center h-20 gap-3">
            <HomeNavLink
              href="/"
              className="group flex min-w-0 flex-1 items-center gap-3 xl:mr-8 xl:flex-none xl:min-w-max"
              ariaLabel={`STTPU — Beranda`}
            >
              {settings.logoUrl ? (
                <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-xl shadow-lg shadow-black/20 transition-transform duration-500 group-hover:scale-105 sm:h-11 sm:w-11">
                  <Image
                    src={settings.logoUrl}
                    alt={settings.namaInstitusi}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-brand-gold text-center text-[10px] font-bold leading-tight text-brand-navy shadow-lg shadow-brand-gold/20 transition-transform duration-500 group-hover:scale-105 sm:h-11 sm:w-11 sm:text-[12px]"
                  aria-hidden="true"
                >
                  STTPU
                </div>
              )}
              <div className="min-w-0 text-white">
                <div className="truncate text-base font-bold leading-tight tracking-tight uppercase sm:text-lg">STTPU</div>
                <div className="mt-0.5 hidden truncate text-[10px] font-bold leading-tight tracking-wider text-white/40 uppercase sm:block">
                  {settings.namaInstitusi}
                </div>
              </div>
            </HomeNavLink>

            <NavDesktopItems navItems={navItems} />

            <div className="ml-auto hidden flex-shrink-0 xl:block">
              <Link
                href="/portal"
                className="inline-flex items-center px-6 py-2.5 bg-brand-gold text-brand-navy font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white hover:text-brand-navy hover:shadow-2xl hover:shadow-brand-gold/20 transition-all duration-500 shadow-xl shadow-brand-gold/10"
              >
                Portal
              </Link>
            </div>

            <div className="ml-auto flex-shrink-0 xl:hidden">
              <MobileMenu navItems={navItems} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
