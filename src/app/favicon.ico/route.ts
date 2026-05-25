import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { toAbsoluteUrl } from '@/lib/seo';

type MediaValue = {
  url?: string | null;
} | null;

// Force this route to be dynamically rendered at request time,
// preventing Next.js from running it during static page compilation (build time).
export const dynamic = 'force-dynamic';

export async function GET() {
  // Safe check for static build environment (where DB connections are skipped)
  if (process.env.BUILD_SKIP_DB === '1') {
    return new NextResponse(null, {
      status: 404,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  }

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
  } catch (error) {
    console.error('Error serving favicon redirect:', error);
  }

  return new NextResponse(null, {
    status: 404,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
