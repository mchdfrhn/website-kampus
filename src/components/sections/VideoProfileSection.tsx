'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Info } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { createPortal } from 'react-dom';

export default function VideoProfileSection({ data }: { data?: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper function to ensure URL is in embed format
  const getEmbedUrl = (url: string) => {
    if (!url) return "https://www.youtube.com/embed/dQw4w9WgXcQ";
    
    let cleanUrl = url.trim();

    // If user pasted the whole <iframe> tag, extract only the src (Robust Regex)
    if (cleanUrl.toLowerCase().includes('<iframe')) {
      const srcMatch = cleanUrl.match(/src=["']([^"']+)["']/i);
      if (srcMatch && srcMatch[1]) {
        cleanUrl = srcMatch[1];
      }
    }
    
    // Ensure it's a valid URL string, otherwise fallback to default
    if (!cleanUrl || cleanUrl.startsWith('<')) {
      return "https://www.youtube.com/embed/dQw4w9WgXcQ";
    }

    // If it's already an embed URL, return it
    if (cleanUrl.includes('youtube.com/embed/')) return cleanUrl;
    
    // Handle standard watch?v= format
    if (cleanUrl.includes('youtube.com/watch?v=')) {
      const id = cleanUrl.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    
    // Handle youtu.be/ format
    if (cleanUrl.includes('youtu.be/')) {
      const id = cleanUrl.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    
    return cleanUrl;
  };

  const videoUrl = getEmbedUrl(data?.videoUrl);
  const thumbnailUrl = data?.videoThumbnail?.url || "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop";
  const judul = data?.videoJudul || "Jelajahi Kampus Kami";
  const deskripsi = data?.videoDeskripsi || "Saksikan sekilas kehidupan akademik dan fasilitas unggulan di Sekolah Tinggi Teknologi Pekerjaan Umum Jakarta.";

  // Lock scroll when video is open (including Lenis control)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = 'unset';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = 'unset';
      lenis?.start();
    };
  }, [isOpen, lenis]);

  const Lightbox = (
    <AnimatePresence>
      {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-full z-[9999] bg-brand-navy/60 backdrop-blur-3xl flex items-center justify-center p-0 sm:p-4 md:p-12"
            onClick={() => setIsOpen(false)}
            style={{ position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh' }}
          >
            {/* Close Button - More accessible on mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[110] w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-navy transition-all active:scale-90"
              aria-label="Tutup Video"
            >
              <X size={24} />
            </button>

            {/* Video Player Container - Optimized for all screens */}
            <motion.div 
              initial={{ scale: 0.98, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              className="relative w-full max-w-6xl aspect-video sm:rounded-2xl overflow-hidden shadow-2xl bg-black max-h-screen sm:max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={videoUrl.includes('?') ? `${videoUrl}&autoplay=1` : `${videoUrl}?autoplay=1`}
                title="STTPU Video Profile"
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative group">
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-brand-navy mb-4"
            >
              {judul}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 max-w-2xl mx-auto text-lg"
            >
              {deskripsi}
            </motion.p>
          </div>

          {/* Video Thumbnail Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl cursor-pointer group/thumb"
            onClick={() => setIsOpen(true)}
          >
            {/* Background Image */}
            <Image
              src={thumbnailUrl}
              alt={judul}
              fill
              className="object-cover transition-transform duration-1000 group-hover/thumb:scale-105"
            />
            
            {/* Overlays */}
            <div className="absolute inset-0 bg-brand-navy/30 group-hover/thumb:bg-brand-navy/20 transition-colors duration-500" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-brand-gold/20 animate-ping scale-125" />
                
                <button className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-brand-gold text-brand-navy flex items-center justify-center shadow-lg transition-transform duration-500 group-hover/thumb:scale-110">
                  <Play size={32} fill="currentColor" className="ml-1" />
                </button>
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                  <Info size={20} />
                </div>
                <div>
                  <p className="text-white font-bold text-lg sm:text-xl">{judul}</p>
                  <p className="text-white/60 text-xs sm:text-sm">Video Profil Resmi</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Render the Lightbox through Portal to body to avoid container constraints */}
      {mounted && createPortal(Lightbox, document.body)}
    </section>
  );
}
