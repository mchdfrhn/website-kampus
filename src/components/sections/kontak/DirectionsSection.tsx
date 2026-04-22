import * as LucideIcons from 'lucide-react';

const defaultDirections = [
  {
    icon: 'Bus',
    heading: 'TransJakarta',
    steps: [
      'Naik Koridor 1 atau Koridor 5 menuju pusat kota.',
      'Turun di halte Cawang UKI atau Manggarai.',
      'Lanjut naik feeder arah Tebet / Pasar Rumput.',
      'Jalan kaki sekitar 5 menit menuju Jl. Pelajar Pejuang 45 No. 1.',
    ],
  },
  {
    icon: 'Train',
    heading: 'MRT Jakarta',
    steps: [
      'Naik MRT Jalur Utara-Selatan dari Bundaran HI atau Lebak Bulus.',
      'Turun di stasiun Dukuh Atas.',
      'Sambung dengan TransJakarta Koridor 4 arah Manggarai.',
      'Turun di Manggarai, lalu lanjut ojek online sekitar 3 menit ke kampus.',
    ],
  },
  {
    icon: 'Car',
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
  icon: string
  emoji?: string // Fallback for legacy data
  heading: string
  steps: string[]
}

export default function DirectionsSection({ directions }: { directions?: DirectionItem[] }) {
  const items = directions && directions.length > 0 ? directions : defaultDirections;

  return (
    <section className="bg-gray-50 py-14 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-brand-navy font-extrabold text-2xl tracking-tight">Petunjuk Arah</h2>
          <div className="w-12 h-1 bg-brand-gold rounded mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((dir) => {
            // Resolve Lucide icon
            const iconName = dir.icon || 'MapPin';
            const Icon = (LucideIcons as any)[iconName] || LucideIcons.MapPin;
            
            return (
              <div key={dir.heading} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-brand-navy/5 rounded-xl flex items-center justify-center mb-6">
                  {dir.emoji ? (
                    <span className="text-2xl">{dir.emoji}</span>
                  ) : (
                    <Icon size={24} className="text-brand-navy" strokeWidth={1.5} />
                  )}
                </div>
                <h3 className="font-bold text-brand-navy text-lg mb-4 tracking-tight">
                  {dir.heading}
                </h3>
                <ol className="list-decimal pl-5 space-y-3 text-gray-600 text-sm leading-relaxed font-medium">
                  {dir.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
