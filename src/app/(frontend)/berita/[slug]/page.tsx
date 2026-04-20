import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArtikelDetailContent from '@/components/sections/berita/ArtikelDetailContent';
import { getPayloadClient } from '@/lib/payload';
import {
  artikelList as artikelStatic,
  getArtikelBySlug,
  mapPayloadToArtikel,
  type Artikel,
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
    return getArtikelBySlug(slug) ?? null;
  }
  return getArtikelBySlug(slug) ?? null;
}

async function fetchArtikelTerkait(slug: string, kategori: string): Promise<Artikel[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'berita',
      where: {
        and: [
          { status: { equals: 'terbit' } },
          { kategori: { equals: kategori } },
          { slug: { not_equals: slug } },
        ],
      },
      limit: 3,
      sort: '-tanggalTerbit',
      depth: 1,
    });
    if (result.docs.length > 0) return result.docs.map(mapPayloadToArtikel);
  } catch {
    // fallback below
  }
  return artikelStatic
    .filter((a) => a.slug !== slug && a.kategori === kategori)
    .slice(0, 3);
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
    // fallback to static slugs
  }
  return artikelStatic.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artikel = await fetchArtikelBySlug(slug);
  if (!artikel) return {};
  return {
    title: `${artikel.judul} | STTPU Jakarta`,
    description: artikel.ringkasan,
  };
}

export default async function ArtikelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artikel = await fetchArtikelBySlug(slug);
  if (!artikel) notFound();

  const artikelTerkait = await fetchArtikelTerkait(slug, artikel.kategori);

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-6 py-2.5 text-sm">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-gray-500">
            <Link href="/" className="hover:text-[#1E3A5F] transition-colors">
              Beranda
            </Link>
            <span className="mx-2 text-gray-400">›</span>
            <Link href="/berita" className="hover:text-[#1E3A5F] transition-colors">
              Berita
            </Link>
            <span className="mx-2 text-gray-400">›</span>
            <span className="text-gray-700 font-medium line-clamp-1">{artikel.judul}</span>
          </nav>
        </div>
      </div>
      <ArtikelDetailContent artikel={artikel} artikelTerkait={artikelTerkait} />
    </>
  );
}
