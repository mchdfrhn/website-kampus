const stats = [
  { number: '2.400+', label: 'Mahasiswa Aktif' },
  { number: '6', label: 'Program Studi' },
  { number: '1987', label: 'Tahun Berdiri' },
  { number: 'B', label: 'Akreditasi BAN-PT' },
];

export default function StatsBar() {
  return (
    <div className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center py-8 px-4">
              <span className="text-[#1E3A5F] text-4xl font-black">{stat.number}</span>
              <span className="text-gray-500 text-sm mt-1 text-center">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
