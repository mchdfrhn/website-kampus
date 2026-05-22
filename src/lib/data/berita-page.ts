import { getPayloadClient } from '@/lib/payload';
import { unstable_cache } from 'next/cache';

export type BeritaPageContent = {
  title?: string | null;
  description?: string | null;
  contactCtaTitle?: string | null;
  contactCtaDescription?: string | null;
  contactCtaButtonLabel?: string | null;
  contactCtaButtonHref?: string | null;
};

async function resolveBeritaPageContent(): Promise<BeritaPageContent> {
  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'berita-page' as never });
    return global as BeritaPageContent;
  } catch {
    return {};
  }
}

export const getBeritaPageContent = unstable_cache(
  resolveBeritaPageContent,
  ['berita-page-content'],
  { revalidate: 60 },
);
