"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/ui/motion/Reveal';
import { usePathname } from 'next/navigation';
import ImageWithLoading from '@/components/ui/media/ImageWithLoading';

type Slide = {
  badge?: string | null;
  judul?: string | null;
  subjudul?: string | null;
  cta1Teks?: string | null;
  cta1Href?: string | null;
  cta2Teks?: string | null;
  cta2Href?: string | null;
  background?: { url: string } | string | null;
};

type HeroData = {
  heroSlides?: Slide[] | null;
};

function isExternalHref(href?: string | null) {
  if (!href) return false;
  return /^(https?:)?\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');
}

function getBackgroundUrl(background?: Slide['background']) {
  if (!background) return null;
  if (typeof background === 'string') return background;
  if (typeof background === 'object' && typeof background.url === 'string') return background.url;
  return null;
}

export default function HeroSection({ data }: { data?: HeroData }) {
  const slides = data?.heroSlides || [];
  const pathname = usePathname();
  const hasMultipleSlides = slides.length > 1;
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: hasMultipleSlides,
    duration: 30,
    align: 'start',
    skipSnaps: false,
    watchResize: true,
  });
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  // Re-init embla when navigating back to home or resizing
  useEffect(() => {
    if (emblaApi) {
      const timers = [
        window.setTimeout(() => emblaApi.reInit(), 50),
        window.setTimeout(() => emblaApi.reInit(), 300),
      ];

      const onWindowLoad = () => emblaApi.reInit();
      window.addEventListener('load', onWindowLoad);

      return () => {
        timers.forEach((timer) => window.clearTimeout(timer));
        window.removeEventListener('load', onWindowLoad);
      };
    }
  }, [emblaApi, pathname]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    const updateSnaps = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    updateSnaps();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('reInit', updateSnaps);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
      emblaApi.off('reInit', updateSnaps);
    };
  }, [emblaApi, onSelect]);

  // Auto play
  useEffect(() => {
    if (!emblaApi || !hasMultipleSlides) return;
    const interval = setInterval(() => {
      if (!isPaused) emblaApi.scrollNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [emblaApi, hasMultipleSlides, isPaused]);

  if (!slides || slides.length === 0) {
    return (
      <section className="-mt-20 pt-20 bg-brand-navy min-h-[70vh] flex items-center justify-center">
        <p className="text-white/20 uppercase tracking-widest font-bold">No Hero Content</p>
      </section>
    );
  }

  return (
    <section
      className="-mt-20 relative overflow-hidden bg-brand-navy w-full"
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero slides"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => {
            const isActive = selectedIndex === index;
            const bgUrl = getBackgroundUrl(slide.background);
            const cta1External = isExternalHref(slide.cta1Href);
            const cta2External = isExternalHref(slide.cta2Href);

            return (
              <div
                key={index}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} dari ${slides.length}`}
                className="relative flex-none w-full min-w-full h-[85vh] sm:h-[90vh] lg:h-[95vh] min-h-[600px] flex items-center overflow-hidden transform-gpu"
              >
                {/* Background Image with Parallax effect */}
                <div className="absolute inset-0 z-0">
                  {bgUrl ? (
                    <div className={`relative h-full w-full transition-transform duration-[20000ms] ease-linear ${isActive ? 'scale-100' : 'scale-[1.06]'}`}>
                      <ImageWithLoading
                        src={bgUrl}
                        alt=""
                        role="presentation"
                        fill
                        className="object-cover"
                        skeletonClassName="bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-gold/30"
                        priority={index === 0}
                        sizes="100vw"
                        loading={index === 0 ? "eager" : "lazy"}
                        onLoad={() => emblaApi?.reInit()}
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-brand-navy" />
                  )}
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/40 to-transparent z-10" />
                  <div className="absolute inset-0 bg-brand-navy/20 z-10" />
                </div>

                <div className="relative z-20 flex h-full w-full items-center">
                  <div className="w-full max-w-7xl mx-auto px-6 py-24 sm:py-28 md:px-6 md:py-0 lg:px-8">
                      {isActive && (
                        <StaggerContainer className="max-w-3xl">
                        <StaggerItem>
                          {slide.badge && (
                            <div className="inline-flex items-center gap-3 bg-brand-gold/10 backdrop-blur-md border border-brand-gold/20 px-4 py-2 rounded-full mb-8 shadow-xl"
                            >
                              <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
                              <span className="text-brand-gold font-bold text-[10px] uppercase tracking-wider">
                                {slide.badge}
                              </span>
                            </div>
                          )}
                        </StaggerItem>

                        <StaggerItem>
                          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 md:mb-8 tracking-tight"
                          >
                            {slide.judul}
                          </h1>
                        </StaggerItem>

                        <StaggerItem>
                          <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl font-medium"
                          >
                            {slide.subjudul}
                          </p>
                        </StaggerItem>

                        <StaggerItem>
                          <div className="flex flex-col sm:flex-row gap-4"
                          >
                            {slide.cta1Teks && (
                              <Link
                                href={slide.cta1Href || '#'}
                                target={cta1External ? '_blank' : undefined}
                                rel={cta1External ? 'noopener noreferrer' : undefined}
                                className="group relative bg-brand-gold text-brand-navy font-bold text-[11px] uppercase tracking-widest px-10 py-5 rounded-2xl shadow-2xl hover:shadow-brand-gold/40 hover:-translate-y-1 transition-all duration-500 overflow-hidden text-center"
                              >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                  {slide.cta1Teks}
                                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                              </Link>
                            )}
                            {slide.cta2Teks && (
                              <Link
                                href={slide.cta2Href || '#'}
                                target={cta2External ? '_blank' : undefined}
                                rel={cta2External ? 'noopener noreferrer' : undefined}
                                className="group border border-white/20 text-white font-bold text-[11px] uppercase tracking-widest px-10 py-5 rounded-2xl hover:bg-white hover:text-brand-navy transition-all duration-500 backdrop-blur-md text-center"
                              >
                                {slide.cta2Teks}
                              </Link>
                            )}
                          </div>
                        </StaggerItem>
                        </StaggerContainer>
                      )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 md:bottom-20 left-0 right-0 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-6 md:gap-0 justify-between">
          {/* Indicators */}
          <div className={`${hasMultipleSlides ? 'flex' : 'hidden'} gap-3`}>
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`group relative h-1.5 transition-all duration-500 rounded-full overflow-hidden ${
                  selectedIndex === index ? 'w-12 bg-brand-gold' : 'w-6 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Slide ${index + 1} dari ${scrollSnaps.length}`}
                aria-current={selectedIndex === index ? true : undefined}
              >
                {selectedIndex === index && (
                  <div 
                    className="absolute inset-0 bg-white/40 animate-[hero-progress_8s_linear]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Arrows */}
          <div className={`${hasMultipleSlides ? 'hidden md:flex' : 'hidden'} gap-4`}>
            <button
              onClick={scrollPrev}
              className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-navy hover:border-brand-gold transition-all duration-500 group"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-active:scale-90 transition-transform" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-navy hover:border-brand-gold transition-all duration-500 group"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-active:scale-90 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/[0.03] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
    </section>
  );
}
