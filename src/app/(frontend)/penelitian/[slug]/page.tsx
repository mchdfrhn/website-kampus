import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import PenelitianPageHeader from '@/components/sections/penelitian/PenelitianPageHeader';
import { getPayloadClient } from '@/lib/payload';
import { resolvePenelitianSections, type PayloadSectionMeta } from '@/lib/frontend-section-routing';
import { buildBreadcrumbJsonLd, buildPageMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'penelitian-page' as never });
    const subpages = (global as { subpages?: PayloadSectionMeta[] }).subpages || [];
    const resolved = resolvePenelitianSections(subpages);
    if (resolved.length > 0) return resolved.map((item) => ({ slug: item.slug }));
  } catch {
    // fallback below
  }

  return resolvePenelitianSections().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let resolvedSections = resolvePenelitianSections();
  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'penelitian-page' as never });
    const subpages = (global as { subpages?: PayloadSectionMeta[] }).subpages || [];
    resolvedSections = resolvePenelitianSections(subpages);
  } catch {
    // keep defaults
  }
  const s = resolvedSections.find((item) => item.slug === slug);
  if (!s) return {};
  return buildPageMetadata({
    title: `${s.title} | STTPU Jakarta`,
    description: s.subtitle || `Informasi ${s.title} STTPU Jakarta.`,
    path: `/penelitian/${s.slug}`,
  });
}

export default async function PenelitianSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let resolvedSections = resolvePenelitianSections();
  let sidebarTitle = 'Menu Penelitian';

  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'penelitian-page' as never });
    const data = global as { subpages?: PayloadSectionMeta[]; sidebarTitle?: string };
    resolvedSections = resolvePenelitianSections(data.subpages || []);
    if (data.sidebarTitle) sidebarTitle = data.sidebarTitle;
  } catch {
    // keep defaults
  }

  const s = resolvedSections.find((item) => item.slug === slug);
  if (!s) notFound();

  const { title, subtitle, breadcrumb, component: Content } = s;

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'Penelitian', path: '/penelitian' },
    { name: s.breadcrumb || s.title, path: `/penelitian/${slug}` },
  ]);

  const sidebarLinks = resolvedSections.map((item) => ({
    label: item.breadcrumb || item.title,
    href: `/penelitian/${item.slug}`,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PenelitianPageHeader title={title} subtitle={subtitle} breadcrumb={breadcrumb} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_20rem] xl:grid-cols-[1fr_22rem]">
          <div className="min-w-0">
            <Content />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 self-start">
            {/* Sidebar Navigation Links */}
            {sidebarLinks.length > 0 && (
              <div className="rounded-premium border border-gray-100 bg-white overflow-hidden shadow-sm shadow-brand-navy/[0.04] sm:rounded-premium-lg">
                <div className="border-b border-gray-50 px-6 py-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400 font-black">Menu</p>
                  <h3 className="mt-1 text-sm sm:text-base font-bold tracking-tight text-brand-navy">{sidebarTitle}</h3>
                </div>
                <ul className="divide-y divide-gray-50">
                  {sidebarLinks.map((link) => {
                    const isActive = link.href === `/penelitian/${slug}`;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`group flex items-center justify-between px-6 py-4 text-xs sm:text-sm font-semibold transition-all ${
                            isActive
                              ? 'bg-brand-navy/[0.02] text-brand-navy font-bold'
                              : 'text-gray-500 hover:bg-gray-50 hover:text-brand-navy'
                          }`}
                        >
                          <span className={`pr-4 leading-relaxed font-bold ${isActive ? 'text-brand-navy font-extrabold' : ''}`}>{link.label}</span>
                          <ChevronRight
                            size={14}
                            className={`flex-shrink-0 transition-all ${
                              isActive ? 'text-brand-gold translate-x-0.5' : 'text-gray-300 group-hover:translate-x-1 group-hover:text-brand-gold'
                            }`}
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Template Proposal / Pedoman Riset Card */}
            <div className="overflow-hidden rounded-premium bg-brand-gold text-brand-navy shadow-xl shadow-brand-gold/5 sm:rounded-premium-lg">
              <div className="relative px-6 py-8">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-navy/55">Pedoman & Template</p>
                    <h3 className="mt-3 text-xl font-bold tracking-tight leading-snug">Pengajuan Hibah Penelitian & PKM</h3>
                    <p className="mt-4 text-xs font-medium leading-relaxed text-brand-navy/70">
                      Unduh template proposal, format laporan kemajuan, dan panduan teknis hibah riset eksternal/internal LPPM.
                    </p>
                  </div>
                  <Link
                    href="/lppm/pedoman"
                    className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-brand-navy px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-brand-navy/90"
                  >
                    Buka Pedoman
                  </Link>
                </div>
              </div>
            </div>

            {/* Layanan Informasi LPPM Card */}
            <div className="rounded-premium border border-gray-100 bg-white p-6 shadow-sm shadow-brand-navy/[0.04] sm:rounded-premium-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-navy/5">
                    <svg className="h-5 w-5 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">Hubungi LPPM</p>
                    <p className="mt-1 text-base font-bold tracking-tight text-brand-navy">Layanan Riset</p>
                  </div>
                </div>
                <p className="mt-5 text-xs font-medium leading-relaxed text-gray-600">
                  Butuh informasi tentang skema kemitraan riset, hak paten, pengabdian masyarakat, atau publikasi ilmiah?
                </p>
              </div>
              <Link
                href="/kontak"
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-brand-navy px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy transition-all hover:bg-brand-navy hover:text-white"
              >
                Kontak LPPM
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
