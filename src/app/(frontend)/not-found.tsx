import Link from 'next/link';
import { ArrowLeft, Compass, FileSearch, GraduationCap, MapPinned } from 'lucide-react';
import BlueAbstractBackground from '@/components/ui/BlueAbstractBackground';

const quickLinks = [
  {
    title: 'Jelajahi Program Studi',
    description: 'Lihat jalur belajar yang sudah tersedia dan aktif di STTPU.',
    href: '/akademik/program-studi',
    icon: GraduationCap,
  },
  {
    title: 'Baca Berita Kampus',
    description: 'Temukan kabar terbaru, agenda, dan cerita dari lingkungan kampus.',
    href: '/berita',
    icon: FileSearch,
  },
  {
    title: 'Kembali ke Beranda',
    description: 'Mulai lagi dari halaman utama dan lanjutkan penjelajahan Anda.',
    href: '/',
    icon: Compass,
  },
];

export default function FrontendNotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-navy">
      <BlueAbstractBackground accentClassName="animate-drift" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,22,51,0.08),rgba(0,22,51,0.02)_26%,rgba(0,22,51,0.18)_100%)]" />
      <div
        className="pointer-events-none absolute inset-x-0 top-[8%] mx-auto h-72 w-72 rounded-full bg-brand-gold/10 blur-3xl animate-pulse-slow"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute left-[8%] top-[22%] hidden h-40 w-40 rounded-full border border-white/8 bg-white/[0.03] blur-2xl animate-float-soft md:block" />
      <div className="pointer-events-none absolute right-[10%] bottom-[18%] h-56 w-56 rounded-full bg-white/[0.03] blur-3xl animate-beacon" />

      <div className="relative mx-auto flex min-h-[calc(100vh-10rem)] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-gold shadow-lg shadow-black/10 backdrop-blur-sm">
              <MapPinned className="h-4 w-4" />
              Rute Belum Tersedia
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Halaman ini masih
              <span className="block text-brand-gold">dalam pembangunan jalur.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/78 sm:text-lg">
              Bisa jadi alamatnya belum ada, tautannya berubah, atau kontennya memang belum kami isi.
              Tenang, Anda belum salah arah, hanya perlu pindah ke jalur yang sudah siap.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl bg-brand-gold px-6 py-3.5 text-sm font-bold text-brand-navy shadow-xl shadow-brand-gold/20 transition duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                Kembali ke Beranda
              </Link>
              <Link
                href="/kontak"
                className="inline-flex items-center justify-center rounded-2xl border border-white/14 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:border-white/30 hover:bg-white/14"
              >
                Hubungi Kampus
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] border border-brand-gold/10 -rotate-2 opacity-80 transition-all duration-700" aria-hidden="true" />
            <div className="absolute -inset-4 rounded-[2rem] border border-white/5 rotate-1 opacity-80 transition-all duration-700" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 text-white shadow-[0_30px_80px_rgba(0,22,51,0.3)] backdrop-blur-2xl">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-gold via-[#ffd76d] to-brand-navy-light" />
              <div className="absolute -right-10 top-8 h-28 w-28 rounded-full bg-white/[0.03] blur-2xl" aria-hidden="true" />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/55">Kode Akses</p>
                  <p className="mt-2 text-6xl font-black leading-none tracking-tight text-white">404</p>
                </div>
                <div className="animate-orbit rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 text-brand-gold shadow-inner shadow-black/10">
                  <Compass className="h-10 w-10" />
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5">
                <div className="relative rounded-[1.4rem] border border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_58%,transparent)] px-4 py-5">
                  <svg className="absolute inset-0 h-full w-full opacity-90" viewBox="0 0 360 220" fill="none" aria-hidden="true">
                    <circle cx="262" cy="68" r="58" stroke="rgba(255,255,255,0.08)" />
                    <circle cx="262" cy="68" r="90" stroke="rgba(255,255,255,0.05)" />
                    <path
                      d="M52 166C94 144 120 182 160 164C196 148 206 98 244 88C281 78 294 104 318 122"
                      stroke="rgba(252,182,3,0.9)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="12 12"
                      className="animate-route-flow"
                    />
                    <path
                      d="M48 84C72 72 98 78 116 100C134 122 150 126 176 118"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="8 12"
                    />
                  </svg>

                  <div className="relative flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">Status Navigasi</p>
                      <p className="mt-3 text-lg font-bold text-white">Peta kampus tidak menemukan tujuan yang diminta.</p>
                      <p className="mt-2 max-w-xs text-sm leading-7 text-white/72">
                        Gunakan salah satu pintasan di bawah untuk melanjutkan perjalanan Anda tanpa harus mulai dari awal.
                      </p>
                    </div>

                    <div className="relative hidden h-28 w-28 shrink-0 sm:block">
                      <div className="animate-beacon absolute inset-0 rounded-full border border-brand-gold/35 bg-brand-gold/10" />
                      <div className="animate-beacon absolute inset-3 rounded-full border border-white/18" style={{ animationDelay: '0.8s' }} />
                      <div className="animate-float-soft absolute inset-0 flex items-center justify-center">
                        <div className="rounded-full bg-brand-gold p-3 text-brand-navy shadow-2xl shadow-brand-gold/30">
                          <MapPinned className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {quickLinks.map(({ title, description, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group flex items-center gap-4 rounded-[1.4rem] border border-white/10 bg-white/[0.02] px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-brand-gold/40 hover:bg-white/[0.05] hover:shadow-lg hover:shadow-brand-navy/10"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/[0.04] text-white shadow-lg shadow-brand-navy/10 transition duration-300 group-hover:bg-brand-gold group-hover:text-brand-navy">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-white">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-white/65">{description}</p>
                    </div>
                    <ArrowLeft className="h-5 w-5 shrink-0 rotate-180 text-white/35 transition duration-300 group-hover:text-white" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
