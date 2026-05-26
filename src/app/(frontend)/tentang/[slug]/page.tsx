import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import TentangPageHeader from '@/components/sections/tentang/TentangPageHeader';
import { getPayloadClient } from '@/lib/payload';
import { resolveTentangSections, type PayloadSectionMeta } from '@/lib/frontend-section-routing';
import { buildBreadcrumbJsonLd, buildPageMetadata } from '@/lib/seo';
import { getPromoCards, defaultPromoCards } from '@/lib/data/promo-cards';


export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'tentang-kami' });
    const subpages = (global as { subpages?: PayloadSectionMeta[] }).subpages || [];
    const resolved = resolveTentangSections(subpages);
    if (resolved.length > 0) return resolved.map((item) => ({ slug: item.slug }));
  } catch {
    // fallback below
  }
  return resolveTentangSections().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === 'lpmi') {
    return buildPageMetadata({
      title: 'LPMI | STTPU Jakarta',
      description: 'Informasi penjaminan mutu internal STTPU Jakarta.',
      path: '/lpmi/kebijakan',
    });
  }
  let resolvedSections = resolveTentangSections();
  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'tentang-kami' });
    const subpages = (global as { subpages?: PayloadSectionMeta[] }).subpages || [];
    resolvedSections = resolveTentangSections(subpages);
  } catch {
    // keep route defaults
  }
  const section = resolvedSections.find((item) => item.slug === slug);
  if (!section) return {};
  return buildPageMetadata({
    title: `${section.title} | STTPU Jakarta`,
    description: section.subtitle || `Informasi ${section.title} STTPU Jakarta.`,
    path: `/tentang/${section.slug}`,
  });
}

export default async function TentangSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === 'lpmi') redirect('/lpmi/kebijakan');

  let resolvedSections = resolveTentangSections();

  let sidebarTitle = 'Navigasi Institusi'
  let sidebarLinks = resolvedSections.map((section) => ({
    label: section.breadcrumb,
    href: `/tentang/${section.slug}`,
  }))

  let promo = defaultPromoCards;

  try {
    const payload = await getPayloadClient();
    const [global, promoData] = await Promise.all([
      payload.findGlobal({ slug: 'tentang-kami' }),
      getPromoCards(),
    ]);
    promo = promoData;
    const data = global as { subpages?: PayloadSectionMeta[]; sidebarTitle?: string };
    resolvedSections = resolveTentangSections(data.subpages || []);
    sidebarTitle = data.sidebarTitle || sidebarTitle
    if (resolvedSections.length > 0) {
      sidebarLinks = resolvedSections.map((item) => ({
        label: item.breadcrumb || item.title,
        href: `/tentang/${item.slug}`,
      }))
    }
  } catch {
    // keep defaults
  }

  const section = resolvedSections.find((item) => item.slug === slug);
  if (!section) notFound();

  const { title, subtitle, component: SectionContent } = section;

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Beranda', path: '/' },
    { name: 'Tentang', path: '/tentang' },
    { name: section.breadcrumb || section.title, path: `/tentang/${slug}` },
  ]);

  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TentangPageHeader
          title={title}
          subtitle={subtitle}
          breadcrumbs={[
            { label: 'Tentang', href: '/tentang' },
            { label: section.breadcrumb || title, href: `/tentang/${slug}` },
          ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_20rem] xl:grid-cols-[1fr_22rem]">
          <div className="min-w-0">
            <SectionContent />
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
                    const isActive = link.href === `/tentang/${slug}`;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`group flex items-center justify-between py-4 text-xs sm:text-sm font-semibold transition-all border-l-4 ${
                            isActive
                              ? 'bg-brand-navy/[0.03] text-brand-navy font-bold border-brand-gold pl-5 pr-6'
                              : 'text-gray-500 hover:bg-gray-50 hover:text-brand-navy border-transparent hover:border-brand-gold/30 pl-5 pr-6'
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

            {/* PMB Card */}
            <div className="overflow-hidden rounded-premium bg-brand-gold text-brand-navy shadow-xl shadow-brand-gold/5 sm:rounded-premium-lg">
              <div className="relative px-6 py-8">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-navy/55">Penerimaan Mahasiswa Baru</p>
                    <h3 className="mt-3 text-xl font-bold tracking-tight leading-snug">{promo.pmbTitle}</h3>
                    <p className="mt-4 text-xs font-medium leading-relaxed text-brand-navy/70">
                      {promo.pmbDescription}
                    </p>
                  </div>
                  <a
                    href={promo.pmbButtonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-brand-navy px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-brand-navy/90"
                  >
                    {promo.pmbButtonText}
                  </a>
                </div>
              </div>
            </div>

            {/* Layanan Informasi Card */}
            <div className="rounded-premium border border-gray-100 bg-white p-6 shadow-sm shadow-brand-navy/[0.04] sm:rounded-premium-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-navy/5">
                    <svg className="h-5 w-5 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">Layanan Informasi</p>
                    <p className="mt-1 text-base font-bold tracking-tight text-brand-navy">{promo.infoTitle}</p>
                  </div>
                </div>
                <p className="mt-5 text-xs font-medium leading-relaxed text-gray-600">
                  {promo.infoDescription}
                </p>
              </div>
              <Link
                href={promo.infoButtonUrl}
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-brand-navy px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy transition-all hover:bg-brand-navy hover:text-white"
              >
                {promo.infoButtonText}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
