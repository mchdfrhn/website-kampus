const defaultDirections = [
  {
    emoji: '🚌',
    heading: 'TransJakarta',
    steps: [
      'Naik Koridor 1 atau Koridor 5 menuju pusat kota.',
      'Turun di halte Cawang UKI atau Manggarai.',
      'Lanjut naik feeder arah Tebet / Pasar Rumput.',
      'Jalan kaki sekitar 5 menit menuju Jl. Pelajar Pejuang 45 No. 1.',
    ],
  },
  {
    emoji: '🚇',
    heading: 'MRT Jakarta',
    steps: [
      'Naik MRT Jalur Utara-Selatan dari Bundaran HI atau Lebak Bulus.',
      'Turun di stasiun Dukuh Atas.',
      'Sambung dengan TransJakarta Koridor 4 arah Manggarai.',
      'Turun di Manggarai, lalu lanjut ojek online sekitar 3 menit ke kampus.',
    ],
  },
  {
    emoji: '🚗',
    heading: 'Kendaraan Pribadi',
    steps: [
      'Dari Tol Dalam Kota, keluar di exit Tebet.',
      'Menuju Jl. MT. Haryono, lalu lurus melewati Cawang.',
      'Belok kiri ke Jl. Pelajar Pejuang 45 setelah lampu merah RS Tebet.',
      'Kampus STTPU berada di No. 1, dengan area parkir tersedia di dalam kampus.',
    ],
  },
];

type DirectionItem = {
  emoji: string
  heading: string
  steps: string[]
}

export default function DirectionsSection({ directions = defaultDirections.map((item) => ({
  emoji: item.emoji,
  heading: item.heading,
  steps: item.steps,
})) }: { directions?: DirectionItem[] }) {
  return (
    <section className="bg-gray-50 py-14 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-brand-navy font-extrabold text-2xl">Petunjuk Arah</h2>
          <div className="w-12 h-1 bg-brand-gold rounded mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {directions.map((dir) => (
            <div key={dir.heading} className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-brand-navy text-sm mb-4 flex items-center gap-2">
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
