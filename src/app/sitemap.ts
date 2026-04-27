import { MetadataRoute } from 'next';
import { getPayloadClient } from '@/lib/payload';
import { defaultSections } from '@/lib/akademik-navigation';
import {
  resolveKemahasiswaanSections,
  resolvePenelitianSections,
  resolveTentangSections,
  type PayloadSectionMeta,
} from '@/lib/frontend-section-routing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sttpu.ac.id';

  const staticRoutes = [
    '',
    '/akademik/program-studi',
    '/akademik/dosen',
    '/akademik/kalender',
    '/akademik/beasiswa',
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

    const [berita, programStudi, dosen, tentangGlobal, kemahasiswaanGlobal, penelitianGlobal] = await Promise.all([
      payload.find({
        collection: 'berita',
        where: { status: { equals: 'terbit' } },
        limit: 1000,
        select: { slug: true, updatedAt: true },
      }),
      payload.find({
        collection: 'program-studi',
        where: { status: { equals: 'aktif' } },
        limit: 200,
        select: { slug: true, updatedAt: true },
      }),
      payload.find({
        collection: 'dosen',
        limit: 500,
        select: { slug: true, updatedAt: true },
      }),
      payload.findGlobal({ slug: 'tentang-kami' }),
      payload.findGlobal({ slug: 'kemahasiswaan-page' as never }),
      payload.findGlobal({ slug: 'penelitian-page' as never }),
    ]);

    const tentangSections = resolveTentangSections(
      ((tentangGlobal as { subpages?: PayloadSectionMeta[] })?.subpages) || [],
    );
    const kemahasiswaanSections = resolveKemahasiswaanSections(
      ((kemahasiswaanGlobal as { subpages?: PayloadSectionMeta[] })?.subpages) || [],
    );
    const penelitianSections = resolvePenelitianSections(
      ((penelitianGlobal as { subpages?: PayloadSectionMeta[] })?.subpages) || [],
    );

    const beritaRoutes = berita.docs.map((doc) => ({
      url: `${baseUrl}/berita/${doc.slug}`,
      lastModified: doc.updatedAt ? new Date(doc.updatedAt as string) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    const programStudiRoutes = programStudi.docs
      .filter((doc) => doc.slug)
      .map((doc) => ({
        url: `${baseUrl}/akademik/program-studi/${doc.slug}`,
        lastModified: doc.updatedAt ? new Date(doc.updatedAt as string) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));

    const dosenRoutes = dosen.docs
      .filter((doc) => doc.slug)
      .map((doc) => ({
        url: `${baseUrl}/akademik/dosen/${doc.slug}`,
        lastModified: doc.updatedAt ? new Date(doc.updatedAt as string) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));

    const tentangRoutes = tentangSections.map((section) => ({
      url: `${baseUrl}/tentang/${section.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    const kemahasiswaanRoutes = kemahasiswaanSections.map((section) => ({
      url: `${baseUrl}/kemahasiswaan/${section.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    const penelitianRoutes = penelitianSections.map((section) => ({
      url: `${baseUrl}/penelitian/${section.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    const akademikRoutes = defaultSections.map((section) => ({
      url: `${baseUrl}/akademik/${section.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [
      ...staticRoutes,
      ...akademikRoutes,
      ...tentangRoutes,
      ...kemahasiswaanRoutes,
      ...penelitianRoutes,
      ...programStudiRoutes,
      ...dosenRoutes,
      ...beritaRoutes,
    ];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return staticRoutes;
  }
}
