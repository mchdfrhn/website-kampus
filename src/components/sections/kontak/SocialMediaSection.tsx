const socials = [
  {
    emoji: '📸',
    platform: 'Instagram',
    handle: '@sttpu.jakarta',
    followers: '12.4K Followers',
    href: 'https://instagram.com/sttpu.jakarta',
  },
  {
    emoji: '▶️',
    platform: 'YouTube',
    handle: 'STTPU Jakarta Official',
    followers: '8.2K Subscribers',
    href: 'https://youtube.com/@sttpu-jakarta',
  },
  {
    emoji: '📘',
    platform: 'Facebook',
    handle: 'STTPU Jakarta',
    followers: '15.7K Likes',
    href: 'https://facebook.com/sttpu.jakarta',
  },
  {
    emoji: '💼',
    platform: 'LinkedIn',
    handle: 'STTPU Jakarta',
    followers: '3.1K Followers',
    href: 'https://linkedin.com/school/sttpu-jakarta',
  },
];

export default function SocialMediaSection() {
  return (
    <section className="bg-white py-14 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-[#1E3A5F] font-extrabold text-2xl">Ikuti Kami</h2>
          <div className="w-12 h-1 bg-[#F5A623] rounded mt-3" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {socials.map((s) => (
            <a
              key={s.platform}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-200 rounded-xl p-5 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200 no-underline"
            >
              <span className="text-4xl mb-3 block">{s.emoji}</span>
              <p className="font-bold text-[#1E3A5F] text-sm">{s.platform}</p>
              <p className="text-gray-500 text-xs mt-1">{s.handle}</p>
              <p className="text-gray-400 text-xs mt-1">{s.followers}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
