const strukturData = {
  pimpinan: [
    { jabatan: 'Ketua STTPU', nama: 'Prof. Dr. Ir. Bambang Setiawan, M.T.' },
    { jabatan: 'Wakil Ketua I — Akademik', nama: 'Dr. Ir. Siti Rahayu, M.Sc.' },
    { jabatan: 'Wakil Ketua II — Administrasi & Keuangan', nama: 'Drs. Hendra Wijaya, M.M.' },
    { jabatan: 'Wakil Ketua III — Kemahasiswaan & Alumni', nama: 'Dr. Ahmad Fauzi, S.T., M.T.' },
  ],
  senat: { jabatan: 'Ketua Senat Akademik', nama: 'Prof. Dr. Ir. Mulyadi Santoso, M.T.' },
  unitFungsional: [
    { unit: 'LPPM (Lembaga Penelitian & Pengabdian Masyarakat)', kepala: 'Dr. Rina Kusumawati, S.T., M.T.' },
    { unit: 'LPPMP (Lembaga Penjaminan Mutu)', kepala: 'Dr. Budi Hartono, S.T., M.T.' },
    { unit: 'UPT Perpustakaan', kepala: 'Dra. Endang Susanti, M.I.Kom.' },
    { unit: 'UPT Teknologi Informasi', kepala: 'Ir. Yusuf Hidayat, M.Kom.' },
    { unit: 'UPT Laboratorium Terpadu', kepala: 'Dr. Wahyu Prakoso, S.T., M.T.' },
    { unit: 'UPT Career Center & Alumni', kepala: 'Drs. Agus Supriyanto, M.M.' },
  ],
  programStudi: [
    { prodi: 'Teknik Sipil (D-IV)', kaprodi: 'Dr. Ir. Dian Purnama, M.T.' },
    { prodi: 'Teknik Pengairan (D-IV)', kaprodi: 'Dr. Surya Darma, S.T., M.T.' },
    { prodi: 'Teknik Lingkungan (D-IV)', kaprodi: 'Dr. Maya Indrawati, S.T., M.Si.' },
    { prodi: 'Manajemen Konstruksi (D-IV)', kaprodi: 'Dr. Irwan Susanto, S.T., M.M.' },
  ],
  bagian: [
    { bagian: 'Bagian Akademik & Kemahasiswaan', kepala: 'Dra. Sri Wahyuni, M.Pd.' },
    { bagian: 'Bagian Kepegawaian & Keuangan', kepala: 'Drs. Tono Wibowo, M.M.' },
    { bagian: 'Bagian Umum & Perlengkapan', kepala: 'Ir. Joko Santoso' },
    { bagian: 'Bagian Humas & Pemasaran', kepala: 'Anggraeni Putri, S.Sos., M.I.Kom.' },
  ],
};

export default function StrukturOrganisasiContent() {
  return (
    <article className="space-y-8">
      <section>
        <div className="bg-[#1E3A5F] rounded-xl p-5 text-center text-white mb-6">
          <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Pimpinan Tertinggi</p>
          <p className="font-bold text-lg">{strukturData.pimpinan[0].jabatan}</p>
          <p className="text-[#F5A623] font-medium text-sm mt-0.5">{strukturData.pimpinan[0].nama}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {strukturData.pimpinan.slice(1).map((item, idx) => (
            <div
              key={idx}
              className="border-2 border-[#1E3A5F] rounded-xl p-4 text-center bg-white"
            >
              <p className="text-[#1E3A5F] font-semibold text-xs uppercase tracking-wide mb-2">
                {item.jabatan}
              </p>
              <p className="text-gray-800 text-sm font-medium leading-snug">{item.nama}</p>
            </div>
          ))}
          <div className="border border-dashed border-gray-400 rounded-xl p-4 text-center bg-[#F0F4F8]">
            <p className="text-gray-600 font-semibold text-xs uppercase tracking-wide mb-2">
              {strukturData.senat.jabatan}
            </p>
            <p className="text-gray-700 text-sm font-medium leading-snug">{strukturData.senat.nama}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-[#1E3A5F] mb-4">Program Studi</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {strukturData.programStudi.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl"
            >
              <div
                className="w-8 h-8 bg-[#F5A623]/15 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-[#1E3A5F] text-xs"
                aria-hidden="true"
              >
                {idx + 1}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{item.prodi}</p>
                <p className="text-gray-500 text-xs mt-0.5">Kaprodi: {item.kaprodi}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold text-[#1E3A5F] mb-4">Unit Pelaksana Teknis (UPT)</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {strukturData.unitFungsional.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 p-4 bg-[#F0F4F8] border border-gray-200 rounded-xl"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#F5A623] flex-shrink-0 mt-2"
                aria-hidden="true"
              />
              <div>
                <p className="font-medium text-gray-900 text-sm">{item.unit}</p>
                <p className="text-gray-500 text-xs mt-0.5">Kepala: {item.kepala}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold text-[#1E3A5F] mb-4">Bagian Administrasi</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {strukturData.bagian.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F] flex-shrink-0 mt-2"
                aria-hidden="true"
              />
              <div>
                <p className="font-medium text-gray-900 text-sm">{item.bagian}</p>
                <p className="text-gray-500 text-xs mt-0.5">Kepala: {item.kepala}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-gray-500 text-xs border-t border-gray-200 pt-4">
        Struktur organisasi terakhir diperbarui: April 2026. Untuk versi lengkap dalam format PDF,{' '}
        <button className="text-[#1E3A5F] underline hover:text-[#F5A623] transition-colors">
          unduh di sini
        </button>
        .
      </p>
    </article>
  );
}
