import { MetadataRoute } from 'next';
import { getPayloadClient } from '@/lib/payload';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sttpu.ac.id';

  const staticRoutes = [
    '',
    '/tentang',
    '/akademik/program-studi',
    '/akademik/dosen',
    '/akademik/kalender',
    '/akademik/beasiswa',
    '/kemahasiswaan',
    '/penelitian',
    '/berita',
    '/galeri',
    '/kontak',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    const payload = await getPayloadClient();
    
    // Fetch Berita slugs
    const berita = await payload.find({
      collection: 'berita',
      where: { status: { equals: 'terbit' } },
      limit: 100,
      select: { slug: true, updatedAt: true },
    });

    const beritaRoutes = berita.docs.map((doc) => ({
      url: `${baseUrl}/berita/${doc.slug}`,
      lastModified: new Date(doc.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...beritaRoutes];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return staticRoutes;
  }
}
