import { getPayloadClient } from '@/lib/payload';
import { unstable_cache } from 'next/cache';

export type ProgramStudiPageContent = {
  gridTitle?: string | null;
  gridDescription?: string | null;
  detailCareerTitle?: string | null;
  detailCareerDescription?: string | null;
  detailCareerButtonLabel?: string | null;
  detailCareerButtonHref?: string | null;
  detailInfoTitle?: string | null;
  detailInfoDescription?: string | null;
  detailInfoButtonLabel?: string | null;
  detailInfoButtonHref?: string | null;
};

export type DosenPageContent = {
  gridIntroText?: string | null;
};

export type BeasiswaPageContent = {
  infoText?: string | null;
  internalTitle?: string | null;
  internalDescription?: string | null;
  externalTitle?: string | null;
  externalDescription?: string | null;
};

export type ConsultationCard = {
  title?: string | null;
  description?: string | null;
  primaryLabel?: string | null;
  primaryHref?: string | null;
  secondaryLabel?: string | null;
  secondaryHref?: string | null;
};

export type AkademikPageContent = {
  programStudiContent?: ProgramStudiPageContent | null;
  dosenContent?: DosenPageContent | null;
  beasiswaContent?: BeasiswaPageContent | null;
  consultationCard?: ConsultationCard | null;
};

async function resolveAkademikPageContent(): Promise<AkademikPageContent> {
  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'akademik-page' as never });

    return {
      programStudiContent: (global as AkademikPageContent).programStudiContent || null,
      dosenContent: (global as AkademikPageContent).dosenContent || null,
      beasiswaContent: (global as AkademikPageContent).beasiswaContent || null,
      consultationCard: (global as AkademikPageContent).consultationCard || null,
    };
  } catch {
    return {};
  }
}

export const getAkademikPageContent = unstable_cache(
  resolveAkademikPageContent,
  ['akademik-page-content'],
  { revalidate: 60 },
);
