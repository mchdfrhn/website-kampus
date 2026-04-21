"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/motion/Reveal';
import BlueAbstractBackground from '@/components/ui/BlueAbstractBackground';

type LinkItem = { icon: string; label: string; href: string; external?: boolean }
type Tab = { id: string; label: string; links: LinkItem[] }

const staticTabs: Tab[] = [
  {
    id: 'calon',
    label: 'Calon Mahasiswa',
    links: [
      { icon: '📝', label: 'Cara Mendaftar',  href: 'https://pmb.sttpu.civitas.id/', external: true },
      { icon: '🎓', label: 'Program Studi',   href: '/akademik/program-studi' },
      { icon: '💰', label: 'Biaya Kuliah',    href: 'https://pmb.sttpu.civitas.id/#biaya', external: true },
      { icon: '🏆', label: 'Beasiswa',        href: '/akademik/beasiswa' },
      { icon: '🏛️', label: 'Fasilitas',       href: '/tentang#fasilitas' },
      { icon: '🗓️', label: 'Jadwal PMB',      href: 'https://pmb.sttpu.civitas.id/#jadwal', external: true },
      { icon: '🔍', label: 'Cek Status',      href: 'https://pmb.sttpu.civitas.id/#status', external: true },
      { icon: '💬', label: 'Tanya WhatsApp',  href: 'https://wa.me/6285771826637', external: true },
    ],
  },
  {
    id: 'aktif',
    label: 'Mahasiswa Aktif',
    links: [
      { icon: '📊', label: 'SIAKAD',           href: 'https://mhs.sttpu.civitas.id/', external: true },
      { icon: '📚', label: 'e-Learning (LMS)', href: 'https://sttpu.lms.civitas.id/', external: true },
      { icon: '📝', label: 'Pengajuan Akademik', href: 'https://app.sipekad.web.id/', external: true },
      { icon: '📢', label: 'Pengumuman',       href: '/berita?kategori=pengumuman' },
      { icon: '📜', label: 'Surat Keterangan', href: 'https://app.sipekad.web.id/', external: true },
      { icon: '💳', label: 'Bayar SPP',        href: 'https://mhs.sttpu.civitas.id/', external: true },
      { icon: '🔬', label: 'Penelitian',       href: '/penelitian' },
      { icon: '🎯', label: 'Bursa Kerja',      href: '/kemahasiswaan#karir' },
    ],
  },
  {
    id: 'dosen',
    label: 'Dosen & Staf',
    links: [
      { icon: '👨‍💻', label: 'Portal Dosen',      href: 'https://sttsaptataruna.portaldosen.siakad.tech/', external: true },
      { icon: '📚', label: 'LMS Pengajar',      href: 'https://sttpu.dosen.lms.civitas.id/', external: true },
      { icon: '📝', label: 'Pengajuan Akademik', href: 'https://app.sipekad.web.id/', external: true },
      { icon: '🔬', label: 'Repositori Riset',  href: '/penelitian' },
      { icon: '📧', label: 'Email Kampus',      href: 'mailto:dosen@sttpu.ac.id' },
      { icon: '📋', label: 'Absensi & Nilai',   href: 'https://sttsaptataruna.portaldosen.siakad.tech/', external: true },
      { icon: '📑', label: 'Administrasi',      href: 'https://app.sipekad.web.id/', external: true },
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
    <section className="bg-brand-navy py-16 lg:py-24 relative overflow-hidden">
      <BlueAbstractBackground accentClassName="right-[14%]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-white font-bold text-3xl md:text-4xl tracking-tight leading-[1.2]">Akses Cepat & Layanan</h2>
            <div className="w-16 h-1 bg-brand-gold rounded-full mx-auto mt-6" />
            <p className="text-white/50 mt-6 text-base md:text-lg font-medium max-w-3xl mx-auto leading-relaxed">
              Temukan akses instan ke seluruh ekosistem layanan digital STTPU Jakarta yang telah dipersonalisasi untuk kebutuhan Anda.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {resolvedTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-500 cursor-pointer border ${
                activeTab === tab.id
                  ? 'bg-brand-gold text-brand-navy border-brand-gold shadow-2xl shadow-brand-gold/20 scale-105'
                  : 'bg-white/[0.03] text-white/40 border-white/5 hover:bg-white/[0.08] hover:text-white hover:border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {current.links.map((link) => (
                  <StaggerItem key={link.label}>
                    <a
                      href={link.href}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-2xl p-10 text-center hover:bg-white/[0.05] hover:border-brand-gold/20 active:scale-95 transition-all duration-500 no-underline flex flex-col items-center justify-center h-full"
                    >
                      <div className="w-16 h-16 bg-white/[0.03] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-gold transition-all duration-500 border border-white/5 shadow-2xl shadow-brand-navy/20">
                        <span className="text-3xl group-hover:scale-110 transition-transform duration-500">{link.icon}</span>
                      </div>
                      <h3 className="text-white text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-brand-gold transition-colors leading-relaxed">
                        {link.label}
                      </h3>
                      <div className="mt-6 w-6 h-0.5 bg-white/10 group-hover:w-12 group-hover:bg-brand-gold rounded-full transition-all duration-500" />
                    </a>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
