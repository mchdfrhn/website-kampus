import type { ManagedKategori } from './kategori';
import { mapPayloadToManagedKategori } from './kategori';

export type AlbumKategori = ManagedKategori;

export type Album = {
  id: string;
  judul: string;
  slug: string;
  kategori: AlbumKategori;
  deskripsi?: string;
  coverFotoUrl?: string;
  jumlahFoto: number;
  tanggal?: string;
};

const galeriKategoriDefaults: Record<string, Omit<AlbumKategori, 'id' | 'urutan'>> = {
  kegiatan: { nama: 'Kegiatan Kampus', slug: 'kegiatan', warna: 'blue' },
  fasilitas: { nama: 'Fasilitas', slug: 'fasilitas', warna: 'green' },
  wisuda: { nama: 'Wisuda', slug: 'wisuda', warna: 'gold' },
  prestasi: { nama: 'Prestasi & Penghargaan', slug: 'prestasi', warna: 'orange' },
};

export function resolveGaleriKategori(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
): AlbumKategori {
  if (typeof value === 'string' && value in galeriKategoriDefaults) {
    return galeriKategoriDefaults[value];
  }

  const mapped = mapPayloadToManagedKategori(value);

  if (mapped?.slug) {
    const fallback = galeriKategoriDefaults[mapped.slug] ?? {
      nama: mapped.nama || 'Album',
      slug: mapped.slug,
      warna: 'navy',
    };

    return {
      ...fallback,
      ...mapped,
      nama: mapped.nama || fallback.nama,
      warna: mapped.warna || fallback.warna,
    };
  }

  return galeriKategoriDefaults.kegiatan;
}

export function formatGaleriTanggal(iso: string): string {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapPayloadToAlbum(doc: any): Album {
  const coverFotoUrl: string | undefined =
    doc.coverFoto && typeof doc.coverFoto === 'object' && doc.coverFoto.url
      ? (doc.coverFoto.url as string)
      : undefined;

  return {
    id: String(doc.id),
    judul: doc.judul ?? '',
    slug: doc.slug ?? '',
    kategori: resolveGaleriKategori(doc.kategori),
    deskripsi: doc.deskripsi ?? undefined,
    coverFotoUrl,
    jumlahFoto: doc.foto?.length ?? 0,
    tanggal: doc.tanggal ?? undefined,
  };
}
