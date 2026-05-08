import type { Metadata } from 'next';

type SeoMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  type?: 'website' | 'article' | 'profile';
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

const DEFAULT_SOCIAL_TITLE = 'STTPU Jakarta';
const DEFAULT_SOCIAL_DESCRIPTION =
  'Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta';

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://sttpu.ac.id';
}

export function toAbsoluteUrl(pathOrUrl?: string | null): string | undefined {
  if (!pathOrUrl) return undefined;

  try {
    return new URL(pathOrUrl, getSiteUrl()).toString();
  } catch {
    return undefined;
  }
}

export function buildOgImageUrl({
  title = DEFAULT_SOCIAL_TITLE,
  description = DEFAULT_SOCIAL_DESCRIPTION,
}: {
  title?: string | null;
  description?: string | null;
} = {}): string {
  const params = new URLSearchParams({
    title: title || DEFAULT_SOCIAL_TITLE,
    description: description || DEFAULT_SOCIAL_DESCRIPTION,
  });

  return `/api/og?${params.toString()}`;
}

export function getDefaultSocialImageUrl(): string {
  return toAbsoluteUrl(buildOgImageUrl()) || `${getSiteUrl()}/api/og`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
}: SeoMetadataOptions): Metadata {
  const absoluteUrl = toAbsoluteUrl(path);
  const fallbackImage = buildOgImageUrl({ title, description });
  const absoluteImage = toAbsoluteUrl(image || fallbackImage);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      siteName: 'STTPU Jakarta',
      locale: 'id_ID',
      type,
      images: absoluteImage
        ? [
            {
              url: absoluteImage,
              alt: title,
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(absoluteImage ? { images: [absoluteImage] } : {}),
    },
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

export function buildOrganizationJsonLd({
  name,
  description,
  logo,
  email,
  telephone,
  address,
  sameAs = [],
}: {
  name: string;
  description?: string | null;
  logo?: string | null;
  email?: string | null;
  telephone?: string | null;
  address?: string | null;
  sameAs?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    name,
    url: getSiteUrl(),
    ...(description ? { description } : {}),
    ...(logo ? { logo: toAbsoluteUrl(logo) } : {}),
    ...(email ? { email } : {}),
    ...(telephone ? { telephone } : {}),
    ...(address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: address,
            addressCountry: 'ID',
          },
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function buildWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'STTPU Jakarta',
    url: getSiteUrl(),
    inLanguage: 'id-ID',
  };
}

export function buildArticleJsonLd({
  title,
  description,
  path,
  image,
  datePublished,
  dateModified,
  authorName,
}: {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
  authorName?: string | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    mainEntityOfPage: toAbsoluteUrl(path),
    ...(image ? { image: [toAbsoluteUrl(image)] } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(authorName
      ? {
          author: {
            '@type': 'Person',
            name: authorName,
          },
        }
      : {}),
    publisher: {
      '@type': 'CollegeOrUniversity',
      name: 'STTPU Jakarta',
      url: getSiteUrl(),
    },
  };
}

export function buildPersonJsonLd({
  name,
  path,
  description,
  image,
  email,
  worksFor,
}: {
  name: string;
  path: string;
  description?: string | null;
  image?: string | null;
  email?: string | null;
  worksFor?: string | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url: toAbsoluteUrl(path),
    ...(description ? { description } : {}),
    ...(image ? { image: toAbsoluteUrl(image) } : {}),
    ...(email ? { email } : {}),
    ...(worksFor
      ? {
          worksFor: {
            '@type': 'CollegeOrUniversity',
            name: worksFor,
          },
        }
      : {}),
  };
}

export function buildProgramJsonLd({
  name,
  path,
  description,
  image,
  providerName,
  credentialCategory,
}: {
  name: string;
  path: string;
  description?: string | null;
  image?: string | null;
  providerName?: string | null;
  credentialCategory?: string | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name,
    url: toAbsoluteUrl(path),
    ...(description ? { description } : {}),
    ...(image ? { image: toAbsoluteUrl(image) } : {}),
    ...(credentialCategory ? { credentialCategory } : {}),
    ...(providerName
      ? {
          provider: {
            '@type': 'CollegeOrUniversity',
            name: providerName,
          },
        }
      : {}),
  };
}
