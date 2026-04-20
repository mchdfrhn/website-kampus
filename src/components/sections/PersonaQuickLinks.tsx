'use client';

import { useState } from 'react';
import { portals } from '@/lib/portals';

type LinkItem = { icon: string; label: string; href: string; external?: boolean }
type Tab = { id: string; label: string; links: LinkItem[] }

const staticTabs: Tab[] = [
  {
    id: 'calon',
    label: 'Calon Mahasiswa',
    links: [
      { icon: '📝', label: 'Cara Mendaftar',  href: portals.pmb, external: true },
      { icon: '🎓', label: 'Program Studi',   href: '/akademik/program-studi' },
      { icon: '💰', label: 'Biaya Kuliah',    href: portals.pmb + '#biaya', external: true },
      { icon: '🏆', label: 'Beasiswa',        href: '/akademik/beasiswa' },
      { icon: '🏛️', label: 'Fasilitas',       href: '/tentang#fasilitas' },
      { icon: '🗓️', label: 'Jadwal PMB',      href: portals.pmb + '#jadwal', external: true },
      { icon: '🔍', label: 'Cek Status',      href: portals.pmb + '#status', external: true },
      { icon: '💬', label: 'Tanya WhatsApp',  href: portals.whatsapp, external: true },
    ],
  },
  {
    id: 'aktif',
    label: 'Mahasiswa Aktif',
    links: [
      { icon: '📊', label: 'SIAKAD',           href: portals.siakad.mahasiswa, external: true },
      { icon: '📚', label: 'e-Learning (LMS)', href: portals.lms.mahasiswa, external: true },
      { icon: '📝', label: 'Pengajuan Akademik', href: portals.sipekad, external: true },
      { icon: '📢', label: 'Pengumuman',       href: '/berita?kategori=pengumuman' },
      { icon: '📜', label: 'Surat Keterangan', href: portals.sipekad, external: true },
      { icon: '💳', label: 'Bayar SPP',        href: portals.siakad.mahasiswa, external: true },
      { icon: '🔬', label: 'Penelitian',       href: '/penelitian' },
      { icon: '🎯', label: 'Bursa Kerja',      href: '/kemahasiswaan#karir' },
    ],
  },
  {
    id: 'dosen',
    label: 'Dosen & Staf',
    links: [
      { icon: '👨‍💻', label: 'Portal Dosen',      href: portals.siakad.dosen, external: true },
      { icon: '📚', label: 'LMS Pengajar',      href: portals.lms.dosen, external: true },
      { icon: '📝', label: 'Pengajuan Akademik', href: portals.sipekad, external: true },
      { icon: '🔬', label: 'Repositori Riset',  href: '/penelitian' },
      { icon: '📧', label: 'Email Kampus',      href: 'mailto:dosen@sttpu.ac.id' },
      { icon: '📋', label: 'Absensi & Nilai',   href: portals.siakad.dosen, external: true },
      { icon: '📑', label: 'Administrasi',      href: portals.sipekad, external: true },
      { icon: '🆘', label: 'IT Helpdesk',       href: '/kontak#it' },
    ],
  },
  {
    id: 'mitra',
    label: 'Mitra Industri',
    links: [
      { icon: '🤝', label: 'Kerjasama MoU',    href: '/kontak#kerjasama' },
      { icon: '🎯', label: 'Rekrutmen Alumni', href: '/kemahasiswaan#alumni' },
      { icon: '🏭', label: 'Magang Industri',  href: '/kemahasiswaan#magang' },
      { icon: '🔬', label: 'Riset Bersama',    href: '/penelitian' },
      { icon: '🏆', label: 'CSR & Beasiswa',   href: '/akademik/beasiswa' },
      { icon: '📊', label: 'Data Lulusan',     href: '/tentang#statistik' },
      { icon: '📞', label: 'Hubungi Kami',     href: '/kontak' },
      { icon: '🗂️', label: 'Profil Institusi', href: '/tentang' },
    ],
  },
];

interface Props {
  tabs?: Tab[]
}

export default function PersonaQuickLinks({ tabs }: Props) {
  const resolvedTabs = (tabs && tabs.length > 0) ? tabs : staticTabs
  const [activeTab, setActiveTab] = useState(resolvedTabs[0]?.id ?? '')
  const current = resolvedTabs.find((t) => t.id === activeTab) ?? resolvedTabs[0]

  if (!current) return null

  return (
    <section className="bg-[#1E3A5F] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-white font-extrabold text-3xl">Saya adalah...</h2>
          <div className="w-12 h-1 bg-[#F5A623] rounded mx-auto mt-3" />
          <p className="text-white/70 mt-4 text-base">
            Temukan informasi dan layanan yang paling relevan untuk kebutuhan Anda.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {resolvedTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#F5A623] text-[#1E3A5F]'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {current.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="bg-white/10 border border-white/15 rounded-lg p-4 text-center hover:bg-white/20 transition-colors no-underline"
            >
              <span className="text-3xl block mb-2">{link.icon}</span>
              <span className="text-white text-sm font-medium">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
