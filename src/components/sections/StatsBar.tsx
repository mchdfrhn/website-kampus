
import { Reveal } from '@/components/ui/motion/Reveal';

const defaultStats = [
  { angka: '2.400+', label: 'Mahasiswa Aktif' },
  { angka: '6', label: 'Program Studi' },
  { angka: '1987', label: 'Tahun Berdiri' },
  { angka: 'B', label: 'Akreditasi BAN-PT' },
];

export default function StatsBar({ items }: { items?: { angka: string; label: string }[] }) {
  const stats = items && items.length > 0 ? items : defaultStats

  return (
    <div className="relative z-20 -mt-10 lg:-mt-12 max-w-7xl mx-auto px-6 lg:px-8">
      <Reveal width="100%" yOffset={20}>
        <div className="bg-white rounded-2xl shadow-premium border border-brand-navy/5 overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-brand-navy/5">
            {stats.map((stat) => (
              <div 
                key={stat.label} 
                className="flex flex-col items-center py-8 lg:py-9 px-5 lg:px-6 group hover:bg-brand-navy/[0.02] active:scale-[0.98] transition-all duration-500 cursor-default"
              >
                <div className="relative">
                  <span className="text-brand-navy text-[1.75rem] lg:text-4xl font-bold tracking-tighter group-hover:text-brand-gold transition-colors duration-500">
                    {stat.angka}
                  </span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold group-hover:w-full transition-all duration-500" />
                </div>
                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.15em] mt-2 text-center group-hover:text-brand-navy transition-colors duration-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
