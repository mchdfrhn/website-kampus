import Link from 'next/link';
import { portals } from '@/lib/portals';
import {
  GraduationCap,
  BookOpen,
  Mail,
  Library,
  Calendar,
  CreditCard,
  ClipboardList,
  Users,
  FileText,
  Briefcase,
  MessageSquare,
  ChevronRight,
  ExternalLink,
  Info,
} from 'lucide-react';

const mahasiswaLinks = [
  { icon: ClipboardList, label: 'SIAKAD — KRS & Nilai', desc: 'Isi KRS, lihat nilai, dan transkrip', href: portals.siakad.mahasiswa, external: true },
  { icon: BookOpen, label: 'E-Learning (Moodle)', desc: 'Materi kuliah, tugas, dan ujian online', href: portals.lms.mahasiswa, external: true },
  { icon: Mail, label: 'Email Kampus', desc: 'Email institusi @mhs.sttpu.ac.id', href: 'https://mail.google.com', external: true },
  { icon: Library, label: 'Perpustakaan Digital', desc: 'Akses jurnal, e-book, dan koleksi digital', href: '#', external: true },
  { icon: Calendar, label: 'Kalender Akademik', desc: 'Jadwal perkuliahan dan ujian 2025/2026', href: '/akademik/kalender', external: false },
  { icon: GraduationCap, label: 'Info Beasiswa', desc: 'KIP Kuliah, beasiswa prestasi, dan lainnya', href: '/akademik/beasiswa', external: false },
  { icon: CreditCard, label: 'Pembayaran UKT', desc: 'Informasi tagihan dan konfirmasi pembayaran', href: '#', external: true },
  { icon: FileText, label: 'Surat Keterangan', desc: 'Pengajuan surat mahasiswa aktif & lainnya', href: '#', external: true },
];

const dosenLinks = [
  { icon: ClipboardList, label: 'SIAKAD — Portal Dosen', desc: 'Input nilai, presensi, dan data akademik', href: portals.siakad.dosen, external: true },
  { icon: BookOpen, label: 'E-Learning (Moodle)', desc: 'Kelola mata kuliah, materi, dan tugas', href: portals.lms.dosen, external: true },
  { icon: Mail, label: 'Email Kampus', desc: 'Email institusi @sttpu.ac.id', href: 'https://mail.google.com', external: true },
  { icon: Users, label: 'SIPEKAD', desc: 'Sistem informasi kepegawaian dan keuangan', href: portals.sipekad, external: true },
  { icon: Briefcase, label: 'Pengajuan Penelitian', desc: 'Proposal dan laporan penelitian & PKM', href: '#', external: true },
  { icon: Library, label: 'Perpustakaan Digital', desc: 'Akses jurnal dan database riset', href: '#', external: true },
  { icon: FileText, label: 'Beban Kerja Dosen (BKD)', desc: 'Input dan laporan BKD semester', href: '#', external: true },
  { icon: Calendar, label: 'Kalender Akademik', desc: 'Jadwal resmi kegiatan akademik', href: '/akademik/kalender', external: false },
];

const pengumuman = [
  { label: 'Jadwal UTS Semester Genap 2025/2026', href: '/berita/pengumuman-jadwal-uts-semester-genap-2025-2026', tanggal: '2 Maret 2026' },
  { label: 'Pendaftaran KIP Kuliah 2026/2027', href: '/berita/pendaftaran-kip-kuliah-2026-2027', tanggal: '1 Februari 2026' },
];

function LinkCard({
  icon: Icon,
  label,
  desc,
  href,
  external,
}: {
  icon: React.ElementType;
  label: string;
  desc: string;
  href: string;
  external: boolean;
}) {
  const cls =
    'flex items-start gap-3.5 p-4 bg-white border border-gray-200 rounded-xl hover:border-[#1E3A5F] hover:shadow-md transition-all group';

  const inner = (
    <>
      <div
        className="w-10 h-10 bg-[#1E3A5F]/10 group-hover:bg-[#1E3A5F] rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
        aria-hidden="true"
      >
        <Icon size={18} className="text-[#1E3A5F] group-hover:text-[#F5A623] transition-colors" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-[#1E3A5F] transition-colors flex items-center gap-1.5">
          {label}
          {external && href !== '#' && (
            <ExternalLink size={11} className="text-gray-400 flex-shrink-0" aria-hidden="true" />
          )}
          {href === '#' && (
            <span className="text-[10px] text-gray-400 font-normal">(segera)</span>
          )}
        </p>
        <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{desc}</p>
      </div>
      <ChevronRight
        size={14}
        className="text-gray-300 group-hover:text-[#1E3A5F] flex-shrink-0 mt-1 transition-colors"
        aria-hidden="true"
      />
    </>
  );

  if (external && href !== '#') {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  if (href === '#') {
    return <div className={`${cls} opacity-70 cursor-default`}>{inner}</div>;
  }
  return <Link href={href} className={cls}>{inner}</Link>;
}

export default function PortalContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <Info size={16} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-amber-800 text-sm leading-relaxed">
          Portal ini menghubungkan Anda ke sistem-sistem digital STTPU. Beberapa sistem masih dalam
          tahap pengembangan dan akan segera aktif. Untuk kendala akses, hubungi UPT Teknologi
          Informasi STTPU.
        </p>
      </div>

      {pengumuman.length > 0 && (
        <section>
          <h2 className="font-bold text-[#1E3A5F] text-base mb-4 flex items-center gap-2">
            <MessageSquare size={16} className="text-[#F5A623]" aria-hidden="true" />
            Pengumuman Terbaru
          </h2>
          <ul className="space-y-2">
            {pengumuman.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="flex items-center justify-between gap-4 p-3.5 bg-white border border-gray-200 rounded-xl hover:border-[#1E3A5F] hover:bg-[#F0F4F8] transition-all group"
                >
                  <p className="text-sm text-gray-800 group-hover:text-[#1E3A5F] transition-colors font-medium line-clamp-1">
                    {p.label}
                  </p>
                  <span className="text-xs text-gray-400 flex-shrink-0">{p.tanggal}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[#1E3A5F] rounded-xl flex items-center justify-center" aria-hidden="true">
              <GraduationCap size={20} className="text-[#F5A623]" />
            </div>
            <div>
              <h2 className="font-bold text-[#1E3A5F] text-lg leading-tight">Portal Mahasiswa</h2>
              <p className="text-gray-500 text-xs">Akses layanan akademik dan administrasi</p>
            </div>
          </div>
          <ul className="space-y-3" aria-label="Layanan untuk mahasiswa">
            {mahasiswaLinks.map((link) => (
              <li key={link.label}>
                <LinkCard {...link} />
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[#F5A623] rounded-xl flex items-center justify-center" aria-hidden="true">
              <Users size={20} className="text-[#1E3A5F]" />
            </div>
            <div>
              <h2 className="font-bold text-[#1E3A5F] text-lg leading-tight">Portal Dosen &amp; Staf</h2>
              <p className="text-gray-500 text-xs">Akses layanan akademik dan kepegawaian</p>
            </div>
          </div>
          <ul className="space-y-3" aria-label="Layanan untuk dosen dan staf">
            {dosenLinks.map((link) => (
              <li key={link.label}>
                <LinkCard {...link} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="bg-[#1E3A5F] rounded-2xl p-6 text-white">
        <h2 className="font-bold text-base mb-2">Butuh Bantuan Teknis?</h2>
        <p className="text-white/75 text-sm mb-5 leading-relaxed">
          Jika mengalami kendala akses atau lupa kata sandi, hubungi UPT Teknologi Informasi STTPU.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:it@sttpu.ac.id"
            className="inline-flex items-center gap-2 bg-[#F5A623] text-[#1E3A5F] font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-[#e09615] transition-colors"
          >
            <Mail size={15} aria-hidden="true" />
            it@sttpu.ac.id
          </a>
          <a
            href={portals.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-white/20 transition-colors"
          >
            <MessageSquare size={15} aria-hidden="true" />
            Chat WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
