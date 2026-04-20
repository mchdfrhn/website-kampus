import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { HeartHandshake, Briefcase, BookOpen, ShieldAlert, Landmark, MessageSquare } from 'lucide-react';

const layanan = [
  {
    icon: HeartHandshake,
    nama: 'Bimbingan & Konseling',
    deskripsi: 'Layanan konseling psikologis dan akademik untuk mendukung kesehatan mental dan keberhasilan studi mahasiswa STTPU.',
    jam: 'Senin–Jumat 09.00–15.00 WIB',
    lokasi: 'Gedung A Lt. 1, Ruang BK',
    kontak: [{ type: 'tel', value: '(021) 2938-2938 ext. 103' }, { type: 'email', value: 'bk@sttpu.ac.id' }],
    layananDetail: ['Konseling individual', 'Konseling kelompok', 'Tes minat & bakat', 'Konsultasi studi lanjut'],
  },
  {
    icon: Briefcase,
    nama: 'Career Center',
    deskripsi: 'Pusat pengembangan karir mahasiswa dan alumni: informasi lowongan, pelatihan soft skill, dan mediasi rekrutmen industri.',
    jam: 'Senin–Jumat 08.00–16.00 WIB',
    lokasi: 'Gedung B Lt. 2, Ruang Career Center',
    kontak: [{ type: 'email', value: 'career@sttpu.ac.id' }, { type: 'wa', value: '+6281234567890' }],
    layananDetail: ['Bursa kerja dan magang', 'Pelatihan interview & CV', 'Job fair tahunan', 'Mentoring alumni-mahasiswa'],
  },
  {
    icon: BookOpen,
    nama: 'Beasiswa & Bantuan Keuangan',
    deskripsi: 'Informasi, pendampingan, dan pemrosesan berbagai program beasiswa internal dan eksternal untuk mahasiswa STTPU.',
    jam: 'Senin–Jumat 08.00–15.00 WIB',
    lokasi: 'Gedung A Lt. 1, Bagian Kemahasiswaan',
    kontak: [{ type: 'tel', value: '(021) 2938-2938 ext. 102' }, { type: 'email', value: 'kemahasiswaan@sttpu.ac.id' }],
    layananDetail: ['KIP Kuliah', 'Beasiswa prestasi akademik', 'Keringanan UKT', 'Beasiswa mitra industri'],
  },
  {
    icon: ShieldAlert,
    nama: 'Klinik Kesehatan',
    deskripsi: 'Layanan kesehatan dasar bagi civitas akademika STTPU — pemeriksaan umum, P3K, dan rujukan ke fasilitas kesehatan lanjutan.',
    jam: 'Senin–Jumat 08.00–15.00 WIB',
    lokasi: 'Gedung Serba Guna Lt. 1',
    kontak: [{ type: 'tel', value: '(021) 2938-2938 ext. 120' }],
    layananDetail: ['Pemeriksaan umum gratis', 'P3K kecelakaan kerja/lab', 'Surat keterangan sehat', 'Rujukan BPJS'],
  },
  {
    icon: Landmark,
    nama: 'Administrasi Mahasiswa',
    deskripsi: 'Pengurusan surat-surat resmi mahasiswa: surat keterangan aktif, transkrip sementara, surat dispensasi, dan dokumen lainnya.',
    jam: 'Senin–Jumat 08.00–15.00 WIB',
    lokasi: 'Gedung A Lt. 1, Bagian Akademik',
    kontak: [{ type: 'tel', value: '(021) 2938-2938 ext. 101' }, { type: 'email', value: 'akademik@sttpu.ac.id' }],
    layananDetail: ['Surat keterangan aktif mahasiswa', 'Transkrip nilai sementara', 'Legalisasi dokumen', 'Surat dispensasi & izin'],
  },
  {
    icon: MessageSquare,
    nama: 'Pengaduan & Mediasi',
    deskripsi: 'Saluran resmi untuk melaporkan permasalahan akademik, perundungan (bullying), atau ketidaksesuaian prosedur yang dialami mahasiswa.',
    jam: 'Senin–Jumat 08.00–15.00 WIB',
    lokasi: 'Bagian Kemahasiswaan / Online',
    kontak: [{ type: 'email', value: 'pengaduan@sttpu.ac.id' }],
    layananDetail: ['Pengaduan online terenkripsi', 'Mediasi sengketa akademik', 'Pelaporan kekerasan/bullying', 'Konsultasi hak mahasiswa'],
  },
];

export default function LayananContent() {
  return (
    <article className="space-y-5">
      <p className="text-gray-600 text-sm leading-relaxed">
        STTPU menyediakan berbagai layanan kemahasiswaan yang dapat diakses secara langsung maupun
        online untuk mendukung kelancaran studi dan kesejahteraan mahasiswa.
      </p>

      <ul className="space-y-4">
        {layanan.map((l, idx) => {
          const Icon = l.icon;
          return (
            <li key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#1E3A5F] hover:shadow-sm transition-all">
              <div className="flex items-start gap-4 p-5">
                <div className="w-11 h-11 bg-[#1E3A5F] rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Icon size={20} className="text-[#F5A623]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-gray-900 text-sm mb-1">{l.nama}</h2>
                  <p className="text-gray-600 text-xs leading-relaxed mb-3">{l.deskripsi}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-3">
                    <div>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Layanan</p>
                      <ul className="space-y-1">
                        {l.layananDetail.map((d, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-xs text-gray-700">
                            <span className="w-1 h-1 rounded-full bg-[#F5A623] flex-shrink-0" aria-hidden="true" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-xs text-gray-500">
                        <Clock size={12} className="flex-shrink-0 mt-0.5 text-[#1E3A5F]" aria-hidden="true" />
                        {l.jam}
                      </div>
                      <div className="flex items-start gap-2 text-xs text-gray-500">
                        <MapPin size={12} className="flex-shrink-0 mt-0.5 text-[#1E3A5F]" aria-hidden="true" />
                        {l.lokasi}
                      </div>
                      {l.kontak.map((k, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                          {k.type === 'tel' ? (
                            <><Phone size={12} className="flex-shrink-0 text-[#1E3A5F]" aria-hidden="true" />
                            <a href={`tel:${k.value.replace(/\D/g, '')}`} className="hover:text-[#1E3A5F] transition-colors">{k.value}</a></>
                          ) : k.type === 'email' ? (
                            <><Mail size={12} className="flex-shrink-0 text-[#1E3A5F]" aria-hidden="true" />
                            <a href={`mailto:${k.value}`} className="hover:text-[#1E3A5F] transition-colors">{k.value}</a></>
                          ) : (
                            <><MessageSquare size={12} className="flex-shrink-0 text-[#1E3A5F]" aria-hidden="true" />
                            <span>WhatsApp: {k.value}</span></>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
