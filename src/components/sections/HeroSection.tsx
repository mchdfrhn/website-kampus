"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '@/components/ui/motion/Reveal';

type HeroData = {
  heroBadge?: string | null
  heroJudul?: string | null
  heroSubjudul?: string | null
  heroCta1Teks?: string | null
  heroCta1Href?: string | null
  heroCta2Teks?: string | null
  heroCta2Href?: string | null
  heroFoto?: { url: string } | string | null
}

export default function HeroSection({ data }: { data?: HeroData }) {
  const badge = data?.heroBadge || ''
  const judul = data?.heroJudul || ''
  const subjudul = data?.heroSubjudul || ''
  const cta1Teks = data?.heroCta1Teks || ''
  const cta1Href = data?.heroCta1Href || '#'
  const cta2Teks = data?.heroCta2Teks || ''
  const cta2Href = data?.heroCta2Href || '#'

  let fotoUrl: string | null = null
  if (data?.heroFoto && typeof data.heroFoto === 'object' && 'url' in data.heroFoto) {
    fotoUrl = (data.heroFoto as { url: string }).url
  }

  return (
    <section className="-mt-20 pt-20 bg-brand-navy min-h-[calc(72vh+5rem)] lg:min-h-[calc(78vh+5rem)] flex items-center relative overflow-hidden">
      {/* Premium Decorative Layers - Engineered Motion */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(252,182,3,0.12),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(255,255,255,0.08),transparent_20%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_42%)] pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-[46%] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))] pointer-events-none" />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-0 right-0 w-1/2 h-full bg-white/[0.02] blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none animate-pulse-slow" 
      />
      <div className="absolute -top-24 right-[12%] h-72 w-72 rounded-[36%] border border-white/8 bg-white/[0.025] rotate-12 pointer-events-none" />
      <div className="absolute top-24 right-[18%] h-56 w-56 rounded-[42%] border border-brand-gold/15 bg-brand-gold/[0.04] -rotate-12 blur-[1px] pointer-events-none" />
      <div className="absolute left-[8%] top-28 h-44 w-44 rounded-full border border-white/8 bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_68%)] pointer-events-none" />
      <div className="absolute left-[14%] bottom-20 h-40 w-40 rounded-[30%] border border-white/8 bg-white/[0.025] rotate-6 pointer-events-none" />
      <div className="absolute inset-y-16 left-[52%] hidden lg:block w-px bg-gradient-to-b from-transparent via-white/12 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-[22%] hidden lg:block h-px bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.14] pointer-events-none"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M1040 40C1170 120 1215 282 1328 350C1418 404 1517 396 1600 360V0H1045C1012 0 1008 18 1040 40Z" fill="url(#heroGlowA)" />
        <path d="M0 672C124 620 210 708 336 690C470 670 530 548 656 516C778 486 882 540 948 626C1020 720 1122 760 1236 742C1368 722 1480 626 1600 592V900H0V672Z" fill="url(#heroGlowB)" />
        <path d="M680 102C820 182 846 348 952 410C1032 456 1126 438 1204 388" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" strokeDasharray="10 12" />
        <path d="M38 222C158 170 246 192 320 276C384 348 448 404 562 386" stroke="rgba(252,182,3,0.28)" strokeWidth="2" fill="none" strokeDasharray="14 16" />
        <defs>
          <linearGradient id="heroGlowA" x1="1020" x2="1540" y1="50" y2="420" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(255,255,255,0.16)" />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient id="heroGlowB" x1="180" x2="1260" y1="760" y2="430" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(252,182,3,0.12)" />
            <stop offset="0.5" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute -bottom-48 -left-48 w-[40rem] h-[40rem] bg-brand-gold/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-32 h-32 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
        <StaggerContainer className="flex-1 max-w-[700px] text-center lg:text-left">
          <StaggerItem>
            <div className="inline-flex items-center gap-3 bg-white/[0.03] backdrop-blur-md border border-white/10 px-5 py-2 rounded-full mb-6 lg:mb-8 shadow-2xl">
              <div className="w-2 h-2 bg-brand-gold rounded-full animate-ping" />
              {badge ? (
                <span className="text-white/80 font-bold text-[10px] uppercase tracking-wider">
                  {badge}
                </span>
              ) : null}
            </div>
          </StaggerItem>
          
          <StaggerItem>
            <h1 className="text-white text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] mb-6 lg:mb-8 tracking-tight">
              {judul.split(' ').map((word, i) => (
                <span key={i} className={word.toLowerCase() === 'indonesia' ? 'text-brand-gold' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
          </StaggerItem>
          
          <StaggerItem>
            <p className="text-white/60 text-base md:text-lg lg:text-[1.05rem] leading-relaxed mb-8 lg:mb-10 max-w-2xl mx-auto lg:mx-0 font-medium">
              {subjudul}
            </p>
          </StaggerItem>
          
          <StaggerItem>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {cta1Teks ? (
                <Link
                  href={cta1Href}
                  className="group relative bg-brand-gold text-brand-navy font-bold text-[11px] uppercase tracking-wider px-8 py-4 rounded-xl shadow-xl shadow-brand-gold/10 hover:shadow-brand-gold/30 hover:-translate-y-1 active:scale-95 transition-all duration-500 overflow-hidden"
                >
                  <span className="relative z-10">{cta1Teks}</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </Link>
              ) : null}
              {cta2Teks ? (
                <Link
                  href={cta2Href}
                  className="group border border-white/20 text-white font-bold text-[11px] uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-white hover:text-brand-navy active:scale-95 transition-all duration-500 backdrop-blur-sm"
                >
                  {cta2Teks}
                </Link>
              ) : null}
            </div>
          </StaggerItem>
        </StaggerContainer>
        
	        <motion.div 
	          initial={{ opacity: 0, x: 40 }}
	          animate={{ opacity: 1, x: 0 }}
	          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
	          className="flex-1 w-full max-w-lg xl:max-w-xl lg:ml-auto lg:self-stretch"
        >
          <div className="relative aspect-[5/6] lg:aspect-auto h-full min-h-[360px] lg:min-h-[460px] lg:max-h-[520px] group">
            {/* Artistic Frame - Precise Lines */}
            <div className="absolute -inset-4 border border-brand-gold/10 rounded-2xl -rotate-2 group-hover:rotate-0 transition-all duration-700 ease-in-out" />
            <div className="absolute -inset-4 border border-white/5 rounded-2xl rotate-1 group-hover:rotate-0 transition-all duration-700 ease-in-out" />
            
	            <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.3)] border border-white/10 bg-brand-navy/50 backdrop-blur-2xl">
	              {fotoUrl ? (
                  <motion.div
                    initial={{ scale: 1.08, y: 18, rotate: -1.5 }}
                    animate={{ scale: 1, y: [0, -10, 0], rotate: [0, -1, 0] }}
                    transition={{
                      scale: { duration: 1.4, delay: 0.55, ease: [0.16, 1, 0.3, 1] },
                      y: { duration: 7.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
                      rotate: { duration: 8.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
                    }}
                    className="absolute inset-0"
                  >
                    <Image 
                      src={fotoUrl} 
                      alt="Kampus STTPU" 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                      priority 
                    />
                  </motion.div>
	              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-24 h-24 mb-6 rounded-full bg-white/[0.03] flex items-center justify-center border border-white/10">
                    <svg className="w-10 h-10 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <p className="text-white/10 text-[10px] font-bold uppercase tracking-wider">Institutional Vision</p>
                </div>
              )}
              {/* Complex Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-6 rounded-2xl group-hover:bg-white/[0.08] transition-colors duration-500">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-1 bg-brand-gold rounded-full group-hover:w-16 transition-all duration-500" />
                    <p className="text-white/80 text-[10px] font-bold uppercase tracking-wider leading-none">Infrastruktur Masa Depan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
