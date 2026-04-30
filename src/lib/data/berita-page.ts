import { getPayloadClient } from '@/lib/payload';

export type BeritaPageContent = {
  title?: string | null;
  description?: string | null;
  contactCtaTitle?: string | null;
  contactCtaDescription?: string | null;
  contactCtaButtonLabel?: string | null;
  contactCtaButtonHref?: string | null;
};

export async function getBeritaPageContent(): Promise<BeritaPageContent> {
  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'berita-page' as never });
    return global as BeritaPageContent;
  } catch {
    return {};
  }
}
