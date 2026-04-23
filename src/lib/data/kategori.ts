export type KategoriWarna =
  | 'navy'
  | 'blue'
  | 'green'
  | 'orange'
  | 'red'
  | 'purple'
  | 'gold';

export type ManagedKategori = {
  id?: string;
  nama: string;
  slug: string;
  warna?: KategoriWarna | string;
  urutan?: number | null;
};

type KategoriTone = {
  badge: string;
  badgeSoft: string;
  dot: string;
};

const kategoriToneMap: Record<KategoriWarna, KategoriTone> = {
  navy: {
    badge: 'bg-brand-navy/10 text-brand-navy border-brand-navy/15',
    badgeSoft: 'bg-brand-navy/5 text-brand-navy border-brand-navy/10',
    dot: 'bg-brand-navy',
  },
  blue: {
    badge: 'bg-blue-100 text-blue-800 border-blue-200',
    badgeSoft: 'bg-blue-50 text-blue-700 border-blue-100',
    dot: 'bg-blue-400',
  },
  green: {
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    badgeSoft: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    dot: 'bg-emerald-400',
  },
  orange: {
    badge: 'bg-orange-100 text-orange-800 border-orange-200',
    badgeSoft: 'bg-orange-50 text-orange-700 border-orange-100',
    dot: 'bg-orange-400',
  },
  red: {
    badge: 'bg-red-100 text-red-800 border-red-200',
    badgeSoft: 'bg-red-50 text-red-700 border-red-100',
    dot: 'bg-red-400',
  },
  purple: {
    badge: 'bg-violet-100 text-violet-800 border-violet-200',
    badgeSoft: 'bg-violet-50 text-violet-700 border-violet-100',
    dot: 'bg-violet-400',
  },
  gold: {
    badge: 'bg-amber-100 text-amber-800 border-amber-200',
    badgeSoft: 'bg-amber-50 text-amber-700 border-amber-100',
    dot: 'bg-amber-400',
  },
};

export function normalizeKategoriWarna(warna?: string | null, fallback: KategoriWarna = 'navy'): KategoriWarna {
  if (!warna) return fallback;

  return warna in kategoriToneMap ? (warna as KategoriWarna) : fallback;
}

export function getKategoriBadgeClass(warna?: string | null, fallback: KategoriWarna = 'navy'): string {
  return kategoriToneMap[normalizeKategoriWarna(warna, fallback)].badge;
}

export function getKategoriSoftBadgeClass(warna?: string | null, fallback: KategoriWarna = 'navy'): string {
  return kategoriToneMap[normalizeKategoriWarna(warna, fallback)].badgeSoft;
}

export function getKategoriDotClass(warna?: string | null, fallback: KategoriWarna = 'navy'): string {
  return kategoriToneMap[normalizeKategoriWarna(warna, fallback)].dot;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapPayloadToManagedKategori(doc: any): ManagedKategori | null {
  if (!doc || typeof doc !== 'object') return null;

  return {
    id: doc.id != null ? String(doc.id) : undefined,
    nama: doc.nama ?? '',
    slug: doc.slug ?? '',
    warna: doc.warna ?? undefined,
    urutan: typeof doc.urutan === 'number' ? doc.urutan : undefined,
  };
}
