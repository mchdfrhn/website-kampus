import type { Metadata } from 'next';
import { unstable_noStore as noStore } from 'next/cache';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RouteProgressProvider from '@/components/providers/RouteProgressProvider';
import ScrollProvider from '@/components/providers/ScrollProvider';
import PageTransition from '@/components/ui/motion/PageTransition';
import { getPayloadClient } from '@/lib/payload';

type MediaValue = {
  url?: string | null;
} | null;

export async function generateMetadata(): Promise<Metadata> {
  noStore();

  const baseMetadata: Metadata = {
    title: {
      default: 'STTPU — Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta',
      template: '%s | STTPU',
    },
    description:
      'Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta — pendidikan tinggi teknologi untuk infrastruktur dan pekerjaan umum Indonesia.',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  };

  try {
    const payload = await getPayloadClient();
    const siteSettings = await payload.findGlobal({ slug: 'site-settings', depth: 1 });
    const favicon = (typeof siteSettings.favicon === 'object' ? siteSettings.favicon : null) as MediaValue;

    if (!favicon?.url) {
      return baseMetadata;
    }

    return {
      ...baseMetadata,
      icons: {
        icon: favicon.url,
        shortcut: favicon.url,
        apple: favicon.url,
      },
    };
  } catch {
    return baseMetadata;
  }
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteProgressProvider>
      <ScrollProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1" id="main-content" tabIndex={-1}>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </div>
      </ScrollProvider>
    </RouteProgressProvider>
  );
}
