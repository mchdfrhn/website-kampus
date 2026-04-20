import { Mail, AtSign } from 'lucide-react';

const organisasi = [
  {
    nama: 'Badan Eksekutif Mahasiswa (BEM)',
    singkatan: 'BEM STTPU',
    deskripsi: 'Organisasi eksekutif mahasiswa tertinggi di STTPU yang berfungsi menjalankan program kerja kemahasiswaan, menjadi jembatan aspirasi mahasiswa kepada pimpinan institusi, dan mengkoordinasikan seluruh kegiatan kemahasiswaan.',
    ketua: 'Rizky Pratama (Teknik Sipil, 2023)',
    program: ['Olimpiade Mahasiswa STTPU', 'Bakti Sosial Infrastruktur Desa', 'Forum Dialog Mahasiswa-Pimpinan', 'Pelatihan Kepemimpinan Mahasiswa', 'Expo Karya Mahasiswa'],
    kontak: 'bem@mhs.sttpu.ac.id',
    instagram: '@bem.sttpu',
    warna: 'border-[#1E3A5F]',
    badge: 'bg-[#1E3A5F] text-white',
  },
  {
    nama: 'Senat Mahasiswa',
    singkatan: 'SEMA STTPU',
    deskripsi: 'Lembaga legislatif mahasiswa yang bertugas membuat kebijakan organisasi kemahasiswaan, mengawasi jalannya program BEM, dan menampung aspirasi mahasiswa secara sistematis.',
    ketua: 'Anisa Rahmawati (Teknik Lingkungan, 2022)',
    program: ['Pemira (Pemilihan Raya) Mahasiswa', 'Sidang Pleno Kemahasiswaan', 'Pengawasan Program BEM', 'Dengar Pendapat Mahasiswa'],
    kontak: 'sema@mhs.sttpu.ac.id',
    instagram: '@sema.sttpu',
    warna: 'border-[#F5A623]',
    badge: 'bg-[#F5A623] text-[#1E3A5F]',
  },
  {
    nama: 'Himpunan Mahasiswa Teknik Sipil',
    singkatan: 'HMTS',
    deskripsi: 'Himpunan mahasiswa program studi Teknik Sipil yang menyelenggarakan kegiatan akademik, pengembangan profesi, dan kompetisi di bidang teknik sipil dan konstruksi.',
    ketua: 'Arief Budiman (Teknik Sipil, 2023)',
    program: ['Civil Competition Week', 'Workshop AutoCAD & SAP2000', 'Kunjungan Proyek Konstruksi', 'Seminar Teknik Sipil', 'Buletin HMTS'],
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
    program: ['Green Campus Campaign', 'Workshop Pengolahan Air', 'Ekspedisi Lingkungan', 'Seminar Lingkungan Hidup'],
    kontak: 'hmtl@mhs.sttpu.ac.id',
    instagram: '@hmtl.sttpu',
    warna: 'border-gray-300',
    badge: 'bg-gray-100 text-gray-800',
  },
];

export default function OrganisasiContent() {
  return (
    <article className="space-y-6">
      <p className="text-gray-600 text-sm leading-relaxed">
        STTPU Jakarta memiliki empat organisasi kemahasiswaan aktif yang menjalankan fungsi
        eksekutif, legislatif, dan himpunan profesi untuk mendukung pengembangan mahasiswa secara
        akademik dan non-akademik.
      </p>

      <ul className="space-y-6">
        {organisasi.map((org, idx) => (
          <li key={idx} className={`bg-white border-2 ${org.warna} rounded-xl overflow-hidden`}>
            <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-bold text-gray-900 text-base">{org.nama}</h2>
                <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mt-1 ${org.badge}`}>
                  {org.singkatan}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1 text-xs text-gray-500">
                <a href={`mailto:${org.kontak}`} className="flex items-center gap-1.5 hover:text-[#1E3A5F] transition-colors">
                  <Mail size={12} aria-hidden="true" /> {org.kontak}
                </a>
                <span className="flex items-center gap-1.5">
                  <AtSign size={12} aria-hidden="true" /> {org.instagram}
                </span>
              </div>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Tentang</p>
                <p className="text-gray-700 text-sm leading-relaxed">{org.deskripsi}</p>
                <p className="text-gray-500 text-xs mt-3">
                  <span className="font-semibold">Ketua:</span> {org.ketua}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Program Unggulan</p>
                <ul className="space-y-1.5">
                  {org.program.map((p, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] flex-shrink-0" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
