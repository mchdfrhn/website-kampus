import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RouteProgressProvider from "@/components/providers/RouteProgressProvider";
import ScrollProvider from "@/components/providers/ScrollProvider";
import MotionProvider from "@/components/providers/MotionProvider";
import PageTransition from "@/components/ui/motion/PageTransition";
import BackToTopControl from "@/components/sections/BackToTopControl";
import WhatsAppFloat from "@/components/sections/WhatsAppFloat";
import { getPayloadClient } from "@/lib/payload";
import {
  buildOgImageUrl,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
  getDefaultSocialImageUrl,
  getSiteUrl,
  toAbsoluteUrl,
} from "@/lib/seo";
import "../globals.css";

export const revalidate = 60;

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

type MediaValue = {
  url?: string | null;
} | null;

export async function generateMetadata(): Promise<Metadata> {
  const baseMetadata: Metadata = {
    title: {
      default: "STTPU — Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta",
      template: "%s | STTPU",
    },
    description:
      "Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta — pendidikan tinggi teknologi untuk infrastruktur dan pekerjaan umum Indonesia.",
    metadataBase: new URL(getSiteUrl()),
    alternates: {
      types: {
        "application/rss+xml": "/feed.xml",
      },
    },
    openGraph: {
      siteName: "STTPU Jakarta",
      locale: "id_ID",
      type: "website",
      title: "STTPU — Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta",
      description:
        "Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta — pendidikan tinggi teknologi untuk infrastruktur dan pekerjaan umum Indonesia.",
      url: getSiteUrl(),
      images: [
        {
          url: getDefaultSocialImageUrl(),
          alt: "STTPU Jakarta",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "STTPU — Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta",
      description:
        "Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta — pendidikan tinggi teknologi untuk infrastruktur dan pekerjaan umum Indonesia.",
      images: [getDefaultSocialImageUrl()],
    },
  };

  try {
    const payload = await getPayloadClient();
    const siteSettings = await payload.findGlobal({
      slug: "site-settings",
      depth: 1,
    });
    const favicon = (
      typeof siteSettings.favicon === "object" ? siteSettings.favicon : null
    ) as MediaValue;
    const socialMedia = Array.isArray(siteSettings.socialMedia)
      ? siteSettings.socialMedia
          .map((item) => (typeof item?.url === "string" ? item.url : ""))
          .filter(Boolean)
      : [];
    const socialImage = toAbsoluteUrl(
      buildOgImageUrl({
        title: siteSettings.namaInstitusi || "STTPU Jakarta",
        description: "Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta",
      })
    );

    return {
      ...baseMetadata,
      ...(favicon?.url
        ? {
            icons: {
              icon: favicon.url,
              shortcut: favicon.url,
              apple: favicon.url,
            },
          }
        : {}),
      openGraph: {
        ...baseMetadata.openGraph,
        title: "STTPU — Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta",
        description:
          "Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta — pendidikan tinggi teknologi untuk infrastruktur dan pekerjaan umum Indonesia.",
        url: getSiteUrl(),
        ...(socialImage
          ? {
              images: [
                {
                  url: socialImage,
                  alt: siteSettings.namaInstitusi || "STTPU Jakarta",
                  width: 1200,
                  height: 630,
                },
              ],
            }
          : {}),
      },
      twitter: {
        card: "summary_large_image",
        title: "STTPU — Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta",
        description:
          "Sekolah Tinggi Teknologi Pekerjaan Umum (STTPU) Jakarta — pendidikan tinggi teknologi untuk infrastruktur dan pekerjaan umum Indonesia.",
        ...(socialImage ? { images: [socialImage] } : {}),
      },
    };
  } catch {
    return baseMetadata;
  }
}

async function fetchSeoSettings() {
  try {
    const payload = await getPayloadClient();
    const siteSettings = await payload.findGlobal({
      slug: "site-settings",
      depth: 1,
    });
    const logo = (
      typeof siteSettings.logo === "object" ? siteSettings.logo : null
    ) as MediaValue;
    const favicon = (
      typeof siteSettings.favicon === "object" ? siteSettings.favicon : null
    ) as MediaValue;

    return {
      namaInstitusi: siteSettings.namaInstitusi || "STTPU Jakarta",
      deskripsiFooter: siteSettings.deskripsiFooter || null,
      logoUrl: logo?.url || favicon?.url || null,
      emailUtama: siteSettings.emailUtama || null,
      teleponUtama: siteSettings.teleponUtama || null,
      alamat: siteSettings.alamat || null,
      socialMedia: Array.isArray(siteSettings.socialMedia)
        ? siteSettings.socialMedia
            .map((item) => (typeof item?.url === "string" ? item.url : ""))
            .filter(Boolean)
        : [],
      whatsapp: (siteSettings as { whatsapp?: string })?.whatsapp || null,
    };
  } catch {
    return {
      namaInstitusi: "STTPU Jakarta",
      deskripsiFooter: null,
      logoUrl: null,
      emailUtama: null,
      teleponUtama: null,
      alamat: null,
      socialMedia: [] as string[],
      whatsapp: null,
    };
  }
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seoSettings = await fetchSeoSettings();
  const organizationJsonLd = buildOrganizationJsonLd({
    name: seoSettings.namaInstitusi,
    description: seoSettings.deskripsiFooter,
    logo: seoSettings.logoUrl,
    email: seoSettings.emailUtama,
    telephone: seoSettings.teleponUtama,
    address: seoSettings.alamat,
    sameAs: seoSettings.socialMedia,
  });
  const websiteJsonLd = buildWebsiteJsonLd();

  return (
    <html lang="id">
      <body className={`${plusJakartaSans.variable} antialiased font-sans`}>
        <MotionProvider>
          <RouteProgressProvider>
            {process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID && (
              <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID} />
            )}
            <ScrollProvider>
              <div className="flex flex-col min-h-screen">
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationJsonLd),
                  }}
                />
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
                />
                <Navbar />
                <main className="flex-1" id="main-content" tabIndex={-1}>
                  <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
                <BackToTopControl />
                <WhatsAppFloat waNumber={seoSettings.whatsapp ?? undefined} />
              </div>
            </ScrollProvider>
          </RouteProgressProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
