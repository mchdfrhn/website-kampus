import { cn } from '@/lib/utils';

type BlueAbstractBackgroundProps = {
  className?: string
  accentClassName?: string
}

export default function BlueAbstractBackground({
  className,
  accentClassName,
}: BlueAbstractBackgroundProps) {
  return (
    <div className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)} aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(252,182,3,0.12),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.08),transparent_20%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_44%)]" />
      <div className="absolute inset-y-0 right-0 w-[45%] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
      <div className={cn('absolute -top-20 right-[10%] h-64 w-64 rounded-[36%] border border-white/8 bg-white/[0.025] rotate-12', accentClassName)} />
      <div className="absolute top-20 right-[16%] h-48 w-48 rounded-[42%] border border-brand-gold/15 bg-brand-gold/[0.04] -rotate-12 blur-[1px]" />
      <div className="absolute left-[8%] top-20 h-40 w-40 rounded-full border border-white/8 bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_68%)]" />
      <div className="absolute left-[14%] bottom-14 h-36 w-36 rounded-[30%] border border-white/8 bg-white/[0.025] rotate-6" />
      <div className="absolute inset-y-12 left-[52%] hidden lg:block w-px bg-gradient-to-b from-transparent via-white/12 to-transparent" />
      <div className="absolute inset-x-0 top-[24%] hidden lg:block h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <svg className="absolute inset-0 h-full w-full opacity-[0.14]" viewBox="0 0 1600 900" preserveAspectRatio="none">
        <path d="M1040 40C1170 120 1215 282 1328 350C1418 404 1517 396 1600 360V0H1045C1012 0 1008 18 1040 40Z" fill="url(#blueAbstractGlowA)" />
        <path d="M0 672C124 620 210 708 336 690C470 670 530 548 656 516C778 486 882 540 948 626C1020 720 1122 760 1236 742C1368 722 1480 626 1600 592V900H0V672Z" fill="url(#blueAbstractGlowB)" />
        <path d="M680 102C820 182 846 348 952 410C1032 456 1126 438 1204 388" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" strokeDasharray="10 12" />
        <path d="M38 222C158 170 246 192 320 276C384 348 448 404 562 386" stroke="rgba(252,182,3,0.28)" strokeWidth="2" fill="none" strokeDasharray="14 16" />
        <defs>
          <linearGradient id="blueAbstractGlowA" x1="1020" x2="1540" y1="50" y2="420" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(255,255,255,0.16)" />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient id="blueAbstractGlowB" x1="180" x2="1260" y1="760" y2="430" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(252,182,3,0.12)" />
            <stop offset="0.5" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
