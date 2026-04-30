import { getPayloadClient } from '@/lib/payload';

export type ProgramStudiPageContent = {
  gridTitle?: string | null;
  gridDescription?: string | null;
  consultationTitle?: string | null;
  consultationDescription?: string | null;
  consultationPrimaryLabel?: string | null;
  consultationPrimaryHref?: string | null;
  consultationSecondaryLabel?: string | null;
  consultationSecondaryHref?: string | null;
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

export type AkademikPageContent = {
  programStudiContent?: ProgramStudiPageContent | null;
  dosenContent?: DosenPageContent | null;
  beasiswaContent?: BeasiswaPageContent | null;
};

export async function getAkademikPageContent(): Promise<AkademikPageContent> {
  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'akademik-page' as never });

    return {
      programStudiContent: (global as AkademikPageContent).programStudiContent || null,
      dosenContent: (global as AkademikPageContent).dosenContent || null,
      beasiswaContent: (global as AkademikPageContent).beasiswaContent || null,
    };
  } catch {
    return {};
  }
}
