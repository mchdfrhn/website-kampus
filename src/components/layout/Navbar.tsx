import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { unstable_cache } from 'next/cache';
import { getPayloadClient } from '@/lib/payload';
import { getAkademikNavigation } from '@/lib/akademik-navigation';
import {
  resolveKemahasiswaanSections,
  resolveTentangSections,
  resolveLppmSections,
  type PayloadSectionMeta,
  type ResolvedSectionConfig,
} from '@/lib/frontend-section-routing';
import { synchronizeNavChildren } from '@/lib/section-links';
import NavbarScrollWrapper from './NavbarScrollWrapper';
import NavPrefetcher from './NavPrefetcher';

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
    href: '#',
    children: [
      { label: 'Sejarah & Profil', href: '/tentang/sejarah' },
      { label: 'Visi, Misi & Nilai', href: '/tentang/visi-misi' },
      { label: 'Profil Pimpinan', href: '/tentang/pimpinan' },
      { label: 'Akreditasi & Legalitas', href: '/tentang/akreditasi' },
      { label: 'Struktur Organisasi', href: '/tentang/struktur-organisasi' },
      { label: 'Fasilitas Kampus', href: '/tentang/fasilitas' },
      { label: 'LPMI', href: '/lpmi/kebijakan' },
    ],
  },
  {
    label: 'Akademik',
    href: '/akademik',
    children: [
      { label: 'Program Studi', href: '/akademik/program-studi' },
      { label: 'Dosen', href: '/akademik/dosen' },
      { label: 'Kalender Akademik', href: '/akademik/kalender' },
      { label: 'Beasiswa', href: '/akademik/beasiswa' },
    ],
  },
  {
    label: 'Kemahasiswaan',
    href: '#',
    children: [
      { label: 'Organisasi Mahasiswa', href: '/kemahasiswaan/organisasi' },
      { label: 'Unit Kegiatan Mahasiswa', href: '/kemahasiswaan/ukm' },
      { label: 'Prestasi Mahasiswa', href: '/kemahasiswaan/prestasi' },
      { label: 'Layanan Mahasiswa', href: '/kemahasiswaan/layanan' },
      { label: 'Panduan Mahasiswa Baru', href: '/kemahasiswaan/mahasiswa-baru' },
    ],
  },
  {
    label: 'LPPM',
    href: '/lppm',
    children: [
      { label: 'Unit Penelitian', href: '/lppm/unit-penelitian' },
      { label: 'Publikasi', href: '/lppm/publikasi' },
      { label: 'Pedoman', href: '/lppm/pedoman' },
    ],
  },
  {
    label: 'LPMI',
    href: '/lpmi',
    children: [
      { label: 'Kebijakan', href: '/lpmi/kebijakan' },
      { label: 'Pedoman', href: '/lpmi/pedoman' },
      { label: 'Standar Pendidikan', href: '/lpmi/standar-pendidikan' },
      { label: 'Standar Penelitian', href: '/lpmi/standar-penelitian' },
      { label: 'Standar PKM', href: '/lpmi/standar-pkm' },
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
    lppmChildren: NavItem['children'];
    lpmiChildren: NavItem['children'];
  },
) {
  return navItems.map((item) => {
    const normalizedHref = item.href.toLowerCase();
    const normalizedLabel = item.label.trim().toLowerCase();

    let href = item.href;
    if (normalizedLabel === 'akademik') {
      href = '/akademik';
    } else if (normalizedLabel === 'lppm' && (!href || href === '#' || href.startsWith('/lppm/'))) {
      href = '/lppm';
    } else if (normalizedLabel === 'lpmi' && (!href || href === '#' || href.startsWith('/lpmi/'))) {
      href = '/lpmi';
    }

    let children = item.children;
    if (normalizedHref === '/tentang' || normalizedLabel === 'tentang') {
      children = options.tentangChildren;
    } else if (normalizedLabel === 'akademik') {
      children = options.akademikChildren;
    } else if (normalizedHref === '/kemahasiswaan' || normalizedLabel === 'kemahasiswaan') {
      children = options.kemahasiswaanChildren;
    } else if (normalizedHref === '/lppm' || normalizedLabel === 'lppm') {
      children = options.lppmChildren;
    } else if (normalizedHref === '/lpmi' || normalizedLabel === 'lpmi') {
      children = options.lpmiChildren;
    }

    if (children) {
      children = children.map((child) => {
        if (child.label.trim().toLowerCase() === 'lppm' && child.href.startsWith('/lppm/')) {
          return { ...child, href: '/lppm' };
        }
        if (child.label.trim().toLowerCase() === 'lpmi' && child.href.startsWith('/lpmi/')) {
          return { ...child, href: '/lpmi' };
        }
        return child;
      });
    }

    return { ...item, href, children };
  });
}

function buildSectionNavChildren(routeBase: string, sections: (PayloadSectionMeta | ResolvedSectionConfig)[]) {
  return sections.map((section) => ({
    label: section.breadcrumb || section.title,
    href: `${routeBase}/${section.slug}`,
  }));
}

const getNavbarData = unstable_cache(
  async () => {
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

    const [
      menu,
      siteSettings,
      tentangGlobal,
      kemahasiswaanGlobal,
      lppmGlobal,
      lpmiGlobal,
    ] = await Promise.all([
      payload.findGlobal({ slug: 'main-menu' }),
      payload.findGlobal({ slug: 'site-settings', depth: 1 }),
      payload.findGlobal({ slug: 'tentang-kami' }),
      payload.findGlobal({ slug: 'kemahasiswaan-page' as never }),
      payload.findGlobal({ slug: 'lppm-page' as never }),
      payload.findGlobal({ slug: 'lpmi-page' as never }),
    ]);

    const tentangSections = resolveTentangSections(
      ((tentangGlobal as { subpages?: PayloadSectionMeta[] })?.subpages) || [],
    );
    const kemahasiswaanSections = resolveKemahasiswaanSections(
      ((kemahasiswaanGlobal as { subpages?: PayloadSectionMeta[] })?.subpages) || [],
    );
    const lppmSections = resolveLppmSections(
      ((lppmGlobal as { subpages?: PayloadSectionMeta[] })?.subpages) || [],
    );

    const lpmiSubpages = ((lpmiGlobal as { subpages?: PayloadSectionMeta[] })?.subpages) || [];
    const lpmiChildren = lpmiSubpages.length > 0
      ? buildSectionNavChildren('/lpmi', lpmiSubpages)
      : fallbackNavItems[5].children || [];

    const lppmChildren = buildSectionNavChildren('/lppm', lppmSections);

    const akademikNavigation = await getAkademikNavigation();

    const syncedFallbackNavItems = synchronizeNavItems(fallbackNavItems, {
      tentangChildren: synchronizeNavChildren('/tentang', tentangSections, fallbackNavItems[1].children || []),
      akademikChildren: akademikNavigation.links.map((link) => ({ label: link.label, href: link.href })),
      kemahasiswaanChildren: synchronizeNavChildren('/kemahasiswaan', kemahasiswaanSections, fallbackNavItems[3].children || []),
      lppmChildren,
      lpmiChildren,
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
        lppmChildren,
        lpmiChildren,
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

  return { navItems, settings };
  },
  ['frontend-navbar-data'],
  { revalidate: 60 },
);

export default async function Navbar() {
  const { navItems, settings } = await getNavbarData();

  return (
    <>
      <NavPrefetcher navItems={navItems} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:px-4 focus:py-2 focus:bg-brand-gold focus:text-brand-navy focus:font-bold focus:rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy"
      >
        Lewati ke konten utama
      </a>
      <header className="h-20">
      <NavbarScrollWrapper>
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center h-20 gap-3">
            {/* Logo Wrapper */}
            <div className="flex-grow flex-1 flex items-center justify-start min-w-max">
              <HomeNavLink
                href="/"
                className="group flex min-w-0 items-center gap-3 xl:min-w-max"
                ariaLabel={`STTPU ${settings.namaInstitusi} — Beranda`}
              >
                {settings.logoUrl ? (
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-lg shadow-black/20 ring-1 ring-black/5 transition-transform duration-500 group-hover:scale-105 sm:h-12 sm:w-12 sm:p-2">
                    <div className="relative h-full w-full overflow-hidden rounded-lg">
                    <Image
                      src={settings.logoUrl}
                      alt={settings.namaInstitusi}
                      fill
                      sizes="48px"
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
                  <div className="mt-0.5 hidden truncate text-[10px] font-bold leading-tight tracking-wider text-white/40 uppercase 2xl:block">
                    {settings.namaInstitusi}
                  </div>
                </div>
              </HomeNavLink>
            </div>

            <NavDesktopItems navItems={navItems} />

            {/* Portal Wrapper */}
            <div className="hidden xl:flex flex-grow flex-1 items-center justify-end min-w-max">
              <Link
                href="/portal"
                className="inline-flex items-center px-4 py-2 xl:px-4 xl:py-2 2xl:px-6 2xl:py-2.5 bg-brand-gold text-brand-navy font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white hover:text-brand-navy hover:shadow-2xl hover:shadow-brand-gold/20 transition-all duration-500 shadow-xl shadow-brand-gold/10"
              >
                Portal
              </Link>
            </div>

            <div className="flex-shrink-0 xl:hidden">
              <MobileMenu
                navItems={navItems}
                logoUrl={settings.logoUrl}
                institutionName={settings.namaInstitusi}
              />
            </div>
          </div>
        </div>
      </NavbarScrollWrapper>
    </header>
    </>
  );
}
