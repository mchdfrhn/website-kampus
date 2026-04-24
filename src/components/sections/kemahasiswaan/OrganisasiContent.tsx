import { Mail, AtSign } from 'lucide-react';
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
    deskripsi: 'Himpunan mahasiswa program studi Teknik Sipil yang menyelenggarakan kegiatan akademik, pengembangan profesi, dan kompetisi di bidang teknik sipil and konstruksi.',
    ketua: 'Arief Budiman (Teknik Sipil, 2023)',
    program: [{ nama: 'Civil Competition Week' }, { nama: 'Workshop AutoCAD & SAP2000' }, { nama: 'Kunjungan Proyek Konstruksi' }, { nama: 'Seminar Teknik Sipil' }, { nama: 'Buletin HMTS' }],
    kontak: 'hmts@mhs.sttpu.ac.id',
    instagram: '@hmts.sttpu',
    warna: 'border-gray-300',
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
    warna: 'border-gray-300',
    badge: 'bg-gray-100 text-gray-800',
  },
];

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
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
      <div className="mb-12 text-center lg:mb-16 lg:text-left">
        <h2 className="text-brand-navy font-bold text-3xl md:text-4xl tracking-tight leading-[1.2]">
          Organisasi Mahasiswa
        </h2>
        <div className="w-12 h-1 bg-brand-gold rounded-full mt-6 mx-auto lg:mx-0" />
        <p className="mt-8 text-gray-500 font-medium max-w-3xl leading-relaxed mx-auto lg:mx-0 text-sm md:text-base">
          STTPU Jakarta memiliki organisasi kemahasiswaan aktif yang menjalankan fungsi eksekutif,
          legislatif, dan himpunan profesi untuk mendukung pengembangan mahasiswa secara akademik
          dan non-akademik.
        </p>
      </div>

      <div className="bg-brand-mist rounded-xl p-5 border border-gray-200">
        <p className="text-gray-700 text-sm leading-relaxed">
          Melalui organisasi ini, mahasiswa dapat belajar kepemimpinan, tata kelola program,
          advokasi aspirasi, dan kolaborasi lintas program studi dalam konteks yang nyata.
        </p>
      </div>

      <ul className="space-y-6">
        {organisasi.map((org, idx) => (
          <li key={idx} className={`bg-white border-2 ${org.warna || 'border-gray-200'} rounded-xl overflow-hidden`}>
            <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-gray-900 text-base">{org.nama}</h3>
                <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mt-1 ${org.badge || 'bg-gray-100 text-gray-800'}`}>
                  {org.singkatan}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1 text-xs text-gray-500">
                {org.kontak && (
                  <a href={`mailto:${org.kontak}`} className="flex items-center gap-1.5 hover:text-brand-navy transition-colors">
                    <Mail size={12} aria-hidden="true" /> {org.kontak}
                  </a>
                )}
                {org.instagram && (
                  <span className="flex items-center gap-1.5">
                    <AtSign size={12} aria-hidden="true" /> {org.instagram}
                  </span>
                )}
              </div>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Tentang</p>
                <p className="text-gray-700 text-sm leading-relaxed">{org.deskripsi}</p>
                {org.ketua && (
                  <p className="text-gray-500 text-xs mt-3">
                    <span className="font-semibold">Ketua:</span> {org.ketua}
                  </p>
                )}
              </div>
              {org.program && org.program.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Program Unggulan</p>
                  <ul className="space-y-1.5">
                    {org.program.map((p, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0" aria-hidden="true" />
                        {p.nama}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
