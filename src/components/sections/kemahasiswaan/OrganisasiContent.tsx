import { Mail, AtSign, Users, Award, Shield } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';

type OrgItem = {
  nama: string
  singkatan: string
  deskripsi: string
  ketua: string
  program: { nama: string }[]
  kontak: string
  instagram: string
  warna?: string
  badge?: string
}

const defaults: OrgItem[] = [
  {
    nama: 'Badan Eksekutif Mahasiswa (BEM)',
    singkatan: 'BEM STTPU',
    deskripsi: 'Organisasi eksekutif mahasiswa tertinggi di STTPU yang berfungsi menjalankan program kerja kemahasiswaan, menjadi jembatan aspirasi mahasiswa kepada pimpinan institusi, dan mengkoordinasikan seluruh kegiatan kemahasiswaan.',
    ketua: 'Rizky Pratama (Teknik Sipil, 2023)',
    program: [{ nama: 'Olimpiade Mahasiswa STTPU' }, { nama: 'Bakti Sosial Infrastruktur Desa' }, { nama: 'Forum Dialog Mahasiswa-Pimpinan' }, { nama: 'Pelatihan Kepemimpinan Mahasiswa' }, { nama: 'Expo Karya Mahasiswa' }],
    kontak: 'bem@mhs.sttpu.ac.id',
    instagram: '@bem.sttpu',
    warna: 'border-brand-navy',
    badge: 'bg-brand-navy text-white',
  },
  {
    nama: 'Senat Mahasiswa',
    singkatan: 'SEMA STTPU',
    deskripsi: 'Lembaga legislatif mahasiswa yang bertugas membuat kebijakan organisasi kemahasiswaan, mengawasi jalannya program BEM, dan menampung aspirasi mahasiswa secara sistematis.',
    ketua: 'Anisa Rahmawati (Teknik Lingkungan, 2022)',
    program: [{ nama: 'Pemira (Pemilihan Raya) Mahasiswa' }, { nama: 'Sidang Pleno Kemahasiswaan' }, { nama: 'Pengawasan Program BEM' }, { nama: 'Dengar Pendapat Mahasiswa' }],
    kontak: 'sema@mhs.sttpu.ac.id',
    instagram: '@sema.sttpu',
    warna: 'border-brand-gold',
    badge: 'bg-brand-gold text-brand-navy',
  },
  {
    nama: 'Himpunan Mahasiswa Teknik Sipil',
    singkatan: 'HMTS',
    deskripsi: 'Himpunan mahasiswa program studi Teknik Sipil yang menyelenggarakan kegiatan akademik, pengembangan profesi, dan kompetisi di bidang teknik sipil dan konstruksi.',
    ketua: 'Arief Budiman (Teknik Sipil, 2023)',
    program: [{ nama: 'Civil Competition Week' }, { nama: 'Workshop AutoCAD & SAP2000' }, { nama: 'Kunjungan Proyek Konstruksi' }, { nama: 'Seminar Teknik Sipil' }, { nama: 'Buletin HMTS' }],
    kontak: 'hmts@mhs.sttpu.ac.id',
    instagram: '@hmts.sttpu',
    warna: 'border-gray-200',
    badge: 'bg-gray-100 text-gray-800',
  },
  {
    nama: 'Himpunan Mahasiswa Teknik Lingkungan',
    singkatan: 'HMTL',
    deskripsi: 'Himpunan mahasiswa program studi Teknik Lingkungan yang aktif dalam kegiatan akademik, lingkungan hidup, dan kepedulian sosial berbasis teknologi lingkungan.',
    ketua: 'Dewi Pertiwi (Teknik Lingkungan, 2023)',
    program: [{ nama: 'Green Campus Campaign' }, { nama: 'Workshop Pengolahan Air' }, { nama: 'Ekspedisi Lingkungan' }, { nama: 'Seminar Lingkungan Hidup' }],
    kontak: 'hmtl@mhs.sttpu.ac.id',
    instagram: '@hmtl.sttpu',
    warna: 'border-gray-200',
    badge: 'bg-gray-100 text-gray-800',
  },
];

function SectionCard({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-premium border border-gray-100 bg-white p-6 shadow-premium sm:rounded-premium-lg sm:p-8 lg:p-10">
      {eyebrow ? (
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">{eyebrow}</p>
      ) : null}
      <h2 className="text-xl font-bold tracking-tight text-brand-navy sm:text-2xl">{title}</h2>
      <div className="mt-4 h-1 w-12 rounded-full bg-brand-gold" />
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default async function OrganisasiContent() {
  let organisasi = defaults

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'organisasi',
      sort: 'urutan',
      limit: 20,
    })
    if (result.docs.length > 0) {
      organisasi = result.docs as unknown as OrgItem[]
    }
  } catch {
    // DB unavailable — use defaults
  }

  return (
    <article className="space-y-10 sm:space-y-12">
      <SectionCard title="Pengembangan Kepemimpinan" eyebrow="Leadership">
        <div className="flex items-start gap-4 p-5 rounded-2xl border border-brand-navy/10 bg-brand-navy/[0.02]">
          <Shield size={24} className="text-brand-navy flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-gray-600 text-sm font-semibold leading-relaxed">
            Melalui organisasi ini, mahasiswa dapat belajar kepemimpinan, tata kelola program,
            advokasi aspirasi, dan kolaborasi lintas program studi dalam konteks yang nyata.
          </p>
        </div>
      </SectionCard>

      <SectionCard title="Daftar Organisasi" eyebrow="Student Bodies">
        <div className="space-y-6">
          {organisasi.map((org, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-premium hover:border-brand-navy/10 transition-all duration-300 group"
            >
              <div className="px-6 py-5 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-brand-navy text-base sm:text-lg group-hover:text-brand-gold transition-colors duration-300">{org.nama}</h4>
                  <span className={`inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md mt-2 shadow-sm ${org.badge || 'bg-gray-100 text-gray-800'}`}>
                    {org.singkatan}
                  </span>
                </div>
                <div className="flex flex-col sm:items-end gap-1.5 text-xs text-gray-400 font-semibold">
                  {org.kontak && (
                    <a href={`mailto:${org.kontak}`} className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
                      <Mail size={14} aria-hidden="true" /> {org.kontak}
                    </a>
                  )}
                  {org.instagram && (
                    <span className="flex items-center gap-1.5">
                      <AtSign size={14} aria-hidden="true" /> {org.instagram}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Deskripsi &amp; Peran</p>
                    <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">{org.deskripsi}</p>
                  </div>
                  {org.ketua && (
                    <div className="pt-2">
                      <p className="text-gray-400 text-xs font-semibold">
                        <span className="font-bold text-brand-navy">Ketua:</span> {org.ketua}
                      </p>
                    </div>
                  )}
                </div>
                
                {org.program && org.program.length > 0 && (
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Program Unggulan</p>
                    <ul className="space-y-2">
                      {org.program.map((p, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0" aria-hidden="true" />
                          {p.nama}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </article>
  );
}
