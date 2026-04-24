'use client';

import { ChevronUp } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const SHOW_AFTER_SCROLL_Y = 500;

export default function BackToTopControl() {
  const lenis = useLenis();
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > SHOW_AFTER_SCROLL_Y);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 0.7 });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!mounted) return null;

  return createPortal(
    <button
      type="button"
      aria-label="Kembali ke atas"
      onClick={scrollToTop}
      className={[
        'fixed bottom-24 right-7 z-50',
        'h-12 w-12 rounded-full border border-white/30',
        'bg-brand-navy/90 text-white shadow-[0_14px_32px_rgba(0,0,0,0.35)] backdrop-blur-md',
        'transition-all duration-300',
        'hover:-translate-y-0.5 hover:scale-105 hover:bg-brand-navy-light',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60',
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      ].join(' ')}
    >
      <ChevronUp size={20} className="mx-auto" />
    </button>,
    document.body,
  );
}
