export type MediaSizeName = 'thumbnail' | 'card' | 'hero' | 'logo' | 'og';

type MediaSize = {
  url?: string | null;
};

export type MediaLike = {
  url?: string | null;
  sizes?: Record<string, MediaSize | null | undefined> | null;
};

const preferredFallbacks: Record<MediaSizeName, MediaSizeName[]> = {
  thumbnail: ['thumbnail', 'card', 'logo', 'hero', 'og'],
  card: ['card', 'hero', 'thumbnail', 'og', 'logo'],
  hero: ['hero', 'card', 'og', 'thumbnail', 'logo'],
  logo: ['logo', 'thumbnail', 'card', 'hero', 'og'],
  og: ['og', 'hero', 'card', 'thumbnail', 'logo'],
};

export function getMediaUrl(
  media: MediaLike | string | null | undefined,
  preferredSize: MediaSizeName = 'card',
): string | null {
  if (!media) return null;
  if (typeof media === 'string') return media;

  for (const sizeName of preferredFallbacks[preferredSize]) {
    const url = media.sizes?.[sizeName]?.url;
    if (typeof url === 'string' && url.length > 0) return url;
  }

  return typeof media.url === 'string' && media.url.length > 0 ? media.url : null;
}
