'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarLinks = [
  { label: 'Sejarah & Profil', href: '/tentang/sejarah' },
  { label: 'Visi, Misi & Nilai', href: '/tentang/visi-misi' },
  { label: 'Profil Pimpinan', href: '/tentang/pimpinan' },
  { label: 'Akreditasi & Legalitas', href: '/tentang/akreditasi' },
  { label: 'Struktur Organisasi', href: '/tentang/struktur-organisasi' },
  { label: 'Fasilitas Kampus', href: '/tentang/fasilitas' },
];

export default function TentangSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-[#1E3A5F] px-4 py-3">
          <p className="text-white font-bold text-sm uppercase tracking-wide">Tentang STTPU</p>
        </div>
        <nav aria-label="Navigasi Tentang">
          <ul role="list">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href} className="border-b border-gray-100 last:border-0">
                  <Link
                    href={link.href}
                    className={`flex items-center gap-2.5 px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? 'bg-[#F0F4F8] text-[#1E3A5F] font-semibold border-l-4 border-[#F5A623]'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#1E3A5F] border-l-4 border-transparent'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
