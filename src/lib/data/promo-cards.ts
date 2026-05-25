import { getPayloadClient } from '@/lib/payload';
import { unstable_cache } from 'next/cache';

export type PromoCardsData = {
  pmbTitle: string;
  pmbDescription: string;
  pmbButtonText: string;
  pmbButtonUrl: string;
  infoTitle: string;
  infoDescription: string;
  infoButtonText: string;
  infoButtonUrl: string;
};

export const defaultPromoCards: PromoCardsData = {
  pmbTitle: 'Mulai Karir Anda di Bidang Infrastruktur',
  pmbDescription: 'Pendaftaran Mahasiswa Baru STTPU Jakarta telah dibuka. Bergabunglah bersama kami dan jadilah tenaga ahli profesional.',
  pmbButtonText: 'Daftar Sekarang',
  pmbButtonUrl: 'https://siakadat.sttpu.ac.id/spmb',
  infoTitle: 'Hubungi Kami',
  infoDescription: 'Butuh informasi lebih lanjut mengenai perkuliahan, biaya kuliah, akreditasi, atau fasilitas kampus?',
  infoButtonText: 'Hubungi Humas',
  infoButtonUrl: '/kontak',
};

async function resolvePromoCards() {
  try {
    const payload = await getPayloadClient();
    const settings = await payload.findGlobal({ slug: 'site-settings' as never });

    if (settings) {
      const data = settings as any;
      return {
        pmbTitle: data.pmbTitle || defaultPromoCards.pmbTitle,
        pmbDescription: data.pmbDescription || defaultPromoCards.pmbDescription,
        pmbButtonText: data.pmbButtonText || defaultPromoCards.pmbButtonText,
        pmbButtonUrl: data.pmbButtonUrl || defaultPromoCards.pmbButtonUrl,
        infoTitle: data.infoTitle || defaultPromoCards.infoTitle,
        infoDescription: data.infoDescription || defaultPromoCards.infoDescription,
        infoButtonText: data.infoButtonText || defaultPromoCards.infoButtonText,
        infoButtonUrl: data.infoButtonUrl || defaultPromoCards.infoButtonUrl,
      };
    }
  } catch {
    // Return defaults when DB/Payload is unavailable
  }

  return defaultPromoCards;
}

export const getPromoCards = unstable_cache(
  resolvePromoCards,
  ['site-promo-cards'],
  { revalidate: 60 }
);
