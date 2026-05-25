import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import { getPayloadClient } from '@/lib/payload';
import * as LucideIcons from 'lucide-react';
import {
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Info,
  Mail,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

type PortalCategory =
  | 'penerimaan'
  | 'akademik'
  | 'pembelajaran'
  | 'referensi'
  | 'nasional'
  | 'layanan';

type PortalItem = {
  nama: string;
  kategori?: PortalCategory | null;
  url: string;
  deskripsi?: string | null;
  icon?: string | null;
};

type PortalData = {
  portals?: PortalItem[] | null;
  bantuanTeknis?: {
    judul?: string | null;
    deskripsi?: string | null;
    email?: string | null;
    emailLabel?: string | null;
    whatsappLabel?: string | null;
    whatsappUrl?: string | null;
  } | null;
};

const categoryMeta: Record<
  PortalCategory,
  {
    title: string;
    description: string;
    icon: LucideIcons.LucideIcon;
  }
> = {
  penerimaan: {
    title: 'Penerimaan',
    description: 'Pendaftaran dan informasi calon mahasiswa baru.',
    icon: Sparkles,
  },
  akademik: {
    title: 'Akademik',
    description: 'Administrasi akademik untuk mahasiswa, dosen, dan orang tua.',
    icon: GraduationCap,
  },
  pembelajaran: {
    title: 'Pembelajaran',
    description: 'Kelas digital, materi kuliah, dan aktivitas belajar daring.',
    icon: BookOpen,
  },
  referensi: {
    title: 'Referensi & Publikasi',
    description: 'Perpustakaan, jurnal, repository, dan penelusuran karya ilmiah.',
    icon: ShieldCheck,
  },
  nasional: {
    title: 'Portal Nasional',
    description: 'Layanan eksternal terkait data pendidikan tinggi dan pelaporan.',
    icon: ExternalLink,
  },
  layanan: {
    title: 'Layanan Kampus',
    description: 'Layanan pendukung operasional dan aktivitas kampus.',
    icon: Info,
  },
};

const categoryOrder: PortalCategory[] = [
  'penerimaan',
  'akademik',
  'pembelajaran',
  'referensi',
  'nasional',
  'layanan',
];

const portalFallback: Record<string, Partial<PortalItem>> = {
  PMB: {
    kategori: 'penerimaan',
    deskripsi: 'Pendaftaran mahasiswa baru, jadwal seleksi, dan informasi admisi STTPU.',
    icon: 'MonitorSmartphone',
  },
  'SIAKAD Mahasiswa': {
    kategori: 'akademik',
    deskripsi: 'KRS, KHS, jadwal kuliah, pembayaran, dan layanan akademik mahasiswa.',
    icon: 'GraduationCap',
  },
  'SIAKAD Dosen': {
    kategori: 'akademik',
    deskripsi: 'Presensi, penilaian, jadwal mengajar, dan administrasi akademik dosen.',
    icon: 'UserCheck',
  },
  'SIAKAD Orang Tua': {
    kategori: 'akademik',
    deskripsi: 'Pemantauan informasi akademik mahasiswa untuk orang tua atau wali.',
    icon: 'Users',
  },
  'LMS Mahasiswa': {
    kategori: 'pembelajaran',
    deskripsi: 'Akses materi kuliah, tugas, kuis, dan aktivitas pembelajaran daring.',
    icon: 'BookOpen',
  },
  'LMS Dosen': {
    kategori: 'pembelajaran',
    deskripsi: 'Kelola kelas daring, materi, tugas, dan penilaian pembelajaran.',
    icon: 'Presentation',
  },
  SIPEKAD: {
    kategori: 'akademik',
    deskripsi: 'Pengajuan layanan akademik mahasiswa secara digital.',
    icon: 'FileCheck2',
  },
  Perpustakaan: {
    kategori: 'referensi',
    deskripsi: 'Akses katalog dan layanan perpustakaan STTPU.',
    icon: 'Library',
  },
  OJS: {
    kategori: 'referensi',
    deskripsi: 'Portal jurnal elektronik untuk publikasi ilmiah kampus.',
    icon: 'Newspaper',
  },
  Repository: {
    kategori: 'referensi',
    deskripsi: 'Repositori karya ilmiah, dokumen akademik, dan publikasi institusi.',
    icon: 'Archive',
  },
  PDDIKTI: {
    kategori: 'nasional',
    deskripsi: 'Pangkalan Data Pendidikan Tinggi Kemdikbudristek.',
    icon: 'Database',
  },
  SISTER: {
    kategori: 'nasional',
    deskripsi: 'Sistem informasi sumber daya terintegrasi untuk dosen.',
    icon: 'IdCard',
  },
  'Tracer Study': {
    kategori: 'layanan',
    deskripsi: 'Pelacakan alumni dan umpan balik dunia kerja.',
    icon: 'Route',
  },
  PISN: {
    kategori: 'akademik',
    deskripsi: 'Layanan administrasi dan informasi akademik pendukung.',
    icon: 'ClipboardList',
  },
  SIMKATMAWA: {
    kategori: 'nasional',
    deskripsi: 'Pelaporan kinerja bidang kemahasiswaan tingkat perguruan tinggi.',
    icon: 'Trophy',
  },
  SPADA: {
    kategori: 'pembelajaran',
    deskripsi: 'Sistem pembelajaran daring nasional untuk pendidikan tinggi.',
    icon: 'Laptop',
  },
  SIERRA: {
    kategori: 'nasional',
    deskripsi: 'Portal layanan dan pelaporan eksternal terkait pendidikan tinggi.',
    icon: 'Network',
  },
  'LLDIKTI 3': {
    kategori: 'nasional',
    deskripsi: 'Informasi dan layanan LLDIKTI Wilayah III.',
    icon: 'Building2',
  },
};

function getPortal(item: PortalItem): PortalItem {
  const fallback = portalFallback[item.nama] || {};

  return {
    ...item,
    kategori: item.kategori || fallback.kategori || 'layanan',
    deskripsi: item.deskripsi || fallback.deskripsi || 'Akses layanan digital STTPU Jakarta.',
    icon: item.icon || fallback.icon || 'ExternalLink',
  };
}

function LinkCard({ item }: { item: PortalItem }) {
  const Icon =
    (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[item.icon || 'ExternalLink'] ||
    LucideIcons.HelpCircle;
  const external = item.url.startsWith('http');
  const pending = item.url === '#';
  const cls =
    'group flex h-full items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold/60 hover:shadow-[0_16px_34px_rgba(15,23,42,0.09)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2';

  const inner = (
    <>
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-mist text-brand-navy transition-colors group-hover:bg-brand-navy group-hover:text-brand-gold"
        aria-hidden="true"
      >
        <Icon size={20} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-bold leading-snug text-gray-950 group-hover:text-brand-navy">
            {item.nama}
          </h3>
          {pending ? (
            <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
              Segera
            </span>
          ) : external ? (
            <ArrowUpRight size={15} className="mt-0.5 shrink-0 text-gray-400 group-hover:text-brand-navy" />
          ) : (
            <ChevronRight size={15} className="mt-0.5 shrink-0 text-gray-400 group-hover:text-brand-navy" />
          )}
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{item.deskripsi}</p>
      </div>
    </>
  );

  if (pending) {
    return <div className={`${cls} cursor-default opacity-80`}>{inner}</div>;
  }

  if (external) {
    return (
      <a href={item.url} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={item.url} className={cls}>
      {inner}
    </Link>
  );
}

async function resolvePortalData() {
  let portalData: PortalData | null = null;

  try {
    const payload = await getPayloadClient();
    const global = await payload.findGlobal({ slug: 'portal-links' });
    portalData = global as unknown as PortalData;
  } catch (error) {
    console.error('Error fetching portal links:', error);
  }

  return portalData;
}

const getPortalData = unstable_cache(
  resolvePortalData,
  ['portal-links-data'],
  { revalidate: 60 },
);

export default async function PortalContent() {
  const portalData = await getPortalData();

  const portals = (portalData?.portals || []).map(getPortal);
  const activeCount = portals.filter((item) => item.url !== '#').length;
  const pendingCount = portals.length - activeCount;
  const grouped = categoryOrder
    .map((category) => ({
      category,
      meta: categoryMeta[category],
      items: portals.filter((item) => item.kategori === category),
    }))
    .filter((section) => section.items.length > 0);

  const bantuanTeknis = {
    judul: portalData?.bantuanTeknis?.judul || 'Butuh Bantuan Teknis?',
    deskripsi:
      portalData?.bantuanTeknis?.deskripsi ||
      'Jika mengalami kendala akses atau lupa kata sandi, hubungi UPT Teknologi Informasi STTPU.',
    email: portalData?.bantuanTeknis?.email || 'it@sttpu.ac.id',
    emailLabel:
      portalData?.bantuanTeknis?.emailLabel || portalData?.bantuanTeknis?.email || 'it@sttpu.ac.id',
    whatsappLabel: portalData?.bantuanTeknis?.whatsappLabel || 'Chat WhatsApp Bantuan',
    whatsappUrl: portalData?.bantuanTeknis?.whatsappUrl || '#',
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-start gap-3">
            <Info size={18} className="mt-0.5 shrink-0 text-amber-700" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold text-amber-950">Akses sistem digital STTPU</p>
              <p className="mt-1 text-sm leading-relaxed text-amber-800">
                Gunakan daftar portal ini untuk menuju layanan akademik, pembelajaran, referensi,
                dan portal nasional. Tautan bertanda "Segera" masih menunggu aktivasi.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <p className="text-2xl font-extrabold text-brand-navy">{activeCount}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
              Aktif
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <p className="text-2xl font-extrabold text-brand-navy">{pendingCount}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
              Segera
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="space-y-8">
          {grouped.map(({ category, meta, items }) => {
            const Icon = meta.icon;

            return (
              <section key={category} aria-labelledby={`portal-${category}`}>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-brand-gold"
                      aria-hidden="true"
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <h2 id={`portal-${category}`} className="text-lg font-extrabold text-brand-navy">
                        {meta.title}
                      </h2>
                      <p className="mt-1 max-w-2xl text-sm leading-relaxed text-gray-500">
                        {meta.description}
                      </p>
                    </div>
                  </div>
                  <span className="hidden shrink-0 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-bold text-gray-500 sm:inline-flex">
                    {items.length} tautan
                  </span>
                </div>

                <ul className="grid gap-3 sm:grid-cols-2" aria-label={`Daftar ${meta.title}`}>
                  {items.map((item) => (
                    <li key={item.nama}>
                      <LinkCard item={item} />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="rounded-2xl bg-brand-navy p-6 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)]">
            <h2 className="text-base font-bold">{bantuanTeknis.judul}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/75">{bantuanTeknis.deskripsi}</p>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href={`mailto:${bantuanTeknis.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-gold px-4 py-2.5 text-sm font-bold text-brand-navy transition-colors hover:bg-white"
              >
                <Mail size={15} aria-hidden="true" />
                {bantuanTeknis.emailLabel}
              </a>
              <a
                href={bantuanTeknis.whatsappUrl}
                target={bantuanTeknis.whatsappUrl.startsWith('http') ? '_blank' : undefined}
                rel={bantuanTeknis.whatsappUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                <MessageSquare size={15} aria-hidden="true" />
                {bantuanTeknis.whatsappLabel}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
