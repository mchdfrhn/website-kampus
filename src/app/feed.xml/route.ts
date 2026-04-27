import { getPayloadClient } from '@/lib/payload';
import { mapPayloadToArtikel } from '@/lib/data/berita';
import { getSiteUrl } from '@/lib/seo';
import type { Artikel } from '@/lib/data/berita';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRFC822(dateStr: string): string {
  return new Date(dateStr).toUTCString();
}

function buildItem(artikel: Artikel, siteUrl: string): string {
  const link = `${siteUrl}/berita/${artikel.slug}`;
  const enclosure = artikel.thumbnailUrl
    ? `\n    <enclosure url="${escapeXml(artikel.thumbnailUrl)}" type="image/jpeg" length="0"/>`
    : '';

  return `  <item>
    <title>${escapeXml(artikel.judul)}</title>
    <link>${link}</link>
    <guid isPermaLink="true">${link}</guid>
    <description>${escapeXml(artikel.ringkasan || artikel.judul)}</description>
    <pubDate>${toRFC822(artikel.tanggalTerbit)}</pubDate>
    <category>${escapeXml(artikel.kategori.nama)}</category>${enclosure}
  </item>`;
}

export async function GET(): Promise<Response> {
  const siteUrl = getSiteUrl();
  let artikelItems: Artikel[] = [];

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'berita',
      where: { status: { equals: 'terbit' } },
      limit: 50,
      sort: '-tanggalTerbit',
      depth: 1,
    });

    artikelItems = (result.docs as unknown as Record<string, unknown>[]).map(
      (doc) => mapPayloadToArtikel(doc),
    );
  } catch {
    // Payload tidak tersedia — sajikan feed kosong
  }

  const itemsXml = artikelItems.map((a) => buildItem(a, siteUrl)).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Berita STTPU Jakarta</title>
    <link>${siteUrl}/berita</link>
    <description>Berita terkini, pengumuman resmi, dan informasi kegiatan STTPU Jakarta.</description>
    <language>id</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
