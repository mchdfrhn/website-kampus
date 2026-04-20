import Link from 'next/link';
import Image from 'next/image';
import { getPayloadClient } from '@/lib/payload';

const defaults = {
  badge: 'Sekolah Tinggi Teknologi',
  judul: 'Teknologi untuk Indonesia yang Lebih Baik',
  subjudul:
    'Bergabunglah dengan ribuan alumni STTPU yang telah berkontribusi nyata bagi pembangunan Indonesia. Pendidikan vokasi teknologi terbaik di Jakarta Pusat sejak 1987.',
  cta1: { teks: 'Daftar Sekarang', href: '/akademik/program-studi' },
  cta2: { teks: 'Pelajari Program Studi', href: '/akademik/program-studi' },
};

export default async function HeroSection() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: Record<string, any> = {}
  let fotoUrl: string | null = null

  try {
    const payload = await getPayloadClient()
    const global = await payload.findGlobal({ slug: 'halaman-utama', depth: 1 })
    if (global) {
      data = global as unknown as Record<string, unknown>
      const foto = data.heroFoto
      if (foto && typeof foto === 'object' && 'url' in foto) {
        fotoUrl = (foto as { url: string }).url
      }
    }
  } catch {
    // DB unavailable — use defaults
  }

  const badge = data.heroBadge || defaults.badge
  const judul = data.heroJudul || defaults.judul
  const subjudul = data.heroSubjudul || defaults.subjudul
  const cta1Teks = data.heroCta1Teks || defaults.cta1.teks
  const cta1Href = data.heroCta1Href || defaults.cta1.href
  const cta2Teks = data.heroCta2Teks || defaults.cta2.teks
  const cta2Href = data.heroCta2Href || defaults.cta2.href

  return (
    <section className="bg-[#1E3A5F] min-h-[520px] flex items-center relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(30,58,95,0.98) 40%, rgba(30,58,95,0.6) 80%, rgba(30,58,95,0.2) 100%)',
        }}
      />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-16 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 max-w-[600px]">
          <span className="inline-block bg-[#F5A623] text-[#1E3A5F] font-bold text-xs px-3 py-1 rounded-full mb-5">
            {badge}
          </span>
          <h1 className="text-white text-4xl font-extrabold leading-tight mb-5">{judul}</h1>
          <p className="text-white/90 text-base leading-relaxed mb-8">{subjudul}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={cta1Href}
              className="bg-[#F5A623] text-[#1E3A5F] font-bold px-6 py-3 rounded-lg hover:bg-[#e09615] transition-colors"
            >
              {cta1Teks}
            </Link>
            <Link
              href={cta2Href}
              className="border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              {cta2Teks}
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex flex-1 items-center justify-center">
          {fotoUrl ? (
            <div className="w-full max-w-md h-72 rounded-2xl overflow-hidden border border-white/20">
              <Image src={fotoUrl} alt="Foto Kampus STTPU" fill className="object-cover" />
            </div>
          ) : (
            <div className="w-full max-w-md h-72 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center">
              <p className="text-white/40 text-sm italic">Foto Kampus STTPU</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
