const directions = [
  {
    emoji: '🚌',
    heading: 'TransJakarta',
    steps: [
      <>
        Naik <strong className="text-gray-800">Koridor 1</strong> atau{' '}
        <strong className="text-gray-800">Koridor 5</strong> menuju pusat kota
      </>,
      <>
        Turun di halte <strong className="text-gray-800">Cawang UKI</strong> atau{' '}
        <strong className="text-gray-800">Manggarai</strong>
      </>,
      <>
        Lanjut naik <strong className="text-gray-800">feeder</strong> arah Tebet / Pasar Rumput
      </>,
      <>
        Jalan kaki ±<strong className="text-gray-800">5 menit</strong> menuju Jl. Pelajar Pejuang
        45 No. 1
      </>,
    ],
  },
  {
    emoji: '🚇',
    heading: 'MRT Jakarta',
    steps: [
      <>
        Naik <strong className="text-gray-800">MRT Jalur Utara–Selatan</strong> dari Bundaran HI
        atau Lebak Bulus
      </>,
      <>
        Turun di stasiun <strong className="text-gray-800">Dukuh Atas</strong>
      </>,
      <>
        Sambung dengan <strong className="text-gray-800">TransJakarta Koridor 4</strong> arah
        Manggarai
      </>,
      <>
        Turun di <strong className="text-gray-800">Manggarai</strong>, lanjut ojek online ±3 menit
        ke kampus
      </>,
    ],
  },
  {
    emoji: '🚗',
    heading: 'Kendaraan Pribadi',
    steps: [
      <>
        Dari <strong className="text-gray-800">Tol Dalam Kota</strong>, keluar di exit{' '}
        <strong className="text-gray-800">Tebet</strong>
      </>,
      <>
        Menuju <strong className="text-gray-800">Jl. MT. Haryono</strong>, lurus melewati
        Cawang
      </>,
      <>
        Belok kiri ke <strong className="text-gray-800">Jl. Pelajar Pejuang 45</strong> setelah
        lampu merah RS Tebet
      </>,
      <>
        Kampus STTPU berada di <strong className="text-gray-800">No. 1</strong>, parkir tersedia
        di dalam area kampus
      </>,
    ],
  },
];

export default function DirectionsSection() {
  return (
    <section className="bg-gray-50 py-14 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-[#1E3A5F] font-extrabold text-2xl">Petunjuk Arah</h2>
          <div className="w-12 h-1 bg-[#F5A623] rounded mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {directions.map((dir) => (
            <div key={dir.heading} className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-[#1E3A5F] text-sm mb-4 flex items-center gap-2">
                <span>{dir.emoji}</span>
                {dir.heading}
              </h3>
              <ol className="list-decimal pl-5 space-y-2 text-gray-600 text-sm leading-relaxed">
                {dir.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
