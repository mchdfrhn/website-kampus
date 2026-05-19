import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { toAbsoluteUrl } from '@/lib/seo';

type MediaValue = {
  url?: string | null;
} | null;

export const revalidate = 60;

export async function GET() {
  try {
    const payload = await getPayloadClient();
    const settings = await payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
    });
    const favicon = (
      typeof settings.favicon === 'object' ? settings.favicon : null
    ) as MediaValue;
    const faviconUrl = toAbsoluteUrl(favicon?.url);

    if (faviconUrl) {
      return NextResponse.redirect(faviconUrl, {
        status: 307,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=86400',
        },
      });
    }
  } catch {
    // No favicon configured or CMS unavailable.
  }

  return new NextResponse(null, {
    status: 404,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
