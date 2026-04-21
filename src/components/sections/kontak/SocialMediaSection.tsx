import { getPayloadClient } from '@/lib/payload';

type SocialItem = { platform: string; handle?: string; url: string; followers?: string }

const platformEmoji: Record<string, string> = {
  instagram: '📸',
  youtube: '▶️',
  facebook: '📘',
  linkedin: '💼',
  twitter: '🐦',
  tiktok: '🎵',
}

const defaults: SocialItem[] = [
  { platform: 'instagram', handle: '@sttpu.jakarta', url: 'https://instagram.com/sttpu.jakarta', followers: '12.4K Followers' },
  { platform: 'youtube', handle: 'STTPU Jakarta Official', url: 'https://youtube.com/@sttpu-jakarta', followers: '8.2K Subscribers' },
  { platform: 'facebook', handle: 'STTPU Jakarta', url: 'https://facebook.com/sttpu.jakarta', followers: '15.7K Likes' },
  { platform: 'linkedin', handle: 'STTPU Jakarta', url: 'https://linkedin.com/school/sttpu-jakarta', followers: '3.1K Followers' },
]

const platformLabel: Record<string, string> = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  twitter: 'Twitter / X',
  tiktok: 'TikTok',
}

export default async function SocialMediaSection() {
  let socials = defaults

  try {
    const payload = await getPayloadClient()
    const global = await payload.findGlobal({ slug: 'site-settings' })
    const data = (global as unknown as { socialMedia?: SocialItem[] }).socialMedia
    if (data && data.length > 0) {
      socials = data
    }
  } catch {
    // DB unavailable — use defaults
  }

  return (
    <section className="bg-white py-14 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-brand-navy font-extrabold text-2xl">Ikuti Kami</h2>
          <div className="w-12 h-1 bg-brand-gold rounded mt-3" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {socials.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-200 rounded-xl p-5 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200 no-underline"
            >
              <span className="text-4xl mb-3 block">{platformEmoji[s.platform] ?? '🔗'}</span>
              <p className="font-bold text-brand-navy text-sm">{platformLabel[s.platform] ?? s.platform}</p>
              {s.handle && <p className="text-gray-500 text-xs mt-1">{s.handle}</p>}
              {s.followers && <p className="text-gray-400 text-xs mt-1">{s.followers}</p>}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
