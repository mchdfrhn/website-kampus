'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Organisasi Mahasiswa', href: '/kemahasiswaan/organisasi' },
  { label: 'Unit Kegiatan Mahasiswa', href: '/kemahasiswaan/ukm' },
  { label: 'Prestasi Mahasiswa', href: '/kemahasiswaan/prestasi' },
  { label: 'Layanan Mahasiswa', href: '/kemahasiswaan/layanan' },
  { label: 'Panduan Mahasiswa Baru', href: '/kemahasiswaan/mahasiswa-baru' },
];

export default function KemahasiswaanSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-[#1E3A5F] px-4 py-3">
          <p className="text-white font-bold text-sm uppercase tracking-wide">Kemahasiswaan</p>
        </div>
        <nav aria-label="Navigasi Kemahasiswaan">
          <ul role="list">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href} className="border-b border-gray-100 last:border-0">
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-2.5 px-4 py-3 text-sm transition-colors border-l-4 ${
                      active
                        ? 'bg-[#F0F4F8] text-[#1E3A5F] font-semibold border-[#F5A623]'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-[#1E3A5F] border-transparent'
                    }`}
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
