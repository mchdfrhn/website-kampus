import Link from 'next/link';
import { getPayloadClient } from '@/lib/payload';
import * as LucideIcons from 'lucide-react';
import {
  ChevronRight,
  ExternalLink,
  Info,
  Mail,
  MessageSquare,
  GraduationCap
} from 'lucide-react';

function LinkCard({
  icon: iconName,
  label,
  desc,
  href,
  external,
}: {
  icon: string;
  label: string;
  desc: string;
  href: string;
  external: boolean;
}) {
  // Map string icon name to Lucide component
  const Icon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[iconName] || LucideIcons.HelpCircle;

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

export default async function PortalContent() {
  let portalData: { portals?: { nama: string; url: string; deskripsi?: string; icon?: string }[] } | null = null;

  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'portal-links' });
    portalData = global as unknown as { portals?: { nama: string; url: string; deskripsi?: string; icon?: string }[] } | null;
  } catch (error) {
    console.error('Error fetching portal links:', error);
  }

  // Fallback data for safety
  const portals = portalData?.portals || [];

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[#1E3A5F] rounded-xl flex items-center justify-center" aria-hidden="true">
              <GraduationCap size={20} className="text-[#F5A623]" />
            </div>
            <div>
              <h2 className="font-bold text-[#1E3A5F] text-lg leading-tight">Portal & Tautan Sistem</h2>
              <p className="text-gray-500 text-xs">Akses layanan digital terintegrasi</p>
            </div>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3" aria-label="Daftar portal">
            {portals.map((link, idx: number) => (
              <li key={idx}>
                <LinkCard 
                  icon={link.icon || 'ExternalLink'} 
                  label={link.nama} 
                  desc={link.deskripsi || ''} 
                  href={link.url} 
                  external={link.url.startsWith('http')} 
                />
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-[#1E3A5F] rounded-2xl p-6 text-white self-start">
          <h2 className="font-bold text-base mb-2">Butuh Bantuan Teknis?</h2>
          <p className="text-white/75 text-sm mb-5 leading-relaxed">
            Jika mengalami kendala akses atau lupa kata sandi, hubungi UPT Teknologi Informasi STTPU.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:it@sttpu.ac.id"
              className="inline-flex items-center gap-2 bg-[#F5A623] text-[#1E3A5F] font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-[#e09615] transition-colors"
            >
              <Mail size={15} aria-hidden="true" />
              it@sttpu.ac.id
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-white/20 transition-colors"
            >
              <MessageSquare size={15} aria-hidden="true" />
              Chat WhatsApp Bantuan
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

