import Link from 'next/link';
import { ChevronRight, User } from 'lucide-react';
import { getAkademikNavigation } from '@/lib/akademik-navigation';

export default async function AkademikSidebar({ currentPath }: { currentPath: string }) {
  const { sidebarTitle, links } = await getAkademikNavigation();

  return (
    <aside className="space-y-6 lg:sticky lg:top-28 self-start">
      {/* Sidebar Navigation Links */}
      {links.length > 0 && (
        <div className="rounded-premium border border-gray-100 bg-white overflow-hidden shadow-sm shadow-brand-navy/[0.04] sm:rounded-premium-lg">
          <div className="border-b border-gray-50 px-6 py-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400 font-black">Menu</p>
            <h3 className="mt-1 text-sm sm:text-base font-bold tracking-tight text-brand-navy">{sidebarTitle}</h3>
          </div>
          <ul className="divide-y divide-gray-50">
            {links.map((link) => {
              // Match path prefix so /akademik/program-studi/teknik-sipil matches /akademik/program-studi
              const isActive = currentPath.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`group flex items-center justify-between px-6 py-4 text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-brand-navy/[0.02] text-brand-navy font-bold'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-brand-navy'
                    }`}
                  >
                    <span className={`pr-4 leading-relaxed font-bold ${isActive ? 'text-brand-navy font-extrabold' : ''}`}>
                      {link.label}
                    </span>
                    <ChevronRight
                      size={14}
                      className={`flex-shrink-0 transition-all ${
                        isActive ? 'text-brand-gold translate-x-0.5' : 'text-gray-300 group-hover:translate-x-1 group-hover:text-brand-gold'
                      }`}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* PMB Card */}
      <div className="overflow-hidden rounded-premium bg-brand-gold text-brand-navy shadow-xl shadow-brand-gold/5 sm:rounded-premium-lg">
        <div className="relative px-6 py-8">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-navy/55">Penerimaan Mahasiswa Baru</p>
              <h3 className="mt-3 text-xl font-bold tracking-tight leading-snug">Mulai Karir Anda di Bidang Infrastruktur</h3>
              <p className="mt-4 text-xs font-medium leading-relaxed text-brand-navy/70">
                Pendaftaran Mahasiswa Baru STTPU Jakarta telah dibuka. Bergabunglah bersama kami dan jadilah tenaga ahli profesional.
              </p>
            </div>
            <a
              href="https://siakadat.sttpu.ac.id/spmb"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-brand-navy px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-brand-navy/90"
            >
              Daftar Sekarang
            </a>
          </div>
        </div>
      </div>

      {/* Layanan Informasi Card */}
      <div className="rounded-premium border border-gray-100 bg-white p-6 shadow-sm shadow-brand-navy/[0.04] sm:rounded-premium-lg flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-navy/5">
              <User size={18} className="text-brand-navy" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">Layanan Informasi</p>
              <p className="mt-1 text-base font-bold tracking-tight text-brand-navy">Hubungi Kami</p>
            </div>
          </div>
          <p className="mt-5 text-xs font-medium leading-relaxed text-gray-600">
            Butuh informasi lebih lanjut mengenai perkuliahan, biaya kuliah, akreditasi, atau fasilitas kampus?
          </p>
        </div>
        <Link
          href="/kontak"
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-brand-navy px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy transition-all hover:bg-brand-navy hover:text-white"
        >
          Hubungi Humas
        </Link>
      </div>
    </aside>
  );
}
