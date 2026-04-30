import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArtikelDetailContent from '@/components/sections/berita/ArtikelDetailContent';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getPayloadClient } from '@/lib/payload';
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildPageMetadata,
} from '@/lib/seo';
import {

  mapPayloadToArtikel,
  resolveArtikelKategori,
  type Artikel,
  type ArtikelKategori,
} from '@/lib/data/berita';

async function fetchArtikelBySlug(slug: string): Promise<Artikel | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'berita',
      where: { slug: { equals: slug }, status: { equals: 'terbit' } },
      limit: 1,
      depth: 1,
    });
    if (result.docs.length > 0) return mapPayloadToArtikel(result.docs[0]);
  } catch {
    return null;
  }
  return null;
}

async function fetchArtikelTerkait(slug: string, kategoriId?: string): Promise<Artikel[]> {
  if (!kategoriId) return [];

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'berita',
      where: {
        and: [
          { status: { equals: 'terbit' } },
          { kategori: { equals: kategoriId } },
          { slug: { not_equals: slug } },
        ],
      },
      limit: 3,
      sort: '-tanggalTerbit',
      depth: 1,
    });
    if (result.docs.length > 0) return result.docs.map(mapPayloadToArtikel);
  } catch {
    return [];
  }
  return [];
}

async function fetchKategoriBerita(): Promise<ArtikelKategori[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'kategori-berita',
      limit: 100,
      sort: 'urutan',
    });

    return result.docs.map(resolveArtikelKategori).filter((item) => item.slug);
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  if (process.env.BUILD_SKIP_DB) return [];
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'berita',
      where: { status: { equals: 'terbit' } },
      limit: 1000,
      select: { slug: true },
    });
    if (result.docs.length > 0) {
      return result.docs.map((doc) => ({ slug: doc.slug as string }));
    }
  } catch {
    // ignore
  }
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artikel = await fetchArtikelBySlug(slug);
  if (!artikel) return {};
  return buildPageMetadata({
    title: `${artikel.judul} | STTPU Jakarta`,
    description: artikel.ringkasan,
    path: `/berita/${artikel.slug}`,
    image: artikel.thumbnailUrl,
    type: 'article',
  });
}

export default async function ArtikelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artikel = await fetchArtikelBySlug(slug);
  if (!artikel) notFound();

  const [artikelTerkait, categories] = await Promise.all([
    fetchArtikelTerkait(slug, artikel.kategori.id),
    fetchKategoriBerita(),
  ]);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'Berita', path: '/berita' },
    { name: artikel.judul, path: `/berita/${artikel.slug}` },
  ]);
  const articleJsonLd = buildArticleJsonLd({
    title: artikel.judul,
    description: artikel.ringkasan,
    path: `/berita/${artikel.slug}`,
    image: artikel.thumbnailUrl,
    datePublished: artikel.tanggalTerbit,
    dateModified: artikel.tanggalTerbit,
    authorName: artikel.penulis,
  });

  return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Breadcrumbs
              customItems={[
                { label: 'Berita', href: '/berita' },
                { label: artikel.judul, href: `/berita/${artikel.slug}` }
              ]} />
          </div>
        </div>
        <ArtikelDetailContent artikel={artikel} artikelTerkait={artikelTerkait} categories={categories} />
      </>
  );
}
