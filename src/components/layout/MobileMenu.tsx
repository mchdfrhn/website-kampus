'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
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

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setOpenSubmenu(null);
  };

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  };

  return (
    <div className="lg:hidden">
      <button
        onClick={toggleMenu}
        aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
        aria-expanded={isOpen}
        className="flex items-center justify-center w-10 h-10 rounded text-white hover:bg-white/10 transition-colors"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-72 bg-[#1E3A5F] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <Link href="/" onClick={toggleMenu} className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#F5A623] rounded flex items-center justify-center font-black text-[#1E3A5F] text-xs leading-none">
              STTPU
            </div>
            <div className="text-white">
              <div className="font-bold text-sm leading-tight">STTPU</div>
              <div className="text-white/70 text-[10px] leading-tight">Sekolah Tinggi Teknologi PU Jakarta</div>
            </div>
          </Link>
          <button
            onClick={toggleMenu}
            aria-label="Tutup menu"
            className="w-8 h-8 flex items-center justify-center rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3" aria-label="Menu mobile">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    aria-expanded={openSubmenu === item.label}
                    className="w-full flex items-center justify-between px-5 py-3 text-white/85 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium"
                  >
                    <span>{item.label}</span>
                    {openSubmenu === item.label ? (
                      <ChevronDown size={16} className="text-[#F5A623]" />
                    ) : (
                      <ChevronRight size={16} className="text-white/50" />
                    )}
                  </button>
                  {openSubmenu === item.label && (
                    <div className="bg-black/20">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={toggleMenu}
                          className="flex items-center gap-2 pl-9 pr-5 py-2.5 text-white/75 hover:text-white hover:bg-white/10 transition-colors text-sm"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#F5A623] flex-shrink-0" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={toggleMenu}
                  className="flex items-center px-5 py-3 text-white/85 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="px-5 py-5 border-t border-white/10">
          <Link
            href="/portal"
            onClick={toggleMenu}
            className="flex items-center justify-center w-full py-3 bg-[#F5A623] text-[#1E3A5F] font-bold text-sm rounded hover:bg-[#E09520] transition-colors"
          >
            Portal Mahasiswa
          </Link>
        </div>
      </div>
    </div>
  );
}
