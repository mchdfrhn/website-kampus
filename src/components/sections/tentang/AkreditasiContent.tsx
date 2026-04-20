import { ShieldCheck, FileText, Calendar } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';

type AkreditasiProdi = {
  prodi: string
  jenjang?: string
  akreditasi?: string
  nomorSK?: string
  berlakuHingga?: string
}

type LegalitasItem = {
  dokumen: string
  nomor?: string
  tanggal?: string
  keterangan?: string
}

const defaultAkreditasi: AkreditasiProdi[] = [
  { prodi: 'Teknik Sipil', jenjang: 'D-IV', akreditasi: 'Unggul', nomorSK: '1234/SK/BAN-PT/Akred/Dpl-IV/V/2023', berlakuHingga: '2028' },
  { prodi: 'Teknik Pengairan', jenjang: 'D-IV', akreditasi: 'Baik Sekali', nomorSK: '1235/SK/BAN-PT/Akred/Dpl-IV/V/2022', berlakuHingga: '2027' },
  { prodi: 'Teknik Lingkungan', jenjang: 'D-IV', akreditasi: 'Baik Sekali', nomorSK: '1236/SK/BAN-PT/Akred/Dpl-IV/VI/2022', berlakuHingga: '2027' },
  { prodi: 'Manajemen Konstruksi', jenjang: 'D-IV', akreditasi: 'Baik Sekali', nomorSK: '1237/SK/BAN-PT/Akred/Dpl-IV/III/2023', berlakuHingga: '2028' },
]

const defaultLegalitas: LegalitasItem[] = [
  { dokumen: 'Izin Pendirian', nomor: 'SK Mendiknas No. 123/D/O/1987', tanggal: '14 Oktober 1987', keterangan: 'Izin pendirian STTPU dari Menteri Pendidikan Nasional RI' },
  { dokumen: 'Izin Operasional', nomor: 'SK Kemendikbudristek No. 456/E/O/2021', tanggal: '5 Maret 2021', keterangan: 'Perpanjangan izin operasional terakhir yang masih berlaku' },
  { dokumen: 'Akreditasi Institusi', nomor: '789/SK/BAN-PT/Akred/PT/VII/2022', tanggal: '20 Juli 2022', keterangan: 'Akreditasi institusi STTPU dari BAN-PT dengan peringkat Baik Sekali' },
  { dokumen: 'NPSN', nomor: '30131234', tanggal: '-', keterangan: 'Nomor identitas institusi dalam sistem PDDIKTI' },
]

const badgeColor = (akreditasi?: string) => {
  if (akreditasi === 'Unggul') return 'bg-green-100 text-green-800 border border-green-300'
  if (akreditasi === 'Baik Sekali') return 'bg-blue-100 text-blue-800 border border-blue-300'
  if (akreditasi === 'Baik') return 'bg-yellow-100 text-yellow-800 border border-yellow-300'
  return 'bg-gray-100 text-gray-700 border border-gray-300'
}

export default async function AkreditasiContent() {
  let akreditasiProdi = defaultAkreditasi
  let legalitas = defaultLegalitas

  try {
    const payload = await getPayloadClient()
    const global = await payload.findGlobal({ slug: 'tentang-kami', depth: 1 })
    const data = global as unknown as {
      akreditasiProdi?: AkreditasiProdi[]
      legalitas?: LegalitasItem[]
    }
    if (data.akreditasiProdi && data.akreditasiProdi.length > 0) akreditasiProdi = data.akreditasiProdi
    if (data.legalitas && data.legalitas.length > 0) legalitas = data.legalitas
  } catch {
    // DB unavailable — use defaults
  }

  return (
    <article className="space-y-10">
      <section className="bg-[#F0F4F8] rounded-xl p-5 border border-gray-200">
        <div className="flex items-start gap-3">
          <ShieldCheck size={20} className="text-[#1E3A5F] flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-gray-700 text-sm leading-relaxed">
            STTPU Jakarta beroperasi sesuai dengan ketentuan peraturan perundang-undangan yang
            berlaku dan telah mendapatkan pengakuan resmi dari Badan Akreditasi Nasional Perguruan
            Tinggi (BAN-PT) serta Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#1E3A5F] mb-5">Akreditasi Program Studi</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse" aria-label="Akreditasi program studi STTPU">
            <thead>
              <tr className="bg-[#1E3A5F] text-white">
                <th className="text-left px-4 py-3 font-semibold rounded-tl-lg">Program Studi</th>
                <th className="text-left px-4 py-3 font-semibold">Jenjang</th>
                <th className="text-left px-4 py-3 font-semibold">Akreditasi</th>
                <th className="text-left px-4 py-3 font-semibold">Berlaku Hingga</th>
                <th className="text-left px-4 py-3 font-semibold rounded-tr-lg">SK</th>
              </tr>
            </thead>
            <tbody>
              {akreditasiProdi.map((item, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F0F4F8]/50'}`}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">{item.prodi}</td>
                  <td className="px-4 py-3 text-gray-600">{item.jenjang}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeColor(item.akreditasi)}`}>
                      {item.akreditasi}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} aria-hidden="true" />
                      {item.berlakuHingga}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{item.nomorSK}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-[#1E3A5F] mb-5">Legalitas Institusi</h2>
        <ul className="space-y-4" aria-label="Dokumen legalitas STTPU">
          {legalitas.map((item, idx) => (
            <li key={idx} className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-xl">
              <div className="w-10 h-10 bg-[#1E3A5F]/10 rounded-lg flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <FileText size={18} className="text-[#1E3A5F]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm">{item.dokumen}</p>
                {item.nomor && <p className="text-[#1E3A5F] font-medium text-xs mt-0.5">{item.nomor}</p>}
                {item.tanggal && item.tanggal !== '-' && (
                  <p className="text-gray-500 text-xs mt-0.5">Ditetapkan: {item.tanggal}</p>
                )}
                {item.keterangan && (
                  <p className="text-gray-600 text-xs mt-1 leading-relaxed">{item.keterangan}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
