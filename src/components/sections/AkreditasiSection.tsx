const lembaga = [
  { nama: 'BAN-PT', status: 'Akreditasi B' },
  { nama: 'Kemendikbudristek', status: 'Terdaftar Resmi' },
  { nama: 'LLDIKTI Wilayah III', status: 'Aktif & Terdaftar' },
  { nama: 'PDDikti', status: 'Data Terverifikasi' },
  { nama: 'ISO 9001:2015', status: 'Manajemen Mutu' },
];

export default function AkreditasiSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[#1E3A5F] font-extrabold text-3xl">Akreditasi &amp; Legalitas</h2>
          <div className="w-12 h-1 bg-[#F5A623] rounded mx-auto mt-3" />
          <p className="text-gray-500 mt-4 text-base">
            STTPU diakui dan terdaftar resmi oleh seluruh lembaga akreditasi yang berwenang.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-5">
          {lembaga.map((item) => (
            <div
              key={item.nama}
              className="border border-gray-200 rounded-lg p-6 text-center w-44 hover:shadow-md transition-shadow"
            >
              <div className="w-20 h-12 bg-gray-200 mx-auto mb-3 rounded flex items-center justify-center">
                <span className="text-gray-400 text-xs italic">Logo</span>
              </div>
              <p className="text-[#1E3A5F] font-bold text-sm mb-1">{item.nama}</p>
              <p className="text-green-600 font-semibold text-sm">{item.status}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
