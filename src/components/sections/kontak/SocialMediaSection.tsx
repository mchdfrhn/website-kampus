import { getPayloadClient } from '@/lib/payload';
import Link from 'next/link';

type SocialItem = { platform: string; handle?: string; url: string; followers?: string }

const BrandIcons = {
  instagram: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  ),
  facebook: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  ),
  youtube: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 2.78 2.78 0 0 0-.46-5.33z"></path>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
    </svg>
  ),
  linkedin: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  ),
  twitter: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z"></path>
    </svg>
  ),
  tiktok: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
    </svg>
  ),
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
    <section className="bg-white py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-brand-navy font-bold text-3xl tracking-tight">Ikuti Kami</h2>
          <div className="w-16 h-1 bg-brand-gold rounded-full mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socials.map((s) => {
            const Icon = BrandIcons[s.platform as keyof typeof BrandIcons] || BrandIcons.instagram;
            
            return (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center hover:bg-brand-navy hover:border-brand-navy hover:shadow-2xl transition-all duration-500 no-underline"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:bg-brand-gold transition-colors duration-500">
                  <Icon className="w-8 h-8 text-brand-navy group-hover:scale-110 transition-transform duration-500" />
                </div>
                <p className="font-bold text-brand-navy text-lg group-hover:text-white transition-colors duration-500">{platformLabel[s.platform] ?? s.platform}</p>
                {s.handle && <p className="text-gray-500 text-sm mt-1 group-hover:text-white/60 transition-colors duration-500 font-medium">{s.handle}</p>}
                {s.followers && (
                  <div className="mt-4 inline-flex px-3 py-1 bg-white/10 rounded-full border border-gray-200 group-hover:border-white/20">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest group-hover:text-brand-gold transition-colors duration-500">{s.followers}</p>
                  </div>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
