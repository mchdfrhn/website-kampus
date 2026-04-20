import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '../globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'STTPU — Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta',
    template: '%s | STTPU',
  },
  description:
    'Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta — pendidikan tinggi teknologi untuk infrastruktur dan pekerjaan umum Indonesia.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${plusJakartaSans.variable} antialiased font-sans`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1" id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
