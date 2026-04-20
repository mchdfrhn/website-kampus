import { MessageCircle } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';

type UnitItem = {
  unit: string
  kepala?: string
  telepon?: string
  telHref?: string
  email?: string
  tugas?: string
}

const defaults: UnitItem[] = [
  { unit: 'Bagian Akademik', kepala: 'Dra. Sri Mulyani, M.Pd.', telepon: '(021) 555-1236', telHref: '+62215551236', email: 'akademik@sttpu.ac.id', tugas: 'KRS, jadwal kuliah, nilai, kalender akademik, surat keterangan aktif' },
  { unit: 'Bagian Keuangan', kepala: 'Ir. Hadi Santoso, M.M.', telepon: '(021) 555-1237', telHref: '+62215551237', email: 'keuangan@sttpu.ac.id', tugas: 'Pembayaran SPP, tagihan, cicilan, konfirmasi pembayaran' },
  { unit: 'PMB', kepala: 'Dr. Anisa Putri, M.T.', telepon: '(021) 555-1235', telHref: '+62215551235', email: 'pmb@sttpu.ac.id', tugas: 'Pendaftaran baru, jalur masuk, persyaratan, biaya, jadwal seleksi' },
  { unit: 'Bagian Kemahasiswaan', kepala: 'Bapak Ridwan Arifin, S.Sos.', telepon: '(021) 555-1238', telHref: '+62215551238', email: 'kemahasiswaan@sttpu.ac.id', tugas: 'Beasiswa, organisasi mahasiswa, kegiatan ekstrakurikuler, magang' },
  { unit: 'Unit Teknologi Informasi', kepala: 'Edi Purnomo, S.Kom., M.T.', telepon: '(021) 555-1239', telHref: '+62215551239', email: 'it@sttpu.ac.id', tugas: 'Akun SIAKAD/LMS, reset password, gangguan sistem, jaringan internet' },
  { unit: 'LPPM', kepala: 'Prof. Dr. Bambang Wibowo', telepon: '(021) 555-1240', telHref: '+62215551240', email: 'lppm@sttpu.ac.id', tugas: 'Proposal riset, hibah penelitian, PKM, kerjasama industri, jurnal' },
  { unit: 'Humas & Marketing', kepala: 'Ibu Dewi Kartika, S.Sos., M.M.', telepon: '(021) 555-1241', telHref: '+62215551241', email: 'humas@sttpu.ac.id', tugas: 'Media, publikasi, kerjasama media, event, dokumentasi kegiatan' },
]

export default async function DirectorySection() {
  let units = defaults

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'unit-kontak',
      sort: 'urutan',
      limit: 50,
    })
    if (result.docs.length > 0) {
      units = result.docs as unknown as UnitItem[]
    }
  } catch {
    // DB unavailable — use defaults
  }

  return (
    <section className="bg-white py-14 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-[#1E3A5F] font-extrabold text-2xl">Direktori Unit & Kontak</h2>
          <div className="w-12 h-1 bg-[#F5A623] rounded mt-3" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#1E3A5F] text-white">
                <th className="px-4 py-3 text-left text-xs font-semibold">Unit / Bagian</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Kepala Unit</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Telepon</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Tugas Pokok</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              {units.map((row, index) => (
                <tr
                  key={row.unit}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
                >
                  <td className="px-4 py-3 font-semibold text-[#1E3A5F] align-top whitespace-nowrap">{row.unit}</td>
                  <td className="px-4 py-3 align-top whitespace-nowrap">
                    <span className="text-gray-700">{row.kepala}</span>
                  </td>
                  <td className="px-4 py-3 align-top whitespace-nowrap">
                    {row.telHref ? (
                      <a href={`tel:${row.telHref}`} className="text-gray-700 hover:text-[#1E3A5F] transition-colors">{row.telepon}</a>
                    ) : (
                      <span className="text-gray-700">{row.telepon}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top whitespace-nowrap">
                    {row.email ? (
                      <a href={`mailto:${row.email}`} className="text-gray-700 hover:text-[#1E3A5F] transition-colors">{row.email}</a>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-gray-600 align-top">{row.tugas}</td>
                  <td className="px-4 py-3 align-top">
                    {row.telHref && (
                      <a
                        href={`https://wa.me/${row.telHref.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full hover:bg-green-200 transition-colors"
                      >
                        <MessageCircle size={12} />
                        Chat
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
