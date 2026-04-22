"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus,
  GraduationCap, 
  Wallet, 
  Award, 
  School, 
  CalendarDays, 
  ClipboardCheck, 
  MessageCircle,
  LayoutDashboard,
  MonitorPlay,
  FileSignature,
  BellRing,
  FileCheck,
  CreditCard,
  FlaskConical,
  Briefcase,
  UserCheck,
  Presentation,
  Database,
  MailOpen,
  CheckSquare,
  Library,
  LifeBuoy,
  Handshake,
  HardHat,
  Atom,
  HeartHandshake,
  PieChart,
  PhoneForwarded,
  Book,
  LucideIcon,
  FileText
} from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/ui/motion/Reveal';
import BlueAbstractBackground from '@/components/ui/BlueAbstractBackground';

type LinkItem = { icon: string; label: string; href: string; external?: boolean }
type Tab = { id: string; label: string; links: LinkItem[] }

const iconMap: Record<string, LucideIcon> = {
  'Cara Mendaftar': UserPlus,
  'Program Studi': GraduationCap,
  'Biaya Kuliah': Wallet,
  'Beasiswa': Award,
  'Fasilitas': School,
  'Jadwal PMB': CalendarDays,
  'Cek Status': ClipboardCheck,
  'Tanya WhatsApp': MessageCircle,
  'SIAKAD': LayoutDashboard,
  'e-Learning (LMS)': MonitorPlay,
  'Pengajuan Akademik': FileSignature,
  'Pengumuman': BellRing,
  'Surat Keterangan': FileCheck,
  'Bayar SPP': CreditCard,
  'Penelitian': FlaskConical,
  'Bursa Kerja': Briefcase,
  'Portal Dosen': UserCheck,
  'LMS Pengajar': Presentation,
  'Repositori Riset': Database,
  'Email Kampus': MailOpen,
  'Absensi & Nilai': CheckSquare,
  'Administrasi': Library,
  'IT Helpdesk': LifeBuoy,
  'Kerjasama MoU': Handshake,
  'Rekrutmen Alumni': UserPlus,
  'Magang Industri': HardHat,
  'Riset Bersama': Atom,
  'CSR & Beasiswa': HeartHandshake,
  'Data Lulusan': PieChart,
  'Hubungi Kami': PhoneForwarded,
  'Profil Institusi': Book,
};

const staticTabs: Tab[] = [
  {
    id: 'calon',
    label: 'Calon Mahasiswa',
    links: [
      { icon: 'UserPlus', label: 'Cara Mendaftar',  href: 'https://pmb.sttpu.civitas.id/', external: true },
      { icon: 'GraduationCap', label: 'Program Studi',   href: '/akademik/program-studi' },
      { icon: 'Wallet', label: 'Biaya Kuliah',    href: 'https://pmb.sttpu.civitas.id/#biaya', external: true },
      { icon: 'Award', label: 'Beasiswa',        href: '/akademik/beasiswa' },
      { icon: 'School', label: 'Fasilitas',       href: '/tentang#fasilitas' },
      { icon: 'CalendarDays', label: 'Jadwal PMB',      href: 'https://pmb.sttpu.civitas.id/#jadwal', external: true },
      { icon: 'ClipboardCheck', label: 'Cek Status',      href: 'https://pmb.sttpu.civitas.id/#status', external: true },
      { icon: 'MessageCircle', label: 'Tanya WhatsApp',  href: 'https://wa.me/6285771826637', external: true },
    ],
  },
  {
    id: 'aktif',
    label: 'Mahasiswa Aktif',
    links: [
      { icon: 'LayoutDashboard', label: 'SIAKAD',           href: 'https://mhs.sttpu.civitas.id/', external: true },
      { icon: 'MonitorPlay', label: 'e-Learning (LMS)', href: 'https://sttpu.lms.civitas.id/', external: true },
      { icon: 'FileSignature', label: 'Pengajuan Akademik', href: 'https://app.sipekad.web.id/', external: true },
      { icon: 'BellRing', label: 'Pengumuman',       href: '/berita?kategori=pengumuman' },
      { icon: 'FileCheck', label: 'Surat Keterangan', href: 'https://app.sipekad.web.id/', external: true },
      { icon: 'CreditCard', label: 'Bayar SPP',        href: 'https://mhs.sttpu.civitas.id/', external: true },
      { icon: 'FlaskConical', label: 'Penelitian',       href: '/penelitian' },
      { icon: 'Briefcase', label: 'Bursa Kerja',      href: '/kemahasiswaan#karir' },
    ],
  },
  {
    id: 'dosen',
    label: 'Dosen & Staf',
    links: [
      { icon: 'UserCheck', label: 'Portal Dosen',      href: 'https://sttsaptataruna.portaldosen.siakad.tech/', external: true },
      { icon: 'Presentation', label: 'LMS Pengajar',      href: 'https://sttpu.dosen.lms.civitas.id/', external: true },
      { icon: 'FileSignature', label: 'Pengajuan Akademik', href: 'https://app.sipekad.web.id/', external: true },
      { icon: 'Database', label: 'Repositori Riset',  href: '/penelitian' },
      { icon: 'MailOpen', label: 'Email Kampus',      href: 'mailto:dosen@sttpu.ac.id' },
      { icon: 'CheckSquare', label: 'Absensi & Nilai',   href: 'https://sttsaptataruna.portaldosen.siakad.tech/', external: true },
      { icon: 'Library', label: 'Administrasi',      href: 'https://app.sipekad.web.id/', external: true },
      { icon: 'LifeBuoy', label: 'IT Helpdesk',       href: '/kontak#it' },
    ],
  },
  {
    id: 'mitra',
    label: 'Mitra Industri',
    links: [
      { icon: 'Handshake', label: 'Kerjasama MoU',    href: '/kontak#kerjasama' },
      { icon: 'UserPlus', label: 'Rekrutmen Alumni', href: '/kemahasiswaan#alumni' },
      { icon: 'HardHat', label: 'Magang Industri',  href: '/kemahasiswaan#magang' },
      { icon: 'Atom', label: 'Riset Bersama',    href: '/penelitian' },
      { icon: 'HeartHandshake', label: 'CSR & Beasiswa',   href: '/akademik/beasiswa' },
      { icon: 'PieChart', label: 'Data Lulusan',     href: '/tentang#statistik' },
      { icon: 'PhoneForwarded', label: 'Hubungi Kami',     href: '/kontak' },
      { icon: 'Book', label: 'Profil Institusi', href: '/tentang' },
    ],
  },
];

// Helper to strip emojis from text
const stripEmojis = (text: string) => {
  return text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}]/gu, '').trim();
}

// Helper to get icon component
const getIcon = (iconName: string, label: string) => {
  // Try direct match from lucide icons we imported
  const iconMapInternal: Record<string, LucideIcon> = {
    UserPlus, GraduationCap, Wallet, Award, School, CalendarDays, ClipboardCheck, 
    MessageCircle, LayoutDashboard, MonitorPlay, FileSignature, BellRing, FileCheck, 
    CreditCard, FlaskConical, Briefcase, UserCheck, Presentation, Database, MailOpen, 
    CheckSquare, Library, LifeBuoy, Handshake, HardHat, Atom, HeartHandshake, 
    PieChart, PhoneForwarded, Book, FileText
  }
  
  const cleanedLabel = stripEmojis(label);
  return iconMapInternal[iconName] || iconMap[cleanedLabel] || iconMap[label] || FileText
}

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal width="100%">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-white font-bold text-3xl md:text-4xl tracking-tight leading-[1.2]">Akses Cepat & Layanan</h2>
            <div className="w-16 h-1 bg-brand-gold rounded-full mx-auto mt-6" />
            <p className="text-white/50 mt-6 text-base md:text-lg font-medium max-w-3xl mx-auto leading-relaxed">
              Temukan akses instan ke seluruh ekosistem layanan digital STTPU Jakarta yang telah dipersonalisasi untuk kebutuhan Anda.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center mb-10 sm:mb-16">
          {resolvedTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-500 cursor-pointer border ${
                activeTab === tab.id
                  ? 'bg-brand-gold text-brand-navy border-brand-gold shadow-2xl shadow-brand-gold/20 scale-105'
                  : 'bg-white/[0.03] text-white/40 border-white/5 hover:bg-white/[0.08] hover:text-white hover:border-white/10'
              }`}
            >
              {stripEmojis(tab.label)}
            </button>
          ))}
        </div>

        <div className="min-h-[320px] sm:min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {current.links.map((link) => (
                  <StaggerItem key={link.label}>
                    <a
                      href={link.href}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-2xl p-6 sm:p-8 lg:p-10 text-center hover:bg-white/[0.05] hover:border-brand-gold/20 active:scale-95 transition-all duration-500 no-underline flex flex-col items-center justify-center h-full"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/[0.03] rounded-2xl flex items-center justify-center mb-6 sm:mb-8 group-hover:bg-brand-gold transition-all duration-500 border border-white/5 shadow-2xl shadow-brand-navy/20">
                        {(() => {
                          const Icon = getIcon(link.icon, link.label)
                          return <Icon size={28} strokeWidth={1.5} className="text-brand-gold group-hover:text-brand-navy group-hover:scale-110 transition-all duration-500" />
                        })()}
                      </div>
                      <h3 className="text-white text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-brand-gold transition-colors leading-relaxed">
                        {stripEmojis(link.label)}
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
