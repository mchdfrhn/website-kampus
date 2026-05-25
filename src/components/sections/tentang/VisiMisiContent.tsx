import { Eye, Shield, Target, Award } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';
import BlueAbstractBackground from '@/components/ui/BlueAbstractBackground';

function SectionCard({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-premium border border-gray-100 bg-white p-6 shadow-premium sm:rounded-premium-lg sm:p-8 lg:p-10">
      {eyebrow ? (
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">{eyebrow}</p>
      ) : null}
      <h2 className="text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">{title}</h2>
      <div className="mt-4 h-1 w-12 rounded-full bg-brand-gold" />
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default async function VisiMisiContent() {
  let visi = ''
  let misi: string[] = []
  let tujuan: string[] = []
  let nilaiNilai: { nama: string; deskripsi?: string }[] = []

  try {
    const payload = await getPayloadClient()
    const global = await payload.findGlobal({ slug: 'tentang-kami' })
    const data = global as unknown as {
      visi?: string
      misi?: { poin: string }[]
      tujuan?: { poin: string }[]
      nilaiNilai?: { nama: string; deskripsi?: string }[]
    }

    visi = data.visi || ''
    misi = data.misi ? data.misi.map((m) => m.poin) : []
    tujuan = data.tujuan ? data.tujuan.map((t) => t.poin) : []
    nilaiNilai = data.nilaiNilai || []
  } catch {
    // DB unavailable
  }

  return (
    <article className="space-y-10 sm:space-y-12">
      {/* Visi Section */}
      <section className="relative overflow-hidden rounded-premium bg-brand-navy text-white shadow-2xl shadow-brand-navy/15 sm:rounded-premium-lg">
        <BlueAbstractBackground />
        <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="flex items-start gap-5">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 text-brand-gold">
              <Eye size={22} strokeWidth={2.4} aria-hidden="true" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-brand-gold">Visi Strategis</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight">Visi Institusi</h3>
              <div className="mt-4 h-1 w-12 rounded-full bg-brand-gold" />
              <p className="mt-6 text-base sm:text-lg font-medium leading-8 text-white/80 italic">
                &ldquo;{visi}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Misi Section */}
      <SectionCard title="Misi Kami" eyebrow="Mission">
        <ol className="space-y-4" aria-label="Misi STTPU">
          {misi.map((item, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <span
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-brand-navy/5 text-brand-navy font-bold text-sm"
                aria-hidden="true"
              >
                {(idx + 1).toString().padStart(2, '0')}
              </span>
              <span className="pt-1.5 text-sm font-semibold leading-relaxed text-gray-600 sm:text-[15px]">{item}</span>
            </li>
          ))}
        </ol>
      </SectionCard>

      {/* Tujuan Section */}
      <SectionCard title="Tujuan Pendidikan" eyebrow="Objective">
        <ul className="space-y-4" aria-label="Tujuan STTPU">
          {tujuan.map((item, idx) => (
            <li key={idx} className="flex items-start gap-4 text-sm font-semibold leading-relaxed text-gray-600 sm:text-[15px]">
              <span
                className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-gold"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </SectionCard>

      {/* Nilai-Nilai Section */}
      <SectionCard title="Nilai-Nilai Utama" eyebrow="Values">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Nilai-nilai STTPU">
          {nilaiNilai.map(({ nama, deskripsi }) => (
            <li
              key={nama}
              className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50 transition-all hover:bg-white hover:shadow-premium hover:border-brand-navy/10 duration-300"
            >
              <div
                className="w-10 h-10 bg-brand-navy/5 rounded-xl flex items-center justify-center flex-shrink-0 text-brand-navy font-black text-base"
                aria-hidden="true"
              >
                {nama[0]}
              </div>
              <div>
                <p className="font-bold text-brand-navy text-sm sm:text-base leading-tight mb-2">{nama}</p>
                {deskripsi && <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">{deskripsi}</p>}
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>
    </article>
  );
}
