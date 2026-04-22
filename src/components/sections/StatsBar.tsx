import { Reveal } from '@/components/ui/motion/Reveal';

export default function StatsBar({ items }: { items?: { angka: string; label: string }[] }) {
  const stats = items && items.length > 0 ? items : []

  if (stats.length === 0) return null

  return (
    <div className="relative z-20 -mt-10 lg:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal width="100%" yOffset={20}>
        <div className="bg-white rounded-2xl shadow-premium border border-brand-navy/5 overflow-hidden">
          <div className="grid grid-cols-4 lg:grid-cols-4 divide-x divide-brand-navy/5">
            {stats.map((stat) => (
              <div 
                key={stat.label} 
                className="flex flex-col items-center py-5 sm:py-8 lg:py-9 px-2 sm:px-5 lg:px-6 group hover:bg-brand-navy/[0.02] active:scale-[0.98] transition-all duration-500 cursor-default"
              >
                <div className="relative">
                  <span className="text-brand-navy text-lg sm:text-[1.75rem] lg:text-4xl font-bold tracking-tighter group-hover:text-brand-gold transition-colors duration-500">
                    {stat.angka}
                  </span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold group-hover:w-full transition-all duration-500" />
                </div>
                <span className="text-gray-500 text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.15em] mt-1.5 sm:mt-2 text-center leading-tight group-hover:text-brand-navy transition-colors duration-500">
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
