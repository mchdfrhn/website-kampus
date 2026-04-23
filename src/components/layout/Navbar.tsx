import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { getPayloadClient } from '@/lib/payload';
import { getAkademikNavigation } from '@/lib/akademik-navigation';
import {
  resolveKemahasiswaanSections,
  resolvePenelitianSections,
  resolveTentangSections,
  type PayloadSectionMeta,
} from '@/lib/frontend-section-routing';
import { synchronizeNavChildren } from '@/lib/section-links';

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; id?: string | null }[] | null;
  id?: string | null;
};

const NavDesktopItems = dynamic(() => import('./NavDesktopItems'), { ssr: true });
const MobileMenu = dynamic(() => import('./MobileMenu'), { ssr: true });
const HomeNavLink = dynamic(() => import('./HomeNavLink'), { ssr: true });

type MediaValue = {
  url?: string | null;
} | null;

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

function synchronizeNavItems(
  navItems: NavItem[],
  options: {
    tentangChildren: NavItem['children'];
    akademikChildren: NavItem['children'];
    kemahasiswaanChildren: NavItem['children'];
    penelitianChildren: NavItem['children'];
  },
) {
  return navItems.map((item) => {
    const normalizedHref = item.href.toLowerCase();
    const normalizedLabel = item.label.trim().toLowerCase();

    if (normalizedHref === '/tentang' || normalizedLabel === 'tentang') {
      return { ...item, children: options.tentangChildren };
    }

    if (normalizedLabel === 'akademik') {
      return { ...item, children: options.akademikChildren };
    }

    if (normalizedHref === '/kemahasiswaan' || normalizedLabel === 'kemahasiswaan') {
      return { ...item, children: options.kemahasiswaanChildren };
    }

    if (normalizedHref === '/penelitian' || normalizedLabel === 'penelitian') {
      return { ...item, children: options.penelitianChildren };
    }

    return item;
  });
}

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

    const [menu, siteSettings, tentangGlobal, kemahasiswaanGlobal, penelitianGlobal] = await Promise.all([
      payload.findGlobal({ slug: 'main-menu' }),
      payload.findGlobal({ slug: 'site-settings', depth: 1 }),
      payload.findGlobal({ slug: 'tentang-kami' }),
      payload.findGlobal({ slug: 'kemahasiswaan-page' as never }),
      payload.findGlobal({ slug: 'penelitian-page' as never }),
    ]);

    const tentangSections = resolveTentangSections(
      ((tentangGlobal as { subpages?: PayloadSectionMeta[] })?.subpages) || [],
    );
    const kemahasiswaanSections = resolveKemahasiswaanSections(
      ((kemahasiswaanGlobal as { subpages?: PayloadSectionMeta[] })?.subpages) || [],
    );
    const penelitianSections = resolvePenelitianSections(
      ((penelitianGlobal as { subpages?: PayloadSectionMeta[] })?.subpages) || [],
    );
    const akademikNavigation = await getAkademikNavigation();

    const syncedFallbackNavItems = synchronizeNavItems(fallbackNavItems, {
      tentangChildren: synchronizeNavChildren('/tentang', tentangSections, fallbackNavItems[1].children || []),
      akademikChildren: akademikNavigation.links.map((link) => ({ label: link.label, href: link.href })),
      kemahasiswaanChildren: synchronizeNavChildren('/kemahasiswaan', kemahasiswaanSections, fallbackNavItems[3].children || []),
      penelitianChildren: synchronizeNavChildren('/penelitian', penelitianSections, fallbackNavItems[4].children || []),
    });

    if (menu.navItems && menu.navItems.length > 0) {
      navItems = synchronizeNavItems(menu.navItems as NavItem[], {
        tentangChildren: synchronizeNavChildren(
          '/tentang',
          tentangSections,
          ((menu.navItems as NavItem[]).find((item) => item.href === '/tentang' || item.label === 'Tentang')?.children || fallbackNavItems[1].children || []),
        ),
        akademikChildren: akademikNavigation.links.map((link) => ({ label: link.label, href: link.href })),
        kemahasiswaanChildren: synchronizeNavChildren(
          '/kemahasiswaan',
          kemahasiswaanSections,
          ((menu.navItems as NavItem[]).find((item) => item.href === '/kemahasiswaan' || item.label === 'Kemahasiswaan')?.children || fallbackNavItems[3].children || []),
        ),
        penelitianChildren: synchronizeNavChildren(
          '/penelitian',
          penelitianSections,
          ((menu.navItems as NavItem[]).find((item) => item.href === '/penelitian' || item.label === 'Penelitian')?.children || fallbackNavItems[4].children || []),
        ),
      });
    } else {
      navItems = syncedFallbackNavItems;
    }

    if (siteSettings) {
      const logo = (typeof siteSettings.logo === 'object' ? siteSettings.logo : null) as MediaValue;
      const favicon = (typeof siteSettings.favicon === 'object' ? siteSettings.favicon : null) as MediaValue;

      settings = {
        teleponUtama: siteSettings.teleponUtama || settings.teleponUtama,
        teleponUtamaHref: siteSettings.teleponUtamaHref || settings.teleponUtamaHref,
        emailUtama: siteSettings.emailUtama || settings.emailUtama,
        namaInstitusi: siteSettings.namaInstitusi || settings.namaInstitusi,
        logoUrl: logo?.url || favicon?.url || null
      };
    }
  } catch (error) {
    console.error('Error fetching navigation or settings:', error);
  }
  return (
    <header className="h-20">
      <div className="fixed inset-x-0 top-0 z-50 bg-brand-navy/95 backdrop-blur-md border-b border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center h-20 gap-3">
            <HomeNavLink
              href="/"
              className="group flex min-w-0 flex-1 items-center gap-3 xl:mr-8 xl:flex-none xl:min-w-max"
              ariaLabel={`STTPU — Beranda`}
            >
              {settings.logoUrl ? (
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-lg shadow-black/20 ring-1 ring-black/5 transition-transform duration-500 group-hover:scale-105 sm:h-12 sm:w-12 sm:p-2">
                  <div className="relative h-full w-full overflow-hidden rounded-lg">
                  <Image
                    src={settings.logoUrl}
                    alt={settings.namaInstitusi}
                    fill
                    className="object-contain"
                  />
                  </div>
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
              <MobileMenu
                navItems={navItems}
                logoUrl={settings.logoUrl}
                institutionName={settings.namaInstitusi}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
