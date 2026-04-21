import type { Metadata } from 'next';
import Link from 'next/link';
import PortalContent from '@/components/sections/portal/PortalContent';

export const metadata: Metadata = {
  title: 'Portal | STTPU Jakarta',
  description:
    'Akses terpusat ke seluruh sistem digital STTPU Jakarta — SIAKAD, e-learning, email kampus, perpustakaan digital, dan layanan administrasi lainnya.',
};

export default function PortalPage() {
  return (
    <>
      <div className="bg-white border-b border-gray-200 px-6 py-2.5 text-sm">
        <div className="max-w-7xl mx-auto text-gray-500">
          <Link href="/" className="hover:text-brand-navy transition-colors">
            Beranda
          </Link>
          <span className="mx-2 text-gray-400">›</span>
          <span className="text-gray-700 font-medium">Portal</span>
        </div>
      </div>

      <div className="bg-brand-navy text-white px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-extrabold text-3xl mb-2">Portal STTPU</h1>
          <p className="text-white/85 text-sm leading-relaxed max-w-xl">
            Akses terpusat ke seluruh sistem digital STTPU Jakarta untuk mahasiswa, dosen, dan
            tenaga kependidikan.
          </p>
        </div>
      </div>

      <PortalContent />
    </>
  );
}
