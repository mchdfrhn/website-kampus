import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AlbumDetailContent from '@/components/sections/galeri/AlbumDetailContent';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getPayloadClient } from '@/lib/payload';
import { buildPageMetadata } from '@/lib/seo';
import { mapPayloadToAlbum, type Album } from '@/lib/data/galeri';

async function fetchAlbumBySlug(slug: string): Promise<Album | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'galeri',
      where: { slug: { equals: slug }, status: { equals: 'terbit' } },
      limit: 1,
      depth: 1,
    });
    if (result.docs.length > 0) return mapPayloadToAlbum(result.docs[0]);
  } catch (error) {
    console.error('Error fetching album by slug:', error);
    return null;
  }
  return null;
}

export async function generateStaticParams() {
  if (process.env.BUILD_SKIP_DB) return [];
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'galeri',
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
  const album = await fetchAlbumBySlug(slug);
  if (!album) return {};
  return buildPageMetadata({
    title: `${album.judul} | Galeri STTPU Jakarta`,
    description: album.deskripsi || `Album dokumentasi ${album.judul} di STTPU Jakarta.`,
    path: `/galeri/${album.slug}`,
    image: album.coverFotoUrl,
  });
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = await fetchAlbumBySlug(slug);
  if (!album) notFound();

  return (
    <>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            customItems={[
              { label: 'Galeri', href: '/galeri' },
              { label: album.judul, href: `/galeri/${album.slug}` }
            ]} />
        </div>
      </div>
      <AlbumDetailContent album={album} />
    </>
  );
}
