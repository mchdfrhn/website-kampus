import type { ResolvedSectionConfig } from '@/lib/frontend-section-routing';

type SectionLinkInput = {
  href?: string;
  title?: string;
  label?: string;
};

function normalizeSectionKey(value?: string | null) {
  return (value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractSlugFromHref(href: string | undefined, routeBase: string) {
  if (!href) return '';
  const normalizedBase = routeBase.endsWith('/') ? routeBase.slice(0, -1) : routeBase;
  if (!href.startsWith(`${normalizedBase}/`)) return '';
  return href.slice(normalizedBase.length + 1).split('/')[0] || '';
}

function findMatchingSection(
  routeBase: string,
  resolvedSections: ResolvedSectionConfig[],
  item: SectionLinkInput,
) {
  const itemCandidates = [
    extractSlugFromHref(item.href, routeBase),
    item.title,
    item.label,
  ]
    .map(normalizeSectionKey)
    .filter(Boolean);

  return (
    resolvedSections.find((section) => {
      const sectionCandidates = [
        section.key,
        section.slug,
        section.title,
        section.breadcrumb,
      ]
        .map(normalizeSectionKey)
        .filter(Boolean);

      return itemCandidates.some((candidate) => sectionCandidates.includes(candidate));
    }) || null
  );
}

export function synchronizeSectionHref(
  routeBase: string,
  resolvedSections: ResolvedSectionConfig[],
  item: SectionLinkInput,
) {
  const matchedSection = findMatchingSection(routeBase, resolvedSections, item);
  return matchedSection ? `${routeBase}/${matchedSection.slug}` : item.href || '';
}

export function synchronizeNavChildren<T extends { href: string; label: string }>(
  routeBase: string,
  resolvedSections: ResolvedSectionConfig[],
  children: T[],
) {
  return children.map((child) => ({
    ...child,
    href: synchronizeSectionHref(routeBase, resolvedSections, {
      href: child.href,
      label: child.label,
    }),
  }));
}

export function synchronizeOverviewSections<T extends { href: string; title: string }>(
  routeBase: string,
  resolvedSections: ResolvedSectionConfig[],
  sections: T[],
) {
  return sections.map((section) => ({
    ...section,
    href: synchronizeSectionHref(routeBase, resolvedSections, {
      href: section.href,
      title: section.title,
    }),
  }));
}
